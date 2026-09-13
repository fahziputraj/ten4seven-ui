import { resolveRuntimePreferences } from "./theme-recipe.ts";
import {
  exactColor,
  type AapmBrandCoreName,
  type AapmBrandDigitalName,
  type AapmBrandSemanticRole,
  type Appearance,
  type AuthBrandProfileId,
  type BrandAdapterContract,
  type BrandAssetCollection,
  type BrandProfile,
  type BrandProfileComposition,
  type BrandProfileId,
  type BrandProfileRoleSlot,
  type BrandProductId,
  type RuntimePreferences,
} from "./types.ts";

const canonicalBrandDocuments = [
  "docs/design-system/README.md",
  "docs/design-system/brand/README.md",
  "docs/design-system/brand/AAPM_BRAND_DESIGN.md",
  "docs/design-system/brand/tokens/aapm-brand.tokens.json",
] as const;

const canonicalAssetManifest = "docs/design-system/brand/ASSET_MANIFEST.md";
const canonicalAssetRoot = "docs/design-system/brand/assets";

const corporateAssets = {
  light: `${canonicalAssetRoot}/aapm-logo-horizontal.svg`,
  dark: `${canonicalAssetRoot}/aapm-logo-horizontal-dark.svg`,
  compactLight: `${canonicalAssetRoot}/aapm-icon.svg`,
  compactDark: `${canonicalAssetRoot}/aapm-icon-dark.svg`,
  owner: "AAPM",
  distribution: "authorized-copy",
  derivativePolicy: "no-local-derivative",
} as const;

const academyAssets = {
  light: `${canonicalAssetRoot}/aapm-academy-horizontal.svg`,
  dark: `${canonicalAssetRoot}/aapm-academy-horizontal-dark.svg`,
  compactLight: `${canonicalAssetRoot}/aapm-academy-stacked.svg`,
  compactDark: `${canonicalAssetRoot}/aapm-academy-stacked-dark.svg`,
  owner: "AAPM",
  distribution: "authorized-copy",
  derivativePolicy: "no-local-derivative",
} as const;

const aapmCore = {
  green: exactColor("#318139"),
  orange: exactColor("#D4451A"),
  white: exactColor("#FFFFFF"),
  neutralDarkVariant: exactColor("#CCCCCC"),
} as const satisfies Readonly<
  Record<AapmBrandCoreName, ReturnType<typeof exactColor>>
>;

const aapmDigital = {
  lime: exactColor("#B4E717"),
  limeSoft: exactColor("#C3EC45"),
  deepGreen: exactColor("#2C7433"),
  warmCanvas: exactColor("#F6F5F2"),
  greenTint: exactColor("#F2FCF3"),
  softSurface: exactColor("#EFF5EF"),
  ink: exactColor("#10191A"),
} as const satisfies Readonly<
  Record<AapmBrandDigitalName, ReturnType<typeof exactColor>>
>;

/**
 * Semantic aliases deliberately carry provenance and a resolved value. A
 * profile selects one of these roles; it never repeats a literal brand value.
 */
const aapmSemantic = {
  "brand.primary": { source: "brand.core.green", value: aapmCore.green },
  "brand.accent": { source: "brand.core.orange", value: aapmCore.orange },
  "brand.highlight": {
    source: "brand.digital.lime",
    value: aapmDigital.lime,
  },
  "brand.highlight.soft": {
    source: "brand.digital.limeSoft",
    value: aapmDigital.limeSoft,
  },
  "brand.surface.deep": {
    source: "brand.digital.deepGreen",
    value: aapmDigital.deepGreen,
  },
  "surface.canvas.warm": {
    source: "brand.digital.warmCanvas",
    value: aapmDigital.warmCanvas,
  },
  "surface.brand.tint": {
    source: "brand.digital.greenTint",
    value: aapmDigital.greenTint,
  },
  "surface.brand.soft": {
    source: "brand.digital.softSurface",
    value: aapmDigital.softSurface,
  },
  "text.ink": { source: "brand.digital.ink", value: aapmDigital.ink },
  "text.onBrand": {
    source: "brand.core.white",
    value: aapmCore.white,
  },
} as const satisfies Readonly<
  Record<
    AapmBrandSemanticRole,
    { readonly source: string; readonly value: ReturnType<typeof exactColor> }
  >
>;

/**
 * Canonical AAPM identity is an adapter input. Generic Ten4Seven components
 * do not import this object or its values unless a consumer explicitly opts
 * into an AAPM product profile.
 */
