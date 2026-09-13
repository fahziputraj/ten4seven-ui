import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  CANONICAL_CONTRACTS,
  ACCESSIBILITY_OBLIGATIONS,
  COMPONENT_CONTRACT_PLANE,
  COMPONENT_PLATFORM_CLASSES,
  COMPONENT_RENDERER_STATUSES,
  COMPONENT_RENDERER_STRATEGIES,
  COMPONENT_FAMILIES,
  COMPONENT_TOKEN_ROLE_CONTRACT,
  INPUT_MODALITIES,
  INPUT_CONTRACT_CLASSIFICATIONS,
  INPUT_CONTRACT_DEFINITIONS,
  INPUT_CONTRACT_FAMILIES,
  INPUT_CONTRACT_PLANE,
  INPUT_CONTRACT_STATUSES,
  INPUT_STATE_IDS,
  NAVIGATION_OVERLAY_FEEDBACK_DEFINITIONS,
  NAVIGATION_OVERLAY_FEEDBACK_FAMILIES,
  NAVIGATION_OVERLAY_FEEDBACK_PLANE,
  NAVIGATION_OVERLAY_FEEDBACK_STATUSES,
  NAVIGATION_OVERLAY_FEEDBACK_LAYER_ROLES,
  NAVIGATION_OWNERSHIP,
  OVERLAY_FOCUS_DISMISSAL_CONTRACT,
  resolveNavigationOverlayFeedbackContract,
  DATA_COLLECTION_DEFINITIONS,
  DATA_COLLECTION_DENSITIES,
  DATA_COLLECTION_FAMILIES,
  DATA_COLLECTION_GAP_DECISIONS,
  DATA_COLLECTION_INVENTORY_STATUSES,
  DATA_COLLECTION_PLANE,
  DATA_COLLECTION_RESPONSIVE_PATTERNS,
  DATA_COLLECTION_SELECTION_MODES,
  DATA_COLLECTION_SORT_MODES,
  DATA_COLLECTION_STATES,
  DATA_COLLECTION_VIRTUALIZATION_BOUNDARIES,
  NATIVE_DATA_COLLECTION_CANARY,
  resolveDataCollectionContract,
  DEVICE_SOURCE_CONTRACTS,
  FILE_METADATA_CONTRACT,
  FORM_FIELD_ANATOMY,
  MEASURE_CONTRACT,
  TOKEN_RESOLUTION_ORDER,
  TOKEN_FAMILIES,
  LAYOUT_INTENTS,
  DEFERRED_NATIVE_PLATFORM_CONTRACTS,
  resolveComponentPlatformContract,
  resolveInputContract,
  createDefaultThemeStudioConfig,
  diffThemeStudioConfig,
  CONTROL_PLANE_PATTERN_IDS,
  CONTROL_PLANE_PATTERN_STATES,
  CONTROL_PLANE_REFERENCE_VIEW_IDS,
  DEFAULT_THEME_PROFILE,
  ENTITY_LIST_CONTRACT,
  ENTITY_LIST_STATES,
  FOUNDATION_CONTRACT,
  MODULE_STATE_CONTRACT,
  MODULE_STATE_IDS,
  NATIVE_MOBILE_CONTRACT,
  ERP_DENSITY_CONTRACT,
  ERP_DENSITY_PATTERN_IDS,
  ERP_DENSITY_STATES,
  EDITOR_BUILDER_AI_COMPONENTS,
  EDITOR_BUILDER_AI_CONTRACT,
  WORKFLOW_PRODUCTIVITY_COMPONENTS,
  WORKFLOW_PRODUCTIVITY_CONTRACT,
  exactColor,
  OPERATIONAL_PATTERN_CONTRACTS,
  PLATFORM_NEUTRAL_CONTRACT,
  READINESS_REVIEW_STATES,
  RESPONSIVE_COMPONENT_BEHAVIORS,
  RESPONSIVE_CONTRACT,
  RESPONSIVE_RECIPE_BINDINGS,
  RESPONSIVE_SHELL_CONTRACT,
  RESPONSIVE_VIEWPORTS,
  SAAS_CONTROL_PLANE_CONTRACT,
  THEME_RECIPES,
  THEME_RECIPE_NAMES,
  RESPONSIVE_MODES,
  normalizeThemeProfile,
  parseThemeStudioConfig,
  resetThemeStudioAxis,
  resolveThemeStudioConfig,
  resolveRuntimePreferences,
  serializeThemeStudioConfig,
  THEME_STUDIO_SCHEMA_VERSION,
  themeRecipeToLegacyConfig,
  themeProfileToLegacyConfig,
} from "../packages/contracts/src/index.ts";
import {
  buildThemeVariables,
  resolveTheme,
} from "../packages/tokens/src/theme.ts";
import {
  buildProjections,
  serializeProjection,
} from "./generate-contract-projections.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const generatedRoot = path.join(repoRoot, "generated");
const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));
const normalizeLineEndings = (value) => value.replace(/\r\n/g, "\n");

const projections = await buildProjections();
const { outputs, legacyComponents, legacyRecipes } = projections;

for (const root of ["generated", "packages/agent/generated"])
  for (const [filename, value] of Object.entries(outputs)) {
    const relativePath = `${root}/${filename}`;
    assert.equal(
      normalizeLineEndings(read(relativePath)),
      normalizeLineEndings(serializeProjection(filename, value)),
      `${relativePath}: generated output is stale; run pnpm contracts:generate`,
    );
  }

const platformNeutral = outputs["platform-neutral.json"];
const componentContractPlane = outputs["component-contract-plane.json"];
const generatedComponents = outputs["components.compact.json"];
assert.deepEqual(
  componentContractPlane.contract,
  COMPONENT_CONTRACT_PLANE,
  "component contract plane: generated contract drifted from typed source",
);
assert.equal(
  CANONICAL_CONTRACTS.componentPlatform,
  COMPONENT_CONTRACT_PLANE,
  "component contract plane: canonical registry does not point to typed source",
);
assert.equal(
  componentContractPlane.registry.canonicalCount,
  Object.values(legacyComponents).filter((component) => !component.aliasOf)
    .length,
  "component contract plane: canonical registry count drifted",
);
assert.equal(
  componentContractPlane.registry.aliasCount,
  Object.values(legacyComponents).filter((component) => component.aliasOf)
    .length,
  "component contract plane: alias count drifted",
);
for (const value of COMPONENT_PLATFORM_CLASSES)
  assert.ok(
    ["BOTH", "WEB", "NATIVE", "ADAPTIVE"].includes(value),
    `component platform: unsupported platform class ${value}`,
  );
for (const value of COMPONENT_RENDERER_STRATEGIES)
  assert.ok(
    [
      "SAME_INTENT",
      "NATIVE_RENDERER",
      "ALTERNATE_PATTERN",
      "NOT_APPLICABLE",
    ].includes(value),
    `component platform: unsupported renderer strategy ${value}`,
  );
for (const value of COMPONENT_RENDERER_STATUSES)
  assert.ok(
    [
      "implemented",
      "experimental",
      "planned",
      "not-applicable",
      "deprecated",
    ].includes(value),
    `component platform: unsupported renderer status ${value}`,
  );
assert.equal(
  new Set(COMPONENT_FAMILIES).size,
  COMPONENT_FAMILIES.length,
  "component platform: family vocabulary contains duplicates",
);
assert.equal(
  new Set(INPUT_MODALITIES).size,
  INPUT_MODALITIES.length,
  "component platform: modality vocabulary contains duplicates",
);
assert.equal(
  new Set(ACCESSIBILITY_OBLIGATIONS).size,
  ACCESSIBILITY_OBLIGATIONS.length,
  "component platform: accessibility vocabulary contains duplicates",
);
assert.equal(
  new Set(TOKEN_FAMILIES).size,
  TOKEN_FAMILIES.length,
  "component platform: token-family vocabulary contains duplicates",
);
assert.equal(
  new Set(LAYOUT_INTENTS).size,
  LAYOUT_INTENTS.length,
  "component platform: layout-intent vocabulary contains duplicates",
);

