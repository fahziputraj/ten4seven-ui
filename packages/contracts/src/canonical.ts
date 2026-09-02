import type { AliasMap, OwnershipRules } from "./types.ts";
import { CONTRACT_SCHEMA_VERSION } from "./types.ts";
import { AUTHENTICATION_CONTRACT } from "./authentication.ts";
import { BRAND_PROFILES } from "./brand-profile.ts";
import { ENTITY_DETAIL_CONTRACT } from "./entity-detail.ts";
import { ENTITY_LIST_CONTRACT } from "./entity-list.ts";
import { DEFAULT_THEME_PROFILE, MOTION_PROFILES } from "./theme-profile.ts";
import { THEME_RECIPES } from "./theme-recipe.ts";

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
      ],
      note: "The system owns interaction contracts, semantic tokens, icon names, and recipe decisions.",
    },
    {
      scope: "domain-behavior",
      owner: "consumer",
      canonicalPaths: [
        "consumer-owned API clients",
        "consumer-owned permissions",
        "consumer-owned persistence and handlers",
      ],
      note: "Consumers own domain data and behavior while composing canonical contracts.",
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
  brandProfiles: BRAND_PROFILES,
  motionProfiles: MOTION_PROFILES,
  recipes: {
    "entity-list": ENTITY_LIST_CONTRACT,
    "entity-detail": ENTITY_DETAIL_CONTRACT,
    auth: AUTHENTICATION_CONTRACT,
  },
  aliases: ALIAS_MAP,
  ownership: OWNERSHIP_RULES,
} as const;
