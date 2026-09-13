import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { FOUNDATION_CONTRACT } from "../packages/contracts/src/foundation.ts";
import {
  AI_SELECTION_INTENTS,
  COMPONENT_CONTRACT_PLANE,
  resolveComponentPlatformContract,
} from "../packages/contracts/src/component-platform.ts";
import {
  INPUT_CONTRACT_DEFINITIONS,
  INPUT_CONTRACT_PLANE,
  resolveInputContract,
} from "../packages/contracts/src/input-contracts.ts";
import {
  NAVIGATION_OVERLAY_FEEDBACK_DEFINITIONS,
  NAVIGATION_OVERLAY_FEEDBACK_PLANE,
  resolveNavigationOverlayFeedbackContract,
} from "../packages/contracts/src/navigation-overlay-feedback.ts";
import {
  DATA_COLLECTION_DEFINITIONS,
  DATA_COLLECTION_PLANE,
  NATIVE_DATA_COLLECTION_CANARY,
  resolveDataCollectionContract,
} from "../packages/contracts/src/data-collections.ts";
import {
  NATIVE_VISUALIZATION_CANARY,
  VISUALIZATION_COMPONENT_DEFINITIONS,
  VISUALIZATION_SCHEDULING_MAPS_PLANE,
  resolveVisualizationComponentContract,
} from "../packages/contracts/src/visualization.ts";
import { WORKFLOW_COMPONENT_PATTERN_LINKS } from "../packages/contracts/src/workflow-productivity.ts";
import {
  COMPOSITION_BLOCKS,
  COMPOSITION_CONTRACT,
  COMPOSITION_RECIPES,
  NATIVE_COMPOSITION_CANARY,
  PRODUCT_PROFILE_CAPABILITIES,
} from "../packages/contracts/src/composition.ts";
import {
  NATIVE_ALTERNATE_COMPONENT_IDS,
  NATIVE_PUBLIC_COMPONENT_EXPORTS,
  NATIVE_EXPO_CONTRACT,
  NATIVE_RENDERER_COMPONENT_IDS,
} from "../packages/contracts/src/native-expo.ts";

const repoRoot = path.resolve(import.meta.dirname, "..");
const generatedRoot = path.join(repoRoot, "generated");
const packageGeneratedRoot = path.join(repoRoot, "packages/agent/generated");
const projectionRoots = [generatedRoot, packageGeneratedRoot];

const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));

const canonicalModule = await import(
  pathToFileURL(path.join(repoRoot, "packages/contracts/src/canonical.ts")).href
);

const { CANONICAL_CONTRACTS, ALIAS_MAP, OWNERSHIP_RULES } = canonicalModule;

const componentContractArrays = [
  "states",
  "accessibility",
  "responsive",
  "motion",
  "tokens",
  "api",
  "relatedComponents",
  "alternativeTo",
  "composesWith",
  "usedByPatterns",
];
const componentCompactArrays = componentContractArrays.filter(
  (field) => field !== "api" && field !== "accessibility",
);

function projectComponentContract(component, fields = componentContractArrays) {
  return Object.fromEntries(
    fields
      .filter((field) => Array.isArray(component[field]))
      .map((field) => [field, component[field]]),
  );
}

function projectComponentPublicApi(name, platform) {
  return {
    package: "@ten4seven/ui",
    export: name,
    ...(NATIVE_PUBLIC_COMPONENT_EXPORTS[name]
      ? { nativeExport: NATIVE_PUBLIC_COMPONENT_EXPORTS[name] }
      : {}),
    ...(platform.platform === "WEB"
      ? {}
      : { nativePackage: "@ten4seven/native/renderer" }),
  };
}

function projectComponent(name, component) {
  // Keep the index projection retrieval-friendly; verbose API and
  // accessibility guidance live in the component shard selected by the
  // default retrieval pattern.
  const platform = resolveComponentPlatformContract(name, component);
  return {
    id: name,
    displayName: component.displayName,
    status: component.status,
    category: component.category,
    ...(component.level ? { level: component.level } : {}),
    ...(component.maturity ? { maturity: component.maturity } : {}),
    purpose: component.purpose,
    source: component.source,
    ...(component.aliasOf ? { aliasOf: component.aliasOf } : {}),
    ...(component.recipes ? { recipes: component.recipes } : {}),
    ...(component.importantProps
      ? { importantProps: component.importantProps }
      : {}),
    ...projectComponentContract(component, componentCompactArrays),
    ...projectComponentInputContract(name, component, true),
    ...projectNavigationOverlayFeedbackContract(name, component, true),
    ...projectDataCollectionContract(name, component, true),
    ...projectVisualizationContract(name, component, true),
    ...projectWorkflowProductivityContract(name, true),
    ...projectComponentPlatform(platform, true),
  };
}

function projectComponentShard(name, component) {
  const platform = resolveComponentPlatformContract(name, component);
  return {
    id: name,
    displayName: component.displayName,
    status: component.status,
    category: component.category,
    purpose: component.purpose,
    source: component.source,
    ...(component.useWhen ? { useWhen: component.useWhen } : {}),
    ...(component.avoidWhen ? { avoidWhen: component.avoidWhen } : {}),
    ...(component.importantProps
      ? { importantProps: component.importantProps }
      : {}),
    ...projectComponentContract(component),
    ...projectComponentInputContract(name, component),
    ...projectNavigationOverlayFeedbackContract(name, component),
    ...projectDataCollectionContract(name, component),
    ...projectVisualizationContract(name, component),
    ...projectWorkflowProductivityContract(name),
    ...projectComponentPlatform(platform),
    publicApi: projectComponentPublicApi(name, platform),
  };
}