const componentPlatformMatrix = componentContractPlane.matrix;
const aliasesByCanonical = Object.fromEntries(
  Object.entries(outputs["aliases.json"]).reduce(
    (entries, [alias, canonical]) => {
      const current = entries.get(canonical) ?? [];
      current.push(alias);
      entries.set(canonical, current);
      return entries;
    },
    new Map(),
  ),
);
const canonicalComponentEntries = Object.entries(legacyComponents).filter(
  ([, component]) => !component.aliasOf,
);
for (const [name, component] of canonicalComponentEntries) {
  const resolved = resolveComponentPlatformContract(
    name,
    component,
    aliasesByCanonical[name] ?? [],
  );
  const projected = componentPlatformMatrix[name];
  assert.ok(
    projected,
    `${name}: platform contract missing from generated matrix`,
  );
  assert.deepEqual(
    projected,
    resolved,
    `${name}: generated platform metadata drifted from typed resolver`,
  );
  assert.ok(
    COMPONENT_PLATFORM_CLASSES.includes(projected.platform),
    `${name}: invalid platform classification`,
  );
  assert.ok(
    COMPONENT_RENDERER_STRATEGIES.includes(projected.rendererStrategy),
    `${name}: invalid renderer strategy`,
  );
  assert.ok(
    COMPONENT_FAMILIES.includes(projected.family),
    `${name}: invalid component family`,
  );
  for (const modality of projected.inputModalities)
    assert.ok(
      INPUT_MODALITIES.includes(modality),
      `${name}: invalid input modality ${modality}`,
    );
  for (const obligation of projected.accessibilityObligations)
    assert.ok(
      ACCESSIBILITY_OBLIGATIONS.includes(obligation),
      `${name}: invalid accessibility obligation ${obligation}`,
    );
  for (const tokenFamily of projected.tokenFamilies)
    assert.ok(
      TOKEN_FAMILIES.includes(tokenFamily),
      `${name}: invalid token family ${tokenFamily}`,
    );
  for (const layoutIntent of projected.layoutIntents)
    assert.ok(
      LAYOUT_INTENTS.includes(layoutIntent),
      `${name}: invalid layout intent ${layoutIntent}`,
    );
  if (projected.platform === "ADAPTIVE") {
    assert.ok(
      projected.adaptiveBehavior,
      `${name}: adaptive contract missing adaptive behavior`,
    );
    assert.ok(
      COMPONENT_CONTRACT_PLANE.adaptivePatterns[
        projected.adaptiveBehavior.pattern
      ],
      `${name}: adaptive contract points to an unknown pattern`,
    );
    assert.notEqual(
      projected.rendererStrategy,
      "NOT_APPLICABLE",
      `${name}: adaptive contract cannot be marked not applicable`,
    );
  }
  if (projected.platform === "WEB")
    assert.notEqual(
      projected.native.status,
      "implemented",
      `${name}: Web-only contract cannot claim an implemented Native renderer`,
    );
  if (projected.platform === "NATIVE")
    assert.notEqual(
      projected.web.status,
      "implemented",
      `${name}: Native-only contract cannot claim an implemented Web renderer`,
    );
  assert.equal(
    generatedComponents[name].platform,
    projected.platform,
    `${name}: AI compact projection omitted platform metadata`,
  );
  assert.equal(
    generatedComponents[name].nativeStatus,
    projected.native.status,
    `${name}: AI compact projection omitted Native status`,
  );
}

const inputContractProjection = outputs["input-contracts.json"];
assert.ok(
  inputContractProjection,
  "input contracts: generated projection missing",
);
assert.equal(
  CANONICAL_CONTRACTS.inputContracts,
  INPUT_CONTRACT_PLANE,
  "input contracts: canonical registry does not point to typed source",
);
assert.equal(
  inputContractProjection.id,
  INPUT_CONTRACT_PLANE.id,
  "input contracts: generated id drifted",
);
assert.equal(
  inputContractProjection.sourceOfTruth,
  "packages/contracts/src/input-contracts.ts",
  "input contracts: typed source path missing",
);
assert.equal(
  outputs["index.json"].inputContracts.path,
  "input-contracts.json",
  "input contracts: generated index path missing",
);
assert.equal(
  outputs["agent-index.json"].entryPoints["input-contracts"].source,
  "generated/input-contracts.json",
  "input contracts: agent entry point missing",
);
assert.deepEqual(
  inputContractProjection.taxonomy,
  INPUT_CONTRACT_PLANE.taxonomy,
  "input contracts: taxonomy projection drifted",
);
assert.deepEqual(
  inputContractProjection.ownership.resolutionOrder,
  TOKEN_RESOLUTION_ORDER,
  "input contracts: resolver order drifted",
);
assert.deepEqual(
  inputContractProjection.fieldAnatomy,
  FORM_FIELD_ANATOMY,
  "input contracts: field anatomy projection drifted",
);
assert.deepEqual(
  inputContractProjection.fileMetadata,
  FILE_METADATA_CONTRACT,
  "input contracts: file metadata projection drifted",
);
assert.deepEqual(
  inputContractProjection.measures,
  MEASURE_CONTRACT,
  "input contracts: measure projection drifted",
);

const inputFamilyCatalogCategories = {
  FORM: "form",
  SELECTION: "form",
  DATE_TIME: "date-time",
  FILES: "file",
};
assert.equal(
  new Set(Object.keys(INPUT_CONTRACT_DEFINITIONS)).size,
  Object.keys(INPUT_CONTRACT_DEFINITIONS).length,
  "input contracts: duplicate component definition",
);
for (const [name, definition] of Object.entries(INPUT_CONTRACT_DEFINITIONS)) {
  const component = legacyComponents[name];
  const platform = componentPlatformMatrix[name];
  const projected = inputContractProjection.components[name];
  assert.equal(
    component?.status,
    "implemented",
    `${name}: input contract must attach only to an implemented catalog component`,
  );
  assert.equal(
    component?.category,
    inputFamilyCatalogCategories[definition.family],
    `${name}: input family does not match catalog taxonomy`,
  );
  assert.ok(projected, `${name}: resolved input contract missing`);
  assert.deepEqual(
    projected,
    resolveInputContract(name, platform),
    `${name}: resolved input contract drifted from typed source`,
  );
  assert.deepEqual(
    generatedComponents[name].inputContractRef,
    { path: "input-contracts.json", id: projected.canonicalComponent },
    `${name}: AI compact input contract reference missing or stale`,
  );
  assert.ok(
    INPUT_CONTRACT_FAMILIES.includes(definition.family),
    `${name}: invalid input family`,
  );
  assert.ok(
    INPUT_CONTRACT_CLASSIFICATIONS.includes(definition.classification),
    `${name}: invalid input classification`,
  );
  assert.ok(
    INPUT_CONTRACT_STATUSES.includes(definition.status),
    `${name}: invalid input status`,
  );
  assert.ok(MEASURE_CONTRACT[definition.measure], `${name}: measure missing`);
  for (const role of definition.tokenRoles)
    assert.ok(
      COMPONENT_TOKEN_ROLE_CONTRACT.targets[role],
      `${name}: token role ${role} is not canonical`,
    );
  for (const state of [...definition.states, ...definition.asyncStates])
    assert.ok(
      INPUT_STATE_IDS.includes(state),
      `${name}: invalid state ${state}`,
    );
  for (const obligation of definition.accessibility)
    assert.ok(
      ACCESSIBILITY_OBLIGATIONS.includes(obligation),
      `${name}: invalid accessibility obligation ${obligation}`,
    );
  assert.ok(definition.useWhen.length > 0, `${name}: useWhen guidance missing`);
  assert.ok(
    definition.avoidWhen.length > 0,
    `${name}: avoidWhen guidance missing`,
  );
  assert.equal(
    projected.platform,
    platform.platform,
    `${name}: input platform must be derived from component-platform`,
  );
  assert.equal(
    projected.rendererStrategy,
    platform.rendererStrategy,
    `${name}: input renderer strategy must be derived from component-platform`,
  );
}

