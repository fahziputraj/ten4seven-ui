import { expect, test, type Page } from "@playwright/test";
import axe from "axe-core";

async function openStress(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.removeItem("ten4seven.playground.theme.v1");
    window.localStorage.removeItem(
      "ten4seven.playground.runtime-preferences.v1",
    );
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/component-lab?stress=content");
  await expect(page.getByTestId("stress-card")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

async function expectContentSafety(page: Page) {
  const result = await page
    .getByTestId("content-safety-scope")
    .evaluate((scope) => {
      const failures: string[] = [];
      const root = scope.getBoundingClientRect();
      const rightEdge = document.documentElement.clientWidth;
      if (document.documentElement.scrollWidth > rightEdge + 1)
        failures.push("document overflow");
      if (root.left < 15 || root.right > rightEdge - 15)
        failures.push("missing page gutter");
      for (const element of scope.querySelectorAll<HTMLElement>(
        ".t7-button, .t7-nav-item, .t7-badge, .t7-field, .t7-card-title, .t7-card-description, .t7-activity-feed",
      )) {
        const rect = element.getBoundingClientRect();
        if (rect.width === 0) continue;
        if (rect.left < root.left - 1 || rect.right > root.right + 1)
          failures.push(`${element.className}: outside scope`);
      }
      for (const button of scope.querySelectorAll<HTMLElement>(".t7-button")) {
        const rect = button.getBoundingClientRect();
        if (rect.width === 0) continue;
        const label = button.querySelector<HTMLElement>(".t7-button-label")!;
        const labelRect = label.getBoundingClientRect();
        if (labelRect.left < rect.left + 5 || labelRect.right > rect.right - 5)
          failures.push("button label edge clearance");
        for (const icon of button.querySelectorAll<HTMLElement>(
          ":scope > svg, :scope > .t7-button-spinner",
        )) {
          const iconRect = icon.getBoundingClientRect();
          if (
            iconRect.right > labelRect.left + 1 &&
            iconRect.left < labelRect.right - 1
          )
            failures.push("button icon/label collision");
          if (iconRect.left < rect.left + 4 || iconRect.right > rect.right - 4)
            failures.push("button icon outside inset");
        }
      }
      const header = scope.querySelector<HTMLElement>(
        "[data-testid='stress-card'] .t7-card-header",
      )!;
      const copy = header.firstElementChild!.getBoundingClientRect();
      const action = header.lastElementChild!.getBoundingClientRect();
      if (copy.right > action.left - 4)
        failures.push("card action collided with title");
      const card = header.parentElement!.getBoundingClientRect();
      const safeInset = parseFloat(getComputedStyle(header).paddingLeft);
      if (
        copy.left - card.left < safeInset ||
        card.right - action.right < safeInset
      )
        failures.push("card corner inset missing");
      const badge = scope.querySelector<HTMLElement>(
        "[data-testid='stress-badge']",
      )!;
      if (badge.offsetHeight > 28)
        failures.push("badge became a multi-line button");
      return { failures, safeInset };
    });
  expect(result.failures).toEqual([]);
  expect(result.safeInset).toBeGreaterThanOrEqual(12);
}

const profiles = [
  {
    name: "enterprise-desktop",
    width: 1440,
    height: 900,
    recipe: "enterprise",
    density: "default",
    shape: "soft",
    appearance: "light",
  },
  {
    name: "product-laptop",
    width: 1186,
    height: 698,
    recipe: "product",
    density: "compact",
    shape: "sharp",
    appearance: "light",
  },
  {
    name: "editorial-tablet",
    width: 840,
    height: 900,
    recipe: "editorial",
    density: "comfortable",
    shape: "rounded",
    appearance: "light",
  },
  {
    name: "commerce-mobile",
    width: 390,
    height: 844,
    recipe: "commerce",
    density: "default",
    shape: "rounded",
    appearance: "light",
  },
  {
    name: "enterprise-narrow-dark",
    width: 360,
    height: 800,
    recipe: "enterprise",
    density: "compact",
    shape: "sharp",
    appearance: "dark",
  },
  {
    name: "product-custom-dark",
    width: 390,
    height: 844,
    recipe: "product",
    density: "dense",
    shape: "exact",
    appearance: "dark",
  },
  {
    name: "editorial-desktop-dark",
    width: 1440,
    height: 900,
    recipe: "editorial",
    density: "comfortable",
    shape: "soft",
    appearance: "dark",
  },
  {
    name: "commerce-laptop-dark",
    width: 1186,
    height: 698,
    recipe: "commerce",
    density: "default",
    shape: "rounded",
    appearance: "dark",
  },
];

for (const profile of profiles) {
  test(`content safety: ${profile.name}`, async ({ page }) => {
    await page.setViewportSize({
      width: profile.width,
      height: profile.height,
    });
    await openStress(page);
    await page
      .getByLabel("Stress recipe", { exact: true })
      .selectOption(profile.recipe);
    await page
      .getByLabel("Stress density", { exact: true })
      .selectOption(profile.density);
    await page
      .getByLabel("Stress shape", { exact: true })
      .selectOption(profile.shape);
    await page
      .getByLabel("Stress appearance", { exact: true })
      .selectOption(profile.appearance);
    await expect(page.getByTestId("content-safety-scope")).toHaveAttribute(
      "data-t7-mode",
      profile.appearance,
    );
    await expectContentSafety(page);

    const nav = page.getByTestId("stress-nav");
    const initial = await nav.boundingBox();
    await nav.click();
    await expect(nav).toHaveAttribute("data-active", "true");
    const active = await nav.boundingBox();
    expect(active?.height).toBe(initial?.height);
    expect(active?.width).toBe(initial?.width);
    await page.keyboard.press("Tab");
    await nav.focus();
    const focus = await nav.evaluate((element) => ({
      outline: getComputedStyle(element).outlineStyle,
      shadow: getComputedStyle(element).boxShadow,
    }));
    expect(focus.outline !== "none" || focus.shadow !== "none").toBe(true);

    const recordAction = page
      .getByRole("button", { name: "Inspect record", exact: true })
      .first();
    await recordAction.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(recordAction).toBeFocused();
    await expectContentSafety(page);
  });
}

test("SM/MD/LG coordinate typography, icons, padding and control dimensions", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await openStress(page);
  const families = await page
    .getByTestId("stress-size-families")
    .evaluate((root) =>
      [...root.querySelectorAll<HTMLElement>("[data-t7-control-size]")].map(
        (group) => {
          const input = group.querySelector<HTMLElement>("input.t7-input")!;
          const select =
            group.querySelector<HTMLElement>(".t7-select-trigger")!;
          const button = group.querySelector<HTMLElement>(".t7-button")!;
          return {
            size: group.dataset.t7ControlSize,
            heights: [input, select, button].map(
              (element) => element.getBoundingClientRect().height,
            ),
            fontSize: parseFloat(getComputedStyle(button).fontSize),
            gap: parseFloat(getComputedStyle(button).gap),
            padding: parseFloat(getComputedStyle(button).paddingLeft),
            icon: button.querySelector("svg")!.getBoundingClientRect().width,
            inputInset: parseFloat(getComputedStyle(input).paddingLeft),
            inputIconEnd:
              group.querySelector(".t7-input-icon")!.getBoundingClientRect()
                .right - input.getBoundingClientRect().left,
          };
        },
      ),
    );
  expect(families.map((family) => family.heights)).toEqual([
    [36, 36, 36],
    [40, 40, 40],
    [48, 48, 48],
  ]);
  expect(families.map((family) => family.fontSize)).toEqual([12, 14, 16]);
  expect(families.map((family) => family.icon)).toEqual([14, 16, 18]);
  expect(families[0].gap).toBeLessThan(families[1].gap);
  expect(families[1].gap).toBeLessThan(families[2].gap);
  expect(families[0].padding).toBeLessThan(families[1].padding);
  expect(families[1].padding).toBeLessThan(families[2].padding);
  for (const family of families) {
    expect(family.inputInset).toBeGreaterThan(family.inputIconEnd + 4);
  }
});

test("column ellipsis and clamp retain a full-value detail path and mobile disclosure", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await openStress(page);
  const table = page.getByTestId("stress-overflow-table");
  const policies = await table.evaluate((element) => {
    const ellipsis = element.querySelector<HTMLElement>(
      'td[data-overflow="ellipsis"] > div',
    )!;
    const clamp = element.querySelector<HTMLElement>(
      'td[data-overflow="clamp"] > div',
    )!;
    return {
      ellipsis: getComputedStyle(ellipsis).textOverflow,
      clipped: ellipsis.scrollWidth > ellipsis.clientWidth,
      clamp: getComputedStyle(clamp).webkitLineClamp,
      clampHeight: clamp.clientHeight,
      lineHeight: parseFloat(getComputedStyle(clamp).lineHeight),
    };
  });
  expect(policies.ellipsis).toBe("ellipsis");
  expect(policies.clipped).toBe(true);
  expect(policies.clamp).toBe("2");
  expect(policies.clampHeight).toBeLessThanOrEqual(policies.lineHeight * 2);
  await table.getByRole("button", { name: "Read full values" }).click();
  await expect(page.getByRole("dialog")).toContainText(
    "AAPM20260903DISTRIBUSISUMATERABARATPENGADAANPAKAN",
  );
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(table.locator(".t7-table-stacked")).toBeVisible();
  await expect(
    table.locator('[data-column-key="supplier"] .t7-table-stacked-value'),
  ).toContainText("Wilayah Sumatera Barat");
  await expectContentSafety(page);
});

