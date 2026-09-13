import { MODULE_STATE_IDS, type ModuleStateId } from "./module-state.ts";
import { MEASURE_NAMES, type MeasureName } from "./foundation.ts";
import {
  CONTRACT_SCHEMA_VERSION,
  type Appearance,
  type BrandProfileId,
  type BrandProfileRoleSlot,
  type ChartPaletteName,
  type DensityName,
  type ElevationName,
  type InteractionState,
  type MotionPreference,
  type MotionProfileName,
  type PresentationState,
} from "./types.ts";

/**
 * Native is a renderer boundary, not a second design system. These names are
 * semantic roles that a future native renderer resolves through the existing
 * theme and token sources.
 */
export const NATIVE_COLOR_ROLES = [
  "canvas",
  "surface",
  "surfaceRaised",
  "scrim",
  "textPrimary",
  "textMuted",
  "border",
  "borderStrong",
  "focus",
  "actionPrimary",
  "actionPrimaryForeground",
  "accent",
  "actionSecondary",
  "actionSecondaryForeground",
  "actionQuiet",
  "actionDanger",
  "actionDangerForeground",
  "statusSuccess",
  "statusWarning",
  "statusDanger",
  "statusInfo",
] as const;
export type NativeColorRole = (typeof NATIVE_COLOR_ROLES)[number];

export const NATIVE_TYPOGRAPHY_INTENTS = [
  "screenTitle",
  "sectionHeading",
  "body",
  "label",
  "caption",
  "button",
  "metric",
] as const;
export type NativeTypographyIntent = (typeof NATIVE_TYPOGRAPHY_INTENTS)[number];

export const NATIVE_SPACING_ROLES = [
  "control",
  "row",
  "cardPadding",
  "sectionGap",
  "controlGap",
  "fieldGap",
  "touchTarget",
] as const;
export type NativeSpacingRole = (typeof NATIVE_SPACING_ROLES)[number];

export const NATIVE_RADIUS_ROLES = ["control", "card", "panel"] as const;
export type NativeRadiusRole = (typeof NATIVE_RADIUS_ROLES)[number];

export const NATIVE_MOTION_ROLES = [
  "fast",
  "interaction",
  "state",
  "enter",
  "exit",
  "reveal",
  "chart",
  "loop",
] as const;
export type NativeMotionRole = (typeof NATIVE_MOTION_ROLES)[number];

export const NATIVE_ACTION_INTENTS = [
  "primary",
  "secondary",
  "quiet",
  "danger",
] as const;
export type NativeActionIntent = (typeof NATIVE_ACTION_INTENTS)[number];

export const NATIVE_FIELD_STATES = [
  "default",
  "focused",
  "invalid",
  "disabled",
  "read-only",
  "pending",
] as const;
export type NativeFieldState = (typeof NATIVE_FIELD_STATES)[number];

export const NATIVE_FEEDBACK_STATES = [
  "neutral",
  "info",
  "success",
  "warning",
  "danger",
] as const;
export type NativeFeedbackState = (typeof NATIVE_FEEDBACK_STATES)[number];

export const NATIVE_SYNC_STATES = [
  "local",
  "pending",
  "syncing",
  "synced",
  "failed",
  "conflicted",
  "requires-action",
  "stale",
] as const;
export type NativeSyncState = (typeof NATIVE_SYNC_STATES)[number];

export type NativeSyncPresentationState =
  | PresentationState
  | "action-required"
  | "local"
  | "synced"
  | "syncing"
  | "stale";

export const NATIVE_ICON_SEMANTIC_NAMES = [
  "farm",
  "egg",
  "chicken",
  "inventory",
  "table",
  "pending",
  "refresh",
  "check",
  "danger",
  "warning",
  "info",
  "fileCheck",
  "settings",
  "clock",
] as const;
export type NativeIconSemanticName =
  (typeof NATIVE_ICON_SEMANTIC_NAMES)[number];

