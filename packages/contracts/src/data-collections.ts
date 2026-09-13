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
  RendererPresentation,
} from "./component-platform.ts";
import { resolveComponentPlatformContract } from "./component-platform.ts";
import type { ComponentClassification } from "./foundation.ts";
import type { MotionRole } from "./types.ts";
import { CONTRACT_SCHEMA_VERSION } from "./types.ts";

/**
 * U07 is the semantic contract for data display and collections. It does not
 * own fetching, sorting algorithms, query state, persistence, permissions, or
 * a virtualization engine. Those remain consumer or renderer concerns behind
 * this vocabulary.
 */

export const DATA_COLLECTION_FAMILIES = Object.freeze([
  "DATA_DISPLAY",
  "COLLECTION",
  "TABLE",
  "HIERARCHY",
  "COLLECTION_STATE",
] as const);
export type DataCollectionFamily = (typeof DATA_COLLECTION_FAMILIES)[number];

export const DATA_COLLECTION_INVENTORY_STATUSES = Object.freeze([
  "EXISTING_STABLE",
  "EXISTING_NEEDS_HARDENING",
  "MISSING_CANONICAL",
  "VARIANT",
  "BLOCK",
  "RECIPE",
  "ENGINE_ADAPTER",
  "WEB_ONLY",
  "NATIVE_ONLY",
  "ADAPTIVE",
  "DEFERRED",
  "REJECTED_DUPLICATE",
] as const);
export type DataCollectionInventoryStatus =
  (typeof DATA_COLLECTION_INVENTORY_STATUSES)[number];

export const DATA_COLLECTION_SELECTION_MODES = Object.freeze([
  "none",
  "single",
  "multiple",
  "consumer-controlled",
] as const);
export type DataCollectionSelectionMode =
  (typeof DATA_COLLECTION_SELECTION_MODES)[number];

export const DATA_COLLECTION_SORT_MODES = Object.freeze([
  "none",
  "single-column",
  "multi-column-when-justified",
  "consumer-controlled",
] as const);
export type DataCollectionSortMode =
  (typeof DATA_COLLECTION_SORT_MODES)[number];

export const DATA_COLLECTION_PAGING_MODES = Object.freeze([
  "none",
  "pagination",
  "infinite-loading",
  "consumer-controlled",
] as const);
export type DataCollectionPagingMode =
  (typeof DATA_COLLECTION_PAGING_MODES)[number];

export const DATA_COLLECTION_DENSITIES = Object.freeze([
  "compact",
  "regular",
  "comfortable",
] as const);
export type DataCollectionDensity = (typeof DATA_COLLECTION_DENSITIES)[number];

export const DATA_COLLECTION_RESPONSIVE_PATTERNS = Object.freeze([
  "table-to-record-list",
  "priority-columns-to-detail",
  "bounded-horizontal-scroll",
  "table-to-cards",
  "stacked-key-value",
  "native-list-detail",
  "native-drill-down",
] as const);
export type DataCollectionResponsivePattern =
  (typeof DATA_COLLECTION_RESPONSIVE_PATTERNS)[number];

export const DATA_COLLECTION_VIRTUALIZATION_BOUNDARIES = Object.freeze([
  "not-needed-for-bounded-collection",
  "consumer-owned-windowing",
  "normalized-engine-adapter",
  "deferred-until-engine-approved",
] as const);
export type DataCollectionVirtualizationBoundary =
  (typeof DATA_COLLECTION_VIRTUALIZATION_BOUNDARIES)[number];

export const DATA_COLLECTION_STATES = Object.freeze([
  "ready",
  "loading",
  "empty",
  "filteredEmpty",
  "searchEmpty",
  "error",
  "partial",
  "stale",
  "loadingMore",
  "endOfResults",
  "selected",
  "disabled",
  "expanded",
  "collapsed",
] as const);
export type DataCollectionState = (typeof DATA_COLLECTION_STATES)[number];

export const DATA_COLLECTION_COLUMN_PRIORITIES = Object.freeze([
  "primary",
  "secondary",
  "tertiary",
  "detailOnly",
] as const);
export type DataCollectionColumnPriority =
  (typeof DATA_COLLECTION_COLUMN_PRIORITIES)[number];

export interface DataCollectionDefinition {
  readonly canonicalComponent: string;
  readonly displayName: string;
  readonly family: DataCollectionFamily;
  readonly classification: ComponentClassification;
  readonly inventoryStatus: DataCollectionInventoryStatus;
  readonly intent: string;
  readonly interactionModel: InteractionModel;
  readonly states: readonly DataCollectionState[];
  readonly accessibility: readonly AccessibilityObligationId[];
  readonly useWhen: readonly string[];
  readonly avoidWhen: readonly string[];
  readonly tokenFamilies: readonly ComponentTokenFamily[];
  readonly layoutIntents: readonly ComponentLayoutIntent[];
  readonly motionRoles: readonly MotionRole[];
  readonly densities: readonly DataCollectionDensity[];
  readonly selection: DataCollectionSelectionMode;
  readonly sorting: DataCollectionSortMode;
  readonly paging: DataCollectionPagingMode;
  readonly responsivePatterns: readonly DataCollectionResponsivePattern[];
  readonly virtualization: DataCollectionVirtualizationBoundary;
  readonly rowCountSuitability: string;
  readonly consumerOwns: readonly string[];
  readonly ten4sevenOwns: readonly string[];
  readonly compatibility: readonly string[];
}

