import { expect, test } from "@playwright/test";

async function rootOverflow(page: import("@playwright/test").Page) {
  return page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
}

async function openAdvancedAuthoring(page: import("@playwright/test").Page) {
  const trigger = page
    .locator(".studio-advanced-authoring")
    .getByRole("button", { name: /Advanced theme authoring/i });
  if ((await trigger.getAttribute("aria-expanded")) !== "true")
    await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
}

test.describe("end-to-end hardening regressions", () => {
  test("the embedded App Shell preview preserves the catalog landmark boundary", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1186, height: 698 });
    await page.goto("/components/app-shell");

    await expect(
      page.getByRole("heading", { name: "App Shell" }),
    ).toBeVisible();
    await expect(page.locator("main")).toHaveCount(1);
  });

  test("Theme Studio changes global-control layout before the narrow control columns collide", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 480, height: 844 });
    await page.goto("/theme-studio");
    await openAdvancedAuthoring(page);

    const geometry = await page
      .locator(".studio-controls-grid")
      .evaluate((grid) => {
        const children = Array.from(grid.children).map((child) => {
          const rect = child.getBoundingClientRect();
          return { left: Math.round(rect.left), width: Math.round(rect.width) };
        });
        return {
          columns: getComputedStyle(grid)
            .gridTemplateColumns.split(" ")
            .filter(Boolean).length,
          children,
        };
      });

    expect(geometry.columns).toBe(1);
    expect(new Set(geometry.children.map((child) => child.left)).size).toBe(1);
    expect(await rootOverflow(page)).toBeLessThanOrEqual(1);
  });

  test("Component Lab keeps its form controls in a canonical FormSection without an outer card", async ({
    page,
  }) => {
    await page.goto("/component-lab");

    const formSection = page.locator(
      ".component-proof-grid-form > .component-proof-form-section",
    );
    await expect(formSection).toHaveCount(1);
    await expect(
      page.locator(".component-proof-grid-form > :first-child.t7-card"),
    ).toHaveCount(0);
    await expect(
      formSection.getByRole("combobox", { name: "Owner" }),
    ).toBeVisible();
  });

  test("Ebook Store changes to its compact catalog layout before its toolbar can clip", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 840, height: 900 });
    await page.goto("/ebook-store");

    await expect(page.locator(".ebook-filter-rail")).toHaveCSS(
      "display",
      "none",
    );
    const toolbar = await page
      .locator(".ebook-results-search-row")
      .evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return {
          columns: getComputedStyle(element)
            .gridTemplateColumns.split(" ")
            .filter(Boolean).length,
          right: rect.right,
          viewport: window.innerWidth,
        };
      });
    expect(toolbar.columns).toBe(1);
    expect(toolbar.right).toBeLessThanOrEqual(toolbar.viewport + 1);
    expect(await rootOverflow(page)).toBeLessThanOrEqual(1);
  });

  test("mobile public navigation retains touch-safe controls after it wraps", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const route of ["/public-showcase", "/ebook-store"]) {
      await page.goto(route);
      const geometry = await page
        .locator(
          ".t7-public-shell .t7-navigation-menu-items > ul > li > [role='menuitem']",
        )
        .evaluateAll((items) =>
          items.map((item) => ({
            height: item.getBoundingClientRect().height,
            width: item.getBoundingClientRect().width,
          })),
        );

      expect(
        geometry.length,
        route + " should expose public navigation",
      ).toBeGreaterThan(0);
      for (const item of geometry) {
        expect(item.height).toBeGreaterThanOrEqual(44);
        expect(item.width).toBeGreaterThan(0);
      }
      const actionSelector =
        route === "/public-showcase"
          ? ".t7-public-shell .t7-navigation-menu-trailing > .t7-button"
          : ".t7-public-shell .ebook-store-actions > .t7-button, .t7-public-shell .t7-cart-trigger";
      const trailingActions = await page
        .locator(actionSelector)
        .evaluateAll((items) =>
          items
            .map((item) => ({
              height: item.getBoundingClientRect().height,
              width: item.getBoundingClientRect().width,
            }))
            .filter((item) => item.height > 0 && item.width > 0),
        );
      expect(
        trailingActions.length,
        route + " should expose a public trailing action",
      ).toBeGreaterThan(0);
      for (const action of trailingActions) {
        expect(action.height).toBeGreaterThanOrEqual(40);
        expect(action.width).toBeGreaterThan(0);
      }
      expect(await rootOverflow(page)).toBeLessThanOrEqual(1);
    }
  });

  test("Theme Studio keeps its icon-only command search touch-safe on mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/theme-studio");

    const search = page.getByRole("button", {
      name: "Search ten4seven catalog",
    });
    const box = await search.boundingBox();

    expect(box).not.toBeNull();
    expect(box?.width).toBeGreaterThanOrEqual(40);
    expect(box?.height).toBeGreaterThanOrEqual(40);
    expect(await rootOverflow(page)).toBeLessThanOrEqual(1);
  });

  test("static reference cards stay visually calm while interactive cards remain explicit", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1186, height: 698 });
    await page.goto("/tokens");

    const staticCard = page
      .locator(".foundation-surface-grid .t7-metric-card")
      .first();
    await expect(staticCard).not.toHaveAttribute("data-interactive");
    await staticCard.hover();
    await expect(staticCard).toHaveCSS("transform", "none");
  });

  test("Operations uses one product identity at mobile size without removing its navigation", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/operations-tracker");

    await expect(
      page.locator(".operations-app-shell .t7-app-topbar"),
    ).toBeVisible();
    await page
      .getByRole("button", { name: "Open application navigation" })
      .click();
    await expect(
      page
        .getByRole("dialog", { name: "Application navigation" })
        .getByRole("navigation", { name: "Application navigation" }),
    ).toBeVisible();
    expect(await rootOverflow(page)).toBeLessThanOrEqual(1);
  });

  test("Operations gives selected KPI signals strong canonical card surfaces", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/operations-tracker");

    const cluster = page.locator("#operations-health-summary");
    await expect(cluster).toHaveAttribute("data-variant", "cards");
    await expect(cluster.locator(".t7-kpi-item")).toHaveCount(4);
    await expect(
      cluster.locator('.t7-kpi-item[data-emphasis="solid"]'),
    ).toHaveCount(4);

    const geometry = await cluster.evaluate((element) => {
      const items = Array.from(
        element.querySelectorAll<HTMLElement>(".t7-kpi-item"),
      );
      return {
        colorways: items.map((item) => item.dataset.colorway),
        foregrounds: items.map((item) => getComputedStyle(item).color),
        gap: Number.parseFloat(getComputedStyle(element).columnGap),
        iconForegrounds: items.map(
          (item) => getComputedStyle(item.querySelector("svg")!).color,
        ),
        solidBackgrounds: items.map(
          (item) => getComputedStyle(item).backgroundColor,
        ),
      };
    });

    expect(geometry.colorways).toEqual(["1", "3", "2", "4"]);
    expect(geometry.gap).toBeGreaterThanOrEqual(8);
    expect(new Set(geometry.solidBackgrounds).size).toBe(4);
    for (const color of [...geometry.foregrounds, ...geometry.iconForegrounds])
      expect(color).toBe("rgb(255, 255, 255)");

    const graphicalCues = await cluster
      .locator(".t7-kpi-item")
      .evaluateAll((items) =>
        items.map((item) => {
          const trend = item.querySelector<HTMLElement>(".t7-trend-indicator");
          const sparkline = item.querySelector<SVGElement>(".t7-sparkline");
          const line = item.querySelector<SVGPathElement>(".t7-sparkline-line");
          const endpoint = item.querySelector<SVGLineElement>(
            ".t7-sparkline-point",
          );
          return {
            chartWidth: sparkline?.getBoundingClientRect().width ?? 0,
            direction: trend?.dataset.direction,
            endpointStrokeWidth: endpoint
              ? getComputedStyle(endpoint).strokeWidth
              : undefined,
            endpointTag: endpoint?.tagName,
            hasFooter: Boolean(item.querySelector(".t7-kpi-item-footer")),
            hasProgress: Boolean(item.querySelector(".t7-progress")),
            hasRevealClip: Boolean(item.querySelector(".t7-sparkline-reveal")),
            metricRole: item
              .querySelector(".t7-kpi-item-value [data-t7-type]")
              ?.getAttribute("data-t7-type"),
            sentiment: trend?.dataset.sentiment,
            stroke: line ? getComputedStyle(line).stroke : undefined,
          };
        }),
      );
    expect(graphicalCues.map((cue) => cue.direction)).toEqual([
      "up",
      "down",
      "up",
      "up",
    ]);
    expect(graphicalCues.map((cue) => cue.sentiment)).toEqual([
      "neutral",
      "positive",
      "warning",
      "neutral",
    ]);
    expect(graphicalCues.filter((cue) => cue.chartWidth > 0)).toHaveLength(2);
    expect(graphicalCues[2].hasProgress).toBe(true);
    expect(graphicalCues[3].hasFooter).toBe(true);
    expect(graphicalCues.map((cue) => cue.metricRole)).toEqual([
      "metric-lg",
      "metric-lg",
      "metric-lg",
      "metric-lg",
    ]);
    for (const cue of graphicalCues.filter((item) => item.chartWidth > 0)) {
      expect(cue.endpointTag).toBe("line");
      expect(cue.endpointStrokeWidth).toBe("8px");
    }
    expect(
      graphicalCues
        .filter((cue) => cue.chartWidth > 0)
        .every(
          (cue) => cue.hasRevealClip && cue.stroke === "rgb(255, 255, 255)",
        ),
    ).toBe(true);

    const milestoneButton = page
      .locator(
        '.t7-milestone-item:not([data-selected="true"]) .t7-milestone-button',
      )
      .first();
    await milestoneButton.hover();
    const neutralBackground = await milestoneButton.evaluate((element) => {
      const styles = getComputedStyle(element);
      const probe = document.createElement("span");
      probe.style.backgroundColor = `hsl(${styles.getPropertyValue("--t7-surface-raised-hsl")})`;
      document.body.append(probe);
      const background = getComputedStyle(probe).backgroundColor;
      probe.remove();
      return background;
    });
    await expect(milestoneButton).toHaveCSS(
      "background-color",
      neutralBackground,
    );
    await expect(milestoneButton).not.toHaveCSS("box-shadow", "none");
    expect(await rootOverflow(page)).toBeLessThanOrEqual(1);

    await page.setViewportSize({ width: 390, height: 844 });
    const mobileCues = await cluster
      .locator(".t7-kpi-item")
      .evaluateAll((items) =>
        items.map((item) => ({
          card: item.getBoundingClientRect().width,
          chart:
            item
              .querySelector<SVGElement>(".t7-sparkline")
              ?.getBoundingClientRect().width ?? 0,
        })),
      );
    expect(mobileCues.every((cue) => cue.card >= 300)).toBe(true);
    expect(
      mobileCues
        .filter((cue) => cue.chart > 0)
        .every((cue) => cue.chart >= 300),
    ).toBe(true);
    expect(await rootOverflow(page)).toBeLessThanOrEqual(1);
  });

  test("stateful workflow and selection surfaces keep color, spacing, and geometry stable", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/operations-tracker");

    const selectedMilestone = page.locator(
      '.t7-milestone-item[data-selected="true"] .t7-milestone-button',
    );
    const milestoneAppearance = await selectedMilestone.evaluate((element) => {
      const styles = getComputedStyle(element);
      return {
        backgroundColor: styles.backgroundColor,
        backgroundImage: styles.backgroundImage,
        color: styles.color,
        iconColor: getComputedStyle(element.querySelector("svg")!).color,
        meter: getComputedStyle(
          element.querySelector(".t7-milestone-meter-value")!,
        ).backgroundColor,
      };
    });
    expect(milestoneAppearance.backgroundImage).toContain("linear-gradient");
    expect(milestoneAppearance.color).toBe("rgb(255, 255, 255)");
    expect(milestoneAppearance.iconColor).toBe("rgb(255, 255, 255)");
    expect(milestoneAppearance.meter).toBe("rgb(255, 255, 255)");
    expect(milestoneAppearance.backgroundColor).not.toBe("rgb(255, 255, 255)");

    const workflowSpacing = await page
      .locator(".t7-milestone-tracker")
      .evaluate((tracker) => {
        const detail = tracker.querySelector<HTMLElement>(
          ".t7-milestone-detail",
        )!;
        const filter = document.querySelector<HTMLElement>(
          ".operations-filter-toolbar",
        )!;
        return (
          filter.getBoundingClientRect().top -
          detail.getBoundingClientRect().bottom
        );
      });
    expect(workflowSpacing).toBeGreaterThanOrEqual(16);

    const bulkBar = page.locator(
      ".operations-queue-section .t7-bulk-action-bar",
    );
    const table = page.locator(".operations-queue-section .t7-table-wrap");
    const documentTop = (locator: import("@playwright/test").Locator) =>
      locator.evaluate(
        (element) => element.getBoundingClientRect().top + scrollY,
      );
    expect(await bulkBar).toHaveAttribute("data-empty", "true");
    const initialTableTop = await documentTop(table);

    const rowChecks = page.locator(
      ".operations-queue-section .t7-table tbody .t7-table-checkbox-cell input",
    );
    await rowChecks.nth(0).check();
    await rowChecks.nth(1).check();
    await expect(bulkBar).toHaveAttribute("data-active", "true");
    await expect(bulkBar).toContainText("2 workstreams selected");
    await expect(bulkBar).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(bulkBar).toHaveCSS("background-image", /linear-gradient/);

    const selectedTableTop = await documentTop(table);
    expect(Math.abs(selectedTableTop - initialTableTop)).toBeLessThanOrEqual(1);

    await bulkBar.getByRole("button", { name: "Clear" }).click();
    await expect(bulkBar).toHaveAttribute("data-empty", "true");
    const clearedTableTop = await documentTop(table);
    expect(Math.abs(clearedTableTop - initialTableTop)).toBeLessThanOrEqual(1);

    await page.goto("/component-lab");
    const currentStep = page.locator(
      '.component-proof-stepper li[data-state="current"] > span',
    );
    await expect(currentStep).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(currentStep).toHaveCSS("background-image", /linear-gradient/);
    await expect(currentStep.locator(".t7-stepper-indicator")).toHaveCSS(
      "color",
      "rgb(255, 255, 255)",
    );
    expect(await rootOverflow(page)).toBeLessThanOrEqual(1);
  });

  test("native modal and drawer backdrops never exceed the narrow viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/component-lab");

    await page
      .getByRole("button", { name: "Open nested modal fixture" })
      .click();
    const modalGeometry = await page
      .locator(".t7-modal-backdrop[open]")
      .evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return { left: rect.left, right: rect.right, width: innerWidth };
      });
    expect(modalGeometry.left).toBeGreaterThanOrEqual(0);
    expect(modalGeometry.right).toBeLessThanOrEqual(modalGeometry.width);
    await page.getByRole("button", { name: "Close dialog" }).click();

    await page.getByRole("button", { name: "Open date drawer" }).click();
    const drawerGeometry = await page
      .locator(".t7-drawer-backdrop[open]")
      .evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return { left: rect.left, right: rect.right, width: innerWidth };
      });
    expect(drawerGeometry.left).toBeGreaterThanOrEqual(0);
    expect(drawerGeometry.right).toBeLessThanOrEqual(drawerGeometry.width);
  });

  test("sliders, filter removal, and carousel indicators keep compact visuals with usable hit areas", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 800 });

    await page.goto("/theme-studio");
    await openAdvancedAuthoring(page);
    const themeSliderHeights = await page
      .locator(".studio-controls-card input.t7-slider")
      .evaluateAll((items) =>
        items.map((item) => item.getBoundingClientRect().height),
      );
    expect(themeSliderHeights).toHaveLength(2);
    for (const height of themeSliderHeights)
      expect(height).toBeGreaterThanOrEqual(32);

    await page.goto("/component-lab");
    const filterRemove = page.locator(".t7-filter-chip button").first();
    await expect(filterRemove).toBeVisible();
    expect((await filterRemove.boundingBox())?.height).toBeGreaterThanOrEqual(
      24,
    );

    await page.goto("/public-showcase");
    const carouselIndicator = page.locator(".t7-carousel-indicator").first();
    await expect(carouselIndicator).toBeVisible();
    const indicatorBox = await carouselIndicator.boundingBox();
    expect(indicatorBox?.height).toBeGreaterThanOrEqual(32);
    expect(indicatorBox?.width).toBeGreaterThanOrEqual(32);
  });
});
