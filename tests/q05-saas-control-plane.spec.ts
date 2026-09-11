import { expect, test } from "@playwright/test";

const q05Viewports = [
  { height: 900, id: "desktop", width: 1440 },
  { height: 900, id: "tablet", width: 840 },
  { height: 844, id: "mobile", width: 390 },
] as const;

async function pageOverflow(page: import("@playwright/test").Page) {
  return page.evaluate(() => ({
    body: document.body.scrollWidth,
    document: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
}

test.describe("Q05 SaaS control-plane patterns", () => {
  test("groups the reference fixtures by context, capability, access, and trace", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/saas-control-plane");

    await expect(page).toHaveTitle(/SaaS Control Plane Patterns/);
    await expect(
      page.getByRole("heading", { name: "SaaS control-plane patterns" }),
    ).toBeVisible();

    const navigation = page.getByRole("navigation", {
      name: "SaaS control-plane reference navigation",
    });
    await expect(navigation).toBeVisible();
    await expect(
      navigation.getByRole("button", {
        name: "Context switching",
        exact: true,
      }),
    ).toHaveAttribute("data-active", "true");
    await expect(page.getByTestId("q05-tenant-selector")).toBeVisible();
    await expect(page.getByTestId("q05-resource-selector")).toBeVisible();

    await navigation
      .getByRole("button", { name: "Module catalog", exact: true })
      .click();
    await expect(page.getByTestId("q05-module-catalog")).toBeVisible();
    await expect(page.getByTestId("q05-setup-checklist")).toBeVisible();
    await expect(page.getByText("Inventory sync needs setup")).toBeVisible();
    await page.getByRole("button", { name: "Active", exact: true }).click();
    await expect(
      page.getByText("Active for Northstar Operations."),
    ).toBeVisible();

    await navigation
      .getByRole("button", { name: "Activation progress", exact: true })
      .click();
    await expect(page.getByTestId("q05-activation-progress")).toBeVisible();
    await expect(page.getByTestId("q05-suspended-module")).toBeVisible();
    await expect(
      page.getByText("Delivery workspace is suspended"),
    ).toBeVisible();

    await navigation
      .getByRole("button", { name: "Access and scope", exact: true })
      .click();
    await expect(page.getByTestId("q05-permission-denied")).toBeVisible();
    await expect(page.getByTestId("q05-out-of-scope")).toBeVisible();
    await expect(page.getByTestId("q05-permission-matrix")).toBeVisible();
    await expect(
      page.getByRole("table", { name: "Role and capability matrix" }),
    ).toBeVisible();

    await navigation
      .getByRole("button", { name: "Trace and review", exact: true })
      .click();
    await expect(page.getByTestId("q05-activity-audit")).toBeVisible();
    await expect(page.getByTestId("q05-import-exception-review")).toBeVisible();
    await expect(page.getByTestId("q05-mapping-reconciliation")).toBeVisible();
    await expect(
      page.getByText("2 of 18 rows need a consumer-owned review action."),
    ).toBeVisible();
    await expect(
      page.getByRole("table", { name: "Import exception review" }),
    ).toBeVisible();
    await expect(
      page.getByRole("table", { name: "Mapping and reconciliation status" }),
    ).toBeVisible();

    expect(await pageOverflow(page)).toMatchObject({
      body: 1440,
      document: 1440,
      viewport: 1440,
    });
  });

  test("keeps navigation, controls, and bounded content usable across Q04 viewport bands", async ({
    page,
  }) => {
    for (const viewport of q05Viewports) {
      await page.setViewportSize(viewport);
      await page.goto("/saas-control-plane");

      const overflow = await pageOverflow(page);
      expect(overflow.document, viewport.id).toBeLessThanOrEqual(
        overflow.viewport + 1,
      );
      expect(overflow.body, viewport.id).toBeLessThanOrEqual(
        overflow.viewport + 1,
      );

      const sidebar = page.locator(".t7-app-sidebar");
      const mobileMenu = page.locator(".t7-app-mobile-menu");
      if (viewport.width >= 861) {
        await expect(sidebar).toBeVisible();
        await expect(mobileMenu).toBeHidden();
      } else {
        await expect(sidebar).toBeHidden();
        await expect(mobileMenu).toBeVisible();
        expect((await mobileMenu.boundingBox())?.height).toBeGreaterThanOrEqual(
          44,
        );

        await mobileMenu.click();
        const dialog = page.getByRole("dialog", {
          name: "SaaS control-plane reference navigation",
        });
        await expect(dialog).toBeVisible();
        await expect(
          dialog.getByRole("button", { name: "Trace and review", exact: true }),
        ).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(dialog).not.toBeVisible();
      }
    }
  });
});
