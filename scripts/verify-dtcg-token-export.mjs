import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { renderDtcgTokenExport } from "./generate-dtcg-token-export.mjs";
import {
  buildDtcgThemeSnapshot,
  exactColor,
} from "../packages/tokens/src/theme.ts";

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
  assert.match(
    json.$extensions["org.ten4seven"].exactColorSource,
    /buildDtcgThemeSnapshot/,
  );
  for (const [recipeName, paletteName] of Object.entries(recipePrimaries)) {
    assert.equal(
      json.theme.recipes[recipeName].semantic.color.action.primary.$value,
      `{ref.color.palette.${paletteName}.primary}`,
      `${recipeName}: recipe semantic primary must follow its curated palette`,
    );
  }
}

const exactSnapshotInput = {
  accent: exactColor("#d4451a"),
  appearance: "dark",
  chartPalette: "monochrome",
  primary: exactColor("#318139"),
};
const exactSnapshot = buildDtcgThemeSnapshot(exactSnapshotInput);
assert.deepEqual(
  buildDtcgThemeSnapshot(exactSnapshotInput),
  exactSnapshot,
  "exact color DTCG snapshots must be deterministic",
);
assert.deepEqual(
  exactSnapshot.$extensions["org.ten4seven"].primarySource,
  { kind: "exact", value: "#318139" },
);
assert.deepEqual(
  exactSnapshot.$extensions["org.ten4seven"].accentSource,
  { kind: "exact", value: "#D4451A" },
);
assert.equal(exactSnapshot.semantic.color.action.primary.$type, "color");
assert.equal(exactSnapshot.semantic.color.action.accent.$type, "color");
assert.equal(exactSnapshot.semantic.color.action.primaryForeground.$type, "color");
assert.deepEqual(
  exactSnapshot.semantic.color.status,
  buildDtcgThemeSnapshot().semantic.color.status,
  "exact action and accent sources must not redefine semantic status colors",
);

console.log(
  `DTCG-compatible token export verified: ${outputs.length} deterministic outputs, typed reference values, semantic aliases, recipe metadata, and exact-source runtime snapshots.`,
);
