import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";

import {
  getThemeRecipe,
  isThemeRecipeName,
  resolveRuntimePreferences,
  themeRecipeToLegacyConfig,
  type ResolvedRuntimePreferences,
  type RuntimePreferences,
  type ThemeComposition,
  type ThemeRecipeName,
} from "@ten4seven/contracts";

import {
  buildThemeVariables,
  resolveAppearance,
  resolveTheme,
  type Appearance,
  type CanvasName,
  type ChartPaletteName,
  type DensityName,
  type ElevationName,
  type PaletteName,
  type RadiusName,
  type ResolvedTheme,
  type ThemeConfig,
  type TypographyName,
} from "@ten4seven/tokens";

/**
 * Expert escape hatch applied after a recipe and before local persisted edits.
 * Keep product-level choices in a recipe; use this only for a deliberate
 * semantic token or legacy-axis exception.
 */
export interface ThemeOverrides {
  /** Existing advanced axes remain available without inventing a second theme model. */
  config?: Partial<ThemeConfig>;
  /** Direct semantic custom-property overrides for a bounded brand exception. */
  variables?: Readonly<Record<`--t7-${string}`, string | number>>;
}

export interface Ten4SevenProviderProps extends PropsWithChildren<ThemeConfig> {
  /** A curated v2 recipe or the established advanced ThemeConfig object. */
  theme?: ThemeConfig | ThemeRecipeName;
  /** Per-user choices applied after the authored recipe. */
  preferences?: RuntimePreferences;
  /** Deliberate advanced exception after recipe selection and before persistence. */
  overrides?: ThemeOverrides;
  persistenceKey?: string;
  className?: string;
  style?: CSSProperties;
}

