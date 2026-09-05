import { expect, test, type Locator, type Page } from "@playwright/test";

async function clearPersistedPlaygroundTheme(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.removeItem("ten4seven.playground.theme.v1");
    window.localStorage.removeItem(
      "ten4seven.playground.runtime-preferences.v1",
    );
  });
}

function runtimePreference(
  workbench: Locator,
  label: "Appearance" | "Density" | "Contrast" | "Motion",
) {
  return workbench.getByRole("group", { name: label, exact: true });
}

async function chooseRuntimePreference(
  workbench: Locator,
  label: "Appearance" | "Density" | "Contrast" | "Motion",
  option: string,
) {
  const group = runtimePreference(workbench, label);
  await expect(group).toBeVisible();
  await group.getByRole("button", { name: option, exact: true }).click();
}

async function openDeveloperDelivery(page: Page) {
  const trigger = page
    .locator(".studio-developer-delivery")
    .getByRole("button", { name: /Developer delivery/i });
  if ((await trigger.getAttribute("aria-expanded")) !== "true")
    await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
}

async function semanticTokens(locator: Locator) {
  return locator.evaluate((element) => {
    const style = getComputedStyle(element);
    const probe = document.createElement("span");
    probe.style.cssText =
      "position:absolute;visibility:hidden;width:var(--t7-radius-data)";
    element.append(probe);
    const dataRadius = getComputedStyle(probe).width;
    probe.remove();
    return {
      dataRadius,
      headerHeight: style.getPropertyValue("--t7-header-height").trim(),
      gridGap: style.getPropertyValue("--t7-grid-gap").trim(),
      background: style.getPropertyValue("--t7-background-hsl").trim(),
      controlHeight: style.getPropertyValue("--t7-control-height").trim(),
      focusWidth: style.getPropertyValue("--t7-focus-width").trim(),
      focusRing: style.getPropertyValue("--t7-focus-ring").trim(),
      foreground: style.getPropertyValue("--t7-foreground-hsl").trim(),
      fontDisplay: style.getPropertyValue("--t7-font-display").trim(),
      motionDuration: style.getPropertyValue("--t7-motion-duration").trim(),
      recipe: style.getPropertyValue("--t7-theme-recipe").trim(),
    };
  });
}

