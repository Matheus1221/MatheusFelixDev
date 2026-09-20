import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createContext, runInContext } from "node:vm";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import * as jsxRuntime from "react/jsx-runtime";
import ts from "typescript";

const { outputText } = ts.transpileModule(
  readFileSync(new URL("../src/components/experience-timeline.tsx", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } },
);

function renderTimeline(experiences) {
  const exports = {};
  runInContext(outputText, createContext({
    exports,
    require(specifier) {
      if (specifier === "react/jsx-runtime") return jsxRuntime;
      if (specifier === "@/content/experience") return { experiences };
      throw new Error(`Unexpected import: ${specifier}`);
    },
  }));
  return renderToStaticMarkup(exports.ExperienceTimeline());
}

const position = { company: "Empresa de teste", role: "Cargo de teste", startDate: "2024-01" };

test("current positions render Atual without an invalid machine-readable date", () => {
  for (const experience of [position, { ...position, endDate: null }]) {
    const html = renderTimeline([experience]);
    assert.match(html, /<span>Atual<\/span>/);
    assert.deepEqual(Array.from(html.matchAll(/<time datetime="([^"]+)"/gi), match => match[1]), ["2024-01"]);
    assert.match(html, /jan\.? de 2024/);
    assert.doesNotMatch(html, /Invalid Date|datetime="Atual"/i);
  }
});

test("completed and current positions coexist with their original dates", () => {
  const html = renderTimeline([
    { ...position, endDate: "2024-07" },
    { ...position, company: "Outra empresa de teste", startDate: "2024-08" },
  ]);
  assert.deepEqual(Array.from(html.matchAll(/<time datetime="([^"]+)"/gi), match => match[1]), ["2024-01", "2024-07", "2024-08"]);
  assert.match(html, /jul\.? de 2024/);
  assert.equal(Array.from(html.matchAll(/<span>Atual<\/span>/g)).length, 1);
});
