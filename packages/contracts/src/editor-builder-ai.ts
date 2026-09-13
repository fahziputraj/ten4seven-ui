import { TOKEN_RESOLUTION_ORDER } from "./foundation.ts";

/**
 * U10 is the semantic boundary for advanced interaction. It owns intent,
 * presentation states, accessibility, platform strategy, and adapter seams.
 * It never owns an editor document, builder schema, DnD mutation, AI provider,
 * tool execution, persistence, or business authorization.
 */

export type AdvancedPlatform = "BOTH" | "WEB" | "NATIVE" | "ADAPTIVE";
export type AdvancedNativeStrategy =
  "SAME_INTENT" | "NATIVE_RENDERER" | "ALTERNATE_PATTERN" | "NOT_APPLICABLE";

export const ADVANCED_PLATFORMS = [
  "BOTH",
  "WEB",
  "NATIVE",
  "ADAPTIVE",
] as const satisfies readonly AdvancedPlatform[];

export const ADVANCED_NATIVE_STRATEGIES = [
  "SAME_INTENT",
  "NATIVE_RENDERER",
  "ALTERNATE_PATTERN",
  "NOT_APPLICABLE",
] as const satisfies readonly AdvancedNativeStrategy[];

export type AdvancedComplexity =
  | "L2_COMPOUND"
  | "L3_COLLECTION"
  | "L4_ADVANCED_ENGINE"
  | "L5_PRODUCT_COMPOSITION";

export const ADVANCED_COMPLEXITIES = [
  "L2_COMPOUND",
  "L3_COLLECTION",
  "L4_ADVANCED_ENGINE",
  "L5_PRODUCT_COMPOSITION",
] as const satisfies readonly AdvancedComplexity[];

export type AdvancedClassification =
  | "FOUNDATION"
  | "CANONICAL_COMPONENT"
  | "COMPONENT_VARIANT"
  | "UTILITY_OR_PROVIDER"
  | "COMPOSITE_BLOCK"
  | "RECIPE_OR_PATTERN"
  | "ENGINE_ADAPTER"
  | "DOMAIN_COMPOSITION"
  | "ALIAS"
  | "WEB_ONLY"
  | "NATIVE_ONLY"
  | "ADAPTIVE"
  | "DEFERRED"
  | "REJECTED_DUPLICATE";

export const ADVANCED_CLASSIFICATIONS = [
  "FOUNDATION",
  "CANONICAL_COMPONENT",
  "COMPONENT_VARIANT",
  "UTILITY_OR_PROVIDER",
  "COMPOSITE_BLOCK",
  "RECIPE_OR_PATTERN",
  "ENGINE_ADAPTER",
  "DOMAIN_COMPOSITION",
  "ALIAS",
  "WEB_ONLY",
  "NATIVE_ONLY",
  "ADAPTIVE",
  "DEFERRED",
  "REJECTED_DUPLICATE",
] as const satisfies readonly AdvancedClassification[];

export type AdvancedInventoryStatus =
  | "EXISTING_STABLE"
  | "EXISTING_NEEDS_HARDENING"
  | "MISSING_CANONICAL"
  | "VARIANT"
  | "UTILITY"
  | "BLOCK"
  | "RECIPE"
  | "ENGINE_ADAPTER"
  | "DOMAIN_COMPOSITION"
  | "DEFERRED"
  | "REJECTED_DUPLICATE";

export const ADVANCED_INVENTORY_STATUSES = [
  "EXISTING_STABLE",
  "EXISTING_NEEDS_HARDENING",
  "MISSING_CANONICAL",
  "VARIANT",
  "UTILITY",
  "BLOCK",
  "RECIPE",
  "ENGINE_ADAPTER",
  "DOMAIN_COMPOSITION",
  "DEFERRED",
  "REJECTED_DUPLICATE",
] as const satisfies readonly AdvancedInventoryStatus[];

export const EDITOR_FAMILIES = [
  "PLAIN_TEXT",
  "RICH_TEXT",
  "MARKDOWN",
  "CODE",
  "JSON",
  "DIFF",
] as const;
export type EditorFamily = (typeof EDITOR_FAMILIES)[number];

export const ADVANCED_COMPONENT_FAMILIES = [
  "EDITORS",
  "BUILDERS",
  "DRAG_AND_DROP",
  "POWER_USER",
  "AI_CONVERSATION",
] as const;
export type AdvancedComponentFamily =
  (typeof ADVANCED_COMPONENT_FAMILIES)[number];

export const EDITOR_BUILDER_AI_COMPONENTS = [
  "EditorSurface",
  "PropertyInspector",
  "BuilderCanvas",
  "PromptComposer",
  "ConversationThread",
  "CitationList",
  "ToolCallCard",
  "ApprovalPanel",
  "CommandMenu",
  "DragHandle",
  "DiffViewer",
] as const;

export type EditorBuilderAiComponent =
  (typeof EDITOR_BUILDER_AI_COMPONENTS)[number];

export type AdvancedState =
  | "idle"
  | "focused"
  | "dirty"
  | "saving"
  | "saved"
  | "saveFailed"
  | "readOnly"
  | "loading"
  | "empty"
  | "error"
  | "disabled"
  | "selected"
  | "dragging"
  | "validTarget"
  | "invalidTarget"
  | "canceled"
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "waitingApproval"
  | "streaming"
  | "paused";

export const ADVANCED_STATES = [
  "idle",
  "focused",
  "dirty",
  "saving",
  "saved",
  "saveFailed",
  "readOnly",
  "loading",
  "empty",
  "error",
  "disabled",
  "selected",
  "dragging",
  "validTarget",
  "invalidTarget",
  "canceled",
  "pending",
  "running",
  "completed",
  "failed",
  "waitingApproval",
  "streaming",
  "paused",
] as const satisfies readonly AdvancedState[];

export interface AdvancedComponentDecision {
  readonly id: EditorBuilderAiComponent;
  readonly displayName: string;
  readonly family: AdvancedComponentFamily;
  readonly classification: AdvancedClassification;
  readonly complexity: AdvancedComplexity;
  readonly inventoryStatus: AdvancedInventoryStatus;
  readonly platform: AdvancedPlatform;
  readonly nativeStrategy: AdvancedNativeStrategy;
  readonly adaptiveStrategy: string;
  readonly engine: string;
  readonly engineBoundary: string;
  readonly tokens: readonly string[];
  readonly accessibility: readonly string[];
  readonly states: readonly string[];
  readonly composesWith: readonly string[];
  readonly alternatives: readonly string[];
  readonly webStrategy: string;
  readonly nativeStrategyNotes: string;
}

export interface EditorEngineDecision {
  readonly family: EditorFamily;
  readonly capability: string;
  readonly canonicalComponent: "EditorSurface" | "DiffViewer";
  readonly classification: AdvancedClassification;
  readonly complexity: AdvancedComplexity;
  readonly currentEngine: string;
  readonly candidateEngine: string;
  readonly license: string;
  readonly packageImpact: string;
  readonly platform: AdvancedPlatform;
  readonly adaptiveStrategy: string;
  readonly webStrategy: string;
  readonly nativeStrategy: string;
  readonly adapterBoundary: string;
  readonly distinction?: string;
  readonly states: readonly string[];
  readonly accessibility: readonly string[];
}

const editorStates = [
  "idle",
  "focused",
  "dirty",
  "saving",
  "saved",
  "saveFailed",
  "readOnly",
  "loading",
  "error",
] as const;

const editorAccessibility = [
  "Expose a stable labelled editing region and preserve heading hierarchy.",
  "Keep the editing control, toolbar actions, and status text in logical reading order.",
  "Expose focus, read-only, disabled, saving, saved, and failed states without color alone.",
  "Keep keyboard access to editing, toolbar, find, copy, and consumer-provided actions.",
] as const;

