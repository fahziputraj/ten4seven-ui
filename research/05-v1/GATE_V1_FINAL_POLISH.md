# Gate v1 — final motion and interaction polish

Date: 2026-08-30

## Decision

**PASS — v1 motion and interaction polish is complete.** The work keeps the
existing Ten4Seven architecture, tokens, contracts, recipe boundaries, and
validation model. Motion is centralized in the UI package and is consumed by
the same primitives across Theme Studio, Component Lab, Operations Tracker,
Publishing Store, the component catalog, and the public showcase.

## Motion contract

- `motionDuration` is a provider-level axis from `0.25s` to `2.5s` in `0.25s`
  steps, with `1.5s` as the default.
- Semantic roles cover interactive, state, fast entrance, entrance, slow
  entrance, exit, linear loop, and eased loop behavior.
- `t7Motion` is the small public role map exported by `@ten4seven/ui`; source
  CSS keyframes use the `t7-motion-*` namespace and consume the roles rather
  than local durations or per-element delays.
- Canonical buttons, icon buttons, toggle buttons, and navigation items share
  a restrained pointer-origin feedback layer. Cards use a quiet border/shadow
  lift; they do not receive the large radial wash used by the earlier fixture.
- Popovers, menus, drawers, dialogs, cart feedback, accordion expansion,
  chart reveals, progress indicators, skeletons, and tooltips use the same
  motion roles. `prefers-reduced-motion` is handled centrally by the token
  stylesheet.
- Charts and sparklines reveal when they enter the viewport. Line, bar, and
  donut fixtures have no hardcoded local delay values.
- Scroll behavior and scrollbar fallback geometry remain global and quiet:
  smooth document scrolling, thin 4px scrollbars, transparent tracks, and
  low-alpha tokenized thumbs.

Animate UI was used as a quality reference for restrained, spring-like
interaction choreography; its runtime was not copied into product code. The
behavior was normalized into the native Ten4Seven motion contract so consumers
do not need a second animation runtime or a parallel component API.

## Accessibility and regression evidence

- `pnpm format:check` — passed.
- `pnpm typecheck` — passed.
- `pnpm test` — passed: tokens 5/5, AI catalog 17 recipes / 145 components /
  12 expressive blocks / 98 semantic icons, cold-start 11 tasks / 9 reads /
  0 donor reads, component system passed.
- `pnpm test:consistency` — required consistency guard.
- `pnpm build` — passed; Vite emitted only the existing bundle-size advisory.
- `tests/system-coherence.spec.ts` — 20/20, including exact motion-duration
  propagation, viewport chart reveal, action feedback, quiet card hover, and
  reduced motion.
- `tests/workbench-interaction.spec.ts` — 9/9, including overlays, chart
  interaction, date/time picker, selection alignment, and nested modal flow.
- Full serial browser gate — **93/93** across catalog IA, expressive blocks,
  public interactions, reference renders, system coherence, visual baselines,
  and workbench interaction integrity.
- The final Axe check has no serious violations; accordion copy on subtle
  surfaces uses `muted-foreground-strong` to stay above the WCAG AA threshold.

## Scope boundary

No business/theme architecture was changed to make a demo prettier. No
commerce-specific primitive family, donor runtime, backend, or product data
integration was introduced. Existing direct routes and the running local
preview remain the visual QA surface.
