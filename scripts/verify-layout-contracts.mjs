import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import {
  FOUNDATION_CONTRACT,
  LAYOUT_GRAMMAR_CONTRACT,
  MEASURE_CONTRACT,
  MEASURE_INTENT_TO_NAME,
  MEASURE_NAMES,
  TOKEN_RESOLUTION_ORDER,
  resolveMeasureIntent,
  resolveMeasureLayers,
} from "../packages/contracts/src/foundation.ts";
import {
  buildNativeThemeSnapshot,
  buildThemeVariables,
  resolveTheme,
} from "../packages/tokens/src/theme.ts";

const expectedMeasures = [
  "compact",
  "control",
  "content",
  "wide",
  "reading",
  "fluid",
];
const expectedGrammar = [
  "Stack",
  "Cluster",
  "Inline",
  "Grid",
  "AutoGrid",
  "Split",
  "Sidebar",
  "Rail",
  "MasterDetail",
  "CenteredBoundedContent",
  "ScrollRegion",
  "OverlayRegion",
];

assert.deepEqual(MEASURE_NAMES, expectedMeasures, "measure vocabulary drifted");
assert.deepEqual(
  Object.keys(MEASURE_CONTRACT),
  expectedMeasures,
  "measure contract keys drifted",
);
assert.deepEqual(
  Object.keys(LAYOUT_GRAMMAR_CONTRACT),
  expectedGrammar,
  "layout grammar vocabulary drifted",
);
assert.deepEqual(
  TOKEN_RESOLUTION_ORDER,
  [
    "SYSTEM_DEFAULTS",
    "BASE_RECIPE",
    "PRODUCT_PROFILE",
    "THEME_OVERRIDE",
    "SCOPED_OVERRIDE",
    "COMPONENT_STATE",
  ],
  "token resolution order drifted",
);

for (const name of MEASURE_NAMES) {
  const entry = MEASURE_CONTRACT[name];
  assert.equal(entry.name, name, `${name} has an inconsistent name`);
  assert.equal(entry.token, `--t7-measure-${name}`);
  assert.ok(entry.minimumPx >= 0, `${name} minimum must be non-negative`);
  if (entry.preferredPx !== null)
    assert.ok(
      entry.preferredPx >= entry.minimumPx,
      `${name} preferred value must not be below minimum`,
    );
  if (entry.maximumPx !== null && entry.preferredPx !== null)
    assert.ok(
      entry.maximumPx >= entry.preferredPx,
      `${name} maximum must not be below preferred value`,
    );
  assert.equal(
    entry.mode === "fluid",
    name === "fluid",
    `${name} fluid mode must match the vocabulary`,
  );
}

assert.deepEqual(MEASURE_INTENT_TO_NAME, {
  compact: "compact",
  default: "control",
  wide: "wide",
  fill: "fluid",
});
assert.equal(resolveMeasureIntent("default"), "control");
assert.equal(resolveMeasureIntent("fill"), "fluid");

const resolvedAllLayers = resolveMeasureLayers({
  SYSTEM_DEFAULTS: { measure: "compact" },
  BASE_RECIPE: { measure: "content" },
  PRODUCT_PROFILE: { measure: "wide" },
  THEME_OVERRIDE: { measure: "reading" },
  SCOPED_OVERRIDE: { measure: "control" },
  COMPONENT_STATE: { measure: "fluid" },
});
assert.equal(resolvedAllLayers, "fluid", "component state must win last");
assert.equal(
  resolveMeasureLayers({
    BASE_RECIPE: { measure: "content" },
    PRODUCT_PROFILE: { measure: "wide" },
  }),
  "wide",
  "profile must override the recipe when no later layer is present",
);
assert.equal(resolveMeasureLayers(), "control", "default measure drifted");

assert.deepEqual(
  FOUNDATION_CONTRACT.measures,
  MEASURE_CONTRACT,
  "foundation projection must expose the typed measure contract",
);
assert.deepEqual(
  FOUNDATION_CONTRACT.layoutGrammar,
  LAYOUT_GRAMMAR_CONTRACT,
  "foundation projection must expose the typed layout grammar",
);
assert.ok(
  FOUNDATION_CONTRACT.componentTokenRoles.sets.layout.includes("measure"),
  "layout token role set must include measure",
);
for (const name of MEASURE_NAMES) {
  assert.ok(
    FOUNDATION_CONTRACT.componentTokenRoles.targets.measure.includes(
      `--t7-measure-${name}`,
    ),
    `${name} max projection must have token provenance`,
  );
  assert.ok(
    FOUNDATION_CONTRACT.componentTokenRoles.targets.measure.includes(
      `--t7-measure-${name}-min`,
    ),
    `${name} minimum projection must have token provenance`,
  );
}

for (const [name, grammar] of Object.entries(LAYOUT_GRAMMAR_CONTRACT)) {
  assert.equal(grammar.id, name);
  assert.ok(grammar.classification, `${name} must be classified`);
  assert.ok(grammar.platform, `${name} must declare a platform`);
  assert.ok(grammar.nativeStrategy, `${name} must declare a native strategy`);
  assert.ok(grammar.purpose);
  assert.ok(grammar.overflowContract);
  assert.ok(grammar.webRenderer);
  assert.ok(grammar.nativeRenderer);
  assert.deepEqual(Object.keys(grammar.responsiveIntent), [
    "wide",
    "constrained",
    "narrow",
  ]);
}

for (const appearance of ["light", "dark"]) {
  for (const motion of ["full", "reduced"]) {
    const theme = resolveTheme({
      appearance,
      density: "compact",
      palette: "blue",
    });
    const options = { motion };
    const css = buildThemeVariables(theme, options);
    const native = buildNativeThemeSnapshot(theme, options);

    for (const name of MEASURE_NAMES) {
      const entry = MEASURE_CONTRACT[name];
      const nativeMeasure = native.layout.measures[name];
      assert.equal(
        css[`--t7-measure-${name}-min`],
        `${entry.minimumPx}px`,
        `${appearance}/${motion}/${name} CSS minimum drifted`,
      );
      assert.equal(
        css[`--t7-measure-${name}`],
        entry.maximumPx === null ? "100%" : `${entry.maximumPx}px`,
        `${appearance}/${motion}/${name} CSS max drifted`,
      );
      assert.equal(nativeMeasure.minimumPx, entry.minimumPx);
      assert.equal(nativeMeasure.preferredPx, entry.preferredPx);
      assert.equal(nativeMeasure.maximumPx, entry.maximumPx);
      assert.equal(nativeMeasure.fluid, entry.mode === "fluid");
      for (const value of [
        nativeMeasure.minimumPx,
        nativeMeasure.preferredPx,
        nativeMeasure.maximumPx,
      ])
        if (value !== null) assert.equal(typeof value, "number");
      assert.equal(typeof nativeMeasure.fluid, "boolean");
    }
    assert.equal(native.motion.enabled, motion === "full");
  }
}

const nativeSource = readFileSync(
  resolve("packages/native/src/index.ts"),
  "utf8",
);
assert.doesNotMatch(
  nativeSource,
  /buildThemeVariables|hslToHex|--t7-|var\s*\(/,
  "native adapter must remain CSS-independent",
);

console.log(
  `Layout contracts verified: ${MEASURE_NAMES.length} measures, ${expectedGrammar.length} grammar intents, deterministic six-stage resolution, Web/native projections.`,
);
