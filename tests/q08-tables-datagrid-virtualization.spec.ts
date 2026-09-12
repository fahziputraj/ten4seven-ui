import { expect, test, type Page } from "@playwright/test";
import axe from "axe-core";

async function auditSeriousA11y(page: Page, root: string) {
  await page.addScriptTag({ content: axe.source });
  return page.locator(root).evaluate(async (node) => {
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
}

test.describe("Q08 table and data-grid contracts", () => {
  test("keeps DataTable named, responsive, and accessible", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/components/data-table");

    const preview = page.locator(".catalog-contract-preview");
    const table = preview.getByRole("table", { name: "Inventory records" });
    await expect(table).toBeVisible();
    await expect(table.locator("caption")).toHaveText("Inventory records");
    await expect(
      table.getByRole("cell", { name: "Organic oat milk" }),
    ).toBeVisible();

    expect(await auditSeriousA11y(page, ".catalog-contract-preview")).toEqual(
      [],
    );

    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/components/data-table");
    const mobilePreview = page.locator(".catalog-contract-preview");
    await expect(mobilePreview.locator(".t7-table-stacked")).toBeVisible();
    await expect(mobilePreview.locator(".t7-table")).toBeHidden();
    const geometry = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth + 1);
  });

  test("keeps column management semantic and connected to the table", async ({
    page,
  }) => {
    await page.goto("/components/data-table-column-picker");

    const preview = page.locator(".catalog-contract-preview");
    const picker = preview.getByRole("group", { name: "Table columns" });
    await expect(picker).toBeVisible();
    const status = picker.getByRole("checkbox", { name: "Status" });
    await expect(status).toBeChecked();

    const table = preview.getByRole("table", { name: "Inventory records" });
    await expect(
      table.getByRole("columnheader", { name: "Status" }),
    ).toBeVisible();
    await status.uncheck({ force: true });
    await expect(
      table.getByRole("columnheader", { name: "Status" }),
    ).toHaveCount(0);
    await expect(
      table.getByRole("cell", { name: "Organic oat milk" }),
    ).toBeVisible();
    expect(await auditSeriousA11y(page, ".catalog-contract-preview")).toEqual(
      [],
    );
  });

  test("keeps AdvancedDataGrid bounded and named without a grid engine", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/components/advanced-data-grid");

    const preview = page.locator(".catalog-contract-preview");
    const table = preview.getByRole("table", { name: "Journal line editor" });
    await expect(table).toBeVisible();
    await expect(table.locator("caption")).toHaveText("Journal line editor");
    await expect(
      table.getByRole("textbox", { name: "Account, Line 1" }),
    ).toBeVisible();
    await expect(
      table.getByRole("button", { name: "Save Line 1" }),
    ).toBeVisible();
    await expect(page.locator(".t7-advanced-data-grid")).toBeVisible();
    await page.goto("/erp-reference");
    await expect(
      page
        .getByTestId("erp-data-dense-reference")
        .locator(".t7-advanced-data-grid"),
    ).toHaveAttribute("data-density", "compact");
    await page.goto("/components/advanced-data-grid");
    expect(await auditSeriousA11y(page, ".catalog-contract-preview")).toEqual(
      [],
    );

    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/components/advanced-data-grid");
    const scrollOwner = page.locator(
      ".catalog-contract-preview .t7-advanced-data-grid-scroll",
    );
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
  });
});
