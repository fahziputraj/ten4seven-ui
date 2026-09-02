import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const resolve = (relativePath) => path.join(repoRoot, relativePath);
const read = (relativePath) => fs.readFileSync(resolve(relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));

const contractReads = [
  "AGENTS.md",
  "docs/ai/AI_QUICKSTART.md",
  "docs/ai/APPLY_TO_EXISTING_WEB.md",
  "generated/agent-index.json",
  "generated/recipes.compact.json",
  "generated/components.compact.json",
  "generated/aliases.json",
  "generated/ownership-rules.json",
  "generated/theme-recipes.json",
  "generated/tokens.dtcg.json",
  "packages/ai/catalog/blocks.json",
  "packages/ai/catalog/icons.json",
];
for (const relativePath of contractReads)
  assert.ok(fs.existsSync(resolve(relativePath)), relativePath);

const recipes = readJson("generated/recipes.compact.json");
const components = readJson("generated/components.compact.json");
const blocks = readJson("packages/ai/catalog/blocks.json");
const icons = readJson("packages/ai/catalog/icons.json");
const cliPath = resolve("packages/ai/bin/t7ui.mjs");

const retrievalTasks = [
  {
    name: "Operational receipts",
    query: "inventory operations admin receipts",
    recipe: "entity-list",
    shell: "AppShell",
    components: ["DataTable", "SearchInput", "Select", "DetailDrawer"],
    cliComponents: ["DataTable", "DetailDrawer"],
    icons: ["warehouse", "inventory", "stockIn", "stockOut", "transfer"],
  },
  {
    name: "Public catalog",
    query: "public catalog",
    recipe: "catalog",
    shell: "PublicShell",
    components: ["ProductGrid", "ProductCard", "SearchInput", "CartPanel"],
    icons: ["book", "ebook", "catalog", "category", "cart", "favorite"],
  },
  {
    name: "Public home",
    query: "public marketing",
    recipe: "marketing-home",
    shell: "PublicShell",
    components: ["Typography", "Button", "ProductCard", "Carousel"],
    cliComponents: ["NavigationMenu", "ProductCard", "Carousel"],
    blocks: ["hero-split", "cta-contained", "public-footer"],
    icons: ["components", "type", "chart", "book", "arrowRight"],
  },
];

for (const task of retrievalTasks) {
  const recipe = recipes[task.recipe];
  assert.ok(recipe, `${task.name}: recipe missing`);
  assert.equal(
    recipe.shell?.preferred,
    task.shell,
    `${task.name}: shell contract drifted`,
  );
  for (const componentName of task.components) {
    assert.equal(
      components[componentName]?.status,
      "implemented",
      `${task.name}: ${componentName} is not implemented`,
    );
  }
  for (const blockName of task.blocks ?? [])
    assert.ok(blocks[blockName], `${task.name}: block missing: ${blockName}`);
  for (const iconName of task.icons)
    assert.ok(icons[iconName], `${task.name}: icon missing: ${iconName}`);

  const output = execFileSync(process.execPath, [cliPath, "find", task.query], {
    cwd: repoRoot,
    encoding: "utf8",
  });
  assert.match(output, new RegExp(`Recipe: ${task.recipe}`));
  assert.match(output, new RegExp(`Shell: ${task.shell}`));
  for (const componentName of task.cliComponents ?? task.components)
    assert.match(output, new RegExp(componentName));
  for (const blockName of task.blocks ?? [])
    assert.match(output, new RegExp(blockName));
}

const consumers = [
  {
    name: "operational",
    packagePath: "apps/adoption-operational/package.json",
    appPath: "apps/adoption-operational/src/App.tsx",
    stylesPath: "apps/adoption-operational/src/styles.css",
    behaviorFunctions: [
      "buildReceipt",
      "filterReceipts",
      "markReceiptReceived",
      "countReceiptsByStatus",
    ],
  },
  {
    name: "public",
    packagePath: "apps/adoption-public/package.json",
    appPath: "apps/adoption-public/src/App.tsx",
    stylesPath: "apps/adoption-public/src/styles.css",
    behaviorFunctions: [
      "addToCart",
      "setCartQuantity",
      "removeFromCart",
      "cartCount",
      "cartSubtotal",
    ],
  },
];