const gapIds = Object.keys(INPUT_CONTRACT_PLANE.gapDecisions);
assert.equal(
  new Set(gapIds).size,
  gapIds.length,
  "input contracts: duplicate gap decision",
);
for (const [name, gap] of Object.entries(INPUT_CONTRACT_PLANE.gapDecisions)) {
  assert.equal(gap.id, name, `${name}: gap decision id drifted`);
  assert.ok(
    INPUT_CONTRACT_CLASSIFICATIONS.includes(gap.classification),
    `${name}: invalid gap classification`,
  );
  assert.ok(
    INPUT_CONTRACT_STATUSES.includes(gap.status),
    `${name}: invalid gap status`,
  );
  assert.notEqual(
    gap.status,
    "implemented",
    `${name}: gap cannot be implemented`,
  );
  assert.ok(gap.reason, `${name}: gap rationale missing`);
  assert.ok(gap.aiGuidance, `${name}: gap AI guidance missing`);
  if (gap.canonicalComponent)
    assert.equal(
      legacyComponents[gap.canonicalComponent]?.status,
      "implemented",
      `${name}: gap canonical target is not implemented`,
    );
}
assert.equal(
  INPUT_CONTRACT_PLANE.gapDecisions.TreeSelect.classification,
  "REJECTED_DUPLICATE",
  "TreeSelect must remain a rejected duplicate of the hierarchy contracts",
);
assert.equal(
  INPUT_CONTRACT_PLANE.gapDecisions.Dropzone.canonicalComponent,
  "FileUpload",
  "Dropzone must remain a FileUpload presentation behavior",
);
assert.equal(
  INPUT_CONTRACT_PLANE.gapDecisions.UploadQueue.classification,
  "DEFERRED",
  "UploadQueue must remain consumer transport presentation until an engine is approved",
);

const navigationOverlayFeedbackProjection =
  outputs["navigation-overlay-feedback.json"];
assert.ok(
  navigationOverlayFeedbackProjection,
  "navigation/overlay/feedback: generated projection missing",
);
assert.equal(
  CANONICAL_CONTRACTS.navigationOverlayFeedback,
  NAVIGATION_OVERLAY_FEEDBACK_PLANE,
  "navigation/overlay/feedback: canonical registry does not point to typed source",
);
assert.equal(
  navigationOverlayFeedbackProjection.id,
  NAVIGATION_OVERLAY_FEEDBACK_PLANE.id,
  "navigation/overlay/feedback: generated id drifted",
);
assert.equal(
  navigationOverlayFeedbackProjection.sourceOfTruth,
  "packages/contracts/src/navigation-overlay-feedback.ts",
  "navigation/overlay/feedback: typed source path missing",
);
assert.equal(
  outputs["index.json"].navigationOverlayFeedback.path,
  "navigation-overlay-feedback.json",
  "navigation/overlay/feedback: generated index path missing",
);
assert.equal(
  outputs["agent-index.json"].entryPoints["navigation-overlay-feedback"].source,
  "generated/navigation-overlay-feedback.json",
  "navigation/overlay/feedback: agent entry point missing",
);
assert.deepEqual(
  navigationOverlayFeedbackProjection.taxonomy,
  NAVIGATION_OVERLAY_FEEDBACK_PLANE.taxonomy,
  "navigation/overlay/feedback: taxonomy projection drifted",
);
assert.deepEqual(
  navigationOverlayFeedbackProjection.ownership,
  NAVIGATION_OWNERSHIP,
  "navigation/overlay/feedback: ownership projection drifted",
);
assert.deepEqual(
  navigationOverlayFeedbackProjection.layers,
  NAVIGATION_OVERLAY_FEEDBACK_LAYER_ROLES,
  "navigation/overlay/feedback: layer projection drifted",
);
assert.deepEqual(
  navigationOverlayFeedbackProjection.focusDismissal,
  OVERLAY_FOCUS_DISMISSAL_CONTRACT,
  "navigation/overlay/feedback: focus/dismissal projection drifted",
);
for (const [role, layer] of Object.entries(
  NAVIGATION_OVERLAY_FEEDBACK_LAYER_ROLES,
)) {
  assert.match(
    layer.token,
    /^--t7-z-[a-z-]+$/,
    `${role}: layer must resolve through a semantic z token`,
  );
  assert.ok(layer.nativeRole, `${role}: native layer role missing`);
  assert.ok(layer.meaning, `${role}: layer meaning missing`);
}
for (const [name, definition] of Object.entries(
  NAVIGATION_OVERLAY_FEEDBACK_DEFINITIONS,
)) {
  const component = legacyComponents[name];
  const platform = componentPlatformMatrix[name];
  const projected = navigationOverlayFeedbackProjection.components[name];
  assert.equal(
    component?.status,
    "implemented",
    `${name}: U06 contract must attach only to an implemented catalog component`,
  );
  assert.ok(platform, `${name}: U06 platform contract missing`);
  assert.ok(projected, `${name}: U06 resolved projection missing`);
  assert.deepEqual(
    projected,
    resolveNavigationOverlayFeedbackContract(name, platform),
    `${name}: U06 resolved metadata drifted from typed resolver`,
  );
  assert.deepEqual(
    generatedComponents[name].navigationOverlayFeedbackRef,
    {
      path: "navigation-overlay-feedback.json",
      id: projected.canonicalComponent,
    },
    `${name}: AI compact U06 reference missing or stale`,
  );
  assert.ok(
    NAVIGATION_OVERLAY_FEEDBACK_FAMILIES.includes(definition.family),
    `${name}: invalid U06 family`,
  );
  assert.ok(
    NAVIGATION_OVERLAY_FEEDBACK_STATUSES.includes(definition.status),
    `${name}: invalid U06 status`,
  );
  assert.ok(definition.intent, `${name}: U06 intent missing`);
  assert.ok(
    definition.states.length > 0,
    `${name}: U06 state vocabulary missing`,
  );
  assert.ok(
    definition.accessibility.length > 0,
    `${name}: U06 accessibility obligations missing`,
  );
  assert.ok(
    definition.useWhen.length > 0,
    `${name}: U06 useWhen guidance missing`,
  );
  assert.ok(
    definition.avoidWhen.length > 0,
    `${name}: U06 avoidWhen guidance missing`,
  );
  for (const tokenRole of definition.tokenRoles)
    assert.ok(
      TOKEN_FAMILIES.includes(tokenRole),
      `${name}: invalid U06 token role ${tokenRole}`,
    );
  for (const layoutIntent of definition.layoutIntents)
    assert.ok(
      LAYOUT_INTENTS.includes(layoutIntent),
      `${name}: invalid U06 layout intent ${layoutIntent}`,
    );
  assert.equal(
    projected.platform,
    platform.platform,
    `${name}: U06 platform must be derived from component-platform`,
  );
  assert.equal(
    projected.rendererStrategy,
    platform.rendererStrategy,
    `${name}: U06 renderer strategy must be derived from component-platform`,
  );
}
const navigationGapIds = Object.keys(
  NAVIGATION_OVERLAY_FEEDBACK_PLANE.gapDecisions,
);
assert.equal(
  new Set(navigationGapIds).size,
  navigationGapIds.length,
  "navigation/overlay/feedback: duplicate gap decision",
);
for (const [name, gap] of Object.entries(
  NAVIGATION_OVERLAY_FEEDBACK_PLANE.gapDecisions,
)) {
  assert.equal(gap.id, name, `${name}: U06 gap decision id drifted`);
  assert.notEqual(
    gap.status,
    "implemented",
    `${name}: U06 gap cannot be implemented`,
  );
  assert.ok(gap.classification, `${name}: U06 gap classification missing`);
  assert.ok(gap.reason, `${name}: U06 gap rationale missing`);
  assert.ok(gap.aiGuidance, `${name}: U06 gap AI guidance missing`);
  if (gap.canonicalComponent)
    assert.equal(
      legacyComponents[gap.canonicalComponent]?.status,
      "implemented",
      `${name}: U06 gap canonical target is not implemented`,
    );
}
assert.equal(
  outputs["aliases.json"].Modal,
  "Dialog",
  "Modal must remain a compatibility alias of Dialog",
);
assert.equal(
  componentPlatformMatrix.NotificationCenter.adaptiveBehavior.pattern,
  "notification-center",
  "NotificationCenter adaptive pattern drifted",
);
assert.equal(
  componentPlatformMatrix.BottomNavigation.adaptiveBehavior.pattern,
  "bottom-navigation",
  "BottomNavigation must use its bounded mobile navigation pattern",
);
assert.equal(
  componentPlatformMatrix.Tabs.native.presentation,
  "native-platform-control",
  "Tabs native presentation must remain a platform control",
);
for (const name of ["DropdownMenu", "ContextMenu"]) {
  assert.equal(
    componentPlatformMatrix[name].adaptiveBehavior.pattern,
    "menu",
    `${name} must resolve through the shared menu pattern`,
  );
}
assert.equal(
  componentPlatformMatrix.Popover.adaptiveBehavior.pattern,
  "popover",
  "Popover must resolve through the anchored popover pattern",
);
for (const name of ["Drawer", "DetailDrawer"]) {
  assert.equal(
    componentPlatformMatrix[name].web.presentation,
    "web-edge-surface",
    `${name} web presentation must remain an edge surface`,
  );
  assert.equal(
    componentPlatformMatrix[name].native.presentation,
    "native-sheet",
    `${name} native alternative must remain a sheet surface`,
  );
}

