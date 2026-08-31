const operationVocabulary = new Set([
  "create",
  "edit",
  "search",
  "filter",
  "sort",
  "select",
  "bulk-action",
  "open-detail",
  "paginate",
  "export",
]);

const responsiveVocabulary = new Set([
  "table",
  "table-scroll",
  "stacked",
  "collapsible",
  "drawer",
  "inline",
]);

const intentFields = [
  "visibility",
  "cardinality",
  "operations",
  "density",
  "navigation",
  "workflow",
  "comparison",
  "selection",
  "detail",
];

const ENTITY_LIST_CONSUMER_OWNED = [
  "columns",
  "rows",
  "rowKey",
  "data fetching",
  "permissions",
  "persistence",
  "event handlers",
];

const ENTITY_DETAIL_CONSUMER_OWNED = [
  "record data",
  "record attributes",
  "activity and related-record data",
  "permissions",
  "persistence",
  "event handlers",
  "route navigation",
];

function normalizeIntent(input, recipe) {
  const directIntent = Object.fromEntries(
    intentFields
      .filter((name) => input[name] !== undefined)
      .map((name) => [name, input[name]]),
  );
  const intent = {
    ...(recipe.intent ?? {}),
    ...directIntent,
    ...(input.intent ?? {}),
  };
  const operations = Array.isArray(intent.operations)
    ? [...new Set(intent.operations)]
    : [];

  for (const operation of operations) {
    if (!operationVocabulary.has(operation))
      throw new Error(`Unsupported ${recipe.id} operation: ${operation}`);
  }

  return { ...intent, operations };
}

function normalizeResponsive(input, recipe) {
  const responsive = {
    ...(recipe.responsive ?? {}),
    ...(input.responsive ?? {}),
  };
  if (input.mobileMode) responsive.mobile = input.mobileMode;

  for (const [name, mode] of Object.entries(responsive)) {
    if (mode !== undefined && !responsiveVocabulary.has(mode)) {
      throw new Error(
        `Unsupported ${recipe.id} responsive mode: ${name}=${mode}`,
      );
    }
  }

  return responsive;
}

const entityListPolicy = {
  family: "operational-collection",
  resolveConditional(input, intent) {
    const operations = new Set(intent.operations);
    const hasQueryControls =
      operations.has("search") ||
      operations.has("filter") ||
      operations.has("sort");

    return {
      Sidebar: input.persistentNavigation ?? intent.navigation === "workspace",
      KPICluster: input.showMetrics ?? true,
      FilterToolbar: input.queryControls ?? hasQueryControls,
      Pagination: input.paginated ?? intent.cardinality !== "single",
      BulkActionBar:
        input.bulkActions ??
        (intent.selection !== "none" && operations.has("select")),
      DetailDrawer: input.contextualDetail ?? intent.detail === "drawer",
    };
  },
  consumerOwned: ENTITY_LIST_CONSUMER_OWNED,
};

const entityDetailPolicy = {
  family: "record-inspection",
  resolveConditional(input, intent) {
    const operations = new Set(intent.operations);
    const workspaceNavigation =
      input.persistentNavigation ?? intent.navigation === "workspace";
    const readOnly = input.readOnly ?? !operations.has("edit");
    const activityMode = input.activity ?? "full";

    return {
      AppShell: workspaceNavigation,
      Sidebar: workspaceNavigation,
      StatusChip: input.showStatus ?? true,
      ActivityFeed: activityMode !== "none",
      ActionMenu: input.quickActions ?? (!readOnly && operations.has("edit")),
      ActionFooter: input.actionFooter ?? !readOnly,
      DataTable: input.relatedRecords ?? false,
      Alert: input.showAlert ?? false,
      Modal: input.confirmActions ?? false,
    };
  },
  consumerOwned: ENTITY_DETAIL_CONSUMER_OWNED,
};

const familyPolicies = {
  "entity-list": entityListPolicy,
  "entity-detail": entityDetailPolicy,
};

function policyForRecipe(recipe) {
  const policy = familyPolicies[recipe?.id];
  if (!policy || recipe.family !== policy.family) {
    throw new Error(
      `No canonical family policy is registered for recipe: ${recipe?.id ?? "unknown"}`,
    );
  }
  return policy;
}

function normalizeRecipeContract(contract, policy) {
  const recipe = contract?.recipe;
  const components = contract?.components ?? {};

  if (!recipe || typeof recipe !== "object") {
    throw new Error("recipe family core requires a normalized recipe contract");
  }
  if (recipe.family !== policy.family) {
    throw new Error(
      `Recipe ${recipe.id ?? "unknown"} does not belong to the ${policy.family} family`,
    );
  }
  if (!recipe.intent || !recipe.required || !recipe.conditional) {
    throw new Error(
      `${recipe.id} compact contract is missing family decision metadata`,
    );
  }
  if (!components || typeof components !== "object") {
    throw new Error(
      "recipe family core requires normalized component contracts",
    );
  }

  return { recipe, components };
}

