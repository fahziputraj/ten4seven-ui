# T7 Component Expansion Q01 — Theme Capability Discovery and Axis Contract

Status: `PASS WITH CONSTRAINTS FOR Q02`  
Mode: `STRICT / BOUNDED discovery`  
Risk: `R2 — shared design-system contract`  
Target repository: `fahziputraj/ten4seven-ui`  
Captured: `2026-09-11` (`Asia/Jakarta`)

This document is the Q01 evidence artifact. It records the current Theme
Studio, theme-provider, token, recipe, profile, scope, and package contracts
before the component-expansion work begins. It does not implement Q02 and it
does not authorize a broad theme refactor.

## 1. Evidence boundary and repository coordinates

### 1.1 Interpretation boundary

The user request is to proceed with Q01. The attached Q01 document is treated
as the bounded work specification. Older Parent, queue, and post-Q08 files
were read only as inherited context and were not allowed to broaden this job
into Q09–Q15 work, component expansion, or branch cleanup.

The following Q01 prohibitions remain active:

- no component expansion;
- no dependency migration;
- no arbitrary token renaming;
- no Brand Core change;
- no Q02 implementation;
- no commit, push, merge, tag, or branch cleanup as part of this evidence job.

### 1.2 Git state before the Q01 evidence write

`SOURCE` — captured from the target checkout before creating this document:

| Field                                   | Value                                                                |
| --------------------------------------- | -------------------------------------------------------------------- |
| Local path                              | `D:/SA/ten4seven-ui`                                                 |
| Branch                                  | `codex/icons-curated-solar-style`                                    |
| HEAD                                    | `e582cfcfbe0f077d1a5832d86db9da1898487fd3`                           |
| HEAD subject                            | `feat(q14): restore fluid navigation and responsive shell hardening` |
| Existing status entries                 | `93`                                                                 |
| Existing tracked changes                | `24`                                                                 |
| Existing untracked entries              | `69`                                                                 |
| Q01 source changes before this document | `0`                                                                  |

The existing tracked changes are preserved and are outside Q01:

```text
apps/adoption-operational/src/App.tsx
apps/playground/src/App.tsx
apps/playground/src/app.css
apps/playground/src/brand-expression.tsx
apps/playground/src/component-preview-fixtures.tsx
apps/playground/src/component-proofs.tsx
apps/playground/src/content-safety-proof.tsx
apps/playground/src/erp-data-dense-reference.tsx
apps/playground/src/farm-p1-reference.tsx
apps/playground/src/farm-synthetic-proof.tsx
apps/playground/src/library-explorers.tsx
apps/playground/src/operational-reference.tsx
packages/ai/catalog/icons.json
packages/icons/package.json
packages/icons/src/curated-data.ts
packages/icons/src/index.tsx
packages/ui/README.md
packages/ui/THIRD_PARTY_NOTICES.md
packages/ui/scripts/verify-package.mjs
pnpm-lock.yaml
scripts/generate-curated-icon-subset.mjs
scripts/verify-ai-catalog.mjs
tests/icon-library.spec.ts
tests/q10-shell-contract.spec.ts
```

The untracked baseline is primarily `.playwright-cli` evidence/log files and
existing `output/playwright` screenshots, including Q14 and revert
investigations. They were not deleted, staged, or normalized. This Q01
document is the only intended new file for this bounded job.

### 1.3 Evidence labels

- `SOURCE` — directly read from a checked-out file or command output.
- `OBSERVED` — directly observed in the local Codex In-app Browser runtime.
- `NORMALIZED` — a comparison or interpretation made from SOURCE and
  OBSERVED evidence.
- `PROPOSED` — the contract boundary recommended for Q02; not implemented.
- `UNKNOWN` — the repository does not currently provide the needed evidence.
- `UNVERIFIED` — the claim requires a different authority, production
  environment, deployment, or explicit acceptance.

The browser evidence below is local harness evidence. It is not production
adoption evidence, an AAPM approval, or a package-distribution guarantee.

## 2. Source and runtime coordinates

`SOURCE` — the current theme system is distributed across these authorities:

