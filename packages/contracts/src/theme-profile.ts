import type {
  Appearance,
  CanvasName,
  ChartPaletteName,
  DensityName,
  ElevationName,
  LegacyThemeConfigLike,
  MotionProfileName,
  MotionRoleScale,
  PaletteName,
  RadiusName,
  ThemeProfile,
  TypographyName,
} from "./types.ts";
import { CONTRACT_SCHEMA_VERSION } from "./types.ts";

export const THEME_PROFILE_ID = "default" as const;
export const THEME_MOTION_ANCHOR_RANGE = Object.freeze({
  min: 0.25,
  max: 2.5,
  step: 0.25,
});
export const THEME_RADIUS_RANGE = Object.freeze({ min: 0, max: 24, step: 1 });

const motionRoleDefaults: Record<MotionProfileName, MotionRoleScale> = {
  minimal: {
    fast: 0.1,
    interaction: 0.14,
    state: 0.18,
    enter: 0.24,
    exit: 0.16,
    reveal: 0.45,
    chart: 0.7,
    loop: 1.2,
  },
  calm: {
    fast: 0.12,
    interaction: 0.18,
    state: 0.24,
    enter: 0.32,
    exit: 0.2,
    reveal: 0.8,
    chart: 1.25,
    loop: 2,
  },
  balanced: {
    fast: 0.12,
    interaction: 0.16,
    state: 0.22,
    enter: 0.28,
    exit: 0.18,
    reveal: 0.8,
    chart: 1.25,
    loop: 2.4,
  },
  lively: {
    fast: 0.1,
    interaction: 0.16,
    state: 0.2,
    enter: 0.26,
    exit: 0.16,
    reveal: 0.75,
    chart: 1.1,
    loop: 1.8,
  },
};

const palettes: readonly PaletteName[] = [
  "slate",
  "emerald",
  "teal",
  "cyan",
  "blue",
  "indigo",
  "violet",
  "rose",
  "red",
  "orange",
  "amber",
];
const canvases: readonly CanvasName[] = ["balanced", "paper", "monochrome"];
const chartPalettes: readonly ChartPaletteName[] = [
  "spectrum",
  "four",
  "monochrome",
];
const radii: readonly RadiusName[] = ["sharp", "soft", "rounded"];
const densities: readonly DensityName[] = [
  "comfortable",
  "default",
  "compact",
  "dense",
];
const typographies: readonly TypographyName[] = [
  "modern",
  "humanist",
  "editorial",
  "technical",
  "mono",
];
const elevations: readonly ElevationName[] = ["flat", "soft", "standard"];
const motionProfiles: readonly MotionProfileName[] = [
  "minimal",
  "calm",
  "balanced",
  "lively",
];

function pick<T extends string>(
  value: unknown,
  allowed: readonly T[],
  fallback: T,
): T {
  return typeof value === "string" && allowed.includes(value as T)
    ? (value as T)
    : fallback;
}

function normalizeAnchor(value: unknown, fallback: number): number {
  const candidate =
    typeof value === "number" && Number.isFinite(value) ? value : fallback;
  const clamped = Math.min(
    THEME_MOTION_ANCHOR_RANGE.max,
    Math.max(THEME_MOTION_ANCHOR_RANGE.min, candidate),
  );
  return Number(
    (
      Math.round(clamped / THEME_MOTION_ANCHOR_RANGE.step) *
      THEME_MOTION_ANCHOR_RANGE.step
    ).toFixed(2),
  );
}

function normalizeRadius(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  return Math.min(
    THEME_RADIUS_RANGE.max,
    Math.max(
      THEME_RADIUS_RANGE.min,
      Math.round(value / THEME_RADIUS_RANGE.step) * THEME_RADIUS_RANGE.step,
    ),
  );
}

function roundSeconds(value: number): number {
  return Number(value.toFixed(2));
}

/**
 * One semantic timing source for typed profiles, CSS and JS motion. The
 * compatibility anchor can vary choreography; short interactions stay within
 * a 0.75–1.25 multiplier so even a 2.5s anchor cannot slow a popup or field.
 */
