import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  BRAND_PROFILES,
  CANONICAL_CONTRACTS,
  NATIVE_ALTERNATE_COMPONENT_IDS,
  NATIVE_CAPABILITY_STATES,
  NATIVE_DEVICE_CAPABILITY_CONTRACTS,
  NATIVE_DEVICE_CAPABILITY_IDS,
  NATIVE_EXPO_CONTRACT,
  NATIVE_EXPO_EXECUTION_MODES,
  NATIVE_EXPO_SYNC_PRESENTATION_STATES,
  NATIVE_PARITY_LEVELS,
  NATIVE_PROFILE_CANARIES,
  NATIVE_RENDERER_COMPONENT_IDS,
  NATIVE_RENDERER_MATURITIES,
  TOKEN_RESOLUTION_ORDER,
  resolveTokenLayers,
} from "../packages/contracts/src/index.ts";
import { resolveNativeTheme } from "../packages/native/src/index.ts";
import { resolveThemeConfigLayers } from "../packages/tokens/src/theme.ts";
import {
  buildProjections,
  serializeProjection,
} from "./generate-contract-projections.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));
const normalizeLineEndings = (value) => value.replace(/\r\n/g, "\n");
const escapeRegExpSafe = (value) =>
  value
    .replaceAll("\\", "\\\\")
    .replaceAll(".", "\\.")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)")
    .replaceAll("[", "\\[")
    .replaceAll("]", "\\]");

const projections = await buildProjections();
const expected = projections.outputs["native-expo.json"];
for (const relativePath of [
  "generated/native-expo.json",
  "packages/agent/generated/native-expo.json",
]) {
  const actual = readJson(relativePath);
  assert.deepEqual(actual, expected, `${relativePath} drifted from U12 source`);
  assert.equal(
    normalizeLineEndings(read(relativePath)),
    normalizeLineEndings(serializeProjection("native-expo.json", expected)),
    `${relativePath} is stale; run pnpm contracts:generate`,
  );
}

assert.equal(
  CANONICAL_CONTRACTS.nativeExpo,
  NATIVE_EXPO_CONTRACT,
  "canonical registry must point at the typed U12 native/Expo contract",
);
assert.deepEqual(NATIVE_EXPO_CONTRACT.resolverOrder, TOKEN_RESOLUTION_ORDER);
assert.equal(NATIVE_EXPO_CONTRACT.renderer.cssParsing, false);
assert.equal(NATIVE_EXPO_CONTRACT.renderer.parallelThemeSource, false);
assert.equal(NATIVE_EXPO_CONTRACT.renderer.fontScaling, "enabled by default");
assert.equal(NATIVE_EXPO_CONTRACT.maturity.before, "CONTRACT_ONLY");
assert.equal(NATIVE_EXPO_CONTRACT.maturity.after, "PARTIAL_RENDERER");
assert.equal(resolveThemeConfigLayers().palette, "emerald");
const resolvedLayers = resolveThemeConfigLayers({
  BASE_RECIPE: { palette: "blue" },
  PRODUCT_PROFILE: { palette: "indigo" },
  THEME_OVERRIDE: { palette: "violet" },
  SCOPED_OVERRIDE: { palette: "rose" },
  COMPONENT_STATE: { palette: "amber" },
});
assert.equal(resolvedLayers.palette, "amber", "component state must win last");
assert.equal(
  resolveTokenLayers({
    SYSTEM_DEFAULTS: { value: "defaults" },
    BASE_RECIPE: { value: "recipe" },
    PRODUCT_PROFILE: { value: "profile" },
    THEME_OVERRIDE: { value: "override" },
    SCOPED_OVERRIDE: { value: "scope" },
    COMPONENT_STATE: { value: "state" },
  }).value,
  "state",
  "native contract must retain the six-stage resolver order",
);
assert.deepEqual(
  [...NATIVE_EXPO_EXECUTION_MODES],
  ["EXPO_GO", "DEV_CLIENT_REQUIRED", "SIMULATOR_ONLY", "DEVICE_REQUIRED"],
);
assert.deepEqual(
  [...NATIVE_RENDERER_MATURITIES],
  [
    "NONE",
    "PLACEHOLDER",
    "CONTRACT_ONLY",
    "PARTIAL_RENDERER",
    "FUNCTIONAL_CANARY",
    "MATURE_FAMILY_COVERAGE",
  ],
);
assert.deepEqual(
  [...NATIVE_PARITY_LEVELS],
  [
    "FULL",
    "FUNCTIONAL",
    "PARTIAL",
    "ALTERNATE_PATTERN",
    "NOT_APPLICABLE",
    "PLANNED",
  ],
);

