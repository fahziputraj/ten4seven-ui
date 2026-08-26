#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = path.resolve(import.meta.dirname, "../../..");
const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));

const recipes = readJson("packages/ai/catalog/recipes.json");
const components = readJson("packages/ai/catalog/components.json");
const icons = readJson("packages/ai/catalog/icons.json");
const packageInfo = readJson("package.json");

function printInfo() {
  console.log(`ten4seven UI ${packageInfo.version}`);
  console.log(
    "default theme: appearance=light palette=emerald radius=soft density=default typography=modern",
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
  const directHints = {
    inventory: "entity-list",
    warehouse: "entity-list",
    "stock-in": "entity-list",
    "stock-out": "entity-list",
    approval: "approval-queue",
    invoice: "entity-list",
    book: "catalog",
    store: "catalog",
    catalog: "catalog",
    ebook: "ebook-reader",
    checkout: "checkout",
    marketing: "marketing-home",
    settings: "settings",
    report: "report",
  };
  const hinted = Object.entries(directHints).find(([term]) =>
    normalized.includes(term),
  )?.[1];
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
  const matches = Object.entries(icons)
    .filter(([name, icon]) => flatten({ name, ...icon }).includes(normalized))
    .map(([name]) => name);
  const domainIcons = {
    inventory: [
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
    warehouse: [
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
    invoice: ["invoice", "search", "filter", "export", "add"],
    store: [
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
    catalog: [
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
    ebook: ["book", "ebook", "author", "cart", "favorite", "search", "filter"],
  };
  const additions =
    Object.entries(domainIcons).find(([term]) =>
      normalized.includes(term),
    )?.[1] ?? [];
  return [...new Set([...additions, ...matches])].slice(0, 8);
}

function printFind(query) {
  const recipeName = findRecipe(query);
  const recipe = recipes[recipeName];
  console.log(`Query: ${query}`);
  console.log(`Recipe: ${recipeName ?? "inspect manually"}`);
  if (recipe) {
    console.log(`Profiles: ${recipe.profiles.join(", ")}`);
    console.log("Components:");
    for (const name of [...recipe.components, ...(recipe.optional ?? [])])
      console.log(`- ${name}`);
  }
  console.log("Icons:");
  for (const name of findIcons(query)) console.log(`- ${name}`);
}

function printComponent(name) {
  const key = Object.keys(components).find(
    (candidate) => candidate.toLowerCase() === name.toLowerCase(),
  );
  if (!key) {
    console.error(`Unknown component: ${name}`);
    process.exitCode = 1;
    return;
  }
  console.log(JSON.stringify({ name: key, ...components[key] }, null, 2));
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
  case "agents":
    if (args[0] === "init") initAgents();
    else console.error("Usage: t7ui agents init");
    break;
  default:
    console.log(
      "Usage: t7ui info | t7ui find <query> | t7ui show <Component> | t7ui agents init",
    );
    process.exitCode = command ? 1 : 0;
}
