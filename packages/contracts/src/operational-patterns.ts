import { READINESS_REVIEW_STATES, type RecipeContract } from "./types.ts";

/**
 * Typed canonical source for the first operational recipe batch. These
 * contracts describe selection, semantic minimums, and composition guidance;
 * they do not own domain data, policy, calculations, or persistence.
 */
export const READINESS_REVIEW_CONTRACT = {
  id: "readiness-review",
  displayName: "Readiness Review",
  purpose:
    "Explain a consumer-evaluated readiness result, factual blockers, resolution hints, freshness context, and next action without owning business rules.",
  profiles: ["enterprise", "dashboard"],
  components: [
    "AppShell",
    "PageHeader",
    "RecordSummary",
    "StatusChip",
    "Alert",
    "KeyValueList",
  ],
  optional: ["Sidebar", "Button", "DetailDrawer", "ActivityFeed"],
  icons: ["check", "warning", "danger", "clock", "view"],
  shell: {
    preferred: "AppShell",
    selectionRule:
      "Use AppShell for a private operational review; embed the same composition when a consumer already owns the surrounding shell.",
  },
  intent: {
    visibility: "private",
    cardinality: "single",
    operations: ["open-detail"],
    density: "balanced",
    navigation: "workspace",
    workflow: "triage",
    comparison: "none",
    selection: "none",
    detail: "inline",
  },
  required: [
    "PageHeader",
    "RecordSummary",
    "StatusChip",
    "Alert",
    "KeyValueList",
  ],
  conditional: {
    AppShell:
      "Include when the review is a private operational route; omit when the consumer supplies the surrounding shell.",
    Sidebar:
      "Include when persistent workspace navigation is part of the consumer route.",
    Button:
      "Include when a contextual source/detail action is available; the consumer owns the action and mutation.",
    DetailDrawer:
      "Include when source or blocker detail must be inspected without losing the current review context.",
    ActivityFeed:
      "Include when the consumer supplies relevant prior evaluation or activity history; do not infer it from the current result.",
  },
  forbid: [
    "Business eligibility, threshold, permission, or freshness calculation in Ten4Seven",
    "Automatic reevaluation or state mutation from a resolution hint",
    "Decision options that imply a human approval or rejection step",
    "Product-specific eligibility primitives or domain state machines",
  ],
  states: READINESS_REVIEW_STATES,
  responsive: {
    desktop: "inline",
    tablet: "stacked",
    mobile: "stacked",
    navigation: "collapsible",
    detail: "inline",
  },
  rationale: {
    PageHeader:
      "The route needs accountable target context without repeating a second page-heading shell.",
    RecordSummary:
      "The readiness subject and target action must be understood before blockers are scanned.",
    StatusChip:
      "The consumer-supplied result is compactly scannable while its text remains authoritative.",
    Alert:
      "A persistent blocker or incomplete condition needs bounded semantic emphasis.",
    KeyValueList:
      "Evaluation time, freshness, owner, and next context are stable labelled facts.",
  },
  operational: {
    maturity: "mature",
    useWhen: [
      "rules have already evaluated whether an object can proceed to a target action",
      "the primary user question is why the result is ready, blocked, incomplete, or unknown",
    ],
    avoidWhen: [
      "a human must choose a consequential disposition from evidence; use Decision Workspace",
      "a compact status label is sufficient; use StatusChip or existing feedback primitives",
      "the UI would need to calculate eligibility, thresholds, permissions, or reevaluation",
    ],
    anatomy: [
      "Readiness subject and target action",
      "Consumer-supplied current result",
      "Evaluation and freshness context",
      "Ordered blocker list",
      "Optional satisfied conditions",
      "Resolution hint or next required evidence",
      "Contextual next action or source",
    ],
    requiredSemantics: [
      "Target action or readiness subject",
      "Explicit consumer-supplied result such as READY, BLOCKED, INCOMPLETE, or UNKNOWN",
      "Factual blocker reason when the result is BLOCKED or INCOMPLETE",
      "Resolution hint or next required condition when supplied",
      "Evaluation timestamp, version, or freshness context when materially relevant",
      "Meaningful text independent of color or icon",
      "Next contextual action or source when available",
    ],
    optionalSemantics: [
      "Satisfied-condition summary",
      "Blocker category or severity supplied by the consumer",
      "Responsible owner",
      "Related evidence or source action",
      "Re-evaluation context",
    ],
    responsive: {
      desktop:
        "Keep target context and result visible beside ordered blockers and next action when width allows.",
      tablet:
        "Stack target and result before blockers while keeping each resolution hint adjacent to its reason.",
      mobile:
        "Use one vertical reading order: subject and result, freshness, blockers, satisfied conditions, next action or source.",
    },
    accessibility: [
      "State the readiness result in text and supplement it with a semantic StatusChip or icon; never rely on color alone.",
      "Render multiple blockers in consumer-supplied order with each reason and resolution hint readable as one item.",
      "Associate target action and evaluation context labels with their values.",
      "Make contextual next actions keyboard reachable and do not auto-trigger reevaluation.",
    ],
    aiGuidance:
      "Choose Readiness Review when rules already evaluated whether an object can proceed and the user needs factual blockers or resolution; choose Decision Workspace when a human must decide from evidence.",
    antiPatterns: [
      "Calculating eligibility, thresholds, freshness, or permissions in Ten4Seven",
      "Using Decision Workspace to present a result that needs no human disposition",
      "Communicating READY, BLOCKED, INCOMPLETE, or UNKNOWN only through color or icon",
      "Automatically mutating or reevaluating state from a resolution hint",
    ],
    relationships: [
      "Readiness Review → Decision Workspace",
      "Readiness Review → Activity & Audit Stream",
      "Readiness Review → Process Workspace",
    ],
    referencePath: "/operational-patterns",
  },
  references: ["AAPM Operational Reference"],
} satisfies RecipeContract;

