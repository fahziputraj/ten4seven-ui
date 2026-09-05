import { describe, expect, it } from "vitest";
import { resolveMotionRoles } from "../../contracts/src/theme-profile.ts";
import { buildThemeVariables, resolveTheme, type PaletteName } from "./theme";

const palettes: PaletteName[] = [
  "emerald",
  "blue",
  "orange",
  "red",
  "violet",
  "slate",
];

describe("bounded global foundation", () => {
  it("keeps categorical series independent of brand and accent, across both modes", () => {
    for (const appearance of ["light", "dark"] as const) {
      for (const chartPalette of ["spectrum", "four"] as const) {
        const baseline = buildThemeVariables(
          resolveTheme({ appearance, chartPalette }),
        );
        for (const palette of palettes) {
          const current = buildThemeVariables(
            resolveTheme({
              appearance,
              chartPalette,
              palette,
              primary: palette,
              accent: palette,
            }),
          );
          for (let index = 1; index <= 5; index++)
            expect(current[`--t7-chart-${index}-hsl`]).toBe(
              baseline[`--t7-chart-${index}-hsl`],
            );
          expect(current["--t7-success-hsl"]).toBe(
            baseline["--t7-success-hsl"],
          );
        }
      }
    }
    const emerald = buildThemeVariables(resolveTheme());
    expect(
      new Set([
        emerald["--t7-chart-1-hsl"],
        emerald["--t7-chart-2-hsl"],
        emerald["--t7-chart-3-hsl"],
      ]).size,
    ).toBe(3);
  });

  it("uses the typed motion resolver and bounds short roles at every supported anchor", () => {
    for (const motionProfile of [
      "minimal",
      "calm",
      "balanced",
      "lively",
    ] as const) {
      for (const anchor of [0.25, 0.5, 1.25, 1.5, 2.5]) {
        const roles = resolveMotionRoles(motionProfile, anchor);
        const values = buildThemeVariables(
          resolveTheme({ motionDuration: anchor }),
          { motionProfile },
        );
        expect(parseFloat(values["--t7-duration-popup"])).toBe(
          Math.round(roles.interaction * 1000),
        );
        expect(parseFloat(values["--t7-duration-overlay"])).toBe(
          Math.round(roles.enter * 1000),
        );
        expect(parseFloat(values["--t7-duration-chart"])).toBe(
          Math.round(roles.chart * 1000),
        );
        expect(parseFloat(values["--t7-duration-instant"])).toBeLessThanOrEqual(
          150,
        );
        expect(parseFloat(values["--t7-duration-popup"])).toBeLessThanOrEqual(
          230,
        );
        expect(
          parseFloat(values["--t7-duration-standard"]),
        ).toBeLessThanOrEqual(300);
        expect(parseFloat(values["--t7-duration-overlay"])).toBeLessThanOrEqual(
          400,
        );
        expect(
          parseFloat(values["--t7-duration-standard"]),
        ).toBeGreaterThanOrEqual(130);
      }
    }
  });

  it("reduces every duration role without erasing the authored theme", () => {
    const theme = resolveTheme({ motionDuration: 2.5 });
    const values = buildThemeVariables(theme, { motion: "reduced" });
    expect(theme.motionDuration).toBe(2.5);
    for (const [name, value] of Object.entries(values))
      if (name.startsWith("--t7-duration-")) expect(value, name).toBe("0.01ms");
  });

  it("keeps focus independent of accent and composes thickness with a separation halo", () => {
    for (const appearance of ["light", "dark"] as const)
      for (const palette of palettes) {
        const normal = buildThemeVariables(
          resolveTheme({ appearance, accent: palette }),
        );
        const more = buildThemeVariables(
          resolveTheme({ appearance, accent: palette }),
          { contrast: "more" },
        );
        expect(normal["--t7-focus-hsl"]).toBe(
          appearance === "dark" ? "216 70% 72%" : "216 72% 38%",
        );
        expect(more["--t7-focus-hsl"]).toBe(normal["--t7-focus-hsl"]);
        expect(parseFloat(more["--t7-focus-width"])).toBeGreaterThan(
          parseFloat(normal["--t7-focus-width"]),
        );
        expect(more["--t7-focus-halo"]).toContain("--t7-surface-hsl");
      }
  });

  it("keeps micro type readable at every density and caps data radius without flattening cards", () => {
    for (const typography of [
      "modern",
      "humanist",
      "editorial",
      "technical",
      "mono",
    ] as const)
      for (const density of [
        "dense",
        "compact",
        "default",
        "comfortable",
      ] as const) {
        const values = buildThemeVariables(
          resolveTheme({ typography, density, radius: "rounded" }),
        );
        expect(values["--t7-type-overline-size"]).toBe("12px");
        expect(values["--t7-type-table-header-size"]).toBe("12px");
        expect(values["--t7-type-table-cell-size"]).toBe("13px");
        expect(values["--t7-type-body-size"]).toBe("14px");
        expect(parseFloat(values["--t7-radius-data"])).toBeLessThanOrEqual(
          density === "dense" || density === "compact" ? 10 : 16,
        );
        expect(values["--t7-radius-card"]).toBe("24px");
      }
    expect(
      buildThemeVariables(resolveTheme({ radiusValue: 0 }))["--t7-radius-data"],
    ).toBe("0px");
  });
});
