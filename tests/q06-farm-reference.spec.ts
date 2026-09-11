import { expect, test, type Page } from "@playwright/test";
import axe from "axe-core";

const q06Viewports = [
  { height: 900, id: "desktop", width: 1440 },
  { height: 900, id: "tablet", width: 840 },
  { height: 844, id: "mobile", width: 390 },
] as const;

async function pageOverflow(page: Page) {
  return page.evaluate(() => ({
    body: document.body.scrollWidth,
    document: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
}

async function openFarmReference(
  page: Page,
  path = "/farm-reference/overview",
) {
  await page.goto(path);
  await expect(page.getByTestId("farm-p1-reference")).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 1, name: "Farm overview" }),
  ).toBeVisible();
}

test.describe("Q06 Farm P1 reference slice", () => {
  test("makes the first-value journey and capability states concrete", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await openFarmReference(page);

    await expect(page).toHaveTitle(/Farm P1 Reference/);
    const navigation = page.getByRole("navigation", {
      name: "Farm starter navigation",
    });
    await expect(navigation).toBeVisible();
    await expect(navigation.getByRole("button")).toHaveCount(5);
    await expect(page.getByTestId("farm-p1-overview")).toBeVisible();
    for (const value of ["42,860", "88.7%", "112 g / bird", "0.8%"]) {
      await expect(page.getByText(value, { exact: true })).toBeVisible();
    }

    await navigation
      .getByRole("button", { name: "Daily operations", exact: true })
      .click();
    await expect(page).toHaveURL(/\/farm-reference\/daily-operations$/);
    await expect(page.getByTestId("farm-p1-daily-operations")).toBeVisible();
    await page.getByRole("button", { name: "Save fixture entry" }).click();
    await expect(
      page.getByText("Fixture entry ready", { exact: true }),
    ).toBeVisible();

    await navigation
      .getByRole("button", { name: "Farm context", exact: true })
      .click();
    await expect(page).toHaveURL(/\/farm-reference\/context$/);
    await expect(page.getByTestId("farm-p1-context-picker")).toBeVisible();

    await navigation
      .getByRole("button", { name: "Flocks & cycles", exact: true })
      .click();
    await expect(
      page.getByRole("table", { name: "Farm flock and cycle records" }),
    ).toBeVisible();
    await page.getByRole("row").nth(1).click();
    await expect(page.getByRole("dialog", { name: "Flock 01" })).toBeVisible();
    await page.getByRole("button", { name: "Close detail drawer" }).click();
    await expect(
      page.getByRole("dialog", { name: "Flock 01" }),
    ).not.toBeVisible();

    await navigation
      .getByRole("button", { name: "Inventory capability", exact: true })
      .click();
    const stateSelect = page.getByRole("button", { name: "Fixture state" });
    await stateSelect.click();
    await page
      .getByRole("option", { name: "Setup required", exact: true })
      .click();
    await expect(
      page.getByText("Inventory needs a one-time setup", { exact: true }),
    ).toBeVisible();
    await stateSelect.click();
    await page.getByRole("option", { name: "Suspended", exact: true }).click();
    await expect(
      page.getByText("Inventory is temporarily suspended", { exact: true }),
    ).toBeVisible();
    await stateSelect.click();
    await page.getByRole("option", { name: "Active", exact: true }).click();
    await expect(
      page.getByText("Connected stock view", { exact: true }),
    ).toBeVisible();

    const overflow = await pageOverflow(page);
    expect(overflow.document).toBeLessThanOrEqual(overflow.viewport + 1);
    expect(overflow.body).toBeLessThanOrEqual(overflow.viewport + 1);

    await page.addScriptTag({ content: axe.source });
    const violations = await page
      .getByTestId("farm-p1-reference")
      .evaluate(async (node) => {
        // @ts-expect-error axe-core is injected for this isolated audit.
        const result = await window.axe.run(node, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
        });
        return result.violations
          .filter((violation: { impact: string | null }) =>
            ["critical", "serious"].includes(violation.impact ?? ""),
          )
          .map((violation: { id: string }) => violation.id);
      });
    expect(violations).toEqual([]);
  });

  test("keeps the reference shell bounded and navigable across viewport bands", async ({
    page,
  }) => {
    for (const viewport of q06Viewports) {
      await page.setViewportSize(viewport);
      await openFarmReference(page);

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
          name: "Farm starter navigation",
        });
        await expect(dialog).toBeVisible();
        await dialog
          .getByRole("button", { name: "Daily operations", exact: true })
          .click();
        await expect(page).toHaveURL(/\/farm-reference\/daily-operations$/);
        await expect(dialog).not.toBeVisible();
      }
    }
  });
});