export const EDITOR_ENGINE_DECISIONS = {
  PLAIN_TEXT: {
    family: "PLAIN_TEXT",
    capability: "Plain text editing",
    canonicalComponent: "EditorSurface",
    classification: "COMPONENT_VARIANT",
    complexity: "L2_COMPOUND",
    currentEngine:
      "Canonical EditorSurface composed with the consumer's text control.",
    candidateEngine: "None required; use the platform text control.",
    license: "No additional runtime dependency or engine license.",
    packageImpact: "Base @ten4seven/ui surface only.",
    platform: "ADAPTIVE",
    adaptiveStrategy:
      "Web text control; native TextInput or platform text control.",
    webStrategy: "EditorSurface with Textarea or a consumer text adapter.",
    nativeStrategy:
      "Native text input with keyboard, inset, and focus handling owned by the renderer.",
    adapterBoundary:
      "The consumer owns value, change intent, validation, and persistence.",
    states: editorStates,
    accessibility: editorAccessibility,
  },
  RICH_TEXT: {
    family: "RICH_TEXT",
    capability: "Structured rich-text editing",
    canonicalComponent: "EditorSurface",
    classification: "ENGINE_ADAPTER",
    complexity: "L4_ADVANCED_ENGINE",
    currentEngine:
      "Consumer-owned structured document engine behind an EditorSurface slot.",
    candidateEngine:
      "An optional consumer-selected rich-text engine evaluated for license, maintenance, size, and accessibility.",
    license:
      "No engine is bundled; the consumer owns license review for any adapter.",
    packageImpact:
      "No rich-text parser or document model in the base package; lazy consumer adapter only.",
    platform: "ADAPTIVE",
    adaptiveStrategy:
      "Desktop authoring can use a full engine; native may use a limited editor or alternate authoring flow.",
    webStrategy:
      "EditorSurface + canonical toolbar/actions + optional engine adapter.",
    nativeStrategy:
      "Partial native editing or an alternate full-screen authoring flow; no parity claim.",
    adapterBoundary:
      "Ten4Seven owns semantic value/change slots and presentation; the consumer owns document schema, history, collaboration, and persistence.",
    states: editorStates,
    accessibility: editorAccessibility,
  },
  MARKDOWN: {
    family: "MARKDOWN",
    capability: "Markdown source and preview",
    canonicalComponent: "EditorSurface",
    classification: "COMPONENT_VARIANT",
    complexity: "L2_COMPOUND",
    currentEngine:
      "EditorSurface language variant with optional consumer preview and toolbar slots.",
    candidateEngine:
      "Consumer-selected parser/preview adapter when rendering is required.",
    license:
      "No Markdown parser is bundled; consumer owns parser license and sanitization.",
    packageImpact:
      "Base surface only; preview and parsing remain lazy consumer concerns.",
    platform: "ADAPTIVE",
    adaptiveStrategy:
      "Web split/source-preview modes; native source-first screen with a preview route or sheet.",
    webStrategy:
      "Source editor, preview slot, and responsive single-column fallback.",
    nativeStrategy:
      "Basic source editing or a separate preview screen; no desktop split-pane requirement.",
    adapterBoundary:
      "Ten4Seven owns source/preview arrangement; the consumer owns parsing, sanitization, and persistence.",
    states: editorStates,
    accessibility: editorAccessibility,
  },
  CODE: {
    family: "CODE",
    capability: "Source/code editing",
    canonicalComponent: "EditorSurface",
    classification: "ENGINE_ADAPTER",
    complexity: "L4_ADVANCED_ENGINE",
    currentEngine:
      "Consumer-owned code engine behind a semantic EditorSurface adapter.",
    candidateEngine:
      "Optional consumer-selected code editor with language configuration behind adapterOptions.",
    license:
      "No code engine or language package is bundled; consumer owns license review.",
    packageImpact:
      "Keep syntax, minimap, search, and language packages out of base startup.",
    platform: "WEB",
    adaptiveStrategy:
      "Web-first; native is a read-only/basic text or external editor alternative.",
    webStrategy:
      "EditorSurface with optional line, diagnostic, find, copy, and fullscreen slots.",
    nativeStrategy:
      "Read-only code viewer, basic text editing, or an external/full-screen editor flow.",
    adapterBoundary:
      "Ten4Seven owns semantic language, value, diagnostic, and action slots; the consumer owns language services and code truth.",
    states: editorStates,
    accessibility: editorAccessibility,
  },
  JSON: {
    family: "JSON",
    capability: "Structured JSON editing",
    canonicalComponent: "EditorSurface",
    classification: "ENGINE_ADAPTER",
    complexity: "L4_ADVANCED_ENGINE",
    currentEngine:
      "Consumer-owned JSON text/tree adapter presented inside EditorSurface.",
    candidateEngine:
      "Optional consumer-selected JSON editor; no schema validator is bundled.",
    license:
      "No JSON schema or tree engine is bundled; consumer owns license review.",
    packageImpact:
      "Formatting, collapse/expand, and validation packages remain lazy consumer dependencies.",
    platform: "ADAPTIVE",
    adaptiveStrategy:
      "Web raw/tree modes; native basic text editing or a structured field flow.",
    webStrategy:
      "Raw/tree view, format/copy actions, and consumer-supplied validation status.",
    nativeStrategy:
      "Basic text or field-based editing; complex tree manipulation may be a separate screen.",
    adapterBoundary:
      "Ten4Seven owns mode and state presentation; the consumer owns JSON schema, validation truth, and persistence.",
    states: editorStates,
    accessibility: editorAccessibility,
  },
  DIFF: {
    family: "DIFF",
    capability: "Before/after comparison",
    canonicalComponent: "DiffViewer",
    classification: "CANONICAL_COMPONENT",
    complexity: "L2_COMPOUND",
    currentEngine:
      "Canonical DiffViewer renders consumer-supplied comparison rows; it does not compute a diff.",
    candidateEngine:
      "Optional consumer-owned diff computation adapter for raw values or large comparisons.",
    license:
      "No diff engine is bundled; consumer owns license review for an optional adapter.",
    packageImpact:
      "Small presentation surface in the base package; computation stays outside startup.",
    platform: "WEB",
    adaptiveStrategy:
      "Web inline/split comparison; native read-only comparison screen when justified.",
    webStrategy:
      "Semantic comparison table with inline or split row presentation.",
    nativeStrategy:
      "No native DiffViewer in U10; a future native renderer may use a read-only comparison screen.",
    adapterBoundary:
      "Ten4Seven owns comparison presentation; the consumer owns source values, diff computation, audit meaning, and persistence.",
    distinction:
      "DiffViewer is line-level generic comparison. RevisionDiff remains the field-level revision/provenance component with reason, actor, time, and evidence.",
    states: ["ready", "empty", "loading", "error", "readOnly"],
    accessibility: [
      "Expose before, after, line/context meaning, and added/removed/modified state as text.",
      "Do not use color alone for additions, removals, or modifications.",
      "Keep inline and split modes readable at narrow widths and with large text.",
    ],
  },
} as const satisfies Readonly<Record<EditorFamily, EditorEngineDecision>>;

export const BUILDER_PART_DECISIONS = {
  palette: {
    id: "ComponentPalette",
    classification: "UTILITY_OR_PROVIDER",
    complexity: "L2_COMPOUND",
    canonicalComposition:
      "Consumer-supplied palette slot using canonical SearchInput, List, and Button.",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    consumerOwns: ["available node types", "search data", "add/drag intent"],
    avoid: ["hardcoded product blocks", "builder-specific primitive library"],
  },
  canvas: {
    id: "BuilderCanvas",
    classification: "ENGINE_ADAPTER",
    complexity: "L4_ADVANCED_ENGINE",
    canonicalComposition: "Bounded stage and optional inspector slot.",
    platform: "WEB",
    nativeStrategy: "ALTERNATE_PATTERN",
    consumerOwns: [
      "node schema",
      "allowed structure",
      "selection truth",
      "persistence",
    ],
    avoid: [
      "document model",
      "layout engine",
      "canvas runtime",
      "autonomous mutation",
    ],
  },
  outliner: {
    id: "Outliner",
    classification: "COMPONENT_VARIANT",
    complexity: "L3_COLLECTION",
    canonicalComposition:
      "TreeView with selection, visibility, locking, context actions, and optional reorder intent.",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    consumerOwns: [
      "hierarchy data",
      "selection policy",
      "visibility and lock truth",
    ],
    avoid: ["second tree implementation", "business schema interpretation"],
  },
  inspector: {
    id: "PropertyInspector",
    classification: "CANONICAL_COMPONENT",
    complexity: "L2_COMPOUND",
    canonicalComposition:
      "Disclosure sections over canonical Fields, Selection, Actions, and Description.",
    platform: "WEB",
    nativeStrategy: "ALTERNATE_PATTERN",
    consumerOwns: [
      "property schema",
      "values",
      "validation",
      "reset and save intent",
    ],
    avoid: ["custom field controls", "business validation engine"],
  },
  resize: {
    id: "ResizeHandle",
    classification: "COMPONENT_VARIANT",
    complexity: "L2_COMPOUND",
    canonicalComposition:
      "Existing SplitPane separator or renderer-owned manipulation handle.",
    platform: "WEB",
    nativeStrategy: "ALTERNATE_PATTERN",
    consumerOwns: ["dimension meaning", "constraints", "persistence"],
    avoid: ["tiny mouse-only controls on touch", "second resize engine"],
  },
  preview: {
    id: "PreviewMode",
    classification: "UTILITY_OR_PROVIDER",
    complexity: "L2_COMPOUND",
    canonicalComposition:
      "Canonical Button/Tabs/Mode state around a consumer-owned preview renderer.",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    consumerOwns: [
      "preview rendering",
      "device data",
      "publish or apply intent",
    ],
    avoid: ["browser/device API in the contract", "autonomous publish"],
  },
} as const;

