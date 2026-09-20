import assert from "node:assert/strict";
import { gzipSync } from "node:zlib";

const origin = new URL(process.argv[2] ?? "http://localhost:3000");
const remote = process.argv.includes("--remote");
assert.ok(!origin.username && !origin.password && origin.pathname === "/" && !origin.search && !origin.hash, "Use an origin without credentials, path, query or fragment.");
assert.ok(
  remote ? origin.protocol === "https:" : ["localhost", "127.0.0.1", "[::1]"].includes(origin.hostname),
  "Use localhost, or pass --remote with the public HTTPS origin.",
);
const routes = ["/", "/curriculo", "/contato", "/projetos/get-doc", "/projetos/deixa-na-conta"];
const pages = new Map();
const scripts = new Set();
const stylesheets = new Set();

for (const route of routes) {
  const response = await fetch(new URL(route, origin));
  assert.equal(response.status, 200, route);
  const raw = await response.text();
  const pageStylesheets = Array.from(raw.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g), (match) => match[1]);
  assert.ok(pageStylesheets.length > 0, `Missing stylesheet: ${route}`);
  for (const stylesheet of pageStylesheets) stylesheets.add(stylesheet);
  for (const match of raw.matchAll(/<script\b[^>]*src="([^"]+)"/g)) scripts.add(match[1]);
  const html = raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  const ids = Array.from(html.matchAll(/\bid="([^"]+)"/g), (match) => match[1]);
  assert.equal(ids.length, new Set(ids).size, `Duplicate IDs: ${route}`);
  assert.match(html, /<html[^>]*lang="pt-BR"/);
  assert.equal(Array.from(html.matchAll(/<main\b/g)).length, 1);
  assert.match(html, /<main[^>]*id="conteudo"[^>]*tabindex="-1"/i);
  const headings = Array.from(html.matchAll(/<h([1-6])\b/g), (match) => Number(match[1]));
  assert.equal(headings.filter((level) => level === 1).length, 1);
  headings.slice(1).forEach((level, i) => assert.ok(level <= headings[i] + 1, `Heading hierarchy: ${route}`));
  for (const match of html.matchAll(/aria-labelledby="([^"]+)"/g)) {
    for (const id of match[1].split(" ")) assert.ok(ids.includes(id), `Missing label ${id}`);
  }
  assert.match(html, /name="description" content="[^"]+"/);
  assert.match(html, /property="og:title"/);
  assert.match(html, /name="twitter:card"/);
  assert.match(html, /rel="icon"/);
  if (remote) {
    assert.equal(html.match(/rel="canonical" href="([^"]+)"/)?.[1], new URL(route, origin).href, `Canonical: ${route}`);
    assert.match(html, /name="robots" content="index, follow"/);
  }
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const links = Array.from(html.matchAll(/<a\b[^>]*href="([^"]+)"/g), (match) => match[1]);
  pages.set(route, { html, ids, links, title });
  console.log(`${route}: HTTP 200; metadata, landmarks, headings and labels passed`);
}
assert.equal(new Set(Array.from(pages.values(), (page) => page.title)).size, routes.length, "Page titles must be unique");
for (const [route, page] of pages) {
  for (const href of page.links) {
    const link = new URL(href, new URL(route, origin));
    if (link.origin !== origin.origin) continue;
    const target = pages.get(link.pathname);
    if (target) {
      if (link.hash) assert.ok(target.ids.includes(link.hash.slice(1)), `Broken anchor: ${href}`);
    } else {
      assert.equal((await fetch(link)).status, 200, `Broken resource: ${href}`);
    }
  }
}
const missing = await fetch(new URL("/projetos/audit-missing-project", origin));
assert.equal(missing.status, 404);
assert.match(await missing.text(), /noindex/);
for (const [route, mime] of [["/robots.txt", "text/plain"], ["/sitemap.xml", "application/xml"], ["/icon.svg", "image/svg+xml"], ["/og", "image/png"]]) {
  const response = await fetch(new URL(route, origin));
  assert.equal(response.status, 200, route);
  assert.ok(response.headers.get("content-type")?.includes(mime), `${route} content type`);
  if (remote && route === "/robots.txt") {
    const robots = await response.text();
    assert.match(robots, /^Allow: \/$/m);
    assert.ok(robots.includes(`Sitemap: ${new URL("/sitemap.xml", origin).href}`));
  }
  if (remote && route === "/sitemap.xml") {
    const locations = Array.from((await response.text()).matchAll(/<loc>(.*?)<\/loc>/g), match => match[1]);
    assert.deepEqual(locations.sort(), routes.map(route => new URL(route, origin).href).sort());
  }
  if (route === "/og") {
    const png = Buffer.from(await response.arrayBuffer());
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
    console.log(`Social PNG: 1200x630; ${(png.length / 1024).toFixed(1)} KiB`);
  }
}
for (const stylesheet of stylesheets) {
  const response = await fetch(new URL(stylesheet, origin));
  assert.equal(response.status, 200, stylesheet);
  assert.ok(response.headers.get("content-type")?.includes("text/css"), `CSS content type: ${stylesheet}`);
  const css = Buffer.from(await response.arrayBuffer()).toString("utf8");
  // A source BOM can survive bundling inside a selector, disabling the root tokens.
  assert.ok(!css.includes("\uFEFF"), `Unexpected BOM in compiled CSS: ${stylesheet}`);
}
console.log(`Stylesheets: ${stylesheets.size}; HTTP 200, CSS content type and encoding passed`);
let rawBytes = 0;
let gzipBytes = 0;
for (const script of scripts) {
  const response = await fetch(new URL(script, origin));
  assert.equal(response.status, 200, script);
  const content = Buffer.from(await response.arrayBuffer());
  rawBytes += content.length;
  gzipBytes += gzipSync(content).length;
}
console.log(`Unique JS assets across all pages: ${scripts.size}; ${(rawBytes / 1024).toFixed(1)} KiB raw; ${(gzipBytes / 1024).toFixed(1)} KiB estimated gzip`);
console.log("HTTP audit passed. This does not measure Core Web Vitals or replace browser accessibility testing.");