export const PROCESS_WORKSPACE_CONTRACT = {
  id: "process-workspace",
  displayName: "Process Workspace",
  purpose:
    "Explain and advance one operational object's lifecycle through explicit stage, progress, health, owner, evidence, and next-action semantics.",
  profiles: ["enterprise", "dashboard"],
  components: [
    "AppShell",
    "Sidebar",
    "PageHeader",
    "RecordSummary",
    "MilestoneTracker",
    "KeyValueList",
    "ActivityFeed",
  ],
  optional: ["Alert", "StatusChip", "Button", "DetailDrawer"],
  icons: ["timeline", "clock", "users", "warning", "check"],
  operational: {
    maturity: "mature",
    useWhen: [
      "one order, receipt, delivery, request, or case moves through a known lifecycle",
      "the user must understand current ownership and the next checkpoint",
    ],
    avoidWhen: [
      "users are triaging many unrelated objects",
      "the stages are merely categories rather than lifecycle checkpoints",
    ],
    anatomy: [
      "Object identity",
      "Lifecycle checkpoints",
      "Current state",
      "Owner and update context",
      "Progress and health",
      "Evidence",
      "Next action",
      "Activity or audit",
    ],
    requiredSemantics: [
      "Completed, current, and future stages",
      "Current stage distinct from percentage progress",
      "Health distinct from lifecycle state",
      "Current owner",
      "Next action",
      "Timestamp or age when timing matters",
    ],
    optionalSemantics: [
      "Stage evidence",
      "Blocking exception",
      "Expected next update",
    ],
    responsive: {
      desktop:
        "Use a horizontal milestone sequence with one active detail region.",
      tablet:
        "Allow a bounded rail or an early vertical transition when labels stop scanning cleanly.",
      mobile:
        "Use a compact vertical lifecycle or bounded horizontal rail without shrinking labels.",
    },
    accessibility: [
      "Expose the lifecycle as a named navigation region or ordered sequence.",
      "Mark the selected checkpoint with aria-current and keep its detail relationship explicit.",
      "Announce progress numerically and describe blocked state in text.",
    ],
    aiGuidance:
      "Choose Process Workspace for one object's lifecycle; choose Operational Kanban for a portfolio of objects waiting for people.",
    antiPatterns: [
      "Using Kanban columns to represent one object's lifecycle",
      "Deriving health or severity from completion percentage",
      "Hiding the current owner or next action",
    ],
    relationships: [
      "Process Workspace → Decision Workspace",
      "Process Workspace → Activity & Audit Stream",
    ],
    referencePath: "/operational-patterns",
  },
  references: ["AAPM Operational Reference", "Operations Tracker"],
} satisfies RecipeContract;

