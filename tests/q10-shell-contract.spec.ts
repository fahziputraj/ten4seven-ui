import { expect, test } from "@playwright/test";

const shellRoutes = [
  { path: "/component-lab", variant: "standard" },
  { path: "/tokens", variant: "standard" },
  { path: "/theme-studio", variant: "workbench" },
] as const;

const shellViewports = [
  { height: 900, id: "desktop", width: 1440 },
  { height: 900, id: "intermediate", width: 1024 },
  { height: 844, id: "mobile", width: 390 },
] as const;

async function measuredShell(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const shell = document.querySelector<HTMLElement>(".studio-shell");
    const sidebar = document.querySelector<HTMLElement>(".studio-sidebar");
    const topbar = document.querySelector<HTMLElement>(".studio-topbar");
    const content = document.querySelector<HTMLElement>(".studio-content");
    const heading = document.querySelector<HTMLElement>("h1");
    if (!shell || !sidebar || !topbar || !content || !heading) {
      throw new Error("The Studio shell contract landmarks are incomplete.");
    }

    const styles = getComputedStyle(shell);
    const contentStyles = getComputedStyle(content);
    const rect = (element: HTMLElement) => {
      const box = element.getBoundingClientRect();
      return { height: box.height, width: box.width, x: box.x, y: box.y };
    };

    return {
      content: rect(content),
      contentPaddingLeft: parseFloat(contentStyles.paddingLeft),
      contentPaddingRight: parseFloat(contentStyles.paddingRight),
      documentWidth: document.documentElement.scrollWidth,
      heading: rect(heading),
      sidebar: rect(sidebar),
      sidebarToken: parseFloat(styles.getPropertyValue("--t7-sidebar-width")),
      shell: rect(shell),
      topbar: rect(topbar),
      topbarToken: parseFloat(styles.getPropertyValue("--t7-header-height")),
      variant: shell.dataset.shellVariant,
      viewport: window.innerWidth,
    };
  });
}

test.describe("Q10 shell contract and geometry authority", () => {
  for (const route of shellRoutes) {
    for (const viewport of shellViewports) {
      test(`${route.path} keeps ${route.variant} geometry at ${viewport.id}`, async ({
        page,
      }) => {
        await page.setViewportSize(viewport);
        await page.goto(route.path);

        const shell = page.locator(".studio-shell");
        await expect(shell).toHaveAttribute(
          "data-shell-contract",
          "reference-shell",
        );
        await expect(shell).toHaveAttribute(
          "data-shell-variant",
          route.variant,
        );

        const measured = await measuredShell(page);
        expect(measured.documentWidth, viewport.id).toBeLessThanOrEqual(
          measured.viewport + 1,
        );

        if (viewport.width >= 821) {
          expect(measured.sidebar.width).toBeCloseTo(measured.sidebarToken, 0);
          expect(measured.topbar.height).toBeCloseTo(measured.topbarToken, 0);
          expect(measured.contentPaddingLeft).toBeGreaterThan(0);
          expect(measured.contentPaddingRight).toBeGreaterThan(0);
          expect(measured.heading.x).toBeCloseTo(
            measured.content.x + measured.contentPaddingLeft,
            0,
          );
        } else {
          await expect(page.locator(".studio-sidebar")).toBeHidden();
          await expect(page.locator(".studio-mobile-menu")).toBeVisible();
          expect(measured.documentWidth).toBe(viewport.width);
        }
      });
    }
  }

  test("reference shells expose their explicit variant contract", async ({
    page,
  }) => {
    const referenceRoutes = [
      { path: "/operations-tracker", variant: "wide" },
      { path: "/operational-patterns", variant: "contextual" },
      { path: "/erp-reference", variant: "wide" },
      { path: "/farm-reference", variant: "contextual" },
    ] as const;

    await page.setViewportSize({ height: 900, width: 1440 });
    for (const route of referenceRoutes) {
      await page.goto(route.path);
      const shell = page.locator(".t7-app-shell");
      await expect(shell).toHaveAttribute(
        "data-shell-contract",
        "reference-shell",
      );
      await expect(shell).toHaveAttribute("data-shell-variant", route.variant);
      await expect(shell.locator(".t7-app-sidebar")).toBeVisible();
      await expect(shell.locator(".t7-app-topbar")).toBeVisible();
    }
  });
});
