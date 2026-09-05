import { expect, test } from "@playwright/test";

type Profile = {
  appearance: "light" | "dark";
  palette: string;
  radius: string;
  density: string;
};
const profiles: Profile[] = [
  {
    appearance: "light",
    palette: "emerald",
    radius: "soft",
    density: "default",
  },
  {
    appearance: "dark",
    palette: "blue",
    radius: "rounded",
    density: "compact",
  },
  { appearance: "light", palette: "red", radius: "soft", density: "default" },
  {
    appearance: "dark",
    palette: "orange",
    radius: "rounded",
    density: "compact",
  },
  { appearance: "light", palette: "slate", radius: "sharp", density: "dense" },
];

async function chooseSelect(
  page: import("@playwright/test").Page,
  label: string,
  value: string,
) {
  const trigger = page.getByRole("button", { name: label });
  await trigger.click();
  await page
    .locator(".t7-select-list")
    .getByRole("option", { name: value, exact: true })
    .click();
}

async function openAdvancedAuthoring(page: import("@playwright/test").Page) {
  const advanced = page.locator(".studio-advanced-authoring");
  const trigger = advanced.getByRole("button", {
    name: /Advanced theme authoring/i,
  });
  if ((await trigger.getAttribute("aria-expanded")) !== "true")
    await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  return advanced;
}

async function chooseAppearance(
  page: import("@playwright/test").Page,
  value: Profile["appearance"],
) {
  const label = value === "light" ? "Light" : "Dark";
  const button = page
    .getByTestId("theme-recipe-workbench")
    .getByRole("group", { name: "Appearance", exact: true })
    .getByRole("button", { name: label, exact: true });
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed", "true");
}

async function chooseRadius(
  page: import("@playwright/test").Page,
  value: Profile["radius"],
) {
  const radiusValue = { sharp: 8, soft: 12, rounded: 16 }[value];
  const slider = page.getByRole("slider", { name: "Base radius" });
  await slider.focus();
  await slider.press("Home");
  for (let index = 0; index < radiusValue; index += 1)
    await slider.press("ArrowRight");
  await expect(slider).toHaveAttribute(
    "aria-valuetext",
    new RegExp(`${radiusValue} px base radius`),
  );
  await expect(page.locator(".t7-provider")).toHaveAttribute(
    "data-radius-value",
    String(radiusValue),
  );
}

async function chooseDensity(
  page: import("@playwright/test").Page,
  value: Profile["density"],
) {
  const labels: Record<string, string> = {
    compact: "Compact",
    comfortable: "Comfortable",
    default: "Regular",
    dense: "Dense",
  };
  const button = page
    .getByTestId("theme-recipe-workbench")
    .getByRole("group", { name: "Density", exact: true })
    .getByRole("button", { name: labels[value], exact: true });
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed", "true");
}

async function applyProfile(
  page: import("@playwright/test").Page,
  profile: Profile,
) {
  await page.goto("/theme-studio");
  await openAdvancedAuthoring(page);
  await page
    .getByRole("button", { name: `Use ${profile.palette} palette` })
    .click();
  await chooseAppearance(page, profile.appearance);
  await chooseRadius(page, profile.radius);
  await chooseDensity(page, profile.density);
}

test("Theme Studio keeps appearance and density authoritative in the runtime rail", async ({
  page,
}) => {
  await page.goto("/theme-studio");

  const workbench = page.getByTestId("theme-recipe-workbench");
  const appearance = workbench.getByRole("group", {
    name: "Appearance",
    exact: true,
  });
  const density = workbench.getByRole("group", {
    name: "Density",
    exact: true,
  });

  await expect(appearance).toHaveCount(1);
  await expect(density).toHaveCount(1);
  await expect(page.locator(".studio-appearance-picker")).toHaveCount(0);
  await expect(page.locator(".studio-density-control")).toHaveCount(0);

  await appearance.getByRole("button", { name: "Dark", exact: true }).click();
  await density.getByRole("button", { name: "Dense", exact: true }).click();

  await expect(page.locator(".t7-provider")).toHaveAttribute(
    "data-t7-mode",
    "dark",
  );
  await expect(page.locator(".t7-provider")).toHaveAttribute(
    "data-t7-density",
    "dense",
  );
});

for (const profile of profiles) {
  test(`global profile ${profile.appearance} ${profile.palette} ${profile.radius} ${profile.density}`, async ({
    page,
  }) => {
    await applyProfile(page, profile);
    for (const route of ["operations-tracker", "ebook-store"]) {
      await page.goto(`/${route}`);
      const provider = page.locator(".t7-provider");
      await expect(provider).toHaveAttribute("data-palette", profile.palette);
      await expect(provider).toHaveAttribute(
        "data-theme-appearance",
        profile.appearance,
      );
      await expect(provider).toHaveAttribute("data-radius", profile.radius);
      await expect(provider).toHaveAttribute("data-density", profile.density);
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        ),
      ).toBeLessThanOrEqual(1);
    }
    await page.reload();
    await expect(page.locator(".t7-provider")).toHaveAttribute(
      "data-palette",
      profile.palette,
    );
  });
}

