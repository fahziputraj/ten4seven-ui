import { describe, expect, it } from "vitest";

import { buildRadiusProfile, buildThemeVariables, resolveTheme } from "./theme";

describe("theme engine", () => {
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
    expect(variables["--t7-duration-fast"]).toBe("300ms");
    expect(variables["--t7-duration-standard"]).toBe("525ms");
    expect(variables["--t7-duration-slow"]).toBe("1500ms");
    expect(variables["--t7-duration-loop"]).toBe("1200ms");
    expect(variables["--t7-motion-interactive"]).toBe(
      "150ms cubic-bezier(.2, 0, 0, 1)",
    );
    expect(variables["--t7-motion-enter"]).toBe(
      "525ms cubic-bezier(.16, 1, .3, 1)",
    );
    expect(variables["--t7-motion-exit"]).toBe(
      "300ms cubic-bezier(.4, 0, 1, 1)",
    );
    expect(variables["--t7-motion-loop"]).toBe("1200ms linear");
    expect(variables["--t7-motion-loop-eased"]).toBe("1200ms ease-in-out");
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
    expect(variables["--t7-focus-hsl"]).toBe("48 92% 49%");
    expect(variables["--t7-input-focus-border-hsl"]).toBe("48 92% 49%");
    expect(variables["--t7-focus-ring"]).toBe(
      "0 0 0 3px hsl(var(--t7-focus-hsl) / 0.28)",
    );
    expect(variables["--t7-muted-foreground-strong-hsl"]).toBe("215 18% 36%");
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
    expect(variables["--t7-focus-hsl"]).toBe("48 92% 49%");
    expect(variables["--t7-chart-1-hsl"]).toBe("148 58% 29%");
    expect(variables["--t7-chart-2-hsl"]).toBe("48 92% 49%");
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
    expect(variables["--t7-focus-ring"]).toContain("4px");
    expect(variables["--t7-motion-preference"]).toBe("reduced");
    expect(variables["--t7-motion-duration"]).toBe("0.01ms");
    expect(variables["--t7-content-max"]).toBe("1200px");
  });
});
