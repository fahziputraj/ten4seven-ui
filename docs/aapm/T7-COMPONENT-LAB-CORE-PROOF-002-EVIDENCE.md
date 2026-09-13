# T7-COMPONENT-LAB-CORE-PROOF-002 — Q04 Core Layout & Actions Evidence

Date: 2026-09-12  
Repository: `fahziputraj/ten4seven-ui`  
Route: `/component-lab#component-lab-core-layout-actions`  
Related forms route: `/component-lab#component-lab-forms-feedback`  
Execution mode: BOUNDED / STRICT

## Scope

This correction is limited to the Q04 Core Layout & Actions proof and the
canonical component contracts proven to be responsible for its geometry:

- split-pane minimum useful rail geometry and restrained divider composition;
- intrinsic Transfer option rows;
- fixture-local intrinsic sizing for the Accent preview and Applied tags
  controls;
- one shared RangeSlider track with two overlaid native range inputs;
- selected-state readability where the canonical selected token had been
  consumed as an opaque hue;
- bounded regression coverage and rendered browser QA.

Q10 was not changed. The accepted Component Lab section-navigation correction
was only exercised as a regression. No commit, push, PR, merge, tag, or publish
was performed.

## Observed defects

The runtime baseline reproduced the reported Q04 defects:

| Area | Before | Evidence / ownership |
| --- | --- | --- |
| Split workspace | The Q04 fixture omitted explicit `minStart` and `minEnd` values. At the allowed resize endpoint the secondary rail could become too narrow; the `Selected record` content and file preview could clip. The full divider hit target also read as a heavy stripe. | Fixture composition. Canonical `SplitPane` already supported bounded resizing, but this proof did not provide a useful minimum for both rails. |
| Transfer | With a tall listbox, rows were stretched by the grid. The two available options measured about 83px each and the selected option about 170px inside a 180px list. | Canonical Transfer stylesheet. The list grid did not force intrinsic row sizing or top alignment. |
| Short controls | `Accent preview` and `Applied tags` inherited an excessive control measure, measuring approximately 369px and 310px on the desktop proof. | Fixture composition. No reusable intrinsic-measure API was added. |
| Confidence range | The Forms proof showed two independent native horizontal tracks even though the semantic control exposed a minimum of 22 and maximum of 84. | Canonical RangeSlider implementation. The fixture was not duplicating the range locally. |
| Selected-state readability | The theme exposes `--t7-selected-hsl` as a hue triplet. The canonical fallback expression treated that triplet as an opaque background, producing solid blue active rows with dark text. | Canonical selected-state CSS. The correction is the smallest semantic alpha fix, not a new Q04 visual system. |

## Root-cause ownership and bounded changes

| Contract | Owner | Correction |
| --- | --- | --- |
| Two usable split rails | FIXTURE | Q04 passes `minStart={40}` and `minEnd={40}`. The divider keeps its canonical hit target while the Q04 visual stroke is transparent and the grip remains available. A Q04 container query recomposes the narrow detail file preview rather than allowing internal clipping. |
| Intrinsic Transfer rows | CANONICAL COMPONENT | The canonical Transfer list now uses `align-content: start`, `align-items: start`, and `grid-auto-rows: max-content`. The listbox remains bounded and scrollable; option height is content-driven. |
| Short Q04 controls | FIXTURE | Q04 applies `inline-size: fit-content` and `max-inline-size: 100%` to the ColorPicker and TagsInput field composition. No global width token or one-off global API was introduced. |
| Shared range presentation | CANONICAL COMPONENT | `RangeSlider` renders one semantic base track, one selected-range segment, and two overlaid native range inputs. The inputs retain independent accessible names, values, focus, pointer, and keyboard behavior. The overlay uses governed z-index tokens. |
| Selected-state alpha | CANONICAL COMPONENT | Transfer, TreeView, NavigationRail, and BottomNavigation selected backgrounds consume `hsl(var(--t7-selected-hsl) / 0.1)` rather than the opaque hue fallback. Transfer and TreeView borders use the primary hue with the existing alpha contract. |
| Q04 surface consistency | FIXTURE / canonical Card | Q04 cards remain the same default `Card` surface used by neighboring Component Lab proofs. The intermediate fixture-local tone and gradient experiment was removed; no mini design system was retained. Canonical Card shadow/depth behavior remains the owner of surface depth. |

