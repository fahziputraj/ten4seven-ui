import {
  COMPONENT_RENDERER_STRATEGIES,
  type ComponentRendererStrategy,
  type ComponentPlatform,
} from "./component-platform.ts";
import { BRAND_PROFILE_IDS } from "./brand-profile.ts";
import type { BrandProfileId } from "./types.ts";
import { TOKEN_RESOLUTION_ORDER } from "./foundation.ts";
import { OFFLINE_SYNC_PRESENTATION_STATES } from "./component-platform.ts";

/**
 * U12 owns the native renderer and device-capability contract, not a second
 * visual language. Values are resolved by the existing token/profile runtime;
 * this module records the renderer-neutral strategy and evidence boundary.
 */

export const NATIVE_EXPO_EXECUTION_MODES = [
  "EXPO_GO",
  "DEV_CLIENT_REQUIRED",
  "SIMULATOR_ONLY",
  "DEVICE_REQUIRED",
] as const;
export type NativeExpoExecutionMode =
  (typeof NATIVE_EXPO_EXECUTION_MODES)[number];

export const NATIVE_RENDERER_MATURITIES = [
  "NONE",
  "PLACEHOLDER",
  "CONTRACT_ONLY",
  "PARTIAL_RENDERER",
  "FUNCTIONAL_CANARY",
  "MATURE_FAMILY_COVERAGE",
] as const;
export type NativeRendererMaturity =
  (typeof NATIVE_RENDERER_MATURITIES)[number];

export const NATIVE_PARITY_LEVELS = [
  "FULL",
  "FUNCTIONAL",
  "PARTIAL",
  "ALTERNATE_PATTERN",
  "NOT_APPLICABLE",
  "PLANNED",
] as const;
export type NativeParityLevel = (typeof NATIVE_PARITY_LEVELS)[number];

export const NATIVE_CAPABILITY_STATES = [
  "permission-required",
  "denied",
  "unavailable",
  "ready",
  "active",
  "detected",
  "success",
  "error",
  "canceled",
  "online",
  "offline",
  "pendingSync",
  "syncing",
  "synced",
  "syncFailed",
  "retry",
  "loading",
  "invalid",
] as const;
export type NativeCapabilityState = (typeof NATIVE_CAPABILITY_STATES)[number];

/**
 * Native surfaces expose an explicit `synced` presentation state while still
 * accepting the shared offline/sync vocabulary used by Web contracts.
 */
export const NATIVE_EXPO_SYNC_PRESENTATION_STATES = [
  ...OFFLINE_SYNC_PRESENTATION_STATES,
  "synced",
] as const;
export type NativeExpoSyncPresentationState =
  (typeof NATIVE_EXPO_SYNC_PRESENTATION_STATES)[number];

export const NATIVE_DEVICE_CAPABILITY_IDS = [
  "safeArea",
  "virtualKeyboard",
  "camera",
  "qrScanner",
  "documentPicker",
  "photoLibrary",
  "permissions",
  "location",
  "haptics",
  "pushEntry",
  "deepLink",
  "offline",
  "sync",
  "networkRetry",
  "secureStorage",
  "backgroundTask",
  "orientation",
  "fontScale",
] as const;
export type NativeDeviceCapabilityId =
  (typeof NATIVE_DEVICE_CAPABILITY_IDS)[number];

export interface NativeDeviceCapabilityContract {
  readonly id: NativeDeviceCapabilityId;
  readonly classification: "NATIVE_ONLY" | "ADAPTIVE" | "UTILITY_OR_PROVIDER";
  readonly platform: ComponentPlatform;
  readonly rendererStrategy: ComponentRendererStrategy;
  readonly executionMode: NativeExpoExecutionMode;
  readonly primitive: string;
  readonly states: readonly NativeCapabilityState[];
  readonly presentation: string;
  readonly ten4SevenOwns: readonly string[];
  readonly consumerOwns: readonly string[];
  readonly accessibility: readonly string[];
  readonly noBusinessLogic: true;
}

