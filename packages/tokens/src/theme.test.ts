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

  it("normalizes motion duration to the shared range and quarter-second step", () => {
    expect(resolveTheme().motionDuration).toBe(1.5);
    expect(resolveTheme({ motionDuration: 0.62 }).motionDuration).toBe(0.5);
    expect(resolveTheme({ motionDuration: 1.62 }).motionDuration).toBe(1.5);
    expect(resolveTheme({ motionDuration: 4 }).motionDuration).toBe(2.5);
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
});
