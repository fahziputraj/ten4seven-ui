import type { ContractOwnership } from "./types.ts";
import { CONTRACT_SCHEMA_VERSION } from "./types.ts";

/**
 * The first bounded ERP/data-dense reference vocabulary. These are
 * presentation decisions for comparable records and reviewable transactions;
 * they do not own ledger, inventory, approval, or reconciliation authority.
 */
export const ERP_DENSITY_PATTERN_IDS = [
  "collection",
  "transaction-detail",
  "editable-entry",
  "approval-queue",
  "operational-dashboard",
] as const;

export type ErpDensityPatternId = (typeof ERP_DENSITY_PATTERN_IDS)[number];

export const ERP_DENSITY_STATES = [
  "loading",
  "ready",
  "empty",
  "error",
  "stale",
  "conflicted",
  "read-only",
  "permission-limited",
  "pending",
] as const;

export type ErpDensityState = (typeof ERP_DENSITY_STATES)[number];

export type ErpDensityResponsiveMode =
  "inline" | "table" | "table-scroll" | "stacked" | "drawer";

export interface ErpDensityResponsiveContract {
  readonly desktop: ErpDensityResponsiveMode;
  readonly tablet: ErpDensityResponsiveMode;
  readonly mobile: ErpDensityResponsiveMode;
  readonly notes: string;
}

export interface ErpDensityPatternContract {
  readonly id: ErpDensityPatternId;
  readonly displayName: string;
  readonly purpose: string;
  readonly components: readonly string[];
  readonly optionalComponents: readonly string[];
  readonly states: readonly ErpDensityState[];
  readonly responsive: ErpDensityResponsiveContract;
  readonly tokens: readonly string[];
  readonly consumerOwns: readonly string[];
  readonly unsupportedNeeds: readonly string[];
  readonly intentPhrases: readonly string[];
  readonly aiGuidance: string;
  readonly reference: "/erp-reference";
}

export interface ErpDensityContract {
  readonly schemaVersion: typeof CONTRACT_SCHEMA_VERSION;
  readonly id: "erp-density-readiness";
  readonly displayName: "ERP density and readiness";
  readonly purpose: string;
  readonly surfaceProfile: "data-dense";
  readonly density: {
    readonly desktop: "compact" | "dense";
    readonly tablet: "compact" | "dense";
    readonly mobile: "compact" | "dense";
    readonly rule: string;
  };
  readonly states: readonly ErpDensityState[];
  readonly patterns: Readonly<
    Record<ErpDensityPatternId, ErpDensityPatternContract>
  >;
  readonly unsupportedNeeds: readonly string[];
  readonly ownership: ContractOwnership;
  readonly retrieval: {
    readonly reference: "/erp-reference";
    readonly queryRule: string;
    readonly componentStatusRule: "implemented-only";
  };
}

const ownership: ContractOwnership = {
  system: [
    "interaction-contract",
    "semantic-tokens",
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
    "tenant-context",
    "effective-access",
  ],
  platform: ["principal-context", "module-lifecycle", "audit-authority"],
  businessModule: [
    "business-data",
    "business-rules",
    "workflow-authority",
    "reconciliation",
  ],
};

const sharedTokens = [
  "surface",
  "surface-raised",
  "surface-subtle",
  "border",
  "selected",
  "focus-ring",
  "control-height",
  "row-height",
  "radius-panel",
  "shadow-card",
  "motion",
] as const;

const sharedStates = ERP_DENSITY_STATES;

