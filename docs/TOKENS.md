# Token architecture

Ten4Seven has one visual contract, but it is expressed at several levels. The
levels answer different questions and should not be collapsed into one large
component API.

```text
foundation values
  -> semantic theme profile
  -> curated recipe and composition
  -> runtime CSS variables
  -> component contracts
```

## Source ownership

| Layer                         | Current source                            | Responsibility                                                                                                 |
| ----------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Foundation / runtime resolver | `packages/tokens/src/theme.ts`            | Palette profiles, canvas profiles, radii, density, typography, motion, elevation, and the CSS-variable output. |
| Typed semantic aggregate      | `packages/contracts/src/theme-profile.ts` | Normalizes the broad legacy configuration into named semantic groups.                                          |
| Curated recipes               | `packages/contracts/src/theme-recipe.ts`  | Coordinates a profile, expression, and composition for a product context.                                      |
| CSS base contract             | `packages/tokens/src/theme.css`           | Fonts, browser/global defaults, focus, z-layer, and operating-system reduced motion.                           |
| Static recipe delivery        | `packages/tokens/src/theme-recipes.css`   | Generated selectors for each curated recipe and mode, plus runtime density, contrast, and motion preferences.  |
| DTCG-compatible export        | `scripts/generate-dtcg-token-export.mjs`  | Generates typed reference values, semantic aliases, and recipe metadata in generated JSON outputs.             |
| Components                    | `packages/ui/src/styles.css`              | Consumes semantic custom properties; it must not choose a raw palette family.                                  |

The canonical typed profile is intentionally structured. For example, an
action primary color is represented by `action.primary`, while the CSS output
remains the compatibility-friendly `--t7-primary-hsl` property.

## Semantic CSS vocabulary

Components should consume role variables rather than palette names. The
current generated vocabulary covers these practical groups:

- surfaces and text: `--t7-background-hsl`, `--t7-surface-hsl`,
  `--t7-surface-subtle-hsl`, `--t7-surface-raised-hsl`,
  `--t7-foreground-hsl`, and `--t7-muted-foreground-hsl`;
- borders and focus: `--t7-border-hsl`, `--t7-border-strong-hsl`,
  `--t7-focus-hsl`, and `--t7-focus-ring`;
- actions and selection: `--t7-primary-hsl`, `--t7-primary-hover-hsl`,
  `--t7-primary-active-hsl`, `--t7-primary-foreground-hsl`,
  `--t7-accent-hsl`, and `--t7-selected-hsl`;
- field and state roles: input background/border roles plus success, warning,
  danger, and info variables;
- data visualization: `--t7-chart-1-hsl` through `--t7-chart-5-hsl`;
- geometry: control, row, menu, card, section, and control-gap roles, plus
  density-aware control/field/card padding, menu, overlay, panel, and table
  geometry roles;
- typography, radius, elevation, motion, and z-layer roles.

Use `hsl(var(--t7-…-hsl))` only in canonical system styles. Consumer feature
code should prefer a component, a semantic Tailwind utility, or a local layout
rule that does not introduce a new color decision.

## Geometry and density

Density is a semantic remapping, not a CSS `transform`. It currently remaps 19
roles: the control, row, menu, card-padding, section-gap, and control-gap
roles, plus control/field/card padding, menu, overlay, panel, and table
geometry. Those tokens are appropriate for shared controls and dense
application layouts; they are not permission to mechanically shrink touch
targets below their accessible minimum.

Use the existing geometry token when the value represents the same shared
meaning. A domain-specific diagram, chart plot, or image crop may retain a
local measurement, but record a new generic geometry need as a design-system
gap rather than inventing a parallel scale.

## DTCG compatibility boundary

The repository emits a deterministic DTCG-compatible JSON export at
`generated/tokens.dtcg.json`, `packages/tokens/generated/tokens.dtcg.json`,
and `packages/agent/generated/tokens.dtcg.json`. It uses `$type`, `$value`,
typed sRGB reference values, normative dimension/duration value objects,
semantic aliases, and recipe metadata derived from the current runtime.
`semantic.color.action` is the baseline emerald alias set; a consumer that
needs a named recipe's selected action aliases reads
`theme.recipes.<recipe>.semantic.color.action`. The distributable package also
exports this artifact as `@ten4seven/ui/tokens.dtcg.json`.

The export is a compatibility/interoperability surface, not a replacement
canonical source of truth. The typed profile and HSL-oriented runtime in
`packages/contracts/src/theme-profile.ts` and `packages/tokens/src/theme.ts`
remain authoritative for rendering. Do not describe the current system as
fully DTCG-native or OKLCH-native: it has a deterministic DTCG-compatible
export, while the live CSS compatibility contract still uses HSL tuples.

The migration direction is:

1. keep component consumption semantic;
2. preserve the deterministic DTCG-compatible export alongside the typed
   runtime;
3. add an OKLCH-capable canonical color source only with visual and contrast
   regression evidence;
4. retain the existing HSL CSS variables during a documented compatibility
   period.

This boundary is deliberate: changing color notation alone is not a semantic
token migration and can silently change a proven surface.

## Rules for contributors

1. Choose a semantic role before adding a CSS value.
2. Change a recipe or the resolver before styling multiple components locally.
3. Do not add `blue`, `emerald`, `orange`, or other palette family names to a
   canonical component contract.
4. Keep raw values inside the token source, an explicit visualization API, or
   a domain-specific exception with a reason.
5. Regenerate projections and static recipe CSS after changing contracts:

   ```bash
   pnpm contracts:generate
   pnpm tokens:generate
   pnpm test:dtcg
   pnpm package:build
   pnpm package:verify
   ```

6. Validate focus, text contrast, disabled state, density, and both resolved
   color modes for a changed semantic role.
