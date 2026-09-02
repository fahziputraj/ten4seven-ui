# Universal v2 final gate

## Snapshot status: PASS — execution evidence recorded on 2026-09-02

This is an evidence-backed gate for the implemented Universal Design System v2
scope. It records the final commands and rendered checks from this workspace,
rather than relying on an earlier documentation-only review. The status does
not claim a DTCG-native or OKLCH runtime, nor that every literal measurement
has already been removed; those explicit boundaries remain tracked below.

| Requirement           | Status | Source evidence                                                                                                                                        | Final recorded evidence                                                                                                                                                                                                                                                  |
| --------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Architecture          | PASS   | Typed recipes, runtime preferences, scopes, CSS-first output, and the Tailwind bridge span `packages/contracts`, `packages/tokens`, and `packages/ui`. | `pnpm typecheck`, `pnpm test`, `pnpm build`, and a fresh package build all passed.                                                                                                                                                                                       |
| Legacy compatibility  | PASS   | `ThemeConfig` remains accepted by the provider compatibility resolver and legacy attributes remain available.                                          | Static adoption proof covers the old object path; the isolated-consumer Playwright suite passed 4/4.                                                                                                                                                                     |
| Token governance      | PASS   | The deterministic export has typed reference values, semantic aliases, and recipe metadata.                                                            | DTCG verification passed for all three outputs; contrast checked 64 recipe/mode pairs at WCAG AA 4.5:1, with a lowest measured ratio of 4.80:1. Runtime HSL remains an intentional compatibility boundary.                                                               |
| Semantic geometry     | PASS   | Nineteen density-aware geometry roles drive controls, fields, cards, tables, and overlays.                                                             | Component coverage verified seven high-impact selector families and the v2 browser proofs exercise compact and comfortable contexts. The 795 literal-pixel occurrences are reported migration debt, not hidden as zero.                                                  |
| Theme recipes         | PASS   | `enterprise`, `product`, `editorial`, and `commerce` are typed contracts with generated static CSS and compact projections.                            | Contract, DTCG, browser recipe/mode, Theme Studio, and CSS-first proofs passed.                                                                                                                                                                                          |
| Runtime preferences   | PASS   | Appearance, density, contrast, and motion are independent runtime preferences.                                                                         | The full browser suite proves explicit preference precedence and system appearance reacts dark-to-light-to-dark after reset; reduced-motion behavior also passed.                                                                                                        |
| ThemeScope            | PASS   | Nested and inverse scopes re-resolve semantic variables and expose scoped metadata.                                                                    | Narrow-viewport focus/containment proof passed. An editorial scoped Select proves its portal retains semantic token and typography parity in the provider overlay root, stays in the viewport, closes with Escape, and restores focus.                                   |
| CSS-first delivery    | PASS   | `theme.css`/`themes.css` assemble generated resolved light/dark selectors without React runtime calculation.                                           | CSS-first proof passed both inside the Universal v2 browser suite and in the isolated adoption consumer. CSS-first `system` remains correctly documented as requiring an application/media-query adapter that writes a resolved mode.                                    |
| Tailwind bridge       | PASS   | The published bridge uses semantic Tailwind v4 `@theme inline` mappings, including semantic foreground roles.                                          | An isolated external-consumer verifier rebuilt the package, resolved only published `theme.css` and `tailwind.css`, and compiled six semantic utilities, including `text-t7-primary-foreground`.                                                                         |
| Component maturity    | PASS   | The canonical catalog defines 139 components and shared semantic styles.                                                                               | Governance and coverage checks passed; keyboard, overlay, focus, a11y, responsive, and stateful component flows passed in the final 134-test browser suite. Coverage is deliberately reported by high-impact family rather than claiming all raw geometry is eliminated. |
| Aesthetic consistency | PASS   | Recipes, composition, shell grammar, expression guidance, and reference surfaces are defined in the system contracts.                                  | Theme Studio desktop/narrow, Operations mobile, reference-product, public-showcase, and system-baseline captures were reviewed; final visual and interaction suites passed.                                                                                              |
| Accessibility         | PASS   | Focus, dialog/overlay, semantic controls, and reduced-motion contracts remain in canonical source.                                                     | Representative axe, keyboard traversal, Escape, focus restoration, native dialog/drawer, Select, and scoped-portal tests passed.                                                                                                                                         |
| Responsive QA         | PASS   | Responsive shell and component contracts cover private and public surfaces.                                                                            | Desktop, wide, tablet, mobile, and narrow browser matrices passed with no asserted overflow across Theme Studio, catalog, Operations, Ebook Store, and public surfaces.                                                                                                  |
| Visual regression     | PASS   | Visual-test infrastructure covers system, reference, and expressive routes.                                                                            | The final serial suite passed all visual baseline assertions. Affected baseline updates were reviewed as rendered actual/diff images before acceptance.                                                                                                                  |
| Package verification  | PASS   | The build produces JS/types, CSS slices, `tokens.dtcg.json`, and self-hosted fonts.                                                                    | Fresh `pnpm package:build` passed; `pnpm package:verify` confirmed eight root exports, bundled tokens/icons/motion, and self-contained styles.                                                                                                                           |
| Consumer adoption     | PASS   | Operational code uses the recipe/preference path; public code preserves legacy configuration and a CSS-first fixture.                                  | Static adoption proof passed for two isolated consumers, and the package-artifact Playwright adoption suite passed 4/4.                                                                                                                                                  |
| AI-native guidance    | PASS   | Generated agent projections, recipe guidance, DTCG guidance, and compact catalogs are present.                                                         | Generated projections were rebuilt; AI catalog and cold-start retrieval checks passed with 17 recipes, 145 components, 12 blocks, and 98 semantic icons.                                                                                                                 |

