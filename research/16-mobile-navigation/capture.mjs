import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const phase = process.argv[2] ?? "after";
const output = resolve(import.meta.dirname, "evidence", phase);
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  for (const [route, trigger] of [
    ["tokens", "Open design system navigation"],
    ["operations-tracker", "Open application navigation"],
  ]) {
    await page.goto(`http://127.0.0.1:4173/${route}`);
    await page.locator("h1").first().waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: resolve(output, `${route}.png`),
      animations: "disabled",
    });
    const button = page.getByRole("button", { name: trigger, exact: true });
    if (await button.isVisible()) {
      await button.click();
      await page.screenshot({
        path: resolve(output, `${route}-menu.png`),
        animations: "disabled",
      });
      await page.keyboard.press("Escape");
    }
  }
  await page.goto("http://127.0.0.1:4173/tokens");
  await page
    .getByRole("button", { name: "Open settings", exact: true })
    .click();
  await page.screenshot({
    path: resolve(output, "settings.png"),
    animations: "disabled",
  });
  if (phase === "after") {
    const settings = page.getByRole("dialog", { name: "Theme settings" });
    await settings.getByRole("button", { name: "Dark", exact: true }).click();
    await settings.getByRole("button", { name: "Dense", exact: true }).click();
    await settings.getByRole("button", { name: "More", exact: true }).click();
    await page.keyboard.press("Escape");
    await page.screenshot({
      path: resolve(output, "tokens-dark-dense-contrast.png"),
      animations: "disabled",
    });
    await page
      .getByRole("navigation", { name: "Mobile shortcuts" })
      .getByRole("button", { name: "Menu", exact: true })
      .click();
    await page.screenshot({
      path: resolve(output, "menu-dark-dense-contrast.png"),
      animations: "disabled",
    });
    await page.keyboard.press("Escape");
    await page
      .getByRole("button", { name: "Open ten4seven reference QA controls" })
      .click();
    await page.setViewportSize({ width: 390, height: 340 });
    await page.screenshot({
      path: resolve(output, "modal-short.png"),
      animations: "disabled",
    });
  }
} finally {
  await browser.close();
}
