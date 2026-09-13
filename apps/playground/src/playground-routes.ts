import {
  blockCatalog,
  blockNameBySlug,
  categoryLabels,
  componentCatalog,
  componentNameBySlug,
  familyBySlug,
  recipeCatalog,
  recipePath,
} from "./catalog-model";
import type { AuthBrandProfileId } from "@ten4seven/contracts";

export type PlaygroundRoute =
  | "Theme Studio"
  | "Component Lab"
  | "Tokens"
  | "Components"
  | "Blocks"
  | "Icons"
  | "Recipes"
  | "Operations Tracker"
  | "Operational Patterns"
  | "SaaS Control Plane"
  | "ERP Density Reference"
  | "Farm P1 Reference"
  | "Publishing Store"
  | "Public Showcase";

export type AdoptionProofRoute =
  "Farm Synthetic" | "Auth · Neutral" | "Auth · AAPM Academy";

export type SurfaceMaturity = "PRIMARY" | "QUALITY_REFERENCE" | "LAB_PROOF";

/**
 * The shell variant is a presentation contract, not a product-permission or
 * business-authority boundary. Route content remains responsible for its own
 * domain behavior while the shell keeps one shared coordinate system.
 */
export type PlaygroundShellVariant =
  "standard" | "workbench" | "wide" | "contextual";

export type PlaygroundNavigationGroup = {
  adoptionProofRoutes?: AdoptionProofRoute[];
  id: "studio" | "library" | "reference" | "labs-proofs";
  label: "Studio" | "Library" | "Reference" | "Labs / Proofs";
  maturity: SurfaceMaturity;
  routes: PlaygroundRoute[];
};

export type PlaygroundRouteContract = {
  description: string;
  path: string;
  shellVariant: PlaygroundShellVariant;
  title: string;
};

/**
 * The single contract for advertised top-level playground surfaces. The
 * compatibility maps below are derived views kept for existing consumers.
 */
export const playgroundRouteContracts: Record<
  PlaygroundRoute,
  PlaygroundRouteContract
> = {
  "Theme Studio": {
    description:
      "Live theme-axis and typography proof for the ten4seven UI system.",
    path: "/theme-studio",
    shellVariant: "workbench",
    title: "ten4seven UI — Theme Studio",
  },
  "Component Lab": {
    description:
      "Interactive QA and stress-test surface for ten4seven UI components.",
    path: "/component-lab",
    shellVariant: "standard",
    title: "ten4seven UI — Component Lab",
  },
  Tokens: {
    description:
      "Semantic ten4seven UI tokens resolved from the active theme profile.",
    path: "/tokens",
    shellVariant: "standard",
    title: "ten4seven UI — Tokens",
  },
  Components: {
    description:
      "Canonical ten4seven UI component contracts and implementation status.",
    path: "/components",
    shellVariant: "standard",
    title: "ten4seven UI — Components",
  },
  Blocks: {
    description:
      "Reusable expressive ten4seven UI blocks for public and content-led compositions.",
    path: "/blocks",
    shellVariant: "standard",
    title: "ten4seven UI — Blocks",
  },
  Icons: {
    description:
      "The curated Solar Bold Duotone icon family with theme-aware paint.",
    path: "/icons",
    shellVariant: "standard",
    title: "ten4seven UI — Icons",
  },
  Recipes: {
    description:
      "Composable ten4seven UI screen recipes for agents and product teams.",
    path: "/recipes",
    shellVariant: "standard",
    title: "ten4seven UI — Recipes",
  },
  "Operations Tracker": {
    description:
      "Reference operations tracker for customer, supply, delivery, finance, and fleet work composed from ten4seven UI.",
    path: "/operations-tracker",
    shellVariant: "wide",
    title: "ten4seven UI — Operations Tracker",
  },
  "Operational Patterns": {
    description:
      "AAPM reference adoption for mature control tower, process, planning, receiving, entity, decision, exception, forecast, and audit patterns.",
    path: "/operational-patterns",
    shellVariant: "contextual",
    title: "ten4seven UI — Operational Patterns",
  },
  "SaaS Control Plane": {
    description:
      "Generic multi-tenant SaaS control-plane composition patterns and static reference fixtures.",
    path: "/saas-control-plane",
    shellVariant: "contextual",
    title: "ten4seven UI — SaaS Control Plane",
  },
  "ERP Density Reference": {
    description:
      "ERP and data-dense reference composition for collection, entry, review, and operational dashboard contracts.",
    path: "/erp-density-reference",
    shellVariant: "wide",
    title: "ten4seven UI — ERP Density Reference",
  },
  "Farm P1 Reference": {
    description:
      "AAPM Farm customer journey reference composed from canonical Ten4Seven contracts and static fixtures.",
    path: "/farm-p1-reference",
    shellVariant: "contextual",
    title: "ten4seven UI — Farm P1 Reference",
  },
  "Publishing Store": {
    description:
      "Reference Indonesian publishing catalog composed from ten4seven UI.",
    path: "/ebook-store",
    shellVariant: "standard",
    title: "ten4seven UI — Publishing Store",
  },
  "Public Showcase": {
    description:
      "Public composition showcase for ten4seven UI blocks and recipes.",
    path: "/public-showcase",
    shellVariant: "standard",
    title: "ten4seven UI — Public Showcase",
  },
};