const dataCollectionsProjection = outputs["data-collections.json"];
assert.ok(dataCollectionsProjection, "data collections: generated projection missing");
assert.equal(
  CANONICAL_CONTRACTS.dataCollections,
  DATA_COLLECTION_PLANE,
  "data collections: canonical registry does not point to typed source",
);
assert.equal(
  dataCollectionsProjection.id,
  DATA_COLLECTION_PLANE.id,
  "data collections: generated id drifted",
);
assert.equal(
  dataCollectionsProjection.sourceOfTruth,
  "packages/contracts/src/data-collections.ts",
  "data collections: typed source path missing",
);
assert.equal(
  outputs["index.json"].dataCollections.path,
  "data-collections.json",
  "data collections: generated index path missing",
);
assert.equal(
  outputs["agent-index.json"].entryPoints["data-collections"].source,
  "generated/data-collections.json",
  "data collections: agent entry point missing",
);
assert.deepEqual(
  dataCollectionsProjection.taxonomy,
  DATA_COLLECTION_PLANE.taxonomy,
  "data collections: taxonomy projection drifted",
);
assert.deepEqual(
  dataCollectionsProjection.ownership,
  DATA_COLLECTION_PLANE.ownership,
  "data collections: ownership projection drifted",
);
assert.deepEqual(
  dataCollectionsProjection.virtualization,
  DATA_COLLECTION_VIRTUALIZATION_BOUNDARIES,
  "data collections: virtualization boundary drifted",
);
assert.deepEqual(
  dataCollectionsProjection.nativeCanary,
  NATIVE_DATA_COLLECTION_CANARY,
  "data collections: native canary projection drifted",
);
for (const value of [
  ...DATA_COLLECTION_FAMILIES,
  ...DATA_COLLECTION_INVENTORY_STATUSES,
  ...DATA_COLLECTION_SELECTION_MODES,
  ...DATA_COLLECTION_SORT_MODES,
  ...DATA_COLLECTION_DENSITIES,
  ...DATA_COLLECTION_RESPONSIVE_PATTERNS,
  ...DATA_COLLECTION_STATES,
])
  assert.ok(value, `data collections: empty taxonomy value ${value}`);
for (const [name, definition] of Object.entries(DATA_COLLECTION_DEFINITIONS)) {
  const component = legacyComponents[name];
  const platform = componentPlatformMatrix[name];
  const projected = dataCollectionsProjection.components[name];
  assert.equal(
    component?.status,
    "implemented",
    `${name}: U07 contract must attach only to an implemented catalog component`,
  );
  assert.ok(platform, `${name}: U07 platform contract missing`);
  assert.ok(projected, `${name}: U07 resolved projection missing`);
  assert.deepEqual(
    projected,
    resolveDataCollectionContract(name, platform),
    `${name}: U07 resolved metadata drifted from typed source`,
  );
  assert.deepEqual(
    generatedComponents[name].dataCollectionRef,
    { path: "data-collections.json", id: projected.canonicalComponent },
    `${name}: AI compact U07 reference missing or stale`,
  );
  assert.ok(DATA_COLLECTION_FAMILIES.includes(definition.family));
  assert.ok(DATA_COLLECTION_INVENTORY_STATUSES.includes(definition.inventoryStatus));
  assert.ok(definition.states.length > 0, `${name}: U07 state vocabulary missing`);
  assert.ok(definition.accessibility.length > 0, `${name}: U07 accessibility missing`);
  assert.ok(definition.useWhen.length > 0, `${name}: U07 useWhen guidance missing`);
  assert.ok(definition.avoidWhen.length > 0, `${name}: U07 avoidWhen guidance missing`);
  assert.ok(definition.consumerOwns.length > 0, `${name}: U07 consumer ownership missing`);
  assert.ok(definition.ten4sevenOwns.length > 0, `${name}: U07 system ownership missing`);
  for (const tokenFamily of definition.tokenFamilies)
    assert.ok(TOKEN_FAMILIES.includes(tokenFamily), `${name}: invalid U07 token family ${tokenFamily}`);
  for (const layoutIntent of definition.layoutIntents)
    assert.ok(LAYOUT_INTENTS.includes(layoutIntent), `${name}: invalid U07 layout intent ${layoutIntent}`);
  for (const state of definition.states)
    assert.ok(DATA_COLLECTION_STATES.includes(state), `${name}: invalid U07 state ${state}`);
  assert.equal(
    projected.platform,
    platform.platform,
    `${name}: U07 platform must be derived from component-platform`,
  );
  assert.equal(
    projected.rendererStrategy,
    platform.rendererStrategy,
    `${name}: U07 renderer strategy must be derived from component-platform`,
  );
}
const dataGapIds = Object.keys(DATA_COLLECTION_GAP_DECISIONS);
assert.equal(
  new Set(dataGapIds).size,
  dataGapIds.length,
  "data collections: duplicate gap decision",
);
for (const [name, gap] of Object.entries(DATA_COLLECTION_GAP_DECISIONS)) {
  assert.equal(gap.id, name, `${name}: U07 gap decision id drifted`);
  assert.ok(gap.classification, `${name}: U07 gap classification missing`);
  assert.ok(
    DATA_COLLECTION_INVENTORY_STATUSES.includes(gap.inventoryStatus),
    `${name}: U07 gap inventory status invalid`,
  );
  assert.notEqual(
    gap.inventoryStatus,
    "EXISTING_STABLE",
    `${name}: U07 gap cannot be stable`,
  );
  assert.ok(gap.reason, `${name}: U07 gap rationale missing`);
  assert.ok(gap.aiGuidance, `${name}: U07 gap AI guidance missing`);
  if (gap.canonicalComponent)
    assert.equal(
      legacyComponents[gap.canonicalComponent]?.status,
      "implemented",
      `${name}: U07 gap canonical target is not implemented`,
    );
}
assert.equal(
  DATA_COLLECTION_GAP_DECISIONS.SelectableList.canonicalComponent,
  "List",
  "SelectableList must remain a List selection variant",
);
assert.equal(
  DATA_COLLECTION_GAP_DECISIONS.TreeSelect.canonicalComponent,
  "HierarchyPicker",
  "TreeSelect must remain a rejected duplicate of HierarchyPicker",
);
assert.deepEqual(
  componentPlatformMatrix.Table.semanticIntent,
  ["data-display"],
  "Table must remain a display-only semantic contract",
);
assert.equal(
  componentPlatformMatrix.Table.adaptiveBehavior?.pattern,
  "semantic-table",
  "Table must use the non-interactive semantic-table adaptive pattern",
);
assert.deepEqual(
  componentPlatformMatrix.DataTable.semanticIntent,
  ["data-display", "selection"],
  "DataTable must expose interactive collection intent",
);
assert.equal(
  componentPlatformMatrix.DataTable.interactionModel,
  "collection",
  "DataTable must remain a collection contract rather than a plain comparison table",
);
assert.equal(
  componentPlatformMatrix.AdvancedDataGrid.platform,
  "WEB",
  "AdvancedDataGrid must remain Web-only",
);
assert.equal(
  componentPlatformMatrix.AdvancedDataGrid.native.presentation,
  "not-applicable",
  "AdvancedDataGrid must not claim a native renderer",
);
assert.equal(
  componentPlatformMatrix.AdvancedDataGrid.nativeAlternative,
  "none",
  "AdvancedDataGrid must not advertise an unimplemented native alternative",
);