export function resolveMotionRoles(
  profile: MotionProfileName = "balanced",
  anchorSeconds = 1.5,
): MotionRoleScale {
  const selected = motionRoleDefaults[profile];
  const normalizedAnchor = normalizeAnchor(anchorSeconds, 1.5);
  const scale = normalizedAnchor / 1.5;
  return Object.fromEntries(
    Object.entries(selected).map(([role, seconds]) => [
      role,
      roundSeconds(
        seconds *
          (role === "reveal" || role === "chart" || role === "loop"
            ? scale
            : Math.min(1.25, Math.max(0.75, scale))),
      ),
    ]),
  ) as unknown as MotionRoleScale;
}

export const MOTION_PROFILES: Readonly<
  Record<MotionProfileName, MotionRoleScale>
> = Object.fromEntries(
  motionProfiles.map((profile) => [profile, resolveMotionRoles(profile, 1.5)]),
) as Record<MotionProfileName, MotionRoleScale>;

export const DEFAULT_THEME_PROFILE: ThemeProfile = {
  schemaVersion: CONTRACT_SCHEMA_VERSION,
  id: THEME_PROFILE_ID,
  appearance: "light",
  palette: { base: "emerald" },
  action: { primary: "emerald" },
  accent: { source: "emerald" },
  canvas: { mode: "balanced" },
  chart: { palette: "spectrum" },
  radius: { preset: "soft" },
  density: { preset: "default" },
  typography: { preset: "modern", opticalSizing: true },
  motion: {
    profile: "balanced",
    anchorSeconds: 1.5,
    roles: resolveMotionRoles("balanced", 1.5),
  },
  elevation: { preset: "soft" },
};

export type ThemeProfileInput = Partial<ThemeProfile> | LegacyThemeConfigLike;

