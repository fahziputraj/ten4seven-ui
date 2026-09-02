# Visual Change Ledger

Status: **REVIEWED — 46 baseline changes accepted as intentional**  
Verified: 2026-09-01

## Rule used

No snapshot was refreshed before its rendered difference was associated with an
owned source change. A baseline is accepted only if the rendered result was
visually reviewed and the underlying semantic/geometry change is intended.

## Accepted baseline groups

| Decision                            | Snapshot group                                                                       | Count | Source mapping                                                                                                                                                                                                                                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------------------ | ----: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| INTENTIONAL                         | Public Showcase expressive renders: desktop, wide, two tablet widths, mobile, narrow |     6 | Mobile navigation owns 44px targets, its visible header CTA owns a 40px target, carousel indicator uses a compact visual mark with a safe target, and canonical local typography render is self-contained.                                                                                      |
| INTENTIONAL                         | Operations reference renders: mobile, narrow                                         |     2 | Removes duplicate mobile product identity while retaining sidebar navigation.                                                                                                                                                                                                                   |
| INTENTIONAL                         | Ebook Store reference renders: mobile, narrow                                        |     2 | Touch-safe public navigation, 40px publish/cart actions, and catalog rhythm at the mobile breakpoints.                                                                                                                                                                                          |
| INTENTIONAL                         | Theme Studio visual-regression renders: five widths                                  |     5 | Semantic control cards, clearer role preview, one-column narrow layout, profile-grid correction, and local font package.                                                                                                                                                                        |
| INTENTIONAL                         | Component Lab visual-regression renders: five widths                                 |     5 | Canonical touch geometry, static-card ownership, and local font package.                                                                                                                                                                                                                        |
| INTENTIONAL                         | Component catalog visual-regression renders: five widths                             |     5 | Canonical local font metrics and static-card state contract.                                                                                                                                                                                                                                    |
| INTENTIONAL                         | Token visual-regression renders: five widths                                         |     5 | Semantic profile explanation replaces the empty axes panel; local font metrics.                                                                                                                                                                                                                 |
| INTENTIONAL after independent proof | Icon visual-regression renders: five widths                                          |     5 | No `packages/icons` implementation/anatomy change was introduced. Cross-viewport output remained semantically identical; only canonical token/font rendering and surrounding shell metrics changed. The formerly held dirty icon baselines are therefore reclassified with documented evidence. |
| INTENTIONAL                         | Recipe visual-regression renders: five widths                                        |     5 | Canonical local font metrics and shared shell geometry.                                                                                                                                                                                                                                         |
| INTENTIONAL                         | Operations Tracker visual-regression renders: tablet, mobile, narrow                 |     3 | Mobile duplicate chrome removal and shared typography metrics.                                                                                                                                                                                                                                  |
| INTENTIONAL                         | Ebook Store visual-regression renders: mobile, narrow                                |     2 | Public navigation/header-action target sizing and compact responsive behavior.                                                                                                                                                                                                                  |
| INTENTIONAL                         | Component Lab modal interaction render                                               |     1 | Canonical backdrop/touch geometry and local font metrics.                                                                                                                                                                                                                                       |

Total accepted baseline changes: **46**.

## 2026-09-01 interaction-only revalidation

Decision: **NO DEFAULT SCREENSHOT BASELINE CHANGE.**

The follow-up repair changes focus, keyboard, accessible-name, dismiss, and
touch-target behavior in the canonical component layer. The default captured
states remain visually equivalent, so `pnpm test:visual:update` was not run and
no snapshot was silently regenerated. Focused rendered checks covered the
Command Menu active descendant, form-listbox Escape/outside dismissal, menu
roving focus, nested-overlay Escape containment, DataTable row keyboard
activation, and the exact 360px Theme Studio target geometry.

This is deliberately distinct from the 46 historical accepted baselines above:
the repairs are real behavior changes with no reviewed default-image delta.

## Historical snapshot inventory — preserved, not reclassified

The following nine tracked images are not referenced by the active screenshot
assertions. They pre-date this repair cycle, were not generated or removed by
it, and do **not** count as new accepted baseline changes:

```text
tests/visual-regression.spec.ts-snapshots/components-modal-chromium-win32.png
tests/visual-regression.spec.ts-snapshots/warehouse-inventory-desktop-chromium-win32.png
tests/visual-regression.spec.ts-snapshots/warehouse-inventory-wide-chromium-win32.png
tests/visual-regression.spec.ts-snapshots/warehouse-inventory-tablet-chromium-win32.png
tests/visual-regression.spec.ts-snapshots/warehouse-inventory-mobile-chromium-win32.png
tests/visual-regression.spec.ts-snapshots/warehouse-inventory-narrow-chromium-win32.png
tests/reference-screen-renders.spec.ts-snapshots/warehouse-inventory-desktop-1440x900-chromium-win32.png
tests/reference-screen-renders.spec.ts-snapshots/warehouse-inventory-mobile-390x844-chromium-win32.png
tests/reference-screen-renders.spec.ts-snapshots/warehouse-inventory-narrow-360x800-chromium-win32.png
```

They remain **PRE-EXISTING / HISTORICAL**. A separate, explicitly approved
snapshot-inventory cleanup would be required before changing them.

## Independent icon-baseline proof

The five icon files were specifically isolated because they were already dirty
before this pass. They were not treated as ordinary visual churn. The review
established all of the following before accepting a regenerated baseline:

1. no icon catalog, icon primitive, or icon mapping was modified in this
   hardening work;
2. semantic icon mobile-label coverage passes in the full browser suite;
3. expected/actual comparison shows no new icon anatomy, layout, or
   discoverability change;
4. the observed drift is consistent across desktop, wide, tablet, mobile, and
   narrow outputs and follows the canonical local-font/token rendering change;
5. current regenerated output then passes the ordinary visual regression run.

This satisfies the prior HOLD condition by proving intent rather than treating
historical dirty files as automatically safe to overwrite.

## Excluded generated outputs

The following are not evidence to retain or stage:

```text
.dev-server.log
.dev-server-error.log
test-results/**
artifacts/ten4seven-ui-1.0.0.tgz
```

`test-results/**` contains transient Playwright failure/update artifacts; the
tracked snapshot baselines above are the reviewed evidence. No commit/staging
action is performed by this hardening gate.
