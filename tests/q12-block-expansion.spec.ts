import { expect, test } from "@playwright/test";

const familyCounts = [
  ["Public / marketing", 8],
  ["Admin / application", 10],
  ["Commerce", 8],
  ["Workflow / productivity", 9],
  ["Data management", 7],
  ["AI / conversation", 6],
] as const;

test.describe("Q12 normalized block expansion", () => {
  test("indexes sixty blocks without changing the canonical component layer", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/blocks");

    await expect(
      page.getByText("60 expressive blocks · 6 families"),
    ).toBeVisible();
    await expect(page.locator(".block-catalog-card")).toHaveCount(60);
    await expect(page.getByText("167 canonical contracts")).toHaveCount(0);

    const familyFilter = page.locator(".block-family-filter-tabs");
    for (const [family, count] of familyCounts) {
      await familyFilter
        .getByRole("button", { name: family, exact: true })
        .click();
      await expect(page.locator(".block-catalog-card")).toHaveCount(count);
    }
  });

  for (const viewport of [
    { height: 844, name: "mobile-390", width: 390 },
    { height: 800, name: "mobile-360", width: 360 },
    { height: 900, name: "tablet-768", width: 768 },
  ]) {
    test(`family-filtered catalog stays within the viewport at ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto("/blocks");
      await page
        .locator(".block-family-filter-tabs")
        .getByRole("button", { name: "Data management", exact: true })
        .click();
      await expect(
        page.getByRole("heading", { name: "Dense Data Summary" }).first(),
      ).toBeVisible();

      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }

  for (const [path, title] of [
    ["/blocks/kpi-dashboard", "KPI Dashboard"],
    ["/blocks/csv-import-wizard", "CSV Import Wizard"],
    ["/blocks/ai-prompt-workbench", "AI Prompt Workbench"],
  ] as const) {
    test(`detail route exposes the composition contract for ${title}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(path);
      await expect(
        page.getByRole("heading", { level: 1, name: title }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Quality contract" }),
      ).toBeVisible();
      await expect(page.getByText("Layer boundary")).toBeVisible();
    });
  }
});