test("canonical Select supports arrows, Enter, Escape, and disabled options", async ({
  page,
}) => {
  await page.goto("/theme-studio");
  await openAdvancedAuthoring(page);
  const mainAction = page.getByRole("button", { name: "Main action color" });
  await mainAction.focus();
  await mainAction.press("ArrowDown");
  await mainAction.press("Enter");
  await expect(page.locator(".t7-provider")).toHaveAttribute(
    "data-primary",
    /teal|cyan|blue|indigo|violet|rose|red|orange|amber|slate/,
  );
  await mainAction.click();
  await mainAction.press("Escape");
  await expect(mainAction).toHaveAttribute("aria-expanded", "false");

  await chooseRadius(page, "rounded");
  await expect(page.locator(".t7-provider")).toHaveAttribute(
    "data-radius",
    "rounded",
  );
});

test("bounded Select popups stay anchored to their trigger", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/theme-studio");
  await openAdvancedAuthoring(page);

  const trigger = page.getByRole("button", { name: "Main action color" });
  await trigger.click();
  const popup = page.locator("#t7-overlay-root .t7-select-list");
  await expect(popup).toBeVisible();

  const triggerRect = await trigger.boundingBox();
  const popupRect = await popup.boundingBox();
  const viewportWidth = await page.evaluate(
    () => document.documentElement.clientWidth,
  );

  expect(triggerRect).not.toBeNull();
  expect(popupRect).not.toBeNull();
  expect(popupRect!.width).toBeGreaterThanOrEqual(triggerRect!.width - 1);
  expect(popupRect!.width).toBeLessThan(viewportWidth / 2);
  expect(Math.abs(popupRect!.x - triggerRect!.x)).toBeLessThan(2);
  expect(popupRect!.x + popupRect!.width).toBeLessThanOrEqual(viewportWidth);
});

test("long select values stay inside their Theme Studio fields", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1186, height: 698 });
  await page.goto("/theme-studio");
  await openAdvancedAuthoring(page);

  const fieldGeometry = await page
    .locator(".studio-controls-grid .t7-select-field")
    .evaluateAll((fields) =>
      fields.map((field) => {
        const fieldRect = field.getBoundingClientRect();
        const trigger = field.querySelector(".t7-select-trigger");
        const triggerRect = trigger?.getBoundingClientRect();
        const value = trigger?.querySelector("span");
        const valueStyle = value ? getComputedStyle(value) : undefined;
        return {
          label: field.querySelector(".t7-field-label")?.textContent?.trim(),
          fieldRight: fieldRect.right,
          triggerRight: triggerRect?.right,
          valueOverflow: valueStyle?.textOverflow,
        };
      }),
    );
  const radiusGeometry = await page
    .locator(".studio-radius-control")
    .evaluate((control) => {
      const controlRect = control.getBoundingClientRect();
      const slider = control.querySelector("input[type='range']");
      const sliderRect = slider?.getBoundingClientRect();
      return {
        controlRight: controlRect.right,
        sliderRight: sliderRect?.right,
      };
    });
  const controlGridGeometry = await page
    .locator(".studio-controls-grid")
    .evaluate((grid) => {
      const style = getComputedStyle(grid);
      return {
        columns: style.gridTemplateColumns.split(" ").filter(Boolean).length,
      };
    });
  const profileGeometry = await page
    .locator(".studio-axis-list > div")
    .evaluateAll((items) =>
      items.map((item) => {
        const itemRect = item.getBoundingClientRect();
        const label = item.querySelector("dt");
        const value = item.querySelector("dd");
        const labelRect = label?.getBoundingClientRect();
        const valueRect = value?.getBoundingClientRect();
        return {
          label: label?.textContent?.trim(),
          itemWidth: itemRect.width,
          labelRight: labelRect?.right,
          valueX: valueRect?.x,
        };
      }),
    );

  expect(fieldGeometry).toHaveLength(2);
  for (const field of fieldGeometry) {
    expect(field.triggerRight).toBeLessThanOrEqual(field.fieldRight + 0.5);
  }
  expect(radiusGeometry.sliderRight).toBeLessThanOrEqual(
    radiusGeometry.controlRight + 0.5,
  );
  expect(controlGridGeometry.columns).toBe(2);
  expect(profileGeometry).toHaveLength(10);
  const densityProfile = profileGeometry.find(
    (field) => field.label === "Density",
  );
  expect(densityProfile?.itemWidth).toBeGreaterThan(200);
  expect(densityProfile?.labelRight).toBeLessThanOrEqual(
    (densityProfile?.valueX ?? 0) + 0.5,
  );
});

test("corrupt persisted global controls fall back to a safe theme", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "ten4seven.playground.theme.v1",
      JSON.stringify({
        appearance: "invalid",
        palette: "invalid",
        primary: "invalid",
        accent: "invalid",
        canvas: "invalid",
        chartPalette: "invalid",
        radius: "invalid",
        radiusValue: "invalid",
        density: "invalid",
        motionDuration: "invalid",
        typography: { preset: "invalid", ui: 42 },
        elevation: "invalid",
      }),
    );
  });
  await page.goto("/theme-studio");

  const provider = page.locator(".t7-provider");
  await expect(
    page.getByRole("heading", { name: "Theme Studio" }),
  ).toBeVisible();
  await expect(provider).toHaveAttribute("data-palette", "emerald");
  await expect(provider).toHaveAttribute("data-primary", "emerald");
  await expect(provider).toHaveAttribute("data-accent", "emerald");
  await expect(provider).toHaveAttribute("data-canvas", "balanced");
  await expect(provider).toHaveAttribute("data-radius", "soft");
  await expect(provider).toHaveAttribute("data-motion-duration", "1.5");
  await expect(provider).not.toHaveAttribute("data-radius-value");
});