assert.deepEqual(
  inputContractProjection.deviceSources,
  DEVICE_SOURCE_CONTRACTS,
  "input contracts: device source projection drifted",
);
for (const [name, source] of Object.entries(DEVICE_SOURCE_CONTRACTS)) {
  assert.equal(
    source.classification,
    "NATIVE_ONLY",
    `${name}: source classification drifted`,
  );
  assert.equal(source.status, "planned", `${name}: source must remain planned`);
  assert.equal(
    source.nativeStatus,
    "planned",
    `${name}: native status drifted`,
  );
  assert.equal(
    source.webStatus,
    "not-applicable",
    `${name}: Web status drifted`,
  );
  assert.equal(
    legacyComponents[name],
    undefined,
    `${name}: device source must not be presented as an implemented component`,
  );
  assert.ok(
    source.capabilities.length > 0,
    `${name}: capability mapping missing`,
  );
  assert.ok(
    source.metadata.includes("permissionState"),
    `${name}: permission state missing`,
  );
  for (const obligation of source.accessibility)
    assert.ok(
      ACCESSIBILITY_OBLIGATIONS.includes(obligation),
      `${name}: invalid accessibility obligation ${obligation}`,
    );
}

for (const deferred of Object.values(DEFERRED_NATIVE_PLATFORM_CONTRACTS)) {
  assert.equal(deferred.platform, "NATIVE");
  assert.equal(deferred.kind, "NATIVE_ONLY");
  assert.equal(deferred.web.status, "not-applicable");
  assert.notEqual(deferred.web.status, "implemented");
  assert.equal(deferred.native.status, "planned");
}

const canaryPlatforms = {
  Button: "BOTH",
  Input: "BOTH",
  Select: "ADAPTIVE",
  Checkbox: "BOTH",
  Tabs: "BOTH",
  Modal: "ADAPTIVE",
  Drawer: "ADAPTIVE",
  Tooltip: "WEB",
  DatePicker: "ADAPTIVE",
  FileUpload: "ADAPTIVE",
  DataTable: "ADAPTIVE",
  TreeView: "ADAPTIVE",
  SplitPane: "WEB",
  Stepper: "BOTH",
  CommandMenu: "ADAPTIVE",
};
for (const [name, platform] of Object.entries(canaryPlatforms)) {
  assert.equal(
    componentPlatformMatrix[name].platform,
    platform,
    `${name}: representative canary platform classification drifted`,
  );
  assert.ok(
    componentPlatformMatrix[name].semanticIntent.length > 0,
    `${name}: representative canary semantic intent missing`,
  );
  assert.ok(
    componentPlatformMatrix[name].accessibilityObligations.length > 0,
    `${name}: representative canary accessibility obligations missing`,
  );
}

for (const [alias, canonical] of Object.entries(outputs["aliases.json"])) {
  const aliasContract = componentPlatformMatrix[alias];
  const canonicalContract = componentPlatformMatrix[canonical];
  assert.equal(
    aliasContract.canonicalId,
    canonical,
    `${alias}: platform alias did not resolve to ${canonical}`,
  );
  assert.equal(
    aliasContract.platform,
    canonicalContract.platform,
    `${alias}: platform classification differs from canonical target`,
  );
  assert.equal(
    aliasContract.rendererStrategy,
    canonicalContract.rendererStrategy,
    `${alias}: renderer strategy differs from canonical target`,
  );
}

for (const forbidden of [
  "platform-contracts.json",
  "native-decisions.json",
  "component-platform-map.json",
])
  assert.equal(
    fs.existsSync(path.join(repoRoot, forbidden)),
    false,
    `component platform: duplicate manifest exists at ${forbidden}`,
  );

assert.deepEqual(
  outputs["native-mobile.json"],
  NATIVE_MOBILE_CONTRACT,
  "native mobile: generated projection drifted from typed source",
);
assert.equal(
  CANONICAL_CONTRACTS.nativeMobile,
  NATIVE_MOBILE_CONTRACT,
  "native mobile: canonical registry does not point to typed source",
);
assert.equal(
  outputs["index.json"].nativeMobile.path,
  "native-mobile.json",
  "native mobile: generated index path missing",
);

assert.deepEqual(
  platformNeutral,
  PLATFORM_NEUTRAL_CONTRACT,
  "platform-neutral: generated projection drifted from typed source",
);
for (const state of [
  "unavailable",
  "disabled",
  "loading",
  "empty",
  "error",
  "permission-denied",
  "dependency-unavailable",
  "setup-required",
  "suspended",
  "offline",
  "pending",
  "conflicted",
])
  assert.ok(
    platformNeutral.presentationStates.includes(state),
    `platform-neutral: presentation state missing: ${state}`,
  );
for (const concern of [
  "business-data",
  "permissions",
  "entitlements",
  "persistence",
  "routing",
  "handlers",
])
  assert.ok(
    platformNeutral.ownership.consumer.includes(concern),
    `platform-neutral: consumer ownership missing: ${concern}`,
  );
for (const capability of [
  "process-workflow",
  "board-reorder",
  "drag-and-drop",
  "file-transfer",
  "progress-feedback",
  "state-transition",
  "quantitative-comparison",
  "trend-visualization",
  "distribution-visualization",
])
  assert.ok(
    platformNeutral.interactionCapabilities.includes(capability),
    `platform-neutral: interaction capability missing: ${capability}`,
  );
assert.equal(
  outputs["agent-index.json"].entryPoints["contract-plane"].source,
  "generated/platform-neutral.json",
  "platform-neutral: agent entry point missing",
);
assert.equal(
  outputs["index.json"].platformNeutral.path,
  "platform-neutral.json",
  "platform-neutral: generated index path missing",
);

assert.deepEqual(
  outputs["responsive-shell.json"],
  RESPONSIVE_CONTRACT,
  "responsive: generated projection drifted from typed source",
);
assert.deepEqual(
  outputs["module-states.json"],
  MODULE_STATE_CONTRACT,
  "module states: generated projection drifted from typed source",
);
assert.equal(
  CANONICAL_CONTRACTS.responsive,
  RESPONSIVE_CONTRACT,
  "responsive: canonical registry does not point to typed source",
);
assert.equal(
  CANONICAL_CONTRACTS.moduleStates,
  MODULE_STATE_CONTRACT,
  "module states: canonical registry does not point to typed source",
);
assert.equal(
  outputs["index.json"].responsive.path,
  "responsive-shell.json",
  "responsive: generated index path missing",
);
assert.equal(
  outputs["index.json"].moduleStates.path,
  "module-states.json",
  "module states: generated index path missing",
);
assert.deepEqual(
  Object.keys(RESPONSIVE_VIEWPORTS),
  ["desktop", "tablet", "mobile"],
  "responsive: viewport bands drifted",
);
assert.equal(
  RESPONSIVE_SHELL_CONTRACT.id,
  "app-shell-responsive",
  "responsive: shell id drifted",
);
assert.deepEqual(
  RESPONSIVE_SHELL_CONTRACT.grammar,
  ["AppShell", "navigation/context", "PageHeader", "bounded route content"],
  "responsive: shell grammar drifted",
);
for (const behaviorId of [
  "data-table",
  "filter-bar",
  "master-detail",
  "entity-list",
  "entity-detail",
  "entity-form",
  "kpi-cluster",
  "route-action-group",
  "long-form-validation",
]) {
  const behavior = RESPONSIVE_COMPONENT_BEHAVIORS[behaviorId];
  assert.ok(behavior, `responsive: required behavior missing: ${behaviorId}`);
  assert.equal(
    behavior.touchTargetToken,
    "--t7-touch-target-min",
    `${behaviorId}: shared touch target token missing`,
  );
  for (const viewport of ["desktop", "tablet", "mobile"])
    assert.ok(
      behavior[viewport].mode && behavior[viewport].overflow,
      `${behaviorId}: ${viewport} behavior is incomplete`,
    );
}
for (const recipeName of Object.keys(RESPONSIVE_RECIPE_BINDINGS)) {
  const projected = outputs["recipes.compact.json"][recipeName];
  assert.ok(projected, `${recipeName}: responsive recipe projection missing`);
  assert.deepEqual(
    RESPONSIVE_CONTRACT.recipes[recipeName],
    RESPONSIVE_RECIPE_BINDINGS[recipeName],
    `${recipeName}: responsive binding drifted from the typed contract`,
  );
}
assert.deepEqual(
  Object.keys(MODULE_STATE_CONTRACT.states),
  MODULE_STATE_IDS,
  "module states: required state set drifted",
);
for (const state of MODULE_STATE_IDS) {
  const pattern = MODULE_STATE_CONTRACT.states[state];
  assert.equal(pattern.id, state, `module state ${state}: id drifted`);
  assert.ok(pattern.defaultTitle, `module state ${state}: title missing`);
  assert.ok(
    pattern.defaultDescription,
    `module state ${state}: description missing`,
  );
  assert.deepEqual(
    pattern.consumerProvides,
    [
      "applicability",
      "authorization",
      "entitlement",
      "tenant-or-resource-context",
      "lifecycle-transition",
    ],
    `module state ${state}: consumer ownership boundary drifted`,
  );
}
for (const forbidden of [
  "entitlement evaluation",
  "permission evaluation",
  "tenant or resource fetching",
  "lifecycle mutation",
])
  assert.ok(
    MODULE_STATE_CONTRACT.forbiddenInRenderer.includes(forbidden),
    `module states: renderer boundary missing ${forbidden}`,
  );