const capability = (
  value: NativeDeviceCapabilityContract,
): NativeDeviceCapabilityContract => value;

export const NATIVE_DEVICE_CAPABILITY_CONTRACTS = {
  safeArea: capability({
    id: "safeArea",
    classification: "NATIVE_ONLY",
    platform: "NATIVE",
    rendererStrategy: "NATIVE_RENDERER",
    executionMode: "EXPO_GO",
    primitive: "react-native-safe-area-context",
    states: ["ready", "unavailable"],
    presentation:
      "Inset-aware shell, sticky actions, sheets, toast, and full-screen surfaces.",
    ten4SevenOwns: ["safe-area composition intent", "inset-aware spacing"],
    consumerOwns: ["route and surface selection"],
    accessibility: [
      "Keep headings, content, and actions within the readable inset region.",
    ],
    noBusinessLogic: true,
  }),
  virtualKeyboard: capability({
    id: "virtualKeyboard",
    classification: "NATIVE_ONLY",
    platform: "NATIVE",
    rendererStrategy: "NATIVE_RENDERER",
    executionMode: "EXPO_GO",
    primitive: "KeyboardAvoidingView / ScrollView / TextInput",
    states: ["ready", "active", "unavailable"],
    presentation:
      "Focused fields and action rows remain reachable while the keyboard is visible.",
    ten4SevenOwns: ["keyboard-safe composition", "focus and dismissal intent"],
    consumerOwns: ["validation", "submission", "persistence"],
    accessibility: [
      "Keep the focused field labelled and the primary action reachable.",
    ],
    noBusinessLogic: true,
  }),
  camera: capability({
    id: "camera",
    classification: "NATIVE_ONLY",
    platform: "NATIVE",
    rendererStrategy: "NATIVE_RENDERER",
    executionMode: "DEV_CLIENT_REQUIRED",
    primitive: "expo-camera adapter behind CameraCapture contract",
    states: [
      "permission-required",
      "denied",
      "ready",
      "active",
      "success",
      "error",
      "canceled",
    ],
    presentation:
      "Permission, launch, capture, retake, use-result, loading, and error states.",
    ten4SevenOwns: ["capture surface presentation", "state and action labels"],
    consumerOwns: [
      "permission request",
      "camera lifecycle",
      "persistence",
      "upload",
      "validation",
    ],
    accessibility: [
      "Camera actions have labels and a non-camera path for important tasks.",
    ],
    noBusinessLogic: true,
  }),
  qrScanner: capability({
    id: "qrScanner",
    classification: "NATIVE_ONLY",
    platform: "NATIVE",
    rendererStrategy: "NATIVE_RENDERER",
    executionMode: "DEV_CLIENT_REQUIRED",
    primitive: "expo-camera/scanner adapter behind ScannerSurface contract",
    states: [
      "permission-required",
      "denied",
      "ready",
      "active",
      "detected",
      "invalid",
      "success",
      "error",
      "canceled",
    ],
    presentation:
      "Generic scanner frame with permission, ready, scanning, detected, invalid, success, error, and cancel states.",
    ten4SevenOwns: [
      "ScannerSurface state presentation",
      "generic captured-value handoff",
    ],
    consumerOwns: [
      "payload interpretation",
      "business validation",
      "navigation",
      "persistence",
    ],
    accessibility: [
      "Provide a labelled scan action and manual entry alternative.",
    ],
    noBusinessLogic: true,
  }),
  documentPicker: capability({
    id: "documentPicker",
    classification: "ADAPTIVE",
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    executionMode: "EXPO_GO",
    primitive: "expo-document-picker adapter behind FileUpload contract",
    states: ["ready", "loading", "success", "error", "canceled"],
    presentation: "Document-source action or native document picker entry.",
    ten4SevenOwns: ["source-choice presentation", "selected-file state"],
    consumerOwns: ["picker API", "file persistence", "upload", "validation"],
    accessibility: [
      "Document source actions expose labels, type, and result state.",
    ],
    noBusinessLogic: true,
  }),
  photoLibrary: capability({
    id: "photoLibrary",
    classification: "ADAPTIVE",
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    executionMode: "EXPO_GO",
    primitive: "expo-image-picker adapter behind FileUpload contract",
    states: [
      "permission-required",
      "denied",
      "ready",
      "success",
      "error",
      "canceled",
    ],
    presentation:
      "Image-library source action with permission and selected-media state.",
    ten4SevenOwns: ["source-choice presentation", "selected-media state"],
    consumerOwns: [
      "picker API",
      "persistence",
      "upload",
      "business validation",
    ],
    accessibility: [
      "Image source and selected result expose accessible labels.",
    ],
    noBusinessLogic: true,
  }),
  permissions: capability({
    id: "permissions",
    classification: "NATIVE_ONLY",
    platform: "BOTH",
    rendererStrategy: "ALTERNATE_PATTERN",
    executionMode: "EXPO_GO",
    primitive: "platform permission API adapter",
    states: ["permission-required", "denied", "ready", "error"],
    presentation:
      "Why-needed, denied, settings, retry, and granted presentation.",
    ten4SevenOwns: [
      "permission explanation",
      "denied state",
      "settings/retry action",
    ],
    consumerOwns: [
      "actual permission request",
      "entitlement",
      "effective access",
    ],
    accessibility: [
      "Explain the capability and make retry/settings actions reachable.",
    ],
    noBusinessLogic: true,
  }),
  location: capability({
    id: "location",
    classification: "NATIVE_ONLY",
    platform: "NATIVE",
    rendererStrategy: "NATIVE_RENDERER",
    executionMode: "DEV_CLIENT_REQUIRED",
    primitive: "expo-location adapter behind location state contract",
    states: [
      "permission-required",
      "denied",
      "ready",
      "active",
      "success",
      "error",
      "canceled",
    ],
    presentation:
      "Unavailable, permission, locating, found, error, and cancel states.",
    ten4SevenOwns: [
      "location status presentation",
      "map/location state handoff",
    ],
    consumerOwns: [
      "GPS request",
      "accuracy policy",
      "business meaning",
      "persistence",
    ],
    accessibility: ["Location state and retry action are announced as text."],
    noBusinessLogic: true,
  }),
  haptics: capability({
    id: "haptics",
    classification: "UTILITY_OR_PROVIDER",
    platform: "NATIVE",
    rendererStrategy: "NATIVE_RENDERER",
    executionMode: "EXPO_GO",
    primitive: "expo-haptics adapter",
    states: ["ready", "unavailable"],
    presentation:
      "Optional selection, confirmation, warning, or impact feedback intent.",
    ten4SevenOwns: ["bounded semantic haptic intent"],
    consumerOwns: ["opt-in decision", "platform availability"],
    accessibility: [
      "Haptics never replace visual or accessible status feedback.",
    ],
    noBusinessLogic: true,
  }),
  pushEntry: capability({
    id: "pushEntry",
    classification: "ADAPTIVE",
    platform: "NATIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    executionMode: "DEV_CLIENT_REQUIRED",
    primitive: "notification entry adapter",
    states: ["loading", "ready", "invalid", "error", "canceled"],
    presentation:
      "Destination loading, context restoration, expired target, and error state.",
    ten4SevenOwns: ["entry/loading/error presentation"],
    consumerOwns: [
      "registration",
      "payload",
      "route resolution",
      "authorization",
    ],
    accessibility: [
      "Restored destination and invalid-target meaning are readable.",
    ],
    noBusinessLogic: true,
  }),
  deepLink: capability({
    id: "deepLink",
    classification: "ADAPTIVE",
    platform: "BOTH",
    rendererStrategy: "ALTERNATE_PATTERN",
    executionMode: "EXPO_GO",
    primitive: "application deep-link adapter",
    states: ["loading", "ready", "invalid", "error"],
    presentation:
      "Direct-entry composition for detail, task, product, or notification context.",
    ten4SevenOwns: ["direct-entry-safe composition", "back/up presentation"],
    consumerOwns: ["URL/payload parsing", "authorization", "route truth"],
    accessibility: [
      "Direct entry has a meaningful title, context, and back/up action.",
    ],
    noBusinessLogic: true,
  }),
  offline: capability({
    id: "offline",
    classification: "ADAPTIVE",
    platform: "BOTH",
    rendererStrategy: "SAME_INTENT",
    executionMode: "EXPO_GO",
    primitive: "consumer connectivity state",
    states: ["online", "offline", "unavailable"],
    presentation:
      "Banner, status, row, work-context, and sticky-action connectivity state.",
    ten4SevenOwns: ["semantic offline presentation"],
    consumerOwns: ["connectivity truth", "business data", "persistence"],
    accessibility: [
      "Connectivity meaning is text-readable and not color-only.",
    ],
    noBusinessLogic: true,
  }),
  sync: capability({
    id: "sync",
    classification: "ADAPTIVE",
    platform: "BOTH",
    rendererStrategy: "SAME_INTENT",
    executionMode: "EXPO_GO",
    primitive: "consumer sync-state adapter",
    states: [
      "pendingSync",
      "syncing",
      "synced",
      "syncFailed",
      "retry",
      "error",
    ],
    presentation:
      "Pending, syncing, synced, failed, retry, and conflict presentation.",
    ten4SevenOwns: ["SyncStatus and retry presentation"],
    consumerOwns: ["queue", "cursor", "conflict policy", "retry execution"],
    accessibility: [
      "Sync state is bounded status text with an explicit retry action.",
    ],
    noBusinessLogic: true,
  }),
  networkRetry: capability({
    id: "networkRetry",
    classification: "UTILITY_OR_PROVIDER",
    platform: "BOTH",
    rendererStrategy: "SAME_INTENT",
    executionMode: "EXPO_GO",
    primitive: "consumer retry callback",
    states: ["ready", "loading", "success", "error", "retry"],
    presentation: "Retry, waiting, failed, and queued action states.",
    ten4SevenOwns: ["retry action and state presentation"],
    consumerOwns: ["idempotency", "backoff", "network request"],
    accessibility: [
      "Retry status and action are exposed without live-region spam.",
    ],
    noBusinessLogic: true,
  }),
  secureStorage: capability({
    id: "secureStorage",
    classification: "NATIVE_ONLY",
    platform: "NATIVE",
    rendererStrategy: "NATIVE_RENDERER",
    executionMode: "DEV_CLIENT_REQUIRED",
    primitive: "application secure-storage adapter",
    states: ["ready", "unavailable", "error"],
    presentation:
      "Presentation-only secure-value or unavailable-storage state.",
    ten4SevenOwns: ["safe presentation boundary"],
    consumerOwns: ["credential/token storage", "encryption", "lifecycle"],
    accessibility: [
      "Do not reveal secret values in labels, logs, or fixtures.",
    ],
    noBusinessLogic: true,
  }),
  backgroundTask: capability({
    id: "backgroundTask",
    classification: "NATIVE_ONLY",
    platform: "NATIVE",
    rendererStrategy: "NATIVE_RENDERER",
    executionMode: "DEV_CLIENT_REQUIRED",
    primitive: "application background-task adapter",
    states: ["ready", "unavailable", "error"],
    presentation: "Capability and queued/background status only.",
    ten4SevenOwns: ["status presentation"],
    consumerOwns: ["scheduling", "battery/network constraints", "mutation"],
    accessibility: ["Background status has an explicit readable state."],
    noBusinessLogic: true,
  }),
  orientation: capability({
    id: "orientation",
    classification: "NATIVE_ONLY",
    platform: "NATIVE",
    rendererStrategy: "NATIVE_RENDERER",
    executionMode: "EXPO_GO",
    primitive: "runtime window dimensions",
    states: ["ready", "active", "unavailable"],
    presentation: "Portrait, landscape, and available-space adaptive layout.",
    ten4SevenOwns: ["recomposition and measure intent"],
    consumerOwns: ["screen-specific routing policy"],
    accessibility: ["Orientation changes preserve reading order and focus."],
    noBusinessLogic: true,
  }),
  fontScale: capability({
    id: "fontScale",
    classification: "NATIVE_ONLY",
    platform: "NATIVE",
    rendererStrategy: "NATIVE_RENDERER",
    executionMode: "EXPO_GO",
    primitive: "platform font scaling",
    states: ["ready", "active", "unavailable"],
    presentation:
      "Larger text without clipping, overlap, or fixed-height truncation.",
    ten4SevenOwns: ["semantic typography roles", "flexible layout"],
    consumerOwns: ["content length and priority"],
    accessibility: ["Do not globally disable user font scaling."],
    noBusinessLogic: true,
  }),
} as const satisfies Readonly<
  Record<NativeDeviceCapabilityId, NativeDeviceCapabilityContract>
