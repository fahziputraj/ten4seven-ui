import { expect, test, type Page } from "@playwright/test";
import axe from "axe-core";

async function openButtonPreview(page: Page) {
  await page.goto("/components/button");
  await expect(
    page.getByRole("heading", { name: "Button", exact: true }),
  ).toBeVisible();
}

test.describe("Action availability composition", () => {
  test("keeps unavailable action reasons keyboard and screen-reader discoverable", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await openButtonPreview(page);

    const preview = page.locator(".catalog-contract-preview");
    await expect(
      preview.getByRole("button", { name: "Approve batch" }),
    ).toBeEnabled();

    const disabledAction = preview.getByRole("button", {
      name: "Release batch",
      exact: true,
    });
    await expect(disabledAction).toBeDisabled();
    const reason = "Awaiting warehouse QA sign-off.";
    await expect(preview.getByText(reason, { exact: true })).toBeVisible();
    const reasonTrigger = preview.getByRole("button", {
      name: `Why release batch is unavailable: ${reason}`,
    });
    await expect(disabledAction).toHaveAttribute("aria-describedby", /.+/);
    await reasonTrigger.focus();
    await expect(reasonTrigger).toBeFocused();
    await expect(page.getByRole("tooltip")).toHaveText(reason);

    const loadingAction = preview.getByRole("button", {
      name: "Sync batch",
    });
    await expect(loadingAction).toBeDisabled();
    await expect(loadingAction).toHaveAttribute("aria-busy", "true");
    await expect(
      preview.getByRole("button", { name: "Batch released" }),
    ).toBeDisabled();

    await page.addScriptTag({ content: axe.source });
    const violations = await preview.evaluate(async (node) => {
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

    await preview.getByRole("button", { name: "Approve batch" }).focus();
    await expect(page.getByRole("tooltip")).toHaveCount(0);
    await expect(page).toHaveScreenshot("action-availability-desktop.png");
  });

  test("keeps the state cards and reason trigger inside a narrow Web viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await openButtonPreview(page);

    const preview = page.locator(".catalog-contract-preview");
    const bounds = await preview.evaluate((node) => {
      const rect = node.getBoundingClientRect();
      return { left: rect.left, right: rect.right };
    });
    expect(bounds.left).toBeGreaterThanOrEqual(-1);
    expect(bounds.right).toBeLessThanOrEqual(391);
    await expect(
      preview.getByRole("button", {
        name: /Why release batch is unavailable/,
      }),
    ).toBeVisible();
    await expect(
      preview.getByText("Completed / no longer available"),
    ).toBeVisible();
    await expect(page).toHaveScreenshot("action-availability-mobile.png");
  });
});
