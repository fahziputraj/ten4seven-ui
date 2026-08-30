import { expect, test } from "@playwright/test";

const referenceScreens = [
  { route: "operations-tracker", label: "Operations Tracker" },
  { route: "ebook-store", label: "Ebook Store" },
];

const referenceViewports = [
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "narrow-360x800", width: 360, height: 800 },
];

for (const screen of referenceScreens) {
  for (const viewport of referenceViewports) {
    test(`${screen.label} reference render ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto(`/${screen.route}`);
      await expect(page.locator("main")).toBeVisible();

      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);

      await expect(page).toHaveScreenshot(
        `${screen.route}-${viewport.name}.png`,
        {
          animations: "disabled",
          caret: "hide",
          fullPage: false,
        },
      );
    });
  }
}
