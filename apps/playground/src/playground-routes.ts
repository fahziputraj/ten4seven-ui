import {
  blockNameBySlug,
  componentNameBySlug,
  familyBySlug,
  recipeCatalog,
  recipePath,
} from "./catalog-model";

export type PlaygroundRoute =
  | "Theme Studio"
  | "Component Lab"
  | "Tokens"
  | "Components"
  | "Blocks"
  | "Icons"
  | "Recipes"
  | "Warehouse Inventory"
  | "Publishing Store"
  | "Public Showcase";

export const playgroundRoutePaths: Record<PlaygroundRoute, string> = {
  "Theme Studio": "/theme-studio",
  "Component Lab": "/component-lab",
  Tokens: "/tokens",
  Components: "/components",
  Blocks: "/blocks",
  Icons: "/icons",
  Recipes: "/recipes",
  "Warehouse Inventory": "/warehouse-inventory",
  "Publishing Store": "/ebook-store",
  "Public Showcase": "/public-showcase",
};

export const playgroundRouteTitles: Record<PlaygroundRoute, string> = {
  "Theme Studio": "ten4seven UI — Theme Studio",
  "Component Lab": "ten4seven UI — Component Lab",
  Tokens: "ten4seven UI — Tokens",
  Components: "ten4seven UI — Components",
  Blocks: "ten4seven UI — Blocks",
  Icons: "ten4seven UI — Icons",
  Recipes: "ten4seven UI — Recipes",
  "Warehouse Inventory": "ten4seven UI — Warehouse Inventory",
  "Publishing Store": "ten4seven UI — Publishing Store",
  "Public Showcase": "ten4seven UI — Public Showcase",
};

export const playgroundRouteDescriptions: Record<PlaygroundRoute, string> = {
  "Theme Studio":
    "Live theme-axis and typography proof for the ten4seven UI system.",
  "Component Lab":
    "Interactive QA and stress-test surface for ten4seven UI components.",
  Tokens:
    "Semantic ten4seven UI tokens resolved from the active theme profile.",
  Components:
    "Canonical ten4seven UI component contracts and implementation status.",
  Blocks:
    "Reusable expressive ten4seven UI blocks for public and content-led compositions.",
  Icons: "Semantic local Solar icons curated for ten4seven UI consumers.",
  Recipes:
    "Composable ten4seven UI screen recipes for agents and product teams.",
  "Warehouse Inventory":
    "Reference warehouse inventory entity-list composed from ten4seven UI.",
  "Publishing Store":
    "Reference Indonesian publishing catalog composed from ten4seven UI.",
  "Public Showcase":
    "Public composition showcase for ten4seven UI blocks and recipes.",
};

export type RouteMatch =
  | { kind: "known"; route: PlaygroundRoute }
  | { kind: "component-family"; category: string; pathname: string }
  | { kind: "component-detail"; name: string; pathname: string }
  | { kind: "block-detail"; name: string; pathname: string }
  | { kind: "recipe-detail"; name: string; pathname: string }
  | { kind: "not-found"; pathname: string };

export function routeFromPath(pathname: string): RouteMatch {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  if (normalizedPath === "/") {
    return { kind: "known", route: "Theme Studio" };
  }
  const entry = Object.entries(playgroundRoutePaths).find(
    ([, path]) => path === normalizedPath,
  );

  if (entry) return { kind: "known", route: entry[0] as PlaygroundRoute };

  const componentMatch = normalizedPath.match(/^\/components\/([^/]+)$/);
  if (componentMatch) {
    const segment = componentMatch[1];
    const category = familyBySlug[segment];
    if (category) {
      return { kind: "component-family", category, pathname: normalizedPath };
    }
    const name = componentNameBySlug[segment];
    if (name) {
      return { kind: "component-detail", name, pathname: normalizedPath };
    }
  }

  const blockMatch = normalizedPath.match(/^\/blocks\/([^/]+)$/);
  if (blockMatch) {
    const name = blockNameBySlug[blockMatch[1]];
    if (name) return { kind: "block-detail", name, pathname: normalizedPath };
  }

  const recipeMatch = normalizedPath.match(/^\/recipes\/([^/]+)$/);
  if (recipeMatch) {
    const name = Object.keys(recipeCatalog).find(
      (recipeName) => recipePath(recipeName) === normalizedPath,
    );
    if (name) return { kind: "recipe-detail", name, pathname: normalizedPath };
  }

  return { kind: "not-found", pathname: normalizedPath };
}

export const studioNavigation: PlaygroundRoute[] = [
  "Theme Studio",
  "Component Lab",
];
export const libraryNavigation: PlaygroundRoute[] = [
  "Tokens",
  "Components",
  "Blocks",
  "Icons",
  "Recipes",
];
export const referenceNavigation: PlaygroundRoute[] = [
  "Warehouse Inventory",
  "Publishing Store",
  "Public Showcase",
];
