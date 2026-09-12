import type {
  ContractOwnership,
  MotionRole,
  OwnershipConcern,
  ResponsiveCapability,
  SemanticComponentIntent,
} from "./types.ts";
import { CONTRACT_SCHEMA_VERSION } from "./types.ts";
import {
  type ComponentClassification,
  type NativeTokenStrategy,
  type TokenPlatform,
} from "./foundation.ts";
import { PLATFORM_NEUTRAL_OWNERSHIP } from "./platform-neutral.ts";

/**
 * Cross-platform component metadata is a semantic overlay on the existing
 * component catalog. The catalog remains the compatibility source for the
 * existing Web API fields; this file owns only the normalized renderer and
 * platform decisions introduced by U03.
 */

export type ComponentPlatform = TokenPlatform;
export type ComponentRendererStrategy = NativeTokenStrategy;

export const COMPONENT_PLATFORM_CLASSES = Object.freeze([
  "BOTH",
  "WEB",
  "NATIVE",
  "ADAPTIVE",
] as const satisfies readonly ComponentPlatform[]);

export const COMPONENT_RENDERER_STRATEGIES = Object.freeze([
  "SAME_INTENT",
  "NATIVE_RENDERER",
  "ALTERNATE_PATTERN",
  "NOT_APPLICABLE",
] as const satisfies readonly ComponentRendererStrategy[]);

export type RendererStatus =
  "implemented" | "experimental" | "planned" | "not-applicable" | "deprecated";

export const COMPONENT_RENDERER_STATUSES = Object.freeze([
  "implemented",
  "experimental",
  "planned",
  "not-applicable",
  "deprecated",
] as const satisfies readonly RendererStatus[]);

export const COMPONENT_FAMILIES = Object.freeze([
  "foundation",
  "action",
  "form",
  "navigation",
  "layout",
  "pattern",
  "surface",
  "data",
  "table",
  "filter",
  "overlay",
  "feedback",
  "date-time",
  "file",
  "chart",
  "media",
  "commerce",
] as const);
export type ComponentFamily = (typeof COMPONENT_FAMILIES)[number];

export type InteractionModel =
  | "activation"
  | "field"
  | "selection"
  | "navigation"
  | "disclosure"
  | "overlay"
  | "filtering"
  | "collection"
  | "data-comparison"
  | "data-entry"
  | "display"
  | "feedback"
  | "layout"
  | "composition"
  | "visualization"
  | "media"
  | "file-provision"
  | "commerce";

export const INPUT_MODALITIES = Object.freeze([
  "keyboard",
  "pointer",
  "touch",
  "screenReader",
  "hover",
  "focus",
  "gesture",
  "hardwareBack",
  "virtualKeyboard",
] as const);
export type InputModality = (typeof INPUT_MODALITIES)[number];

export const COMPONENT_CRITICAL_STATES = Object.freeze([
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
  "ready",
  "empty",
  "error",
  "offline",
  "pendingSync",
  "syncing",
  "syncFailed",
  "retryAvailable",
  "stale",
  "readOnly",
  "constrained",
  "dragging",
] as const);
export type ComponentCriticalState = (typeof COMPONENT_CRITICAL_STATES)[number];

export const ACCESSIBILITY_OBLIGATIONS = Object.freeze([
  "accessible-name",
  "actionable-role",
  "input-role",
  "value-state",
  "disabled-state",
  "loading-state",
  "invalid-state",
  "error-association",
  "selection-state",
  "expanded-state",
  "selected-state",
  "navigation-role",
  "labelled-surface",
  "focus-containment",
  "focus-return",
  "dismissal",
  "focus-or-press-feedback",
  "keyboard-navigation",
  "ordered-structure",
  "structure-order",
  "empty-state",
  "status-announcement",
  "non-color-status",
  "table-context",
  "sort-state",
  "separator-role",
  "keyboard-resize",
  "supplemental-description",
  "non-hover-alternative",
  "alternative-text",
  "data-summary",
  "file-state",
  "safe-area-inset",
  "virtual-keyboard",
  "hardware-capability",
] as const);
export type AccessibilityObligationId =
  (typeof ACCESSIBILITY_OBLIGATIONS)[number];

export const TOKEN_FAMILIES = Object.freeze([
  "color",
  "typography",
  "spacing",
  "radius",
  "elevation",
  "motion",
  "sizing",
  "focus",
  "density",
  "touch-target",
  "measure",
  "data-visualization",
] as const);
export type ComponentTokenFamily = (typeof TOKEN_FAMILIES)[number];

export const LAYOUT_INTENTS = Object.freeze([
  "measure-compact",
  "measure-control",
  "measure-content",
  "measure-wide",
  "measure-reading",
  "measure-fluid",
  "density-adaptive",
  "minimum-useful-surface",
  "bounded-scroll-owner",
  "priority-order",
  "single-column",
  "split-panes",
  "stacked-detail",
  "safe-area-inset",
  "touch-target-minimum",
  "content-max",
  "page-gutter",
  "section-rhythm",
] as const);
export type ComponentLayoutIntent = (typeof LAYOUT_INTENTS)[number];

export type RendererPresentation =
  | "web-semantic-element"
  | "web-semantic-control"
  | "web-popup-list"
  | "web-modal"
  | "web-edge-surface"
  | "web-persistent-navigation"
  | "web-table"
  | "web-data-grid"
  | "web-bounded-scroll"
  | "web-browser-input"
  | "web-dropzone"
  | "web-command-surface"
  | "web-collection"
  | "web-hierarchy"
  | "web-feedback-surface"
  | "web-visualization"
  | "web-media"
  | "web-composition"
  | "native-platform-control"
  | "native-pressable"
  | "native-sheet"
  | "native-modal"
  | "native-navigation"
  | "native-list-detail"
  | "native-scroll-surface"
  | "native-picker"
  | "native-document-picker"
  | "native-command-surface"
  | "native-collection"
  | "native-feedback-surface"
  | "native-visualization"
  | "native-media"
  | "native-composition"
  | "not-applicable";

export type EngineBoundary =
  | "none"
  | "renderer-implementation"
  | "optional-consumer-engine"
  | "consumer-engine";

export type ContractDependency =
  | "tokens"
  | "semantic-icons"
  | "responsive-contract"
  | "native-platform-controls"
  | "native-navigation"
  | "browser-input"
  | "browser-overlay"
  | "consumer-data"
  | "consumer-routing"
  | "consumer-engine";

export type RendererAlternative =
  | "selector-sheet"
  | "native-picker"
  | "contextual-help"
  | "native-modal"
  | "native-sheet"
  | "navigation-drawer"
  | "navigation-tabs"
  | "list-detail"
  | "stack-detail"
  | "native-date-time-control"
  | "document-picker"
  | "photo-library"
  | "camera"
  | "search-action-surface"
  | "collection-paging"
  | "swipe-surface"
  | "data-list-detail"
  | "hierarchy-list"
  | "none";

export type AdaptivePatternId =
  | "selector"
  | "dialog"
  | "drawer"
  | "sidebar"
  | "data-table"
  | "master-detail"
  | "date-time"
  | "files"
  | "command-surface"
  | "notification-center"
  | "navigation-shell"
  | "filtering"
  | "collection"
  | "carousel"
  | "hierarchy"
  | "commerce";

export interface RendererContract {
  readonly status: RendererStatus;
  readonly presentation: RendererPresentation;
}

export interface AdaptivePatternContract {
  readonly id: AdaptivePatternId;
  readonly semanticIntent: readonly SemanticComponentIntent[];
  readonly strategy: ComponentRendererStrategy;
  readonly web: {
    readonly presentation: RendererPresentation;
    readonly inputModalities: readonly InputModality[];
    readonly notes: string;
  };
  readonly native: {
    readonly presentation: RendererPresentation;
    readonly inputModalities: readonly InputModality[];
    readonly notes: string;
  };
  readonly consumerOwns: readonly OwnershipConcern[];
}

export interface AdaptiveBehaviorContract {
  readonly pattern: AdaptivePatternId;
  readonly strategy: ComponentRendererStrategy;
  readonly web: RendererPresentation;
  readonly native: RendererPresentation;
  readonly consumerOwns: readonly OwnershipConcern[];
}

export interface ComponentPlatformRule {
  readonly platform: ComponentPlatform;
  readonly rendererStrategy: ComponentRendererStrategy;
  readonly semanticIntent: readonly SemanticComponentIntent[];
  readonly interactionModel: InteractionModel;
  readonly criticalStates: readonly ComponentCriticalState[];
  readonly webPresentation: RendererPresentation;
  readonly nativePresentation: RendererPresentation;
  readonly inputModalities: readonly InputModality[];
  readonly accessibilityObligations: readonly AccessibilityObligationId[];
  readonly responsiveBehavior: readonly ResponsiveCapability[];
  readonly adaptivePattern?: AdaptivePatternId;
  readonly tokenFamilies: readonly ComponentTokenFamily[];
  readonly layoutIntents: readonly ComponentLayoutIntent[];
  readonly motionRoles: readonly MotionRole[];
  readonly nativeAlternative?: RendererAlternative;
  readonly webAlternative?: RendererAlternative;
  readonly engineBoundary: EngineBoundary;
  readonly dependencies: readonly ContractDependency[];
}

export type ComponentPlatformRuleOverrides = Partial<ComponentPlatformRule>;

export interface ComponentPlatformContract {
  readonly id: string;
  readonly canonicalId: string;
  readonly displayName: string;
  readonly family: ComponentFamily;
  readonly kind: ComponentClassification;
  readonly platform: ComponentPlatform;
  readonly rendererStrategy: ComponentRendererStrategy;
  readonly semanticIntent: readonly SemanticComponentIntent[];
  readonly interactionModel: InteractionModel;
  readonly criticalStates: readonly ComponentCriticalState[];
  readonly web: RendererContract;
  readonly native: RendererContract;
  readonly accessibilityObligations: readonly AccessibilityObligationId[];
  readonly inputModalities: readonly InputModality[];
  readonly responsiveBehavior: readonly ResponsiveCapability[];
  readonly adaptiveBehavior?: AdaptiveBehaviorContract;
  readonly tokenFamilies: readonly ComponentTokenFamily[];
  readonly layoutIntents: readonly ComponentLayoutIntent[];
  readonly motionRoles: readonly MotionRole[];
  readonly nativeAlternative?: RendererAlternative;
  readonly webAlternative?: RendererAlternative;
  readonly engineBoundary: EngineBoundary;
  readonly dependencies: readonly ContractDependency[];
  readonly aliases: readonly string[];
  readonly searchTerms: readonly string[];
}

