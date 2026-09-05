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

Density is a semantic remapping, not a CSS `transform`. It remaps
the control, row, menu, card-padding, section-gap, and control-gap
roles, plus control/field/card padding, menu, overlay, panel, and table
geometry. Those tokens are appropriate for shared controls and dense
application layouts; they are not permission to mechanically shrink touch
targets below their accessible minimum.

Use the existing geometry token when the value represents the same shared
meaning. A domain-specific diagram, chart plot, or image crop may retain a
local measurement, but record a new generic geometry need as a design-system
gap rather than inventing a parallel scale.

## Global foundation contract

`packages/contracts/src/foundation.ts` owns the shared vocabulary, projected to
`generated/foundation.json`. `/tokens` follows that same order: Color,
Typography, Surface Expression, Geometry & Density, Layout & Viewport,
Interaction, Motion, Elevation & Layering, Scroll Ownership, Iconography,
and Data Visualization. Its inspector reads computed CSS from the active
provider, including runtime preferences and OS reduced motion. Durations,
shadows, responsive lengths and type specimens show resolved values; variable
names remain available for copying. This is a debugger, not a second theme engine.

### Color domains and foreground pairs

Brand/action (`primary`), supporting expression (`accent`), fixed status
(`success`, `warning`, `danger`, `info`) and categorical data are independent
decisions. Emerald remains a supported primary. Success uses its own green;
the categorical spectrum begins with blue and does not change when primary
or accent changes. The intentional `monochrome` chart option follows primary
and therefore always needs labels, shapes or another non-color distinction.
The `four` option has four distinct slots; slot five repeats slot four.

Solid action and status surfaces use centrally derived foreground pairs:
`colorToSolidSurface` adjusts lightness until white text meets at least 4.5:1.
Inverse uses paired neutral surface/foreground roles for the current mode.
Components must not attenuate those pairs with an additional text opacity.
Categorical marks are adjusted separately for at least 3.2:1 against the
mode's conservative neutral plot reference. A categorical series never
means success or failure without an explicit semantic label.

### Surface expression

| Public emphasis | Display name | Purpose                                                         |
| --------------- | ------------ | --------------------------------------------------------------- |
| `plain`         | Paper        | Ordinary reading, comparison and work                           |
| `soft`          | Soft         | Quiet context or category emphasis                              |
| `expressive`    | Expressive   | Stronger bounded tint with neutral readable text                |
| `solid`         | Solid        | A focal KPI, decision or semantic signal with paired foreground |
| `inverse`       | Inverse      | A deliberate neutral contrast chapter                           |

Meaning selects `tone`; intensity selects `emphasis`. Existing Card, Surface,
MetricCard, KPICluster and Alert contracts share this vocabulary. Card-based
surfaces can select a categorical `colorway`; Alert remains semantic-only.
The page canvas stays neutral. Canvas machine/display names are `balanced` /
Balanced paper, `paper` / Paper, and `monochrome` / Monochrome.

### Type, geometry and boundaries

Overline and table-header roles have a 12px floor; table-cell uses 13px.
Body remains 14px. Density changes padding and rhythm without shrinking type.
Semantic roles can resolve identically in one profile and diverge in another.
Optical control values such as 13, 14, 17 and 18px remain intentional parts of
the density/radius profiles; they are not rounded mechanically to a 4px grid.

Sharp, Soft and Rounded retain their hierarchy. `--t7-radius-data` caps table
surfaces at 16px, or 10px for compact/dense layouts, without flattening cards
or overriding an explicitly sharp zero radius. The boundary hierarchy is
subtle / default / strong; interactive boundaries use field-focus and focus
roles. More contrast strengthens default boundaries without adding borders
to every region.

### Focus and motion

Focus has an independent blue color in each mode, a 2px ring (3px for more
contrast), a 2px separation offset and an opaque neutral halo. Field focus
uses the same color; arbitrary accent saturation cannot make it neon.
Forced-colors mode retains the platform Highlight outline.

Typed motion profiles own timing. The authored `motionDuration` remains an
anchor from 0.25–2.5s. Micro, popup, state/layout, overlay and exit roles use
a bounded 0.75–1.25 multiplier: ordinary interaction cannot inherit a multi-
second reveal. Across profiles, popup is at most 230ms, state/layout at most
300ms and overlays at most 400ms. Reveal, chart and loop/choreography scale
independently. `--t7-duration-slow` preserves the authored anchor for explicit
choreography. CSS aliases and `t7Motion` use the same provider values.
Explicit or OS reduced motion resolves CSS durations to 0.01ms and the JS
adapter to 0ms, even when an animation supplies an explicit duration.

### Layout, viewport and scroll

Shared layout roles include page/mobile gutters, content and reading rails,
sidebar width, header height, aside width, grid/section gaps, safe-area insets
and sticky offsets. Recipes retain grid and content-width ownership. AppShell
and Sidebar collapse at 860px; NavigationMenu hides leading content at 700px;
PublicShell adds a bounded navigation row at 540px. These are documented
component transformations, not CSS-variable media queries.

Viewport rules describe responsive transformations. Scroll ownership is a
separate contract: one document scroll unless an explicit bounded region
owns scrolling. Wide tables, popup roots, drawer/modal bodies and native
modal body lock keep their canonical owners. Sticky offsets derive from
header height plus shared clearance. Nested arbitrary `overflow` containers
are not a substitute for this contract.

### Icons and data visualization

T7Icon retains semantic names, provider-neutral optical boxes and inherited
`currentColor`. Shared icon roles define compact, control, navigation and
display sizes; active state follows the parent semantic foreground. Do not
introduce feature-local provider strings or stroke adjustments.

Chart roles include five categorical series, axis, grid, labels, tooltip
surface/foreground, focus, selection, muted comparison, threshold and no-data.
Positive/negative roles are explicit semantic opt-ins. Lines, bars and sectors
retain accessible labels, keyboard focus and data descriptions. Series hues
are supplemental; labels, markers, line patterns and values carry distinctions.

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

Mobile navigation shares `--t7-touch-target-min` (44px across density modes)
and `--t7-bottom-navigation-height` (64px before safe-area padding).
`TopNavigation placement="bottom"` reserves its measured height in document
flow; keep three to five short destinations and use `MobileSidebar` for the
remaining navigation. Both consume the existing safe-area and selected-color
tokens. `Modal` and `Drawer` keep a stationary header and a scrolling body;
their internal viewport variables follow `visualViewport` while open so a
software keyboard can reduce the available height.

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
