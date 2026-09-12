import type {
  AccessibilityObligationId,
  ComponentLayoutIntent,
  ComponentPlatform,
  ComponentPlatformContract,
  ComponentRendererStrategy,
  ComponentTokenFamily,
  InteractionModel,
  RendererAlternative,
  RendererContract,
} from "./component-platform.ts";
import type { ComponentClassification } from "./foundation.ts";
import type { MotionRole } from "./types.ts";
import { resolveComponentPlatformContract } from "./component-platform.ts";
import { CONTRACT_SCHEMA_VERSION } from "./types.ts";

/**
 * U06 is the typed semantic enrichment for navigation, disclosure, menus,
 * overlays, and feedback. It intentionally does not repeat the Web catalog
 * API or the U03 renderer matrix. Those remain compatibility and platform
 * sources respectively; this plane owns the intent, state, dismissal,
 * persistence, and adaptive obligations that are easy for consumers to drift.
 */

export const NAVIGATION_OVERLAY_FEEDBACK_FAMILIES = Object.freeze([
  "NAVIGATION",
  "DISCLOSURE",
  "MENU",
  "OVERLAY",
  "FEEDBACK",
] as const);
export type NavigationOverlayFeedbackFamily =
  (typeof NAVIGATION_OVERLAY_FEEDBACK_FAMILIES)[number];

export const NAVIGATION_OVERLAY_FEEDBACK_STATUSES = Object.freeze([
  "implemented",
  "variant",
  "deferred",
  "rejected",
] as const);
export type NavigationOverlayFeedbackStatus =
  (typeof NAVIGATION_OVERLAY_FEEDBACK_STATUSES)[number];

export type OverlayDismissModel =
  | "consumer-controlled"
  | "explicit-or-system-back"
  | "outside-or-system-back"
  | "outside-or-escape"
  | "timeout-or-explicit"
  | "not-applicable";

export type OverlayFocusModel =
  | "return-to-invoker"
  | "roving-items"
  | "initial-focus-and-containment"
  | "non-modal"
  | "consumer-owned"
  | "not-applicable";

export type FeedbackPersistence =
  | "transient"
  | "persistent"
  | "inspectable-history"
  | "consumer-controlled"
  | "not-applicable";

export type FeedbackUrgency =
  "polite" | "assertive" | "consumer-controlled" | "not-applicable";

export type NativePresentationStrategy =
  "SAME_INTENT" | "NATIVE_RENDERER" | "ALTERNATE_PATTERN" | "NOT_APPLICABLE";

export interface NavigationOverlayFeedbackDefinition {
  readonly canonicalComponent: string;
  readonly displayName: string;
  readonly family: NavigationOverlayFeedbackFamily;
  readonly classification: ComponentClassification;
  readonly status: Extract<NavigationOverlayFeedbackStatus, "implemented">;
  readonly intent: string;
  readonly interactionModel: InteractionModel;
  readonly states: readonly string[];
  readonly accessibility: readonly AccessibilityObligationId[];
  readonly useWhen: readonly string[];
  readonly avoidWhen: readonly string[];
  readonly tokenRoles: readonly ComponentTokenFamily[];
  readonly layoutIntents: readonly ComponentLayoutIntent[];
  readonly motionRoles: readonly MotionRole[];
  readonly dismissModel: OverlayDismissModel;
  readonly focusModel: OverlayFocusModel;
  readonly persistence: FeedbackPersistence;
  readonly urgency: FeedbackUrgency;
  readonly nativeStrategy: NativePresentationStrategy;
  readonly compatibility: readonly string[];
}

export interface ResolvedNavigationOverlayFeedbackContract extends NavigationOverlayFeedbackDefinition {
  readonly canonicalId: string;
  readonly platform: ComponentPlatform;
  readonly rendererStrategy: ComponentRendererStrategy;
  readonly web: RendererContract;
  readonly native: RendererContract;
  readonly webPresentation: ComponentPlatformContract["web"]["presentation"];
  readonly nativePresentation: ComponentPlatformContract["native"]["presentation"];
  readonly adaptivePattern?: string;
  readonly nativeAlternative?: RendererAlternative;
  readonly webAlternative?: RendererAlternative;
}

export interface NavigationOverlayFeedbackGapDecision {
  readonly id: string;
  readonly classification: Exclude<
    ComponentClassification,
    "CANONICAL_COMPONENT" | "ADAPTIVE" | "WEB_ONLY" | "NATIVE_ONLY"
  >;
  readonly status: Exclude<NavigationOverlayFeedbackStatus, "implemented">;
  readonly canonicalComponent?: string;
  readonly platform?: ComponentPlatform;
  readonly reason: string;
  readonly aiGuidance: string;
}