| Concern                             | Canonical source                                                                                                                                                                               | Current responsibility                                                                                                                                |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Typed theme profile                 | `packages/contracts/src/theme-profile.ts`                                                                                                                                                      | Theme profile schema, defaults, candidate axes, normalization, motion-role resolution, and legacy adaptation.                                         |
| Typed recipe/profile types          | `packages/contracts/src/types.ts`                                                                                                                                                              | `ThemeProfile`, `ThemeRecipe`, runtime preferences, brand profile, and composition contracts.                                                         |
| Named theme recipes                 | `packages/contracts/src/theme-recipe.ts` and `generated/theme-recipes.json`                                                                                                                    | Four authored recipe decisions: enterprise, product, editorial, and commerce; runtime preference resolution.                                          |
| Brand/product profiles              | `packages/contracts/src/brand-profile.ts`                                                                                                                                                      | Neutral and AAPM profiles, exact brand adapter, product ownership, density, surface, asset, and composition decisions.                                |
| Foundation taxonomy                 | `packages/contracts/src/foundation.ts`                                                                                                                                                         | Foundation families, surface expressions, component token-role contracts, and ownership boundaries.                                                   |
| Runtime config and token resolution | `packages/tokens/src/theme.ts`                                                                                                                                                                 | Legacy-compatible `ThemeConfig`, `ResolvedTheme`, axis normalization, semantic variables, geometry, chart, overlay, layout, and DTCG snapshot output. |
| Static theme delivery               | `packages/tokens/src/theme.css` and `packages/tokens/src/theme-recipes.css`                                                                                                                    | Fallback variables, semantic base styles, light/dark recipe selectors, motion, focus, and reduced-motion rules.                                       |
| Provider and scoped resolution      | `packages/ui/src/provider.tsx`                                                                                                                                                                 | `Ten4SevenProvider`, persistence, runtime preferences, `ThemeScope`, data attributes, inline resolved variables, and the public theme context.        |
| Public UI package                   | `packages/ui/src/index.ts` and `packages/ui/package.json`                                                                                                                                      | Canonical component exports, provider exports, token/icon re-exports, and supported package entry points.                                             |
| Theme Studio harness                | `apps/playground/src/App.tsx` and `apps/playground/src/app.css`                                                                                                                                | Theme Studio controls, runtime preference UI, live preview, scopes, AAPM workbench, and local preference persistence.                                 |
| Contract projections                | `generated/agent-index.json`, `generated/recipes.compact.json`, `generated/components.compact.json`, `generated/aliases.json`, and `generated/ownership-rules.json`                            | Agent retrieval order and compact contract projections; generated from typed/catalog sources.                                                         |
| Verification                        | `packages/tokens/src/theme.test.ts`, `packages/tokens/src/foundation.test.ts`, `tests/universal-v2-theme.spec.ts`, `tests/workbench-interaction.spec.ts`, and `tests/brand-expression.spec.ts` | Token, foundation, browser, interaction, and brand/profile coverage.                                                                                  |

Relevant source symbols include:

- `ThemeProfile`, `ThemeRecipe`, `RuntimePreferences`, and `BrandProfile` in
  `packages/contracts/src/types.ts`;
- `normalizeThemeProfile`, `resolveMotionRoles`, and
  `themeProfileFromResolvedTheme` in `packages/contracts/src/theme-profile.ts`;
- `THEME_RECIPES`, `DEFAULT_RUNTIME_PREFERENCES`, and
  `resolveRuntimePreferences` in `packages/contracts/src/theme-recipe.ts`;
- `BRAND_PROFILES`, `AAPM_BRAND_ADAPTER`, `getBrandProfile`, and
  `composeBrandProfile` in `packages/contracts/src/brand-profile.ts`;
- `resolveTheme`, `buildThemeVariables`, and `buildDtcgThemeSnapshot` in
  `packages/tokens/src/theme.ts`;
- `Ten4SevenProvider` and `ThemeScope` in `packages/ui/src/provider.tsx`.

## 3. Current theme architecture

### 3.1 Authored and runtime layers

`SOURCE` — the repository has two compatible theme input models:

1. The typed model is `ThemeProfile` plus `ThemeRecipe`. A recipe is a
   coherent authored decision covering palette/action/accent, canvas, surface
   treatment, chart palette, radius, density, typography, elevation, motion,
   and composition.
2. The legacy-compatible model is `ThemeConfig`. It remains the public object
   shape for advanced/custom configuration and is normalized by the contract
   layer before token resolution.

