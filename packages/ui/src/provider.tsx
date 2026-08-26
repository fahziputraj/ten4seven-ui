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
  className?: string;
  style?: CSSProperties;
}

interface ThemeContextValue {
  theme: ResolvedTheme;
  setTheme: (next: Partial<ThemeConfig>) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function Ten4SevenProvider({
  appearance = "system",
  palette = "emerald",
  radius = "soft",
  density = "default",
  typography = "modern",
  elevation = "soft",
  theme: themeConfig,
  className,
  style,
  children,
}: Ten4SevenProviderProps) {
  const appearanceSetting = themeConfig?.appearance ?? appearance;
  const [systemAppearance, setSystemAppearance] = useState(() =>
    resolveAppearance("system"),
  );
  const [overrides, setOverrides] = useState<Partial<ThemeConfig>>({});

  useEffect(() => {
    if (appearanceSetting !== "system") return undefined;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemAppearance(media.matches ? "dark" : "light");
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, [appearanceSetting]);

  const theme = useMemo(() => {
    const baseConfig: ThemeConfig = {
      appearance: appearanceSetting,
      palette: themeConfig?.palette ?? palette,
      radius: themeConfig?.radius ?? radius,
      density: themeConfig?.density ?? density,
      typography: themeConfig?.typography ?? typography,
      elevation: themeConfig?.elevation ?? elevation,
    };
    const mergedConfig = { ...baseConfig, ...themeConfig, ...overrides };
    const requestedAppearance = mergedConfig.appearance ?? "system";
    return resolveTheme({
      appearance:
        requestedAppearance === "system"
          ? systemAppearance
          : requestedAppearance,
      palette: mergedConfig.palette,
      radius: mergedConfig.radius,
      density: mergedConfig.density,
      typography: mergedConfig.typography,
      elevation: mergedConfig.elevation,
    });
  }, [
    appearanceSetting,
    density,
    elevation,
    overrides,
    palette,
    radius,
    systemAppearance,
    themeConfig,
    typography,
  ]);

  const variables = useMemo(() => buildThemeVariables(theme), [theme]);
  const rootStyle = { ...variables, ...style } as CSSProperties;

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: (next) => setOverrides((current) => ({ ...current, ...next })),
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div
        className={["t7-provider", className].filter(Boolean).join(" ")}
        data-density={theme.density}
        data-palette={theme.palette}
        data-radius={theme.radius}
        data-theme-appearance={theme.appearance}
        data-typography={theme.typography}
        style={rootStyle}
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
  DensityName,
  ElevationName,
  PaletteName,
  RadiusName,
  TypographyName,
};