function projectComponentInputContract(name, component, compact = false) {
  if (!INPUT_CONTRACT_DEFINITIONS[name]) return {};
  const platform = resolveComponentPlatformContract(name, component);
  const input = resolveInputContract(name, platform);
  if (!input) return {};
  if (!compact) return { inputContract: input };
  return {
    inputContractRef: {
      path: "input-contracts.json",
      id: input.canonicalComponent,
    },
  };
}

function projectNavigationOverlayFeedbackContract(
  name,
  component,
  compact = false,
) {
  if (!NAVIGATION_OVERLAY_FEEDBACK_DEFINITIONS[name]) return {};
  const platform = resolveComponentPlatformContract(name, component);
  const contract = resolveNavigationOverlayFeedbackContract(name, platform);
  if (!contract) return {};
  if (!compact) return { navigationOverlayFeedback: contract };
  return {
    navigationOverlayFeedbackRef: {
      path: "navigation-overlay-feedback.json",
      id: contract.canonicalComponent,
    },
  };
}

function projectDataCollectionContract(name, component, compact = false) {
  if (!DATA_COLLECTION_DEFINITIONS[name]) return {};
  const platform = resolveComponentPlatformContract(name, component);
  const contract = resolveDataCollectionContract(name, platform);
  if (!contract) return {};
  if (compact)
    return {
      dataCollectionRef: {
        path: "data-collections.json",
        id: contract.canonicalComponent,
      },
    };
  return { dataCollection: contract };
}

function projectVisualizationContract(name, component, compact = false) {
  if (!VISUALIZATION_COMPONENT_DEFINITIONS[name]) return {};
  const platform = resolveComponentPlatformContract(name, component);
  const contract = resolveVisualizationComponentContract(name, platform);
  if (!contract) return {};
  if (compact)
    return {
      visualizationRef: {
        path: "visualization-scheduling-maps.json",
        id: contract.canonicalComponent,
      },
    };
  return { visualization: contract };
}

function projectWorkflowProductivityContract(name, compact = false) {
  const patterns = WORKFLOW_COMPONENT_PATTERN_LINKS[name];
  if (!patterns) return {};
  const reference = {
    path: "workflow-productivity.json",
    component: name,
    patterns,
  };
  return compact
    ? { workflowProductivityRef: reference }
    : { workflowProductivity: reference };
}

function projectComponentPlatform(platform, compact = false) {
  if (compact)
    return {
      kind: platform.kind,
      platform: platform.platform,
      rendererStrategy: platform.rendererStrategy,
      webStatus: platform.web.status,
      nativeStatus: platform.native.status,
      semanticIntent: platform.semanticIntent,
      interactionModel: platform.interactionModel,
      inputModalities: platform.inputModalities,
      ...(platform.adaptiveBehavior
        ? { adaptivePattern: platform.adaptiveBehavior.pattern }
        : {}),
      ...(platform.nativeAlternative
        ? { nativeAlternative: platform.nativeAlternative }
        : {}),
    };
  return {
    canonicalId: platform.canonicalId,
    family: platform.family,
    kind: platform.kind,
    platform: platform.platform,
    rendererStrategy: platform.rendererStrategy,
    semanticIntent: platform.semanticIntent,
    interactionModel: platform.interactionModel,
    criticalStates: platform.criticalStates,
    web: platform.web,
    native: platform.native,
    accessibilityObligations: platform.accessibilityObligations,
    inputModalities: platform.inputModalities,
    responsiveBehavior: platform.responsiveBehavior,
    ...(platform.adaptiveBehavior
      ? { adaptiveBehavior: platform.adaptiveBehavior }
      : {}),
    tokenFamilies: platform.tokenFamilies,
    layoutIntents: platform.layoutIntents,
    motionRoles: platform.motionRoles,
    ...(platform.nativeAlternative
      ? { nativeAlternative: platform.nativeAlternative }
      : {}),
    ...(platform.webAlternative
      ? { webAlternative: platform.webAlternative }
      : {}),
    engineBoundary: platform.engineBoundary,
    dependencies: platform.dependencies,
    ...(platform.aliases.length ? { aliases: platform.aliases } : {}),
    searchTerms: platform.searchTerms,
  };
}

function projectRecipe(name, recipe) {
  const canonical = CANONICAL_CONTRACTS.recipes[name];
  const sourceRecipe = canonical ?? recipe;
  const compact = {
    id: name,
    displayName: sourceRecipe.displayName,
    purpose: sourceRecipe.purpose,
    ...(sourceRecipe.family ? { family: sourceRecipe.family } : {}),
    profiles: sourceRecipe.profiles,
    components: sourceRecipe.components,
    ...(sourceRecipe.optional?.length
      ? { optional: sourceRecipe.optional }
      : {}),
    ...(sourceRecipe.shell ? { shell: sourceRecipe.shell } : {}),
    ...(recipe.blocks?.length ? { blocks: recipe.blocks } : {}),
    ...(recipe.blockRoles ? { blockRoles: recipe.blockRoles } : {}),
    ...((sourceRecipe.icons ?? recipe.icons)?.length
      ? { icons: sourceRecipe.icons ?? recipe.icons }
      : {}),
    ...(sourceRecipe.operational
      ? { operational: sourceRecipe.operational }
      : recipe.operational
        ? { operational: recipe.operational }
        : {}),
    ...(sourceRecipe.references?.length
      ? { references: sourceRecipe.references }
      : {}),
    source: canonical ? "canonical-contract" : "legacy-catalog-adapter",
  };
  if (!canonical) return compact;

  return {
    ...compact,
    intent: canonical.intent,
    required: canonical.required,
    conditional: canonical.conditional,
    forbid: canonical.forbid,
    states: canonical.states,
    responsive: canonical.responsive,
    ...(canonical.expression ? { expression: canonical.expression } : {}),
    rationale: canonical.rationale,
  };
}

