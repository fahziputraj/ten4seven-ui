export type Appearance = "light" | "dark" | "system";
export type PaletteName =
  | "slate"
  | "emerald"
  | "teal"
  | "cyan"
  | "blue"
  | "indigo"
  | "violet"
  | "rose"
  | "red"
  | "orange"
  | "amber";
export type RadiusName = "sharp" | "soft" | "rounded";
export type DensityName = "comfortable" | "default" | "compact" | "dense";
export type TypographyName = "modern" | "humanist" | "mono";
export type ElevationName = "flat" | "soft" | "standard";
export type CanvasName = "balanced" | "paper" | "monochrome";
export type ChartPaletteName = "spectrum" | "four" | "monochrome";

export type TypographyRole =
  | "display-xl"
  | "display-lg"
  | "display-md"
  | "heading-xl"
  | "heading-lg"
  | "heading-md"
  | "heading-sm"
  | "body-lg"
  | "body"
  | "body-sm"
  | "label"
  | "caption"
  | "overline"
  | "button"
  | "nav"
  | "nav-active"
  | "card-title"
  | "table-header"
  | "table-cell"
  | "input"
  | "metric-lg"
  | "metric-md";

export interface TypographyFamilies {
  preset?: TypographyName;
  ui?: string;
  display?: string;
  mono?: string;
}

export type TypographySetting = TypographyName | TypographyFamilies;

export interface ThemeConfig {
  appearance?: Appearance;
  palette?: PaletteName;
  /** Optional primary color source; defaults to the selected palette. */
  primary?: PaletteName;
  /** Optional accent color source; defaults to the selected palette. */
  accent?: PaletteName;
  /** Neutral canvas treatment shared by every surface. */
  canvas?: CanvasName;
  /** Chart colorway while retaining the five-slot chart contract. */
  chartPalette?: ChartPaletteName;
  radius?: RadiusName;
  /** Optional exact base radius in px. When set, it overrides the named radius scale. */
  radiusValue?: number;
  density?: DensityName;
  /** Shared motion length in seconds for reveals and interaction transitions. */
  motionDuration?: number;
  typography?: TypographySetting;
  elevation?: ElevationName;
}

export interface ResolvedTheme {
  appearance: Exclude<Appearance, "system">;
  palette: PaletteName;
  primary: PaletteName;
  accent: PaletteName;
  canvas: CanvasName;
  chartPalette: ChartPaletteName;
  radius: RadiusName;
  radiusValue?: number;
  density: DensityName;
  motionDuration: number;
  typography: TypographyName;
  typographyFamilies?: Required<
    Pick<TypographyFamilies, "ui" | "display" | "mono">
  >;
  elevation: ElevationName;
}

type PaletteProfile = {
  primary: string;
  primaryHover: string;
  primaryActive: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
  chart: string[];
};

type TypographyRoleProfile = {
  size: string;
  lineHeight: string;
  weight: string;
  tracking: string;
  family: "ui" | "display" | "mono";
};

type TypographyProfile = {
  ui: string;
  display: string;
  mono: string;
  headingTracking: string;
  bodyTracking: string;
  roles: Record<TypographyRole, TypographyRoleProfile>;
};

export const defaultTheme: ResolvedTheme = {
  appearance: "light",
  palette: "emerald",
  primary: "emerald",
  accent: "emerald",
  canvas: "balanced",
  chartPalette: "spectrum",
  radius: "soft",
  density: "default",
  motionDuration: 1.5,
  typography: "modern",
  elevation: "soft",
};

