import { BRAND_PROFILE_IDS } from "./brand-profile.ts";
import {
  type AccessibilityObligationId,
  type ComponentPlatform,
  type ComponentPlatformContract,
  type ComponentRendererStrategy,
  type RendererAlternative,
  type RendererPresentation,
  type RendererStatus,
} from "./component-platform.ts";
import {
  COMPONENT_TOKEN_ROLE_CONTRACT,
  MEASURE_CONTRACT,
  TOKEN_DIMENSION_CLASSIFICATIONS,
  TOKEN_OWNERSHIP_CONTRACT,
  TOKEN_RESOLUTION_ORDER,
  type ComponentClassification,
  type MeasureName,
  type TokenDimensionClassification,
  type TokenOwnershipLayer,
} from "./foundation.ts";
import { CONTRACT_SCHEMA_VERSION, type BrandProfileId } from "./types.ts";

/**
 * U05 is a typed enrichment of the existing component registry. It does not
 * replace component-platform.ts, repeat catalog APIs, or create a second
 * component registry. Platform and renderer fields for implemented entries
 * are resolved from the U03 component-platform contract at projection time.
 */

export const INPUT_CONTRACT_FAMILIES = Object.freeze([
  "FORM",
  "SELECTION",
  "DATE_TIME",
  "FILES",
] as const);
export type InputContractFamily = (typeof INPUT_CONTRACT_FAMILIES)[number];

export const INPUT_CONTRACT_STATUSES = Object.freeze([
  "implemented",
  "planned",
  "deferred",
  "rejected",
] as const);
export type InputContractStatus = (typeof INPUT_CONTRACT_STATUSES)[number];

export const INPUT_CONTRACT_CLASSIFICATIONS = Object.freeze([
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
] as const satisfies readonly ComponentClassification[]);
export type InputContractClassification =
  (typeof INPUT_CONTRACT_CLASSIFICATIONS)[number];

export const INPUT_STATE_IDS = Object.freeze([
  "idle",
  "hover",
  "focus",
  "pressed",
  "selected",
  "expanded",
  "disabled",
  "readOnly",
  "invalid",
  "loading",
  "empty",
  "error",
  "success",
  "offline",
  "permission-denied",
  "retryAvailable",
  "virtualKeyboard",
] as const);
export type InputStateId = (typeof INPUT_STATE_IDS)[number];

export const INPUT_CONTROL_TYPES = Object.freeze([
  "text",
  "email",
  "search",
  "password",
  "number",
  "currency",
  "percent",
  "otp",
  "boolean",
  "date",
  "date-range",
  "time",
  "date-time",
  "file",
  "color",
] as const);
export type InputControlType = (typeof INPUT_CONTROL_TYPES)[number];

export const INPUT_SELECTION_MODES = Object.freeze([
  "none",
  "single",
  "multiple",
  "boolean",
  "range",
  "hierarchical-path",
  "hierarchical-nodes",
  "transfer",
  "color",
] as const);
export type InputSelectionMode = (typeof INPUT_SELECTION_MODES)[number];

export const INPUT_DATA_BOUNDARIES = Object.freeze([
  "consumer-value",
  "consumer-options-and-selection",
  "consumer-date-values",
  "consumer-file-metadata-and-transport",
  "consumer-device-capability-and-permission",
] as const);
export type InputDataBoundary = (typeof INPUT_DATA_BOUNDARIES)[number];

export const INPUT_VIRTUALIZATION_BOUNDARIES = Object.freeze([
  "not-needed-for-bounded-input",
  "renderer-bounded-calendar",
  "consumer-owned-for-large-collection",
  "consumer-owned-for-file-history",
] as const);
export type InputVirtualizationBoundary =
  (typeof INPUT_VIRTUALIZATION_BOUNDARIES)[number];

export const INPUT_TOKEN_ROLE_IDS = Object.freeze(
  Object.keys(COMPONENT_TOKEN_ROLE_CONTRACT.targets) as Array<
    keyof typeof COMPONENT_TOKEN_ROLE_CONTRACT.targets
  >,
);
export type InputTokenRoleId = (typeof INPUT_TOKEN_ROLE_IDS)[number];

export const INPUT_DIMENSION_OWNERSHIP = {
  controlMeasure: {
    layer: "COMPONENT",
    classification: "COMPONENT_SEMANTIC",
    source: "packages/contracts/src/foundation.ts#MEASURE_CONTRACT",
    note: "A control chooses a named measure; it does not author a pixel width.",
  },
  collectionMeasure: {
    layer: "COMPONENT",
    classification: "COMPONENT_SEMANTIC",
    source: "packages/contracts/src/foundation.ts#MEASURE_CONTRACT",
    note: "A collection may choose content or wide measure; item geometry remains component-owned.",
  },
  touchTarget: {
    layer: "COMPONENT",
    classification: "FIXED_SYSTEM_SEMANTIC",
    source: "packages/tokens/src/theme.ts#touchTarget",
    note: "The minimum touch target is a shared system obligation across Web and native renderers.",
  },
  stateColor: {
    layer: "SEMANTIC",
    classification: "DERIVED",
    source: "packages/tokens/src/theme.ts#semanticRoles",
    note: "Invalid, disabled, selected, and status colors resolve from semantic roles and never from route literals.",
  },
  profileChoice: {
    layer: "PRODUCT_PROFILE",
    classification: "PRODUCT_PROFILE",
    source: "packages/contracts/src/brand-profile.ts",
    note: "Profiles select named recipe, density, and approved brand aliases; they do not fork input components.",
  },
  oneOffArrangement: {
    layer: "SCOPE",
    classification: "COMPOSITION_LOCAL",
    source: "consumer composition",
    note: "A one-off arrangement can remain local when it has no system-wide reuse obligation.",
  },
} as const satisfies Readonly<
  Record<
    string,
    {
      readonly layer: TokenOwnershipLayer;
      readonly classification: TokenDimensionClassification;
      readonly source: string;
      readonly note: string;
    }
  >
>;

export const FORM_FIELD_ANATOMY = {
  label: {
    required: true,
    canonicalOwners: ["Field", "Label"],
    semantic: "accessible-name",
    note: "The label names the control; required or optional indication is supplementary text.",
  },
  description: {
    required: false,
    canonicalOwners: ["FieldDescription"],
    semantic: "supplemental-description",
    note: "Helper content is associated through aria-describedby or the equivalent renderer relationship.",
  },
  error: {
    required: false,
    canonicalOwners: ["FieldError"],
    semantic: "error-association",
    note: "Validation copy is associated with the invalid control and is not represented by color alone.",
  },
  action: {
    required: false,
    canonicalOwners: ["FormActions", "FormSection"],
    semantic: "actionable-role",
    note: "Actions remain explicit controls owned by the consumer and are ordered after the affected fields.",
  },
} as const;

export const FORM_STATE_SEMANTICS = {
  disabled:
    "Prevents interaction, remains discoverable, and exposes disabled-state semantics.",
  readOnly:
    "Keeps the value and accessible name available while preventing mutation.",
  invalid:
    "Exposes the invalid state and an associated explanation; no color-only error contract.",
  loading:
    "Communicates pending work and prevents duplicate activation where applicable.",
  empty:
    "Communicates an empty value or result set without treating absence as a rendering failure.",
  error:
    "Communicates a failed or rejected operation with recovery guidance when the consumer can provide it.",
  virtualKeyboard:
    "Keeps the active field, label, error, and primary action usable when the viewport is reduced.",
} as const;

export const DATE_TIME_VALUE_CONTRACT = {
  date: {
    format: "YYYY-MM-DD",
    timezone:
      "consumer-owned; the control stores a date value without timezone conversion",
  },
  time: {
    format: "HH:mm",
    timezone: "consumer-owned; the control stores a local wall-clock value",
  },
  range: {
    shape: "{ start?: YYYY-MM-DD; end?: YYYY-MM-DD }",
    ordering:
      "the component normalizes the selected range order; business period meaning stays with the consumer",
  },
  dateTime: {
    shape: "date plus time values composed from DatePicker and TimePicker",
    serialization: "consumer-owned; no implicit UTC conversion",
  },
} as const;

export const FILE_METADATA_CONTRACT = {
  shared: ["name", "size", "mimeType", "lastModified"],
  nativeOptional: ["uri", "source", "permissionState"],
  ownership:
    "The renderer selects or presents metadata; the consumer owns transport, persistence, authorization, and retention.",
  statuses: ["queued", "uploading", "success", "error", "canceled", "retrying"],
} as const;

