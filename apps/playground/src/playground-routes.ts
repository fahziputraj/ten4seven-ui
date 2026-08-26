export type PlaygroundRoute =
  | "Theme Studio"
  | "Tokens"
  | "Components"
  | "Icons"
  | "Recipes"
  | "Warehouse Inventory"
  | "Publishing Store";

export const playgroundRoutePaths: Record<PlaygroundRoute, string> = {
  "Theme Studio": "/theme-studio",
  Tokens: "/tokens",
  Components: "/components",
  Icons: "/icons",
  Recipes: "/recipes",
  "Warehouse Inventory": "/warehouse-inventory",
  "Publishing Store": "/ebook-store",
};

export const playgroundRouteTitles: Record<PlaygroundRoute, string> = {
  "Theme Studio": "ten4seven UI — Theme Studio",
  Tokens: "ten4seven UI — Tokens",
  Components: "ten4seven UI — Components",
  Icons: "ten4seven UI — Icons",
  Recipes: "ten4seven UI — Recipes",
  "Warehouse Inventory": "ten4seven UI — Warehouse Inventory",
  "Publishing Store": "Leaf & Letter — Publishing Store",
};

export type RouteMatch =
  | { kind: "known"; route: PlaygroundRoute }
  | { kind: "not-found"; pathname: string };

export function routeFromPath(pathname: string): RouteMatch {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const entry = Object.entries(playgroundRoutePaths).find(
    ([, path]) => path === normalizedPath,
  );

  return entry
    ? { kind: "known", route: entry[0] as PlaygroundRoute }
    : { kind: "not-found", pathname: normalizedPath };
}

export const studioNavigation: PlaygroundRoute[] = ["Theme Studio"];
export const libraryNavigation: PlaygroundRoute[] = [
  "Tokens",
  "Components",
  "Icons",
  "Recipes",
];
export const referenceNavigation: PlaygroundRoute[] = [
  "Warehouse Inventory",
  "Publishing Store",
];
