import { expect, test } from "@playwright/test";

test.describe("bundled Iconify Solar library", () => {
  test("exposes one cohesive Bold Duotone family without horizontal overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/icons");

    const catalog = page.locator(".iconify-catalog-section");
    await expect(catalog).toHaveAttribute("data-iconify-count", "1327");
    await expect(catalog).toHaveAttribute(
      "data-iconify-family",
      "bold-duotone",
    );
    await expect(
      page.getByRole("heading", { name: "Theme-aware duotone", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Solar Bold Duotone library",
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      catalog.getByRole("button", { name: "All", exact: true }),
    ).toHaveCount(0);
    await expect(
      catalog.getByRole("button", { name: "Linear", exact: true }),
    ).toHaveCount(0);
    const visibleNames = await catalog
      .locator("[data-icon-name]")
      .evaluateAll((nodes) =>
        nodes
          .map((node) => node.getAttribute("data-icon-name") ?? "")
          .filter(Boolean),
      );
    expect(visibleNames.length).toBeGreaterThan(0);
    expect(visibleNames.every((name) => name.endsWith("-bold-duotone"))).toBe(
      true,
    );
    await expect(catalog.locator(".iconify-icon-tile").first()).toBeVisible();
    await expect(catalog.locator(".iconify-icon-tile")).toHaveCount(96);

    const colorLabels = await page
      .locator(".iconify-theme-controls .t7-field-label")
      .evaluateAll((labels) =>
        labels.map((label) => ({
          text: label.textContent?.trim() ?? "",
          clientWidth: label.clientWidth,
          scrollWidth: label.scrollWidth,
        })),
      );
    expect(colorLabels.length).toBe(2);
    expect(
      colorLabels.every(
        ({ clientWidth, scrollWidth }) => scrollWidth <= clientWidth,
      ),
    ).toBe(true);

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("searches the fixed family, copies a local name, and routes custom duotone paint", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/icons");

    const catalog = page.locator(".iconify-catalog-section");
    await page.getByLabel("Search Solar Bold Duotone icons").fill("home-angle");
    await expect(
      catalog.getByRole("button", {
        name: "Copy Solar icon home-angle-bold-duotone",
        exact: true,
      }),
    ).toBeVisible();
    expect(await catalog.locator(".iconify-icon-tile").count()).toBeGreaterThan(
      0,
    );

    await catalog
      .getByRole("button", {
        name: "Copy Solar icon home-angle-bold-duotone",
        exact: true,
      })
      .click();
    await expect(
      page.getByRole("status").filter({ hasText: "Solar icon copied" }),
    ).toBeVisible();

    const paint = await page
      .locator('[data-icon-name="home-angle-bold-duotone"]')
      .first()
      .evaluate((element) => ({
        body: element.innerHTML,
        style: element.getAttribute("style"),
      }));
    expect(paint.body).toContain("--t7-icon-primary");
    expect(paint.body).toContain("--t7-icon-accent");
    expect(paint.style).toBeNull();

    const mainColor = page.getByLabel("Duotone main color");
    await mainColor.evaluate((element) => {
      const input = element as HTMLInputElement;
      const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value",
      )?.set;
      setter?.call(input, "#123456");
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await expect(mainColor).toHaveValue("#123456");
    await expect(
      page
        .locator(
          '[data-iconify-preview] [data-icon-name="home-angle-bold-duotone"]',
        )
        .first(),
    ).toHaveAttribute("style", /--t7-icon-primary: #123456/);

    const accentColor = page.getByLabel("Duotone accent color");
    await accentColor.evaluate((element) => {
      const input = element as HTMLInputElement;
      const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value",
      )?.set;
      setter?.call(input, "#abcdef");
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await expect(accentColor).toHaveValue("#abcdef");
    await expect(
      page
        .locator(
          '[data-iconify-preview] [data-icon-name="home-angle-bold-duotone"]',
        )
        .first(),
    ).toHaveAttribute("style", /--t7-icon-accent: #abcdef/);

    await page.getByLabel("Search Solar Bold Duotone icons").fill("bot");
    await expect(
      catalog.getByRole("button", {
        name: "Copy Solar icon bot-bold-duotone",
        exact: true,
      }),
    ).toBeVisible();
    const mixedDuotoneBody = await catalog
      .locator('[data-icon-name="bot-bold-duotone"]')
      .first()
      .innerHTML();
    expect(mixedDuotoneBody).toContain('fill="var(--t7-icon-accent');
  });
});
