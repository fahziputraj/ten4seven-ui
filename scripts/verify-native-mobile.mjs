import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  NATIVE_MOBILE_CONTRACT,
  NATIVE_SYNC_STATES,
  NATIVE_COLOR_ROLES,
  NATIVE_COMPONENT_IDS,
  DEVICE_SOURCE_CONTRACTS,
} from "../packages/contracts/src/index.ts";
import {
  createFarmDailyOperationProof,
  createNativeButton,
  createNativeCard,
  createNativeFeedback,
  createNativeInput,
  createNativeSyncStatus,
  resolveNativeIcon,
  resolveNativeComponentContract,
  resolveNativeInputContract,
  resolveNativeInputSource,
  resolveNativeTheme,
  NATIVE_DATA_COLLECTION_CANARY,
  resolveNativeDataCollection,
} from "../packages/native/src/index.ts";

const repoRoot = path.resolve(import.meta.dirname, "..");
const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));

const generated = readJson("generated/native-mobile.json");
assert.deepEqual(
  generated,
  NATIVE_MOBILE_CONTRACT,
  "generated native-mobile projection drifted from typed contract",
);

const nativeSource = read("packages/native/src/index.ts");
for (const forbidden of [
  "@ten4seven/ui",
  "@ten4seven/icons",
  "react",
  "react-dom",
  "className",
  "createPortal",
  "<div",
  "document",
  "window",
  ".css",
  "fetch(",
  "localStorage",
  "SecureStore",
  "AsyncStorage",
  "SQLite",
  "apiClient",
  "database",
  "authorization",
  "entitlement",
  "queue",
])
  assert.doesNotMatch(
    nativeSource,
    new RegExp(forbidden.replace(/[()[\].]/g, "\\$&"), "i"),
    `native adapter must not own ${forbidden}`,
  );

const packageManifest = readJson("packages/native/package.json");
assert.deepEqual(
  Object.keys(packageManifest.dependencies).sort(),
  ["@ten4seven/contracts", "@ten4seven/tokens"],
  "native adapter must depend only on shared contracts and tokens",
);
assert.equal(
  packageManifest.dependencies.react,
  undefined,
  "native adapter must not make React a dependency",
);
assert.equal(
  packageManifest.dependencies["react-native"],
  undefined,
  "native adapter must not make React Native a dependency",
);