function resolveRecipePlan(recipe, input, policy) {
  const intent = normalizeIntent(input, recipe);
  const decisions = policy.resolveConditional(input, intent, recipe);
  const conditional = Object.fromEntries(
    Object.entries(recipe.conditional).map(([name, rationale]) => [
      name,
      { included: Boolean(decisions[name]), rationale },
    ]),
  );
  const required = [...recipe.required];
  const included = [
    ...required,
    ...Object.entries(conditional)
      .filter(([, decision]) => decision.included)
      .map(([name]) => name),
  ];
  const conditionalNames = new Set(Object.keys(conditional));
  const omitted = Object.entries(conditional)
    .filter(([, decision]) => !decision.included)
    .map(([name]) => name);
  const states = input.states ?? [...(recipe.states ?? [])];
  const responsive = normalizeResponsive(input, recipe);

  return {
    recipe: recipe.id,
    family: policy.family,
    intent,
    shell: recipe.shell,
    required,
    conditional,
    included,
    omitted,
    optional: [...(recipe.optional ?? [])].filter(
      (name) => !conditionalNames.has(name),
    ),
    states,
    responsive,
    forbid: [...(recipe.forbid ?? [])],
    rationale: recipe.rationale,
    consumerOwned: [...policy.consumerOwned],
    decisionCount:
      Object.keys(intent).length +
      required.length +
      Object.keys(conditional).length +
      states.length +
      Object.keys(responsive).length,
    componentIds: [...included],
  };
}

function assertLoadedComponents({ recipe, components }, componentIds) {
  for (const name of componentIds) {
    if (components[name]?.status !== "implemented") {
      throw new Error(
        `${recipe.id} references a missing or non-implemented component: ${name}`,
      );
    }
  }
}

function publicResolution(plan) {
  const { componentIds: _componentIds, ...resolution } = plan;
  return resolution;
}

function composeFromResolution(resolution) {
  return {
    kind: "ten4seven-canonical-scaffold",
    recipe: resolution.recipe,
    family: resolution.family,
    shell: resolution.shell,
    composition: resolution.included,
    decisions: {
      required: resolution.required,
      conditional: resolution.conditional,
      omitted: resolution.omitted,
      forbid: resolution.forbid,
    },
    states: resolution.states,
    responsive: resolution.responsive,
    consumerOwned: resolution.consumerOwned,
    decisionCount: resolution.decisionCount,
  };
}

/**
 * Build a family resolver from normalized contract data.
 *
 * This is the only recipe resolution kernel. It is environment-neutral:
 * callers provide the recipe and only the component shards needed for the
 * resolved plan. It never reads files or reports loader provenance.
 */
export function createRecipeFamilyResolver(
  contract,
  policy = policyForRecipe(contract?.recipe),
) {
  const normalizedContract = normalizeRecipeContract(contract, policy);

  return {
    resolve(input = {}) {
      const plan = resolveRecipePlan(normalizedContract.recipe, input, policy);
      assertLoadedComponents(normalizedContract, plan.componentIds);
      return publicResolution(plan);
    },
    compose(input = {}) {
      return composeFromResolution(this.resolve(input));
    },
    inspect() {
      return normalizedContract.recipe;
    },
  };
}

/**
 * Resolve the component IDs before loading component shards. This deliberately
 * shares the same decision plan as the final family resolver.
 */
export function resolveRequiredContracts(recipe, input = {}) {
  const policy = policyForRecipe(recipe);
  return resolveRecipePlan(recipe, input, policy).componentIds;
}

export function createEntityListResolver(contract) {
  return createRecipeFamilyResolver(contract, entityListPolicy);
}

export function resolveEntityListIntent(contract, input = {}) {
  return createEntityListResolver(contract).resolve(input);
}

export function composeEntityList(contract, input = {}) {
  return createEntityListResolver(contract).compose(input);
}

export function inspectEntityList(contract) {
  return createEntityListResolver(contract).inspect();
}

export function createEntityDetailResolver(contract) {
  return createRecipeFamilyResolver(contract, entityDetailPolicy);
}

export function resolveEntityDetailIntent(contract, input = {}) {
  return createEntityDetailResolver(contract).resolve(input);
}

export function composeEntityDetail(contract, input = {}) {
  return createEntityDetailResolver(contract).compose(input);
}

export function inspectEntityDetail(contract) {
  return createEntityDetailResolver(contract).inspect();
}

const brandDecisionFields = [
  ["media prominence", (profile) => profile.media.prominence],
  ["media treatment", (profile) => profile.media.treatment],
  ["media overlay", (profile) => profile.media.overlay],
  ["page composition", (profile) => profile.composition.heroBias],
  ["whitespace intensity", (profile) => profile.composition.whitespace],
  ["brand mark prominence", (profile) => profile.brandMark.prominence],
  ["display character", (profile) => profile.typography.displayCharacter],
  ["surface mood", (profile) => profile.surface.mood],
  ["CTA emphasis", (profile) => profile.actionEmphasis.level],
];

