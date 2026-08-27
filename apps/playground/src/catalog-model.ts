import { IconNames, type IconName } from "@ten4seven/icons";

import componentCatalogJson from "../../../packages/ai/catalog/components.json";
import blockCatalogJson from "../../../packages/ai/catalog/blocks.json";
import iconCatalogJson from "../../../packages/ai/catalog/icons.json";
import recipeCatalogJson from "../../../packages/ai/catalog/recipes.json";

export type ComponentLevel =
  "foundation" | "primitive" | "component" | "pattern";

export type ComponentMaturity =
  "implemented" | "polished" | "experimental" | "deprecated";

export type ComponentApiProp = {
  name: string;
  type: string;
  defaultValue?: string;
  required?: boolean;
  description: string;
};

export type ComponentContract = {
  status: "implemented" | "experimental" | "planned" | "deprecated";
  category: string;
  purpose: string;
  useWhen: string[];
  avoidWhen: string[];
  recipes: string[];
  importantProps: string[];
  relatedComponents: string[];
  aliasOf?: string;
  displayName?: string;
  level?: ComponentLevel;
  maturity?: ComponentMaturity;
  states?: string[];
  accessibility?: string[];
  responsive?: string[];
  motion?: string[];
  tokens?: string[];
  api?: ComponentApiProp[];
  example?: string;
  alternativeTo?: string[];
  composesWith?: string[];
  usedByPatterns?: string[];
};

export type IconContract = {
  provider: string;
  useWhen: string[];
  category?: string;
};

export type RecipeContract = {
  blocks?: string[];
  purpose: string;
  profiles: string[];
  components: string[];
  optional?: string[];
  icons?: string[];
  displayName?: string;
  references?: string[];
};

export type BlockContract = {
  accessibility: string[];
  avoidWhen: string[];
  category: string;
  contentSlots: string[];
  displayName: string;
  example: string;
  motion: string[];
  optionalComponents: string[];
  performance: string[];
  purpose: string;
  recommendedRecipes: string[];
  requiredComponents: string[];
  responsive: string[];
  source: string;
  useWhen: string[];
  variants: string[];
};

export const componentCatalog = componentCatalogJson as Record<
  string,
  ComponentContract
>;
export const blockCatalog = blockCatalogJson as Record<string, BlockContract>;
export const iconCatalog = iconCatalogJson as Record<string, IconContract>;
export const recipeCatalog = recipeCatalogJson as Record<
  string,
  RecipeContract
>;

export const componentFamilyDefinitions: Array<{
  category: string;
  icon: IconName;
  label: string;
}> = [
  { category: "foundation", icon: "tokens", label: "Foundations" },
  { category: "action", icon: "plus", label: "Actions" },
  { category: "form", icon: "edit", label: "Forms" },
  { category: "navigation", icon: "sidebar", label: "Navigation" },
  { category: "layout", icon: "components", label: "Layout" },
  { category: "surface", icon: "components", label: "Surfaces" },
  { category: "data", icon: "table", label: "Data Display" },
  { category: "table", icon: "table", label: "Tables" },
  {
    category: "filter",
    icon: "filter",
    label: "Filtering & Bulk Actions",
  },
  { category: "overlay", icon: "modal", label: "Overlays" },
  { category: "feedback", icon: "success", label: "Feedback & Progress" },
  { category: "date-time", icon: "calendar", label: "Date & Time" },
  { category: "file", icon: "files", label: "Files" },
  {
    category: "chart",
    icon: "chart",
    label: "Charts & Data Visualization",
  },
  { category: "media", icon: "image", label: "Media" },
  { category: "commerce", icon: "book", label: "Commerce" },
  { category: "pattern", icon: "dashboard", label: "Patterns" },
];

export const categoryLabels = Object.fromEntries(
  componentFamilyDefinitions.map(({ category, label }) => [category, label]),
);

export const canonicalComponentEntries = Object.entries(
  componentCatalog,
).filter(([, component]) => !component.aliasOf);

export const canonicalComponentNames = canonicalComponentEntries.map(
  ([name]) => name,
);

export function slugify(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

export const componentNameBySlug = Object.fromEntries(
  Object.keys(componentCatalog).map((name) => [slugify(name), name]),
);

export const blockNameBySlug = Object.fromEntries(
  Object.keys(blockCatalog).map((slug) => [slugify(slug), slug]),
);

export const familyBySlug = Object.fromEntries([
  ...componentFamilyDefinitions.map(({ category, label }) => [
    slugify(label),
    category,
  ]),
  // Preserve bookmarked pre-v1 taxonomy routes while the canonical links use
  // the clearer L0-L5 family names above.
  ["application", "pattern"],
  ["tables-filtering", "filter"],
  ["charts", "chart"],
  ["feedback", "feedback"],
]);

export const familyByCategory = Object.fromEntries(
  componentFamilyDefinitions.map((definition) => [
    definition.category,
    definition,
  ]),
);

export function componentPath(name: string) {
  return `/components/${slugify(name)}`;
}

export function componentFamilyPath(category: string) {
  const definition = familyByCategory[category];
  return `/components/${slugify(definition?.label ?? category)}`;
}

export function componentFamilyAnchor(category: string) {
  return `#component-family-${slugify(category)}`;
}

export function blockPath(name: string) {
  const slug = Object.entries(blockCatalog).find(
    ([key, block]) => key === name || block.displayName === name,
  )?.[0];
  return `/blocks/${slugify(slug ?? name)}`;
}

export function recipePath(name: string) {
  return `/recipes/${slugify(name)}`;
}

export function iconPath(name: string) {
  return `/icons/${slugify(name)}`;
}

export const catalogCounts = {
  blocks: Object.keys(blockCatalog).length,
  canonicalComponents: canonicalComponentEntries.length,
  components: Object.keys(componentCatalog).length,
  icons: IconNames.length,
  recipes: Object.keys(recipeCatalog).length,
};

export function componentsInCategory(category: string) {
  return canonicalComponentEntries.filter(
    ([, component]) => component.category === category,
  );
}