export const ACCESSIBILITY_OBLIGATION_DEFINITIONS = {
  "accessible-name":
    "The interactive or informative surface has a stable discoverable name.",
  "actionable-role":
    "The renderer exposes an action role with an activation mechanism.",
  "input-role":
    "The renderer exposes the appropriate text, numeric, or value-entry role.",
  "value-state":
    "The current value and its relevant state remain programmatically available.",
  "disabled-state":
    "Disabled behavior is exposed without relying on color alone.",
  "loading-state":
    "Pending work is represented and duplicate activation is prevented when applicable.",
  "invalid-state": "Invalid state is exposed with an associated explanation.",
  "error-association":
    "An error or validation message is associated with the affected control or record.",
  "selection-state":
    "Committed selection is exposed independently from visual emphasis.",
  "expanded-state":
    "Expanded or collapsed state is exposed with the controlled surface relationship.",
  "selected-state":
    "Current navigation or collection selection is exposed programmatically.",
  "navigation-role":
    "The navigation intent is exposed as a labelled destination or navigation region.",
  "labelled-surface": "A contextual surface has an accessible title or label.",
  "focus-containment":
    "Focus or the native accessibility cursor remains within an active task surface.",
  "focus-return":
    "Dismissal returns focus or task context to the invoking control when applicable.",
  dismissal:
    "The surface has a discoverable dismissal path appropriate to the platform.",
  "focus-or-press-feedback":
    "Keyboard focus or native press feedback remains visible and meaningful.",
  "keyboard-navigation":
    "Keyboard or equivalent platform navigation reaches and operates the contract.",
  "ordered-structure":
    "Order, grouping, and item relationships are available to assistive technology.",
  "structure-order":
    "The structural reading and focus order follows the semantic composition.",
  "empty-state":
    "An empty collection is communicated as content, not merely missing decoration.",
  "status-announcement":
    "Meaningful status changes are announced through the renderer's live/status mechanism.",
  "non-color-status":
    "Status meaning is available through text, structure, or an equivalent non-color cue.",
  "table-context":
    "Rows, columns, headers, and comparable values retain usable context.",
  "sort-state":
    "The current sort direction and sorted field are exposed programmatically.",
  "separator-role":
    "A movable divider exposes its separator meaning and current value.",
  "keyboard-resize":
    "A resizable divider has a keyboard or equivalent non-pointer adjustment path.",
  "supplemental-description":
    "Supplemental help is associated with its trigger without becoming the only name.",
  "non-hover-alternative":
    "Information revealed by hover has a focus, press, or explicit alternative.",
  "alternative-text":
    "Non-text content has an appropriate alternative or is explicitly decorative.",
  "data-summary":
    "A visualization has a meaningful textual summary or data access path.",
  "file-state":
    "Selected, processing, complete, and failed file states are available as text/state.",
  "safe-area-inset":
    "Content respects the platform safe-area boundary supplied by the renderer.",
  "virtual-keyboard":
    "The layout and focus contract remains usable when the virtual keyboard is visible.",
  "hardware-capability":
    "Hardware-dependent behavior exposes capability and failure states without assuming access.",
} as const satisfies Record<AccessibilityObligationId, string>;

const adaptive = (
  id: AdaptivePatternId,
  semanticIntent: readonly SemanticComponentIntent[],
  strategy: ComponentRendererStrategy,
  web: AdaptivePatternContract["web"],
  native: AdaptivePatternContract["native"],
  consumerOwns: readonly OwnershipConcern[],
): AdaptivePatternContract => ({
  id,
  semanticIntent,
  strategy,
  web,
  native,
  consumerOwns,
});

export const ADAPTIVE_PATTERN_CONTRACTS = {
  selector: adaptive(
    "selector",
    ["selection", "data-entry"],
    "ALTERNATE_PATTERN",
    {
      presentation: "web-popup-list",
      inputModalities: ["keyboard", "pointer", "screenReader", "focus"],
      notes:
        "Trigger to popup/listbox or bounded list while preserving one selection intent.",
    },
    {
      presentation: "native-picker",
      inputModalities: [
        "touch",
        "screenReader",
        "focus",
        "hardwareBack",
        "virtualKeyboard",
      ],
      notes:
        "Trigger to sheet, native picker, or bounded list surface according to platform convention.",
    },
    ["business-data", "handlers", "permissions"],
  ),
  dialog: adaptive(
    "dialog",
    ["overlay"],
    "ALTERNATE_PATTERN",
    {
      presentation: "web-modal",
      inputModalities: ["keyboard", "pointer", "screenReader", "focus"],
      notes:
        "Centered modal/dialog with a labelled task surface and focus containment.",
    },
    {
      presentation: "native-modal",
      inputModalities: ["touch", "screenReader", "focus", "hardwareBack"],
      notes:
        "Native modal or sheet chosen by task intent; not every dialog is forced into a sheet.",
    },
    ["business-data", "handlers", "permissions"],
  ),
  drawer: adaptive(
    "drawer",
    ["overlay", "composition"],
    "ALTERNATE_PATTERN",
    {
      presentation: "web-edge-surface",
      inputModalities: ["keyboard", "pointer", "screenReader", "focus"],
      notes:
        "Edge contextual surface retaining parent route context and owned scroll.",
    },
    {
      presentation: "native-sheet",
      inputModalities: ["touch", "screenReader", "focus", "hardwareBack"],
      notes:
        "Sheet, modal, or navigation surface selected according to the contextual role.",
    },
    ["business-data", "handlers", "routing", "permissions"],
  ),
  sidebar: adaptive(
    "sidebar",
    ["navigation"],
    "ALTERNATE_PATTERN",
    {
      presentation: "web-persistent-navigation",
      inputModalities: [
        "keyboard",
        "pointer",
        "touch",
        "screenReader",
        "focus",
      ],
      notes:
        "Persistent or collapsible information navigation in the application shell.",
    },
    {
      presentation: "native-navigation",
      inputModalities: ["touch", "screenReader", "focus", "hardwareBack"],
      notes:
        "Drawer, tabs, or stack navigation according to the product information architecture.",
    },
    ["routing", "permissions", "handlers", "principal-context"],
  ),
  "data-table": adaptive(
    "data-table",
    ["data-display", "selection", "data-entry"],
    "ALTERNATE_PATTERN",
    {
      presentation: "web-table",
      inputModalities: ["keyboard", "pointer", "screenReader", "focus"],
      notes:
        "Dense table or grid interaction with explicit row, column, sort, and selection meaning.",
    },
    {
      presentation: "native-list-detail",
      inputModalities: ["touch", "screenReader", "focus", "gesture"],
      notes:
        "Usually list/detail, cards/rows, or intentionally horizontally scrollable data when comparison justifies it.",
    },
    ["business-data", "handlers", "permissions", "persistence"],
  ),
  "master-detail": adaptive(
    "master-detail",
    ["navigation", "data-display", "composition"],
    "ALTERNATE_PATTERN",
    {
      presentation: "web-composition",
      inputModalities: ["keyboard", "pointer", "screenReader", "focus"],
      notes:
        "Simultaneous list and detail panes when the bounded surface supports them.",
    },
    {
      presentation: "native-list-detail",
      inputModalities: ["touch", "screenReader", "focus", "hardwareBack"],
      notes:
        "List to detail navigation or a sheet/detail stack without changing record intent.",
    },
    ["business-data", "routing", "handlers", "permissions"],
  ),
  "date-time": adaptive(
    "date-time",
    ["data-entry", "selection"],
    "NATIVE_RENDERER",
    {
      presentation: "web-popup-list",
      inputModalities: [
        "keyboard",
        "pointer",
        "screenReader",
        "focus",
        "virtualKeyboard",
      ],
      notes:
        "Calendar, popup, or bounded list controls with text entry where the contract supports it.",
    },
    {
      presentation: "native-picker",
      inputModalities: ["touch", "screenReader", "focus", "hardwareBack"],
      notes:
        "Platform date/time controls when they improve entry and preserve the shared value contract.",
    },
    ["business-data", "handlers"],
  ),
  files: adaptive(
    "files",
    ["data-entry", "media"],
    "NATIVE_RENDERER",
    {
      presentation: "web-dropzone",
      inputModalities: [
        "keyboard",
        "pointer",
        "touch",
        "screenReader",
        "focus",
      ],
      notes:
        "File input, dropzone, or drag/drop selection without owning storage or transport.",
    },
    {
      presentation: "native-document-picker",
      inputModalities: ["touch", "screenReader", "focus", "hardwareBack"],
      notes:
        "Document picker, photo library, camera, or share/import affordance according to capability.",
    },
    ["business-data", "handlers", "permissions", "persistence"],
  ),
  "command-surface": adaptive(
    "command-surface",
    ["action", "navigation", "selection"],
    "ALTERNATE_PATTERN",
    {
      presentation: "web-command-surface",
      inputModalities: ["keyboard", "pointer", "screenReader", "focus"],
      notes: "Keyboard-first search and execution of a bounded command set.",
    },
    {
      presentation: "native-command-surface",
      inputModalities: ["touch", "screenReader", "focus", "virtualKeyboard"],
      notes:
        "Search/action surface reachable from the native shell without assuming browser shortcuts.",
    },
    ["business-data", "handlers", "routing", "permissions"],
  ),
  "notification-center": adaptive(
    "notification-center",
    ["feedback", "data-display", "overlay"],
    "ALTERNATE_PATTERN",
    {
      presentation: "web-feedback-surface",
      inputModalities: ["keyboard", "pointer", "screenReader", "focus"],
      notes:
        "A bounded notification collection may render as a popover, drawer, or dedicated page surface according to shell context.",
    },
    {
      presentation: "native-sheet",
      inputModalities: ["touch", "screenReader", "focus", "hardwareBack"],
      notes:
        "Native notification history uses a sheet or screen while preserving read, clear, and action semantics.",
    },
    ["business-data", "persistence", "permissions", "handlers"],
  ),
  "navigation-shell": adaptive(
    "navigation-shell",
    ["navigation", "composition"],
    "ALTERNATE_PATTERN",
    {
      presentation: "web-persistent-navigation",
      inputModalities: [
        "keyboard",
        "pointer",
        "touch",
        "screenReader",
        "focus",
      ],
      notes:
        "Shell navigation and context follow the responsive Web shell contract.",
    },
    {
      presentation: "native-navigation",
      inputModalities: ["touch", "screenReader", "focus", "hardwareBack"],
      notes:
        "Native shell presentation owns safe areas, stacks, tabs, and platform back behavior.",
    },
    [
      "routing",
      "permissions",
      "handlers",
      "principal-context",
      "tenant-context",
    ],
  ),
  filtering: adaptive(
    "filtering",
    ["selection", "data-display"],
    "ALTERNATE_PATTERN",
    {
      presentation: "web-collection",
      inputModalities: ["keyboard", "pointer", "screenReader", "focus"],
      notes:
        "Keep primary query controls near the collection and expose applied state.",
    },
    {
      presentation: "native-sheet",
      inputModalities: [
        "touch",
        "screenReader",
        "focus",
        "hardwareBack",
        "virtualKeyboard",
      ],
      notes:
        "Move secondary filtering into a sheet while keeping search and the filter trigger reachable.",
    },
    ["business-data", "handlers", "permissions", "persistence"],
  ),
  collection: adaptive(
    "collection",
    ["data-display", "selection"],
    "ALTERNATE_PATTERN",
    {
      presentation: "web-collection",
      inputModalities: ["keyboard", "pointer", "screenReader", "focus"],
      notes:
        "Use the collection's declared comparison and selection semantics.",
    },
    {
      presentation: "native-collection",
      inputModalities: ["touch", "screenReader", "focus", "gesture"],
      notes:
        "Use rows, cards, or incremental loading without requiring table markup.",
    },
    ["business-data", "handlers", "permissions", "persistence"],
  ),
  carousel: adaptive(
    "carousel",
    ["composition", "media"],
    "ALTERNATE_PATTERN",
    {
      presentation: "web-bounded-scroll",
      inputModalities: [
        "keyboard",
        "pointer",
        "touch",
        "screenReader",
        "focus",
      ],
      notes: "Bounded scroll rail with keyboard and indicator controls.",
    },
    {
      presentation: "native-scroll-surface",
      inputModalities: ["touch", "gesture", "screenReader", "focus"],
      notes:
        "Swipe/gesture surface with explicit controls and preserved slide order.",
    },
    ["business-data", "handlers", "permissions"],
  ),
  hierarchy: adaptive(
    "hierarchy",
    ["selection", "navigation"],
    "ALTERNATE_PATTERN",
    {
      presentation: "web-hierarchy",
      inputModalities: ["keyboard", "pointer", "screenReader", "focus"],
      notes:
        "Tree semantics preserve level, position, expansion, and selection context.",
    },
    {
      presentation: "native-list-detail",
      inputModalities: ["touch", "screenReader", "focus", "hardwareBack"],
      notes:
        "Nested list or list/detail presentation preserves hierarchy and selection meaning.",
    },
    ["business-data", "handlers", "routing", "permissions"],
  ),
  commerce: adaptive(
    "commerce",
    ["data-display", "action"],
    "ALTERNATE_PATTERN",
    {
      presentation: "web-collection",
      inputModalities: [
        "keyboard",
        "pointer",
        "touch",
        "screenReader",
        "focus",
      ],
      notes:
        "Content-first product and cart composition uses shared primitives and commerce contracts.",
    },
    {
      presentation: "native-collection",
      inputModalities: ["touch", "screenReader", "focus", "gesture"],
      notes:
        "Native list/card/cart presentation keeps product meaning and bounded quantity actions.",
    },
    ["business-data", "handlers", "permissions", "persistence"],
  ),
} as const satisfies Readonly<
  Record<AdaptivePatternId, AdaptivePatternContract>
