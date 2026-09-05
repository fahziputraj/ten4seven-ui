# Shape Authoring Correction

## Status

**PASS — 2026-09-03 local verification**

This is a bounded correction to the visual-grammar follow-up. It restores the
authored Shape surface in Theme Studio after the Opera accessibility review
found that the previous collapsed disclosure hid every radius control from the
initial accessibility tree. It does not authorize a commit, push, deployment,
or publication.

## Finding

The radius engine and recipe defaults were still active: `Editorial` resolved
to `sharp`, and the provider continued to emit the radius custom properties.
The authoring surface was the defect. Advanced Theme Authoring was collapsed by
default, and the only control inside it was an exact slider labelled `Radius`;
there were no named preset buttons or derived geometry readout in the initial
tree.

## Correction

- Advanced Theme Authoring is open by default so the authoring affordance is
  present in the first browser accessibility tree while remaining collapsible.
- Shape now has three recipe-independent preset buttons: `Sharp`, `Soft`, and
  `Rounded`. Each reads from the canonical `radiusProfiles` map and clears an
  existing exact `radiusValue` override.
- Base radius is an exact, labelled `0–24 px` canonical slider using
  `radiusValueRange`. Slider changes clamp to the supported range, preserve the
  selected recipe, and resolve through `buildRadiusProfile()`.
- The editor reports `Custom shape` for exact overrides and previews the
  `control`, `panel`, `card`, and `shell` roles. Indicator, base, and full
  compatibility roles remain represented in the supporting readout.
- `Reset recipe shape` restores the active recipe's authored radius (or the
  playground's custom default) without clearing runtime appearance, density,
  contrast, or motion preferences and without resetting other authored axes.
- The live product preview continues to consume the same provider-root radius
  variables, so buttons, inputs, cards, badges, scoped surfaces, and overlays
  respond immediately.
- Runtime Preferences remains limited to Appearance, Density, Contrast, and
  Motion. Shape is not moved into that rail.

## Evidence

Fresh local Opera accessibility capture at
`http://127.0.0.1:4173/theme-studio` exposed, without interaction:

```text
Shape → Preset → Sharp / Soft / Rounded → Base radius → Derived geometry preview → Reset recipe shape
```

The exercised flow was:

```text
Editorial recipe → Soft preset → Base radius 14 px → End (24 px clamp) → dark/light → Reset recipe shape
```

Observed results:

- `data-t7-theme` stayed `editorial` throughout the override.
- The 14 px hierarchy resolved to indicator `5px`, control `12px`, panel
  `19px`, card `21px`, and shell `28px`.
- The 24 px endpoint clamped and produced shell `48px`.
- Runtime density stayed unchanged while Shape changed.
- Light and dark modes produced identical radius variables.
- Reset returned to Editorial's authored `sharp` profile with no
  `data-radius-value` override.
- CSS-first Editorial output retained its authored `--t7-radius-base: 8px`.

## Automated verification

```text
pnpm format:check                         PASS
pnpm typecheck                            PASS
pnpm --filter @ten4seven/tokens test      PASS; 11 tests
pnpm test                                  PASS
pnpm build                                 PASS; existing large-chunk advisory only
pnpm package:verify                        PASS
pnpm test:adoption:static                  PASS
pnpm test:adoption -- --workers=1          PASS; 4 passed (14.8s)
pnpm test:consistency                      PASS; 21 UI source files
pnpm exec playwright test tests/final-stabilization.spec.ts --workers=1
                                           PASS; 4 passed (9.9s)
pnpm exec playwright test tests/visual-regression.spec.ts --workers=1
                                           PASS; 41 passed (43.1s)
pnpm test:e2e -- --workers=1               PASS; 143 passed (3.7m)
```

Theme Studio desktop, wide, tablet, mobile, and narrow visual baselines were
refreshed after manual review of the restored editor. The full serial suite
revalidated those captures and the existing route contracts.

## Integrity boundary

The existing dirty worktree was preserved. No reset, broad cleanup, unrelated
staging, commit, push, deploy, or publish was performed. The Vite server remains
running locally at `http://127.0.0.1:4173` for follow-up inspection.
