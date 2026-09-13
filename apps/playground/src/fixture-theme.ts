import {
  buildThemeVariables,
  hslToHex,
  type ResolvedTheme,
} from "@ten4seven/tokens";

const FIXTURE_COLOR_VARIABLES = [
  "--t7-primary-hsl",
  "--t7-chart-2-hsl",
  "--t7-chart-4-hsl",
  "--t7-chart-5-hsl",
] as const;

/**
 * Keep native color-input fixtures on the same resolved palette as the
 * provider. The input contract requires hex values, so this is a renderer
 * projection rather than a second playground palette.
 */
export function getFixtureColorPresets(theme: ResolvedTheme): string[] {
  const variables = buildThemeVariables(theme);
  return FIXTURE_COLOR_VARIABLES.map((variable) =>
    hslToHex(variables[variable]),
  );
}
