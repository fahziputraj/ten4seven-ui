#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = path.resolve(import.meta.dirname, "../../..");
const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
const readJsonIfPresent = (relativePath, fallbackPath) => {
  const target = path.join(repoRoot, relativePath);
  return fs.existsSync(target)
    ? readJson(relativePath)
    : readJson(fallbackPath);
};

// Recipe discovery reads generated recipe shards. Full catalogs remain a
// deliberate fallback for compatibility and the explicit `show` command.
const selectiveIndex = readJsonIfPresent(
  "generated/index.json",
  "generated/agent-index.json",
);
const recipes = selectiveIndex.recipes
  ? Object.fromEntries(
      Object.entries(selectiveIndex.recipes).map(([name, reference]) => [
        name,
        readJson(`generated/${reference.path}`),
      ]),
    )
  : readJson("packages/ai/catalog/recipes.json");
const packageInfo = readJson("package.json");
const {
  composeBrandExpression,
  composeEntityDetail,
  composeEntityList,
  inspectBrandExpression,
  inspectEntityDetail,
  inspectEntityList,
  resolveBrandExpression,
  resolveEntityDetailIntent,
} = await import("../../agent/src/node.mjs");

function readFullComponents() {
  return readJson("packages/ai/catalog/components.json");
}

function readBlocks() {
  return readJson("packages/ai/catalog/blocks.json");
}

function readIcons() {
  return readJson("packages/ai/catalog/icons.json");
}

function printInfo() {
  console.log(`ten4seven UI ${packageInfo.version}`);
  console.log(
    "default theme: appearance=light palette=emerald primary=emerald accent=emerald canvas=balanced chartPalette=spectrum radius=soft density=default typography=modern",
  );
  console.log(
    "available profiles: enterprise, dashboard, commerce, content, marketing",
  );
  console.log("semantic icon registry: local static bundle");
}

function flatten(value) {
  return JSON.stringify(value).toLowerCase();
}

function findRecipe(query) {
  const normalized = query.toLowerCase();
  const directHints = [
    ["control tower", "control-tower"],
    ["process workspace", "process-workspace"],
    ["process tracker", "process-workspace"],
    ["operational kanban", "operational-kanban"],
    ["load planner", "load-planning"],
    ["load planning", "load-planning"],
    ["receiving console", "receiving-console"],
    ["receiving", "receiving-console"],
    ["unload", "receiving-console"],
    ["route planner", "route-planning"],
    ["route planning", "route-planning"],
    ["entity 360", "entity-360"],
    ["business partner", "entity-360"],
    ["decision workspace", "decision-workspace"],
    ["exception queue", "exception-queue"],
    ["activity audit", "activity-audit"],
    ["audit stream", "activity-audit"],
    ["resource forecast", "resource-forecast"],
    ["time to empty", "resource-forecast"],
    ["days of cover", "resource-forecast"],
    ["registration", "auth"],
    ["employee", "entity-form"],
    ["filter drawer", "entity-list"],
    ["operations tracker", "entity-list"],
    ["customer intelligence", "entity-list"],
    ["delivery tracker", "entity-list"],
    ["work queue", "entity-list"],
    ["file upload", "entity-form"],
    ["confirmation", "entity-detail"],
    ["kpi", "dashboard"],
    ["public catalog", "catalog"],
    ["cart", "cart"],
    ["warehouse", "entity-list"],
    ["inventory", "entity-list"],
    ["stock-in", "entity-list"],
    ["stock-out", "entity-list"],
    ["invoice", "entity-list"],
    ["approval", "approval-queue"],
    ["report", "report"],
    ["settings", "settings"],
    ["checkout", "checkout"],
    ["ebook reader", "ebook-reader"],
    ["reader", "ebook-reader"],
    ["product detail", "product-detail"],
    ["product", "product-detail"],
    ["content detail", "content-detail"],
    ["content", "content-list"],
    ["record detail", "entity-detail"],
    ["entity detail", "entity-detail"],
    ["detail", "entity-detail"],
    ["entity form", "entity-form"],
    ["form", "entity-form"],
    ["master detail", "master-detail"],
    ["master", "master-detail"],
    ["sign in", "auth"],
    ["auth", "auth"],
    ["marketing", "marketing-home"],
    ["public showcase", "marketing-home"],
    ["dashboard", "dashboard"],
    ["ebook", "catalog"],
    ["book", "catalog"],
    ["store", "catalog"],
    ["catalog", "catalog"],
  ];
  const hinted = directHints.find(([term]) => normalized.includes(term))?.[1];
  if (hinted) return hinted;

  return Object.entries(recipes)
    .map(([name, recipe]) => ({
      name,
      score: flatten({ name, ...recipe }).split(normalized).length - 1,
    }))
    .sort((a, b) => b.score - a.score)[0]?.name;
}

