import { expect, test } from "@playwright/test";

const recipeIntents = {
  commerce: "Discovery and buying clarity",
  editorial: "Reading-led hierarchy",
  enterprise: "Quiet operational surfaces",
  product: "Balanced application rhythm",
} as const;
const recipeLabels = {
  commerce: "Commerce",
  editorial: "Editorial",
  enterprise: "Enterprise",
  product: "Product",
} as const;

async function clearPersistedTheme(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    window.localStorage.removeItem("ten4seven.playground.theme.v1");
    window.localStorage.removeItem(
      "ten4seven.playground.runtime-preferences.v1",
    );
  });
}

test("Theme Studio recipe choices expose authored intent and demoted diagnostics", async ({
  page,
}) => {
  await page.setViewportSize({ height: 844, width: 390 });
  await page.goto("/theme-studio");

  const workbench = page.getByTestId("theme-recipe-workbench");
  for (const [recipe, intent] of Object.entries(recipeIntents) as Array<
    [keyof typeof recipeIntents, string]
  >) {
    const option = workbench.locator(`button[data-recipe="${recipe}"]`);
    await expect(option).toHaveAttribute("aria-label", recipeLabels[recipe]);
    await expect(option.locator("small")).toHaveText(intent);
  }

  const enterprise = workbench.locator('button[data-recipe="enterprise"]');
  await enterprise.click();
  await expect(enterprise).toHaveAttribute("aria-pressed", "true");
  await expect(
    workbench.locator('button[data-recipe="product"]'),
  ).toHaveAttribute("aria-pressed", "false");

  const diagnostics = page.locator(".studio-live-preview-diagnostics");
  await expect(diagnostics).not.toHaveAttribute("open", "");
  await expect(
    page.locator(
      ".studio-live-preview-action-row .studio-live-preview-meta, .studio-live-preview-field .studio-live-preview-meta",
    ),
  ).toHaveCount(0);
  await diagnostics.getByText("Semantic diagnostics", { exact: true }).click();
  await expect(diagnostics).toHaveAttribute("open", "");
  await expect(diagnostics.locator('[data-live-value="primary"]')).toHaveText(
    "indigo · primary role",
  );
});