export const NAVIGATION_OVERLAY_FEEDBACK_LAYER_ROLES = {
  base: {
    token: "--t7-z-base",
    nativeRole: "base",
    meaning: "ordinary document and renderer content",
  },
  sticky: {
    token: "--t7-z-sticky",
    nativeRole: "sticky",
    meaning: "persistent headers and navigation affordances",
  },
  focus: {
    token: "--t7-z-focus",
    nativeRole: "focus",
    meaning: "focus feedback above the owning surface",
  },
  dropdown: {
    token: "--t7-z-dropdown",
    nativeRole: "dropdown",
    meaning: "triggered menus and selection lists",
  },
  popover: {
    token: "--t7-z-popover",
    nativeRole: "popover",
    meaning: "anchored contextual content",
  },
  tooltip: {
    token: "--t7-z-tooltip",
    nativeRole: "tooltip",
    meaning: "supplemental explanatory content",
  },
  drawer: {
    token: "--t7-z-drawer",
    nativeRole: "drawer",
    meaning: "edge-attached contextual surfaces",
  },
  overlay: {
    token: "--t7-z-overlay",
    nativeRole: "overlay",
    meaning: "shared overlay presentation root",
  },
  modal: {
    token: "--t7-z-modal",
    nativeRole: "modal",
    meaning: "modal and alert-dialog task surfaces",
  },
  toast: {
    token: "--t7-z-toast",
    nativeRole: "toast",
    meaning: "transient feedback above task surfaces",
  },
  command: {
    token: "--t7-z-command",
    nativeRole: "command",
    meaning: "keyboard-first command surfaces",
  },
} as const;

export const NAVIGATION_OWNERSHIP = {
  ten4sevenOwns: [
    "active and selected presentation",
    "grouping and hierarchy presentation",
    "responsive/adaptive shell treatment",
    "keyboard, focus, dismissal, and touch behavior",
    "semantic feedback tone, urgency, and persistence presentation",
  ],
  consumerOwns: [
    "route definition and deep-link resolution",
    "guards, permissions, entitlements, and effective access",
    "business routing decisions and handlers",
    "notification data, persistence, and event source",
    "connectivity, retry, sync, and business truth",
  ],
} as const;

export const OVERLAY_FOCUS_DISMISSAL_CONTRACT = {
  presentationRoot:
    "One renderer-owned presentation root; floating content may remain inside an open modal dialog to preserve scoped tokens and clipping boundaries.",
  modal: {
    initialFocus:
      "renderer focuses the supplied target or the first usable control",
    containment: "focus remains within the active modal task surface",
    returnFocus:
      "dismissal returns focus to the invoking control when it remains connected",
    dismiss: ["explicit close", "Escape on Web", "system back on Native"],
    scroll: "renderer owns underlay scroll locking for active modal depth",
  },
  nonModal: {
    initialFocus: "trigger or consumer-owned focus target",
    returnFocus: "interactive menus and popovers return to their trigger",
    dismiss: ["outside interaction", "Escape on Web", "system back on Native"],
    scroll:
      "the owning page remains scrollable unless the renderer surface says otherwise",
  },
  nesting:
    "The active top layer receives dismissal first; an inner popup closes before its owning modal or drawer.",
  safeArea:
    "Native renderers resolve safe-area insets; Web uses the existing semantic safe-area variables.",
} as const;

const navigationTokens = [
  "color",
  "typography",
  "spacing",
  "radius",
  "focus",
  "motion",
  "touch-target",
  "measure",
  "density",
] as const satisfies readonly ComponentTokenFamily[];
const disclosureTokens = [
  "color",
  "typography",
  "spacing",
  "radius",
  "focus",
  "motion",
  "touch-target",
  "measure",
] as const satisfies readonly ComponentTokenFamily[];
const overlayTokens = [
  "color",
  "spacing",
  "radius",
  "elevation",
  "focus",
  "motion",
  "measure",
] as const satisfies readonly ComponentTokenFamily[];
const feedbackTokens = [
  "color",
  "typography",
  "spacing",
  "radius",
  "elevation",
  "focus",
  "motion",
  "touch-target",
  "measure",
] as const satisfies readonly ComponentTokenFamily[];

const sharedCompatibility = [
  "Consumes the existing @ten4seven/ui export and catalog entry.",
  "Consumers retain ownership of route, business, persistence, and event truth.",
  "Web CSS and Native descriptors are projections of this semantic contract, not separate authorities.",
] as const;

