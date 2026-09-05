import assert from "node:assert/strict";

import {
  THEME_RECIPES,
  THEME_RECIPE_NAMES,
  themeRecipeToLegacyConfig,
} from "../packages/contracts/src/theme-recipe.ts";
import {
  buildThemeVariables,
  resolveTheme,
} from "../packages/tokens/src/theme.ts";

const requiredRatio = 4.5;

function parseHsl(value) {
  const match = /^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/.exec(
    value.trim(),
  );
  assert.ok(match, `Expected concrete HSL token, received: ${value}`);
  return {
    h: Number(match[1]) / 360,
    s: Number(match[2]) / 100,
    l: Number(match[3]) / 100,
  };
}

function hueToRgb(p, q, t) {
  let adjusted = t;
  if (adjusted < 0) adjusted += 1;
  if (adjusted > 1) adjusted -= 1;
  if (adjusted < 1 / 6) return p + (q - p) * 6 * adjusted;
  if (adjusted < 1 / 2) return q;
  if (adjusted < 2 / 3) return p + (q - p) * (2 / 3 - adjusted) * 6;
  return p;
}

function hslToRgb(value) {
  const { h, l, s } = parseHsl(value);
  if (s === 0) return [l, l, l];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    hueToRgb(p, q, h + 1 / 3),
    hueToRgb(p, q, h),
    hueToRgb(p, q, h - 1 / 3),
  ];
}

function relativeLuminanceFromRgb(rgb) {
  return rgb
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    )
    .reduce(
      (luminance, channel, index) =>
        luminance + channel * [0.2126, 0.7152, 0.0722][index],
      0,
    );
}

function relativeLuminance(hsl) {
  return relativeLuminanceFromRgb(hslToRgb(hsl));
}

function contrastRatio(background, foreground) {
  const [light, dark] = [
    relativeLuminance(background),
    relativeLuminance(foreground),
  ].sort((left, right) => right - left);
  return (light + 0.05) / (dark + 0.05);
}

function assertContrast(label, variables, background, foreground) {
  const ratio = contrastRatio(variables[background], variables[foreground]);
  assert.ok(
    ratio >= requiredRatio,
    `${label}: ${background} / ${foreground} is ${ratio.toFixed(2)}:1; expected at least ${requiredRatio}:1`,
  );
  return ratio;
}

function assertWhiteHighlightContrast(label, variables, background) {
  const highlightAlpha = 0.08;
  const highlightedRgb = hslToRgb(variables[background]).map(
    (channel) => channel * (1 - highlightAlpha) + highlightAlpha,
  );
  const ratio = 1.05 / (relativeLuminanceFromRgb(highlightedRgb) + 0.05);
  assert.ok(
    ratio >= requiredRatio,
    `${label}: ${background} under the ${highlightAlpha} white highlight is ${ratio.toFixed(2)}:1; expected at least ${requiredRatio}:1`,
  );
  return ratio;
}

const pairs = [
  ["canvas text", "--t7-background-hsl", "--t7-foreground-hsl"],
  ["surface text", "--t7-surface-hsl", "--t7-foreground-hsl"],
  ["surface muted text", "--t7-surface-hsl", "--t7-muted-foreground-hsl"],
  [
    "primary foreground",
    "--t7-action-primary-hsl",
    "--t7-action-primary-foreground-hsl",
  ],
  [
    "danger foreground",
    "--t7-action-danger-hsl",
    "--t7-action-danger-foreground-hsl",
  ],
  ["field text", "--t7-field-background-hsl", "--t7-field-foreground-hsl"],
  ["selected foreground", "--t7-selected-hsl", "--t7-selected-foreground-hsl"],
  [
    "solid surface foreground",
    "--t7-surface-emphasis-solid-hsl",
    "--t7-surface-emphasis-solid-foreground-hsl",
  ],
  [
    "solid success foreground",
    "--t7-surface-emphasis-solid-success-hsl",
    "--t7-surface-emphasis-solid-success-foreground-hsl",
  ],
  [
    "solid warning foreground",
    "--t7-surface-emphasis-solid-warning-hsl",
    "--t7-surface-emphasis-solid-warning-foreground-hsl",
  ],
  [
    "solid danger foreground",
    "--t7-surface-emphasis-solid-danger-hsl",
    "--t7-surface-emphasis-solid-danger-foreground-hsl",
  ],
  [
    "solid info foreground",
    "--t7-surface-emphasis-solid-info-hsl",
    "--t7-surface-emphasis-solid-info-foreground-hsl",
  ],
  ...[1, 2, 3, 4, 5].map((index) => [
    `solid chart ${index} foreground`,
    `--t7-surface-emphasis-solid-chart-${index}-hsl`,
    "--t7-surface-emphasis-solid-chart-foreground-hsl",
  ]),
];

const results = [];
for (const recipeName of THEME_RECIPE_NAMES) {
  const recipe = THEME_RECIPES[recipeName];
  const base = themeRecipeToLegacyConfig(recipe);
  for (const appearance of ["light", "dark"]) {
    const variables = buildThemeVariables(
      resolveTheme({ ...base, appearance }),
      { recipe: recipe.id, composition: recipe.composition },
    );
    for (const [pair, background, foreground] of pairs)
      results.push({
        appearance,
        pair,
        ratio: assertContrast(
          `${recipeName} ${appearance} ${pair}`,
          variables,
          background,
          foreground,
        ),
        recipe: recipeName,
      });
    for (const index of [1, 2, 3, 4, 5])
      results.push({
        appearance,
        pair: `solid chart ${index} highlighted foreground`,
        ratio: assertWhiteHighlightContrast(
          `${recipeName} ${appearance} solid chart ${index} highlighted foreground`,
          variables,
          `--t7-surface-emphasis-solid-chart-${index}-hsl`,
        ),
        recipe: recipeName,
      });

    const inverseVariables = buildThemeVariables(
      resolveTheme({
        ...base,
        appearance: appearance === "light" ? "dark" : "light",
      }),
      { recipe: recipe.id, composition: recipe.composition },
    );
    results.push({
      appearance: `${appearance} inverse`,
      pair: "inverse scope text",
      ratio: assertContrast(
        `${recipeName} ${appearance} inverse scope text`,
        inverseVariables,
        "--t7-background-hsl",
        "--t7-foreground-hsl",
      ),
      recipe: recipeName,
    });
  }
}

const lowest = results.reduce((current, result) =>
  result.ratio < current.ratio ? result : current,
);
console.log(
  `Semantic contrast gate verified: ${results.length} recipe/mode pairs at WCAG AA ${requiredRatio}:1; lowest ${lowest.recipe} ${lowest.appearance} ${lowest.pair} ${lowest.ratio.toFixed(2)}:1.`,
);