export interface InputContractDefinition {
  readonly canonicalComponent: string;
  readonly displayName: string;
  readonly family: InputContractFamily;
  readonly classification: InputContractClassification;
  readonly status: Extract<InputContractStatus, "implemented">;
  readonly intent: string;
  readonly controlType?: InputControlType;
  readonly selectionMode?: InputSelectionMode;
  readonly measure: MeasureName;
  readonly tokenRoles: readonly InputTokenRoleId[];
  readonly states: readonly InputStateId[];
  readonly accessibility: readonly AccessibilityObligationId[];
  readonly useWhen: readonly string[];
  readonly avoidWhen: readonly string[];
  readonly dataBoundary: InputDataBoundary;
  readonly asyncStates: readonly InputStateId[];
  readonly virtualization: InputVirtualizationBoundary;
  readonly keyboard: readonly string[];
  readonly touch: readonly string[];
  readonly validation: readonly string[];
  readonly compatibility: readonly string[];
}

const formControlTokens = [
  "input-background",
  "input-border",
  "input-focus-border",
  "input-hover-border",
  "control-height",
  "control-radius",
  "focus-ring",
  "disabled-background",
  "disabled-foreground",
  "touch-target-min",
  "measure",
  "motion",
] as const satisfies readonly InputTokenRoleId[];

const fieldAnatomyTokens = [
  "foreground",
  "muted-foreground",
  "danger",
  "focus-ring",
  "measure",
  "motion",
] as const satisfies readonly InputTokenRoleId[];

const formCompositionTokens = [
  "surface",
  "surface-subtle",
  "border",
  "section-gap",
  "control-gap",
  "measure",
  "motion",
] as const satisfies readonly InputTokenRoleId[];

const selectionTokens = [
  "input-background",
  "input-border",
  "input-focus-border",
  "selected",
  "disabled-background",
  "disabled-foreground",
  "focus-ring",
  "control-height",
  "touch-target-min",
  "measure",
  "motion",
] as const satisfies readonly InputTokenRoleId[];

const hierarchyTokens = [
  "surface-raised",
  "surface-subtle",
  "border",
  "selected",
  "focus-ring",
  "control-gap",
  "touch-target-min",
  "measure",
  "motion",
] as const satisfies readonly InputTokenRoleId[];

const collectionTokens = [
  "surface",
  "surface-raised",
  "border",
  "selected",
  "focus-ring",
  "row-height",
  "touch-target-min",
  "measure",
  "motion",
] as const satisfies readonly InputTokenRoleId[];

const dateTimeTokens = [
  "input-background",
  "input-border",
  "input-focus-border",
  "surface-raised",
  "selected",
  "focus-ring",
  "control-height",
  "touch-target-min",
  "measure",
  "motion",
] as const satisfies readonly InputTokenRoleId[];

const fileTokens = [
  "surface-subtle",
  "surface-raised",
  "border",
  "selected",
  "focus-ring",
  "success",
  "info",
  "danger",
  "touch-target-min",
  "measure",
  "motion",
] as const satisfies readonly InputTokenRoleId[];

const fieldStates = [
  "idle",
  "focus",
  "disabled",
  "readOnly",
  "invalid",
  "loading",
  "empty",
] as const satisfies readonly InputStateId[];

const selectionStates = [
  "idle",
  "focus",
  "pressed",
  "selected",
  "expanded",
  "disabled",
  "readOnly",
  "invalid",
  "loading",
  "empty",
  "error",
] as const satisfies readonly InputStateId[];

const collectionStates = [
  ...selectionStates,
  "offline",
  "retryAvailable",
] as const satisfies readonly InputStateId[];

const dateTimeStates = [
  "idle",
  "focus",
  "pressed",
  "selected",
  "expanded",
  "disabled",
  "readOnly",
  "invalid",
  "loading",
  "empty",
] as const satisfies readonly InputStateId[];

const fileStates = [
  "idle",
  "focus",
  "pressed",
  "disabled",
  "selected",
  "loading",
  "empty",
  "error",
  "success",
  "offline",
  "permission-denied",
  "retryAvailable",
] as const satisfies readonly InputStateId[];

const baseCompatibility = [
  "Consumes the existing @ten4seven/ui export and catalog entry.",
  "A consumer may continue using the existing Web props and event callbacks.",
  "No product profile or route-specific primitive is introduced.",
] as const;

const defaultInputIntents: Readonly<Record<InputContractFamily, string>> = {
  FORM: "Collect or compose a labelled form value.",
  SELECTION: "Commit a bounded selection value or set of values.",
  DATE_TIME:
    "Collect a stable date or time value without owning business calendar meaning.",
  FILES:
    "Select or present file metadata without owning transport or persistence.",
};

type InputContractDefinitionInput = Omit<
  InputContractDefinition,
  "canonicalComponent" | "intent"
> & { readonly intent?: string };

const define = <T extends InputContractDefinitionInput>(
  canonicalComponent: string,
  definition: T,
) =>
  ({
    canonicalComponent,
    ...definition,
    intent: definition.intent ?? defaultInputIntents[definition.family],
  }) as const;