const familyDefaults = {
  NAVIGATION: {
    classification: "ADAPTIVE",
    interactionModel: "navigation",
    states: ["idle", "focus", "selected", "expanded", "collapsed", "disabled"],
    accessibility: [
      "accessible-name",
      "navigation-role",
      "selected-state",
      "expanded-state",
      "focus-or-press-feedback",
      "keyboard-navigation",
    ],
    tokenRoles: navigationTokens,
    layoutIntents: [
      "measure-content",
      "minimum-useful-surface",
      "priority-order",
      "touch-target-minimum",
    ],
    motionRoles: ["interaction", "enter", "exit", "state"],
    dismissModel: "consumer-controlled",
    focusModel: "roving-items",
    persistence: "consumer-controlled",
    urgency: "not-applicable",
    nativeStrategy: "ALTERNATE_PATTERN",
    useWhen: ["a product surface needs destination or peer-view orientation"],
    avoidWhen: [
      "business route truth or permission logic belongs in the consumer",
    ],
  },
  DISCLOSURE: {
    classification: "CANONICAL_COMPONENT",
    interactionModel: "disclosure",
    states: ["idle", "focus", "expanded", "collapsed", "disabled"],
    accessibility: [
      "accessible-name",
      "expanded-state",
      "keyboard-navigation",
      "focus-or-press-feedback",
    ],
    tokenRoles: disclosureTokens,
    layoutIntents: [
      "measure-content",
      "minimum-useful-surface",
      "touch-target-minimum",
    ],
    motionRoles: ["interaction", "state", "reveal"],
    dismissModel: "consumer-controlled",
    focusModel: "roving-items",
    persistence: "consumer-controlled",
    urgency: "not-applicable",
    nativeStrategy: "SAME_INTENT",
    useWhen: ["short related content needs progressive disclosure"],
    avoidWhen: ["long workflows or route-level navigation"],
  },
  MENU: {
    classification: "ADAPTIVE",
    interactionModel: "selection",
    states: ["idle", "focus", "selected", "expanded", "disabled"],
    accessibility: [
      "accessible-name",
      "actionable-role",
      "selected-state",
      "keyboard-navigation",
      "focus-return",
      "dismissal",
    ],
    tokenRoles: overlayTokens,
    layoutIntents: [
      "measure-compact",
      "minimum-useful-surface",
      "touch-target-minimum",
    ],
    motionRoles: ["interaction", "enter", "exit"],
    dismissModel: "outside-or-escape",
    focusModel: "roving-items",
    persistence: "transient",
    urgency: "not-applicable",
    nativeStrategy: "ALTERNATE_PATTERN",
    useWhen: ["a bounded action or choice set is attached to a trigger"],
    avoidWhen: [
      "essential actions need to remain visible or a workflow is long",
    ],
  },
  OVERLAY: {
    classification: "ADAPTIVE",
    interactionModel: "overlay",
    states: ["idle", "focus", "expanded", "collapsed", "disabled", "loading"],
    accessibility: [
      "accessible-name",
      "labelled-surface",
      "focus-containment",
      "focus-return",
      "dismissal",
      "focus-or-press-feedback",
    ],
    tokenRoles: overlayTokens,
    layoutIntents: [
      "measure-content",
      "measure-wide",
      "bounded-scroll-owner",
      "touch-target-minimum",
      "safe-area-inset",
    ],
    motionRoles: ["enter", "exit", "state"],
    dismissModel: "explicit-or-system-back",
    focusModel: "initial-focus-and-containment",
    persistence: "consumer-controlled",
    urgency: "not-applicable",
    nativeStrategy: "ALTERNATE_PATTERN",
    useWhen: ["content needs a temporary contextual or task surface"],
    avoidWhen: ["a route or persistent page surface is the clearer context"],
  },
  FEEDBACK: {
    classification: "CANONICAL_COMPONENT",
    interactionModel: "feedback",
    states: [
      "ready",
      "loading",
      "empty",
      "error",
      "offline",
      "pendingSync",
      "syncing",
      "syncFailed",
      "retryAvailable",
    ],
    accessibility: [
      "accessible-name",
      "status-announcement",
      "non-color-status",
      "focus-or-press-feedback",
    ],
    tokenRoles: feedbackTokens,
    layoutIntents: [
      "measure-content",
      "minimum-useful-surface",
      "touch-target-minimum",
    ],
    motionRoles: ["state", "enter", "exit", "reveal"],
    dismissModel: "consumer-controlled",
    focusModel: "consumer-owned",
    persistence: "consumer-controlled",
    urgency: "polite",
    nativeStrategy: "NATIVE_RENDERER",
    useWhen: [
      "a product needs semantic status, recovery, progress, or event feedback",
    ],
    avoidWhen: [
      "the message would become business truth, routing, or a data source",
    ],
  },
} as const;

