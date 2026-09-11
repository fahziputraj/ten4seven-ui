export const CONTRACT_SCHEMA_VERSION = "0.1" as const;

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

/**
 * An authored sRGB color source for a product that needs a brand value outside
 * the curated palette families. Use {@link exactColor} instead of constructing
 * this shape by hand so persisted values stay canonical.
 */
export interface ExactColorSource {
  readonly kind: "exact";
  readonly value: `#${string}`;
}

/** A named system palette or an intentionally exact authored color source. */
export type ThemeColorSource = PaletteName | ExactColorSource;

const exactColorPattern = /^#(?:[\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/;

function normalizeExactColorValue(value: string): `#${string}` | undefined {
  const candidate = value.trim();
  if (!exactColorPattern.test(candidate)) return undefined;
  const expanded =
    candidate.length === 4
      ? `#${[...candidate.slice(1)]
          .map((channel) => `${channel}${channel}`)
          .join("")}`
      : candidate;
  return expanded.toUpperCase() as `#${string}`;
}

/**
 * Create a canonical exact brand source for the runtime theme resolver.
 * Only opaque sRGB hex is accepted because it maps deterministically to the
 * existing HSL compatibility variables and has one portable JSON shape.
 */
export function exactColor(value: string): ExactColorSource {
  const normalized = normalizeExactColorValue(value);
  if (!normalized)
    throw new Error(
      `Expected an exact color in #RGB or #RRGGBB format, received: ${value}`,
    );
  return { kind: "exact", value: normalized };
}

/** Validate a deserialized exact source before it enters the resolver. */
export function isExactColorSource(value: unknown): value is ExactColorSource {
  return (
    !!value &&
    typeof value === "object" &&
    (value as { readonly kind?: unknown }).kind === "exact" &&
    typeof (value as { readonly value?: unknown }).value === "string" &&
    normalizeExactColorValue((value as { readonly value: string }).value) !==
      undefined
  );
}
export type CanvasName = "balanced" | "paper" | "monochrome";
export type ChartPaletteName = "spectrum" | "four" | "monochrome";
export type RadiusName = "sharp" | "soft" | "rounded";
export type DensityName = "comfortable" | "default" | "compact" | "dense";
export type TypographyName =
  "modern" | "humanist" | "editorial" | "technical" | "mono";
export type ElevationName = "flat" | "soft" | "standard";

export type MotionProfileName = "minimal" | "calm" | "balanced" | "lively";
export type MotionRole =
  | "fast"
  | "interaction"
  | "state"
  | "enter"
  | "exit"
  | "reveal"
  | "chart"
  | "loop";

export const MOTION_ROLES = [
  "fast",
  "interaction",
  "state",
  "enter",
  "exit",
  "reveal",
  "chart",
  "loop",
] as const satisfies readonly MotionRole[];

export interface MotionRoleScale {
  readonly fast: number;
  readonly interaction: number;
  readonly state: number;
  readonly enter: number;
  readonly exit: number;
  readonly reveal: number;
  readonly chart: number;
  readonly loop: number;
}

export interface ThemeProfile {
  readonly schemaVersion: typeof CONTRACT_SCHEMA_VERSION;
  readonly id: string;
  readonly appearance: Exclude<Appearance, "system">;
  readonly palette: {
    readonly base: PaletteName;
  };
  readonly action: {
    readonly primary: ThemeColorSource;
  };
  readonly accent: {
    readonly source: ThemeColorSource;
  };
  readonly canvas: {
    readonly mode: CanvasName;
  };
  readonly surface: {
    readonly treatment: SurfaceTreatment;
  };
  readonly chart: {
    readonly palette: ChartPaletteName;
  };
  readonly radius: {
    readonly preset: RadiusName;
    readonly basePx?: number;
  };
  readonly density: {
    readonly preset: DensityName;
  };
  readonly typography: {
    readonly preset: TypographyName;
    readonly opticalSizing: true;
  };
  readonly motion: {
    readonly profile: MotionProfileName;
    /** Compatibility anchor for the existing motionDuration API. */
    readonly anchorSeconds: number;
    readonly roles: MotionRoleScale;
  };
  readonly elevation: {
    readonly preset: ElevationName;
  };
}

/** Curated authored visual starting points for common product contexts. */
export type ThemeRecipeName =
  "enterprise" | "product" | "editorial" | "commerce";