export const BUILDER_ARCHITECTURE = {
  id: "builder-workspace",
  classification: "DOMAIN_COMPOSITION",
  complexity: "L5_PRODUCT_COMPOSITION",
  anatomy: ["palette", "outliner", "canvas", "inspector", "toolbar", "preview"],
  parts: BUILDER_PART_DECISIONS,
  layout: {
    desktop: "palette/outliner → canvas → inspector with bounded scroll owners",
    tablet:
      "keep canvas and primary action visible; move inspector below or into a sheet",
    mobile:
      "main task → selected node → inspector sheet/screen; do not squeeze three rails",
    native:
      "list/selection screen → single-task edit screen → property sheet or screen",
  },
  selection: {
    model: "consumer-provided selected node and placement intent",
    accessibility:
      "Selection is exposed through TreeView, labelled regions, focus, and action alternatives; hover is never required.",
  },
  emptyState:
    "Use canonical EmptyState/StateView for no document, no selection, unavailable adapter, and invalid placement.",
  consumerOwns: [
    "domain node schema",
    "available component types",
    "selection and placement legality",
    "document persistence",
    "undo/redo history",
    "permissions and publish policy",
  ],
  ten4sevenOwns: [
    "bounded anatomy",
    "semantic slots",
    "state and focus presentation",
    "responsive recomposition",
    "canonical component integration",
  ],
  rendererOwns: [
    "canvas implementation",
    "pointer and keyboard mechanics",
    "scrolling",
    "native navigation and sheets",
    "optional engine loading",
  ],
  noMegaComponent: true,
} as const;

export type DndPosition = "before" | "after" | "inside" | "end";
export type DndIntentKind = "reorder" | "move" | "drop";

export interface DndIntent {
  readonly kind: DndIntentKind;
  readonly itemId: string;
  readonly sourceCollectionId: string;
  readonly targetCollectionId: string;
  readonly position: DndPosition;
  readonly targetItemId?: string;
  readonly sourceIndex?: number;
  readonly targetIndex?: number;
}

export const DND_INTENT_CONTRACT = {
  id: "advanced-dnd-intent",
  classification: "ENGINE_ADAPTER",
  complexity: "L4_ADVANCED_ENGINE",
  platform: "ADAPTIVE",
  nativeStrategy: "ALTERNATE_PATTERN",
  callbacks: ["onReorderIntent", "onMoveIntent", "onDropIntent"],
  payload: [
    "stable item identity",
    "source collection identity",
    "target collection identity",
    "before/after/inside/end position",
    "optional source and target indexes for presentation",
  ],
  states: [
    "idle",
    "dragging",
    "validTarget",
    "invalidTarget",
    "canceled",
    "completed",
  ],
  webStrategy:
    "Pointer and keyboard renderer may expose drag preview, placeholder, target indicator, and an explicit move/reorder action.",
  nativeStrategyNotes:
    "Long press/drag may be offered by a renderer; Move to, Move before/after, and action-sheet paths remain first-class alternatives.",
  engine:
    "No DnD engine is bundled or selected. A consumer-approved engine may sit behind a replaceable Ten4Seven adapter.",
  accessibility: [
    "Drag is never the only path for a task-critical move.",
    "Keyboard users can move up/down or choose a destination through an explicit action.",
    "Screen-reader users receive labelled movement actions and a bounded status update.",
    "Invalid targets and cancellation are communicated with text and not color alone.",
    "Dragging does not conflict with scroll or require hover.",
  ],
  visualFeedback: [
    "dragging",
    "valid target",
    "invalid target",
    "drop indicator",
    "source placeholder",
  ],
  consumerOwns: [
    "whether the operation is allowed",
    "business validation",
    "workflow transition legality",
    "persistence",
    "rollback and conflict handling",
  ],
  ten4sevenOwns: [
    "semantic intent vocabulary",
    "renderer-neutral payload shape",
    "focus and alternative-action guidance",
    "token-led feedback states",
  ],
  integrations: [
    "U09 WORKFLOW_DND_BOUNDARY",
    "U07 TreeView",
    "DragHandle",
    "canonical ContextMenu or action surface",
  ],
  fileDropBoundary:
    "File Dropzone ingestion remains a U05 file operation; builder reorder is a distinct intent contract.",
  tokens: [
    "surface",
    "surface-subtle",
    "border",
    "selected",
    "focus-ring",
    "shadow-card",
    "transition-standard",
  ],
} as const;

export function createDndIntent(input: DndIntent): DndIntent {
  return {
    kind: input.kind,
    itemId: input.itemId,
    sourceCollectionId: input.sourceCollectionId,
    targetCollectionId: input.targetCollectionId,
    position: input.position,
    ...(input.targetItemId === undefined
      ? {}
      : { targetItemId: input.targetItemId }),
    ...(input.sourceIndex === undefined
      ? {}
      : { sourceIndex: input.sourceIndex }),
    ...(input.targetIndex === undefined
      ? {}
      : { targetIndex: input.targetIndex }),
  };
}

export const COMMAND_SHORTCUT_SCOPES = [
  "global",
  "workspace",
  "editor",
  "overlay",
  "selection",
] as const;
export type CommandShortcutScope = (typeof COMMAND_SHORTCUT_SCOPES)[number];

export const COMMAND_SHORTCUT_CONTRACT = {
  id: "command-shortcut-grammar",
  canonicalComponent: "CommandMenu",
  alias: "CommandPalette",
  classification: "CANONICAL_COMPONENT",
  complexity: "L3_COLLECTION",
  platform: "ADAPTIVE",
  nativeStrategy: "ALTERNATE_PATTERN",
  registryFields: [
    "id",
    "label",
    "description",
    "group",
    "keywords",
    "shortcut",
    "scope",
    "enabled",
    "dangerous",
  ],
  scopes: COMMAND_SHORTCUT_SCOPES,
  states: ["closed", "open", "focused", "empty", "disabled", "confirming"],
  keyboard: {
    web: [
      "Cmd/Ctrl+K opens the command surface when the host enables the shortcut.",
      "Arrow keys, Home, End, Enter, and Escape operate the result list.",
      "Shortcut labels describe actions; they do not own command execution.",
    ],
    native: [
      "Hardware-keyboard mapping is optional and platform-specific.",
      "Core mobile tasks remain available through labelled press/search actions.",
      "Use a native search/action surface instead of assuming desktop key chords.",
    ],
  },
  webStrategy:
    "Canonical CommandMenu with labelled combobox/listbox semantics and focus return.",
  nativeStrategyNotes:
    "Native search/action surface or command sheet with explicit press targets.",
  dangerousAction:
    "Use AlertDialog or an equivalent canonical confirmation surface; the consumer decides whether confirmation is required.",
  consumerOwns: [
    "command meaning",
    "availability and permission filtering",
    "execution",
    "danger policy",
    "recent-item persistence",
  ],
  ten4sevenOwns: [
    "search and grouping presentation",
    "keyboard navigation contract",
    "shortcut display mapping",
    "focus and empty/disabled states",
  ],
  conflict:
    "Consumers declare scope and conflict information; Ten4Seven does not hardcode product shortcuts globally.",
  tokens: [
    "surface",
    "surface-raised",
    "border",
    "focus-ring",
    "selected",
    "control-height",
    "radius-panel",
    "shadow-card",
    "transition-standard",
  ],
} as const;

