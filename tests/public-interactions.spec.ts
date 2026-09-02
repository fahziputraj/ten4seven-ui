import { expect, test } from "@playwright/test";
import axe from "axe-core";

test.beforeEach(async ({ page }) => {
  await page.goto("/component-lab");
});

test("modal Escape closes and restores focus", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "Open modal" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Modal proof" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(":focus")).toHaveCount(1);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("command menu focuses search and restores focus", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "Open command menu" });
  await trigger.click();
  const search = page.getByRole("combobox", { name: "Search commands" });
  await expect(search).toBeFocused();
  await search.fill("theme");
  await expect(page.getByRole("option")).not.toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("tabs and accordion expose keyboard state", async ({ page }) => {
  const summary = page.getByRole("tab", { name: "Summary" });
  const activity = page.getByRole("tab", { name: "Activity" });
  await summary.focus();
  await page.keyboard.press("ArrowRight");
  await expect(activity).toHaveAttribute("aria-selected", "true");
  const disclosure = page.getByRole("button", {
    name: "What belongs in this panel?",
  });
  await disclosure.press("Enter");
  await expect(disclosure).toHaveAttribute("aria-expanded", "false");
  await disclosure.press("Enter");
  await expect(disclosure).toHaveAttribute("aria-expanded", "true");
});

test("representative workbench has no serious axe violations", async ({
  page,
}) => {
  await page.addScriptTag({ content: axe.source });
  const result = await page.evaluate(async () =>
    // @ts-expect-error injected by axe-core for this isolated audit
    window.axe.run(document),
  );
  expect(
    result.violations.filter((violation: { impact: string | null }) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    ),
  ).toEqual([]);
});
