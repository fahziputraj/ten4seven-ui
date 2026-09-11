# T7-AAPM-001-Q03 — AAPM Brand Adapter and Product Profiles Evidence

Status: IMPLEMENTED / EVIDENCE RECORDED  
Mode: STRICT / BOUNDED-WIDE  
Target: local checkout of `fahziputraj/ten4seven-ui`  
Input gate: `PASS WITH CONSTRAINTS FOR Q03` from Q02  

## 1. Objective and boundary

Q03 establishes one explicit AAPM brand-adapter boundary and a small set of
product expressions that can be composed with existing Ten4Seven theme
recipes, surface profiles, density, and runtime preferences.

The implementation does not create AAPM-specific Button, Input, Card, Table,
Select, chart, or layout primitive families. Generic Ten4Seven components remain
brand-neutral. The profile layer selects identity and product expression; it
does not own business data, permissions, entitlements, persistence, routing,
handlers, or workflow authority.

The Q03 composition is represented as:

```text
generic ThemeRecipe
  + canonical AAPM BrandAdapter
  + product BrandProfile / SurfaceProfile
  + RuntimePreferences
  = BrandProfileComposition
```

## 2. Canonical authority consumed

The canonical source was read from the separate `D:\SA\AAPM_Ecosystem`
checkout. This Ten4Seven checkout stores a typed adapter and provenance
references; it does not replace, mutate, or claim ownership of the canonical
AAPM repository.

| Authority | Use in Q03 |
| --- | --- |
| `docs/design-system/README.md` | Layering: Brand → semantic foundation → components → product expression |
| `docs/design-system/brand/README.md` | Canonical asset roles, Brand Core vs Digital Brand Extension, change control |
| `docs/design-system/brand/AAPM_BRAND_DESIGN.md` | Logo rules, palette authority, semantic aliases, product expression, light/dark and accessibility rules |
| `docs/design-system/brand/tokens/aapm-brand.tokens.json` | Machine-readable Brand Core and Digital Brand Extension values |
| `docs/design-system/brand/ASSET_MANIFEST.md` | Asset provenance, canonical filenames, authorized distribution boundary |

The adapter records these source paths in
`packages/contracts/src/brand-profile.ts` and exposes them through the
generated `brand-adapter.json` projection.

## 3. Adapter mapping

`AAPM_BRAND_ADAPTER` is the only Q03 source for AAPM identity values.

Brand Core values remain exact source values:

| Semantic role | Canonical source | Value |
| --- | --- | --- |
| `brand.primary` | `brand.core.green` | `#318139` |
| `brand.accent` | `brand.core.orange` | `#D4451A` |
| `text.onBrand` | `brand.core.white` | `#FFFFFF` |
| dark-logo neutral | `brand.core.neutralDarkVariant` | `#CCCCCC` |

Digital Brand Extension values remain distinct from Brand Core:

| Semantic role | Canonical source | Value |
| --- | --- | --- |
| `brand.highlight` | `brand.digital.lime` | `#B4E717` |
| `brand.highlight.soft` | `brand.digital.limeSoft` | `#C3EC45` |
| `brand.surface.deep` | `brand.digital.deepGreen` | `#2C7433` |
| `surface.canvas.warm` | `brand.digital.warmCanvas` | `#F6F5F2` |
| `surface.brand.tint` | `brand.digital.greenTint` | `#F2FCF3` |
| `surface.brand.soft` | `brand.digital.softSurface` | `#EFF5EF` |
| `text.ink` | `brand.digital.ink` | `#10191A` |

Profiles reference semantic role names. They do not repeat these hex values.
Business states such as pending, approved, closed, warning, and danger remain
mapped through the existing status semantic system and are not equated with
AAPM Brand Core.

## 4. Product profile registry

The typed source now contains the following registry:

| Profile | Product expression | Generic recipe | Surface profile | Density | Media / type character | Asset binding |
| --- | --- | --- | --- | --- | --- | --- |
| `aapm-core` | Shared AAPM baseline | `enterprise` | `system-library` | `default` | restrained product / neutral | corporate |
| `aapm-farm` | Farm Customer | `product` | `content` | `comfortable` | documentary / editorial | corporate |
| `aapm-operations` | Operations | `enterprise` | `operational` | `compact` | product / technical | corporate |
| `aapm-erp` | ERP | `enterprise` | `data-dense` | `dense` | no media / technical | corporate |
| `aapm-academy` | Academy | `editorial` | `content` | `comfortable` | documentary / editorial | Academy |
| `aapm-public` | Public / Corporate | `editorial` | `content` | `comfortable` | editorial / editorial | corporate |

`neutral-product` remains available as the generic non-AAPM compatibility
profile. It has no AAPM adapter, no AAPM asset binding, and no AAPM semantic
role map.

The existing Authentication proof intentionally keeps its compatibility
profile set limited to `neutral-product` and `aapm-academy`. This preserves the
existing Academy behavior and route contract while allowing the full product
registry to be used by future recipes and consumer applications.

## 5. Before and after

Before Q03, the profile contract described only broad art direction for two
Authentication proof variants. It did not express canonical brand provenance,
asset authority, product identity, surface ownership, density, or generic
recipe composition.

After Q03:

- `BrandAdapterContract` records canonical source documents, exact Brand Core,
  Digital Brand Extension, semantic aliases, and official light/dark/compact
  asset references.
- `BrandProfile` records adapter, product expression, generic theme recipe,
  surface profile, density, semantic role bindings, and asset collection.
- `composeBrandProfile()` returns the explicit recipe + brand + surface +
  runtime boundary without mutating authored profile data.
