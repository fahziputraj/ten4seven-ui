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
  const search = page.getByRole("textbox", { name: "Search commands" });
  await expect(search).toBeFocused();
  await search.fill("theme");
  await expect(page.getByRole("option")).not.toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("tabs and accordion expose keyboard state", async ({ page }) => {
  const overview = page.getByRole("tab", { name: "Overview" });
  const details = page.getByRole("tab", { name: "Details" });
  await overview.focus();
  await page.keyboard.press("ArrowRight");
  await expect(details).toHaveAttribute("aria-selected", "true");
  const disclosure = page.getByRole("button", { name: "What is included?" });
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