function projectRecipeShards(recipes) {
  return Object.fromEntries(
    Object.entries(recipes).map(([name, recipe]) => [
      `recipes/${name}.json`,
      recipe,
    ]),
  );
}

function projectComponentShards(components) {
  return Object.fromEntries(
    Object.entries(components).map(([name, component]) => [
      `components/${name}.json`,
      component,
    ]),
  );
}

function projectCompositionBlock(block) {
  return {
    id: block.id,
    displayName: block.displayName,
    family: block.family,
    classification: block.classification,
    inventoryStatus: block.inventoryStatus,
    platform: block.platform,
    nativeStrategy: block.nativeStrategy,
    intent: block.intent,
    profileCompatibility: block.profileCompatibility,
    slots: block.slots,
    requiredComponents: block.requiredComponents,
    optionalComponents: block.optionalComponents,
    states: block.states,
    responsive: block.responsive,
    useWhen: block.useWhen,
    avoidWhen: block.avoidWhen,
    recommendedRecipes: block.recommendedRecipes,
    boundaries: block.boundaries,
    ai: block.ai,
    provenance: block.provenance,
  };
}

function projectCompositionRecipe(recipe) {
  return {
    id: recipe.id,
    displayName: recipe.displayName,
    family: recipe.family,
    classification: recipe.classification,
    inventoryStatus: recipe.inventoryStatus,
    platform: recipe.platform,
    nativeStrategy: recipe.nativeStrategy,
    intent: recipe.intent,
    profileCompatibility: recipe.profileCompatibility,
    blockRoles: recipe.blockRoles,
    requiredComponents: recipe.requiredComponents,
    optionalComponents: recipe.optionalComponents,
    states: recipe.states,
    responsive: recipe.responsive,
    useWhen: recipe.useWhen,
    avoidWhen: recipe.avoidWhen,
    blockRelationships: recipe.blockRelationships,
    alternatives: recipe.alternatives,
    boundaries: recipe.boundaries,
    ai: recipe.ai,
    provenance: recipe.provenance,
  };
}

function validateCompositionCompatibility(
  legacyComponents,
  legacyBlocks,
  legacyRecipes,
) {
  const assertComponents = (owner, names) => {
    for (const name of names) {
      const component = legacyComponents[name];
      if (!component)
        throw new Error(`${owner} references missing component ${name}`);
      if (component.status !== "implemented")
        throw new Error(
          `${owner} references non-implemented component ${name}`,
        );
    }
  };
  for (const block of Object.values(COMPOSITION_BLOCKS)) {
    assertComponents(block.id, [
      ...block.requiredComponents,
      ...block.optionalComponents,
    ]);
    const legacyId = block.provenance.legacyCatalogId;
    if (legacyId && !legacyBlocks[legacyId])
      throw new Error(
        `${block.id} references missing legacy block ${legacyId}`,
      );
    for (const recipeId of block.recommendedRecipes) {
      if (!COMPOSITION_RECIPES[recipeId])
        throw new Error(`${block.id} references missing recipe ${recipeId}`);
    }
  }
  for (const recipe of Object.values(COMPOSITION_RECIPES)) {
    assertComponents(recipe.id, [
      ...recipe.requiredComponents,
      ...recipe.optionalComponents,
    ]);
    const blockIds = [
      ...recipe.blockRoles.required,
      ...recipe.blockRoles.recommended,
      ...recipe.blockRoles.optional,
    ];
    for (const blockId of blockIds) {
      if (!COMPOSITION_BLOCKS[blockId])
        throw new Error(`${recipe.id} references missing block ${blockId}`);
    }
    for (const alternative of recipe.alternatives) {
      if (!COMPOSITION_RECIPES[alternative])
        throw new Error(
          `${recipe.id} references missing recipe ${alternative}`,
        );
    }
    const legacyId = recipe.provenance.legacyCatalogId;
    if (legacyId && !legacyRecipes[legacyId])
      throw new Error(
        `${recipe.id} references missing legacy recipe ${legacyId}`,
      );
  }
}