function findIcons(query) {
  const normalized = query.toLowerCase();
  const icons = readIcons();
  const matches = Object.entries(icons)
    .filter(([name, icon]) => flatten({ name, ...icon }).includes(normalized))
    .map(([name]) => name);
  const domainIcons = [
    [
      "operations",
      [
        "analytics",
        "users",
        "delivery",
        "package",
        "logistics",
        "payment",
        "timeline",
        "search",
      ],
    ],
    [
      "inventory",
      [
        "warehouse",
        "inventory",
        "stockIn",
        "stockOut",
        "transfer",
        "filter",
        "sort",
        "search",
        "export",
        "add",
        "view",
        "warning",
        "danger",
      ],
    ],
    [
      "warehouse",
      [
        "warehouse",
        "stock",
        "stockIn",
        "stockOut",
        "transfer",
        "filter",
        "sort",
        "search",
        "export",
        "add",
      ],
    ],
    ["invoice", ["invoice", "search", "filter", "export", "add"]],
    ["approval", ["approve", "search", "filter", "edit", "warning"]],
    ["report", ["chart", "analytics", "calendar", "export", "filter"]],
    ["settings", ["settings", "user", "lock", "notification", "check"]],
    ["auth", ["lock", "user", "eye", "eyeOff", "check"]],
    ["reader", ["ebook", "book", "progress", "type", "settings"]],
    ["cart", ["cart", "checkout", "delete", "plus", "favorite"]],
    ["product", ["package", "rating", "cart", "favorite", "preview"]],
    ["detail", ["view", "edit", "timeline", "more", "warning"]],
    ["form", ["edit", "check", "calendar", "upload", "clear"]],
    [
      "store",
      [
        "book",
        "ebook",
        "catalog",
        "category",
        "cart",
        "favorite",
        "rating",
        "search",
        "filter",
      ],
    ],
    [
      "catalog",
      [
        "book",
        "ebook",
        "catalog",
        "category",
        "cart",
        "favorite",
        "rating",
        "search",
        "filter",
      ],
    ],
    [
      "ebook",
      ["book", "ebook", "author", "cart", "favorite", "search", "filter"],
    ],
    [
      "showcase",
      ["components", "type", "chart", "book", "arrowRight", "check"],
    ],
  ];
  const additions =
    domainIcons.find(([term]) => normalized.includes(term))?.[1] ?? [];
  return [...new Set([...additions, ...matches])].slice(0, 8);
}

