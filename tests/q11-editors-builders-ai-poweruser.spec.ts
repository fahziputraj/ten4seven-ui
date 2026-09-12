import { expect, test } from "@playwright/test";

test.describe("Q11 editors, builders, AI and power-user surfaces", () => {
  test("Component Lab exposes the bounded advanced surface set", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/component-lab#component-lab-editors-builders-ai");

    const proof = page.locator("#component-lab-editors-builders-ai");
    await expect(
      page.getByRole("heading", { name: "Advanced composition contracts" }),
    ).toBeVisible();
    await expect(proof).toBeVisible();
    await expect(proof.locator(".t7-editor-surface")).toBeVisible();
    await expect(proof.locator(".t7-builder-canvas")).toBeVisible();
    await expect(proof.locator(".t7-property-inspector")).toBeVisible();
    await expect(proof.locator(".t7-prompt-composer")).toBeVisible();
    await expect(proof.locator(".t7-conversation-thread")).toBeVisible();
    await expect(proof.locator(".t7-citation-list")).toBeVisible();
    await expect(proof.locator(".t7-tool-call-card")).toBeVisible();

    await proof
      .getByRole("textbox", { name: "Prompt" })
      .fill("Show the remaining blockers");
    await page.getByRole("button", { name: "Send prompt" }).click();
    await expect(proof).toContainText("Prompt submitted locally");
  });

  test("advanced contracts are indexed in their canonical families", async ({
    page,
  }) => {
    await page.goto("/components/forms");
    await expect(page.locator("[data-component-contract]")).toHaveCount(33);
    await expect(
      page.locator("[data-component-contract=EditorSurface]"),
    ).toBeVisible();
    await expect(
      page.locator("[data-component-contract=PromptComposer]"),
    ).toBeVisible();

    await page.goto("/components/layout");
    await expect(page.locator("[data-component-contract]")).toHaveCount(12);
    await expect(
      page.locator("[data-component-contract=BuilderCanvas]"),
    ).toBeVisible();
    await expect(
      page.locator("[data-component-contract=PropertyInspector]"),
    ).toBeVisible();

    await page.goto("/components/data-display");
    await expect(page.locator("[data-component-contract]")).toHaveCount(14);
    for (const name of ["ConversationThread", "CitationList", "ToolCallCard"])
      await expect(
        page.locator(`[data-component-contract=${name}]`),
      ).toBeVisible();
  });

  test("advanced proof remains readable at compact width", async ({ page }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/component-lab#component-lab-editors-builders-ai");
    await expect(
      page.getByRole("heading", { name: "Advanced composition contracts" }),
    ).toBeVisible();
    const geometry = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth + 1);
    await expect(
      page.locator(
        "#component-lab-editors-builders-ai .t7-builder-canvas-inspector",
      ),
    ).toBeVisible();
  });
});