type DefinitionOverrides = Partial<
  Omit<
    NavigationOverlayFeedbackDefinition,
    "canonicalComponent" | "displayName" | "family" | "status"
  >
>;

const define = (
  canonicalComponent: string,
  displayName: string,
  family: NavigationOverlayFeedbackFamily,
  intent: string,
  overrides: DefinitionOverrides = {},
) =>
  ({
    ...familyDefaults[family],
    ...overrides,
    canonicalComponent,
    displayName,
    family,
    intent,
    status: "implemented",
    compatibility: overrides.compatibility ?? sharedCompatibility,
  }) as const satisfies NavigationOverlayFeedbackDefinition;

export const NAVIGATION_OVERLAY_FEEDBACK_DEFINITIONS = {
  Sidebar: define(
    "Sidebar",
    "Sidebar",
    "NAVIGATION",
    "Present persistent or collapsible application destinations.",
    {
      useWhen: ["dense operational and ERP shells"],
      avoidWhen: [
        "small public navigation or mobile-only primary destinations",
      ],
    },
  ),
  SidebarGroup: define(
    "SidebarGroup",
    "Sidebar Group",
    "NAVIGATION",
    "Group related destinations under one navigation hierarchy.",
    { classification: "CANONICAL_COMPONENT", nativeStrategy: "SAME_INTENT" },
  ),
  NavigationMenu: define(
    "NavigationMenu",
    "Navigation Menu",
    "NAVIGATION",
    "Present public or commerce navigation with bounded nested branches.",
    { useWhen: ["public and commerce headers with a small grouped link set"] },
  ),
  TopNavigation: define(
    "TopNavigation",
    "Top Navigation",
    "NAVIGATION",
    "Present a horizontal application or public destination set.",
  ),
  BottomNavigation: define(
    "BottomNavigation",
    "Bottom Navigation",
    "NAVIGATION",
    "Present a bounded mobile-primary destination set with safe-area treatment.",
    {
      layoutIntents: [
        "measure-content",
        "minimum-useful-surface",
        "touch-target-minimum",
        "safe-area-inset",
      ],
    },
  ),
  NavigationRail: define(
    "NavigationRail",
    "Navigation Rail",
    "NAVIGATION",
    "Present a compact desktop rail as a sidebar state, never as a mobile parity target.",
  ),
  MobileSidebar: define(
    "MobileSidebar",
    "Mobile Sidebar",
    "NAVIGATION",
    "Reveal application navigation in an adaptive mobile drawer.",
    {
      focusModel: "initial-focus-and-containment",
      dismissModel: "explicit-or-system-back",
    },
  ),
  Breadcrumb: define(
    "Breadcrumb",
    "Breadcrumb",
    "NAVIGATION",
    "Communicate route ancestry and current-page context.",
    { nativeStrategy: "ALTERNATE_PATTERN", focusModel: "consumer-owned" },
  ),
  SectionNavigation: define(
    "SectionNavigation",
    "Section Navigation",
    "NAVIGATION",
    "Move between sections inside one long page or workspace.",
    { nativeStrategy: "ALTERNATE_PATTERN" },
  ),
  Tabs: define(
    "Tabs",
    "Tabs",
    "NAVIGATION",
    "Switch between bounded peer panels in one context.",
    {
      classification: "CANONICAL_COMPONENT",
      nativeStrategy: "SAME_INTENT",
      focusModel: "roving-items",
    },
  ),
  Pagination: define(
    "Pagination",
    "Pagination",
    "NAVIGATION",
    "Move through a bounded set of result pages.",
    {
      nativeStrategy: "ALTERNATE_PATTERN",
      layoutIntents: [
        "measure-content",
        "priority-order",
        "touch-target-minimum",
      ],
    },
  ),
  Stepper: define(
    "Stepper",
    "Stepper",
    "NAVIGATION",
    "Guide an interactive ordered multi-step task.",
    {
      classification: "CANONICAL_COMPONENT",
      nativeStrategy: "SAME_INTENT",
      useWhen: ["short form, checkout, or setup workflows"],
      avoidWhen: ["read-only lifecycle status; use MilestoneTracker"],
    },
  ),
  MilestoneTracker: define(
    "MilestoneTracker",
    "Milestone Tracker",
    "NAVIGATION",
    "Present read/inspect lifecycle progression and the current stage.",
    {
      nativeStrategy: "ALTERNATE_PATTERN",
      focusModel: "consumer-owned",
      useWhen: ["short operational lifecycle or approval progression"],
      avoidWhen: ["interactive form steps or unbounded project planning"],
    },
  ),
  CommandMenu: define(
    "CommandMenu",
    "Command Menu",
    "NAVIGATION",
    "Provide keyboard-first search and execution of bounded commands.",
    {
      nativeStrategy: "ALTERNATE_PATTERN",
      focusModel: "initial-focus-and-containment",
      dismissModel: "explicit-or-system-back",
    },
  ),
  Accordion: define(
    "Accordion",
    "Accordion",
    "DISCLOSURE",
    "Progressively disclose a collection of related sections.",
    {
      classification: "CANONICAL_COMPONENT",
      useWhen: ["short FAQ, settings, or supporting sections"],
      avoidWhen: ["long workflows or route navigation"],
    },
  ),
  Collapsible: define(
    "Collapsible",
    "Collapsible",
    "DISCLOSURE",
    "Show or hide one bounded optional region.",
    {
      classification: "CANONICAL_COMPONENT",
      useWhen: ["one optional settings, filter, or supporting section"],
    },
  ),
  DropdownMenu: define(
    "DropdownMenu",
    "Dropdown Menu",
    "MENU",
    "Present a bounded action or choice menu from a trigger.",
  ),
  ContextMenu: define(
    "ContextMenu",
    "Context Menu",
    "MENU",
    "Present contextual actions from a pointer or keyboard context gesture.",
    {
      nativeStrategy: "ALTERNATE_PATTERN",
      useWhen: [
        "desktop power workflows with non-essential contextual actions",
      ],
      avoidWhen: ["touch-primary flows or actions that must remain visible"],
    },
  ),
  Dialog: define(
    "Dialog",
    "Dialog",
    "OVERLAY",
    "Present focused content or a task in a labelled modal surface.",
    {
      useWhen: [
        "focused tasks, forms, acknowledgement, or non-destructive confirmation",
      ],
      avoidWhen: [
        "irreversible decisions; use AlertDialog",
        "long workflows needing a route",
      ],
      nativeStrategy: "ALTERNATE_PATTERN",
    },
  ),
  AlertDialog: define(
    "AlertDialog",
    "Alert Dialog",
    "OVERLAY",
    "Require an explicit decision for destructive or high-impact actions.",
    {
      useWhen: [
        "destructive confirmation, irreversible action, critical acknowledgement",
      ],
      avoidWhen: ["ordinary information or passive feedback"],
      nativeStrategy: "ALTERNATE_PATTERN",
    },
  ),
  Drawer: define(
    "Drawer",
    "Drawer",
    "OVERLAY",
    "Present an edge-attached contextual, navigation, or work surface.",
    {
      nativeStrategy: "ALTERNATE_PATTERN",
      dismissModel: "explicit-or-system-back",
    },
  ),
  DetailDrawer: define(
    "DetailDrawer",
    "Detail Drawer",
    "OVERLAY",
    "Inspect a selected record while retaining the parent route context.",
    {
      nativeStrategy: "ALTERNATE_PATTERN",
      useWhen: ["row quick view and master-detail inspection"],
    },
  ),
  Popover: define(
    "Popover",
    "Popover",
    "OVERLAY",
    "Present dismissible anchored interactive content.",
    {
      nativeStrategy: "ALTERNATE_PATTERN",
      dismissModel: "outside-or-escape",
      focusModel: "return-to-invoker",
    },
  ),
  Tooltip: define(
    "Tooltip",
    "Tooltip",
    "OVERLAY",
    "Present short supplemental hover or focus help.",
    {
      classification: "WEB_ONLY",
      nativeStrategy: "NOT_APPLICABLE",
      dismissModel: "outside-or-escape",
      focusModel: "non-modal",
      persistence: "transient",
      urgency: "not-applicable",
      accessibility: [
        "accessible-name",
        "supplemental-description",
        "non-hover-alternative",
        "focus-or-press-feedback",
      ],
    },
  ),
  Alert: define(
    "Alert",
    "Alert",
    "FEEDBACK",
    "Present persistent in-context feedback with optional recovery action.",
    {
      classification: "CANONICAL_COMPONENT",
      persistence: "persistent",
      urgency: "consumer-controlled",
    },
  ),
  Banner: define(
    "Banner",
    "Banner",
    "FEEDBACK",
    "Present important page or shell-wide information such as offline or maintenance state.",
    {
      classification: "CANONICAL_COMPONENT",
      persistence: "persistent",
      urgency: "consumer-controlled",
      layoutIntents: [
        "measure-wide",
        "minimum-useful-surface",
        "touch-target-minimum",
      ],
    },
  ),
  ToastProvider: define(
    "ToastProvider",
    "Toast Provider",
    "FEEDBACK",
    "Own one canonical transient feedback queue for the provider tree.",
    {
      classification: "UTILITY_OR_PROVIDER",
      persistence: "transient",
      urgency: "polite",
      focusModel: "consumer-owned",
    },
  ),
  Toaster: define(
    "Toaster",
    "Toaster",
    "FEEDBACK",
    "Render the provider-owned transient feedback viewport.",
    {
      classification: "UTILITY_OR_PROVIDER",
      persistence: "transient",
      urgency: "polite",
      focusModel: "consumer-owned",
    },
  ),
  Toast: define(
    "Toast",
    "Toast",
    "FEEDBACK",
    "Present brief transient feedback after an action or event.",
    {
      classification: "CANONICAL_COMPONENT",
      persistence: "transient",
      urgency: "consumer-controlled",
      dismissModel: "timeout-or-explicit",
    },
  ),
  Notification: define(
    "Notification",
    "Notification",
    "FEEDBACK",
    "Present one persisted or inspectable event item with read state and optional action.",
    {
      classification: "CANONICAL_COMPONENT",
      persistence: "inspectable-history",
      urgency: "consumer-controlled",
      dismissModel: "consumer-controlled",
    },
  ),
  NotificationCenter: define(
    "NotificationCenter",
    "Notification Center",
    "FEEDBACK",
    "Present a bounded inspectable notification collection with read and clear actions.",
    {
      classification: "ADAPTIVE",
      nativeStrategy: "ALTERNATE_PATTERN",
      persistence: "inspectable-history",
      urgency: "consumer-controlled",
      dismissModel: "explicit-or-system-back",
      focusModel: "initial-focus-and-containment",
      layoutIntents: [
        "measure-content",
        "minimum-useful-surface",
        "bounded-scroll-owner",
        "touch-target-minimum",
      ],
    },
  ),
  EmptyState: define(
    "EmptyState",
    "Empty State",
    "FEEDBACK",
    "Explain a global or filtered empty result with optional recovery actions.",
    {
      classification: "CANONICAL_COMPONENT",
      persistence: "consumer-controlled",
      urgency: "polite",
    },
  ),
  StateView: define(
    "StateView",
    "State View",
    "FEEDBACK",
    "Present an empty, error, permission, or unavailable screen state.",
    {
      classification: "CANONICAL_COMPONENT",
      persistence: "consumer-controlled",
      urgency: "consumer-controlled",
    },
  ),
  Skeleton: define(
    "Skeleton",
    "Skeleton",
    "FEEDBACK",
    "Approximate known content shape while data is loading.",
    {
      classification: "CANONICAL_COMPONENT",
      persistence: "not-applicable",
      urgency: "not-applicable",
      dismissModel: "not-applicable",
      focusModel: "not-applicable",
    },
  ),
  Spinner: define(
    "Spinner",
    "Spinner",
    "FEEDBACK",
    "Announce an indeterminate short loading operation.",
    {
      classification: "CANONICAL_COMPONENT",
      persistence: "not-applicable",
      urgency: "polite",
      dismissModel: "not-applicable",
      focusModel: "not-applicable",
    },
  ),
  Progress: define(
    "Progress",
    "Progress",
    "FEEDBACK",
    "Present determinate or indeterminate progress without inventing a percentage.",
    {
      classification: "CANONICAL_COMPONENT",
      persistence: "not-applicable",
      urgency: "polite",
      dismissModel: "not-applicable",
      focusModel: "not-applicable",
    },
  ),
  CircularProgress: define(
    "CircularProgress",
    "Circular Progress",
    "FEEDBACK",
    "Present compact determinate progress when a circular signal fits the surface.",
    {
      classification: "CANONICAL_COMPONENT",
      persistence: "not-applicable",
      urgency: "polite",
      dismissModel: "not-applicable",
      focusModel: "not-applicable",
    },
  ),
} as const satisfies Readonly<
  Record<string, NavigationOverlayFeedbackDefinition>
