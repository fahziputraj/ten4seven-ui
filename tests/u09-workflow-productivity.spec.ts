import { expect, test } from "@playwright/test";

test.describe("U09 workflow, productivity, and application patterns", () => {
  test("shows the queue, board, lifecycle, wizard, and action boundaries", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/component-lab#component-lab-workflow");

    const workflow = page.locator("#component-lab-workflow");
    await expect(workflow).toHaveAttribute(
      "data-contract-plane",
      "workflow-productivity",
    );
    await expect(
      workflow.getByRole("heading", { name: "Workflow contracts" }),
    ).toBeVisible();
    await expect(
      workflow.getByRole("heading", { name: "Release lifecycle" }),
    ).toBeVisible();
    await expect(
      workflow.getByRole("heading", {
        name: "Work queue and inbox boundary",
      }),
    ).toBeVisible();
    await expect(
      workflow.getByText("Work queue", { exact: true }),
    ).toBeVisible();
    await expect(
      workflow.getByText("Inbox / attention", { exact: true }),
    ).toBeVisible();
    await expect(
      workflow.getByText("Notification Center", { exact: true }),
    ).toBeVisible();
    await expect(
      workflow.getByRole("table", { name: "Work queue records" }),
    ).toBeVisible();
    await expect(
      workflow.getByRole("region", { name: "Kanban board lanes" }),
    ).toBeVisible();
    await expect(
      workflow.getByRole("heading", { name: "Wizard / sequential process" }),
    ).toBeVisible();

    await workflow.getByRole("button", { name: "Move to review" }).click();
    await expect(workflow.locator("output")).toContainText(
      "Move intent requested",
    );

    const commandTrigger = page.getByRole("button", {
      name: "Open command menu",
    });
    await commandTrigger.click();
    const commandSearch = page.getByRole("combobox", {
      name: "Search commands",
    });
    await expect(commandSearch).toBeVisible();
    await commandSearch.fill("does not exist");
    await expect(page.getByText("No commands found.")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(commandSearch).not.toBeVisible();
  });

  test("keeps adaptive workflow surfaces viewport-safe with reduced motion", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/component-lab#component-lab-workflow");

    const workflow = page.locator("#component-lab-workflow");
    await expect(workflow).toBeVisible();
    await expect(
      workflow.locator('.t7-table-wrap[data-responsive="stacked"]'),
    ).toBeVisible();
    await expect(
      workflow.getByRole("region", { name: "Kanban board lanes" }),
    ).toBeVisible();
    await expect(
      workflow.getByRole("heading", { name: "Ready" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(1);
  });
});
