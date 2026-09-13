import { getBrandProfile } from "./brand-profile.ts";
import {
  getThemeRecipe,
  isThemeRecipeName,
  resolveRuntimePreferences,
  themeRecipeToLegacyConfig,
} from "./theme-recipe.ts";
import { normalizeThemeProfile } from "./theme-profile.ts";
import {
  isExactColorSource,
  type Appearance,
  type BrandProfileId,
  type CanvasName,
  type ChartPaletteName,
  type ContrastPreference,
  type DensityName,
  type ElevationName,
  type LegacyThemeConfigLike,
  type MotionPreference,
  type MotionProfileName,
  type PaletteName,
  type RadiusName,
  type RuntimePreferences,
  type SurfaceTreatment,
  type ThemeColorSource,
  type ThemeComposition,
  type ThemeProfile,
  type ThemeRecipeName,
  type TypographyName,
} from "./types.ts";

/** Versioned persistence boundary for Theme Studio authored state. */
export const THEME_STUDIO_SCHEMA_VERSION = "1.0" as const;
export const THEME_STUDIO_DEFAULT_RECIPE: ThemeRecipeName = "product";
export const THEME_STUDIO_DEFAULT_PROFILE: BrandProfileId = "neutral-product";

/**
 * Viewport presets are composition constraints, not component geometry. They
 * keep the studio and route shells readable without leaking arbitrary pixel
 * values into feature code.
 */
export const THEME_STUDIO_VIEWPORTS = Object.freeze({
  compact: Object.freeze({
    contentMax: "1180px",
    readingMeasure: "64ch",
    pageGutter: "clamp(20px, 3vw, 32px)",
    sectionGap: "clamp(20px, 3vw, 32px)",
  }),
  standard: Object.freeze({
    contentMax: "1320px",
    readingMeasure: "68ch",
    pageGutter: "clamp(24px, 3vw, 44px)",
    sectionGap: "clamp(24px, 3vw, 44px)",
  }),
  wide: Object.freeze({
    contentMax: "1440px",
    readingMeasure: "72ch",
    pageGutter: "clamp(28px, 4vw, 56px)",
    sectionGap: "clamp(28px, 4vw, 56px)",
  }),
} satisfies Record<string, ThemeComposition>);

export type ThemeViewportPreset = keyof typeof THEME_STUDIO_VIEWPORTS;

/**
 * The public authoring vocabulary deliberately excludes component state,
 * business meaning, z-index, icon names, and arbitrary CSS. Those remain
 * component or consumer responsibilities.
 */
export type ThemeStudioAxis =
  | "recipe"
  | "profile"
  | "appearance"
  | "brand"
  | "typography"
  | "density"
  | "shape"
  | "surface"
  | "elevation"
  | "chart"
  | "contrast"
  | "motion"
  | "viewport"
  | "interaction"
  | "iconography";

export const THEME_STUDIO_AXES = Object.freeze([
  "recipe",
  "profile",
  "appearance",
  "brand",
  "typography",
  "density",
  "shape",
  "surface",
  "elevation",
  "chart",
  "contrast",
  "motion",
  "viewport",
  "interaction",
  "iconography",
] as const satisfies readonly ThemeStudioAxis[]);

export type ThemeStudioAxisState = "inherited" | "profile" | "overridden";

/** Explicit overrides accepted by the dynamic engine. */
export type ThemeStudioOverrides = Partial<LegacyThemeConfigLike> & {
  readonly viewport?: ThemeViewportPreset;
};

export interface ThemeStudioConfig {
  readonly schemaVersion: typeof THEME_STUDIO_SCHEMA_VERSION;
  readonly baseRecipe: ThemeRecipeName;
  readonly productProfile: BrandProfileId;
  /** Runtime preferences are separate from authored profile values. */
  readonly runtime: RuntimePreferences;
  readonly overrides: ThemeStudioOverrides;
}

export interface ThemeStudioResolution {
  readonly config: ThemeStudioConfig;
  readonly baseRecipe: ThemeRecipeName;
  readonly productProfile: BrandProfileId;
  /** The profile recipe is the effective authored expression. */
  readonly effectiveRecipe: ThemeRecipeName;
  readonly profile: ThemeProfile;
  readonly composition: ThemeComposition;
  readonly runtime: ReturnType<typeof resolveRuntimePreferences>;
  readonly axisStates: Readonly<Record<ThemeStudioAxis, ThemeStudioAxisState>>;
}