export interface ResolvedDataCollectionContract extends DataCollectionDefinition {
  readonly canonicalId: string;
  readonly platform: ComponentPlatform;
  readonly rendererStrategy: ComponentRendererStrategy;
  readonly web: RendererContract;
  readonly native: RendererContract;
  readonly adaptivePattern?: string;
  readonly nativeAlternative?: RendererAlternative;
  readonly webAlternative?: RendererAlternative;
}

export interface DataCollectionGapDecision {
  readonly id: string;
  readonly classification: Exclude<
    ComponentClassification,
    "CANONICAL_COMPONENT" | "ADAPTIVE" | "WEB_ONLY"
  >;
  readonly inventoryStatus: Exclude<
    DataCollectionInventoryStatus,
    "EXISTING_STABLE" | "EXISTING_NEEDS_HARDENING"
  >;
  readonly canonicalComponent?: string;
  readonly reason: string;
  readonly aiGuidance: string;
}

export const DATA_COLLECTION_OWNERSHIP = {
  system: [
    "semantic collection and table intent",
    "selection state vocabulary",
    "collection state presentation contract",
    "density and responsive/adaptive strategy",
    "accessibility obligations",
    "virtualization adapter boundary",
  ],
  consumer: [
    "data fetching and query state",
    "business filtering and sorting logic",
    "pagination and cursor authority",
    "permissions and bulk operation rules",
    "row actions and persistence",
    "record detail routing",
  ],
  renderer: [
    "DOM table/list semantics",
    "native FlatList/SectionList or list-detail presentation",
    "pointer versus touch interaction",
    "windowing and measurement implementation behind an approved adapter",
  ],
} as const;

const commonDataAccessibility = [
  "accessible-name",
  "ordered-structure",
  "empty-state",
  "loading-state",
  "non-color-status",
] as const satisfies readonly AccessibilityObligationId[];

const tableAccessibility = [
  "accessible-name",
  "table-context",
  "sort-state",
  "selection-state",
  "empty-state",
  "loading-state",
  "focus-or-press-feedback",
] as const satisfies readonly AccessibilityObligationId[];

const semanticTableAccessibility = [
  "accessible-name",
  "table-context",
  "empty-state",
  "loading-state",
  "focus-or-press-feedback",
] as const satisfies readonly AccessibilityObligationId[];

const treeAccessibility = [
  "accessible-name",
  "navigation-role",
  "ordered-structure",
  "expanded-state",
  "selected-state",
  "keyboard-navigation",
  "focus-or-press-feedback",
] as const satisfies readonly AccessibilityObligationId[];

const displayDefinition = (
  definition: DataCollectionDefinition,
): DataCollectionDefinition => definition;