test("global controls collapse to one column on narrow screens", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/theme-studio");
  await openAdvancedAuthoring(page);

  const geometry = await page
    .locator(".studio-controls-grid")
    .evaluate((grid) => {
      const rects = Array.from(grid.children).map((child) => {
        const rect = child.getBoundingClientRect();
        return { x: Math.round(rect.x), width: Math.round(rect.width) };
      });
      return {
        columnCount: getComputedStyle(grid)
          .gridTemplateColumns.split(" ")
          .filter(Boolean).length,
        rects,
      };
    });

  expect(geometry.columnCount).toBe(1);
  expect(new Set(geometry.rects.map((rect) => rect.x)).size).toBe(1);
  expect(new Set(geometry.rects.map((rect) => rect.width)).size).toBe(1);
});

test("Theme Studio keeps mobile token metadata readable and aligned", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/theme-studio");
  await openAdvancedAuthoring(page);

  const geometry = await page
    .locator(".studio-live-preview-meta, .studio-axis-slider-detail")
    .evaluateAll((items) =>
      items.map((item) => {
        const style = getComputedStyle(item);
        return {
          clientHeight: item.clientHeight,
          clientWidth: item.clientWidth,
          overflowX: style.overflowX,
          scrollHeight: item.scrollHeight,
          scrollWidth: item.scrollWidth,
          text: item.textContent?.trim() ?? "",
          whiteSpace: style.whiteSpace,
        };
      }),
    );

  expect(geometry.length).toBeGreaterThanOrEqual(7);
  for (const item of geometry) {
    expect(
      item.scrollWidth,
      `${item.text} should fit within its mobile metadata slot`,
    ).toBeLessThanOrEqual(item.clientWidth + 1);
    expect(item.scrollHeight).toBeLessThanOrEqual(item.clientHeight + 1);
    expect(item.overflowX).toBe("visible");
    expect(item.whiteSpace).toBe("normal");
  }
});

test("CTA blocks without media use the full content track", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/public-showcase");

  const geometry = await page
    .locator(".public-showcase-cta")
    .evaluate((cta) => {
      const ctaRect = cta.getBoundingClientRect();
      const copy = cta.querySelector<HTMLElement>(".t7-cta-copy");
      const copyRect = copy?.getBoundingClientRect();
      const styles = getComputedStyle(cta);
      const paddingLeft = Number.parseFloat(styles.paddingLeft);
      const paddingRight = Number.parseFloat(styles.paddingRight);
      return {
        columns: styles.gridTemplateColumns.split(" ").filter(Boolean),
        copyLeft: copyRect?.left ?? null,
        copyRight: copyRect?.right ?? null,
        contentLeft: ctaRect.left + paddingLeft,
        contentRight: ctaRect.right - paddingRight,
      };
    });

  expect(geometry.columns).toHaveLength(1);
  expect(geometry.copyLeft).not.toBeNull();
  expect(geometry.copyRight).not.toBeNull();
  expect(
    Math.abs(geometry.copyLeft! - geometry.contentLeft),
  ).toBeLessThanOrEqual(1);
  expect(
    Math.abs(geometry.copyRight! - geometry.contentRight),
  ).toBeLessThanOrEqual(1);
});

test("independent color and canvas axes propagate through the provider", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1186, height: 698 });
  await page.goto("/theme-studio");
  await openAdvancedAuthoring(page);

  await page.getByRole("button", { name: "Use indigo palette" }).click();
  const palettePropagation = await page.evaluate(() => {
    const provider = document.querySelector<HTMLElement>(".t7-provider");
    const primaryButton = document.querySelector<HTMLElement>(
      ".proof-panel .t7-button[data-intent='primary']",
    );
    const input = document.querySelector<HTMLElement>(".proof-panel .t7-input");
    return {
      primary: provider
        ? getComputedStyle(provider).getPropertyValue("--t7-primary-hsl").trim()
        : "",
      buttonBackground: primaryButton
        ? getComputedStyle(primaryButton).backgroundColor
        : "",
      inputBorder: input ? getComputedStyle(input).borderTopColor : "",
    };
  });
  expect(palettePropagation.primary).toBe("232 70% 48%");
  expect(palettePropagation.buttonBackground).not.toBe("rgba(0, 0, 0, 0)");
  expect(palettePropagation.inputBorder).not.toBe("");

  await chooseSelect(page, "Main action color", "indigo");
  await chooseSelect(page, "Accent color", "amber");
  await page
    .locator(".studio-canvas-picker")
    .getByRole("button", { name: /^Paper\b/i })
    .click();
  await page
    .locator(".studio-chart-picker")
    .getByRole("button", { name: /Four colors/i })
    .click();

  const provider = page.locator(".t7-provider");
  await expect(provider).toHaveAttribute("data-primary", "indigo");
  await expect(provider).toHaveAttribute("data-accent", "amber");
  await expect(provider).toHaveAttribute("data-canvas", "paper");
  await expect(provider).toHaveAttribute("data-chart-palette", "four");
  await expect(provider).toHaveCSS("--t7-background-hsl", "0 0% 100%");
  await expect(provider).toHaveCSS("--t7-chart-palette-count", "4");
});