const appearances = ["light", "dark", "system"] as const;
const palettes = [
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
] as const;
const canvases = ["balanced", "paper", "monochrome"] as const;
const chartPalettes = ["spectrum", "four", "monochrome"] as const;
const radii = ["sharp", "soft", "rounded"] as const;
const densities = ["comfortable", "default", "compact", "dense"] as const;
const typographies = [
  "modern",
  "humanist",
  "editorial",
  "technical",
  "mono",
] as const;
const elevations = ["flat", "soft", "standard"] as const;
const surfaceTreatments = ["quiet", "low-contrast", "outlined"] as const;
const motionProfiles = ["minimal", "calm", "balanced", "lively"] as const;
const contrastPreferences = ["standard", "more"] as const;
const motionPreferences = ["full", "reduced"] as const;
const brandProfiles = [
  "neutral-product",
  "aapm-core",
  "aapm-farm",
  "aapm-operations",
  "aapm-erp",
  "aapm-academy",
  "aapm-public",
] as const;

function isOneOf<T extends string>(
  value: unknown,
  options: readonly T[],
): value is T {
  return typeof value === "string" && options.includes(value as T);
}

function isBrandProfileId(value: unknown): value is BrandProfileId {
  return isOneOf(value, brandProfiles);
}

function isThemeViewportPreset(value: unknown): value is ThemeViewportPreset {
  return value === "compact" || value === "standard" || value === "wide";
}

function isThemeColorSource(value: unknown): value is ThemeColorSource {
  return isOneOf(value, palettes) || isExactColorSource(value);
}

function isFiniteInRange(
  value: unknown,
  min: number,
  max: number,
): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= min &&
    value <= max
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/**
 * Strip unknown or unsafe values before they can reach the token resolver.
 * This is intentionally conservative: invalid authored fields are ignored
 * during interactive composition and rejected by the strict import parser.
 */
export function sanitizeThemeStudioOverrides(
  input: unknown,
): ThemeStudioOverrides {
  if (!isRecord(input)) return {};
  const source = input;
  const next: Record<string, unknown> = {};

  if (isOneOf(source.appearance, appearances))
    next.appearance = source.appearance;
  if (isOneOf(source.palette, palettes)) next.palette = source.palette;
  if (isThemeColorSource(source.primary)) next.primary = source.primary;
  if (isThemeColorSource(source.accent)) next.accent = source.accent;
  if (isOneOf(source.canvas, canvases)) next.canvas = source.canvas;
  if (isOneOf(source.surfaceTreatment, surfaceTreatments))
    next.surfaceTreatment = source.surfaceTreatment;
  if (isOneOf(source.chartPalette, chartPalettes))
    next.chartPalette = source.chartPalette;
  if (isOneOf(source.radius, radii)) next.radius = source.radius;
  if (isFiniteInRange(source.radiusValue, 0, 24))
    next.radiusValue = source.radiusValue;
  if (isOneOf(source.density, densities)) next.density = source.density;
  if (isFiniteInRange(source.motionDuration, 0.25, 2.5))
    next.motionDuration = source.motionDuration;
  if (isOneOf(source.motionProfile, motionProfiles))
    next.motionProfile = source.motionProfile;
  if (isOneOf(source.typography, typographies))
    next.typography = source.typography;
  if (
    isRecord(source.typography) &&
    isOneOf(source.typography.preset, typographies)
  ) {
    next.typography = { preset: source.typography.preset };
  }
  if (isOneOf(source.elevation, elevations)) next.elevation = source.elevation;
  if (isThemeViewportPreset(source.viewport)) next.viewport = source.viewport;

  return next as ThemeStudioOverrides;
}

export const DEFAULT_THEME_STUDIO_CONFIG: ThemeStudioConfig = Object.freeze({
  schemaVersion: THEME_STUDIO_SCHEMA_VERSION,
  baseRecipe: THEME_STUDIO_DEFAULT_RECIPE,
  productProfile: THEME_STUDIO_DEFAULT_PROFILE,
  runtime: Object.freeze({}),
  overrides: Object.freeze({}),
});

export function createDefaultThemeStudioConfig(): ThemeStudioConfig {
  return {
    schemaVersion: THEME_STUDIO_SCHEMA_VERSION,
    baseRecipe: THEME_STUDIO_DEFAULT_RECIPE,
    productProfile: THEME_STUDIO_DEFAULT_PROFILE,
    runtime: {},
    overrides: {},
  };
}