>;

export const NAVIGATION_OVERLAY_FEEDBACK_GAP_DECISIONS = {
  Disclosure: {
    id: "Disclosure",
    classification: "COMPONENT_VARIANT",
    status: "variant",
    canonicalComponent: "Collapsible",
    reason:
      "The generic open/closed disclosure intent is already represented by Collapsible.",
    aiGuidance:
      "Use Collapsible for one region; use Accordion for a collection. Do not create a Disclosure wrapper per product.",
  },
  TreeDisclosure: {
    id: "TreeDisclosure",
    classification: "COMPONENT_VARIANT",
    status: "variant",
    canonicalComponent: "TreeView",
    reason:
      "Hierarchy expansion owns level, position, and selection semantics that Accordion does not.",
    aiGuidance:
      "Use TreeView for hierarchy disclosure; do not flatten tree expansion into Accordion.",
  },
  Menubar: {
    id: "Menubar",
    classification: "DEFERRED",
    status: "deferred",
    platform: "WEB",
    reason:
      "The current canonical menu engine supports bounded dropdown and context actions; persistent hierarchical desktop menubar behavior needs a separate bounded proof.",
    aiGuidance:
      "Use NavigationMenu or DropdownMenu for current coverage. Do not invent a local menubar.",
  },
  Menu: {
    id: "Menu",
    classification: "COMPONENT_VARIANT",
    status: "variant",
    canonicalComponent: "DropdownMenu",
    reason:
      "Menu is the shared action-item contract underneath DropdownMenu and ContextMenu, not a third visual primitive.",
    aiGuidance:
      "Use DropdownMenu for a trigger-attached action menu and ContextMenu for contextual invocation.",
  },
  Sheet: {
    id: "Sheet",
    classification: "COMPONENT_VARIANT",
    status: "variant",
    canonicalComponent: "Drawer",
    reason:
      "Drawer already owns edge-attached surface mechanics; bottom placement is a semantic presentation variant sharing the same overlay engine.",
    aiGuidance:
      "Use Drawer with the appropriate side/presentation. Do not create a second Sheet runtime.",
  },
  BottomSheet: {
    id: "BottomSheet",
    classification: "COMPONENT_VARIANT",
    status: "variant",
    canonicalComponent: "Drawer",
    reason:
      "Native bottom-sheet presentation is a renderer strategy for Drawer, not a separate Web primitive.",
    aiGuidance:
      "Use Drawer intent with a Native bottom-sheet renderer when the platform calls for it.",
  },
  HoverCard: {
    id: "HoverCard",
    classification: "DEFERRED",
    status: "deferred",
    platform: "WEB",
    reason:
      "Rich preview content needs a bounded content contract and a deliberate press alternative before implementation.",
    aiGuidance:
      "Use Popover for interactive anchored content. Do not fake hover-only behavior on Native.",
  },
  Snackbar: {
    id: "Snackbar",
    classification: "ALIAS",
    status: "variant",
    canonicalComponent: "Toast",
    reason:
      "Snackbar is the platform presentation name for the same transient feedback intent.",
    aiGuidance:
      "Use Toast semantics; Native may render the same event as a platform Snackbar.",
  },
  InlineNotice: {
    id: "InlineNotice",
    classification: "COMPONENT_VARIANT",
    status: "variant",
    canonicalComponent: "Alert",
    reason:
      "The existing Alert owns persistent in-context feedback; emphasis and tone are presentation choices.",
    aiGuidance:
      "Use Alert for local notices instead of creating a product-specific notice primitive.",
  },
  LoadingState: {
    id: "LoadingState",
    classification: "COMPONENT_VARIANT",
    status: "variant",
    canonicalComponent: "StateView",
    reason:
      "Loading grammar is already covered by Spinner, Skeleton, and the module-state plane.",
    aiGuidance:
      "Choose Spinner or Skeleton for local work and ModuleState for module lifecycle; do not create LoadingState by route.",
  },
  ErrorState: {
    id: "ErrorState",
    classification: "COMPONENT_VARIANT",
    status: "variant",
    canonicalComponent: "StateView",
    reason:
      "StateView already covers recoverable error presentation with consumer-owned retry action.",
    aiGuidance:
      "Use StateView for a screen state or Alert for local recovery; keep error truth with the consumer.",
  },
  StatusIndicator: {
    id: "StatusIndicator",
    classification: "COMPONENT_VARIANT",
    status: "variant",
    canonicalComponent: "StatusChip",
    reason:
      "StatusChip already provides compact non-color status presentation.",
    aiGuidance:
      "Use StatusChip for compact state and a feedback component when a message or recovery action is needed.",
  },
  InfiniteScroll: {
    id: "InfiniteScroll",
    classification: "DEFERRED",
    status: "deferred",
    reason:
      "Incremental collection loading is a U07 collection concern and must not be mixed into Pagination.",
    aiGuidance:
      "Use Pagination for bounded pages; defer infinite loading to the collection contract.",
  },
} as const satisfies Readonly<
  Record<string, NavigationOverlayFeedbackGapDecision>