`SOURCE` — the current resolver produces a legacy-compatible `ResolvedTheme`
and then a semantic CSS variable map. It derives component geometry and token
families from a small set of named axes instead of asking consumers to author
every `--t7-*` variable.

The current provider merge behavior is:

```text
recipe defaults / provider props
  -> object theme input
  -> advanced overrides.config
  -> persisted ThemeConfig overrides
  -> runtime appearance and density preferences
  -> resolved semantic variables and data attributes
```

`overrides.variables` is a deliberate advanced escape hatch and is applied as
inline semantic variables after the normal resolved map. This is useful for a
controlled exception but is not a safe replacement for a typed global-axis
contract.

`NORMALIZED` — the requested Q01 contract includes a product-profile layer,
but the current provider does not automatically call `composeBrandProfile`
for every consumer. Product/profile composition is currently an explicit
contract and consumer-owned integration boundary. That distinction must stay
visible in Q02.

### 3.2 Token derivation

`SOURCE` — `buildThemeVariables` already centralizes the following derivations:

- achromatic canvas and surface values from canvas/surface/appearance;
- semantic action, status, field, border, focus, and inverse values;
- chart palette colors from the independent chart palette axis;
- radius scales and component radius caps;
- density-driven control, header, KPI, table, and touch geometry;
- elevation and neutral shadow values;
- line, point, bar, donut, tooltip, and chart interaction geometry;
- overlay limits, drawer rails, z-index, scrim, and tooltip depth;
- typography family, size, line-height, optical sizing, and readable measure;
- motion roles and reduced-motion behavior.

These values are centralized token/contract values, not a license for each
route to create a parallel local token set. A fixed semantic meaning (for
example success, warning, danger, focus, or selected) is intentionally not a
Theme Studio color knob.

### 3.3 Recipe and profile boundaries

`SOURCE` — the named recipe set is:

| Recipe       | Intent                              | Composition signals                                                                                     |
| ------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `enterprise` | Operational, information-dense work | Balanced canvas, outlined surface, spectrum chart, soft elevation, 1440px content max.                  |
| `product`    | Balanced application rhythm         | Balanced canvas, outlined surface, spectrum chart, soft elevation, 1320px content max.                  |
| `editorial`  | Reading-led hierarchy               | Paper canvas, sharp surface, four-color chart, flat elevation, 1180px content max and readable measure. |
| `commerce`   | Discovery and buying clarity        | Paper canvas, rounded surface, spectrum chart, soft elevation, 1360px content max.                      |

`SOURCE` — `BRAND_PROFILES` adds neutral and AAPM product profiles such as
`aapm-core`, `aapm-farm`, `aapm-operations`, `aapm-erp`, `aapm-academy`, and
`aapm-public`. These profiles carry product/brand ownership and are not
interchangeable with a free-form visual preset.

### 3.4 Scoped and inverse themes

`SOURCE` — `ThemeScope` resolves a nested full theme from the parent context,
with explicit recipe/object, preferences, overrides, and inverse tone. The
scope writes its own semantic variables and data attributes while preserving
the parent provider. Portal and overlay theme bridging is covered by the
existing browser tests.

`NORMALIZED` — inverse and other scoped treatments are bounded composition
overrides. They must not become a second global theme editor or a route-level
copy of the provider.

### 3.5 Persistence and serialization

`SOURCE` — the generic provider accepts an optional `persistenceKey`, reads a
JSON `Partial<ThemeConfig>` after client hydration, ignores invalid storage,
and writes/removes the persisted object defensively. The playground mounts the
provider with:

```text
persistenceKey = ten4seven.playground.theme.v1
```

`SOURCE` — Theme Studio runtime preferences use a separate playground key:

```text
ten4seven.playground.runtime-preferences.v1
```

The playground validates the stored appearance, contrast, density, and motion
values before applying them. `buildDtcgThemeSnapshot` provides a serializable
resolved token snapshot, but it is not currently a complete import/export
contract for a product profile, scoped overrides, ownership metadata, or
consumer state.

## 4. Local runtime evidence

`OBSERVED` — the route was inspected through the Codex In-app Browser only;
Chrome was not used. The observed tab was the local Theme Studio route:

```text
http://localhost:4173/theme-studio
```

The initial runtime showed:

- document title `ten4seven UI — Theme Studio`;
- a mounted `.t7-provider` with `data-t7-theme="custom"`, light mode,
  default density, standard contrast, and full motion;
