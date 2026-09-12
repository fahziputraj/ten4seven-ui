import { expect, test } from "@playwright/test";

import {
  adoptionProofRoutePaths,
  canonicalPathForPath,
  farmP1ReferencePath,
  farmP1ReferenceRoutePaths,
  playgroundNavigationGroups,
  playgroundRouteAliases,
  playgroundRoutePaths,
  routeFromPath,
  routeTitleForMatch,
} from "../apps/playground/src/playground-routes";
import {
  blockNameBySlug,
  blockPath,
  componentNameBySlug,
  componentPath as catalogComponentPath,
  familyBySlug,
  recipeCatalog,
  recipePath,
} from "../apps/playground/src/catalog-model";

const invalidPath = "/this-route-must-not-exist";

const topLevelPaths = Object.values(playgroundRoutePaths);
const proofPaths = Object.values(adoptionProofRoutePaths);
const farmPaths = [
  farmP1ReferencePath,
  ...Object.values(farmP1ReferenceRoutePaths),
];
const componentFamilyPaths = Object.keys(familyBySlug).map(
  (slug) => `/components/${slug}`,
);
const componentDetailPaths = Object.keys(componentNameBySlug).map(
  (slug) => `/components/${slug}`,
);
const blockDetailPaths = Object.keys(blockNameBySlug).map(
  (slug) => `/blocks/${slug}`,
);
const recipeDetailPaths = Object.keys(recipeCatalog).map((name) =>
  recipePath(name),
);

const canonicalInventory = [
  ...topLevelPaths,
  ...proofPaths,
  ...farmPaths,
  ...componentFamilyPaths,
  ...componentDetailPaths,
  ...blockDetailPaths,
  ...recipeDetailPaths,
];

test("the route registry closes every advertised and catalog-derived route", () => {
  for (const path of canonicalInventory) {
    const match = routeFromPath(path);
    expect(match.kind, path).not.toBe("not-found");
    expect(routeTitleForMatch(match), path).toMatch(/^ten4seven UI — .+/);
  }

  for (const path of topLevelPaths) {
    expect(routeFromPath(path).kind, path).not.toBe("not-found");
  }

  for (const group of playgroundNavigationGroups) {
    for (const route of group.routes) {
      const path = playgroundRoutePaths[route];
      expect(routeFromPath(path).kind, `${group.label}: ${route}`).not.toBe(
        "not-found",
      );
    }
    for (const route of group.adoptionProofRoutes ?? []) {
      const path = adoptionProofRoutePaths[route];
      expect(routeFromPath(path).kind, `${group.label}: ${route}`).not.toBe(
        "not-found",
      );
    }
  }

  expect(canonicalInventory.length).toBe(306);
});

test("catalog detail titles are derived from the catalog identity", () => {
  const componentName = componentNameBySlug.button;
  const componentMatch = routeFromPath(catalogComponentPath(componentName));
  expect(componentMatch.kind).toBe("component-detail");
  expect(routeTitleForMatch(componentMatch)).toBe("ten4seven UI — Button");

  const blockName = blockNameBySlug["kpi-dashboard"];
  const blockMatch = routeFromPath(blockPath(blockName));
  expect(blockMatch.kind).toBe("block-detail");
  expect(routeTitleForMatch(blockMatch)).toBe("ten4seven UI — KPI Dashboard");

  const recipeMatch = routeFromPath(recipePath("Entity List"));
  expect(recipeMatch.kind).toBe("recipe-detail");
  expect(routeTitleForMatch(recipeMatch)).toBe("ten4seven UI — Entity List");
});

test("legacy aliases resolve to their canonical route identity", () => {
  expect(routeFromPath("/")).toEqual({
    kind: "known",
    route: "Theme Studio",
  });

  for (const [alias, contract] of Object.entries(playgroundRouteAliases)) {
    const match = routeFromPath(alias);
    expect(match.kind, alias).not.toBe("not-found");
    expect(
      match.kind === "known"
        ? match.route
        : match.kind === "farm-reference"
          ? "Farm P1 Reference"
          : undefined,
      alias,
    ).toBe(contract.route);
    expect(canonicalPathForPath(alias), alias).toBe(contract.canonicalPath);
  }
});