export function createThemeStudioConfig(
  input: Partial<ThemeStudioConfig> | undefined = undefined,
): ThemeStudioConfig {
  return {
    schemaVersion: THEME_STUDIO_SCHEMA_VERSION,
    baseRecipe: isThemeRecipeName(input?.baseRecipe)
      ? input.baseRecipe
      : THEME_STUDIO_DEFAULT_RECIPE,
    productProfile: isBrandProfileId(input?.productProfile)
      ? input.productProfile
      : THEME_STUDIO_DEFAULT_PROFILE,
    runtime: sanitizeRuntimePreferences(input?.runtime),
    overrides: sanitizeThemeStudioOverrides(input?.overrides),
  };
}

function sanitizeRuntimePreferences(input: unknown): RuntimePreferences {
  if (!isRecord(input)) return {};
  const next: Record<string, unknown> = {};
  if (isOneOf(input.appearance, appearances))
    next.appearance = input.appearance;
  if (isOneOf(input.density, densities)) next.density = input.density;
  if (isOneOf(input.contrast, contrastPreferences))
    next.contrast = input.contrast;
  if (isOneOf(input.motion, motionPreferences)) next.motion = input.motion;
  return next as RuntimePreferences;
}

function themeStudioOverridesToLegacyConfig(
  overrides: ThemeStudioOverrides,
): LegacyThemeConfigLike {
  const { viewport: _viewport, ...legacy } = overrides;
  return legacy;
}