- resolved `--t7-content-max: 1440px`, `--t7-control-height: 40px`,
  `--t7-primary-source: emerald`, and `--t7-chart-palette: spectrum`;
- Theme Studio workbench, live visual preview, responsive shell/module proof,
  typography specimen, and component proof present;
- inverse and editorial `ThemeScope` specimens present and resolved.

`OBSERVED` — changing the live controls to enterprise, dark, compact, more
contrast, and reduced motion produced:

| Observation     | Result                                                                    |
| --------------- | ------------------------------------------------------------------------- |
| Theme recipe    | `enterprise`                                                              |
| Appearance      | dark                                                                      |
| Density         | compact                                                                   |
| Contrast        | more                                                                      |
| Motion          | reduced; resolved duration approximately `0.01ms`                         |
| Background      | `0 0% 9%`                                                                 |
| Control height  | `36px`                                                                    |
| Display family  | Inter                                                                     |
| Inverse scope   | light mode with enterprise recipe and compact geometry                    |
| Editorial scope | light mode with editorial recipe, comfortable density, and Source Serif 4 |

The controls were restored to custom, light, default/regular, standard, and
full motion after the runtime check. The Codex browser bridge did not provide
a reliable direct `localStorage` object inspection in one evaluation attempt;
the persistence claims above are therefore `SOURCE` claims from the provider
and playground code, not a claim that the stored browser bytes were inspected.

## 5. Theme axis inventory and mandatory classification

Each row has one primary classification from the Q01 vocabulary. A capability
may influence more than one downstream token family, but that does not make
each derived family independently editable.

