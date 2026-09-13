import { expect, test } from "@playwright/test";

test.describe("U06 navigation, disclosure, overlay, and feedback contracts", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/component-lab");
  });

  test("Dialog traps focus, dismisses on Escape, and returns focus", async ({
    page,
  }) => {
    const trigger = page.getByRole("button", { name: "Open U06 dialog" });

    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "U06 dialog" });
    await expect(dialog).toBeVisible();
    await expect(dialog.locator(":focus")).toHaveCount(1);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("AlertDialog requires an explicit action instead of Escape or backdrop dismissal", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Confirm action" }).click();
    const dialog = page.getByRole("dialog", { name: "Remove this sample?" });
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeVisible();

    await dialog.getByRole("button", { name: "Cancel" }).click();
    await expect(dialog).toBeHidden();
  });

  test("Drawer supports an adaptive bottom-sheet presentation on a narrow viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 800, width: 390 });
    await page.reload();

    const trigger = page.getByRole("button", { name: "Open bottom sheet" });
    await trigger.click();
    const sheet = page.getByRole("dialog", { name: "U06 bottom sheet" });
    await expect(sheet).toBeVisible();
    await expect(sheet).toHaveAttribute("data-side", "bottom");
    await expect(sheet.locator(".t7-drawer")).toHaveAttribute(
      "data-side",
      "bottom",
    );

    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("Banner exposes urgency and notification center owns read and clear actions", async ({
    page,
  }) => {
    const banner = page.locator(
      "#component-lab-navigation-overlay-feedback .t7-banner",
    );
    await expect(banner).toHaveAttribute("aria-live", "polite");
    await expect(banner).toHaveRole("status");

    await banner.getByRole("button", { name: "Dismiss banner" }).click();
    await expect(banner).toHaveCount(0);
    await page.getByRole("button", { name: "Show banner" }).click();
    await expect(page.locator(".t7-banner")).toBeVisible();

    const center = page.locator(
      "#component-lab-navigation-overlay-feedback .t7-notification-center",
    );
    await expect(center.getByText("1 unread")).toBeVisible();
    await center.getByRole("button", { name: "Mark all read" }).click();
    await expect(center.getByText("0 unread")).toBeVisible();
    await center.getByRole("button", { name: "Clear" }).click();
    await expect(center.getByRole("status")).toContainText("all caught up");
  });
});