export const AI_CONVERSATION_COMPONENTS = [
  "ConversationThread",
  "PromptComposer",
  "CitationList",
  "ToolCallCard",
  "ApprovalPanel",
] as const;

export const AI_CONVERSATION_TAXONOMY = {
  conversation: {
    canonicalComponent: "ConversationThread",
    classification: "CANONICAL_COMPONENT",
    complexity: "L3_COLLECTION",
    intent: "Ordered transcript/container for consumer-supplied messages.",
    platform: "BOTH",
    nativeStrategy: "ALTERNATE_PATTERN",
  },
  message: {
    canonicalComponent: "ConversationThread",
    classification: "COMPONENT_VARIANT",
    complexity: "L2_COMPOUND",
    intent:
      "Role/type variant inside the message collection; not a UserMessage or AssistantMessage component family.",
    platform: "BOTH",
    nativeStrategy: "SAME_INTENT",
  },
  composer: {
    canonicalComponent: "PromptComposer",
    classification: "CANONICAL_COMPONENT",
    complexity: "L2_COMPOUND",
    intent: "Multiline prompt input and action boundary.",
    platform: "BOTH",
    nativeStrategy: "ALTERNATE_PATTERN",
  },
  citation: {
    canonicalComponent: "CitationList",
    classification: "CANONICAL_COMPONENT",
    complexity: "L3_COLLECTION",
    intent:
      "Generic source references with optional metadata, excerpt, and preview/open action.",
    platform: "BOTH",
    nativeStrategy: "ALTERNATE_PATTERN",
  },
  sourceList: {
    canonicalComponent: "CitationList",
    classification: "COMPONENT_VARIANT",
    complexity: "L3_COLLECTION",
    intent:
      "Ordered source collection; retrieval and trust remain consumer-owned.",
    platform: "BOTH",
    nativeStrategy: "ALTERNATE_PATTERN",
  },
  sourcePreview: {
    canonicalComponent: "Drawer/DetailDrawer",
    classification: "COMPONENT_VARIANT",
    complexity: "L2_COMPOUND",
    intent: "Contextual source preview using U06 overlay adaptation.",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
  },
  toolInvocation: {
    canonicalComponent: "ToolCallCard",
    classification: "CANONICAL_COMPONENT",
    complexity: "L2_COMPOUND",
    intent:
      "Tool name, safe summary, status, approval state, and consumer-selected result presentation.",
    platform: "BOTH",
    nativeStrategy: "ALTERNATE_PATTERN",
  },
  toolResult: {
    canonicalComponent: "ToolCallCard",
    classification: "COMPONENT_VARIANT",
    complexity: "L2_COMPOUND",
    intent: "Result or error presentation without execution authority.",
    platform: "BOTH",
    nativeStrategy: "SAME_INTENT",
  },
  approval: {
    canonicalComponent: "ApprovalPanel",
    classification: "CANONICAL_COMPONENT",
    complexity: "L2_COMPOUND",
    intent:
      "Policy-neutral human checkpoint before a consumer-defined side effect.",
    platform: "BOTH",
    nativeStrategy: "ALTERNATE_PATTERN",
  },
  streaming: {
    canonicalComponent: "StateView/StatusChip",
    classification: "COMPONENT_VARIANT",
    complexity: "L2_COMPOUND",
    intent:
      "User-safe generating, streaming, paused, complete, failed, or canceled status.",
    platform: "BOTH",
    nativeStrategy: "SAME_INTENT",
  },
  promptSuggestion: {
    canonicalComponent: "Button",
    classification: "COMPONENT_VARIANT",
    complexity: "L2_COMPOUND",
    intent: "Consumer-supplied starter or follow-up action.",
    platform: "BOTH",
    nativeStrategy: "SAME_INTENT",
  },
  attachment: {
    canonicalComponent: "FilePreview/FileUpload",
    classification: "COMPONENT_VARIANT",
    complexity: "L2_COMPOUND",
    intent: "AI composer attachment presentation through U05 file contracts.",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
  },
  artifact: {
    canonicalComponent: "Block/Workspace slot",
    classification: "COMPOSITE_BLOCK",
    complexity: "L5_PRODUCT_COMPOSITION",
    intent: "Related generated document, code, table, preview, or file region.",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
  },
} as const;

export const AI_CONVERSATION_CONTRACT = {
  providerNeutral: true,
  roles: ["user", "assistant", "system", "tool"] as const,
  contentKinds: [
    "text",
    "markdown",
    "code",
    "citation",
    "toolActivity",
    "attachment",
    "artifact",
    "status",
  ] as const,
  states: [
    "new conversation",
    "no messages",
    "generating",
    "streaming",
    "paused",
    "complete",
    "failed",
    "canceled",
    "tool failure",
    "source unavailable",
    "retry",
    "waiting approval",
  ] as const,
  messageContract: [
    "role or kind",
    "consumer-supplied author",
    "structured content slots",
    "optional timestamp",
    "status",
    "attachments",
    "citations",
    "actions",
    "streaming/error state",
  ],
  composerContract: [
    "multiline text",
    "send and stop intent",
    "attachments through U05 Files",
    "prompt suggestions",
    "disabled/loading state",
    "keyboard and mobile safe-area behavior",
    "consumer-supplied context or character hint",
  ],
  sourceContract: [
    "label/index",
    "source title and metadata",
    "optional file/document/page/section/record location",
    "preview/open action slot",
    "excerpt when supplied",
  ],
  toolContract: [
    "tool name",
    "safe summary",
    "status",
    "safe parameter summary when allowed",
    "result/error",
    "duration when supplied",
    "review/retry/dismiss action slot",
  ],
  approvalContract: [
    "action summary",
    "impact",
    "target",
    "details",
    "risk/context",
    "approve/reject/cancel/edit action slots",
  ],
  consumerOwns: [
    "provider/model policy",
    "credentials and transport",
    "tool authorization and execution",
    "conversation persistence and retention",
    "retrieval, ranking, source trust, and citations",
    "safety and approval policy",
    "business permissions and domain mutations",
  ],
  ten4sevenOwns: [
    "message/composer/source/tool/approval presentation",
    "focus and accessible structure",
    "responsive and native adaptation",
    "loading, streaming, pending, complete, failed, and retry presentation",
  ],
  security: [
    "Do not expose tokens, passwords, credentials, or raw authorization headers by default.",
    "Fixtures and evidence use synthetic content and safe summaries.",
    "The UI does not infer or reveal private/internal chain-of-thought.",
  ],
  accessibility: [
    "Message roles, source context, tool status, and approval state are text-readable.",
    "Use a bounded live/status announcement for generation changes; never announce every streamed token.",
    "The transcript remains navigable while streaming.",
    "Composer, citation actions, tool actions, and approval actions have stable labels and visible focus/press feedback.",
  ],
  reasoningStatus: [
    "Thinking",
    "Analyzing",
    "Searching",
    "Using tool",
    "Preparing response",
  ] as const,
} as const;

