import type { AliasMap, OwnershipRules } from "./types.ts";
import { CONTRACT_SCHEMA_VERSION } from "./types.ts";
import { AUTHENTICATION_CONTRACT } from "./authentication.ts";
import { AAPM_BRAND_ADAPTER, BRAND_PROFILES } from "./brand-profile.ts";
import { ENTITY_DETAIL_CONTRACT } from "./entity-detail.ts";
import { ENTITY_LIST_CONTRACT } from "./entity-list.ts";
import {
  ACTIVITY_AUDIT_CONTRACT,
  CONTROL_TOWER_CONTRACT,
  DECISION_WORKSPACE_CONTRACT,
  EXCEPTION_QUEUE_CONTRACT,
  ENTITY_360_CONTRACT,
  LOAD_PLANNING_CONTRACT,
  OPERATIONAL_KANBAN_CONTRACT,
  PROCESS_WORKSPACE_CONTRACT,
  READINESS_REVIEW_CONTRACT,
  RECEIVING_CONSOLE_CONTRACT,
  RESOURCE_FORECAST_CONTRACT,
  ROUTE_PLANNING_CONTRACT,
} from "./operational-patterns.ts";
import { DEFAULT_THEME_PROFILE, MOTION_PROFILES } from "./theme-profile.ts";
import { THEME_RECIPES } from "./theme-recipe.ts";
import { PLATFORM_NEUTRAL_CONTRACT } from "./platform-neutral.ts";
import { MODULE_STATE_CONTRACT } from "./module-state.ts";
import { RESPONSIVE_CONTRACT } from "./responsive-shell.ts";
import { SAAS_CONTROL_PLANE_CONTRACT } from "./saas-control-plane.ts";
import { NATIVE_MOBILE_CONTRACT } from "./native-mobile.ts";
import { ERP_DENSITY_CONTRACT } from "./erp-density.ts";

export const ALIAS_MAP: AliasMap = {
  RadioGroup: "CheckboxGroup",
  TimeInput: "NativeTimeInput",
  ActionMenu: "DropdownMenu",
  CommandPalette: "CommandMenu",
  DescriptionList: "KeyValueList",
  Timeline: "ActivityFeed",
};

export const OWNERSHIP_RULES: OwnershipRules = {
  schemaVersion: CONTRACT_SCHEMA_VERSION,
  rules: [
    {
      scope: "canonical-contracts",
      owner: "ten4seven",
      canonicalPaths: [
        "packages/contracts/src",
        "packages/tokens/src",
        "packages/ui/src",
        "packages/icons/src",
      ],
      forbiddenPatterns: [
        "local basic Button/Input/Card/Table/Select primitive",
        "parallel theme provider",
        "raw external icon import",
        "business data, permissions, entitlements, persistence, routing, or handlers in generic primitives",
      ],
      note: "The system owns interaction contracts, semantic tokens, icon names, and recipe decisions.",
    },
    {
      scope: "platform-neutral-contracts",
      owner: "ten4seven",
      canonicalPaths: [
        "packages/contracts/src/platform-neutral.ts",
        "generated/platform-neutral.json",
      ],
      forbiddenPatterns: [
        "DOM props or React event types",
        "CSS selectors or browser APIs",
        "native framework implementation details",
        "business-domain calculations or authority",
      ],
      note: "Platform-neutral vocabulary is a shared semantic boundary; renderers and consumers own implementation and business behavior.",
    },
    {
      scope: "domain-behavior",
      owner: "consumer",
      canonicalPaths: [
        "consumer-owned API clients",
        "consumer-owned business data and calculations",
        "consumer-owned permissions",
        "consumer-owned entitlements",
        "consumer-owned persistence and handlers",
        "consumer-owned routing and navigation state",
      ],
      note: "Consumers own domain data, permissions, entitlements, persistence, routing, and handlers while composing canonical contracts.",
    },
    {
      scope: "legacy-catalog-adapter",
      owner: "ten4seven",
      canonicalPaths: [
        "packages/ai/catalog/components.json",
        "packages/ai/catalog/recipes.json",
      ],
      note: "Full human descriptions remain a compatibility surface until each recipe is migrated to typed contracts.",
    },
  ],
};

export const CANONICAL_CONTRACTS = {
  schemaVersion: CONTRACT_SCHEMA_VERSION,
  themeProfiles: {
    default: DEFAULT_THEME_PROFILE,
  },
  themeRecipes: THEME_RECIPES,
  brandAdapter: AAPM_BRAND_ADAPTER,
  brandProfiles: BRAND_PROFILES,
  platformNeutral: PLATFORM_NEUTRAL_CONTRACT,
  responsive: RESPONSIVE_CONTRACT,
  moduleStates: MODULE_STATE_CONTRACT,
  saasControlPlane: SAAS_CONTROL_PLANE_CONTRACT,
  nativeMobile: NATIVE_MOBILE_CONTRACT,
  erpDensity: ERP_DENSITY_CONTRACT,
  motionProfiles: MOTION_PROFILES,
  recipes: {
    "entity-list": ENTITY_LIST_CONTRACT,
    "entity-detail": ENTITY_DETAIL_CONTRACT,
    auth: AUTHENTICATION_CONTRACT,
    "readiness-review": READINESS_REVIEW_CONTRACT,
    "process-workspace": PROCESS_WORKSPACE_CONTRACT,
    "decision-workspace": DECISION_WORKSPACE_CONTRACT,
    "activity-audit": ACTIVITY_AUDIT_CONTRACT,
    "operational-kanban": OPERATIONAL_KANBAN_CONTRACT,
    "exception-queue": EXCEPTION_QUEUE_CONTRACT,
    "control-tower": CONTROL_TOWER_CONTRACT,
    "load-planning": LOAD_PLANNING_CONTRACT,
    "route-planning": ROUTE_PLANNING_CONTRACT,
    "receiving-console": RECEIVING_CONSOLE_CONTRACT,
    "resource-forecast": RESOURCE_FORECAST_CONTRACT,
    "entity-360": ENTITY_360_CONTRACT,
  },
  aliases: ALIAS_MAP,
  ownership: OWNERSHIP_RULES,
} as const;
