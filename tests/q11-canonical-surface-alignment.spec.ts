import { expect, test } from "@playwright/test";

const familyRoutes = [
  { count: 6, heading: "Actions", path: "/components/actions" },
  { count: 27, heading: "Forms", path: "/components/forms" },
  {
    count: 7,
    heading: "Charts & Data Visualization",
    path: "/components/charts-data-visualization",
  },
  { count: 9, heading: "Tables", path: "/components/tables" },
  { count: 8, heading: "Overlays", path: "/components/overlays" },
];

test.describe("Q11 canonical human library", () => {
  test("Components is a concise family entry point", async ({ page }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/components");

    await expect(
      page.getByRole("heading", { name: "Components", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Component families" }),
    ).toBeVisible();
    await expect(page.locator(".component-family-chooser-link")).toHaveCount(
      17,
    );
    await expect(
      page.getByRole("heading", { name: "Common components", exact: true }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("heading", {
        name: "Choose by responsibility",
        exact: true,
      }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("heading", {
        name: "Canonical component catalog",
        exact: true,
      }),
    ).toHaveCount(0);
    await expect(page.locator("[data-component-contract]")).toHaveCount(0);

    await expect(
      page
        .getByRole("link", { name: /Actions Intent-bearing actions/ })
        .first(),
    ).toHaveAttribute("href", "/components/actions");
  });

  test("the family entry point exposes every canonical contract without aliases", async ({
    page,
  }) => {
    await page.goto("/components");

    const indexLinks = page.locator(".component-index-links a");
    await expect(indexLinks).toHaveCount(145);
    const hrefs = await indexLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute("href")),
    );
    expect(new Set(hrefs).size).toBe(145);
    expect(hrefs.every((href) => href?.startsWith("/components/"))).toBe(true);
  });

  test("family showrooms render canonical contracts and live previews together", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ height: 900, width: 1440 });

    for (const family of familyRoutes) {
      await page.goto(family.path);
      await expect(
        page.getByRole("heading", { name: family.heading, exact: true }),
      ).toBeVisible();
      await expect(page.locator("[data-component-contract]")).toHaveCount(
        family.count,
      );
      await expect(page.locator(".catalog-contract-preview")).toHaveCount(
        family.count,
      );
      await expect(
        page.getByRole("link", { name: "Open API & detail" }).first(),
      ).toBeVisible();
    }
  });

  test("component detail routes remain a secondary deep-link path", async ({
    page,
  }) => {
    await page.goto("/components/button");
    await expect(
      page.getByRole("heading", { name: "Button", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("table", { name: "Button API properties" }),
    ).toBeVisible();
    await expect(page.locator(".catalog-contract-preview")).toHaveCount(1);
    await expect(page.getByRole("link", { name: "Actions" })).toHaveAttribute(
      "href",
      "/components/actions",
    );
  });

  test("component search reaches related action contracts directly", async ({
    page,
  }) => {
    await page.goto("/components");
    await page
      .getByRole("textbox", { name: "Search canonical components" })
      .fill("button");
    await expect(
      page.getByRole("heading", { name: "Search results", exact: true }),
    ).toBeVisible();
    for (const name of [
      "Button",
      "Icon Button",
      "Button Group",
      "Toggle Button",
      "Toggle Button Group",
      "Split Button",
    ]) {
      await expect(
        page.getByRole("link", { name: new RegExp(`^${name}`) }).first(),
      ).toBeVisible();
    }
  });

  test("showrooms recompose at mobile width without overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 844, width: 390 });

    for (const path of [
      "/components",
      "/components/actions",
      "/components/forms",
    ]) {
      await page.goto(path);
      await expect(page.locator("main h1")).toBeVisible();
      const geometry = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(geometry.scrollWidth).toBeLessThanOrEqual(
        geometry.clientWidth + 1,
      );
    }
  });

  test("library roles remain distinct from the Component Lab workbench", async ({
    page,
  }) => {
    await page.goto("/component-lab");
    await expect(
      page.getByRole("heading", { name: "Component Lab", exact: true }),
    ).toBeVisible();
    await expect(page.locator(".component-showroom")).toHaveCount(0);

    await page.goto("/tokens");
    await expect(
      page.getByRole("heading", { name: "Tokens", exact: true }),
    ).toBeVisible();
    await expect(page.locator(".component-showroom")).toHaveCount(0);

    await page.goto("/theme-studio");
    await expect(
      page.getByRole("heading", { name: "Theme Studio", exact: true }),
    ).toBeVisible();
    await expect(page.locator(".component-showroom")).toHaveCount(0);
  });
});
