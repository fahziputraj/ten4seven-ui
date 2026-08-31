import type { RecipeContract } from "./types.ts";
import { ENTITY_LIST_STATES } from "./types.ts";

export const ENTITY_LIST_CONTRACT: RecipeContract = {
  id: "entity-list",
  displayName: "Entity List",
  purpose:
    "Resolve a comparable collection of records into a searchable, filterable, selectable workspace with contextual detail.",
  family: "operational-collection",
  profiles: ["enterprise", "dashboard"],
  components: [
    "AppShell",
    "Sidebar",
    "PageHeader",
    "KPICluster",
    "FilterToolbar",
    "DataTable",
    "Pagination",
    "BulkActionBar",
    "DetailDrawer",
  ],
  optional: [
    "AppliedFilters",
    "StatusChip",
    "Avatar",
    "RecordSummary",
    "KeyValueList",
    "ActivityFeed",
    "MilestoneTracker",
    "ActionMenu",
    "FilterDrawer",
    "AlertDialog",
  ],
  shell: {
    preferred: "AppShell",
    alternatives: ["PublicShell"],
    selectionRule:
      "Use AppShell when persistent workspace navigation and operational density are part of the task.",
  },
  intent: {
    visibility: "private",
    cardinality: "collection",
    operations: [
      "search",
      "filter",
      "sort",
      "select",
      "open-detail",
      "paginate",
      "export",
    ],
    density: "information-dense",
    navigation: "workspace",
    workflow: "triage",
    comparison: "tabular",
    selection: "optional",
    detail: "drawer",
  },
  required: ["AppShell", "PageHeader", "DataTable"],
  conditional: {
    Sidebar:
      "required when the consumer has persistent workspace navigation; omit for an embedded list surface.",
    KPICluster:
      "include when a small set of decision metrics frames the collection before scanning rows.",
    FilterToolbar:
      "include when search plus one or more filters, sort, or result actions are required.",
    Pagination:
      "include when the collection is server-paged or exceeds the visible row budget.",
    BulkActionBar:
      "include when selection enables one or more actions across records.",
    DetailDrawer:
      "include when a record can be inspected without losing list context.",
  },
  forbid: [
    "local table primitive",
    "parallel workspace shell",
    "page-specific color tokens",
    "unbounded card gallery for comparable records",
  ],
  states: ENTITY_LIST_STATES,
  responsive: {
    desktop: "table",
    tablet: "table-scroll",
    mobile: "table-scroll",
    navigation: "collapsible",
    detail: "drawer",
  },
  rationale: {
    AppShell:
      "The reference intent is a persistent operational workspace, not a standalone marketing route.",
    PageHeader:
      "The collection needs an accountable title, context, and route-level actions.",
    DataTable:
      "Rows must remain comparable across stable columns and support semantic sort and selection.",
    FilterToolbar:
      "Query controls stay adjacent to the collection so the result context remains visible.",
    DetailDrawer:
      "Quick inspection preserves list position and avoids forcing every record into a new route.",
  },
  references: ["Operations Tracker"],
};
