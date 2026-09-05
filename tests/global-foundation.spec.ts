import { expect, test, type Page } from "@playwright/test";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const testRequire = createRequire(`${process.cwd()}/package.json`);
const scenarios = [
  {
    palette: "emerald",
    appearance: "light",
    density: "comfortable",
    contrast: "more",
    motion: "full",
    radius: "rounded",
    anchor: 1.25,
    width: 1440,
  },
  {
    palette: "blue",
    appearance: "dark",
    density: "dense",
    contrast: "more",
    motion: "full",
    radius: "sharp",
    anchor: 2.5,
    width: 1440,
  },
  {
    palette: "orange",
    appearance: "light",
    density: "dense",
    contrast: "standard",
    motion: "full",
    radius: "soft",
    anchor: 0.25,
    width: 390,
  },
  {
    palette: "red",
    appearance: "dark",
    density: "comfortable",
    contrast: "standard",
    motion: "reduced",
    radius: "rounded",
    anchor: 1.25,
    width: 390,
  },
  {
    palette: "violet",
    appearance: "light",
    density: "comfortable",
    contrast: "more",
    motion: "reduced",
    radius: "sharp",
    anchor: 1.5,
    width: 1440,
  },
  {
    palette: "slate",
    appearance: "dark",
    density: "dense",
    contrast: "more",
    motion: "full",
    radius: "soft",
    anchor: 2.5,
    width: 360,
  },
  {
    palette: "blue",
    appearance: "light",
    density: "dense",
    contrast: "standard",
    motion: "full",
    radius: "rounded",
    anchor: 2.5,
    width: 768,
  },
] as const;

async function configure(page: Page, scenario: (typeof scenarios)[number]) {
  await page.setViewportSize({ width: scenario.width, height: 900 });
  await page.addInitScript((config) => {
    localStorage.setItem(
      "ten4seven.playground.theme.v1",
      JSON.stringify({
        ...config,
        primary: config.palette,
        accent: config.palette,
        canvas: "balanced",
        typography: "modern",
        motionDuration: config.anchor,
      }),
    );
    localStorage.setItem(
      "ten4seven.playground.runtime-preferences.v1",
      JSON.stringify(config),
    );
  }, scenario);
  await page.goto("/tokens");
  await expect(page.locator(".t7-provider")).toHaveAttribute(
    "data-t7-mode",
    scenario.appearance,
  );
  await expect(
    page.locator('[data-resolved-token="--t7-duration-popup"]'),
  ).not.toHaveText("Resolving…");
  await page.evaluate(() => document.fonts.ready);
}

