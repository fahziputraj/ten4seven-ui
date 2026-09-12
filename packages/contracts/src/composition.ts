import {
  BRAND_PROFILE_IDS,
  BRAND_PROFILES,
  getBrandProfile,
} from "./brand-profile.ts";
import {
  getThemeRecipe,
  isThemeRecipeName,
  resolveRuntimePreferences,
  THEME_RECIPES,
} from "./theme-recipe.ts";
import {
  TOKEN_RESOLUTION_ORDER,
  resolveTokenLayers,
  type NativeTokenStrategy,
  type TokenLayerValues,
  type TokenPlatform,
} from "./foundation.ts";
import {
  CONTRACT_SCHEMA_VERSION,
  type BrandProfileId,
  type ChartPaletteName,
  type DensityName,
  type MotionProfileName,
  type MotionPreference,
  type RuntimePreferences,
  type SurfaceTreatment,
  type ThemeRecipeName,
  type TypographyName,
} from "./types.ts";

/**
 * U11 is a composition contract plane, not a renderer. It describes reusable
 * intent and lets Web and native renderers choose their own presentation.
 */
export type CompositionPlatform = TokenPlatform;
export type CompositionNativeStrategy = NativeTokenStrategy;

export const COMPOSITION_BLOCK_FAMILIES = [
  "PUBLIC",
  "AUTH",
  "APPLICATION",
  "FORMS",
  "COMMERCE",
  "WORKFLOW",
  "DATA",
  "AI_POWER",
] as const;
export type CompositionBlockFamily =
  (typeof COMPOSITION_BLOCK_FAMILIES)[number];

export const COMPOSITION_RECIPE_FAMILIES = [
  "PUBLIC_LANDING",
  "AUTH",
  "APPLICATION",
  "DATA",
  "WORKFLOW",
  "COMMERCE",
  "EDITORIAL",
  "AI_POWER",
  "MOBILE_FIELD",
] as const;
export type CompositionRecipeFamily =
  (typeof COMPOSITION_RECIPE_FAMILIES)[number];

export const COMPOSITION_INVENTORY_STATUSES = [
  "EXISTING_STABLE",
  "EXISTING_NEEDS_HARDENING",
  "MISSING",
  "DUPLICATE",
  "DOMAIN_SPECIFIC",
  "VARIANT",
  "BLOCK",
  "RECIPE",
  "PROFILE",
  "DEFERRED",
  "REJECTED",
] as const;
export type CompositionInventoryStatus =
  (typeof COMPOSITION_INVENTORY_STATUSES)[number];

export const COMPOSITION_STATES = [
  "loading",
  "ready",
  "empty",
  "error",
  "disabled",
  "partial",
  "offline",
  "pending-sync",
  "selected",
  "permission-limited",
] as const;
export type CompositionState = (typeof COMPOSITION_STATES)[number];

export interface CompositionSlotContract {
  readonly id: string;
  readonly required: boolean;
  readonly semantic: string;
  readonly consumerOwns: boolean;
}

export interface CompositionResponsiveContract {
  readonly desktop: string;
  readonly tablet: string;
  readonly mobile: string;
  readonly native: string;
  readonly semanticOrder: string;
}

export interface CompositionBoundaryContract {
  readonly consumerOwns: readonly string[];
  readonly ten4sevenOwns: readonly string[];
  readonly rendererOwns: readonly string[];
}

export interface CompositionAiMetadata {
  readonly compositionLevel: "BLOCK" | "RECIPE";
  readonly useWhen: readonly string[];
  readonly avoidWhen: readonly string[];
  readonly platform: CompositionPlatform;
  readonly profileCompatibility: readonly BrandProfileId[];
  readonly requiredBlocks: readonly string[];
  readonly optionalBlocks: readonly string[];
  readonly responsiveStrategy: string;
  readonly businessBoundary: string;
  readonly recommendedComponents: readonly string[];
  readonly alternatives: readonly string[];
}

export interface CompositionProvenance {
  readonly typedSource: "packages/contracts/src/composition.ts";
  readonly implementation:
    "packages/ui/src/blocks.tsx" | "canonical component slots";
  readonly legacyCatalogId?: string;
  readonly sourceSymbol?: string;
}

export interface BlockCompositionContract {
  readonly level: "BLOCK";
  readonly id: string;
  readonly displayName: string;
  readonly family: CompositionBlockFamily;
  readonly classification: "COMPOSITE_BLOCK" | "COMPONENT_VARIANT";
  readonly inventoryStatus: CompositionInventoryStatus;
  readonly platform: CompositionPlatform;
  readonly nativeStrategy: CompositionNativeStrategy;
  readonly intent: string;
  readonly profileCompatibility: readonly BrandProfileId[];
  readonly slots: readonly CompositionSlotContract[];
  readonly requiredComponents: readonly string[];
  readonly optionalComponents: readonly string[];
  readonly states: readonly CompositionState[];
  readonly responsive: CompositionResponsiveContract;
  readonly accessibility: readonly string[];
  readonly tokenFamilies: readonly string[];
  readonly useWhen: readonly string[];
  readonly avoidWhen: readonly string[];
  readonly recommendedRecipes: readonly string[];
  readonly boundaries: CompositionBoundaryContract;
  readonly ai: CompositionAiMetadata;
  readonly provenance: CompositionProvenance;
}

export interface RecipeBlockRoles {
  readonly required: readonly string[];
  readonly recommended: readonly string[];
  readonly optional: readonly string[];
}

export interface RecipeCompositionContract {
  readonly level: "RECIPE";
  readonly id: string;
  readonly displayName: string;
  readonly family: CompositionRecipeFamily;
  readonly classification: "RECIPE_OR_PATTERN";
  readonly inventoryStatus: CompositionInventoryStatus;
  readonly platform: CompositionPlatform;
  readonly nativeStrategy: CompositionNativeStrategy;
  readonly intent: string;
  readonly profileCompatibility: readonly BrandProfileId[];
  readonly blockRoles: RecipeBlockRoles;
  readonly requiredComponents: readonly string[];
  readonly optionalComponents: readonly string[];
  readonly states: readonly CompositionState[];
  readonly responsive: CompositionResponsiveContract;
  readonly accessibility: readonly string[];
  readonly tokenFamilies: readonly string[];
  readonly useWhen: readonly string[];
  readonly avoidWhen: readonly string[];
  readonly blockRelationships: readonly string[];
  readonly alternatives: readonly string[];
  readonly boundaries: CompositionBoundaryContract;
  readonly ai: CompositionAiMetadata;
  readonly provenance: CompositionProvenance;
}

export interface ProductProfileCapabilityContract {
  readonly id: BrandProfileId;
  readonly displayName: string;
  readonly product: string;
  readonly brandExpression: "Neutral system" | "AAPM Brand Core";
  readonly themeRecipe: ThemeRecipeName;
  readonly densityTendency: DensityName;
  readonly typographyTendency: string;
  readonly surfaceTendency: string;
  readonly motionTendency: MotionProfileName;
  readonly chartPalette: ChartPaletteName;
  readonly shellTendency: string;
  readonly webSupport: true;
  readonly nativeSupport: true;
  readonly nativeStrategy: "SAME_INTENT";
  readonly sourceOfTruth: readonly [
    "packages/contracts/src/brand-profile.ts",
    "packages/contracts/src/theme-recipe.ts",
  ];
}

const profileLabels: Readonly<Record<BrandProfileId, string>> = {
  "neutral-product": "Neutral",
  "aapm-core": "AAPM",
  "aapm-farm": "Farm",
  "aapm-operations": "Operations",
  "aapm-erp": "ERP",
  "aapm-academy": "Academy",
  "aapm-public": "Publishing",
};

export const PRODUCT_PROFILE_DISPLAY_NAMES = profileLabels;
export const PRODUCT_PROFILE_IDS = BRAND_PROFILE_IDS;

function profileShellTendency(
  profile: (typeof BRAND_PROFILES)[BrandProfileId],
): string {
  if (profile.surfaceProfile === "data-dense") return "dense-workspace";
  if (profile.surfaceProfile === "operational") return "workflow-workspace";
  if (profile.surfaceProfile === "native") return "mobile-first";
  if (profile.composition.heroBias === "split") return "editorial-learning";
  if (profile.composition.heroBias === "editorial") return "public-editorial";
  if (profile.composition.whitespace === "compact")
    return "compact-application";
  return "balanced-product";
}

function deriveProductProfileCapability(
  profileId: BrandProfileId,
): ProductProfileCapabilityContract {
  const profile = getBrandProfile(profileId);
  const recipe = getThemeRecipe(profile.themeRecipe);
  if (!recipe) throw new Error(`Theme recipe missing: ${profile.themeRecipe}`);
  return {
    id: profile.id,
    displayName: profileLabels[profile.id],
    product: profile.product,
    brandExpression:
      profile.adapter === "aapm-core" ? "AAPM Brand Core" : "Neutral system",
    themeRecipe: profile.themeRecipe,
    densityTendency: profile.density,
    typographyTendency: profile.typography.displayCharacter,
    surfaceTendency: profile.surface.mood,
    motionTendency: recipe.profile.motion.profile,
    chartPalette: recipe.profile.chart.palette,
    shellTendency: profileShellTendency(profile),
    webSupport: true,
    nativeSupport: true,
    nativeStrategy: "SAME_INTENT",
    sourceOfTruth: [
      "packages/contracts/src/brand-profile.ts",
      "packages/contracts/src/theme-recipe.ts",
    ],
  };
}

/** Derived capability matrix; profile authoring remains in brand-profile.ts. */
export const PRODUCT_PROFILE_CAPABILITIES: Readonly<
  Record<BrandProfileId, ProductProfileCapabilityContract>
> = Object.freeze(
  Object.fromEntries(
    BRAND_PROFILE_IDS.map((profileId) => [
      profileId,
      deriveProductProfileCapability(profileId),
    ]),
  ) as Record<BrandProfileId, ProductProfileCapabilityContract>,
);

export const PRODUCT_PROFILE_MATRIX = PRODUCT_PROFILE_CAPABILITIES;

export function isProductProfileId(value: unknown): value is BrandProfileId {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(PRODUCT_PROFILE_CAPABILITIES, value)
  );
}

/** Unknown profile input is intentionally safe and falls back to Neutral. */
export function resolveProductProfile(
  value: unknown = "neutral-product",
): ProductProfileCapabilityContract {
  return PRODUCT_PROFILE_CAPABILITIES[
    isProductProfileId(value) ? value : "neutral-product"
  ];
}

const ALL_PROFILES = PRODUCT_PROFILE_IDS;
const PUBLIC_PROFILES = [
  "neutral-product",
  "aapm-public",
  "aapm-academy",
  "aapm-farm",
] as const satisfies readonly BrandProfileId[];
const APPLICATION_PROFILES = [
  "neutral-product",
  "aapm-core",
  "aapm-operations",
  "aapm-erp",
] as const satisfies readonly BrandProfileId[];
const COMMERCE_PROFILES = [
  "neutral-product",
  "aapm-public",
  "aapm-academy",
] as const satisfies readonly BrandProfileId[];

const standardBlockStates = [
  "loading",
  "ready",
  "empty",
  "error",
  "disabled",
] as const satisfies readonly CompositionState[];
const standardRecipeStates = [
  "loading",
  "ready",
  "empty",
  "error",
  "partial",
  "permission-limited",
] as const satisfies readonly CompositionState[];

