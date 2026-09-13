# T7 Component Expansion Q07 — Display, Feedback, Overlay and Media Evidence

Status: PASS WITH CONSTRAINTS FOR Q08  
Queue: `Q07-DISPLAY-FEEDBACK-OVERLAY-MEDIA.md`  
Mode: BOUNDED-WIDE  
Risk: R2  
Date: 2026-09-11

## 1. Scope and authority

Q07 was executed against the attached Q07 work specification and the Q03
normalized coverage ledger. Q06 entered this queue with `PASS WITH CONSTRAINTS
FOR Q07`.

Q03 does not authorize a new primitive for every name in the display,
feedback, overlay, or media corpus. Its decisions remain the allocation
authority:

- `MilestoneTracker` is the existing equivalent for bounded passive progress
  and milestone presentation. It is distinct from `Stepper`, which owns an
  active sequential form or navigation flow.
- notification-center behavior is covered by the existing `ToastProvider`,
  `Toast`, and `Toaster` contracts; a persistent notification-center data
  model would be consumer-owned until a separate API decision is recorded.
- `Lightbox` and gallery are compositions of `Modal`/`Drawer`, `MediaFrame`,
  `Image`, and `Carousel`, not a second overlay or media runtime.
- JSON, Markdown, diff editors, media players, galleries with editing, and
  other dependency-heavy engines remain deferred until their content,
  licensing, performance, and interaction contracts are approved.
- offline, maintenance, permission, empty, and unavailable presentations use
  `StateView` or `ModuleState`; the consumer owns recovery policy and business
  state.

This queue therefore hardens the canonical contracts and their showroom proof
without adding a duplicate component taxonomy, business state machine, media
engine, or notification store.

## 2. Delivery map