export const playgroundRoutePaths = Object.fromEntries(
  Object.entries(playgroundRouteContracts).map(([route, contract]) => [
    route,
    contract.path,
  ]),
) as Record<PlaygroundRoute, string>;

export const playgroundRouteTitles = Object.fromEntries(
  Object.entries(playgroundRouteContracts).map(([route, contract]) => [
    route,
    contract.title,
  ]),
) as Record<PlaygroundRoute, string>;

export const playgroundRouteDescriptions = Object.fromEntries(
  Object.entries(playgroundRouteContracts).map(([route, contract]) => [
    route,
    contract.description,
  ]),
) as Record<PlaygroundRoute, string>;

/**
 * Explicit shell geometry ownership for every playground route. Public routes
 * are listed for completeness, but their PublicShell composition remains the
 * deliberate owner of their presentation grammar.
 */
export const playgroundShellVariants = Object.fromEntries(
  Object.entries(playgroundRouteContracts).map(([route, contract]) => [
    route,
    contract.shellVariant,
  ]),
) as Record<PlaygroundRoute, PlaygroundShellVariant>;

/** Synthetic consumer proof; discoverable from the design-system navigation while retaining its consumer-shaped shell. */
export const farmSyntheticProofPath = "/farm-synthetic-proof";
export const farmSyntheticProofTitle =
  "ten4seven UI — Farm Synthetic Consumer Proof";
export const farmSyntheticProofDescription =
  "Synthetic Farm consumer composition for authorized context, Farm Overview metrics, and safe recovery states.";

/** Deterministic local reference slice for the first AAPM Farm customer journey. */
export const farmP1ReferencePath = playgroundRoutePaths["Farm P1 Reference"];
export const farmP1ReferenceRoutePaths = {
  overview: `${farmP1ReferencePath}/overview`,
  "daily-operations": `${farmP1ReferencePath}/daily-operations`,
  context: `${farmP1ReferencePath}/context`,
  flocks: `${farmP1ReferencePath}/flocks`,
  inventory: `${farmP1ReferencePath}/inventory`,
} as const;
export type FarmP1ReferenceView = keyof typeof farmP1ReferenceRoutePaths;
const legacyFarmP1ReferenceRoutePaths = {
  overview: "/farm-reference/overview",
  "daily-operations": "/farm-reference/daily-operations",
  context: "/farm-reference/context",
  flocks: "/farm-reference/flocks",
  inventory: "/farm-reference/inventory",
} as const;

export function farmP1ReferencePathForView(
  view: FarmP1ReferenceView,
  pathname: string,
) {
  return normalizePathname(pathname).startsWith("/farm-reference")
    ? legacyFarmP1ReferenceRoutePaths[view]
    : farmP1ReferenceRoutePaths[view];
}

export const farmP1ReferenceTitle = playgroundRouteTitles["Farm P1 Reference"];
export const farmP1ReferenceDescription =
  playgroundRouteDescriptions["Farm P1 Reference"];

/** Bounded brand-expression proof routes; discoverable from the design-system navigation while retaining their consumer-shaped shells. */
export const brandProofRoutePaths: Record<AuthBrandProfileId, string> = {
  "neutral-product": "/brand-proof/auth-neutral",
  "aapm-academy": "/brand-proof/auth-aapm-academy",
};

export const brandProofRouteTitles: Record<AuthBrandProfileId, string> = {
  "neutral-product": "ten4seven UI — Authentication · Neutral Product",
  "aapm-academy": "ten4seven UI — Authentication · AAPM Academy",
};