export async function buildProjections() {
  const legacyComponents = readJson("packages/ai/catalog/components.json");
  const legacyRecipes = readJson("packages/ai/catalog/recipes.json");
  const components = Object.fromEntries(
    Object.entries(legacyComponents).map(([name, component]) => [
      name,
      projectComponent(name, component),
    ]),
  );
  const recipes = Object.fromEntries(
    Object.entries(legacyRecipes).map(([name, recipe]) => [
      name,
      projectRecipe(name, recipe),
    ]),
  );
  validateCompositionCompatibility(
    legacyComponents,
    readJson("packages/ai/catalog/blocks.json"),
    legacyRecipes,
  );
  const compositionProjection = {
    ...COMPOSITION_CONTRACT,
    registry: {
      ...COMPOSITION_CONTRACT.registry,
      compatibilityCounts: {
        components: Object.keys(legacyComponents).length,
        blocks: Object.keys(readJson("packages/ai/catalog/blocks.json")).length,
        recipes: Object.keys(legacyRecipes).length,
      },
    },
    counts: {
      ...COMPOSITION_CONTRACT.counts,
      legacyComponents: Object.keys(legacyComponents).length,
      legacyBlocks: Object.keys(readJson("packages/ai/catalog/blocks.json"))
        .length,
      legacyRecipes: Object.keys(legacyRecipes).length,
    },
  };
  const compositionCompactProjection = {
    schemaVersion: COMPOSITION_CONTRACT.schemaVersion,
    id: COMPOSITION_CONTRACT.id,
    displayName: COMPOSITION_CONTRACT.displayName,
    sourceOfTruth: COMPOSITION_CONTRACT.sourceOfTruth,
    resolverOrder: COMPOSITION_CONTRACT.resolverOrder,
    taxonomy: COMPOSITION_CONTRACT.taxonomy,
    ownership: COMPOSITION_CONTRACT.ownership,
    counts: compositionProjection.counts,
    profiles: PRODUCT_PROFILE_CAPABILITIES,
    blocks: Object.fromEntries(
      Object.entries(COMPOSITION_BLOCKS).map(([id, block]) => [
        id,
        projectCompositionBlock(block),
      ]),
    ),
    recipes: Object.fromEntries(
      Object.entries(COMPOSITION_RECIPES).map(([id, recipe]) => [
        id,
        projectCompositionRecipe(recipe),
      ]),
    ),
    nativeCanary: NATIVE_COMPOSITION_CANARY,
    responsiveViewportMatrix: COMPOSITION_CONTRACT.responsiveViewportMatrix,
    webProjection: COMPOSITION_CONTRACT.webProjection,
    nativeProjection: COMPOSITION_CONTRACT.nativeProjection,
    aiMetadata: COMPOSITION_CONTRACT.aiMetadata,
    compatibility: COMPOSITION_CONTRACT.compatibility,
    deferred: COMPOSITION_CONTRACT.deferred,
    showrooms: COMPOSITION_CONTRACT.showrooms,
  };
  const recipeShards = projectRecipeShards(recipes);
  const componentShards = projectComponentShards(
    Object.fromEntries(
      Object.entries(legacyComponents).map(([name, component]) => [
        name,
        projectComponentShard(name, component),
      ]),
    ),
  );
  const aliasesByCanonical = Object.fromEntries(
    Object.entries(legacyComponents)
      .filter(([, component]) => component.aliasOf)
      .reduce((entries, [name, component]) => {
        const current = entries.get(component.aliasOf) ?? [];
        current.push(name);
        entries.set(component.aliasOf, current);
        return entries;
      }, new Map()),
  );
  const componentPlatformMatrix = Object.fromEntries(
    Object.entries(legacyComponents).map(([name, component]) => [
      name,
      resolveComponentPlatformContract(
        name,
        component,
        aliasesByCanonical[name] ?? [],
      ),
    ]),
  );
  const componentContractPlaneProjection = {
    schemaVersion: COMPONENT_CONTRACT_PLANE.schemaVersion,
    id: COMPONENT_CONTRACT_PLANE.id,
    sourceOfTruth: COMPONENT_CONTRACT_PLANE.sourceOfTruth,
    contract: COMPONENT_CONTRACT_PLANE,
    registry: {
      source: COMPONENT_CONTRACT_PLANE.registry.source,
      canonicalSelection: COMPONENT_CONTRACT_PLANE.registry.canonicalSelection,
      canonicalCount: Object.values(legacyComponents).filter(
        (component) => !component.aliasOf,
      ).length,
      catalogCount: Object.keys(legacyComponents).length,
      aliasCount: Object.values(legacyComponents).filter(
        (component) => component.aliasOf,
      ).length,
    },
    matrix: componentPlatformMatrix,
    deferredNative: COMPONENT_CONTRACT_PLANE.deferredNative,
  };
  const nativeRendererIds = new Set(NATIVE_RENDERER_COMPONENT_IDS);
  const nativeAlternateIds = new Set(NATIVE_ALTERNATE_COMPONENT_IDS);
  const nativeComponentMaturity = Object.fromEntries(
    Object.entries(componentPlatformMatrix).map(([name, platform]) => {
      const renderer = nativeRendererIds.has(name);
      const alternate = nativeAlternateIds.has(name);
      const webOnly = platform.platform === "WEB";
      const nativeMaturity = webOnly
        ? "NONE"
        : renderer
          ? "PARTIAL_RENDERER"
          : alternate
            ? "CONTRACT_ONLY"
            : platform.native.status === "not-applicable"
              ? "NONE"
              : "CONTRACT_ONLY";
      const parityLevel = webOnly
        ? "NOT_APPLICABLE"
        : alternate
          ? "ALTERNATE_PATTERN"
          : renderer
            ? "PARTIAL"
            : "PLANNED";
      return [
        name,
        {
          component: name,
          family: platform.family,
          platformClass: platform.platform,
          webStatus: platform.web.status,
          nativeStatus: platform.native.status,
          nativeMaturity,
          nativeRendererStrategy: platform.rendererStrategy,
          parityLevel,
          missingStates:
            renderer && !webOnly
              ? ["device-runtime-proof", "platform-accessibility-certification"]
              : [],
          deviceDependency:
            renderer && !webOnly ? "runtime-device-or-emulator" : "none",
          accessibilityStatus: platform.accessibilityObligations.length
            ? renderer && !webOnly
              ? "contracted-source-not-runtime-certified"
              : "contracted"
            : "not-applicable",
          testStatus:
            renderer && !webOnly ? "source-typecheck" : "contract-or-planned",
        },
      ];
    }),
  );
  const nativeExpoProjection = {
    ...NATIVE_EXPO_CONTRACT,
    derived: {
      componentMaturitySource: [
        "packages/ai/catalog/components.json",
        "packages/contracts/src/component-platform.ts",
        "packages/contracts/src/native-expo.ts",
      ],
      componentMaturity: nativeComponentMaturity,
    },
  };
  const resolvedInputContracts = Object.fromEntries(
    Object.entries(INPUT_CONTRACT_DEFINITIONS).map(([name]) => {
      const component = legacyComponents[name];
      if (!component)
        throw new Error(
          `Input contract ${name} is not represented by the component catalog`,
        );
      const platform = resolveComponentPlatformContract(name, component);
      const input = resolveInputContract(name, platform);
      if (!input)
        throw new Error(
          `Input contract ${name} did not resolve from its source`,
        );
      return [name, input];
    }),
  );
  const inputContractPlaneProjection = {
    schemaVersion: INPUT_CONTRACT_PLANE.schemaVersion,
    id: INPUT_CONTRACT_PLANE.id,
    sourceOfTruth: INPUT_CONTRACT_PLANE.sourceOfTruth,
    platformSourceOfTruth: INPUT_CONTRACT_PLANE.platformSourceOfTruth,
    tokenSourceOfTruth: INPUT_CONTRACT_PLANE.tokenSourceOfTruth,
    taxonomy: INPUT_CONTRACT_PLANE.taxonomy,
    ownership: INPUT_CONTRACT_PLANE.ownership,
    fieldAnatomy: INPUT_CONTRACT_PLANE.fieldAnatomy,
    formStates: INPUT_CONTRACT_PLANE.formStates,
    dateTimeValues: INPUT_CONTRACT_PLANE.dateTimeValues,
    fileMetadata: INPUT_CONTRACT_PLANE.fileMetadata,
    measures: INPUT_CONTRACT_PLANE.measures,
    components: resolvedInputContracts,
    gapDecisions: INPUT_CONTRACT_PLANE.gapDecisions,
    deviceSources: INPUT_CONTRACT_PLANE.deviceSources,
    compatibility: INPUT_CONTRACT_PLANE.compatibility,
  };
  const resolvedNavigationOverlayFeedback = Object.fromEntries(
    Object.entries(NAVIGATION_OVERLAY_FEEDBACK_DEFINITIONS).map(([name]) => {
      const component = legacyComponents[name];
      if (!component)
        throw new Error(
          `Navigation/overlay/feedback contract ${name} is not represented by the component catalog`,
        );
      const platform = resolveComponentPlatformContract(name, component);
      const contract = resolveNavigationOverlayFeedbackContract(name, platform);
      if (!contract)
        throw new Error(
          `Navigation/overlay/feedback contract ${name} did not resolve from its source`,
        );
      return [name, contract];
    }),
  );
  const navigationOverlayFeedbackProjection = {
    schemaVersion: NAVIGATION_OVERLAY_FEEDBACK_PLANE.schemaVersion,
    id: NAVIGATION_OVERLAY_FEEDBACK_PLANE.id,
    sourceOfTruth: NAVIGATION_OVERLAY_FEEDBACK_PLANE.sourceOfTruth,
    platformSourceOfTruth:
      NAVIGATION_OVERLAY_FEEDBACK_PLANE.platformSourceOfTruth,
    tokenSourceOfTruth: NAVIGATION_OVERLAY_FEEDBACK_PLANE.tokenSourceOfTruth,
    taxonomy: NAVIGATION_OVERLAY_FEEDBACK_PLANE.taxonomy,
    ownership: NAVIGATION_OVERLAY_FEEDBACK_PLANE.ownership,
    layers: NAVIGATION_OVERLAY_FEEDBACK_PLANE.layers,
    focusDismissal: NAVIGATION_OVERLAY_FEEDBACK_PLANE.focusDismissal,
    components: resolvedNavigationOverlayFeedback,
    gapDecisions: NAVIGATION_OVERLAY_FEEDBACK_PLANE.gapDecisions,
    compatibility: NAVIGATION_OVERLAY_FEEDBACK_PLANE.compatibility,
  };
  const resolvedDataCollectionContracts = Object.fromEntries(
    Object.entries(DATA_COLLECTION_DEFINITIONS).map(([name]) => {
      const component = legacyComponents[name];
      if (!component)
        throw new Error(
          `Data collection contract ${name} is not represented by the component catalog`,
        );
      const platform = resolveComponentPlatformContract(name, component);
      const contract = resolveDataCollectionContract(name, platform);
      if (!contract)
        throw new Error(
          `Data collection contract ${name} did not resolve from its source`,
        );
      return [name, contract];
    }),
  );
  const dataCollectionsProjection = {
    schemaVersion: DATA_COLLECTION_PLANE.schemaVersion,
    id: DATA_COLLECTION_PLANE.id,
    sourceOfTruth: DATA_COLLECTION_PLANE.sourceOfTruth,
    platformSourceOfTruth: DATA_COLLECTION_PLANE.platformSourceOfTruth,
    tokenSourceOfTruth: DATA_COLLECTION_PLANE.tokenSourceOfTruth,
    taxonomy: DATA_COLLECTION_PLANE.taxonomy,
    ownership: DATA_COLLECTION_PLANE.ownership,
    virtualization: DATA_COLLECTION_PLANE.virtualization,
    components: resolvedDataCollectionContracts,
    gapDecisions: DATA_COLLECTION_PLANE.gapDecisions,
    nativeCanary: NATIVE_DATA_COLLECTION_CANARY,
    compatibility: DATA_COLLECTION_PLANE.compatibility,
  };
  const resolvedVisualizationContracts = Object.fromEntries(
    Object.entries(VISUALIZATION_COMPONENT_DEFINITIONS).map(([name]) => {
      const component = legacyComponents[name];
      if (!component)
        throw new Error(
          `Visualization contract ${name} is not represented by the component catalog`,
        );
      const platform = resolveComponentPlatformContract(name, component);
      const contract = resolveVisualizationComponentContract(name, platform);
      if (!contract)
        throw new Error(
          `Visualization contract ${name} did not resolve from its source`,
        );
      return [name, contract];
    }),
  );
  const visualizationProjection = {
    schemaVersion: VISUALIZATION_SCHEDULING_MAPS_PLANE.schemaVersion,
    id: VISUALIZATION_SCHEDULING_MAPS_PLANE.id,
    sourceOfTruth: VISUALIZATION_SCHEDULING_MAPS_PLANE.sourceOfTruth,
    platformSourceOfTruth:
      VISUALIZATION_SCHEDULING_MAPS_PLANE.platformSourceOfTruth,
    tokenSourceOfTruth: VISUALIZATION_SCHEDULING_MAPS_PLANE.tokenSourceOfTruth,
    taxonomy: VISUALIZATION_SCHEDULING_MAPS_PLANE.taxonomy,
    ownership: VISUALIZATION_SCHEDULING_MAPS_PLANE.ownership,
    tokenMapping: VISUALIZATION_SCHEDULING_MAPS_PLANE.tokenMapping,
    components: resolvedVisualizationContracts,
    scheduler: VISUALIZATION_SCHEDULING_MAPS_PLANE.scheduler,
    maps: VISUALIZATION_SCHEDULING_MAPS_PLANE.maps,
    gapDecisions: VISUALIZATION_SCHEDULING_MAPS_PLANE.gapDecisions,
    engineAdapters: VISUALIZATION_SCHEDULING_MAPS_PLANE.engineAdapters,
    nativeCanary: NATIVE_VISUALIZATION_CANARY,
    timezone: VISUALIZATION_SCHEDULING_MAPS_PLANE.timezone,
    compatibility: VISUALIZATION_SCHEDULING_MAPS_PLANE.compatibility,
  };
  const aliases = { ...ALIAS_MAP };
  const ownership = OWNERSHIP_RULES;
  const compactComponentBytes = Buffer.byteLength(JSON.stringify(components));
  const compactRecipeBytes = Buffer.byteLength(JSON.stringify(recipes));
  const fullComponentBytes = Buffer.byteLength(
    JSON.stringify(legacyComponents),
  );
  const fullRecipeBytes = Buffer.byteLength(JSON.stringify(legacyRecipes));
  const selectiveComponentBytes = Object.values(componentShards).reduce(
    (total, component) =>
      total +
      Buffer.byteLength(serializeProjection("components/x.json", component)),
    0,
  );
  const selectiveRecipeBytes = Object.values(recipeShards).reduce(
    (total, recipe) =>
      total + Buffer.byteLength(serializeProjection("recipes/x.json", recipe)),
    0,
  );
  const recipeReferences = Object.fromEntries(
    Object.entries(recipes).map(([name, recipe]) => [
      name,
      {
        path: `recipes/${name}.json`,
        ...(recipe.family ? { family: recipe.family } : {}),
      },
    ]),
  );

  const outputs = {
    "agent-index.json": {
      schemaVersion: CANONICAL_CONTRACTS.schemaVersion,
      selectionIntents: AI_SELECTION_INTENTS,
      sourceOfTruth: {
        typedContracts: "packages/contracts/src",
        themeProfile: "packages/contracts/src/theme-profile.ts",
        foundation: "packages/contracts/src/foundation.ts",
        themeRecipes: "packages/contracts/src/theme-recipe.ts",
        themeStudio: "packages/contracts/src/theme-studio.ts",
        platformNeutral: "packages/contracts/src/platform-neutral.ts",
        brandAdapter: "packages/contracts/src/brand-profile.ts",
        dtcgTokenExport: "packages/tokens/generated/tokens.dtcg.json",
        brandProfiles: "packages/contracts/src/brand-profile.ts",
        entityList: "packages/contracts/src/entity-list.ts",
        entityDetail: "packages/contracts/src/entity-detail.ts",
        authentication: "packages/contracts/src/authentication.ts",
        operationalPatterns: "packages/contracts/src/operational-patterns.ts",
        responsiveShell: "packages/contracts/src/responsive-shell.ts",
        moduleStates: "packages/contracts/src/module-state.ts",
        controlPlanePatterns: "packages/contracts/src/saas-control-plane.ts",
        nativeMobile: "packages/contracts/src/native-mobile.ts",
        nativeExpo: "packages/contracts/src/native-expo.ts",
        componentPlatform: "packages/contracts/src/component-platform.ts",
        inputContracts: "packages/contracts/src/input-contracts.ts",
        navigationOverlayFeedback:
          "packages/contracts/src/navigation-overlay-feedback.ts",
        dataCollections: "packages/contracts/src/data-collections.ts",
        visualizationSchedulingMaps: "packages/contracts/src/visualization.ts",
        erpDensity: "packages/contracts/src/erp-density.ts",
        editorBuilderAi: "packages/contracts/src/editor-builder-ai.ts",
        workflowProductivity: "packages/contracts/src/workflow-productivity.ts",
        composition: "packages/contracts/src/composition.ts",
        componentCorpusLedger: "scripts/component-corpus-ledger.mjs",
      },
      defaultRetrieval: [
        "generated/index.json",
        "generated/composition.compact.json",
        "generated/composition.json",
        "generated/input-contracts.json",
        "generated/navigation-overlay-feedback.json",
        "generated/data-collections.json",
        "generated/visualization-scheduling-maps.json",
        "generated/recipes/{recipe}.json",
        "generated/components/{componentId}.json",
      ],
      fallbackRetrieval: [
        "packages/ai/catalog/recipes.json",
        "packages/ai/catalog/components.json",
        "packages/ai/catalog/blocks.json",
        "packages/ai/catalog/icons.json",
      ],
      entryPoints: {
        foundation: {
          source: "generated/foundation.json",
          guidance: "docs/TOKENS.md",
          reference: "/tokens",
        },
        "entity-list": {
          inspect: "t7ui recipe inspect entity-list",
          compose: "t7ui compose entity-list",
        },
        "entity-detail": {
          inspect: "t7ui recipe inspect entity-detail",
          compose: "t7ui compose entity-detail",
        },
        auth: {
          resolve: "t7ui brand resolve auth",
          compose: "t7ui brand compose auth",
        },
        "brand-profiles": {
          adapter: "generated/brand-adapter.json",
          profiles: "generated/brand-profiles.json",
          guidance: "docs/aapm/T7-AAPM-001-Q03-AAPM-PROFILES-EVIDENCE.md",
        },
        "operational-patterns": {
          find: 't7ui find "control tower exception next action"',
          inspect: "t7ui recipe inspect control-tower",
          guidance: "docs/ai/OPERATIONAL_PATTERNS.md",
          reference: "/operational-patterns",
        },
        "content-safety": {
          guidance: "docs/ai/VISUAL_PROPORTION_AND_CONTENT_SAFETY.md",
          source: "packages/tokens/src/theme.ts",
          reference: "/component-lab?stress=content",
        },
        themes: {
          source: "generated/theme-recipes.json",
          tokenExport: "generated/tokens.dtcg.json",
          guidance: "docs/THEME_RECIPES.md",
        },
        "theme-studio": {
          source: "packages/contracts/src/theme-studio.ts",
          guidance:
            "docs/aapm/T7-COMP-EXP-Q02-DYNAMIC-THEME-STUDIO-EVIDENCE.md",
          reference: "/theme-studio",
        },
        "contract-plane": {
          source: "generated/platform-neutral.json",
          guidance: "packages/contracts/src/platform-neutral.ts",
          inspect: "inspectPlatformNeutralContract()",
        },
        "responsive-shell": {
          source: "generated/responsive-shell.json",
          guidance: "packages/contracts/src/responsive-shell.ts",
          reference: "/theme-studio#responsive-contracts",
        },
        "module-states": {
          source: "generated/module-states.json",
          guidance: "packages/contracts/src/module-state.ts",
          reference: "/theme-studio#module-states",
        },
        "saas-control-plane": {
          source: "generated/saas-control-plane.json",
          guidance: "packages/contracts/src/saas-control-plane.ts",
          reference: "/saas-control-plane",
        },
        "native-mobile": {
          source: "generated/native-mobile.json",
          guidance: "packages/contracts/src/native-mobile.ts",
          reference: "packages/native/README.md",
        },
        "native-expo": {
          source: "generated/native-expo.json",
          guidance: "packages/contracts/src/native-expo.ts",
          reference: "apps/native-lab",
        },
        "component-contract-plane": {
          source: "generated/component-contract-plane.json",
          guidance: "packages/contracts/src/component-platform.ts",
          reference: "/components",
        },
        "component-corpus": {
          source: "generated/component-corpus-ledger.json",
          generator: "pnpm corpus:generate",
          guidance:
            "docs/aapm/T7-UNIVERSAL-HARDENING-U13-CORPUS-EXPANSION-EVIDENCE.md",
        },
        "final-acceptance": {
          source: "generated/index.json",
          verifier: "pnpm test:final-ai-acceptance",
          guidance:
            "docs/aapm/T7-UNIVERSAL-HARDENING-U14-FINAL-ACCEPTANCE-EVIDENCE.md",
        },
        "input-contracts": {
          source: "generated/input-contracts.json",
          guidance: "packages/contracts/src/input-contracts.ts",
          reference: "/components/forms",
        },
        "navigation-overlay-feedback": {
          source: "generated/navigation-overlay-feedback.json",
          guidance: "packages/contracts/src/navigation-overlay-feedback.ts",
          reference: "/component-lab#component-lab-navigation-overlay-feedback",
        },
        "data-collections": {
          source: "generated/data-collections.json",
          guidance: "packages/contracts/src/data-collections.ts",
          reference: "/components/tables",
        },
        "visualization-scheduling-maps": {
          source: "generated/visualization-scheduling-maps.json",
          guidance: "packages/contracts/src/visualization.ts",
          reference: "/components/charts-data-visualization",
        },
        "erp-density": {
          source: "generated/erp-density.json",
          guidance: "packages/contracts/src/erp-density.ts",
          reference: "/erp-reference",
          find: 't7ui find "ERP dense table"',
        },
        "workflow-productivity": {
          source: "generated/workflow-productivity.json",
          guidance: "packages/contracts/src/workflow-productivity.ts",
          reference: "/component-lab#component-lab-workflow",
        },
        "editors-builders-ai": {
          source: "generated/editor-builder-ai.json",
          guidance: "packages/contracts/src/editor-builder-ai.ts",
          reference: "/component-lab#component-lab-editors-builders-ai",
        },
        composition: {
          source: "generated/composition.json",
          compact: "generated/composition.compact.json",
          guidance: "packages/contracts/src/composition.ts",
          reference: "/blocks",
          recipes: "/recipes",
        },
        "product-profiles": {
          source: "generated/composition.json",
          guidance: "packages/contracts/src/brand-profile.ts",
          reference: "/theme-studio",
        },
      },
      metrics: {
        fullCatalogBytes: fullComponentBytes + fullRecipeBytes,
        compactProjectionBytes: compactComponentBytes + compactRecipeBytes,
        selectiveRecipeShardBytes: selectiveRecipeBytes,
        selectiveComponentShardBytes: selectiveComponentBytes,
      },
    },
    "index.json": {
      schemaVersion: CANONICAL_CONTRACTS.schemaVersion,
      sourceOfTruth: "packages/contracts/src",
      recipes: recipeReferences,
      themeRecipes: {
        path: "theme-recipes.json",
        ids: Object.keys(CANONICAL_CONTRACTS.themeRecipes),
      },
      brandAdapter: {
        path: "brand-adapter.json",
      },
      platformNeutral: {
        path: "platform-neutral.json",
      },
      responsive: {
        path: "responsive-shell.json",
      },
      moduleStates: {
        path: "module-states.json",
      },
      saasControlPlane: {
        path: "saas-control-plane.json",
      },
      nativeMobile: {
        path: "native-mobile.json",
      },
      nativeExpo: {
        path: "native-expo.json",
      },
      componentContractPlane: {
        path: "component-contract-plane.json",
      },
      componentCorpus: {
        path: "component-corpus-ledger.json",
        generator: "pnpm corpus:generate",
        guidance:
          "docs/aapm/T7-UNIVERSAL-HARDENING-U13-CORPUS-EXPANSION-EVIDENCE.md",
      },
      finalAcceptance: {
        verifier: "pnpm test:final-ai-acceptance",
        source: "scripts/verify-final-ai-acceptance.mjs",
        guidance:
          "docs/aapm/T7-UNIVERSAL-HARDENING-U14-FINAL-ACCEPTANCE-EVIDENCE.md",
      },
      inputContracts: {
        path: "input-contracts.json",
      },
      navigationOverlayFeedback: {
        path: "navigation-overlay-feedback.json",
      },
      dataCollections: {
        path: "data-collections.json",
      },
      visualizationSchedulingMaps: {
        path: "visualization-scheduling-maps.json",
      },
      erpDensity: {
        path: "erp-density.json",
      },
      editorBuilderAi: {
        path: "editor-builder-ai.json",
      },
      workflowProductivity: {
        path: "workflow-productivity.json",
      },
      composition: {
        path: "composition.json",
        compactPath: "composition.compact.json",
      },
      tokens: {
        dtcgPath: "tokens.dtcg.json",
        guidance: "docs/TOKENS.md",
      },
      componentShardPattern: "components/{componentId}.json",
      generatedCompatibility: {
        recipes: "recipes.compact.json",
        components: "components.compact.json",
      },
      fallbackRetrieval: [
        "packages/ai/catalog/recipes.json",
        "packages/ai/catalog/components.json",
      ],
      metrics: {
        recipeCount: Object.keys(recipeShards).length,
        componentCount: Object.keys(componentShards).length,
        compactProjectionBytes: compactComponentBytes + compactRecipeBytes,
      },
    },
    "components.compact.json": components,
    "brand-adapter.json": CANONICAL_CONTRACTS.brandAdapter,
    "brand-profiles.json": CANONICAL_CONTRACTS.brandProfiles,
    "platform-neutral.json": CANONICAL_CONTRACTS.platformNeutral,
    "responsive-shell.json": CANONICAL_CONTRACTS.responsive,
    "module-states.json": CANONICAL_CONTRACTS.moduleStates,
    "saas-control-plane.json": CANONICAL_CONTRACTS.saasControlPlane,
    "native-mobile.json": CANONICAL_CONTRACTS.nativeMobile,
    "native-expo.json": nativeExpoProjection,
    "component-contract-plane.json": componentContractPlaneProjection,
    "input-contracts.json": inputContractPlaneProjection,
    "navigation-overlay-feedback.json": navigationOverlayFeedbackProjection,
    "data-collections.json": dataCollectionsProjection,
    "visualization-scheduling-maps.json": visualizationProjection,
    "erp-density.json": CANONICAL_CONTRACTS.erpDensity,
    "editor-builder-ai.json": CANONICAL_CONTRACTS.editorBuilderAi,
    "workflow-productivity.json": CANONICAL_CONTRACTS.workflowProductivity,
    "composition.json": compositionProjection,
    "composition.compact.json": compositionCompactProjection,
    "theme-recipes.json": CANONICAL_CONTRACTS.themeRecipes,
    "foundation.json": FOUNDATION_CONTRACT,
    "recipes.compact.json": recipes,
    "aliases.json": aliases,
    "ownership-rules.json": ownership,
    ...recipeShards,
    ...componentShards,
  };

  return {
    outputs,
    legacyComponents,
    legacyRecipes,
    canonical: CANONICAL_CONTRACTS,
  };
}