const controlPlane = outputs["saas-control-plane.json"];
assert.deepEqual(
  controlPlane,
  SAAS_CONTROL_PLANE_CONTRACT,
  "SaaS control plane: generated projection drifted from typed source",
);
assert.equal(
  CANONICAL_CONTRACTS.saasControlPlane,
  SAAS_CONTROL_PLANE_CONTRACT,
  "SaaS control plane: canonical registry does not point to typed source",
);
assert.equal(
  outputs["index.json"].saasControlPlane.path,
  "saas-control-plane.json",
  "SaaS control plane: generated index path missing",
);
assert.deepEqual(
  Object.keys(controlPlane.patterns),
  CONTROL_PLANE_PATTERN_IDS,
  "SaaS control plane: pattern set drifted",
);
assert.deepEqual(
  controlPlane.stateCoverage,
  CONTROL_PLANE_PATTERN_STATES,
  "SaaS control plane: shared presentation state set drifted",
);
for (const patternId of CONTROL_PLANE_PATTERN_IDS) {
  const controlPlanePattern = controlPlane.patterns[patternId];
  assert.equal(
    controlPlanePattern.id,
    patternId,
    `SaaS control plane ${patternId}: id drifted`,
  );
  for (const field of [
    "purpose",
    "intentPhrases",
    "components",
    "states",
    "responsive",
    "accessibility",
    "tokens",
    "systemOwns",
    "consumerOwns",
    "referenceView",
  ])
    assert.ok(
      controlPlanePattern[field] &&
        (typeof controlPlanePattern[field] === "string" ||
          Object.keys(controlPlanePattern[field]).length > 0),
      `SaaS control plane ${patternId}: ${field} is incomplete`,
    );
  for (const viewport of ["desktop", "tablet", "mobile"])
    assert.ok(
      controlPlanePattern.responsive[viewport],
      `SaaS control plane ${patternId}: responsive ${viewport} is missing`,
    );
  for (const componentName of [
    ...controlPlanePattern.components,
    ...controlPlanePattern.optionalComponents,
  ])
    assert.equal(
      legacyComponents[componentName]?.status,
      "implemented",
      `SaaS control plane ${patternId}: ${componentName} is not implemented`,
    );
  for (const tokenRole of controlPlanePattern.tokens)
    assert.ok(
      FOUNDATION_CONTRACT.componentTokenRoles.targets[tokenRole],
      `SaaS control plane ${patternId}: token role ${tokenRole} is not canonical`,
    );
  if (controlPlanePattern.moduleStates)
    for (const state of controlPlanePattern.moduleStates)
      assert.ok(
        MODULE_STATE_IDS.includes(state),
        `SaaS control plane ${patternId}: unknown module state ${state}`,
      );
}
for (const referenceViewId of CONTROL_PLANE_REFERENCE_VIEW_IDS) {
  const referencePatternIds = controlPlane.referenceViews[referenceViewId];
  assert.ok(
    referencePatternIds?.length,
    `SaaS control plane ${referenceViewId}: reference view is empty`,
  );
  for (const patternId of referencePatternIds)
    assert.equal(
      controlPlane.patterns[patternId].referenceView,
      referenceViewId,
      `SaaS control plane ${patternId}: reference view mismatch`,
    );
}

const erpDensity = outputs["erp-density.json"];
assert.deepEqual(
  erpDensity,
  ERP_DENSITY_CONTRACT,
  "ERP density: generated projection drifted from typed source",
);
assert.equal(
  CANONICAL_CONTRACTS.erpDensity,
  ERP_DENSITY_CONTRACT,
  "ERP density: canonical registry does not point to typed source",
);
assert.equal(
  outputs["index.json"].erpDensity.path,
  "erp-density.json",
  "ERP density: generated index path missing",
);
assert.deepEqual(
  Object.keys(erpDensity.patterns),
  ERP_DENSITY_PATTERN_IDS,
  "ERP density: pattern set drifted",
);
assert.deepEqual(
  erpDensity.states,
  ERP_DENSITY_STATES,
  "ERP density: state set drifted",
);
for (const patternId of ERP_DENSITY_PATTERN_IDS) {
  const pattern = erpDensity.patterns[patternId];
  assert.equal(pattern.id, patternId, `ERP density ${patternId}: id drifted`);
  for (const field of [
    "purpose",
    "components",
    "optionalComponents",
    "states",
    "responsive",
    "tokens",
    "consumerOwns",
    "unsupportedNeeds",
    "intentPhrases",
    "aiGuidance",
    "reference",
  ])
    assert.ok(
      pattern[field] &&
        (typeof pattern[field] === "string" ||
          Object.keys(pattern[field]).length > 0),
      `ERP density ${patternId}: ${field} is incomplete`,
    );
  for (const viewport of ["desktop", "tablet", "mobile"])
    assert.ok(
      pattern.responsive[viewport],
      `ERP density ${patternId}: responsive ${viewport} is missing`,
    );
  for (const componentName of [
    ...pattern.components,
    ...pattern.optionalComponents,
  ])
    assert.equal(
      legacyComponents[componentName]?.status,
      "implemented",
      `ERP density ${patternId}: ${componentName} is not implemented`,
    );
  for (const tokenRole of pattern.tokens)
    assert.ok(
      FOUNDATION_CONTRACT.componentTokenRoles.targets[tokenRole],
      `ERP density ${patternId}: token role ${tokenRole} is not canonical`,
    );
  for (const state of pattern.states)
    assert.ok(
      ERP_DENSITY_STATES.includes(state),
      `ERP density ${patternId}: unknown state ${state}`,
    );
}
for (const state of ["loading", "empty", "error", "conflicted", "read-only"])
  assert.ok(
    erpDensity.states.includes(state),
    `ERP density: required state missing: ${state}`,
  );
assert.equal(
  erpDensity.retrieval.componentStatusRule,
  "implemented-only",
  "ERP density: retrieval must exclude unimplemented components",
);

const workflowProductivity = outputs["workflow-productivity.json"];
assert.deepEqual(
  workflowProductivity,
  WORKFLOW_PRODUCTIVITY_CONTRACT,
  "workflow productivity: generated projection drifted from typed source",
);
assert.equal(
  CANONICAL_CONTRACTS.workflowProductivity,
  WORKFLOW_PRODUCTIVITY_CONTRACT,
  "workflow productivity: canonical registry does not point to typed source",
);
assert.equal(
  outputs["index.json"].workflowProductivity.path,
  "workflow-productivity.json",
  "workflow productivity: generated index path missing",
);
assert.equal(
  workflowProductivity.componentCount,
  WORKFLOW_PRODUCTIVITY_COMPONENTS.length,
  "workflow productivity: component count drifted",
);
assert.equal(
  new Set(workflowProductivity.components).size,
  workflowProductivity.componentCount,
  "workflow productivity: component list contains duplicates",
);
for (const componentName of workflowProductivity.components)
  assert.equal(
    legacyComponents[componentName]?.status,
    "implemented",
    `workflow productivity: ${componentName} is not implemented`,
  );
for (const tokenRole of workflowProductivity.tokens)
  assert.ok(
    FOUNDATION_CONTRACT.componentTokenRoles.targets[tokenRole],
    `workflow productivity: token role ${tokenRole} is not canonical`,
  );