export const adoptionProofNavigation: AdoptionProofRoute[] = [
  "Farm Synthetic",
  "Auth · Neutral",
  "Auth · AAPM Academy",
];

/** Short visual labels keep the primary navigation readable without changing route identity. */
export const adoptionProofNavigationLabels: Record<AdoptionProofRoute, string> =
  {
    "Farm Synthetic": "Farm Synthetic",
    "Auth · Neutral": "Auth · Neutral",
    "Auth · AAPM Academy": "Auth · Academy",
  };

export const adoptionProofRoutePaths: Record<AdoptionProofRoute, string> = {
  "Farm Synthetic": farmSyntheticProofPath,
  "Auth · Neutral": brandProofRoutePaths["neutral-product"],
  "Auth · AAPM Academy": brandProofRoutePaths["aapm-academy"],
};

export const adoptionProofRouteTitles: Record<AdoptionProofRoute, string> = {
  "Farm Synthetic": farmSyntheticProofTitle,
  "Auth · Neutral": brandProofRouteTitles["neutral-product"],
  "Auth · AAPM Academy": brandProofRouteTitles["aapm-academy"],
};

export const adoptionProofRouteDescriptions: Record<
  AdoptionProofRoute,
  string
> = {
  "Farm Synthetic": farmSyntheticProofDescription,
  "Auth · Neutral":
    "Authentication brand-expression proof for the neutral product profile.",
  "Auth · AAPM Academy":
    "Authentication brand-expression proof for the AAPM Academy profile.",
};

export type PlaygroundRouteAlias = {
  canonicalPath: string;
  route: PlaygroundRoute;
};

/**
 * Accepted legacy paths are explicit and separate from canonical definitions.
 * They remain renderable for old bookmarks while all new navigation uses the
 * canonical paths above.
 */
export const playgroundRouteAliases: Record<string, PlaygroundRouteAlias> = {
  "/warehouse-inventory": {
    canonicalPath: playgroundRoutePaths["Operations Tracker"],
    route: "Operations Tracker",
  },
  "/erp-density": {
    canonicalPath: playgroundRoutePaths["ERP Density Reference"],
    route: "ERP Density Reference",
  },
  "/erp-reference": {
    canonicalPath: playgroundRoutePaths["ERP Density Reference"],
    route: "ERP Density Reference",
  },
  "/farm-reference": {
    canonicalPath: farmP1ReferencePath,
    route: "Farm P1 Reference",
  },
  "/farm-reference/overview": {
    canonicalPath: farmP1ReferenceRoutePaths.overview,
    route: "Farm P1 Reference",
  },
  "/farm-reference/daily-operations": {
    canonicalPath: farmP1ReferenceRoutePaths["daily-operations"],
    route: "Farm P1 Reference",
  },
  "/farm-reference/context": {
    canonicalPath: farmP1ReferenceRoutePaths.context,
    route: "Farm P1 Reference",
  },
  "/farm-reference/flocks": {
    canonicalPath: farmP1ReferenceRoutePaths.flocks,
    route: "Farm P1 Reference",
  },
  "/farm-reference/inventory": {
    canonicalPath: farmP1ReferenceRoutePaths.inventory,
    route: "Farm P1 Reference",
  },
};

export const notFoundRouteTitle = "ten4seven UI — Not Found";

function normalizePathname(pathname: string) {
  return pathname.replace(/\/+$/, "") || "/";
}

export function canonicalPathForPath(pathname: string) {
  const normalizedPath = normalizePathname(pathname);
  if (normalizedPath === "/") return playgroundRoutePaths["Theme Studio"];
  return (
    playgroundRouteAliases[normalizedPath]?.canonicalPath ?? normalizedPath
  );
}

export type RouteMatch =
  | { kind: "known"; route: PlaygroundRoute }
  | { kind: "farm-synthetic"; pathname: string }
  | { kind: "farm-reference"; pathname: string }
  | { kind: "brand-proof"; profileId: AuthBrandProfileId; pathname: string }
  | { kind: "component-family"; category: string; pathname: string }
  | { kind: "component-detail"; name: string; pathname: string }
  | { kind: "block-detail"; name: string; pathname: string }
  | { kind: "recipe-detail"; name: string; pathname: string }
  | { kind: "not-found"; pathname: string };