## Required command record

All commands below were run against the final local source state on 2026-09-02.

| Command                     | Result | Relevant result                                                                                                           |
| --------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| `pnpm contracts:generate`   | PASS   | Generated 170 contract projections, static recipe CSS, and three DTCG-compatible token exports.                           |
| `pnpm tokens:coverage`      | PASS   | Regenerated the component token coverage report.                                                                          |
| `pnpm format:check`         | PASS   | Prettier reported all matched files formatted.                                                                            |
| `pnpm typecheck`            | PASS   | Contracts, agent, and playground TypeScript checks passed.                                                                |
| `pnpm test`                 | PASS   | Contracts, DTCG, contrast, governance, coverage, AI, component-system, token, and external Tailwind-bridge checks passed. |
| `pnpm build`                | PASS   | Playground production build passed. Vite reported its non-failing large-chunk advisory.                                   |
| `pnpm package:build`        | PASS   | Fresh self-contained `@ten4seven/ui` ESM/CJS artifacts built successfully.                                                |
| `pnpm package:verify`       | PASS   | Verified eight root exports, bundled dependencies, and package styles.                                                    |
| `pnpm test:adoption:static` | PASS   | Verified legacy, recipe-first, and CSS-first isolated consumer boundaries.                                                |
| `pnpm test:adoption`        | PASS   | 4/4 package-artifact adoption Playwright tests passed.                                                                    |
| `pnpm test:consistency`     | PASS   | Canonical consistency verified across 21 UI source files.                                                                 |
| `pnpm test:e2e`             | PASS   | 134/134 serial Chromium tests passed in 4.8 minutes.                                                                      |

## Rendered and visual record

- Direct in-app browser review covered Theme Studio at 1440 x 900 and 390 x
  844, plus the Operations Tracker at 390 x 844. The reviewed Theme Studio
  console was free of errors.
- Visual-regression coverage exercised desktop, wide, tablet, mobile, and
  narrow system baselines. Reference and expressive screens also covered 1440
  x 900, 1280 x 800, 1024 x 900, 768 x 900, 390 x 844, and 360 x 800 where
  applicable.
- Theme Studio, public showcase, Operations Tracker, Ebook Store, cart, and
  component/reference captures were reviewed before affected baselines were
  updated. The final 134-test run then revalidated the accepted baselines.

## Explicit boundaries and follow-up risks

1. **Color/runtime boundary:** the DTCG artifact is deterministic and typed,
   while the runtime continues to use HSL custom properties for visual and
   compatibility stability. This is not a claim that runtime colors are
   DTCG-native or already migrated to OKLCH.
2. **CSS-first system mode:** generated selectors intentionally support
   resolved `light` and `dark` modes. A CSS-first consumer that wants system
   preference must use its application/media-query adapter to write the
   resolved mode; the React runtime handles that orchestration.
3. **Geometry migration debt:** 795 literal pixel measurements remain tracked
   in the component coverage report. High-impact semantic families are
   governed; this gate does not pretend that every numerical measurement has
   disappeared.
4. **Bundle advisory:** the production playground build passes, but Vite still
   reports a non-failing large-chunk advisory. Future route-level code-splitting
   can address it without changing the v2 contract.

The Universal v2 implementation and its defined compatibility, package,
consumer, visual, and browser-verification scope are therefore **PASS**.