| Contract               | Source                             | Q07 delivery                                                                                                                                                                                                        |
| ---------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MilestoneTracker`     | `packages/ui/src/data-display.tsx` | Adds ordered position/size semantics for each stage and an explicit empty-state rendering path. The tracker remains selectable progress with optional canonical `DetailDrawer` detail, not a `Stepper` replacement. |
| `Progress`             | `packages/ui/src/feedback.tsx`     | Moves accessible naming to the actual `role="progressbar"` track and keeps labelled React content connected through `aria-labelledby`.                                                                              |
| `CircularProgress`     | `packages/ui/src/feedback.tsx`     | Preserves compact visual output while exposing a stable hidden accessible label and the correct progressbar semantics.                                                                                              |
| `StateView`            | `packages/ui/src/feedback.tsx`     | Uses a semantic heading and status/alert role so empty, unavailable, permission, and error explanations are announced without relying on color.                                                                     |
| `Tooltip`              | `packages/ui/src/overlays.tsx`     | Preserves an existing trigger `aria-describedby` value, appends its own description id, and reports the resolved placement from the shared floating-position contract.                                              |
| `MediaFrame` / `Image` | `packages/ui/src/media.tsx`        | Gives labelled media frames a semantic group and prevents a missing native `alt` attribute when an image URL is supplied.                                                                                           |
| `QrCode`               | `packages/ui/src/qr.tsx`           | Keeps figure-level descriptions valid on both success and encoding-error paths while retaining a separate SVG `<desc>` id.                                                                                          |

No new package, donor UI library, overlay runtime, notification store, media
engine, or component identity was introduced.

## 3. Accessibility and interaction proof

### Milestone and progress display

- The milestone sequence remains a labelled navigation region with an ordered
  list of keyboard-reachable stage buttons.
- Stage controls expose `aria-posinset` and `aria-setsize`, while each nested
  progressbar exposes the normalized percentage as visible text and
  `aria-valuenow`.
- Selecting a stage in `detailMode="drawer"` opens the canonical right-side
  `DetailDrawer`; Escape closes it and restores focus to the selected stage.
- Empty milestone input no longer renders a silent empty shell. It exposes a
  polite status message explaining that the consumer has not supplied a path.
- `Progress` now places its label relationship on the element that owns
  `role="progressbar"`, including ReactNode labels and indeterminate state.
- `CircularProgress` keeps its visual percentage compact but supplies a hidden
  label for the progressbar name.

### Feedback and overlays

- `StateView` uses a semantic heading and `role="alert"` for errors, or
  `role="status"` for the other state presentations. State meaning remains
  available without color.
- Tooltip trigger descriptions are additive: an existing consumer-supplied
  `aria-describedby` is preserved instead of being overwritten.
- Tooltip placement is read from the shared floating-position result, so the
  semantic placement and visual placement cannot silently disagree after edge
  collision handling.
- Persistent feedback remains `Alert`/`StateView`; transient feedback remains
  `Toast`/`Toaster`. Q07 does not move persistence or notification policy into
  the library.

### Media and QR

- A labelled `MediaFrame` is exposed as a labelled group, keeping the ratio
  container discoverable while its child owns the image/media semantics.
- `Image` supplies an explicit empty `alt` for an otherwise-unlabelled native
  image and a readable fallback label when the source fails.
- `QrCode` keeps the opaque value consumer-owned, exposes a human-readable
  label/description, and keeps the figure description valid when QR encoding
  fails.
- Copy, print, camera, scanning, and resource authorization remain separate
  consumer/native responsibilities as required by the existing QR contract.

## 4. Token, theme, density, and responsive contract

The changes follow the primitive → semantic → component token model from the
design-system contract:

- no raw palette, local shadow, local radius scale, or second motion runtime
  was added;
- the empty milestone surface uses existing panel, card-padding, field-gap,
  border, and subtle-surface roles;
- StateView and progress semantics preserve the existing visual treatment and
  do not introduce a new semantic color family;
- tooltip placement continues to use the shared floating layer and overlay
  geometry;
- MediaFrame and QR continue to use existing panel, surface, border, type,
  control-gap, and print contracts;
- the milestone sequence stays inside its bounded horizontal scroll owner on
  narrow layouts, and the canonical detail drawer remains viewport-safe;
- reduced-motion behavior remains owned by the existing shared motion roles.

The Theme Studio matrix remains the appearance, density, contrast, and motion
authority. No Q07-local theme controls were added.

## 5. Index, showroom, and AI metadata

Q03 and the current catalog already provide implemented metadata for the Q07
contracts. Because Q07 adds no new identity or public prop, no catalog entry or
generated contract projection was hand-edited. This preserves the current
registry counts:

- 166 total component catalog entries;
- 160 canonical implemented components;
- 6 explicit aliases;
- 29 recipes, 12 expressive blocks, and 122 semantic icons.

The existing family showrooms remain the discoverability layer:

- `/components/data-display` — `MilestoneTracker`, progress/data signals,
  records, activity, and revision display;
- `/components/feedback-progress` — state, status, loading, linear/circular
  progress, and transient feedback;
- `/components/overlays` — modal, drawer, popover, tooltip, menu, and context
  contracts;
- `/components/media` — ratio, media frame, image, and QR contracts.

Component Lab remains the interaction/stress workbench; the family showrooms
remain concise contract previews. No duplicate Q07 page taxonomy was created.

## 6. Verification record

| Check                                                                        | Result        | Evidence                                                                                                                                                                                                              |
| ---------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm typecheck`                                                             | PASS          | Contracts, native, agent, and playground typechecks completed after Q07 source changes.                                                                                                                               |
| `pnpm package:build`                                                         | PASS          | Published `@ten4seven/ui` package rebuilt with the hardened source and styles.                                                                                                                                        |
| `pnpm package:verify`                                                        | PASS          | 17 root exports, bundled tokens/icons/motion, and self-contained styles verified.                                                                                                                                     |
| `pnpm test`                                                                  | PASS          | Full contract, responsive, domain, native, ERP, DTCG, contrast, governance, coverage, slice, brand, recipe, token, AI, component-system, and Tailwind bridge chain passed.                                            |
| `pnpm build`                                                                 | PASS          | Playground TypeScript/Vite production build passed; only the existing large-chunk advisory was emitted.                                                                                                               |
| `pnpm exec playwright test tests/q07-display-feedback-overlay-media.spec.ts` | PASS          | 3 focused tests passed: milestone/progress semantics, feedback naming, and tooltip/media/QR labelling.                                                                                                                |
| `pnpm test:component-coverage`                                               | PASS          | 7 high-impact selector families verified; 940 raw-pixel occurrences are tracked as explicit migration debt.                                                                                                           |
| Targeted Prettier                                                            | PASS          | All Q07 source and focused test files match repository Prettier output.                                                                                                                                               |
| Codex Browser `/components/data-display`                                     | OBSERVED PASS | Milestone showroom rendered; stage drawer opened and Escape returned focus to the selected stage.                                                                                                                     |
| Codex Browser `/components/feedback-progress`                                | OBSERVED PASS | Progressbar exposed `aria-labelledby` and value 72; StateView error exposed an alert with a heading.                                                                                                                  |
| Codex Browser `/components/overlays`                                         | OBSERVED PASS | Tooltip opened from its labelled trigger.                                                                                                                                                                             |
| Codex Browser `/components/media`                                            | OBSERVED PASS | Labelled MediaFrame exposed a group; QR figure description resolved to the consumer-supplied explanation.                                                                                                             |
| `pnpm format:check`                                                          | CONSTRAINT    | Repository-wide Prettier baseline reports 364 files requiring formatting, including existing generated, evidence, fixture, and unrelated source debt. Q07 files pass targeted formatting; no mass-format was applied. |
| `git diff --check`                                                           | PASS          | No whitespace errors. Existing CRLF normalization warnings remain confined to unrelated dirty files.                                                                                                                  |

The initial coverage verifier reported a stale generated count after the Q07
stylesheet change. The official `pnpm tokens:coverage` generator was run, and
the final verifier plus full test chain pass against the regenerated 940-count
report.

## 7. Evidence classification and boundary

- **SOURCE:** canonical display, feedback, overlay, media, and QR source
  contracts; existing catalog metadata; existing family showroom fixtures; the
  focused Q07 browser test; and the regenerated token coverage report.
- **RUNTIME:** package build/verification, typecheck, full repository contract
  gates, playground build, and focused Playwright proof.
- **OBSERVED:** Codex In-app Browser rendered the four affected family routes
  and verified the milestone drawer, focus restoration, progress/state naming,
  tooltip, MediaFrame, and QR description behavior. Chrome was not used.
- **UNKNOWN / UNVERIFIED:** production adoption, downstream package
  consumption, persistent notification-center policy, media-engine selection,
  native QR scanning, backend state, authorization, and deployment.

The worktree was already dirty with Q01–Q06, Q14, icon, generated, test,
Playwright, and branch-recovery changes. No reset, clean, commit, push, merge,
branch deletion, or deployment was performed. The current branch/SHA at
evidence time is:

```text
codex/icons-curated-solar-style
e582cfcfbe0f077d1a5832d86db9da1898487fd3
feat(q14): restore fluid navigation and responsive shell hardening
```

Q08 was not started.

PASS WITH CONSTRAINTS FOR Q08
