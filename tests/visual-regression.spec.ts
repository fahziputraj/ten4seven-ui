import { expect, test } from "@playwright/test";

const routes = [
  "theme-studio",
  "component-lab",
  "components",
  "tokens",
  "icons",
  "recipes",
  "warehouse-inventory",
  "ebook-store",
];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "wide", width: 1280, height: 800 },
  { name: "tablet", width: 768, height: 900 },
  { name: "mobile", width: 390, height: 844 },
  { name: "narrow", width: 360, height: 800 },
];

for (const viewport of viewports) {
  for (const route of routes) {
    test(`${route} ${viewport.name} system baseline`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(`/${route}`);
      await expect(page.locator("main")).toBeVisible();
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);
      await expect(page).toHaveScreenshot(`${route}-${viewport.name}.png`, {
        animations: "disabled",
        caret: "hide",
        fullPage: false,
      });
    });
  }
}

test("component lab modal interaction baseline", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/component-lab");
  await page.getByRole("button", { name: "Open modal" }).click();
  await expect(page).toHaveScreenshot("component-lab-modal.png", {
    animations: "disabled",
  });
});
