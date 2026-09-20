import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createContext, runInContext } from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../src/lib/theme.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
});

function browser({ stored = null, blocked = false } = {}) {
  const values = new Map(stored === null ? [] : [["portfolio-theme", stored]]);
  const document = { documentElement: { dataset: { theme: "system" } } };
  const window = new EventTarget();
  const context = createContext({
    exports: {}, document, window, Event,
    localStorage: {
      getItem(key) {
        if (blocked) throw new Error("Storage unavailable");
        return values.get(key) ?? null;
      },
      setItem(key, value) {
        if (blocked) throw new Error("Storage unavailable");
        values.set(key, value);
      },
    },
  });
  runInContext(outputText, context);
  const api = context.exports;
  return {
    api, values, window,
    initialize: () => runInContext(api.themeInitializationScript, context),
    storage(key, newValue) {
      const event = new Event("storage");
      Object.assign(event, { key, newValue });
      window.dispatchEvent(event);
    },
  };
}

test("saved explicit themes are applied by the pre-paint script", () => {
  for (const stored of ["light", "dark"]) {
    const page = browser({ stored });
    page.initialize();
    assert.equal(page.api.getTheme(), stored);
    assert.equal(page.api.getServerTheme(), "system");
  }
});

test("missing, system and invalid preferences fall back to the system", () => {
  for (const stored of [null, "system", "invalid", ""]) {
    const page = browser({ stored });
    page.initialize();
    assert.equal(page.api.getTheme(), "system");
  }
});

test("a theme change notifies subscribers and survives a new page", () => {
  const page = browser();
  let updates = 0;
  page.api.subscribeToTheme(() => updates++);
  for (const theme of ["dark", "light", "system"]) {
    page.api.setTheme(theme);
    assert.equal(page.api.getTheme(), theme);
    const reloaded = browser({ stored: page.values.get("portfolio-theme") });
    reloaded.initialize();
    assert.equal(reloaded.api.getTheme(), theme);
  }
  assert.equal(updates, 3);
});

test("blocked storage does not prevent switching themes in the current tab", () => {
  const page = browser({ blocked: true });
  assert.doesNotThrow(page.initialize);
  page.api.setTheme("dark");
  assert.equal(page.api.getTheme(), "dark");
  page.api.setTheme("system");
  assert.equal(page.api.getTheme(), "system");
});

test("other tabs synchronize changes, removal and storage clearing", () => {
  const page = browser();
  let updates = 0;
  page.api.subscribeToTheme(() => updates++);
  page.storage("unrelated-key", "dark");
  assert.equal(updates, 0);
  page.storage("portfolio-theme", "dark");
  assert.equal(page.api.getTheme(), "dark");
  page.storage("portfolio-theme", null);
  assert.equal(page.api.getTheme(), "system");
  page.storage("portfolio-theme", "light");
  page.storage(null, null);
  assert.equal(page.api.getTheme(), "system");
  assert.equal(updates, 4);
});

test("unsubscribe removes listeners", () => {
  const page = browser();
  let updates = 0;
  const unsubscribe = page.api.subscribeToTheme(() => updates++);
  unsubscribe();
  page.api.setTheme("dark");
  page.storage("portfolio-theme", "light");
  assert.equal(updates, 0);
  assert.equal(page.api.getTheme(), "dark");
});