The reusable intrinsic-measure system remains deferred to H01D as requested.

## Files changed for this work item

- `apps/playground/src/component-proofs.tsx`
  - bounded Q04 split props (`minStart` / `minEnd`);
  - no special Card tone or local visual variant remains.
- `apps/playground/src/app.css`
  - Q04 container ownership for narrow detail reflow;
  - restrained Q04 divider composition;
  - fixture-local intrinsic measure for short controls.
- `packages/ui/src/forms.tsx`
  - shared-track RangeSlider structure and range percentage calculations.
- `packages/ui/src/styles.css`
  - governed shared-track RangeSlider CSS;
  - intrinsic Transfer list rows;
  - canonical selected-state alpha correction;
  - governed z-index for the overlaid native range inputs.
- `tests/q04-core-layout-actions.spec.ts`
  - split bounds and resize regression;
  - intrinsic Transfer and short-control geometry regression;
  - Q04 Card surface consistency and non-opaque active-state regression;
  - shared-track/two-thumb range regression;
  - accepted section-navigation regression.
- `docs/aapm/T7-COMPONENT-LAB-CORE-PROOF-002-EVIDENCE.md`
  - this evidence record.

The worktree already contained extensive unrelated changes before this bounded
correction. Those changes were preserved and not normalized or mass-formatted.

## Before / after geometry

| Measurement | Before | After |
| --- | ---: | ---: |
| Split rail minimum contract | Fixture default did not declare useful Q04 bounds; default endpoint could collapse the detail rail. | `aria-valuemin=40`, `aria-valuemax=60`; at both keyboard endpoints each rail measured at least 140px in the 1024px proof and pane overflow was at most 1px. |
| Divider | 44px hit target read as a large filled stripe. | Same interaction hit target; Q04 visual background is transparent and the grip is narrower than the hit target. |
| Transfer option rows at 1440px | About 83px / 83px / 170px inside a 180px list. | 58px / 58px / 58px; intrinsic and top-aligned. |
| Transfer option rows at 1024px | About 83px / 83px / 170px inside a 180px list. | 74px / 74px / 74px because the copy wraps at the narrower measure. |
| Accent preview / Applied tags at 1440px | About 369px / 310px. | 272px / 295px, bounded by content and the available rail. |
| Accent preview / Applied tags at 1024px | Excessive fixed measure. | 257px / 257px, fluid within the form card. |
| Confidence range | Two separated visual tracks. | One base track, one selected segment, two aligned native thumbs at values 22 and 84. |

## RangeSlider semantics

The final Forms proof contains:

- one `.t7-range-slider-track`;
- one `.t7-range-slider-selection`;
- two `input[type="range"]` elements;
- accessible names `Confidence range minimum` and `Confidence range maximum`;
- initial values 22 and 84;
- aligned input top positions;
- keyboard verification from 22/84 to 23/83 using ArrowRight/ArrowLeft;
- pointer interaction verification on the shared visual track.

No second local range implementation was added. The canonical focus ring and
native input semantics remain intact.

## Responsive and reduced-motion matrix

Rendered Playwright fallback QA covered both Q04 target hashes at each viewport.
The Browser plugin was unavailable in this environment, so the required visual
inspection used the repository's Playwright setup plus local screenshots.

| Viewport | First frame | Settled Q04 / Forms | Transfer rows | Short controls | Overflow | Console |
| --- | --- | --- | --- | --- | --- | --- |
| 1440 × 900 | Target visible; critical opacity 1 | Visible | 58px | 272px / 295px | 0px | Clean |
| 1024 × 768 | Target visible; critical opacity 1 | Visible | 74px | 257px / 257px | 0px | Clean |
| 768 × 1024 | Target visible; critical opacity 1 | Visible | 58px | 272px / 295px | 0px | Clean |
| 390 × 844 | Target visible; critical opacity 1 | Visible; split recomposed for narrow layout | 58px | 272px / 295px | 0px | Clean |

