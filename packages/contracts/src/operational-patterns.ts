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

export const OPERATIONAL_PATTERN_CONTRACTS = {
  "readiness-review": READINESS_REVIEW_CONTRACT,
  "process-workspace": PROCESS_WORKSPACE_CONTRACT,
  "decision-workspace": DECISION_WORKSPACE_CONTRACT,
  "activity-audit": ACTIVITY_AUDIT_CONTRACT,
} as const;