export const DECISION_WORKSPACE_CONTRACT = {
  id: "decision-workspace",
  displayName: "Decision Workspace",
  purpose:
    "Put object context, evidence, impact, explicit options, reason, authority, and the consequential action in one accountable decision flow.",
  profiles: ["enterprise", "dashboard"],
  components: [
    "AppShell",
    "PageHeader",
    "RecordSummary",
    "Alert",
    "RadioGroup",
    "Radio",
    "Textarea",
    "ActionFooter",
  ],
  optional: ["DetailDrawer", "StatusChip", "KeyValueList"],
  icons: ["approve", "warning", "danger", "check", "edit"],
  operational: {
    maturity: "mature",
    useWhen: [
      "a human must review evidence before approval, QC, verification, hold, rejection, or exception resolution",
      "the consequence and reason must remain traceable",
    ],
    avoidWhen: [
      "the action is a simple reversible toggle",
      "a short AlertDialog is sufficient after the user already has full context",
    ],
    anatomy: [
      "Object summary",
      "Evidence",
      "Impact or consequence",
      "Decision options",
      "Reason or notes",
      "Authority or owner",
      "Primary decision action",
    ],
    requiredSemantics: [
      "Evidence before action",
      "Explicit option wording",
      "Visible consequence when material",
      "Reason when required",
      "Authority or owner",
      "Unambiguous primary action",
    ],
    optionalSemantics: [
      "Final AlertDialog safeguard",
      "Attachment",
      "Conditional acceptance",
    ],
    responsive: {
      desktop:
        "Keep evidence and decision controls in one bounded workspace with one primary action.",
      tablet:
        "Stack evidence before options without separating the reason from its action.",
      mobile:
        "Preserve evidence, decision, reason, and action in one uninterrupted vertical sequence.",
    },
    accessibility: [
      "Group mutually exclusive options in a labelled fieldset.",
      "Associate the reason label with its textarea.",
      "State consequences and submitted outcome in text.",
    ],
    aiGuidance:
      "Choose Decision Workspace when judgment depends on evidence; use AlertDialog only as a final safeguard for an already-understood irreversible action.",
    antiPatterns: [
      "Reducing an evidence-led decision to Are you sure and OK",
      "Communicating the selected outcome by color alone",
      "Hiding consequence or required authority",
    ],
    relationships: [
      "Process Workspace → Decision Workspace",
      "Decision Workspace → Activity & Audit Stream",
    ],
    referencePath: "/operational-patterns",
  },
  references: ["AAPM Operational Reference"],
} satisfies RecipeContract;

export const ACTIVITY_AUDIT_CONTRACT = {
  id: "activity-audit",
  displayName: "Activity & Audit Stream",
  purpose:
    "Compose readable operational activity and evidence-oriented audit history from the same trace foundation without treating the concepts as identical.",
  profiles: ["enterprise", "dashboard"],
  components: ["AppShell", "PageHeader", "ActivityFeed", "KeyValueList"],
  optional: ["DataTable", "StatusChip", "FilterToolbar"],
  icons: ["timeline", "clock", "users", "check", "warning"],
  operational: {
    maturity: "mature",
    useWhen: [
      "users need a readable narrative of operational changes",
      "evidence requires actor, timestamp, object, result, and state-change trace",
    ],
    avoidWhen: [
      "the surface is only a transient notification list",
      "immutable audit requirements are being simulated without a consumer-owned evidence source",
    ],
    anatomy: [
      "Ordered event stream",
      "Actor",
      "Action",
      "Timestamp",
      "Object or context",
      "Result",
      "Note, evidence, or state transition",
    ],
    requiredSemantics: [
      "Activity is user-oriented operational narrative",
      "Audit is evidence-oriented immutable history",
      "Actor",
      "Action",
      "Timestamp",
      "Object or context",
    ],
    optionalSemantics: [
      "Previous and new state",
      "Evidence reference",
      "Result status",
    ],
    responsive: {
      desktop:
        "Keep a readable ordered feed beside current object context when useful.",
      tablet: "Move the trace below current work while preserving event order.",
      mobile:
        "Use one chronological column with actor, action, and timestamp kept together.",
    },
    accessibility: [
      "Use ordered-list semantics for chronological narrative.",
      "Keep timestamps and actor labels available as text.",
      "Do not represent result only with color or icon.",
    ],
    aiGuidance:
      "Use ActivityFeed for readable activity; add evidence-oriented fields when the consumer is presenting an audit trail, and do not claim immutability from UI alone.",
    antiPatterns: [
      "Treating activity and audit as identical product concepts",
      "Dropping actor or timestamp",
      "Claiming immutable audit behavior from fixture presentation",
    ],
    relationships: [
      "Decision Workspace → Activity & Audit Stream",
      "Process Workspace → Activity & Audit Stream",
    ],
    referencePath: "/operational-patterns",
  },
  references: ["AAPM Operational Reference", "Operations Tracker"],
} satisfies RecipeContract;

