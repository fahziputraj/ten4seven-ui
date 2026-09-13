import { expect, test } from "@playwright/test";

test.describe("Q10 workflow and productivity application contracts", () => {
  test("exposes the lifecycle, detail, action, and keyboard path in Component Lab", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/component-lab#component-lab-workflow");

    const workflow = page.locator("#component-lab-workflow");
    await expect(
      workflow.getByRole("heading", { name: "Workflow contracts" }),
    ).toBeVisible();
    await expect(
      workflow.getByRole("heading", { name: "Release lifecycle" }),
    ).toBeVisible();

    const stages = workflow.locator(".t7-milestone-button");
    await expect(stages).toHaveCount(3);
    await stages.nth(1).focus();
    await page.keyboard.press("ArrowRight");
    await expect(stages.nth(2)).toBeFocused();
    await page.keyboard.press("Home");
    await expect(stages.nth(0)).toBeFocused();
    await page.keyboard.press("Enter");

    const drawer = page.locator(".t7-drawer-backdrop[open]");
    await expect(drawer).toBeVisible();
    await expect(
      drawer.getByRole("heading", { name: "Mapped", exact: true }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(drawer).not.toBeVisible();
    await expect(stages.nth(0)).toBeFocused();

    await workflow.getByRole("button", { name: "Approve review" }).click();
    await expect(
      workflow.getByRole("button", { name: "Approved" }),
    ).toBeDisabled();
    await expect(workflow.locator("output")).toContainText(
      "Approval intent recorded",
    );
  });

  test("keeps the workflow proof viewport-safe on mobile", async ({ page }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/component-lab#component-lab-workflow");

    await expect(page.locator("#component-lab-workflow")).toBeVisible();
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(1);
    await expect(
      page.locator("#component-lab-workflow .t7-milestone-scroll"),
    ).toHaveCSS("overflow-x", "auto");
  });

  test("keeps Theme Studio on the shared application shell", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/theme-studio");

    await expect(
      page.locator('.studio-shell[data-shell-contract="reference-shell"]'),
    ).toBeVisible();
    await expect(page.locator(".studio-sidebar")).toBeVisible();
    await expect(page.locator(".studio-topbar")).toBeVisible();
  });
});
