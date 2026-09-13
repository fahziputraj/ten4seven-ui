import { expect, test, type Page } from "@playwright/test";
import axe from "axe-core";

async function seriousA11y(page: Page, root: string) {
  await page.addScriptTag({ content: axe.source });
  return page.locator(root).evaluateAll(async (nodes) => {
    // @ts-expect-error axe-core is injected for this isolated audit.
    const results = [];
    for (const node of nodes) {
      results.push(
        await window.axe.run(node, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
        }),
      );
    }
    return [
      ...new Set(
        results.flatMap((result) =>
          result.violations
            .filter((violation: { impact: string | null }) =>
              ["critical", "serious"].includes(violation.impact ?? ""),
            )
            .map((violation: { id: string }) => violation.id),
        ),
      ),
    ];
  });
}

test.describe("U08 visualization contracts", () => {
  test("renders the canonical chart family with accessible summaries", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1280 });
    await page.goto("/components/charts-data-visualization");

    const preview = page.locator(".catalog-contract-preview");
    await expect(
      preview.getByRole("img", { name: "Line chart" }),
    ).toBeVisible();
    await expect(preview.getByRole("img", { name: "Bar chart" })).toBeVisible();
    await expect(
      preview.getByRole("img", { name: "Donut chart" }),
    ).toBeVisible();
    await expect(preview.locator(".t7-sparkline")).toBeVisible();
    await expect(preview.locator("[data-chart-state=ready]")).toHaveCount(4);
    expect(await seriousA11y(page, ".catalog-contract-preview")).toEqual([]);
  });

  test("keeps partial data, zero, threshold, and narrow rendering explicit", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1280 });
    await page.goto("/component-lab");

    const charts = page.locator("#component-lab-charts");
    await expect(
      charts.locator('[data-chart-state="partialData"]'),
    ).toHaveCount(2);
    await expect(charts.locator(".t7-chart-annotation-label")).toHaveText(
      "Target",
    );
    await expect(charts.locator(".t7-chart-missing-mark-label")).toHaveText(
      "Unavailable",
    );
    await expect(
      charts.getByText("Missing values stay distinct from zero."),
    ).toBeVisible();
    expect(await seriousA11y(page, "#component-lab-charts")).toEqual([]);

    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/component-lab");
    const narrowChart = page
      .locator("#component-lab-charts .component-proof-chart-partial")
      .first();
    await expect(narrowChart).toBeVisible();
    const geometry = await narrowChart.evaluate((node) => ({
      clientWidth: node.clientWidth,
      scrollWidth: node.scrollWidth,
    }));
    expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth + 1);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(391);
  });
});