>;

const commonActionStates = [
  "idle",
  "focus",
  "pressed",
  "disabled",
  "loading",
] as const satisfies readonly ComponentCriticalState[];
const commonFieldStates = [
  "idle",
  "focus",
  "disabled",
  "invalid",
  "loading",
] as const satisfies readonly ComponentCriticalState[];
const commonNavigationStates = [
  "idle",
  "focus",
  "selected",
  "expanded",
  "collapsed",
  "disabled",
] as const satisfies readonly ComponentCriticalState[];
const commonCollectionStates = [
  "ready",
  "loading",
  "empty",
  "error",
  "offline",
  "stale",
] as const satisfies readonly ComponentCriticalState[];

const familyRule = (rule: ComponentPlatformRule): ComponentPlatformRule => rule;

export const COMPONENT_PLATFORM_FAMILY_DEFAULTS = {
  foundation: familyRule({
    platform: "BOTH",
    rendererStrategy: "SAME_INTENT",
    semanticIntent: ["composition"],
    interactionModel: "composition",
    criticalStates: ["ready"],
    webPresentation: "web-composition",
    nativePresentation: "native-composition",
    inputModalities: ["screenReader"],
    accessibilityObligations: ["accessible-name", "structure-order"],
    responsiveBehavior: ["reflow"],
    tokenFamilies: ["color", "typography", "sizing"],
    layoutIntents: ["measure-content", "minimum-useful-surface"],
    motionRoles: ["state"],
    engineBoundary: "none",
    dependencies: ["tokens"],
  }),
  action: familyRule({
    platform: "BOTH",
    rendererStrategy: "SAME_INTENT",
    semanticIntent: ["action"],
    interactionModel: "activation",
    criticalStates: commonActionStates,
    webPresentation: "web-semantic-control",
    nativePresentation: "native-pressable",
    inputModalities: ["keyboard", "pointer", "touch", "screenReader"],
    accessibilityObligations: [
      "accessible-name",
      "actionable-role",
      "disabled-state",
      "loading-state",
      "focus-or-press-feedback",
    ],
    responsiveBehavior: ["reflow", "touch-targets"],
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "radius",
      "focus",
      "motion",
      "touch-target",
      "measure",
    ],
    layoutIntents: ["measure-control", "touch-target-minimum"],
    motionRoles: ["fast", "interaction", "state"],
    engineBoundary: "renderer-implementation",
    dependencies: ["tokens", "semantic-icons"],
  }),
  form: familyRule({
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["input"],
    interactionModel: "field",
    criticalStates: commonFieldStates,
    webPresentation: "web-semantic-control",
    nativePresentation: "native-platform-control",
    inputModalities: [
      "keyboard",
      "pointer",
      "touch",
      "screenReader",
      "focus",
      "virtualKeyboard",
    ],
    accessibilityObligations: [
      "accessible-name",
      "input-role",
      "value-state",
      "disabled-state",
      "invalid-state",
      "error-association",
      "focus-or-press-feedback",
    ],
    responsiveBehavior: ["reflow", "touch-targets"],
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "radius",
      "focus",
      "motion",
      "touch-target",
      "measure",
      "density",
    ],
    layoutIntents: [
      "measure-control",
      "touch-target-minimum",
      "density-adaptive",
    ],
    motionRoles: ["interaction", "state"],
    engineBoundary: "renderer-implementation",
    dependencies: ["tokens"],
  }),
  navigation: familyRule({
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["navigation"],
    interactionModel: "navigation",
    criticalStates: commonNavigationStates,
    webPresentation: "web-persistent-navigation",
    nativePresentation: "native-navigation",
    inputModalities: ["keyboard", "pointer", "touch", "screenReader", "focus"],
    accessibilityObligations: [
      "accessible-name",
      "navigation-role",
      "selected-state",
      "expanded-state",
      "focus-or-press-feedback",
      "keyboard-navigation",
    ],
    responsiveBehavior: ["reflow", "collapse", "drawer", "touch-targets"],
    adaptivePattern: "navigation-shell",
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "radius",
      "focus",
      "motion",
      "touch-target",
      "measure",
      "density",
    ],
    layoutIntents: [
      "measure-content",
      "minimum-useful-surface",
      "priority-order",
      "touch-target-minimum",
    ],
    motionRoles: ["interaction", "enter", "exit", "state"],
    engineBoundary: "renderer-implementation",
    dependencies: ["tokens", "responsive-contract", "native-navigation"],
  }),
  layout: familyRule({
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["layout"],
    interactionModel: "layout",
    criticalStates: ["ready", "focus", "constrained"],
    webPresentation: "web-composition",
    nativePresentation: "native-composition",
    inputModalities: ["keyboard", "pointer", "touch", "screenReader", "focus"],
    accessibilityObligations: ["structure-order", "focus-or-press-feedback"],
    responsiveBehavior: ["reflow", "stack", "density-adaptive"],
    tokenFamilies: [
      "spacing",
      "sizing",
      "radius",
      "elevation",
      "focus",
      "density",
      "measure",
    ],
    layoutIntents: [
      "measure-compact",
      "measure-content",
      "measure-wide",
      "measure-fluid",
      "density-adaptive",
      "minimum-useful-surface",
      "bounded-scroll-owner",
    ],
    motionRoles: ["interaction", "state", "enter", "exit"],
    engineBoundary: "renderer-implementation",
    dependencies: ["tokens", "responsive-contract"],
  }),
  pattern: familyRule({
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["composition"],
    interactionModel: "composition",
    criticalStates: commonCollectionStates,
    webPresentation: "web-composition",
    nativePresentation: "native-composition",
    inputModalities: ["keyboard", "pointer", "touch", "screenReader", "focus"],
    accessibilityObligations: [
      "accessible-name",
      "structure-order",
      "empty-state",
      "loading-state",
      "non-color-status",
    ],
    responsiveBehavior: [
      "reflow",
      "stack",
      "collapse",
      "drawer",
      "priority-order",
    ],
    adaptivePattern: "navigation-shell",
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "radius",
      "elevation",
      "focus",
      "motion",
      "touch-target",
      "measure",
      "density",
    ],
    layoutIntents: [
      "measure-content",
      "minimum-useful-surface",
      "priority-order",
      "single-column",
      "stacked-detail",
      "touch-target-minimum",
    ],
    motionRoles: ["interaction", "enter", "exit", "reveal", "state"],
    engineBoundary: "renderer-implementation",
    dependencies: [
      "tokens",
      "responsive-contract",
      "consumer-data",
      "consumer-routing",
    ],
  }),
  surface: familyRule({
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["composition"],
    interactionModel: "composition",
    criticalStates: ["ready", "disabled"],
    webPresentation: "web-composition",
    nativePresentation: "native-composition",
    inputModalities: ["screenReader", "focus"],
    accessibilityObligations: ["structure-order", "accessible-name"],
    responsiveBehavior: ["reflow", "stack"],
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "radius",
      "elevation",
      "focus",
      "measure",
    ],
    layoutIntents: [
      "measure-content",
      "minimum-useful-surface",
      "section-rhythm",
    ],
    motionRoles: ["state", "enter", "exit"],
    engineBoundary: "renderer-implementation",
    dependencies: ["tokens"],
  }),
  data: familyRule({
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["data-display"],
    interactionModel: "display",
    criticalStates: commonCollectionStates,
    webPresentation: "web-semantic-element",
    nativePresentation: "native-composition",
    inputModalities: ["keyboard", "pointer", "touch", "screenReader", "focus"],
    accessibilityObligations: [
      "accessible-name",
      "ordered-structure",
      "empty-state",
      "loading-state",
      "non-color-status",
    ],
    responsiveBehavior: ["reflow", "stack", "density-adaptive"],
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "radius",
      "focus",
      "motion",
      "density",
      "measure",
    ],
    layoutIntents: [
      "measure-compact",
      "measure-content",
      "measure-wide",
      "density-adaptive",
    ],
    motionRoles: ["state", "reveal"],
    engineBoundary: "renderer-implementation",
    dependencies: ["tokens", "semantic-icons"],
  }),
  table: familyRule({
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["data-display", "selection"],
    interactionModel: "data-comparison",
    criticalStates: [
      "ready",
      "loading",
      "empty",
      "error",
      "selected",
      "focus",
      "offline",
    ],
    webPresentation: "web-table",
    nativePresentation: "native-list-detail",
    inputModalities: ["keyboard", "pointer", "touch", "screenReader", "focus"],
    accessibilityObligations: [
      "accessible-name",
      "table-context",
      "sort-state",
      "selection-state",
      "empty-state",
      "loading-state",
      "focus-or-press-feedback",
    ],
    responsiveBehavior: [
      "reflow",
      "scroll",
      "stack",
      "touch-targets",
      "density-adaptive",
    ],
    adaptivePattern: "data-table",
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "radius",
      "focus",
      "motion",
      "density",
      "measure",
    ],
    layoutIntents: [
      "measure-content",
      "measure-wide",
      "bounded-scroll-owner",
      "stacked-detail",
      "density-adaptive",
    ],
    motionRoles: ["interaction", "state"],
    nativeAlternative: "data-list-detail",
    engineBoundary: "renderer-implementation",
    dependencies: ["tokens", "responsive-contract", "consumer-data"],
  }),
  filter: familyRule({
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["selection", "data-display"],
    interactionModel: "filtering",
    criticalStates: [
      "idle",
      "focus",
      "selected",
      "disabled",
      "loading",
      "empty",
    ],
    webPresentation: "web-collection",
    nativePresentation: "native-sheet",
    inputModalities: [
      "keyboard",
      "pointer",
      "touch",
      "screenReader",
      "focus",
      "virtualKeyboard",
    ],
    accessibilityObligations: [
      "accessible-name",
      "selection-state",
      "expanded-state",
      "focus-or-press-feedback",
      "keyboard-navigation",
    ],
    responsiveBehavior: ["reflow", "collapse", "drawer", "touch-targets"],
    adaptivePattern: "filtering",
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "radius",
      "focus",
      "motion",
      "touch-target",
      "measure",
    ],
    layoutIntents: [
      "measure-control",
      "priority-order",
      "single-column",
      "touch-target-minimum",
    ],
    motionRoles: ["interaction", "enter", "exit", "state"],
    nativeAlternative: "native-sheet",
    engineBoundary: "renderer-implementation",
    dependencies: ["tokens", "responsive-contract", "consumer-data"],
  }),
  overlay: familyRule({
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["overlay"],
    interactionModel: "overlay",
    criticalStates: [
      "idle",
      "focus",
      "expanded",
      "collapsed",
      "disabled",
      "loading",
    ],
    webPresentation: "web-modal",
    nativePresentation: "native-modal",
    inputModalities: [
      "keyboard",
      "pointer",
      "touch",
      "screenReader",
      "focus",
      "hardwareBack",
    ],
    accessibilityObligations: [
      "accessible-name",
      "labelled-surface",
      "focus-containment",
      "focus-return",
      "dismissal",
      "focus-or-press-feedback",
    ],
    responsiveBehavior: ["reflow", "drawer", "touch-targets"],
    adaptivePattern: "dialog",
    tokenFamilies: [
      "color",
      "spacing",
      "radius",
      "elevation",
      "focus",
      "motion",
      "measure",
    ],
    layoutIntents: [
      "measure-content",
      "measure-wide",
      "bounded-scroll-owner",
      "touch-target-minimum",
    ],
    motionRoles: ["enter", "exit", "state"],
    nativeAlternative: "native-modal",
    engineBoundary: "renderer-implementation",
    dependencies: [
      "tokens",
      "responsive-contract",
      "browser-overlay",
      "native-platform-controls",
    ],
  }),
  feedback: familyRule({
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["feedback"],
    interactionModel: "feedback",
    criticalStates: [
      "ready",
      "loading",
      "empty",
      "error",
      "offline",
      "pendingSync",
      "syncing",
      "syncFailed",
    ],
    webPresentation: "web-feedback-surface",
    nativePresentation: "native-feedback-surface",
    inputModalities: ["screenReader", "focus"],
    accessibilityObligations: [
      "status-announcement",
      "non-color-status",
      "accessible-name",
    ],
    responsiveBehavior: ["reflow", "stack"],
    tokenFamilies: ["color", "typography", "spacing", "radius", "motion"],
    layoutIntents: ["measure-content", "section-rhythm"],
    motionRoles: ["state", "enter", "exit"],
    engineBoundary: "renderer-implementation",
    dependencies: ["tokens", "semantic-icons"],
  }),
  "date-time": familyRule({
    platform: "ADAPTIVE",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["data-entry", "selection"],
    interactionModel: "selection",
    criticalStates: [
      "idle",
      "focus",
      "selected",
      "disabled",
      "invalid",
      "loading",
    ],
    webPresentation: "web-popup-list",
    nativePresentation: "native-picker",
    inputModalities: [
      "keyboard",
      "pointer",
      "touch",
      "screenReader",
      "focus",
      "virtualKeyboard",
    ],
    accessibilityObligations: [
      "accessible-name",
      "input-role",
      "value-state",
      "selection-state",
      "disabled-state",
      "invalid-state",
      "focus-or-press-feedback",
    ],
    responsiveBehavior: ["reflow", "touch-targets"],
    adaptivePattern: "date-time",
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "radius",
      "focus",
      "motion",
      "touch-target",
      "measure",
    ],
    layoutIntents: ["measure-control", "touch-target-minimum", "single-column"],
    motionRoles: ["interaction", "enter", "exit", "state"],
    nativeAlternative: "native-date-time-control",
    engineBoundary: "renderer-implementation",
    dependencies: ["tokens", "native-platform-controls", "browser-input"],
  }),
  file: familyRule({
    platform: "ADAPTIVE",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["data-entry", "media"],
    interactionModel: "file-provision",
    criticalStates: ["idle", "focus", "disabled", "loading", "empty", "error"],
    webPresentation: "web-dropzone",
    nativePresentation: "native-document-picker",
    inputModalities: ["keyboard", "pointer", "touch", "screenReader", "focus"],
    accessibilityObligations: [
      "accessible-name",
      "file-state",
      "error-association",
      "disabled-state",
      "focus-or-press-feedback",
    ],
    responsiveBehavior: ["reflow", "stack", "touch-targets"],
    adaptivePattern: "files",
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "radius",
      "focus",
      "motion",
      "touch-target",
      "measure",
    ],
    layoutIntents: ["measure-content", "single-column", "touch-target-minimum"],
    motionRoles: ["interaction", "state", "enter", "exit"],
    nativeAlternative: "document-picker",
    engineBoundary: "renderer-implementation",
    dependencies: ["tokens", "native-platform-controls", "consumer-data"],
  }),
  chart: familyRule({
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["data-display"],
    interactionModel: "visualization",
    criticalStates: commonCollectionStates,
    webPresentation: "web-visualization",
    nativePresentation: "native-visualization",
    inputModalities: ["pointer", "touch", "screenReader", "focus"],
    accessibilityObligations: [
      "accessible-name",
      "data-summary",
      "non-color-status",
    ],
    responsiveBehavior: ["reflow", "stack", "density-adaptive"],
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "radius",
      "motion",
      "data-visualization",
      "measure",
    ],
    layoutIntents: [
      "measure-content",
      "measure-wide",
      "minimum-useful-surface",
      "density-adaptive",
    ],
    motionRoles: ["state", "chart", "reveal"],
    engineBoundary: "optional-consumer-engine",
    dependencies: ["tokens", "consumer-data", "consumer-engine"],
  }),
  media: familyRule({
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["media"],
    interactionModel: "media",
    criticalStates: ["ready", "loading", "empty", "error", "focus"],
    webPresentation: "web-media",
    nativePresentation: "native-media",
    inputModalities: ["pointer", "touch", "screenReader", "focus"],
    accessibilityObligations: [
      "alternative-text",
      "accessible-name",
      "focus-or-press-feedback",
    ],
    responsiveBehavior: ["reflow", "stack"],
    tokenFamilies: [
      "color",
      "spacing",
      "radius",
      "elevation",
      "focus",
      "motion",
      "measure",
    ],
    layoutIntents: [
      "measure-compact",
      "measure-content",
      "minimum-useful-surface",
    ],
    motionRoles: ["state", "enter", "exit"],
    engineBoundary: "renderer-implementation",
    dependencies: ["tokens", "semantic-icons"],
  }),
  commerce: familyRule({
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["data-display", "action"],
    interactionModel: "commerce",
    criticalStates: [
      "ready",
      "loading",
      "empty",
      "error",
      "disabled",
      "selected",
    ],
    webPresentation: "web-collection",
    nativePresentation: "native-collection",
    inputModalities: [
      "keyboard",
      "pointer",
      "touch",
      "screenReader",
      "focus",
      "gesture",
    ],
    accessibilityObligations: [
      "accessible-name",
      "actionable-role",
      "value-state",
      "selection-state",
      "empty-state",
      "loading-state",
      "non-color-status",
    ],
    responsiveBehavior: ["reflow", "stack", "touch-targets", "priority-order"],
    adaptivePattern: "commerce",
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "radius",
      "elevation",
      "focus",
      "motion",
      "touch-target",
      "measure",
    ],
    layoutIntents: [
      "measure-compact",
      "measure-content",
      "measure-wide",
      "stacked-detail",
      "touch-target-minimum",
    ],
    motionRoles: ["interaction", "state", "enter", "exit", "reveal"],
    nativeAlternative: "list-detail",
    engineBoundary: "renderer-implementation",
    dependencies: [
      "tokens",
      "semantic-icons",
      "consumer-data",
      "consumer-routing",
    ],
  }),
} as const satisfies Readonly<Record<ComponentFamily, ComponentPlatformRule>>;

