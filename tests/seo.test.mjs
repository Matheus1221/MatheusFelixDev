import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createContext, runInContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));

// Isolate environment variables so these tests never change the actual build URL.
function loadSeo(env = {}) {
  const cache = new Map();
  function load(file) {
    if (cache.has(file)) return cache.get(file);
    const { outputText } = ts.transpileModule(readFileSync(file, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    });
    const exports = {};
    cache.set(file, exports);
    runInContext(outputText, createContext({
      exports, URL, process: { env },
      require(specifier) {
        if (!specifier.startsWith("@/")) throw new Error(`Unexpected import: ${specifier}`);
        return load(path.join(root, "src", `${specifier.slice(2)}.ts`));
      },
    }));
    return exports;
  }
  return {
    site: load(path.join(root, "src/lib/site.ts")),
    metadata: load(path.join(root, "src/lib/metadata.ts")),
    sitemap: load(path.join(root, "src/app/sitemap.ts")).default,
    robots: load(path.join(root, "src/app/robots.ts")).default,
  };
}

test("missing site URL never invents canonicals, sitemap entries or social image URLs", () => {
  const seo = loadSeo({ NODE_ENV: "production" });
  const metadata = seo.metadata.createPageMetadata("Title", "Description", "/curriculo");
  assert.equal(metadata.alternates, undefined);
  assert.equal(metadata.openGraph.url, undefined);
  assert.equal(metadata.openGraph.images.length, 0);
  assert.equal(metadata.robots.index, false);
  assert.equal(seo.sitemap().length, 0);
  assert.equal(seo.robots().rules.disallow, "/");
});

test("canonical, Open Graph and Twitter share the confirmed production origin", () => {
  const seo = loadSeo({ SITE_URL: " https://portfolio.example/ ", NODE_ENV: "production" });
  const metadata = seo.metadata.createPageMetadata("GET DOC", "Description", "/projetos/get-doc");
  assert.equal(metadata.alternates.canonical.href, "https://portfolio.example/projetos/get-doc");
  assert.equal(metadata.openGraph.url.href, metadata.alternates.canonical.href);
  assert.equal(metadata.openGraph.title, "GET DOC");
  assert.equal(metadata.twitter.title, "GET DOC");
  assert.equal(metadata.openGraph.images[0].url, "https://portfolio.example/og");
  assert.equal(metadata.twitter.card, "summary_large_image");
  assert.equal(metadata.robots.index, true);
});

test("production sitemap contains exactly the public pages and robots advertises it", () => {
  const seo = loadSeo({ SITE_URL: "https://portfolio.example", NODE_ENV: "production", VERCEL_ENV: "production" });
  const paths = Array.from(seo.sitemap(), (entry) => new URL(entry.url).pathname);
  assert.equal(new Set(paths).size, paths.length, "sitemap must not contain duplicate paths");
  assert.deepEqual(paths.toSorted(), [
    "/", "/curriculo", "/contato", "/projetos/get-doc", "/projetos/deixa-na-conta",
  ].toSorted());
  assert.equal(seo.robots().rules.allow, "/");
  assert.equal(seo.robots().sitemap, "https://portfolio.example/sitemap.xml");
});

test("preview and development environments remain outside indexing", () => {
  for (const env of [{ NODE_ENV: "production", VERCEL_ENV: "preview" }, { NODE_ENV: "development" }]) {
    const seo = loadSeo({ SITE_URL: "https://portfolio.example", ...env });
    assert.equal(seo.site.canIndex(), false);
    assert.equal(seo.sitemap().length, 0);
    assert.equal(seo.robots().rules.disallow, "/");
  }
});

test("invalid origins fail explicitly instead of publishing broken URLs", () => {
  for (const SITE_URL of ["not-a-url", "http://portfolio.example", "https://user:pass@portfolio.example", "https://portfolio.example/path", "https://portfolio.example?query=1", "https://portfolio.example#hash", "https://localhost", "https://127.0.0.1", "https://[::1]"]) {
    const seo = loadSeo({ SITE_URL });
    assert.throws(() => seo.site.getSiteUrl(), /SITE_URL/);
  }
});
