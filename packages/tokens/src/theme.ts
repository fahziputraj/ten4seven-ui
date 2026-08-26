export type Appearance = "light" | "dark" | "system";
export type PaletteName = "emerald" | "blue" | "violet" | "slate";
export type RadiusName = "sharp" | "soft" | "rounded";
export type DensityName = "comfortable" | "default" | "compact" | "dense";
export type TypographyName = "modern" | "humanist" | "mono";
export type ElevationName = "flat" | "soft" | "standard";

export type TypographyRole =
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
  radius?: RadiusName;
  density?: DensityName;
  typography?: TypographySetting;
  elevation?: ElevationName;
}

export interface ResolvedTheme {
  appearance: Exclude<Appearance, "system">;
  palette: PaletteName;
  radius: RadiusName;
  density: DensityName;
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
  radius: "soft",
  density: "default",
  typography: "modern",
  elevation: "soft",
};

export const paletteProfiles: Record<PaletteName, PaletteProfile> = {
  emerald: {
    primary: "148 54% 34%",
    primaryHover: "148 58% 28%",
    primaryActive: "148 62% 23%",
    primaryForeground: "0 0% 100%",
    accent: "78 82% 45%",
    accentForeground: "145 50% 12%",
    chart: [
      "148 54% 34%",
      "193 74% 42%",
      "30 90% 52%",
      "262 72% 58%",
      "343 72% 52%",
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
    control: "6px",
    base: "8px",
    panel: "10px",
    card: "12px",
    shell: "16px",
  },
  soft: {
    control: "10px",
    base: "12px",
    panel: "16px",
    card: "18px",
    shell: "24px",
  },
  rounded: {
    control: "14px",
    base: "16px",
    panel: "20px",
    card: "24px",
    shell: "30px",
  },
};

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

const lightNeutral = {
  background: "210 20% 97%",
  surface: "0 0% 100%",
  surfaceSubtle: "210 20% 94%",
  surfaceMuted: "210 16% 91%",
  surfaceRaised: "0 0% 100%",
  foreground: "222 30% 15%",
  mutedForeground: "215 14% 43%",
  border: "214 18% 86%",
  borderStrong: "214 18% 73%",
  muted: "215 18% 93%",
};

const darkNeutral = {
  background: "222 22% 9%",
  surface: "222 20% 12%",
  surfaceSubtle: "222 18% 16%",
  surfaceMuted: "222 16% 20%",
  surfaceRaised: "222 18% 17%",
  foreground: "210 20% 96%",
  mutedForeground: "215 14% 68%",
  border: "216 16% 24%",
  borderStrong: "216 16% 35%",
  muted: "216 16% 21%",
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

  return {
    appearance: resolveAppearance(config.appearance ?? defaultTheme.appearance),
    palette: config.palette ?? defaultTheme.palette,
    radius: config.radius ?? defaultTheme.radius,
    density: config.density ?? defaultTheme.density,
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
  const neutrals = theme.appearance === "dark" ? darkNeutral : lightNeutral;
  const radius = radiusProfiles[theme.radius];
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

  const semantic = {
    success: "142 61% 36%",
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
    "--t7-primary-hsl": palette.primary,
    "--t7-primary-hover-hsl": palette.primaryHover,
    "--t7-primary-active-hsl": palette.primaryActive,
    "--t7-primary-foreground-hsl": palette.primaryForeground,
    "--t7-accent-hsl": palette.accent,
    "--t7-accent-foreground-hsl": palette.accentForeground,
    "--t7-chart-1-hsl": palette.chart[0],
    "--t7-chart-2-hsl": palette.chart[1],
    "--t7-chart-3-hsl": palette.chart[2],
    "--t7-chart-4-hsl": palette.chart[3],
    "--t7-chart-5-hsl": palette.chart[4],
    "--t7-background-hsl": neutrals.background,
    "--t7-surface-hsl": neutrals.surface,
    "--t7-surface-subtle-hsl": neutrals.surfaceSubtle,
    "--t7-surface-muted-hsl": neutrals.surfaceMuted,
    "--t7-surface-raised-hsl": neutrals.surfaceRaised,
    "--t7-foreground-hsl": neutrals.foreground,
    "--t7-muted-foreground-hsl": neutrals.mutedForeground,
    "--t7-border-hsl": neutrals.border,
    "--t7-border-strong-hsl": neutrals.borderStrong,
    "--t7-muted-hsl": neutrals.muted,
    "--t7-focus-hsl": palette.primary,
    "--t7-success-hsl": semantic.success,
    "--t7-warning-hsl": semantic.warning,
    "--t7-danger-hsl": semantic.danger,
    "--t7-info-hsl": semantic.info,
    "--t7-radius-control": radius.control,
    "--t7-radius-base": radius.base,
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
    "--t7-shadow-popover":
      theme.elevation === "flat"
        ? "none"
        : "0 18px 44px -24px hsl(222 30% 12% / .48)",
    ...typographyVariables,
  };
}