export const paletteProfiles: Record<PaletteName, PaletteProfile> = {
  emerald: {
    primary: "148 58% 29%",
    primaryHover: "148 58% 28%",
    primaryActive: "148 62% 23%",
    primaryForeground: "0 0% 100%",
    accent: "78 82% 45%",
    accentForeground: "145 50% 12%",
    chart: [
      "148 58% 29%",
      "193 74% 42%",
      "30 90% 52%",
      "262 72% 58%",
      "343 72% 52%",
    ],
  },
  teal: {
    primary: "173 74% 27%",
    primaryHover: "173 78% 23%",
    primaryActive: "174 82% 19%",
    primaryForeground: "0 0% 100%",
    accent: "165 72% 42%",
    accentForeground: "173 70% 12%",
    chart: [
      "173 74% 31%",
      "199 82% 45%",
      "38 90% 50%",
      "262 68% 58%",
      "342 72% 52%",
    ],
  },
  cyan: {
    primary: "192 84% 32%",
    primaryHover: "193 88% 27%",
    primaryActive: "194 90% 22%",
    primaryForeground: "0 0% 100%",
    accent: "184 78% 43%",
    accentForeground: "194 80% 12%",
    chart: [
      "192 84% 36%",
      "221 82% 52%",
      "153 62% 40%",
      "35 90% 52%",
      "286 66% 56%",
    ],
  },
  blue: {
    primary: "214 82% 48%",
    primaryHover: "216 86% 40%",
    primaryActive: "218 88% 32%",
    primaryForeground: "0 0% 100%",
    accent: "187 78% 42%",
    accentForeground: "194 78% 12%",
    chart: [
      "214 82% 48%",
      "177 58% 42%",
      "36 92% 52%",
      "270 70% 58%",
      "342 72% 52%",
    ],
  },
  indigo: {
    primary: "232 70% 48%",
    primaryHover: "234 72% 41%",
    primaryActive: "236 74% 34%",
    primaryForeground: "0 0% 100%",
    accent: "204 86% 52%",
    accentForeground: "232 66% 14%",
    chart: [
      "232 70% 52%",
      "190 78% 42%",
      "153 58% 42%",
      "37 90% 52%",
      "340 72% 54%",
    ],
  },
  violet: {
    primary: "262 72% 52%",
    primaryHover: "263 70% 44%",
    primaryActive: "264 68% 35%",
    primaryForeground: "0 0% 100%",
    accent: "316 76% 56%",
    accentForeground: "316 54% 14%",
    chart: [
      "262 72% 52%",
      "201 80% 48%",
      "35 92% 52%",
      "145 54% 40%",
      "342 72% 52%",
    ],
  },
  rose: {
    primary: "344 72% 42%",
    primaryHover: "345 76% 35%",
    primaryActive: "346 80% 29%",
    primaryForeground: "0 0% 100%",
    accent: "322 72% 54%",
    accentForeground: "344 66% 14%",
    chart: [
      "344 72% 46%",
      "275 66% 56%",
      "205 78% 47%",
      "153 58% 40%",
      "38 90% 50%",
    ],
  },
  red: {
    primary: "2 72% 42%",
    primaryHover: "1 76% 35%",
    primaryActive: "0 80% 29%",
    primaryForeground: "0 0% 100%",
    accent: "18 82% 52%",
    accentForeground: "2 68% 13%",
    chart: [
      "2 72% 46%",
      "28 86% 50%",
      "204 78% 46%",
      "153 58% 40%",
      "275 64% 56%",
    ],
  },
  orange: {
    primary: "24 88% 34%",
    primaryHover: "22 90% 29%",
    primaryActive: "20 92% 24%",
    primaryForeground: "0 0% 100%",
    accent: "38 92% 50%",
    accentForeground: "24 76% 13%",
    chart: [
      "24 88% 40%",
      "42 90% 50%",
      "199 76% 44%",
      "153 58% 39%",
      "275 64% 56%",
    ],
  },
  amber: {
    primary: "38 88% 31%",
    primaryHover: "36 92% 26%",
    primaryActive: "34 94% 21%",
    primaryForeground: "0 0% 100%",
    accent: "48 92% 49%",
    accentForeground: "38 82% 12%",
    chart: [
      "38 88% 38%",
      "24 88% 48%",
      "190 74% 40%",
      "153 58% 39%",
      "258 66% 58%",
    ],
  },
  slate: {
    primary: "215 25% 35%",
    primaryHover: "215 28% 28%",
    primaryActive: "215 30% 21%",
    primaryForeground: "0 0% 100%",
    accent: "199 78% 48%",
    accentForeground: "200 70% 13%",
    chart: [
      "215 25% 35%",
      "199 78% 48%",
      "36 92% 52%",
      "262 68% 56%",
      "342 70% 52%",
    ],
  },
};