export const DATA_COLLECTION_DEFINITIONS = {
  List: displayDefinition({
    canonicalComponent: "List",
    displayName: "List",
    family: "COLLECTION",
    classification: "ADAPTIVE",
    inventoryStatus: "EXISTING_STABLE",
    intent:
      "Render a generic ordered collection with optional single or multiple selection without owning domain data.",
    interactionModel: "collection",
    states: DATA_COLLECTION_STATES,
    accessibility: commonDataAccessibility,
    useWhen: [
      "records are read as an ordered collection rather than compared across columns",
      "the same row anatomy must adapt to Web and native list presentation",
    ],
    avoidWhen: [
      "cross-record column comparison requires a semantic Table",
      "100,000 interactive rows need an approved virtualization engine",
    ],
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
    densities: DATA_COLLECTION_DENSITIES,
    selection: "consumer-controlled",
    sorting: "consumer-controlled",
    paging: "consumer-controlled",
    responsivePatterns: [
      "native-list-detail",
      "table-to-record-list",
      "priority-columns-to-detail",
    ],
    virtualization: "consumer-owned-windowing",
    rowCountSuitability:
      "bounded and medium collections; large counts require the normalized virtualization adapter boundary",
    consumerOwns: [
      "item data and stable keys",
      "rendered row content",
      "business selection and activation rules",
      "fetching and incremental loading",
    ],
    ten4sevenOwns: [
      "list semantics",
      "selection state exposure",
      "collection states",
      "density and focus treatment",
      "responsive intent",
    ],
    compatibility: [
      "SelectableList is a selection-mode variant of List, not a second primitive.",
      "GroupedList is a composition/recipe concern until a distinct interaction contract is proven.",
    ],
  }),
  KeyValueList: displayDefinition({
    canonicalComponent: "KeyValueList",
    displayName: "Key Value List / Description List",
    family: "DATA_DISPLAY",
    classification: "CANONICAL_COMPONENT",
    inventoryStatus: "EXISTING_STABLE",
    intent:
      "Present labelled facts as a semantic description list instead of a comparison table.",
    interactionModel: "display",
    states: ["ready", "empty", "loading", "error"],
    accessibility: ["accessible-name", "ordered-structure", "empty-state"],
    useWhen: [
      "one record's metadata needs scanning",
      "mobile presentation should naturally stack label/value pairs",
    ],
    avoidWhen: [
      "multiple records need cross-row comparison",
      "a collection requires selection, sorting, or pagination",
    ],
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "radius",
      "focus",
      "density",
      "measure",
    ],
    layoutIntents: ["measure-content", "measure-reading", "density-adaptive"],
    motionRoles: ["state"],
    densities: DATA_COLLECTION_DENSITIES,
    selection: "none",
    sorting: "none",
    paging: "none",
    responsivePatterns: ["stacked-key-value"],
    virtualization: "not-needed-for-bounded-collection",
    rowCountSuitability:
      "bounded metadata for one record or a focused detail surface",
    consumerOwns: [
      "labels, values, optional actions, and copyable-value policy",
    ],
    ten4sevenOwns: [
      "description-list semantics, measure, orientation, and stacking",
    ],
    compatibility: [
      "DescriptionList remains the catalog alias of KeyValueList.",
      "Do not use a full Table for two-column metadata when this intent fits.",
    ],
  }),
  MetricCard: displayDefinition({
    canonicalComponent: "MetricCard",
    displayName: "Metric / Stat",
    family: "DATA_DISPLAY",
    classification: "CANONICAL_COMPONENT",
    inventoryStatus: "EXISTING_STABLE",
    intent:
      "Show one consumer-calculated decision signal with context, trend, status, or action.",
    interactionModel: "display",
    states: ["ready", "loading", "empty", "error", "disabled"],
    accessibility: ["accessible-name", "non-color-status", "empty-state"],
    useWhen: ["one metric leads to an operational or product decision"],
    avoidWhen: ["a multi-record comparison or chart engine is required"],
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "radius",
      "elevation",
      "motion",
      "density",
      "measure",
    ],
    layoutIntents: ["measure-compact", "measure-content", "density-adaptive"],
    motionRoles: ["state", "reveal"],
    densities: DATA_COLLECTION_DENSITIES,
    selection: "none",
    sorting: "none",
    paging: "none",
    responsivePatterns: ["table-to-cards"],
    virtualization: "not-needed-for-bounded-collection",
    rowCountSuitability: "one bounded signal per metric surface",
    consumerOwns: ["calculation, trend meaning, and action behavior"],
    ten4sevenOwns: ["metric hierarchy, semantic status, and responsive layout"],
    compatibility: [
      "KPICluster composes MetricCard; it is not a second metric primitive.",
    ],
  }),
  ActivityFeed: displayDefinition({
    canonicalComponent: "ActivityFeed",
    displayName: "Activity Feed / Timeline",
    family: "DATA_DISPLAY",
    classification: "CANONICAL_COMPONENT",
    inventoryStatus: "EXISTING_STABLE",
    intent:
      "Present actor/action-oriented chronological entries with optional metadata and status.",
    interactionModel: "display",
    states: [
      "ready",
      "loading",
      "empty",
      "error",
      "stale",
      "loadingMore",
      "endOfResults",
    ],
    accessibility: [
      "accessible-name",
      "ordered-structure",
      "empty-state",
      "non-color-status",
    ],
    useWhen: [
      "actor/action history or chronological operational events matter",
    ],
    avoidWhen: [
      "stable cross-record comparison or a full log explorer is required",
    ],
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "radius",
      "motion",
      "density",
      "measure",
    ],
    layoutIntents: [
      "measure-content",
      "measure-reading",
      "density-adaptive",
      "single-column",
    ],
    motionRoles: ["state", "reveal"],
    densities: DATA_COLLECTION_DENSITIES,
    selection: "none",
    sorting: "consumer-controlled",
    paging: "consumer-controlled",
    responsivePatterns: ["native-list-detail", "table-to-record-list"],
    virtualization: "consumer-owned-windowing",
    rowCountSuitability:
      "bounded or incrementally loaded chronological entries",
    consumerOwns: ["event order, actor, timestamp, and action meaning"],
    ten4sevenOwns: [
      "ordered feed structure, readable hierarchy, and state presentation",
    ],
    compatibility: [
      "Timeline remains the catalog alias of ActivityFeed; NotificationCenter owns persisted notifications.",
    ],
  }),
  Table: displayDefinition({
    canonicalComponent: "Table",
    displayName: "Semantic Table",
    family: "TABLE",
    classification: "ADAPTIVE",
    inventoryStatus: "EXISTING_STABLE",
    intent:
      "Present semantic tabular data for readable comparison without owning data interaction logic.",
    interactionModel: "data-comparison",
    states: ["ready", "empty", "loading", "error"],
    accessibility: semanticTableAccessibility,
    useWhen: ["headers and comparable cells are the primary meaning"],
    avoidWhen: [
      "row selection, sorting, pagination, or column management is part of the contract",
    ],
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "radius",
      "focus",
      "density",
      "measure",
    ],
    layoutIntents: [
      "measure-wide",
      "bounded-scroll-owner",
      "density-adaptive",
      "minimum-useful-surface",
    ],
    motionRoles: ["state"],
    densities: DATA_COLLECTION_DENSITIES,
    selection: "none",
    sorting: "none",
    paging: "none",
    responsivePatterns: ["bounded-horizontal-scroll", "table-to-cards"],
    virtualization: "not-needed-for-bounded-collection",
    rowCountSuitability:
      "bounded readable comparison; use DataTable for interaction and a DataGrid adapter for very large data",
    consumerOwns: ["row data, headers, and domain formatting"],
    ten4sevenOwns: [
      "native table semantics, bounded overflow, density, and responsive presentation",
    ],
    compatibility: [
      "TableHeader, TableBody, TableRow, TableHead, and TableCell are structural Web children, not a second table system.",
    ],
  }),
  DataTable: displayDefinition({
    canonicalComponent: "DataTable",
    displayName: "Interactive Data Table",
    family: "TABLE",
    classification: "ADAPTIVE",
    inventoryStatus: "EXISTING_NEEDS_HARDENING",
    intent:
      "Present comparable business records with normalized sort, selection, visibility, state, and responsive strategy.",
    interactionModel: "collection",
    states: DATA_COLLECTION_STATES,
    accessibility: tableAccessibility,
    useWhen: [
      "50 or fewer visible fields/records need business table interaction",
      "sort, selection, pagination, or row actions are consumer-owned but need a stable presentation contract",
    ],
    avoidWhen: [
      "one record's metadata fits a DescriptionList",
      "100,000 interactive rows or spreadsheet-grade editing needs an approved engine adapter",
    ],
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
      "measure-wide",
      "bounded-scroll-owner",
      "priority-order",
      "stacked-detail",
      "density-adaptive",
      "minimum-useful-surface",
    ],
    motionRoles: ["interaction", "state", "reveal"],
    densities: DATA_COLLECTION_DENSITIES,
    selection: "consumer-controlled",
    sorting: "single-column",
    paging: "consumer-controlled",
    responsivePatterns: [
      "table-to-record-list",
      "priority-columns-to-detail",
      "bounded-horizontal-scroll",
      "table-to-cards",
      "native-list-detail",
    ],
    virtualization: "consumer-owned-windowing",
    rowCountSuitability:
      "bounded and server-windowed business collections; do not imply virtualization from the component alone",
    consumerOwns: [
      "data source, query/filter/sort logic, page or cursor state, permissions, row actions, and detail routing",
    ],
    ten4sevenOwns: [
      "column and row semantics, selection exposure, state grammar, density, column priority metadata, and responsive intent",
    ],
    compatibility: [
      "DataTable does not fetch data and does not become an ARIA grid unless the interaction contract truly requires cell navigation.",
    ],
  }),
  AdvancedDataGrid: displayDefinition({
    canonicalComponent: "AdvancedDataGrid",
    displayName: "Bounded Editable Data Grid",
    family: "TABLE",
    classification: "WEB_ONLY",
    inventoryStatus: "EXISTING_NEEDS_HARDENING",
    intent:
      "Edit bounded repeated line items in a native table while exposing row and cell state without owning business validation or persistence.",
    interactionModel: "data-entry",
    states: [
      "ready",
      "loading",
      "empty",
      "error",
      "selected",
      "disabled",
      "stale",
    ],
    accessibility: [
      "accessible-name",
      "table-context",
      "selection-state",
      "error-association",
      "keyboard-navigation",
      "focus-or-press-feedback",
      "loading-state",
    ],
    useWhen: [
      "small repeated line items need typed cell editors and keyboard traversal",
    ],
    avoidWhen: [
      "read-only comparison belongs to DataTable",
      "large, virtualized, grouped, tree, pivot, or spreadsheet-grade behavior lacks an approved engine adapter",
    ],
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
      "measure-wide",
      "bounded-scroll-owner",
      "density-adaptive",
      "minimum-useful-surface",
    ],
    motionRoles: ["interaction", "state"],
    densities: DATA_COLLECTION_DENSITIES,
    selection: "consumer-controlled",
    sorting: "single-column",
    paging: "consumer-controlled",
    responsivePatterns: [
      "bounded-horizontal-scroll",
      "priority-columns-to-detail",
    ],
    virtualization: "deferred-until-engine-approved",
    rowCountSuitability:
      "bounded editable rows only; current implementation is not a virtualization engine",
    consumerOwns: [
      "validation, totals, permissions, persistence, and save/cancel authority",
    ],
    ten4sevenOwns: [
      "editor focus traversal, table semantics, row state presentation, and tokenized geometry",
    ],
    compatibility: [
      "AdvancedDataGrid is not a donor grid API and is not a promise of MUI X or AG Grid parity.",
    ],
  }),
  DataTableColumnPicker: displayDefinition({
    canonicalComponent: "DataTableColumnPicker",
    displayName: "Data Table Column Picker",
    family: "TABLE",
    classification: "COMPONENT_VARIANT",
    inventoryStatus: "VARIANT",
    intent:
      "Expose controlled visibility choices for a DataTable without owning table state.",
    interactionModel: "selection",
    states: ["ready", "loading", "disabled", "selected"],
    accessibility: [
      "accessible-name",
      "selection-state",
      "focus-or-press-feedback",
    ],
    useWhen: ["secondary columns can be intentionally hidden or restored"],
    avoidWhen: ["the table has no meaningful visibility policy"],
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "radius",
      "focus",
      "density",
      "measure",
    ],
    layoutIntents: [
      "measure-control",
      "priority-order",
      "touch-target-minimum",
    ],
    motionRoles: ["interaction", "state"],
    densities: DATA_COLLECTION_DENSITIES,
    selection: "multiple",
    sorting: "none",
    paging: "none",
    responsivePatterns: ["priority-columns-to-detail", "native-list-detail"],
    virtualization: "not-needed-for-bounded-collection",
    rowCountSuitability: "column metadata for a bounded DataTable",
    consumerOwns: ["visibility persistence and product-specific column policy"],
    ten4sevenOwns: [
      "labelled checkbox group and controlled visibility grammar",
    ],
    compatibility: [
      "This is a DataTable companion, not a second table or filter engine.",
    ],
  }),
  BulkActionBar: displayDefinition({
    canonicalComponent: "BulkActionBar",
    displayName: "Bulk Actions",
    family: "COLLECTION",
    classification: "ADAPTIVE",
    inventoryStatus: "EXISTING_STABLE",
    intent:
      "Present bounded actions for an explicitly selected collection without owning the operation.",
    interactionModel: "activation",
    states: ["ready", "selected", "loading", "disabled", "error"],
    accessibility: [
      "accessible-name",
      "selection-state",
      "focus-or-press-feedback",
      "non-color-status",
    ],
    useWhen: ["selection count and safe actions need persistent context"],
    avoidWhen: ["no selection model exists or destructive policy is undefined"],
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
      "bounded-scroll-owner",
      "touch-target-minimum",
      "density-adaptive",
    ],
    motionRoles: ["interaction", "state", "enter", "exit"],
    densities: DATA_COLLECTION_DENSITIES,
    selection: "consumer-controlled",
    sorting: "none",
    paging: "none",
    responsivePatterns: ["native-list-detail", "priority-columns-to-detail"],
    virtualization: "not-needed-for-bounded-collection",
    rowCountSuitability:
      "any collection whose selection authority is consumer-controlled",
    consumerOwns: [
      "selected-key authority, permissions, confirmation, execution, and undo",
    ],
    ten4sevenOwns: [
      "selection count, clear affordance, responsive action region, and accessible action grouping",
    ],
    compatibility: [
      "Desktop action bar and mobile sticky/sheet presentation are one semantic bulk-action contract.",
    ],
  }),
  Pagination: displayDefinition({
    canonicalComponent: "Pagination",
    displayName: "Pagination",
    family: "COLLECTION",
    classification: "ADAPTIVE",
    inventoryStatus: "EXISTING_STABLE",
    intent: "Present explicit page navigation for a bounded result set.",
    interactionModel: "navigation",
    states: ["ready", "loading", "disabled", "empty"],
    accessibility: [
      "accessible-name",
      "navigation-role",
      "selected-state",
      "focus-or-press-feedback",
    ],
    useWhen: ["explicit page ranges and result counts improve task control"],
    avoidWhen: ["a chronological feed should append or a result set is short"],
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "radius",
      "focus",
      "motion",
      "density",
      "touch-target",
      "measure",
    ],
    layoutIntents: [
      "measure-content",
      "touch-target-minimum",
      "density-adaptive",
    ],
    motionRoles: ["interaction", "state"],
    densities: DATA_COLLECTION_DENSITIES,
    selection: "single",
    sorting: "none",
    paging: "pagination",
    responsivePatterns: ["native-list-detail"],
    virtualization: "not-needed-for-bounded-collection",
    rowCountSuitability:
      "bounded page navigation; it does not imply virtual rendering",
    consumerOwns: [
      "total, page size, page fetch, and URL or state persistence",
    ],
    ten4sevenOwns: [
      "page navigation semantics, labels, and responsive controls",
    ],
    compatibility: [
      "Pagination remains distinct from infinite loading and virtualization.",
    ],
  }),
  TreeView: displayDefinition({
    canonicalComponent: "TreeView",
    displayName: "Tree / Hierarchy",
    family: "HIERARCHY",
    classification: "ADAPTIVE",
    inventoryStatus: "EXISTING_STABLE",
    intent:
      "Navigate or select a visible hierarchy with expansion, level, position, and keyboard semantics.",
    interactionModel: "navigation",
    states: [
      "ready",
      "loading",
      "empty",
      "error",
      "selected",
      "expanded",
      "collapsed",
      "disabled",
    ],
    accessibility: treeAccessibility,
    useWhen: ["navigation or inspection follows a nested hierarchy"],
    avoidWhen: [
      "flat data belongs in List or selection belongs in a DataTable",
    ],
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
      "bounded-scroll-owner",
      "single-column",
      "touch-target-minimum",
      "density-adaptive",
    ],
    motionRoles: ["interaction", "state", "reveal"],
    densities: DATA_COLLECTION_DENSITIES,
    selection: "single",
    sorting: "none",
    paging: "consumer-controlled",
    responsivePatterns: ["native-drill-down", "native-list-detail"],
    virtualization: "consumer-owned-windowing",
    rowCountSuitability:
      "bounded hierarchy; deep or very large trees need a measured native/web adapter decision",
    consumerOwns: [
      "node data, expansion authority, selection authority, and child loading",
    ],
    ten4sevenOwns: [
      "tree semantics, keyboard movement, disclosure, and selected state",
    ],
    compatibility: [
      "TreeGrid is a distinct advanced contract; it must not be faked by nesting Tables inside TreeView.",
    ],
  }),
  HierarchyPicker: displayDefinition({
    canonicalComponent: "HierarchyPicker",
    displayName: "Selectable Hierarchy",
    family: "HIERARCHY",
    classification: "ADAPTIVE",
    inventoryStatus: "EXISTING_STABLE",
    intent:
      "Select one or more nodes in a hierarchy with mixed descendant state.",
    interactionModel: "selection",
    states: [
      "ready",
      "loading",
      "empty",
      "error",
      "selected",
      "expanded",
      "collapsed",
      "disabled",
    ],
    accessibility: treeAccessibility,
    useWhen: [
      "a form or scope picker needs parent/descendant selection semantics",
    ],
    avoidWhen: ["navigation has one active node; use TreeView"],
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
      "bounded-scroll-owner",
      "single-column",
      "touch-target-minimum",
      "density-adaptive",
    ],
    motionRoles: ["interaction", "state", "reveal"],
    densities: DATA_COLLECTION_DENSITIES,
    selection: "multiple",
    sorting: "none",
    paging: "consumer-controlled",
    responsivePatterns: ["native-drill-down", "native-list-detail"],
    virtualization: "consumer-owned-windowing",
    rowCountSuitability:
      "bounded selectable hierarchy with consumer-owned child loading",
    consumerOwns: ["scope meaning, selected IDs, permissions, and persistence"],
    ten4sevenOwns: [
      "mixed selection, tree semantics, keyboard movement, and filter presentation",
    ],
    compatibility: [
      "TreeSelect remains a rejected duplicate of the hierarchy/input contracts.",
    ],
  }),
} as const satisfies Readonly<Record<string, DataCollectionDefinition>>;

