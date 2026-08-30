# Gate: workbench interaction integrity

## Scope

This gate covers documentation IA, route/hash behavior, scroll ownership,
floating containment, native dialog locking, and the form-control comparison
fixture. It does not change the business/theme architecture or create a second
component system.

## Evidence commands

```text
pnpm format:check
pnpm typecheck
pnpm test
pnpm test:consistency
pnpm build
pnpm test:e2e
```

## Acceptance criteria

- `/components` presents one family-ordered document and no component leaves in
  the workbench sidebar.
- Canonical component detail routes, recipe routes, and existing family routes
  remain refresh-safe.
- Family anchors survive direct load and restore the intended section.
- Non-modal floating content is under `#t7-overlay-root` and stays within the
  viewport at desktop and narrow widths.
- Modal/drawer opening locks body scroll and restores it on close.
- Component Lab exposes all documented overlay stress cases and form states.
- No framework console error or warning appears during the representative
  browser checks.

## Final status

**PASS.** The listed format, type, unit, catalog, consistency, build, and
rendered-browser checks completed successfully on 2026-08-30. The final serial
E2E run completed **93 tests passed**, including the expressive block suite,
Operations Tracker/Ebook/reference coverage, chart viewport-entry checks,
overlay interaction checks, and the focused workbench suites. The run also
confirmed the global motion contract, reduced-motion behavior, and the
contrast-safe accordion surface.