/**
 * Composition guidance is intentionally separate from component API and
 * semantic theme roles. It helps choose rhythm and content bounds without
 * creating a recipe-local primitive family.
 */
export type ThemeExpression =
  "operational" | "product" | "editorial" | "commerce" | "neutral";

export type ContrastPreference = "standard" | "more";
export type MotionPreference = "full" | "reduced";
/** How much container chrome the authored theme uses around content. */
export type SurfaceTreatment = "quiet" | "low-contrast" | "outlined";

/** Per-user/runtime choices that must not rewrite an authored theme recipe. */
export interface RuntimePreferences {
  readonly appearance?: Appearance;
  readonly density?: DensityName;
  readonly contrast?: ContrastPreference;
  readonly motion?: MotionPreference;
}

export interface ResolvedRuntimePreferences {
  readonly appearance: Appearance;
  readonly density: DensityName;
  readonly contrast: ContrastPreference;
  readonly motion: MotionPreference;
}

export interface ThemeComposition {
  readonly contentMax: string;
  readonly readingMeasure: string;
  readonly pageGutter: string;
  readonly sectionGap: string;
}

export interface ThemeRecipe {
  readonly id: ThemeRecipeName;
  readonly label: string;
  readonly description: string;
  readonly expression: ThemeExpression;
  readonly profile: ThemeProfile;
  readonly composition: ThemeComposition;
}

/** Public name for an authored v2 theme aggregate. Recipes are definitions. */
export type ThemeDefinition = ThemeRecipe;

/**
 * Brand profiles are product expressions, not primitive component variants.
 * `neutral-product` remains the compatibility profile for non-AAPM consumers;
 * the AAPM profiles all resolve through the explicit `aapm-core` adapter.
 */
export type BrandProfileId =
  | "neutral-product"
  | "aapm-core"
  | "aapm-farm"
  | "aapm-operations"
  | "aapm-erp"
  | "aapm-academy"
  | "aapm-public";
export type AuthBrandProfileId = "neutral-product" | "aapm-academy";
export type BrandAdapterId = "neutral" | "aapm-core";
export type BrandProductId =
  | "neutral-product"
  | "aapm-core"
  | "farm-customer"
  | "operations"
  | "erp"
  | "academy"
  | "public-corporate";
export type BrandAssetCollection = "corporate" | "academy";
export type AapmBrandCoreName =
  | "green"
  | "orange"
  | "white"
  | "neutralDarkVariant";
export type AapmBrandDigitalName =
  | "lime"
  | "limeSoft"
  | "deepGreen"
  | "warmCanvas"
  | "greenTint"
  | "softSurface"
  | "ink";
export type AapmBrandSemanticRole =
  | "brand.primary"
  | "brand.accent"
  | "brand.highlight"
  | "brand.highlight.soft"
  | "brand.surface.deep"
  | "surface.canvas.warm"
  | "surface.brand.tint"
  | "surface.brand.soft"
  | "text.ink"
  | "text.onBrand";
export type BrandProfileRoleSlot =
  | "primary"
  | "accent"
  | "highlight"
  | "surface"
  | "text";

export interface BrandSemanticAlias {
  readonly source: string;
  readonly value: ExactColorSource;
}

export interface BrandAssetPathSet {
  readonly light: string;
  readonly dark: string;
  readonly compactLight: string;
  readonly compactDark: string;
  readonly owner: "AAPM";
  readonly distribution: "authorized-copy";
  readonly derivativePolicy: "no-local-derivative";
}

/**
 * Provenance-aware AAPM boundary. The generic token/runtime packages remain
 * brand-neutral; consumers opt into this adapter at the profile layer.
 */
export interface BrandAdapterContract {
  readonly id: "aapm-core";
  readonly source: {
    readonly authority: "canonical";
    readonly repository: "AAPM_Ecosystem";
    readonly documents: readonly string[];
    readonly assetManifest: string;
  };
  readonly core: Readonly<Record<AapmBrandCoreName, ExactColorSource>>;
  readonly digital: Readonly<Record<AapmBrandDigitalName, ExactColorSource>>;
  readonly semantic: Readonly<
    Record<AapmBrandSemanticRole, BrandSemanticAlias>
  >;
  readonly assets: Readonly<
    Record<BrandAssetCollection, BrandAssetPathSet>
  >;
}

