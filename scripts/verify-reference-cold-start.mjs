import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

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
  "generated/agent-index.json",
  "generated/recipes.compact.json",
  "generated/components.compact.json",
  "generated/aliases.json",
  "generated/ownership-rules.json",
  "packages/ai/catalog/blocks.json",
  "packages/ai/catalog/icons.json",
];
const forbiddenRoots = [
  "AAPM",
  "HeroUI",
  "Minimal",
  "shadcnblocks",
  "research/00",
  "research/01",
];
for (const relativePath of allowedReads)
  assert.ok(fs.existsSync(path.join(repoRoot, relativePath)), relativePath);
for (const forbiddenRoot of forbiddenRoots)
  assert.ok(
    !allowedReads.some((relativePath) => relativePath.includes(forbiddenRoot)),
    `cold-start read set leaks donor or extraction source: ${forbiddenRoot}`,
  );

const recipes = readJson("generated/recipes.compact.json");
const components = readJson("generated/components.compact.json");
const blocks = readJson("packages/ai/catalog/blocks.json");
const icons = readJson("packages/ai/catalog/icons.json");
const migrationContract = read(
  "docs/ai/APPLY_TO_EXISTING_WEB.md",
).toLowerCase();
const agentContract =
  `${read("AGENTS.md")}\n${read("packages/ai/templates/AGENTS.ten4seven.md")}`.toLowerCase();
const routeContract = `${read("AGENTS.md")}\n${read("llms.txt")}`.toLowerCase();

for (const route of [
  "/theme-studio",
  "/component-lab",
  "/tokens",
  "/components",
  "/components/patterns",
  "/components/tables",
  "/components/filtering-bulk-actions",
  "/icons",
  "/recipes",
  "/recipes/cart",
  "/operations-tracker",
  "/ebook-store",
  "/blocks",
  "/blocks/hero-split",
  "/public-showcase",
])
  assert.match(
    routeContract,
    new RegExp(route),
    `reference route missing: ${route}`,
  );

const tasks = [
  {
    name: "Registration Form",
    query: "registration form",
    recipe: "auth",
    profile: "commerce",
    icons: ["user", "lock", "eye", "check"],
  },
  {
    name: "Advanced Employee Form",
    query: "advanced employee form",
    recipe: "entity-form",
    profile: "enterprise",
    icons: ["user", "edit", "calendar", "upload", "check"],
  },
  {
    name: "Operations Tracker",
    query: "operations tracker work queue",
    recipe: "entity-list",
    profile: "enterprise",
    icons: [
      "analytics",
      "users",
      "delivery",
      "package",
      "logistics",
      "payment",
      "timeline",
      "search",
      "filter",
      "sort",
    ],
  },
  {
    name: "Modal Confirmation",
    query: "modal confirmation",
    recipe: "entity-detail",
    profile: "enterprise",
    icons: ["modal", "check", "close"],
  },
  {
    name: "Mobile Filter Drawer",
    query: "mobile filter drawer",
    recipe: "entity-list",
    profile: "enterprise",
    icons: ["filter", "search", "close", "check"],
  },
  {
    name: "File Upload Form",
    query: "file upload",
    recipe: "entity-form",
    profile: "enterprise",
    icons: ["file", "upload", "delete", "check"],
  },
  {
    name: "KPI Dashboard",
    query: "KPI dashboard",
    recipe: "dashboard",
    profile: "dashboard",
    icons: ["kpi", "chart", "analytics", "filter"],
  },
  {
    name: "Public Catalog",
    query: "public catalog",
    recipe: "catalog",
    profile: "commerce",
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
  {
    name: "Cart Review",
    query: "cart review",
    recipe: "cart",
    profile: "commerce",
    icons: ["cart", "checkout", "delete", "plus"],
  },
  {
    name: "Checkout",
    query: "checkout",
    recipe: "checkout",
    profile: "commerce",
    icons: ["cart", "checkout", "lock", "check"],
  },
  {
    name: "Public Showcase",
    query: "public showcase",
    recipe: "marketing-home",
    profile: "marketing",
    icons: ["components", "type", "chart", "book", "arrowRight"],
  },
];

const cliPath = path.join(repoRoot, "packages/ai/bin/t7ui.mjs");
for (const task of tasks) {
  const recipe = recipes[task.recipe];
  assert.ok(recipe, `${task.name}: recipe missing`);
  assert.ok(
    recipe.profiles.includes(task.profile),
    `${task.name}: profile missing`,
  );
  for (const componentName of [
    ...recipe.components,
    ...(recipe.optional ?? []),
  ])
    assert.equal(
      components[componentName]?.status,
      "implemented",
      `${task.name}: ${componentName} is not implemented`,
    );
  for (const iconName of task.icons)
    assert.ok(icons[iconName], `${task.name}: icon missing: ${iconName}`);

  const cliOutput = execFileSync(
    process.execPath,
    [cliPath, "find", task.query],
    { cwd: repoRoot, encoding: "utf8" },
  );
  assert.match(cliOutput, new RegExp(`Recipe: ${task.recipe}`));
  if (recipe.shell)
    assert.match(
      cliOutput,
      new RegExp(`Shell: ${recipe.shell.preferred}`),
      `${task.name}: CLI omits the recipe shell contract`,
    );
  for (const componentName of recipe.components)
    assert.match(
      cliOutput,
      new RegExp(componentName),
      `${task.name}: CLI omits ${componentName}`,
    );
  for (const blockName of recipe.blocks ?? []) {
    assert.ok(blocks[blockName], `${task.name}: block missing: ${blockName}`);
    assert.match(
      cliOutput,
      new RegExp(blockName),
      `${task.name}: CLI omits ${blockName}`,
    );
  }
  if (recipe.blockRoles) {
    const roleNames = [
      ...(recipe.blockRoles.required ?? []),
      ...(recipe.blockRoles.recommended ?? []),
      ...(recipe.blockRoles.optional ?? []),
    ];
    assert.deepEqual(
      [...new Set(roleNames)].sort(),
      [...new Set(recipe.blocks ?? [])].sort(),
      `${task.name}: block role metadata does not classify every block`,
    );
    for (const role of ["required", "recommended", "optional"])
      for (const blockName of recipe.blockRoles[role] ?? [])
        assert.match(
          cliOutput,
          new RegExp(blockName),
          `${task.name}: CLI omits ${role} block ${blockName}`,
        );
  }
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
for (const requiredPhrase of [
  "recipe",
  "component",
  "semantic",
  "donor",
  "shell",
])
  assert.match(
    agentContract,
    new RegExp(requiredPhrase),
    `agent contract missing: ${requiredPhrase}`,
  );

console.log(
  `Cold-start references verified: ${tasks.length} tasks, ${allowedReads.length} contract/catalog reads, 0 donor reads.`,
);