export const radiusProfiles: Record<RadiusName, Record<string, string>> = {
  sharp: {
    indicator: "3px",
    control: "6px",
    base: "8px",
    panel: "10px",
    card: "12px",
    shell: "16px",
  },
  soft: {
    indicator: "4px",
    control: "10px",
    base: "12px",
    panel: "16px",
    card: "18px",
    shell: "24px",
  },
  rounded: {
    indicator: "6px",
    control: "14px",
    base: "16px",
    panel: "20px",
    card: "24px",
    shell: "30px",
  },
};

export const radiusValueRange = Object.freeze({ min: 0, max: 24 });

/** Shared motion duration in seconds. Quarter-second steps keep the axis legible. */
export const motionDurationRange = Object.freeze({
  min: 0.5,
  max: 2.5,
  step: 0.25,
});

function normalizeRadiusValue(value: number): number {
  const finiteValue = Number.isFinite(value) ? value : radiusValueRange.min;
  return Math.min(
    radiusValueRange.max,
    Math.max(radiusValueRange.min, Math.round(finiteValue)),
  );
}

function normalizeMotionDuration(value: number): number {
  const finiteValue = Number.isFinite(value) ? value : motionDurationRange.min;
  const clampedValue = Math.min(
    motionDurationRange.max,
    Math.max(motionDurationRange.min, finiteValue),
  );
  return Number(
    (
      Math.round(clampedValue / motionDurationRange.step) *
      motionDurationRange.step
    ).toFixed(2),
  );
}

/** Build the hierarchical radius scale from one exact base value. */
export function buildRadiusProfile(value: number): Record<string, string> {
  const base = normalizeRadiusValue(value);
  return {
    indicator: `${Math.round(base / 3)}px`,
    control: `${Math.round((base * 5) / 6)}px`,
    base: `${base}px`,
    panel: `${Math.round((base * 4) / 3)}px`,
    card: `${Math.round((base * 3) / 2)}px`,
    shell: `${base * 2}px`,
  };
}

export const densityProfiles: Record<DensityName, Record<string, string>> = {
  comfortable: {
    control: "44px",
    row: "52px",
    menu: "44px",
    cardPadding: "24px",
    sectionGap: "24px",
    controlGap: "12px",
  },
  default: {
    control: "40px",
    row: "44px",
    menu: "40px",
    cardPadding: "20px",
    sectionGap: "20px",
    controlGap: "10px",
  },
  compact: {
    control: "36px",
    row: "36px",
    menu: "36px",
    cardPadding: "16px",
    sectionGap: "16px",
    controlGap: "8px",
  },
  dense: {
    control: "32px",
    row: "32px",
    menu: "32px",
    cardPadding: "12px",
    sectionGap: "12px",
    controlGap: "6px",
  },
};

