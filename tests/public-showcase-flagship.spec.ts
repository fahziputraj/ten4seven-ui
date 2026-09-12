import { expect, test } from "@playwright/test";

const flagshipViewports = [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1280x720", width: 1280, height: 720 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "390x844", width: 390, height: 844 },
] as const;

for (const viewport of flagshipViewports) {
  test(`H01B flagship composition ${viewport.name}`, async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));

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
      page.getByRole("button", { name: "Explore the system", exact: true }),
    ).toHaveCount(3);
    await expect(
      page.getByRole("button", {
        name: "See the system in action",
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.locator(".public-showcase-dark")).toHaveCount(1);
    await expect(
      page.getByRole("heading", { name: "Selected product proof." }),
    ).toBeVisible();
    await expect(page.locator(".t7-public-footer")).toBeVisible();

    for (const rejectedCopy of [
      "Brand expression proof",
      "Same Authentication recipe",
      "Consumer media slot",
      "View components",
    ]) {
      await expect(page.getByText(rejectedCopy, { exact: true })).toHaveCount(
        0,
      );
    }
    await expect(
      page.getByRole("button", { name: "Open settings", exact: true }),
    ).toHaveCount(0);

    const geometry = await page.evaluate(() => {
      const routeSurface = document.querySelector<HTMLElement>(
        ".playground-route-surface",
      );
      const reveal = document.querySelector<HTMLElement>(
        ".public-showcase-reveal",
      );
      const revealStyle = reveal ? getComputedStyle(reveal) : undefined;
      const routeSurfaceStyle = routeSurface
        ? getComputedStyle(routeSurface)
        : undefined;
      return {
        headings: [...document.querySelectorAll("h1, h2, h3")].map(
          (heading) => heading.tagName,
        ),
        overflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        reducedMotion: {
          opacity: revealStyle?.opacity,
          transform: revealStyle?.transform,
          transition: revealStyle?.transitionDuration,
        },
        routeSurface: {
          opacity: routeSurfaceStyle?.opacity,
          transition: routeSurfaceStyle?.transitionDuration,
        },
      };
    });

    expect(geometry.overflow).toBeLessThanOrEqual(1);
    expect(geometry.headings.filter((tag) => tag === "H1")).toHaveLength(1);
    expect(
      geometry.headings.filter((tag) => tag === "H2").length,
    ).toBeGreaterThanOrEqual(5);
    expect(geometry.reducedMotion.opacity).toBe("1");
    expect(geometry.reducedMotion.transform).toBe("none");
    expect(
      Number.parseFloat(geometry.reducedMotion.transition ?? "1"),
    ).toBeLessThanOrEqual(0.001);
    expect(geometry.routeSurface.opacity).toBe("1");
    expect(
      Number.parseFloat(geometry.routeSurface.transition ?? "1"),
    ).toBeLessThanOrEqual(0.001);
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);

    await page.screenshot({
      fullPage: false,
      path: `output/playwright/h01b-public-showcase-${viewport.name}.png`,
    });
  });
}

test("H01B critical content is readable before entrance motion settles", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/public-showcase", { waitUntil: "commit" });
  await page.locator(".public-showcase-hero h1").waitFor({
    state: "attached",
  });

  const firstPaint = await page.evaluate(() => {
    const readStyle = (selector: string) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) return null;
      const style = getComputedStyle(element);
      return {
        opacity: style.opacity,
        transform: style.transform,
        transitionProperty: style.transitionProperty,
        visibility: style.visibility,
      };
    };
    const routeSurface = readStyle(".playground-route-surface");
    const critical = [
      ".t7-navigation-menu",
      ".public-showcase-hero h1",
      ".public-showcase-hero .t7-hero-copy [data-t7-type=body-lg]",
      ".public-showcase-hero-primary",
      ".public-showcase-hero-media-frame",
    ].map((selector) => ({ selector, style: readStyle(selector) }));
    const supporting = [
      ".public-showcase-reveal",
      ".public-showcase-surface-stage",
    ].flatMap((selector) =>
      [...document.querySelectorAll<HTMLElement>(selector)].map((element) => {
        const style = getComputedStyle(element);
        return {
          opacity: style.opacity,
          motionRole: element.dataset.motionRole,
          selector,
          transitionProperty: style.transitionProperty,
        };
      }),
    );
    return { critical, routeSurface, supporting };
  });

  expect(firstPaint.routeSurface).toMatchObject({
    opacity: "1",
    transitionProperty: "none",
  });
  expect(firstPaint.critical).toHaveLength(5);
  for (const critical of firstPaint.critical) {
    expect(critical.style, critical.selector).toMatchObject({
      opacity: "1",
      transform: "none",
      visibility: "visible",
    });
  }
  expect(firstPaint.supporting.length).toBeGreaterThan(0);
  for (const supporting of firstPaint.supporting) {
    expect(supporting.motionRole, supporting.selector).toBe("supporting");
    expect(supporting.opacity, supporting.selector).not.toBe("0");
  }
  for (const reveal of firstPaint.supporting.filter(
    (motion) => motion.selector === ".public-showcase-reveal",
  )) {
    expect(reveal.transitionProperty).toBe("transform");
  }
});

test("H01B flagship surface transformation and route actions remain usable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/public-showcase");

  const surfaceGroup = page.getByRole("group", { name: "Product surfaces" });
  await expect(
    surfaceGroup.getByRole("button", { name: "Operations" }),
  ).toHaveAttribute("aria-pressed", "true");
  await surfaceGroup.getByRole("button", { name: "Farm" }).click();
  await expect(
    surfaceGroup.getByRole("button", { name: "Farm" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("img", { name: "Farm product surface visual" }),
  ).toBeVisible();

  await page
    .locator(".t7-navigation-menu-trailing")
    .getByRole("button", { name: "Explore the system", exact: true })
    .click();
  await expect(page).toHaveURL(/\/public-showcase#showcase-features$/);

  await page.getByRole("link", { name: "Components", exact: true }).click();
  await expect(page).toHaveURL(/\/components$/);
});