With `prefers-reduced-motion: reduce`, Q04 remained visible immediately, the
heading opacity was 1, the Forms proof retained both range inputs, and document
overflow remained 0px at all four sizes. The correction does not add an
animation runtime or an entry-state dependency.

## Accessibility and interaction

- Split workspace retains the canonical separator role, accessible label,
  pointer drag, and keyboard resizing. Home and End remain bounded to 40 and
  60.
- Transfer retains `Available` and `Selected` listbox names, option state, and
  Add / Remove actions. Keyboard selection behavior was exercised.
- Range retains two accessible sliders, values 22 and 84, aligned thumbs,
  shared visual track, focus treatment, and keyboard operability.
- The accepted Component Lab section navigation remains visible and bounded on
  desktop and mobile regression coverage.

## Tests and checks

### PASS

- `pnpm exec playwright test tests/q04-core-layout-actions.spec.ts tests/component-lab-section-navigation.spec.ts`
  - **8 passed**.
- `pnpm typecheck`
  - **PASS**.
- `pnpm build`
  - **PASS**. Vite emitted the existing large-chunk advisory only.
- `pnpm test:token-governance`
  - **PASS** after replacing the new raw RangeSlider z-index values with
    governed tokens.
- `git diff --check -- apps/playground/src/app.css
  apps/playground/src/component-proofs.tsx packages/ui/src/forms.tsx
  packages/ui/src/styles.css tests/q04-core-layout-actions.spec.ts`
  - **PASS**.

### Baseline debt / non-blocking

- `pnpm test`
  - The repository-wide chain passed through contracts, responsive contracts,
    SaaS, Farm, native mobile, ERP, DTCG, semantic contrast, and token
    governance. It stopped at `test:component-coverage` because the generated
    report is stale in the pre-existing dirty worktree: current source reports
    976 literal-pixel occurrences while the already-modified report records
    962. HEAD itself is 911. The report was not overwritten because that would
    mutate unrelated pre-existing work outside this bounded queue.
- `pnpm format:check`
  - **FAIL / baseline debt**: Prettier reported 355 files in the existing dirty
    worktree, including broad unrelated source, documentation, generated files,
    and Playwright artifacts. No repository-wide formatting was applied.

These repository-wide baseline conditions do not invalidate the bounded Q04
browser suite, typecheck, build, token governance, or geometry contracts.

## Browser evidence

Final screenshots are stored outside the repository to avoid adding generated
binary artifacts to the worktree:

- `C:\Users\user\.codex\visualizations\2026\09\12\01a0943c-2d31-7940-8681-dcd1ebde7cd1\q04-r1-final-target-desktop-1440x900.png`
- `C:\Users\user\.codex\visualizations\2026\09\12\01a0943c-2d31-7940-8681-dcd1ebde7cd1\q04-r1-final-target-laptop-1024x768.png`
- `C:\Users\user\.codex\visualizations\2026\09\12\01a0943c-2d31-7940-8681-dcd1ebde7cd1\q04-r1-final-target-tablet-768x1024.png`
- `C:\Users\user\.codex\visualizations\2026\09\12\01a0943c-2d31-7940-8681-dcd1ebde7cd1\q04-r1-final-target-mobile-390x844.png`
- `C:\Users\user\.codex\visualizations\2026\09\12\01a0943c-2d31-7940-8681-dcd1ebde7cd1\q04-r1-final-forms-desktop-1440x900.png`
- `C:\Users\user\.codex\visualizations\2026\09\12\01a0943c-2d31-7940-8681-dcd1ebde7cd1\q04-r1-final-forms-laptop-1024x768.png`
- `C:\Users\user\.codex\visualizations\2026\09\12\01a0943c-2d31-7940-8681-dcd1ebde7cd1\q04-r1-final-forms-tablet-768x1024.png`
- `C:\Users\user\.codex\visualizations\2026\09\12\01a0943c-2d31-7940-8681-dcd1ebde7cd1\q04-r1-final-forms-mobile-390x844.png`

## Deferred to H01D

- reusable intrinsic measure roles and their catalog/contract representation;
- a broader SplitPane policy for content-aware pixel minimums across arbitrary
  consumers;
- any global redesign of Component Lab surfaces or Q10 workflow proofs.

## Gate

PASS
