import {
  CONTRACT_SCHEMA_VERSION,
  type ContractOwnership,
  type InteractionCapability,
  type InteractionState,
  type OwnershipConcern,
  type PresentationState,
  type ResponsiveCapability,
  type SemanticComponentIntent,
  type SurfaceProfileContract,
} from "./types.ts";

export const PLATFORM_NEUTRAL_INTENTS = [
  "action",
  "input",
  "selection",
  "navigation",
  "feedback",
  "data-display",
  "data-entry",
  "overlay",
  "layout",
  "composition",
  "identity",
  "media",
] as const satisfies readonly SemanticComponentIntent[];

export const PLATFORM_NEUTRAL_PRESENTATION_STATES = [
  "ready",
  "unavailable",
  "disabled",
  "loading",
  "empty",
  "error",
  "permission-denied",
  "dependency-unavailable",
  "setup-required",
  "suspended",
  "offline",
  "pending",
  "conflicted",
] as const satisfies readonly PresentationState[];

export const PLATFORM_NEUTRAL_INTERACTION_STATES = [
  "idle",
  "hover",
  "focus",
  "pressed",
  "selected",
  "expanded",
  "collapsed",
  "disabled",
  "loading",
  "invalid",
  "pending",
  "success",
  "error",
] as const satisfies readonly InteractionState[];

export const PLATFORM_NEUTRAL_INTERACTION_CAPABILITIES = [
  "process-workflow",
  "board-reorder",
  "drag-and-drop",
  "file-transfer",
  "progress-feedback",
  "state-transition",
  "quantitative-comparison",
  "trend-visualization",
  "distribution-visualization",
] as const satisfies readonly InteractionCapability[];

export const PLATFORM_NEUTRAL_RESPONSIVE_CAPABILITIES = [
  "reflow",
  "scroll",
  "stack",
  "collapse",
  "drawer",
  "priority-order",
  "touch-targets",
  "safe-area",
  "keyboard-navigation",
  "density-adaptive",
] as const satisfies readonly ResponsiveCapability[];

export const PLATFORM_NEUTRAL_OWNERSHIP_CONCERNS = [
  "interaction-contract",
  "semantic-tokens",
  "icon-vocabulary",
  "generic-recipes",
  "responsive-presentation",
  "accessibility",
  "motion",
  "surface-profile",
  "business-data",
  "business-rules",
  "permissions",
  "entitlements",
  "persistence",
  "routing",
  "handlers",
  "principal-context",
  "tenant-context",
  "effective-access",
  "module-lifecycle",
  "audit-authority",
  "workflow-authority",
  "reconciliation",
] as const satisfies readonly OwnershipConcern[];

export const PLATFORM_NEUTRAL_OWNERSHIP = {
  system: [
    "interaction-contract",
    "semantic-tokens",
    "icon-vocabulary",
    "generic-recipes",
    "responsive-presentation",
    "accessibility",
    "motion",
    "surface-profile",
  ],
  consumer: [
    "business-data",
    "business-rules",
    "permissions",
    "entitlements",
    "persistence",
    "routing",
    "handlers",
  ],
  platform: [
    "principal-context",
    "tenant-context",
    "effective-access",
    "module-lifecycle",
    "audit-authority",
  ],
  businessModule: [
    "business-data",
    "business-rules",
    "workflow-authority",
    "reconciliation",
  ],
} as const satisfies ContractOwnership;

export const PLATFORM_NEUTRAL_SURFACE_PROFILES = [
  {
    id: "system-library",
    platform: "shared",
    purpose: "Design-system contracts, primitives, patterns, and retrieval.",
    sharedSemantics: ["layout", "composition", "feedback", "identity"],
  },
  {
    id: "content",
    platform: "shared",
    purpose: "Content-oriented presentation with readable hierarchy and media.",
    sharedSemantics: ["composition", "media"],
  },
  {
    id: "operational",
    platform: "shared",
    purpose: "Task-oriented workspaces with explicit state and next action.",
    sharedSemantics: [
      "action",
      "navigation",
      "feedback",
      "data-display",
      "data-entry",
    ],
  },
  {
    id: "data-dense",
    platform: "shared",
    purpose: "Comparable records, filtering, review, and dense data entry.",
    sharedSemantics: ["selection", "data-display", "data-entry", "feedback"],
  },
  {
    id: "native",
    platform: "native",
    purpose: "Native rendering of shared semantics with platform mechanics.",
    sharedSemantics: ["navigation", "action", "input", "feedback", "media"],
  },
] as const satisfies readonly SurfaceProfileContract[];

export const PLATFORM_NEUTRAL_EXCLUSIONS = [
  "DOM props, CSS classes, selectors, measurements, and browser APIs",
  "React components, hooks, refs, portals, context, and React event types",
  "Native framework widgets, gestures, storage, and synchronization engines",
  "API clients, persistence, routing, handlers, and transport details",
  "Business data, business rules, permissions, entitlements, and calculations",
] as const;

export interface PlatformNeutralContract {
  readonly schemaVersion: typeof CONTRACT_SCHEMA_VERSION;
  readonly id: "platform-neutral";
  readonly intents: readonly SemanticComponentIntent[];
  readonly presentationStates: readonly PresentationState[];
  readonly interactionStates: readonly InteractionState[];
  readonly interactionCapabilities: readonly InteractionCapability[];
  readonly responsiveCapabilities: readonly ResponsiveCapability[];
  readonly surfaceProfiles: readonly SurfaceProfileContract[];
  readonly ownership: ContractOwnership;
  readonly exclusions: readonly string[];
}

export const PLATFORM_NEUTRAL_CONTRACT = {
  schemaVersion: CONTRACT_SCHEMA_VERSION,
  id: "platform-neutral",
  intents: PLATFORM_NEUTRAL_INTENTS,
  presentationStates: PLATFORM_NEUTRAL_PRESENTATION_STATES,
  interactionStates: PLATFORM_NEUTRAL_INTERACTION_STATES,
  interactionCapabilities: PLATFORM_NEUTRAL_INTERACTION_CAPABILITIES,
  responsiveCapabilities: PLATFORM_NEUTRAL_RESPONSIVE_CAPABILITIES,
  surfaceProfiles: PLATFORM_NEUTRAL_SURFACE_PROFILES,
  ownership: PLATFORM_NEUTRAL_OWNERSHIP,
  exclusions: PLATFORM_NEUTRAL_EXCLUSIONS,
} as const satisfies PlatformNeutralContract;