test.describe("Universal Design System v2 Theme Studio", () => {
  test("system appearance follows the browser preference after an explicit runtime reset", async ({
    page,
  }) => {
    await clearPersistedPlaygroundTheme(page);
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/theme-studio");

    const provider = page.locator(".t7-provider");
    const workbench = page.getByTestId("theme-recipe-workbench");
    await expect(provider).toHaveAttribute("data-t7-mode", "dark");
    await expect(
      runtimePreference(workbench, "Appearance").getByRole("button", {
        name: "System",
        exact: true,
      }),
    ).toHaveAttribute("aria-pressed", "true");

    await chooseRuntimePreference(workbench, "Appearance", "Light");
    await expect(provider).toHaveAttribute("data-t7-mode", "light");

    await chooseRuntimePreference(workbench, "Appearance", "System");
    await expect(provider).toHaveAttribute("data-t7-mode", "dark");

    await page.emulateMedia({ colorScheme: "light" });
    await expect(provider).toHaveAttribute("data-t7-mode", "light");
    await page.emulateMedia({ colorScheme: "dark" });
    await expect(provider).toHaveAttribute("data-t7-mode", "dark");
  });

  test("named recipes retain independent runtime preferences and inverse scopes", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/theme-studio");

    const provider = page.locator(".t7-provider");
    const workbench = page.getByTestId("theme-recipe-workbench");
    await expect(workbench).toBeVisible();

    await workbench
      .getByRole("button", { name: "Enterprise", exact: true })
      .click();
    await expect(provider).toHaveAttribute("data-t7-theme", "enterprise");
    await expect(provider).toHaveAttribute("data-t7-expression", "operational");
    await expect(workbench).toContainText("Enterprise recipe");

    await chooseRuntimePreference(workbench, "Appearance", "Dark");
    await chooseRuntimePreference(workbench, "Density", "Compact");
    await chooseRuntimePreference(workbench, "Contrast", "More");
    await chooseRuntimePreference(workbench, "Motion", "Reduced");

    await expect(provider).toHaveAttribute("data-t7-mode", "dark");
    await expect(provider).toHaveAttribute("data-t7-density", "compact");
    await expect(provider).toHaveAttribute("data-t7-contrast", "more");
    await expect(provider).toHaveAttribute(
      "data-t7-motion-preference",
      "reduced",
    );

    const providerTokens = await semanticTokens(provider);
    expect(providerTokens.controlHeight).toBe("36px");
    expect(providerTokens.focusWidth).toBe("3px");
    expect(providerTokens.focusRing).toContain("3px");
    expect(providerTokens.motionDuration).toBe("0.01ms");

    const inverseScope = page.locator(
      '[aria-label="Inverse theme scope proof"]',
    );
    await expect(inverseScope).toBeVisible();
    await expect(inverseScope).toHaveAttribute("data-t7-tone", "inverse");
    await expect(inverseScope).toHaveAttribute("data-t7-theme", "enterprise");
    await expect(inverseScope).toHaveAttribute("data-t7-mode", "light");
    await expect(inverseScope).toHaveAttribute("data-t7-density", "compact");
    await expect(inverseScope).toHaveAttribute("data-t7-contrast", "more");
    await expect(inverseScope).toHaveAttribute(
      "data-t7-motion-preference",
      "reduced",
    );
    await expect(
      inverseScope.getByRole("button", { name: "Scoped action" }),
    ).toBeVisible();

    const inverseTokens = await semanticTokens(inverseScope);
    expect(inverseTokens.background).not.toBe(providerTokens.background);
    expect(inverseTokens.foreground).not.toBe(providerTokens.foreground);
    expect(inverseTokens.controlHeight).toBe(providerTokens.controlHeight);
    expect(inverseTokens.focusWidth).toBe("3px");
    expect(inverseTokens.focusRing).toContain("3px");
    expect(inverseTokens.focusRing).not.toBe(providerTokens.focusRing);
    expect(inverseTokens.motionDuration).toBe(providerTokens.motionDuration);

    const nestedScope = page.locator(
      '[aria-label="Nested ThemeScope composition proof"]',
    );
    await expect(nestedScope).toBeVisible();
    await expect(nestedScope).toHaveAttribute("data-t7-tone", "inverse");
    await expect(nestedScope).toHaveAttribute("data-t7-mode", "dark");
    expect((await semanticTokens(nestedScope)).background).toBe(
      providerTokens.background,
    );

    const editorialScope = page.locator(
      '[aria-label="Editorial recipe scope proof"]',
    );
    await expect(editorialScope).toBeVisible();
    await expect(editorialScope).toHaveAttribute("data-t7-theme", "editorial");
    await expect(editorialScope).toHaveAttribute(
      "data-t7-expression",
      "editorial",
    );
    await expect(editorialScope).toHaveAttribute("data-t7-mode", "light");
    await expect(editorialScope).toHaveAttribute(
      "data-t7-density",
      "comfortable",
    );
    const editorialTokens = await semanticTokens(editorialScope);
    expect(editorialTokens.fontDisplay).toContain("Source Serif 4");
    expect(editorialTokens.controlHeight).toBe("44px");

    await openDeveloperDelivery(page);
    const cssFirstProof = page.getByTestId("css-first-theme-proof");
    await expect(cssFirstProof).toBeVisible();
    await expect(cssFirstProof).toHaveAttribute("data-t7-theme", "editorial");
    await expect(cssFirstProof).toHaveAttribute("data-t7-mode", "dark");
    await expect(cssFirstProof).toHaveAttribute("data-t7-density", "compact");
    const cssFirstTokens = await semanticTokens(cssFirstProof);
    expect(cssFirstTokens.recipe).toBe("editorial");
    expect(cssFirstTokens.controlHeight).toBe("36px");
    expect(cssFirstTokens.focusWidth).toBe("3px");
    expect(cssFirstTokens.focusRing).toContain("3px");
    expect(cssFirstTokens.motionDuration).toBe("0.01ms");
    expect(cssFirstTokens.fontDisplay).toContain("Source Serif 4");
    expect(cssFirstTokens.dataRadius).toBe("10px");
    expect(cssFirstTokens.dataRadius).toBe(providerTokens.dataRadius);
    expect(cssFirstTokens.headerHeight).toBe(providerTokens.headerHeight);
    expect(cssFirstTokens.gridGap).toBe(providerTokens.gridGap);
  });

  test("an inverse ThemeScope keeps its action focusable and bounded on a narrow viewport", async ({
    page,
  }) => {
    await clearPersistedPlaygroundTheme(page);
    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/theme-studio");

    const workbench = page.getByTestId("theme-recipe-workbench");
    await workbench
      .getByRole("button", { name: "Enterprise", exact: true })
      .click();
    await chooseRuntimePreference(workbench, "Appearance", "Dark");
    await chooseRuntimePreference(workbench, "Density", "Compact");
    await chooseRuntimePreference(workbench, "Contrast", "More");

    const inverseScope = page.locator(
      '[aria-label="Inverse theme scope proof"]',
    );
    const nestedScope = inverseScope.locator(
      '[aria-label="Nested ThemeScope composition proof"]',
    );
    const action = inverseScope.getByRole("button", {
      name: "Scoped action",
      exact: true,
    });
    await action.scrollIntoViewIfNeeded();
    await expect(inverseScope).toHaveAttribute("data-t7-mode", "light");
    const inverseTokens = await semanticTokens(inverseScope);
    expect(inverseTokens.focusWidth).toBe("3px");
    expect(inverseTokens.focusRing).toContain("3px");
    await expect(action).toBeVisible();

    // Move away from and back to the scoped control through the keyboard so
    // the assertion verifies the actual :focus-visible contract, not merely
    // programmatic focus ownership.
    await action.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    await expect(action).toBeFocused();

    const focusAndLayout = await inverseScope.evaluate((scope) => {
      const action = scope.querySelector<HTMLButtonElement>("button");
      const scopeRect = scope.getBoundingClientRect();
      const actionRect = action?.getBoundingClientRect();
      const actionStyle = action ? getComputedStyle(action) : undefined;
      return {
        actionFocusVisible: action?.matches(":focus-visible") ?? false,
        actionLeft: actionRect?.left ?? null,
        actionRight: actionRect?.right ?? null,
        actionScrollWidth: action?.scrollWidth ?? null,
        actionClientWidth: action?.clientWidth ?? null,
        actionBoxShadow: actionStyle?.boxShadow ?? "",
        scopeLeft: scopeRect.left,
        scopeRight: scopeRect.right,
        scopeScrollWidth: scope.scrollWidth,
        scopeClientWidth: scope.clientWidth,
      };
    });
    expect(focusAndLayout.actionFocusVisible).toBe(true);
    expect(focusAndLayout.actionBoxShadow).not.toBe("none");
    expect(focusAndLayout.scopeScrollWidth).toBeLessThanOrEqual(
      focusAndLayout.scopeClientWidth + 1,
    );
    expect(focusAndLayout.actionScrollWidth).toBeLessThanOrEqual(
      (focusAndLayout.actionClientWidth ?? 0) + 1,
    );
    expect(focusAndLayout.actionLeft).not.toBeNull();
    expect(focusAndLayout.actionRight).not.toBeNull();
    expect(focusAndLayout.actionLeft!).toBeGreaterThanOrEqual(
      focusAndLayout.scopeLeft - 1,
    );
    expect(focusAndLayout.actionRight!).toBeLessThanOrEqual(
      focusAndLayout.scopeRight + 1,
    );

    const nestedLayout = await nestedScope.evaluate((scope) => {
      const rect = scope.getBoundingClientRect();
      return {
        clientWidth: scope.clientWidth,
        right: rect.right,
        scrollWidth: scope.scrollWidth,
        viewportWidth: window.innerWidth,
      };
    });
    expect(nestedLayout.scrollWidth).toBeLessThanOrEqual(
      nestedLayout.clientWidth + 1,
    );
    expect(nestedLayout.right).toBeLessThanOrEqual(
      nestedLayout.viewportWidth + 1,
    );
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(1);
  });

  test("an editorial ThemeScope portals canonical Select tokens without leaving the provider overlay root", async ({
    page,
  }) => {
    await clearPersistedPlaygroundTheme(page);
    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/theme-studio");

    const provider = page.locator(".t7-provider");
    const workbench = page.getByTestId("theme-recipe-workbench");
    await workbench
      .getByRole("button", { name: "Enterprise", exact: true })
      .click();
    await chooseRuntimePreference(workbench, "Appearance", "Dark");
    await chooseRuntimePreference(workbench, "Density", "Compact");

    const editorialScope = page.locator(
      '[aria-label="Editorial recipe scope proof"]',
    );
    const trigger = editorialScope.getByRole("button", {
      name: "Editorial scoped options",
      exact: true,
    });
    await trigger.scrollIntoViewIfNeeded();
    await expect(editorialScope).toHaveAttribute("data-t7-theme", "editorial");
    await expect(editorialScope).toHaveAttribute("data-t7-mode", "light");

    const providerTokens = await semanticTokens(provider);
    const editorialTokens = await semanticTokens(editorialScope);
    expect(editorialTokens.background).not.toBe(providerTokens.background);
    expect(editorialTokens.fontDisplay).not.toBe(providerTokens.fontDisplay);

    await trigger.focus();
    await trigger.press("ArrowDown");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    const bridge = page.locator("#t7-overlay-root .t7-floating-scope-bridge");
    const popup = bridge.locator(".t7-select-list");
    await expect(bridge).toHaveAttribute("data-t7-theme", "editorial");
    await expect(bridge).toHaveAttribute("data-t7-mode", "light");
    await expect(popup).toBeVisible();

    const popupTokens = await semanticTokens(popup);
    expect(popupTokens.background).toBe(editorialTokens.background);
    expect(popupTokens.foreground).toBe(editorialTokens.foreground);
    expect(popupTokens.controlHeight).toBe(editorialTokens.controlHeight);
    expect(popupTokens.fontDisplay).toBe(editorialTokens.fontDisplay);
    expect(popupTokens.focusRing).toBe(editorialTokens.focusRing);
    expect(popupTokens.motionDuration).toBe(editorialTokens.motionDuration);

    const popupTextFoundation = await popup.evaluate((element) => {
      const scope = document.querySelector<HTMLElement>(
        '[aria-label="Editorial recipe scope proof"]',
      );
      return {
        popupColor: getComputedStyle(element).color,
        popupFontFamily: getComputedStyle(element).fontFamily,
        scopeColor: scope ? getComputedStyle(scope).color : "",
        scopeFontFamily: scope ? getComputedStyle(scope).fontFamily : "",
      };
    });
    expect(popupTextFoundation.popupColor).toBe(popupTextFoundation.scopeColor);
    expect(popupTextFoundation.popupFontFamily).toBe(
      popupTextFoundation.scopeFontFamily,
    );

    const popupGeometry = await popup.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return {
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        top: rect.top,
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth,
      };
    });
    expect(popupGeometry.left).toBeGreaterThanOrEqual(8);
    expect(popupGeometry.right).toBeLessThanOrEqual(
      popupGeometry.viewportWidth - 8,
    );
    expect(popupGeometry.top).toBeGreaterThanOrEqual(8);
    expect(popupGeometry.bottom).toBeLessThanOrEqual(
      popupGeometry.viewportHeight - 8,
    );

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
    await expect(popup).toHaveCount(0);
  });
});