assert.deepEqual(
  Object.keys(BRAND_PROFILES),
  [...NATIVE_PROFILE_CANARIES],
  "native profile canaries must cover every exposed product profile",
);
for (const profile of NATIVE_PROFILE_CANARIES) {
  const resolved = resolveNativeTheme({
    profile,
    appearance: "system",
    motion: "full",
  });
  assert.deepEqual(Object.keys(resolved.variants), ["light", "dark"]);
  for (const variant of Object.values(resolved.variants)) {
    for (const color of Object.values(variant.colors))
      assert.match(
        color,
        /^#[0-9a-f]{6}$/i,
        `${profile} color is not opaque hex`,
      );
    assert.equal(variant.chart.colors.length, 5);
    for (const color of variant.chart.colors)
      assert.match(
        color,
        /^#[0-9a-f]{6}$/i,
        `${profile} chart color is not opaque hex`,
      );
    assert.ok(variant.spacing.touchTarget >= 44);
    assert.ok(variant.layout.measures.content.minimumPx > 0);
    assert.ok(variant.elevation.modal.androidElevation >= 0);
    assert.ok(variant.motion.rolesMs.chart > 0);
  }
  const reduced = resolveNativeTheme({
    profile,
    appearance: "dark",
    motion: "reduced",
  });
  assert.equal(reduced.variants.dark.motion.enabled, false);
  assert.ok(reduced.variants.dark.motion.rolesMs.interaction <= 10);
}
const aapm = resolveNativeTheme({ profile: "aapm-farm", appearance: "light" });
assert.equal(aapm.variants.light.colors.actionPrimary.toUpperCase(), "#318139");
assert.equal(aapm.variants.light.colors.accent.toUpperCase(), "#D4451A");

assert.deepEqual(Object.keys(NATIVE_DEVICE_CAPABILITY_CONTRACTS), [
  ...NATIVE_DEVICE_CAPABILITY_IDS,
]);
for (const id of NATIVE_DEVICE_CAPABILITY_IDS) {
  const capability = NATIVE_DEVICE_CAPABILITY_CONTRACTS[id];
  assert.ok(capability.primitive);
  assert.ok(capability.states.length > 0);
  assert.equal(capability.noBusinessLogic, true);
  assert.ok(capability.accessibility.length > 0);
  assert.ok(NATIVE_EXPO_EXECUTION_MODES.includes(capability.executionMode));
}
assert.ok(NATIVE_CAPABILITY_STATES.includes("permission-required"));
assert.ok(NATIVE_CAPABILITY_STATES.includes("pendingSync"));
assert.ok(NATIVE_CAPABILITY_STATES.includes("syncFailed"));
assert.ok(NATIVE_EXPO_SYNC_PRESENTATION_STATES.includes("synced"));
assert.deepEqual(NATIVE_EXPO_CONTRACT.offlineSync.transitions[1], [
  "pendingSync",
  "syncing",
]);
assert.deepEqual(NATIVE_EXPO_CONTRACT.offlineSync.transitions[2], [
  "syncing",
  "synced",
]);
assert.ok(NATIVE_EXPO_CONTRACT.adaptiveCanaries.Select);
assert.equal(NATIVE_EXPO_CONTRACT.adaptiveCanaries.Select.platform, "ADAPTIVE");
assert.equal(
  NATIVE_EXPO_CONTRACT.adaptiveCanaries.Select.rendererStrategy,
  "ALTERNATE_PATTERN",
);
assert.ok(
  NATIVE_EXPO_CONTRACT.adaptiveCanaries.DataTable.nativePresentation.includes(
    "list",
  ),
);