>;

export interface NavigationOverlayFeedbackPlane {
  readonly schemaVersion: typeof CONTRACT_SCHEMA_VERSION;
  readonly id: "navigation-overlay-feedback";
  readonly sourceOfTruth: "packages/contracts/src/navigation-overlay-feedback.ts";
  readonly platformSourceOfTruth: "packages/contracts/src/component-platform.ts";
  readonly tokenSourceOfTruth: "packages/tokens/src/theme.ts";
  readonly taxonomy: {
    readonly families: typeof NAVIGATION_OVERLAY_FEEDBACK_FAMILIES;
    readonly statuses: typeof NAVIGATION_OVERLAY_FEEDBACK_STATUSES;
  };
  readonly ownership: typeof NAVIGATION_OWNERSHIP;
  readonly layers: typeof NAVIGATION_OVERLAY_FEEDBACK_LAYER_ROLES;
  readonly focusDismissal: typeof OVERLAY_FOCUS_DISMISSAL_CONTRACT;
  readonly components: typeof NAVIGATION_OVERLAY_FEEDBACK_DEFINITIONS;
  readonly gapDecisions: typeof NAVIGATION_OVERLAY_FEEDBACK_GAP_DECISIONS;
  readonly compatibility: readonly string[];
}

export const NAVIGATION_OVERLAY_FEEDBACK_PLANE = {
  schemaVersion: CONTRACT_SCHEMA_VERSION,
  id: "navigation-overlay-feedback",
  sourceOfTruth: "packages/contracts/src/navigation-overlay-feedback.ts",
  platformSourceOfTruth: "packages/contracts/src/component-platform.ts",
  tokenSourceOfTruth: "packages/tokens/src/theme.ts",
  taxonomy: {
    families: NAVIGATION_OVERLAY_FEEDBACK_FAMILIES,
    statuses: NAVIGATION_OVERLAY_FEEDBACK_STATUSES,
  },
  ownership: NAVIGATION_OWNERSHIP,
  layers: NAVIGATION_OVERLAY_FEEDBACK_LAYER_ROLES,
  focusDismissal: OVERLAY_FOCUS_DISMISSAL_CONTRACT,
  components: NAVIGATION_OVERLAY_FEEDBACK_DEFINITIONS,
  gapDecisions: NAVIGATION_OVERLAY_FEEDBACK_GAP_DECISIONS,
  compatibility: [
    "Modal remains exported as a compatibility wrapper for Dialog.",
    "ActionMenu remains the existing alias of DropdownMenu.",
    "Snackbar, InlineNotice, LoadingState, ErrorState, and StatusIndicator remain semantic variants rather than parallel primitives.",
    "ActivityFeed remains a data/audit feed; NotificationCenter owns persisted inspectable event presentation.",
    "Native renderers may choose drawer, sheet, snackbar, or screen presentation while preserving shared intent and state vocabulary.",
  ],
} as const satisfies NavigationOverlayFeedbackPlane;