const bothActionOverride: ComponentPlatformRuleOverrides = {
  platform: "BOTH",
  rendererStrategy: "SAME_INTENT",
  adaptivePattern: undefined,
};

const selectionOverride: ComponentPlatformRuleOverrides = {
  platform: "ADAPTIVE",
  rendererStrategy: "ALTERNATE_PATTERN",
  semanticIntent: ["selection", "data-entry"],
  interactionModel: "selection",
  criticalStates: [
    "idle",
    "focus",
    "selected",
    "expanded",
    "disabled",
    "invalid",
  ],
  webPresentation: "web-popup-list",
  nativePresentation: "native-picker",
  accessibilityObligations: [
    "accessible-name",
    "selection-state",
    "expanded-state",
    "disabled-state",
    "focus-or-press-feedback",
    "keyboard-navigation",
  ],
  adaptivePattern: "selector",
  nativeAlternative: "selector-sheet",
  layoutIntents: [
    "measure-control",
    "touch-target-minimum",
    "density-adaptive",
  ],
  motionRoles: ["interaction", "enter", "exit", "state"],
};

const componentPlatformOverrides = {
  Ten4SevenProvider: {
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["composition"],
    interactionModel: "composition",
    webPresentation: "web-composition",
    nativePresentation: "native-composition",
    inputModalities: ["screenReader"],
    accessibilityObligations: ["structure-order"],
    adaptivePattern: undefined,
    engineBoundary: "renderer-implementation",
  },
  Typography: {
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["composition"],
    interactionModel: "composition",
  },
  T7Icon: {
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["media"],
    interactionModel: "display",
    accessibilityObligations: ["alternative-text"],
    inputModalities: ["screenReader"],
    dependencies: ["tokens", "semantic-icons"],
  },
  Kbd: {
    platform: "WEB",
    rendererStrategy: "NOT_APPLICABLE",
    semanticIntent: ["data-display"],
    interactionModel: "display",
    webPresentation: "web-semantic-element",
    nativePresentation: "not-applicable",
    inputModalities: ["keyboard", "screenReader"],
    accessibilityObligations: ["accessible-name"],
    adaptivePattern: undefined,
    nativeAlternative: "none",
    dependencies: ["tokens"],
  },
  Link: {
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["navigation"],
    interactionModel: "navigation",
    accessibilityObligations: ["accessible-name", "focus-or-press-feedback"],
    dependencies: ["tokens", "consumer-routing"],
  },
  SpeedDial: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["action", "composition"],
    interactionModel: "activation",
    adaptivePattern: "navigation-shell",
    nativeAlternative: "navigation-drawer",
    inputModalities: [
      "keyboard",
      "pointer",
      "touch",
      "screenReader",
      "focus",
      "gesture",
    ],
  },
  DragHandle: {
    platform: "WEB",
    rendererStrategy: "NOT_APPLICABLE",
    semanticIntent: ["layout"],
    interactionModel: "layout",
    webPresentation: "web-semantic-control",
    nativePresentation: "not-applicable",
    inputModalities: ["pointer", "keyboard", "screenReader", "focus"],
    accessibilityObligations: [
      "accessible-name",
      "focus-or-press-feedback",
      "keyboard-navigation",
    ],
    adaptivePattern: undefined,
    nativeAlternative: "none",
    dependencies: ["tokens"],
  },
  Select: selectionOverride,
  NativeSelect: selectionOverride,
  Combobox: selectionOverride,
  MultiSelect: selectionOverride,
  HierarchyPicker: {
    ...selectionOverride,
    adaptivePattern: "hierarchy",
    nativeAlternative: "hierarchy-list",
  },
  Cascader: {
    ...selectionOverride,
    adaptivePattern: "hierarchy",
    nativeAlternative: "hierarchy-list",
  },
  Transfer: {
    ...selectionOverride,
    semanticIntent: ["selection", "data-display"],
    interactionModel: "collection",
    adaptivePattern: "collection",
    nativeAlternative: "list-detail",
  },
  ColorPicker: {
    ...selectionOverride,
    semanticIntent: ["selection", "data-entry"],
    nativeAlternative: "native-picker",
  },
  TagsInput: {
    ...selectionOverride,
    semanticIntent: ["selection", "data-entry"],
    nativeAlternative: "selector-sheet",
  },
  EditorSurface: {
    platform: "WEB",
    rendererStrategy: "NOT_APPLICABLE",
    semanticIntent: ["data-entry", "composition"],
    interactionModel: "data-entry",
    webPresentation: "web-composition",
    nativePresentation: "not-applicable",
    inputModalities: ["keyboard", "pointer", "screenReader", "focus"],
    accessibilityObligations: [
      "accessible-name",
      "structure-order",
      "focus-or-press-feedback",
    ],
    adaptivePattern: undefined,
    nativeAlternative: "none",
    engineBoundary: "consumer-engine",
    dependencies: ["tokens", "consumer-engine"],
  },
  DiffViewer: {
    platform: "WEB",
    rendererStrategy: "NOT_APPLICABLE",
    semanticIntent: ["data-display"],
    interactionModel: "data-comparison",
    webPresentation: "web-composition",
    nativePresentation: "not-applicable",
    inputModalities: ["keyboard", "pointer", "screenReader", "focus"],
    accessibilityObligations: [
      "accessible-name",
      "ordered-structure",
      "non-color-status",
      "focus-or-press-feedback",
    ],
    adaptivePattern: undefined,
    nativeAlternative: "none",
    engineBoundary: "optional-consumer-engine",
    dependencies: ["tokens", "consumer-engine"],
  },
  PromptComposer: {
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["data-entry", "action"],
    interactionModel: "field",
    accessibilityObligations: [
      "accessible-name",
      "input-role",
      "value-state",
      "actionable-role",
      "focus-or-press-feedback",
    ],
    dependencies: ["tokens", "semantic-icons", "consumer-engine"],
    engineBoundary: "optional-consumer-engine",
  },
  Sidebar: {
    platform: "ADAPTIVE",
    adaptivePattern: "sidebar",
    nativeAlternative: "navigation-drawer",
  },
  MobileSidebar: {
    platform: "ADAPTIVE",
    adaptivePattern: "sidebar",
    nativeAlternative: "navigation-drawer",
  },
  NavigationMenu: {
    platform: "ADAPTIVE",
    adaptivePattern: "navigation-shell",
    nativeAlternative: "navigation-tabs",
  },
  TopNavigation: {
    platform: "ADAPTIVE",
    adaptivePattern: "navigation-shell",
    nativeAlternative: "navigation-tabs",
  },
  BottomNavigation: {
    platform: "ADAPTIVE",
    adaptivePattern: "sidebar",
    nativeAlternative: "navigation-tabs",
  },
  NavigationRail: {
    platform: "ADAPTIVE",
    adaptivePattern: "sidebar",
    nativeAlternative: "navigation-drawer",
  },
  Breadcrumb: {
    platform: "ADAPTIVE",
    adaptivePattern: "navigation-shell",
    nativeAlternative: "stack-detail",
  },
  SectionNavigation: {
    platform: "ADAPTIVE",
    adaptivePattern: "navigation-shell",
    nativeAlternative: "navigation-tabs",
  },
  Tabs: {
    ...bothActionOverride,
    semanticIntent: ["navigation"],
    interactionModel: "navigation",
    criticalStates: commonNavigationStates,
    accessibilityObligations: [
      "accessible-name",
      "selected-state",
      "keyboard-navigation",
      "focus-or-press-feedback",
    ],
    inputModalities: ["keyboard", "pointer", "touch", "screenReader", "focus"],
    responsiveBehavior: ["reflow", "touch-targets"],
    layoutIntents: ["measure-content", "touch-target-minimum"],
    motionRoles: ["interaction", "state"],
  },
  Accordion: {
    ...bothActionOverride,
    semanticIntent: ["navigation"],
    interactionModel: "disclosure",
    criticalStates: commonNavigationStates,
    accessibilityObligations: [
      "accessible-name",
      "expanded-state",
      "keyboard-navigation",
      "focus-or-press-feedback",
    ],
    inputModalities: ["keyboard", "pointer", "touch", "screenReader", "focus"],
  },
  Collapsible: {
    ...bothActionOverride,
    semanticIntent: ["composition"],
    interactionModel: "disclosure",
    criticalStates: ["idle", "focus", "expanded", "collapsed", "disabled"],
    accessibilityObligations: [
      "accessible-name",
      "expanded-state",
      "focus-or-press-feedback",
    ],
    inputModalities: ["keyboard", "pointer", "touch", "screenReader", "focus"],
  },
  Stepper: {
    ...bothActionOverride,
    semanticIntent: ["navigation", "data-display"],
    interactionModel: "navigation",
    criticalStates: commonNavigationStates,
    accessibilityObligations: [
      "accessible-name",
      "ordered-structure",
      "selected-state",
      "focus-or-press-feedback",
    ],
    inputModalities: ["keyboard", "pointer", "touch", "screenReader", "focus"],
  },
  TabPanel: {
    ...bothActionOverride,
    semanticIntent: ["composition"],
    interactionModel: "composition",
    accessibilityObligations: ["structure-order", "accessible-name"],
  },
  CommandMenu: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["action", "navigation", "selection"],
    interactionModel: "selection",
    adaptivePattern: "command-surface",
    nativeAlternative: "search-action-surface",
    inputModalities: [
      "keyboard",
      "pointer",
      "touch",
      "screenReader",
      "focus",
      "virtualKeyboard",
    ],
    accessibilityObligations: [
      "accessible-name",
      "selection-state",
      "ordered-structure",
      "keyboard-navigation",
      "focus-return",
    ],
  },
  Dialog: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["overlay"],
    interactionModel: "overlay",
    adaptivePattern: "dialog",
    nativeAlternative: "native-modal",
  },
  Pagination: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["navigation", "data-display"],
    interactionModel: "navigation",
    adaptivePattern: "collection",
    nativeAlternative: "collection-paging",
    accessibilityObligations: [
      "accessible-name",
      "navigation-role",
      "selected-state",
      "focus-or-press-feedback",
    ],
  },
  List: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["data-display", "selection"],
    interactionModel: "collection",
    criticalStates: [
      "ready",
      "loading",
      "empty",
      "error",
      "selected",
      "focus",
      "disabled",
      "stale",
    ],
    webPresentation: "web-collection",
    nativePresentation: "native-collection",
    inputModalities: ["keyboard", "pointer", "touch", "screenReader", "focus"],
    accessibilityObligations: [
      "accessible-name",
      "ordered-structure",
      "selection-state",
      "empty-state",
      "loading-state",
      "keyboard-navigation",
      "focus-or-press-feedback",
    ],
    responsiveBehavior: [
      "reflow",
      "stack",
      "priority-order",
      "touch-targets",
      "density-adaptive",
    ],
    adaptivePattern: "collection",
    nativeAlternative: "data-list-detail",
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "radius",
      "focus",
      "motion",
      "density",
      "measure",
      "touch-target",
    ],
    layoutIntents: [
      "measure-content",
      "minimum-useful-surface",
      "priority-order",
      "density-adaptive",
      "touch-target-minimum",
    ],
    motionRoles: ["interaction", "state", "reveal"],
    engineBoundary: "renderer-implementation",
    dependencies: ["tokens", "responsive-contract", "consumer-data"],
  },
  Carousel: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["composition", "media"],
    interactionModel: "collection",
    adaptivePattern: "carousel",
    nativeAlternative: "swipe-surface",
    inputModalities: [
      "keyboard",
      "pointer",
      "touch",
      "gesture",
      "screenReader",
      "focus",
    ],
    accessibilityObligations: [
      "accessible-name",
      "ordered-structure",
      "focus-or-press-feedback",
      "non-hover-alternative",
    ],
  },
  TreeView: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["navigation", "selection"],
    interactionModel: "navigation",
    adaptivePattern: "hierarchy",
    nativeAlternative: "hierarchy-list",
    accessibilityObligations: [
      "accessible-name",
      "navigation-role",
      "ordered-structure",
      "expanded-state",
      "selected-state",
      "keyboard-navigation",
      "focus-or-press-feedback",
    ],
  },
  SplitPane: {
    platform: "WEB",
    rendererStrategy: "NOT_APPLICABLE",
    semanticIntent: ["layout", "composition"],
    interactionModel: "layout",
    webPresentation: "web-composition",
    nativePresentation: "not-applicable",
    inputModalities: ["pointer", "keyboard", "screenReader", "focus"],
    accessibilityObligations: [
      "separator-role",
      "keyboard-resize",
      "focus-or-press-feedback",
    ],
    adaptivePattern: undefined,
    nativeAlternative: "list-detail",
    layoutIntents: ["split-panes", "measure-content", "bounded-scroll-owner"],
    dependencies: ["tokens", "responsive-contract"],
  },
  PropertyInspector: {
    platform: "WEB",
    rendererStrategy: "NOT_APPLICABLE",
    semanticIntent: ["data-display", "data-entry"],
    interactionModel: "data-entry",
    webPresentation: "web-composition",
    nativePresentation: "not-applicable",
    inputModalities: ["keyboard", "pointer", "screenReader", "focus"],
    adaptivePattern: undefined,
    nativeAlternative: "list-detail",
    engineBoundary: "consumer-engine",
    dependencies: ["tokens", "consumer-engine"],
  },
  BuilderCanvas: {
    platform: "WEB",
    rendererStrategy: "NOT_APPLICABLE",
    semanticIntent: ["composition", "layout"],
    interactionModel: "layout",
    webPresentation: "web-composition",
    nativePresentation: "not-applicable",
    inputModalities: ["keyboard", "pointer", "screenReader", "focus"],
    accessibilityObligations: [
      "accessible-name",
      "structure-order",
      "focus-or-press-feedback",
    ],
    adaptivePattern: undefined,
    nativeAlternative: "none",
    engineBoundary: "consumer-engine",
    dependencies: ["tokens", "consumer-engine"],
  },
  AppShell: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["navigation", "composition"],
    interactionModel: "composition",
    adaptivePattern: "navigation-shell",
    nativeAlternative: "navigation-drawer",
  },
  ApprovalPanel: {
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["data-display", "action", "feedback"],
    interactionModel: "composition",
    adaptivePattern: undefined,
    nativePresentation: "native-composition",
    accessibilityObligations: [
      "accessible-name",
      "structure-order",
      "status-announcement",
      "focus-or-press-feedback",
    ],
    dependencies: ["tokens", "semantic-icons", "consumer-data"],
  },
  ActionFooter: {
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["action", "composition"],
    interactionModel: "composition",
    adaptivePattern: undefined,
    accessibilityObligations: [
      "structure-order",
      "actionable-role",
      "focus-or-press-feedback",
    ],
  },
  CartPanel: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["data-display", "action", "composition"],
    interactionModel: "commerce",
    adaptivePattern: "commerce",
    nativeAlternative: "list-detail",
  },
  OrderSummary: {
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["data-display"],
    interactionModel: "display",
    adaptivePattern: undefined,
    accessibilityObligations: [
      "accessible-name",
      "ordered-structure",
      "non-color-status",
    ],
    nativePresentation: "native-composition",
    dependencies: ["tokens", "consumer-data"],
  },
  PublicShell: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["navigation", "composition"],
    interactionModel: "composition",
    adaptivePattern: "navigation-shell",
    nativeAlternative: "navigation-tabs",
  },
  Card: {
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["composition"],
    interactionModel: "composition",
    adaptivePattern: undefined,
  },
  MetricCard: {
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["data-display"],
    interactionModel: "display",
    adaptivePattern: undefined,
  },
  KPICluster: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["data-display"],
    interactionModel: "collection",
    adaptivePattern: "collection",
    nativeAlternative: "list-detail",
  },
  MilestoneTracker: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["navigation", "data-display", "feedback"],
    interactionModel: "navigation",
    adaptivePattern: "master-detail",
    nativeAlternative: "stack-detail",
  },
  Table: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    adaptivePattern: "data-table",
    nativeAlternative: "data-list-detail",
  },
  TableHeader: {
    platform: "WEB",
    rendererStrategy: "NOT_APPLICABLE",
    webPresentation: "web-table",
    nativePresentation: "not-applicable",
    adaptivePattern: undefined,
    nativeAlternative: "data-list-detail",
  },
  TableBody: {
    platform: "WEB",
    rendererStrategy: "NOT_APPLICABLE",
    webPresentation: "web-table",
    nativePresentation: "not-applicable",
    adaptivePattern: undefined,
    nativeAlternative: "data-list-detail",
  },
  TableRow: {
    platform: "WEB",
    rendererStrategy: "NOT_APPLICABLE",
    webPresentation: "web-table",
    nativePresentation: "not-applicable",
    adaptivePattern: undefined,
    nativeAlternative: "data-list-detail",
  },
  TableHead: {
    platform: "WEB",
    rendererStrategy: "NOT_APPLICABLE",
    webPresentation: "web-table",
    nativePresentation: "not-applicable",
    adaptivePattern: undefined,
    nativeAlternative: "data-list-detail",
  },
  TableCell: {
    platform: "WEB",
    rendererStrategy: "NOT_APPLICABLE",
    webPresentation: "web-table",
    nativePresentation: "not-applicable",
    adaptivePattern: undefined,
    nativeAlternative: "data-list-detail",
  },
  DataTable: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    adaptivePattern: "data-table",
    nativeAlternative: "data-list-detail",
  },
  AdvancedDataGrid: {
    platform: "WEB",
    rendererStrategy: "NOT_APPLICABLE",
    webPresentation: "web-data-grid",
    nativePresentation: "not-applicable",
    adaptivePattern: undefined,
    nativeAlternative: "data-list-detail",
    engineBoundary: "optional-consumer-engine",
    dependencies: ["tokens", "consumer-data", "consumer-engine"],
  },
  DataTableColumnPicker: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    adaptivePattern: "filtering",
    nativeAlternative: "native-sheet",
  },
  Modal: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    adaptivePattern: "dialog",
    nativeAlternative: "native-modal",
  },
  AlertDialog: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    adaptivePattern: "dialog",
    nativeAlternative: "native-modal",
  },
  Drawer: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    adaptivePattern: "drawer",
    nativeAlternative: "native-sheet",
  },
  DetailDrawer: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    adaptivePattern: "drawer",
    nativeAlternative: "native-sheet",
  },
  FilterDrawer: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    adaptivePattern: "drawer",
    nativeAlternative: "native-sheet",
  },
  Popover: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    adaptivePattern: "dialog",
    nativeAlternative: "native-sheet",
  },
  Tooltip: {
    platform: "WEB",
    rendererStrategy: "NOT_APPLICABLE",
    semanticIntent: ["overlay"],
    interactionModel: "overlay",
    webPresentation: "web-modal",
    nativePresentation: "not-applicable",
    inputModalities: ["pointer", "hover", "keyboard", "screenReader", "focus"],
    accessibilityObligations: [
      "accessible-name",
      "supplemental-description",
      "non-hover-alternative",
      "focus-or-press-feedback",
    ],
    adaptivePattern: undefined,
    nativeAlternative: "contextual-help",
    dependencies: ["tokens", "browser-overlay"],
  },
  DropdownMenu: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    adaptivePattern: "dialog",
    nativeAlternative: "native-sheet",
  },
  ContextMenu: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    adaptivePattern: "dialog",
    nativeAlternative: "native-sheet",
    inputModalities: [
      "pointer",
      "touch",
      "gesture",
      "keyboard",
      "screenReader",
      "focus",
      "hardwareBack",
    ],
  },
  ToastProvider: {
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["feedback"],
    interactionModel: "feedback",
    adaptivePattern: undefined,
  },
  Toaster: {
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["feedback"],
    interactionModel: "feedback",
    adaptivePattern: undefined,
  },
  Toast: {
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["feedback"],
    interactionModel: "feedback",
    adaptivePattern: undefined,
  },
  NotificationCenter: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["feedback", "data-display", "overlay"],
    interactionModel: "collection",
    adaptivePattern: "notification-center",
    nativeAlternative: "native-sheet",
    inputModalities: [
      "keyboard",
      "pointer",
      "touch",
      "screenReader",
      "focus",
      "hardwareBack",
    ],
    accessibilityObligations: [
      "accessible-name",
      "labelled-surface",
      "ordered-structure",
      "selected-state",
      "status-announcement",
      "focus-containment",
      "focus-return",
      "dismissal",
      "non-color-status",
    ],
    layoutIntents: [
      "measure-content",
      "minimum-useful-surface",
      "bounded-scroll-owner",
      "touch-target-minimum",
    ],
    dependencies: [
      "tokens",
      "semantic-icons",
      "responsive-contract",
      "consumer-data",
    ],
  },
  ProductCard: {
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["data-display"],
    interactionModel: "display",
    adaptivePattern: undefined,
  },
  ProductGrid: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["data-display"],
    interactionModel: "collection",
    adaptivePattern: "commerce",
    nativeAlternative: "list-detail",
  },
  Price: {
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["data-display"],
    interactionModel: "display",
    adaptivePattern: undefined,
  },
  Rating: {
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["data-display", "selection"],
    interactionModel: "selection",
    adaptivePattern: undefined,
  },
  ProductMeta: {
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    semanticIntent: ["data-display"],
    interactionModel: "display",
    adaptivePattern: undefined,
  },
  QuantityControl: {
    platform: "BOTH",
    rendererStrategy: "SAME_INTENT",
    semanticIntent: ["data-entry", "action"],
    interactionModel: "selection",
    adaptivePattern: undefined,
    accessibilityObligations: [
      "accessible-name",
      "input-role",
      "value-state",
      "disabled-state",
      "focus-or-press-feedback",
    ],
    inputModalities: [
      "keyboard",
      "pointer",
      "touch",
      "screenReader",
      "focus",
      "virtualKeyboard",
    ],
  },
  CartTrigger: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["action", "navigation"],
    interactionModel: "activation",
    adaptivePattern: "commerce",
    nativeAlternative: "navigation-drawer",
  },
  CartLineItem: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    semanticIntent: ["data-display", "data-entry", "action"],
    interactionModel: "commerce",
    adaptivePattern: "commerce",
    nativeAlternative: "list-detail",
  },
  LineChart: {
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    engineBoundary: "optional-consumer-engine",
  },
  BarChart: {
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    engineBoundary: "optional-consumer-engine",
  },
  DonutChart: {
    platform: "BOTH",
    rendererStrategy: "NATIVE_RENDERER",
    engineBoundary: "optional-consumer-engine",
  },
  ChartPanel: {
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    adaptivePattern: "collection",
    nativeAlternative: "list-detail",
  },
} as const satisfies Readonly<Record<string, ComponentPlatformRuleOverrides>>;

