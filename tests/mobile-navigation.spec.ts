import { expect, test } from "@playwright/test";
import axe from "axe-core";

for (const width of [360, 390, 768]) {
  test(`mobile menu and bottom shortcuts stay reachable at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 700 });
    await page.goto("/tokens");
    const shortcuts = page.getByRole("navigation", {
      name: "Mobile shortcuts",
    });
    await expect(shortcuts).toBeVisible();
    await expect(
      shortcuts.getByRole("button", { name: "Tokens", exact: true }),
    ).toHaveAttribute("aria-current", "page");
    const menu = shortcuts.getByRole("button", { name: "Menu", exact: true });
    await menu.click();
    const dialog = page.getByRole("dialog", {
      name: "Design system navigation",
    });
    await expect(dialog).toBeVisible();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    const panel = dialog.locator(".t7-drawer");
    await expect.poll(async () => (await panel.boundingBox())?.x).toBe(0);
    const rect = await panel.boundingBox();
    expect(rect!.x).toBe(0);
    expect(rect!.width).toBeLessThan(width);
    const targets = await dialog
      .locator(".t7-nav-item")
      .evaluateAll((nodes) =>
        nodes.map((n) => n.getBoundingClientRect().height),
      );
    expect(targets.every((h) => h >= 44)).toBeTruthy();
    await expect
      .poll(() => page.evaluate(() => document.body.style.overflow))
      .toBe("hidden");
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(menu).toBeFocused();
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await expect
      .poll(() => page.evaluate(() => document.body.style.overflow))
      .not.toBe("hidden");
    await menu.click();
    await dialog
      .getByRole("button", { name: "Components", exact: true })
      .click();
    await expect(page).toHaveURL(/\/components$/);
    await expect(dialog).not.toBeVisible();
    await expect(
      shortcuts.getByRole("button", { name: "Components", exact: true }),
    ).toHaveAttribute("aria-current", "page");
    const bar = await shortcuts.boundingBox();
    const reserved = await page
      .locator(".t7-bottom-navigation-slot")
      .boundingBox();
    expect(reserved!.height).toBeCloseTo(bar!.height, 0);
    await menu.click();
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(dialog).not.toBeVisible();
    await expect(shortcuts).not.toBeVisible();
    await expect(page.locator(".studio-sidebar")).toBeVisible();
  });
}

test("application sidebar stays vertical, dismisses on selection and restores desktop navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 650 });
  await page.goto("/operations-tracker");
  const trigger = page.getByRole("button", {
    name: "Open application navigation",
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Application navigation" });
  await expect(dialog).toBeVisible();
  await expect
    .poll(async () => (await dialog.locator(".t7-drawer").boundingBox())?.x)
    .toBe(0);
  const links = dialog.locator(".t7-nav-item");
  const positions = await links.evaluateAll((nodes) =>
    nodes.map((n) => {
      const r = n.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    }),
  );
  expect(positions.length).toBeGreaterThan(3);
  for (let i = 1; i < positions.length; i++) {
    expect(positions[i].x).toBe(positions[0].x);
    expect(positions[i].y).toBeGreaterThan(positions[i - 1].y);
    expect(positions[i].height).toBeGreaterThanOrEqual(44);
  }
  await dialog.getByRole("button", { name: "Customers", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await trigger.click();
  await page.mouse.click(389, 200);
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(dialog).not.toBeVisible();
  await expect(page.locator(".t7-app-sidebar")).toBeVisible();
  await expect(trigger).not.toBeVisible();
});

test("dark dense mobile navigation keeps accessible contrast and target sizes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 700 });
  await page.goto("/tokens");
  await page
    .getByRole("button", { name: "Open settings", exact: true })
    .click();
  const settings = page.getByRole("dialog", { name: "Theme settings" });
  for (const name of ["Dark", "Dense", "More"]) {
    await settings.getByRole("button", { name, exact: true }).click();
  }
  await page.keyboard.press("Escape");
  await page.addScriptTag({ content: axe.source });
  const shortcuts = page.getByRole("navigation", { name: "Mobile shortcuts" });
  const barResults = await shortcuts.evaluate(async (node) => {
    const result = await (window as unknown as { axe: typeof axe }).axe.run(
      node,
      { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] } },
    );
    return result.violations.map((v) => ({ id: v.id, impact: v.impact }));
  });
  expect(barResults).toEqual([]);
  await shortcuts.getByRole("button", { name: "Menu", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Design system navigation" });
  await expect
    .poll(() =>
      dialog.evaluate((node) =>
        node
          .getAnimations({ subtree: true })
          .every((animation) => animation.playState === "finished"),
      ),
    )
    .toBeTruthy();
  const result = await dialog.evaluate(async (node) => {
    const result = await (window as unknown as { axe: typeof axe }).axe.run(
      node,
      { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] } },
    );
    return result.violations.map((v) => ({ id: v.id, impact: v.impact }));
  });
  expect(result).toEqual([]);
  const targets = await dialog
    .locator(".t7-nav-item")
    .evaluateAll((nodes) => nodes.map((n) => n.getBoundingClientRect().height));
  expect(targets.every((height) => height >= 44)).toBeTruthy();
});

test("short mobile modal keeps header visible and body scrolling within safe areas", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 600 });
  await page.goto("/tokens");
  const trigger = page.getByRole("button", {
    name: "Open ten4seven reference QA controls",
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", {
    name: "Reference QA",
    exact: true,
  });
  await expect(dialog).toBeVisible();
  await page.setViewportSize({ width: 390, height: 340 });
  await dialog.evaluate((n) => {
    (n as HTMLElement).style.setProperty("--t7-safe-area-top", "24px");
    (n as HTMLElement).style.setProperty("--t7-safe-area-bottom", "20px");
  });
  const header = dialog.locator(".t7-modal-header");
  await expect
    .poll(() =>
      dialog
        .locator(".t7-modal")
        .evaluate((n) =>
          n.getAnimations().every((a) => a.playState === "finished"),
        ),
    )
    .toBeTruthy();
  const initial = await header.boundingBox();
  const body = dialog.locator(".t7-modal-body");
  await body.evaluate((n) => {
    n.scrollTop = n.scrollHeight;
  });
  const geometry = await body.evaluate((n) => ({
    top: n.scrollTop,
    height: n.clientHeight,
    full: n.scrollHeight,
    bottom: n.getBoundingClientRect().bottom,
  }));
  expect(geometry.top).toBeGreaterThan(0);
  expect(geometry.full).toBeGreaterThan(geometry.height);
  expect(geometry.bottom).toBeLessThanOrEqual(320);
  expect((await header.boundingBox())!.y).toBe(initial!.y);
  expect(initial!.y).toBeGreaterThanOrEqual(24);
  await dialog.getByRole("button", { name: "Close dialog" }).focus();
  await page.keyboard.press("Shift+Tab");
  expect(
    await dialog.evaluate((n) => n.contains(document.activeElement)),
  ).toBeTruthy();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
