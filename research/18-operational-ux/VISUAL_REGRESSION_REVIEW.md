# Visual Regression Review — Operational UX

Status: **PASS — reviewed and confirmed by the final full suite**  
Date: 2026-09-03

## Protocol

The workflow was:

```text
capture/compare → inspect rendered actual and diff → classify →
bounded baseline update → rerun without update
```

An update command alone is not treated as a pass.

## New operational baselines

Nine baselines are owned by `tests/operational-patterns.spec.ts`:

- desktop: Control Tower, Process Workspace, Load & Route, Receiving, Entity
  360;
- mobile 390×844: Control Tower, Load & Route, Receiving;
- desktop dark/compact/more-contrast/reduced-motion: Control Tower.

The focused suite passed 15/15 while creating the new dark baseline and then
passed 15/15 again without update. The images were inspected at original
resolution; hierarchy, semantic order, warnings, tables, route sequence,
decision controls, and narrow stacking were accepted.

## Existing baseline impact

The first full serial run produced 147 passes and 16 visual mismatches. Diff
inspection showed all 16 were caused by authorized, visible contract changes:

- 12 desktop/wide documentation images gained the new `Operational Patterns`
  reference navigation item;
- Recipes tablet/mobile/narrow changed the visible count from 17 to 28;
- the Component Lab modal image gained the same sidebar item behind its
  correctly rendered backdrop.

Operations Tracker and Ebook Store baselines remained unchanged. Three
representative actuals—Theme Studio desktop, Recipes mobile, and Component Lab
modal—were opened and inspected before the bounded refresh.

`tests/visual-regression.spec.ts` was then run with `--update-snapshots`; all
41 cases completed and only the 16 expected files were regenerated. A normal
rerun passed 40/41 once, with `icons-wide` differing only in the line wrap of
its intro sentence. The expected and actual images were visually identical in
layout/content other than that wrap. The exact test then passed 3/3 in fresh
browser processes without any further baseline change, classifying it as a
transient font/layout timing event.

## Final confirmation

The post-refresh `pnpm test:e2e --workers=1` run passed **163/163** in
11.7 minutes. This includes all 41 system/reference baselines, all nine
operational baselines, and the interaction/accessibility suites. No snapshot
update flag was present in that final run.