test("Theme Studio keeps the paper canvas achromatic across palette changes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1186, height: 698 });
  await page.goto("/theme-studio");
  await openAdvancedAuthoring(page);

  await page
    .locator(".studio-canvas-picker")
    .getByRole("button", { name: /^Paper\b/i })
    .click();

  const provider = page.locator(".t7-provider");
  const baseline = await provider.evaluate((element) => ({
    background: getComputedStyle(element)
      .getPropertyValue("--t7-background-hsl")
      .trim(),
    border: getComputedStyle(element)
      .getPropertyValue("--t7-border-hsl")
      .trim(),
    surface: getComputedStyle(element)
      .getPropertyValue("--t7-surface-hsl")
      .trim(),
  }));
  for (const value of Object.values(baseline)) {
    const [hue, saturation] = value.split(" ");
    expect(hue).toBe("0");
    expect(saturation).toBe("0%");
  }

  for (const palette of ["emerald", "blue", "indigo", "violet", "orange"]) {
    await page.getByRole("button", { name: `Use ${palette} palette` }).click();
    await expect(provider).toHaveCSS(
      "--t7-background-hsl",
      baseline.background,
    );
    await expect(provider).toHaveCSS("--t7-surface-hsl", baseline.surface);
    await expect(provider).toHaveCSS("--t7-border-hsl", baseline.border);
  }
});

test("light application canvases stay white and structural surfaces stay achromatic", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });

  for (const route of [
    "/theme-studio",
    "/component-lab",
    "/operations-tracker",
    "/operational-patterns",
    "/ebook-store",
    "/public-showcase",
  ]) {
    await page.goto(route);

    const result = await page.locator(".t7-provider").evaluate((provider) => {
      const providerStyle = getComputedStyle(provider);
      const selectors = [
        ".t7-provider",
        ".t7-app-shell",
        ".t7-app-main",
        ".t7-app-content",
        "main",
      ];
      const structuralBackgrounds = selectors.flatMap((selector) => {
        const element = document.querySelector<HTMLElement>(selector);
        if (!element) return [];

        return [{ selector, value: getComputedStyle(element).backgroundColor }];
      });

      return {
        canvas: providerStyle.getPropertyValue("--t7-background-hsl").trim(),
        providerBackground: providerStyle.backgroundColor,
        structuralBackgrounds,
      };
    });

    expect(result.canvas, route).toBe("0 0% 100%");
    expect(result.providerBackground, route).toBe("rgb(255, 255, 255)");

    for (const background of result.structuralBackgrounds) {
      if (background.value === "rgba(0, 0, 0, 0)") continue;
      const channels = background.value.match(/[\d.]+/g)?.slice(0, 3);
      expect(channels?.length, `${route} ${background.selector}`).toBe(3);
      expect(channels?.[0], `${route} ${background.selector}`).toBe(
        channels?.[1],
      );
      expect(channels?.[1], `${route} ${background.selector}`).toBe(
        channels?.[2],
      );
    }
  }
});

test("Theme Studio explains semantic color roles and keeps focus independent of accent", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1186, height: 698 });
  await page.goto("/theme-studio");
  await openAdvancedAuthoring(page);

  const roleMap = page.getByTestId("studio-color-role-map");
  await expect(roleMap).toContainText("Main action");
  await expect(roleMap).toContainText("Buttons · links · selected");
  await expect(roleMap).toContainText("Accent color");
  await expect(roleMap).toContainText("Supporting emphasis · expression");
  await expect(roleMap).toContainText("Chart");
  await expect(roleMap).toContainText("Data series · opted-in solid surfaces");

  await chooseSelect(page, "Accent color", "amber");
  const provider = page.locator(".t7-provider");
  await expect(provider).toHaveAttribute("data-accent", "amber");
  await expect(provider).toHaveCSS("--t7-focus-hsl", "216 72% 38%");
  await expect(provider).toHaveCSS(
    "--t7-input-focus-border-hsl",
    "216 72% 38%",
  );
  await expect(
    page
      .getByTestId("studio-live-preview")
      .locator('[data-live-value="accent"]'),
  ).toHaveText("amber · supporting emphasis");
});

test("Typography Studio exposes distinct preset characters and roles", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1186, height: 698 });
  await page.goto("/theme-studio");
  await openAdvancedAuthoring(page);

  const typographyPicker = page.locator(".studio-typography-picker");
  await expect(typographyPicker.getByRole("button")).toHaveCount(5);
  await typographyPicker.getByRole("button", { name: /Editorial/i }).click();

  const provider = page.locator(".t7-provider");
  await expect(provider).toHaveAttribute("data-typography", "editorial");
  const specimen = page.locator(".typography-specimen");
  await expect(
    page.locator(".studio-type-section .studio-section-count"),
  ).toContainText("Editorial");
  await expect(specimen.locator(".type-specimen-meta")).toContainText(
    "Serif display · calm reading tone",
  );
  await expect(specimen.locator(".type-specimen-role-strip")).toContainText(
    "Operations tracker",
  );
  const displayFamily = await provider.evaluate((element) =>
    getComputedStyle(element).getPropertyValue("--t7-font-display"),
  );
  expect(displayFamily).toContain("Georgia");
});