export const ADVANCED_COMPONENT_DECISIONS = {
  EditorSurface: {
    id: "EditorSurface",
    displayName: "Editor Surface",
    family: "EDITORS",
    classification: "CANONICAL_COMPONENT",
    complexity: "L2_COMPOUND",
    inventoryStatus: "EXISTING_STABLE",
    platform: "WEB",
    nativeStrategy: "ALTERNATE_PATTERN",
    adaptiveStrategy: "web-only shell with limited native text alternative",
    engine: "Consumer-owned editor content or optional adapter.",
    engineBoundary: "consumer-engine",
    tokens: [
      "surface",
      "surface-raised",
      "border",
      "focus-ring",
      "control-height",
      "radius-panel",
      "shadow-card",
      "transition-standard",
    ],
    accessibility: editorAccessibility,
    states: editorStates,
    composesWith: ["Textarea", "Toolbar", "Kbd", "StateView"],
    alternatives: ["Textarea", "native text control"],
    webStrategy: "Token-led shell with consumer editor/content slot.",
    nativeStrategyNotes:
      "Read-only/basic text or external authoring flow; no native rich editor is claimed.",
  },
  PropertyInspector: {
    id: "PropertyInspector",
    displayName: "Property Inspector",
    family: "BUILDERS",
    classification: "CANONICAL_COMPONENT",
    complexity: "L2_COMPOUND",
    inventoryStatus: "EXISTING_STABLE",
    platform: "WEB",
    nativeStrategy: "ALTERNATE_PATTERN",
    adaptiveStrategy: "desktop rail to inspector sheet/screen",
    engine: "Canonical disclosure and form composition; no property engine.",
    engineBoundary: "consumer-engine",
    tokens: [
      "surface",
      "surface-raised",
      "border",
      "focus-ring",
      "control-height",
      "radius-panel",
      "shadow-card",
    ],
    accessibility: [
      "Use labelled disclosure sections and preserve native summary/details keyboard behavior.",
      "Compose canonical Field, Selection, Action, and Description contracts.",
      "Keep property labels, values, errors, reset actions, and override indicators readable.",
    ],
    states: [
      "idle",
      "focused",
      "expanded",
      "collapsed",
      "empty",
      "disabled",
      "error",
    ],
    composesWith: [
      "BuilderCanvas",
      "Accordion",
      "FormGrid",
      "DetailDrawer",
      "Field",
    ],
    alternatives: ["DetailDrawer", "native property sheet"],
    webStrategy: "Bounded inspector rail with canonical fields and disclosure.",
    nativeStrategyNotes:
      "Native sheet or detail screen; no desktop rail parity claim.",
  },
  BuilderCanvas: {
    id: "BuilderCanvas",
    displayName: "Builder Canvas",
    family: "BUILDERS",
    classification: "ENGINE_ADAPTER",
    complexity: "L4_ADVANCED_ENGINE",
    inventoryStatus: "EXISTING_STABLE",
    platform: "WEB",
    nativeStrategy: "ALTERNATE_PATTERN",
    adaptiveStrategy: "web stage to single-task native editing",
    engine: "Consumer-owned canvas/layout engine behind a bounded stage shell.",
    engineBoundary: "consumer-engine",
    tokens: [
      "surface",
      "surface-subtle",
      "border",
      "selected",
      "focus-ring",
      "radius-panel",
      "shadow-card",
      "transition-standard",
    ],
    accessibility: [
      "Give the stage a labelled region and expose selection, placement, and empty state as text.",
      "Provide non-drag selection and action alternatives for keyboard and assistive technology users.",
      "Do not make hover, tiny resize handles, or pointer gestures the only interaction path.",
    ],
    states: [
      "idle",
      "focused",
      "selected",
      "empty",
      "invalidTarget",
      "readOnly",
      "disabled",
      "error",
    ],
    composesWith: [
      "PropertyInspector",
      "SplitPane",
      "Toolbar",
      "DragHandle",
      "TreeView",
      "StateView",
    ],
    alternatives: ["single-task form", "list/detail", "native property sheet"],
    webStrategy:
      "Bounded stage with optional palette, outliner, inspector, and renderer-owned canvas.",
    nativeStrategyNotes:
      "Selected-node screen plus inspector sheet/screen; no full mobile canvas claim.",
  },
  PromptComposer: {
    id: "PromptComposer",
    displayName: "Prompt Composer",
    family: "AI_CONVERSATION",
    classification: "CANONICAL_COMPONENT",
    complexity: "L2_COMPOUND",
    inventoryStatus: "EXISTING_STABLE",
    platform: "BOTH",
    nativeStrategy: "ALTERNATE_PATTERN",
    adaptiveStrategy: "multiline input with mobile keyboard-safe action row",
    engine:
      "Canonical Textarea/Form composition; no model or transport engine.",
    engineBoundary: "optional-consumer-engine",
    tokens: [
      "surface",
      "surface-raised",
      "border",
      "focus-ring",
      "control-height",
      "radius-control",
      "transition-standard",
    ],
    accessibility: [
      "Expose a stable prompt label, value, disabled, busy, and submit/stop action state.",
      "Keep attachments, suggestions, and actions reachable without hover.",
      "Preserve focus, multiline, virtual-keyboard, and safe-area behavior on native.",
    ],
    states: [
      "idle",
      "draft",
      "focused",
      "submitting",
      "disabled",
      "error",
      "saved",
    ],
    composesWith: [
      "Textarea",
      "Button",
      "CommandMenu",
      "ConversationThread",
      "FilePreview",
    ],
    alternatives: ["Textarea"],
    webStrategy: "Form boundary with canonical Textarea and action slots.",
    nativeStrategyNotes:
      "Keyboard-avoiding composer with native attachment and send/stop press targets.",
  },
  ConversationThread: {
    id: "ConversationThread",
    displayName: "Conversation Thread",
    family: "AI_CONVERSATION",
    classification: "CANONICAL_COMPONENT",
    complexity: "L3_COLLECTION",
    inventoryStatus: "EXISTING_STABLE",
    platform: "BOTH",
    nativeStrategy: "ALTERNATE_PATTERN",
    adaptiveStrategy: "bounded transcript scroll with mobile message flow",
    engine: "Consumer-supplied ordered message collection.",
    engineBoundary: "renderer-implementation",
    tokens: [
      "surface",
      "surface-raised",
      "border",
      "selected",
      "focus-ring",
      "radius-panel",
      "shadow-card",
      "transition-standard",
    ],
    accessibility: [
      "Expose ordered message structure, role/kind, author, status, and content as readable text.",
      "Keep the transcript navigable during streaming and do not announce each token.",
      "Do not rely on role colors; use labels, structure, and status text.",
    ],
    states: ["empty", "ready", "streaming", "error", "disabled", "loading"],
    composesWith: [
      "PromptComposer",
      "CitationList",
      "ToolCallCard",
      "ApprovalPanel",
      "Badge",
    ],
    alternatives: ["ActivityFeed"],
    webStrategy: "Ordered semantic message collection with bounded scroll.",
    nativeStrategyNotes:
      "ScrollView/virtualized message collection with safe-area and status announcements.",
  },
  CitationList: {
    id: "CitationList",
    displayName: "Citation List",
    family: "AI_CONVERSATION",
    classification: "CANONICAL_COMPONENT",
    complexity: "L3_COLLECTION",
    inventoryStatus: "EXISTING_STABLE",
    platform: "BOTH",
    nativeStrategy: "ALTERNATE_PATTERN",
    adaptiveStrategy: "source list to preview sheet/screen",
    engine: "Consumer-supplied generic source collection.",
    engineBoundary: "renderer-implementation",
    tokens: [
      "surface",
      "surface-raised",
      "border",
      "focus-ring",
      "radius-panel",
      "shadow-card",
    ],
    accessibility: [
      "Expose source title, metadata, location, excerpt, and preview/open action as text.",
      "Do not assume a URL; files, documents, pages, records, and knowledge sources are valid.",
      "Use U06 overlay adaptation for preview and preserve focus/back behavior.",
    ],
    states: ["ready", "empty", "loading", "error", "disabled"],
    composesWith: [
      "ConversationThread",
      "Link",
      "Drawer",
      "DetailDrawer",
      "Tooltip",
    ],
    alternatives: ["KeyValueList"],
    webStrategy: "Ordered source list with optional link or preview action.",
    nativeStrategyNotes:
      "Source list with native sheet/detail preview; retrieval remains consumer-owned.",
  },
  ToolCallCard: {
    id: "ToolCallCard",
    displayName: "Tool Call Card",
    family: "AI_CONVERSATION",
    classification: "CANONICAL_COMPONENT",
    complexity: "L2_COMPOUND",
    inventoryStatus: "EXISTING_STABLE",
    platform: "BOTH",
    nativeStrategy: "ALTERNATE_PATTERN",
    adaptiveStrategy: "bounded status card with native detail expansion",
    engine: "Presentation-only tool invocation/result status.",
    engineBoundary: "renderer-implementation",
    tokens: [
      "surface",
      "surface-raised",
      "border",
      "focus-ring",
      "muted-foreground",
      "radius-panel",
      "shadow-card",
    ],
    accessibility: [
      "Expose tool name, status, safe summary, result/error, and actions as readable text.",
      "Do not expose raw sensitive parameters or credentials by default.",
      "Use canonical status and action semantics; no separate AI badge system.",
    ],
    states: [
      "pending",
      "running",
      "completed",
      "failed",
      "waitingApproval",
      "canceled",
    ],
    composesWith: [
      "ConversationThread",
      "StatusChip",
      "StateView",
      "Badge",
      "Button",
      "ApprovalPanel",
    ],
    alternatives: ["StateView"],
    webStrategy: "Expandable/bounded status presentation with safe summaries.",
    nativeStrategyNotes:
      "Native status card or detail sheet with labelled review actions.",
  },
  ApprovalPanel: {
    id: "ApprovalPanel",
    displayName: "Approval Panel",
    family: "AI_CONVERSATION",
    classification: "CANONICAL_COMPONENT",
    complexity: "L2_COMPOUND",
    inventoryStatus: "EXISTING_STABLE",
    platform: "BOTH",
    nativeStrategy: "ALTERNATE_PATTERN",
    adaptiveStrategy: "inline checkpoint to native confirmation sheet",
    engine: "Canonical presentation of a consumer/policy-supplied checkpoint.",
    engineBoundary: "renderer-implementation",
    tokens: [
      "surface",
      "surface-raised",
      "border",
      "focus-ring",
      "selected",
      "radius-panel",
      "shadow-card",
    ],
    accessibility: [
      "Expose action summary, impact, target, risk/context, and labelled approve/reject/cancel/edit actions.",
      "Keep approval meaning available without color or icon interpretation.",
      "Preserve focus containment/return on Web and native back/sheet behavior where applicable.",
    ],
    states: ["idle", "focused", "pending", "disabled", "error", "completed"],
    composesWith: ["ActionFooter", "AlertDialog", "ToolCallCard", "StateView"],
    alternatives: ["AlertDialog", "ActionFooter"],
    webStrategy:
      "Neutral checkpoint composition; AlertDialog for focused irreversible confirmation.",
    nativeStrategyNotes:
      "Native confirmation sheet/modal selected by renderer and consumer task intent.",
  },
  CommandMenu: {
    id: "CommandMenu",
    displayName: "Command Menu",
    family: "POWER_USER",
    classification: "CANONICAL_COMPONENT",
    complexity: "L3_COLLECTION",
    inventoryStatus: "EXISTING_STABLE",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    adaptiveStrategy:
      "keyboard-first command surface to native search/action surface",
    engine: "Canonical search/listbox presentation; consumer command registry.",
    engineBoundary: "renderer-implementation",
    tokens: [
      "surface",
      "surface-raised",
      "border",
      "focus-ring",
      "selected",
      "control-height",
      "radius-panel",
      "shadow-card",
      "transition-standard",
    ],
    accessibility: [
      "Expose labelled combobox/listbox semantics and active result.",
      "Support keyboard navigation, empty, disabled, dangerous, and focus-return states.",
      "Do not require a hardware keyboard for mobile task completion.",
    ],
    states: ["closed", "idle", "focused", "empty", "disabled", "confirming"],
    composesWith: ["Modal", "Input", "DropdownMenu", "AlertDialog", "Kbd"],
    alternatives: ["DropdownMenu", "search action surface"],
    webStrategy: "Canonical CommandMenu; CommandPalette remains an alias.",
    nativeStrategyNotes: "Native search/action surface or command sheet.",
  },
  DragHandle: {
    id: "DragHandle",
    displayName: "Drag Handle",
    family: "DRAG_AND_DROP",
    classification: "CANONICAL_COMPONENT",
    complexity: "L2_COMPOUND",
    inventoryStatus: "EXISTING_STABLE",
    platform: "WEB",
    nativeStrategy: "ALTERNATE_PATTERN",
    adaptiveStrategy: "optional pointer affordance with action alternative",
    engine: "Renderer-owned affordance; no DnD engine.",
    engineBoundary: "renderer-implementation",
    tokens: [
      "surface-subtle",
      "border",
      "focus-ring",
      "selected",
      "control-height",
      "radius-control",
    ],
    accessibility: [
      "Expose a clear reorder label and visible focus.",
      "Pair with Move up/down or Move to actions; drag is never the only operation.",
      "Do not imply that a pointer event itself is the canonical mutation.",
    ],
    states: ["idle", "focused", "dragging", "disabled", "invalidTarget"],
    composesWith: ["IconButton", "TreeView", "DataTable", "ActionMenu"],
    alternatives: ["Move action menu", "Button"],
    webStrategy: "Optional labelled pointer affordance around DND intent.",
    nativeStrategyNotes:
      "Use action sheet or explicit move/reorder controls; no tiny mouse handle.",
  },
  DiffViewer: {
    id: "DiffViewer",
    displayName: "Diff Viewer",
    family: "EDITORS",
    classification: "CANONICAL_COMPONENT",
    complexity: "L2_COMPOUND",
    inventoryStatus: "MISSING_CANONICAL",
    platform: "WEB",
    nativeStrategy: "NOT_APPLICABLE",
    adaptiveStrategy: "inline/split Web comparison to native read-only review",
    engine:
      "Consumer-supplied precomputed diff rows; optional computation adapter.",
    engineBoundary: "optional-consumer-engine",
    tokens: [
      "surface",
      "surface-subtle",
      "border",
      "selected",
      "focus-ring",
      "radius-panel",
      "shadow-card",
    ],
    accessibility: [
      "Expose before/after or context content and each row's added/removed/modified meaning.",
      "Use text markers and structure in addition to color.",
      "Keep the comparison bounded and readable at narrow widths and large text.",
    ],
    states: ["ready", "empty", "loading", "error", "readOnly"],
    composesWith: ["EditorSurface", "Table", "ScrollArea", "StateView"],
    alternatives: ["EditorSurface", "RevisionDiff", "Table"],
    webStrategy: "Semantic comparison table with inline or split modes.",
    nativeStrategyNotes:
      "Read-only comparison list/detail screen when native comparison is required.",
  },
} as const satisfies Readonly<
  Record<EditorBuilderAiComponent, AdvancedComponentDecision>