>;

export const NATIVE_HAPTIC_INTENTS = [
  "selection",
  "confirmation",
  "warning",
  "impact",
] as const;
export type NativeHapticIntent = (typeof NATIVE_HAPTIC_INTENTS)[number];

export const NATIVE_PROFILE_CANARIES = [
  ...BRAND_PROFILE_IDS,
] as const satisfies readonly BrandProfileId[];

export const NATIVE_RENDERER_COMPONENT_IDS = [
  "Typography",
  "T7Icon",
  "Badge",
  "Surface",
  "Stack",
  "Container",
  "Button",
  "IconButton",
  "Input",
  "PasswordInput",
  "Textarea",
  "Checkbox",
  "Radio",
  "Switch",
  "Select",
  "SearchInput",
  "Tabs",
  "BottomNavigation",
  "Dialog",
  "AlertDialog",
  "Drawer",
  "Popover",
  "ContextMenu",
  "Banner",
  "Toast",
  "Progress",
  "List",
  "DescriptionList",
  "DataTable",
  "ConversationThread",
  "PromptComposer",
  "CitationList",
  "ToolCallCard",
  "ApprovalPanel",
  "CommandMenu",
] as const;

export const NATIVE_ALTERNATE_COMPONENT_IDS = [
  "DatePicker",
  "DateTimeInput",
  "FileUpload",
  "Calendar",
  "Tooltip",
  "LineChart",
  "EditorSurface",
  "BuilderCanvas",
] as const;