export function routeFromPath(pathname: string): RouteMatch {
  const normalizedPath = normalizePathname(pathname);
  if (normalizedPath === "/") {
    return { kind: "known", route: "Theme Studio" };
  }
  if (normalizedPath === farmSyntheticProofPath) {
    return { kind: "farm-synthetic", pathname: normalizedPath };
  }
  if (
    normalizedPath === farmP1ReferencePath ||
    Object.values(farmP1ReferenceRoutePaths).includes(
      normalizedPath as (typeof farmP1ReferenceRoutePaths)[keyof typeof farmP1ReferenceRoutePaths],
    )
  ) {
    return { kind: "farm-reference", pathname: normalizedPath };
  }
  const entry = Object.entries(playgroundRoutePaths).find(
    ([, path]) => path === normalizedPath,
  );

  if (entry) return { kind: "known", route: entry[0] as PlaygroundRoute };

  const legacyEntry = playgroundRouteAliases[normalizedPath];
  if (legacyEntry) {
    return legacyEntry.route === "Farm P1 Reference"
      ? { kind: "farm-reference", pathname: normalizedPath }
      : { kind: "known", route: legacyEntry.route };
  }

  const brandProofEntry = Object.entries(brandProofRoutePaths).find(
    ([, path]) => path === normalizedPath,
  );
  if (brandProofEntry) {
    return {
      kind: "brand-proof",
      profileId: brandProofEntry[0] as AuthBrandProfileId,
      pathname: normalizedPath,
    };
  }

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

function catalogDisplayName(name: string, fallback: string) {
  return name || fallback;
}

export function routeTitleForMatch(match: RouteMatch) {
  switch (match.kind) {
    case "known":
      return playgroundRouteTitles[match.route];
    case "farm-synthetic":
      return farmSyntheticProofTitle;
    case "farm-reference":
      return playgroundRouteTitles["Farm P1 Reference"];
    case "brand-proof":
      return brandProofRouteTitles[match.profileId];
    case "component-family":
      return `ten4seven UI — ${categoryLabels[match.category] ?? match.category}`;
    case "component-detail":
      return `ten4seven UI — ${catalogDisplayName(
        componentCatalog[match.name].displayName ?? "",
        match.name,
      )}`;
    case "block-detail":
      return `ten4seven UI — ${catalogDisplayName(
        blockCatalog[match.name].displayName,
        match.name,
      )}`;
    case "recipe-detail":
      return `ten4seven UI — ${catalogDisplayName(
        recipeCatalog[match.name].displayName ?? "",
        match.name,
      )}`;
    case "not-found":
      return notFoundRouteTitle;
  }
}

export function routeDescriptionForMatch(match: RouteMatch) {
  switch (match.kind) {
    case "known":
      return playgroundRouteDescriptions[match.route];
    case "farm-synthetic":
      return farmSyntheticProofDescription;
    case "farm-reference":
      return playgroundRouteDescriptions["Farm P1 Reference"];
    case "brand-proof":
      return match.profileId === "aapm-academy"
        ? "Sign in to AAPM Academy."
        : "Sign in to your workspace.";
    case "component-family":
      return `Canonical ${categoryLabels[match.category] ?? match.category} components in the ten4seven UI catalog.`;
    case "component-detail":
      return componentCatalog[match.name].purpose;
    case "block-detail":
      return blockCatalog[match.name].purpose;
    case "recipe-detail":
      return recipeCatalog[match.name].purpose;
    case "not-found":
      return "The requested ten4seven UI playground route does not exist.";
  }
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
export const referenceNavigation: PlaygroundRoute[] = ["Publishing Store"];
export const labProofNavigation: PlaygroundRoute[] = [
  "Operations Tracker",
  "Operational Patterns",
  "SaaS Control Plane",
  "ERP Density Reference",
  "Farm P1 Reference",
  "Public Showcase",
];

/**
 * The playground route registry is the shell's single navigation/maturity
 * source. Grouping communicates intended authority without changing any URL
 * or turning maturity into entitlement or permission logic.
 */
export const playgroundNavigationGroups: PlaygroundNavigationGroup[] = [
  {
    id: "studio",
    label: "Studio",
    maturity: "PRIMARY",
    routes: studioNavigation,
  },
  {
    id: "library",
    label: "Library",
    maturity: "PRIMARY",
    routes: libraryNavigation,
  },
  {
    id: "reference",
    label: "Reference",
    maturity: "QUALITY_REFERENCE",
    routes: referenceNavigation,
  },
  {
    adoptionProofRoutes: adoptionProofNavigation,
    id: "labs-proofs",
    label: "Labs / Proofs",
    maturity: "LAB_PROOF",
    routes: labProofNavigation,
  },
];