for (const scenario of scenarios)
  test(`foundation ${scenario.palette} ${scenario.appearance} ${scenario.density} ${scenario.contrast} ${scenario.motion} ${scenario.radius}`, async ({
    page,
  }) => {
    await configure(page, scenario);
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(1);
    const order = await page
      .locator('nav[aria-label="Token families"] a')
      .evaluateAll((links) =>
        links.map((link) => link.getAttribute("href")?.slice(1)),
      );
    expect(order).toEqual(
      await page
        .locator(".foundation-section")
        .evaluateAll((sections) => sections.map((section) => section.id)),
    );
    expect(order).toHaveLength(11);
    const motion = await page.locator(".t7-provider").evaluate((element) => {
      const styles = getComputedStyle(element);
      return Object.fromEntries(
        [
          "instant",
          "standard",
          "popup",
          "overlay",
          "layout",
          "reveal",
          "slow",
        ].map((role) => [
          role,
          parseFloat(styles.getPropertyValue(`--t7-duration-${role}`)),
        ]),
      );
    });
    expect(motion.popup).toBeLessThanOrEqual(230);
    expect(motion.standard).toBeLessThanOrEqual(300);
    expect(motion.overlay).toBeLessThanOrEqual(400);
    if (scenario.motion === "reduced")
      expect(Object.values(motion).every((value) => value <= 0.01)).toBe(true);
    const contrast = await page
      .locator(".foundation-page")
      .evaluate((element) => {
        const channels = (color: string) =>
          (color.match(/[\d.]+/g) || []).map(Number);
        const luminance = (rgb: number[]) =>
          rgb
            .slice(0, 3)
            .map((value) => {
              const channel = value / 255;
              return channel <= 0.04045
                ? channel / 12.92
                : ((channel + 0.055) / 1.055) ** 2.4;
            })
            .reduce(
              (sum, value, index) =>
                sum + value * [0.2126, 0.7152, 0.0722][index],
              0,
            );
        const ratio = (a: number[], b: number[]) =>
          (Math.max(luminance(a), luminance(b)) + 0.05) /
          (Math.min(luminance(a), luminance(b)) + 0.05);
        const background = (node: Element | null): number[] => {
          if (!node) return [255, 255, 255];
          const c = channels(getComputedStyle(node).backgroundColor),
            alpha = c[3] ?? 1;
          if (alpha === 1) return c;
          const behind = background(node.parentElement);
          return c
            .slice(0, 3)
            .map((value, index) => value * alpha + behind[index] * (1 - alpha));
        };
        const pairs = [
          ...element.querySelectorAll('[data-testid^="foundation-pair-"]'),
        ].map((card) => ({
          name: card.getAttribute("data-testid"),
          ratio: ratio(
            channels(getComputedStyle(card).color),
            background(card),
          ),
        }));
        const expressions = [
          ...element.querySelectorAll(
            '[data-testid^="foundation-expression-"]',
          ),
        ].map((card) => ({
          name: card.getAttribute("data-testid"),
          ratio: ratio(
            channels(getComputedStyle(card).color),
            background(card),
          ),
        }));
        const provider = element.closest(".t7-provider")!;
        const probe = document.createElement("span");
        provider.append(probe);
        probe.style.color = "hsl(var(--t7-focus-hsl))";
        const focus = ratio(
          channels(getComputedStyle(probe).color),
          background(provider),
        );
        const chart = [1, 2, 3, 4, 5].map((index) => {
          probe.style.color = `hsl(var(--t7-chart-${index}-hsl))`;
          return ratio(
            channels(getComputedStyle(probe).color),
            background(provider),
          );
        });
        probe.remove();
        const disabled =
          element.querySelector<HTMLButtonElement>("button:disabled")!;
        const disabledContrast = ratio(
          channels(getComputedStyle(disabled).color),
          background(disabled),
        );
        return {
          pairs,
          expressions,
          focus,
          chart,
          disabledContrast,
          disabledOpacity: getComputedStyle(disabled).opacity,
        };
      });
    for (const pair of [...contrast.pairs, ...contrast.expressions])
      expect(pair.ratio, pair.name || "surface").toBeGreaterThanOrEqual(4.5);
    expect(contrast.focus).toBeGreaterThanOrEqual(3);
    for (const ratio of contrast.chart) expect(ratio).toBeGreaterThanOrEqual(3);
    expect(contrast.disabledContrast).toBeGreaterThanOrEqual(4.5);
    expect(contrast.disabledOpacity).toBe("1");
    await expect(page.locator('[data-resolved-motion="js-popup"]')).toHaveText(
      scenario.motion === "reduced" ? "0ms" : `${motion.popup}ms`,
    );
    const action = page.getByTestId("foundation-focus-action");
    await action.focus();
    await page.keyboard.press("Tab");
    await expect(page.getByLabel("Focus field", { exact: true })).toBeFocused();
    expect(
      await page
        .getByLabel("Focus field", { exact: true })
        .evaluate((element) => getComputedStyle(element).boxShadow),
    ).not.toBe("none");
    await page.addScriptTag({
      path: testRequire.resolve("axe-core/axe.min.js"),
    });
    const violations = await page.evaluate(async () => {
      const result = await (
        window as unknown as {
          axe: {
            run: (
              context: string,
              options: unknown,
            ) => Promise<{
              violations: Array<{
                id: string;
                nodes: Array<{ target: string[]; failureSummary: string }>;
              }>;
            }>;
          };
        }
      ).axe.run(".foundation-page", {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
      });
      return result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary,
        })),
      }));
    });
    expect(violations).toEqual([]);
    const point = page.locator("#token-charts .t7-chart-point").first();
    await point.focus();
    await expect(page.locator("#token-charts .t7-chart-tooltip")).toContainText(
      "Research",
    );
    await expect(page.locator("#token-charts .t7-chart-tooltip")).toContainText(
      "Week 1",
    );
    expect(await point.getAttribute("aria-label")).toContain("12");
    if (process.env.T7_FOUNDATION_EVIDENCE) {
      const directory = resolve(
        "research/15-global-foundation-hardening/evidence/matrix",
      );
      await mkdir(directory, { recursive: true });
      const name = `${scenario.palette}-${scenario.appearance}-${scenario.width}`;
      await writeFile(
        resolve(directory, `${name}.json`),
        JSON.stringify(
          { scenario, motion, contrast, axeViolations: violations },
          null,
          2,
        ) + "\n",
      );
      await page.getByLabel("Focus field", { exact: true }).focus();
      await page.screenshot({
        path: resolve(directory, `${name}-focus.png`),
        animations: "disabled",
      });
      await page.locator("#token-surfaces").scrollIntoViewIfNeeded();
      await page.screenshot({
        path: resolve(directory, `${name}-surfaces.png`),
        animations: "disabled",
      });
    }
  });

test("token debugger updates for OS reduced motion, resizing, and runtime CSS overrides", async ({
  page,
}) => {
  await configure(page, scenarios[0]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(
    page.locator('[data-resolved-token="--t7-duration-popup"]'),
  ).toHaveText("0.01ms");
  await expect(page.locator('[data-resolved-motion="js-popup"]')).toHaveText(
    "0ms",
  );
  await expect(page.locator("#token-motion")).toContainText(
    "Effective behavior: reduced motion",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(
    page.locator('[data-resolved-token="--t7-duration-popup"]'),
  ).toHaveText("130ms");
  await page
    .locator(".t7-provider")
    .evaluate((element) =>
      (element as HTMLElement).style.setProperty("--t7-sidebar-width", "248px"),
    );
  await expect(
    page.locator('[data-resolved-token="--t7-sidebar-width"]'),
  ).toHaveText("248px");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(
    page.locator('[data-resolved-token="--t7-page-gutter"]'),
  ).toHaveText("24px");
  const specimen = page.locator(
    '.foundation-type-sample[data-t7-type="display-xl"]',
  );
  expect(
    await specimen.evaluate(
      (element) => element.scrollWidth - element.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
});

test("forced-colors retains a visible platform keyboard focus outline", async ({
  page,
}) => {
  await configure(page, scenarios[0]);
  await page.emulateMedia({ forcedColors: "active" });
  await page.getByTestId("foundation-focus-action").focus();
  await page.keyboard.press("Tab");
  const outline = await page
    .getByLabel("Focus field", { exact: true })
    .evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        width: parseFloat(style.outlineWidth),
        style: style.outlineStyle,
      };
    });
  expect(outline.width).toBeGreaterThanOrEqual(2);
  expect(outline.style).toBe("solid");
});