export const DATA_COLLECTION_GAP_DECISIONS = {
  SelectableList: {
    id: "SelectableList",
    classification: "COMPONENT_VARIANT",
    inventoryStatus: "VARIANT",
    canonicalComponent: "List",
    reason:
      "Selection is a List mode and state contract, not a separate row renderer.",
    aiGuidance:
      "Use List with selectionMode single or multiple; compose BulkActionBar when actions are needed.",
  },
  GridList: {
    id: "GridList",
    classification: "COMPONENT_VARIANT",
    inventoryStatus: "VARIANT",
    canonicalComponent: "List",
    reason:
      "Spatial arrangement is a recipe/layout decision while the collection semantics remain List.",
    aiGuidance:
      "Use List or a product-specific block/recipe; do not create GridList as a parallel primitive for styling alone.",
  },
  GroupedList: {
    id: "GroupedList",
    classification: "COMPONENT_VARIANT",
    inventoryStatus: "VARIANT",
    canonicalComponent: "List",
    reason:
      "Grouping is a composition concern until grouped headers require a distinct keyboard or selection contract.",
    aiGuidance:
      "Compose grouped sections around List and preserve one collection selection model.",
  },
  VirtualList: {
    id: "VirtualList",
    classification: "ENGINE_ADAPTER",
    inventoryStatus: "ENGINE_ADAPTER",
    reason:
      "Windowing and measurement must remain behind a vendor-neutral adapter; Ten4Seven does not write a virtualization engine in U07.",
    aiGuidance:
      "Use List semantics plus an approved virtualization adapter when row count or measurement requires it.",
  },
  InfiniteList: {
    id: "InfiniteList",
    classification: "DEFERRED",
    inventoryStatus: "DEFERRED",
    reason:
      "Incremental loading is distinct from rendering virtualization and requires a consumer-owned cursor/loading contract.",
    aiGuidance:
      "Use List with loadingMore and endOfResults state; do not merge infinite loading into Pagination or virtualization.",
  },
  DataGrid: {
    id: "DataGrid",
    classification: "ENGINE_ADAPTER",
    inventoryStatus: "ENGINE_ADAPTER",
    reason:
      "High-volume grid features such as virtualization, pinning, resizing, grouping, and editing require an approved engine adapter.",
    aiGuidance:
      "Use DataTable for interactive business rows; choose DataGrid only after a normalized Ten4Seven engine-adapter decision.",
  },
  TreeGrid: {
    id: "TreeGrid",
    classification: "ENGINE_ADAPTER",
    inventoryStatus: "ENGINE_ADAPTER",
    reason:
      "Hierarchy plus tabular cell navigation is materially different from TreeView and must not be simulated by nested tables.",
    aiGuidance:
      "Use TreeView for hierarchy or DataTable for comparison; defer TreeGrid until the keyboard and engine contract is approved.",
  },
  ColumnReorder: {
    id: "ColumnReorder",
    classification: "DEFERRED",
    inventoryStatus: "DEFERRED",
    reason:
      "Desktop drag/reorder depends on the later DnD/Builder contract and is not required for the current table API.",
    aiGuidance:
      "Use DataTableColumnPicker for visibility; defer reorder to the approved DnD engine boundary.",
  },
  SwipeActions: {
    id: "SwipeActions",
    classification: "NATIVE_ONLY",
    inventoryStatus: "NATIVE_ONLY",
    reason:
      "Swipe is a native/adaptive gesture surface and requires an explicit confirmation or undo contract.",
    aiGuidance:
      "Keep essential actions visible; use a native action sheet or later SwipeActions contract only when the gesture is documented and safe.",
  },
  Kanban: {
    id: "Kanban",
    classification: "RECIPE_OR_PATTERN",
    inventoryStatus: "RECIPE",
    reason:
      "Kanban lanes, reorder, and drag/drop are workflow/productivity behavior outside U07.",
    aiGuidance:
      "Use collection/card prerequisites now; defer full Kanban to U09/U10.",
  },
  TreeSelect: {
    id: "TreeSelect",
    classification: "REJECTED_DUPLICATE",
    inventoryStatus: "REJECTED_DUPLICATE",
    canonicalComponent: "HierarchyPicker",
    reason:
      "HierarchyPicker already owns the selection contract and maps to native hierarchy alternatives.",
    aiGuidance:
      "Use HierarchyPicker for hierarchical selection; do not add a duplicate TreeSelect primitive.",
  },
} as const satisfies Readonly<Record<string, DataCollectionGapDecision>>;

