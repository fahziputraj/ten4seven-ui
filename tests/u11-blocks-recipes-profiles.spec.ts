import { expect, test, type Page } from "@playwright/test";

const viewportMatrix = [
  { height: 900, width: 1440 },
  { height: 768, width: 1024 },
  { height: 1024, width: 768 },
  { height: 844, width: 390 },
];

async function expectViewportSafe(page: Page) {
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
}

test.describe("U11 blocks, recipes, and product profiles", () => {
  test("blocks showroom exposes typed composition and stable profile comparison", async ({
    page,
  }) => {
    await page.setViewportSize(viewportMatrix[0]);
    await page.goto("/blocks");

    const plane = page.locator('[data-testid="u11-composition-plane"]');
    await expect(plane).toHaveAttribute("data-composition-mode", "blocks");
    await expect(plane).toContainText("Typed composition plane");
    await expect(plane).toContainText("Source: typed contracts");
    await expect(
      page.locator('[data-testid="u11-block-composition"]'),
    ).toContainText("Decision Workspace");

    const cards = page.locator(
      '[data-testid="u11-profile-comparison"] [data-testid="u11-profile-card"]',
    );
    await expect(cards).toHaveCount(7);
    await expect(cards.first()).toContainText("Review workspace");
    expect(
      new Set(await cards.locator(".t7-button").allTextContents()).size,
    ).toBe(1);
    expect(await cards.locator(".t7-button").allTextContents()).toEqual(
      Array.from({ length: 7 }, () => "Open workspace"),
    );

    await expectViewportSafe(page);
    for (const viewport of viewportMatrix.slice(1)) {
      await page.setViewportSize(viewport);
      await page.reload();
      await expect(
        page.locator('[data-testid="u11-profile-comparison"]'),
      ).toBeVisible();
      await expectViewportSafe(page);
    }
  });

  test("recipes showroom exposes adaptive and native composition metadata", async ({
    page,
  }) => {
    await page.setViewportSize(viewportMatrix[0]);
    await page.goto("/recipes");

    const plane = page.locator('[data-testid="u11-composition-plane"]');
    await expect(plane).toHaveAttribute("data-composition-mode", "recipes");
    await expect(
      page.locator('[data-testid="u11-recipe-composition"]'),
    ).toContainText("Queue / Detail");
    await expect(
      page.locator('[data-testid="u11-native-recipe-canary"]'),
    ).toContainText("CSS parsing: false");
    await expect(plane).toContainText("resolver: system defaults");

    await expectViewportSafe(page);
    for (const viewport of viewportMatrix.slice(1)) {
      await page.setViewportSize(viewport);
      await page.reload();
      await expect(
        page.locator('[data-testid="u11-recipe-composition"]'),
      ).toBeVisible();
      await expectViewportSafe(page);
    }
  });
});
