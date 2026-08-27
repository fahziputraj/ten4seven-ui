# Gate: System Coherence

Date: 2026-08-27

## Decision

**Pass, subject to the verification commands below remaining green.**

## Acceptance evidence

- One persistent root theme contract propagates across every public route and survives reload.
- Five deliberately different theme profiles were executed against both enterprise and publishing reference screens.
- Canonical Select and popup families use shared interaction, elevation, motion, and layering contracts.
- Publishing cart is production-shaped on desktop and mobile without introducing commerce primitives.
- Desktop/mobile route baselines and interaction-state baselines are committed locally.
- Consistency validation, type checks, unit tests, browser interactions, accessibility smoke checks, and production build form the gate suite.

## Required verification

```text
pnpm format:check
pnpm typecheck
pnpm test
pnpm test:consistency
pnpm test:e2e
pnpm build
```

If any command fails, this decision returns to pending until the failure is explained or corrected. Packaging may resume only after the gate remains green and the rendered evidence is accepted.