function normalizeBrandContract(contract) {
  const recipe = contract?.recipe ?? contract?.recipes?.auth;
  const profiles = contract?.profiles ?? contract?.brandProfiles;
  const components = contract?.components ?? {};

  if (!recipe || typeof recipe !== "object") {
    throw new Error(
      "brand expression core requires a normalized recipe contract",
    );
  }
  if (recipe.id !== "auth") {
    throw new Error(
      `brand expression core only supports the Authentication recipe: ${recipe.id ?? "unknown"}`,
    );
  }
  if (!recipe.expression || recipe.expression.kind !== "brand-profile") {
    throw new Error(
      "authentication contract is missing brand-profile expression metadata",
    );
  }
  if (!profiles || typeof profiles !== "object") {
    throw new Error(
      "brand expression core requires normalized brand profile data",
    );
  }
  if (!components || typeof components !== "object") {
    throw new Error(
      "brand expression core requires normalized component contracts",
    );
  }

  return { recipe, profiles, components };
}

function assertBrandExpressionContract({ recipe, profiles, components }) {
  for (const name of recipe.components) {
    if (components[name]?.status !== "implemented") {
      throw new Error(
        `authentication references a missing or non-implemented component: ${name}`,
      );
    }
  }

  for (const profileId of recipe.expression.profiles) {
    const profile = profiles[profileId];
    if (!profile || profile.id !== profileId) {
      throw new Error(
        `authentication expression references a missing brand profile: ${profileId}`,
      );
    }
  }
}

function resolveBrandFromContract(contract, input = {}) {
  const { recipe, profiles } = contract;
  const profileId = input.brandProfile ?? "neutral-product";
  if (
    typeof profileId !== "string" ||
    !recipe.expression.profiles.includes(profileId) ||
    !profiles[profileId]
  ) {
    throw new Error(`Unknown brand profile: ${String(profileId)}`);
  }

  const profile = profiles[profileId];
  const decisionLedger = brandDecisionFields.map(([decision, read]) => ({
    decision,
    value: read(profile),
    source: "brand-profile",
    agentOwned: 0,
  }));

  return {
    recipe: recipe.id,
    brand: profile.id,
    profile,
    composition: profile.composition,
    media: profile.media,
    typography: profile.typography,
    brandMark: profile.brandMark,
    surface: profile.surface,
    actionEmphasis: profile.actionEmphasis,
    responsive: recipe.expression.responsive,
    canonicalComponents: [...recipe.components],
    optionalComponents: [...(recipe.optional ?? [])],
    consumerSlots: [...recipe.expression.consumerSlots],
    consumerOwned: [
      "brand mark asset",
      "media source and alt text",
      "brand copy",
      "authentication handlers",
      "validation and API behavior",
      "legal links",
    ],
    decisionLedger,
    decisionCount: decisionLedger.length,
    agentOwnedDecisionCount: 0,
  };
}

function composeBrandFromResolution(resolution) {
  return {
    kind: "ten4seven-brand-expression",
    recipe: resolution.recipe,
    brand: resolution.brand,
    composition: resolution.composition,
    media: resolution.media,
    typography: resolution.typography,
    brandMark: resolution.brandMark,
    surface: resolution.surface,
    actionEmphasis: resolution.actionEmphasis,
    responsive: resolution.responsive,
    canonicalComponents: resolution.canonicalComponents,
    optionalComponents: resolution.optionalComponents,
    consumerSlots: resolution.consumerSlots,
    consumerOwned: resolution.consumerOwned,
    decisionLedger: resolution.decisionLedger,
    decisionCount: resolution.decisionCount,
    agentOwnedDecisionCount: resolution.agentOwnedDecisionCount,
  };
}

/**
 * Create the single pure resolver for profile-driven brand expression.
 * The caller supplies normalized Authentication, component, and profile data;
 * this core never loads a file or selects art direction on the agent's behalf.
 */
export function createBrandExpressionResolver(contract) {
  const normalizedContract = normalizeBrandContract(contract);
  assertBrandExpressionContract(normalizedContract);

  return {
    resolve(input = {}) {
      return resolveBrandFromContract(normalizedContract, input);
    },
    compose(input = {}) {
      return composeBrandFromResolution(
        resolveBrandFromContract(normalizedContract, input),
      );
    },
    inspect() {
      return normalizedContract.recipe;
    },
  };
}

export function resolveBrandExpression(contract, input = {}) {
  return createBrandExpressionResolver(contract).resolve(input);
}

export function composeBrandExpression(contract, input = {}) {
  return createBrandExpressionResolver(contract).compose(input);
}

export function inspectBrandExpression(contract) {
  return createBrandExpressionResolver(contract).inspect();
}
