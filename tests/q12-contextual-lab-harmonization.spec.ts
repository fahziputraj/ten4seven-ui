import { expect, test, type Page } from "@playwright/test";

const contextualLabRoutes = [
  {
    active: "Work queue",
    content: ".operations-reference",
    mobileNavigation: "Application navigation",
    path: "/operations-tracker",
    shell: "wide",
  },
  {
    active: "Control tower",
    content: '[data-testid="control-tower-view"]',
    mobileNavigation: "Application navigation",
    path: "/operational-patterns",
    shell: "contextual",
  },
  {
    active: "Context switching",
    content: '[data-testid="q05-context-view"]',
    mobileNavigation: "SaaS control-plane reference navigation",
    path: "/saas-control-plane",
    shell: "contextual",
  },
  {
    active: "Collection",
    content: '[data-testid="erp-data-dense-reference"]',
    mobileNavigation: "ERP density reference navigation",
    path: "/erp-reference",
    shell: "wide",
  },
  {
    active: "Farm overview",
    content: '[data-testid="farm-p1-overview"]',
    mobileNavigation: "Farm starter navigation",
    path: "/farm-reference",
    shell: "contextual",
  },
  {
    active: "Farm North",
    content: '[data-testid="farm-synthetic-proof"]',
    mobileNavigation: "Application navigation",
    path: "/farm-synthetic-proof",
    shell: "contextual",
  },
] as const;

function desktopLocalNavigation(page: Page) {
  return page.locator(
    '.t7-app-sidebar .playground-context-navigation[data-navigation-scope="local"]',
  );
}

test.describe("Q12 contextual lab harmonization", () => {
  test("all contextual lab routes keep the shared shell and local navigation contract", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });

    for (const route of contextualLabRoutes) {
      await page.goto(route.path);
      await expect(page.locator(".t7-app-shell")).toHaveAttribute(
        "data-shell-contract",
        "reference-shell",
      );
      await expect(page.locator(".t7-app-shell")).toHaveAttribute(
        "data-shell-variant",
        route.shell,
      );
      await expect(page.locator(".t7-app-topbar")).toBeVisible();
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator(route.content)).toBeVisible();

      const localNavigation = desktopLocalNavigation(page);
      await expect(localNavigation).toBeVisible();
      await expect(
        localNavigation.locator('[data-navigation-scope="local"]'),
      ).toHaveCount(1);
      await expect(
        localNavigation.locator('[data-navigation-item="local"]'),
      ).not.toHaveCount(0);
      const activeItem = localNavigation.locator(
        '[data-navigation-item="local"][aria-current="page"]',
      );
      await expect(activeItem).toHaveCount(1);
      await expect(activeItem).toHaveAccessibleName(route.active);

      const geometry = await page.evaluate(() => {
        const globalItem = document.querySelector(
          ".t7-app-sidebar .studio-nav-groups .t7-nav-item",
        );
        const localItem = document.querySelector(
          '.t7-app-sidebar [data-navigation-item="local"]',
        );
        const root = document.documentElement;
        return {
          globalHeight: globalItem?.getBoundingClientRect().height ?? 0,
          localHeight: localItem?.getBoundingClientRect().height ?? 0,
          overflow: root.scrollWidth - root.clientWidth,
        };
      });
      expect(geometry.globalHeight).toBeGreaterThan(0);
      expect(geometry.localHeight).toBe(geometry.globalHeight);
      expect(geometry.overflow).toBeLessThanOrEqual(1);

      await page.reload();
      await expect(page.locator(".t7-app-shell")).toHaveAttribute(
        "data-shell-variant",
        route.shell,
      );
      await expect(
        desktopLocalNavigation(page).locator(
          '[data-navigation-item="local"][aria-current="page"]',
        ),
      ).toHaveAccessibleName(route.active);
    }
  });

  test("local navigation uses the canonical mobile Drawer without a second shell", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });

    for (const route of contextualLabRoutes) {
      await page.goto(route.path);
      await expect(page.locator(".t7-app-sidebar")).not.toBeVisible();
      await expect(page.locator(".t7-app-mobile-menu")).toBeVisible();

      const trigger = page.locator(".t7-app-mobile-menu");
      await trigger.click();
      const drawer = page.getByRole("dialog", {
        name: route.mobileNavigation,
      });
      await expect(drawer).toBeVisible();
      const localNavigation = drawer.locator(
        '.playground-context-navigation[data-navigation-scope="local"]',
      );
      await expect(localNavigation).toBeVisible();
      await expect(
        localNavigation.locator('[data-navigation-item="local"]'),
      ).not.toHaveCount(0);

      const heights = await localNavigation
        .locator('[data-navigation-item="local"]')
        .evaluateAll((items) =>
          items.map((item) => item.getBoundingClientRect().height),
        );
      expect(heights.every((height) => height >= 44)).toBeTruthy();
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        ),
      ).toBeLessThanOrEqual(1);

      await page.keyboard.press("Escape");
      await expect(drawer).not.toBeVisible();
    }
  });

  test("local selections preserve route-owned interaction models", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });

    await page.goto("/operations-tracker");
    await desktopLocalNavigation(page)
      .getByRole("button", { name: "Customers", exact: true })
      .click();
    await expect(page.locator('[data-domain-view="customers"]')).toBeVisible();
    await expect(
      desktopLocalNavigation(page).locator(
        '[data-navigation-item="local"][aria-current="page"]',
      ),
    ).toHaveAccessibleName("Customers");

    await page.goto("/operational-patterns");
    await desktopLocalNavigation(page)
      .getByRole("button", { name: "Process workspace", exact: true })
      .click();
    await expect(
      page.locator('[data-testid="process-workspace-view"]'),
    ).toBeVisible();

    await page.goto("/saas-control-plane");
    await desktopLocalNavigation(page)
      .getByRole("button", { name: "Trace and review", exact: true })
      .click();
    await expect(page.locator('[data-testid="q05-trace-view"]')).toBeVisible();

    await page.goto("/farm-reference");
    await desktopLocalNavigation(page)
      .getByRole("button", { name: "Flocks & cycles", exact: true })
      .click();
    await expect(page).toHaveURL(/\/farm-reference\/flocks$/);
    await expect(page.locator('[data-testid="farm-p1-flocks"]')).toBeVisible();
  });
});
