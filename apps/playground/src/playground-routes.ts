import {
  blockNameBySlug,
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
  | "standard"
  | "workbench"
  | "wide"
  | "contextual";

export type PlaygroundNavigationGroup = {
  adoptionProofRoutes?: AdoptionProofRoute[];
  id: "studio" | "library" | "reference" | "labs-proofs";
  label: "Studio" | "Library" | "Reference" | "Labs / Proofs";
  maturity: SurfaceMaturity;
  routes: PlaygroundRoute[];
};

export const playgroundRoutePaths: Record<PlaygroundRoute, string> = {
  "Theme Studio": "/theme-studio",
  "Component Lab": "/component-lab",
  Tokens: "/tokens",
  Components: "/components",
  Blocks: "/blocks",
  Icons: "/icons",
  Recipes: "/recipes",
  "Operations Tracker": "/operations-tracker",
  "Operational Patterns": "/operational-patterns",
  "SaaS Control Plane": "/saas-control-plane",
  "ERP Density Reference": "/erp-reference",
  "Farm P1 Reference": "/farm-reference",
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
  "Operations Tracker": "ten4seven UI — Operations Tracker",
  "Operational Patterns": "ten4seven UI — Operational Patterns",
  "SaaS Control Plane": "ten4seven UI — SaaS Control Plane Patterns",
  "ERP Density Reference": "ten4seven UI — ERP Density Reference",
  "Farm P1 Reference": "ten4seven UI — Farm P1 Reference",
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
  Icons: "The curated Solar Bold Duotone icon family with theme-aware paint.",
  Recipes:
    "Composable ten4seven UI screen recipes for agents and product teams.",
  "Operations Tracker":
    "Reference operations tracker for customer, supply, delivery, finance, and fleet work composed from ten4seven UI.",
  "Operational Patterns":
    "AAPM reference adoption for mature control tower, process, planning, receiving, entity, decision, exception, forecast, and audit patterns.",
  "SaaS Control Plane":
    "Generic multi-tenant SaaS control-plane composition patterns and static reference fixtures.",
  "ERP Density Reference":
    "ERP and data-dense reference composition for collection, entry, review, and operational dashboard contracts.",
  "Farm P1 Reference":
    "AAPM Farm customer journey reference composed from canonical Ten4Seven contracts and static fixtures.",
  "Publishing Store":
    "Reference Indonesian publishing catalog composed from ten4seven UI.",
  "Public Showcase":
    "Public composition showcase for ten4seven UI blocks and recipes.",
};

/**
 * Explicit shell geometry ownership for every playground route. Public routes
 * are listed for completeness, but their PublicShell composition remains the
 * deliberate owner of their presentation grammar.
 */
export const playgroundShellVariants: Record<
  PlaygroundRoute,
  PlaygroundShellVariant
> = {
  "Theme Studio": "workbench",
  "Component Lab": "standard",
  Tokens: "standard",
  Components: "standard",
  Blocks: "standard",
  Icons: "standard",
  Recipes: "standard",
  "Operations Tracker": "wide",
  "Operational Patterns": "contextual",
  "SaaS Control Plane": "contextual",
  "ERP Density Reference": "wide",
  "Farm P1 Reference": "contextual",
  "Publishing Store": "standard",
  "Public Showcase": "standard",
};

/** Synthetic consumer proof; discoverable from the design-system navigation while retaining its consumer-shaped shell. */
export const farmSyntheticProofPath = "/farm-synthetic-proof";
export const farmSyntheticProofTitle =
  "ten4seven UI — Farm Synthetic Consumer Proof";
export const farmSyntheticProofDescription =
  "Synthetic Farm consumer composition for authorized context, Farm Overview metrics, and safe recovery states.";

/** Deterministic local reference slice for the first AAPM Farm customer journey. */
export const farmP1ReferencePath = "/farm-reference";
export const farmP1ReferenceRoutePaths = {
  overview: "/farm-reference/overview",
  "daily-operations": "/farm-reference/daily-operations",
  context: "/farm-reference/context",
  flocks: "/farm-reference/flocks",
  inventory: "/farm-reference/inventory",
} as const;
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

const legacyPlaygroundRoutePaths: Record<string, PlaygroundRoute> = {
  "/warehouse-inventory": "Operations Tracker",
};

export function routeFromPath(pathname: string): RouteMatch {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
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

  const legacyEntry = legacyPlaygroundRoutePaths[normalizedPath];
  if (legacyEntry) return { kind: "known", route: legacyEntry };

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