| Capability                    | Classification        | Current authority                                                        | Current exposure and rule                                                                                                                                              |
| ----------------------------- | --------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Named base recipe             | `PRODUCT_PROFILE`     | `ThemeRecipe`, `THEME_RECIPES`, generated recipe projection              | First-class authored selection: enterprise/product/editorial/commerce. It is a coherent preset, not a bag of unrelated controls.                                       |
| Product/AAPM profile binding  | `PRODUCT_PROFILE`     | `BrandProfile`, `BRAND_PROFILES`, `composeBrandProfile`                  | First-class contract source, but explicit consumer/profile integration; not automatically injected by the generic provider.                                            |
| Appearance                    | `GLOBAL_CUSTOMIZABLE` | `RuntimePreferences`, `ThemeConfig`, provider mode resolution            | First-class runtime axis: system/light/dark. It may be persisted by the host.                                                                                          |
| Palette/profile source        | `PRODUCT_PROFILE`     | `ThemeProfile.palette`, recipe/profile data, palette profiles            | Product/profile-owned visual language; global editor may select a supported source but must preserve profile ownership.                                                |
| Primary/action color override | `GLOBAL_CUSTOMIZABLE` | `ThemeConfig.primary`, `ThemeConfig.primarySource`, theme profile action | Supported advanced/global axis with named or exact source normalization; not a replacement for semantic status meaning.                                                |
| Accent color override         | `GLOBAL_CUSTOMIZABLE` | `ThemeConfig.accent`, `ThemeConfig.accentSource`, theme profile accent   | Supported advanced/global axis with named or exact source normalization.                                                                                               |
| Semantic status meanings      | `FIXED_SEMANTIC`      | `buildThemeVariables`, foundation roles                                  | Success, warning, danger, info, focus, selected, and disabled meanings remain stable. Visual values may derive from a theme but meanings are not arbitrary knobs.      |
| Data-viz palette              | `GLOBAL_CUSTOMIZABLE` | `ThemeConfig.chartPalette`, `ThemeProfile.chart.palette`                 | First-class palette family. Individual series/point colors remain derived from the selected chart palette.                                                             |
| Canvas mode                   | `GLOBAL_CUSTOMIZABLE` | `ThemeConfig.canvas`, `ThemeProfile.canvas.mode`                         | Supported balanced/paper/monochrome axis; canvas stays largely achromatic and does not carry business status.                                                          |
| Surface treatment             | `GLOBAL_CUSTOMIZABLE` | `ThemeConfig.surfaceTreatment`, profile surface                          | Supported quiet/low-contrast/outlined axis. It controls separation/elevation treatment, not component state.                                                           |
| Surface expression/colorway   | `COMPONENT_LOCAL`     | component `emphasis`/tone contracts and canonical surface styles         | Plain/soft/expressive/solid/inverse are component composition choices. A KPI or action surface may use a deliberate colorway without making every plain card semantic. |
| Typography preset             | `GLOBAL_CUSTOMIZABLE` | `ThemeConfig.typography`, `ThemeProfile.typography`                      | Supported named preset. Family-level editing is an expert/editor concern and is not a route-local font override.                                                       |
| Density                       | `GLOBAL_CUSTOMIZABLE` | `RuntimePreferences`, `ThemeConfig.density`, density profiles            | First-class comfortable/default/compact/dense axis. Control/table/KPI geometry derives from it.                                                                        |
| Control geometry              | `DERIVED`             | density/radius profiles and centralized geometry constants               | Height, padding, touch targets, headers, forms, and table rhythm derive from density and component contracts. Do not expose each pixel as a global knob.               |
| Radius/shape                  | `GLOBAL_CUSTOMIZABLE` | `ThemeConfig.radius`, `radiusValue`, radius profiles                     | Supported named or exact base shape. Component caps and full scale derive from it.                                                                                     |
| Borders/dividers              | `DERIVED`             | canvas, surface treatment, contrast, table geometry                      | Border tones, table dividers, and contrast are derived; a local border is an exceptional layout override only.                                                         |
| Elevation                     | `GLOBAL_CUSTOMIZABLE` | `ThemeConfig.elevation`, `ThemeProfile.elevation.preset`                 | First-class authored/profile axis exists, but current Theme Studio does not expose a dedicated picker. Keep it constrained to supported presets.                       |
| Contrast                      | `GLOBAL_CUSTOMIZABLE` | `RuntimePreferences`, provider, contrast selectors                       | First-class standard/more axis. It derives borders, muted text, focus, and readable separation without changing semantic meaning.                                      |
| Interaction/focus treatment   | `DERIVED`             | primary/action, appearance, contrast, focus tokens                       | Focus remains a shared accessible treatment derived from the active theme. It is not a decorative per-route color choice.                                              |
| Motion preference             | `GLOBAL_CUSTOMIZABLE` | `RuntimePreferences`, provider, reduced-motion CSS                       | First-class full/reduced user preference. Reduced motion collapses role durations rather than creating a second motion runtime.                                        |
| Motion profile/anchor         | `GLOBAL_CUSTOMIZABLE` | `ThemeProfile.motion`, `ThemeVariableOptions.motionProfile`              | Authored profile capability exists, but the current playground primarily exposes duration/full-reduced behavior. Q02 must not invent untyped motion controls.          |
| Motion role durations         | `DERIVED`             | `resolveMotionRoles`, motion variables                                   | Role durations and easing derive from the selected profile and reduced-motion preference.                                                                              |
| Icon semantic registry        | `FIXED_SEMANTIC`      | `@ten4seven/icons`, `T7Icon`, generated icon catalog                     | Icon names and meaning are canonical library contracts; consumers must not use raw provider strings or route-local icon families.                                      |
| Icon geometry                 | `DERIVED`             | centralized icon geometry and component roles                            | Compact/control/navigation/status/feature sizes derive from component role; they are not independent theme color or route values.                                      |
| Layout/viewport composition   | `PRODUCT_PROFILE`     | recipe `ThemeComposition`, brand composition                             | Content max, reading measure, page gutter, section gap, and route composition are authored by recipe/profile context.                                                  |
| Layout and overlay geometry   | `DERIVED`             | layout/overlay geometry constants, density, component contracts          | Rails, overlay limits, tooltip depth, focus clearance, and responsive behavior derive from foundation contracts.                                                       |
| Inverse and nested scope      | `SCOPED_OVERRIDE`     | `ThemeScope`                                                             | Bounded nested theme/tone override. It must inherit safely, bridge portals, and remain keyboard/viewport safe.                                                         |
| Component state               | `COMPONENT_LOCAL`     | canonical component contracts and state styles                           | Hover, focus, selected, disabled, loading, invalid, open, and expanded are resolved at component state, not as global theme axes.                                      |
| Accessibility policy          | `FIXED_SEMANTIC`      | foundation/accessibility contracts and browser tests                     | Minimum contrast/focus/forced-colors/reduced-motion behavior is a system policy. User preferences may select supported modes but cannot disable the contract.          |