export const DEVICE_CAPABILITIES = Object.freeze([
  "safeArea",
  "virtualKeyboard",
  "camera",
  "qrScanner",
  "photoLibrary",
  "documentPicker",
  "haptics",
  "pushEntry",
  "deepLink",
  "offline",
  "sync",
  "networkRetry",
  "secureStorage",
  "backgroundTask",
  "permissions",
] as const);
export type DeviceCapability = (typeof DEVICE_CAPABILITIES)[number];

export interface DeviceCapabilityContract {
  readonly id: DeviceCapability;
  readonly concern:
    | "layout"
    | "input"
    | "hardware"
    | "navigation"
    | "network"
    | "storage"
    | "lifecycle"
    | "security";
  readonly platformOwner: "native" | "web" | "both";
  readonly consumerOwns: readonly OwnershipConcern[];
  readonly note: string;
}

export const DEVICE_CAPABILITY_CONTRACTS = {
  safeArea: {
    id: "safeArea",
    concern: "layout",
    platformOwner: "native",
    consumerOwns: ["routing"],
    note: "The native renderer supplies insets; the product decides which shell/content regions consume them.",
  },
  virtualKeyboard: {
    id: "virtualKeyboard",
    concern: "input",
    platformOwner: "native",
    consumerOwns: ["handlers", "persistence"],
    note: "The renderer adapts visible content and focus while the consumer owns submission and validation.",
  },
  camera: {
    id: "camera",
    concern: "hardware",
    platformOwner: "native",
    consumerOwns: ["permissions", "business-data", "handlers"],
    note: "Capability and permission failures are presented semantically; capture policy remains consumer-owned.",
  },
  qrScanner: {
    id: "qrScanner",
    concern: "hardware",
    platformOwner: "native",
    consumerOwns: ["permissions", "business-data", "handlers"],
    note: "Scanning is a native capability boundary; Ten4Seven may present scanner states without resolving the decoded business meaning.",
  },
  photoLibrary: {
    id: "photoLibrary",
    concern: "hardware",
    platformOwner: "native",
    consumerOwns: ["permissions", "persistence", "handlers"],
    note: "The native picker supplies selected media; the consumer owns storage and upload behavior.",
  },
  documentPicker: {
    id: "documentPicker",
    concern: "hardware",
    platformOwner: "native",
    consumerOwns: ["permissions", "persistence", "handlers"],
    note: "The native picker supplies a file selection; the consumer owns transport and lifecycle.",
  },
  haptics: {
    id: "haptics",
    concern: "hardware",
    platformOwner: "native",
    consumerOwns: ["handlers"],
    note: "Haptic intent is an optional renderer affordance and never replaces visual or accessible feedback.",
  },
  pushEntry: {
    id: "pushEntry",
    concern: "navigation",
    platformOwner: "native",
    consumerOwns: ["routing", "permissions", "handlers"],
    note: "Push entry can select a presentation surface; the application resolves destination and authorization.",
  },
  deepLink: {
    id: "deepLink",
    concern: "navigation",
    platformOwner: "both",
    consumerOwns: ["routing", "permissions", "handlers"],
    note: "The application resolves links and guards; the system supplies the destination presentation pattern.",
  },
  offline: {
    id: "offline",
    concern: "network",
    platformOwner: "both",
    consumerOwns: ["business-data", "persistence", "handlers"],
    note: "Connectivity truth is consumer/platform-owned; Ten4Seven owns reusable presentation vocabulary.",
  },
  sync: {
    id: "sync",
    concern: "network",
    platformOwner: "both",
    consumerOwns: [
      "business-data",
      "persistence",
      "handlers",
      "reconciliation",
    ],
    note: "The sync engine, cursor, conflict policy, and retry truth remain outside component contracts.",
  },
  networkRetry: {
    id: "networkRetry",
    concern: "network",
    platformOwner: "both",
    consumerOwns: ["handlers", "permissions"],
    note: "Retry availability may be presented, but retry policy and idempotency remain consumer-owned.",
  },
  secureStorage: {
    id: "secureStorage",
    concern: "storage",
    platformOwner: "native",
    consumerOwns: ["persistence", "permissions"],
    note: "Secure storage is a platform capability; token and component contracts never persist credentials.",
  },
  backgroundTask: {
    id: "backgroundTask",
    concern: "lifecycle",
    platformOwner: "native",
    consumerOwns: ["persistence", "handlers"],
    note: "Background scheduling and task guarantees remain application/platform policy.",
  },
  permissions: {
    id: "permissions",
    concern: "security",
    platformOwner: "both",
    consumerOwns: ["permissions", "entitlements", "effective-access"],
    note: "The system presents permission or unavailable states; it never decides entitlement or access truth.",
  },
} as const satisfies Readonly<
  Record<DeviceCapability, DeviceCapabilityContract>