export const NATIVE_COMPONENT_IDS = [
  "provider-theme",
  "button-action",
  "input-field",
  "card-surface",
  "status-feedback",
  "farm-daily-operation",
  "offline-sync",
] as const;
export type NativeComponentId = (typeof NATIVE_COMPONENT_IDS)[number];

export type NativeTokenLayer = "semantic" | "layout" | "component" | "behavior";

export interface NativeTokenReference {
  readonly layer: NativeTokenLayer;
  readonly path: string;
}

export interface NativeActionIntentContract {
  readonly colorRole: NativeColorRole;
  readonly accessibilityRole: "button";
  readonly interactionStates: readonly InteractionState[];
}

export interface NativeFieldStateContract {
  readonly interactionState: InteractionState;
  readonly announces: "none" | "invalid" | "disabled" | "readonly" | "busy";
}

export interface NativeFeedbackStateContract {
  readonly tone: NativeFeedbackState;
  readonly icon: NativeIconSemanticName;
  readonly accessibilityRole: "status";
}

export interface NativeSyncStateContract {
  readonly presentationState: NativeSyncPresentationState;
  readonly tone: NativeFeedbackState;
  readonly icon: NativeIconSemanticName;
  readonly accessibilityRole: "status";
}

export interface NativeIconSemanticContract {
  readonly meaning: string;
}

/**
 * Renderer-neutral values emitted by the shared token runtime. The native
 * renderer consumes this data directly; it does not read CSS custom
 * properties, CSS unit strings, or Web provider output.
 */
export type NativeFontWeight = "400" | "500" | "600" | "700";
export type NativeFontFamilyRole = "ui" | "display" | "mono";

export interface NativeTypographyToken {
  readonly fontSize: number;
  readonly lineHeight: number;
  readonly fontWeight: NativeFontWeight;
  readonly letterSpacingPx: number;
  readonly familyRole: NativeFontFamilyRole;
}

/** Numeric layout bounds for native renderers; no CSS unit parsing required. */
export interface NativeResolvedMeasure {
  readonly minimumPx: number;
  readonly preferredPx: number | null;
  readonly maximumPx: number | null;
  readonly fluid: boolean;
}

export interface NativeResolvedThemeVariant {
  readonly appearance: Exclude<Appearance, "system">;
  readonly colors: Readonly<Record<NativeColorRole, string>>;
  readonly feedback: {
    readonly pressedOpacity: number;
    readonly disabledOpacity: number;
    readonly scrimOpacity: number;
  };
  readonly typography: Readonly<
    Record<NativeTypographyIntent, NativeTypographyToken>
  >;
  readonly layout: {
    readonly measures: Readonly<Record<MeasureName, NativeResolvedMeasure>>;
  };
  readonly spacing: Readonly<Record<NativeSpacingRole, number>>;
  readonly radius: Readonly<Record<NativeRadiusRole, number>>;
  readonly elevation: {
    readonly preset: ElevationName;
    readonly surface: NativeElevationLevel;
    readonly raised: NativeElevationLevel;
    readonly modal: NativeElevationLevel;
  };
  readonly chart: {
    readonly palette: ChartPaletteName;
    readonly colors: readonly string[];
  };
  readonly motion: {
    readonly enabled: boolean;
    readonly rolesMs: Readonly<Record<NativeMotionRole, number>>;
  };
  readonly touchTarget: number;
  readonly density: DensityName;
}

/** Numeric shadow/elevation values for native renderers; no CSS shadow parsing. */
export interface NativeElevationLevel {
  readonly androidElevation: number;
  readonly shadowOffsetY: number;
  readonly shadowRadius: number;
  readonly shadowOpacity: number;
}

export interface NativeResolvedProjectionContract {
  readonly sourceOfTruth: "packages/tokens/src/theme.ts";
  readonly format: "typed-js";
  readonly colors: "opaque-srgb-hex";
  readonly dimensions: "number-px";
  readonly durations: "number-ms";
  readonly cssIndependent: true;
}

