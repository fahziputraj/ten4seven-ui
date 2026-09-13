import { expect, test, type Page } from "@playwright/test";
import axe from "axe-core";

async function seriousA11y(page: Page, root: string) {
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

test.describe("U07 data collections and table contracts", () => {
  test("List exposes adaptive collection semantics and explicit selection", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/components/list");

    const preview = page.locator(".catalog-contract-preview");
    const list = preview.getByRole("listbox", { name: "Operational records" });
    await expect(list).toBeVisible();
    await expect(list.getByRole("option")).toHaveCount(3);
    await expect(
      list.getByRole("option", { name: /Inbound shipment/ }),
    ).toHaveAttribute("aria-selected", "true");

    const stockCount = list.getByRole("option", { name: /Stock count/ });
    await stockCount.click();
    await expect(stockCount).toHaveAttribute("aria-selected", "true");
    await expect(
      list.getByRole("option", { name: /Inbound shipment/ }),
    ).toHaveAttribute("aria-selected", "true");

    await stockCount.press("ArrowDown");
    const threshold = list.getByRole("option", { name: /Reorder threshold/ });
    await expect(threshold).toBeFocused();
    await threshold.press(" ");
    await expect(threshold).toHaveAttribute("aria-selected", "true");
    expect(await seriousA11y(page, ".catalog-contract-preview")).toEqual([]);

    const geometry = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth + 1);
  });

  test("Tree remains a tree contract with keyboard expansion", async ({
    page,
  }) => {
    await page.goto("/components/tree-view");
    const preview = page.locator(".catalog-contract-preview");
    const tree = preview.getByRole("tree", { name: "Workspace tree" });
    const operations = tree.getByRole("treeitem").first();
    await expect(operations).toContainText("Operations");
    await expect(operations).toHaveAttribute("aria-expanded", "true");
    await operations.focus();
    await operations.press("ArrowLeft");
    await expect(operations).toHaveAttribute("aria-expanded", "false");
    await expect(tree.getByRole("treeitem", { name: "Inventory" })).toHaveCount(
      0,
    );
    await operations.press("ArrowRight");
    await expect(operations).toHaveAttribute("aria-expanded", "true");
    await expect(
      tree.getByRole("treeitem", { name: "Inventory" }),
    ).toBeVisible();
    expect(await seriousA11y(page, ".catalog-contract-preview")).toEqual([]);
  });

  test("DataTable keeps semantic table markup separate from grid semantics", async ({
    page,
  }) => {
    await page.goto("/components/data-table");
    const preview = page.locator(".catalog-contract-preview");
    await expect(
      preview.getByRole("table", { name: "Inventory records" }),
    ).toBeVisible();
    await expect(preview.getByRole("grid")).toHaveCount(0);

    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/components/data-table");
    await expect(preview.locator(".t7-table-stacked")).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(391);
    expect(await seriousA11y(page, ".catalog-contract-preview")).toEqual([]);
  });
});
