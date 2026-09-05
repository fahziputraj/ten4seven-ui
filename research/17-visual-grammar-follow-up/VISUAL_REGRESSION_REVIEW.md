# Visual Regression Review — Final Stabilization

## Review protocol

Visual baselines were not updated as a first response to a failing test. The
rendered routes were inspected in the in-app Browser first, then the existing
Playwright visual suite was run without update mode. Only differences explained
by the approved calibration were refreshed.

## Initial diff review

The first post-calibration visual run executed 41 captures with one worker:

```text
32 passed, 9 failed
```

The nine failures were limited to the expected Theme Studio and Operations
Tracker captures:

- Theme Studio desktop, wide, tablet, mobile, and narrow captures changed
  because recipe intent lines, selected-state treatment, product-first copy,
  the restored Shape authoring surface, and the closed diagnostics disclosure
  changed the workbench geometry.
- Operations Tracker desktop, wide, tablet, and mobile captures changed because
  the milestone rings became three pixels and the workflow badge changed from
  internal fixture framing to `5-stage workflow`.

No Component Lab, Ebook Store, Public Showcase, catalog, token, icon, recipe,
or overlay capture failed in this review.

## Approved baseline refresh

The changed images were manually inspected as actual/diff pairs. The visual
refresh then completed:

```text
pnpm test:visual:update -- --workers=1
41 captures refreshed after manual review
```

The Operations reference-render suite subsequently identified the two matching
route screenshots affected by the same visible change. Those were reviewed and
refreshed with a targeted run:

```text
pnpm exec playwright test tests/reference-screen-renders.spec.ts --grep "Operations Tracker" --update-snapshots --workers=1
3 passed (3.8s)
```

The narrow Operations capture did not differ and was retained by the update
run. No unrelated snapshot was staged or reverted.

## Final revalidation

The full serial browser suite re-ran against the refreshed artifacts:

```text
pnpm test:e2e -- --workers=1
143 passed (3.7m)
```

The 143 tests include route identity, responsive boundaries, interactions,
accessibility, expressive blocks, public recipe expression, the final
stabilization contracts (including Shape authoring), visual regression,
adoption, and overlay integrity.

## Baseline boundary

The refreshed images are controlled evidence for the current source state. They
do not imply production deployment or cross-browser pixel parity. A future
visual change should repeat this review protocol and must explain any affected
surface before updating its baseline.