export const INPUT_CONTRACT_DEFINITIONS = {
  Input: define("Input", {
    displayName: "Input",
    family: "FORM",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent:
      "Collect one short text value with an accessible field relationship.",
    controlType: "text",
    measure: "control",
    tokenRoles: formControlTokens,
    states: fieldStates,
    accessibility: [
      "accessible-name",
      "input-role",
      "value-state",
      "disabled-state",
      "invalid-state",
      "error-association",
      "focus-or-press-feedback",
      "virtual-keyboard",
    ],
    useWhen: ["short text", "identifiers", "email", "bounded search values"],
    avoidWhen: ["long multiline content", "finite choices", "secret values"],
    dataBoundary: "consumer-value",
    asyncStates: ["loading", "error"],
    virtualization: "not-needed-for-bounded-input",
    keyboard: [
      "native text editing",
      "Tab reaches the control",
      "Enter is consumer-owned",
    ],
    touch: ["shared touch-target minimum", "virtual keyboard remains usable"],
    validation: [
      "consumer supplies required and domain validation",
      "error text is associated with the control",
    ],
    compatibility: baseCompatibility,
  }),
  Textarea: define("Textarea", {
    displayName: "Textarea",
    family: "FORM",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent: "Collect bounded multiline plain text.",
    controlType: "text",
    measure: "content",
    tokenRoles: formControlTokens,
    states: fieldStates,
    accessibility: [
      "accessible-name",
      "input-role",
      "value-state",
      "disabled-state",
      "invalid-state",
      "error-association",
      "focus-or-press-feedback",
      "virtual-keyboard",
    ],
    useWhen: ["notes", "descriptions", "short comments"],
    avoidWhen: ["rich text", "structured document editing"],
    dataBoundary: "consumer-value",
    asyncStates: ["loading", "error"],
    virtualization: "not-needed-for-bounded-input",
    keyboard: [
      "native multiline editing",
      "Tab reaches the control",
      "consumer owns submit behavior",
    ],
    touch: [
      "shared touch-target minimum",
      "content remains reachable above the virtual keyboard",
    ],
    validation: [
      "consumer owns length and content validation",
      "error is associated with the control",
    ],
    compatibility: baseCompatibility,
  }),
  PasswordInput: define("PasswordInput", {
    displayName: "Password Input",
    family: "FORM",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent:
      "Collect a secret value with native password semantics and an explicit visibility action.",
    controlType: "password",
    measure: "control",
    tokenRoles: formControlTokens,
    states: fieldStates,
    accessibility: [
      "accessible-name",
      "input-role",
      "value-state",
      "disabled-state",
      "invalid-state",
      "error-association",
      "actionable-role",
      "focus-or-press-feedback",
      "virtual-keyboard",
    ],
    useWhen: ["authentication", "credential changes", "secret entry"],
    avoidWhen: ["non-secret text", "one-time verification codes"],
    dataBoundary: "consumer-value",
    asyncStates: ["loading", "error"],
    virtualization: "not-needed-for-bounded-input",
    keyboard: [
      "native password editing",
      "visibility action is a separate button",
      "Tab reaches input then visibility action",
    ],
    touch: [
      "visibility action keeps the shared touch-target minimum",
      "virtual keyboard remains usable",
    ],
    validation: [
      "consumer owns password policy",
      "invalid copy remains associated",
    ],
    compatibility: baseCompatibility,
  }),
  NumberInput: define("NumberInput", {
    displayName: "Number Input",
    family: "FORM",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent: "Collect a numeric quantity without owning domain arithmetic.",
    controlType: "number",
    measure: "control",
    tokenRoles: formControlTokens,
    states: fieldStates,
    accessibility: [
      "accessible-name",
      "input-role",
      "value-state",
      "disabled-state",
      "invalid-state",
      "error-association",
      "focus-or-press-feedback",
      "virtual-keyboard",
    ],
    useWhen: ["counts", "quantities", "measurements"],
    avoidWhen: ["currency display only", "freeform formatted identifiers"],
    dataBoundary: "consumer-value",
    asyncStates: ["loading", "error"],
    virtualization: "not-needed-for-bounded-input",
    keyboard: [
      "native numeric editing",
      "consumer owns min, max, and step semantics",
    ],
    touch: [
      "numeric virtual keyboard is allowed",
      "shared touch-target minimum",
    ],
    validation: [
      "consumer owns numeric range and precision policy",
      "invalid copy is associated",
    ],
    compatibility: baseCompatibility,
  }),
  CurrencyInput: define("CurrencyInput", {
    displayName: "Currency Input",
    family: "FORM",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent:
      "Collect a monetary value while leaving locale and ledger meaning to the consumer.",
    controlType: "currency",
    measure: "control",
    tokenRoles: formControlTokens,
    states: fieldStates,
    accessibility: [
      "accessible-name",
      "input-role",
      "value-state",
      "disabled-state",
      "invalid-state",
      "error-association",
      "focus-or-press-feedback",
      "virtual-keyboard",
    ],
    useWhen: ["editable prices", "amounts", "rates with currency context"],
    avoidWhen: ["display-only price", "ledger authority or localization logic"],
    dataBoundary: "consumer-value",
    asyncStates: ["loading", "error"],
    virtualization: "not-needed-for-bounded-input",
    keyboard: [
      "numeric editing",
      "consumer supplies currency context and parsing policy",
    ],
    touch: [
      "numeric virtual keyboard is allowed",
      "shared touch-target minimum",
    ],
    validation: [
      "consumer owns precision, currency, and business rules",
      "invalid copy is associated",
    ],
    compatibility: baseCompatibility,
  }),
  PercentInput: define("PercentInput", {
    displayName: "Percent Input",
    family: "FORM",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent:
      "Collect a percentage value with explicit range and helper semantics.",
    controlType: "percent",
    measure: "control",
    tokenRoles: formControlTokens,
    states: fieldStates,
    accessibility: [
      "accessible-name",
      "input-role",
      "value-state",
      "disabled-state",
      "invalid-state",
      "error-association",
      "focus-or-press-feedback",
      "virtual-keyboard",
    ],
    useWhen: ["rates", "discounts", "percentages"],
    avoidWhen: ["display-only trends", "progress visualization"],
    dataBoundary: "consumer-value",
    asyncStates: ["loading", "error"],
    virtualization: "not-needed-for-bounded-input",
    keyboard: ["numeric editing", "consumer owns range and precision"],
    touch: [
      "numeric virtual keyboard is allowed",
      "shared touch-target minimum",
    ],
    validation: [
      "consumer owns percentage range and domain meaning",
      "invalid copy is associated",
    ],
    compatibility: baseCompatibility,
  }),
  OtpInput: define("OtpInput", {
    displayName: "Otp Input",
    family: "FORM",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent:
      "Collect a short verification code with paste distribution and predictable focus movement.",
    controlType: "otp",
    measure: "control",
    tokenRoles: formControlTokens,
    states: fieldStates,
    accessibility: [
      "accessible-name",
      "input-role",
      "value-state",
      "disabled-state",
      "invalid-state",
      "error-association",
      "focus-or-press-feedback",
      "keyboard-navigation",
      "virtual-keyboard",
    ],
    useWhen: ["two-factor verification", "account verification"],
    avoidWhen: ["passwords", "freeform text"],
    dataBoundary: "consumer-value",
    asyncStates: ["loading", "error", "retryAvailable"],
    virtualization: "not-needed-for-bounded-input",
    keyboard: [
      "ArrowLeft and ArrowRight move between slots",
      "Backspace returns to the previous empty slot",
      "paste distributes digits",
    ],
    touch: [
      "numeric virtual keyboard is allowed",
      "each slot retains the shared touch-target minimum",
    ],
    validation: [
      "consumer owns code verification and retry timing",
      "invalid or retry state is consumer-provided",
    ],
    compatibility: baseCompatibility,
  }),
  SearchInput: define("SearchInput", {
    displayName: "Search Input",
    family: "FORM",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent:
      "Query a visible result set with the canonical search input semantics.",
    controlType: "search",
    measure: "control",
    tokenRoles: formControlTokens,
    states: fieldStates,
    accessibility: [
      "accessible-name",
      "input-role",
      "value-state",
      "disabled-state",
      "invalid-state",
      "error-association",
      "focus-or-press-feedback",
      "virtual-keyboard",
    ],
    useWhen: [
      "querying a visible result set",
      "filtering a collection by text",
    ],
    avoidWhen: [
      "choosing from a finite list",
      "unbounded search without consumer data handling",
    ],
    dataBoundary: "consumer-value",
    asyncStates: ["loading", "empty", "error"],
    virtualization: "consumer-owned-for-large-collection",
    keyboard: ["native search editing", "consumer owns submit or query timing"],
    touch: ["virtual keyboard remains usable", "shared touch-target minimum"],
    validation: [
      "consumer owns query validity and result meaning",
      "empty results remain a collection state",
    ],
    compatibility: baseCompatibility,
  }),
  Field: define("Field", {
    displayName: "Field",
    family: "FORM",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent:
      "Compose label, description, error, and one consumer-owned control relationship.",
    measure: "control",
    tokenRoles: fieldAnatomyTokens,
    states: fieldStates,
    accessibility: [
      "accessible-name",
      "supplemental-description",
      "error-association",
      "structure-order",
    ],
    useWhen: ["compound controls need shared field anatomy"],
    avoidWhen: ["an existing labelled control already owns its anatomy"],
    dataBoundary: "consumer-value",
    asyncStates: ["loading", "error"],
    virtualization: "not-needed-for-bounded-input",
    keyboard: [
      "preserves the child control keyboard model",
      "label precedes control and feedback in reading order",
    ],
    touch: ["does not shrink the child control touch target"],
    validation: [
      "consumer supplies the control id and validation message",
      "Field owns placement and relationship identifiers",
    ],
    compatibility: baseCompatibility,
  }),
  Label: define("Label", {
    displayName: "Label",
    family: "FORM",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent: "Name a control with optional required or optional indication.",
    measure: "control",
    tokenRoles: fieldAnatomyTokens,
    states: ["idle", "disabled", "readOnly"] as const,
    accessibility: ["accessible-name", "structure-order"],
    useWhen: ["compound field anatomy", "consumer-owned native controls"],
    avoidWhen: ["decorative captions"],
    dataBoundary: "consumer-value",
    asyncStates: [],
    virtualization: "not-needed-for-bounded-input",
    keyboard: ["label activation delegates to the associated control"],
    touch: [
      "label remains a generous activation target when the renderer permits it",
    ],
    validation: ["does not evaluate requiredness"],
    compatibility: baseCompatibility,
  }),
  FieldDescription: define("FieldDescription", {
    displayName: "Field Description",
    family: "FORM",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent:
      "Provide supplemental instructions associated with a field or group.",
    measure: "control",
    tokenRoles: fieldAnatomyTokens,
    states: ["idle", "disabled", "readOnly"] as const,
    accessibility: ["supplemental-description", "structure-order"],
    useWhen: ["format guidance", "contextual helper text"],
    avoidWhen: ["the only visible error explanation"],
    dataBoundary: "consumer-value",
    asyncStates: [],
    virtualization: "not-needed-for-bounded-input",
    keyboard: ["non-interactive content follows the labelled control"],
    touch: ["does not own a touch target"],
    validation: ["consumer supplies the content and relationship"],
    compatibility: baseCompatibility,
  }),
  FieldError: define("FieldError", {
    displayName: "Field Error",
    family: "FORM",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent:
      "Expose an associated validation or operation error with an announcement path.",
    measure: "control",
    tokenRoles: ["danger", "foreground", "focus-ring", "measure", "motion"],
    states: ["error", "invalid", "retryAvailable"] as const,
    accessibility: [
      "error-association",
      "invalid-state",
      "status-announcement",
      "non-color-status",
    ],
    useWhen: ["consumer validation errors", "recoverable field failures"],
    avoidWhen: ["success copy", "authorization decisions"],
    dataBoundary: "consumer-value",
    asyncStates: ["error", "retryAvailable"],
    virtualization: "not-needed-for-bounded-input",
    keyboard: ["remains in document order after the affected control"],
    touch: ["does not own a touch target"],
    validation: [
      "consumer owns the rule and error message",
      "renderer owns association and non-color presentation",
    ],
    compatibility: baseCompatibility,
  }),
  FieldGroup: define("FieldGroup", {
    displayName: "Field Group",
    family: "FORM",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent:
      "Group related controls with fieldset, legend, description, and error semantics.",
    measure: "content",
    tokenRoles: formCompositionTokens,
    states: ["idle", "disabled", "loading", "error"] as const,
    accessibility: [
      "accessible-name",
      "structure-order",
      "error-association",
      "actionable-role",
    ],
    useWhen: ["related controls share one question", "grouped validation"],
    avoidWhen: ["one standalone control", "page-level section composition"],
    dataBoundary: "consumer-value",
    asyncStates: ["loading", "error"],
    virtualization: "not-needed-for-bounded-input",
    keyboard: [
      "fieldset and legend preserve the child control keyboard model",
      "child controls retain source order",
    ],
    touch: [
      "grouping does not shrink child touch targets",
      "group actions retain the shared touch-target minimum",
    ],
    validation: [
      "consumer owns group rules and messages",
      "renderer associates group errors with the fieldset",
    ],
    compatibility: baseCompatibility,
  }),
  FormSection: define("FormSection", {
    displayName: "Form Section",
    family: "FORM",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent:
      "Group related fields under one titled section with an optional section action.",
    measure: "content",
    tokenRoles: formCompositionTokens,
    states: ["idle", "disabled", "loading", "error"] as const,
    accessibility: ["accessible-name", "structure-order", "actionable-role"],
    useWhen: ["long forms", "settings sections", "bounded field groups"],
    avoidWhen: ["one standalone field", "a page-level shell or route header"],
    dataBoundary: "consumer-value",
    asyncStates: ["loading", "error"],
    virtualization: "not-needed-for-bounded-input",
    keyboard: [
      "heading, fields, and optional section action retain document order",
    ],
    touch: ["section actions retain the shared touch-target minimum"],
    validation: ["consumer owns field rules and section-level meaning"],
    compatibility: baseCompatibility,
  }),
  FormGrid: define("FormGrid", {
    displayName: "Form Grid",
    family: "FORM",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent:
      "Arrange related fields with responsive columns while preserving source order.",
    measure: "content",
    tokenRoles: formCompositionTokens,
    states: ["idle", "disabled", "loading", "error"] as const,
    accessibility: ["structure-order", "focus-or-press-feedback"],
    useWhen: [
      "related fields can share a responsive row",
      "bounded form composition",
    ],
    avoidWhen: [
      "unrelated dashboard layout",
      "a field needs a separate adaptive pattern",
    ],
    dataBoundary: "consumer-value",
    asyncStates: ["loading", "error"],
    virtualization: "not-needed-for-bounded-input",
    keyboard: [
      "CSS layout may reflow but DOM/source order remains authoritative",
    ],
    touch: [
      "columns collapse before controls lose useful measure",
      "child controls retain shared touch-target geometry",
    ],
    validation: ["consumer owns field relationships and validation"],
    compatibility: baseCompatibility,
  }),
  FormActions: define("FormActions", {
    displayName: "Form Actions",
    family: "FORM",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent:
      "Group submit, cancel, and secondary form actions in a predictable order.",
    measure: "content",
    tokenRoles: formCompositionTokens,
    states: ["idle", "focus", "disabled", "loading", "error"] as const,
    accessibility: [
      "actionable-role",
      "structure-order",
      "focus-or-press-feedback",
    ],
    useWhen: ["form submit and cancel actions", "responsive action rows"],
    avoidWhen: ["page navigation", "unrelated toolbar actions"],
    dataBoundary: "consumer-value",
    asyncStates: ["loading", "error", "retryAvailable"],
    virtualization: "not-needed-for-bounded-input",
    keyboard: [
      "action order follows the consumer's task priority",
      "submit remains a real action control",
    ],
    touch: [
      "actions wrap or stack while retaining shared touch-target minimums",
    ],
    validation: ["consumer owns submit state, validation, and navigation"],
    compatibility: baseCompatibility,
  }),
  Checkbox: define("Checkbox", {
    displayName: "Checkbox",
    family: "SELECTION",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent:
      "Choose a boolean or one item in a multi-choice set, including indeterminate state.",
    controlType: "boolean",
    selectionMode: "boolean",
    measure: "control",
    tokenRoles: selectionTokens,
    states: selectionStates,
    accessibility: [
      "accessible-name",
      "input-role",
      "value-state",
      "selection-state",
      "disabled-state",
      "focus-or-press-feedback",
      "keyboard-navigation",
    ],
    useWhen: ["boolean preferences", "multi-select filters", "row selection"],
    avoidWhen: [
      "mutually exclusive choices",
      "immediate compact setting toggle",
    ],
    dataBoundary: "consumer-value",
    asyncStates: ["loading", "error"],
    virtualization: "consumer-owned-for-large-collection",
    keyboard: [
      "Space toggles",
      "indeterminate is exposed as state rather than color",
    ],
    touch: ["label and control preserve the shared touch-target minimum"],
    validation: ["consumer owns required agreement and business meaning"],
    compatibility: baseCompatibility,
  }),
  CheckboxGroup: define("CheckboxGroup", {
    displayName: "Checkbox Group",
    family: "SELECTION",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent: "Group related checkboxes under one fieldset and legend.",
    selectionMode: "multiple",
    measure: "content",
    tokenRoles: formCompositionTokens,
    states: selectionStates,
    accessibility: [
      "accessible-name",
      "selection-state",
      "disabled-state",
      "invalid-state",
      "error-association",
      "ordered-structure",
    ],
    useWhen: ["labelled multi-choice groups"],
    avoidWhen: ["one standalone boolean", "large remote option sets"],
    dataBoundary: "consumer-options-and-selection",
    asyncStates: ["loading", "empty", "error"],
    virtualization: "consumer-owned-for-large-collection",
    keyboard: [
      "fieldset reading order is preserved",
      "child checkboxes retain native keyboard behavior",
    ],
    touch: ["child control targets remain shared minimum"],
    validation: ["consumer owns group requiredness and option meaning"],
    compatibility: baseCompatibility,
  }),
  Radio: define("Radio", {
    displayName: "Radio",
    family: "SELECTION",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent: "Choose exactly one value from a small mutually exclusive set.",
    selectionMode: "single",
    measure: "control",
    tokenRoles: selectionTokens,
    states: selectionStates,
    accessibility: [
      "accessible-name",
      "input-role",
      "value-state",
      "selection-state",
      "disabled-state",
      "focus-or-press-feedback",
      "keyboard-navigation",
    ],
    useWhen: ["small single-choice sets", "visible preference options"],
    avoidWhen: ["multi-selection", "large searchable choices"],
    dataBoundary: "consumer-value",
    asyncStates: ["loading", "error"],
    virtualization: "consumer-owned-for-large-collection",
    keyboard: [
      "native radio group keyboard behavior",
      "selection is exposed independently from visual emphasis",
    ],
    touch: ["label and control preserve the shared touch-target minimum"],
    validation: ["consumer owns requiredness and option meaning"],
    compatibility: baseCompatibility,
  }),
  RadioGroup: define("RadioGroup", {
    displayName: "Radio Group",
    family: "SELECTION",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent: "Group related radios under one fieldset and legend.",
    selectionMode: "single",
    measure: "content",
    tokenRoles: formCompositionTokens,
    states: selectionStates,
    accessibility: [
      "accessible-name",
      "selection-state",
      "disabled-state",
      "invalid-state",
      "error-association",
      "ordered-structure",
    ],
    useWhen: ["labelled mutually exclusive options"],
    avoidWhen: ["large searchable selections", "multiple values"],
    dataBoundary: "consumer-options-and-selection",
    asyncStates: ["loading", "empty", "error"],
    virtualization: "consumer-owned-for-large-collection",
    keyboard: [
      "fieldset reading order is preserved",
      "child radios retain native keyboard behavior",
    ],
    touch: ["child control targets remain shared minimum"],
    validation: ["consumer owns group requiredness and option meaning"],
    compatibility: baseCompatibility,
  }),
  Switch: define("Switch", {
    displayName: "Switch",
    family: "SELECTION",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent: "Toggle one immediate boolean preference.",
    controlType: "boolean",
    selectionMode: "boolean",
    measure: "control",
    tokenRoles: selectionTokens,
    states: selectionStates,
    accessibility: [
      "accessible-name",
      "input-role",
      "value-state",
      "selection-state",
      "disabled-state",
      "focus-or-press-feedback",
    ],
    useWhen: ["settings that apply immediately as a binary choice"],
    avoidWhen: ["submit-required agreement", "multiple choices"],
    dataBoundary: "consumer-value",
    asyncStates: ["loading", "error"],
    virtualization: "not-needed-for-bounded-input",
    keyboard: [
      "Space toggles",
      "state is exposed independently from the visual track",
    ],
    touch: ["switch target preserves the shared minimum"],
    validation: ["consumer owns persistence and business effect"],
    compatibility: baseCompatibility,
  }),
  Slider: define("Slider", {
    displayName: "Slider",
    family: "SELECTION",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent: "Choose one numeric value along a bounded continuum.",
    controlType: "number",
    selectionMode: "single",
    measure: "content",
    tokenRoles: selectionTokens,
    states: selectionStates,
    accessibility: [
      "accessible-name",
      "input-role",
      "value-state",
      "disabled-state",
      "focus-or-press-feedback",
      "keyboard-navigation",
    ],
    useWhen: ["bounded numeric adjustment", "non-tabular continuous ranges"],
    avoidWhen: ["precise numeric entry", "two independent endpoints"],
    dataBoundary: "consumer-value",
    asyncStates: ["loading", "error"],
    virtualization: "not-needed-for-bounded-input",
    keyboard: ["Arrow keys adjust", "Home and End reach range boundaries"],
    touch: ["gesture and thumb target use shared touch geometry"],
    validation: ["consumer owns min, max, step, and business meaning"],
    compatibility: baseCompatibility,
  }),
  RangeSlider: define("RangeSlider", {
    displayName: "Range Slider",
    family: "SELECTION",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    intent: "Choose two ordered numeric endpoints along a bounded continuum.",
    controlType: "number",
    selectionMode: "range",
    measure: "content",
    tokenRoles: selectionTokens,
    states: selectionStates,
    accessibility: [
      "accessible-name",
      "input-role",
      "value-state",
      "disabled-state",
      "focus-or-press-feedback",
      "keyboard-navigation",
    ],
    useWhen: ["bounded numeric ranges", "filter windows"],
    avoidWhen: ["one precise numeric value", "date ranges"],
    dataBoundary: "consumer-value",
    asyncStates: ["loading", "error"],
    virtualization: "not-needed-for-bounded-input",
    keyboard: [
      "each endpoint has an independent keyboard path",
      "Arrow, Home, and End retain range semantics",
    ],
    touch: [
      "each thumb has shared touch-target geometry",
      "crossing policy remains consumer-owned",
    ],
    validation: ["consumer owns ordering, min, max, and step"],
    compatibility: baseCompatibility,
  }),
  Select: define("Select", {
    displayName: "Select",
    family: "SELECTION",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    selectionMode: "single",
    measure: "control",
    tokenRoles: selectionTokens,
    states: selectionStates,
    accessibility: [
      "accessible-name",
      "selection-state",
      "expanded-state",
      "disabled-state",
      "invalid-state",
      "focus-or-press-feedback",
      "keyboard-navigation",
    ],
    useWhen: [
      "finite known options",
      "moderate option count",
      "custom popup behavior",
    ],
    avoidWhen: [
      "freeform text",
      "huge remote datasets",
      "intentional native platform behavior",
    ],
    dataBoundary: "consumer-options-and-selection",
    asyncStates: ["loading", "empty", "error"],
    virtualization: "consumer-owned-for-large-collection",
    keyboard: [
      "Arrow keys move",
      "Enter or Space commits",
      "Escape dismisses without changing the value",
    ],
    touch: ["trigger and options retain shared touch-target geometry"],
    validation: [
      "consumer owns option validity",
      "invalid state is associated with the trigger",
    ],
    compatibility: baseCompatibility,
  }),
  NativeSelect: define("NativeSelect", {
    displayName: "Native Select",
    family: "SELECTION",
    classification: "COMPONENT_VARIANT",
    status: "implemented",
    selectionMode: "single",
    measure: "control",
    tokenRoles: selectionTokens,
    states: selectionStates,
    accessibility: [
      "accessible-name",
      "selection-state",
      "disabled-state",
      "invalid-state",
      "focus-or-press-feedback",
    ],
    useWhen: [
      "intentional platform-native selection",
      "native form integration",
    ],
    avoidWhen: ["custom popup behavior", "searchable options"],
    dataBoundary: "consumer-options-and-selection",
    asyncStates: ["loading", "empty", "error"],
    virtualization: "consumer-owned-for-large-collection",
    keyboard: ["native platform select keyboard behavior"],
    touch: ["native picker or select behavior is intentional"],
    validation: ["consumer owns option validity and native form integration"],
    compatibility: [
      ...baseCompatibility,
      "This is a renderer-level variant of Select; it is not a new semantic selection intent.",
    ],
  }),
  Combobox: define("Combobox", {
    displayName: "Combobox",
    family: "SELECTION",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    controlType: "search",
    selectionMode: "single",
    measure: "control",
    tokenRoles: selectionTokens,
    states: collectionStates,
    accessibility: [
      "accessible-name",
      "input-role",
      "expanded-state",
      "selection-state",
      "loading-state",
      "empty-state",
      "disabled-state",
      "keyboard-navigation",
      "focus-or-press-feedback",
    ],
    useWhen: ["typed narrowing of a bounded option list"],
    avoidWhen: [
      "unbounded remote search without consumer data and loading ownership",
    ],
    dataBoundary: "consumer-options-and-selection",
    asyncStates: ["loading", "empty", "error", "retryAvailable"],
    virtualization: "consumer-owned-for-large-collection",
    keyboard: [
      "Arrow keys move the active option",
      "Enter commits",
      "Escape closes without changing committed value",
    ],
    touch: [
      "input remains usable with the virtual keyboard",
      "options retain touch-target geometry",
    ],
    validation: [
      "consumer owns remote query, option loading, and value validity",
    ],
    compatibility: baseCompatibility,
  }),
  MultiSelect: define("MultiSelect", {
    displayName: "Multi Select",
    family: "SELECTION",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    selectionMode: "multiple",
    measure: "control",
    tokenRoles: selectionTokens,
    states: collectionStates,
    accessibility: [
      "accessible-name",
      "selection-state",
      "expanded-state",
      "loading-state",
      "empty-state",
      "disabled-state",
      "invalid-state",
      "keyboard-navigation",
      "focus-or-press-feedback",
    ],
    useWhen: [
      "small multi-value selections",
      "filters with visible committed values",
    ],
    avoidWhen: [
      "huge remote datasets",
      "single value selection",
      "freeform tags",
    ],
    dataBoundary: "consumer-options-and-selection",
    asyncStates: ["loading", "empty", "error", "retryAvailable"],
    virtualization: "consumer-owned-for-large-collection",
    keyboard: [
      "one listbox owns focus",
      "Arrow, Home, and End navigate",
      "Enter or Space toggles",
      "Escape restores trigger focus",
    ],
    touch: ["trigger and option rows retain shared touch-target geometry"],
    validation: ["consumer owns minimum, maximum, and option validity"],
    compatibility: baseCompatibility,
  }),
  HierarchyPicker: define("HierarchyPicker", {
    displayName: "Hierarchy Picker",
    family: "SELECTION",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    selectionMode: "hierarchical-nodes",
    measure: "content",
    tokenRoles: hierarchyTokens,
    states: collectionStates,
    accessibility: [
      "accessible-name",
      "selection-state",
      "expanded-state",
      "selected-state",
      "empty-state",
      "loading-state",
      "disabled-state",
      "keyboard-navigation",
      "focus-or-press-feedback",
      "structure-order",
    ],
    useWhen: [
      "nested resource scope",
      "ancestor and descendant selection",
      "visible hierarchy context",
    ],
    avoidWhen: [
      "flat choices",
      "path-only selection",
      "navigation without selection",
    ],
    dataBoundary: "consumer-options-and-selection",
    asyncStates: ["loading", "empty", "error", "retryAvailable"],
    virtualization: "consumer-owned-for-large-collection",
    keyboard: [
      "tree keyboard navigation",
      "Home and End reach boundaries",
      "Space and Enter select without changing expansion meaning",
    ],
    touch: [
      "branch expansion and selection retain separate touch targets",
      "nested rows remain readable on compact surfaces",
    ],
    validation: [
      "consumer owns authorization and scope meaning",
      "disabled nodes explain their state",
    ],
    compatibility: baseCompatibility,
  }),
  Cascader: define("Cascader", {
    displayName: "Cascader",
    family: "SELECTION",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    selectionMode: "hierarchical-path",
    measure: "control",
    tokenRoles: hierarchyTokens,
    states: selectionStates,
    accessibility: [
      "accessible-name",
      "selection-state",
      "expanded-state",
      "disabled-state",
      "invalid-state",
      "keyboard-navigation",
      "focus-return",
      "focus-or-press-feedback",
    ],
    useWhen: [
      "selecting one final leaf through a hierarchy",
      "path context is more useful than a flat label",
    ],
    avoidWhen: [
      "flat options",
      "multiple nodes",
      "hierarchy is primarily for browsing",
    ],
    dataBoundary: "consumer-options-and-selection",
    asyncStates: ["loading", "empty", "error"],
    virtualization: "consumer-owned-for-large-collection",
    keyboard: [
      "ArrowLeft returns to the parent level",
      "ArrowRight opens a branch",
      "Enter or Space commits a leaf",
      "Escape restores trigger focus",
    ],
    touch: [
      "level navigation remains reachable on narrow surfaces",
      "branch and leaf rows retain touch-target geometry",
    ],
    validation: ["consumer owns path validity and permission meaning"],
    compatibility: baseCompatibility,
  }),
  Transfer: define("Transfer", {
    displayName: "Transfer",
    family: "SELECTION",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    selectionMode: "transfer",
    measure: "content",
    tokenRoles: collectionTokens,
    states: collectionStates,
    accessibility: [
      "accessible-name",
      "selection-state",
      "empty-state",
      "disabled-state",
      "keyboard-navigation",
      "focus-or-press-feedback",
      "ordered-structure",
    ],
    useWhen: [
      "explicit membership selection",
      "bounded available and selected relationships",
    ],
    avoidWhen: [
      "single select",
      "small multi-select",
      "huge remote option sets",
    ],
    dataBoundary: "consumer-options-and-selection",
    asyncStates: ["loading", "empty", "error", "retryAvailable"],
    virtualization: "consumer-owned-for-large-collection",
    keyboard: [
      "each listbox has one tabbable owner",
      "active descendant moves with Arrow, Home, and End",
      "move actions remain keyboard reachable",
    ],
    touch: [
      "two list regions and actions stack without losing relationship meaning",
    ],
    validation: ["consumer owns membership rules and persistence"],
    compatibility: baseCompatibility,
  }),
  TagsInput: define("TagsInput", {
    displayName: "Tags Input",
    family: "SELECTION",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    controlType: "text",
    selectionMode: "multiple",
    measure: "control",
    tokenRoles: formControlTokens,
    states: [
      "idle",
      "focus",
      "selected",
      "disabled",
      "readOnly",
      "invalid",
      "empty",
      "error",
    ] as const,
    accessibility: [
      "accessible-name",
      "input-role",
      "selection-state",
      "disabled-state",
      "invalid-state",
      "error-association",
      "keyboard-navigation",
      "focus-or-press-feedback",
    ],
    useWhen: ["multiple short labels", "visible removable values"],
    avoidWhen: ["finite known options", "long rich text"],
    dataBoundary: "consumer-value",
    asyncStates: ["loading", "error"],
    virtualization: "not-needed-for-bounded-input",
    keyboard: [
      "Enter or comma commits",
      "Backspace removes the last token when empty",
      "remove actions are explicit buttons",
    ],
    touch: [
      "remove actions retain the shared touch-target minimum",
      "input remains usable with the virtual keyboard",
    ],
    validation: ["consumer owns normalization, duplicates, and maximum count"],
    compatibility: baseCompatibility,
  }),
  ColorPicker: define("ColorPicker", {
    displayName: "Color Picker",
    family: "SELECTION",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    controlType: "color",
    selectionMode: "color",
    measure: "control",
    tokenRoles: formControlTokens,
    states: selectionStates,
    accessibility: [
      "accessible-name",
      "input-role",
      "value-state",
      "selection-state",
      "disabled-state",
      "invalid-state",
      "focus-or-press-feedback",
    ],
    useWhen: [
      "explicit user-authored color values",
      "intentional platform color affordance",
    ],
    avoidWhen: [
      "semantic state that should use a token",
      "display-only data visualization color",
    ],
    dataBoundary: "consumer-value",
    asyncStates: ["loading", "error"],
    virtualization: "not-needed-for-bounded-input",
    keyboard: [
      "native color control and text value remain separately named",
      "preset buttons are explicit actions",
    ],
    touch: [
      "native picker and preset controls retain shared touch-target geometry",
    ],
    validation: [
      "consumer owns accepted color format and whether it maps to a profile or token",
    ],
    compatibility: baseCompatibility,
  }),
  Calendar: define("Calendar", {
    displayName: "Calendar",
    family: "DATE_TIME",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    controlType: "date",
    selectionMode: "single",
    measure: "content",
    tokenRoles: dateTimeTokens,
    states: dateTimeStates,
    accessibility: [
      "accessible-name",
      "selection-state",
      "keyboard-navigation",
      "focus-or-press-feedback",
      "disabled-state",
      "structure-order",
    ],
    useWhen: ["date selection inside DatePicker or DateRangePicker"],
    avoidWhen: ["timezone arithmetic", "business calendar authority"],
    dataBoundary: "consumer-date-values",
    asyncStates: ["loading", "empty", "error"],
    virtualization: "renderer-bounded-calendar",
    keyboard: [
      "Arrow keys move by day or week",
      "Home and End move within a week",
      "PageUp and PageDown move months",
    ],
    touch: [
      "day buttons retain touch-target geometry",
      "month navigation remains explicit",
    ],
    validation: [
      "consumer owns min, max, disabled-date rules, and period meaning",
    ],
    compatibility: baseCompatibility,
  }),
  DatePicker: define("DatePicker", {
    displayName: "Date Picker",
    family: "DATE_TIME",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    controlType: "date",
    selectionMode: "single",
    measure: "control",
    tokenRoles: dateTimeTokens,
    states: dateTimeStates,
    accessibility: [
      "accessible-name",
      "input-role",
      "expanded-state",
      "selection-state",
      "disabled-state",
      "invalid-state",
      "error-association",
      "focus-return",
      "keyboard-navigation",
      "virtual-keyboard",
    ],
    useWhen: ["one calendar date", "date entry with stable YYYY-MM-DD values"],
    avoidWhen: ["timezone selection", "date intervals", "time-only values"],
    dataBoundary: "consumer-date-values",
    asyncStates: ["loading", "empty", "error"],
    virtualization: "renderer-bounded-calendar",
    keyboard: [
      "text entry accepts the canonical date value",
      "calendar dialog is dismissible",
      "focus returns to the trigger field",
    ],
    touch: [
      "calendar action retains shared touch-target geometry",
      "input remains usable with the virtual keyboard",
    ],
    validation: ["consumer owns date validity, min, max, and timezone policy"],
    compatibility: baseCompatibility,
  }),
  DateRangePicker: define("DateRangePicker", {
    displayName: "Date Range Picker",
    family: "DATE_TIME",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    controlType: "date-range",
    selectionMode: "range",
    measure: "content",
    tokenRoles: dateTimeTokens,
    states: dateTimeStates,
    accessibility: [
      "accessible-name",
      "expanded-state",
      "selection-state",
      "disabled-state",
      "invalid-state",
      "error-association",
      "focus-return",
      "keyboard-navigation",
      "virtual-keyboard",
    ],
    useWhen: [
      "bounded start and end dates",
      "planning, reporting, and filter windows",
    ],
    avoidWhen: ["timezone ranges", "recurring periods", "one date only"],
    dataBoundary: "consumer-date-values",
    asyncStates: ["loading", "empty", "error"],
    virtualization: "renderer-bounded-calendar",
    keyboard: [
      "calendar grid retains keyboard navigation",
      "Escape closes and restores trigger focus",
      "clear is an explicit action",
    ],
    touch: [
      "range boundaries remain reachable on compact surfaces",
      "clear action retains shared touch-target geometry",
    ],
    validation: ["consumer owns period rules, min, max, and timezone policy"],
    compatibility: baseCompatibility,
  }),
  NativeTimeInput: define("NativeTimeInput", {
    displayName: "Native Time Input",
    family: "DATE_TIME",
    classification: "COMPONENT_VARIANT",
    status: "implemented",
    controlType: "time",
    selectionMode: "single",
    measure: "control",
    tokenRoles: formControlTokens,
    states: fieldStates,
    accessibility: [
      "accessible-name",
      "input-role",
      "value-state",
      "disabled-state",
      "invalid-state",
      "error-association",
      "focus-or-press-feedback",
      "virtual-keyboard",
    ],
    useWhen: ["intentional browser or platform-native time behavior"],
    avoidWhen: ["shared bounded listbox time behavior"],
    dataBoundary: "consumer-date-values",
    asyncStates: ["loading", "error"],
    virtualization: "not-needed-for-bounded-input",
    keyboard: ["native time editing and keyboard semantics"],
    touch: [
      "native time picker behavior is intentional",
      "virtual keyboard remains usable",
    ],
    validation: ["consumer owns time range and timezone meaning"],
    compatibility: [
      ...baseCompatibility,
      "This is the explicit native-control variant of the shared time intent.",
    ],
  }),
  TimePicker: define("TimePicker", {
    displayName: "Time Picker",
    family: "DATE_TIME",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    controlType: "time",
    selectionMode: "single",
    measure: "control",
    tokenRoles: dateTimeTokens,
    states: dateTimeStates,
    accessibility: [
      "accessible-name",
      "input-role",
      "expanded-state",
      "selection-state",
      "disabled-state",
      "invalid-state",
      "error-association",
      "focus-return",
      "keyboard-navigation",
      "virtual-keyboard",
    ],
    useWhen: [
      "bounded shared time list",
      "consistent hour, minute, and period selection",
    ],
    avoidWhen: ["platform-native time behavior is intentional"],
    dataBoundary: "consumer-date-values",
    asyncStates: ["loading", "empty", "error"],
    virtualization: "consumer-owned-for-large-collection",
    keyboard: [
      "Arrow keys move through the bounded list",
      "Enter commits",
      "Escape restores the trigger",
    ],
    touch: [
      "list options retain shared touch-target geometry",
      "virtual keyboard remains usable when text entry is present",
    ],
    validation: ["consumer owns time range, minute step, and timezone meaning"],
    compatibility: baseCompatibility,
  }),
  DateTimeInput: define("DateTimeInput", {
    displayName: "Date–Time Input",
    family: "DATE_TIME",
    classification: "COMPOSITE_BLOCK",
    status: "implemented",
    controlType: "date-time",
    selectionMode: "single",
    measure: "content",
    tokenRoles: formCompositionTokens,
    states: dateTimeStates,
    accessibility: [
      "accessible-name",
      "input-role",
      "value-state",
      "disabled-state",
      "invalid-state",
      "error-association",
      "structure-order",
      "virtual-keyboard",
    ],
    useWhen: ["a form needs one date and one local time value"],
    avoidWhen: [
      "timezone-aware instant selection",
      "date-only or time-only entry",
    ],
    dataBoundary: "consumer-date-values",
    asyncStates: ["loading", "empty", "error"],
    virtualization: "renderer-bounded-calendar",
    keyboard: [
      "date and time children retain their canonical keyboard models",
      "reading order is date then time",
    ],
    touch: [
      "children retain shared touch-target geometry",
      "layout remains usable above the virtual keyboard",
    ],
    validation: [
      "consumer owns whether the pair is complete and how it serializes",
    ],
    compatibility: baseCompatibility,
  }),
  FileUpload: define("FileUpload", {
    displayName: "File Upload",
    family: "FILES",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    controlType: "file",
    selectionMode: "multiple",
    measure: "content",
    tokenRoles: fileTokens,
    states: fileStates,
    accessibility: [
      "accessible-name",
      "file-state",
      "disabled-state",
      "error-association",
      "focus-or-press-feedback",
      "hardware-capability",
    ],
    useWhen: [
      "client-side file selection",
      "bounded drag-and-drop on Web",
      "handoff to consumer transport",
    ],
    avoidWhen: [
      "server upload orchestration",
      "persistence",
      "authorization",
      "native-only source selection",
    ],
    dataBoundary: "consumer-file-metadata-and-transport",
    asyncStates: [
      "loading",
      "empty",
      "error",
      "permission-denied",
      "retryAvailable",
    ],
    virtualization: "consumer-owned-for-file-history",
    keyboard: [
      "one semantic button opens the hidden file input",
      "focus remains on the button",
      "rejection is consumer-handled",
    ],
    touch: [
      "button and drop surface retain shared touch-target geometry",
      "native source is selected by the future renderer",
    ],
    validation: [
      "accept, max size, and max files are client-side guards",
      "consumer owns transport and server validation",
    ],
    compatibility: baseCompatibility,
  }),
  FileItem: define("FileItem", {
    displayName: "File Item",
    family: "FILES",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    controlType: "file",
    measure: "content",
    tokenRoles: fileTokens,
    states: fileStates,
    accessibility: [
      "accessible-name",
      "file-state",
      "error-association",
      "disabled-state",
      "non-color-status",
      "focus-or-press-feedback",
    ],
    useWhen: [
      "one selected or transferring file record",
      "queue-like presentation supplied by the consumer",
    ],
    avoidWhen: ["network transport", "retry policy", "persistence"],
    dataBoundary: "consumer-file-metadata-and-transport",
    asyncStates: [
      "loading",
      "empty",
      "error",
      "permission-denied",
      "retryAvailable",
    ],
    virtualization: "consumer-owned-for-file-history",
    keyboard: [
      "remove is an explicit action",
      "status and progress remain readable text",
    ],
    touch: [
      "remove action retains the shared touch-target minimum",
      "long names remain readable in narrow surfaces",
    ],
    validation: [
      "consumer owns transport state and retry handlers",
      "renderer presents supplied state",
    ],
    compatibility: baseCompatibility,
  }),
  FileList: define("FileList", {
    displayName: "File List",
    family: "FILES",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    controlType: "file",
    measure: "content",
    tokenRoles: fileTokens,
    states: fileStates,
    accessibility: [
      "accessible-name",
      "file-state",
      "empty-state",
      "ordered-structure",
      "non-color-status",
    ],
    useWhen: [
      "ordered selected-file presentation",
      "consumer-owned transfer history",
    ],
    avoidWhen: ["upload transport or queue orchestration"],
    dataBoundary: "consumer-file-metadata-and-transport",
    asyncStates: ["loading", "empty", "error", "retryAvailable"],
    virtualization: "consumer-owned-for-file-history",
    keyboard: ["list order and each item action remain in reading order"],
    touch: ["items reflow and preserve touch-safe actions"],
    validation: ["consumer supplies item state and recovery actions"],
    compatibility: baseCompatibility,
  }),
  FilePreview: define("FilePreview", {
    displayName: "File Preview",
    family: "FILES",
    classification: "CANONICAL_COMPONENT",
    status: "implemented",
    controlType: "file",
    measure: "content",
    tokenRoles: fileTokens,
    states: fileStates,
    accessibility: [
      "accessible-name",
      "file-state",
      "alternative-text",
      "non-color-status",
      "focus-or-press-feedback",
    ],
    useWhen: [
      "bounded file metadata and preview",
      "processing or error presentation",
    ],
    avoidWhen: ["file selection", "transport", "authorization"],
    dataBoundary: "consumer-file-metadata-and-transport",
    asyncStates: ["loading", "empty", "error", "retryAvailable"],
    virtualization: "consumer-owned-for-file-history",
    keyboard: [
      "preview, download, and remove remain explicit actions",
      "image alternative text is meaningful",
    ],
    touch: [
      "actions retain shared touch-target geometry",
      "metadata reflows without widening the route",
    ],
    validation: [
      "consumer owns preview authorization, source URLs, and retention",
    ],
    compatibility: baseCompatibility,
  }),
} as const satisfies Readonly<Record<string, InputContractDefinition>>;

