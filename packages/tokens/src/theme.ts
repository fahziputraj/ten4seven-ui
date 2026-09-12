import {
  MEASURE_CONTRACT,
  MEASURE_NAMES,
  resolveTokenLayers,
  type MeasureName,
} from "../../contracts/src/foundation.ts";
import { resolveMotionRoles } from "../../contracts/src/theme-profile.ts";
import { exactColor, isExactColorSource } from "../../contracts/src/types.ts";
import type {
  ExactColorSource,
  MotionProfileName,
  SurfaceTreatment,
  ThemeColorSource,
} from "../../contracts/src/types.ts";
import type {
  NativeColorRole,
  NativeFontWeight,
  NativeResolvedMeasure,
  NativeResolvedThemeVariant,
  NativeTypographyIntent,
} from "../../contracts/src/native-mobile.ts";

export { exactColor, isExactColorSource } from "../../contracts/src/types.ts";
export type {
  ExactColorSource,
  SurfaceTreatment,
  ThemeColorSource,
} from "../../contracts/src/types.ts";

/** Convert resolved HSL channels to the hex format required by color inputs. */
export function hslToHex(value: string): string {
  const match = value.match(/(-?[\d.]+)\s+([\d.]+)%\s+([\d.]+)%/);
  if (!match)
    throw new Error(`Expected resolved HSL channels, received: ${value}`);

  const hue = ((Number(match[1]) % 360) + 360) % 360;
  const saturation = Math.max(0, Math.min(100, Number(match[2]))) / 100;
  const lightness = Math.max(0, Math.min(100, Number(match[3]))) / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const normalizedHue = hue / 60;
  const second = chroma * (1 - Math.abs((normalizedHue % 2) - 1));
  const matchValue = lightness - chroma / 2;
  const [red, green, blue] =
    normalizedHue < 1
      ? [chroma, second, 0]
      : normalizedHue < 2
        ? [second, chroma, 0]
        : normalizedHue < 3
          ? [0, chroma, second]
          : normalizedHue < 4
            ? [0, second, chroma]
            : normalizedHue < 5
              ? [second, 0, chroma]
              : [chroma, 0, second];
  const toHex = (channel: number) =>
    Math.round((channel + matchValue) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

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
export type TypographyName =
  "modern" | "humanist" | "editorial" | "technical" | "mono";
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
  primary?: ThemeColorSource;
  /** Optional accent color source; defaults to the selected palette. */
  accent?: ThemeColorSource;
  /** Neutral canvas treatment shared by every surface. */
  canvas?: CanvasName;
  /** Authored container-chrome treatment; forms retain their own affordance. */
  surfaceTreatment?: SurfaceTreatment;
  /** Chart colorway while retaining the five-slot chart contract. */
  chartPalette?: ChartPaletteName;
  radius?: RadiusName;
  /** Optional exact base radius in px. When set, it overrides the named radius scale. */
  radiusValue?: number;
  density?: DensityName;
  /** Authored choreography anchor in seconds; interaction roles use a bounded multiplier. */
  motionDuration?: number;
  /** Optional authored motion role profile retained by the provider bridge. */
  motionProfile?: MotionProfileName;
  typography?: TypographySetting;
  elevation?: ElevationName;
}

export interface ResolvedTheme {
  appearance: Exclude<Appearance, "system">;
  palette: PaletteName;
  /** Legacy named fallback retained for palette-oriented consumers. */
  primary: PaletteName;
  /** Canonical action source, including a normalized exact sRGB color. */
  primarySource: ThemeColorSource;
  /** Legacy named fallback retained for palette-oriented consumers. */
  accent: PaletteName;
  /** Canonical accent source, including a normalized exact sRGB color. */
  accentSource: ThemeColorSource;
  canvas: CanvasName;
  surfaceTreatment: SurfaceTreatment;
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

/**
 * Runtime-safe metadata supplied by the v2 provider seam. It remains
 * structural so the tokens package stays independent of contract packages.
 */
export interface ThemeVariableOptions {
  contrast?: "standard" | "more";
  motion?: "full" | "reduced";
  motionProfile?: MotionProfileName;
  recipe?: string;
  expression?: string;
  composition?: {
    contentMax: string;
    readingMeasure: string;
    pageGutter: string;
    sectionGap: string;
  };
}

export type ThemeResolutionLayers =
  import("../../contracts/src/foundation.ts").TokenLayerValues<ThemeConfig>;

/**
 * Build one normalized config from the contract-plane order. The resolver is
 * shallow by design: each top-level theme axis is one semantic value, while
 * component state remains a renderer-level semantic overlay.
 */
export function resolveThemeConfigLayers(
  layers: ThemeResolutionLayers = {},
): ThemeConfig {
  const defaults: ThemeConfig = {
    appearance: defaultTheme.appearance,
    palette: defaultTheme.palette,
    primary: defaultTheme.primarySource,
    accent: defaultTheme.accentSource,
    canvas: defaultTheme.canvas,
    surfaceTreatment: defaultTheme.surfaceTreatment,
    chartPalette: defaultTheme.chartPalette,
    radius: defaultTheme.radius,
    radiusValue: defaultTheme.radiusValue,
    density: defaultTheme.density,
    motionDuration: defaultTheme.motionDuration,
    motionProfile: "balanced",
    typography: defaultTheme.typography,
    elevation: defaultTheme.elevation,
  };

  return resolveTokenLayers({
    ...layers,
    SYSTEM_DEFAULTS: { ...defaults, ...layers.SYSTEM_DEFAULTS },
  }) as ThemeConfig;
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

const solidSurfaceForeground = "0 0% 100%";
const solidSurfaceContrastTarget = 6;

function parseHslChannels(value: string) {
  const match = /^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/.exec(
    value.trim(),
  );
  if (!match)
    throw new Error(`Expected a concrete HSL value, received: ${value}`);
  return {
    hue: Number(match[1]),
    saturation: Number(match[2]),
    lightness: Number(match[3]),
  };
}

function formatHslChannels(hue: number, saturation: number, lightness: number) {
  const round = (value: number) => Number(value.toFixed(2));
  return `${round(hue)} ${round(saturation)}% ${round(lightness)}%`;
}

function exactHexToHsl(value: ExactColorSource["value"]) {
  const channels = value.slice(1);
  const red = Number.parseInt(channels.slice(0, 2), 16) / 255;
  const green = Number.parseInt(channels.slice(2, 4), 16) / 255;
  const blue = Number.parseInt(channels.slice(4, 6), 16) / 255;
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const difference = maximum - minimum;
  const lightness = (maximum + minimum) / 2;
  const saturation =
    difference === 0 ? 0 : difference / (1 - Math.abs(2 * lightness - 1));
  let hue = 0;

  if (difference !== 0) {
    if (maximum === red) hue = ((green - blue) / difference) % 6;
    else if (maximum === green) hue = (blue - red) / difference + 2;
    else hue = (red - green) / difference + 4;
    hue *= 60;
    if (hue < 0) hue += 360;
  }

  return formatHslChannels(hue, saturation * 100, lightness * 100);
}

function hueToRgbChannel(p: number, q: number, hue: number) {
  let adjustedHue = hue;
  if (adjustedHue < 0) adjustedHue += 1;
  if (adjustedHue > 1) adjustedHue -= 1;
  if (adjustedHue < 1 / 6) return p + (q - p) * 6 * adjustedHue;
  if (adjustedHue < 1 / 2) return q;
  if (adjustedHue < 2 / 3) return p + (q - p) * (2 / 3 - adjustedHue) * 6;
  return p;
}

function relativeLuminanceForHsl(
  hue: number,
  saturation: number,
  lightness: number,
) {
  const normalizedHue = hue / 360;
  const normalizedSaturation = saturation / 100;
  const normalizedLightness = lightness / 100;
  const rgb =
    normalizedSaturation === 0
      ? [normalizedLightness, normalizedLightness, normalizedLightness]
      : (() => {
          const q =
            normalizedLightness < 0.5
              ? normalizedLightness * (1 + normalizedSaturation)
              : normalizedLightness +
                normalizedSaturation -
                normalizedLightness * normalizedSaturation;
          const p = 2 * normalizedLightness - q;
          return [
            hueToRgbChannel(p, q, normalizedHue + 1 / 3),
            hueToRgbChannel(p, q, normalizedHue),
            hueToRgbChannel(p, q, normalizedHue - 1 / 3),
          ];
        })();

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

function contrastRatioForHsl(left: string, right: string) {
  const leftChannels = parseHslChannels(left);
  const rightChannels = parseHslChannels(right);
  const leftLuminance = relativeLuminanceForHsl(
    leftChannels.hue,
    leftChannels.saturation,
    leftChannels.lightness,
  );
  const rightLuminance = relativeLuminanceForHsl(
    rightChannels.hue,
    rightChannels.saturation,
    rightChannels.lightness,
  );
  return (
    (Math.max(leftLuminance, rightLuminance) + 0.05) /
    (Math.min(leftLuminance, rightLuminance) + 0.05)
  );
}

function exactColorForeground(value: string) {
  const white = "0 0% 100%";
  const black = "0 0% 0%";
  return contrastRatioForHsl(value, white) >= contrastRatioForHsl(value, black)
    ? white
    : black;
}

function exactInteractionColor(value: string, distance: number) {
  const { hue, lightness, saturation } = parseHslChannels(value);
  const direction = lightness < 24 ? 1 : -1;
  return formatHslChannels(
    hue,
    saturation,
    Math.min(100, Math.max(0, lightness + direction * distance)),
  );
}

function resolveFocusColor(
  primary: string,
  surface: string,
  appearance: ResolvedTheme["appearance"],
) {
  const { hue, lightness, saturation } = parseHslChannels(primary);
  const candidates =
    appearance === "dark"
      ? [
          formatHslChannels(
            hue,
            saturation,
            Math.max(62, Math.min(78, lightness + 32)),
          ),
          formatHslChannels(hue, saturation, 82),
        ]
      : [
          primary,
          formatHslChannels(hue, saturation, Math.max(12, lightness - 18)),
          formatHslChannels(hue, saturation, Math.max(8, lightness - 28)),
        ];

  return (
    candidates.find(
      (candidate) => contrastRatioForHsl(candidate, surface) >= 3,
    ) ?? formatHslChannels(hue, saturation, appearance === "dark" ? 92 : 8)
  );
}

function exactColorProfile(source: ExactColorSource): PaletteProfile {
  const primary = exactHexToHsl(exactColor(source.value).value);
  const primaryHover = exactInteractionColor(primary, 6);
  const primaryActive = exactInteractionColor(primary, 12);
  const foreground = exactColorForeground(primary);
  return {
    primary,
    primaryHover,
    primaryActive,
    primaryForeground: foreground,
    accent: primary,
    accentForeground: foreground,
    chart: [primary, primaryHover, primaryActive, primary, primaryHover],
  };
}

/**
 * Chart marks and soft signals can stay bright because they carry no white
 * body text. A solid surface keeps the same hue and saturation, but lowers
 * lightness only as far as needed to leave room for a subtle highlight while
 * retaining white AA text.
 */
function colorToSolidSurface(value: string) {
  const { hue, lightness, saturation } = parseHslChannels(value);
  let surfaceLightness = lightness;
  while (
    1.05 / (relativeLuminanceForHsl(hue, saturation, surfaceLightness) + 0.05) <
      solidSurfaceContrastTarget &&
    surfaceLightness > 0
  )
    surfaceLightness -= 1;
  return `${hue} ${saturation}% ${surfaceLightness}%`;
}

/**
 * Categorical identity never changes when the action or accent palette
 * changes. The order is the shared ten4seven expressive sequence: green,
 * teal, amber, violet, and rose. It is intentionally independent from the
 * primary action hue so charts and colorway-linked surfaces keep the same
 * visual grammar across routes.
 */
export const categoricalChartColors = Object.freeze([
  "148 58% 29%",
  "193 74% 36%",
  "30 90% 42%",
  "262 64% 50%",
  "343 65% 46%",
]);

function colorToChartMark(
  value: string,
  appearance: ResolvedTheme["appearance"],
) {
  const { hue, saturation, lightness } = parseHslChannels(value);
  // Marks must remain visible against every neutral plotting surface. Text
  // uses its own foreground; categorical fills are never white-text surfaces.
  const backdrop = appearance === "dark" ? 20 : 94;
  const backdropLuminance = relativeLuminanceForHsl(0, 0, backdrop);
  let markLightness = lightness;
  for (let step = 0; step < 100; step++) {
    const luminance = relativeLuminanceForHsl(hue, saturation, markLightness);
    const ratio =
      (Math.max(luminance, backdropLuminance) + 0.05) /
      (Math.min(luminance, backdropLuminance) + 0.05);
    if (ratio >= 3.2) break;
    markLightness += appearance === "dark" ? 1 : -1;
  }
  return `${hue} ${saturation}% ${markLightness}%`;
}

function hslToSrgb(value: string) {
  const { hue, lightness, saturation } = parseHslChannels(value);
  const normalizedHue = hue / 360;
  const normalizedSaturation = saturation / 100;
  const normalizedLightness = lightness / 100;
  if (normalizedSaturation === 0)
    return [normalizedLightness, normalizedLightness, normalizedLightness];
  const q =
    normalizedLightness < 0.5
      ? normalizedLightness * (1 + normalizedSaturation)
      : normalizedLightness +
        normalizedSaturation -
        normalizedLightness * normalizedSaturation;
  const p = 2 * normalizedLightness - q;
  return [
    hueToRgbChannel(p, q, normalizedHue + 1 / 3),
    hueToRgbChannel(p, q, normalizedHue),
    hueToRgbChannel(p, q, normalizedHue - 1 / 3),
  ].map((channel) => Number(channel.toFixed(6)));
}

function dtcgColor(value: string) {
  return {
    $type: "color" as const,
    $value: {
      colorSpace: "srgb" as const,
      components: hslToSrgb(value),
      alpha: 1,
    },
    $extensions: {
      "org.ten4seven": { compatibilityHsl: value },
    },
  };
}

function dtcgColorSource(source: ThemeColorSource) {
  return typeof source === "string"
    ? { kind: "palette" as const, value: source }
    : { kind: "exact" as const, value: source.value };
}

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
  primarySource: "emerald",
  accent: "emerald",
  accentSource: "emerald",
  canvas: "balanced",
  surfaceTreatment: "outlined",
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

/** Shared motion duration in seconds. Quarter-second steps keep the axis precise. */
export const motionDurationRange = Object.freeze({
  min: 0.25,
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

function normalizeMotionDuration(value: unknown): number {
  const finiteValue =
    typeof value === "number" && Number.isFinite(value)
      ? value
      : defaultTheme.motionDuration;
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

export interface DensityProfile {
  control: string;
  row: string;
  menu: string;
  cardPadding: string;
  sectionGap: string;
  controlGap: string;
  controlPaddingInline: string;
  controlPaddingInlineSmall: string;
  controlPaddingInlineLarge: string;
  fieldPaddingInline: string;
  fieldGap: string;
  cardHeaderGap: string;
  cardContentGap: string;
  cardFooterPaddingBlock: string;
  panelPadding: string;
  menuPaddingInline: string;
  menuPaddingBlock: string;
  overlayPadding: string;
  tableCellPaddingInline: string;
}

/**
 * Semantic geometry changes as one deliberate density profile. Reference
 * space values remain stable; component geometry is what remaps here.
 */
export const densityProfiles: Record<DensityName, DensityProfile> = {
  comfortable: {
    control: "44px",
    row: "52px",
    menu: "44px",
    cardPadding: "24px",
    sectionGap: "24px",
    controlGap: "12px",
    controlPaddingInline: "17px",
    controlPaddingInlineSmall: "13px",
    controlPaddingInlineLarge: "21px",
    fieldPaddingInline: "14px",
    fieldGap: "8px",
    cardHeaderGap: "18px",
    cardContentGap: "18px",
    cardFooterPaddingBlock: "16px",
    panelPadding: "24px",
    menuPaddingInline: "12px",
    menuPaddingBlock: "6px",
    overlayPadding: "24px",
    tableCellPaddingInline: "16px",
  },
  default: {
    control: "40px",
    row: "44px",
    menu: "40px",
    cardPadding: "20px",
    sectionGap: "20px",
    controlGap: "10px",
    controlPaddingInline: "15px",
    controlPaddingInlineSmall: "11px",
    controlPaddingInlineLarge: "19px",
    fieldPaddingInline: "12px",
    fieldGap: "7px",
    cardHeaderGap: "16px",
    cardContentGap: "16px",
    cardFooterPaddingBlock: "14px",
    panelPadding: "20px",
    menuPaddingInline: "10px",
    menuPaddingBlock: "5px",
    overlayPadding: "20px",
    tableCellPaddingInline: "14px",
  },
  compact: {
    control: "36px",
    row: "36px",
    menu: "36px",
    cardPadding: "16px",
    sectionGap: "16px",
    controlGap: "8px",
    controlPaddingInline: "13px",
    controlPaddingInlineSmall: "10px",
    controlPaddingInlineLarge: "16px",
    fieldPaddingInline: "10px",
    fieldGap: "6px",
    cardHeaderGap: "12px",
    cardContentGap: "12px",
    cardFooterPaddingBlock: "12px",
    panelPadding: "16px",
    menuPaddingInline: "8px",
    menuPaddingBlock: "4px",
    overlayPadding: "16px",
    tableCellPaddingInline: "12px",
  },
  dense: {
    control: "32px",
    row: "32px",
    menu: "32px",
    cardPadding: "12px",
    sectionGap: "12px",
    controlGap: "6px",
    controlPaddingInline: "11px",
    controlPaddingInlineSmall: "8px",
    controlPaddingInlineLarge: "14px",
    fieldPaddingInline: "8px",
    fieldGap: "5px",
    cardHeaderGap: "10px",
    cardContentGap: "10px",
    cardFooterPaddingBlock: "10px",
    panelPadding: "12px",
    menuPaddingInline: "7px",
    menuPaddingBlock: "3px",
    overlayPadding: "12px",
    tableCellPaddingInline: "10px",
  },
};

/** Stable raw/reference spacing values. Components consume semantic geometry. */
export const referenceSpace = Object.freeze({
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
});

/** Fixed accessibility floor shared by Web and future native renderers. */
const minimumTouchTargetPx = 44;

/** Bounded layout roles; recipe-authored application/reading rails still win. */
export const layoutGeometry = Object.freeze({
  gutter: Object.freeze({
    mobile: referenceSpace[4],
    tablet: referenceSpace[6],
    desktop: referenceSpace[8],
    wide: referenceSpace[10],
  }),
  formMax: "640px",
  dataMax: "1480px",
  sidebarWidth: "232px",
  asideWidth: "320px",
  focusClearance: referenceSpace[1],
});

/**
 * Project the typed measure contract into Web custom properties. The contract
 * owns the bounds; this helper only chooses the Web representation.
 */
function buildMeasureVariables(): Record<string, string> {
  return Object.fromEntries(
    MEASURE_NAMES.flatMap((name) => {
      const measure = MEASURE_CONTRACT[name];
      return [
        [
          `--t7-measure-${name}`,
          measure.maximumPx === null ? "100%" : `${measure.maximumPx}px`,
        ],
        [`--t7-measure-${name}-min`, `${measure.minimumPx}px`],
      ];
    }),
  );
}

/** Optical roles retain the existing icon family, with no second icon runtime. */
export const iconGeometry = Object.freeze({
  compact: "14px",
  control: "16px",
  navigation: "18px",
  status: "13px",
  feature: "24px",
});

/**
 * Shared contained-surface geometry. Cards, buttons, and data surfaces use
 * the same depth direction so elevation reads as one system rather than a
 * collection of route-specific effects.
 */
export const surfaceGeometry = Object.freeze({
  depth: Object.freeze({
    gradientAngle: "145deg",
    gradientStop: "58%",
    shadowBlur: "26px",
    shadowOffsetY: "12px",
  }),
  hoverTranslateY: "-1px",
});

/**
 * Table structure stays visible on every canvas treatment. Quiet surfaces
 * remove ambient container chrome, but comparison rows still need a neutral
 * divider so the data can be scanned without relying on semantic colour.
 */
export const tableGeometry = Object.freeze({
  dividerAlpha: 0.82,
});

/**
 * KPI anatomy roles are global component tokens, not route-local dashboard
 * measurements. Density-aware values are derived in `buildThemeVariables`;
 * these defaults are also exported through the DTCG contract.
 */
export const kpiGeometry = Object.freeze({
  chartHeight: "52px",
  iconContainer: "24px",
  iconSize: "22px",
  trendPaddingBlock: "3px",
  trendPaddingInline: referenceSpace[2],
  decorative: Object.freeze({
    size: "132px",
    offsetTop: "-21px",
    offsetInline: "-21px",
    opacity: 0.09,
  }),
  depth: Object.freeze({
    gradientAngle: surfaceGeometry.depth.gradientAngle,
    gradientStop: surfaceGeometry.depth.gradientStop,
    shadowBlur: surfaceGeometry.depth.shadowBlur,
    shadowOffsetY: surfaceGeometry.depth.shadowOffsetY,
  }),
});

/**
 * Shared chart geometry keeps line, bar, donut, and sparkline primitives on
 * one visual contract. Colour and depth intensity remain resolved by the
 * active theme; these values describe the stable shape of the marks.
 */
export const chartGeometry = Object.freeze({
  lineWidth: 2.5,
  pointRadius: 3.5,
  pointHoverScale: 1.65,
  pointSettleScale: 1.06,
  barRadius: 5,
  barHoverTranslateY: "3px",
  barHoverScaleY: 1.035,
  donutStrokeWidth: 14,
  donutHoverStrokeWidth: 16,
  tooltipOffsetY: "12px",
  depth: Object.freeze({
    gradientAngle: kpiGeometry.depth.gradientAngle,
    gradientStop: kpiGeometry.depth.gradientStop,
    shadowBlur: "6px",
    shadowOffsetY: "3px",
  }),
});

/**
 * Component-owned overlay geometry. These values describe the preferred
 * identity of a floating surface; collision handling still clamps each
 * surface to the available viewport.
 */
export interface OverlayGeometry {
  menu: {
    sm: string;
    md: string;
    lg: string;
  };
  select: {
    min: string;
    max: string;
  };
  combobox: string;
  datePicker: string;
  dateRangePicker: string;
  timePicker: string;
  colorPicker: string;
  popover: {
    min: string;
    max: string;
  };
  tooltipMin: string;
  tooltipMax: string;
  command: string;
  dialog: {
    sm: string;
    md: string;
    lg: string;
  };
  drawerMax: string;
}

export const overlayGeometry: OverlayGeometry = Object.freeze({
  menu: Object.freeze({ sm: "200px", md: "240px", lg: "280px" }),
  select: Object.freeze({ min: "220px", max: "360px" }),
  combobox: "280px",
  datePicker: "336px",
  dateRangePicker: "672px",
  timePicker: "360px",
  colorPicker: "304px",
  popover: Object.freeze({ min: "220px", max: "360px" }),
  tooltipMin: "128px",
  tooltipMax: "260px",
  command: "640px",
  dialog: Object.freeze({ sm: "400px", md: "520px", lg: "720px" }),
  drawerMax: "460px",
});

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
    size: "12px",
    lineHeight: "16px",
    weight: "600",
    tracking: "0.1em",
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
    size: "12px",
    lineHeight: "16px",
    weight: "550",
    tracking: "0.06em",
    family: "ui",
  },
  "table-cell": {
    size: "13px",
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
  editorial: createTypographyProfile({
    ui: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: '"Source Serif 4", Georgia, "Times New Roman", serif',
    mono: '"IBM Plex Mono", "SFMono-Regular", Consolas, monospace',
    headingTracking: "-0.02em",
    bodyTracking: "0.005em",
  }),
  technical: createTypographyProfile({
    ui: '"IBM Plex Mono", "SFMono-Regular", Consolas, monospace',
    display: "Inter, ui-sans-serif, system-ui, sans-serif",
    mono: '"IBM Plex Mono", "SFMono-Regular", Consolas, monospace',
    headingTracking: "-0.04em",
    bodyTracking: "-0.01em",
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
  /** Internal high-contrast boundary tier between default and strong. */
  borderContrast: string;
  borderStrong: string;
  muted: string;
  /** Neutral ink used by elevation shadows, independent of the brand hue. */
  shadow: string;
  /** Neutral ink used by viewport scrims, independent of the brand hue. */
  scrim: string;
};

const lightNeutral: NeutralProfile = {
  // Keep the environmental canvas explicitly white. Brand, state, and data
  // colour belong to bounded objects, never to the page background.
  background: "0 0% 100%",
  surface: "0 0% 100%",
  surfaceSubtle: "0 0% 97%",
  surfaceMuted: "0 0% 94%",
  surfaceRaised: "0 0% 100%",
  foreground: "0 0% 12%",
  mutedForeground: "0 0% 43%",
  mutedForegroundStrong: "0 0% 35%",
  border: "0 0% 86%",
  borderContrast: "0 0% 80%",
  borderStrong: "0 0% 72%",
  muted: "0 0% 94%",
  shadow: "0 0% 12%",
  scrim: "0 0% 12%",
};

const darkNeutral: NeutralProfile = {
  background: "0 0% 9%",
  surface: "0 0% 12%",
  surfaceSubtle: "0 0% 16%",
  surfaceMuted: "0 0% 20%",
  surfaceRaised: "0 0% 17%",
  foreground: "0 0% 96%",
  mutedForeground: "0 0% 68%",
  mutedForegroundStrong: "0 0% 76%",
  border: "0 0% 24%",
  borderContrast: "0 0% 30%",
  borderStrong: "0 0% 35%",
  muted: "0 0% 21%",
  shadow: "0 0% 0%",
  scrim: "0 0% 0%",
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
      surfaceSubtle: "0 0% 98%",
      surfaceMuted: "0 0% 95%",
      surfaceRaised: "0 0% 100%",
      foreground: "0 0% 11%",
      mutedForeground: "0 0% 43%",
      mutedForegroundStrong: "0 0% 35%",
      border: "0 0% 87%",
      borderContrast: "0 0% 77%",
      borderStrong: "0 0% 66%",
      muted: "0 0% 95%",
      shadow: "0 0% 12%",
      scrim: "0 0% 12%",
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
      borderContrast: "0 0% 74%",
      borderStrong: "0 0% 62%",
      muted: "0 0% 92%",
      shadow: "0 0% 12%",
      scrim: "0 0% 12%",
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
      borderContrast: "0 0% 30%",
      borderStrong: "0 0% 36%",
      muted: "0 0% 21%",
      shadow: "0 0% 0%",
      scrim: "0 0% 0%",
    },
  },
};

export function resolveAppearance(
  appearance: Appearance = "system",
): Exclude<Appearance, "system"> {
  if (appearance === "light" || appearance === "dark") return appearance;
  if (appearance !== "system") return defaultTheme.appearance;
  if (typeof window === "undefined" || typeof window.matchMedia !== "function")
    return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveProfileName<Name extends string>(
  value: unknown,
  profiles: object,
  fallback: Name,
): Name {
  return typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(profiles, value)
    ? (value as Name)
    : fallback;
}

function resolveFamily(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function resolveColorSource(
  value: unknown,
  fallback: PaletteName,
): ThemeColorSource {
  if (isExactColorSource(value)) return exactColor(value.value);
  return resolveProfileName(value, paletteProfiles, fallback);
}

function resolveColorProfile(
  source: ThemeColorSource,
  fallback: PaletteName,
): PaletteProfile {
  return isExactColorSource(source)
    ? exactColorProfile(source)
    : paletteProfiles[resolveProfileName(source, paletteProfiles, fallback)];
}

export function resolveTheme(config: ThemeConfig = {}): ResolvedTheme {
  const resolvedConfig = resolveThemeConfigLayers({
    THEME_OVERRIDE: config,
  });
  const typographySetting = resolvedConfig.typography;
  const typographyOverrides =
    typographySetting !== null && typeof typographySetting === "object"
      ? typographySetting
      : undefined;
  const typographyName = typographyOverrides?.preset ?? typographySetting;
  const resolvedTypographyName = resolveProfileName(
    typographyName,
    typographyProfiles,
    defaultTheme.typography,
  );
  const typographyProfile = typographyProfiles[resolvedTypographyName];
  const palette = resolveProfileName(
    resolvedConfig.palette,
    paletteProfiles,
    defaultTheme.palette,
  );
  const primarySource = resolveColorSource(resolvedConfig.primary, palette);
  const accentSource = resolveColorSource(resolvedConfig.accent, palette);
  const primary = isExactColorSource(primarySource) ? palette : primarySource;
  const accent = isExactColorSource(accentSource) ? palette : accentSource;
  const canvas = resolveProfileName(
    resolvedConfig.canvas,
    canvasProfiles,
    defaultTheme.canvas,
  );
  const surfaceTreatment = resolveProfileName(
    resolvedConfig.surfaceTreatment,
    { quiet: true, "low-contrast": true, outlined: true },
    defaultTheme.surfaceTreatment,
  );
  const chartPalette = resolveProfileName(
    resolvedConfig.chartPalette,
    { spectrum: true, four: true, monochrome: true },
    defaultTheme.chartPalette,
  );
  const radius = resolveProfileName(
    resolvedConfig.radius,
    radiusProfiles,
    defaultTheme.radius,
  );
  const density = resolveProfileName(
    resolvedConfig.density,
    densityProfiles,
    defaultTheme.density,
  );
  const elevation = resolveProfileName(
    resolvedConfig.elevation,
    { flat: true, soft: true, standard: true },
    defaultTheme.elevation,
  );
  const radiusValue =
    typeof resolvedConfig.radiusValue !== "number" ||
    !Number.isFinite(resolvedConfig.radiusValue)
      ? undefined
      : normalizeRadiusValue(resolvedConfig.radiusValue);
  const motionDuration = normalizeMotionDuration(
    resolvedConfig.motionDuration ?? defaultTheme.motionDuration,
  );

  return {
    appearance: resolveAppearance(
      resolvedConfig.appearance ?? defaultTheme.appearance,
    ),
    palette,
    primary,
    primarySource,
    accent,
    accentSource,
    canvas,
    surfaceTreatment,
    chartPalette,
    radius,
    ...(radiusValue === undefined ? {} : { radiusValue }),
    density,
    motionDuration,
    typography: resolvedTypographyName,
    typographyFamilies: {
      ui: resolveFamily(typographyOverrides?.ui, typographyProfile.ui),
      display: resolveFamily(
        typographyOverrides?.display,
        typographyProfile.display,
      ),
      mono: resolveFamily(typographyOverrides?.mono, typographyProfile.mono),
    },
    elevation,
  };
}

interface ResolvedThemeColorTokens {
  readonly primaryPalette: PaletteProfile;
  readonly accentPalette: PaletteProfile;
  readonly neutrals: NeutralProfile;
  readonly chartColors: readonly string[];
  readonly chartSurfaceColors: readonly string[];
  readonly semantic: {
    readonly success: string;
    readonly successForeground: string;
    readonly warning: string;
    readonly danger: string;
    readonly dangerText: string;
    readonly info: string;
  };
  readonly surfaceEmphasis: {
    readonly inverse: string;
    readonly inverseForeground: string;
    readonly inverseMutedForeground: string;
    readonly inverseBorder: string;
    readonly softAlpha: string;
    readonly softBorderAlpha: string;
    readonly solid: string;
    readonly solidSuccess: string;
    readonly solidWarning: string;
    readonly solidDanger: string;
    readonly solidInfo: string;
  };
  readonly highContrast: boolean;
  readonly borderHsl: string;
  readonly borderStrongHsl: string;
  readonly borderSubtleHsl: string;
  readonly surfaceHsl: string;
  readonly focusHsl: string;
  readonly formBorderHsl: string;
  readonly tableBorderHsl: string;
}

/** Resolve semantic roles once so every renderer consumes the same values. */
function resolveThemeColorTokens(
  theme: ResolvedTheme,
  options: ThemeVariableOptions,
): ResolvedThemeColorTokens {
  const primaryPalette = resolveColorProfile(
    theme.primarySource,
    theme.primary,
  );
  const accentPalette = resolveColorProfile(theme.accentSource, theme.accent);
  const neutrals = canvasProfiles[theme.canvas][theme.appearance];
  const chartColors = (
    theme.chartPalette === "four"
      ? [...categoricalChartColors.slice(0, 4), categoricalChartColors[3]]
      : theme.chartPalette === "monochrome"
        ? [
            primaryPalette.primary,
            primaryPalette.primaryHover,
            primaryPalette.primaryActive,
            primaryPalette.primary,
            primaryPalette.primaryHover,
          ]
        : categoricalChartColors
  ).map((value) => colorToChartMark(value, theme.appearance));
  const chartSurfaceColors = chartColors.map(colorToSolidSurface);
  const highContrast = options.contrast === "more";
  const semantic = {
    success: "128 42% 30%",
    successForeground:
      theme.appearance === "dark" ? "128 42% 72%" : "128 52% 24%",
    warning: "38 92% 50%",
    danger: "0 72% 51%",
    dangerText: theme.appearance === "dark" ? "0 92% 76%" : "0 72% 42%",
    info: "199 89% 48%",
  };
  const surfaceEmphasis = {
    inverse: theme.appearance === "dark" ? "0 0% 96%" : "0 0% 13%",
    inverseForeground: theme.appearance === "dark" ? "0 0% 10%" : "0 0% 98%",
    inverseMutedForeground:
      theme.appearance === "dark" ? "0 0% 33%" : "0 0% 76%",
    inverseBorder: theme.appearance === "dark" ? "0 0% 78%" : "0 0% 28%",
    softAlpha: theme.appearance === "dark" ? "0.18" : "0.08",
    softBorderAlpha: theme.appearance === "dark" ? "0.46" : "0.28",
    solid: colorToSolidSurface(primaryPalette.primary),
    solidSuccess: colorToSolidSurface(semantic.success),
    solidWarning: colorToSolidSurface(semantic.warning),
    solidDanger: colorToSolidSurface(semantic.danger),
    solidInfo: colorToSolidSurface(semantic.info),
  };
  const borderHsl =
    theme.surfaceTreatment === "quiet"
      ? highContrast
        ? neutrals.borderContrast
        : neutrals.surface
      : theme.surfaceTreatment === "low-contrast"
        ? highContrast
          ? neutrals.borderContrast
          : neutrals.border
        : highContrast
          ? neutrals.borderContrast
          : neutrals.border;
  const borderStrongHsl =
    theme.surfaceTreatment === "quiet"
      ? highContrast
        ? neutrals.borderStrong
        : neutrals.border
      : theme.surfaceTreatment === "low-contrast"
        ? highContrast
          ? neutrals.borderStrong
          : neutrals.border
        : neutrals.borderStrong;
  const borderSubtleHsl = highContrast
    ? neutrals.border
    : neutrals.surfaceMuted;
  const surfaceHsl =
    theme.surfaceTreatment === "quiet"
      ? highContrast
        ? neutrals.surfaceMuted
        : neutrals.surfaceSubtle
      : neutrals.surface;
  const focusHsl = resolveFocusColor(
    primaryPalette.primary,
    neutrals.surface,
    theme.appearance,
  );
  const formBorderHsl =
    theme.surfaceTreatment === "outlined"
      ? neutrals.borderStrong
      : highContrast
        ? neutrals.borderStrong
        : neutrals.border;
  const tableBorderHsl = highContrast
    ? neutrals.borderContrast
    : theme.surfaceTreatment === "quiet"
      ? neutrals.border
      : borderHsl;

  return {
    primaryPalette,
    accentPalette,
    neutrals,
    chartColors,
    chartSurfaceColors,
    semantic,
    surfaceEmphasis,
    highContrast,
    borderHsl,
    borderStrongHsl,
    borderSubtleHsl,
    surfaceHsl,
    focusHsl,
    formBorderHsl,
    tableBorderHsl,
  };
}

export function buildThemeVariables(
  theme: ResolvedTheme,
  options: ThemeVariableOptions = {},
): Record<string, string> {
  const {
    primaryPalette,
    accentPalette,
    neutrals,
    chartColors,
    chartSurfaceColors,
    semantic,
    surfaceEmphasis,
    highContrast,
    borderHsl,
    borderStrongHsl,
    borderSubtleHsl,
    surfaceHsl,
    focusHsl,
    formBorderHsl,
    tableBorderHsl,
  } = resolveThemeColorTokens(theme, options);
  const radius =
    theme.radiusValue === undefined
      ? radiusProfiles[theme.radius]
      : buildRadiusProfile(theme.radiusValue);
  const density = densityProfiles[theme.density];
  // Clearance tiers protect the most expressive corners without inflating
  // normal density. These tiers are exercised by the rendered stress matrix.
  const cardClearance =
    parseFloat(radius.card) > 24
      ? referenceSpace[5]
      : parseFloat(radius.card) > 18
        ? referenceSpace[4]
        : referenceSpace[3];
  const panelClearance =
    parseFloat(radius.panel) > 24 ? referenceSpace[4] : referenceSpace[3];
  const fieldClearance =
    parseFloat(radius.control) > 14 ? referenceSpace[3] : referenceSpace[2];
  const typography = typographyProfiles[theme.typography];
  const typographyFamilies = theme.typographyFamilies ?? {
    ui: typography.ui,
    display: typography.display,
    mono: typography.mono,
  };
  // Card depth stays achromatic; semantic hue belongs to explicit emphasis.
  const shadow =
    theme.elevation === "flat"
      ? "none"
      : theme.elevation === "standard"
        ? `0 12px 32px -24px hsl(${neutrals.shadow} / .42)`
        : `0 1px 2px hsl(${neutrals.shadow} / .08), 0 16px 36px -26px hsl(${neutrals.shadow} / .24)`;
  const reducedMotion = options.motion === "reduced";
  const motionMilliseconds = Math.round(theme.motionDuration * 1000);
  const motionDurationValue = reducedMotion
    ? "0.01ms"
    : `${theme.motionDuration}s`;
  const motionRoles = resolveMotionRoles(
    options.motionProfile,
    theme.motionDuration,
  );
  const milliseconds = (seconds: number) =>
    reducedMotion ? "0.01ms" : `${Math.round(seconds * 1000)}ms`;
  const motionInstant = milliseconds(motionRoles.fast);
  const motionFast = milliseconds(motionRoles.interaction);
  const motionStandard = milliseconds(motionRoles.state);
  const motionOverlay = milliseconds(motionRoles.enter);
  const motionExit = milliseconds(motionRoles.exit);
  const motionReveal = milliseconds(motionRoles.reveal);
  const motionChart = milliseconds(motionRoles.chart);
  const motionLoop = milliseconds(motionRoles.loop);
  const motionEaseStandard = "cubic-bezier(.2, 0, 0, 1)";
  const motionEaseEnter = "cubic-bezier(.16, 1, .3, 1)";
  const motionEaseChart = "cubic-bezier(.22, .74, .24, 1)";
  const motionEaseExit = "cubic-bezier(.4, 0, 1, 1)";

  const kpiDepth =
    theme.elevation === "flat"
      ? {
          borderAlpha: "1",
          highlightAlpha: "0",
          shadeAlpha: "0",
          shadowAlpha: "0",
        }
      : theme.elevation === "standard"
        ? {
            borderAlpha: "0.7",
            highlightAlpha: "0.36",
            shadeAlpha: "0.18",
            shadowAlpha: "0.3",
          }
        : {
            borderAlpha: "0.56",
            highlightAlpha: "0.3",
            shadeAlpha: "0.14",
            shadowAlpha: "0.24",
          };
  const surfaceDepth = {
    ...kpiDepth,
    hoverTranslateY:
      theme.elevation === "flat" ? "0px" : surfaceGeometry.hoverTranslateY,
  };
  const chartGradientStartAlpha = String(
    1 - Number(kpiDepth.highlightAlpha) * 0.55,
  );
  const chartGradientEndAlpha = String(1 - Number(kpiDepth.shadeAlpha) * 0.65);
  const chartDepthShadowAlpha = (Number(kpiDepth.shadowAlpha) * 0.72).toFixed(
    4,
  );

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
  const focusRingAlpha = highContrast ? "1" : "0.72";
  const focusGlowAlpha = highContrast ? "0.3" : "0.18";
  const composition = options.composition ?? {
    contentMax: "1440px",
    readingMeasure: "68ch",
    pageGutter: "clamp(24px, 3vw, 44px)",
    sectionGap: "clamp(24px, 3vw, 44px)",
  };
  return {
    "--t7-theme-recipe": options.recipe ?? "custom",
    "--t7-expression": options.expression ?? "neutral",
    "--t7-contrast": highContrast ? "more" : "standard",
    "--t7-motion-preference": reducedMotion ? "reduced" : "full",
    "--t7-palette-name": theme.palette,
    "--t7-primary-palette": theme.primary,
    "--t7-accent-palette": theme.accent,
    "--t7-primary-source-kind": isExactColorSource(theme.primarySource)
      ? "exact"
      : "palette",
    "--t7-primary-source": isExactColorSource(theme.primarySource)
      ? theme.primarySource.value
      : theme.primarySource,
    "--t7-accent-source-kind": isExactColorSource(theme.accentSource)
      ? "exact"
      : "palette",
    "--t7-accent-source": isExactColorSource(theme.accentSource)
      ? theme.accentSource.value
      : theme.accentSource,
    "--t7-canvas-mode": theme.canvas,
    "--t7-surface-treatment": theme.surfaceTreatment,
    "--t7-chart-palette": theme.chartPalette,
    "--t7-chart-palette-count":
      theme.chartPalette === "four"
        ? "4"
        : theme.chartPalette === "monochrome"
          ? "1"
          : "5",
    "--t7-primary-hsl": primaryPalette.primary,
    "--t7-action-primary-hsl": primaryPalette.primary,
    "--t7-primary-hover-hsl": primaryPalette.primaryHover,
    "--t7-action-primary-hover-hsl": primaryPalette.primaryHover,
    "--t7-primary-active-hsl": primaryPalette.primaryActive,
    "--t7-action-primary-pressed-hsl": primaryPalette.primaryActive,
    "--t7-primary-foreground-hsl": primaryPalette.primaryForeground,
    "--t7-action-primary-foreground-hsl": primaryPalette.primaryForeground,
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
    "--t7-surface-emphasis-solid-chart-1-hsl": chartSurfaceColors[0],
    "--t7-surface-emphasis-solid-chart-2-hsl": chartSurfaceColors[1],
    "--t7-surface-emphasis-solid-chart-3-hsl": chartSurfaceColors[2],
    "--t7-surface-emphasis-solid-chart-4-hsl": chartSurfaceColors[3],
    "--t7-surface-emphasis-solid-chart-5-hsl": chartSurfaceColors[4],
    "--t7-surface-emphasis-solid-chart-foreground-hsl": solidSurfaceForeground,
    "--t7-background-hsl": neutrals.background,
    "--t7-color-bg-canvas-hsl": neutrals.background,
    "--t7-surface-hsl": surfaceHsl,
    "--t7-color-bg-surface-hsl": surfaceHsl,
    "--t7-surface-subtle-hsl": neutrals.surfaceSubtle,
    "--t7-surface-muted-hsl": neutrals.surfaceMuted,
    "--t7-surface-raised-hsl": neutrals.surfaceRaised,
    "--t7-surface-overlay-hsl": neutrals.surfaceRaised,
    "--t7-surface-emphasis-plain-hsl": surfaceHsl,
    "--t7-surface-emphasis-soft-hsl": neutrals.surfaceSubtle,
    "--t7-surface-emphasis-soft-alpha": surfaceEmphasis.softAlpha,
    "--t7-surface-emphasis-soft-border-alpha": surfaceEmphasis.softBorderAlpha,
    "--t7-surface-emphasis-expressive-alpha":
      theme.appearance === "dark" ? "0.28" : "0.16",
    "--t7-surface-emphasis-expressive-border-alpha":
      theme.appearance === "dark" ? "0.52" : "0.36",
    "--t7-surface-emphasis-accent-hsl": primaryPalette.primary,
    "--t7-surface-emphasis-success-hsl": semantic.success,
    "--t7-surface-emphasis-warning-hsl": semantic.warning,
    "--t7-surface-emphasis-danger-hsl": semantic.danger,
    "--t7-surface-emphasis-info-hsl": semantic.info,
    "--t7-surface-emphasis-solid-hsl": surfaceEmphasis.solid,
    "--t7-surface-emphasis-solid-success-hsl": surfaceEmphasis.solidSuccess,
    "--t7-surface-emphasis-solid-warning-hsl": surfaceEmphasis.solidWarning,
    "--t7-surface-emphasis-solid-danger-hsl": surfaceEmphasis.solidDanger,
    "--t7-surface-emphasis-solid-info-hsl": surfaceEmphasis.solidInfo,
    "--t7-surface-emphasis-solid-foreground-hsl": solidSurfaceForeground,
    "--t7-surface-emphasis-solid-success-foreground-hsl":
      solidSurfaceForeground,
    "--t7-surface-emphasis-solid-warning-foreground-hsl":
      solidSurfaceForeground,
    "--t7-surface-emphasis-solid-danger-foreground-hsl": solidSurfaceForeground,
    "--t7-surface-emphasis-solid-info-foreground-hsl": solidSurfaceForeground,
    "--t7-surface-emphasis-inverse-hsl": surfaceEmphasis.inverse,
    "--t7-surface-emphasis-inverse-foreground-hsl":
      surfaceEmphasis.inverseForeground,
    "--t7-surface-emphasis-inverse-muted-foreground-hsl":
      surfaceEmphasis.inverseMutedForeground,
    "--t7-surface-emphasis-inverse-border-hsl": surfaceEmphasis.inverseBorder,
    "--t7-foreground-hsl": neutrals.foreground,
    "--t7-color-text-primary-hsl": neutrals.foreground,
    "--t7-muted-foreground-hsl": highContrast
      ? neutrals.mutedForegroundStrong
      : neutrals.mutedForeground,
    "--t7-muted-foreground-strong-hsl": neutrals.mutedForegroundStrong,
    "--t7-color-text-muted-hsl": highContrast
      ? neutrals.mutedForegroundStrong
      : neutrals.mutedForeground,
    "--t7-border-hsl": borderHsl,
    "--t7-border-strong-hsl": borderStrongHsl,
    "--t7-border-subtle-hsl": borderSubtleHsl,
    "--t7-table-border-hsl": tableBorderHsl,
    "--t7-table-divider-alpha": `${tableGeometry.dividerAlpha}`,
    "--t7-muted-hsl": neutrals.muted,
    "--t7-focus-hsl": focusHsl,
    "--t7-focus-width": highContrast ? "3px" : "1px",
    "--t7-focus-offset": "2px",
    "--t7-focus-ring-alpha": focusRingAlpha,
    "--t7-focus-glow-alpha": focusGlowAlpha,
    "--t7-focus-halo":
      "0 0 0 var(--t7-focus-offset) hsl(var(--t7-surface-hsl))",
    "--t7-focus-ring":
      "var(--t7-focus-halo), 0 0 0 calc(var(--t7-focus-offset) + var(--t7-focus-width)) hsl(var(--t7-focus-hsl) / var(--t7-focus-ring-alpha)), 0 0 10px hsl(var(--t7-focus-hsl) / var(--t7-focus-glow-alpha))",
    "--t7-focus-ring-inset":
      "inset 0 0 0 var(--t7-focus-width) hsl(var(--t7-focus-hsl) / var(--t7-focus-ring-alpha)), inset 0 0 8px hsl(var(--t7-focus-hsl) / var(--t7-focus-glow-alpha))",
    "--t7-shadow-selection":
      "inset 0 0 0 1px hsl(var(--t7-selected-hsl) / 0.24)",
    "--t7-shadow-state-boundary":
      "inset 0 0 0 1px hsl(var(--t7-state-boundary-hsl, var(--t7-primary-hsl)) / 0.18)",
    "--t7-selected-hsl": primaryPalette.primary,
    "--t7-selected-foreground-hsl": primaryPalette.primaryForeground,
    "--t7-selected-hover-hsl": primaryPalette.primaryHover,
    "--t7-interactive-border-hsl": primaryPalette.primary,
    "--t7-input-background-hsl": neutrals.surface,
    "--t7-field-background-hsl": neutrals.surface,
    "--t7-input-border-hsl": formBorderHsl,
    "--t7-field-border-hsl": formBorderHsl,
    "--t7-input-hover-border-hsl": primaryPalette.primary,
    // Focus is carried by the semantic ring/glow. Keep the field edge
    // neutral so focused controls do not grow a second accent border.
    "--t7-input-focus-border-hsl": "var(--t7-field-border-hsl)",
    "--t7-field-foreground-hsl": neutrals.foreground,
    "--t7-disabled-background-hsl": neutrals.muted,
    "--t7-disabled-foreground-hsl": neutrals.mutedForegroundStrong,
    "--t7-success-hsl": semantic.success,
    "--t7-success-foreground-hsl": semantic.successForeground,
    "--t7-warning-hsl": semantic.warning,
    "--t7-warning-foreground-hsl":
      theme.appearance === "dark" ? "42 92% 72%" : "28 72% 27%",
    "--t7-danger-hsl": semantic.danger,
    "--t7-danger-text-hsl": semantic.dangerText,
    "--t7-danger-badge-foreground-hsl": semantic.dangerText,
    "--t7-danger-foreground-hsl": "0 0% 100%",
    "--t7-action-danger-hsl": semantic.danger,
    "--t7-action-danger-foreground-hsl": "0 0% 100%",
    "--t7-info-hsl": semantic.info,
    "--t7-info-foreground-hsl":
      theme.appearance === "dark" ? "199 70% 76%" : "199 84% 27%",
    "--t7-chart-axis-hsl": neutrals.borderStrong,
    "--t7-chart-grid-hsl": highContrast
      ? neutrals.borderStrong
      : neutrals.border,
    "--t7-chart-label-hsl": highContrast
      ? neutrals.mutedForegroundStrong
      : neutrals.mutedForeground,
    "--t7-chart-tooltip-hsl": neutrals.surfaceRaised,
    "--t7-chart-tooltip-foreground-hsl": neutrals.foreground,
    "--t7-chart-focus-hsl": "var(--t7-focus-hsl)",
    "--t7-chart-selection-hsl": "var(--t7-chart-focus-hsl)",
    "--t7-chart-comparison-hsl": neutrals.mutedForegroundStrong,
    "--t7-chart-threshold-hsl": neutrals.foreground,
    "--t7-chart-no-data-hsl": neutrals.mutedForeground,
    "--t7-chart-positive-hsl": semantic.successForeground,
    "--t7-chart-negative-hsl": semantic.dangerText,
    "--t7-action-secondary-background-hsl": neutrals.surface,
    "--t7-action-secondary-foreground-hsl": neutrals.foreground,
    "--t7-action-secondary-hover-hsl": primaryPalette.primary,
    "--t7-action-quiet-foreground-hsl": highContrast
      ? neutrals.mutedForegroundStrong
      : neutrals.mutedForeground,
    "--t7-action-quiet-hover-hsl": neutrals.muted,
    "--t7-radius-control": radius.control,
    "--t7-radius-indicator": radius.indicator,
    "--t7-radius-base": radius.base,
    "--t7-radius-value": radius.base,
    "--t7-radius-panel": radius.panel,
    "--t7-radius-data": `${Math.min(parseFloat(radius.panel), theme.density === "compact" || theme.density === "dense" ? 10 : 16)}px`,
    "--t7-radius-card": radius.card,
    "--t7-radius-shell": radius.shell,
    "--t7-radius-full": "9999px",
    "--t7-control-height": density.control,
    "--t7-control-height-sm": `${parseFloat(density.control) - 4}px`,
    "--t7-control-height-lg": `${parseFloat(density.control) + 8}px`,
    "--t7-header-height": `${Math.max(60, parseFloat(density.control) + 24)}px`,
    "--t7-header-control-height": `${Math.max(36, parseFloat(density.control) - 4)}px`,
    "--t7-header-action-gap": `${Math.max(8, parseFloat(density.controlGap))}px`,
    "--t7-header-padding-inline": "clamp(16px, 3vw, 40px)",
    "--t7-control-gap-sm": `${Math.max(6, parseFloat(density.controlGap) - 2)}px`,
    "--t7-control-gap-lg": `${parseFloat(density.controlGap) + 2}px`,
    "--t7-control-padding-block": referenceSpace[1],
    "--t7-row-height": density.row,
    "--t7-menu-height": density.menu,
    "--t7-card-padding": density.cardPadding,
    "--t7-kpi-padding": density.cardPadding,
    "--t7-kpi-gap": density.controlGap,
    "--t7-kpi-content-gap": `${Math.max(8, parseFloat(density.controlGap))}px`,
    "--t7-kpi-icon-container": `${Math.min(
      26,
      Math.max(22, parseFloat(density.control) - 16),
    )}px`,
    "--t7-kpi-icon-size": `${Math.min(
      24,
      Math.max(20, parseFloat(density.control) - 18),
    )}px`,
    "--t7-kpi-chart-height": `${Math.max(
      48,
      parseFloat(density.control) + 12,
    )}px`,
    "--t7-kpi-trend-padding-block": kpiGeometry.trendPaddingBlock,
    "--t7-kpi-trend-padding-inline": kpiGeometry.trendPaddingInline,
    "--t7-kpi-decorative-size": kpiGeometry.decorative.size,
    "--t7-kpi-decorative-offset-top": kpiGeometry.decorative.offsetTop,
    "--t7-kpi-decorative-offset-inline": kpiGeometry.decorative.offsetInline,
    "--t7-kpi-decorative-opacity": `${kpiGeometry.decorative.opacity}`,
    "--t7-kpi-depth-gradient-angle": kpiGeometry.depth.gradientAngle,
    "--t7-kpi-depth-gradient-stop": kpiGeometry.depth.gradientStop,
    "--t7-kpi-depth-shadow-blur": kpiGeometry.depth.shadowBlur,
    "--t7-kpi-depth-shadow-offset-y": kpiGeometry.depth.shadowOffsetY,
    "--t7-kpi-depth-border-alpha": kpiDepth.borderAlpha,
    "--t7-kpi-depth-highlight-alpha": kpiDepth.highlightAlpha,
    "--t7-kpi-depth-shade-alpha": kpiDepth.shadeAlpha,
    "--t7-kpi-depth-shadow-alpha": kpiDepth.shadowAlpha,
    "--t7-surface-depth-gradient-angle": surfaceGeometry.depth.gradientAngle,
    "--t7-surface-depth-gradient-stop": surfaceGeometry.depth.gradientStop,
    "--t7-surface-depth-shadow-blur": surfaceGeometry.depth.shadowBlur,
    "--t7-surface-depth-shadow-offset-y": surfaceGeometry.depth.shadowOffsetY,
    "--t7-surface-depth-border-alpha": surfaceDepth.borderAlpha,
    "--t7-surface-depth-highlight-alpha": surfaceDepth.highlightAlpha,
    "--t7-surface-depth-shade-alpha": surfaceDepth.shadeAlpha,
    "--t7-surface-depth-shadow-alpha": surfaceDepth.shadowAlpha,
    "--t7-surface-hover-translate-y": surfaceDepth.hoverTranslateY,
    "--t7-chart-line-width": `${chartGeometry.lineWidth}`,
    "--t7-chart-point-radius": `${chartGeometry.pointRadius}`,
    "--t7-chart-point-hover-scale": `${chartGeometry.pointHoverScale}`,
    "--t7-chart-point-settle-scale": `${chartGeometry.pointSettleScale}`,
    "--t7-chart-bar-radius": `${chartGeometry.barRadius}`,
    "--t7-chart-bar-hover-translate-y": chartGeometry.barHoverTranslateY,
    "--t7-chart-bar-hover-scale-y": `${chartGeometry.barHoverScaleY}`,
    "--t7-chart-donut-stroke-width": `${chartGeometry.donutStrokeWidth}`,
    "--t7-chart-donut-hover-stroke-width": `${chartGeometry.donutHoverStrokeWidth}`,
    "--t7-chart-tooltip-offset-y": chartGeometry.tooltipOffsetY,
    "--t7-chart-depth-gradient-angle": chartGeometry.depth.gradientAngle,
    "--t7-chart-depth-gradient-stop": chartGeometry.depth.gradientStop,
    "--t7-chart-depth-shadow-blur": chartGeometry.depth.shadowBlur,
    "--t7-chart-depth-shadow-offset-y": chartGeometry.depth.shadowOffsetY,
    "--t7-chart-depth-border-alpha": kpiDepth.borderAlpha,
    "--t7-chart-depth-highlight-alpha": kpiDepth.highlightAlpha,
    "--t7-chart-depth-shade-alpha": kpiDepth.shadeAlpha,
    "--t7-chart-depth-shadow-alpha": chartDepthShadowAlpha,
    "--t7-chart-gradient-start-alpha": chartGradientStartAlpha,
    "--t7-chart-gradient-end-alpha": chartGradientEndAlpha,
    "--t7-section-gap": density.sectionGap,
    "--t7-control-gap": density.controlGap,
    "--t7-control-padding-inline": density.controlPaddingInline,
    "--t7-control-padding-inline-small": density.controlPaddingInlineSmall,
    "--t7-control-padding-inline-large": density.controlPaddingInlineLarge,
    "--t7-field-padding-inline": density.fieldPaddingInline,
    "--t7-field-gap": density.fieldGap,
    "--t7-card-header-gap": density.cardHeaderGap,
    "--t7-card-content-gap": density.cardContentGap,
    "--t7-card-footer-padding-block": density.cardFooterPaddingBlock,
    "--t7-panel-padding": density.panelPadding,
    "--t7-menu-padding-inline": density.menuPaddingInline,
    "--t7-menu-padding-block": density.menuPaddingBlock,
    "--t7-overlay-padding": density.overlayPadding,
    "--t7-table-cell-padding-inline": density.tableCellPaddingInline,
    "--t7-table-cell-padding-block": referenceSpace[1],
    "--t7-card-safe-inset": `max(${density.cardPadding}, ${cardClearance})`,
    "--t7-card-corner-clearance": cardClearance,
    "--t7-panel-corner-clearance": panelClearance,
    "--t7-overlay-safe-inset": `max(${density.overlayPadding}, ${panelClearance})`,
    "--t7-field-safe-inset": `max(var(--t7-field-padding-inline), ${fieldClearance})`,
    "--t7-field-corner-clearance": fieldClearance,
    "--t7-menu-corner-clearance":
      parseFloat(radius.panel) > 24 ? "10px" : "5px",
    "--t7-focus-clearance": layoutGeometry.focusClearance,
    ...Object.fromEntries(
      Object.entries(layoutGeometry.gutter).map(([role, value]) => [
        `--t7-gutter-${role}`,
        value,
      ]),
    ),
    ...Object.fromEntries(
      Object.entries(iconGeometry).map(([role, value]) => [
        `--t7-icon-${role}`,
        value,
      ]),
    ),
    "--t7-overlay-menu-sm": overlayGeometry.menu.sm,
    "--t7-overlay-menu-md": overlayGeometry.menu.md,
    "--t7-overlay-menu-lg": overlayGeometry.menu.lg,
    "--t7-overlay-select-min": overlayGeometry.select.min,
    "--t7-overlay-select-max": overlayGeometry.select.max,
    "--t7-overlay-combobox": overlayGeometry.combobox,
    "--t7-overlay-date": overlayGeometry.datePicker,
    "--t7-overlay-date-range": overlayGeometry.dateRangePicker,
    "--t7-overlay-time": overlayGeometry.timePicker,
    "--t7-overlay-color": overlayGeometry.colorPicker,
    "--t7-overlay-popover-min": overlayGeometry.popover.min,
    "--t7-overlay-popover-max": overlayGeometry.popover.max,
    "--t7-overlay-tooltip-min": overlayGeometry.tooltipMin,
    "--t7-overlay-tooltip-max": overlayGeometry.tooltipMax,
    "--t7-overlay-command": overlayGeometry.command,
    "--t7-overlay-dialog-sm": overlayGeometry.dialog.sm,
    "--t7-overlay-dialog-md": overlayGeometry.dialog.md,
    "--t7-overlay-dialog-lg": overlayGeometry.dialog.lg,
    "--t7-overlay-drawer-max": overlayGeometry.drawerMax,
    "--t7-touch-target-min": `${minimumTouchTargetPx}px`,
    "--t7-bottom-navigation-height": "64px",
    "--t7-content-max": composition.contentMax,
    "--t7-sidebar-width": layoutGeometry.sidebarWidth,
    "--t7-aside-width": layoutGeometry.asideWidth,
    ...buildMeasureVariables(),
    "--t7-grid-gap": density.sectionGap,
    "--t7-safe-area-top": "env(safe-area-inset-top, 0px)",
    "--t7-safe-area-right": "env(safe-area-inset-right, 0px)",
    "--t7-safe-area-bottom": "env(safe-area-inset-bottom, 0px)",
    "--t7-safe-area-left": "env(safe-area-inset-left, 0px)",
    "--t7-reading-measure": composition.readingMeasure,
    "--t7-page-gutter": composition.pageGutter,
    "--t7-composition-gap": composition.sectionGap,
    "--t7-rail-reading": composition.readingMeasure,
    "--t7-rail-form": layoutGeometry.formMax,
    "--t7-rail-application": composition.contentMax,
    "--t7-rail-data": layoutGeometry.dataMax,
    "--t7-section-tight": density.sectionGap,
    "--t7-section-default": composition.sectionGap,
    "--t7-section-spacious": `max(${composition.sectionGap}, ${referenceSpace[10]})`,
    "--t7-cluster-tight": referenceSpace[1],
    "--t7-cluster-default": density.controlGap,
    "--t7-cluster-loose": density.cardContentGap,
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
      theme.elevation === "flat"
        ? "none"
        : `0 1px 2px hsl(${neutrals.shadow} / .08)`,
    "--t7-shadow-raised":
      theme.elevation === "flat"
        ? "none"
        : `0 10px 28px -20px hsl(${neutrals.shadow} / .34)`,
    "--t7-shadow-popover":
      theme.elevation === "flat"
        ? "none"
        : `0 18px 44px -24px hsl(${neutrals.shadow} / .48)`,
    "--t7-shadow-modal":
      theme.elevation === "flat"
        ? "none"
        : `0 28px 80px -30px hsl(${neutrals.shadow} / .56)`,
    "--t7-motion-duration": motionDurationValue,
    "--t7-duration-instant": motionInstant,
    "--t7-duration-fast": motionFast,
    "--t7-duration-standard": motionStandard,
    "--t7-duration-normal": motionStandard,
    "--t7-duration-popup": motionFast,
    "--t7-duration-overlay": motionOverlay,
    "--t7-duration-layout": motionStandard,
    "--t7-duration-reveal": motionReveal,
    "--t7-duration-chart": motionChart,
    "--t7-duration-exit": motionExit,
    "--t7-duration-slow": reducedMotion ? "0.01ms" : `${motionMilliseconds}ms`,
    "--t7-duration-loop": motionLoop,
    "--t7-ease-standard": motionEaseStandard,
    "--t7-ease-enter": motionEaseEnter,
    "--t7-ease-chart": motionEaseChart,
    "--t7-ease-exit": motionEaseExit,
    "--t7-motion-interactive":
      "var(--t7-duration-instant) var(--t7-ease-standard)",
    "--t7-motion-state": "var(--t7-duration-standard) var(--t7-ease-standard)",
    "--t7-motion-enter-fast": "var(--t7-duration-popup) var(--t7-ease-enter)",
    "--t7-motion-enter": "var(--t7-duration-overlay) var(--t7-ease-enter)",
    "--t7-motion-enter-slow": "var(--t7-duration-reveal) var(--t7-ease-enter)",
    "--t7-motion-exit": "var(--t7-duration-exit) var(--t7-ease-exit)",
    "--t7-motion-loop": "var(--t7-duration-loop) linear",
    "--t7-motion-loop-eased": "var(--t7-duration-loop) ease-in-out",
    "--t7-transition-fast": "var(--t7-duration-fast) var(--t7-ease-standard)",
    "--t7-transition-standard":
      "var(--t7-duration-standard) var(--t7-ease-standard)",
    "--t7-transition-large": "var(--t7-duration-layout) var(--t7-ease-enter)",
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
    "--t7-doc-sticky-offset":
      "calc(var(--t7-header-height) + var(--t7-ref-space-2))",
    "--t7-scrim-hsl": neutrals.scrim,
    ...Object.fromEntries(
      Object.entries(referenceSpace).map(([step, value]) => [
        `--t7-ref-space-${step}`,
        value,
      ]),
    ),
    ...typographyVariables,
  };
}

export type NativeThemeProjectionOptions = Pick<
  ThemeVariableOptions,
  "contrast" | "motion" | "motionProfile"
>;

const nativeTypographyRoles: Readonly<
  Record<NativeTypographyIntent, TypographyRole>
> = {
  screenTitle: "heading-lg",
  sectionHeading: "heading-md",
  body: "body",
  label: "label",
  caption: "caption",
  button: "button",
  metric: "metric-lg",
};

function resolveNativePixels(value: string, token: string): number {
  const match = /^(\-?\d+(?:\.\d+)?)px$/.exec(value.trim());
  if (!match)
    throw new Error(
      `${token} must resolve to a concrete px value, received ${value}`,
    );
  const result = Number(match[1]);
  if (!Number.isFinite(result)) throw new Error(`${token} is not finite`);
  return result;
}

function resolveNativeTracking(
  value: string,
  fontSize: number,
  token: string,
): number {
  const normalized = value.trim();
  if (normalized === "0") return 0;
  if (normalized.endsWith("px")) return resolveNativePixels(normalized, token);
  if (normalized.endsWith("em")) {
    const amount = Number(normalized.slice(0, -2));
    if (Number.isFinite(amount)) return amount * fontSize;
  }
  throw new Error(`${token} must resolve to px or em, received ${value}`);
}

function resolveNativeWeight(value: string, token: string): NativeFontWeight {
  const weight = Number(value);
  if (!Number.isFinite(weight)) throw new Error(`${token} is not numeric`);
  if (weight <= 450) return "400";
  if (weight <= 575) return "500";
  if (weight <= 625) return "600";
  return "700";
}

/**
 * Project the same resolved semantic roles into renderer-neutral JS data.
 * This is deliberately separate from the Web CSS projection: Native receives
 * concrete colors, dimensions, and durations without parsing CSS variables.
 */
export function buildNativeThemeSnapshot(
  theme: ResolvedTheme,
  options: NativeThemeProjectionOptions = {},
): NativeResolvedThemeVariant {
  const colorTokens = resolveThemeColorTokens(theme, options);
  const nativeHsl: Record<NativeColorRole, string> = {
    canvas: colorTokens.neutrals.background,
    surface: colorTokens.surfaceHsl,
    surfaceRaised: colorTokens.neutrals.surfaceRaised,
    textPrimary: colorTokens.neutrals.foreground,
    textMuted:
      options.contrast === "more"
        ? colorTokens.neutrals.mutedForegroundStrong
        : colorTokens.neutrals.mutedForeground,
    border: colorTokens.borderSubtleHsl,
    borderStrong: colorTokens.borderStrongHsl,
    focus: colorTokens.focusHsl,
    actionPrimary: colorTokens.primaryPalette.primary,
    actionPrimaryForeground: colorTokens.primaryPalette.primaryForeground,
    accent: colorTokens.accentPalette.accent,
    actionSecondary: colorTokens.neutrals.surface,
    actionSecondaryForeground: colorTokens.neutrals.foreground,
    actionQuiet:
      options.contrast === "more"
        ? colorTokens.neutrals.mutedForegroundStrong
        : colorTokens.neutrals.mutedForeground,
    actionDanger: colorTokens.semantic.danger,
    actionDangerForeground: solidSurfaceForeground,
    statusSuccess: colorTokens.semantic.success,
    statusWarning: colorTokens.semantic.warning,
    statusDanger: colorTokens.semantic.danger,
    statusInfo: colorTokens.semantic.info,
  };
  const colors = Object.fromEntries(
    Object.entries(nativeHsl).map(([role, value]) => [role, hslToHex(value)]),
  ) as NativeResolvedThemeVariant["colors"];

  const typographyProfile = typographyProfiles[theme.typography];
  const typography = Object.fromEntries(
    Object.entries(nativeTypographyRoles).map(([intent, role]) => {
      const token = typographyProfile.roles[role];
      const fontSize = resolveNativePixels(
        token.size,
        `semantic.typography.${role}.size`,
      );
      return [
        intent,
        {
          fontSize,
          lineHeight: resolveNativePixels(
            token.lineHeight,
            `semantic.typography.${role}.lineHeight`,
          ),
          fontWeight: resolveNativeWeight(
            token.weight,
            `semantic.typography.${role}.weight`,
          ),
          letterSpacingPx: resolveNativeTracking(
            token.tracking,
            fontSize,
            `semantic.typography.${role}.tracking`,
          ),
          familyRole: token.family,
        },
      ];
    }),
  ) as NativeResolvedThemeVariant["typography"];

  const density = densityProfiles[theme.density];
  const spacing = {
    control: resolveNativePixels(
      density.control,
      "component.geometry.control.height",
    ),
    row: resolveNativePixels(density.row, "component.geometry.row.height"),
    cardPadding: resolveNativePixels(
      density.cardPadding,
      "component.geometry.card.padding",
    ),
    sectionGap: resolveNativePixels(
      density.sectionGap,
      "component.geometry.section.gap",
    ),
    controlGap: resolveNativePixels(
      density.controlGap,
      "component.geometry.control.gap",
    ),
    fieldGap: resolveNativePixels(
      density.fieldGap,
      "component.geometry.field.gap",
    ),
    touchTarget: minimumTouchTargetPx,
  } as NativeResolvedThemeVariant["spacing"];

  const radiusSource =
    theme.radiusValue === undefined
      ? radiusProfiles[theme.radius]
      : buildRadiusProfile(theme.radiusValue);
  const radius = {
    control: resolveNativePixels(
      radiusSource.control,
      "component.radius.control",
    ),
    card: resolveNativePixels(radiusSource.card, "component.radius.card"),
    panel: resolveNativePixels(radiusSource.panel, "component.radius.panel"),
  } as NativeResolvedThemeVariant["radius"];

  const elevationLevel = (
    kind: "surface" | "raised" | "modal",
  ): NativeResolvedThemeVariant["elevation"]["surface"] => {
    if (theme.elevation === "flat") {
      return {
        androidElevation: 0,
        shadowOffsetY: 0,
        shadowRadius: 0,
        shadowOpacity: 0,
      };
    }
    if (kind === "modal") {
      return {
        androidElevation: theme.elevation === "standard" ? 12 : 8,
        shadowOffsetY: theme.elevation === "standard" ? 28 : 18,
        shadowRadius: theme.elevation === "standard" ? 40 : 28,
        shadowOpacity: theme.elevation === "standard" ? 0.56 : 0.48,
      };
    }
    if (kind === "raised") {
      return {
        androidElevation: theme.elevation === "standard" ? 7 : 4,
        shadowOffsetY: theme.elevation === "standard" ? 10 : 6,
        shadowRadius: theme.elevation === "standard" ? 28 : 20,
        shadowOpacity: theme.elevation === "standard" ? 0.34 : 0.24,
      };
    }
    return {
      androidElevation: theme.elevation === "standard" ? 3 : 1,
      shadowOffsetY: theme.elevation === "standard" ? 1 : 1,
      shadowRadius: theme.elevation === "standard" ? 2 : 2,
      shadowOpacity: theme.elevation === "standard" ? 0.12 : 0.08,
    };
  };

  const motionRoles = resolveMotionRoles(
    options.motionProfile,
    theme.motionDuration,
  );
  const rolesMs = Object.fromEntries(
    Object.entries(motionRoles).map(([role, seconds]) => [
      role,
      options.motion === "reduced" ? 0.01 : Math.round(seconds * 1000),
    ]),
  ) as NativeResolvedThemeVariant["motion"]["rolesMs"];

  const measures = Object.fromEntries(
    MEASURE_NAMES.map((name) => {
      const measure = MEASURE_CONTRACT[name];
      return [
        name,
        {
          minimumPx: measure.minimumPx,
          preferredPx: measure.preferredPx,
          maximumPx: measure.maximumPx,
          fluid: measure.mode === "fluid",
        },
      ];
    }),
  ) as Record<MeasureName, NativeResolvedMeasure>;

  return {
    appearance: theme.appearance,
    colors,
    typography,
    layout: { measures },
    spacing,
    radius,
    elevation: {
      preset: theme.elevation,
      surface: elevationLevel("surface"),
      raised: elevationLevel("raised"),
      modal: elevationLevel("modal"),
    },
    chart: {
      palette: theme.chartPalette,
      colors: colorTokens.chartColors.map((value) => hslToHex(value)),
    },
    motion: {
      enabled: options.motion !== "reduced",
      rolesMs,
    },
    touchTarget: minimumTouchTargetPx,
    density: theme.density,
  };
}

/**
 * Produce a deterministic DTCG-shaped semantic snapshot for one resolved
 * runtime configuration. Static recipe exports intentionally remain free of
 * consumer brand values; an application that owns an exact brand source can
 * use this snapshot in its own token compilation or handoff workflow.
 */
export function buildDtcgThemeSnapshot(
  config: ThemeConfig = {},
  options: ThemeVariableOptions = {},
) {
  const theme = resolveTheme(config);
  const colorTokens = resolveThemeColorTokens(theme, options);
  const action = {
    primary: dtcgColor(colorTokens.primaryPalette.primary),
    primaryHover: dtcgColor(colorTokens.primaryPalette.primaryHover),
    primaryPressed: dtcgColor(colorTokens.primaryPalette.primaryActive),
    primaryForeground: dtcgColor(colorTokens.primaryPalette.primaryForeground),
    accent: dtcgColor(colorTokens.accentPalette.accent),
    accentHover: dtcgColor(colorTokens.accentPalette.primaryHover),
    accentPressed: dtcgColor(colorTokens.accentPalette.primaryActive),
    accentForeground: dtcgColor(colorTokens.accentPalette.accentForeground),
  };

  return {
    $description:
      "DTCG-compatible resolved semantic snapshot for one Ten4Seven runtime configuration.",
    $extensions: {
      "org.ten4seven": {
        appearance: theme.appearance,
        canvas: theme.canvas,
        chartPalette: theme.chartPalette,
        primarySource: dtcgColorSource(theme.primarySource),
        accentSource: dtcgColorSource(theme.accentSource),
      },
    },
    semantic: {
      color: {
        action,
        focus: dtcgColor(colorTokens.focusHsl),
        status: {
          success: dtcgColor(colorTokens.semantic.success),
          warning: dtcgColor(colorTokens.semantic.warning),
          danger: dtcgColor(colorTokens.semantic.danger),
          info: dtcgColor(colorTokens.semantic.info),
        },
        chart: Object.fromEntries(
          [1, 2, 3, 4, 5].map((index) => [
            index,
            dtcgColor(colorTokens.chartColors[index - 1]),
          ]),
        ),
      },
    },
  };
}