>;

export const OFFLINE_SYNC_PRESENTATION_STATES = Object.freeze([
  "online",
  "offline",
  "pendingSync",
  "syncing",
  "syncFailed",
  "retryAvailable",
  "stale",
] as const);
export type OfflineSyncPresentationState =
  (typeof OFFLINE_SYNC_PRESENTATION_STATES)[number];

export interface OfflineSyncPresentationContract {
  readonly id: OfflineSyncPresentationState;
  readonly tone: "neutral" | "info" | "warning" | "danger" | "success";
  readonly announces: "none" | "polite" | "assertive";
  readonly allowsRetry: boolean;
  readonly consumerOwns: readonly OwnershipConcern[];
}

export const OFFLINE_SYNC_PRESENTATION_CONTRACT = {
  online: {
    id: "online",
    tone: "success",
    announces: "none",
    allowsRetry: false,
    consumerOwns: ["business-data", "handlers"],
  },
  offline: {
    id: "offline",
    tone: "warning",
    announces: "polite",
    allowsRetry: false,
    consumerOwns: ["business-data", "persistence", "handlers"],
  },
  pendingSync: {
    id: "pendingSync",
    tone: "info",
    announces: "polite",
    allowsRetry: false,
    consumerOwns: ["business-data", "persistence", "handlers"],
  },
  syncing: {
    id: "syncing",
    tone: "info",
    announces: "polite",
    allowsRetry: false,
    consumerOwns: ["business-data", "persistence", "handlers"],
  },
  syncFailed: {
    id: "syncFailed",
    tone: "danger",
    announces: "assertive",
    allowsRetry: true,
    consumerOwns: [
      "business-data",
      "persistence",
      "handlers",
      "reconciliation",
    ],
  },
  retryAvailable: {
    id: "retryAvailable",
    tone: "warning",
    announces: "polite",
    allowsRetry: true,
    consumerOwns: ["business-data", "handlers"],
  },
  stale: {
    id: "stale",
    tone: "warning",
    announces: "polite",
    allowsRetry: true,
    consumerOwns: ["business-data", "persistence", "handlers"],
  },
} as const satisfies Readonly<
  Record<OfflineSyncPresentationState, OfflineSyncPresentationContract>
