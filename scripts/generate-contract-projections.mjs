import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

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

function projectComponent(name, component) {
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
        themeRecipes: "packages/contracts/src/theme-recipe.ts",
        dtcgTokenExport: "packages/tokens/generated/tokens.dtcg.json",
        brandProfiles: "packages/contracts/src/brand-profile.ts",
        entityList: "packages/contracts/src/entity-list.ts",
        entityDetail: "packages/contracts/src/entity-detail.ts",
        authentication: "packages/contracts/src/authentication.ts",
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
        themes: {
          source: "generated/theme-recipes.json",
          tokenExport: "generated/tokens.dtcg.json",
          guidance: "docs/THEME_RECIPES.md",
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
    "brand-profiles.json": CANONICAL_CONTRACTS.brandProfiles,
    "theme-recipes.json": CANONICAL_CONTRACTS.themeRecipes,
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
          fs.readFileSync(target, "utf8") !== expected
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
        fs.writeFileSync(
          path.join(root, filename),
          serializeProjection(filename, value),
        );
      }
    }
    console.log(
      `Generated ${Object.keys(projections.outputs).length} contract projections in generated/.`,
    );
  }
}
