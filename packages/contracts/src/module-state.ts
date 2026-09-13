import type { ContractOwnership } from "./types.ts";
import { CONTRACT_SCHEMA_VERSION } from "./types.ts";

export type ModuleStateId =
  | "not-available"
  | "not-entitled"
  | "setup-required"
  | "provisioning"
  | "resuming"
  | "suspended"
  | "dependency-unavailable"
  | "permission-denied"
  | "out-of-scope"
  | "read-only"
  | "action-required";

export const MODULE_STATE_IDS = [
  "not-available",
  "not-entitled",
  "setup-required",
  "provisioning",
  "resuming",
  "suspended",
  "dependency-unavailable",
  "permission-denied",
  "out-of-scope",
  "read-only",
  "action-required",
] as const satisfies readonly ModuleStateId[];

export type ModuleStateTone =
  "neutral" | "info" | "warning" | "danger" | "success";

export type ModuleStateIconName =
  | "info"
  | "lock"
  | "pending"
  | "settings"
  | "warning"
  | "blocked"
  | "view"
  | "refresh";

export interface ModuleStatePattern {
  readonly id: ModuleStateId;
  readonly label: string;
  readonly tone: ModuleStateTone;
  readonly icon: ModuleStateIconName;
  readonly defaultTitle: string;
  readonly defaultDescription: string;
  readonly emphasis: "quiet" | "attention";
  readonly allowsPrimaryAction: boolean;
  readonly allowsSecondaryAction: boolean;
  readonly allowsRetry: boolean;
  readonly consumerProvides: readonly [
    "applicability",
    "authorization",
    "entitlement",
    "tenant-or-resource-context",
    "lifecycle-transition",
  ];
}

export interface ModuleStateContract {
  readonly schemaVersion: typeof CONTRACT_SCHEMA_VERSION;
  readonly id: "module-state-presentation";
  readonly states: Readonly<Record<ModuleStateId, ModuleStatePattern>>;
  readonly ownership: ContractOwnership;
  readonly consumerInput: readonly string[];
  readonly forbiddenInRenderer: readonly string[];
  readonly accessibility: readonly string[];
  readonly responsive: Readonly<{
    readonly desktop: string;
    readonly tablet: string;
    readonly mobile: string;
  }>;
}

const consumerProvides = [
  "applicability",
  "authorization",
  "entitlement",
  "tenant-or-resource-context",
  "lifecycle-transition",
] as const;