const publicResponsive: CompositionResponsiveContract = {
  desktop:
    "keep proposition, supporting content, and primary action in one readable section",
  tablet: "rebalance media and copy before reducing type or action measure",
  mobile:
    "stack in reading order; keep the primary action before optional proof",
  native: "form or content first, with optional media below the primary task",
  semanticOrder:
    "heading → description → primary action → secondary content → media",
};

const applicationResponsive: CompositionResponsiveContract = {
  desktop: "use bounded rails or regions with visible context and next action",
  tablet:
    "preserve identity, evidence, and actions while moving secondary context below",
  mobile:
    "recompose to one task column, list/detail, drawer, or sheet instead of compressing panes",
  native:
    "use navigation stacks, native lists, sheets, and safe-area action regions",
  semanticOrder: "heading → context → evidence/content → status → actions",
};

const formResponsive: CompositionResponsiveContract = {
  desktop: "group fields by task and keep the action boundary visible",
  tablet: "reduce columns before reducing field measure or labels",
  mobile: "single-column fields with keyboard-safe, reachable actions",
  native: "ScrollView form with keyboard avoidance and safe-area footer",
  semanticOrder: "heading → instructions → fields → validation → actions",
};

const commerceResponsive: CompositionResponsiveContract = {
  desktop: "keep product or cart context adjacent to the decision action",
  tablet: "rebalance media, detail, and totals without hiding price or action",
  mobile: "vertical content order with a reachable sticky or safe-area action",
  native:
    "vertical scroll, native media, and platform-appropriate sticky action",
  semanticOrder:
    "heading → media/context → price or totals → supporting detail → action",
};

const dataResponsive: CompositionResponsiveContract = {
  desktop: "keep comparable data and decision context in bounded surfaces",
  tablet:
    "allow table scroll or move detail into an overlay before shrinking columns",
  mobile:
    "use list/detail or a bounded horizontal data surface with explicit filters",
  native:
    "native list/detail or sectioned data surface; no CSS table assumptions",
  semanticOrder:
    "heading → filters/context → collection → detail/status → actions",
};

const aiResponsive: CompositionResponsiveContract = {
  desktop:
    "keep conversation or editor content bounded with visible supporting rails",
  tablet:
    "move inspector or source context below the primary task before shrinking controls",
  mobile:
    "stack content and supporting context; keep prompt and status actions reachable",
  native:
    "single-task screen with bounded message/source lists and native keyboard behavior",
  semanticOrder:
    "heading → task context → primary content → evidence/status → actions",
};

const standardAccessibility = [
  "Use one clear region name and preserve heading hierarchy.",
  "Keep content, status, and action meaning available as text; never rely on color alone.",
  "Preserve logical DOM or native reading order when the visual arrangement changes.",
  "Inherit focus, keyboard, touch-target, reduced-motion, and state obligations from canonical components.",
] as const;

const standardTokenFamilies = [
  "semantic surface",
  "component geometry",
  "layout measure",
  "action and status",
  "motion roles",
] as const;

function slot(
  id: string,
  semantic: string,
  required = false,
): CompositionSlotContract {
  return { id, required, semantic, consumerOwns: true };
}

function boundaries(
  consumerOwns: readonly string[],
  ten4sevenOwns: readonly string[],
  rendererOwns: readonly string[],
): CompositionBoundaryContract {
  return { consumerOwns, ten4sevenOwns, rendererOwns };
}

type BlockDefinitionInput = Omit<
  BlockCompositionContract,
  | "level"
  | "classification"
  | "inventoryStatus"
  | "platform"
  | "nativeStrategy"
  | "states"
  | "responsive"
  | "accessibility"
  | "tokenFamilies"
  | "ai"
  | "provenance"
> &
  Partial<
    Pick<
      BlockCompositionContract,
      | "classification"
      | "inventoryStatus"
      | "platform"
      | "nativeStrategy"
      | "states"
      | "responsive"
      | "accessibility"
      | "tokenFamilies"
    >
  > & {
    readonly implementation?: CompositionProvenance["implementation"];
    readonly legacyCatalogId?: string;
    readonly sourceSymbol?: string;
  };

function defineBlock(input: BlockDefinitionInput): BlockCompositionContract {
  const {
    accessibility = standardAccessibility,
    classification = "COMPOSITE_BLOCK",
    implementation = "canonical component slots",
    inventoryStatus,
    legacyCatalogId,
    nativeStrategy = "ALTERNATE_PATTERN",
    platform = "ADAPTIVE",
    responsive = applicationResponsive,
    sourceSymbol,
    states = standardBlockStates,
    tokenFamilies = standardTokenFamilies,
    ...block
  } = input;
  const resolvedInventoryStatus =
    inventoryStatus ??
    (legacyCatalogId ? "EXISTING_NEEDS_HARDENING" : "MISSING");
  return {
    ...block,
    level: "BLOCK",
    classification,
    inventoryStatus: resolvedInventoryStatus,
    platform,
    nativeStrategy,
    states,
    responsive,
    accessibility,
    tokenFamilies,
    ai: {
      compositionLevel: "BLOCK",
      useWhen: block.useWhen,
      avoidWhen: block.avoidWhen,
      platform,
      profileCompatibility: block.profileCompatibility,
      requiredBlocks: [],
      optionalBlocks: [],
      responsiveStrategy: responsive.mobile,
      businessBoundary: block.boundaries.consumerOwns.join(" "),
      recommendedComponents: [
        ...block.requiredComponents,
        ...block.optionalComponents,
      ],
      alternatives: [],
    },
    provenance: {
      typedSource: "packages/contracts/src/composition.ts",
      implementation,
      ...(legacyCatalogId ? { legacyCatalogId } : {}),
      ...(sourceSymbol ? { sourceSymbol } : {}),
    },
  };
}

const publicBoundary = boundaries(
  [
    "content, claims, media, action handlers, and navigation intent",
    "business truth behind outcomes, pricing, and testimonials",
  ],
  [
    "section anatomy, hierarchy, semantic tokens, responsive order, and accessibility structure",
  ],
  ["DOM or native content/media primitives and lazy loading policy"],
);

const applicationBoundary = boundaries(
  ["data, query state, permissions, routing, mutations, and business status"],
  [
    "region anatomy, presentation states, semantic action order, density tendency, and adaptive composition",
  ],
  [
    "scroll ownership, list/table rendering, drawers/sheets, and focus mechanics",
  ],
);

const formBoundary = boundaries(
  [
    "field values, validation, persistence, authorization, completion, and side effects",
  ],
  [
    "field grouping, labels, action priority, status presentation, and responsive order",
  ],
  ["native keyboard avoidance, focus movement, and platform input controls"],
);

const commerceBoundary = boundaries(
  [
    "inventory, price truth, cart state, tax, payment, checkout, and fulfillment",
  ],
  [
    "product/cart anatomy, price presentation, action priority, and adaptive order",
  ],
  [
    "media, scrolling, sticky action, and native purchase affordance presentation",
  ],
);

const dataBoundary = boundaries(
  [
    "records, filters, sorting, selection, permissions, pagination, and authoritative metrics",
  ],
  [
    "comparison anatomy, empty/error states, density, filter placement, and detail composition",
  ],
  [
    "table/list primitive, virtualization, scroll, drawer/sheet, and native collection mechanics",
  ],
);

const aiBoundary = boundaries(
  [
    "models, prompts as data, transport, tool execution, authorization, persistence, and safety policy",
  ],
  [
    "conversation/editor anatomy, readable status, evidence order, focus, and responsive composition",
  ],
  [
    "editor/canvas engine, text input, keyboard, viewport, and platform-native presentation",
  ],
);

/**
 * Typed block decisions. Existing catalog IDs are kept as compatibility
 * references; the typed contract owns composition intent and boundaries.
 */
