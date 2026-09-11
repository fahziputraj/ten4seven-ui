import { expect, test } from "@playwright/test";

test.describe("MilestoneTracker detail contract", () => {
  test("opens the canonical right-side detail drawer from a stage card", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/components/milestone-tracker");

    const tracker = page.locator(
      '.t7-milestone-tracker[data-detail-mode="drawer"]',
    );
    const triage = tracker.getByRole("button", { name: /Triage/ });
    await expect(triage).toBeVisible();

    await triage.click();

    const drawer = page.locator(".t7-drawer-backdrop[open]");
    await expect(drawer).toHaveCount(1);
    await expect(drawer).toHaveAttribute("data-side", "right");
    await expect(drawer.locator(".t7-drawer")).toHaveAttribute(
      "data-side",
      "right",
    );
    await expect(
      drawer.getByRole("heading", { name: "Triage", exact: true }),
    ).toBeVisible();
    await expect(drawer).toContainText("In progress");
    await expect(drawer).toContainText("6 of 8 records");

    await page.keyboard.press("Escape");
    await expect(drawer).not.toBeVisible();
    await expect(triage).toBeFocused();
  });

  test("keeps the detail drawer inside the viewport on mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/components/milestone-tracker");

    const tracker = page.locator(
      '.t7-milestone-tracker[data-detail-mode="drawer"]',
    );
    await tracker.getByRole("button", { name: /Next action/ }).click();

    const drawer = page.locator(".t7-drawer-backdrop[open]");
    const geometry = await drawer.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return {
        clientWidth: document.documentElement.clientWidth,
        left: rect.left,
        right: rect.right,
      };
    });
    expect(geometry.left).toBeGreaterThanOrEqual(0);
    expect(geometry.right).toBeLessThanOrEqual(geometry.clientWidth);
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(1);
  });
});
