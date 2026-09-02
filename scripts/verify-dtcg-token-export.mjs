import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { renderDtcgTokenExport } from "./generate-dtcg-token-export.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const expected = renderDtcgTokenExport();
const outputs = [
  "generated/tokens.dtcg.json",
  "packages/tokens/generated/tokens.dtcg.json",
  "packages/agent/generated/tokens.dtcg.json",
];
const recipePrimaries = {
  enterprise: "indigo",
  product: "indigo",
  editorial: "slate",
  commerce: "emerald",
};

for (const relativePath of outputs) {
  const source = fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
  assert.equal(
    source,
    expected,
    `${relativePath}: generated DTCG-compatible export is stale; run pnpm tokens:generate`,
  );
  const json = JSON.parse(source);
  assert.equal(json.ref.space[4].$type, "dimension");
  assert.deepEqual(json.ref.space[4].$value, { value: 16, unit: "px" });
  assert.deepEqual(json.ref.duration.motionAnchorMinimum.$value, {
    value: 0.25,
    unit: "s",
  });
  assert.equal(json.ref.color.palette.emerald.primary.$type, "color");
  assert.equal(
    json.semantic.color.action.primary.$value,
    "{ref.color.palette.emerald.primary}",
  );
  assert.equal(
    json.theme.$extensions["org.ten4seven"].recipes.enterprise.expression,
    "operational",
  );
  for (const [recipeName, paletteName] of Object.entries(recipePrimaries)) {
    assert.equal(
      json.theme.recipes[recipeName].semantic.color.action.primary.$value,
      `{ref.color.palette.${paletteName}.primary}`,
      `${recipeName}: recipe semantic primary must follow its curated palette`,
    );
  }
}

console.log(
  `DTCG-compatible token export verified: ${outputs.length} deterministic outputs, typed reference values, semantic aliases, and recipe metadata.`,
);