export type BrandAssetBinding =
  | {
      readonly kind: "consumer-owned";
    }
  | {
      readonly kind: "canonical";
      readonly collection: BrandAssetCollection;
    };
export type SurfaceProfileId =
  | "system-library"
  | "content"
  | "operational"
  | "data-dense"
  | "native";
export type SurfacePlatform = "shared" | "web" | "native";
export type SemanticComponentIntent =
  | "action"
  | "input"
  | "selection"
  | "navigation"
  | "feedback"
  | "data-display"
  | "data-entry"
  | "overlay"
  | "layout"
  | "composition"
  | "identity"
  | "media";
export type PresentationState =
  | "ready"
  | "unavailable"
  | "disabled"
  | "loading"
  | "empty"
  | "error"
  | "permission-denied"
  | "dependency-unavailable"
  | "setup-required"
  | "suspended"
  | "offline"
  | "pending"
  | "conflicted";
export type InteractionState =
  | "idle"
  | "hover"
  | "focus"
  | "pressed"
  | "selected"
  | "expanded"
  | "collapsed"
  | "disabled"
  | "loading"
  | "invalid"
  | "pending"
  | "success"
  | "error";
export type InteractionCapability =
  | "process-workflow"
  | "board-reorder"
  | "drag-and-drop"
  | "file-transfer"
  | "progress-feedback"
  | "state-transition"
  | "quantitative-comparison"
  | "trend-visualization"
  | "distribution-visualization";
export type ResponsiveCapability =
  | "reflow"
  | "scroll"
  | "stack"
  | "collapse"
  | "drawer"
  | "priority-order"
  | "touch-targets"
  | "safe-area"
  | "keyboard-navigation"
  | "density-adaptive";
export type OwnershipConcern =
  | "interaction-contract"
  | "semantic-tokens"
  | "icon-vocabulary"
  | "generic-recipes"
  | "responsive-presentation"
  | "accessibility"
  | "motion"
  | "surface-profile"
  | "business-data"
  | "business-rules"
  | "permissions"
  | "entitlements"
  | "persistence"
  | "routing"
  | "handlers"
  | "principal-context"
  | "tenant-context"
  | "effective-access"
  | "module-lifecycle"
  | "audit-authority"
  | "workflow-authority"
  | "reconciliation";

export interface ContractOwnership {
  readonly system: readonly OwnershipConcern[];
  readonly consumer: readonly OwnershipConcern[];
  readonly platform: readonly OwnershipConcern[];
  readonly businessModule: readonly OwnershipConcern[];
}

export interface SurfaceProfileContract {
  readonly id: SurfaceProfileId;
  readonly platform: SurfacePlatform;
  readonly purpose: string;
  readonly sharedSemantics: readonly SemanticComponentIntent[];
}

export interface ComponentSemanticContract {
  readonly intent: readonly SemanticComponentIntent[];
  readonly states: readonly PresentationState[];
  readonly interactionStates: readonly InteractionState[];
  readonly capabilities: readonly InteractionCapability[];
  readonly responsiveCapabilities: readonly ResponsiveCapability[];
  readonly surfaceProfiles: readonly SurfaceProfileId[];
  readonly ownership: ContractOwnership;
}

export type BrandMediaProminence = "none" | "low" | "medium" | "high";
export type BrandMediaTreatment =
  "none" | "product" | "editorial" | "documentary";
export type BrandMediaOverlay = "none" | "soft" | "dramatic";
export type BrandHeroBias = "minimal" | "centered" | "split" | "editorial";
export type BrandWhitespace = "compact" | "balanced" | "generous";
export type BrandDisplayCharacter = "neutral" | "technical" | "editorial";
export type BrandEmphasis = "restrained" | "expressive";
export type BrandMarkProminence = "low" | "medium" | "high";
export type BrandSurfaceMood =
  "neutral" | "soft" | "institutional" | "editorial" | "dramatic";
export type BrandActionLevel = "quiet" | "balanced" | "strong";

/**
 * Coordinated art direction that stays above semantic theme ownership.
 * Brand profiles may shape composition and media treatment, but never define
 * control semantics, interaction behavior, or arbitrary component geometry.
 */