export const INPUT_GAP_DECISIONS = {
  TreeSelect: {
    id: "TreeSelect",
    displayName: "Tree Select",
    family: "SELECTION",
    classification: "REJECTED_DUPLICATE",
    status: "rejected",
    canonicalComponent: "HierarchyPicker",
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    nativeAlternative: "hierarchy-list",
    reason:
      "A tree-shaped selection is already owned by HierarchyPicker; a path-shaped selection is owned by Cascader.",
    aiGuidance:
      "Choose HierarchyPicker for nested node selection and Cascader for one final path leaf.",
  },
  DateInput: {
    id: "DateInput",
    displayName: "Date Input",
    family: "DATE_TIME",
    classification: "DEFERRED",
    status: "deferred",
    canonicalComponent: "DatePicker",
    platform: "ADAPTIVE",
    rendererStrategy: "NATIVE_RENDERER",
    nativeAlternative: "native-date-time-control",
    reason:
      "Direct date text entry is already the input half of DatePicker; a separate public identity would duplicate the value and validation boundary.",
    aiGuidance:
      "Use DatePicker for a date field; revisit a separate DateInput only if a distinct parsing or validation contract is approved.",
  },
  FileInput: {
    id: "FileInput",
    displayName: "File Input",
    family: "FILES",
    classification: "REJECTED_DUPLICATE",
    status: "rejected",
    canonicalComponent: "FileUpload",
    platform: "ADAPTIVE",
    rendererStrategy: "NATIVE_RENDERER",
    nativeAlternative: "document-picker",
    reason:
      "FileUpload owns the one authoritative trigger and hidden browser input; exposing FileInput would create a competing file-selection API.",
    aiGuidance:
      "Use FileUpload for selection and pass accepted File metadata to consumer-owned transport.",
  },
  Dropzone: {
    id: "Dropzone",
    displayName: "Dropzone",
    family: "FILES",
    classification: "REJECTED_DUPLICATE",
    status: "rejected",
    canonicalComponent: "FileUpload",
    platform: "ADAPTIVE",
    rendererStrategy: "NATIVE_RENDERER",
    nativeAlternative: "document-picker",
    reason:
      "Dropzone is a Web presentation behavior inside FileUpload, not a separate cross-platform selection intent.",
    aiGuidance:
      "Use FileUpload; do not create a mobile dropzone. The native renderer maps the same intent to a picker or camera source.",
  },
  UploadQueue: {
    id: "UploadQueue",
    displayName: "Upload Queue",
    family: "FILES",
    classification: "DEFERRED",
    status: "deferred",
    canonicalComponent: "FileList",
    platform: "ADAPTIVE",
    rendererStrategy: "NATIVE_RENDERER",
    nativeAlternative: "list-detail",
    reason:
      "Queue transport, retry, cancellation, and persistence belong to the consumer or an approved engine; FileList and FileItem remain the presentation boundary.",
    aiGuidance:
      "Compose FileList/FileItem with consumer-owned transport state; do not add network behavior to the UI package.",
  },
  Signature: {
    id: "Signature",
    displayName: "Signature",
    family: "FILES",
    classification: "ENGINE_ADAPTER",
    status: "deferred",
    platform: "ADAPTIVE",
    rendererStrategy: "ALTERNATE_PATTERN",
    nativeAlternative: "native-modal",
    reason:
      "Capture, stroke smoothing, persistence, and consent semantics require an approved drawing/signature engine and product policy.",
    aiGuidance:
      "Defer until an engine adapter and signature-consent contract are approved; do not implement a canvas in a consumer route.",
  },
} as const;