const typographyRoleDefaults: Record<TypographyRole, TypographyRoleProfile> = {
  "display-xl": {
    size: "clamp(38px, 5vw, 56px)",
    lineHeight: "clamp(42px, 5.4vw, 60px)",
    weight: "600",
    tracking: "-0.045em",
    family: "display",
  },
  "display-lg": {
    size: "clamp(28px, 3vw, 32px)",
    lineHeight: "36px",
    weight: "600",
    tracking: "-0.03em",
    family: "display",
  },
  "display-md": {
    size: "24px",
    lineHeight: "30px",
    weight: "600",
    tracking: "-0.025em",
    family: "display",
  },
  "heading-xl": {
    size: "24px",
    lineHeight: "30px",
    weight: "600",
    tracking: "-0.025em",
    family: "display",
  },
  "heading-lg": {
    size: "20px",
    lineHeight: "26px",
    weight: "600",
    tracking: "-0.02em",
    family: "display",
  },
  "heading-md": {
    size: "16px",
    lineHeight: "22px",
    weight: "600",
    tracking: "-0.015em",
    family: "display",
  },
  "heading-sm": {
    size: "14px",
    lineHeight: "20px",
    weight: "600",
    tracking: "-0.01em",
    family: "display",
  },
  "body-lg": {
    size: "16px",
    lineHeight: "24px",
    weight: "400",
    tracking: "0",
    family: "ui",
  },
  body: {
    size: "14px",
    lineHeight: "20px",
    weight: "400",
    tracking: "0",
    family: "ui",
  },
  "body-sm": {
    size: "13px",
    lineHeight: "18px",
    weight: "400",
    tracking: "0",
    family: "ui",
  },
  label: {
    size: "13px",
    lineHeight: "18px",
    weight: "500",
    tracking: "0",
    family: "ui",
  },
  caption: {
    size: "12px",
    lineHeight: "16px",
    weight: "400",
    tracking: "0.005em",
    family: "ui",
  },
  overline: {
    size: "10px",
    lineHeight: "14px",
    weight: "600",
    tracking: "0.16em",
    family: "ui",
  },
  button: {
    size: "14px",
    lineHeight: "20px",
    weight: "550",
    tracking: "-0.005em",
    family: "ui",
  },
  nav: {
    size: "14px",
    lineHeight: "20px",
    weight: "500",
    tracking: "0",
    family: "ui",
  },
  "nav-active": {
    size: "14px",
    lineHeight: "20px",
    weight: "600",
    tracking: "0",
    family: "ui",
  },
  "card-title": {
    size: "15px",
    lineHeight: "20px",
    weight: "600",
    tracking: "-0.015em",
    family: "display",
  },
  "table-header": {
    size: "10px",
    lineHeight: "14px",
    weight: "550",
    tracking: "0.12em",
    family: "ui",
  },
  "table-cell": {
    size: "12px",
    lineHeight: "18px",
    weight: "400",
    tracking: "0",
    family: "ui",
  },
  input: {
    size: "13px",
    lineHeight: "18px",
    weight: "400",
    tracking: "0",
    family: "ui",
  },
  "metric-lg": {
    size: "30px",
    lineHeight: "34px",
    weight: "600",
    tracking: "-0.035em",
    family: "display",
  },
  "metric-md": {
    size: "20px",
    lineHeight: "24px",
    weight: "600",
    tracking: "-0.025em",
    family: "display",
  },
};

function createTypographyProfile(
  profile: Omit<TypographyProfile, "roles">,
): TypographyProfile {
  const headingRoles: TypographyRole[] = [
    "display-xl",
    "display-lg",
    "display-md",
    "heading-xl",
    "heading-lg",
    "heading-md",
    "heading-sm",
    "card-title",
    "metric-lg",
    "metric-md",
  ];
  const bodyRoles: TypographyRole[] = [
    "body-lg",
    "body",
    "body-sm",
    "label",
    "caption",
    "nav",
    "nav-active",
    "table-cell",
    "input",
  ];
  const roles = Object.fromEntries(
    Object.entries(typographyRoleDefaults).map(([role, spec]) => [
      role,
      {
        ...spec,
        tracking: headingRoles.includes(role as TypographyRole)
          ? profile.headingTracking
          : bodyRoles.includes(role as TypographyRole)
            ? profile.bodyTracking
            : spec.tracking,
      },
    ]),
  ) as Record<TypographyRole, TypographyRoleProfile>;

  return { ...profile, roles };
}

export const typographyProfiles: Record<TypographyName, TypographyProfile> = {
  modern: createTypographyProfile({
    ui: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: "Inter, ui-sans-serif, system-ui, sans-serif",
    mono: '"IBM Plex Mono", "SFMono-Regular", Consolas, monospace',
    headingTracking: "-0.03em",
    bodyTracking: "0",
  }),
  humanist: createTypographyProfile({
    ui: '"DM Sans", ui-sans-serif, system-ui, sans-serif',
    display: '"DM Sans", ui-sans-serif, system-ui, sans-serif',
    mono: '"IBM Plex Mono", "SFMono-Regular", Consolas, monospace',
    headingTracking: "-0.025em",
    bodyTracking: "0.005em",
  }),
  mono: createTypographyProfile({
    ui: '"IBM Plex Mono", "SFMono-Regular", Consolas, monospace',
    display: '"IBM Plex Mono", "SFMono-Regular", Consolas, monospace',
    mono: '"IBM Plex Mono", "SFMono-Regular", Consolas, monospace',
    headingTracking: "-0.045em",
    bodyTracking: "-0.01em",
  }),
};