export interface BrandProfile {
  readonly id: BrandProfileId;
  readonly adapter: BrandAdapterId;
  readonly product: BrandProductId;
  readonly surfaceProfile: SurfaceProfileId;
  readonly themeRecipe: ThemeRecipeName;
  readonly density: DensityName;
  readonly brandRoles: Readonly<
    Record<BrandProfileRoleSlot, AapmBrandSemanticRole>
  > | null;
  readonly asset: BrandAssetBinding;
  readonly media: {
    readonly prominence: BrandMediaProminence;
    readonly treatment: BrandMediaTreatment;
    readonly overlay: BrandMediaOverlay;
  };
  readonly composition: {
    readonly heroBias: BrandHeroBias;
    readonly whitespace: BrandWhitespace;
  };
  readonly typography: {
    readonly displayCharacter: BrandDisplayCharacter;
    readonly emphasis: BrandEmphasis;
  };
  readonly brandMark: {
    readonly prominence: BrandMarkProminence;
  };
  readonly surface: {
    readonly mood: BrandSurfaceMood;
  };
  readonly actionEmphasis: {
    readonly level: BrandActionLevel;
  };
}

/** Explicit composition boundary: recipe + brand + product surface + runtime. */
export interface BrandProfileComposition {
  readonly brandProfile: BrandProfileId;
  readonly adapter: BrandAdapterId;
  readonly product: BrandProductId;
  readonly themeRecipe: ThemeRecipeName;
  readonly surfaceProfile: SurfaceProfileId;
  readonly density: DensityName;
  readonly runtime: ResolvedRuntimePreferences;
}

export type BrandResponsiveMode =
  "split" | "rebalanced" | "centered" | "stacked";

export interface RecipeExpressionContract {
  readonly kind: "brand-profile";
  readonly profiles: readonly BrandProfileId[];
  readonly consumerSlots: readonly string[];
  readonly responsive: Readonly<{
    readonly desktop: BrandResponsiveMode;
    readonly tablet: BrandResponsiveMode;
    readonly mobile: BrandResponsiveMode;
  }>;
}

export interface LegacyThemeConfigLike {
  readonly appearance?: Appearance;
  readonly palette?: PaletteName;
  readonly primary?: ThemeColorSource;
  readonly accent?: ThemeColorSource;
  readonly canvas?: CanvasName;
  readonly surfaceTreatment?: SurfaceTreatment;
  readonly chartPalette?: ChartPaletteName;
  readonly radius?: RadiusName;
  readonly radiusValue?: number;
  readonly density?: DensityName;
  readonly motionDuration?: number;
  readonly motionProfile?: MotionProfileName;
  readonly typography?: TypographyName | { readonly preset?: TypographyName };
  readonly elevation?: ElevationName;
}

export type RecipeVisibility = "private" | "public";
export type RecipeCardinality = "single" | "collection" | "mixed";
export type RecipeOperation =
  | "create"
  | "edit"
  | "search"
  | "filter"
  | "sort"
  | "select"
  | "bulk-action"
  | "open-detail"
  | "paginate"
  | "export";
export type RecipeDensity = "content-first" | "balanced" | "information-dense";
export type RecipeNavigation = "workspace" | "public" | "route" | "none";
export type RecipeWorkflow =
  "browse" | "triage" | "edit" | "approval" | "checkout" | "read" | "publish";
export type RecipeFamily =
  "operational-collection" | "record-inspection" | "identity";
export type RecipeComparison = "none" | "tabular" | "cards" | "side-by-side";
export type RecipeSelection = "none" | "optional" | "required";
export type RecipeDetail = "none" | "inline" | "drawer" | "route";

export interface RecipeIntent {
  readonly visibility: RecipeVisibility;
  readonly cardinality: RecipeCardinality;
  readonly operations: readonly RecipeOperation[];
  readonly density: RecipeDensity;
  readonly navigation: RecipeNavigation;
  readonly workflow: RecipeWorkflow;
  readonly comparison: RecipeComparison;
  readonly selection: RecipeSelection;
  readonly detail: RecipeDetail;
}

export type RecipeState =
  | "loading"
  | "ready"
  | "blocked"
  | "incomplete"
  | "unknown"
  | "empty"
  | "search-empty"
  | "filter-empty"
  | "permission-limited"
  | "api-error"
  | "stale"
  | "bulk-pending"
  | "bulk-partial-failure"
  | "bulk-success"
  | "detail-open";