assert.deepEqual(
  Object.keys(NATIVE_MOBILE_CONTRACT.syncStates),
  NATIVE_SYNC_STATES,
  "native sync vocabulary drifted",
);
assert.deepEqual(
  NATIVE_MOBILE_CONTRACT.proofSurface.components,
  NATIVE_COMPONENT_IDS,
  "native proof component set drifted",
);
for (const role of NATIVE_COLOR_ROLES) {
  assert.equal(
    NATIVE_MOBILE_CONTRACT.tokenReferences.colors[role].layer,
    "semantic",
    `native color ${role} must be a semantic token reference`,
  );
}
assert.equal(
  NATIVE_MOBILE_CONTRACT.tokenReferences.touchTarget.path,
  "component.interaction.touchTarget.minimum",
  "native touch target must use the shared component token",
);
assert.deepEqual(
  NATIVE_MOBILE_CONTRACT.resolvedProjection,
  {
    sourceOfTruth: "packages/tokens/src/theme.ts",
    format: "typed-js",
    colors: "opaque-srgb-hex",
    dimensions: "number-px",
    durations: "number-ms",
    cssIndependent: true,
  },
  "native theme projection must be a CSS-independent typed data contract",
);
assert.doesNotMatch(
  nativeSource,
  /buildThemeVariables|hslToHex|--t7-|var\s*\(/,
  "native adapter must consume the resolved token data projection, not CSS",
);
assert.deepEqual(
  Object.keys(NATIVE_MOBILE_CONTRACT.tokenReferences.brand),
  ["primary", "accent", "highlight", "surface", "text"],
  "native brand role mapping drifted",
);
assert.equal(
  NATIVE_MOBILE_CONTRACT.tokenReferences.brand.primary.path,
  "brand.primary",
  "native brand primary must remain an explicit semantic role",
);

const reducedSystemTheme = resolveNativeTheme({
  profile: "aapm-farm",
  appearance: "system",
  density: "comfortable",
  motion: "reduced",
});
assert.equal(reducedSystemTheme.appearance, "system");
assert.deepEqual(Object.keys(reducedSystemTheme.variants), ["light", "dark"]);
assert.equal(reducedSystemTheme.product, "farm-customer");
assert.equal(reducedSystemTheme.themeRecipe, "product");
assert.equal(reducedSystemTheme.motion, "reduced");
assert.equal(reducedSystemTheme.variants.light.motion.enabled, false);
assert.equal(reducedSystemTheme.variants.dark.motion.enabled, false);
assert.ok(reducedSystemTheme.variants.light.touchTarget >= 44);
assert.equal(
  reducedSystemTheme.variants.light.colors.actionPrimary.toUpperCase(),
  "#318139",
  "AAPM primary must resolve through the shared brand adapter",
);
assert.equal(
  reducedSystemTheme.variants.light.colors.accent.toUpperCase(),
  "#D4451A",
  "AAPM accent must resolve through the shared brand adapter",
);
for (const variant of Object.values(reducedSystemTheme.variants)) {
  for (const value of Object.values(variant.colors))
    assert.match(value, /^#[0-9a-f]{6}$/i, "native colors must be opaque hex");
  for (const token of Object.values(variant.typography)) {
    assert.ok(token.fontSize > 0);
    assert.ok(token.lineHeight >= token.fontSize);
    assert.match(token.fontWeight, /^(400|500|600|700)$/);
  }
  assert.ok(variant.spacing.touchTarget >= 44);
  assert.ok(variant.radius.card >= variant.radius.control);
  assert.ok(variant.motion.rolesMs.chart > 0);
}

const button = createNativeButton({
  id: "approve-operation",
  intent: "primary",
  label: "Approve operation",
});
assert.equal(button.primitive, "Pressable");
assert.equal(button.accessibility.role, "button");
assert.equal(button.accessibility.label, "Approve operation");
assert.equal(
  button.minTouchTargetToken,
  "component.interaction.touchTarget.minimum",
);

const buttonContract = resolveNativeComponentContract(
  readJson("generated/components/Button.json"),
);
assert.equal(buttonContract.id, "Button");
assert.equal(buttonContract.platform, "BOTH");
assert.equal(buttonContract.status, "planned");
assert.equal(buttonContract.presentation, "native-pressable");
assert.ok(buttonContract.tokenFamilies.includes("color"));
assert.ok(buttonContract.layoutIntents.includes("touch-target-minimum"));
assert.ok(buttonContract.accessibilityObligations.includes("actionable-role"));

const inputCanaries = [
  ["Input", "native-platform-control", "control"],
  ["Checkbox", "native-platform-control", "control"],
  ["Select", "native-picker", "control"],
  ["DatePicker", "native-picker", "control"],
  ["FileUpload", "native-document-picker", "content"],
];
for (const [name, presentation, measure] of inputCanaries) {
  const input = resolveNativeInputContract(
    name,
    readJson(`generated/components/${name}.json`),
  );
  assert.equal(input.id, name);
  assert.equal(input.nativeStatus, "planned");
  assert.equal(input.presentation, presentation);
  assert.equal(input.measure, measure);
  assert.ok(input.tokenRoles.length > 0);
  assert.ok(input.states.includes("disabled"));
  assert.ok(input.accessibility.length > 0);
  assert.ok(input.dataBoundary);
}

assert.deepEqual(
  Object.keys(NATIVE_DATA_COLLECTION_CANARY),
  ["List", "DescriptionList", "SelectableList", "DataTable", "Tree"],
  "native U07 data collection canary set drifted",
);
const listCanary = resolveNativeDataCollection("List");
assert.equal(listCanary.primitive, "FlatList");
assert.equal(listCanary.presentation, "native-collection");
assert.equal(listCanary.accessibilityRole, "list");
assert.ok(listCanary.states.includes("loading"));
assert.ok(listCanary.states.includes("filteredEmpty"));
const descriptionCanary = resolveNativeDataCollection("DescriptionList");
assert.equal(descriptionCanary.primitive, "ScrollView");
assert.equal(descriptionCanary.accessibilityRole, "summary");
const dataTableCanary = resolveNativeDataCollection("DataTable");
assert.equal(dataTableCanary.primitive, "FlatList");
assert.equal(dataTableCanary.presentation, "native-list-detail");
assert.ok(dataTableCanary.adaptiveStrategy.includes("priority-columns-to-detail"));
const treeCanary = resolveNativeDataCollection("Tree");
assert.equal(treeCanary.primitive, "SectionList");
assert.equal(treeCanary.presentation, "native-list-detail");
assert.ok(treeCanary.adaptiveStrategy.includes("native-drill-down"));

const imageSource = resolveNativeInputSource("ImagePicker");
assert.deepEqual(
  Object.keys(DEVICE_SOURCE_CONTRACTS),
  ["DocumentPicker", "ImagePicker", "CameraCapture"],
  "native input source canary set drifted",
);
assert.equal(imageSource.classification, "NATIVE_ONLY");
assert.equal(imageSource.status, "planned");
assert.equal(imageSource.presentation, "native-picker");
assert.equal(imageSource.webAlternativeComponent, "FileUpload");
assert.ok(imageSource.capabilities.includes("photo-library.read"));
assert.ok(imageSource.metadata.includes("uri"));
assert.ok(imageSource.metadata.includes("permissionState"));

const invalidInput = createNativeInput({
  id: "operation-date",
  label: "Operation date",
  state: "invalid",
});
assert.equal(invalidInput.primitive, "TextInput");
assert.equal(invalidInput.accessibility.role, "textinput");
assert.equal(invalidInput.accessibility.state.invalid, true);

const card = createNativeCard({
  id: "operation-card",
  title: "Daily operation",
});
assert.equal(card.primitive, "View");
assert.equal(card.accessibility.role, "summary");

const feedback = createNativeFeedback({
  state: "warning",
  label: "Review required",
});
assert.equal(feedback.accessibility.role, "status");
assert.deepEqual(feedback.tokenRoles, ["statusWarning"]);

for (const state of NATIVE_SYNC_STATES) {
  const descriptor = createNativeSyncStatus(state);
  assert.equal(descriptor.component, "offline-sync");
  assert.equal(descriptor.accessibility.role, "status");
  assert.equal(descriptor.icon, NATIVE_MOBILE_CONTRACT.syncStates[state].icon);
  assert.equal(resolveNativeIcon(descriptor.icon).meaning.length > 0, true);
}

const farmProof = createFarmDailyOperationProof(
  {
    date: "2026-09-11",
    eggsCollected: "42860",
    feedIntake: "112 g / bird",
    population: "52000",
    mortality: "0.8%",
  },
  { profile: "aapm-farm", appearance: "system", motion: "reduced" },
);
assert.equal(farmProof.component, "farm-daily-operation");
assert.equal(farmProof.fields.length, 5);
assert.deepEqual(
  farmProof.fields.map(({ primitive }) => primitive),
  ["TextInput", "TextInput", "TextInput", "TextInput", "TextInput"],
);
assert.equal(farmProof.action.primitive, "Pressable");
assert.equal(farmProof.feedback.primitive, "View");
assert.equal(farmProof.sync.state, "local");
for (const field of farmProof.fields) {
  assert.equal(field.accessibility.role, "textinput");
  assert.ok(field.accessibility.label);
}

const iconCatalog = readJson("packages/ai/catalog/icons.json");
for (const iconName of NATIVE_MOBILE_CONTRACT.iconSemantics
  ? Object.keys(NATIVE_MOBILE_CONTRACT.iconSemantics)
  : []) {
  assert.ok(
    iconCatalog[iconName],
    `icon catalog missing semantic name ${iconName}`,
  );
  assert.match(
    read("packages/icons/src/index.tsx"),
    new RegExp(`\\b${iconName.replace(/[.*+?^${}()|[\\]\\]/g, "\\\\$&")}\\b`),
    `icon registry source missing semantic name ${iconName}`,
  );
}

console.log(
  "Native mobile verification passed: shared contract, token resolution, semantic icons, accessibility descriptors, and Farm presentation proof are consistent without a native renderer dependency.",
);