type NeutralProfile = {
  background: string;
  surface: string;
  surfaceSubtle: string;
  surfaceMuted: string;
  surfaceRaised: string;
  foreground: string;
  mutedForeground: string;
  mutedForegroundStrong: string;
  border: string;
  borderStrong: string;
  muted: string;
};

const lightNeutral: NeutralProfile = {
  background: "210 20% 97%",
  surface: "0 0% 100%",
  surfaceSubtle: "210 20% 94%",
  surfaceMuted: "210 16% 91%",
  surfaceRaised: "0 0% 100%",
  foreground: "222 30% 15%",
  mutedForeground: "215 14% 43%",
  mutedForegroundStrong: "215 18% 36%",
  border: "214 18% 86%",
  borderStrong: "214 18% 73%",
  muted: "215 18% 93%",
};

const darkNeutral: NeutralProfile = {
  background: "222 22% 9%",
  surface: "222 20% 12%",
  surfaceSubtle: "222 18% 16%",
  surfaceMuted: "222 16% 20%",
  surfaceRaised: "222 18% 17%",
  foreground: "210 20% 96%",
  mutedForeground: "215 14% 68%",
  mutedForegroundStrong: "215 16% 76%",
  border: "216 16% 24%",
  borderStrong: "216 16% 35%",
  muted: "216 16% 21%",
};

/** Neutral canvas families keep the palette independent from surface contrast. */
export const canvasProfiles: Record<
  CanvasName,
  { light: NeutralProfile; dark: NeutralProfile }
> = {
  balanced: { light: lightNeutral, dark: darkNeutral },
  paper: {
    light: {
      background: "0 0% 100%",
      surface: "0 0% 100%",
      surfaceSubtle: "210 12% 97%",
      surfaceMuted: "215 14% 93%",
      surfaceRaised: "0 0% 100%",
      foreground: "222 24% 11%",
      mutedForeground: "215 14% 43%",
      mutedForegroundStrong: "215 18% 36%",
      border: "215 16% 86%",
      borderStrong: "215 16% 66%",
      muted: "215 14% 94%",
    },
    dark: darkNeutral,
  },
  monochrome: {
    light: {
      background: "0 0% 97%",
      surface: "0 0% 100%",
      surfaceSubtle: "0 0% 95%",
      surfaceMuted: "0 0% 91%",
      surfaceRaised: "0 0% 100%",
      foreground: "0 0% 12%",
      mutedForeground: "0 0% 43%",
      mutedForegroundStrong: "0 0% 35%",
      border: "0 0% 84%",
      borderStrong: "0 0% 62%",
      muted: "0 0% 92%",
    },
    dark: {
      background: "0 0% 8%",
      surface: "0 0% 12%",
      surfaceSubtle: "0 0% 16%",
      surfaceMuted: "0 0% 20%",
      surfaceRaised: "0 0% 17%",
      foreground: "0 0% 96%",
      mutedForeground: "0 0% 68%",
      mutedForegroundStrong: "0 0% 76%",
      border: "0 0% 24%",
      borderStrong: "0 0% 36%",
      muted: "0 0% 21%",
    },
  },
};

