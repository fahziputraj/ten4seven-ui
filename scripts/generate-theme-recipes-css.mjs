import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import prettier from "prettier";

import {
  THEME_RECIPES,
  themeRecipeToLegacyConfig,
} from "../packages/contracts/src/theme-recipe.ts";
import {
  buildThemeVariables,
  resolveTheme,
} from "../packages/tokens/src/theme.ts";

const repoRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const outputPath = resolve(repoRoot, "packages/tokens/src/theme-recipes.css");
const modes = ["light", "dark"];
const densities = ["comfortable", "default", "compact", "dense"];
const densityVariables = [
  "--t7-control-height",
  "--t7-row-height",
  "--t7-menu-height",
  "--t7-card-padding",
  "--t7-section-gap",
  "--t7-control-gap",
  "--t7-control-padding-inline",
  "--t7-control-padding-inline-small",
  "--t7-control-padding-inline-large",
  "--t7-field-padding-inline",
  "--t7-field-gap",
  "--t7-card-header-gap",
  "--t7-card-content-gap",
  "--t7-card-footer-padding-block",
  "--t7-panel-padding",
  "--t7-menu-padding-inline",
  "--t7-menu-padding-block",
  "--t7-overlay-padding",
  "--t7-table-cell-padding-inline",
  "--t7-header-height",
  "--t7-grid-gap",
  "--t7-section-tight",
  "--t7-cluster-default",
  "--t7-cluster-loose",
  "--t7-kpi-icon-size",
  "--t7-kpi-chart-height",
];

function declarationBlock(selector, variables) {
  const declarations = Object.entries(variables)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");
  return `${selector} {\n${declarations}\n}`;
}

function recipeBlock(recipe, mode) {
  const config = themeRecipeToLegacyConfig(recipe);
  const theme = resolveTheme({ ...config, appearance: mode });
  const variables = buildThemeVariables(theme, {
    recipe: recipe.id,
    expression: recipe.expression,
    composition: recipe.composition,
    motionProfile: recipe.profile.motion.profile,
  });
  return declarationBlock(
    `:where([data-t7-theme="${recipe.id}"][data-t7-mode="${mode}"])`,
    variables,
  );
}

function densityBlock(density) {
  const variables = buildThemeVariables(resolveTheme({ density }));
  return declarationBlock(`:where([data-t7-density="${density}"])`, {
    ...Object.fromEntries(
      densityVariables.map((name) => [name, variables[name]]),
    ),
    // Radius stays authored by the recipe; density only selects its data ceiling.
    "--t7-radius-data": `min(var(--t7-radius-panel), ${density === "compact" || density === "dense" ? 10 : 16}px)`,
    "--t7-card-safe-inset":
      "max(var(--t7-card-padding), var(--t7-card-corner-clearance))",
    "--t7-overlay-safe-inset":
      "max(var(--t7-overlay-padding), var(--t7-panel-corner-clearance))",
  });
}

function reducedMotionBlock() {
  const full = buildThemeVariables(resolveTheme());
  const reduced = buildThemeVariables(resolveTheme(), { motion: "reduced" });
  return declarationBlock(
    ':where([data-t7-motion-preference="reduced"])',
    Object.fromEntries(
      Object.entries(reduced).filter(
        ([name, value]) => full[name] !== value && name !== "--t7-theme-recipe",
      ),
    ),
  );
}

export function renderThemeRecipeCss() {
  const recipeBlocks = Object.values(THEME_RECIPES).flatMap((recipe) =>
    modes.map((mode) => recipeBlock(recipe, mode)),
  );

  return [
    "/* Generated from packages/contracts/src/theme-recipe.ts. Do not edit by hand. */",
    "/* CSS-first recipe contract: recipe plus mode establishes authored tokens. */",
    ...recipeBlocks,
    "/* Runtime density remains an independent user preference. */",
    ...densities.map((density) => densityBlock(density)),
    "/* More contrast strengthens semantic borders, muted text, and focus without changing a recipe. */",
    declarationBlock(':where([data-t7-contrast="more"])', {
      "--t7-contrast": "more",
      "--t7-border-hsl": "var(--t7-border-strong-hsl)",
      "--t7-muted-foreground-hsl": "var(--t7-muted-foreground-strong-hsl)",
      "--t7-focus-width": "3px",
      "--t7-chart-label-hsl": "var(--t7-muted-foreground-strong-hsl)",
      "--t7-chart-grid-hsl": "var(--t7-border-strong-hsl)",
    }),
    "/* An explicit reduced preference complements the operating-system media query. */",
    reducedMotionBlock(),
    [
      ':where([data-t7-motion-preference="reduced"]) *,',
      ':where([data-t7-motion-preference="reduced"]) *::before,',
      ':where([data-t7-motion-preference="reduced"]) *::after {',
      "  scroll-behavior: auto !important;",
      "  transition-duration: 0.01ms !important;",
      "  animation-duration: 0.01ms !important;",
      "  animation-iteration-count: 1 !important;",
      "}",
    ].join("\n"),
    "",
  ].join("\n\n");
}

async function formatThemeRecipeCss() {
  return prettier.format(renderThemeRecipeCss(), { parser: "css" });
}

if (process.argv.includes("--stdout")) {
  process.stdout.write(await formatThemeRecipeCss());
} else {
  await writeFile(outputPath, await formatThemeRecipeCss(), "utf8");
  console.log(`Generated ${outputPath}`);
}