export type InputGapDecision =
  (typeof INPUT_GAP_DECISIONS)[keyof typeof INPUT_GAP_DECISIONS];

export interface DeviceSourceContract {
  readonly id: string;
  readonly displayName: string;
  readonly family: "FILES";
  readonly classification: "NATIVE_ONLY";
  readonly status: "planned";
  readonly platform: "NATIVE";
  readonly rendererStrategy: "NATIVE_RENDERER";
  readonly nativeStatus: "planned";
  readonly webStatus: "not-applicable";
  readonly nativePresentation: RendererPresentation;
  readonly webAlternativeComponent: "FileUpload";
  readonly capabilities: readonly string[];
  readonly metadata: readonly string[];
  readonly consumerOwns: readonly string[];
  readonly accessibility: readonly AccessibilityObligationId[];
  readonly note: string;
}

export const DEVICE_SOURCE_CONTRACTS = {
  DocumentPicker: {
    id: "DocumentPicker",
    displayName: "Document Picker",
    family: "FILES",
    classification: "NATIVE_ONLY",
    status: "planned",
    platform: "NATIVE",
    rendererStrategy: "NATIVE_RENDERER",
    nativeStatus: "planned",
    webStatus: "not-applicable",
    nativePresentation: "native-document-picker",
    webAlternativeComponent: "FileUpload",
    capabilities: ["documents.read", "multiple-selection", "mime-filter"],
    metadata: [
      "uri",
      "name",
      "mimeType",
      "size",
      "lastModified",
      "permissionState",
    ],
    consumerOwns: ["business-data", "handlers", "permissions", "persistence"],
    accessibility: [
      "accessible-name",
      "file-state",
      "hardware-capability",
      "focus-or-press-feedback",
    ],
    note: "Native source metadata only; the future renderer chooses the platform document provider and reports cancellation or permission failure.",
  },
  ImagePicker: {
    id: "ImagePicker",
    displayName: "Image Picker",
    family: "FILES",
    classification: "NATIVE_ONLY",
    status: "planned",
    platform: "NATIVE",
    rendererStrategy: "NATIVE_RENDERER",
    nativeStatus: "planned",
    webStatus: "not-applicable",
    nativePresentation: "native-picker",
    webAlternativeComponent: "FileUpload",
    capabilities: ["photo-library.read", "multiple-selection", "image-filter"],
    metadata: [
      "uri",
      "name",
      "mimeType",
      "size",
      "lastModified",
      "permissionState",
    ],
    consumerOwns: ["business-data", "handlers", "permissions", "persistence"],
    accessibility: [
      "accessible-name",
      "file-state",
      "hardware-capability",
      "focus-or-press-feedback",
    ],
    note: "Native photo-library source metadata only; no image storage or upload behavior is owned here.",
  },
  CameraCapture: {
    id: "CameraCapture",
    displayName: "Camera Capture",
    family: "FILES",
    classification: "NATIVE_ONLY",
    status: "planned",
    platform: "NATIVE",
    rendererStrategy: "NATIVE_RENDERER",
    nativeStatus: "planned",
    webStatus: "not-applicable",
    nativePresentation: "native-picker",
    webAlternativeComponent: "FileUpload",
    capabilities: ["camera.capture", "photo-capture", "permission-gated"],
    metadata: [
      "uri",
      "name",
      "mimeType",
      "size",
      "lastModified",
      "permissionState",
      "captureSource",
    ],
    consumerOwns: ["business-data", "handlers", "permissions", "persistence"],
    accessibility: [
      "accessible-name",
      "file-state",
      "hardware-capability",
      "focus-or-press-feedback",
    ],
    note: "Native camera source metadata only; capability, permission, cancellation, and capture failure remain explicit states.",
  },
} as const satisfies Readonly<Record<string, DeviceSourceContract>>;

