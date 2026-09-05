import { expect, test, type Page } from "@playwright/test";
import axe from "axe-core";

async function openHierarchyPicker(page: Page) {
  await page.goto("/components/hierarchy-picker");
  await expect(
    page.getByRole("heading", { name: "Hierarchy Picker", exact: true }),
  ).toBeVisible();
}

test.describe("HierarchyPicker reference", () => {
  test("proves nested selection, partial state, disabled nodes, search, and keyboard tree navigation", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await openHierarchyPicker(page);

    const tree = page.getByRole("tree", { name: "Resource scope" });
    await expect(tree).toBeVisible();
    const items = tree.getByRole("treeitem");
    await expect(items).toHaveCount(8);
    await expect(items.first()).toHaveAttribute("aria-level", "1");
    await expect(
      tree.getByRole("treeitem", { name: /Tenant Wisman/ }),
    ).toHaveAttribute("aria-expanded", "true");
    await expect(
      tree.getByRole("treeitem", { name: /Location Pilubang/ }),
    ).toHaveAttribute("data-selection-state", "mixed");
    await expect(
      tree.getByRole("treeitem", { name: /Farm North/ }),
    ).toHaveAttribute("data-selection-state", "mixed");
    await expect(
      tree.getByRole("treeitem", { name: /Cage A-15/ }),
    ).toHaveAttribute("aria-disabled", "true");
    await expect(page.locator(".t7-hierarchy-picker-summary")).toHaveText(
      "1 selected",
    );

    await tree
      .getByRole("treeitem", { name: /Cage A-15/ })
      .evaluate((node) => (node as HTMLElement).click());
    await expect(page.locator(".t7-hierarchy-picker-summary")).toHaveText(
      "1 selected",
    );

    const search = page.getByRole("searchbox", { name: "Search resources" });
    await search.fill("Cage B-02");
    await expect(tree.getByRole("treeitem")).toHaveCount(4);
    await expect(
      tree.getByRole("treeitem", { name: /Cage B-02/ }),
    ).toBeVisible();
    await expect(tree.getByRole("treeitem", { name: /Cage A-14/ })).toHaveCount(
      0,
    );
    await search.fill("");

    const cageB02 = tree.getByRole("treeitem", { name: /Cage B-02/ });
    await cageB02.click();
    await expect(page.locator(".t7-hierarchy-picker-summary")).toHaveText(
      "3 selected",
    );
    await tree.getByRole("treeitem", { name: /Farm North/ }).click();
    await expect(page.locator(".t7-hierarchy-picker-summary")).toHaveText(
      "7 selected",
    );

    const tenant = tree.getByRole("treeitem", { name: /Tenant Wisman/ });
    const farm = tree.getByRole("treeitem", { name: /Farm North/ });
    await tenant.focus();
    await tenant.press("ArrowRight");
    await expect(farm).toBeFocused();
    await farm.press("ArrowLeft");
    await expect(farm).toHaveAttribute("aria-expanded", "false");
    await farm.press("ArrowRight");
    await expect(farm).toHaveAttribute("aria-expanded", "true");
    await farm.press("ArrowRight");
    await expect(
      tree.getByRole("treeitem", { name: /Location Pilubang/ }),
    ).toBeFocused();

    await page.addScriptTag({ content: axe.source });
    const violations = await tree.evaluate(async (node) => {
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

    await expect(page).toHaveScreenshot("hierarchy-picker-desktop.png");
  });

  test("keeps the tree bounded and usable on a narrow Web viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await openHierarchyPicker(page);

    const picker = page.locator(".t7-hierarchy-picker");
    const bounds = await picker.evaluate((node) => {
      const rect = node.getBoundingClientRect();
      return { left: rect.left, right: rect.right };
    });
    expect(bounds.left).toBeGreaterThanOrEqual(-1);
    expect(bounds.right).toBeLessThanOrEqual(391);
    await expect(
      page.getByRole("tree", { name: "Resource scope" }),
    ).toBeVisible();
    await expect(
      page.getByRole("searchbox", { name: "Search resources" }),
    ).toBeVisible();
    await expect(page).toHaveScreenshot("hierarchy-picker-mobile.png");
  });
});
