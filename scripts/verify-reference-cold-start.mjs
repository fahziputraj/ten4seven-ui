import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));

const allowedReads = [
  "AGENTS.md",
  "llms.txt",
  "docs/ai/AI_QUICKSTART.md",
  "docs/ai/APPLY_TO_EXISTING_WEB.md",
  "packages/ai/templates/AGENTS.ten4seven.md",
  "packages/ai/catalog/recipes.json",
  "packages/ai/catalog/components.json",
  "packages/ai/catalog/icons.json",
];
for (const relativePath of allowedReads)
  assert.ok(fs.existsSync(path.join(repoRoot, relativePath)), relativePath);

const recipes = readJson("packages/ai/catalog/recipes.json");
const components = readJson("packages/ai/catalog/components.json");
const icons = readJson("packages/ai/catalog/icons.json");
const migrationContract = read(
  "docs/ai/APPLY_TO_EXISTING_WEB.md",
).toLowerCase();
const agentContract =
  `${read("AGENTS.md")}\n${read("packages/ai/templates/AGENTS.ten4seven.md")}`.toLowerCase();
const routeContract = `${read("AGENTS.md")}\n${read("llms.txt")}`.toLowerCase();

for (const route of ["/theme-studio", "/warehouse-inventory", "/ebook-store"])
  assert.match(
    routeContract,
    new RegExp(route),
    `reference route missing: ${route}`,
  );

const tasks = [
  {
    name: "Warehouse Inventory",
    query: "inventory list",
    recipe: "entity-list",
    profile: "enterprise",
    components: [
      "AppShell",
      "Sidebar",
      "PageHeader",
      "KPICluster",
      "FilterToolbar",
      "DataTable",
      "Pagination",
      "BulkActionBar",
      "DetailDrawer",
    ],
    icons: [
      "warehouse",
      "inventory",
      "stockIn",
      "stockOut",
      "transfer",
      "search",
      "filter",
      "sort",
    ],
  },
  {
    name: "Ebook Store Catalog",
    query: "ebook store catalog",
    recipe: "catalog",
    profile: "commerce",
    components: [
      "AppShell",
      "PageHeader",
      "Input",
      "ProductCard",
      "Pagination",
    ],
    icons: [
      "book",
      "ebook",
      "catalog",
      "category",
      "cart",
      "favorite",
      "rating",
      "search",
      "filter",
      "sort",
      "publisher",
      "preview",
    ],
  },
];

for (const task of tasks) {
  const recipe = recipes[task.recipe];
  assert.ok(recipe, `${task.name}: recipe missing`);
  assert.ok(
    recipe.profiles.includes(task.profile),
    `${task.name}: profile missing`,
  );
  for (const componentName of task.components) {
    assert.ok(
      recipe.components.includes(componentName),
      `${task.name}: recipe omits ${componentName}`,
    );
    assert.equal(
      components[componentName]?.status,
      "available",
      `${task.name}: ${componentName} is not implemented`,
    );
  }
  for (const iconName of task.icons)
    assert.ok(icons[iconName], `${task.name}: icon missing: ${iconName}`);

  const cliOutput = execFileSync(
    process.execPath,
    [path.join(repoRoot, "packages/ai/bin/t7ui.mjs"), "find", task.query],
    { cwd: repoRoot, encoding: "utf8" },
  );
  assert.match(cliOutput, new RegExp(`Recipe: ${task.recipe}`));
  assert.match(cliOutput, new RegExp(task.components[0]));
}

for (const requiredPhrase of [
  "business logic",
  "routing",
  "cart state",
  "auth",
])
  assert.match(
    migrationContract,
    new RegExp(requiredPhrase),
    `migration boundary missing: ${requiredPhrase}`,
  );
for (const requiredPhrase of ["recipe", "component", "semantic", "donor"])
  assert.match(
    agentContract,
    new RegExp(requiredPhrase),
    `agent contract missing: ${requiredPhrase}`,
  );

console.log(
  `Cold-start references verified: ${tasks.length} tasks, ${allowedReads.length} contract/catalog reads, 0 donor reads.`,
);
