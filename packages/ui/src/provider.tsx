import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";

import {
  getThemeRecipe,
  isThemeRecipeName,
  resetThemeStudioAxis,
  resetThemeStudioOverrides,
  resolveRuntimePreferences,
  resolveThemeStudioConfig,
  themeProfileToLegacyConfig,
  themeRecipeToLegacyConfig,
  type ThemeStudioAxis,
  type ThemeStudioConfig,
  type ThemeStudioResolution,
  type ResolvedRuntimePreferences,
  type RuntimePreferences,
  type ThemeComposition,
  type ThemeRecipeName,
} from "@ten4seven/contracts";

import {
  buildThemeVariables,
  resolveAppearance,
  resolveThemeConfigLayers,
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
  /**
   * @deprecated Web-only compatibility escape hatch. Prefer `config` and the
   * typed semantic axes; native projections do not read CSS custom properties.
   */
  variables?: Readonly<Record<`--t7-${string}`, string | number>>;
}

export interface Ten4SevenProviderProps extends PropsWithChildren<ThemeConfig> {
  /** A curated v2 recipe or the established advanced ThemeConfig object. */
  theme?: ThemeConfig | ThemeRecipeName;
  /** Optional versioned dynamic Theme Studio state. */
  themeStudio?: ThemeStudioConfig;
  /** Controlled update boundary for dynamic Theme Studio state. */
  onThemeStudioChange?: (next: ThemeStudioConfig) => void;
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
  themeStudio?: ThemeStudioResolution;
  setTheme: (next: Partial<ThemeConfig>) => void;
  resetThemeAxis: (axis: ThemeStudioAxis) => void;
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
    primary: theme.primarySource,
    accent: theme.accentSource,
    canvas: theme.canvas,
    surfaceTreatment: theme.surfaceTreatment,
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
  surfaceTreatment = "outlined",
  chartPalette = "spectrum",
  radius = "soft",
  radiusValue,
  density = "default",
  motionDuration = 1.5,
  typography = "modern",
  elevation = "soft",
  theme: themeInput,
  themeStudio: themeStudioInput,
  onThemeStudioChange,
  preferences,
  overrides: advancedOverrides,
  persistenceKey,
  className,
  style,
  children,
}: Ten4SevenProviderProps) {
  const themeStudio = themeStudioInput
    ? resolveThemeStudioConfig(themeStudioInput)
    : undefined;
  const recipeName =
    themeStudio?.effectiveRecipe ??
    (isThemeRecipeName(themeInput) ? themeInput : undefined);
  const recipe = getThemeRecipe(recipeName);
  const recipeConfig = recipe ? themeRecipeToLegacyConfig(recipe) : undefined;
  const themeConfig =
    themeInput && typeof themeInput === "object" ? themeInput : undefined;
  const studioConfig = themeStudio
    ? themeProfileToLegacyConfig(themeStudio.profile)
    : undefined;
  // Keep the server render and the first client render deterministic. The
  // system media query is resolved in the effect below after hydration.
  const [systemAppearance, setSystemAppearance] =
    useState<Exclude<Appearance, "system">>("light");
  // Persisted preferences are deliberately hydrated after the first render.
  // Reading localStorage in the state initializer would make the server
  // render `{}` while a browser with an existing key rendered user values,
  // which is an avoidable App Router hydration mismatch.
  const [persistedOverrides, setPersistedOverrides] = useState<
    Partial<ThemeConfig>
  >({});
  const hydratedPersistenceKey = useRef<string | undefined>(
    persistenceKey ? undefined : "",
  );

  const mergedConfig = useMemo<ThemeConfig>(() => {
    const next = resolveThemeConfigLayers({
      SYSTEM_DEFAULTS: {
        appearance,
        palette,
        primary,
        accent,
        canvas,
        surfaceTreatment,
        chartPalette,
        radius,
        radiusValue,
        density,
        motionDuration,
        typography,
        elevation,
      },
      BASE_RECIPE: recipeConfig,
      PRODUCT_PROFILE: themeStudio ? studioConfig : undefined,
      THEME_OVERRIDE: themeStudio ? undefined : themeConfig,
      SCOPED_OVERRIDE: {
        ...advancedOverrides?.config,
        ...(themeStudio ? {} : persistedOverrides),
      },
    });
    if (preferences?.appearance !== undefined)
      next.appearance = preferences.appearance;
    else if (
      themeStudio &&
      !Object.prototype.hasOwnProperty.call(
        themeStudio.config.runtime,
        "appearance",
      ) &&
      !Object.prototype.hasOwnProperty.call(
        themeStudio.config.overrides,
        "appearance",
      )
    )
      next.appearance = "system";
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
    studioConfig,
    themeStudio,
    themeConfig,
    recipeConfig,
    surfaceTreatment,
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
    if (themeStudio) {
      hydratedPersistenceKey.current = "";
      return;
    }
    if (!persistenceKey) {
      hydratedPersistenceKey.current = "";
      return;
    }

    // The first effect for a key reads before any write effect can run. This
    // preserves the stored value and applies it only after hydration.
    if (hydratedPersistenceKey.current !== persistenceKey) {
      hydratedPersistenceKey.current = persistenceKey;
      setPersistedOverrides(readThemeOverrides(persistenceKey));
      return;
    }

    try {
      if (Object.keys(persistedOverrides).length === 0)
        window.localStorage.removeItem(persistenceKey);
      else
        window.localStorage.setItem(
          persistenceKey,
          JSON.stringify(persistedOverrides),
        );
    } catch {
      // Storage can be unavailable in privacy-restricted browser contexts.
    }
  }, [persistedOverrides, persistenceKey, themeStudio]);

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
      surfaceTreatment: mergedConfig.surfaceTreatment,
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
        motionProfile:
          themeStudio?.profile.motion.profile ??
          mergedConfig.motionProfile ??
          recipe?.profile.motion.profile,
        recipe: recipe?.id,
        expression: recipe?.expression,
        composition: themeStudio?.composition ?? recipe?.composition,
      }),
    [
      mergedConfig.motionProfile,
      recipe,
      runtimePreferences.contrast,
      runtimePreferences.motion,
      themeStudio,
      theme,
    ],
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
      composition: themeStudio?.composition ?? recipe?.composition,
      preferences: runtimePreferences,
      themeStudio,
      setTheme: (next) => {
        if (themeStudioInput) {
          onThemeStudioChange?.({
            ...themeStudioInput,
            overrides: { ...themeStudioInput.overrides, ...next },
          });
          return;
        }
        setPersistedOverrides((current) => ({ ...current, ...next }));
      },
      resetThemeAxis: (axis) => {
        if (themeStudioInput) {
          onThemeStudioChange?.(resetThemeStudioAxis(themeStudioInput, axis));
        }
      },
      resetTheme: () => {
        if (themeStudioInput) {
          onThemeStudioChange?.(resetThemeStudioOverrides(themeStudioInput));
          return;
        }
        setPersistedOverrides({});
      },
    }),
    [
      onThemeStudioChange,
      recipe?.composition,
      recipe?.expression,
      recipe?.id,
      requestedAppearance,
      runtimePreferences,
      themeStudio,
      themeStudioInput,
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
        data-t7-primary-source={
          typeof theme.primarySource === "string"
            ? "palette"
            : theme.primarySource.kind
        }
        data-t7-primary-source-value={
          typeof theme.primarySource === "string"
            ? theme.primarySource
            : theme.primarySource.value
        }
        data-t7-accent-source={
          typeof theme.accentSource === "string"
            ? "palette"
            : theme.accentSource.kind
        }
        data-t7-accent-source-value={
          typeof theme.accentSource === "string"
            ? theme.accentSource
            : theme.accentSource.value
        }
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
        data-t7-theme-studio-profile={themeStudio?.productProfile}
        data-t7-theme-studio-schema={themeStudio?.config.schemaVersion}
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
    () =>
      resolveThemeConfigLayers({
        SYSTEM_DEFAULTS: resolvedThemeToConfig(parent.theme),
        BASE_RECIPE: recipeConfig,
        SCOPED_OVERRIDE: {
          ...themeOverrides,
          ...advancedOverrides?.config,
        },
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
        motionProfile:
          parent.themeStudio?.profile.motion.profile ??
          (recipe ?? getThemeRecipe(parent.recipe))?.profile.motion.profile,
        recipe: recipe?.id ?? parent.recipe,
        expression: recipe?.expression,
        composition: recipe?.composition ?? parent.composition,
      }),
    [
      parent.composition,
      parent.recipe,
      parent.themeStudio,
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
      resetThemeAxis: parent.resetThemeAxis,
      themeStudio: parent.themeStudio,
    }),
    [
      parent.composition,
      parent.expression,
      parent.recipe,
      parent.resetTheme,
      parent.resetThemeAxis,
      parent.setTheme,
      parent.themeStudio,
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
        data-t7-primary-source={
          typeof theme.primarySource === "string"
            ? "palette"
            : theme.primarySource.kind
        }
        data-t7-primary-source-value={
          typeof theme.primarySource === "string"
            ? theme.primarySource
            : theme.primarySource.value
        }
        data-t7-accent-source={
          typeof theme.accentSource === "string"
            ? "palette"
            : theme.accentSource.kind
        }
        data-t7-accent-source-value={
          typeof theme.accentSource === "string"
            ? theme.accentSource
            : theme.accentSource.value
        }
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