export const NATIVE_FAMILY_PARITY = {
  foundations: {
    web: "FULL",
    android: "PARTIAL",
    ios: "PARTIAL",
    evidence: "SOURCE + TYPECHECK",
    note: "Text, Surface, Badge, semantic icon, typography, and theme primitives render through the native package.",
  },
  layout: {
    web: "FULL",
    android: "PARTIAL",
    ios: "PARTIAL",
    evidence: "SOURCE + TYPECHECK",
    note: "Flexbox composition, ScrollView, safe-area provider, runtime dimensions, and measure roles are implemented; device QA is pending.",
  },
  actions: {
    web: "FULL",
    android: "PARTIAL",
    ios: "PARTIAL",
    evidence: "SOURCE + TYPECHECK",
    note: "Pressable actions use shared intent, minimum touch target, pressed state, and accessibility state.",
  },
  forms: {
    web: "FULL",
    android: "PARTIAL",
    ios: "PARTIAL",
    evidence: "SOURCE + TYPECHECK",
    note: "TextInput, password, checkbox, radio, switch, and selector sheet foundations are implemented; keyboard/device QA is pending.",
  },
  selection: {
    web: "FULL",
    android: "ALTERNATE_PATTERN",
    ios: "ALTERNATE_PATTERN",
    evidence: "SOURCE + TYPECHECK",
    note: "Select uses a native modal sheet/list strategy rather than a Web popup.",
  },
  dateTime: {
    web: "FULL",
    android: "ALTERNATE_PATTERN",
    ios: "ALTERNATE_PATTERN",
    evidence: "PROPOSED",
    note: "Native picker adapter boundary is defined; production picker integration is deferred to a capability adapter.",
  },
  files: {
    web: "FULL",
    android: "ALTERNATE_PATTERN",
    ios: "ALTERNATE_PATTERN",
    evidence: "PROPOSED",
    note: "Document/image/camera source presentation is defined; no upload or production picker is bundled.",
  },
  navigation: {
    web: "FULL",
    android: "ALTERNATE_PATTERN",
    ios: "ALTERNATE_PATTERN",
    evidence: "SOURCE + TYPECHECK",
    note: "Tabs, bottom navigation, back/up, and list/detail composition are renderer responsibilities.",
  },
  overlays: {
    web: "FULL",
    android: "ALTERNATE_PATTERN",
    ios: "ALTERNATE_PATTERN",
    evidence: "SOURCE + TYPECHECK",
    note: "Modal/sheet foundations handle explicit close and system-back callbacks; native QA is pending.",
  },
  feedback: {
    web: "FULL",
    android: "PARTIAL",
    ios: "PARTIAL",
    evidence: "SOURCE + TYPECHECK",
    note: "Banner, status, progress, and toast composition use semantic status and reduced-motion intent.",
  },
  data: {
    web: "FULL",
    android: "ALTERNATE_PATTERN",
    ios: "ALTERNATE_PATTERN",
    evidence: "SOURCE + TYPECHECK",
    note: "FlatList is the native collection path; DataTable maps to record list/detail rather than a squeezed table.",
  },
  charts: {
    web: "FULL",
    android: "PLANNED",
    ios: "PLANNED",
    evidence: "PROPOSED",
    note: "U08 chart semantics remain available; no chart engine is bundled in the native foundation.",
  },
  maps: {
    web: "FULL",
    android: "PLANNED",
    ios: "PLANNED",
    evidence: "PROPOSED",
    note: "U08 map semantics remain an engine boundary; no map engine is bundled.",
  },
  workflow: {
    web: "FULL",
    android: "ALTERNATE_PATTERN",
    ios: "ALTERNATE_PATTERN",
    evidence: "SOURCE + TYPECHECK",
    note: "Work queue, decision workspace, wizard, and Kanban list/selector strategies remain consumer compositions.",
  },
  aiPower: {
    web: "FULL",
    android: "ALTERNATE_PATTERN",
    ios: "ALTERNATE_PATTERN",
    evidence: "SOURCE + TYPECHECK",
    note: "U10 conversation, composer, citation, tool, approval, and command presentation is available through native primitives.",
  },
  profiles: {
    web: "FULL",
    android: "PARTIAL",
    ios: "PARTIAL",
    evidence: "SOURCE + TYPECHECK",
    note: "Neutral, Farm, Operations, ERP, and Academy profiles resolve through the shared theme runtime; device rendering remains unverified.",
  },
  deviceCapabilities: {
    web: "N/A",
    android: "PARTIAL",
    ios: "PARTIAL",
    evidence: "CONTRACT",
    note: "Capability state and adapter boundaries are modeled; platform API integration and device QA remain pending.",
  },
} as const;