for (const field of [
  "consumerOwns",
  "ten4sevenOwns",
  "accessibility",
  "deferred",
  "showrooms",
])
  assert.ok(
    workflowProductivity[field]?.length,
    `workflow productivity: ${field} metadata missing`,
  );
assert.equal(
  workflowProductivity.dragDrop.keyboardAlternative.length > 0,
  true,
  "workflow productivity: drag/drop keyboard alternative missing",
);

const editorBuilderAi = outputs["editor-builder-ai.json"];
assert.deepEqual(
  editorBuilderAi,
  EDITOR_BUILDER_AI_CONTRACT,
  "editors/builders/AI: generated projection drifted from typed source",
);
assert.equal(
  CANONICAL_CONTRACTS.editorBuilderAi,
  EDITOR_BUILDER_AI_CONTRACT,
  "editors/builders/AI: canonical registry does not point to typed source",
);
assert.equal(
  outputs["index.json"].editorBuilderAi.path,
  "editor-builder-ai.json",
  "editors/builders/AI: generated index path missing",
);
assert.equal(
  outputs["agent-index.json"].entryPoints["editors-builders-ai"].source,
  "generated/editor-builder-ai.json",
  "editors/builders/AI: agent entry point missing",
);
assert.equal(
  editorBuilderAi.componentCount,
  EDITOR_BUILDER_AI_COMPONENTS.length,
  "editors/builders/AI: component count drifted",
);
assert.equal(
  new Set(editorBuilderAi.components).size,
  editorBuilderAi.componentCount,
  "editors/builders/AI: component list contains duplicates",
);
for (const componentName of editorBuilderAi.components)
  assert.equal(
    legacyComponents[componentName]?.status,
    "implemented",
    `editors/builders/AI: ${componentName} is not implemented`,
  );
for (const tokenRole of editorBuilderAi.tokens)
  assert.ok(
    FOUNDATION_CONTRACT.componentTokenRoles.targets[tokenRole],
    `editors/builders/AI: token role ${tokenRole} is not canonical`,
  );
for (const field of [
  "packageBoundary",
  "dependencyLicenseBundleMatrix",
  "engineRule",
  "aiBoundary",
  "powerUser",
  "responsive",
  "accessibility",
  "themeStudio",
  "aiMetadata",
  "deferred",
])
  assert.ok(
    editorBuilderAi[field] &&
      (Array.isArray(editorBuilderAi[field]) ||
        Object.keys(editorBuilderAi[field]).length > 0),
    `editors/builders/AI: ${field} metadata missing`,
  );
assert.equal(
  editorBuilderAi.dependencyLicenseBundleMatrix.length,
  editorBuilderAi.componentCount,
  "editors/builders/AI: dependency matrix must cover every component",
);
assert.equal(
  editorBuilderAi.packageBoundary.runtimeDependencies.length,
  0,
  "editors/builders/AI: advanced contract must not add runtime engine dependencies",
);
assert.ok(
  editorBuilderAi.aiBoundary.consumerOwns.includes("model and provider policy"),
  "editors/builders/AI: model/provider authority must remain consumer-owned",
);
assert.ok(
  editorBuilderAi.deferred.some((item) => item.includes("Rich text")),
  "editors/builders/AI: rich editor engine boundary missing",
);

const aliases = outputs["aliases.json"];
const resolveAlias = (name) => {
  const seen = new Set();
  let current = name;
  while (aliases[current]) {
    assert.equal(
      seen.has(current),
      false,
      `alias ${name}: alias cycle detected at ${current}`,
    );
    seen.add(current);
    current = aliases[current];
  }
  return current;
};
for (const [alias, canonical] of Object.entries(aliases)) {
  assert.ok(legacyComponents[alias], `alias ${alias}: source entry missing`);
  assert.ok(
    legacyComponents[canonical],
    `alias ${alias}: canonical target ${canonical} missing`,
  );
  assert.equal(
    legacyComponents[canonical].status,
    "implemented",
    `alias ${alias}: canonical target is not implemented`,
  );
  assert.equal(
    legacyComponents[alias].aliasOf,
    canonical,
    `alias ${alias}: legacy catalog drifted from canonical alias map`,
  );
  assert.equal(
    resolveAlias(alias),
    canonical,
    `alias ${alias}: does not resolve to its canonical target`,
  );
}

const componentTokenRoles = FOUNDATION_CONTRACT.componentTokenRoles;
const runtimeTokenNames = new Set(
  Object.keys(buildThemeVariables(resolveTheme())),
);
for (const [category, roles] of Object.entries(componentTokenRoles.sets)) {
  assert.equal(
    new Set(roles).size,
    roles.length,
    `component token roles: repeated role in ${category}`,
  );
  for (const role of roles)
    assert.ok(
      componentTokenRoles.targets[role],
      `component token roles: ${category} references unmapped role ${role}`,
    );
}
for (const [role, targets] of Object.entries(componentTokenRoles.targets)) {
  assert.ok(
    Array.isArray(targets) && targets.length > 0,
    `component token roles: ${role} has no runtime target`,
  );
  for (const target of targets)
    assert.ok(
      runtimeTokenNames.has(target),
      `component token roles: ${role} targets missing runtime variable ${target}`,
    );
}
for (const [componentName, component] of Object.entries(legacyComponents)) {
  assert.equal(
    new Set(component.tokens).size,
    component.tokens.length,
    `${componentName}: repeated token role in catalog contract`,
  );
  for (const role of component.tokens)
    assert.ok(
      componentTokenRoles.targets[role],
      `${componentName}: token role ${role} is not in the canonical role map`,
    );
  assert.equal(
    new Set(component.recipes).size,
    component.recipes.length,
    `${componentName}: repeated recipe reference in catalog contract`,
  );
  for (const recipeName of component.recipes)
    if (recipeName !== "all")
      assert.ok(
        legacyRecipes[recipeName],
        `${componentName}: unknown recipe reference ${recipeName}`,
      );
}

for (const [recipeName, recipe] of Object.entries(legacyRecipes)) {
  const allComponents = [...recipe.components, ...(recipe.optional ?? [])];
  assert.equal(
    new Set(allComponents).size,
    allComponents.length,
    `${recipeName}: repeated component reference in catalog contract`,
  );
  for (const componentName of allComponents)
    assert.equal(
      legacyComponents[componentName]?.status,
      "implemented",
      `${recipeName}: ${componentName} is not implemented`,
    );
}

const entityList = outputs["recipes.compact.json"]["entity-list"];
const required = new Set(entityList.required);
const conditional = new Set(Object.keys(entityList.conditional));
const forbidden = new Set(entityList.forbid);
assert.equal(
  [...required].some((name) => conditional.has(name)),
  false,
  "entity-list: required and conditional decisions overlap",
);
assert.equal(
  [...required].some((name) => forbidden.has(name)),
  false,
  "entity-list: required and forbid decisions overlap",
);
assert.equal(
  [...conditional].some((name) => forbidden.has(name)),
  false,
  "entity-list: conditional and forbid decisions overlap",
);
for (const state of entityList.states)
  assert.ok(
    ENTITY_LIST_STATES.includes(state),
    `entity-list: invalid state ${state}`,
  );
for (const mode of [
  entityList.responsive.desktop,
  entityList.responsive.tablet,
  entityList.responsive.mobile,
  entityList.responsive.navigation,
  entityList.responsive.detail,
])
  if (mode !== undefined)
    assert.ok(
      RESPONSIVE_MODES.includes(mode),
      `entity-list: invalid responsive mode ${mode}`,
    );

assert.deepEqual(
  entityList.components,
  ENTITY_LIST_CONTRACT.components,
  "entity-list: compact component composition drifted from the typed contract",
);

const operationalRecipeNames = [
  "readiness-review",
  "process-workspace",
  "decision-workspace",
  "activity-audit",
  "operational-kanban",
  "exception-queue",
  "control-tower",
  "load-planning",
  "route-planning",
  "receiving-console",
  "resource-forecast",
  "entity-360",
];
const operationalParity = (name, recipe) => ({
  id: name,
  displayName: recipe.displayName,
  purpose: recipe.purpose,
  profiles: [...recipe.profiles],
  components: [...recipe.components],
  optional: [...(recipe.optional ?? [])],
  icons: [...(recipe.icons ?? [])],
  operational: recipe.operational,
  references: [...(recipe.references ?? [])],
});

