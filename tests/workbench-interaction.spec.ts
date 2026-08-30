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
    await page.keyboard.press("Escape");
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
    expect(
      await line
        .locator(".t7-chart-line")
        .first()
        .evaluate((element) => getComputedStyle(element).animationName),
    ).toBe("t7-motion-chart-line");
    await page.waitForTimeout(360);
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
