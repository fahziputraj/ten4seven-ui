import type { RecipeContract } from "./types.ts";

/**
 * Typed canonical source for the first operational recipe batch. These
 * contracts describe selection, semantic minimums, and composition guidance;
 * they do not own domain data, policy, calculations, or persistence.
 */
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
  "process-workspace": PROCESS_WORKSPACE_CONTRACT,
  "decision-workspace": DECISION_WORKSPACE_CONTRACT,
  "activity-audit": ACTIVITY_AUDIT_CONTRACT,
} as const;