function hasOwn<T extends object>(object: T, key: PropertyKey): boolean {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function resolveAxisStates(
  config: ThemeStudioConfig,
): Readonly<Record<ThemeStudioAxis, ThemeStudioAxisState>> {
  const overrides = config.overrides;
  const hasAny = (...keys: readonly string[]) =>
    keys.some((key) => hasOwn(overrides, key));
  return {
    recipe:
      config.baseRecipe === THEME_STUDIO_DEFAULT_RECIPE
        ? "inherited"
        : "overridden",
    profile:
      config.productProfile === THEME_STUDIO_DEFAULT_PROFILE
        ? "inherited"
        : "profile",
    appearance:
      hasOwn(config.runtime, "appearance") || hasOwn(overrides, "appearance")
        ? "overridden"
        : "inherited",
    brand: hasAny("palette", "primary", "accent") ? "overridden" : "inherited",
    typography: hasOwn(overrides, "typography") ? "overridden" : "inherited",
    density:
      hasOwn(config.runtime, "density") || hasOwn(overrides, "density")
        ? "overridden"
        : "inherited",
    shape: hasAny("radius", "radiusValue") ? "overridden" : "inherited",
    surface: hasAny("canvas", "surfaceTreatment") ? "overridden" : "inherited",
    elevation: hasOwn(overrides, "elevation") ? "overridden" : "inherited",
    chart: hasOwn(overrides, "chartPalette") ? "overridden" : "inherited",
    contrast: hasOwn(config.runtime, "contrast") ? "overridden" : "inherited",
    motion:
      hasOwn(config.runtime, "motion") ||
      hasAny("motionDuration", "motionProfile")
        ? "overridden"
        : "inherited",
    viewport: hasOwn(overrides, "viewport") ? "overridden" : "inherited",
    interaction: "inherited",
    iconography: "inherited",
  };
}

/** Resolve Base Recipe + Product Profile + Explicit Overrides. */
export function resolveThemeStudioConfig(
  input: ThemeStudioConfig | Partial<ThemeStudioConfig> | undefined,
): ThemeStudioResolution {
  const config = createThemeStudioConfig(input);
  const baseRecipe = getThemeRecipe(config.baseRecipe)!;
  const brandProfile = getBrandProfile(config.productProfile);
  // The neutral profile is a non-opinionated adapter: it preserves the
  // selected base recipe. A named product profile intentionally owns its
  // recipe so selecting Farm, ERP, or Academy remains a single coherent
  // product-language decision.
  const effectiveRecipe =
    config.productProfile === THEME_STUDIO_DEFAULT_PROFILE
      ? config.baseRecipe
      : brandProfile.themeRecipe;
  const effectiveRecipeDefinition = getThemeRecipe(effectiveRecipe)!;
  const authoredProfile = normalizeThemeProfile({
    ...themeRecipeToLegacyConfig(effectiveRecipeDefinition),
    ...(config.productProfile === THEME_STUDIO_DEFAULT_PROFILE
      ? {}
      : { density: brandProfile.density }),
    ...themeStudioOverridesToLegacyConfig(config.overrides),
  });

  return {
    config,
    baseRecipe: config.baseRecipe,
    productProfile: config.productProfile,
    effectiveRecipe,
    profile: authoredProfile,
    composition: config.overrides.viewport
      ? THEME_STUDIO_VIEWPORTS[config.overrides.viewport]
      : effectiveRecipeDefinition.composition,
    runtime: resolveRuntimePreferences(config.runtime),
    axisStates: resolveAxisStates(config),
  };
}

export function getThemeStudioAxisState(
  resolution: ThemeStudioResolution,
  axis: ThemeStudioAxis,
): ThemeStudioAxisState {
  return resolution.axisStates[axis];
}

function removeKeys(
  source: ThemeStudioOverrides,
  keys: readonly (keyof ThemeStudioOverrides)[],
): ThemeStudioOverrides {
  const next = { ...source };
  for (const key of keys) delete next[key];
  return next;
}

/** Reset one axis without touching unrelated user choices. */
export function resetThemeStudioAxis(
  input: ThemeStudioConfig,
  axis: ThemeStudioAxis,
): ThemeStudioConfig {
  const config = createThemeStudioConfig(input);
  const runtime = { ...config.runtime };
  let overrides = config.overrides;
  switch (axis) {
    case "recipe":
      return { ...config, baseRecipe: THEME_STUDIO_DEFAULT_RECIPE };
    case "profile":
      return { ...config, productProfile: THEME_STUDIO_DEFAULT_PROFILE };
    case "appearance":
      delete runtime.appearance;
      overrides = removeKeys(overrides, ["appearance"]);
      break;
    case "brand":
      overrides = removeKeys(overrides, ["palette", "primary", "accent"]);
      break;
    case "typography":
      overrides = removeKeys(overrides, ["typography"]);
      break;
    case "density":
      delete runtime.density;
      overrides = removeKeys(overrides, ["density"]);
      break;
    case "shape":
      overrides = removeKeys(overrides, ["radius", "radiusValue"]);
      break;
    case "surface":
      overrides = removeKeys(overrides, ["canvas", "surfaceTreatment"]);
      break;
    case "elevation":
      overrides = removeKeys(overrides, ["elevation"]);
      break;
    case "chart":
      overrides = removeKeys(overrides, ["chartPalette"]);
      break;
    case "contrast":
      delete runtime.contrast;
      break;
    case "motion":
      delete runtime.motion;
      overrides = removeKeys(overrides, ["motionDuration", "motionProfile"]);
      break;
    case "viewport":
      overrides = removeKeys(overrides, ["viewport"]);
      break;
    case "interaction":
    case "iconography":
      break;
  }
  return { ...config, runtime, overrides };
}

/** Reset all explicit authored overrides while retaining the selected base/profile. */
export function resetThemeStudioOverrides(
  input: ThemeStudioConfig,
): ThemeStudioConfig {
  const config = createThemeStudioConfig(input);
  return { ...config, runtime: {}, overrides: {} };
}

/** Return semantic axes that changed between two safe studio configurations. */
export function diffThemeStudioConfig(
  previous: ThemeStudioConfig,
  next: ThemeStudioConfig,
): readonly ThemeStudioAxis[] {
  const before = resolveThemeStudioConfig(previous);
  const after = resolveThemeStudioConfig(next);
  const fingerprint = (
    resolution: ThemeStudioResolution,
    axis: ThemeStudioAxis,
  ) => {
    const { config, profile, runtime } = resolution;
    switch (axis) {
      case "recipe":
        return config.baseRecipe;
      case "profile":
        return config.productProfile;
      case "appearance":
        return JSON.stringify([
          runtime.appearance,
          profile.appearance,
          config.overrides.appearance,
        ]);
      case "brand":
        return JSON.stringify([
          profile.palette.base,
          profile.action.primary,
          profile.accent.source,
          config.overrides.palette,
          config.overrides.primary,
          config.overrides.accent,
        ]);
      case "typography":
        return JSON.stringify([
          profile.typography.preset,
          config.overrides.typography,
        ]);
      case "density":
        return JSON.stringify([
          runtime.density,
          profile.density.preset,
          config.overrides.density,
        ]);
      case "shape":
        return JSON.stringify([
          profile.radius,
          config.overrides.radius,
          config.overrides.radiusValue,
        ]);
      case "surface":
        return JSON.stringify([
          profile.canvas,
          profile.surface,
          config.overrides.canvas,
          config.overrides.surfaceTreatment,
        ]);
      case "elevation":
        return JSON.stringify([
          profile.elevation.preset,
          config.overrides.elevation,
        ]);
      case "chart":
        return JSON.stringify([
          profile.chart.palette,
          config.overrides.chartPalette,
        ]);
      case "contrast":
        return runtime.contrast;
      case "motion":
        return JSON.stringify([
          runtime.motion,
          profile.motion,
          config.overrides.motionDuration,
          config.overrides.motionProfile,
        ]);
      case "viewport":
        return JSON.stringify([
          resolution.composition,
          config.overrides.viewport,
        ]);
      case "interaction":
      case "iconography":
        return axis;
    }
  };
  return THEME_STUDIO_AXES.filter(
    (axis) =>
      before.axisStates[axis] !== after.axisStates[axis] ||
      fingerprint(before, axis) !== fingerprint(after, axis),
  );
}

function hasInvalidRuntimeValue(input: unknown): boolean {
  if (!isRecord(input)) return input !== undefined;
  return (
    (hasOwn(input, "appearance") && !isOneOf(input.appearance, appearances)) ||
    (hasOwn(input, "density") && !isOneOf(input.density, densities)) ||
    (hasOwn(input, "contrast") &&
      !isOneOf(input.contrast, contrastPreferences)) ||
    (hasOwn(input, "motion") && !isOneOf(input.motion, motionPreferences))
  );
}

function hasInvalidOverrideValue(input: unknown): boolean {
  if (!isRecord(input)) return input !== undefined;
  const source = input;
  if (hasOwn(source, "appearance") && !isOneOf(source.appearance, appearances))
    return true;
  if (hasOwn(source, "palette") && !isOneOf(source.palette, palettes))
    return true;
  if (hasOwn(source, "primary") && !isThemeColorSource(source.primary))
    return true;
  if (hasOwn(source, "accent") && !isThemeColorSource(source.accent))
    return true;
  if (hasOwn(source, "canvas") && !isOneOf(source.canvas, canvases))
    return true;
  if (
    hasOwn(source, "surfaceTreatment") &&
    !isOneOf(source.surfaceTreatment, surfaceTreatments)
  )
    return true;
  if (
    hasOwn(source, "chartPalette") &&
    !isOneOf(source.chartPalette, chartPalettes)
  )
    return true;
  if (hasOwn(source, "radius") && !isOneOf(source.radius, radii)) return true;
  if (
    hasOwn(source, "radiusValue") &&
    !isFiniteInRange(source.radiusValue, 0, 24)
  )
    return true;
  if (hasOwn(source, "density") && !isOneOf(source.density, densities))
    return true;
  if (
    hasOwn(source, "motionDuration") &&
    !isFiniteInRange(source.motionDuration, 0.25, 2.5)
  )
    return true;
  if (
    hasOwn(source, "motionProfile") &&
    !isOneOf(source.motionProfile, motionProfiles)
  )
    return true;
  if (hasOwn(source, "typography")) {
    const typography = source.typography;
    if (
      !isOneOf(typography, typographies) &&
      !(isRecord(typography) && isOneOf(typography.preset, typographies))
    )
      return true;
  }
  if (hasOwn(source, "elevation") && !isOneOf(source.elevation, elevations))
    return true;
  return hasOwn(source, "viewport") && !isThemeViewportPreset(source.viewport);
}

/** Strict, version-aware parser for pasted or persisted studio state. */
export function parseThemeStudioConfig(
  input: string | unknown,
): ThemeStudioConfig | null {
  let value: unknown = input;
  if (typeof input === "string") {
    try {
      value = JSON.parse(input);
    } catch {
      return null;
    }
  }
  if (!isRecord(value) || value.schemaVersion !== THEME_STUDIO_SCHEMA_VERSION)
    return null;
  if (
    !isThemeRecipeName(value.baseRecipe) ||
    !isBrandProfileId(value.productProfile)
  )
    return null;
  if (
    hasInvalidRuntimeValue(value.runtime) ||
    hasInvalidOverrideValue(value.overrides)
  )
    return null;
  return createThemeStudioConfig({
    schemaVersion: THEME_STUDIO_SCHEMA_VERSION,
    baseRecipe: value.baseRecipe,
    productProfile: value.productProfile,
    runtime: value.runtime as RuntimePreferences,
    overrides: value.overrides as ThemeStudioOverrides,
  });
}

export function serializeThemeStudioConfig(input: ThemeStudioConfig): string {
  return JSON.stringify(createThemeStudioConfig(input), null, 2);
}

export function isThemeStudioConfig(
  value: unknown,
): value is ThemeStudioConfig {
  return parseThemeStudioConfig(value) !== null;
}