export interface ResolvedInputContract extends InputContractDefinition {
  readonly platform: ComponentPlatform;
  readonly rendererStrategy: ComponentRendererStrategy;
  readonly nativeStatus: RendererStatus;
  readonly webStatus: RendererStatus;
  readonly webPresentation: RendererPresentation;
  readonly nativePresentation: RendererPresentation;
  readonly nativeAlternative?: RendererAlternative;
  readonly webAlternative?: RendererAlternative;
  readonly componentPlatformSource: "packages/contracts/src/component-platform.ts";
  readonly platformSemanticIntent: ComponentPlatformContract["semanticIntent"];
  readonly platformInteractionModel: ComponentPlatformContract["interactionModel"];
  readonly platformCriticalStates: ComponentPlatformContract["criticalStates"];
  readonly platformAccessibilityObligations: ComponentPlatformContract["accessibilityObligations"];
}

export function resolveInputContract(
  name: string,
  platform: ComponentPlatformContract,
): ResolvedInputContract | undefined {
  const definition =
    INPUT_CONTRACT_DEFINITIONS[name as keyof typeof INPUT_CONTRACT_DEFINITIONS];
  if (!definition) return undefined;
  return {
    ...definition,
    platform: platform.platform,
    rendererStrategy: platform.rendererStrategy,
    nativeStatus: platform.native.status,
    webStatus: platform.web.status,
    webPresentation: platform.web.presentation,
    nativePresentation: platform.native.presentation,
    ...(platform.nativeAlternative
      ? { nativeAlternative: platform.nativeAlternative }
      : {}),
    ...(platform.webAlternative
      ? { webAlternative: platform.webAlternative }
      : {}),
    componentPlatformSource: "packages/contracts/src/component-platform.ts",
    platformSemanticIntent: platform.semanticIntent,
    platformInteractionModel: platform.interactionModel,
    platformCriticalStates: platform.criticalStates,
    platformAccessibilityObligations: platform.accessibilityObligations,
  };
}