export const AAPM_BRAND_ADAPTER = {
  id: "aapm-core",
  source: {
    authority: "canonical",
    repository: "AAPM_Ecosystem",
    documents: canonicalBrandDocuments,
    assetManifest: canonicalAssetManifest,
  },
  core: aapmCore,
  digital: aapmDigital,
  semantic: aapmSemantic,
  assets: {
    corporate: corporateAssets,
    academy: academyAssets,
  },
} as const satisfies BrandAdapterContract;

export const BRAND_PROFILE_IDS = [
  "neutral-product",
  "aapm-core",
  "aapm-farm",
  "aapm-operations",
  "aapm-erp",
  "aapm-academy",
  "aapm-public",
] as const satisfies readonly BrandProfileId[];

export const AAPM_PROFILE_IDS = [
  "aapm-core",
  "aapm-farm",
  "aapm-operations",
  "aapm-erp",
  "aapm-academy",
  "aapm-public",
] as const satisfies readonly BrandProfileId[];

/** Authentication keeps its existing two-profile compatibility proof. */
export const AUTH_BRAND_PROFILE_IDS = [
  "neutral-product",
  "aapm-academy",
] as const satisfies readonly AuthBrandProfileId[];

const aapmBrandRoles = {
  primary: "brand.primary",
  accent: "brand.accent",
  highlight: "brand.highlight",
  surface: "brand.surface.deep",
  text: "text.ink",
} as const satisfies Readonly<
  Record<BrandProfileRoleSlot, AapmBrandSemanticRole>
>;

type AapmProfileInput = Omit<
  BrandProfile,
  "adapter" | "brandRoles" | "asset"
> & {
  readonly assetCollection: BrandAssetCollection;
};

function aapmProfile({ assetCollection, ...profile }: AapmProfileInput) {
  return {
    ...profile,
    adapter: "aapm-core",
    brandRoles: aapmBrandRoles,
    asset: { kind: "canonical", collection: assetCollection },
  } as const satisfies BrandProfile;
}

