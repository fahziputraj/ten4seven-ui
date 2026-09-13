import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import {
  routeFromPath,
  routeTitleForMatch,
} from "../apps/playground/src/playground-routes";

const viewports = [
  { width: 1440, height: 900 },
  { width: 1024, height: 768 },
  { width: 390, height: 844 },
];
const surfaces = [
  "component-lab",
  "brand-proof/auth-neutral",
  "ebook-store",
  "erp-reference",
];

test.beforeAll(async () => {
  await mkdir("artifacts/public-ready", { recursive: true });
});

for (const viewport of viewports) {
  for (const route of surfaces) {
    test(`${route} ${viewport.width}: semantic order and bounded content`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: "reduce" });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(`/${route}`);
      const match = routeFromPath(`/${route}`);
      expect(match.kind).not.toBe("not-found");
      await expect(page).toHaveTitle(routeTitleForMatch(match));
      await expect(page.locator("main")).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        ),
      ).toBeLessThanOrEqual(1);
      await expect(page.locator("h1")).toHaveCount(1);
      await page.screenshot({
        path: `artifacts/public-ready/${route.replaceAll("/", "-")}-${viewport.width}.png`,
        animations: "disabled",
      });
      expect(errors).toEqual([]);
    });
  }

  test(`Native Lab ${viewport.width}: profile, density, selection sheet and motion`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("http://127.0.0.1:4175");
    await expect(
      page.getByText("Ten4Seven Native Lab", { exact: true }),
    ).toBeVisible();
    await page
      .getByRole("button", { name: "Product profile", exact: true })
      .click();
    await page
      .getByRole("radio", { name: "neutral-product", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Reduced motion", exact: true })
      .click();
    await page.getByRole("button", { name: "compact", exact: true }).click();
    await page.getByRole("tab", { name: "Forms", exact: true }).click();
    const select = page.getByRole("button", { name: "Cadence", exact: true });
    await select.click();
    await expect(
      page.getByRole("radio", { name: "Unavailable option", exact: true }),
    ).toBeDisabled();
    await page.getByRole("radio", { name: "Weekly", exact: true }).click();
    await expect(select).toContainText("Weekly");
    await expect(
      page.getByRole("radio", { name: "Weekly", exact: true }),
    ).toBeHidden();
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(1);
    await page.screenshot({
      path: `artifacts/public-ready/native-lab-${viewport.width}.png`,
    });
    expect(errors).toEqual([]);
  });
}