- `resolveBrandAsset()` selects the canonical light/dark or compact asset path;
  consumer-owned profiles return no canonical asset.
- Generated projections include `brand-adapter.json` and the expanded
  `brand-profiles.json` for agent and consumer retrieval.
- Theme Studio includes a collapsed, read-only AAPM profile matrix so the
  relationship is inspectable without turning the page into a long-form
  document.

## 6. Ownership and consumer matrix

| Concern | Owner | Q03 implementation boundary |
| --- | --- | --- |
| Master logo, Brand Core, canonical asset names | `AAPM_Ecosystem` | Referenced only through `AAPM_BRAND_ADAPTER` |
| Brand semantic aliases and profile relationships | Ten4Seven contract layer | Typed `BrandAdapterContract` / `BrandProfile` |
| Component tokens, interaction states, status semantics | Ten4Seven design system | Existing generic `@ten4seven/ui` token/component contracts |
| Theme recipe, surface profile, density, runtime preference | Product/theme consumer | Composed through `BrandProfileComposition` |
| Business data, workflow meaning, authorization, persistence | Consumer / business module | Not added to Ten4Seven |
| Asset delivery or package distribution | Authorized product distribution process | Q03 stores provenance references; it does not copy or alter AAPM masters |

The canonical asset manifest says product repositories must consume or copy
official assets through a documented authorized distribution process. No legal
license is inferred or invented by this Q03 implementation.

## 7. Accessibility and safety results

- `pnpm test:contrast` verifies 284 recipe/mode pairs at WCAG AA 4.5:1.
- The profile registry carries separate `brand.*`, `surface.*`, and `text.*`
  roles; business-state meaning remains outside Brand Core.
- Light and dark asset selection is explicit. Runtime inversion or local SVG
  recoloring is not used.
- `pnpm test:brand-profiles` verifies canonical source provenance, exact source
  values, semantic alias provenance, authorized asset bindings, neutral
  compatibility, and runtime preference isolation.
- The verifier rejects AAPM literals in the generic contract, token, UI, chart,
  and motion implementation packages.
- Theme Studio’s profile matrix is read-only and uses canonical Ten4Seven
  cards, badges, icons, typography, spacing, radius, elevation, and responsive
  behavior.

## 8. Rendered QA

The targeted Playwright brand-expression suite ran seven tests successfully:

- Theme Studio profile adapter disclosure renders six AAPM profiles and one
  `aapm-core` adapter boundary.
- Existing neutral and Academy Authentication proofs preserve one canonical
  form anatomy while resolving different visual character.
- Both Authentication profiles remain bounded at desktop, tablet, mobile, and
  narrow-mobile viewports.
- Existing password visibility, form submission, and profile navigation remain
  interactive.

Routes used for the Q03 and compatibility proof:

- `/theme-studio`
- `/brand-proof/auth-neutral`
- `/brand-proof/auth-aapm-academy`

The broader Q02 rendered review also covered `/component-lab`, `/tokens`,
`/components`, `/blocks`, `/icons`, and `/recipes`; those routes continue to
consume the shared token/component/catalog system.

## 9. Compatibility and generated output

- Existing Authentication proof URLs remain unchanged.
- `neutral-product` and `aapm-academy` remain available with their existing
  visual and interaction contracts.
- Generic components do not import AAPM-specific values.
- Existing aliases, recipes, blocks, icons, and package exports were not
  deleted or forked for product-specific use.
- Generated projections are produced from the typed contract source through
  `pnpm contracts:generate`.

## 10. Verification record

| Check | Result | Evidence |
| --- | --- | --- |
| `pnpm contracts:generate` | PASS | 190 deterministic contract projections and token exports generated |
| `pnpm test:brand-expression` | PASS | Existing Authentication proof plus Q03 profile verifier |
| `pnpm test:brand-profiles` | PASS | Adapter, profile, asset, runtime, and generic-boundary assertions |
| `pnpm test:contrast` | PASS | 284 recipe/mode pairs at WCAG AA |
| `pnpm test:recipe-family` | PASS | Shared recipe-family kernel and selective retrieval remain valid |
| `pnpm typecheck` | PASS | Contracts, agent, generated package, and playground |
| `pnpm test` | PASS | Full repository-defined contract, token, catalog, package, and consumer checks |
| `pnpm build` | PASS | Playground production build; existing large-chunk advisory remains |
| Targeted Playwright brand-expression suite | PASS | 7 tests passed across profile, interaction, and responsive coverage |
| `git diff --check` | PASS | No whitespace errors; existing CRLF/LF warnings remain non-mutating |
| `pnpm format:check` | CONSTRAINT | Repository-wide Prettier check reports 293 files; no broad rewrite performed |

## 11. Remaining constraints

- AAPM logo masters remain canonical in `AAPM_Ecosystem`; this checkout only
  records authorized distribution references. A consumer release process still
  needs to copy the approved assets through its documented boundary.
- The component coverage gate still reports 905 legacy raw-pixel occurrences
  as explicit migration debt in the wider checkout. Shared component color,
  palette, and timing governance passes; Q03 does not perform a blanket
  unrelated pixel rewrite.
- Q03 is not AAPM product acceptance, production deployment, package release,
  native readiness, or authorization to change `AAPM_Ecosystem`.
- Q04 responsive/module-state work is not executed by this queue.

## 12. Q03 gate

`PASS WITH CONSTRAINTS FOR Q04`

The adapter/profile contract, generated projections, generic-component
boundary, accessibility checks, compatibility proof, and rendered QA are
complete. The constraints above carry forward explicitly; no Q04 work is
started by this document.
