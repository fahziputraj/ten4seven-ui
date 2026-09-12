import { expect, test } from "@playwright/test";

const viewports = [
  { height: 900, id: "desktop", width: 1440 },
  { height: 768, id: "intermediate", width: 1024 },
  { height: 1024, id: "tablet", width: 768 },
  { height: 844, id: "mobile", width: 390 },
] as const;

test.describe("U10 editors, builders, DnD, AI, and power-user canaries", () => {
  for (const viewport of viewports) {
    test(`renders every U10 Web canary at ${viewport.id}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/component-lab#component-lab-u10-advanced-interactions");

      const proof = page.getByTestId("component-lab-u10-advanced-interactions");
      await expect(proof).toBeVisible();
      for (const id of [
        "u10-editor-canary",
        "u10-builder-canary",
        "u10-dnd-canary",
        "u10-ai-canary",
        "u10-power-user-canary",
      ])
        await expect(proof.getByTestId(id)).toBeVisible();

      await expect(proof.locator(".t7-diff-viewer")).toBeVisible();
      await expect(proof.locator(".t7-tree-view")).toBeVisible();
      await expect(proof.locator(".t7-property-inspector")).toBeVisible();
      await expect(proof.locator(".t7-citation-list")).toBeVisible();
      await expect(proof.locator(".t7-tool-call-card")).toContainText(
        "waitingApproval",
      );
      await expect(proof.locator(".t7-approval-panel")).toContainText(
        "Approval requested",
      );

      const geometry = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(geometry.scrollWidth, viewport.id).toBeLessThanOrEqual(
        geometry.clientWidth + 1,
      );

      if (viewport.id === "desktop" || viewport.id === "mobile")
        await page.screenshot({
          fullPage: false,
          path: `output/playwright/u10-advanced-${viewport.id}-${viewport.width}x${viewport.height}.png`,
        });
    });
  }

  test("keeps DnD mutation and non-DnD action paths separate", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/component-lab#component-lab-u10-advanced-interactions");
    const proof = page.getByTestId("component-lab-u10-advanced-interactions");
    const dnd = page.getByTestId("u10-dnd-canary");

    await expect(
      dnd.getByRole("button", { name: "Move before" }),
    ).toBeVisible();
    await expect(dnd.getByRole("button", { name: "Move after" })).toBeVisible();
    await dnd.getByRole("button", { name: "Move before" }).click();
    await expect(dnd.getByTestId("u10-dnd-status")).toContainText(
      "reorder intent",
    );
    await dnd.getByRole("button", { name: "Cancel" }).click();
    await expect(dnd.getByTestId("u10-dnd-status")).toContainText(
      "Move canceled",
    );
    await expect(
      proof.getByRole("button", { name: /Drag selected/ }),
    ).toBeVisible();
  });

  test("exercises prompt submission, bounded AI status, and command search", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/component-lab#component-lab-u10-advanced-interactions");
    const proof = page.getByTestId("component-lab-u10-advanced-interactions");
    const ai = page.getByTestId("u10-ai-canary");

    await ai
      .getByRole("textbox", { name: "Synthetic prompt" })
      .fill("Check the source context");
    await ai.getByRole("button", { name: "Send locally" }).click();
    await expect(ai.getByTestId("u10-ai-status")).toContainText(
      "Prompt submitted locally",
    );
    await expect(
      ai.getByRole("button", { name: "Stop locally" }),
    ).toBeVisible();
    await ai.getByRole("button", { name: "Stop locally" }).click();
    await expect(ai.getByTestId("u10-ai-status")).toContainText(
      "Generation stopped locally",
    );

    await proof.getByRole("button", { name: "Open command menu" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await dialog
      .getByRole("combobox", { name: "Search commands" })
      .fill("inspector");
    await expect(
      dialog.getByRole("option", { name: /Open inspector/ }),
    ).toBeVisible();
    await dialog.getByRole("option", { name: /Open inspector/ }).click();
    await expect(proof.getByTestId("u10-command-status")).toContainText(
      "Open inspector selected",
    );
  });
});
