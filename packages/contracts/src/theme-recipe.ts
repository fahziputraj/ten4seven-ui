import type {
  LegacyThemeConfigLike,
  RuntimePreferences,
  ResolvedRuntimePreferences,
  ThemeComposition,
  ThemeRecipe,
  ThemeRecipeName,
} from "./types.ts";
import {
  themeProfileToLegacyConfig,
  normalizeThemeProfile,
} from "./theme-profile.ts";

export const DEFAULT_RUNTIME_PREFERENCES: ResolvedRuntimePreferences = {
  appearance: "system",
  density: "default",
  contrast: "standard",
  motion: "full",
};

const defaultComposition: ThemeComposition = {
  contentMax: "1440px",
  readingMeasure: "68ch",
  pageGutter: "clamp(24px, 3vw, 44px)",
  sectionGap: "clamp(24px, 3vw, 44px)",
};

function recipeProfile(id: ThemeRecipeName, input: LegacyThemeConfigLike) {
  return { ...normalizeThemeProfile(input), id };
}

/**
 * Curated recipes are the authored product language. Runtime preferences and
 * advanced overrides are applied after this stable baseline is selected.
 */
export const THEME_RECIPES: Readonly<Record<ThemeRecipeName, ThemeRecipe>> = {
  enterprise: {
    id: "enterprise",
    label: "Enterprise",
    description:
      "Quiet, scan-friendly operational surfaces with clear actions and restrained elevation.",
    expression: "operational",
    profile: recipeProfile("enterprise", {
      appearance: "light",
      palette: "slate",
      primary: "indigo",
      accent: "cyan",
      canvas: "balanced",
      chartPalette: "spectrum",
      radius: "soft",
      density: "default",
      motionDuration: 1.25,
      typography: "modern",
      elevation: "soft",
    }),
    composition: defaultComposition,
  },
  product: {
    id: "product",
    label: "Product",
    description:
      "Balanced application surfaces for product workflows, dashboards, and decision-making.",
    expression: "product",
    profile: recipeProfile("product", {
      appearance: "light",
      palette: "blue",
      primary: "indigo",
      accent: "cyan",
      canvas: "balanced",
      chartPalette: "spectrum",
      radius: "soft",
      density: "default",
      motionDuration: 1.25,
      typography: "modern",
      elevation: "soft",
    }),
    composition: {
      ...defaultComposition,
      contentMax: "1320px",
    },
  },
  editorial: {
    id: "editorial",
    label: "Editorial",
    description:
      "Measured reading surfaces with generous rhythm, paper neutrals, and restrained controls.",
    expression: "editorial",
    profile: recipeProfile("editorial", {
      appearance: "light",
      palette: "slate",
      primary: "slate",
      accent: "amber",
      canvas: "paper",
      chartPalette: "four",
      radius: "sharp",
      density: "comfortable",
      motionDuration: 1.5,
      typography: "editorial",
      elevation: "flat",
    }),
    composition: {
      contentMax: "1180px",
      readingMeasure: "70ch",
      pageGutter: "clamp(24px, 5vw, 72px)",
      sectionGap: "clamp(32px, 5vw, 72px)",
    },
  },
  commerce: {
    id: "commerce",
    label: "Commerce",
    description:
      "Confident product browsing with clear buying actions and approachable rounded geometry.",
    expression: "commerce",
    profile: recipeProfile("commerce", {
      appearance: "light",
      palette: "emerald",
      primary: "emerald",
      accent: "orange",
      canvas: "paper",
      chartPalette: "spectrum",
      radius: "rounded",
      density: "default",
      motionDuration: 1.25,
      typography: "humanist",
      elevation: "soft",
    }),
    composition: {
      contentMax: "1360px",
      readingMeasure: "64ch",
      pageGutter: "clamp(20px, 3vw, 48px)",
      sectionGap: "clamp(28px, 4vw, 56px)",
    },
  },
};

export const THEME_RECIPE_NAMES = Object.freeze(
  Object.keys(THEME_RECIPES) as ThemeRecipeName[],
);

export function isThemeRecipeName(value: unknown): value is ThemeRecipeName {
  return typeof value === "string" && value in THEME_RECIPES;
}

export function getThemeRecipe(
  value: ThemeRecipeName | undefined,
): ThemeRecipe | undefined {
  return value ? THEME_RECIPES[value] : undefined;
}

export function resolveRuntimePreferences(
  preferences: RuntimePreferences = {},
): ResolvedRuntimePreferences {
  return {
    appearance:
      preferences.appearance === "light" ||
      preferences.appearance === "dark" ||
      preferences.appearance === "system"
        ? preferences.appearance
        : DEFAULT_RUNTIME_PREFERENCES.appearance,
    density:
      preferences.density === "comfortable" ||
      preferences.density === "default" ||
      preferences.density === "compact" ||
      preferences.density === "dense"
        ? preferences.density
        : DEFAULT_RUNTIME_PREFERENCES.density,
    contrast:
      preferences.contrast === "more"
        ? "more"
        : DEFAULT_RUNTIME_PREFERENCES.contrast,
    motion:
      preferences.motion === "reduced"
        ? "reduced"
        : DEFAULT_RUNTIME_PREFERENCES.motion,
  };
}

/**
 * Compatibility seam: a v2 recipe still resolves through the existing token
 * runtime, so established `ThemeConfig` consumers remain operational.
 */
export function themeRecipeToLegacyConfig(recipe: ThemeRecipe) {
  return themeProfileToLegacyConfig(recipe.profile);
}