export const BRAND_PROFILES: Readonly<Record<BrandProfileId, BrandProfile>> = {
  "neutral-product": {
    id: "neutral-product",
    adapter: "neutral",
    product: "neutral-product",
    surfaceProfile: "system-library",
    themeRecipe: "product",
    density: "default",
    brandRoles: null,
    asset: { kind: "consumer-owned" },
    media: {
      prominence: "low",
      treatment: "product",
      overlay: "none",
    },
    composition: {
      heroBias: "centered",
      whitespace: "balanced",
    },
    typography: {
      displayCharacter: "neutral",
      emphasis: "restrained",
    },
    brandMark: {
      prominence: "medium",
    },
    surface: {
      mood: "neutral",
    },
    actionEmphasis: {
      level: "balanced",
    },
  },
  "aapm-core": aapmProfile({
    id: "aapm-core",
    product: "aapm-core",
    surfaceProfile: "system-library",
    themeRecipe: "enterprise",
    density: "default",
    assetCollection: "corporate",
    media: {
      prominence: "low",
      treatment: "product",
      overlay: "none",
    },
    composition: {
      heroBias: "centered",
      whitespace: "balanced",
    },
    typography: {
      displayCharacter: "neutral",
      emphasis: "restrained",
    },
    brandMark: {
      prominence: "medium",
    },
    surface: {
      mood: "institutional",
    },
    actionEmphasis: {
      level: "balanced",
    },
  }),
  "aapm-farm": aapmProfile({
    id: "aapm-farm",
    product: "farm-customer",
    surfaceProfile: "content",
    themeRecipe: "product",
    density: "comfortable",
    assetCollection: "corporate",
    media: {
      prominence: "high",
      treatment: "documentary",
      overlay: "soft",
    },
    composition: {
      heroBias: "editorial",
      whitespace: "generous",
    },
    typography: {
      displayCharacter: "editorial",
      emphasis: "expressive",
    },
    brandMark: {
      prominence: "high",
    },
    surface: {
      mood: "soft",
    },
    actionEmphasis: {
      level: "strong",
    },
  }),
  "aapm-operations": aapmProfile({
    id: "aapm-operations",
    product: "operations",
    surfaceProfile: "operational",
    themeRecipe: "enterprise",
    density: "compact",
    assetCollection: "corporate",
    media: {
      prominence: "low",
      treatment: "product",
      overlay: "none",
    },
    composition: {
      heroBias: "centered",
      whitespace: "compact",
    },
    typography: {
      displayCharacter: "technical",
      emphasis: "restrained",
    },
    brandMark: {
      prominence: "medium",
    },
    surface: {
      mood: "institutional",
    },
    actionEmphasis: {
      level: "strong",
    },
  }),
  "aapm-erp": aapmProfile({
    id: "aapm-erp",
    product: "erp",
    surfaceProfile: "data-dense",
    themeRecipe: "enterprise",
    density: "dense",
    assetCollection: "corporate",
    media: {
      prominence: "none",
      treatment: "none",
      overlay: "none",
    },
    composition: {
      heroBias: "minimal",
      whitespace: "compact",
    },
    typography: {
      displayCharacter: "technical",
      emphasis: "restrained",
    },
    brandMark: {
      prominence: "low",
    },
    surface: {
      mood: "neutral",
    },
    actionEmphasis: {
      level: "balanced",
    },
  }),
  "aapm-academy": aapmProfile({
    id: "aapm-academy",
    product: "academy",
    surfaceProfile: "content",
    themeRecipe: "editorial",
    density: "comfortable",
    assetCollection: "academy",
    media: {
      prominence: "high",
      treatment: "documentary",
      overlay: "dramatic",
    },
    composition: {
      heroBias: "split",
      whitespace: "generous",
    },
    typography: {
      displayCharacter: "editorial",
      emphasis: "expressive",
    },
    brandMark: {
      prominence: "high",
    },
    surface: {
      mood: "editorial",
    },
    actionEmphasis: {
      level: "strong",
    },
  }),
  "aapm-public": aapmProfile({
    id: "aapm-public",
    product: "public-corporate",
    surfaceProfile: "content",
    themeRecipe: "editorial",
    density: "comfortable",
    assetCollection: "corporate",
    media: {
      prominence: "high",
      treatment: "editorial",
      overlay: "soft",
    },
    composition: {
      heroBias: "editorial",
      whitespace: "generous",
    },
    typography: {
      displayCharacter: "editorial",
      emphasis: "expressive",
    },
    brandMark: {
      prominence: "high",
    },
    surface: {
      mood: "editorial",
    },
    actionEmphasis: {
      level: "strong",
    },
  }),
};

export function getBrandProfile(
  profileId: BrandProfileId = "neutral-product",
): BrandProfile {
  const profile = BRAND_PROFILES[profileId];
  if (!profile) throw new Error(`Unknown brand profile: ${String(profileId)}`);
  return profile;
}

/**
 * Resolve the explicit Q03 composition boundary. Runtime preferences remain
 * an input and never mutate the authored brand or product profile.
 */
export function composeBrandProfile(
  profileId: BrandProfileId = "neutral-product",
  runtime: RuntimePreferences = {},
): BrandProfileComposition {
  const profile = getBrandProfile(profileId);
  return {
    brandProfile: profile.id,
    adapter: profile.adapter,
    product: profile.product,
    themeRecipe: profile.themeRecipe,
    surfaceProfile: profile.surfaceProfile,
    density: profile.density,
    runtime: resolveRuntimePreferences(runtime),
  };
}

/** Resolve only canonical asset references; consumer-owned profiles return undefined. */
export function resolveBrandAsset(
  profileId: BrandProfileId,
  appearance: Exclude<Appearance, "system"> = "light",
  compact = false,
): string | undefined {
  const profile = getBrandProfile(profileId);
  if (profile.asset.kind !== "canonical") return undefined;
  const assets = AAPM_BRAND_ADAPTER.assets[profile.asset.collection];
  if (compact)
    return appearance === "dark" ? assets.compactDark : assets.compactLight;
  return appearance === "dark" ? assets.dark : assets.light;
}

export function resolveAapmBrandColor(
  role: AapmBrandSemanticRole,
): ReturnType<typeof exactColor> {
  return AAPM_BRAND_ADAPTER.semantic[role].value;
}

export const AAPM_BRAND_ROLE_SLOTS = Object.freeze(
  Object.keys(aapmBrandRoles) as BrandProfileRoleSlot[],
);

export const AAPM_BRAND_PRODUCT_IDS = Object.freeze(
  AAPM_PROFILE_IDS.map((profileId) => BRAND_PROFILES[profileId].product) as BrandProductId[],
);