export interface NativeMobileContract {
  readonly schemaVersion: typeof CONTRACT_SCHEMA_VERSION;
  readonly id: "native-mobile";
  readonly architecture: {
    readonly shared: readonly string[];
    readonly web: readonly string[];
    readonly native: readonly string[];
    readonly exclusions: readonly string[];
  };
  readonly tokenReferences: {
    readonly brand: Readonly<
      Record<BrandProfileRoleSlot, NativeTokenReference>
    >;
    readonly colors: Readonly<Record<NativeColorRole, NativeTokenReference>>;
    readonly typography: Readonly<
      Record<NativeTypographyIntent, NativeTokenReference>
    >;
    readonly layout: Readonly<Record<MeasureName, NativeTokenReference>>;
    readonly spacing: Readonly<Record<NativeSpacingRole, NativeTokenReference>>;
    readonly radius: Readonly<Record<NativeRadiusRole, NativeTokenReference>>;
    readonly motion: Readonly<Record<NativeMotionRole, NativeTokenReference>>;
    readonly touchTarget: NativeTokenReference;
  };
  readonly resolvedProjection: NativeResolvedProjectionContract;
  readonly actionIntents: Readonly<
    Record<NativeActionIntent, NativeActionIntentContract>
  >;
  readonly fieldStates: Readonly<
    Record<NativeFieldState, NativeFieldStateContract>
  >;
  readonly feedbackStates: Readonly<
    Record<NativeFeedbackState, NativeFeedbackStateContract>
  >;
  readonly moduleLifecycle: readonly ModuleStateId[];
  readonly syncStates: Readonly<
    Record<NativeSyncState, NativeSyncStateContract>
  >;
  readonly iconSemantics: Readonly<
    Record<NativeIconSemanticName, NativeIconSemanticContract>
  >;
  readonly proofSurface: {
    readonly components: readonly NativeComponentId[];
    readonly appearances: readonly Appearance[];
    readonly motionProfiles: readonly MotionProfileName[];
    readonly densityProfiles: readonly DensityName[];
    readonly accessibility: readonly string[];
    readonly ownership: readonly string[];
  };
}

const semanticColor = (path: string): NativeTokenReference => ({
  layer: "semantic",
  path,
});

const componentToken = (path: string): NativeTokenReference => ({
  layer: "component",
  path,
});

const layoutToken = (path: string): NativeTokenReference => ({
  layer: "layout",
  path,
});

const behaviorToken = (path: string): NativeTokenReference => ({
  layer: "behavior",
  path,
});