>;

export const NATIVE_ADVANCED_CANARY = {
  conversation: {
    id: "conversation",
    sourceComponent: "ConversationThread",
    platform: "BOTH",
    nativeStrategy: "ALTERNATE_PATTERN",
    nativeStatus: "planned",
    primitive: "ScrollView",
    presentation: "ordered message collection with bounded scroll",
    semanticOrder: "conversation heading → messages → status → actions",
    safeArea:
      "transcript and composer preserve bottom inset and keyboard space",
    touchSafeActions: "message actions and retry use labelled press targets",
    accessibility:
      "message role/context and bounded generation status announcement",
    cssParsing: false,
  },
  composer: {
    id: "composer",
    sourceComponent: "PromptComposer",
    platform: "BOTH",
    nativeStrategy: "ALTERNATE_PATTERN",
    nativeStatus: "planned",
    primitive: "TextInput + Pressable + ScrollView",
    presentation:
      "multiline keyboard-safe composer with send/stop and attachments",
    semanticOrder:
      "prompt label → text input → attachments/suggestions → send/stop",
    safeArea:
      "composer action row remains above the virtual keyboard and bottom inset",
    touchSafeActions:
      "send, stop, attachment, and suggestion actions remain labelled",
    accessibility: "input role, busy state, action labels, and focus return",
    cssParsing: false,
  },
  citationSource: {
    id: "citation-source",
    sourceComponent: "CitationList + Drawer/DetailDrawer",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    nativeStatus: "planned",
    primitive: "FlatList + native sheet/screen",
    presentation: "source list with native preview/detail surface",
    semanticOrder: "sources heading → source items → preview/detail → back",
    safeArea: "source preview actions and native back behavior stay inset-safe",
    touchSafeActions: "source preview/open actions use labelled press targets",
    accessibility:
      "source title, metadata, excerpt, and location remain readable",
    cssParsing: false,
  },
  toolApproval: {
    id: "tool-approval",
    sourceComponent: "ToolCallCard + ApprovalPanel",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    nativeStatus: "planned",
    primitive: "View + Pressable + native sheet/modal",
    presentation: "tool status followed by policy-supplied approval checkpoint",
    semanticOrder: "tool name → status → safe summary → impact → actions",
    safeArea:
      "approval actions remain reachable inside the native task surface",
    touchSafeActions:
      "approve, reject, cancel, and review use explicit press targets",
    accessibility: "status, approval meaning, and actions are text-readable",
    cssParsing: false,
  },
  reorder: {
    id: "reorder",
    sourceComponent: "DND intent + DragHandle",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    nativeStatus: "planned",
    primitive: "FlatList + Pressable + native action sheet",
    presentation: "optional long-press reorder with explicit move alternative",
    semanticOrder:
      "collection heading → item → move action → destination/status",
    safeArea: "move sheet and destination actions remain inset-safe",
    touchSafeActions:
      "Move to/Move before/Move after are labelled press actions",
    accessibility: "movement result is announced as bounded status text",
    cssParsing: false,
  },
  editorInspector: {
    id: "editor-inspector",
    sourceComponent: "EditorSurface + PropertyInspector",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    nativeStatus: "planned",
    primitive: "ScrollView + TextInput + native sheet",
    presentation: "single-task editing screen with inspector sheet",
    semanticOrder: "heading → editor content → status → inspector action",
    safeArea:
      "editor and inspector actions remain reachable with keyboard/insets",
    touchSafeActions:
      "focus, reset, and save-intent actions use labelled press targets",
    accessibility:
      "editing region, property labels, state, and actions remain readable",
    cssParsing: false,
  },
} as const;