function serialize(value, compact = false) {
  return `${compact ? JSON.stringify(value) : JSON.stringify(value, null, 2)}\n`;
}

export function serializeProjection(filename, value) {
  const selective =
    filename === "index.json" ||
    filename.startsWith("recipes/") ||
    filename.startsWith("components/");
  return serialize(value, selective);
}

function normalizeLineEndings(value) {
  return value.replace(/\r\n/g, "\n");
}

function preserveExistingLineEndings(target, serialized) {
  if (!fs.existsSync(target)) return serialized;
  const existing = fs.readFileSync(target, "utf8");
  return existing.includes("\r\n")
    ? serialized.replace(/\n/g, "\r\n")
    : serialized;
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) ===
    path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  const projections = await buildProjections();
  const checkOnly = process.argv.includes("--check");
  if (checkOnly) {
    const differences = [];
    for (const [filename, value] of Object.entries(projections.outputs)) {
      const expected = serializeProjection(filename, value);
      for (const root of projectionRoots) {
        const target = path.join(root, filename);
        if (
          !fs.existsSync(target) ||
          normalizeLineEndings(fs.readFileSync(target, "utf8")) !==
            normalizeLineEndings(expected)
        )
          differences.push(path.relative(repoRoot, target));
      }
    }
    if (differences.length) {
      console.error(
        `Generated projections are stale:\n- ${differences.join("\n- ")}`,
      );
      process.exitCode = 1;
    }
  } else {
    for (const root of projectionRoots) {
      fs.mkdirSync(root, { recursive: true });
      for (const [filename, value] of Object.entries(projections.outputs)) {
        fs.mkdirSync(path.dirname(path.join(root, filename)), {
          recursive: true,
        });
        const target = path.join(root, filename);
        fs.writeFileSync(
          target,
          preserveExistingLineEndings(
            target,
            serializeProjection(filename, value),
          ),
        );
      }
    }
    console.log(
      `Generated ${Object.keys(projections.outputs).length} contract projections in generated/.`,
    );
  }
}