test("unknown paths remain an explicit not-found route", async ({ page }) => {
  const match = routeFromPath(invalidPath);
  expect(match.kind).toBe("not-found");
  expect(routeTitleForMatch(match)).toBe("ten4seven UI — Not Found");

  const response = await page.goto(invalidPath);
  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveTitle("ten4seven UI — Not Found");
  await expect(
    page.getByText("This playground route does not exist.", { exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(page).toHaveTitle("ten4seven UI — Not Found");
  await expect(
    page.getByText("This playground route does not exist.", { exact: true }),
  ).toBeVisible();
});

test("representative routes are direct-entry and refresh-safe", async ({
  page,
}) => {
  test.setTimeout(120_000);
  const representativePaths = [
    "/",
    "/theme-studio",
    "/component-lab",
    "/tokens",
    "/components",
    "/components/forms",
    "/components/button",
    "/blocks",
    "/blocks/kpi-dashboard",
    "/icons",
    "/recipes",
    "/recipes/entity-list",
    "/operations-tracker",
    "/operational-patterns",
    "/saas-control-plane",
    "/erp-density-reference",
    "/farm-p1-reference",
    "/ebook-store",
    "/public-showcase",
    "/farm-synthetic-proof",
    "/brand-proof/auth-neutral",
    "/brand-proof/auth-aapm-academy",
    "/warehouse-inventory",
    "/farm-reference",
  ];

  for (const path of representativePaths) {
    const expectedPath = path === "/" ? "/theme-studio" : path;
    const match = routeFromPath(path);
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page).toHaveURL(
      new RegExp(`${expectedPath.replaceAll("/", "\\/")}$`),
    );
    await expect(page).toHaveTitle(routeTitleForMatch(match));
    await expect(
      page.getByText("This playground route does not exist.", { exact: true }),
    ).toHaveCount(0);

    await page.reload();
    await expect(page).toHaveURL(
      new RegExp(`${expectedPath.replaceAll("/", "\\/")}$`),
    );
    await expect(page).toHaveTitle(routeTitleForMatch(match));
    await expect(
      page.getByText("This playground route does not exist.", { exact: true }),
    ).toHaveCount(0);
  }
});

test("the complete generated route inventory renders directly", async ({
  page,
}) => {
  test.setTimeout(300_000);
  for (const path of canonicalInventory) {
    const match = routeFromPath(path);
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page).toHaveTitle(routeTitleForMatch(match));
    await expect(
      page.getByText("This playground route does not exist.", { exact: true }),
    ).toHaveCount(0);
  }

  console.log(
    `H01 route inventory: top-level=${topLevelPaths.length} proofs=${proofPaths.length} farm=${farmPaths.length} component-families=${componentFamilyPaths.length} component-details=${componentDetailPaths.length} block-details=${blockDetailPaths.length} recipe-details=${recipeDetailPaths.length} aliases=${Object.keys(playgroundRouteAliases).length} failures=0`,
  );
});

test("QA controls expose playground build identity without product-shell noise", async ({
  page,
}) => {
  await page.goto("/theme-studio?mode=qa");
  await page
    .getByRole("button", {
      name: "Open ten4seven reference QA controls",
    })
    .click();

  const identity = page.getByTestId("build-identity");
  await expect(identity).toBeVisible();
  await expect(
    identity.locator('[data-build-identity-field="version"] dd'),
  ).not.toHaveText("");
  await expect(
    identity.locator('[data-build-identity-field="commit"] dd'),
  ).not.toHaveText("");
  await expect(
    identity.locator('[data-build-identity-field="branch"] dd'),
  ).not.toHaveText("");

  await page.getByRole("button", { name: "Close dialog" }).click();
  await expect(page.getByTestId("build-identity")).toBeHidden();
});