export type NativeAdvancedCanaryId = keyof typeof NATIVE_ADVANCED_CANARY;

export function resolveNativeAdvancedCanary(
  id: NativeAdvancedCanaryId,
): (typeof NATIVE_ADVANCED_CANARY)[NativeAdvancedCanaryId] {
  return NATIVE_ADVANCED_CANARY[id];
}

export const WEB_ADVANCED_CANARY = {
  editor: {
    family: "EDITORS",
    components: ["EditorSurface", "DiffViewer", "Toolbar", "StateView"],
    fixture:
      "synthetic markdown draft with dirty, saving, saved, and error status",
    proof:
      "toolbar, editor content, state text, focus, read-only, and narrow measure",
  },
  builder: {
    family: "BUILDERS",
    components: ["BuilderCanvas", "TreeView", "PropertyInspector", "StateView"],
    fixture:
      "synthetic selected node with deep hierarchy and long property label",
    proof:
      "palette/outliner/canvas/inspector separation, no-selection/empty state, and keyboard disclosure",
  },
  dnd: {
    family: "DRAG_AND_DROP",
    components: ["DragHandle", "TreeView", "CommandMenu"],
    fixture: "synthetic reorder across two groups with one invalid target",
    proof:
      "reorder intent, valid/invalid target, cancel, and Move to/action alternative",
  },
  ai: {
    family: "AI_CONVERSATION",
    components: [
      "ConversationThread",
      "PromptComposer",
      "CitationList",
      "ToolCallCard",
      "ApprovalPanel",
    ],
    fixture:
      "synthetic long message, source, tool failure, approval pending, and streaming status",
    proof:
      "message/source/tool/approval structure, composer action, bounded status, and retry path",
  },
  powerUser: {
    family: "POWER_USER",
    components: ["CommandMenu", "Kbd", "AlertDialog"],
    fixture:
      "synthetic grouped commands with empty, disabled, shortcut, and dangerous entries",
    proof:
      "search, arrow navigation, shortcut metadata, empty state, and confirmation boundary",
  },
} as const;

export const U11_RECONCILIATION_STATUSES = [
  "NO IMPACT",
  "NEEDS METADATA SYNC",
  "NEEDS BLOCK/RECIPE SYNC",
  "NEEDS CONTRACT MIGRATION",
] as const;
export type U11ReconciliationStatus =
  (typeof U11_RECONCILIATION_STATUSES)[number];

export const U11_PROVISIONAL_RECONCILIATION = {
  "AI blocks": "NEEDS BLOCK/RECIPE SYNC",
  "Editor workspace": "NEEDS METADATA SYNC",
  "Builder workspace": "NEEDS BLOCK/RECIPE SYNC",
  "Productivity recipes": "NEEDS METADATA SYNC",
  "platform strategies": "NEEDS METADATA SYNC",
} as const satisfies Readonly<Record<string, U11ReconciliationStatus>>;

export const U12_RECONCILIATION_STATUSES = [
  "NO IMPACT",
  "NATIVE METADATA ONLY",
  "NATIVE LAB CANARY REQUIRED",
  "NATIVE RENDERER GAP",
  "NOT_APPLICABLE",
] as const;
export type U12ReconciliationStatus =
  (typeof U12_RECONCILIATION_STATUSES)[number];

export const U12_PROVISIONAL_RECONCILIATION = {
  "AI Conversation": "NATIVE LAB CANARY REQUIRED",
  Composer: "NATIVE LAB CANARY REQUIRED",
  Citation: "NATIVE LAB CANARY REQUIRED",
  "Tool Call": "NATIVE LAB CANARY REQUIRED",
  Approval: "NATIVE LAB CANARY REQUIRED",
  DnD: "NATIVE METADATA ONLY",
  Editor: "NATIVE RENDERER GAP",
  "Builder/Inspector": "NATIVE RENDERER GAP",
  CommandPalette: "NATIVE METADATA ONLY",
} as const satisfies Readonly<Record<string, U12ReconciliationStatus>>;

const dependencyLicenseBundleMatrix = [
  {
    component: "EditorSurface",
    dependency: "@ten4seven/ui + React peer",
    license: "MIT workspace source; no engine license",
    bundle: "base UI package; zero editor-engine runtime bytes",
  },
  {
    component: "PropertyInspector",
    dependency: "@ten4seven/ui + React peer",
    license: "MIT workspace source",
    bundle: "base UI package; disclosure and form composition only",
  },
  {
    component: "BuilderCanvas",
    dependency: "@ten4seven/ui + React peer",
    license: "MIT workspace source; no canvas-engine license",
    bundle: "base UI package; no canvas or DnD engine",
  },
  {
    component: "PromptComposer",
    dependency: "@ten4seven/ui + React peer",
    license: "MIT workspace source; no provider SDK",
    bundle: "base UI package; no model or transport SDK",
  },
  {
    component: "ConversationThread",
    dependency: "@ten4seven/ui + React peer",
    license: "MIT workspace source; no chat SDK",
    bundle: "base UI package; consumer supplies messages",
  },
  {
    component: "CitationList",
    dependency: "@ten4seven/ui + React peer",
    license: "MIT workspace source",
    bundle: "base UI package; consumer supplies sources",
  },
  {
    component: "ToolCallCard",
    dependency: "@ten4seven/ui + React peer",
    license: "MIT workspace source; no tool runtime",
    bundle: "base UI package; status presentation only",
  },
  {
    component: "ApprovalPanel",
    dependency: "@ten4seven/ui + React peer",
    license: "MIT workspace source; no policy engine",
    bundle: "base UI package; checkpoint presentation only",
  },
  {
    component: "CommandMenu",
    dependency: "@ten4seven/ui + React peer",
    license: "MIT workspace source; no command registry runtime",
    bundle: "base UI package; canonical search/listbox presentation",
  },
  {
    component: "DragHandle",
    dependency: "@ten4seven/ui + React peer",
    license: "MIT workspace source; no DnD engine",
    bundle: "base UI package; optional affordance only",
  },
  {
    component: "DiffViewer",
    dependency: "@ten4seven/ui + React peer",
    license: "MIT workspace source; no diff engine",
    bundle: "base UI package; precomputed-row presentation only",
  },
] as const;