export const ERP_DENSITY_PATTERNS = {
  collection: {
    id: "collection",
    displayName: "ERP collection",
    purpose:
      "Scan comparable records with nearby query controls, stable columns, selection, pagination, and contextual detail.",
    components: ["PageHeader", "FilterToolbar", "DataTable", "Pagination"],
    optionalComponents: [
      "KPICluster",
      "DataTableColumnPicker",
      "BulkActionBar",
      "DetailDrawer",
      "FilterDrawer",
      "StatusChip",
    ],
    states: sharedStates,
    responsive: {
      desktop: "table",
      tablet: "table-scroll",
      mobile: "table-scroll",
      notes:
        "Keep native table semantics; the consumer chooses bounded scroll or a complete stacked projection when the row meaning survives.",
    },
    tokens: sharedTokens,
    consumerOwns: [
      "query and filter semantics",
      "server pagination and result ordering",
      "selection authority and bulk action handlers",
      "permissions and export policy",
    ],
    unsupportedNeeds: [
      "virtualized or server-windowed rendering",
      "tree-grid, pivot, formula, or spreadsheet behavior",
    ],
    intentPhrases: [
      "ERP dense table",
      "ERP record list",
      "dense records",
      "transaction queue",
      "data dense collection",
    ],
    aiGuidance:
      "Choose ERP collection for comparable records; use DataTable for read-oriented rows and add the bounded selection, filter, pagination, and detail contracts only when the consumer needs them.",
    reference: "/erp-reference",
  },
  "transaction-detail": {
    id: "transaction-detail",
    displayName: "Transaction detail and trace",
    purpose:
      "Inspect one transaction as labelled facts, activity, and revision evidence while keeping the source and next action visible.",
    components: [
      "RecordSummary",
      "KeyValueList",
      "ActivityFeed",
      "RevisionDiff",
    ],
    optionalComponents: [
      "DetailDrawer",
      "DataTable",
      "StatusChip",
      "ActionFooter",
    ],
    states: sharedStates,
    responsive: {
      desktop: "inline",
      tablet: "stacked",
      mobile: "drawer",
      notes:
        "Keep identity and accountable facts first; move the inspection surface into the canonical detail drawer when the route is list-led.",
    },
    tokens: sharedTokens,
    consumerOwns: [
      "transaction facts and calculations",
      "audit source and revision authority",
      "available actions and persistence",
    ],
    unsupportedNeeds: [
      "automatic reconciliation or posting",
      "domain-specific transaction state machines",
    ],
    intentPhrases: [
      "transaction detail",
      "journal detail",
      "record trace",
      "revision audit",
    ],
    aiGuidance:
      "Choose transaction detail when one record needs accountable facts, activity, and revision context; keep all calculations and audit authority with the consumer.",
    reference: "/erp-reference",
  },
  "editable-entry": {
    id: "editable-entry",
    displayName: "Bounded editable entry",
    purpose:
      "Capture a small validated form or repeated line-item set without pretending to be a spreadsheet engine.",
    components: ["FormGrid", "Input", "Select", "ActionFooter"],
    optionalComponents: [
      "Field",
      "AdvancedDataGrid",
      "CurrencyInput",
      "StatusChip",
      "Alert",
    ],
    states: sharedStates,
    responsive: {
      desktop: "inline",
      tablet: "stacked",
      mobile: "stacked",
      notes:
        "Use FormGrid for bounded forms; use AdvancedDataGrid only for typed repeated rows, then move to a form or drawer when the row no longer fits.",
    },
    tokens: sharedTokens,
    consumerOwns: [
      "field validation and cross-field rules",
      "dirty state and persistence",
      "totals, rounding, and calculated values",
      "conflict resolution and permission policy",
    ],
    unsupportedNeeds: [
      "formula recalculation engine",
      "fill-handle, cell-range, or multi-cell spreadsheet interactions",
    ],
    intentPhrases: [
      "ERP entry form",
      "transaction line editor",
      "editable dense rows",
      "bounded data entry",
    ],
    aiGuidance:
      "Choose bounded editable entry for a small form or typed line-item table; never imply that AdvancedDataGrid owns business validation, totals, or persistence.",
    reference: "/erp-reference",
  },
  "approval-queue": {
    id: "approval-queue",
    displayName: "Approval and action queue",
    purpose:
      "Keep consumer-supplied review state, evidence, and the next action together in a compact queue surface.",
    components: ["ApprovalPanel", "StatusChip", "ActionFooter"],
    optionalComponents: [
      "DataTable",
      "RecordSummary",
      "KeyValueList",
      "ActivityFeed",
      "AlertDialog",
    ],
    states: sharedStates,
    responsive: {
      desktop: "inline",
      tablet: "stacked",
      mobile: "stacked",
      notes:
        "Preserve evidence before actions and make the consumer-supplied result readable without relying on color.",
    },
    tokens: sharedTokens,
    consumerOwns: [
      "approval authority and available dispositions",
      "evidence, reason, and audit submission",
      "permissions and irreversible-action confirmation",
    ],
    unsupportedNeeds: [
      "automatic approval policy",
      "posting, entitlement, or workflow mutation",
    ],
    intentPhrases: [
      "ERP approval queue",
      "transaction approval",
      "review action queue",
      "approval status",
    ],
    aiGuidance:
      "Choose approval and action queue when the consumer supplies a consequential review decision; compose the shared panel and action boundary without moving policy into Ten4Seven.",
    reference: "/erp-reference",
  },
  "operational-dashboard": {
    id: "operational-dashboard",
    displayName: "Operational ERP dashboard",
    purpose:
      "Answer a named operational question with restrained metrics or charts; avoid decorative marketing layouts.",
    components: ["KPICluster", "LineChart", "BarChart", "DonutChart"],
    optionalComponents: ["ChartPanel", "DataTable", "StatusChip"],
    states: sharedStates,
    responsive: {
      desktop: "inline",
      tablet: "stacked",
      mobile: "stacked",
      notes:
        "Keep chart panels bounded, label the question and values, and preserve the reading order of metrics before visual detail.",
    },
    tokens: [
      ...sharedTokens,
      "chart-1",
      "chart-2",
      "chart-3",
      "chart-4",
      "chart-5",
    ],
    consumerOwns: [
      "metric definitions and time windows",
      "aggregation, freshness, and no-data meaning",
      "thresholds and operational decisions",
    ],
    unsupportedNeeds: [
      "unsourced KPI calculation",
      "marketing hero or decorative chart wall",
    ],
    intentPhrases: [
      "ERP operations dashboard",
      "dense operational dashboard",
      "transaction metrics",
      "ERP chart summary",
    ],
    aiGuidance:
      "Choose operational ERP dashboard only when the consumer names the operational question and supplies the metric meaning; use the canonical chart contracts rather than inventing a dashboard primitive.",
    reference: "/erp-reference",
  },
} as const satisfies Readonly<
  Record<ErpDensityPatternId, ErpDensityPatternContract>
>;

export const ERP_DENSITY_CONTRACT = {
  schemaVersion: CONTRACT_SCHEMA_VERSION,
  id: "erp-density-readiness",
  displayName: "ERP density and readiness",
  purpose:
    "Provide a deterministic, token-driven decision boundary for dense ERP collections, transaction detail, bounded editing, approval queues, and operational charts.",
  surfaceProfile: "data-dense",
  density: {
    desktop: "dense",
    tablet: "compact",
    mobile: "compact",
    rule: "Use the active theme density token; reduce repetition at narrow widths without shrinking readable labels or touch targets.",
  },
  states: ERP_DENSITY_STATES,
  patterns: ERP_DENSITY_PATTERNS,
  unsupportedNeeds: [
    "virtualized or server-windowed grids",
    "tree grids, pivot tables, formulas, and spreadsheet interaction models",
    "domain calculations, posting, reconciliation, approval policy, or persistence",
  ],
  ownership,
  retrieval: {
    reference: "/erp-reference",
    queryRule:
      "Match the longest intent phrase to one pattern, then load only implemented component contracts and the shared responsive/module-state context.",
    componentStatusRule: "implemented-only",
  },
} as const satisfies ErpDensityContract;