export function resolveNavigationOverlayFeedbackContract(
  name: string,
  component: ComponentPlatformContract,
): ResolvedNavigationOverlayFeedbackContract | undefined {
  const definition = (
    NAVIGATION_OVERLAY_FEEDBACK_DEFINITIONS as Readonly<
      Record<string, NavigationOverlayFeedbackDefinition>
    >
  )[name];
  if (!definition) return undefined;
  return {
    ...definition,
    canonicalId: component.canonicalId,
    platform: component.platform,
    rendererStrategy: component.rendererStrategy,
    web: component.web,
    native: component.native,
    webPresentation: component.web.presentation,
    nativePresentation: component.native.presentation,
    ...(component.adaptiveBehavior
      ? { adaptivePattern: component.adaptiveBehavior.pattern }
      : {}),
    ...(component.nativeAlternative
      ? { nativeAlternative: component.nativeAlternative }
      : {}),
    ...(component.webAlternative
      ? { webAlternative: component.webAlternative }
      : {}),
  };
}

export function resolveNavigationOverlayFeedbackFromRegistry(
  name: string,
  entry: {
    readonly status: string;
    readonly category: string;
    readonly aliasOf?: string;
    readonly displayName?: string;
  },
  aliases: readonly string[] = [],
) {
  const platform = resolveComponentPlatformContract(name, entry, aliases);
  return resolveNavigationOverlayFeedbackContract(name, platform);
}