export const NATIVE_ADAPTIVE_CANARIES = {
  Select: {
    component: "Select",
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    nativePresentation: "sheet/native picker/bounded native list",
    nativeStatus: "experimental",
    proof:
      "value, label, disabled, empty, selected state, long options, and accessible trigger",
  },
  DataTable: {
    component: "DataTable",
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    nativePresentation: "FlatList record list with detail/action path",
    nativeStatus: "experimental",
    proof:
      "record identity, primary fields, status, selection/action intent, and no squeezed table",
  },
  MasterDetail: {
    component: "MasterDetail recipe",
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    nativePresentation: "list → detail with direct-entry-safe back/up",
    nativeStatus: "experimental",
    proof: "list selection, detail context, direct entry, and return intent",
  },
  Kanban: {
    component: "Operational Kanban recipe",
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    nativePresentation: "lane selector/tabs → card list",
    nativeStatus: "planned",
    proof:
      "movement remains intent-only; five lanes are not squeezed into a phone viewport",
  },
  TooltipPopover: {
    component: "Tooltip/Popover",
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    nativePresentation: "contextual press/help surface",
    nativeStatus: "planned",
    proof: "important help remains available without hover",
  },
  AIConversation: {
    component: "ConversationThread + PromptComposer",
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    nativePresentation: "bounded message list + keyboard-safe composer",
    nativeStatus: "experimental",
    proof:
      "long content, scroll-to-latest intent, citations, tool status, approval, and composer actions",
  },
  EditorBuilder: {
    component: "EditorSurface + BuilderCanvas",
    platform: "WEB",
    rendererStrategy: "NOT_APPLICABLE",
    nativePresentation: "preview/basic text/property detail alternate only",
    nativeStatus: "planned",
    proof:
      "honor U10 Web classification; no forced desktop editor/builder parity",
  },
} as const;