const nativeManifest = readJson("packages/native/package.json");
assert.equal(nativeManifest.exports["./renderer"], "./src/renderer.tsx");
assert.deepEqual(Object.keys(nativeManifest.dependencies).sort(), [
  "@ten4seven/contracts",
  "@ten4seven/tokens",
]);
for (const dependency of [
  "react",
  "react-native",
  "react-native-safe-area-context",
])
  assert.ok(
    nativeManifest.peerDependencies[dependency],
    `${dependency} must be a peer dependency`,
  );
assert.ok(nativeManifest.devDependencies["react-native"]);
assert.ok(nativeManifest.devDependencies["react-native-safe-area-context"]);

const rendererSource = read("packages/native/src/renderer.tsx");
for (const forbidden of [
  "@ten4seven/ui",
  "react-dom",
  "createPortal",
  "document",
  "window",
  "var(--t7-",
  "localStorage",
  "fetch(",
  "AsyncStorage",
  ".css",
]) {
  assert.doesNotMatch(
    rendererSource,
    forbidden === "window" || forbidden === "document"
      ? new RegExp(`\\b${forbidden}\\b`, "i")
      : new RegExp(escapeRegExpSafe(forbidden), "i"),
    `native renderer must not consume ${forbidden}`,
  );
}
for (const marker of [
  'from "react-native"',
  'from "react-native-safe-area-context"',
  "SafeAreaProvider",
  "useSafeAreaInsets",
  "allowFontScaling",
  "Pressable",
  "onRequestClose",
  "FlatList",
  "KeyboardAvoidingView",
  "NativeSelect",
  "NativeMasterDetail",
])
  assert.match(
    rendererSource,
    new RegExp(escapeRegExpSafe(marker)),
    `renderer marker missing: ${marker}`,
  );

const labManifest = readJson("apps/native-lab/package.json");
const labConfig = readJson("apps/native-lab/app.json");
assert.equal(labManifest.main, "expo/AppEntry");
assert.equal(labConfig.expo.web.output, "single");
assert.equal(labConfig.expo.orientation, "default");
assert.ok(labManifest.dependencies.expo);
assert.ok(labManifest.dependencies["react-native"]);
const labSource = read("apps/native-lab/App.tsx");
for (const forbidden of [
  "@ten4seven/ui",
  "fetch(",
  "AsyncStorage",
  "expo-router",
  "SQLite",
  "SecureStore",
])
  assert.doesNotMatch(labSource, new RegExp(escapeRegExpSafe(forbidden), "i"));
for (const marker of [
  "NativeThemeProvider",
  "NativeSelect",
  "NativeMasterDetail",
  "NativeCapabilityStateCard",
  "NativePromptComposer",
  "NativeSyncBanner",
  "NativeSheet",
])
  assert.match(
    labSource,
    new RegExp(marker),
    `Native Lab marker missing: ${marker}`,
  );

const derived = expected.derived.componentMaturity;
assert.equal(
  Object.keys(derived).length,
  Object.keys(readJson("packages/ai/catalog/components.json")).length,
);
for (const [id, row] of Object.entries(derived)) {
  assert.equal(row.component, id);
  assert.ok(row.family);
  assert.ok(row.platformClass);
  assert.ok(NATIVE_RENDERER_MATURITIES.includes(row.nativeMaturity));
  assert.ok(NATIVE_PARITY_LEVELS.includes(row.parityLevel));
  assert.ok(row.accessibilityStatus);
  assert.ok(row.testStatus);
}
for (const id of NATIVE_RENDERER_COMPONENT_IDS)
  if (derived[id]) assert.equal(derived[id].nativeMaturity, "PARTIAL_RENDERER");
for (const id of NATIVE_ALTERNATE_COMPONENT_IDS)
  if (derived[id] && derived[id].platformClass !== "WEB")
    assert.equal(derived[id].parityLevel, "ALTERNATE_PATTERN");

console.log(
  `Native Expo verification passed: ${NATIVE_PROFILE_CANARIES.length} profiles, ${NATIVE_DEVICE_CAPABILITY_IDS.length} capability contracts, ${Object.keys(derived).length} derived component maturity rows, CSS-independent renderer boundary, and Expo Lab source are consistent. Device runtime proof remains a separate evidence class.`,
);