interface ThemeContextValue {
  appearanceSetting: Appearance;
  theme: ResolvedTheme;
  recipe?: ThemeRecipeName;
  expression: string;
  composition?: ThemeComposition;
  preferences: ResolvedRuntimePreferences;
  setTheme: (next: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readThemeOverrides(
  persistenceKey: string | undefined,
): Partial<ThemeConfig> {
  if (!persistenceKey || typeof window === "undefined") return {};
  try {
    const stored: unknown = JSON.parse(
      window.localStorage.getItem(persistenceKey) ?? "{}",
    );
    if (!stored || typeof stored !== "object" || Array.isArray(stored))
      return {};
    return stored as Partial<ThemeConfig>;
  } catch {
    return {};
  }
}

function resolveAppearanceSetting(value: unknown): Appearance {
  return value === "light" || value === "dark" || value === "system"
    ? value
    : "system";
}

function resolveSemanticVariables(
  variables: ThemeOverrides["variables"] | undefined,
): Record<string, string> {
  if (!variables) return {};
  return Object.fromEntries(
    Object.entries(variables)
      .filter(
        ([name, value]) =>
          name.startsWith("--t7-") &&
          (typeof value === "string" || typeof value === "number"),
      )
      .map(([name, value]) => [name, String(value)]),
  );
}

function resolvedThemeToConfig(theme: ResolvedTheme): ThemeConfig {
  return {
    appearance: theme.appearance,
    palette: theme.palette,
    primary: theme.primary,
    accent: theme.accent,
    canvas: theme.canvas,
    chartPalette: theme.chartPalette,
    radius: theme.radius,
    radiusValue: theme.radiusValue,
    density: theme.density,
    motionDuration: theme.motionDuration,
    typography: theme.typographyFamilies
      ? {
          preset: theme.typography,
          ui: theme.typographyFamilies.ui,
          display: theme.typographyFamilies.display,
          mono: theme.typographyFamilies.mono,
        }
      : theme.typography,
    elevation: theme.elevation,
  };
}

export function Ten4SevenProvider({
  appearance = "system",
  palette = "emerald",
  primary,
  accent,
  canvas = "balanced",
  chartPalette = "spectrum",
  radius = "soft",
  radiusValue,
  density = "default",
  motionDuration = 1.5,
  typography = "modern",
  elevation = "soft",
  theme: themeInput,
  preferences,
  overrides: advancedOverrides,
  persistenceKey,
  className,
  style,
  children,
}: Ten4SevenProviderProps) {
  const recipeName = isThemeRecipeName(themeInput) ? themeInput : undefined;
  const recipe = getThemeRecipe(recipeName);
  const recipeConfig = recipe ? themeRecipeToLegacyConfig(recipe) : undefined;
  const themeConfig =
    themeInput && typeof themeInput === "object" ? themeInput : undefined;
  const [systemAppearance, setSystemAppearance] = useState(() =>
    resolveAppearance("system"),
  );
  const [persistedOverrides, setPersistedOverrides] = useState<
    Partial<ThemeConfig>
  >(() => readThemeOverrides(persistenceKey));

  const mergedConfig = useMemo<ThemeConfig>(() => {
    const baseConfig: ThemeConfig = {
      appearance: recipeConfig?.appearance ?? appearance,
      palette: recipeConfig?.palette ?? palette,
      primary: recipeConfig?.primary ?? primary,
      accent: recipeConfig?.accent ?? accent,
      canvas: recipeConfig?.canvas ?? canvas,
      chartPalette: recipeConfig?.chartPalette ?? chartPalette,
      radius: recipeConfig?.radius ?? radius,
      radiusValue: recipeConfig?.radiusValue ?? radiusValue,
      density: recipeConfig?.density ?? density,
      motionDuration: recipeConfig?.motionDuration ?? motionDuration,
      typography: recipeConfig?.typography ?? typography,
      elevation: recipeConfig?.elevation ?? elevation,
    };
    const next = {
      ...baseConfig,
      ...themeConfig,
      ...advancedOverrides?.config,
      ...persistedOverrides,
    };
    if (preferences?.appearance !== undefined)
      next.appearance = preferences.appearance;
    if (preferences?.density !== undefined) next.density = preferences.density;
    return next;
  }, [
    accent,
    advancedOverrides?.config,
    canvas,
    chartPalette,
    density,
    elevation,
    motionDuration,
    palette,
    preferences?.appearance,
    preferences?.density,
    primary,
    radius,
    radiusValue,
    persistedOverrides,
    themeConfig,
    recipeConfig,
    typography,
  ]);
  const requestedAppearance = resolveAppearanceSetting(mergedConfig.appearance);
  const runtimePreferences = useMemo(
    () =>
      resolveRuntimePreferences({
        appearance: requestedAppearance,
        density: mergedConfig.density,
        contrast: preferences?.contrast,
        motion: preferences?.motion,
      }),
    [
      mergedConfig.density,
      preferences?.contrast,
      preferences?.motion,
      requestedAppearance,
    ],
  );

  useEffect(() => {
    if (!persistenceKey) return;
    if (Object.keys(persistedOverrides).length === 0)
      window.localStorage.removeItem(persistenceKey);
    else
      window.localStorage.setItem(
        persistenceKey,
        JSON.stringify(persistedOverrides),
      );
  }, [persistedOverrides, persistenceKey]);

  useEffect(() => {
    if (requestedAppearance !== "system") return undefined;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemAppearance(media.matches ? "dark" : "light");
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, [requestedAppearance]);

  const theme = useMemo(() => {
    return resolveTheme({
      appearance:
        requestedAppearance === "system"
          ? systemAppearance
          : requestedAppearance,
      palette: mergedConfig.palette,
      primary: mergedConfig.primary,
      accent: mergedConfig.accent,
      canvas: mergedConfig.canvas,
      chartPalette: mergedConfig.chartPalette,
      radius: mergedConfig.radius,
      radiusValue: mergedConfig.radiusValue,
      density: mergedConfig.density,
      motionDuration: mergedConfig.motionDuration,
      typography: mergedConfig.typography,
      elevation: mergedConfig.elevation,
    });
  }, [mergedConfig, requestedAppearance, systemAppearance]);

  const variables = useMemo(
    () =>
      buildThemeVariables(theme, {
        contrast: runtimePreferences.contrast,
        motion: runtimePreferences.motion,
        recipe: recipe?.id,
        expression: recipe?.expression,
        composition: recipe?.composition,
      }),
    [recipe, runtimePreferences.contrast, runtimePreferences.motion, theme],
  );
  const rootStyle = { ...variables, ...style } as CSSProperties;
  const semanticOverrides = resolveSemanticVariables(
    advancedOverrides?.variables,
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      appearanceSetting: requestedAppearance,
      theme,
      recipe: recipe?.id,
      expression: recipe?.expression ?? "neutral",
      composition: recipe?.composition,
      preferences: runtimePreferences,
      setTheme: (next) =>
        setPersistedOverrides((current) => ({ ...current, ...next })),
      resetTheme: () => setPersistedOverrides({}),
    }),
    [
      recipe?.composition,
      recipe?.expression,
      recipe?.id,
      requestedAppearance,
      runtimePreferences,
      theme,
    ],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div
        className={["t7-provider", className].filter(Boolean).join(" ")}
        data-density={theme.density}
        data-palette={theme.palette}
        data-primary={theme.primary}
        data-accent={theme.accent}
        data-canvas={theme.canvas}
        data-chart-palette={theme.chartPalette}
        data-radius={theme.radius}
        data-radius-value={theme.radiusValue}
        data-motion-duration={theme.motionDuration}
        data-theme-appearance={theme.appearance}
        data-typography={theme.typography}
        data-t7-theme={recipe?.id ?? "custom"}
        data-t7-mode={theme.appearance}
        data-t7-density={theme.density}
        data-t7-contrast={runtimePreferences.contrast}
        data-t7-motion-preference={runtimePreferences.motion}
        data-t7-expression={recipe?.expression ?? "neutral"}
        style={{ ...rootStyle, ...semanticOverrides } as CSSProperties}
      >
        {children}
        <div id="t7-overlay-root" />
      </div>
    </ThemeContext.Provider>
  );
}

export interface ThemeScopeProps extends PropsWithChildren<
  HTMLAttributes<HTMLDivElement>
> {
  /** Applies one compact contextual inversion without creating a second theme runtime. */
  tone?: "default" | "inverse";
  /** Optional recipe or advanced override for an intentionally bounded scope. */
  theme?: ThemeConfig | ThemeRecipeName;
  preferences?: RuntimePreferences;
  /** Scoped expert escape hatch; it never mutates the surrounding provider. */
  overrides?: ThemeOverrides;
}

/**
 * Locally re-resolves the same semantic token contract for an intentional
 * contextual surface (for example an inverse hero), while retaining provider
 * context for the rest of the application.
 */
export function ThemeScope({
  children,
  className,
  preferences,
  style,
  theme: themeInput,
  overrides: advancedOverrides,
  tone = "default",
  ...props
}: ThemeScopeProps) {
  const parent = useTen4SevenTheme();
  const recipeName = isThemeRecipeName(themeInput) ? themeInput : undefined;
  const recipe = getThemeRecipe(recipeName);
  const recipeConfig = recipe ? themeRecipeToLegacyConfig(recipe) : undefined;
  const themeOverrides =
    themeInput && typeof themeInput === "object" ? themeInput : undefined;
  const scopedConfig = useMemo(
    () => ({
      ...resolvedThemeToConfig(parent.theme),
      ...recipeConfig,
      ...themeOverrides,
      ...advancedOverrides?.config,
    }),
    [advancedOverrides?.config, parent.theme, recipeConfig, themeOverrides],
  );
  const resolvedPreferences = resolveRuntimePreferences({
    // An explicit scope theme is authored context, so its appearance and
    // density are part of the scope contract unless a scoped runtime
    // preference intentionally supersedes them. A scope without a theme keeps
    // the parent's currently resolved values.
    appearance: preferences?.appearance ?? scopedConfig.appearance,
    density: preferences?.density ?? scopedConfig.density,
    contrast: preferences?.contrast ?? parent.preferences.contrast,
    motion: preferences?.motion ?? parent.preferences.motion,
  });
  const requestedAppearance =
    tone === "inverse"
      ? parent.theme.appearance === "light"
        ? "dark"
        : "light"
      : resolveAppearanceSetting(resolvedPreferences.appearance);
  const theme = useMemo(
    () =>
      resolveTheme({
        ...scopedConfig,
        appearance:
          requestedAppearance === "system"
            ? resolveAppearance("system")
            : requestedAppearance,
        density: resolvedPreferences.density,
      }),
    [requestedAppearance, resolvedPreferences.density, scopedConfig],
  );
  const semanticOverrides = resolveSemanticVariables(
    advancedOverrides?.variables,
  );
  const variables = useMemo(
    () =>
      buildThemeVariables(theme, {
        contrast: resolvedPreferences.contrast,
        motion: resolvedPreferences.motion,
        recipe: recipe?.id ?? parent.recipe,
        expression: recipe?.expression,
        composition: recipe?.composition ?? parent.composition,
      }),
    [
      parent.composition,
      parent.recipe,
      recipe,
      resolvedPreferences.contrast,
      resolvedPreferences.motion,
      theme,
    ],
  );
  const scopeValue = useMemo<ThemeContextValue>(
    () => ({
      appearanceSetting: requestedAppearance,
      theme,
      recipe: recipe?.id ?? parent.recipe,
      expression: recipe?.expression ?? parent.expression,
      composition: recipe?.composition ?? parent.composition,
      preferences: resolvedPreferences,
      setTheme: parent.setTheme,
      resetTheme: parent.resetTheme,
    }),
    [
      parent.composition,
      parent.expression,
      parent.recipe,
      parent.resetTheme,
      parent.setTheme,
      recipe?.composition,
      recipe?.expression,
      recipe?.id,
      requestedAppearance,
      resolvedPreferences,
      theme,
    ],
  );

  return (
    <ThemeContext.Provider value={scopeValue}>
      <div
        {...props}
        className={["t7-theme-scope", className].filter(Boolean).join(" ")}
        data-t7-contrast={resolvedPreferences.contrast}
        data-t7-density={theme.density}
        data-t7-expression={recipe?.expression ?? parent.expression}
        data-t7-mode={theme.appearance}
        data-t7-motion-preference={resolvedPreferences.motion}
        data-t7-theme={recipe?.id ?? parent.recipe ?? "custom"}
        data-t7-tone={tone}
        style={
          { ...variables, ...semanticOverrides, ...style } as CSSProperties
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTen4SevenTheme() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTen4SevenTheme must be used inside Ten4SevenProvider");
  return context;
}

export type {
  Appearance,
  CanvasName,
  ChartPaletteName,
  DensityName,
  ElevationName,
  PaletteName,
  RadiusName,
  TypographyName,
};