export const MODULE_STATE_PATTERNS = {
  "not-available": {
    id: "not-available",
    label: "Not available",
    tone: "neutral",
    icon: "info",
    defaultTitle: "This module is not available",
    defaultDescription:
      "The consumer should explain the product or environment condition that keeps this module unavailable.",
    emphasis: "quiet",
    allowsPrimaryAction: false,
    allowsSecondaryAction: true,
    allowsRetry: false,
    consumerProvides,
  },
  "not-entitled": {
    id: "not-entitled",
    label: "Not entitled",
    tone: "neutral",
    icon: "lock",
    defaultTitle: "This module is not included",
    defaultDescription:
      "The consumer supplies the entitlement message and any product-owned next step.",
    emphasis: "quiet",
    allowsPrimaryAction: true,
    allowsSecondaryAction: true,
    allowsRetry: false,
    consumerProvides,
  },
  "setup-required": {
    id: "setup-required",
    label: "Setup required",
    tone: "warning",
    icon: "settings",
    defaultTitle: "Finish setup to continue",
    defaultDescription:
      "The consumer provides the setup guidance and owns the setup transition.",
    emphasis: "attention",
    allowsPrimaryAction: true,
    allowsSecondaryAction: true,
    allowsRetry: false,
    consumerProvides,
  },
  provisioning: {
    id: "provisioning",
    label: "Provisioning",
    tone: "info",
    icon: "pending",
    defaultTitle: "This module is being provisioned",
    defaultDescription:
      "Show the consumer-supplied progress or expected next check without inventing lifecycle data.",
    emphasis: "quiet",
    allowsPrimaryAction: false,
    allowsSecondaryAction: true,
    allowsRetry: false,
    consumerProvides,
  },
  resuming: {
    id: "resuming",
    label: "Resuming",
    tone: "info",
    icon: "pending",
    defaultTitle: "This module is resuming",
    defaultDescription:
      "The consumer owns the lifecycle status and decides whether a refresh action is useful.",
    emphasis: "quiet",
    allowsPrimaryAction: false,
    allowsSecondaryAction: true,
    allowsRetry: false,
    consumerProvides,
  },
  suspended: {
    id: "suspended",
    label: "Suspended",
    tone: "warning",
    icon: "blocked",
    defaultTitle: "This module is suspended",
    defaultDescription:
      "The consumer explains the suspension state and owns the resume request, if available.",
    emphasis: "attention",
    allowsPrimaryAction: true,
    allowsSecondaryAction: true,
    allowsRetry: false,
    consumerProvides,
  },
  "dependency-unavailable": {
    id: "dependency-unavailable",
    label: "Dependency unavailable",
    tone: "danger",
    icon: "info",
    defaultTitle: "A required dependency is unavailable",
    defaultDescription:
      "The consumer supplies dependency context and decides whether retry or fallback is safe.",
    emphasis: "attention",
    allowsPrimaryAction: true,
    allowsSecondaryAction: true,
    allowsRetry: true,
    consumerProvides,
  },
  "permission-denied": {
    id: "permission-denied",
    label: "Permission denied",
    tone: "danger",
    icon: "lock",
    defaultTitle: "You do not have access to this module",
    defaultDescription:
      "The consumer supplies effective-access meaning and any escalation or return action.",
    emphasis: "attention",
    allowsPrimaryAction: false,
    allowsSecondaryAction: true,
    allowsRetry: false,
    consumerProvides,
  },
  "out-of-scope": {
    id: "out-of-scope",
    label: "Out of scope",
    tone: "neutral",
    icon: "view",
    defaultTitle: "This resource is out of scope",
    defaultDescription:
      "The consumer supplies the resource boundary and owns navigation back to an allowed scope.",
    emphasis: "quiet",
    allowsPrimaryAction: true,
    allowsSecondaryAction: true,
    allowsRetry: false,
    consumerProvides,
  },
  "read-only": {
    id: "read-only",
    label: "Read-only",
    tone: "info",
    icon: "lock",
    defaultTitle: "Read-only view",
    defaultDescription:
      "The consumer decides which actions are unavailable and supplies the read-only explanation.",
    emphasis: "quiet",
    allowsPrimaryAction: false,
    allowsSecondaryAction: true,
    allowsRetry: false,
    consumerProvides,
  },
  "action-required": {
    id: "action-required",
    label: "Action required",
    tone: "warning",
    icon: "warning",
    defaultTitle: "Action is required",
    defaultDescription:
      "The consumer supplies the required action, its applicability, and its handler.",
    emphasis: "attention",
    allowsPrimaryAction: true,
    allowsSecondaryAction: true,
    allowsRetry: false,
    consumerProvides,
  },
} as const satisfies Readonly<Record<ModuleStateId, ModuleStatePattern>>;

const moduleStateOwnership: ContractOwnership = {
  system: [
    "responsive-presentation",
    "accessibility",
    "semantic-tokens",
    "icon-vocabulary",
    "interaction-contract",
  ],
  consumer: [
    "business-data",
    "permissions",
    "entitlements",
    "persistence",
    "routing",
    "handlers",
    "tenant-context",
  ],
  platform: ["principal-context", "effective-access"],
  businessModule: ["module-lifecycle", "audit-authority", "workflow-authority"],
};

export const MODULE_STATE_CONTRACT: ModuleStateContract = {
  schemaVersion: CONTRACT_SCHEMA_VERSION,
  id: "module-state-presentation",
  states: MODULE_STATE_PATTERNS,
  ownership: moduleStateOwnership,
  consumerInput: [
    "state",
    "title",
    "description",
    "details",
    "primary action",
    "secondary action",
  ],
  forbiddenInRenderer: [
    "entitlement evaluation",
    "permission evaluation",
    "tenant or resource fetching",
    "lifecycle mutation",
    "route navigation decision",
    "business-data calculation",
  ],
  accessibility: [
    "Expose the state label and explanation in the document order.",
    "Keep consumer-provided actions keyboard reachable with canonical target geometry.",
    "Do not use color alone to communicate a module state.",
    "Allow the consumer to control live-region behavior for asynchronous transitions.",
  ],
  responsive: {
    desktop: "content-sized state surface with actions aligned to the copy",
    tablet: "copy and actions wrap without reducing touch targets",
    mobile: "copy and actions stack in primary-first order",
  },
} as const;

export function getModuleStatePattern(state: ModuleStateId) {
  return MODULE_STATE_PATTERNS[state];
}