function printFind(query) {
  const recipeName = findRecipe(query);
  const recipe = recipes[recipeName];
  const blocks = readBlocks();
  console.log(`Query: ${query}`);
  console.log(`Recipe: ${recipeName ?? "inspect manually"}`);
  if (recipe) {
    console.log(`Profiles: ${recipe.profiles.join(", ")}`);
    if (recipe.shell)
      console.log(
        `Shell: ${recipe.shell.preferred}${recipe.shell.alternatives?.length ? ` (alternatives: ${recipe.shell.alternatives.join(", ")})` : ""}`,
      );
    console.log("Components:");
    for (const name of [...recipe.components, ...(recipe.optional ?? [])])
      console.log(`- ${name}`);
    if (recipe.blocks?.length) {
      console.log("Blocks:");
      const blockGroups = recipe.blockRoles
        ? [
            ["required", recipe.blockRoles.required],
            ["recommended", recipe.blockRoles.recommended],
            ["optional", recipe.blockRoles.optional],
          ]
        : [["available", recipe.blocks]];
      for (const [role, names] of blockGroups) {
        if (!names?.length) continue;
        console.log(`${role[0].toUpperCase()}${role.slice(1)} blocks:`);
        for (const name of names)
          console.log(`- ${name}: ${blocks[name]?.displayName ?? name}`);
      }
    }
  }
  console.log("Icons:");
  const semanticIcons = [
    ...new Set([...findIcons(query), ...(recipe?.icons ?? [])]),
  ].slice(0, 8);
  for (const name of semanticIcons) console.log(`- ${name}`);
}

function printComponent(name) {
  const fullComponents = readFullComponents();
  const key = Object.keys(fullComponents).find(
    (candidate) => candidate.toLowerCase() === name.toLowerCase(),
  );
  if (!key) {
    console.error(`Unknown component: ${name}`);
    process.exitCode = 1;
    return;
  }
  console.log(JSON.stringify({ name: key, ...fullComponents[key] }, null, 2));
}

function printRecipeInspect(name) {
  if (name === "entity-list") {
    console.log(JSON.stringify(inspectEntityList(), null, 2));
    return;
  }
  if (name === "entity-detail") {
    console.log(JSON.stringify(inspectEntityDetail(), null, 2));
    return;
  }
  if (recipes[name]?.operational) {
    console.log(JSON.stringify(recipes[name], null, 2));
    return;
  }
  {
    console.error(
      `Only migrated recipe contracts are inspectable in this phase: ${name || "missing name"}`,
    );
    process.exitCode = 1;
  }
}

function parseComposeInput(args) {
  const input = {};
  const operations = args.find((arg) => arg.startsWith("--operations="));
  if (operations)
    input.operations = operations
      .slice("--operations=".length)
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
  const mobile = args.find((arg) => arg.startsWith("--mobile="));
  if (mobile) input.mobileMode = mobile.slice("--mobile=".length);
  const selection = args.find((arg) => arg.startsWith("--selection="));
  if (selection) input.selection = selection.slice("--selection=".length);
  const navigation = args.find((arg) => arg.startsWith("--navigation="));
  if (navigation) input.navigation = navigation.slice("--navigation=".length);
  const detail = args.find((arg) => arg.startsWith("--detail="));
  if (detail) input.detail = detail.slice("--detail=".length);
  if (args.includes("--no-sidebar")) input.persistentNavigation = false;
  if (args.includes("--no-metrics")) input.showMetrics = false;
  if (args.includes("--no-filters")) input.queryControls = false;
  if (args.includes("--no-pagination")) input.paginated = false;
  if (args.includes("--no-bulk-actions")) input.bulkActions = false;
  if (args.includes("--no-detail")) input.contextualDetail = false;
  return input;
}

function printCompose(name, args) {
  if (name === "entity-detail") {
    console.log(
      JSON.stringify(composeEntityDetail(parseDetailInput(args)), null, 2),
    );
    return;
  }
  if (name !== "entity-list") {
    console.error(
      `Only migrated recipe contracts are composable in this phase: ${name || "missing name"}`,
    );
    process.exitCode = 1;
    return;
  }
  console.log(
    JSON.stringify(composeEntityList(parseComposeInput(args)), null, 2),
  );
}