## 6. First-class, derived, fixed, and currently hard-coded boundaries

`NORMALIZED` — the current architecture can be described as follows:

### First-class and supported

- named recipe;
- runtime appearance, density, contrast, and motion preference;
- palette/action/accent sources;
- canvas and surface treatment;
- chart palette;
- radius;
- typography preset;
- profile-owned elevation and motion profile capabilities.

The last two are present in the typed model but are not equally exposed by the
current Theme Studio UI.

### Derived by the contract

- semantic CSS variables from the resolved axes;
- control, table, KPI, chart, overlay, rail, focus, and touch geometry;
- border/divider/focus values;
- chart series colors from the chart palette;
- motion role durations from profile plus preference;
- icon sizes and component geometry;
- content rails and readable measure from recipe/profile composition.

### Fixed semantic policy

- meaning of status and interaction roles;
- accessibility minimums and forced-colors behavior;
- canonical icon names and component contracts;
- component state semantics;
- consumer business semantics, permissions, data, and persistence rules.

`SOURCE` — geometry values are centralized in `packages/tokens/src/theme.ts`
and the foundation contracts. They are not scattered through the route files,
but they are intentionally not a general-purpose visual editor API.

## 7. Theme Studio capability gaps relevant to Q02

`SOURCE` — the current Theme Studio exposes named recipe/custom selection,
appearance, density, contrast, motion preference, surface treatment, palette,
primary/accent sources, canvas, chart palette, radius, typography preset, and
motion duration. The following are not currently first-class controls in that
surface:

- a dedicated elevation preset picker;
- a motion-role profile/anchor editor;
- typography family/optical-setting authoring;
- per-series chart palette authoring;
- layout/viewport/composition editing;
- iconography registry editing;
- semantic status/focus meaning editing;
- a general scoped/inverse override editor;
- validated theme import/export for profile plus scope ownership.

These gaps are not defects to solve by exposing every raw CSS variable. The
Q02 decision must select a deliberately supported subset and keep the rest
derived, fixed, profile-owned, or component-local.

`NORMALIZED` — there are two persistence paths today: provider-persisted
`Partial<ThemeConfig>` and playground-persisted `RuntimePreferences`. There is
no current typed presence map that distinguishes inherited, explicitly
overridden, and reset-to-default values for every axis. A `Partial` object also
does not by itself express ownership or a scoped inheritance boundary.

## 8. Compatibility constraints

Q02 must preserve these existing contracts:

1. Existing consumers passing a `ThemeConfig` object must continue to resolve
   through `normalizeThemeProfile`/`resolveTheme` and retain legacy data
   attributes and semantic CSS variables.
2. Named recipes remain the normal product API. A custom object remains an
   advanced editor API, not a reason to make every token independently public.
3. `RuntimePreferences` remains the user/runtime layer for appearance,
   density, contrast, and motion. It must not be conflated with product brand
   authority.
4. `ThemeScope` remains the canonical scoped/inverse mechanism. Do not create a
   second nested-theme context or a route-specific portal bridge.
5. `ThemeOverrides.variables` remains an explicit advanced exception. A safer
   typed global override model should reduce the need for arbitrary inline
   variables rather than expand it.
6. Status, focus, selected, disabled, chart, and accessibility semantics keep
   their meanings across recipes. Chart palette independence must remain
   intact where the chart contract requires it.
7. Geometry continues to come from tokens and canonical component contracts;
   no consumer-local control heights, radii, shadows, typography, or motion
   runtimes may be introduced as a theme solution.
8. Product/brand profiles remain consumer-owned composition decisions. A generic
   provider must not silently infer AAPM business authority or persist product
   state.
9. Persistence remains optional, JSON-safe, client-hydration-safe, and
   defensive when storage is unavailable or invalid.
10. Static CSS-first delivery remains limited to supported recipe/mode
    selectors. Arbitrary exact values require the runtime/token resolution
    path and must not create an unbounded generated stylesheet.
11. Public package exports remain compatible. `@ten4seven/ui` is the canonical
    consumer package; typed contracts may remain the source for profile
    metadata when a root UI re-export is not part of the accepted Q02 scope.
12. No business data, permissions, routing, validation, calculations, or
    consumer persistence behavior may move into the generic theme contract.