>;

export const NAVIGATION_OWNERSHIP_BOUNDARY = {
  system: [
    "navigation presentation patterns",
    "navigation item states",
    "focus/press and accessibility obligations",
    "responsive and adaptive shell intent",
  ],
  consumer: [
    "actual routes",
    "permissions and guards",
    "deep-link resolution",
    "push-entry resolution",
    "navigation handlers",
    "business navigation logic",
  ],
} as const;

export interface DeferredNativePlatformContract {
  readonly id: string;
  readonly displayName: string;
  readonly family: ComponentFamily;
  readonly kind: "NATIVE_ONLY";
  readonly platform: "NATIVE";
  readonly rendererStrategy: "NATIVE_RENDERER";
  readonly web: RendererContract;
  readonly native: RendererContract;
  readonly semanticIntent: readonly SemanticComponentIntent[];
  readonly interactionModel: InteractionModel;
  readonly criticalStates: readonly ComponentCriticalState[];
  readonly accessibilityObligations: readonly AccessibilityObligationId[];
  readonly inputModalities: readonly InputModality[];
  readonly tokenFamilies: readonly ComponentTokenFamily[];
  readonly layoutIntents: readonly ComponentLayoutIntent[];
  readonly motionRoles: readonly MotionRole[];
  readonly capabilities: readonly DeviceCapability[];
  readonly dependencies: readonly ContractDependency[];
  readonly engineBoundary: EngineBoundary;
  readonly searchTerms: readonly string[];
}

export const DEFERRED_NATIVE_PLATFORM_CONTRACTS = {
  SafeAreaSurface: {
    id: "SafeAreaSurface",
    displayName: "Safe Area Surface",
    family: "layout",
    kind: "NATIVE_ONLY",
    platform: "NATIVE",
    rendererStrategy: "NATIVE_RENDERER",
    web: { status: "not-applicable", presentation: "not-applicable" },
    native: { status: "planned", presentation: "native-composition" },
    semanticIntent: ["layout"],
    interactionModel: "layout",
    criticalStates: ["ready", "constrained"],
    accessibilityObligations: ["structure-order", "safe-area-inset"],
    inputModalities: ["screenReader", "focus"],
    tokenFamilies: ["spacing", "sizing", "measure"],
    layoutIntents: ["safe-area-inset", "minimum-useful-surface"],
    motionRoles: ["state"],
    capabilities: ["safeArea"],
    dependencies: ["tokens"],
    engineBoundary: "renderer-implementation",
    searchTerms: ["safe area", "inset", "native shell"],
  },
  PullToRefresh: {
    id: "PullToRefresh",
    displayName: "Pull to Refresh",
    family: "action",
    kind: "NATIVE_ONLY",
    platform: "NATIVE",
    rendererStrategy: "NATIVE_RENDERER",
    web: { status: "not-applicable", presentation: "not-applicable" },
    native: { status: "planned", presentation: "native-scroll-surface" },
    semanticIntent: ["action", "feedback"],
    interactionModel: "activation",
    criticalStates: ["idle", "loading", "error", "ready", "offline"],
    accessibilityObligations: [
      "accessible-name",
      "actionable-role",
      "loading-state",
      "status-announcement",
    ],
    inputModalities: ["touch", "gesture", "screenReader", "focus"],
    tokenFamilies: ["color", "spacing", "motion", "touch-target"],
    layoutIntents: ["touch-target-minimum", "bounded-scroll-owner"],
    motionRoles: ["interaction", "state", "reveal"],
    capabilities: ["offline", "networkRetry"],
    dependencies: ["tokens", "responsive-contract"],
    engineBoundary: "renderer-implementation",
    searchTerms: ["pull refresh", "refresh gesture", "native reload"],
  },
  HapticAction: {
    id: "HapticAction",
    displayName: "Haptic Action",
    family: "action",
    kind: "NATIVE_ONLY",
    platform: "NATIVE",
    rendererStrategy: "NATIVE_RENDERER",
    web: { status: "not-applicable", presentation: "not-applicable" },
    native: { status: "planned", presentation: "native-pressable" },
    semanticIntent: ["action"],
    interactionModel: "activation",
    criticalStates: commonActionStates,
    accessibilityObligations: [
      "accessible-name",
      "actionable-role",
      "disabled-state",
      "focus-or-press-feedback",
      "hardware-capability",
    ],
    inputModalities: ["touch", "screenReader", "focus"],
    tokenFamilies: ["color", "typography", "spacing", "motion", "touch-target"],
    layoutIntents: ["measure-control", "touch-target-minimum"],
    motionRoles: ["interaction", "state"],
    capabilities: ["haptics", "permissions"],
    dependencies: ["tokens", "semantic-icons"],
    engineBoundary: "renderer-implementation",
    searchTerms: ["haptic feedback", "tactile action", "native press"],
  },
  ScannerSurface: {
    id: "ScannerSurface",
    displayName: "Scanner Surface",
    family: "media",
    kind: "NATIVE_ONLY",
    platform: "NATIVE",
    rendererStrategy: "NATIVE_RENDERER",
    web: { status: "not-applicable", presentation: "not-applicable" },
    native: { status: "planned", presentation: "native-media" },
    semanticIntent: ["media", "data-entry"],
    interactionModel: "media",
    criticalStates: ["ready", "loading", "error", "disabled", "offline"],
    accessibilityObligations: [
      "accessible-name",
      "status-announcement",
      "hardware-capability",
      "non-color-status",
    ],
    inputModalities: [
      "touch",
      "gesture",
      "screenReader",
      "focus",
      "hardwareBack",
    ],
    tokenFamilies: ["color", "typography", "spacing", "focus", "motion"],
    layoutIntents: [
      "measure-content",
      "safe-area-inset",
      "minimum-useful-surface",
    ],
    motionRoles: ["state", "enter", "exit"],
    capabilities: ["camera", "qrScanner", "permissions"],
    dependencies: ["tokens", "semantic-icons", "native-platform-controls"],
    engineBoundary: "renderer-implementation",
    searchTerms: ["scanner", "camera", "qr scan", "barcode"],
  },
} as const satisfies Readonly<Record<string, DeferredNativePlatformContract>>;

