import { expect, test } from "@playwright/test";

test.describe("U04 foundation, layout, and action contracts", () => {
  test("icon-only actions keep the glyph smaller than the interaction target", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/components/icon-button");

    const preview = page.locator(".catalog-contract-preview");
    const buttons = preview.locator(".t7-icon-button");
    await expect(buttons).toHaveCount(3);

    const geometry = await buttons.evaluateAll((nodes) =>
      nodes.map((node) => {
        const button = node.getBoundingClientRect();
        const glyph = node.querySelector("svg")?.getBoundingClientRect();
        return {
          buttonHeight: button.height,
          buttonWidth: button.width,
          glyphHeight: glyph?.height ?? 0,
          glyphWidth: glyph?.width ?? 0,
        };
      }),
    );

    for (const item of geometry) {
      expect(item.buttonWidth).toBeGreaterThanOrEqual(44);
      expect(item.buttonHeight).toBeGreaterThanOrEqual(44);
      expect(item.glyphWidth).toBeGreaterThan(0);
      expect(item.glyphWidth).toBeLessThan(30);
      expect(item.glyphHeight).toBeLessThan(30);
    }

    const bounds = await preview.evaluate((node) => {
      const rect = node.getBoundingClientRect();
      return { left: rect.left, right: rect.right };
    });
    expect(bounds.left).toBeGreaterThanOrEqual(-1);
    expect(bounds.right).toBeLessThanOrEqual(391);
  });

  test("toggle selection and split actions retain their semantic boundaries", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/components/toggle-button-group");

    const togglePreview = page.locator(".catalog-contract-preview");
    const toggleGroup = togglePreview.getByRole("group", { name: "View mode" });
    const grid = toggleGroup.getByRole("button", { name: "Grid" });
    const list = toggleGroup.getByRole("button", { name: "List" });
    await expect(grid).toHaveAttribute("aria-pressed", "true");
    await expect(list).toHaveAttribute("aria-pressed", "false");
    await expect(grid).toHaveJSProperty("disabled", false);
    await list.click();
    await expect(grid).toHaveAttribute("aria-pressed", "false");
    await expect(list).toHaveAttribute("aria-pressed", "true");

    const toggleGeometry = await toggleGroup
      .getByRole("button")
      .evaluateAll((nodes) =>
        nodes.map((node) => node.getBoundingClientRect().height),
      );
    expect(toggleGeometry.every((height) => height >= 44)).toBe(true);

    await page.goto("/components/split-button");
    const splitPreview = page.locator(".catalog-contract-preview");
    const primary = splitPreview.getByRole("button", { name: "Save report" });
    const alternatives = splitPreview.getByRole("button", {
      name: "More actions",
    });
    await expect(primary).toBeVisible();
    await expect(alternatives).toBeVisible();
    await expect(primary).toHaveJSProperty("disabled", false);

    const splitGeometry = await Promise.all([
      primary.boundingBox(),
      alternatives.boundingBox(),
    ]);
    for (const box of splitGeometry) {
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }

    await alternatives.click();
    await expect(
      page.getByRole("menuitem", { name: "Export CSV" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("menuitem", { name: "Export CSV" }),
    ).toHaveCount(0);
  });
});
