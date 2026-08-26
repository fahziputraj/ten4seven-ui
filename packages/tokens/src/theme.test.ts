import { describe, expect, it } from "vitest";

import { buildThemeVariables, resolveTheme } from "./theme";

describe("theme engine", () => {
  it("maps every global axis to semantic variables", () => {
    const theme = resolveTheme({
      appearance: "dark",
      palette: "blue",
      radius: "sharp",
      density: "compact",
      typography: "mono",
    });
    const variables = buildThemeVariables(theme);

    expect(variables["--t7-primary-hsl"]).toBe("214 82% 48%");
    expect(variables["--t7-radius-card"]).toBe("12px");
    expect(variables["--t7-row-height"]).toBe("36px");
    expect(variables["--t7-font-ui"]).toContain("IBM Plex Mono");
    expect(variables["--t7-background-hsl"]).toBe("222 22% 9%");
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
  });
});