export interface ComponentContractPlane {
  readonly schemaVersion: typeof CONTRACT_SCHEMA_VERSION;
  readonly id: "component-contract-plane";
  readonly sourceOfTruth: "packages/contracts/src/component-platform.ts";
  readonly registry: {
    readonly source: "packages/ai/catalog/components.json";
    readonly canonicalSelection: "status=implemented and aliasOf is absent";
    readonly aliases: "resolved through the existing canonical alias map";
  };
  readonly platformClasses: typeof COMPONENT_PLATFORM_CLASSES;
  readonly rendererStrategies: typeof COMPONENT_RENDERER_STRATEGIES;
  readonly rendererStatuses: typeof COMPONENT_RENDERER_STATUSES;
  readonly families: typeof COMPONENT_FAMILIES;
  readonly inputModalities: typeof INPUT_MODALITIES;
  readonly accessibilityObligations: typeof ACCESSIBILITY_OBLIGATIONS;
  readonly accessibilityDefinitions: typeof ACCESSIBILITY_OBLIGATION_DEFINITIONS;
  readonly tokenFamilies: typeof TOKEN_FAMILIES;
  readonly layoutIntents: typeof LAYOUT_INTENTS;
  readonly adaptivePatterns: Readonly<
    Record<AdaptivePatternId, AdaptivePatternContract>
  >;
  readonly deviceCapabilities: typeof DEVICE_CAPABILITY_CONTRACTS;
  readonly offlineSync: typeof OFFLINE_SYNC_PRESENTATION_CONTRACT;
  readonly navigationOwnership: typeof NAVIGATION_OWNERSHIP_BOUNDARY;
  readonly ownership: ContractOwnership;
  readonly familyDefaults: Readonly<
    Record<ComponentFamily, ComponentPlatformRule>
  >;
  readonly overrides: Readonly<Record<string, ComponentPlatformRuleOverrides>>;
  readonly deferredNative: Readonly<
    Record<string, DeferredNativePlatformContract>
  >;
}

export const COMPONENT_CONTRACT_PLANE = {
  schemaVersion: CONTRACT_SCHEMA_VERSION,
  id: "component-contract-plane",
  sourceOfTruth: "packages/contracts/src/component-platform.ts",
  registry: {
    source: "packages/ai/catalog/components.json",
    canonicalSelection: "status=implemented and aliasOf is absent",
    aliases: "resolved through the existing canonical alias map",
  },
  platformClasses: COMPONENT_PLATFORM_CLASSES,
  rendererStrategies: COMPONENT_RENDERER_STRATEGIES,
  rendererStatuses: COMPONENT_RENDERER_STATUSES,
  families: COMPONENT_FAMILIES,
  inputModalities: INPUT_MODALITIES,
  accessibilityObligations: ACCESSIBILITY_OBLIGATIONS,
  accessibilityDefinitions: ACCESSIBILITY_OBLIGATION_DEFINITIONS,
  tokenFamilies: TOKEN_FAMILIES,
  layoutIntents: LAYOUT_INTENTS,
  adaptivePatterns: ADAPTIVE_PATTERN_CONTRACTS,
  deviceCapabilities: DEVICE_CAPABILITY_CONTRACTS,
  offlineSync: OFFLINE_SYNC_PRESENTATION_CONTRACT,
  navigationOwnership: NAVIGATION_OWNERSHIP_BOUNDARY,
  ownership: PLATFORM_NEUTRAL_OWNERSHIP,
  familyDefaults: COMPONENT_PLATFORM_FAMILY_DEFAULTS,
  overrides: componentPlatformOverrides,
  deferredNative: DEFERRED_NATIVE_PLATFORM_CONTRACTS,
} as const satisfies ComponentContractPlane;

export interface ComponentRegistryEntryLike {
  readonly status: string;
  readonly category: string;
  readonly level?: string;
  readonly maturity?: string;
  readonly displayName?: string;
  readonly aliasOf?: string;
}

const rendererStatus = (status: string): RendererStatus => {
  if (COMPONENT_RENDERER_STATUSES.includes(status as RendererStatus))
    return status as RendererStatus;
  if (
    status === "implemented" ||
    status === "experimental" ||
    status === "deprecated"
  )
    return status;
  return "planned";
};

const componentKind = (
  name: string,
  entry: ComponentRegistryEntryLike,
  platform: ComponentPlatform,
): ComponentClassification => {
  if (entry.aliasOf) return "ALIAS";
  if (name === "Ten4SevenProvider") return "UTILITY_OR_PROVIDER";
  if (entry.level === "foundation") return "FOUNDATION";
  if (platform === "WEB") return "WEB_ONLY";
  if (platform === "NATIVE") return "NATIVE_ONLY";
  if (platform === "ADAPTIVE") return "ADAPTIVE";
  if (
    ["ApprovalPanel", "ActionFooter", "CartPanel", "OrderSummary"].includes(
      name,
    )
  )
    return "COMPOSITE_BLOCK";
  if (entry.level === "pattern") return "RECIPE_OR_PATTERN";
  return "CANONICAL_COMPONENT";
};

const humanize = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^(.)/, (match) => match.toLowerCase());

const familyFor = (value: string): ComponentFamily => {
  if (!COMPONENT_FAMILIES.includes(value as ComponentFamily))
    throw new Error(`Unknown canonical component family: ${value}`);
  return value as ComponentFamily;
};

const adaptRule = (
  family: ComponentFamily,
  name: string,
): ComponentPlatformRule => {
  const base = COMPONENT_PLATFORM_FAMILY_DEFAULTS[family];
  const override =
    (
      componentPlatformOverrides as Readonly<
        Record<string, ComponentPlatformRuleOverrides>
      >
    )[name] ?? {};
  const merged = { ...base, ...override } as ComponentPlatformRule;
  if (merged.platform === "ADAPTIVE" && !merged.adaptivePattern)
    throw new Error(
      `Adaptive component ${name} is missing an adaptive pattern`,
    );
  return merged;
};

export function resolveComponentPlatformContract(
  name: string,
  entry: ComponentRegistryEntryLike,
  aliases: readonly string[] = [],
): ComponentPlatformContract {
  const family = familyFor(entry.category);
  const rule = adaptRule(family, name);
  const platform = rule.platform;
  const canonicalId = entry.aliasOf ?? name;
  const adaptivePattern = rule.adaptivePattern
    ? ADAPTIVE_PATTERN_CONTRACTS[rule.adaptivePattern]
    : undefined;
  if (platform === "ADAPTIVE" && !adaptivePattern)
    throw new Error(`Adaptive component ${name} resolved without a pattern`);

  const webStatus =
    platform === "NATIVE" ? "not-applicable" : rendererStatus(entry.status);
  const nativeStatus =
    platform === "WEB"
      ? "not-applicable"
      : entry.status === "deprecated"
        ? "deprecated"
        : "planned";
  const webPresentation =
    platform === "NATIVE" ? "not-applicable" : rule.webPresentation;
  const nativePresentation =
    platform === "WEB" ? "not-applicable" : rule.nativePresentation;
  const rendererStrategy =
    platform === "WEB"
      ? "NOT_APPLICABLE"
      : platform === "NATIVE"
        ? "NATIVE_RENDERER"
        : rule.rendererStrategy;

  return {
    id: name,
    canonicalId,
    displayName: entry.displayName ?? name,
    family,
    kind: componentKind(name, entry, platform),
    platform,
    rendererStrategy,
    semanticIntent: rule.semanticIntent,
    interactionModel: rule.interactionModel,
    criticalStates: rule.criticalStates,
    web: { status: webStatus, presentation: webPresentation },
    native: { status: nativeStatus, presentation: nativePresentation },
    accessibilityObligations: rule.accessibilityObligations,
    inputModalities: rule.inputModalities,
    responsiveBehavior: rule.responsiveBehavior,
    ...(adaptivePattern
      ? {
          adaptiveBehavior: {
            pattern: adaptivePattern.id,
            strategy: adaptivePattern.strategy,
            web: adaptivePattern.web.presentation,
            native: adaptivePattern.native.presentation,
            consumerOwns: adaptivePattern.consumerOwns,
          },
        }
      : {}),
    tokenFamilies: rule.tokenFamilies,
    layoutIntents: rule.layoutIntents,
    motionRoles: rule.motionRoles,
    ...(rule.nativeAlternative
      ? { nativeAlternative: rule.nativeAlternative }
      : {}),
    ...(rule.webAlternative ? { webAlternative: rule.webAlternative } : {}),
    engineBoundary: rule.engineBoundary,
    dependencies: rule.dependencies,
    aliases,
    searchTerms: [
      humanize(name),
      family,
      ...rule.semanticIntent,
      ...(adaptivePattern ? [adaptivePattern.id] : []),
    ],
  };
}