export const NATIVE_MOBILE_TOKEN_REFERENCES = {
  brand: {
    primary: semanticColor("brand.primary"),
    accent: semanticColor("brand.accent"),
    highlight: semanticColor("brand.highlight"),
    surface: semanticColor("brand.surface.deep"),
    text: semanticColor("text.ink"),
  },
  colors: {
    canvas: semanticColor("semantic.color.canvas.background"),
    surface: semanticColor("semantic.color.surface.default"),
    surfaceRaised: semanticColor("semantic.color.surface.raised"),
    scrim: semanticColor("semantic.color.scrim"),
    textPrimary: semanticColor("semantic.color.text.primary"),
    textMuted: semanticColor("semantic.color.text.muted"),
    border: semanticColor("semantic.color.border.subtle"),
    borderStrong: semanticColor("semantic.color.border.strong"),
    focus: semanticColor("semantic.color.focus"),
    actionPrimary: semanticColor("semantic.color.action.primary"),
    actionPrimaryForeground: semanticColor(
      "semantic.color.action.primaryForeground",
    ),
    accent: semanticColor("semantic.color.action.accent"),
    actionSecondary: semanticColor("semantic.color.action.secondary"),
    actionSecondaryForeground: semanticColor(
      "semantic.color.action.secondaryForeground",
    ),
    actionQuiet: semanticColor("semantic.color.action.quiet"),
    actionDanger: semanticColor("semantic.color.action.danger"),
    actionDangerForeground: semanticColor(
      "semantic.color.action.dangerForeground",
    ),
    statusSuccess: semanticColor("semantic.color.status.success"),
    statusWarning: semanticColor("semantic.color.status.warning"),
    statusDanger: semanticColor("semantic.color.status.danger"),
    statusInfo: semanticColor("semantic.color.status.info"),
  },
  typography: {
    screenTitle: semanticColor("semantic.typography.heading-lg"),
    sectionHeading: semanticColor("semantic.typography.heading-md"),
    body: semanticColor("semantic.typography.body"),
    label: semanticColor("semantic.typography.label"),
    caption: semanticColor("semantic.typography.caption"),
    button: semanticColor("semantic.typography.button"),
    metric: semanticColor("semantic.typography.metric-lg"),
  },
  layout: Object.fromEntries(
    MEASURE_NAMES.map((name) => [name, layoutToken(`layout.measure.${name}`)]),
  ) as Record<MeasureName, NativeTokenReference>,
  spacing: {
    control: componentToken("component.geometry.control.height"),
    row: componentToken("component.geometry.row.height"),
    cardPadding: componentToken("component.geometry.card.padding"),
    sectionGap: componentToken("component.geometry.section.gap"),
    controlGap: componentToken("component.geometry.control.gap"),
    fieldGap: componentToken("component.geometry.field.gap"),
    touchTarget: componentToken("component.interaction.touchTarget.minimum"),
  },
  radius: {
    control: componentToken("component.radius.control"),
    card: componentToken("component.radius.card"),
    panel: componentToken("component.radius.panel"),
  },
  motion: {
    fast: behaviorToken("behavior.motion.role.fast"),
    interaction: behaviorToken("behavior.motion.role.interaction"),
    state: behaviorToken("behavior.motion.role.state"),
    enter: behaviorToken("behavior.motion.role.enter"),
    exit: behaviorToken("behavior.motion.role.exit"),
    reveal: behaviorToken("behavior.motion.role.reveal"),
    chart: behaviorToken("behavior.motion.role.chart"),
    loop: behaviorToken("behavior.motion.role.loop"),
  },
  touchTarget: componentToken("component.interaction.touchTarget.minimum"),
} as const;

