import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type PropsWithChildren,
} from "react";

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

export interface Ten4SevenProviderProps extends PropsWithChildren<ThemeConfig> {
  theme?: ThemeConfig;
  persistenceKey?: string;
  className?: string;
  style?: CSSProperties;
}

interface ThemeContextValue {
  appearanceSetting: Appearance;
  theme: ResolvedTheme;
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
  theme: themeConfig,
  persistenceKey,
  className,
  style,
  children,
}: Ten4SevenProviderProps) {
  const appearanceSetting = themeConfig?.appearance ?? appearance;
  const [systemAppearance, setSystemAppearance] = useState(() =>
    resolveAppearance("system"),
  );
  const [overrides, setOverrides] = useState<Partial<ThemeConfig>>(() =>
    readThemeOverrides(persistenceKey),
  );

  const mergedConfig = useMemo<ThemeConfig>(() => {
    const baseConfig: ThemeConfig = {
      appearance: appearanceSetting,
      palette: themeConfig?.palette ?? palette,
      primary: themeConfig?.primary ?? primary,
      accent: themeConfig?.accent ?? accent,
      canvas: themeConfig?.canvas ?? canvas,
      chartPalette: themeConfig?.chartPalette ?? chartPalette,
      radius: themeConfig?.radius ?? radius,
      radiusValue: themeConfig?.radiusValue ?? radiusValue,
      density: themeConfig?.density ?? density,
      motionDuration: themeConfig?.motionDuration ?? motionDuration,
      typography: themeConfig?.typography ?? typography,
      elevation: themeConfig?.elevation ?? elevation,
    };
    return { ...baseConfig, ...themeConfig, ...overrides };
  }, [
    accent,
    appearanceSetting,
    canvas,
    chartPalette,
    density,
    elevation,
    motionDuration,
    overrides,
    palette,
    primary,
    radius,
    radiusValue,
    themeConfig,
    typography,
  ]);
  const requestedAppearance = resolveAppearanceSetting(mergedConfig.appearance);

  useEffect(() => {
    if (!persistenceKey) return;
    if (Object.keys(overrides).length === 0)
      window.localStorage.removeItem(persistenceKey);
    else window.localStorage.setItem(persistenceKey, JSON.stringify(overrides));
  }, [overrides, persistenceKey]);

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

  const variables = useMemo(() => buildThemeVariables(theme), [theme]);
  const rootStyle = { ...variables, ...style } as CSSProperties;

  const value = useMemo<ThemeContextValue>(
    () => ({
      appearanceSetting: requestedAppearance,
      theme,
      setTheme: (next) => setOverrides((current) => ({ ...current, ...next })),
      resetTheme: () => setOverrides({}),
    }),
    [requestedAppearance, theme],
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
        style={rootStyle}
      >
        {children}
        <div id="t7-overlay-root" />
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