/**
 * Typed canonical source for the second operational recipe batch. These
 * contracts preserve the legacy selection and semantic payload while making
 * the generic pattern decisions available through the canonical registry.
 * Consumers still own domain data, policy, calculations, and persistence.
 */
export const OPERATIONAL_KANBAN_CONTRACT = {
  id: "operational-kanban",
  displayName: "Operational Kanban",
  purpose:
    "Organize a portfolio of operational objects by work stage while preserving owner, age, next action, and exception visibility.",
  profiles: ["enterprise", "dashboard"],
  components: [
    "AppShell",
    "Sidebar",
    "PageHeader",
    "Card",
    "StatusChip",
    "Button",
  ],
  optional: ["Avatar", "Alert", "DetailDrawer", "FilterToolbar"],
  icons: ["table", "users", "clock", "warning", "view"],
  operational: {
    maturity: "mature",
    useWhen: [
      "people manage many work items waiting in human-action stages",
      "stage balance, age, ownership, and WIP visibility drive daily coordination",
    ],
    avoidWhen: [
      "the surface follows one object's ordered lifecycle",
      "stable cross-record comparison is better served by a DataTable",
    ],
    anatomy: [
      "Board",
      "Stage heading and count",
      "WIP or attention signal",
      "Scan-first work cards",
      "Contextual detail action",
    ],
    requiredSemantics: [
      "Object identity",
      "Owner",
      "Age or due time",
      "Stage",
      "Next action",
      "Exception when present",
    ],
    optionalSemantics: [
      "WIP reference",
      "Priority",
      "Contextual detail drawer",
    ],
    responsive: {
      desktop:
        "Use bounded stage columns with scan-first cards and visible column headings.",
      tablet:
        "Allow horizontal board scrolling only when columns retain readable width.",
      mobile:
        "Prefer a stage-by-stage stacked sequence or explicit stage switcher over miniature columns.",
    },
    accessibility: [
      "Expose every column with a heading and count.",
      "Preserve a logical DOM order independent of visual placement.",
      "Do not make drag-and-drop the only way to change or inspect work.",
    ],
    aiGuidance:
      "Choose Operational Kanban for many work items awaiting people; do not use it for the lifecycle of one object.",
    antiPatterns: [
      "Oversized decorative cards",
      "Mouse-only drag behavior",
      "Using color alone for stage or exception state",
    ],
    relationships: ["Operational Kanban → Process Workspace"],
    referencePath: "/operational-patterns",
  },
  references: ["AAPM Operational Reference"],
} satisfies RecipeContract;

export const EXCEPTION_QUEUE_CONTRACT = {
  id: "exception-queue",
  displayName: "Exception Queue",
  purpose:
    "Isolate work that requires attention and preserve its reason, severity, owner, age, and next action for fast operational triage.",
  profiles: ["enterprise", "dashboard"],
  components: [
    "AppShell",
    "Sidebar",
    "PageHeader",
    "FilterToolbar",
    "DataTable",
    "DetailDrawer",
  ],
  optional: ["Alert", "StatusChip", "Button", "KPICluster"],
  icons: ["warning", "danger", "clock", "users", "filter", "view"],
  operational: {
    maturity: "mature",
    useWhen: [
      "the primary question is which work requires attention",
      "operators need comparable exception reason, age, owner, and next action",
    ],
    avoidWhen: [
      "normal and exceptional work should be browsed together",
      "the task is a generic KPI dashboard",
    ],
    anatomy: [
      "Queue context",
      "Search or bounded filters",
      "Exception reason and severity",
      "Object identity",
      "Owner and age",
      "Next action",
      "Contextual review",
    ],
    requiredSemantics: [
      "Exception category",
      "Plain-language reason",
      "Object",
      "Owner",
      "Age or due time",
      "Next action",
    ],
    optionalSemantics: [
      "Bulk operation",
      "Priority",
      "Dependency",
      "Contextual detail drawer",
    ],
    responsive: {
      desktop: "Use a comparable table or dense list with the action visible.",
      tablet:
        "Retain columns that explain reason, owner, and next action; scroll or stack secondary context.",
      mobile:
        "Use stacked record anatomy or controlled table scrolling without hiding the exception reason.",
    },
    accessibility: [
      "Give the queue and table an accessible name.",
      "State severity and reason in text.",
      "Make row inspection keyboard operable and restore focus after the drawer closes.",
    ],
    aiGuidance:
      "Choose Exception Queue when attention work is the primary collection; start from the canonical Entity List scaffold and omit irrelevant KPI or bulk controls.",
    antiPatterns: [
      "Mixing healthy records with exceptions at equal visual weight",
      "Rendering giant red cards for every issue",
      "Removing owner or next action from the queue",
    ],
    relationships: [
      "Control Tower → Exception Queue",
      "Exception Queue → Process Workspace",
      "Exception Queue → Decision Workspace",
    ],
    referencePath: "/operational-patterns",
  },
  references: ["AAPM Operational Reference", "Operations Tracker"],
} satisfies RecipeContract;