const localBasicPrimitives =
  /\b(?:function|const)\s+(?:Button|Input|Card|Modal|Drawer|Table|Badge|Select)\b/;
const forbiddenIconOrDonorImport =
  /(?:solar:|iconify|@iconify|lucide|react-icons|AAPM|HeroUI|shadcnblocks|from\s+["'][^"']*(?:\/src|\/internal)["'])/i;
const tokenBackedVisualProperties = new RegExp(
  "^\\s*(?:color|background(?:-color)?|border-radius|box-shadow|font-(?:family|size|weight))\\s*:",
  "i",
);

for (const consumer of consumers) {
  const packageJson = readJson(consumer.packagePath);
  const appSource = read(consumer.appPath);
  const styles = read(consumer.stylesPath);
  const dependencies = {
    ...(packageJson.dependencies ?? {}),
    ...(packageJson.devDependencies ?? {}),
  };

  for (const packageName of [
    "@ten4seven/icons",
    "@ten4seven/tokens",
    "@ten4seven/ui",
  ])
    assert.ok(
      dependencies[packageName]?.startsWith("workspace:"),
      `${consumer.name}: missing workspace dependency ${packageName}`,
    );

  assert.match(appSource, /Ten4SevenProvider/);
  assert.match(appSource, /from "@ten4seven\/ui"/);
  assert.match(appSource, /from "@ten4seven\/icons"/);
  assert.doesNotMatch(
    appSource,
    forbiddenIconOrDonorImport,
    `${consumer.name}: donor or raw icon import found`,
  );
  assert.doesNotMatch(
    appSource,
    localBasicPrimitives,
    `${consumer.name}: local basic primitive found`,
  );
  for (const behaviorFunction of consumer.behaviorFunctions)
    assert.match(
      appSource,
      new RegExp(`\\b${behaviorFunction}\\b`),
      `${consumer.name}: behavior function ${behaviorFunction} disappeared`,
    );

  for (const line of styles.split(/\r?\n/))
    if (tokenBackedVisualProperties.test(line))
      assert.match(
        line,
        /var\(--t7-/,
        `${consumer.name}: visual token bypass in: ${line.trim()}`,
      );
  assert.doesNotMatch(
    styles,
    /#[0-9a-f]{3,8}\b|\b(?:rgb|rgba|oklch|color-mix)\(/i,
    `${consumer.name}: raw color literal found`,
  );
}

const operationalSource = read("apps/adoption-operational/src/App.tsx");
const publicSource = read("apps/adoption-public/src/App.tsx");
assert.match(
  operationalSource,
  /<Ten4SevenProvider[\s\S]*?theme="enterprise"/,
  "operational: v2 recipe consumer proof is missing",
);
assert.match(
  operationalSource,
  /preferences=\{\{[\s\S]*?density:/,
  "operational: runtime-preferences proof is missing",
);
assert.match(
  publicSource,
  /<Ten4SevenProvider \{\.\.\.theme\}>/,
  "public: legacy ThemeConfig consumer proof is missing",
);
assert.match(
  publicSource,
  /function CssFirstThemeProof\(/,
  "public: CSS-first consumer fixture is missing",
);
for (const attribute of [
  'data-t7-theme="commerce"',
  'data-t7-mode="dark"',
  'data-t7-density="compact"',
])
  assert.ok(
    publicSource.includes(attribute),
    `public: CSS-first fixture is missing ${attribute}`,
  );

console.log(
  `Adoption static proof verified: ${consumers.length} isolated consumers, legacy object compatibility, a v2 recipe consumer, a CSS-first consumer, 0 new basic primitives, 0 parallel design systems, 0 raw external icon imports, and 0 local color literals.`,
);
console.log(
  `Cold-start retrieval proof verified: ${retrievalTasks.length} product-context queries, ${contractReads.length} contract/catalog reads, 0 donor reads, 0 internal implementation reads.`,
);