export const ENTITY_LIST_STATES = [
  "loading",
  "ready",
  "empty",
  "search-empty",
  "filter-empty",
  "permission-limited",
  "api-error",
  "stale",
  "bulk-pending",
  "bulk-partial-failure",
  "bulk-success",
  "detail-open",
] as const satisfies readonly RecipeState[];

export const READINESS_REVIEW_STATES = [
  "loading",
  "ready",
  "blocked",
  "incomplete",
  "unknown",
  "stale",
  "api-error",
] as const satisfies readonly RecipeState[];

export type ResponsiveMode =
  "table" | "table-scroll" | "stacked" | "collapsible" | "drawer" | "inline";

export interface RecipeResponsive {
  readonly desktop: ResponsiveMode;
  readonly tablet: ResponsiveMode;
  readonly mobile: ResponsiveMode;
  readonly navigation?: ResponsiveMode;
  readonly detail?: ResponsiveMode;
}

export const RESPONSIVE_MODES = [
  "table",
  "table-scroll",
  "stacked",
  "collapsible",
  "drawer",
  "inline",
] as const satisfies readonly ResponsiveMode[];

export interface RecipeShell {
  readonly preferred: string;
  readonly alternatives?: readonly string[];
  readonly selectionRule: string;
}

/**
 * Human-facing responsive guidance for an operational recipe. This is kept
 * separate from the component-level responsive mode vocabulary because an
 * operational pattern describes information order, not a component layout
 * primitive.
 */
export interface OperationalResponsiveContract {
  readonly desktop: string;
  readonly tablet: string;
  readonly mobile: string;
}

/**
 * Typed selection and semantic contract for an operational recipe family.
 * Consumers supply domain values and policy; Ten4Seven owns only the
 * composition guidance and presentation grammar.
 */
export interface OperationalPatternContract {
  readonly maturity: "mature";
  readonly useWhen: readonly string[];
  readonly avoidWhen: readonly string[];
  readonly anatomy: readonly string[];
  readonly requiredSemantics: readonly string[];
  readonly optionalSemantics: readonly string[];
  readonly responsive: OperationalResponsiveContract;
  readonly accessibility: readonly string[];
  readonly aiGuidance: string;
  readonly antiPatterns: readonly string[];
  readonly relationships: readonly string[];
  readonly referencePath: "/operational-patterns";
}

export interface ComponentContract {
  readonly id: string;
  readonly displayName: string;
  readonly status: "implemented" | "experimental" | "planned" | "deprecated";
  readonly category: string;
  readonly level?: string;
  readonly maturity?: string;
  readonly purpose: string;
  readonly source: string;
  readonly aliasOf?: string;
  readonly recipes?: readonly string[];
  readonly importantProps?: readonly string[];
  readonly semantic?: ComponentSemanticContract;
}

export interface RecipeContract {
  readonly id: string;
  readonly displayName: string;
  readonly purpose: string;
  readonly family?: RecipeFamily;
  readonly profiles: readonly string[];
  readonly components: readonly string[];
  readonly optional?: readonly string[];
  readonly icons?: readonly string[];
  readonly operational?: OperationalPatternContract;
  readonly shell?: RecipeShell;
  readonly intent?: RecipeIntent;
  readonly required?: readonly string[];
  readonly conditional?: Readonly<Record<string, string>>;
  readonly forbid?: readonly string[];
  readonly states?: readonly RecipeState[];
  readonly responsive?: RecipeResponsive;
  readonly expression?: RecipeExpressionContract;
  readonly rationale?: Readonly<Record<string, string>>;
  readonly references?: readonly string[];
  readonly surfaceProfiles?: readonly SurfaceProfileId[];
  readonly ownership?: ContractOwnership;
}

export type AliasMap = Readonly<Record<string, string>>;

export interface OwnershipRule {
  readonly scope: string;
  readonly owner: "ten4seven" | "consumer";
  readonly canonicalPaths: readonly string[];
  readonly forbiddenPatterns?: readonly string[];
  readonly note: string;
}

export interface OwnershipRules {
  readonly schemaVersion: typeof CONTRACT_SCHEMA_VERSION;
  readonly rules: readonly OwnershipRule[];
}
