import { expect, test } from "@playwright/test";

const q04Viewports = [
  { height: 900, id: "desktop", width: 1440 },
  { height: 900, id: "tablet", width: 840 },
  { height: 844, id: "mobile", width: 390 },
] as const;

async function pageOverflow(page: import("@playwright/test").Page) {
  return page.evaluate(() => ({
    body: document.body.scrollWidth,
    document: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
}

test.describe("Q04 responsive shell and module-state contracts", () => {
  test("Theme Studio exposes generated behavior and presentation contracts progressively", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/theme-studio");

    const workbench = page.getByTestId("studio-responsive-contracts");
    await expect(workbench).toBeVisible();
    const summary = workbench.locator(
      ".studio-responsive-contract-summary > span",
    );
    await expect(summary).toHaveCount(4);
    await expect(summary.nth(0).locator("strong")).toHaveText("3");
    await expect(summary.nth(0).locator("small")).toHaveText("viewport bands");
    await expect(summary.nth(1).locator("strong")).toHaveText("9");
    await expect(summary.nth(1).locator("small")).toHaveText(
      "behavior contracts",
    );
    await expect(summary.nth(2).locator("strong")).toHaveText("11");
    await expect(summary.nth(2).locator("small")).toHaveText("module states");
    await expect(summary.nth(3).locator("strong")).toHaveText("1");
    await expect(summary.nth(3).locator("small")).toHaveText(
      "shared shell grammar",
    );

    const behaviorPanel = workbench.locator("#responsive-contracts");
    const behaviorToggle = behaviorPanel.getByRole("button");
    await expect(behaviorToggle).toHaveAttribute("aria-expanded", "false");
    await expect(behaviorPanel.locator(".t7-table-wrap")).toHaveCount(0);

    await behaviorToggle.click();
    await expect(behaviorToggle).toHaveAttribute("aria-expanded", "true");
    await expect(behaviorPanel).toHaveAttribute("data-open", "true");
    await expect(
      behaviorPanel.locator(".studio-responsive-viewport"),
    ).toHaveCount(3);
    await expect(
      behaviorPanel.locator('.t7-table-wrap[data-responsive="stacked"]'),
    ).toBeVisible();
    await expect(behaviorPanel.locator(".t7-table")).toBeVisible();
    await expect(behaviorPanel.locator(".t7-table-stacked")).toBeHidden();

    const statePanel = workbench.locator("#module-states");
    const stateToggle = statePanel.getByRole("button");
    await expect(stateToggle).toHaveAttribute("aria-expanded", "false");
    await stateToggle.click();
    await expect(statePanel.locator(".t7-module-state")).toHaveCount(3);
    await expect(statePanel).toContainText("consumer owns meaning and actions");
    await expect(
      statePanel.locator("[data-module-state='setup-required']"),
    ).toBeVisible();
    await expect(
      statePanel.locator("[data-module-state='dependency-unavailable']"),
    ).toBeVisible();
    await expect(
      statePanel.locator("[data-module-state='read-only']"),
    ).toBeVisible();

    expect(await pageOverflow(page)).toMatchObject({
      body: 1440,
      document: 1440,
      viewport: 1440,
    });
  });

  test("the canonical DataTable projection and app shell stay bounded across viewport bands", async ({
    page,
  }) => {
    for (const viewport of q04Viewports) {
      await page.setViewportSize(viewport);
      await page.goto("/operations-tracker");

      const overflow = await pageOverflow(page);
      expect(overflow.document, viewport.id).toBeLessThanOrEqual(
        overflow.viewport + 1,
      );
      expect(overflow.body, viewport.id).toBeLessThanOrEqual(
        overflow.viewport + 1,
      );

      const sidebar = page.locator(".t7-app-sidebar");
      const mobileMenu = page.locator(".t7-app-mobile-menu");
      if (viewport.width >= 861) {
        await expect(sidebar).toBeVisible();
        await expect(mobileMenu).toBeHidden();
      } else {
        await expect(sidebar).toBeHidden();
        await expect(mobileMenu).toBeVisible();
        expect((await mobileMenu.boundingBox())?.height).toBeGreaterThanOrEqual(
          44,
        );
      }
    }

    await page.setViewportSize({ height: 900, width: 840 });
    await page.goto("/theme-studio");
    const behaviorPanel = page
      .getByTestId("studio-responsive-contracts")
      .locator("#responsive-contracts");
    await behaviorPanel.getByRole("button").click();
    await expect(behaviorPanel.locator(".t7-table")).toBeHidden();
    await expect(behaviorPanel.locator(".t7-table-stacked")).toBeVisible();

    await page.setViewportSize({ height: 844, width: 390 });
    const overflow = await pageOverflow(page);
    expect(overflow.document).toBeLessThanOrEqual(overflow.viewport + 1);
    expect(overflow.body).toBeLessThanOrEqual(overflow.viewport + 1);
  });
});