export interface NativeDataCollectionCanary {
  readonly id: string;
  readonly sourceComponent: string;
  readonly presentation: Extract<
    RendererPresentation,
    "native-collection" | "native-list-detail" | "native-scroll-surface"
  >;
  readonly strategy: ComponentRendererStrategy;
  readonly selection: DataCollectionSelectionMode;
  readonly states: readonly string[];
  readonly accessibility: readonly string[];
  readonly adaptiveStrategy: readonly DataCollectionResponsivePattern[];
  readonly rowCountSuitability: string;
  readonly consumerOwns: readonly string[];
}

export const NATIVE_DATA_COLLECTION_CANARY = {
  List: {
    id: "List",
    sourceComponent: "List",
    presentation: "native-collection",
    strategy: "ALTERNATE_PATTERN",
    selection: "consumer-controlled",
    states: DATA_COLLECTION_STATES,
    accessibility: [
      "labelled collection",
      "selected state",
      "loading and empty announcements",
    ],
    adaptiveStrategy: ["native-list-detail", "table-to-record-list"],
    rowCountSuitability:
      "FlatList/SectionList or measured rows selected by the native renderer; windowing remains behind the adapter boundary.",
    consumerOwns: ["item data, selection policy, row actions, and navigation"],
  },
  DescriptionList: {
    id: "DescriptionList",
    sourceComponent: "KeyValueList",
    presentation: "native-scroll-surface",
    strategy: "NATIVE_RENDERER",
    selection: "none",
    states: ["ready", "empty", "loading", "error"],
    accessibility: [
      "label/value association",
      "reading order",
      "optional action labels",
    ],
    adaptiveStrategy: ["stacked-key-value"],
    rowCountSuitability: "bounded record metadata",
    consumerOwns: ["field labels, values, and optional actions"],
  },
  SelectableList: {
    id: "SelectableList",
    sourceComponent: "List",
    presentation: "native-collection",
    strategy: "ALTERNATE_PATTERN",
    selection: "consumer-controlled",
    states: DATA_COLLECTION_STATES,
    accessibility: [
      "selected state",
      "multiple selection announcement",
      "touch-safe row actions",
    ],
    adaptiveStrategy: ["native-list-detail", "priority-columns-to-detail"],
    rowCountSuitability: "bounded or adapter-windowed collection",
    consumerOwns: ["selected keys, bulk permissions, and operation execution"],
  },
  DataTable: {
    id: "DataTable",
    sourceComponent: "DataTable",
    presentation: "native-list-detail",
    strategy: "ALTERNATE_PATTERN",
    selection: "consumer-controlled",
    states: DATA_COLLECTION_STATES,
    accessibility: [
      "record identity",
      "field/value association",
      "sort and selection state",
      "loading and error status",
    ],
    adaptiveStrategy: [
      "table-to-record-list",
      "priority-columns-to-detail",
      "bounded-horizontal-scroll",
    ],
    rowCountSuitability:
      "record summary list with detail navigation; horizontal comparison is allowed only when the task justifies it",
    consumerOwns: [
      "field priority, sort/filter policy, detail routing, and permissions",
    ],
  },
  Tree: {
    id: "Tree",
    sourceComponent: "TreeView",
    presentation: "native-list-detail",
    strategy: "ALTERNATE_PATTERN",
    selection: "single",
    states: [
      "ready",
      "loading",
      "empty",
      "error",
      "selected",
      "expanded",
      "collapsed",
      "disabled",
    ],
    accessibility: [
      "hierarchy level/path",
      "expanded state",
      "selected state",
      "hardware back",
    ],
    adaptiveStrategy: ["native-drill-down", "native-list-detail"],
    rowCountSuitability:
      "bounded hierarchy; deep trees may become drill-down screens",
    consumerOwns: ["child loading, selected path, routing, and permissions"],
  },
} as const satisfies Readonly<Record<string, NativeDataCollectionCanary>>;