test("Theme Studio restores recipe-backed Shape authoring without touching runtime preferences", async ({
  page,
}) => {
  await clearPersistedTheme(page);
  await page.setViewportSize({ height: 900, width: 1440 });
  await page.goto("/theme-studio");

  const provider = page.locator(".t7-provider");
  const workbench = page.getByTestId("theme-recipe-workbench");
  const shape = page.getByTestId("studio-shape-editor");
  const slider = shape.getByRole("slider", { name: "Base radius" });

  await expect(shape).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Shape", exact: true }),
  ).toBeVisible();
  for (const preset of ["Sharp", "Soft", "Rounded"]) {
    await expect(
      shape.getByRole("button", { name: preset, exact: true }),
    ).toBeVisible();
  }

  await workbench
    .getByRole("button", { name: "Editorial", exact: true })
    .click();
  await expect(provider).toHaveAttribute("data-t7-theme", "editorial");
  await expect(provider).toHaveAttribute("data-radius", "sharp");
  await expect(provider).not.toHaveAttribute("data-radius-value");
  await expect(shape).toHaveAttribute("data-radius-mode", "sharp");
  await expect(
    shape.getByRole("button", { name: "Sharp", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");

  await workbench
    .getByRole("group", { name: "Density", exact: true })
    .getByRole("button", { name: "Compact", exact: true })
    .click();
  await shape.getByRole("button", { name: "Soft", exact: true }).click();
  await expect(provider).toHaveAttribute("data-radius", "soft");
  await expect(provider).not.toHaveAttribute("data-radius-value");
  await expect(provider).toHaveAttribute("data-t7-density", "compact");

  await slider.focus();
  await slider.press("Home");
  for (let index = 0; index < 14; index += 1) await slider.press("ArrowRight");
  await expect(slider).toHaveValue("14");
  await expect(shape).toHaveAttribute("data-radius-mode", "custom");
  await expect(shape).toContainText("Custom shape");
  await expect(provider).toHaveAttribute("data-t7-theme", "editorial");
  await expect(provider).toHaveAttribute("data-t7-density", "compact");
  await expect(provider).toHaveAttribute("data-radius-value", "14");
  await expect(shape.locator('[data-radius-role="control"] dd')).toHaveText(
    "12px",
  );
  await expect(shape.locator('[data-radius-role="panel"] dd')).toHaveText(
    "19px",
  );
  await expect(shape.locator('[data-radius-role="card"] dd')).toHaveText(
    "21px",
  );
  await expect(shape.locator('[data-radius-role="shell"] dd')).toHaveText(
    "28px",
  );

  await slider.press("End");
  await expect(slider).toHaveValue("24");
  await expect(provider).toHaveAttribute("data-radius-value", "24");
  await expect(shape.locator('[data-radius-role="shell"] dd')).toHaveText(
    "48px",
  );

  await workbench
    .getByRole("group", { name: "Appearance", exact: true })
    .getByRole("button", { name: "Dark", exact: true })
    .click();
  const darkGeometry = await provider.evaluate((element) => {
    const style = getComputedStyle(element);
    return [
      style.getPropertyValue("--t7-radius-indicator"),
      style.getPropertyValue("--t7-radius-control"),
      style.getPropertyValue("--t7-radius-base"),
      style.getPropertyValue("--t7-radius-panel"),
      style.getPropertyValue("--t7-radius-card"),
      style.getPropertyValue("--t7-radius-shell"),
    ];
  });
  await workbench
    .getByRole("group", { name: "Appearance", exact: true })
    .getByRole("button", { name: "Light", exact: true })
    .click();
  const lightGeometry = await provider.evaluate((element) => {
    const style = getComputedStyle(element);
    return [
      style.getPropertyValue("--t7-radius-indicator"),
      style.getPropertyValue("--t7-radius-control"),
      style.getPropertyValue("--t7-radius-base"),
      style.getPropertyValue("--t7-radius-panel"),
      style.getPropertyValue("--t7-radius-card"),
      style.getPropertyValue("--t7-radius-shell"),
    ];
  });
  expect(lightGeometry).toEqual(darkGeometry);

  await shape
    .getByRole("button", { name: "Reset recipe shape", exact: true })
    .click();
  await expect(provider).toHaveAttribute("data-t7-theme", "editorial");
  await expect(provider).toHaveAttribute("data-radius", "sharp");
  await expect(provider).not.toHaveAttribute("data-radius-value");
  await expect(provider).toHaveAttribute("data-t7-density", "compact");
  await expect(
    shape.getByRole("button", { name: "Sharp", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");

  const developerDelivery = page.locator(".studio-developer-delivery");
  await developerDelivery
    .getByRole("button", { name: /Developer delivery/i })
    .click();
  const cssFirstProof = page.getByTestId("css-first-theme-proof");
  await expect(cssFirstProof).toBeVisible();
  await expect(cssFirstProof).toHaveCSS("--t7-radius-base", "8px");
});

test("Operations workflow progress exposes integrated stage states", async ({
  page,
}) => {
  await page.setViewportSize({ height: 900, width: 1440 });
  await page.goto("/operations-tracker");

  const section = page.locator(".operations-milestone-section");
  await expect(
    section.getByRole("heading", { name: "Workflow progress" }),
  ).toBeVisible();
  await expect(section).not.toContainText("5-stage workflow");
  await expect(section).not.toContainText("Illustrative fixture flow");
  await expect(section.locator(".t7-milestone-stage-header")).toHaveCount(5);
  await expect(section.locator(".t7-milestone-meter")).toHaveCount(5);
  await expect(
    section.locator(".t7-milestone-meter-value").first(),
  ).toHaveAttribute("style", /--t7-milestone-progress: 100%/);
  await expect(section.getByRole("button", { name: /Triage/ })).toHaveAttribute(
    "aria-current",
    "step",
  );
  await expect(section.getByRole("button", { name: /Triage/ })).toContainText(
    "In progress",
  );

  const execution = section.getByRole("button", { name: /Execution/ });
  await execution.focus();
  await expect(execution).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(execution).toHaveAttribute("aria-current", "step");
  await expect(
    section.getByRole("region", { name: "Execution milestone details" }),
  ).toContainText("3 workstreams on track");
});

test("Operations milestones stay readable at compact desktop width", async ({
  page,
}) => {
  await page.setViewportSize({ height: 700, width: 954 });
  await page.goto("/operations-tracker");

  const section = page.locator(".operations-milestone-section");
  const tracker = section.locator(".t7-milestone-tracker");
  await expect(tracker).toBeVisible();

  const layout = await tracker.evaluate((element) => {
    const list = element.querySelector<HTMLElement>(".t7-milestone-list");
    const labels = [
      ...element.querySelectorAll<HTMLElement>(".t7-milestone-copy strong"),
    ];
    return {
      listColumns: list ? getComputedStyle(list).gridTemplateColumns : "",
      labels: labels.map((label) => ({
        text: label.textContent?.trim() ?? "",
        clientWidth: label.clientWidth,
        scrollWidth: label.scrollWidth,
      })),
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    };
  });

  expect(layout.listColumns.trim().split(/\s+/)).toHaveLength(5);
  expect(layout.labels.map((label) => label.text)).toEqual([
    "Capture",
    "Triage",
    "Next action",
    "Execution",
    "Follow-up",
  ]);
  for (const label of layout.labels) {
    expect(label.scrollWidth).toBeLessThanOrEqual(label.clientWidth + 1);
  }
  expect(layout.overflow).toBeLessThanOrEqual(1);
});

test("Public Showcase keeps consumer copy free of local fixture framing", async ({
  page,
}) => {
  await page.setViewportSize({ height: 900, width: 1440 });
  await page.goto("/public-showcase");

  await expect(
    page.getByText("Local reference fixture", { exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByText(/Illustrative local coverage trend chart/i),
  ).toHaveCount(0);
  await expect(
    page.getByRole("img", { name: "Coverage trend chart" }),
  ).toBeVisible();
});

test("shared Theme Settings stays available across every product shell", async ({
  page,
}) => {
  await page.setViewportSize({ height: 900, width: 1440 });

  const routes = [
    ["/theme-studio", "Open settings"],
    ["/component-lab", "Open settings"],
    ["/operations-tracker", "Open operations settings"],
    ["/ebook-store", "Open settings"],
    ["/public-showcase", "Open settings"],
  ] as const;

  for (const [path, triggerName] of routes) {
    await page.goto(path);
    await page.getByRole("button", { name: triggerName, exact: true }).click();
    const sheet = page.getByRole("dialog", { name: "Theme settings" });
    await expect(sheet).toBeVisible();
    await expect(sheet.getByTestId("theme-settings-panel")).toBeVisible();
    await expect(
      sheet.getByRole("button", { name: "Open Theme Studio", exact: true }),
    ).toBeVisible();
    await sheet
      .getByRole("button", { name: "Close theme settings", exact: true })
      .click();
    await expect(sheet).toBeHidden();
  }
});

test("Theme Settings changes the shared provider live and can open the workbench", async ({
  page,
}) => {
  await clearPersistedTheme(page);
  await page.setViewportSize({ height: 900, width: 1440 });
  await page.goto("/operations-tracker");

  const provider = page.locator(".t7-provider");
  await page
    .getByRole("button", { name: "Open operations settings", exact: true })
    .click();
  const sheet = page.getByRole("dialog", { name: "Theme settings" });

  await sheet.getByRole("button", { name: "Product", exact: true }).click();
  await expect(provider).toHaveAttribute("data-t7-theme", "product");
  await sheet.getByRole("button", { name: "Dark", exact: true }).click();
  await expect(provider).toHaveAttribute("data-t7-mode", "dark");
  await sheet.getByRole("button", { name: "Rounded", exact: true }).click();
  await expect(provider).toHaveAttribute("data-radius", "rounded");

  await sheet
    .getByRole("button", { name: "Reset settings", exact: true })
    .click();
  await expect(provider).toHaveAttribute("data-t7-theme", "custom");
  await expect(provider).toHaveAttribute("data-t7-density", "default");

  await sheet.getByRole("button", { name: "Product", exact: true }).click();
  await sheet
    .getByRole("button", { name: "Open Theme Studio", exact: true })
    .click();
  await expect(page).toHaveURL(/\/theme-studio$/);
  await expect(
    page.getByRole("heading", { name: "Theme Studio" }),
  ).toBeVisible();
  await expect(
    page.getByRole("dialog", { name: "Theme settings" }),
  ).toBeHidden();
});