export const NATIVE_MOBILE_CONTRACT = {
  schemaVersion: CONTRACT_SCHEMA_VERSION,
  id: "native-mobile",
  architecture: {
    shared: [
      "semantic intents, presentation states, interaction states, and ownership",
      "theme profiles, brand profiles, density, typography, and motion roles",
      "named layout measures and minimum useful surface intent",
      "semantic icon names and meaning",
    ],
    web: [
      "@ten4seven/ui primitives and blocks render the shared contract with DOM/CSS",
      "existing Web provider and route behavior remain the compatibility target",
    ],
    native: [
      "@ten4seven/native resolves shared tokens and emits renderer-neutral descriptors",
      "a future Expo or React Native consumer maps descriptors to platform controls",
      "the platform owns navigation, safe areas, gestures, and native accessibility mechanics",
    ],
    exclusions: [
      "no DOM, CSS, React DOM, SVG, or Web-only package imports",
      "no native framework dependency or speculative native component library",
      "no API client, authentication, persistence, offline queue, sync cursor, or conflict engine",
      "no permissions, entitlements, business calculations, or Farm workflow authority",
    ],
  },
  tokenReferences: NATIVE_MOBILE_TOKEN_REFERENCES,
  resolvedProjection: {
    sourceOfTruth: "packages/tokens/src/theme.ts",
    format: "typed-js",
    colors: "opaque-srgb-hex",
    dimensions: "number-px",
    durations: "number-ms",
    cssIndependent: true,
  },
  actionIntents: {
    primary: {
      colorRole: "actionPrimary",
      accessibilityRole: "button",
      interactionStates: ["idle", "focus", "pressed", "disabled", "loading"],
    },
    secondary: {
      colorRole: "actionSecondary",
      accessibilityRole: "button",
      interactionStates: ["idle", "focus", "pressed", "disabled"],
    },
    quiet: {
      colorRole: "actionQuiet",
      accessibilityRole: "button",
      interactionStates: ["idle", "focus", "pressed", "disabled"],
    },
    danger: {
      colorRole: "actionDanger",
      accessibilityRole: "button",
      interactionStates: ["idle", "focus", "pressed", "disabled", "loading"],
    },
  },
  fieldStates: {
    default: { interactionState: "idle", announces: "none" },
    focused: { interactionState: "focus", announces: "none" },
    invalid: { interactionState: "invalid", announces: "invalid" },
    disabled: { interactionState: "disabled", announces: "disabled" },
    "read-only": { interactionState: "idle", announces: "readonly" },
    pending: { interactionState: "pending", announces: "busy" },
  },
  feedbackStates: {
    neutral: { tone: "neutral", icon: "info", accessibilityRole: "status" },
    info: { tone: "info", icon: "info", accessibilityRole: "status" },
    success: { tone: "success", icon: "check", accessibilityRole: "status" },
    warning: {
      tone: "warning",
      icon: "warning",
      accessibilityRole: "status",
    },
    danger: { tone: "danger", icon: "danger", accessibilityRole: "status" },
  },
  moduleLifecycle: MODULE_STATE_IDS,
  syncStates: {
    local: {
      presentationState: "local",
      tone: "neutral",
      icon: "fileCheck",
      accessibilityRole: "status",
    },
    pending: {
      presentationState: "pending",
      tone: "info",
      icon: "pending",
      accessibilityRole: "status",
    },
    syncing: {
      presentationState: "syncing",
      tone: "info",
      icon: "refresh",
      accessibilityRole: "status",
    },
    synced: {
      presentationState: "synced",
      tone: "success",
      icon: "check",
      accessibilityRole: "status",
    },
    failed: {
      presentationState: "error",
      tone: "danger",
      icon: "danger",
      accessibilityRole: "status",
    },
    conflicted: {
      presentationState: "conflicted",
      tone: "warning",
      icon: "warning",
      accessibilityRole: "status",
    },
    "requires-action": {
      presentationState: "action-required",
      tone: "warning",
      icon: "info",
      accessibilityRole: "status",
    },
    stale: {
      presentationState: "stale",
      tone: "warning",
      icon: "clock",
      accessibilityRole: "status",
    },
  },
  iconSemantics: {
    farm: { meaning: "farm or flock context" },
    egg: { meaning: "egg production or collection" },
    chicken: { meaning: "flock or poultry context" },
    inventory: { meaning: "stock and inventory context" },
    table: { meaning: "tabular data or records" },
    pending: { meaning: "work is waiting or in progress" },
    refresh: { meaning: "retry or refresh action" },
    check: { meaning: "complete, ready, or successful" },
    danger: { meaning: "error or destructive condition" },
    warning: { meaning: "attention or caution" },
    info: { meaning: "additional context or neutral status" },
    fileCheck: { meaning: "local draft or completed file state" },
    settings: { meaning: "setup or configuration" },
    clock: { meaning: "stale or time-related state" },
  },
  proofSurface: {
    components: NATIVE_COMPONENT_IDS,
    appearances: ["light", "dark", "system"],
    motionProfiles: ["minimal", "calm", "balanced", "lively"],
    densityProfiles: ["comfortable", "default", "compact", "dense"],
    accessibility: [
      "touch targets resolve from component.interaction.touchTarget.minimum",
      "native controls expose a platform screen-reader role, label, hint, and state",
      "invalid, disabled, busy, and sync states are announced without relying on color alone",
      "reduced motion disables choreography while preserving state changes and feedback",
    ],
    ownership: [
      "Ten4Seven owns semantic presentation vocabulary and token resolution",
      "the native product owns API data, auth, permissions, persistence, sync, and business rules",
    ],
  },
} as const satisfies NativeMobileContract;