export const EDITOR_BUILDER_AI_CONTRACT = {
  schemaVersion: "0.1",
  id: "editor-builder-ai-poweruser",
  displayName: "Editors, builders, DnD, AI and power-user surfaces",
  purpose:
    "Provide reusable presentation, interaction, accessibility, and engine-adapter boundaries for advanced authoring, builder inspection, intent-based movement, conversational work, sources, tool status, approval, and keyboard-first composition without importing a heavy engine or moving authority into Ten4Seven.",
  sourceOfTruth: "packages/contracts/src/editor-builder-ai.ts",
  platform: "ADAPTIVE",
  nativeStrategy: "ALTERNATE_PATTERN",
  resolverOrder: TOKEN_RESOLUTION_ORDER,
  taxonomy: {
    families: ADVANCED_COMPONENT_FAMILIES,
    classifications: ADVANCED_CLASSIFICATIONS,
    inventoryStatuses: ADVANCED_INVENTORY_STATUSES,
    complexities: ADVANCED_COMPLEXITIES,
    editors: EDITOR_FAMILIES,
    components: EDITOR_BUILDER_AI_COMPONENTS,
  },
  componentCount: EDITOR_BUILDER_AI_COMPONENTS.length,
  components: EDITOR_BUILDER_AI_COMPONENTS,
  componentDecisions: ADVANCED_COMPONENT_DECISIONS,
  editorTaxonomy: EDITOR_ENGINE_DECISIONS,
  editorEngineDecisions: EDITOR_ENGINE_DECISIONS,
  builder: BUILDER_ARCHITECTURE,
  builderParts: BUILDER_PART_DECISIONS,
  dragDrop: DND_INTENT_CONTRACT,
  commandShortcuts: COMMAND_SHORTCUT_CONTRACT,
  aiTaxonomy: AI_CONVERSATION_TAXONOMY,
  aiConversation: AI_CONVERSATION_CONTRACT,
  webCanary: WEB_ADVANCED_CANARY,
  nativeCanary: NATIVE_ADVANCED_CANARY,
  u11Reconciliation: U11_PROVISIONAL_RECONCILIATION,
  u12Reconciliation: U12_PROVISIONAL_RECONCILIATION,
  packageBoundary: {
    package: "@ten4seven/ui",
    publicTypes:
      "Ten4Seven semantic types only; vendor-specific types stay behind consumer adapters.",
    runtimeDependencies: [],
    optionalAdapterBoundary:
      "Consumers may lazy-load an editor, canvas, diff, DnD, model, or transport adapter and pass canonical content, rows, intents, or slots into these contracts.",
    decision:
      "Do not fragment into @ten4seven/editor, @ten4seven/ai, or @ten4seven/builder until independent runtime, release, and dependency boundaries are proven.",
  },
  dependencyLicenseBundleMatrix,
  engineRule: {
    default:
      "Prefer canonical shells, slots, native semantics, and lazy adapters before adding an engine.",
    forbidden:
      "Vendor theme objects, provider SDK types, editor document stores, canvas runtimes, DnD sensors, and model-specific request types in @ten4seven/ui.",
    adapterProof:
      "An optional engine must remain consumer-owned, lazy-loadable, license-reviewed, and replaceable without changing the canonical surface contract.",
  },
  aiBoundary: {
    ten4sevenPresents: [
      "prompt, message, source, citation, artifact, tool-call, and approval presentation",
      "keyboard-first command and submission affordances",
      "loading, streaming, pending, completed, failed, retry, and canceled states supplied by the consumer",
      "accessible structure, focus treatment, bounded status announcements, and responsive recomposition",
    ],
    consumerOwns: [
      "model and provider policy",
      "credentials and transport",
      "tool authorization and execution",
      "conversation persistence and retention",
      "safety policy and human review policy",
      "business permissions, entitlements, and domain mutations",
    ],
  },
  powerUser: {
    canonicalComponent: "CommandMenu",
    alias: "CommandPalette",
    scopes: COMMAND_SHORTCUT_SCOPES,
    keyboard: [
      "CommandMenu remains the canonical Cmd/Ctrl+K action surface when the host enables it.",
      "Kbd labels document shortcuts without owning the action.",
      "Command results expose arrow, Home, End, Enter, and Escape behavior.",
      "Hardware keyboard support is optional on native; mobile completion never depends on it.",
    ],
    pointerAlternative:
      "All task-critical actions remain available through labelled controls; drag, hover, and canvas gestures are optional renderer affordances.",
  },
  responsive: {
    desktop:
      "Keep editor content, builder stage, inspector, transcript, source, and action regions bounded with visible context.",
    tablet:
      "Reduce side-rail width or move inspector/source context below the primary stage before shrinking labels or controls.",
    mobile:
      "Stack the builder stage and inspector, keep prompt actions reachable, use list/detail or sheets, and let message/source lists own bounded scroll.",
  },
  accessibility: [
    "Use labelled regions, native form controls, native disclosure elements, ordered message/source lists, and text status alongside any icon or color.",
    "Preserve visible focus and keyboard reachability for commands, editing, prompt submission, inspector disclosure, movement alternatives, and consumer-provided actions.",
    "Expose editor, DnD, streaming, pending, completed, failed, approval, and retry states as readable text rather than motion or color alone.",
    "Keep citations, tool-call input/output summaries, and approval context in the reading order that explains the response or action.",
    "Use bounded status announcements for streaming and never create live-region spam for each streamed token.",
  ],
  themeStudio: {
    compatibility:
      "All advanced surfaces resolve through the same Ten4SevenProvider appearance, canvas, density, radius, typography, motion, contrast, and semantic token axes exercised by Theme Studio.",
    matrix: [
      "appearance: light and dark preserve contrast and focus treatment",
      "canvas: balanced, paper, and monochrome preserve neutral hierarchy",
      "density: comfortable, default, compact, and dense preserve control geometry",
      "motion: full and reduced preserve state meaning without required animation",
    ],
    noLocalPalette:
      "Advanced surfaces use canonical surface, border, selected, focus, control, radius, shadow, transition, and status roles; they do not introduce feature-local colors.",
  },
  aiMetadata: {
    retrieval:
      "Retrieve this contract for formatted document editing, source/code editing, version comparison, builder inspection, reorder intent, prompt and response presentation, citations, tool activity, approval, and keyboard command surfaces; only use implemented catalog entries.",
    aliases: [
      "advanced authoring",
      "rich text editor",
      "markdown editor",
      "code editor",
      "JSON editor",
      "diff viewer",
      "builder canvas",
      "builder inspector",
      "sortable reorder",
      "AI workspace",
      "conversation UI",
      "citation source",
      "tool approval",
      "power-user surface",
    ],
    intentPhrases: [
      "need an editor without choosing an editor engine",
      "need to compare versions",
      "need a builder canvas with contextual properties",
      "need a keyboard-accessible reorder path",
      "need prompt and response presentation with citations",
      "need tool-call status without granting tool authority",
      "need a human checkpoint before an external action",
    ],
    metadata: [
      "use_when",
      "avoid_when",
      "platform",
      "complexity",
      "engine boundary",
      "adaptive strategy",
      "states",
      "accessibility",
      "composes_with",
      "alternatives",
    ],
    showrooms: [
      "/component-lab#component-lab-u10-advanced-interactions",
      "/component-lab#component-lab-editors-builders-ai",
      "/components",
      "/theme-studio",
    ],
  },
  tokens: [
    "surface",
    "surface-raised",
    "surface-subtle",
    "border",
    "selected",
    "focus-ring",
    "muted-foreground",
    "control-height",
    "control-gap",
    "radius-control",
    "radius-panel",
    "shadow-card",
    "transition-standard",
  ],
  security: AI_CONVERSATION_CONTRACT.security,
  performance: {
    basePackage:
      "Advanced shells and contracts add no editor, diff, syntax, DnD, canvas, model, or transport runtime.",
    lazyBoundary:
      "Large editor engines, syntax packages, diff computation, canvas runtimes, DnD sensors, and long-transcript virtualization remain lazy consumer or approved adapter dependencies.",
    startup:
      "Consumers that only need Button/Input do not pay for advanced engines.",
    hydration:
      "A canonical loading state is required when an optional client-only engine is loaded; no unhandled hydration/client flicker is introduced by the contract.",
  },
  deferred: [
    "Rich text, Markdown, code, JSON parsing, syntax highlighting, and document models; use EditorSurface with a consumer-owned or optional lazy adapter.",
    "Diff computation engines, language services, schema validation, collaboration, version control, conflict resolution, and persistence.",
    "Schema/page/form builder engines, drag/drop mutation, undo/redo history, serialization, and collaboration; use BuilderCanvas and PropertyInspector as presentation boundaries.",
    "Diagram, node, and freeform canvas engines until a provider, license, persistence, keyboard, viewport, accessibility, and performance contract exists.",
    "Model/provider selection, streaming transport, tool execution, safety policy, conversation persistence, source ingestion, retrieval ranking, and business authorization.",
    "Full native implementations for Web-only editor, builder, inspector, DiffViewer, and DragHandle surfaces.",
  ],
  showrooms: [
    "/component-lab#component-lab-u10-advanced-interactions",
    "/component-lab#component-lab-editors-builders-ai",
    "/components",
    "/theme-studio",
  ],
} as const;

export const EDITOR_BUILDER_AI_PLANE = EDITOR_BUILDER_AI_CONTRACT;