export const NATIVE_OFFLINE_SYNC_CANARY = {
  states: NATIVE_EXPO_SYNC_PRESENTATION_STATES,
  transitions: [
    ["offline", "pendingSync"],
    ["pendingSync", "syncing"],
    ["syncing", "synced"],
    ["syncing", "syncFailed"],
    ["syncFailed", "retryAvailable"],
  ] as const satisfies readonly (readonly [
    NativeExpoSyncPresentationState,
    NativeExpoSyncPresentationState,
  ])[],
  surfaces: [
    "Banner",
    "Status",
    "record row",
    "work context",
    "sticky action region",
  ],
  ownership:
    "presentation-only; consumer owns the sync engine and retry execution",
} as const;

export const NATIVE_EXPO_CONTRACT = {
  schemaVersion: "0.1",
  id: "native-expo-parity",
  sourceOfTruth: [
    "packages/contracts/src/native-expo.ts",
    "packages/contracts/src/native-mobile.ts",
    "packages/tokens/src/theme.ts",
  ],
  resolverOrder: TOKEN_RESOLUTION_ORDER,
  architecture: {
    shared: [
      "packages/contracts",
      "packages/tokens",
      "semantic intent",
      "states",
      "accessibility",
      "profile meaning",
    ],
    web: "@ten4seven/ui resolves the same contract to DOM/CSS projections.",
    native:
      "@ten4seven/native resolves typed values and renders React Native primitives through a separate renderer.",
    invariant:
      "one semantic language, one token source, multiple renderers; Native never parses CSS",
  },
  maturity: {
    before: "CONTRACT_ONLY" as NativeRendererMaturity,
    after: "PARTIAL_RENDERER" as NativeRendererMaturity,
    reason:
      "A real React Native renderer foundation and Expo Lab source exist; Android emulator/device and iOS runtime evidence are not available in this checkout environment.",
  },
  renderer: {
    package: "@ten4seven/native",
    runtime: "React Native / Expo",
    primitives: [
      "View",
      "Text",
      "Pressable",
      "TextInput",
      "ScrollView",
      "FlatList",
      "Modal",
      "Switch",
      "ActivityIndicator",
    ],
    safeArea: "react-native-safe-area-context",
    values:
      "resolved JS/TS theme snapshot; opaque sRGB colors, numeric dimensions, numeric durations",
    cssParsing: false,
    parallelThemeSource: false,
    fontScaling: "enabled by default",
    screenReader:
      "native accessibilityLabel/accessibilityRole/accessibilityState contract",
  },
  profileCanaries: NATIVE_PROFILE_CANARIES,
  profileSource: BRAND_PROFILE_IDS,
  tokenCoverage: [
    "colors",
    "foreground/background",
    "surface",
    "border",
    "focus",
    "selected",
    "status",
    "spacing",
    "radius",
    "typography",
    "elevation",
    "motion",
    "density",
    "measure/layout",
    "chart palette",
    "product profile values",
  ],
  familyParity: NATIVE_FAMILY_PARITY,
  adaptiveCanaries: NATIVE_ADAPTIVE_CANARIES,
  deviceCapabilities: NATIVE_DEVICE_CAPABILITY_CONTRACTS,
  hapticIntents: NATIVE_HAPTIC_INTENTS,
  offlineSync: NATIVE_OFFLINE_SYNC_CANARY,
  nativeLab: {
    app: "apps/native-lab",
    role: "deterministic Native Component Lab, not a product application",
    executionMode: "EXPO_GO" as NativeExpoExecutionMode,
    families: [
      "Foundations",
      "Layout",
      "Actions",
      "Forms",
      "Navigation",
      "Overlays",
      "Feedback",
      "Data",
      "Visualizations",
      "Workflow",
      "AI/Power",
      "Device capabilities",
      "Profiles",
    ],
    qaControls: [
      "profile",
      "appearance",
      "density",
      "motion",
      "family",
      "capability fixture states",
    ],
    fixtureData:
      "synthetic and domain-neutral; no API, auth backend, persistence, upload, or business mutation",
  },
  ownership: {
    ten4Seven: [
      "presentation",
      "interaction grammar",
      "device-capability UI contract",
      "accessibility",
      "tokens",
      "adaptive layout",
    ],
    application: [
      "authentication",
      "API",
      "offline database",
      "sync engine",
      "conflict resolution",
      "permission/business rules",
      "push registration",
      "deep-link routing truth",
      "secure storage",
      "background jobs",
      "domain data",
    ],
  },
  rendererExtensions: {
    sharedProps: "semantic props and state contracts",
    nativeProps:
      "platform accessibility, safe-area, press, keyboard, and native-picker extensions",
    webProps: "DOM/focus/hover/portal extensions remain Web-only",
    compatibility:
      "preserve valid Web API; add renderer extension instead of deleting Web capability",
  },
  nativeRendererComponentIds: NATIVE_RENDERER_COMPONENT_IDS,
  nativeAlternateComponentIds: NATIVE_ALTERNATE_COMPONENT_IDS,
  dependencyPolicy: {
    noUniversalNativeUiLibrary: true,
    noBundledHeavyEngines: true,
    optionalAdapterExamples: [
      "camera",
      "scanner",
      "location",
      "charts",
      "maps",
      "date/time",
      "editor",
      "gesture",
    ],
    adapterRule:
      "capability or engine is added only behind the shared contract after license, Expo compatibility, accessibility, and performance review",
  },
  deferred: [
    "Android/iOS device runtime QA where this Windows checkout has no attached emulator/device and no iOS simulator.",
    "Expo custom development-client capability integration for camera, scanner, location, push, secure storage, and background tasks.",
    "Production navigation/router, offline database, sync engine, conflict resolver, secure storage, authentication, push registration, and deep-link parsing.",
    "Chart/map/editor/DnD engines and virtualization beyond the native foundation primitives.",
    "VoiceOver/TalkBack runtime certification and physical-device font-scale/haptics verification.",
  ],
} as const;

export type NativeExpoContract = typeof NATIVE_EXPO_CONTRACT;