test("long overlay titles and menu shortcuts preserve keyboard and slot clearance", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await openStress(page);
  await page.getByLabel("Stress shape", { exact: true }).selectOption("exact");
  const menuTrigger = page.getByRole("button", { name: "Open stress actions" });
  await menuTrigger.focus();
  await page.keyboard.press("Enter");
  const menu = page.getByRole("menu", { name: "Stress record actions" });
  await expect(menu).toBeVisible();
  const slots = await menu
    .locator(".t7-menu-item")
    .first()
    .evaluate((element) => {
      const copy = element
        .querySelector(".t7-menu-item-copy")!
        .getBoundingClientRect();
      const shortcut = element.querySelector("kbd")!.getBoundingClientRect();
      const bounds = element.getBoundingClientRect();
      return {
        copyRight: copy.right,
        shortcutLeft: shortcut.left,
        shortcutRight: shortcut.right,
        right: bounds.right,
        focus: getComputedStyle(element).outlineStyle,
      };
    });
  expect(slots.copyRight).toBeLessThan(slots.shortcutLeft);
  expect(slots.shortcutRight).toBeLessThan(slots.right);
  expect(slots.focus).not.toBe("none");
  await page.keyboard.press("Escape");
  await expect(menuTrigger).toBeFocused();
  await page.getByTestId("stress-button").click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const titleBounds = await dialog
    .locator(".t7-modal-header")
    .evaluate((element) => {
      const title = element.firstElementChild!.getBoundingClientRect();
      const close = element.lastElementChild!.getBoundingClientRect();
      return {
        titleRight: title.right,
        closeLeft: close.left,
        closeRight: close.right,
        headerRight: element.getBoundingClientRect().right,
      };
    });
  expect(titleBounds.titleRight).toBeLessThan(titleBounds.closeLeft);
  expect(titleBounds.closeRight).toBeLessThan(titleBounds.headerRight - 12);
  await dialog.getByRole("textbox", { name: "Decision owner" }).focus();
  await expect(
    dialog.getByRole("textbox", { name: "Decision owner" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("stress-button")).toBeFocused();
});

test("bounded stress route has no serious or critical axe violations in light and dark", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openStress(page);
  await page.addScriptTag({ content: axe.source });
  for (const appearance of ["light", "dark"]) {
    await page
      .getByLabel("Stress appearance", { exact: true })
      .selectOption(appearance);
    // ThemeScope applies its resolved CSS variables after the controlled select
    // update. Audit the settled scope rather than the transition frame.
    await page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
    const violations = await page.evaluate(async () => {
      const result = await (window as unknown as { axe: typeof axe }).axe.run(
        document.querySelector("[data-testid='content-safety-scope']")!,
      );
      return result.violations
        .filter((violation) =>
          ["critical", "serious"].includes(violation.impact ?? ""),
        )
        .map((violation) => ({
          id: violation.id,
          nodes: violation.nodes.map((node) => node.target),
        }));
    });
    expect(violations, appearance).toEqual([]);
  }
});

