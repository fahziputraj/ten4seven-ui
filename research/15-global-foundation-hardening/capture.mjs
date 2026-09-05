import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const phase = process.argv[2] ?? "before";
if (!["before", "after"].includes(phase))
  throw new Error("Use before or after");
const destination = resolve(import.meta.dirname, "evidence", phase);
await mkdir(destination, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});
const profile = {
  appearance: "light",
  palette: "emerald",
  primary: "emerald",
  accent: "emerald",
  canvas: "balanced",
  chartPalette: "spectrum",
  radius: "rounded",
  density: "comfortable",
  typography: "modern",
  elevation: "soft",
  motionDuration: 1.25,
};
await context.addInitScript((config) => {
  localStorage.setItem("ten4seven.playground.theme.v1", JSON.stringify(config));
  localStorage.setItem(
    "ten4seven.playground.runtime-preferences.v1",
    JSON.stringify({
      appearance: "light",
      density: "comfortable",
      contrast: "more",
      motion: "full",
    }),
  );
}, profile);
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
const results = {
  phase,
  profile,
  preferences: { contrast: "more", motion: "full" },
  routes: [],
  errors,
};
try {
  for (const route of [
    "tokens",
    "theme-studio",
    "component-lab",
    "components",
    "blocks",
    "recipes",
    "operations-tracker",
    "operational-patterns",
    "ebook-store",
    "public-showcase",
  ]) {
    const response = await page.goto(`http://127.0.0.1:4173/${route}`);
    await page.locator("main").waitFor();
    await page.locator('.t7-provider[data-motion-duration="1.25"]').waitFor();
    await page.evaluate(() => document.fonts.ready);
    // Wait for the authored reveal to settle; actual full-motion values remain observable.
    await page.waitForTimeout(1600);
    const runtime = await page.locator(".t7-provider").evaluate((element) => {
      const style = getComputedStyle(element);
      const properties = Array.from(style).filter((key) =>
        key.startsWith("--t7-"),
      );
      return {
        attributes: Object.fromEntries(
          [...element.attributes]
            .filter((a) => a.name.startsWith("data-"))
            .map((a) => [a.name, a.value]),
        ),
        variables: Object.fromEntries(
          properties.map((key) => [key, style.getPropertyValue(key).trim()]),
        ),
        overflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      };
    });
    results.routes.push({ route, status: response.status(), ...runtime });
    await page.screenshot({
      path: resolve(destination, `${route}-top.png`),
      animations: "disabled",
    });
    if (route === "tokens") {
      for (const section of [
        "color",
        "typography",
        "interaction",
        "motion",
        "elevation",
        "viewport",
        ...(phase === "after"
          ? ["surfaces", "geometry", "scroll", "icons", "charts"]
          : []),
      ]) {
        await page.locator(`#token-${section}`).scrollIntoViewIfNeeded();
        if (phase === "after") {
          await page.locator(`#token-${section}`).evaluate((element) =>
            window.scrollTo({
              top: element.getBoundingClientRect().top + window.scrollY - 92,
              behavior: "instant",
            }),
          );
        }
        await page.screenshot({
          path: resolve(destination, `tokens-${section}.png`),
          animations: "disabled",
        });
      }
    }
    console.log(
      `${phase}: ${route} ${response.status()}, overflow ${runtime.overflow}px`,
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:4173/tokens");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: resolve(destination, "tokens-mobile.png"),
    animations: "disabled",
  });
} finally {
  await writeFile(
    resolve(destination, "runtime.json"),
    JSON.stringify(results, null, 2) + "\n",
  );
  await browser.close();
}
if (errors.length) throw new Error(errors.join("\n"));