export const INPUT_CONTRACT_PLANE = {
  schemaVersion: CONTRACT_SCHEMA_VERSION,
  id: "input-contract-plane",
  sourceOfTruth: "packages/contracts/src/input-contracts.ts",
  platformSourceOfTruth: "packages/contracts/src/component-platform.ts",
  tokenSourceOfTruth:
    "packages/contracts/src/foundation.ts and packages/tokens/src/theme.ts",
  taxonomy: {
    families: INPUT_CONTRACT_FAMILIES,
    classifications: INPUT_CONTRACT_CLASSIFICATIONS,
    statuses: INPUT_CONTRACT_STATUSES,
  },
  ownership: {
    tokenLayers: "TOKEN_OWNERSHIP_CONTRACT.matrix",
    dimensionClassifications: TOKEN_DIMENSION_CLASSIFICATIONS,
    dimensions: INPUT_DIMENSION_OWNERSHIP,
    productProfiles: BRAND_PROFILE_IDS as readonly BrandProfileId[],
    resolutionOrder: TOKEN_RESOLUTION_ORDER,
    resolver: [
      "resolveThemeConfigLayers",
      "resolveTokenLayers",
      "resolveMeasureLayers",
      "component state semantic overlay",
    ],
    webProjection:
      "buildThemeVariables -> CSS custom properties consumed by the Web renderer",
    nativeProjection:
      "buildNativeThemeSnapshot -> typed JS/TS values consumed by a future native renderer",
    aiProjection:
      "generated input-contracts.json and inputContract fields on component shards",
  },
  fieldAnatomy: FORM_FIELD_ANATOMY,
  formStates: FORM_STATE_SEMANTICS,
  dateTimeValues: DATE_TIME_VALUE_CONTRACT,
  fileMetadata: FILE_METADATA_CONTRACT,
  measures: MEASURE_CONTRACT,
  components: INPUT_CONTRACT_DEFINITIONS,
  gapDecisions: INPUT_GAP_DECISIONS,
  deviceSources: DEVICE_SOURCE_CONTRACTS,
  compatibility: {
    existingCatalog:
      "packages/ai/catalog/components.json remains the legacy Web API compatibility surface.",
    existingPlatform:
      "U03 component-platform resolver remains the platform classification authority for implemented catalog entries.",
    variants:
      "NativeSelect and NativeTimeInput are renderer-level variants; aliases and variants do not create a new semantic input intent.",
    consumerBoundary:
      "Consumers own business data, validation rules, permissions, persistence, transport, routing, and native capability policy.",
    noNativePackage:
      "U05 adds no native component package and no React Native dependency.",
  },
} as const;
