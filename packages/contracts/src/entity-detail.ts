import type { RecipeContract } from "./types.ts";

export const ENTITY_DETAIL_CONTRACT: RecipeContract = {
  id: "entity-detail",
  displayName: "Entity Detail",
  purpose:
    "Read and act on one structured record without inventing a new data grammar.",
  family: "record-inspection",
  profiles: ["enterprise", "dashboard"],
  components: [
    "PageHeader",
    "RecordSummary",
    "KeyValueList",
    "ActivityFeed",
    "ActionFooter",
  ],
  optional: [
    "AppShell",
    "Sidebar",
    "StatusChip",
    "ActionMenu",
    "DataTable",
    "Alert",
    "Modal",
  ],
  shell: {
    preferred: "AppShell",
    alternatives: ["PublicShell"],
    selectionRule:
      "Use AppShell for an operational record with persistent workspace context; use PublicShell or route navigation for a read-only record outside the workspace.",
  },
  intent: {
    visibility: "private",
    cardinality: "single",
    operations: ["open-detail", "edit"],
    density: "balanced",
    navigation: "route",
    workflow: "read",
    comparison: "none",
    selection: "none",
    detail: "route",
  },
  required: ["PageHeader", "RecordSummary", "KeyValueList"],
  conditional: {
    AppShell:
      "include when the record belongs to a persistent authenticated workspace; omit for an independent route or embedded detail surface.",
    Sidebar:
      "include when workspace navigation must remain available while the record is inspected.",
    StatusChip:
      "include when the record exposes a current status that changes the next decision.",
    ActivityFeed:
      "include when record history or an audit trail is part of the inspection task.",
    ActionMenu:
      "include when several contextual record actions should remain compact and close to the summary.",
    ActionFooter:
      "include when the record has a meaningful primary or secondary decision at the end of the inspection.",
    DataTable:
      "include when related records need stable cross-row comparison rather than a prose link list.",
    Alert:
      "include when a persistent record-level warning or permission message must remain visible.",
    Modal:
      "include when a short confirmation is required before a record action completes.",
  },
  forbid: [
    "local record detail primitive",
    "parallel workspace shell",
    "page-specific semantic color tokens",
    "unbounded property grid without a record summary",
  ],
  states: [
    "loading",
    "ready",
    "empty",
    "permission-limited",
    "api-error",
    "stale",
    "detail-open",
  ],
  responsive: {
    desktop: "inline",
    tablet: "stacked",
    mobile: "stacked",
    navigation: "collapsible",
    detail: "inline",
  },
  rationale: {
    PageHeader:
      "The route needs accountable context and navigation before the record is inspected.",
    RecordSummary:
      "A single record needs a scannable identity and decision context before its attributes.",
    KeyValueList:
      "Stable facts belong in the canonical description-list contract rather than ad hoc rows.",
    ActivityFeed:
      "History is conditional so read-only records do not inherit operational density without evidence.",
    ActionFooter:
      "Actions remain an explicit end boundary and are omitted when the record is strictly read-only.",
  },
  references: ["Entity Detail representative", "Operations Tracker"],
};
