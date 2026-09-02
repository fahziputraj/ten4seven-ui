import { expect, test } from "@playwright/test";

async function rootOverflow(page: import("@playwright/test").Page) {
  return page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
}

test.describe("end-to-end hardening regressions", () => {
  test("the embedded App Shell preview preserves the catalog landmark boundary", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1186, height: 698 });
    await page.goto("/components/app-shell");

    await expect(
      page.getByRole("heading", { name: "App Shell" }),
    ).toBeVisible();
    await expect(page.locator("main")).toHaveCount(1);
  });

  test("Theme Studio changes global-control layout before the narrow control columns collide", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 480, height: 844 });
    await page.goto("/theme-studio");

    const geometry = await page
      .locator(".studio-controls-grid")
      .evaluate((grid) => {
        const children = Array.from(grid.children).map((child) => {
          const rect = child.getBoundingClientRect();
          return { left: Math.round(rect.left), width: Math.round(rect.width) };
        });
        return {
          columns: getComputedStyle(grid)
            .gridTemplateColumns.split(" ")
            .filter(Boolean).length,
          children,
        };
      });

    expect(geometry.columns).toBe(1);
    expect(new Set(geometry.children.map((child) => child.left)).size).toBe(1);
    expect(await rootOverflow(page)).toBeLessThanOrEqual(1);
  });

  test("Ebook Store changes to its compact catalog layout before its toolbar can clip", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 840, height: 900 });
    await page.goto("/ebook-store");

    await expect(page.locator(".ebook-filter-rail")).toHaveCSS(
      "display",
      "none",
    );
    const toolbar = await page
      .locator(".ebook-results-search-row")
      .evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return {
          columns: getComputedStyle(element)
            .gridTemplateColumns.split(" ")
            .filter(Boolean).length,
          right: rect.right,
          viewport: window.innerWidth,
        };
      });
    expect(toolbar.columns).toBe(1);
    expect(toolbar.right).toBeLessThanOrEqual(toolbar.viewport + 1);
    expect(await rootOverflow(page)).toBeLessThanOrEqual(1);
  });

  test("mobile public navigation retains touch-safe controls after it wraps", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const route of ["/public-showcase", "/ebook-store"]) {
      await page.goto(route);
      const geometry = await page
        .locator(
          ".t7-public-shell .t7-navigation-menu-items > ul > li > [role='menuitem']",
        )
        .evaluateAll((items) =>
          items.map((item) => ({
            height: item.getBoundingClientRect().height,
            width: item.getBoundingClientRect().width,
          })),
        );

      expect(
        geometry.length,
        route + " should expose public navigation",
      ).toBeGreaterThan(0);
      for (const item of geometry) {
        expect(item.height).toBeGreaterThanOrEqual(44);
        expect(item.width).toBeGreaterThan(0);
      }
      const actionSelector =
        route === "/public-showcase"
          ? ".t7-public-shell .t7-navigation-menu-trailing > .t7-button"
          : ".t7-public-shell .ebook-store-actions > .t7-button, .t7-public-shell .t7-cart-trigger";
      const trailingActions = await page
        .locator(actionSelector)
        .evaluateAll((items) =>
          items
            .map((item) => ({
              height: item.getBoundingClientRect().height,
              width: item.getBoundingClientRect().width,
            }))
            .filter((item) => item.height > 0 && item.width > 0),
        );
      expect(
        trailingActions.length,
        route + " should expose a public trailing action",
      ).toBeGreaterThan(0);
      for (const action of trailingActions) {
        expect(action.height).toBeGreaterThanOrEqual(40);
        expect(action.width).toBeGreaterThan(0);
      }
      expect(await rootOverflow(page)).toBeLessThanOrEqual(1);
    }
  });

  test("Theme Studio keeps its icon-only command search touch-safe on mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/theme-studio");

    const search = page.getByRole("button", {
      name: "Search ten4seven catalog",
    });
    const box = await search.boundingBox();

    expect(box).not.toBeNull();
    expect(box?.width).toBeGreaterThanOrEqual(40);
    expect(box?.height).toBeGreaterThanOrEqual(40);
    expect(await rootOverflow(page)).toBeLessThanOrEqual(1);
  });

  test("static reference cards stay visually calm while interactive cards remain explicit", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1186, height: 698 });
    await page.goto("/tokens");

    const staticCard = page.locator(".library-token-summary .t7-card").first();
    await expect(staticCard).not.toHaveAttribute("data-interactive");
    await staticCard.hover();
    await expect(staticCard).toHaveCSS("transform", "none");
  });

  test("Operations uses one product identity at mobile size without removing its navigation", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/operations-tracker");

    await expect(
      page.locator(".operations-app-shell .t7-app-topbar"),
    ).toBeHidden();
    await expect(
      page.getByRole("navigation", { name: "Application navigation" }),
    ).toBeVisible();
    expect(await rootOverflow(page)).toBeLessThanOrEqual(1);
  });

  test("native modal and drawer backdrops never exceed the narrow viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/component-lab");

    await page
      .getByRole("button", { name: "Open nested modal fixture" })
      .click();
    const modalGeometry = await page
      .locator(".t7-modal-backdrop[open]")
      .evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return { left: rect.left, right: rect.right, width: innerWidth };
      });
    expect(modalGeometry.left).toBeGreaterThanOrEqual(0);
    expect(modalGeometry.right).toBeLessThanOrEqual(modalGeometry.width);
    await page.getByRole("button", { name: "Close dialog" }).click();

    await page.getByRole("button", { name: "Open date drawer" }).click();
    const drawerGeometry = await page
      .locator(".t7-drawer-backdrop[open]")
      .evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return { left: rect.left, right: rect.right, width: innerWidth };
      });
    expect(drawerGeometry.left).toBeGreaterThanOrEqual(0);
    expect(drawerGeometry.right).toBeLessThanOrEqual(drawerGeometry.width);
  });

  test("sliders, filter removal, and carousel indicators keep compact visuals with usable hit areas", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 800 });

    await page.goto("/theme-studio");
    const themeSliderHeights = await page
      .locator(".studio-controls-card input.t7-slider")
      .evaluateAll((items) =>
        items.map((item) => item.getBoundingClientRect().height),
      );
    expect(themeSliderHeights.length).toBeGreaterThanOrEqual(3);
    for (const height of themeSliderHeights)
      expect(height).toBeGreaterThanOrEqual(32);

    await page.goto("/component-lab");
    const filterRemove = page.locator(".t7-filter-chip button").first();
    await expect(filterRemove).toBeVisible();
    expect((await filterRemove.boundingBox())?.height).toBeGreaterThanOrEqual(
      24,
    );

    await page.goto("/public-showcase");
    const carouselIndicator = page.locator(".t7-carousel-indicator").first();
    await expect(carouselIndicator).toBeVisible();
    const indicatorBox = await carouselIndicator.boundingBox();
    expect(indicatorBox?.height).toBeGreaterThanOrEqual(32);
    expect(indicatorBox?.width).toBeGreaterThanOrEqual(32);
  });
});