test("Global Controls expose an immediate canonical preview", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1186, height: 698 });
  await page.goto("/theme-studio");

  const preview = page.getByTestId("studio-live-preview");
  const liveState = page.getByTestId("studio-controls-live-state");
  await expect(preview).toBeVisible();
  await expect(liveState).toHaveAttribute(
    "aria-label",
    "Live. Ready to preview",
  );
  await expect(preview.locator('[data-live-value="primary"]')).toHaveText(
    /emerald · primary role/,
  );

  const previewAction = preview.getByRole("button", {
    name: "Apply",
    exact: true,
  });
  const before = await previewAction.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  await openAdvancedAuthoring(page);
  await page.getByRole("button", { name: "Use blue palette" }).click();
  await expect(liveState).toContainText("Updated live");
  await expect(liveState).toContainText("Base palette");
  await expect(liveState).toContainText("blue");
  await expect(preview.locator('[data-live-value="primary"]')).toHaveText(
    "blue · primary role",
  );

  const after = await previewAction.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  expect(after).not.toBe(before);

  const field = preview.getByRole("textbox", {
    name: "Live theme preview field",
  });
  await field.fill("QA");
  await expect(field).toHaveValue("QA");
  await field.focus();
  await expect(field).toHaveCSS("box-shadow", /rgb|hsl/);
});

test("radius slider applies exact zero and one-pixel steps", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1186, height: 698 });
  await page.goto("/theme-studio");
  await openAdvancedAuthoring(page);

  const slider = page.getByRole("slider", { name: "Base radius" });
  await slider.focus();
  await slider.press("Home");
  await expect(slider).toHaveValue("0");
  await expect(page.locator(".t7-provider")).toHaveAttribute(
    "data-radius-value",
    "0",
  );
  await expect(page.locator(".studio-controls-card")).toHaveCSS(
    "border-radius",
    "0px",
  );
  await expect(
    page.locator(".studio-controls-card .t7-select-trigger").first(),
  ).toHaveCSS("border-radius", "0px");

  await slider.press("ArrowRight");
  await expect(slider).toHaveValue("1");
  await expect(page.locator(".t7-provider")).toHaveAttribute(
    "data-radius-value",
    "1",
  );
  await expect(page.locator(".t7-provider")).toHaveCSS(
    "--t7-radius-base",
    "1px",
  );
});

test("motion duration slider scales reveals while bounding interaction timing", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1186, height: 698 });
  await page.goto("/theme-studio");
  await openAdvancedAuthoring(page);

  const slider = page.getByRole("slider", { name: "Motion duration" });
  await slider.focus();
  await slider.press("Home");
  await expect(slider).toHaveValue("0.25");
  await expect(page.locator(".t7-provider")).toHaveAttribute(
    "data-motion-duration",
    "0.25",
  );
  await expect(page.locator(".t7-provider")).toHaveCSS(
    "--t7-duration-slow",
    "250ms",
  );

  await slider.press("ArrowRight");
  await slider.press("ArrowRight");
  await expect(slider).toHaveValue("0.75");
  await expect(page.locator(".t7-provider")).toHaveCSS(
    "--t7-duration-standard",
    "170ms",
  );
});

test("operations milestone tracker reveals selected detail", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/operations-tracker");

  const tracker = page.getByRole("navigation", {
    name: "Operations milestone progress",
  });
  await expect(tracker.getByRole("progressbar")).toHaveCount(5);
  const triage = tracker.getByRole("button", { name: /Triage/ });
  const followUp = tracker.getByRole("button", { name: /Follow-up/ });
  await expect(triage).toHaveAttribute("aria-current", "step");
  await expect(triage).toHaveAttribute("aria-pressed", "true");
  await expect(followUp).not.toHaveAttribute("aria-current", "step");
  await expect(followUp).toHaveAttribute("aria-pressed", "false");
  await expect(
    tracker.getByRole("region", { name: "Triage milestone details" }),
  ).toContainText("Health and ownership");

  await tracker.getByRole("button", { name: /Execution/ }).click();
  await expect(
    tracker.getByRole("button", { name: /Execution/ }),
  ).toHaveAttribute("aria-current", "step");
  await expect(triage).toHaveAttribute("aria-pressed", "false");
  await expect(
    tracker.getByRole("region", { name: "Execution milestone details" }),
  ).toContainText("Corn lot JG-882");
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
});

test("public showcase section map and route CTAs are navigable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/public-showcase");

  await expect(
    page.getByRole("navigation", { name: "Public showcase sections" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Foundations Tokens, roles/ }),
  ).toHaveAttribute("href", "#showcase-features");

  await page.getByRole("button", { name: "Explore the system" }).click();
  await expect(page).toHaveURL(/\/public-showcase#showcase-features$/);

  await page.getByRole("button", { name: "View components" }).click();
  await expect(page).toHaveURL(/\/components$/);
});