function parseDetailInput(args) {
  const input = {};
  const operations = args.find((arg) => arg.startsWith("--operations="));
  if (operations)
    input.operations = operations
      .slice("--operations=".length)
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
  const mobile = args.find((arg) => arg.startsWith("--mobile="));
  if (mobile) input.mobileMode = mobile.slice("--mobile=".length);
  const navigation = args.find((arg) => arg.startsWith("--navigation="));
  if (navigation) input.navigation = navigation.slice("--navigation=".length);
  if (args.includes("--workspace")) input.persistentNavigation = true;
  if (args.includes("--read-only")) input.readOnly = true;
  if (args.includes("--no-status")) input.showStatus = false;
  if (args.includes("--no-activity")) input.activity = "none";
  if (args.includes("--minimal-activity")) input.activity = "minimal";
  if (args.includes("--quick-actions")) input.quickActions = true;
  if (args.includes("--no-actions")) input.actionFooter = false;
  if (args.includes("--related-records")) input.relatedRecords = true;
  if (args.includes("--alert")) input.showAlert = true;
  if (args.includes("--confirm")) input.confirmActions = true;
  return input;
}

function parseBrandInput(args) {
  const input = {};
  const profile = args.find(
    (arg) => arg.startsWith("--profile=") || arg.startsWith("--brand-profile="),
  );
  if (profile) {
    const prefix = profile.startsWith("--profile=")
      ? "--profile="
      : "--brand-profile=";
    input.brandProfile = profile.slice(prefix.length);
  }
  return input;
}

function printBrand(command, name, args) {
  if (name !== "auth") {
    console.error(
      `Only the canonical Authentication recipe has a Brand Expression proof in Slice B: ${name || "missing name"}`,
    );
    process.exitCode = 1;
    return;
  }

  const input = parseBrandInput(args);
  const result =
    command === "resolve"
      ? resolveBrandExpression(input)
      : composeBrandExpression(input);
  console.log(JSON.stringify(result, null, 2));
}

function initAgents() {
  const template = fs.readFileSync(
    path.join(repoRoot, "packages/ai/templates/AGENTS.ten4seven.md"),
    "utf8",
  );
  const consumerRoot = process.cwd();
  const canonicalPath = path.join(consumerRoot, "AGENTS.md");
  const targetPath = fs.existsSync(canonicalPath)
    ? path.join(consumerRoot, "AGENTS.ten4seven.md")
    : canonicalPath;
  if (fs.existsSync(targetPath)) {
    console.log(`Not overwritten: ${targetPath}`);
    console.log("Review the template and merge it intentionally.");
    return;
  }
  fs.writeFileSync(targetPath, template);
  console.log(`Created ${targetPath}`);
}

const [command, ...args] = process.argv.slice(2);

switch (command) {
  case "info":
    printInfo();
    break;
  case "find":
    printFind(args.join(" ").trim() || "dashboard");
    break;
  case "show":
    printComponent(args[0] ?? "");
    break;
  case "recipe":
    if (args[0] === "inspect") printRecipeInspect(args[1] ?? "");
    else {
      console.error("Usage: t7ui recipe inspect entity-list");
      process.exitCode = 1;
    }
    break;
  case "compose":
    printCompose(args[0] ?? "", args.slice(1));
    break;
  case "brand":
    if (args[0] === "inspect") {
      if (args[1] !== "auth") {
        console.error("Usage: t7ui brand inspect auth");
        process.exitCode = 1;
      } else {
        console.log(JSON.stringify(inspectBrandExpression(), null, 2));
      }
    } else if (args[0] === "resolve" || args[0] === "compose") {
      printBrand(args[0], args[1] ?? "", args.slice(2));
    } else {
      console.error(
        "Usage: t7ui brand resolve auth [--profile=neutral-product|aapm-academy] | t7ui brand compose auth [--profile=neutral-product|aapm-academy]",
      );
      process.exitCode = 1;
    }
    break;
  case "agents":
    if (args[0] === "init") initAgents();
    else console.error("Usage: t7ui agents init");
    break;
  default:
    console.log(
      "Usage: t7ui info | t7ui find <query> | t7ui show <Component> | t7ui recipe inspect entity-list | t7ui compose entity-list [options] | t7ui brand resolve auth [--profile=neutral-product|aapm-academy] | t7ui brand compose auth [--profile=neutral-product|aapm-academy] | t7ui agents init",
    );
    process.exitCode = command ? 1 : 0;
}