## 9. Proposed resolved-theme contract for Q02

`PROPOSED` — the deterministic target contract is:

```text
Ten4Seven defaults
  -> base recipe
  -> product profile
  -> global overrides
  -> scoped overrides
  -> component state
```

The serializable shape should express the same ownership boundary:

```ts
type ResolvedThemeContract = {
  defaults: {
    profile: ThemeProfile;
    runtime: RuntimePreferences;
  };
  baseRecipe: ThemeRecipeName;
  productProfile?: BrandProfileId;
  globalOverrides: {
    appearance?: RuntimePreferences["appearance"];
    density?: RuntimePreferences["density"];
    contrast?: RuntimePreferences["contrast"];
    motion?: RuntimePreferences["motion"];
    palette?: ThemeConfig["palette"];
    primary?: ThemeConfig["primary"];
    accent?: ThemeConfig["accent"];
    canvas?: ThemeConfig["canvas"];
    surfaceTreatment?: ThemeConfig["surfaceTreatment"];
    chartPalette?: ThemeConfig["chartPalette"];
    radius?: ThemeConfig["radius"];
    typography?: ThemeConfig["typography"];
    elevation?: ThemeConfig["elevation"];
    motionProfile?: ThemeProfile["motion"];
  };
  scopedOverrides?: Array<{
    scopeId: string;
    tone?: "default" | "inverse";
    recipe?: ThemeRecipeName;
    overrides?: Record<string, unknown>;
  }>;
  componentState: "resolved by canonical component contract";
};
```

The exact TypeScript names are `PROPOSED`, not an instruction to add this
object verbatim. Q02 must settle the final public shape from the current
contract sources.

Resolution rules:

1. Start from safe Ten4Seven defaults.
2. Resolve one named base recipe.
3. Apply an optional product profile only for the axes that profile owns.
4. Apply explicitly present global overrides for supported axes.
5. Apply bounded `ThemeScope` overrides, including inverse tone, without
   mutating the parent provider.
6. Resolve component state last through the canonical component contract.
7. Derive semantic variables and geometry from the resolved result; never
   serialize an uncontrolled dump of CSS variables as the primary API.

For editor behavior, each supported axis needs three inspectable states:

```text
inherited -> overridden -> reset to inherited/default
```

An axis reset must remove that axis from the override object rather than write
an opaque copy of the current resolved value. “Reset all” must restore the
selected recipe/profile/runtime baseline while leaving product/business state
untouched. Serialized import/export must accept only the typed supported
shape, validate values, preserve unknown-field safety, and report rejected
axes instead of applying them silently.

The initial supported global subset should be limited to:

- named base recipe;
- runtime appearance, density, contrast, and motion;
- palette/action/accent source;
- canvas and surface treatment;
- chart palette;
- radius;
- typography preset;
- elevation and motion profile only if Q02 provides a typed policy and UI
  decision for them.

Do not make these global editable axes:

- status/focus/selected/disabled meaning;
- individual chart series derivation;
- raw control/table/overlay geometry;
- icon names or provider strings;
- z-index and portal behavior;
- component state;
- business semantics, permissions, data, or workflow state.

## 10. Unknowns and blockers

The following are explicit constraints for Q02 rather than reasons to hide the
current architecture:

| Item                                                                       | Classification | Consequence                                                                                                                                                                           |
| -------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Product-profile-to-provider composition API                                | `UNKNOWN`      | Q02 must decide whether the provider receives a composed profile, a resolved profile adapter, or an explicit consumer-owned adapter. Silent automatic AAPM binding is not acceptable. |
| Typed global override presence/inheritance map                             | `UNKNOWN`      | Current `Partial<ThemeConfig>` cannot fully model inherited/overridden/reset state or axis ownership.                                                                                 |
| Profile-plus-scope import/export format                                    | `UNKNOWN`      | DTCG snapshot output is not enough to reconstruct a safe editable profile and scope tree.                                                                                             |
| Elevation and motion-profile editor policy                                 | `UNKNOWN`      | Typed capability exists, but UI exposure and supported values need a deliberate Q02 decision.                                                                                         |
| Typography family and optical-sizing editor policy                         | `UNKNOWN`      | Current preset support is clear; unrestricted font authoring is not part of the contract.                                                                                             |
| Per-series chart palette API                                               | `UNKNOWN`      | Current palette is family-level; a per-series API must not be invented as an incidental editor feature.                                                                               |
| Public root export of `ThemeProfile`                                       | `UNKNOWN`      | Contracts export the type, while the UI root exposes selected theme types. Q02 must decide if re-export is required without breaking package boundaries.                              |
| Scoped editor ownership/reset semantics                                    | `UNKNOWN`      | Runtime `ThemeScope` works, but the editor does not yet expose a general scoped override tree.                                                                                        |
| Browser localStorage byte inspection                                       | `UNVERIFIED`   | The Codex browser bridge did not reliably expose the object in one evaluation. Source-level persistence behavior is known; stored-byte runtime proof is not claimed here.             |
| Production adoption, AAPM acceptance, deployment, and package distribution | `UNVERIFIED`   | This local design-system harness evidence cannot establish those gates.                                                                                                               |