export type NativeDataCollectionCanaryId =
  keyof typeof NATIVE_DATA_COLLECTION_CANARY;

export function resolveDataCollectionContract(
  name: string,
  component: ComponentPlatformContract,
): ResolvedDataCollectionContract | undefined {
  const definition = (
    DATA_COLLECTION_DEFINITIONS as Readonly<
      Record<string, DataCollectionDefinition>
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

export function resolveDataCollectionFromRegistry(
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
  return resolveDataCollectionContract(name, platform);
}

export function resolveNativeDataCollectionCanary(
  name: NativeDataCollectionCanaryId,
): NativeDataCollectionCanary {
  return NATIVE_DATA_COLLECTION_CANARY[name];
}

export interface DataCollectionPlane {
  readonly schemaVersion: typeof CONTRACT_SCHEMA_VERSION;
  readonly id: "data-collections";
  readonly sourceOfTruth: "packages/contracts/src/data-collections.ts";
  readonly platformSourceOfTruth: "packages/contracts/src/component-platform.ts";
  readonly tokenSourceOfTruth: "packages/contracts/src/foundation.ts and packages/tokens/src/theme.ts";
  readonly taxonomy: {
    readonly families: typeof DATA_COLLECTION_FAMILIES;
    readonly inventoryStatuses: typeof DATA_COLLECTION_INVENTORY_STATUSES;
    readonly selectionModes: typeof DATA_COLLECTION_SELECTION_MODES;
    readonly sortingModes: typeof DATA_COLLECTION_SORT_MODES;
    readonly pagingModes: typeof DATA_COLLECTION_PAGING_MODES;
    readonly states: typeof DATA_COLLECTION_STATES;
    readonly densities: typeof DATA_COLLECTION_DENSITIES;
    readonly responsivePatterns: typeof DATA_COLLECTION_RESPONSIVE_PATTERNS;
    readonly columnPriorities: typeof DATA_COLLECTION_COLUMN_PRIORITIES;
  };
  readonly ownership: typeof DATA_COLLECTION_OWNERSHIP;
  readonly virtualization: typeof DATA_COLLECTION_VIRTUALIZATION_BOUNDARIES;
  readonly components: typeof DATA_COLLECTION_DEFINITIONS;
  readonly gapDecisions: typeof DATA_COLLECTION_GAP_DECISIONS;
  readonly nativeCanary: typeof NATIVE_DATA_COLLECTION_CANARY;
  readonly compatibility: readonly string[];
}

export const DATA_COLLECTION_PLANE = {
  schemaVersion: CONTRACT_SCHEMA_VERSION,
  id: "data-collections",
  sourceOfTruth: "packages/contracts/src/data-collections.ts",
  platformSourceOfTruth: "packages/contracts/src/component-platform.ts",
  tokenSourceOfTruth:
    "packages/contracts/src/foundation.ts and packages/tokens/src/theme.ts",
  taxonomy: {
    families: DATA_COLLECTION_FAMILIES,
    inventoryStatuses: DATA_COLLECTION_INVENTORY_STATUSES,
    selectionModes: DATA_COLLECTION_SELECTION_MODES,
    sortingModes: DATA_COLLECTION_SORT_MODES,
    pagingModes: DATA_COLLECTION_PAGING_MODES,
    states: DATA_COLLECTION_STATES,
    densities: DATA_COLLECTION_DENSITIES,
    responsivePatterns: DATA_COLLECTION_RESPONSIVE_PATTERNS,
    columnPriorities: DATA_COLLECTION_COLUMN_PRIORITIES,
  },
  ownership: DATA_COLLECTION_OWNERSHIP,
  virtualization: DATA_COLLECTION_VIRTUALIZATION_BOUNDARIES,
  components: DATA_COLLECTION_DEFINITIONS,
  gapDecisions: DATA_COLLECTION_GAP_DECISIONS,
  nativeCanary: NATIVE_DATA_COLLECTION_CANARY,
  compatibility: [
    "Table remains semantic and does not inherit DataTable query or selection behavior.",
    "DataTable remains distinct from AdvancedDataGrid; the latter is bounded editable Web presentation, not a virtualized engine.",
    "Pagination, infinite loading, and virtualization remain distinct contracts.",
    "DescriptionList and Timeline remain aliases/intent names for existing canonical components.",
    "U07 adds no React Native dependency and no donor public API; native descriptors are CSS-independent canaries.",
  ],
} as const satisfies DataCollectionPlane;