for (const zoom of [1.25, 1.5]) {
  test(`desktop rendering zoom ${zoom * 100}% keeps the stress boundary intact`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await openStress(page);
    await page.evaluate((value) => {
      document.body.style.zoom = String(value);
    }, zoom);
    await expectContentSafety(page);
    await page.getByTestId("stress-button").click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("stress-button")).toBeFocused();
  });
}

test("fresh reference gutter and overflow audit across five bounded viewports", async ({
  page,
}) => {
  test.setTimeout(150_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 1186, 840, 390, 360]) {
    await page.setViewportSize({
      width,
      height:
        width === 1186 ? 698 : width === 360 ? 800 : width === 390 ? 844 : 900,
    });
    for (const route of [
      "theme-studio",
      "component-lab",
      "components",
      "tokens",
      "icons",
      "blocks",
      "recipes",
      "operations-tracker",
      "ebook-store",
      "public-showcase",
      "operational-patterns",
    ]) {
      await page.goto(`/${route}`);
      await expect(page.locator("main").first()).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      const bounds = await page.evaluate(() => {
        const heading = document.querySelector("main h1")!;
        const rect = heading.getBoundingClientRect();
        return {
          overflow:
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
          left: rect.left,
          right: rect.right,
          width: document.documentElement.clientWidth,
        };
      });
      expect(bounds.overflow, `${route} ${width}`).toBeLessThanOrEqual(1);
      expect(
        bounds.left,
        `${route} ${width} left gutter`,
      ).toBeGreaterThanOrEqual(15);
      expect(
        bounds.right,
        `${route} ${width} right gutter`,
      ).toBeLessThanOrEqual(bounds.width - 15);
    }
  }
});

for (const width of [1440, 390, 360]) {
  test(`content safety reviewed visual ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 1440 ? 900 : 844 });
    await openStress(page);
    if (width === 360) {
      await page
        .getByLabel("Stress appearance", { exact: true })
        .selectOption("dark");
      await page
        .getByLabel("Stress shape", { exact: true })
        .selectOption("exact");
      await page
        .getByLabel("Stress density", { exact: true })
        .selectOption("dense");
    }
    await expect(page.getByTestId("stress-card")).toHaveScreenshot(
      `content-safety-card-${width}.png`,
      {
        animations: "disabled",
        style:
          '[aria-label="Open ten4seven reference QA controls"] { visibility: hidden; }',
      },
    );
    await expect(page.getByTestId("stress-size-families")).toHaveScreenshot(
      `content-safety-controls-${width}.png`,
      {
        animations: "disabled",
        style:
          '[aria-label="Open ten4seven reference QA controls"] { visibility: hidden; }',
      },
    );
  });
}
