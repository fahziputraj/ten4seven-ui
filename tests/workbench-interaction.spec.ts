import { expect, test } from "@playwright/test";

async function assertInsideViewport(
  locator: import("@playwright/test").Locator,
  page: import("@playwright/test").Page,
) {
  const rect = await locator.evaluate((element) => {
    const box = element.getBoundingClientRect();
    return {
      bottom: box.bottom,
      left: box.left,
      right: box.right,
      top: box.top,
    };
  });
  const viewport = await page.evaluate(() => ({
    height: innerHeight,
    width: innerWidth,
  }));
  expect(rect.left).toBeGreaterThanOrEqual(0);
  expect(rect.top).toBeGreaterThanOrEqual(0);
  expect(rect.right).toBeLessThanOrEqual(viewport.width);
  expect(rect.bottom).toBeLessThanOrEqual(viewport.height);
}

test.describe("workbench documentation and overlay integrity", () => {
  test("shared headers keep a bounded action rail at desktop and narrow widths", async ({
    page,
  }) => {
    for (const viewport of [
      { height: 844, width: 390 },
      { height: 900, width: 1440 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/component-lab");

      const headerGeometry = await page
        .locator(".studio-topbar")
        .evaluate((header) => {
          const search = header.querySelector<HTMLElement>(
            ".studio-search-trigger",
          )!;
          const settings =
            header.querySelector<HTMLElement>(".studio-top-icon")!;
          const box = header.getBoundingClientRect();
          return {
            documentOverflow: Math.max(
              document.documentElement.scrollWidth - innerWidth,
              0,
            ),
            header: { height: box.height, width: box.width },
            search: search.getBoundingClientRect(),
            settings: settings.getBoundingClientRect(),
          };
        });

      expect(headerGeometry.documentOverflow).toBe(0);
      expect(headerGeometry.header.height).toBeGreaterThanOrEqual(60);
      expect(headerGeometry.search.height).toBeGreaterThanOrEqual(36);
      expect(headerGeometry.settings.height).toBeGreaterThanOrEqual(36);
      expect(headerGeometry.settings.right).toBeLessThanOrEqual(viewport.width);
    }
  });

  test("surface expression keeps paper neutral and applies bounded emphasis", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/component-lab");

    const fixture = page.locator("[aria-label='Canonical surface expression']");
    await expect(fixture).toBeVisible();
    const treatments = await fixture.evaluate((element) => {
      const provider = document.querySelector<HTMLElement>(".t7-provider")!;
      return {
        canvas: getComputedStyle(provider)
          .getPropertyValue("--t7-background-hsl")
          .trim(),
        kpiTokens: {
          chartHeight: getComputedStyle(provider)
            .getPropertyValue("--t7-kpi-chart-height")
            .trim(),
          iconContainer: getComputedStyle(provider)
            .getPropertyValue("--t7-kpi-icon-container")
            .trim(),
          iconSize: getComputedStyle(provider)
            .getPropertyValue("--t7-kpi-icon-size")
            .trim(),
          padding: getComputedStyle(provider)
            .getPropertyValue("--t7-kpi-padding")
            .trim(),
        },
        cards: Array.from(
          element.querySelectorAll<HTMLElement>("[data-surface-treatment]"),
        ).map((card) => ({
          background: getComputedStyle(card).backgroundColor,
          colorway: card.dataset.colorway,
          color: getComputedStyle(card).color,
          iconColor: card.querySelector("svg")
            ? getComputedStyle(card.querySelector("svg")!).color
            : undefined,
          treatment: card.dataset.surfaceTreatment,
        })),
      };
    });

    expect(treatments.canvas).toBe("0 0% 100%");
    expect(treatments.kpiTokens).toEqual({
      chartHeight: "52px",
      iconContainer: "24px",
      iconSize: "22px",
      padding: "20px",
    });
    expect(treatments.cards.map((card) => card.treatment)).toEqual([
      "plain",
      "soft",
      "solid",
      "inverse",
    ]);
    expect(treatments.cards[0].background).not.toBe(
      treatments.cards[1].background,
    );
    expect(treatments.cards[2].background).not.toBe(
      treatments.cards[0].background,
    );
    expect(treatments.cards[2].colorway).toBe("2");
    expect(treatments.cards[2].color).toBe("rgb(255, 255, 255)");
    expect(treatments.cards[2].iconColor).toBe("rgb(255, 255, 255)");
    expect(treatments.cards[2].color).not.toBe(treatments.cards[0].color);
    expect(treatments.cards[3].background).not.toBe(
      treatments.cards[0].background,
    );
    expect(treatments.cards[3].color).not.toBe(treatments.cards[0].color);

    const colorwayProof = await fixture
      .getByLabel("Chart-linked surface colorways")
      .evaluate((element) =>
        Array.from(
          element.querySelectorAll<HTMLElement>(".t7-kpi-item[data-colorway]"),
        ).map((surface) => {
          const cardBox = surface.getBoundingClientRect();
          const chart = surface.querySelector<SVGElement>(".t7-sparkline");
          const chartBox = chart?.getBoundingClientRect();
          const footer = surface.querySelector<HTMLElement>(
            ".t7-kpi-item-footer",
          );
          const progress = surface.querySelector<HTMLElement>(
            ".t7-kpi-item-progress",
          );
          return {
            background: getComputedStyle(surface).backgroundColor,
            backgroundImage: getComputedStyle(surface).backgroundImage,
            chartDasharray: surface.querySelector<SVGPathElement>(
              ".t7-sparkline-line",
            )
              ? getComputedStyle(
                  surface.querySelector<SVGPathElement>(".t7-sparkline-line")!,
                ).strokeDasharray
              : undefined,
            chartInsets: chartBox
              ? {
                  bottom: cardBox.bottom - chartBox.bottom,
                  left: chartBox.left - cardBox.left,
                  right: cardBox.right - chartBox.right,
                }
              : undefined,
            chartPlacement: surface.dataset.chartPlacement,
            chartStroke: surface.querySelector<SVGPathElement>(
              ".t7-sparkline-line",
            )
              ? getComputedStyle(
                  surface.querySelector<SVGPathElement>(".t7-sparkline-line")!,
                ).stroke
              : undefined,
            color: getComputedStyle(surface).color,
            colorway: surface.dataset.colorway,
            direction: surface.querySelector<HTMLElement>(".t7-trend-indicator")
              ?.dataset.direction,
            footerBottomInset: footer
              ? cardBox.bottom - footer.getBoundingClientRect().bottom
              : undefined,
            hasFooter: Boolean(footer),
            hasProgress: Boolean(progress),
            hasRevealClip: Boolean(
              surface.querySelector(".t7-sparkline-reveal"),
            ),
            iconBackground: getComputedStyle(
              surface.querySelector<HTMLElement>(".t7-kpi-item-icon")!,
            ).backgroundColor,
            iconWidth: surface
              .querySelector<SVGElement>(".t7-kpi-item-icon svg")!
              .getBoundingClientRect().width,
            progressBottomInset: progress
              ? cardBox.bottom - progress.getBoundingClientRect().bottom
              : undefined,
            sentiment: surface.querySelector<HTMLElement>(".t7-trend-indicator")
              ?.dataset.sentiment,
          };
        }),
      );
    expect(colorwayProof.map((surface) => surface.colorway)).toEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
    ]);
    expect(colorwayProof.map((surface) => surface.direction)).toEqual([
      "up",
      undefined,
      "down",
      "down",
      "up",
    ]);
    expect(colorwayProof[2].sentiment).toBe("positive");
    expect(colorwayProof[3].sentiment).toBe("positive");
    expect(colorwayProof[1].hasProgress).toBe(true);
    expect(colorwayProof.filter((surface) => surface.hasProgress)).toHaveLength(
      1,
    );
    expect(colorwayProof[3].chartPlacement).toBe("bottom");
    expect(colorwayProof[4].hasFooter).toBe(true);
    expect(colorwayProof[4].hasProgress).toBe(false);
    expect(
      colorwayProof.every(
        (surface) =>
          surface.iconBackground === "rgba(0, 0, 0, 0)" &&
          surface.iconWidth === 22,
      ),
    ).toBe(true);
    expect(colorwayProof.filter((surface) => surface.chartStroke).length).toBe(
      3,
    );
    expect(
      colorwayProof
        .filter((surface) => surface.chartDasharray)
        .every(
          (surface) =>
            surface.chartDasharray === "none" && surface.hasRevealClip,
        ),
    ).toBe(true);
    for (const surface of colorwayProof.filter(
      (item) => item.chartPlacement === "bottom",
    )) {
      expect(surface.chartInsets?.left).toBeGreaterThanOrEqual(19);
      expect(surface.chartInsets?.right).toBeGreaterThanOrEqual(19);
      expect(surface.chartInsets?.bottom).toBeGreaterThanOrEqual(19);
    }
    expect(colorwayProof[1].progressBottomInset).toBeGreaterThanOrEqual(19);
    expect(colorwayProof[4].footerBottomInset).toBeGreaterThanOrEqual(19);
    expect(
      new Set(colorwayProof.map((surface) => surface.background)).size,
    ).toBe(5);
    expect(
      colorwayProof.every(
        (surface) =>
          surface.color === "rgb(255, 255, 255)" &&
          surface.backgroundImage !== "none",
      ),
    ).toBe(true);
    expect(
      colorwayProof
        .filter((surface) => surface.chartStroke)
        .every((surface) => surface.chartStroke === "rgb(255, 255, 255)"),
    ).toBe(true);

    await page.setViewportSize({ height: 844, width: 390 });
    const mobileCoverage = fixture
      .getByLabel("Chart-linked surface colorways")
      .locator(".t7-kpi-item")
      .first();
    await mobileCoverage.scrollIntoViewIfNeeded();
    const mobileChartGeometry = await mobileCoverage.evaluate((surface) => {
      const cardBox = surface.getBoundingClientRect();
      const chart = surface.querySelector<SVGSVGElement>(".t7-sparkline")!;
      const chartBox = chart.getBoundingClientRect();
      const path = chart.querySelector<SVGPathElement>(".t7-sparkline-line")!;
      const chartPoint = chart.createSVGPoint();
      const matrix = path.getScreenCTM()!;
      const first = path.getPointAtLength(0);
      const last = path.getPointAtLength(path.getTotalLength());
      chartPoint.x = first.x;
      chartPoint.y = first.y;
      const start = chartPoint.matrixTransform(matrix);
      chartPoint.x = last.x;
      chartPoint.y = last.y;
      const end = chartPoint.matrixTransform(matrix);

      return {
        cardWidth: cardBox.width,
        chartLeftInset: chartBox.left - cardBox.left,
        chartRightInset: cardBox.right - chartBox.right,
        chartWidth: chartBox.width,
        curveLeftInset: start.x - cardBox.left,
        curveRightInset: cardBox.right - end.x,
      };
    });
    expect(mobileChartGeometry.cardWidth).toBeGreaterThanOrEqual(350);
    expect(mobileChartGeometry.chartWidth).toBeGreaterThanOrEqual(325);
    expect(mobileChartGeometry.chartLeftInset).toBeGreaterThanOrEqual(13);
    expect(mobileChartGeometry.chartRightInset).toBeGreaterThanOrEqual(13);
    expect(mobileChartGeometry.curveLeftInset).toBeGreaterThanOrEqual(25);
    expect(mobileChartGeometry.curveRightInset).toBeGreaterThanOrEqual(25);
    expect(mobileChartGeometry.curveLeftInset).toBeLessThanOrEqual(32);
    expect(mobileChartGeometry.curveRightInset).toBeLessThanOrEqual(32);
  });

  test("sparkline settles its terminal marker with a restrained normal-motion pulse", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/component-lab");

    const sparkline = page
      .locator("[aria-label='Canonical surface expression'] .t7-sparkline")
      .first();
    await sparkline.scrollIntoViewIfNeeded();
    await expect(sparkline).toHaveAttribute("data-chart-visible", "true");

    const endpointMotion = await sparkline.evaluate(async (element) => {
      const point = element.querySelector<SVGLineElement>(
        ".t7-sparkline-point",
      )!;
      const deadline = performance.now() + 900;
      let maxScale = 0;

      while (performance.now() < deadline) {
        const transform = getComputedStyle(point).transform;
        const scale =
          transform === "none"
            ? 0
            : Number(transform.split("(")[1].split(",")[0]);
        maxScale = Math.max(maxScale, scale);
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve()),
        );
      }

      return {
        maxScale,
        opacity: getComputedStyle(point).opacity,
        transform: getComputedStyle(point).transform,
      };
    });

    expect(endpointMotion.maxScale).toBeGreaterThan(1.04);
    expect(endpointMotion.opacity).toBe("1");
    expect(endpointMotion.transform).toBe("matrix(1, 0, 0, 1, 0, 0)");
  });

  test("sparkline reveal remains one continuous clipped series and resolves under reduced motion", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        "ten4seven.playground.runtime-preferences.v1",
        JSON.stringify({ motion: "reduced" }),
      );
    });
    await page.goto("/component-lab");

    const fixture = page.locator("[aria-label='Canonical surface expression']");
    const sparkline = fixture.locator(".t7-sparkline").first();
    await sparkline.scrollIntoViewIfNeeded();
    await expect(sparkline).toHaveAttribute("data-chart-visible", "true");
    await expect
      .poll(() =>
        sparkline.evaluate((element) => {
          const reveal = element.querySelector<SVGElement>(
            ".t7-sparkline-reveal",
          )!;
          const line =
            element.querySelector<SVGPathElement>(".t7-sparkline-line")!;
          const point = element.querySelector<SVGLineElement>(
            ".t7-sparkline-point",
          )!;
          return {
            clip: element.querySelector("g")?.getAttribute("clip-path"),
            dasharray: getComputedStyle(line).strokeDasharray,
            pointStrokeWidth: getComputedStyle(point).strokeWidth,
            pointTag: point.tagName,
            pointOpacity: getComputedStyle(point).opacity,
            revealTransform: getComputedStyle(reveal).transform,
          };
        }),
      )
      .toEqual({
        clip: expect.stringContaining("sparkline-reveal"),
        dasharray: "none",
        pointStrokeWidth: "8px",
        pointTag: "line",
        pointOpacity: "1",
        revealTransform: "matrix(1, 0, 0, 1, 0, 0)",
      });
  });

  test("components is one shallow, anchor-addressable catalog document", async ({
    page,
  }) => {
    await page.goto("/components#component-family-commerce");
    await expect(
      page.getByRole("heading", { name: "Commerce", exact: true }),
    ).toBeVisible();
    await expect(page.locator(".studio-component-leaves")).toHaveCount(0);
    await expect(
      page.locator(".studio-sidebar .studio-component-family-list a"),
    ).toHaveCount(0);
    await expect(page.locator(".studio-sidebar")).toContainText("Library");
    await page
      .locator(".studio-sidebar")
      .getByRole("button", { name: "Library", exact: true })
      .click();
    const libraryMenu = page.locator(
      "#t7-overlay-root .studio-library-popover",
    );
    await expect(libraryMenu).toBeVisible();
    await expect(libraryMenu).toContainText("Blocks");
    await expect(libraryMenu).toContainText("Tokens");
    await expect(libraryMenu).toContainText("Recipes");
    await page.keyboard.press("Escape");
    await expect(page.locator(".catalog-family-anchors a")).toHaveCount(17);

    await page
      .locator(".catalog-family-anchors a")
      .filter({ hasText: "Patterns" })
      .click();
    await expect(page).toHaveURL(/\/components#component-family-pattern$/);
    await expect(
      page.getByRole("heading", { name: "Patterns", exact: true }),
    ).toBeVisible();
    expect(
      await page.locator(".studio-main").evaluate((element) => {
        const style = getComputedStyle(element);
        return style.overflow + style.overflowY;
      }),
    ).toMatch(/visible/);
  });

  test("select, combobox, and edge popups use the shared viewport layer", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/component-lab");

    const selectFixture = page.locator('[data-overlay-fixture="card-select"]');
    await selectFixture
      .getByRole("button", { name: "Fulfillment state" })
      .click();
    const selectPopup = page.locator("#t7-overlay-root .t7-select-list");
    await expect(selectPopup).toBeVisible();
    await assertInsideViewport(selectPopup, page);
    await expect(page.locator("#t7-overlay-root")).toContainText(
      "Ready to ship",
    );
    await page.keyboard.press("Escape");

    const comboboxFixture = page.locator(
      '[data-overlay-fixture="scroll-combobox"]',
    );
    await comboboxFixture.getByRole("combobox", { name: "Owner" }).click();
    const comboboxPopup = page.locator("#t7-overlay-root .t7-combobox-list");
    await expect(comboboxPopup).toBeVisible();
    await assertInsideViewport(comboboxPopup, page);
    await page.keyboard.press("Escape");

    const edgeFixture = page.locator('[data-overlay-fixture="edge-anchors"]');
    await edgeFixture.getByRole("button", { name: "Popover" }).click();
    const popover = page.locator("#t7-overlay-root .t7-popover");
    await expect(popover).toBeVisible();
    await assertInsideViewport(popover, page);
    expect(await popover.getAttribute("data-side")).toBe(
      await popover.getAttribute("data-floating-placement"),
    );
    const popoverGeometry = await popover.evaluate((element) => {
      const trigger = document
        .querySelector('[data-overlay-fixture="edge-anchors"] button')
        ?.getBoundingClientRect();
      const panel = element.getBoundingClientRect();
      return {
        clientHeight: element.clientHeight,
        panel,
        scrollHeight: element.scrollHeight,
        side: element.getAttribute("data-side"),
        trigger,
      };
    });
    expect(popoverGeometry.trigger).toBeTruthy();
    // A floating panel may scroll when it exceeds the viewport, but its own
    // intrinsic short content must never collapse because two opposing insets
    // are active at once.
    expect(
      popoverGeometry.scrollHeight - popoverGeometry.clientHeight,
    ).toBeLessThanOrEqual(1);
    if (popoverGeometry.side === "top") {
      expect(popoverGeometry.panel.bottom).toBeLessThanOrEqual(
        popoverGeometry.trigger!.top - 4,
      );
    }
    if (popoverGeometry.side === "bottom") {
      expect(popoverGeometry.panel.top).toBeGreaterThanOrEqual(
        popoverGeometry.trigger!.bottom + 4,
      );
    }
    await page.keyboard.press("Escape");

    const edgeGeometry = await edgeFixture.evaluate((element) => {
      const card = element.getBoundingClientRect();
      const preview = element
        .querySelector(".overlay-stress-edge-preview")!
        .getBoundingClientRect();
      const contracts = element
        .querySelector(".overlay-stress-edge-contracts")!
        .getBoundingClientRect();
      return { card, contracts, preview };
    });
    expect(edgeGeometry.preview.left).toBeGreaterThanOrEqual(
      edgeGeometry.card.left,
    );
    expect(edgeGeometry.preview.right).toBeLessThanOrEqual(
      edgeGeometry.card.right,
    );
    expect(edgeGeometry.contracts.right).toBeLessThanOrEqual(
      edgeGeometry.card.right,
    );
  });

  test("proof navigation keeps peer views and handoff checkpoints aligned", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 698, width: 1186 });
    await page.goto("/component-lab");

    const geometry = await page.evaluate(() => {
      const peer = document
        .querySelector(".component-proof-navigation-panel")!
        .getBoundingClientRect();
      const path = document
        .querySelector(".component-proof-path-panel")!
        .getBoundingClientRect();
      const stepper = document.querySelector(".component-proof-stepper ol")!;
      const columns = getComputedStyle(stepper)
        .gridTemplateColumns.split(" ")
        .filter(Boolean);
      return {
        columns,
        pathHeight: path.height,
        pathLeft: path.left,
        peerHeight: peer.height,
        peerRight: peer.right,
      };
    });

    expect(
      Math.abs(geometry.peerHeight - geometry.pathHeight),
    ).toBeLessThanOrEqual(1);
    expect(geometry.columns).toHaveLength(3);
    expect(geometry.pathLeft - geometry.peerRight).toBeGreaterThanOrEqual(12);
  });

  test("handoff connector stays centered and clear of checkpoint borders", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 698, width: 1186 });
    await page.goto("/component-lab");

    const desktop = await page.evaluate(() => {
      const stepper = document.querySelector<HTMLElement>(
        ".component-proof-stepper ol",
      );
      const cards = stepper
        ? [...stepper.querySelectorAll<HTMLElement>("li > span, li > button")]
        : [];
      const indicator = cards[0]?.querySelector<HTMLElement>(
        ".t7-stepper-indicator",
      );
      if (!stepper || cards.length !== 3 || !indicator) {
        throw new Error("Handoff stepper geometry is incomplete.");
      }

      const stepperRect = stepper.getBoundingClientRect();
      const indicatorRect = indicator.getBoundingClientRect();
      const line = getComputedStyle(stepper, "::before");
      return {
        backgroundColors: cards.map(
          (card) => getComputedStyle(card).backgroundColor,
        ),
        cardGap:
          cards[1].getBoundingClientRect().left -
          cards[0].getBoundingClientRect().right,
        indicatorCenter: indicatorRect.top + indicatorRect.height / 2,
        lineCenter:
          stepperRect.top +
          Number.parseFloat(line.top) +
          Number.parseFloat(line.height) / 2,
        lineHeight: Number.parseFloat(line.height),
      };
    });

    expect(desktop.cardGap).toBeGreaterThanOrEqual(10);
    expect(
      Math.abs(desktop.lineCenter - desktop.indicatorCenter),
    ).toBeLessThanOrEqual(1);
    expect(desktop.lineHeight).toBe(1);
    expect(
      desktop.backgroundColors.every((color) => color.startsWith("rgb(")),
    ).toBe(true);

    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/component-lab");

    const mobile = await page.evaluate(() => {
      const stepper = document.querySelector<HTMLElement>(
        ".component-proof-stepper ol",
      );
      const cards = stepper
        ? [...stepper.querySelectorAll<HTMLElement>("li > span, li > button")]
        : [];
      const indicator = cards[0]?.querySelector<HTMLElement>(
        ".t7-stepper-indicator",
      );
      if (!stepper || cards.length !== 3 || !indicator) {
        throw new Error("Mobile handoff stepper geometry is incomplete.");
      }

      const stepperRect = stepper.getBoundingClientRect();
      const indicatorRect = indicator.getBoundingClientRect();
      const line = getComputedStyle(stepper, "::before");
      return {
        backgroundColors: cards.map(
          (card) => getComputedStyle(card).backgroundColor,
        ),
        cardGap:
          cards[1].getBoundingClientRect().top -
          cards[0].getBoundingClientRect().bottom,
        indicatorCenter: indicatorRect.left + indicatorRect.width / 2,
        lineCenter:
          stepperRect.left +
          Number.parseFloat(line.left) +
          Number.parseFloat(line.width) / 2,
        lineWidth: Number.parseFloat(line.width),
      };
    });

    expect(mobile.cardGap).toBeGreaterThanOrEqual(10);
    expect(
      Math.abs(mobile.lineCenter - mobile.indicatorCenter),
    ).toBeLessThanOrEqual(1);
    expect(mobile.lineWidth).toBe(1);
    expect(
      mobile.backgroundColors.every((color) => color.startsWith("rgb(")),
    ).toBe(true);
  });

  test("data, progress, and media signals use a readable proof composition", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 698, width: 1186 });
    await page.goto("/component-lab");

    const signals = page.locator(".component-proof-signals-card");
    await expect(
      signals.getByRole("heading", {
        name: "Data, progress, and media signals",
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      signals.locator(".component-proof-signals-layout"),
    ).toBeVisible();
    await expect(signals.locator(".component-proof-signal-block")).toHaveCount(
      2,
    );
    await expect(
      signals.locator(".component-proof-signal-details"),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Native file selection", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("Media handoff stays client-side"),
    ).toBeVisible();
  });

  test("component lab charts keep readable scales and time uses the shared picker", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 698, width: 1186 });
    await page.goto("/component-lab");

    await expect(page.locator('input[type="time"]')).toHaveCount(0);
    const timeField = page.getByRole("combobox", { name: /Review time/ });
    await timeField.click();
    const timeOptions = page.getByRole("listbox", {
      name: "Review time options",
    });
    await expect(timeOptions).toBeVisible();
    await assertInsideViewport(timeOptions, page);
    const timeGeometry = await timeOptions.evaluate((element) => ({
      anchor: document.querySelector(".t7-time-picker")!.getBoundingClientRect()
        .width,
      width: element.getBoundingClientRect().width,
    }));
    expect(timeGeometry.width).toBeLessThanOrEqual(400);
    expect(timeGeometry.width).toBeLessThan(timeGeometry.anchor);
    await expect(
      page.getByRole("option", { name: "37 minutes", exact: true }),
    ).toHaveCount(1);
    await page.getByRole("option", { name: "10 hours", exact: true }).click();
    await page.getByRole("option", { name: "37 minutes", exact: true }).click();
    await page.getByRole("option", { name: "PM", exact: true }).click();
    await expect(timeField).toHaveValue("10:37 PM");
    await page.getByRole("button", { name: "Done", exact: true }).click();
    await expect(timeField).toHaveAttribute("aria-expanded", "false");

    const rangeTrigger = page.getByRole("button", { name: "Select dates" });
    await rangeTrigger.click();
    const rangePopup = page.locator("#t7-overlay-root .t7-date-picker-popover");
    await expect(rangePopup).toBeVisible();
    await assertInsideViewport(rangePopup, page);
    const rangeGeometry = await rangePopup.evaluate((element) => ({
      anchor: document
        .querySelector(".t7-date-range-trigger")!
        .getBoundingClientRect().width,
      width: element.getBoundingClientRect().width,
    }));
    expect(rangeGeometry.width).toBeLessThanOrEqual(360);
    expect(rangeGeometry.width).toBeLessThan(rangeGeometry.anchor);
    const rangeGap = await rangePopup.evaluate((element) => {
      const popup = element.getBoundingClientRect();
      const anchor = document
        .querySelector(".t7-date-range-trigger")!
        .getBoundingClientRect();
      return element.getAttribute("data-floating-placement") === "top"
        ? anchor.top - popup.bottom
        : popup.top - anchor.bottom;
    });
    expect(rangeGap).toBeGreaterThanOrEqual(4);
    await rangeTrigger.click();

    const line = page.locator('svg[aria-label="Line chart"]');
    const bar = page.locator('svg[aria-label="Bar chart"]');
    const donut = page.locator('svg[aria-label="Donut chart"]');
    await expect(line).toBeVisible();
    await expect(bar).toBeVisible();
    await expect(donut).toBeVisible();
    expect(
      await line
        .locator(".t7-chart-line")
        .first()
        .evaluate((element) => getComputedStyle(element).fill),
    ).toBe("none");
    expect(
      await donut
        .locator("circle")
        .nth(1)
        .evaluate((element) => getComputedStyle(element).fill),
    ).toBe("none");
    await expect(bar.locator(".t7-chart-gridline")).toHaveCount(5);
    await expect(line.locator(".t7-chart-area")).toHaveCount(2);
    await expect(line.locator(".t7-chart-point")).toHaveCount(10);
    await expect(bar.locator(".t7-chart-bar")).toHaveCount(4);
    await expect(donut.locator(".t7-donut-segment")).toHaveCount(3);
    await line.evaluate((element) =>
      element.closest(".t7-chart")?.scrollIntoView({
        block: "center",
        behavior: "instant",
      }),
    );
    await page.waitForTimeout(120);
    await expect(
      line.locator(
        "xpath=ancestor::div[contains(concat(' ', normalize-space(@class), ' '), ' t7-chart ')]",
      ),
    ).toHaveAttribute("data-chart-visible", "true");
    const chartMotion = await line
      .locator(".t7-chart-line")
      .first()
      .evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          animationName: style.animationName,
          animationDuration: style.animationDuration,
          inlineStrokeDashoffset: element.getAttribute("style") ?? "",
        };
      });
    // Chart entrance choreography is owned by the shared Anime.js adapter;
    // CSS must stay free of a second competing keyframe animation.
    expect(chartMotion.animationName).toBe("none");
    expect(chartMotion.animationDuration).toBe("0s");
    expect(chartMotion.inlineStrokeDashoffset).toContain("stroke-dashoffset");
    await page.waitForTimeout(360);
    const donutVisual = page.locator(
      ".component-proof-donut .t7-donut-chart-visual",
    );
    const donutMotion = await donutVisual.evaluate((element) => {
      const style = getComputedStyle(element);
      return { transform: style.transform, transition: style.transition };
    });
    expect(donutMotion.transition).toContain("transform");
    await donutVisual.hover();
    await expect
      .poll(() =>
        donutVisual.evaluate((element) => getComputedStyle(element).transform),
      )
      .not.toBe("none");
    await line.locator(".t7-chart-point").first().click({ force: true });
    const chartTooltip = page.locator(".t7-chart-tooltip");
    await expect(chartTooltip).toBeVisible();
    await expect(chartTooltip).toContainText("Coverage");
    await expect(chartTooltip).toContainText("42%");
    await assertInsideViewport(chartTooltip, page);
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(1);
  });

  test("MultiSelect keeps the selected check beside its option label", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 698, width: 1186 });
    await page.goto("/component-lab");

    await page.getByRole("button", { name: "Design", exact: true }).click();
    const selectedOption = page.locator(
      ".t7-multiselect-list [role=option][aria-selected=true]",
    );
    await expect(selectedOption).toHaveCount(1);
    const geometry = await selectedOption.evaluate((element) => {
      const row = element.getBoundingClientRect();
      const label = element
        .querySelector(".t7-option-copy")!
        .getBoundingClientRect();
      const icon = element.querySelector("svg")!.getBoundingClientRect();
      return {
        iconCenter: icon.y + icon.height / 2,
        iconLeft: icon.left,
        labelRight: label.right,
        rowCenter: row.y + row.height / 2,
      };
    });
    expect(geometry.iconLeft).toBeGreaterThanOrEqual(geometry.labelRight);
    expect(Math.abs(geometry.iconCenter - geometry.rowCenter)).toBeLessThan(6);
  });

  test("interactive floating surfaces replace one another", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 698, width: 1186 });
    await page.goto("/component-lab");

    const multiSelectPopup = page.locator(".t7-multiselect-list");
    await page.getByRole("button", { name: "Design", exact: true }).click();
    await expect(multiSelectPopup).toBeVisible();

    const datePickerPopup = page.locator(".t7-date-picker-popover");
    await page.getByRole("button", { name: "Open calendar" }).click();
    await expect(datePickerPopup).toBeVisible();
    await expect(multiSelectPopup).toHaveCount(0);

    const timeOptions = page.getByRole("listbox", {
      name: "Review time options",
    });
    await page.getByRole("combobox", { name: /Review time/ }).click();
    await expect(timeOptions).toBeVisible();
    await expect(datePickerPopup).toHaveCount(0);
  });

  test("Combobox keeps the selected check beside its option label", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 698, width: 1186 });
    await page.goto("/component-lab");

    await page.locator(".component-proof-grid-form .t7-combobox-input").click();
    const selectedOption = page.locator(
      ".t7-combobox-list [role=option][aria-selected=true]",
    );
    await expect(selectedOption).toHaveCount(1);
    const geometry = await selectedOption.evaluate((element) => {
      const row = element.getBoundingClientRect();
      const label = element
        .querySelector(".t7-combobox-option-copy")!
        .getBoundingClientRect();
      const icon = element.querySelector("svg")!.getBoundingClientRect();
      return {
        iconCenter: icon.y + icon.height / 2,
        iconLeft: icon.left,
        labelRight: label.right,
        rowCenter: row.y + row.height / 2,
      };
    });
    expect(geometry.iconLeft).toBeGreaterThanOrEqual(geometry.labelRight);
    expect(Math.abs(geometry.iconCenter - geometry.rowCenter)).toBeLessThan(6);
  });

  test("feedback proof keeps tooltip, menu, and toast surfaces readable", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 698, width: 1186 });
    await page.goto("/component-lab");

    const feedbackCard = page.locator(".component-proof-feedback-card");
    await expect(
      feedbackCard.getByRole("heading", {
        name: "Feedback, actions, and overlays",
      }),
    ).toBeVisible();
    await expect(
      feedbackCard.getByRole("heading", { name: "Ready for decision" }),
    ).toBeVisible();

    await feedbackCard
      .getByRole("button", { name: "More information" })
      .click();
    const tooltip = page.getByRole("tooltip", {
      name: "Supplemental context for this action.",
    });
    await expect(tooltip).toBeVisible();
    const tooltipGeometry = await tooltip.evaluate((element) => {
      const box = element.getBoundingClientRect();
      return {
        bottom: box.bottom,
        height: box.height,
        left: box.left,
        right: box.right,
      };
    });
    expect(tooltipGeometry.height).toBeGreaterThanOrEqual(24);
    expect(tooltipGeometry.left).toBeGreaterThanOrEqual(0);
    expect(tooltipGeometry.right).toBeLessThanOrEqual(1186);
    expect(tooltipGeometry.bottom).toBeLessThanOrEqual(698);

    await feedbackCard.getByRole("button", { name: "Save changes" }).click();
    await feedbackCard.getByRole("button", { name: "Sample actions" }).click();
    const menu = page.getByRole("menu", { name: "More sample actions" });
    await expect(menu).toBeVisible();
    await expect(menu).toContainText("Edit sample");
    await assertInsideViewport(menu, page);

    await menu.getByRole("menuitem", { name: "Edit sample" }).click();
    await feedbackCard.getByRole("button", { name: "Show toast" }).click();
    const toast = page.locator('.t7-toast[role="status"]');
    await expect(toast).toContainText("Notification shown");
    await expect(toast.locator(".t7-toast-icon")).toBeVisible();
    await assertInsideViewport(toast, page);

    await feedbackCard.getByRole("button", { name: "Dismiss alert" }).click();
    await expect(feedbackCard).toContainText("The warning is dismissed");
    await feedbackCard.getByRole("button", { name: "Show alert" }).click();
    await expect(feedbackCard).toContainText("Review needed");
  });

  test("nested modal and drawer own body scroll while their popups remain usable", async ({
    page,
  }) => {
    await page.goto("/component-lab");
    await page
      .getByRole("button", { name: "Open nested modal fixture" })
      .click();
    const modal = page.getByRole("dialog", { name: "Nested overlay proof" });
    await expect(modal).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => getComputedStyle(document.body).overflow))
      .toBe("hidden");
    await modal.getByRole("button", { name: "Review outcome" }).click();
    const modalSelectPopup = page.locator(
      ".t7-modal-backdrop[open] .t7-select-list",
    );
    await expect(modalSelectPopup).toBeVisible();
    await expect(modalSelectPopup).toContainText("Ready for review");
    expect(
      await modalSelectPopup.evaluate((element) =>
        Boolean(element.closest("dialog[open]")),
      ),
    ).toBe(true);
    await assertInsideViewport(modalSelectPopup, page);
    await page.keyboard.press("Escape");
    await modal.getByRole("button", { name: "Close dialog" }).click();
    await expect
      .poll(() => page.evaluate(() => getComputedStyle(document.body).overflow))
      .toBe("visible");

    await page.getByRole("button", { name: "Open date drawer" }).click();
    const drawer = page.getByRole("dialog", { name: "Set review date" });
    await expect(drawer).toBeVisible();
    await drawer.getByRole("button", { name: "Open calendar" }).click();
    const drawerDatePicker = page.locator(
      ".t7-drawer-backdrop[open] .t7-date-picker-popover",
    );
    await expect(drawerDatePicker).toBeVisible();
    expect(
      await drawerDatePicker.evaluate((element) =>
        Boolean(element.closest("dialog[open]")),
      ),
    ).toBe(true);
    await assertInsideViewport(drawerDatePicker, page);
  });
});
