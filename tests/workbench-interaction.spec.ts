import { expect, test } from "@playwright/test";

async function assertInsideViewport(
  locator: import("@playwright/test").Locator,
  page: import("@playwright/test").Page,
) {
  const rect = await locator.evaluate((element) => {
    const box = element.getBoundingClientRect();
    return {
      bottom: box.bottom,
      left: box.left,
      right: box.right,
      top: box.top,
    };
  });
  const viewport = await page.evaluate(() => ({
    height: innerHeight,
    width: innerWidth,
  }));
  expect(rect.left).toBeGreaterThanOrEqual(0);
  expect(rect.top).toBeGreaterThanOrEqual(0);
  expect(rect.right).toBeLessThanOrEqual(viewport.width);
  expect(rect.bottom).toBeLessThanOrEqual(viewport.height);
}

test.describe("workbench documentation and overlay integrity", () => {
  test("components is one shallow, anchor-addressable catalog document", async ({
    page,
  }) => {
    await page.goto("/components#component-family-commerce");
    await expect(
      page.getByRole("heading", { name: "Commerce", exact: true }),
    ).toBeVisible();
    await expect(page.locator(".studio-component-leaves")).toHaveCount(0);
    await expect(
      page.locator(".studio-sidebar .studio-component-family-list a"),
    ).toHaveCount(0);
    await expect(page.locator(".studio-sidebar")).toContainText("Blocks");
    await expect(page.locator(".studio-sidebar")).toContainText("Tokens");
    await expect(page.locator(".studio-sidebar")).toContainText("Recipes");
    await expect(page.locator(".catalog-family-anchors a")).toHaveCount(17);

    await page
      .locator(".catalog-family-anchors a")
      .filter({ hasText: "Patterns" })
      .click();
    await expect(page).toHaveURL(/\/components#component-family-pattern$/);
    await expect(
      page.getByRole("heading", { name: "Patterns", exact: true }),
    ).toBeVisible();
    expect(
      await page.locator(".studio-main").evaluate((element) => {
        const style = getComputedStyle(element);
        return style.overflow + style.overflowY;
      }),
    ).toMatch(/visible/);
  });

  test("select, combobox, and edge popups use the shared viewport layer", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/component-lab");

    const selectFixture = page.locator('[data-overlay-fixture="card-select"]');
    await selectFixture
      .getByRole("button", { name: "Fulfillment state" })
      .click();
    const selectPopup = page.locator("#t7-overlay-root .t7-select-list");
    await expect(selectPopup).toBeVisible();
    await assertInsideViewport(selectPopup, page);
    await expect(page.locator("#t7-overlay-root")).toContainText(
      "Ready to ship",
    );
    await page.keyboard.press("Escape");

    const comboboxFixture = page.locator(
      '[data-overlay-fixture="scroll-combobox"]',
    );
    await comboboxFixture.getByRole("combobox", { name: "Owner" }).click();
    const comboboxPopup = page.locator("#t7-overlay-root .t7-combobox-list");
    await expect(comboboxPopup).toBeVisible();
    await assertInsideViewport(comboboxPopup, page);
    await page.keyboard.press("Escape");

    const edgeFixture = page.locator('[data-overlay-fixture="edge-anchors"]');
    await edgeFixture.getByRole("button", { name: "Popover" }).click();
    const popover = page.locator("#t7-overlay-root .t7-popover");
    await expect(popover).toBeVisible();
    await assertInsideViewport(popover, page);
  });

  test("nested modal and drawer own body scroll while their popups remain usable", async ({
    page,
  }) => {
    await page.goto("/component-lab");
    await page
      .getByRole("button", { name: "Open nested modal fixture" })
      .click();
    const modal = page.getByRole("dialog", { name: "Nested overlay proof" });
    await expect(modal).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => getComputedStyle(document.body).overflow))
      .toBe("hidden");
    await modal.getByRole("button", { name: "Review outcome" }).click();
    await assertInsideViewport(
      page.locator("#t7-overlay-root .t7-select-list"),
      page,
    );
    await page.keyboard.press("Escape");
    await modal.getByRole("button", { name: "Close dialog" }).click();
    await expect
      .poll(() => page.evaluate(() => getComputedStyle(document.body).overflow))
      .toBe("visible");

    await page.getByRole("button", { name: "Open date drawer" }).click();
    const drawer = page.getByRole("dialog", { name: "Set review date" });
    await expect(drawer).toBeVisible();
    await drawer.getByRole("button", { name: "Open calendar" }).click();
    await assertInsideViewport(
      page.locator("#t7-overlay-root .t7-date-picker-popover"),
      page,
    );
  });
});
