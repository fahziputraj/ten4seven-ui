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
    readonly primary: PaletteName;
  };
  readonly accent: {
    readonly source: PaletteName;
  };
  readonly canvas: {
    readonly mode: CanvasName;
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

export type BrandProfileId = "neutral-product" | "aapm-academy";
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
  readonly primary?: PaletteName;
  readonly accent?: PaletteName;
  readonly canvas?: CanvasName;
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
}

export interface RecipeContract {
  readonly id: string;
  readonly displayName: string;
  readonly purpose: string;
  readonly family?: RecipeFamily;
  readonly profiles: readonly string[];
  readonly components: readonly string[];
  readonly optional?: readonly string[];
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
