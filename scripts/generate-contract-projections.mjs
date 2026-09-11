import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { FOUNDATION_CONTRACT } from "../packages/contracts/src/foundation.ts";

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

function projectComponent(name, component) {
  // Keep the index projection retrieval-friendly; verbose API and
  // accessibility guidance live in the component shard selected by the
  // default retrieval pattern.
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
  };
}

function projectComponentShard(name, component) {
  return {
    id: name,
    displayName: component.displayName,
    status: component.status,
    category: component.category,
    purpose: component.purpose,
    source: component.source,
    ...(component.importantProps
      ? { importantProps: component.importantProps }
      : {}),
    ...projectComponentContract(component),
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
  const recipeShards = projectRecipeShards(recipes);
  const componentShards = projectComponentShards(
    Object.fromEntries(
      Object.entries(legacyComponents).map(([name, component]) => [
        name,
        projectComponentShard(name, component),
      ]),
    ),
  );
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
      sourceOfTruth: {
        typedContracts: "packages/contracts/src",
        themeProfile: "packages/contracts/src/theme-profile.ts",
        foundation: "packages/contracts/src/foundation.ts",
        themeRecipes: "packages/contracts/src/theme-recipe.ts",
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
        erpDensity: "packages/contracts/src/erp-density.ts",
      },
      defaultRetrieval: [
        "generated/index.json",
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
        "erp-density": {
          source: "generated/erp-density.json",
          guidance: "packages/contracts/src/erp-density.ts",
          reference: "/erp-reference",
          find: 't7ui find "ERP dense table"',
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
      erpDensity: {
        path: "erp-density.json",
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
    "erp-density.json": CANONICAL_CONTRACTS.erpDensity,
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