test("shared motion tokens drive smooth scroll and chart reveals", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/component-lab");

  const initialCharts = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>(".t7-chart")].map((chart) => {
      const rect = chart.getBoundingClientRect();
      return {
        bottom: rect.bottom,
        top: rect.top,
        visible: chart.dataset.chartVisible,
      };
    }),
  );
  const gatedChartIndex = initialCharts.findIndex(
    (chart) => chart.top > 900 || chart.bottom < 0,
  );
  expect(gatedChartIndex).toBeGreaterThanOrEqual(0);
  expect(initialCharts[gatedChartIndex]?.visible).toBe("false");

  const gatedChart = page.locator(".t7-chart").nth(gatedChartIndex);
  await gatedChart.evaluate((element) =>
    element.scrollIntoView({ block: "center", behavior: "instant" }),
  );
  await page.waitForTimeout(120);

  const chartCount = await page.locator(".t7-chart").count();
  for (let index = 0; index < chartCount; index += 1) {
    const chart = page.locator(".t7-chart").nth(index);
    await chart.evaluate((element) =>
      element.scrollIntoView({ block: "center", behavior: "instant" }),
    );
    await page.waitForTimeout(120);
  }

  const motion = await page.evaluate(() => {
    const provider = document.querySelector<HTMLElement>(".t7-provider");
    const chartNodes = [
      ...document.querySelectorAll<SVGElement>(
        ".t7-chart-line, .t7-chart-bar, .t7-donut-segment",
      ),
    ];
    return {
      chartVisibility: [
        ...document.querySelectorAll<HTMLElement>(".t7-chart"),
      ].map((chart) => chart.dataset.chartVisible),
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      standardDuration: provider
        ? getComputedStyle(provider)
            .getPropertyValue("--t7-duration-standard")
            .trim()
        : "",
      animatedNodes: chartNodes.map((node) => {
        const style = getComputedStyle(node);
        return {
          animation: style.animationName,
          duration: style.animationDuration,
          className: node.className.baseVal,
          inlineStyle: node.getAttribute("style") ?? "",
        };
      }),
      hasLocalChartDelay: Boolean(
        document.querySelector(".t7-chart [style*='animation-delay']"),
      ),
    };
  });

  expect(
    motion.chartVisibility.every((visibility) => visibility === "true"),
  ).toBe(true);
  expect(motion.scrollBehavior).toBe("smooth");
  expect(motion.standardDuration).toBe("220ms");
  expect(motion.animatedNodes).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        className: expect.stringContaining("t7-chart-line"),
        animation: "none",
        duration: "0s",
      }),
      expect.objectContaining({
        className: expect.stringContaining("t7-chart-bar"),
        animation: "none",
        duration: "0s",
      }),
      expect.objectContaining({
        className: expect.stringContaining("t7-donut-segment"),
        animation: "none",
        duration: "0s",
      }),
    ]),
  );
  expect(motion.hasLocalChartDelay).toBe(false);
  expect(motion.animatedNodes.length).toBeGreaterThan(0);
  expect(
    motion.animatedNodes.every((node) =>
      /stroke-dashoffset|opacity|transform/.test(node.inlineStyle),
    ),
  ).toBe(true);
});

test("motion adapters skip empty targets without console warnings", async ({
  page,
}) => {
  const emptyTargetWarnings: string[] = [];
  page.on("console", (message) => {
    if (
      message.type() === "warning" &&
      message.text().includes("No target found")
    ) {
      emptyTargetWarnings.push(message.text());
    }
  });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/public-showcase");
  await page.waitForTimeout(250);
  await page.goto("/operations-tracker");
  await page.waitForTimeout(250);

  expect(emptyTargetWarnings).toEqual([]);
});

test("canonical actions use cursor-origin feedback and static cards retain neutral geometry", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/component-lab");

  const button = page.getByRole("button", { name: "Open modal" });
  await button.scrollIntoViewIfNeeded();
  const buttonBox = await button.boundingBox();
  expect(buttonBox).not.toBeNull();
  if (!buttonBox) return;
  await page.mouse.move(buttonBox.x + 12, buttonBox.y + buttonBox.height / 2);
  await expect
    .poll(
      () =>
        button.evaluate((element) =>
          Number(getComputedStyle(element, "::after").opacity),
        ),
      { message: "cursor-origin button feedback should enter its hover state" },
    )
    .toBeGreaterThan(0);

  const buttonFeedback = await button.evaluate((element) => ({
    opacity: getComputedStyle(element, "::after").opacity,
    pointerX: element.style.getPropertyValue("--t7-pointer-x"),
    pointerY: element.style.getPropertyValue("--t7-pointer-y"),
    backgroundImage: getComputedStyle(element, "::after").backgroundImage,
    transform: getComputedStyle(element, "::after").transform,
  }));
  expect(buttonFeedback.pointerX).not.toBe("");
  expect(buttonFeedback.pointerY).not.toBe("");
  expect(Number(buttonFeedback.opacity)).toBeGreaterThan(0);
  expect(buttonFeedback.backgroundImage).toContain("radial-gradient");
  expect(buttonFeedback.transform).toBe("none");

  const card = page
    .locator(".t7-card")
    .filter({ hasText: "Card → Select" })
    .first();
  await card.scrollIntoViewIfNeeded();
  const cardBox = await card.boundingBox();
  expect(cardBox).not.toBeNull();
  if (!cardBox) return;
  await page.mouse.move(cardBox.x + cardBox.width - 16, cardBox.y + 16);
  const cardFeedback = await card.evaluate((element) => ({
    borderColor: getComputedStyle(element).borderColor,
    boxShadow: getComputedStyle(element).boxShadow,
    transform: getComputedStyle(element).transform,
  }));
  expect(cardFeedback.borderColor).not.toBe("");
  expect(cardFeedback.boxShadow).not.toBe("");
  expect(cardFeedback.transform).toBe("none");
  await expect(card).not.toHaveAttribute("data-interactive", "true");
});

