import { expect, test } from "@playwright/test";

const expressiveViewports = [
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "wide-1280x800", width: 1280, height: 800 },
  { name: "tablet-1024x900", width: 1024, height: 900 },
  { name: "tablet-768x900", width: 768, height: 900 },
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "narrow-360x800", width: 360, height: 800 },
];

for (const viewport of expressiveViewports) {
  test(`public showcase expressive render ${viewport.name}`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize(viewport);
    await page.goto("/public-showcase");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Build better product surfaces.",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Selected product proof." }),
    ).toBeVisible();
    await expect(page.locator(".t7-public-footer")).toBeVisible();

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
    await expect(page.getByText(/AAPM/i)).toHaveCount(0);
    await expect(page).toHaveScreenshot(
      `public-showcase-${viewport.name}.png`,
      {
        animations: "disabled",
        caret: "hide",
        fullPage: false,
      },
    );
  });
}

test("blocks catalog exposes live previews and detail contracts", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/blocks");
  await expect(
    page.getByRole("heading", { level: 1, name: "Blocks" }),
  ).toBeVisible();
  await expect(page.locator(".block-catalog-card")).toHaveCount(60);
  await expect(
    page.getByRole("heading", { name: "Hero", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "KPI Dashboard", exact: true }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Public Footer", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".block-catalog-preview")).toHaveCount(60);

  await page
    .getByRole("button", { name: "Admin / application", exact: true })
    .click();
  await expect(page.locator(".block-catalog-card")).toHaveCount(10);

  await page.goto("/blocks/hero-split");
  await expect(
    page.getByRole("heading", { level: 1, name: "Hero" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Quality contract" }),
  ).toBeVisible();
  await expect(page.getByText("Required contracts")).toBeVisible();
  await expect(page.getByText("Responsive").last()).toBeVisible();

  await page.goto("/blocks/kpi-dashboard");
  await expect(
    page.getByRole("heading", { level: 1, name: "KPI Dashboard" }),
  ).toBeVisible();
  await expect(page.getByText("Layer boundary")).toBeVisible();
});

test("public showcase carousel and chart affordances remain interactive", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/public-showcase");

  const carousel = page.locator(".t7-carousel").first();
  const next = carousel.getByRole("button", { name: "Next slide" });
  const indicators = carousel.locator(".t7-carousel-indicator");
  await expect(indicators.nth(0)).toHaveAttribute("aria-pressed", "true");
  await next.click();
  await expect(indicators.nth(1)).toHaveAttribute("aria-pressed", "true");

  const viewport = carousel.locator(".t7-carousel-viewport");
  await viewport.focus();
  await viewport.press("ArrowRight");
  await expect(indicators.nth(2)).toHaveAttribute("aria-pressed", "true");

  const chartPoint = page.locator('[aria-label^="App,"]').first();
  await chartPoint.scrollIntoViewIfNeeded();
  await chartPoint.hover();
  // Keep the proof keyboard-verifiable as well: the canonical chart point
  // exposes the same tooltip from focus when a portal placement is not
  // stable under a pointer move across the composed proof layout.
  await chartPoint.focus();
  const chartTooltip = page.locator(".t7-chart-tooltip");
  await expect(chartTooltip).toBeVisible();

  // Chart tooltips deliberately render through FloatingPortal so they can
  // escape clipped chart/card ancestors; verify the portal tooltip remains
  // anchored to the highlighted point instead of requiring DOM ancestry.
  const pointBox = await chartPoint.boundingBox();
  const tooltipBox = await chartTooltip.boundingBox();
  expect(pointBox).not.toBeNull();
  expect(tooltipBox).not.toBeNull();
  expect(
    Math.abs(
      tooltipBox!.x +
        tooltipBox!.width / 2 -
        (pointBox!.x + pointBox!.width / 2),
    ),
  ).toBeLessThanOrEqual(4);
  const tooltipAbovePoint =
    pointBox!.y - (tooltipBox!.y + tooltipBox!.height) >= 4;
  const tooltipBelowPoint =
    tooltipBox!.y - (pointBox!.y + pointBox!.height) >= 4;
  expect(tooltipAbovePoint || tooltipBelowPoint).toBeTruthy();
});