export const COMPOSITION_BLOCKS = {
  "hero-split": defineBlock({
    id: "hero-split",
    displayName: "Hero",
    family: "PUBLIC",
    intent:
      "Lead one public proposition with a clear action and supporting media.",
    profileCompatibility: PUBLIC_PROFILES,
    slots: [
      slot("title", "primary proposition", true),
      slot("description", "supporting explanation"),
      slot("primaryAction", "acquisition or continuation action"),
      slot("secondaryAction", "secondary navigation or proof action"),
      slot("media", "supporting media"),
      slot("trust", "trust or evidence"),
    ],
    requiredComponents: ["Typography", "Button", "MediaFrame"],
    optionalComponents: ["TopNavigation", "Card"],
    useWhen: ["a public page needs a proposition before supporting sections"],
    avoidWhen: ["the surface is a dense operational workspace"],
    recommendedRecipes: ["public-landing", "catalog"],
    boundaries: publicBoundary,
    platform: "BOTH",
    nativeStrategy: "SAME_INTENT",
    responsive: publicResponsive,
    inventoryStatus: "EXISTING_STABLE",
    legacyCatalogId: "hero-split",
    sourceSymbol: "Hero",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  "feature-showcase": defineBlock({
    id: "feature-showcase",
    displayName: "Feature Section",
    family: "PUBLIC",
    intent:
      "Explain a small set of related capabilities with one lead visual and readable support.",
    profileCompatibility: PUBLIC_PROFILES,
    slots: [
      slot("title", "section heading", true),
      slot("description", "section explanation"),
      slot("leadMedia", "lead visual"),
      slot("items", "feature items", true),
    ],
    requiredComponents: ["Typography", "Card", "MediaFrame"],
    optionalComponents: ["Button", "T7Icon", "ChartPanel"],
    useWhen: [
      "three or fewer related capabilities need section-level hierarchy",
    ],
    avoidWhen: [
      "the content is a comparable data set or a dense record collection",
    ],
    recommendedRecipes: ["public-landing", "search-results"],
    boundaries: publicBoundary,
    platform: "BOTH",
    nativeStrategy: "SAME_INTENT",
    responsive: publicResponsive,
    inventoryStatus: "EXISTING_STABLE",
    legacyCatalogId: "feature-showcase",
    sourceSymbol: "FeatureShowcase",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  "stats-section": defineBlock({
    id: "stats-section",
    displayName: "Stats Section",
    family: "PUBLIC",
    intent:
      "Make a small set of outcomes or proof points scannable without turning the section into a dashboard.",
    profileCompatibility: PUBLIC_PROFILES,
    slots: [
      slot("title", "section heading", true),
      slot("items", "stat items", true),
      slot("supportingContext", "metric context"),
    ],
    requiredComponents: ["Typography"],
    optionalComponents: ["TrendIndicator", "Sparkline"],
    useWhen: ["a public surface needs a bounded proof or outcome section"],
    avoidWhen: ["users need filtering, drill-down, or operational monitoring"],
    recommendedRecipes: ["public-landing", "catalog"],
    boundaries: publicBoundary,
    platform: "BOTH",
    nativeStrategy: "SAME_INTENT",
    responsive: publicResponsive,
    inventoryStatus: "EXISTING_STABLE",
    legacyCatalogId: "stats-section",
    sourceSymbol: "StatsSection",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  "logo-cloud": defineBlock({
    id: "logo-cloud",
    displayName: "Logo Cloud",
    family: "PUBLIC",
    intent:
      "Provide lightweight social proof or ecosystem context without implying an endorsement the consumer has not supplied.",
    profileCompatibility: PUBLIC_PROFILES,
    slots: [
      slot("title", "social proof heading"),
      slot("logos", "consumer-supplied logos or names", true),
    ],
    requiredComponents: ["Typography"],
    optionalComponents: ["T7Icon"],
    useWhen: ["a public page needs a bounded ecosystem or trust section"],
    avoidWhen: [
      "logos would be treated as unverified claims or the content needs a full gallery",
    ],
    recommendedRecipes: ["public-landing"],
    boundaries: publicBoundary,
    platform: "BOTH",
    nativeStrategy: "SAME_INTENT",
    responsive: publicResponsive,
    inventoryStatus: "EXISTING_STABLE",
    legacyCatalogId: "logo-cloud",
    sourceSymbol: "LogoCloud",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  testimonials: defineBlock({
    id: "testimonials",
    displayName: "Testimonials",
    family: "PUBLIC",
    intent:
      "Present consumer-provided quotes or stories with clear attribution and readable context.",
    profileCompatibility: PUBLIC_PROFILES,
    slots: [
      slot("title", "section heading"),
      slot("items", "testimonial items", true),
      slot("attribution", "attribution and source context"),
    ],
    requiredComponents: ["Typography"],
    optionalComponents: ["Carousel", "T7Icon", "MediaFrame"],
    useWhen: ["a public surface needs attributed proof or customer voice"],
    avoidWhen: [
      "the content is an unverified claim or a dense record collection",
    ],
    recommendedRecipes: ["public-landing", "product-detail"],
    boundaries: publicBoundary,
    platform: "BOTH",
    nativeStrategy: "ALTERNATE_PATTERN",
    responsive: publicResponsive,
    inventoryStatus: "EXISTING_STABLE",
    legacyCatalogId: "testimonials",
    sourceSymbol: "Testimonials",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  "pricing-section": defineBlock({
    id: "pricing-section",
    displayName: "Pricing Section",
    family: "PUBLIC",
    intent:
      "Compare consumer-provided offers while keeping price, terms, and acquisition actions explicit.",
    profileCompatibility: PUBLIC_PROFILES,
    slots: [
      slot("title", "pricing heading", true),
      slot("plans", "offer or plan items", true),
      slot("terms", "terms and qualification context"),
      slot("actions", "plan actions", true),
    ],
    requiredComponents: ["Card", "Typography", "Button"],
    optionalComponents: ["Badge", "Tooltip"],
    useWhen: ["offers need side-by-side comparison before acquisition"],
    avoidWhen: [
      "price truth, tax, billing, or entitlement logic would enter the block",
    ],
    recommendedRecipes: ["public-landing", "catalog"],
    boundaries: commerceBoundary,
    platform: "BOTH",
    nativeStrategy: "ALTERNATE_PATTERN",
    responsive: commerceResponsive,
    inventoryStatus: "EXISTING_STABLE",
    legacyCatalogId: "pricing-section",
    sourceSymbol: "PricingSection",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  "content-showcase": defineBlock({
    id: "content-showcase",
    displayName: "Content Showcase",
    family: "PUBLIC",
    intent:
      "Arrange a bounded set of consumer-owned stories, lessons, or media entries with one clear reading path.",
    profileCompatibility: PUBLIC_PROFILES,
    slots: [
      slot("title", "section heading", true),
      slot("items", "content items", true),
      slot("leadMedia", "lead media"),
      slot("action", "browse or read action"),
    ],
    requiredComponents: ["Card", "Typography", "MediaFrame"],
    optionalComponents: ["Button", "Pagination"],
    useWhen: ["content needs a reusable editorial or lead-story section"],
    avoidWhen: ["records need tabular comparison or a domain-specific editor"],
    recommendedRecipes: ["public-landing", "search-results", "catalog"],
    boundaries: publicBoundary,
    platform: "BOTH",
    nativeStrategy: "ALTERNATE_PATTERN",
    responsive: publicResponsive,
    inventoryStatus: "EXISTING_STABLE",
    legacyCatalogId: "content-showcase",
    sourceSymbol: "ContentShowcase",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  "announcement-bar": defineBlock({
    id: "announcement-bar",
    displayName: "Announcement Bar",
    family: "PUBLIC",
    intent:
      "Surface a time-bounded notice, update, or promotion without taking ownership of publication state.",
    profileCompatibility: PUBLIC_PROFILES,
    slots: [
      slot("message", "announcement message", true),
      slot("action", "announcement action"),
      slot("dismiss", "consumer-owned dismissal"),
    ],
    requiredComponents: ["Typography"],
    optionalComponents: ["Button", "IconButton"],
    useWhen: ["a public shell needs a bounded notice above the main content"],
    avoidWhen: [
      "the message is durable application status or requires a workflow queue",
    ],
    recommendedRecipes: ["public-landing", "catalog", "auth"],
    boundaries: publicBoundary,
    platform: "BOTH",
    nativeStrategy: "SAME_INTENT",
    responsive: publicResponsive,
    inventoryStatus: "EXISTING_STABLE",
    legacyCatalogId: "announcement-bar",
    sourceSymbol: "AnnouncementBar",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  carousel: defineBlock({
    id: "carousel",
    displayName: "Carousel",
    family: "PUBLIC",
    intent:
      "Offer an optional sequential view of related content while retaining labelled controls and reading order.",
    profileCompatibility: PUBLIC_PROFILES,
    slots: [
      slot("items", "ordered content or product items", true),
      slot("controls", "previous, next, and position controls", true),
    ],
    requiredComponents: ["IconButton"],
    optionalComponents: ["ProductCard", "Card"],
    useWhen: [
      "a bounded set of related items benefits from sequential presentation",
    ],
    avoidWhen: [
      "all items must be compared at once or controls would hide essential content",
    ],
    recommendedRecipes: ["public-landing", "catalog", "product-detail"],
    boundaries: publicBoundary,
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    responsive: publicResponsive,
    inventoryStatus: "EXISTING_STABLE",
    legacyCatalogId: "carousel",
    sourceSymbol: "Carousel",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  "cta-contained": defineBlock({
    id: "cta-contained",
    displayName: "CTA Section",
    family: "PUBLIC",
    intent:
      "Close a public section with one dominant next action and concise supporting context.",
    profileCompatibility: PUBLIC_PROFILES,
    slots: [
      slot("title", "action proposition", true),
      slot("description", "benefit or context"),
      slot("actions", "primary and secondary actions", true),
      slot("media", "supporting proof"),
    ],
    requiredComponents: ["Typography", "Button"],
    optionalComponents: ["MediaFrame", "Card"],
    useWhen: ["a public flow needs one clear next step after context"],
    avoidWhen: [
      "several equal actions compete or an application Alert is correct",
    ],
    recommendedRecipes: ["public-landing", "product-detail"],
    boundaries: publicBoundary,
    platform: "BOTH",
    nativeStrategy: "SAME_INTENT",
    responsive: publicResponsive,
    inventoryStatus: "EXISTING_STABLE",
    legacyCatalogId: "cta-contained",
    sourceSymbol: "CtaBlock",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  "public-auth-entry": defineBlock({
    id: "public-auth-entry",
    displayName: "Auth Shell",
    family: "AUTH",
    intent:
      "Present sign-in, registration, recovery, or verification entry points as a focused public task.",
    profileCompatibility: ALL_PROFILES,
    slots: [
      slot("title", "identity task heading", true),
      slot("fields", "consumer-supplied labelled fields", true),
      slot("supportingCopy", "brand, recovery, or legal context"),
      slot("primaryAction", "submit or continue action", true),
      slot("recovery", "recovery and support links"),
    ],
    requiredComponents: ["Surface", "Input", "PasswordInput", "ActionFooter"],
    optionalComponents: ["OtpInput", "Alert", "Checkbox", "MediaFrame"],
    useWhen: [
      "an identity entry route needs stable layout and responsive behavior",
    ],
    avoidWhen: [
      "credentials, session, MFA truth, or authorization would move into the block",
    ],
    recommendedRecipes: ["auth"],
    boundaries: formBoundary,
    responsive: formResponsive,
    inventoryStatus: "EXISTING_NEEDS_HARDENING",
    legacyCatalogId: "public-auth-entry",
    sourceSymbol: "Q12BlockComposition",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  "kpi-dashboard": defineBlock({
    id: "kpi-dashboard",
    displayName: "Dashboard Section",
    family: "APPLICATION",
    intent:
      "Frame a small truthful signal set with context, trend, and a bounded next action.",
    profileCompatibility: APPLICATION_PROFILES,
    slots: [
      slot("title", "route or region heading", true),
      slot("summary", "time range or context"),
      slot("metrics", "decision metrics", true),
      slot("trend", "bounded trend visualization"),
      slot("nextAction", "consumer-owned next action"),
    ],
    requiredComponents: ["PageHeader", "KPICluster", "MetricCard", "LineChart"],
    optionalComponents: ["FilterToolbar", "DataTable", "ActionFooter"],
    useWhen: [
      "a route needs a small set of verified signals before work begins",
    ],
    avoidWhen: [
      "metrics are decorative, unverified, or need a full analytics recipe",
    ],
    recommendedRecipes: ["dashboard", "analytics-reporting"],
    boundaries: applicationBoundary,
    responsive: applicationResponsive,
    inventoryStatus: "EXISTING_NEEDS_HARDENING",
    legacyCatalogId: "kpi-dashboard",
    sourceSymbol: "Q12BlockComposition",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  "form-progress": defineBlock({
    id: "form-progress",
    displayName: "Form Section",
    family: "FORMS",
    intent:
      "Group labelled form regions with progress or validation context and an explicit action boundary.",
    profileCompatibility: ALL_PROFILES,
    slots: [
      slot("title", "form heading", true),
      slot("sections", "grouped field regions", true),
      slot("current", "current step or section"),
      slot("validation", "consumer-supplied validation state"),
      slot("actions", "form actions", true),
    ],
    requiredComponents: ["FormSection", "Field", "Button"],
    optionalComponents: ["Progress", "Stepper", "Alert", "ActionFooter"],
    useWhen: [
      "fields have a bounded task grouping or staged completion context",
    ],
    avoidWhen: [
      "the block would own validation, persistence, or a domain workflow",
    ],
    recommendedRecipes: ["wizard", "settings", "mobile-field"],
    boundaries: formBoundary,
    responsive: formResponsive,
    inventoryStatus: "EXISTING_NEEDS_HARDENING",
    legacyCatalogId: "form-progress",
    sourceSymbol: "Q12BlockComposition",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  "filterable-data-preview": defineBlock({
    id: "filterable-data-preview",
    displayName: "Filter / Catalog Block",
    family: "DATA",
    intent:
      "Show how query controls, applied state, and a bounded comparable collection work together.",
    profileCompatibility: APPLICATION_PROFILES,
    slots: [
      slot("title", "collection heading", true),
      slot("filters", "query and filter controls"),
      slot("applied", "applied query state"),
      slot("rows", "consumer-supplied comparable records", true),
      slot("emptyState", "empty or no-match state"),
    ],
    requiredComponents: ["FilterToolbar", "DataTable", "Card"],
    optionalComponents: [
      "AppliedFilters",
      "Pagination",
      "FilterDrawer",
      "DetailDrawer",
    ],
    useWhen: [
      "filters and a bounded result preview are the reusable section intent",
    ],
    avoidWhen: [
      "the surface needs a full screen collection recipe or domain query logic",
    ],
    recommendedRecipes: [
      "list-detail",
      "search-results",
      "analytics-reporting",
    ],
    boundaries: dataBoundary,
    responsive: dataResponsive,
    inventoryStatus: "EXISTING_NEEDS_HARDENING",
    legacyCatalogId: "filterable-data-preview",
    sourceSymbol: "Q12BlockComposition",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  "master-detail-region": defineBlock({
    id: "master-detail-region",
    displayName: "Master / Detail Block",
    family: "APPLICATION",
    intent:
      "Keep a collection context and one selected record inspectable without making a domain screen.",
    profileCompatibility: APPLICATION_PROFILES,
    slots: [
      slot("master", "record collection", true),
      slot("detail", "selected record context"),
      slot("selection", "selected identity and focus"),
      slot("actions", "consumer-owned record actions"),
    ],
    requiredComponents: ["DataTable", "DetailDrawer", "RecordSummary"],
    optionalComponents: ["FilterToolbar", "KeyValueList", "ActionFooter"],
    useWhen: ["comparison and contextual inspection must coexist"],
    avoidWhen: ["a simple record route or a full queue workflow is sufficient"],
    recommendedRecipes: ["list-detail", "master-detail", "queue-detail"],
    boundaries: dataBoundary,
    responsive: dataResponsive,
    inventoryStatus: "EXISTING_NEEDS_HARDENING",
  }),
  "exception-queue-summary": defineBlock({
    id: "exception-queue-summary",
    displayName: "Queue / Detail Block",
    family: "WORKFLOW",
    intent:
      "Summarize unresolved work with status, ownership context, and a route into review.",
    profileCompatibility: APPLICATION_PROFILES,
    slots: [
      slot("title", "queue heading", true),
      slot("count", "consumer-supplied count"),
      slot("severity", "readable status or severity"),
      slot("owner", "consumer-supplied owner context"),
      slot("nextAction", "review action"),
    ],
    requiredComponents: ["PageHeader", "KPICluster", "Card"],
    optionalComponents: ["StatusChip", "DataTable", "DetailDrawer"],
    useWhen: ["unresolved work needs a bounded summary before detail review"],
    avoidWhen: ["the section would infer urgency, SLA, or permissions"],
    recommendedRecipes: ["queue-detail", "approval-review", "dashboard"],
    boundaries: applicationBoundary,
    responsive: applicationResponsive,
    inventoryStatus: "EXISTING_NEEDS_HARDENING",
    legacyCatalogId: "exception-queue-summary",
    sourceSymbol: "Q12BlockComposition",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  "decision-workspace-evidence": defineBlock({
    id: "decision-workspace-evidence",
    displayName: "Decision Workspace",
    family: "WORKFLOW",
    intent:
      "Place subject context, evidence, current state, and human decision actions in an accountable order.",
    profileCompatibility: APPLICATION_PROFILES,
    slots: [
      slot("title", "decision heading", true),
      slot("subject", "record or subject context", true),
      slot("evidence", "consumer-supplied evidence", true),
      slot("decision", "decision controls"),
      slot("audit", "activity or explanation context"),
    ],
    requiredComponents: ["PageHeader", "Card", "Button"],
    optionalComponents: ["DataTable", "DetailDrawer", "ActionFooter", "Alert"],
    useWhen: ["evidence must be understood before a human action is taken"],
    avoidWhen: [
      "the block would own policy, transition validity, or permission",
    ],
    recommendedRecipes: ["decision-review", "approval-review", "queue-detail"],
    boundaries: applicationBoundary,
    responsive: applicationResponsive,
    inventoryStatus: "EXISTING_NEEDS_HARDENING",
    legacyCatalogId: "decision-workspace-evidence",
    sourceSymbol: "Q12BlockComposition",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  "product-showcase": defineBlock({
    id: "product-showcase",
    displayName: "Product Section",
    family: "COMMERCE",
    intent:
      "Present a bounded set of products or content-led offerings with clear metadata and actions.",
    profileCompatibility: COMMERCE_PROFILES,
    slots: [
      slot("title", "section heading", true),
      slot("description", "section context"),
      slot("items", "product items", true),
      slot("action", "browse or acquisition action"),
    ],
    requiredComponents: ["ProductGrid", "ProductCard"],
    optionalComponents: ["Button", "Pagination", "CartTrigger"],
    useWhen: ["products or offerings need content-first browse hierarchy"],
    avoidWhen: ["records require stable row comparison or inventory logic"],
    recommendedRecipes: ["catalog", "product-detail"],
    boundaries: commerceBoundary,
    responsive: commerceResponsive,
    inventoryStatus: "EXISTING_STABLE",
    legacyCatalogId: "product-showcase",
    sourceSymbol: "ProductShowcase",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  "product-detail-proof": defineBlock({
    id: "product-detail-proof",
    displayName: "Product Detail Block",
    family: "COMMERCE",
    intent:
      "Pair product context, media, price presentation, proof, and one clear next action.",
    profileCompatibility: COMMERCE_PROFILES,
    slots: [
      slot("title", "product heading", true),
      slot("media", "product media"),
      slot("price", "consumer-supplied price presentation", true),
      slot("details", "product metadata"),
      slot("proof", "reviews or supporting evidence"),
      slot("actions", "purchase, save, or continue actions", true),
    ],
    requiredComponents: ["ProductCard", "Price", "Card"],
    optionalComponents: ["Button", "Carousel", "ProductMeta", "ActionFooter"],
    useWhen: ["one offering needs a focused decision surface"],
    avoidWhen: [
      "inventory, payment, or checkout state would move into the block",
    ],
    recommendedRecipes: ["product-detail", "catalog", "checkout-cart"],
    boundaries: commerceBoundary,
    responsive: commerceResponsive,
    inventoryStatus: "EXISTING_NEEDS_HARDENING",
    legacyCatalogId: "product-detail-proof",
    sourceSymbol: "Q12BlockComposition",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  "cart-summary": defineBlock({
    id: "cart-summary",
    displayName: "Cart Summary",
    family: "COMMERCE",
    intent:
      "Keep cart lines, quantity context, totals, and the next action together without owning checkout truth.",
    profileCompatibility: COMMERCE_PROFILES,
    slots: [
      slot("title", "cart heading", true),
      slot("lines", "consumer-supplied cart lines", true),
      slot("quantities", "quantity controls"),
      slot("totals", "consumer-supplied totals", true),
      slot("actions", "cart or checkout actions", true),
    ],
    requiredComponents: ["Card", "CartLineItem", "OrderSummary"],
    optionalComponents: ["QuantityControl", "CartTrigger", "Button"],
    useWhen: [
      "cart context must remain visible next to the continuation action",
    ],
    avoidWhen: ["the composition would calculate tax, payment, or fulfillment"],
    recommendedRecipes: ["checkout-cart"],
    boundaries: commerceBoundary,
    responsive: commerceResponsive,
    inventoryStatus: "EXISTING_NEEDS_HARDENING",
    legacyCatalogId: "cart-summary",
    sourceSymbol: "Q12BlockComposition",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  "activity-audit-stream": defineBlock({
    id: "activity-audit-stream",
    displayName: "Activity Region",
    family: "DATA",
    intent:
      "Present ordered activity or audit evidence with an inspectable record boundary.",
    profileCompatibility: APPLICATION_PROFILES,
    slots: [
      slot("title", "activity heading", true),
      slot("filters", "optional activity filters"),
      slot("events", "consumer-supplied events", true),
      slot("actor", "actor identity"),
      slot("timestamp", "time context"),
    ],
    requiredComponents: ["PageHeader", "ActivityFeed", "DataTable"],
    optionalComponents: ["FilterToolbar", "DetailDrawer", "StatusChip"],
    useWhen: ["ordered history or operational narrative is part of inspection"],
    avoidWhen: [
      "the block would become a durable audit store or comment system",
    ],
    recommendedRecipes: [
      "notification-inbox",
      "master-detail",
      "decision-review",
    ],
    boundaries: dataBoundary,
    responsive: dataResponsive,
    inventoryStatus: "EXISTING_NEEDS_HARDENING",
    legacyCatalogId: "activity-audit-stream",
    sourceSymbol: "Q12BlockComposition",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  "table-workbench": defineBlock({
    id: "table-workbench",
    displayName: "Table / Workbench Block",
    family: "DATA",
    intent:
      "Bind a bounded table or collection to surrounding filters, summary, detail, and actions.",
    profileCompatibility: APPLICATION_PROFILES,
    slots: [
      slot("title", "workbench heading", true),
      slot("filters", "query controls"),
      slot("summary", "result context"),
      slot("collection", "comparable collection", true),
      slot("detail", "selected detail"),
      slot("actions", "collection actions"),
    ],
    requiredComponents: ["PageHeader", "FilterToolbar", "DataTable"],
    optionalComponents: [
      "KPICluster",
      "DetailDrawer",
      "Pagination",
      "BulkActionBar",
    ],
    useWhen: [
      "a data surface needs reusable collection anatomy without a domain screen",
    ],
    avoidWhen: [
      "the product needs an unbounded dashboard or a domain-specific table API",
    ],
    recommendedRecipes: ["list-detail", "analytics-reporting", "queue-detail"],
    boundaries: dataBoundary,
    responsive: dataResponsive,
    inventoryStatus: "MISSING",
  }),
  "onboarding-stepper": defineBlock({
    id: "onboarding-stepper",
    displayName: "Onboarding / Process Block",
    family: "FORMS",
    intent:
      "Explain a staged path with current progress, context, and recoverable next actions.",
    profileCompatibility: ALL_PROFILES,
    slots: [
      slot("title", "process heading", true),
      slot("steps", "step labels and status", true),
      slot("currentStep", "current step identity", true),
      slot("context", "step context"),
      slot("actions", "next, back, or finish intents", true),
    ],
    requiredComponents: ["Stepper", "Card", "Button"],
    optionalComponents: ["Progress", "Alert", "MediaFrame", "ActionFooter"],
    useWhen: ["the task is intentionally sequential and each step is bounded"],
    avoidWhen: [
      "users need free navigation across a collection or a lifecycle tracker",
    ],
    recommendedRecipes: ["wizard", "auth", "mobile-field"],
    boundaries: formBoundary,
    responsive: formResponsive,
    inventoryStatus: "EXISTING_NEEDS_HARDENING",
    legacyCatalogId: "onboarding-stepper",
    sourceSymbol: "Q12BlockComposition",
    implementation: "packages/ui/src/blocks.tsx",
  }),
  "editor-workspace": defineBlock({
    id: "editor-workspace",
    displayName: "Editor / Builder Workspace",
    family: "AI_POWER",
    intent:
      "Compose an authoring stage with optional inspection and status rails without owning an editor engine.",
    profileCompatibility: ALL_PROFILES,
    slots: [
      slot("title", "workspace heading", true),
      slot("toolbar", "canonical actions and tools"),
      slot("canvas", "consumer-owned editor or builder surface", true),
      slot("inspector", "optional properties or context rail"),
      slot("status", "save, validation, or sync presentation"),
    ],
    requiredComponents: ["EditorSurface", "PropertyInspector", "BuilderCanvas"],
    optionalComponents: ["ActionBar", "ActionFooter", "StateView", "Tabs"],
    useWhen: [
      "a product needs a reusable authoring composition boundary around a lazy engine",
    ],
    avoidWhen: [
      "the library would own a document model, drag engine, persistence, or collaboration",
    ],
    recommendedRecipes: ["editor-builder"],
    boundaries: aiBoundary,
    responsive: aiResponsive,
    inventoryStatus: "EXISTING_NEEDS_HARDENING",
  }),
  "ai-conversation": defineBlock({
    id: "ai-conversation",
    displayName: "AI Conversation Block",
    family: "AI_POWER",
    intent:
      "Present messages, prompt entry, evidence, and tool status in a readable response flow.",
    profileCompatibility: ALL_PROFILES,
    slots: [
      slot("title", "conversation heading", true),
      slot("messages", "consumer-supplied messages", true),
      slot("composer", "prompt or continuation input", true),
      slot("citations", "source evidence"),
      slot("toolActivity", "tool status presentation"),
    ],
    requiredComponents: [
      "ConversationThread",
      "PromptComposer",
      "CitationList",
    ],
    optionalComponents: ["ToolCallCard", "Card", "ActionFooter", "StateView"],
    useWhen: [
      "a product needs readable AI response presentation without choosing a provider",
    ],
    avoidWhen: [
      "model, transport, tool authorization, or conversation persistence would move into the block",
    ],
    recommendedRecipes: ["ai-assistant", "editor-builder"],
    boundaries: aiBoundary,
    responsive: aiResponsive,
    inventoryStatus: "MISSING",
  }),
  "empty-error-onboarding": defineBlock({
    id: "empty-error-onboarding",
    displayName: "Empty / Error State",
    family: "DATA",
    intent:
      "Give a collection or task region an honest loading, empty, error, and recovery composition.",
    profileCompatibility: ALL_PROFILES,
    slots: [
      slot("title", "state heading", true),
      slot("description", "state explanation"),
      slot("action", "consumer-owned recovery or next action"),
      slot("supportingContext", "supporting context"),
    ],
    requiredComponents: ["EmptyState", "StateView"],
    optionalComponents: ["Button", "Alert", "Progress"],
    states: ["loading", "ready", "empty", "error", "disabled"],
    useWhen: [
      "a reusable region must explain no data, failure, or recovery without implying business truth",
    ],
    avoidWhen: [
      "a domain workflow needs policy-specific remediation or server-owned status",
    ],
    recommendedRecipes: ["search-results", "list-detail", "dashboard"],
    boundaries: dataBoundary,
    platform: "BOTH",
    nativeStrategy: "SAME_INTENT",
    responsive: dataResponsive,
    inventoryStatus: "MISSING",
  }),
  "public-footer": defineBlock({
    id: "public-footer",
    displayName: "Footer Composition",
    family: "PUBLIC",
    intent:
      "Close a public surface with useful navigation, ownership context, and legal links.",
    profileCompatibility: PUBLIC_PROFILES,
    slots: [
      slot("brand", "brand or ownership mark", true),
      slot("groups", "navigation groups"),
      slot("legal", "legal and policy links"),
    ],
    requiredComponents: ["Typography"],
    optionalComponents: ["NavigationMenu", "Button", "T7Icon"],
    useWhen: ["a public surface needs a bounded, reusable ending"],
    avoidWhen: [
      "the surface is an authenticated app shell or a domain workbench",
    ],
    recommendedRecipes: ["public-landing", "catalog"],
    boundaries: publicBoundary,
    platform: "BOTH",
    nativeStrategy: "NATIVE_RENDERER",
    responsive: publicResponsive,
    inventoryStatus: "EXISTING_STABLE",
    legacyCatalogId: "public-footer",
    sourceSymbol: "PublicFooter",
    implementation: "packages/ui/src/blocks.tsx",
  }),
} as const satisfies Readonly<Record<string, BlockCompositionContract>>;

export type CompositionBlockId = keyof typeof COMPOSITION_BLOCKS;

export function resolveBlockComposition(
  id: string,
): BlockCompositionContract | undefined {
  return COMPOSITION_BLOCKS[id as CompositionBlockId];
}

type RecipeDefinitionInput = Omit<
  RecipeCompositionContract,
  | "level"
  | "classification"
  | "inventoryStatus"
  | "platform"
  | "nativeStrategy"
  | "states"
  | "responsive"
  | "accessibility"
  | "tokenFamilies"
  | "ai"
  | "provenance"
> &
  Partial<
    Pick<
      RecipeCompositionContract,
      | "inventoryStatus"
      | "platform"
      | "nativeStrategy"
      | "states"
      | "responsive"
      | "accessibility"
      | "tokenFamilies"
    >
  > & {
    readonly implementation?: CompositionProvenance["implementation"];
    readonly legacyCatalogId?: string;
    readonly sourceSymbol?: string;
  };

function defineRecipe(input: RecipeDefinitionInput): RecipeCompositionContract {
  const {
    accessibility = standardAccessibility,
    inventoryStatus,
    implementation = "canonical component slots",
    legacyCatalogId,
    nativeStrategy = "ALTERNATE_PATTERN",
    platform = "ADAPTIVE",
    responsive = applicationResponsive,
    sourceSymbol,
    states = standardRecipeStates,
    tokenFamilies = standardTokenFamilies,
    ...recipe
  } = input;
  return {
    ...recipe,
    level: "RECIPE",
    classification: "RECIPE_OR_PATTERN",
    inventoryStatus:
      inventoryStatus ??
      (legacyCatalogId ? "EXISTING_NEEDS_HARDENING" : "RECIPE"),
    platform,
    nativeStrategy,
    states,
    responsive,
    accessibility,
    tokenFamilies,
    ai: {
      compositionLevel: "RECIPE",
      useWhen: recipe.useWhen,
      avoidWhen: recipe.avoidWhen,
      platform,
      profileCompatibility: recipe.profileCompatibility,
      requiredBlocks: recipe.blockRoles.required,
      optionalBlocks: [
        ...recipe.blockRoles.recommended,
        ...recipe.blockRoles.optional,
      ],
      responsiveStrategy: responsive.mobile,
      businessBoundary: recipe.boundaries.consumerOwns.join(" "),
      recommendedComponents: [
        ...recipe.requiredComponents,
        ...recipe.optionalComponents,
      ],
      alternatives: recipe.alternatives,
    },
    provenance: {
      typedSource: "packages/contracts/src/composition.ts",
      implementation,
      ...(legacyCatalogId ? { legacyCatalogId } : {}),
      ...(sourceSymbol ? { sourceSymbol } : {}),
    },
  };
}

/** Typed recipes express reusable screen composition, never a domain screen. */
export const COMPOSITION_RECIPES = {
  "public-landing": defineRecipe({
    id: "public-landing",
    displayName: "Public Landing",
    family: "PUBLIC_LANDING",
    intent:
      "Explain a product or proposition through ordered public sections and one acquisition path.",
    profileCompatibility: PUBLIC_PROFILES,
    blockRoles: {
      required: ["hero-split"],
      recommended: [
        "feature-showcase",
        "stats-section",
        "cta-contained",
        "public-footer",
      ],
      optional: ["product-showcase", "testimonials", "content-showcase"],
    },
    requiredComponents: ["PublicShell", "NavigationMenu", "Typography"],
    optionalComponents: ["Button", "MediaFrame", "Card"],
    useWhen: ["a public page needs a reusable ordered narrative"],
    avoidWhen: [
      "the page is an authenticated workbench or data-dense collection",
    ],
    blockRelationships: [
      "hero-split → feature-showcase → cta-contained → public-footer",
    ],
    alternatives: ["catalog", "search-results"],
    boundaries: publicBoundary,
    platform: "BOTH",
    nativeStrategy: "ALTERNATE_PATTERN",
    responsive: publicResponsive,
    legacyCatalogId: "marketing-home",
  }),
  auth: defineRecipe({
    id: "auth",
    displayName: "Authentication",
    family: "AUTH",
    intent:
      "Compose identity entry, recovery, or verification with clear field and action order.",
    profileCompatibility: ALL_PROFILES,
    blockRoles: {
      required: ["public-auth-entry"],
      recommended: [],
      optional: ["onboarding-stepper"],
    },
    requiredComponents: [
      "PublicShell",
      "Input",
      "PasswordInput",
      "ActionFooter",
    ],
    optionalComponents: ["OtpInput", "Alert", "Checkbox", "MediaFrame"],
    useWhen: ["a public or embedded identity route needs stable composition"],
    avoidWhen: [
      "authentication provider, credentials, session, or MFA truth would enter the recipe",
    ],
    blockRelationships: [
      "public-auth-entry → consumer authentication handlers",
    ],
    alternatives: ["public-landing"],
    boundaries: formBoundary,
    responsive: formResponsive,
    legacyCatalogId: "auth",
  }),
  dashboard: defineRecipe({
    id: "dashboard",
    displayName: "Dashboard",
    family: "APPLICATION",
    intent:
      "Frame a small set of signals, context, and next work without prescribing a domain dashboard.",
    profileCompatibility: APPLICATION_PROFILES,
    blockRoles: {
      required: ["kpi-dashboard"],
      recommended: ["exception-queue-summary", "activity-audit-stream"],
      optional: ["table-workbench", "filterable-data-preview"],
    },
    requiredComponents: ["PageHeader", "KPICluster", "LineChart"],
    optionalComponents: ["DataTable", "FilterToolbar", "ActivityFeed"],
    useWhen: ["a route needs a bounded overview before a next action"],
    avoidWhen: [
      "the surface has no verified signal or needs a full analytical report",
    ],
    blockRelationships: [
      "kpi-dashboard → optional exception or activity region",
    ],
    alternatives: ["analytics-reporting", "list-detail"],
    boundaries: applicationBoundary,
    responsive: applicationResponsive,
    legacyCatalogId: "dashboard",
  }),
  "list-detail": defineRecipe({
    id: "list-detail",
    displayName: "List / Detail",
    family: "DATA",
    intent:
      "Resolve a comparable collection into contextual record inspection with a clear selection model.",
    profileCompatibility: APPLICATION_PROFILES,
    blockRoles: {
      required: ["filterable-data-preview", "master-detail-region"],
      recommended: ["activity-audit-stream"],
      optional: ["table-workbench"],
    },
    requiredComponents: [
      "PageHeader",
      "DataTable",
      "DetailDrawer",
      "RecordSummary",
    ],
    optionalComponents: ["FilterToolbar", "Pagination", "ActionFooter"],
    useWhen: [
      "users compare records and inspect one selected item without losing context",
    ],
    avoidWhen: [
      "a route is a single detail record or a public content gallery",
    ],
    blockRelationships: ["filterable-data-preview ↔ master-detail-region"],
    alternatives: ["master-detail", "queue-detail"],
    boundaries: dataBoundary,
    responsive: dataResponsive,
    legacyCatalogId: "entity-list",
  }),
  "master-detail": defineRecipe({
    id: "master-detail",
    displayName: "Master / Detail",
    family: "APPLICATION",
    intent:
      "Keep an active collection and selected record visible when simultaneous context matters.",
    profileCompatibility: APPLICATION_PROFILES,
    blockRoles: {
      required: ["master-detail-region"],
      recommended: ["filterable-data-preview"],
      optional: ["activity-audit-stream"],
    },
    requiredComponents: ["DataTable", "DetailDrawer", "RecordSummary"],
    optionalComponents: ["FilterToolbar", "KeyValueList", "ActionFooter"],
    useWhen: ["persistent comparison context materially improves inspection"],
    avoidWhen: ["mobile-first flow or simple route detail is the real task"],
    blockRelationships: ["master-detail-region → selected record detail"],
    alternatives: ["list-detail", "queue-detail"],
    boundaries: dataBoundary,
    responsive: dataResponsive,
    legacyCatalogId: "master-detail",
  }),
  "queue-detail": defineRecipe({
    id: "queue-detail",
    displayName: "Queue / Detail",
    family: "WORKFLOW",
    intent:
      "Present work awaiting attention with contextual detail and an explicit next-action boundary.",
    profileCompatibility: [
      "neutral-product",
      "aapm-core",
      "aapm-operations",
      "aapm-erp",
    ] as const,
    blockRoles: {
      required: ["exception-queue-summary", "master-detail-region"],
      recommended: ["decision-workspace-evidence", "activity-audit-stream"],
      optional: ["table-workbench"],
    },
    requiredComponents: [
      "PageHeader",
      "FilterToolbar",
      "DataTable",
      "DetailDrawer",
    ],
    optionalComponents: ["BulkActionBar", "StatusChip", "ActionFooter"],
    useWhen: [
      "records await work and the consumer can supply a stable next action",
    ],
    avoidWhen: [
      "the surface is notification history or a single lifecycle record",
    ],
    blockRelationships: [
      "exception-queue-summary → master-detail-region → decision-workspace-evidence",
    ],
    alternatives: ["list-detail", "decision-review", "notification-inbox"],
    boundaries: applicationBoundary,
    responsive: dataResponsive,
    legacyCatalogId: "exception-queue",
  }),
  "decision-review": defineRecipe({
    id: "decision-review",
    displayName: "Decision / Review",
    family: "WORKFLOW",
    intent:
      "Order subject context and evidence before consumer-owned human decision actions.",
    profileCompatibility: APPLICATION_PROFILES,
    blockRoles: {
      required: ["decision-workspace-evidence"],
      recommended: ["activity-audit-stream"],
      optional: ["exception-queue-summary", "master-detail-region"],
    },
    requiredComponents: ["PageHeader", "RecordSummary", "ActionFooter"],
    optionalComponents: ["Alert", "DataTable", "RadioGroup", "Textarea"],
    useWhen: ["evidence and a decision action must be understood in one flow"],
    avoidWhen: [
      "the library would determine policy, permission, or transition validity",
    ],
    blockRelationships: ["decision-workspace-evidence → activity-audit-stream"],
    alternatives: ["queue-detail", "wizard", "master-detail"],
    boundaries: applicationBoundary,
    responsive: applicationResponsive,
    legacyCatalogId: "decision-workspace",
  }),
  wizard: defineRecipe({
    id: "wizard",
    displayName: "Wizard / Process",
    family: "WORKFLOW",
    intent:
      "Guide a sequential task through bounded steps, validation context, and explicit navigation.",
    profileCompatibility: ALL_PROFILES,
    blockRoles: {
      required: ["onboarding-stepper", "form-progress"],
      recommended: [],
      optional: ["activity-audit-stream"],
    },
    requiredComponents: ["Stepper", "FormSection", "ActionFooter"],
    optionalComponents: ["Progress", "Alert", "FileUpload"],
    useWhen: [
      "steps are intentionally sequential and each has a bounded purpose",
    ],
    avoidWhen: [
      "users need free navigation across records or a lifecycle tracker",
    ],
    blockRelationships: [
      "onboarding-stepper → form-progress → action boundary",
    ],
    alternatives: ["settings", "mobile-field"],
    boundaries: formBoundary,
    responsive: formResponsive,
    legacyCatalogId: "process-workspace",
  }),
  settings: defineRecipe({
    id: "settings",
    displayName: "Settings",
    family: "APPLICATION",
    intent:
      "Group application, workspace, or personal preferences into readable sections and actions.",
    profileCompatibility: ALL_PROFILES,
    blockRoles: {
      required: ["form-progress"],
      recommended: [],
      optional: ["public-auth-entry"],
    },
    requiredComponents: [
      "PageHeader",
      "FormSection",
      "FormGrid",
      "ActionFooter",
    ],
    optionalComponents: ["Sidebar", "Switch", "Alert"],
    useWhen: ["preferences need stable grouping and an explicit save boundary"],
    avoidWhen: [
      "settings would encode permissions or domain configuration rules",
    ],
    blockRelationships: ["form-progress → consumer-owned preference sections"],
    alternatives: ["wizard", "auth"],
    boundaries: formBoundary,
    responsive: formResponsive,
    legacyCatalogId: "settings",
  }),
  catalog: defineRecipe({
    id: "catalog",
    displayName: "Catalog / Discovery",
    family: "COMMERCE",
    intent:
      "Support content-first discovery with filters, product sections, and a route into detail.",
    profileCompatibility: COMMERCE_PROFILES,
    blockRoles: {
      required: ["product-showcase"],
      recommended: ["hero-split", "filterable-data-preview"],
      optional: ["cta-contained", "public-footer"],
    },
    requiredComponents: [
      "PublicShell",
      "NavigationMenu",
      "ProductGrid",
      "ProductCard",
    ],
    optionalComponents: [
      "SearchInput",
      "FilterDrawer",
      "Pagination",
      "CartTrigger",
    ],
    useWhen: ["products, courses, books, or media need browse hierarchy"],
    avoidWhen: [
      "records need stable tabular comparison or an authenticated work queue",
    ],
    blockRelationships: [
      "hero-split → product-showcase → product-detail-proof",
    ],
    alternatives: ["public-landing", "search-results"],
    boundaries: commerceBoundary,
    responsive: commerceResponsive,
    legacyCatalogId: "catalog",
  }),
  "product-detail": defineRecipe({
    id: "product-detail",
    displayName: "Product Detail",
    family: "COMMERCE",
    intent:
      "Present one product or offering with media, metadata, price, and bounded acquisition actions.",
    profileCompatibility: COMMERCE_PROFILES,
    blockRoles: {
      required: ["product-detail-proof"],
      recommended: ["cta-contained"],
      optional: ["activity-audit-stream"],
    },
    requiredComponents: [
      "PageHeader",
      "MediaFrame",
      "RecordSummary",
      "Price",
      "ActionFooter",
    ],
    optionalComponents: ["Rating", "ProductMeta", "Badge", "Alert"],
    useWhen: ["one product decision deserves a focused route"],
    avoidWhen: [
      "checkout, payment, or fulfillment truth would enter the recipe",
    ],
    blockRelationships: ["product-detail-proof → cta-contained"],
    alternatives: ["catalog", "checkout-cart"],
    boundaries: commerceBoundary,
    responsive: commerceResponsive,
    legacyCatalogId: "product-detail",
  }),
  "checkout-cart": defineRecipe({
    id: "checkout-cart",
    displayName: "Checkout / Cart",
    family: "COMMERCE",
    intent:
      "Keep cart context and checkout fields aligned with a clear confirmation action.",
    profileCompatibility: COMMERCE_PROFILES,
    blockRoles: {
      required: ["cart-summary", "form-progress"],
      recommended: ["product-detail-proof"],
      optional: ["public-footer"],
    },
    requiredComponents: [
      "PageHeader",
      "FormSection",
      "CartPanel",
      "OrderSummary",
      "ActionFooter",
    ],
    optionalComponents: ["Input", "Select", "Alert", "QuantityControl"],
    useWhen: [
      "purchase context and consumer-owned checkout fields must be read together",
    ],
    avoidWhen: [
      "the library would own payment, tax, inventory, or fulfillment",
    ],
    blockRelationships: ["cart-summary → form-progress → confirmation action"],
    alternatives: ["product-detail", "catalog"],
    boundaries: commerceBoundary,
    responsive: commerceResponsive,
    legacyCatalogId: "cart",
  }),
  "analytics-reporting": defineRecipe({
    id: "analytics-reporting",
    displayName: "Analytics / Reporting",
    family: "DATA",
    intent:
      "Combine filters, verified metrics, visualization, and comparable results within bounded measures.",
    profileCompatibility: APPLICATION_PROFILES,
    blockRoles: {
      required: ["kpi-dashboard", "table-workbench"],
      recommended: ["filterable-data-preview", "activity-audit-stream"],
      optional: [],
    },
    requiredComponents: [
      "PageHeader",
      "FilterToolbar",
      "KPICluster",
      "LineChart",
      "DataTable",
    ],
    optionalComponents: [
      "BarChart",
      "DonutChart",
      "DateRangePicker",
      "Pagination",
    ],
    useWhen: [
      "a time-bounded result needs both visual and row-level inspection",
    ],
    avoidWhen: [
      "the surface is an overview with no comparison or a public stats section",
    ],
    blockRelationships: ["kpi-dashboard → table-workbench"],
    alternatives: ["dashboard", "list-detail"],
    boundaries: dataBoundary,
    responsive: dataResponsive,
    legacyCatalogId: "report",
  }),
  "search-results": defineRecipe({
    id: "search-results",
    displayName: "Search / Results",
    family: "DATA",
    intent:
      "Present a query, applied state, and result collection with an honest no-match path.",
    profileCompatibility: ALL_PROFILES,
    blockRoles: {
      required: ["filterable-data-preview"],
      recommended: ["product-showcase"],
      optional: ["empty-error-onboarding"],
    },
    requiredComponents: ["PageHeader", "SearchInput", "FilterToolbar"],
    optionalComponents: [
      "ProductGrid",
      "DataTable",
      "Pagination",
      "EmptyState",
    ],
    useWhen: ["query and result context are the primary interaction"],
    avoidWhen: [
      "the surface is a durable notification center or a workflow queue",
    ],
    blockRelationships: [
      "filterable-data-preview → consumer-selected result detail",
    ],
    alternatives: ["catalog", "list-detail"],
    boundaries: dataBoundary,
    responsive: dataResponsive,
  }),
  "notification-inbox": defineRecipe({
    id: "notification-inbox",
    displayName: "Notification / Inbox",
    family: "APPLICATION",
    intent:
      "Separate attention work from informational notification history while preserving readable status.",
    profileCompatibility: ALL_PROFILES,
    blockRoles: {
      required: ["activity-audit-stream"],
      recommended: ["exception-queue-summary"],
      optional: ["master-detail-region"],
    },
    requiredComponents: ["PageHeader", "ActivityFeed"],
    optionalComponents: ["List", "Badge", "DetailDrawer", "FilterToolbar"],
    useWhen: [
      "the consumer supplies attention or notification semantics that must be distinguished",
    ],
    avoidWhen: [
      "the route would use unread color as a substitute for work policy",
    ],
    blockRelationships: ["activity-audit-stream → optional attention detail"],
    alternatives: ["queue-detail", "list-detail"],
    boundaries: applicationBoundary,
    responsive: applicationResponsive,
  }),
  "editor-builder": defineRecipe({
    id: "editor-builder",
    displayName: "Editor / Builder",
    family: "EDITORIAL",
    intent:
      "Compose a bounded authoring stage, optional inspector, and readable save or validation status.",
    profileCompatibility: ALL_PROFILES,
    blockRoles: {
      required: ["editor-workspace"],
      recommended: ["activity-audit-stream"],
      optional: ["ai-conversation"],
    },
    requiredComponents: ["EditorSurface", "PropertyInspector", "BuilderCanvas"],
    optionalComponents: ["ActionBar", "Tabs", "StateView", "ActionFooter"],
    useWhen: [
      "a product needs authoring composition around a lazy, replaceable engine",
    ],
    avoidWhen: [
      "the recipe would own document storage, collaboration, or drag mutation",
    ],
    blockRelationships: ["editor-workspace → optional status and activity"],
    alternatives: ["wizard", "ai-assistant"],
    boundaries: aiBoundary,
    responsive: aiResponsive,
    legacyCatalogId: "content-detail",
  }),
  "ai-assistant": defineRecipe({
    id: "ai-assistant",
    displayName: "AI Assistant",
    family: "AI_POWER",
    intent:
      "Present conversation, prompt entry, citations, and tool status without provider or authorization logic.",
    profileCompatibility: ALL_PROFILES,
    blockRoles: {
      required: ["ai-conversation"],
      recommended: [],
      optional: ["editor-workspace", "activity-audit-stream"],
    },
    requiredComponents: [
      "ConversationThread",
      "PromptComposer",
      "CitationList",
    ],
    optionalComponents: ["ToolCallCard", "Card", "ActionFooter", "StateView"],
    useWhen: ["conversation and evidence presentation recur across products"],
    avoidWhen: [
      "model selection, tool execution, or safety policy would enter the recipe",
    ],
    blockRelationships: ["ai-conversation → evidence/status"],
    alternatives: ["editor-builder", "search-results"],
    boundaries: aiBoundary,
    responsive: aiResponsive,
  }),
  "mobile-field": defineRecipe({
    id: "mobile-field",
    displayName: "Mobile Field Workflow",
    family: "MOBILE_FIELD",
    intent:
      "Adapt one field task to a focused mobile flow with context, evidence, sync state, and safe actions.",
    profileCompatibility: [
      "aapm-farm",
      "aapm-operations",
      "aapm-core",
      "neutral-product",
    ] as const,
    blockRoles: {
      required: ["form-progress"],
      recommended: ["onboarding-stepper", "activity-audit-stream"],
      optional: ["decision-workspace-evidence"],
    },
    requiredComponents: ["FormSection", "Field", "ActionFooter"],
    optionalComponents: ["FileUpload", "MediaFrame", "Alert", "Progress"],
    useWhen: [
      "one operator or field user completes a bounded task away from a desktop workspace",
    ],
    avoidWhen: [
      "desktop panes can simply be squeezed or the task needs an ERP table",
    ],
    blockRelationships: ["form-progress → evidence/status → safe-area action"],
    alternatives: ["wizard", "decision-review"],
    boundaries: formBoundary,
    responsive: formResponsive,
    nativeStrategy: "NATIVE_RENDERER",
  }),
  "approval-review": defineRecipe({
    id: "approval-review",
    displayName: "Approval / Review",
    family: "WORKFLOW",
    intent:
      "Combine pending work, evidence, and explicit review actions while leaving approval policy to the consumer.",
    profileCompatibility: APPLICATION_PROFILES,
    blockRoles: {
      required: ["exception-queue-summary", "decision-workspace-evidence"],
      recommended: ["activity-audit-stream"],
      optional: ["master-detail-region"],
    },
    requiredComponents: ["PageHeader", "DataTable", "ActionFooter"],
    optionalComponents: [
      "ApprovalPanel",
      "BulkActionBar",
      "AlertDialog",
      "DetailDrawer",
    ],
    useWhen: [
      "reviewers need evidence before one or more consumer-owned actions",
    ],
    avoidWhen: [
      "the library would decide approver identity, policy, or transition validity",
    ],
    blockRelationships: [
      "exception-queue-summary → decision-workspace-evidence → action boundary",
    ],
    alternatives: ["queue-detail", "decision-review"],
    boundaries: applicationBoundary,
    responsive: applicationResponsive,
  }),
} as const satisfies Readonly<Record<string, RecipeCompositionContract>>;

export type CompositionRecipeId = keyof typeof COMPOSITION_RECIPES;

export function resolveRecipeComposition(
  id: string,
): RecipeCompositionContract | undefined {
  return COMPOSITION_RECIPES[id as CompositionRecipeId];
}

export interface CompositionLayerValues {
  readonly profile?: BrandProfileId;
  readonly recipe?: ThemeRecipeName;
  readonly density?: DensityName;
  readonly typography?: TypographyName;
  readonly surface?: SurfaceTreatment;
  readonly motion?: MotionProfileName;
  readonly chartPalette?: ChartPaletteName;
}

export type CompositionResolutionLayers =
  TokenLayerValues<CompositionLayerValues>;

export interface ResolvedCompositionLayers {
  readonly values: Required<
    Omit<CompositionLayerValues, "profile" | "recipe">
  > & {
    readonly profile: BrandProfileId;
    readonly recipe: ThemeRecipeName;
  };
  readonly profile: ProductProfileCapabilityContract;
  readonly themeRecipe: NonNullable<ReturnType<typeof getThemeRecipe>>;
  readonly baseRecipe: ThemeRecipeName;
  readonly resolutionOrder: typeof TOKEN_RESOLUTION_ORDER;
  readonly sourceOfTruth: "packages/contracts/src/composition.ts + U01 theme resolver";
}

const defaultCompositionValues = {
  profile: "neutral-product",
  recipe: "product",
  density: "default",
  typography: "modern",
  surface: "outlined",
  motion: "balanced",
  chartPalette: "spectrum",
} as const satisfies Required<CompositionLayerValues>;

function validRecipe(
  value: unknown,
  fallback: ThemeRecipeName,
): ThemeRecipeName {
  return isThemeRecipeName(value) ? value : fallback;
}

/**
 * Resolve composition axes using the same six-stage U01 order. Theme token
 * values remain owned by resolveThemeStudioConfig/resolveTheme; this helper
 * only resolves renderer-neutral composition metadata and never parses CSS.
 */
export function resolveCompositionLayers(
  layers: CompositionResolutionLayers = {},
): ResolvedCompositionLayers {
  const selectedProfile = resolveProductProfile(
    layers.PRODUCT_PROFILE?.profile,
  );
  const selectedBaseRecipe = validRecipe(layers.BASE_RECIPE?.recipe, "product");
  const baseRecipe = getThemeRecipe(selectedBaseRecipe)!;
  const profileRecipe = getThemeRecipe(selectedProfile.themeRecipe)!;
  const profileLayer =
    selectedProfile.id === "neutral-product"
      ? { profile: selectedProfile.id }
      : {
          profile: selectedProfile.id,
          recipe: selectedProfile.themeRecipe,
          density: selectedProfile.densityTendency,
          typography: profileRecipe.profile.typography.preset,
          surface: profileRecipe.profile.surface.treatment,
          motion: profileRecipe.profile.motion.profile,
          chartPalette: profileRecipe.profile.chart.palette,
        };
  const resolved = resolveTokenLayers({
    SYSTEM_DEFAULTS: defaultCompositionValues,
    BASE_RECIPE: {
      recipe: selectedBaseRecipe,
      density: baseRecipe.profile.density.preset,
      typography: baseRecipe.profile.typography.preset,
      surface: baseRecipe.profile.surface.treatment,
      motion: baseRecipe.profile.motion.profile,
      chartPalette: baseRecipe.profile.chart.palette,
      ...layers.BASE_RECIPE,
    },
    PRODUCT_PROFILE: profileLayer,
    THEME_OVERRIDE: layers.THEME_OVERRIDE,
    SCOPED_OVERRIDE: layers.SCOPED_OVERRIDE,
    COMPONENT_STATE: layers.COMPONENT_STATE,
  });
  const profileId = selectedProfile.id;
  const recipeName = validRecipe(resolved.recipe, selectedProfile.themeRecipe);
  const resolvedRecipe = getThemeRecipe(recipeName)!;
  return {
    values: {
      profile: profileId,
      recipe: recipeName,
      density: resolved.density ?? defaultCompositionValues.density,
      typography: resolved.typography ?? defaultCompositionValues.typography,
      surface: resolved.surface ?? defaultCompositionValues.surface,
      motion: resolved.motion ?? defaultCompositionValues.motion,
      chartPalette:
        resolved.chartPalette ?? defaultCompositionValues.chartPalette,
    },
    profile: resolveProductProfile(profileId),
    themeRecipe: resolvedRecipe,
    baseRecipe: selectedBaseRecipe,
    resolutionOrder: TOKEN_RESOLUTION_ORDER,
    sourceOfTruth: "packages/contracts/src/composition.ts + U01 theme resolver",
  };
}

export interface ProductCompositionInput {
  readonly baseRecipe?: ThemeRecipeName;
  readonly productProfile?: unknown;
  readonly runtime?: RuntimePreferences;
  readonly themeOverride?: CompositionLayerValues;
  readonly scopedOverride?: CompositionLayerValues;
  readonly componentState?: CompositionLayerValues;
}

export interface CompositionWebProjection {
  readonly authority: "derived";
  readonly source: "typed composition contract and U01 resolved theme";
  readonly cssVariables: "projected by the token package buildThemeVariables";
  readonly dataAttributes: Readonly<Record<string, string>>;
}

export interface CompositionNativeProjection {
  readonly authority: "derived";
  readonly source: "typed composition contract and U01 resolved theme";
  readonly values: ResolvedCompositionLayers["values"];
  readonly profile: ProductProfileCapabilityContract;
  readonly cssParsing: false;
  readonly rendererChoice: "native renderer consumes values directly";
}

export interface ResolvedProductComposition extends ResolvedCompositionLayers {
  readonly runtime: ReturnType<typeof resolveRuntimePreferences>;
  readonly webProjection: CompositionWebProjection;
  readonly nativeProjection: CompositionNativeProjection;
}

export function projectCompositionToWeb(
  resolution: ResolvedCompositionLayers,
): CompositionWebProjection {
  return {
    authority: "derived",
    source: "typed composition contract and U01 resolved theme",
    cssVariables: "projected by the token package buildThemeVariables",
    dataAttributes: {
      "data-t7-composition-profile": resolution.values.profile,
      "data-t7-composition-recipe": resolution.values.recipe,
      "data-t7-composition-density": resolution.values.density,
      "data-t7-composition-typography": resolution.values.typography,
      "data-t7-composition-motion": resolution.values.motion,
    },
  };
}

export function projectCompositionToNative(
  resolution: ResolvedCompositionLayers,
): CompositionNativeProjection {
  return {
    authority: "derived",
    source: "typed composition contract and U01 resolved theme",
    values: resolution.values,
    profile: resolution.profile,
    cssParsing: false,
    rendererChoice: "native renderer consumes values directly",
  };
}

export function resolveProductComposition(
  input: ProductCompositionInput = {},
): ResolvedProductComposition {
  const resolution = resolveCompositionLayers({
    BASE_RECIPE: { recipe: input.baseRecipe ?? "product" },
    PRODUCT_PROFILE: {
      profile: resolveProductProfile(input.productProfile).id,
    },
    THEME_OVERRIDE: input.themeOverride,
    SCOPED_OVERRIDE: input.scopedOverride,
    COMPONENT_STATE: input.componentState,
  });
  return {
    ...resolution,
    runtime: resolveRuntimePreferences(input.runtime),
    webProjection: projectCompositionToWeb(resolution),
    nativeProjection: projectCompositionToNative(resolution),
  };
}

export interface NativeCompositionCanary {
  readonly id: string;
  readonly sourceId: string;
  readonly platform: "ADAPTIVE";
  readonly nativeStrategy: "NATIVE_RENDERER" | "ALTERNATE_PATTERN";
  readonly presentation: string;
  readonly primitive: string;
  readonly semanticOrder: string;
  readonly safeArea: string;
  readonly touchSafeActions: string;
  readonly cssParsing: false;
}

export const NATIVE_COMPOSITION_CANARY = {
  blocks: {
    auth: {
      id: "auth",
      sourceId: "public-auth-entry",
      platform: "ADAPTIVE",
      nativeStrategy: "ALTERNATE_PATTERN",
      presentation: "form-first screen with optional brand/media support",
      primitive: "ScrollView + TextInput + Pressable",
      semanticOrder: "heading → fields → validation → submit → recovery",
      safeArea: "content and submit action remain keyboard- and safe-area-safe",
      touchSafeActions: "submit and recovery remain labelled press targets",
      cssParsing: false,
    },
    "list-detail": {
      id: "list-detail",
      sourceId: "master-detail-region",
      platform: "ADAPTIVE",
      nativeStrategy: "ALTERNATE_PATTERN",
      presentation: "navigation stack from list to selected detail",
      primitive: "FlatList + native navigation + ScrollView",
      semanticOrder: "heading → filters → list → selected detail → actions",
      safeArea: "detail actions stay inside the native screen safe area",
      touchSafeActions:
        "row activation and detail actions use labelled press targets",
      cssParsing: false,
    },
    form: {
      id: "form",
      sourceId: "form-progress",
      platform: "ADAPTIVE",
      nativeStrategy: "NATIVE_RENDERER",
      presentation: "single-column form with keyboard avoidance",
      primitive: "ScrollView + TextInput + Pressable",
      semanticOrder: "heading → instructions → fields → validation → actions",
      safeArea: "action footer respects keyboard and bottom inset",
      touchSafeActions:
        "primary and secondary actions meet the shared touch target",
      cssParsing: false,
    },
    decision: {
      id: "decision",
      sourceId: "decision-workspace-evidence",
      platform: "ADAPTIVE",
      nativeStrategy: "ALTERNATE_PATTERN",
      presentation:
        "single-column evidence flow with safe-area decision actions",
      primitive: "ScrollView + View + Pressable",
      semanticOrder: "subject → evidence → status → decision → activity",
      safeArea: "decision action region remains reachable at the bottom inset",
      touchSafeActions:
        "decision actions are explicit, labelled, and never gesture-only",
      cssParsing: false,
    },
    product: {
      id: "product",
      sourceId: "product-detail-proof",
      platform: "ADAPTIVE",
      nativeStrategy: "ALTERNATE_PATTERN",
      presentation: "vertical product detail with reachable acquisition action",
      primitive: "ScrollView + Image + Pressable",
      semanticOrder: "heading → media → price → details → proof → action",
      safeArea: "purchase action uses native bottom inset handling",
      touchSafeActions: "purchase/save action remains a labelled press target",
      cssParsing: false,
    },
    dashboard: {
      id: "dashboard",
      sourceId: "kpi-dashboard",
      platform: "ADAPTIVE",
      nativeStrategy: "ALTERNATE_PATTERN",
      presentation: "scrollable signal sections with prioritized next action",
      primitive: "ScrollView + SectionList",
      semanticOrder:
        "heading → metrics → trend summary → work context → action",
      safeArea: "action context remains reachable without a desktop rail",
      touchSafeActions:
        "metric and next-action affordances are labelled and press-safe",
      cssParsing: false,
    },
  },
  recipes: {
    auth: {
      id: "auth",
      sourceId: "auth",
      platform: "ADAPTIVE",
      nativeStrategy: "ALTERNATE_PATTERN",
      presentation:
        "form-first native screen; media is optional supporting context",
      primitive: "Stack navigator + ScrollView",
      semanticOrder: "heading → fields → validation → primary action → support",
      safeArea: "keyboard avoidance and bottom inset action spacing",
      touchSafeActions:
        "primary submit and support links remain labelled press targets",
      cssParsing: false,
    },
    "queue-detail": {
      id: "queue-detail",
      sourceId: "queue-detail",
      platform: "ADAPTIVE",
      nativeStrategy: "ALTERNATE_PATTERN",
      presentation: "queue list → selected detail → decision/action screen",
      primitive: "FlatList + native navigation + ScrollView",
      semanticOrder:
        "heading → filters → queue → selected context → next action",
      safeArea: "next action and detail controls respect native insets",
      touchSafeActions:
        "row selection and next actions are explicit press targets",
      cssParsing: false,
    },
    "master-detail": {
      id: "master-detail",
      sourceId: "master-detail",
      platform: "ADAPTIVE",
      nativeStrategy: "ALTERNATE_PATTERN",
      presentation: "list screen navigates to detail screen",
      primitive: "FlatList + native navigation",
      semanticOrder: "heading → collection → selected detail → actions",
      safeArea: "screen actions use platform navigation and insets",
      touchSafeActions: "list rows and actions expose explicit labels",
      cssParsing: false,
    },
  },
  profiles: ["aapm-core", "aapm-farm", "aapm-operations"] as const,
} as const satisfies {
  readonly blocks: Readonly<Record<string, NativeCompositionCanary>>;
  readonly recipes: Readonly<Record<string, NativeCompositionCanary>>;
  readonly profiles: readonly BrandProfileId[];
};

export const COMPOSITION_RESOLUTION_ORDER = TOKEN_RESOLUTION_ORDER;

export const COMPOSITION_CONTRACT = {
  schemaVersion: CONTRACT_SCHEMA_VERSION,
  id: "blocks-recipes-product-profiles",
  displayName: "Blocks, recipes, and product profiles",
  purpose:
    "Provide reusable, domain-neutral composition intelligence for public, auth, commerce, application, workflow, data, and AI surfaces across Web and native renderers.",
  sourceOfTruth: {
    composition: "packages/contracts/src/composition.ts",
    profiles: "packages/contracts/src/brand-profile.ts",
    themeRecipes: "packages/contracts/src/theme-recipe.ts",
    themeResolver:
      "packages/contracts/src/theme-studio.ts and packages/tokens/src/theme.ts",
    components:
      "packages/ai/catalog/components.json as the compatibility registry",
    legacyBlocks:
      "packages/ai/catalog/blocks.json as the compatibility registry",
    legacyRecipes:
      "packages/ai/catalog/recipes.json as the compatibility registry",
  },
  resolverOrder: COMPOSITION_RESOLUTION_ORDER,
  ownership: {
    blocks:
      "Ten4Seven owns bounded composition anatomy; consumers own data, handlers, permissions, routing, persistence, and business truth.",
    recipes:
      "Ten4Seven owns reusable arrangement guidance; consumers map domain content and behavior into slots.",
    profiles:
      "Brand profiles select existing semantic theme axes and expression tendencies; they never fork component contracts.",
    renderers:
      "Web and native renderers own DOM/native primitives, focus mechanics, scrolling, and platform presentation.",
  },
  taxonomy: {
    blockFamilies: COMPOSITION_BLOCK_FAMILIES,
    recipeFamilies: COMPOSITION_RECIPE_FAMILIES,
    classifications: ["COMPOSITE_BLOCK", "RECIPE_OR_PATTERN"] as const,
    inventoryStatuses: COMPOSITION_INVENTORY_STATUSES,
  },
  blocks: COMPOSITION_BLOCKS,
  recipes: COMPOSITION_RECIPES,
  profiles: PRODUCT_PROFILE_CAPABILITIES,
  nativeCanary: NATIVE_COMPOSITION_CANARY,
  responsiveViewportMatrix: [
    "1440x900",
    "1024x768",
    "768x1024",
    "390x844",
  ] as const,
  webProjection: {
    authority: "derived",
    format: "CSS custom properties plus semantic data attributes",
    source: "typed composition contract and U01 resolved theme",
  },
  nativeProjection: {
    authority: "derived",
    format: "resolved JS/TS values and renderer descriptors",
    source: "typed composition contract and U01 resolved theme",
    cssParsing: false,
  },
  registry: {
    typed: "packages/contracts/src/composition.ts",
    compatibility: [
      "packages/ai/catalog/blocks.json",
      "packages/ai/catalog/recipes.json",
      "packages/ai/catalog/components.json",
    ],
    generated: [
      "generated/composition.json",
      "generated/composition.compact.json",
      "generated/agent-index.json",
    ],
  },
  compatibility: [
    "Existing blocks and recipes remain available through their legacy catalog IDs; the typed plane adds normalized composition and profile metadata.",
    "No profile-specific component fork is introduced; Farm, ERP, Academy, Publishing, Operations, AAPM, and Neutral all consume the same component names.",
    "The neutral profile preserves an explicitly selected base theme recipe; named product profiles select their canonical theme recipe and density tendency.",
    "CSS remains a Web delivery projection. Native consumers use the resolved JS/TS projection and never parse CSS variables.",
    "Legacy domain-facing routes continue to own routing, permissions, data fetching, handlers, and business transitions.",
  ],
  deferred: [
    "True missing primitives, standalone Editor/Builder engines, collaboration, advanced DnD, and full native component implementation remain outside U11 and are deferred to the applicable later queue.",
    "No full AAPM Mobile or domain-specific Farm, ERP, Academy, Publishing, or Operations page is created by this contract plane.",
  ],
  showrooms: [
    "/blocks",
    "/recipes",
    "/theme-studio",
    "/component-lab",
    "/public-showcase",
    "/operations-tracker",
    "/ebook-store",
    "/farm-p1-reference",
  ],
  aiMetadata: {
    retrieval:
      "Retrieve the typed composition plane before inventing a page-level layout; choose a Block for one bounded region and a Recipe for a reusable screen arrangement.",
    selectionRules: [
      "build login/auth entry → auth recipe",
      "build approval/review → approval-review or decision-review recipe",
      "build product catalog → catalog recipe",
      "build dashboard → dashboard recipe when a signal overview is actually the task",
      "build one KPI region → kpi-dashboard block",
      "build one filter/result region → filterable-data-preview block",
      "build a domain-specific screen → consumer domain composition using the nearest recipe; do not create a domain recipe in the system",
    ],
    requiredFields: [
      "useWhen",
      "avoidWhen",
      "profileCompatibility",
      "requiredBlocks",
      "optionalBlocks",
      "responsiveStrategy",
      "businessBoundary",
      "recommendedComponents",
      "alternatives",
    ],
  },
  counts: {
    blockContracts: Object.keys(COMPOSITION_BLOCKS).length,
    recipeContracts: Object.keys(COMPOSITION_RECIPES).length,
    productProfiles: PRODUCT_PROFILE_IDS.length,
    nativeBlockCanaries: Object.keys(NATIVE_COMPOSITION_CANARY.blocks).length,
    nativeRecipeCanaries: Object.keys(NATIVE_COMPOSITION_CANARY.recipes).length,
  },
} as const;

export const COMPOSITION_PLANE = COMPOSITION_CONTRACT;

export type CompositionMotionPreference = MotionPreference;