test("operations sidebar opens each domain surface", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/operations-tracker");

  const navigation = page.getByRole("navigation", {
    name: "Application navigation",
  });

  for (const view of [
    { label: "Customers", domain: "customers", heading: "Customer profiles" },
    { label: "Deliveries", domain: "deliveries", heading: "Delivery routes" },
    {
      label: "Supply & QC",
      domain: "supply",
      heading: "Purchase and quality queue",
    },
    { label: "Fleet", domain: "fleet", heading: "Fleet register" },
    {
      label: "Reports",
      domain: "reports",
      heading: "Operational report lines",
    },
  ]) {
    await navigation
      .getByRole("button", { name: view.label, exact: true })
      .click();
    await expect(
      navigation.getByRole("button", { name: view.label, exact: true }),
    ).toHaveAttribute("data-active", "true");
    const surface = page.locator(`[data-domain-view="${view.domain}"]`);
    await expect(surface).toBeVisible();
    await expect(
      surface.getByRole("heading", { name: view.heading }),
    ).toBeVisible();
    await expect(surface.locator(".t7-table tbody tr")).toHaveCount(4);
  }

  await navigation
    .getByRole("button", { name: "Customers", exact: true })
    .click();
  await page
    .locator('[data-domain-view="customers"] .t7-table tbody tr')
    .first()
    .click();
  await expect(
    page.getByRole("dialog", { name: "PT Cipta Pakan" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close detail drawer" }).click();

  await navigation
    .getByRole("button", { name: "Work queue", exact: true })
    .click();
  await expect(
    navigation.getByRole("button", { name: "Work queue", exact: true }),
  ).toHaveAttribute("data-active", "true");
  await expect(
    page.getByRole("region", { name: "Workstream health" }),
  ).toBeVisible();
  await expect(page.getByRole("region", { name: "Work queue" })).toContainText(
    "8 matches",
  );
});

test("operations navigation stays visible and usable on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/operations-tracker");

  await page
    .getByRole("button", { name: "Open application navigation", exact: true })
    .click();
  const navigation = page.getByRole("navigation", {
    name: "Application navigation",
  });
  for (const label of [
    "Work queue",
    "Customers",
    "Deliveries",
    "Supply & QC",
    "Fleet",
    "Reports",
  ]) {
    await expect(
      navigation.getByRole("button", { name: label, exact: true }),
    ).toBeVisible();
  }

  await expect(
    page.locator(".operations-milestone-section .t7-milestone-scroll"),
  ).toHaveCSS("overflow-x", "auto");
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);

  await navigation
    .getByRole("button", { name: "Customers", exact: true })
    .click();
  await expect(page.locator('[data-domain-view="customers"]')).toBeVisible();
  await expect(
    page.locator('[data-domain-view="customers"] .t7-table tbody tr'),
  ).toHaveCount(4);
  await expect(
    page.locator('[data-domain-view="customers"] .t7-table'),
  ).toBeVisible();
  const mobileTableOverflow = await page
    .locator('[data-domain-view="customers"] .t7-table-wrap')
    .evaluate((element) => element.scrollWidth > element.clientWidth);
  expect(mobileTableOverflow).toBe(true);
});

test("component lab commerce proof stays inside its card on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/component-lab");

  const geometry = await page
    .locator(".t7-cart-panel")
    .first()
    .evaluate((element) => {
      const panel = element.getBoundingClientRect();
      const cardContent = element
        .closest(".t7-card-content")
        ?.getBoundingClientRect();
      return {
        cardContentRight: cardContent?.right ?? null,
        panelRight: panel.right,
        panelWidth: panel.width,
        viewportRight: window.innerWidth,
      };
    });

  expect(geometry.panelWidth).toBeLessThanOrEqual(360);
  expect(geometry.panelRight).toBeLessThanOrEqual(
    (geometry.cardContentRight ?? geometry.viewportRight) + 1,
  );
  expect(geometry.panelRight).toBeLessThanOrEqual(geometry.viewportRight + 1);
});

test("semantic icon labels keep readable tiles on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/icons");

  const geometry = await page
    .locator(".compact-icon-grid")
    .first()
    .evaluate((grid) => {
      const styles = getComputedStyle(grid);
      const columns = styles.gridTemplateColumns
        .split(" ")
        .map((value) => value.trim())
        .filter(Boolean);
      const tiles = Array.from(grid.querySelectorAll(".library-icon-tile"));
      const labels = tiles.slice(0, 7).map((tile) => {
        const label = tile.querySelector('[data-t7-type="label"]');
        return label
          ? {
              clientWidth: label.clientWidth,
              scrollWidth: label.scrollWidth,
              text: label.textContent?.trim() ?? "",
            }
          : null;
      });
      return {
        columns: columns.length,
        labels,
        tileWidth: tiles[0]?.getBoundingClientRect().width ?? 0,
      };
    });

  expect(geometry.columns).toBeLessThanOrEqual(3);
  expect(geometry.tileWidth).toBeGreaterThanOrEqual(96);
  for (const label of geometry.labels) {
    if (label) {
      expect(
        label.scrollWidth,
        `${label.text} should fit within its semantic icon tile`,
      ).toBeLessThanOrEqual(label.clientWidth + 1);
    }
  }
});