None of these findings requires a broad component rewrite for Q02. They do
require the implementation to state ownership and reset behavior explicitly.

## 11. Exact Q02 implementation boundary

`PROPOSED` — Q02 may implement only the smallest contract-plane slice needed
to turn this evidence into a safe theme capability:

- typed global override and resolved-theme metadata needed for supported axes;
- the provider/profile adapter required to apply the deterministic hierarchy;
- Theme Studio controls for the accepted supported subset, including
  inherited/overridden/reset behavior;
- safe validation and serialization for the accepted theme shape;
- focused contract, token, provider, and Theme Studio tests required by that
  change;
- generated contract/projection updates only when the typed source or accepted
  catalog contract requires them.

Q02 must preserve the legacy `ThemeConfig` adapter and all existing semantic
component contracts. Q02 must not expand the component catalog, rewrite
recipes/blocks/icons, change Brand Core, rename tokens opportunistically,
migrate dependencies, harmonize unrelated routes, or implement Q03/Q04 work.
The Q02 instruction remains authoritative for the final file list and gate.

## 12. Q01 verification record

`SOURCE` — discovery reads completed for the Q01 target and its required
foundation/context references, including the generated agent index and compact
projections, contracts, token resolver, static CSS, provider/scope, Theme
Studio runtime, package exports, and relevant tests.

`OBSERVED` — local Theme Studio rendered and resolved recipe, runtime
preference, inverse scope, and editorial scope changes in the Codex In-app
Browser. State was restored after the interaction.

`SOURCE` — no application source, generated contract, package manifest, test,
or dependency file was edited for Q01. Only this evidence artifact was added.

The verification record is:

| Check                                                     | Result                                         | Evidence boundary                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm --filter @ten4seven/tokens test`                    | `PASS` — 2 files, 31 tests                     | Token resolver, geometry, foundation roles, and theme semantics.                                                                                                                                                                                                                                                |
| `pnpm test:contracts`                                     | `PASS`                                         | Typed contracts, aliases, recipe metadata, profile round-trip, and compact retrieval.                                                                                                                                                                                                                           |
| `pnpm typecheck`                                          | `PASS`                                         | Contracts, native, agent, generated agent build, and playground typecheck.                                                                                                                                                                                                                                      |
| `pnpm test`                                               | `PASS`                                         | Full repository governance, contract, token, AI, component, brand, recipe, and bridge gates.                                                                                                                                                                                                                    |
| `pnpm build`                                              | `PASS`                                         | Playground production build completed; existing chunk-size advisory remains non-blocking.                                                                                                                                                                                                                       |
| `pnpm format:check`                                       | `FAIL — pre-existing repository-wide baseline` | Prettier reported 376 files after this Q01 document was formatted in isolation. The remaining warnings are existing dirty/evidence/repository files; no mass formatting was run because it would mutate unrelated work.                                                                                         |
| Codex In-app Browser `http://localhost:4173/theme-studio` | `PASS after direct route reopen`               | Theme Studio rendered with live preview, recipe controls, provider tokens, inverse scope, and editorial scope. A transient blank canvas after the package build was traced to Vite HMR failing to reload `packages/ui/dist`; direct route reopen recovered the page. No Q01 source caused that transient state. |

The format failure is a repository baseline constraint, not a Q01 source
failure. The full command results are reported for evidence and do not
authorize formatting or source cleanup outside this bounded discovery job.

PASS WITH CONSTRAINTS FOR Q02
