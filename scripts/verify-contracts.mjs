import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  CANONICAL_CONTRACTS,
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
  resolveRuntimePreferences,
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

const fullBytes =
  Buffer.byteLength(JSON.stringify(legacyComponents)) +
  Buffer.byteLength(JSON.stringify(legacyRecipes));
const compactBytes =
  Buffer.byteLength(JSON.stringify(outputs["components.compact.json"])) +
  Buffer.byteLength(JSON.stringify(outputs["recipes.compact.json"]));
assert.ok(
  compactBytes < fullBytes * 0.6,
  `compact projection is not materially smaller (${compactBytes}/${fullBytes} bytes)`,
);

console.log(
  `Contract gate verified: ${Object.keys(aliases).length} aliases, ${Object.keys(legacyRecipes).length} recipes, entity-list decision metadata, ${operationalRecipeNames.length} typed operational recipes with semantic parity, ThemeProfile round-trip, and compact retrieval at ${compactBytes}/${fullBytes} bytes.`,
);
