import { expect, test, type Page } from "@playwright/test";
import axe from "axe-core";

async function openAdvancedDataGridPreview(page: Page) {
  await page.goto("/components/advanced-data-grid");
  await expect(
    page.getByRole("heading", { name: "Advanced Data Grid", exact: true }),
  ).toBeVisible();
}

test.describe("AdvancedDataGrid bounded editable slice", () => {
  test("proves typed editors, row state, validation, actions, and keyboard traversal", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await openAdvancedDataGridPreview(page);

    const preview = page.locator(".catalog-contract-preview");
    const table = preview.getByRole("table", { name: "Journal line editor" });
    await expect(table).toBeVisible();

    const accountLine1 = table.getByRole("textbox", {
      name: "Account, Line 1",
    });
    const amountLine1 = table.getByRole("spinbutton", {
      name: "Amount, Line 1",
    });
    const directionLine1 = table.getByRole("button", {
      name: "Direction, Line 1",
    });
    await expect(accountLine1).toHaveValue("4100 · Feed");
    await expect(amountLine1).toHaveValue("1250000");
    await expect(directionLine1).toHaveText("Debit");
    await expect(
      preview.getByText("Unsaved changes", { exact: true }),
    ).toBeVisible();
    await expect(
      preview.getByText("Enter an amount before saving.", { exact: true }),
    ).toBeVisible();

    await directionLine1.click();
    await page.getByRole("option", { name: "Credit", exact: true }).click();
    await expect(directionLine1).toHaveText("Credit");

    await accountLine1.focus();
    await accountLine1.press("End");
    await accountLine1.press("ArrowRight");
    await expect(amountLine1).toBeFocused();
    await accountLine1.focus();
    await accountLine1.press("ArrowDown");
    await expect(
      table.getByRole("textbox", { name: "Account, Line 2" }),
    ).toBeFocused();

    const accountLine2 = table.getByRole("textbox", {
      name: "Account, Line 2",
    });
    await accountLine2.fill("2100 · Payables (edited)");
    const line2 = table.locator("tbody tr").nth(1);
    await expect(
      line2.getByText("Unsaved changes", { exact: true }),
    ).toBeVisible();
    await accountLine2.press("Escape");
    await expect(line2.getByText("Ready", { exact: true })).toBeVisible();

    await table.getByRole("button", { name: "Save Line 1" }).click();
    await expect(
      table.locator("tr[data-row-state='saved']").getByText("Saved", {
        exact: true,
      }),
    ).toBeVisible();

    const rowSelection = table.getByRole("checkbox", {
      name: "Select Line 2",
    });
    await rowSelection.focus();
    await rowSelection.press("Space");
    await expect(rowSelection).toBeChecked();

    await page.addScriptTag({ content: axe.source });
    const violations = await preview.evaluate(async (node) => {
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

    await expect(page).toHaveScreenshot("advanced-data-grid-desktop.png");
  });

  test("keeps editing inside a bounded horizontal scroll owner on mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await openAdvancedDataGridPreview(page);

    const preview = page.locator(".catalog-contract-preview");
    const grid = preview.locator(".t7-advanced-data-grid");
    const scrollOwner = grid.locator(".t7-advanced-data-grid-scroll");
    const bounds = await preview.evaluate((node) => {
      const rect = node.getBoundingClientRect();
      return { left: rect.left, right: rect.right };
    });
    expect(bounds.left).toBeGreaterThanOrEqual(-1);
    expect(bounds.right).toBeLessThanOrEqual(391);
    await expect(
      grid.getByRole("textbox", { name: "Account, Line 1" }),
    ).toBeVisible();
    const scrollMetrics = await scrollOwner.evaluate((node) => ({
      clientWidth: node.clientWidth,
      scrollWidth: node.scrollWidth,
    }));
    expect(scrollMetrics.scrollWidth).toBeGreaterThan(
      scrollMetrics.clientWidth,
    );
    await expect(
      page.evaluate(() => document.documentElement.scrollWidth),
    ).resolves.toBeLessThanOrEqual(391);
    await expect(page).toHaveScreenshot("advanced-data-grid-mobile.png");
  });
});