/** Normalize the legacy provider config into one semantic aggregate. */
export function normalizeThemeProfile(
  input: ThemeProfileInput = {},
): ThemeProfile {
  const source = input as unknown as {
    readonly id?: string;
    readonly appearance?: Appearance;
    readonly palette?: PaletteName | { readonly base?: PaletteName };
    readonly primary?: PaletteName;
    readonly action?: { readonly primary?: PaletteName };
    readonly accent?: PaletteName | { readonly source?: PaletteName };
    readonly canvas?: CanvasName | { readonly mode?: CanvasName };
    readonly chartPalette?: ChartPaletteName;
    readonly chart?: { readonly palette?: ChartPaletteName };
    readonly radius?:
      RadiusName | { readonly preset?: RadiusName; readonly basePx?: number };
    readonly radiusValue?: number;
    readonly density?: DensityName | { readonly preset?: DensityName };
    readonly motionDuration?: number;
    readonly motionProfile?: MotionProfileName;
    readonly typography?: TypographyName | { readonly preset?: TypographyName };
    readonly motion?: {
      readonly profile?: MotionProfileName;
      readonly anchorSeconds?: number;
    };
    readonly elevation?: ElevationName | { readonly preset?: ElevationName };
  };
  const legacyTypography =
    typeof source.typography === "object"
      ? source.typography?.preset
      : source.typography;
  const basePalette =
    typeof source.palette === "object" ? source.palette?.base : source.palette;
  const primaryPalette =
    typeof source.action === "object"
      ? source.action?.primary
      : (source.primary ?? basePalette);
  const accentPalette =
    typeof source.accent === "object" ? source.accent?.source : source.accent;
  const canvas =
    typeof source.canvas === "object" ? source.canvas?.mode : source.canvas;
  const chartPalette = source.chart?.palette ?? source.chartPalette;
  const radius =
    typeof source.radius === "object" ? source.radius?.preset : source.radius;
  const radiusValue =
    typeof source.radius === "object"
      ? source.radius?.basePx
      : source.radiusValue;
  const density =
    typeof source.density === "object"
      ? source.density?.preset
      : source.density;
  const elevation =
    typeof source.elevation === "object"
      ? source.elevation?.preset
      : source.elevation;
  const profile =
    source.motion?.profile ??
    source.motionProfile ??
    DEFAULT_THEME_PROFILE.motion.profile;
  const anchorSeconds = normalizeAnchor(
    source.motion?.anchorSeconds ?? source.motionDuration,
    DEFAULT_THEME_PROFILE.motion.anchorSeconds,
  );
  const normalizedProfile = pick(
    profile,
    motionProfiles,
    DEFAULT_THEME_PROFILE.motion.profile,
  );
  const normalizedRadiusValue = normalizeRadius(radiusValue);

  return {
    schemaVersion: CONTRACT_SCHEMA_VERSION,
    id:
      typeof source.id === "string" && source.id.trim()
        ? source.id
        : THEME_PROFILE_ID,
    appearance: pick(
      source.appearance,
      ["light", "dark"] as const,
      DEFAULT_THEME_PROFILE.appearance,
    ),
    palette: {
      base: pick(basePalette, palettes, DEFAULT_THEME_PROFILE.palette.base),
    },
    action: {
      primary: pick(
        primaryPalette,
        palettes,
        DEFAULT_THEME_PROFILE.action.primary,
      ),
    },
    accent: {
      source: pick(
        accentPalette ?? primaryPalette ?? basePalette,
        palettes,
        DEFAULT_THEME_PROFILE.accent.source,
      ),
    },
    canvas: {
      mode: pick(canvas, canvases, DEFAULT_THEME_PROFILE.canvas.mode),
    },
    chart: {
      palette: pick(
        chartPalette,
        chartPalettes,
        DEFAULT_THEME_PROFILE.chart.palette,
      ),
    },
    radius: {
      preset: pick(radius, radii, DEFAULT_THEME_PROFILE.radius.preset),
      ...(normalizedRadiusValue === undefined
        ? {}
        : { basePx: normalizedRadiusValue }),
    },
    density: {
      preset: pick(density, densities, DEFAULT_THEME_PROFILE.density.preset),
    },
    typography: {
      preset: pick(
        legacyTypography,
        typographies,
        DEFAULT_THEME_PROFILE.typography.preset,
      ),
      opticalSizing: true,
    },
    motion: {
      profile: normalizedProfile,
      anchorSeconds,
      roles: resolveMotionRoles(normalizedProfile, anchorSeconds),
    },
    elevation: {
      preset: pick(
        elevation,
        elevations,
        DEFAULT_THEME_PROFILE.elevation.preset,
      ),
    },
  };
}

/** Adapt a semantic profile back to the current provider-compatible config. */
export function themeProfileToLegacyConfig(
  profile: ThemeProfile,
): LegacyThemeConfigLike {
  return {
    appearance: profile.appearance,
    palette: profile.palette.base,
    primary: profile.action.primary,
    accent: profile.accent.source,
    canvas: profile.canvas.mode,
    chartPalette: profile.chart.palette,
    radius: profile.radius.preset,
    ...(profile.radius.basePx === undefined
      ? {}
      : { radiusValue: profile.radius.basePx }),
    density: profile.density.preset,
    motionDuration: profile.motion.anchorSeconds,
    motionProfile: profile.motion.profile,
    typography: profile.typography.preset,
    elevation: profile.elevation.preset,
  };
}

export interface ResolvedThemeLike {
  readonly appearance: Exclude<Appearance, "system">;
  readonly palette: PaletteName;
  readonly primary: PaletteName;
  readonly accent: PaletteName;
  readonly canvas: CanvasName;
  readonly chartPalette: ChartPaletteName;
  readonly radius: RadiusName;
  readonly radiusValue?: number;
  readonly density: DensityName;
  readonly motionDuration: number;
  readonly typography: TypographyName;
  readonly elevation: ElevationName;
}

/** Adapt the runtime token resolver output into the canonical profile. */
export function themeProfileFromResolvedTheme(
  theme: ResolvedThemeLike,
  motionProfile: MotionProfileName = "balanced",
): ThemeProfile {
  return normalizeThemeProfile({
    ...theme,
    motionProfile,
  });
}