test("ebook grid keeps card prices and actions aligned", async ({ page }) => {
  await page.setViewportSize({ width: 1186, height: 698 });
  await page.goto("/ebook-store");

  const ebookSurface = page.locator(".ebook-reference");
  await expect(
    ebookSurface.getByText("EPUB + PDF", { exact: true }),
  ).toHaveCount(0);

  const firstRow = page.locator(
    ".ebook-product-grid[data-view='grid'] .ebook-product-card",
  );
  const geometry = await firstRow.evaluateAll((cards) =>
    cards.slice(0, 4).map((card) => {
      const getRect = (selector: string) => {
        const rect = card.querySelector(selector)?.getBoundingClientRect();
        return rect
          ? { bottom: rect.bottom, top: rect.top }
          : { bottom: null, top: null };
      };
      const cardRect = card.getBoundingClientRect();
      const actionElement = card.querySelector(".t7-product-actions");
      return {
        actions: getRect(".t7-product-actions"),
        actionButtons: actionElement
          ? Array.from(actionElement.querySelectorAll(".t7-button")).map(
              (button) => ({
                clientWidth: button.clientWidth,
                scrollWidth: button.scrollWidth,
              }),
            )
          : [],
        card: { bottom: cardRect.bottom, top: cardRect.top },
        price: getRect(".t7-product-price"),
      };
    }),
  );

  expect(geometry).toHaveLength(4);
  for (const key of ["top", "bottom"] as const) {
    const actionValues = geometry.map((item) => item.actions[key] ?? 0);
    const cardValues = geometry.map((item) => item.card[key]);
    const priceValues = geometry.map((item) => item.price[key] ?? 0);
    expect(
      Math.max(...actionValues) - Math.min(...actionValues),
    ).toBeLessThanOrEqual(1);
    expect(
      Math.max(...cardValues) - Math.min(...cardValues),
    ).toBeLessThanOrEqual(1);
    expect(
      Math.max(...priceValues) - Math.min(...priceValues),
    ).toBeLessThanOrEqual(1);
    for (const button of geometry.flatMap((item) => item.actionButtons)) {
      expect(button.scrollWidth).toBeLessThanOrEqual(button.clientWidth + 1);
    }
  }
});

test("public shells give navigation and content a deliberate breathing room", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1186, height: 698 });

  for (const route of ["/ebook-store", "/public-showcase"]) {
    await page.goto(route);
    const geometry = await page.evaluate(() => {
      const topbar = document.querySelector(".t7-public-shell .t7-app-topbar");
      const pageSurface = document.querySelector(
        ".ebook-reference, .public-showcase-page",
      );
      if (!topbar || !pageSurface) return null;
      const topbarRect = topbar.getBoundingClientRect();
      const pageRect = pageSurface.getBoundingClientRect();
      return {
        gap: pageRect.top - topbarRect.bottom,
        paddingTop: getComputedStyle(
          document.querySelector(".t7-public-shell .t7-app-content")!,
        ).paddingTop,
      };
    });

    expect(geometry, `${route} should expose the shared public shell`).not.toBe(
      null,
    );
    expect(geometry?.gap).toBeGreaterThanOrEqual(20);
    expect(geometry?.paddingTop).not.toBe("0px");
  }
});

test("publishing cart adapts between desktop popover and mobile drawer", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/ebook-store");
  await page
    .getByRole("button", { name: "Tambah ke keranjang" })
    .first()
    .click();
  // The app intentionally uses tokenized smooth scrolling; let that motion settle
  // before capturing the cart state so this visual assertion remains deterministic.
  await page.waitForTimeout(260);
  const desktopTrigger = page.getByRole("button", {
    name: "1 item di keranjang",
  });
  await expect(desktopTrigger.locator(".t7-cart-trigger-count")).toHaveText(
    "1",
  );
  await desktopTrigger.click();
  await expect(page.getByRole("region", { name: "Keranjang" })).toBeVisible();
  await expect(
    page.locator("#t7-overlay-root .t7-cart-line-item"),
  ).toBeVisible();
  await expect(page).toHaveScreenshot("publishing-cart-desktop.png", {
    animations: "disabled",
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page
    .getByRole("button", { name: "Tambah ke keranjang" })
    .first()
    .click();
  await page.waitForTimeout(260);
  await page.getByRole("button", { name: "1 item di keranjang" }).click();
  const drawer = page.getByRole("dialog", { name: "Keranjang" });
  await expect(drawer).toBeVisible();
  await expect(drawer.locator(".t7-cart-panel-header")).toBeHidden();
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
  await expect(page).toHaveScreenshot("publishing-cart-mobile.png", {
    animations: "disabled",
  });
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
});

test("reduced motion collapses transition duration", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/component-lab");
  const duration = await page
    .getByRole("button", { name: "Open modal" })
    .evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(duration).toMatch(/^(?:1e-05|0\.00001)s/);
});