export const CONTROL_TOWER_CONTRACT = {
  id: "control-tower",
  displayName: "Control Tower",
  purpose:
    "Prioritize operational exceptions, accountable actions, current movement, and near-term sufficiency without turning the surface into a vanity KPI dashboard.",
  profiles: ["enterprise", "dashboard"],
  components: [
    "AppShell",
    "Sidebar",
    "PageHeader",
    "Alert",
    "KPICluster",
    "DataTable",
  ],
  optional: [
    "MetricCard",
    "Progress",
    "Sparkline",
    "ActivityFeed",
    "DetailDrawer",
  ],
  icons: ["analytics", "warning", "clock", "delivery", "package", "view"],
  operational: {
    maturity: "mature",
    useWhen: [
      "the first question is what needs attention across several operational flows",
      "owners need one place to see current movement, near-term risk, and next accountable actions",
    ],
    avoidWhen: [
      "the task is a historical analytics report",
      "a single object's lifecycle is the primary subject",
    ],
    anatomy: [
      "Page header and operating context",
      "Critical exception",
      "Required human action",
      "Current operational signals",
      "Near-term forecast",
      "Supporting metrics and trace",
    ],
    requiredSemantics: [
      "Exception severity and plain-language reason",
      "Current state",
      "Owner",
      "Next action and due time",
      "Forecast or capacity context when decision-relevant",
    ],
    optionalSemantics: [
      "Historical comparison",
      "Trend visualization",
      "Contextual detail drawer",
    ],
    responsive: {
      desktop:
        "Use an attention-first grid with signals and supporting context beside the queue.",
      tablet:
        "Reduce supporting metrics before compressing the exception and action columns.",
      mobile:
        "Stack critical exception, next action, current state, forecast, then supporting history.",
    },
    accessibility: [
      "Expose one main heading and named regions for attention, forecast, and queue content.",
      "State severity in text and iconography; never rely on color alone.",
      "Keep exception actions keyboard reachable and restore focus after contextual inspection.",
    ],
    aiGuidance:
      "Choose Control Tower when the user needs an operational overview whose hierarchy begins with exceptions and accountable actions, not generic totals.",
    antiPatterns: [
      "Leading with total orders, customers, or revenue when they do not change the next decision",
      "Making every healthy signal bright green",
      "Using a chart collection as a substitute for an exception queue",
    ],
    relationships: [
      "Control Tower → Exception Queue",
      "Control Tower → Process Workspace",
      "Control Tower → Resource Forecast",
    ],
    referencePath: "/operational-patterns",
  },
  references: ["AAPM Operational Reference"],
} satisfies RecipeContract;

export const OPERATIONAL_PATTERN_CONTRACTS = {
  "readiness-review": READINESS_REVIEW_CONTRACT,
  "process-workspace": PROCESS_WORKSPACE_CONTRACT,
  "decision-workspace": DECISION_WORKSPACE_CONTRACT,
  "activity-audit": ACTIVITY_AUDIT_CONTRACT,
  "operational-kanban": OPERATIONAL_KANBAN_CONTRACT,
  "exception-queue": EXCEPTION_QUEUE_CONTRACT,
  "control-tower": CONTROL_TOWER_CONTRACT,
} as const;