for (const recipeName of operationalRecipeNames) {
  const canonical = OPERATIONAL_PATTERN_CONTRACTS[recipeName];
  const registered = CANONICAL_CONTRACTS.recipes[recipeName];
  const legacy = legacyRecipes[recipeName];
  const projected = outputs["recipes.compact.json"][recipeName];

  assert.ok(canonical, `${recipeName}: typed operational contract missing`);
  assert.equal(
    registered,
    canonical,
    `${recipeName}: canonical registry does not point to typed source`,
  );
  assert.ok(legacy, `${recipeName}: legacy parity source missing`);
  assert.ok(projected, `${recipeName}: generated projection missing`);
  assert.equal(
    projected.source,
    "canonical-contract",
    `${recipeName}: generated projection did not switch to canonical source`,
  );
  assert.deepEqual(
    operationalParity(recipeName, canonical),
    operationalParity(recipeName, legacy),
    `${recipeName}: typed contract changed the legacy semantic payload`,
  );
  assert.deepEqual(
    operationalParity(recipeName, projected),
    operationalParity(recipeName, canonical),
    `${recipeName}: generated projection drifted from typed source`,
  );

  const operational = canonical.operational;
  assert.ok(operational, `${recipeName}: operational metadata missing`);
  assert.equal(operational.maturity, "mature");
  for (const field of [
    "useWhen",
    "avoidWhen",
    "anatomy",
    "requiredSemantics",
    "optionalSemantics",
    "accessibility",
    "antiPatterns",
    "relationships",
  ])
    assert.ok(
      Array.isArray(operational[field]) && operational[field].length > 0,
      `${recipeName}: operational ${field} missing`,
    );
  assert.equal(
    operational.referencePath,
    "/operational-patterns",
    `${recipeName}: operational reference path drifted`,
  );
  assert.deepEqual(
    Object.keys(operational.responsive).sort(),
    ["desktop", "mobile", "tablet"],
    `${recipeName}: operational responsive contract incomplete`,
  );
  if (recipeName === "readiness-review") {
    assert.deepEqual(
      canonical.states,
      READINESS_REVIEW_STATES,
      "readiness-review: typed state contract drifted",
    );
    for (const state of ["ready", "blocked", "incomplete"])
      assert.ok(
        canonical.states.includes(state),
        `readiness-review: required state missing: ${state}`,
      );
    assert.match(
      canonical.operational.aiGuidance,
      /Decision Workspace/,
      "readiness-review: decision differentiation guidance missing",
    );
    assert.match(
      canonical.operational.antiPatterns.join(" "),
      /calculating eligibility/i,
      "readiness-review: business-rule ownership boundary missing",
    );
  }
}
assert.deepEqual(
  normalizeThemeProfile(themeProfileToLegacyConfig(DEFAULT_THEME_PROFILE)),
  DEFAULT_THEME_PROFILE,
  "ThemeProfile: legacy adapter does not round-trip the default profile",
);

const exactSourceProfile = normalizeThemeProfile({
  accent: exactColor("#d4451a"),
  palette: "slate",
  primary: exactColor("#318139"),
});
assert.deepEqual(exactSourceProfile.action.primary, {
  kind: "exact",
  value: "#318139",
});
assert.deepEqual(exactSourceProfile.accent.source, {
  kind: "exact",
  value: "#D4451A",
});
assert.deepEqual(
  normalizeThemeProfile(themeProfileToLegacyConfig(exactSourceProfile)),
  exactSourceProfile,
  "ThemeProfile: exact action and accent sources do not round-trip",
);

assert.deepEqual(
  THEME_RECIPE_NAMES,
  ["enterprise", "product", "editorial", "commerce"],
  "Theme recipes: curated v2 recipe set drifted",
);
for (const recipeName of THEME_RECIPE_NAMES) {
  const recipe = THEME_RECIPES[recipeName];
  const legacy = themeRecipeToLegacyConfig(recipe);
  const normalized = normalizeThemeProfile(legacy);
  assert.equal(recipe.id, recipeName, `${recipeName}: id drifted`);
  assert.equal(
    normalized.palette.base,
    recipe.profile.palette.base,
    `${recipeName}: base palette adapter drifted`,
  );
  assert.equal(
    normalized.action.primary,
    recipe.profile.action.primary,
    `${recipeName}: primary action adapter drifted`,
  );
  assert.equal(
    normalized.density.preset,
    recipe.profile.density.preset,
    `${recipeName}: density adapter drifted`,
  );
}
assert.deepEqual(
  resolveRuntimePreferences({
    appearance: "system",
    density: "compact",
    contrast: "more",
    motion: "reduced",
  }),
  {
    appearance: "system",
    density: "compact",
    contrast: "more",
    motion: "reduced",
  },
  "Runtime preferences: valid user choices were not preserved",
);

const defaultThemeStudio = createDefaultThemeStudioConfig();
const neutralEditorialThemeStudio = resolveThemeStudioConfig({
  ...defaultThemeStudio,
  baseRecipe: "editorial",
});
assert.equal(
  neutralEditorialThemeStudio.effectiveRecipe,
  "editorial",
  "Theme Studio: neutral profile must preserve the selected base recipe",
);
assert.equal(
  neutralEditorialThemeStudio.profile.density.preset,
  "comfortable",
  "Theme Studio: neutral profile must preserve the base recipe density",
);
const erpThemeStudio = resolveThemeStudioConfig({
  ...defaultThemeStudio,
  baseRecipe: "commerce",
  productProfile: "aapm-erp",
  overrides: { palette: "indigo", viewport: "compact" },
});
assert.equal(
  erpThemeStudio.effectiveRecipe,
  "enterprise",
  "Theme Studio: product profile must own its effective recipe",
);
assert.equal(
  erpThemeStudio.profile.density.preset,
  "dense",
  "Theme Studio: product profile density must resolve before overrides",
);
assert.equal(
  erpThemeStudio.profile.palette.base,
  "indigo",
  "Theme Studio: explicit palette override must resolve last",
);
assert.equal(
  erpThemeStudio.composition.contentMax,
  "1180px",
  "Theme Studio: viewport preset must resolve through the composition contract",
);
assert.equal(
  erpThemeStudio.axisStates.profile,
  "profile",
  "Theme Studio: profile ownership must be observable",
);
assert.equal(
  erpThemeStudio.axisStates.brand,
  "overridden",
  "Theme Studio: explicit brand overrides must be observable",
);
const serializedThemeStudio = serializeThemeStudioConfig(erpThemeStudio.config);
assert.equal(
  parseThemeStudioConfig(serializedThemeStudio)?.schemaVersion,
  THEME_STUDIO_SCHEMA_VERSION,
  "Theme Studio: serialized config must round-trip its version",
);
assert.equal(
  parseThemeStudioConfig('{"schemaVersion":"0.0"}'),
  null,
  "Theme Studio: unknown config versions must be rejected",
);
const resetBrand = resetThemeStudioAxis(erpThemeStudio.config, "brand");
assert.equal(
  resolveThemeStudioConfig(resetBrand).axisStates.brand,
  "inherited",
  "Theme Studio: resetting one axis must not leave the axis overridden",
);
assert.ok(
  diffThemeStudioConfig(defaultThemeStudio, erpThemeStudio.config).includes(
    "profile",
  ),
  "Theme Studio: config diff must report product profile changes",
);

const fullBytes =
  Buffer.byteLength(JSON.stringify(legacyComponents)) +
  Buffer.byteLength(JSON.stringify(legacyRecipes));
const compactBytes =
  Buffer.byteLength(JSON.stringify(outputs["components.compact.json"])) +
  Buffer.byteLength(JSON.stringify(outputs["recipes.compact.json"]));
assert.ok(
  compactBytes < fullBytes * 0.75,
  `compact projection is not materially smaller (${compactBytes}/${fullBytes} bytes)`,
);

console.log(
  `Contract gate verified: ${Object.keys(aliases).length} aliases, ${Object.keys(legacyRecipes).length} recipes, entity-list decision metadata, ${operationalRecipeNames.length} typed operational recipes with semantic parity, ThemeProfile round-trip, and compact retrieval at ${compactBytes}/${fullBytes} bytes.`,
);