export function resolveAppearance(
  appearance: Appearance = "system",
): Exclude<Appearance, "system"> {
  if (appearance !== "system") return appearance;
  if (typeof window === "undefined" || typeof window.matchMedia !== "function")
    return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function resolveTheme(config: ThemeConfig = {}): ResolvedTheme {
  const typographySetting = config.typography;
  const typographyName =
    typeof typographySetting === "object"
      ? (typographySetting.preset ?? defaultTheme.typography)
      : (typographySetting ?? defaultTheme.typography);
  const typographyProfile = typographyProfiles[typographyName];
  const radiusValue =
    config.radiusValue === undefined
      ? undefined
      : normalizeRadiusValue(config.radiusValue);
  const motionDuration = normalizeMotionDuration(
    config.motionDuration ?? defaultTheme.motionDuration,
  );

  return {
    appearance: resolveAppearance(config.appearance ?? defaultTheme.appearance),
    palette: config.palette ?? defaultTheme.palette,
    primary: config.primary ?? config.palette ?? defaultTheme.primary,
    accent: config.accent ?? config.palette ?? defaultTheme.accent,
    canvas: config.canvas ?? defaultTheme.canvas,
    chartPalette: config.chartPalette ?? defaultTheme.chartPalette,
    radius: config.radius ?? defaultTheme.radius,
    ...(radiusValue === undefined ? {} : { radiusValue }),
    density: config.density ?? defaultTheme.density,
    motionDuration,
    typography: typographyName,
    typographyFamilies: {
      ui:
        typeof typographySetting === "object" && typographySetting.ui
          ? typographySetting.ui
          : typographyProfile.ui,
      display:
        typeof typographySetting === "object" && typographySetting.display
          ? typographySetting.display
          : typographyProfile.display,
      mono:
        typeof typographySetting === "object" && typographySetting.mono
          ? typographySetting.mono
          : typographyProfile.mono,
    },
    elevation: config.elevation ?? defaultTheme.elevation,
  };
}

export function buildThemeVariables(
  theme: ResolvedTheme,
): Record<string, string> {
  const palette = paletteProfiles[theme.palette];
  const primaryPalette = paletteProfiles[theme.primary];
  const accentPalette = paletteProfiles[theme.accent];
  const neutrals = canvasProfiles[theme.canvas][theme.appearance];
  const chartColors =
    theme.chartPalette === "four"
      ? [
          primaryPalette.primary,
          accentPalette.accent,
          palette.chart[2],
          palette.chart[3],
          palette.chart[3],
        ]
      : theme.chartPalette === "monochrome"
        ? [
            primaryPalette.primary,
            primaryPalette.primaryHover,
            primaryPalette.primaryActive,
            primaryPalette.primary,
            primaryPalette.primaryHover,
          ]
        : palette.chart;
  const radius =
    theme.radiusValue === undefined
      ? radiusProfiles[theme.radius]
      : buildRadiusProfile(theme.radiusValue);
  const density = densityProfiles[theme.density];
  const typography = typographyProfiles[theme.typography];
  const typographyFamilies = theme.typographyFamilies ?? {
    ui: typography.ui,
    display: typography.display,
    mono: typography.mono,
  };
  const shadow =
    theme.elevation === "flat"
      ? "none"
      : theme.elevation === "standard"
        ? "0 12px 32px -24px hsl(222 30% 12% / .42)"
        : "0 1px 2px hsl(222 30% 12% / .08), 0 16px 36px -26px hsl(var(--t7-primary-hsl) / .38)";
  const motionMilliseconds = Math.round(theme.motionDuration * 1000);
  const motionDurationValue = `${theme.motionDuration}s`;
  const motionInstant = `${Math.max(50, Math.round(motionMilliseconds * 0.1))}ms`;
  const motionFast = `${Math.max(100, Math.round(motionMilliseconds * 0.2))}ms`;
  const motionStandard = `${Math.max(160, Math.round(motionMilliseconds * 0.35))}ms`;
  const motionLoop = `${Math.max(700, Math.round(motionMilliseconds * 0.8))}ms`;
  const motionEaseStandard = "cubic-bezier(.2, 0, 0, 1)";
  const motionEaseEnter = "cubic-bezier(.16, 1, .3, 1)";
  const motionEaseExit = "cubic-bezier(.4, 0, 1, 1)";

  const semantic = {
    success: "142 66% 29%",
    successForeground:
      theme.appearance === "dark" ? "142 62% 72%" : "142 70% 24%",
    warning: "38 92% 50%",
    danger: "0 72% 51%",
    info: "199 89% 48%",
  };

  const typographyVariables = Object.entries(typography.roles).reduce<
    Record<string, string>
  >((variables, [role, spec]) => {
    variables[`--t7-type-${role}-size`] = spec.size;
    variables[`--t7-type-${role}-line-height`] = spec.lineHeight;
    variables[`--t7-type-${role}-weight`] = spec.weight;
    variables[`--t7-type-${role}-tracking`] = spec.tracking;
    variables[`--t7-type-${role}-family`] = `var(--t7-font-${spec.family})`;
    return variables;
  }, {});

  return {
    "--t7-palette-name": theme.palette,
    "--t7-primary-palette": theme.primary,
    "--t7-accent-palette": theme.accent,
    "--t7-canvas-mode": theme.canvas,
    "--t7-chart-palette": theme.chartPalette,
    "--t7-chart-palette-count":
      theme.chartPalette === "four"
        ? "4"
        : theme.chartPalette === "monochrome"
          ? "1"
          : "5",
    "--t7-primary-hsl": primaryPalette.primary,
    "--t7-primary-hover-hsl": primaryPalette.primaryHover,
    "--t7-primary-active-hsl": primaryPalette.primaryActive,
    "--t7-primary-foreground-hsl": primaryPalette.primaryForeground,
    "--t7-primary-badge-foreground-hsl":
      theme.appearance === "dark"
        ? primaryPalette.primaryForeground
        : primaryPalette.primaryActive,
    "--t7-accent-hsl": accentPalette.accent,
    "--t7-accent-hover-hsl": accentPalette.primaryHover,
    "--t7-accent-pressed-hsl": accentPalette.primaryActive,
    "--t7-accent-subtle-hsl": accentPalette.accent,
    "--t7-accent-foreground-hsl": accentPalette.accentForeground,
    "--t7-chart-1-hsl": chartColors[0],
    "--t7-chart-2-hsl": chartColors[1],
    "--t7-chart-3-hsl": chartColors[2],
    "--t7-chart-4-hsl": chartColors[3],
    "--t7-chart-5-hsl": chartColors[4],
    "--t7-background-hsl": neutrals.background,
    "--t7-surface-hsl": neutrals.surface,
    "--t7-surface-subtle-hsl": neutrals.surfaceSubtle,
    "--t7-surface-muted-hsl": neutrals.surfaceMuted,
    "--t7-surface-raised-hsl": neutrals.surfaceRaised,
    "--t7-surface-overlay-hsl": neutrals.surfaceRaised,
    "--t7-foreground-hsl": neutrals.foreground,
    "--t7-muted-foreground-hsl": neutrals.mutedForeground,
    "--t7-muted-foreground-strong-hsl": neutrals.mutedForegroundStrong,
    "--t7-border-hsl": neutrals.border,
    "--t7-border-strong-hsl": neutrals.borderStrong,
    "--t7-muted-hsl": neutrals.muted,
    "--t7-focus-hsl": primaryPalette.primary,
    "--t7-selected-hsl": primaryPalette.primary,
    "--t7-selected-hover-hsl": primaryPalette.primaryHover,
    "--t7-interactive-border-hsl": primaryPalette.primary,
    "--t7-input-background-hsl": neutrals.surface,
    "--t7-input-border-hsl": neutrals.borderStrong,
    "--t7-input-hover-border-hsl": primaryPalette.primary,
    "--t7-input-focus-border-hsl": primaryPalette.primary,
    "--t7-disabled-background-hsl": neutrals.muted,
    "--t7-disabled-foreground-hsl": neutrals.mutedForeground,
    "--t7-success-hsl": semantic.success,
    "--t7-success-foreground-hsl": semantic.successForeground,
    "--t7-warning-hsl": semantic.warning,
    "--t7-warning-foreground-hsl":
      theme.appearance === "dark" ? "42 92% 72%" : "28 72% 27%",
    "--t7-danger-hsl": semantic.danger,
    "--t7-info-hsl": semantic.info,
    "--t7-radius-control": radius.control,
    "--t7-radius-indicator": radius.indicator,
    "--t7-radius-base": radius.base,
    "--t7-radius-value": radius.base,
    "--t7-radius-panel": radius.panel,
    "--t7-radius-card": radius.card,
    "--t7-radius-shell": radius.shell,
    "--t7-radius-full": "9999px",
    "--t7-control-height": density.control,
    "--t7-row-height": density.row,
    "--t7-menu-height": density.menu,
    "--t7-card-padding": density.cardPadding,
    "--t7-section-gap": density.sectionGap,
    "--t7-control-gap": density.controlGap,
    "--t7-scrollbar-size": "4px",
    "--t7-scrollbar-thumb-alpha": "0.3",
    "--t7-scrollbar-thumb-hover-alpha": "0.5",
    "--t7-font-ui": typographyFamilies.ui,
    "--t7-font-display": typographyFamilies.display,
    "--t7-font-mono": typographyFamilies.mono,
    "--t7-font-weight-regular": "400",
    "--t7-font-weight-medium": "500",
    "--t7-font-weight-emphasis": "550",
    "--t7-font-weight-semibold": "600",
    "--t7-font-weight-strong": "650",
    "--t7-font-weight-bold": "700",
    "--t7-font-optical-sizing": "auto",
    "--t7-heading-tracking": typography.headingTracking,
    "--t7-body-tracking": typography.bodyTracking,
    "--t7-shadow-card": shadow,
    "--t7-shadow-button":
      theme.elevation === "flat"
        ? "none"
        : "0 5px 12px -9px hsl(var(--t7-primary-hsl) / .8)",
    "--t7-shadow-surface":
      theme.elevation === "flat" ? "none" : "0 1px 2px hsl(222 30% 12% / .08)",
    "--t7-shadow-raised":
      theme.elevation === "flat"
        ? "none"
        : "0 10px 28px -20px hsl(222 30% 12% / .34)",
    "--t7-shadow-popover":
      theme.elevation === "flat"
        ? "none"
        : "0 18px 44px -24px hsl(222 30% 12% / .48)",
    "--t7-shadow-modal":
      theme.elevation === "flat"
        ? "none"
        : "0 28px 80px -30px hsl(222 30% 8% / .56)",
    "--t7-motion-duration": motionDurationValue,
    "--t7-duration-instant": motionInstant,
    "--t7-duration-fast": motionFast,
    "--t7-duration-standard": motionStandard,
    "--t7-duration-normal": motionStandard,
    "--t7-duration-slow": `${motionMilliseconds}ms`,
    "--t7-duration-loop": motionLoop,
    "--t7-ease-standard": motionEaseStandard,
    "--t7-ease-enter": motionEaseEnter,
    "--t7-ease-exit": motionEaseExit,
    "--t7-motion-interactive": `${motionInstant} ${motionEaseStandard}`,
    "--t7-motion-state": `${motionStandard} ${motionEaseStandard}`,
    "--t7-motion-enter-fast": `${motionFast} ${motionEaseEnter}`,
    "--t7-motion-enter": `${motionStandard} ${motionEaseEnter}`,
    "--t7-motion-enter-slow": `${motionMilliseconds}ms ${motionEaseEnter}`,
    "--t7-motion-exit": `${motionFast} ${motionEaseExit}`,
    "--t7-motion-loop": `${motionLoop} linear`,
    "--t7-motion-loop-eased": `${motionLoop} ease-in-out`,
    "--t7-transition-fast": `${motionFast} ${motionEaseStandard}`,
    "--t7-transition-standard": `${motionStandard} ${motionEaseStandard}`,
    "--t7-transition-large": `${motionMilliseconds}ms ${motionEaseEnter}`,
    "--t7-z-base": "0",
    "--t7-z-sticky": "10",
    "--t7-z-focus": "20",
    "--t7-z-dropdown": "30",
    "--t7-z-popover": "40",
    "--t7-z-tooltip": "50",
    "--t7-z-drawer": "60",
    "--t7-z-overlay": "70",
    "--t7-z-modal": "80",
    "--t7-z-toast": "90",
    "--t7-z-command": "100",
    "--t7-doc-sticky-offset": "76px",
    "--t7-scrim-hsl": "222 30% 12%",
    ...typographyVariables,
  };
}
