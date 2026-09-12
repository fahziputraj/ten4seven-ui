import { expect, test } from "@playwright/test";

test.describe("Q07 display, feedback, overlay, and media contracts", () => {
  test("milestones remain distinct from step navigation and expose progress semantics", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/components/data-display");

    const tracker = page.locator(
      '[data-component-contract="MilestoneTracker"]',
    );
    const stages = tracker.locator(".t7-milestone-button");
    await expect(stages).toHaveCount(3);
    await expect(stages.first()).toHaveAttribute("aria-posinset", "1");
    await expect(stages.first()).toHaveAttribute("aria-setsize", "3");
    await expect(
      stages.first().locator('[role="progressbar"]'),
    ).toHaveAttribute("aria-valuenow", "100");

    await stages.nth(1).click();
    await expect(page.getByRole("dialog", { name: "Triage" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(stages.nth(1)).toBeFocused();
  });

  test("progress and state feedback have stable accessible names", async ({
    page,
  }) => {
    await page.goto("/components/feedback-progress");

    const progress = page.locator(
      '[data-component-contract="Progress"] [role="progressbar"]',
    );
    await expect(progress).toHaveAttribute("aria-labelledby", /.+/);
    await expect(progress).toHaveAttribute("aria-valuenow", "72");

    const circular = page.locator(
      '[data-component-contract="CircularProgress"] [role="progressbar"]',
    );
    await expect(circular).toHaveAttribute("aria-labelledby", /.+/);
    await expect(circular).toContainText("72%");

    const stateView = page.locator(
      '[data-component-contract="StateView"] [role="alert"]',
    );
    await expect(stateView).toBeVisible();
    await expect(
      stateView.getByRole("heading", { name: "Could not load records" }),
    ).toBeVisible();
  });

  test("tooltip, media frame, image, and QR surfaces keep their labels", async ({
    page,
  }) => {
    await page.goto("/components/overlays");
    const tooltip = page.locator('[data-component-contract="Tooltip"]');
    const tooltipTrigger = tooltip.getByRole("button", {
      name: "More information",
    });
    await expect(tooltipTrigger).toHaveAttribute("aria-describedby", /.+/);
    await tooltipTrigger.hover();
    await expect(page.getByRole("tooltip")).toContainText(
      "Supplemental context",
    );

    await page.goto("/components/media");
    const mediaFrame = page.locator(
      '[data-component-contract="MediaFrame"] [role="group"]',
    );
    await expect(mediaFrame).toHaveAttribute(
      "aria-label",
      "Editorial media frame",
    );

    const image = page.locator(
      '[data-component-contract="Image"] img[alt="Editorial sample"]',
    );
    await expect(image).toBeVisible();

    const qr = page.locator('[data-component-contract="QrCode"] figure');
    const descriptionId = await qr.getAttribute("aria-describedby");
    expect(descriptionId).toBeTruthy();
    await expect(qr.locator(`#${descriptionId}`)).toContainText(
      "Scan to open the assigned cage production entry",
    );
  });
});
