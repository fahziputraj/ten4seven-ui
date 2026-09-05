import { describe, expect, it } from "vitest";

import {
  buildRadiusProfile,
  buildThemeVariables,
  iconGeometry,
  kpiGeometry,
  layoutGeometry,
  overlayGeometry,
  resolveTheme,
} from "./theme";

describe("theme engine", () => {
  it("reuses semantic spatial roles and protects expressive shape at compact density", () => {
    const standard = buildThemeVariables(
      resolveTheme({ density: "default", radius: "soft" }),
    );
    const compact = buildThemeVariables(
      resolveTheme({ density: "compact", radius: "rounded" }),
    );
    const exact = buildThemeVariables(
      resolveTheme({ density: "dense", radiusValue: 24 }),
    );
    expect(standard["--t7-gutter-mobile"]).toBe(layoutGeometry.gutter.mobile);
    expect(standard["--t7-rail-form"]).toBe("640px");
    expect(standard["--t7-icon-control"]).toBe(iconGeometry.control);
    expect(standard["--t7-control-height-sm"]).toBe("36px");
    expect(standard["--t7-control-height-lg"]).toBe("48px");
    expect(standard["--t7-kpi-padding"]).toBe("20px");
    expect(standard["--t7-kpi-icon-container"]).toBe(kpiGeometry.iconContainer);
    expect(standard["--t7-kpi-icon-size"]).toBe(kpiGeometry.iconSize);
    expect(standard["--t7-kpi-chart-height"]).toBe(kpiGeometry.chartHeight);
    expect(compact["--t7-kpi-padding"]).toBe("16px");
    expect(compact["--t7-kpi-icon-container"]).toBe("22px");
    expect(compact["--t7-kpi-icon-size"]).toBe("20px");
    expect(compact["--t7-kpi-chart-height"]).toBe("48px");
    expect(compact["--t7-card-safe-inset"]).toBe("max(16px, 16px)");
    expect(exact["--t7-card-safe-inset"]).toBe("max(12px, 20px)");
    expect(exact["--t7-overlay-safe-inset"]).toBe("max(12px, 16px)");
    expect(exact["--t7-field-corner-clearance"]).toBe("12px");
    expect(exact["--t7-type-body-size"]).toBe(standard["--t7-type-body-size"]);
  });
  it("maps every global axis to semantic variables", () => {
    const theme = resolveTheme({
      appearance: "dark",
      palette: "blue",
      primary: "indigo",
      accent: "amber",
      canvas: "monochrome",
      chartPalette: "four",
      radius: "sharp",
      density: "compact",
      motionDuration: 1.5,
      typography: "mono",
    });
    const variables = buildThemeVariables(theme);

    expect(variables["--t7-primary-hsl"]).toBe("232 70% 48%");
    expect(variables["--t7-accent-hsl"]).toBe("48 92% 49%");
    expect(variables["--t7-primary-badge-foreground-hsl"]).toBe("0 0% 100%");
    expect(variables["--t7-background-hsl"]).toBe("0 0% 8%");
    expect(variables["--t7-chart-palette-count"]).toBe("4");
    expect(variables["--t7-radius-card"]).toBe("12px");
    expect(variables["--t7-row-height"]).toBe("36px");
    expect(variables["--t7-font-ui"]).toContain("IBM Plex Mono");
    expect(theme.motionDuration).toBe(1.5);
    expect(variables["--t7-motion-duration"]).toBe("1.5s");
    expect(variables["--t7-duration-fast"]).toBe("160ms");
    expect(variables["--t7-duration-standard"]).toBe("220ms");
    expect(variables["--t7-duration-slow"]).toBe("1500ms");
    expect(variables["--t7-duration-loop"]).toBe("2400ms");
    expect(variables["--t7-motion-interactive"]).toBe(
      "var(--t7-duration-instant) var(--t7-ease-standard)",
    );
    expect(variables["--t7-motion-enter"]).toBe(
      "var(--t7-duration-overlay) var(--t7-ease-enter)",
    );
    expect(variables["--t7-motion-exit"]).toBe(
      "var(--t7-duration-exit) var(--t7-ease-exit)",
    );
    expect(variables["--t7-motion-loop"]).toBe(
      "var(--t7-duration-loop) linear",
    );
    expect(variables["--t7-motion-loop-eased"]).toBe(
      "var(--t7-duration-loop) ease-in-out",
    );
  });

  it("exposes restrained semantic typography roles and family overrides", () => {
    const theme = resolveTheme({
      accent: "amber",
      typography: {
        preset: "modern",
        ui: '"A custom UI"',
        display: '"A custom display"',
        mono: '"A custom mono"',
      },
    });
    const variables = buildThemeVariables(theme);

    expect(variables["--t7-font-ui"]).toBe('"A custom UI"');
    expect(variables["--t7-font-display"]).toBe('"A custom display"');
    expect(variables["--t7-type-display-lg-weight"]).toBe("600");
    expect(variables["--t7-type-button-weight"]).toBe("550");
    expect(variables["--t7-type-table-header-weight"]).toBe("550");
    expect(variables["--t7-font-optical-sizing"]).toBe("auto");
    expect(variables["--t7-focus-hsl"]).toBe("216 72% 38%");
    expect(variables["--t7-input-focus-border-hsl"]).toBe(
      "var(--t7-focus-hsl)",
    );
    expect(variables["--t7-focus-ring"]).toBe(
      "var(--t7-focus-halo), 0 0 0 calc(var(--t7-focus-offset) + var(--t7-focus-width)) hsl(var(--t7-focus-hsl))",
    );
    expect(variables["--t7-muted-foreground-strong-hsl"]).toBe("0 0% 35%");
    expect(variables["--t7-scrollbar-size"]).toBe("4px");
    expect(variables["--t7-scrollbar-thumb-alpha"]).toBe("0.3");
    expect(variables["--t7-scrollbar-thumb-hover-alpha"]).toBe("0.5");
  });

  it("maps an exact radius value to the full hierarchical scale", () => {
    const theme = resolveTheme({ radius: "sharp", radiusValue: 0 });
    const variables = buildThemeVariables(theme);
    expect(buildRadiusProfile(0)).toEqual({
      indicator: "0px",
      control: "0px",
      base: "0px",
      panel: "0px",
      card: "0px",
      shell: "0px",
    });
    expect(variables["--t7-radius-control"]).toBe("0px");
    expect(variables["--t7-radius-card"]).toBe("0px");
    expect(variables["--t7-radius-shell"]).toBe("0px");
    expect(variables["--t7-radius-value"]).toBe("0px");
    expect(resolveTheme({ radiusValue: 17 }).radiusValue).toBe(17);
    expect(resolveTheme({ radiusValue: 17.6 }).radiusValue).toBe(18);
    expect(resolveTheme({ radiusValue: 40 }).radiusValue).toBe(24);
  });

  it("keeps named radius recipes and exact geometry stable across appearance modes", () => {
    const namedProfiles = [
      ["sharp", 8],
      ["soft", 12],
      ["rounded", 16],
    ] as const;

    for (const [radius, base] of namedProfiles) {
      const theme = resolveTheme({ radius });
      expect(theme.radius).toBe(radius);
      expect(theme.radiusValue).toBeUndefined();
      expect(buildThemeVariables(theme)["--t7-radius-base"]).toBe(`${base}px`);
    }

    const lightVariables = buildThemeVariables(
      resolveTheme({ appearance: "light", radiusValue: 14 }),
    );
    const darkVariables = buildThemeVariables(
      resolveTheme({ appearance: "dark", radiusValue: 14 }),
    );
    for (const role of [
      "indicator",
      "control",
      "base",
      "panel",
      "card",
      "shell",
    ]) {
      expect(lightVariables[`--t7-radius-${role}`]).toBe(
        darkVariables[`--t7-radius-${role}`],
      );
    }
  });

  it("keeps named action and focus profiles deterministic across chart colorways", () => {
    const theme = resolveTheme({
      appearance: "light",
      primary: "emerald",
      accent: "amber",
      chartPalette: "four",
    });
    const variables = buildThemeVariables(theme);

    expect(theme.primary).toBe("emerald");
    expect(theme.accent).toBe("amber");
    expect(variables["--t7-primary-hsl"]).toBe("148 58% 29%");
    expect(variables["--t7-accent-hsl"]).toBe("48 92% 49%");
    expect(variables["--t7-focus-hsl"]).toBe("216 72% 38%");
    expect(variables["--t7-chart-1-hsl"]).toBe("148 58% 29%");
    expect(variables["--t7-chart-2-hsl"]).toBe("193 74% 36%");
  });

  it("derives white-text solid surfaces from the active chart colorway", () => {
    const variables = buildThemeVariables(
      resolveTheme({
        appearance: "light",
        chartPalette: "spectrum",
        palette: "emerald",
      }),
    );

    expect(variables["--t7-surface-emphasis-solid-chart-foreground-hsl"]).toBe(
      "0 0% 100%",
    );
    for (const index of [1, 2, 3, 4, 5]) {
      const chartChannels = variables[`--t7-chart-${index}-hsl`].split(" ");
      const surfaceChannels =
        variables[`--t7-surface-emphasis-solid-chart-${index}-hsl`].split(" ");
      expect(surfaceChannels.slice(0, 2)).toEqual(chartChannels.slice(0, 2));
      expect(Number.parseFloat(surfaceChannels[2])).toBeLessThanOrEqual(
        Number.parseFloat(chartChannels[2]),
      );
    }
    for (const tone of ["", "success-", "warning-", "danger-", "info-"])
      expect(
        variables[`--t7-surface-emphasis-solid-${tone}foreground-hsl`],
      ).toBe("0 0% 100%");
  });

  it("keeps every canvas achromatic and invariant across palette choices", () => {
    const canvases = ["balanced", "paper", "monochrome"] as const;
    const palettes = ["emerald", "blue", "indigo", "violet", "orange"] as const;

    expect(
      buildThemeVariables(
        resolveTheme({ appearance: "light", canvas: "balanced" }),
      )["--t7-background-hsl"],
    ).toBe("0 0% 100%");

    for (const appearance of ["light", "dark"] as const) {
      for (const canvas of canvases) {
        const baseline = buildThemeVariables(
          resolveTheme({
            accent: "emerald",
            appearance,
            canvas,
            palette: "emerald",
            primary: "emerald",
          }),
        );
        const canvasVariables = [
          "--t7-background-hsl",
          "--t7-surface-hsl",
          "--t7-surface-subtle-hsl",
          "--t7-surface-muted-hsl",
          "--t7-border-hsl",
        ] as const;

        for (const variable of canvasVariables) {
          const [hue, saturation] = baseline[variable].split(" ");
          expect(hue).toBe("0");
          expect(saturation).toBe("0%");
        }

        for (const palette of palettes) {
          const variables = buildThemeVariables(
            resolveTheme({
              accent: palette,
              appearance,
              canvas,
              palette,
              primary: palette,
            }),
          );
          for (const variable of canvasVariables) {
            expect(variables[variable]).toBe(baseline[variable]);
          }
        }
      }
    }
  });

  it("normalizes motion duration to the shared range and quarter-second step", () => {
    expect(resolveTheme().motionDuration).toBe(1.5);
    expect(resolveTheme({ motionDuration: 0.12 }).motionDuration).toBe(0.25);
    expect(resolveTheme({ motionDuration: 0.62 }).motionDuration).toBe(0.5);
    expect(resolveTheme({ motionDuration: 1.12 }).motionDuration).toBe(1);
    expect(resolveTheme({ motionDuration: 4 }).motionDuration).toBe(2.5);
  });

  it("provides distinct typography characters without changing semantic roles", () => {
    const editorial = buildThemeVariables(
      resolveTheme({ typography: "editorial" }),
    );
    const technical = buildThemeVariables(
      resolveTheme({ typography: "technical" }),
    );

    expect(editorial["--t7-font-display"]).toContain("Georgia");
    expect(technical["--t7-font-ui"]).toContain("IBM Plex Mono");
    expect(editorial["--t7-type-display-lg-size"]).toBe(
      technical["--t7-type-display-lg-size"],
    );
    expect(editorial["--t7-font-display"]).not.toBe(
      technical["--t7-font-display"],
    );
  });

  it("falls back safely when persisted control values are invalid", () => {
    const theme = resolveTheme({
      appearance: "invalid" as never,
      palette: "invalid" as never,
      primary: "invalid" as never,
      accent: "invalid" as never,
      canvas: "invalid" as never,
      chartPalette: "invalid" as never,
      radius: "invalid" as never,
      radiusValue: "invalid" as never,
      density: "invalid" as never,
      motionDuration: "invalid" as never,
      typography: { preset: "invalid", ui: 42 } as never,
      elevation: "invalid" as never,
    });

    expect(theme.appearance).toBe("light");
    expect(theme.palette).toBe("emerald");
    expect(theme.primary).toBe("emerald");
    expect(theme.accent).toBe("emerald");
    expect(theme.canvas).toBe("balanced");
    expect(theme.chartPalette).toBe("spectrum");
    expect(theme.radius).toBe("soft");
    expect(theme.radiusValue).toBeUndefined();
    expect(theme.density).toBe("default");
    expect(theme.motionDuration).toBe(1.5);
    expect(theme.typography).toBe("modern");
    expect(theme.elevation).toBe("soft");
    expect(() => buildThemeVariables(theme)).not.toThrow();
  });

  it("keeps primary badge labels readable across appearance modes", () => {
    const lightVariables = buildThemeVariables(
      resolveTheme({ appearance: "light", palette: "emerald" }),
    );
    const darkVariables = buildThemeVariables(
      resolveTheme({ appearance: "dark", palette: "emerald" }),
    );
    expect(lightVariables["--t7-primary-badge-foreground-hsl"]).toBe(
      "148 62% 23%",
    );
    expect(darkVariables["--t7-primary-badge-foreground-hsl"]).toBe(
      "0 0% 100%",
    );
    expect(lightVariables["--t7-danger-badge-foreground-hsl"]).toBe(
      "0 72% 42%",
    );
    expect(darkVariables["--t7-danger-badge-foreground-hsl"]).toBe("0 92% 76%");
  });

  it("keeps boundary tiers distinct under increased contrast", () => {
    for (const appearance of ["light", "dark"] as const) {
      for (const canvas of ["balanced", "paper", "monochrome"] as const) {
        const variables = buildThemeVariables(
          resolveTheme({ appearance, canvas }),
          { contrast: "more" },
        );
        expect(
          new Set([
            variables["--t7-border-subtle-hsl"],
            variables["--t7-border-hsl"],
            variables["--t7-border-strong-hsl"],
          ]).size,
        ).toBe(3);
      }
    }
  });

  it("maps semantic action, field, and density geometry aliases", () => {
    const variables = buildThemeVariables(
      resolveTheme({ density: "compact", primary: "indigo" }),
    );

    expect(variables["--t7-action-primary-hsl"]).toBe("232 70% 48%");
    expect(variables["--t7-action-primary-foreground-hsl"]).toBe("0 0% 100%");
    expect(variables["--t7-action-danger-foreground-hsl"]).toBe("0 0% 100%");
    expect(variables["--t7-field-foreground-hsl"]).toBe(
      variables["--t7-foreground-hsl"],
    );
    expect(variables["--t7-control-padding-inline"]).toBe("13px");
    expect(variables["--t7-field-padding-inline"]).toBe("10px");
    expect(variables["--t7-card-header-gap"]).toBe("12px");
    expect(variables["--t7-overlay-padding"]).toBe("16px");
    expect(variables["--t7-ref-space-4"]).toBe("16px");
    expect(variables["--t7-kpi-padding"]).toBe("16px");
    expect(variables["--t7-kpi-content-gap"]).toBe("8px");
    expect(variables["--t7-kpi-chart-height"]).toBe("48px");
    expect(variables["--t7-surface-emphasis-solid-chart-1-hsl"]).toMatch(
      /^\d+ \d+% \d+%$/,
    );
    expect(variables["--t7-surface-emphasis-solid-chart-foreground-hsl"]).toBe(
      "0 0% 100%",
    );
  });

  it("keeps overlay geometry component-owned across density and appearance", () => {
    const lightVariables = buildThemeVariables(
      resolveTheme({ appearance: "light", density: "comfortable" }),
    );
    const darkVariables = buildThemeVariables(
      resolveTheme({ appearance: "dark", density: "dense" }),
    );

    expect(overlayGeometry.datePicker).toBe("336px");
    expect(overlayGeometry.dateRangePicker).toBe("672px");
    expect(overlayGeometry.timePicker).toBe("360px");
    for (const name of [
      "--t7-overlay-menu-sm",
      "--t7-overlay-menu-md",
      "--t7-overlay-menu-lg",
      "--t7-overlay-select-min",
      "--t7-overlay-select-max",
      "--t7-overlay-combobox",
      "--t7-overlay-date",
      "--t7-overlay-date-range",
      "--t7-overlay-time",
      "--t7-overlay-command",
      "--t7-overlay-dialog-sm",
      "--t7-overlay-dialog-md",
      "--t7-overlay-dialog-lg",
    ]) {
      expect(lightVariables[name]).toBe(darkVariables[name]);
      expect(lightVariables[name]).toMatch(/px$/);
    }
  });

  it("keeps preference-level contrast and reduced motion semantic", () => {
    const variables = buildThemeVariables(resolveTheme(), {
      contrast: "more",
      motion: "reduced",
      recipe: "enterprise",
      expression: "operational",
      composition: {
        contentMax: "1200px",
        readingMeasure: "70ch",
        pageGutter: "24px",
        sectionGap: "32px",
      },
    });

    expect(variables["--t7-theme-recipe"]).toBe("enterprise");
    expect(variables["--t7-expression"]).toBe("operational");
    expect(variables["--t7-contrast"]).toBe("more");
    expect(variables["--t7-focus-width"]).toBe("3px");
    expect(variables["--t7-focus-offset"]).toBe("2px");
    expect(variables["--t7-motion-preference"]).toBe("reduced");
    expect(variables["--t7-motion-duration"]).toBe("0.01ms");
    expect(variables["--t7-content-max"]).toBe("1200px");
  });
});
