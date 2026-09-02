# Hardening Gap Ledger

Status: **No open P0 or P1 issue**  
Verified: 2026-09-01

## Resolved work

| ID   | Severity | Finding                                                                                              | Ownership                      | Result                                                                                                                            |
| ---- | -------- | ---------------------------------------------------------------------------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| H-01 | P1       | Theme Studio grid could become ambiguous/crowded at narrow width.                                    | Consumer layout                | Resolved by the single-column breakpoint and dedicated semantic card controls.                                                    |
| H-02 | P1       | Ebook toolbar could clip around the intermediate breakpoint.                                         | Consumer layout                | Resolved by the 880px compact-layout breakpoint.                                                                                  |
| H-03 | P1       | Operations mobile shell repeated product identity.                                                   | Consumer layout                | Resolved by hiding redundant topbar identity below 860px.                                                                         |
| H-04 | P1       | Static card hover communicated a false affordance.                                                   | Canonical `Card`               | Resolved by explicit interaction ownership.                                                                                       |
| H-05 | P2       | Nested App Shell fixture produced duplicate main landmarks.                                          | Canonical `AppShell`           | Resolved with `contentAs`.                                                                                                        |
| H-06 | P2       | Backdrops could exceed a narrow viewport by one pixel.                                               | Canonical Modal/Drawer         | Resolved with contained width.                                                                                                    |
| H-07 | P2       | Range, removable chip, and carousel controls were too physically small.                              | Canonical controls             | Resolved with compact visual / safe hit-area separation.                                                                          |
| H-08 | P2       | Theme Studio test suite still described old Select-based control anatomy.                            | Test contract                  | Resolved with button-card and Select-specific behavioral tests.                                                                   |
| H-09 | P2       | Theme profile column could truncate a semantic role label.                                           | Theme Studio layout            | Resolved through profile-grid gap alignment.                                                                                      |
| H-10 | P2       | Public/Ebook header actions stayed below a comfortable mobile touch height.                          | Public-shell consumer layout   | Resolved with a 40px minimum header-action target while menu items remain 44px.                                                   |
| H-11 | P0       | Command Menu exposed options without a complete active-descendant keyboard model.                    | Canonical `CommandMenu`        | Resolved with named combobox/listbox semantics, active option state, Arrow/Home/End, Enter, and mouse synchronization.            |
| H-12 | P1       | Interactive Card and desktop DataTable rows were pointer-only; nested actions could leak to the row. | Canonical `Card` / `DataTable` | Resolved with semantic focus/Enter/Space behavior, visible focus, and nested-interaction guards in both desktop and stacked rows. |
| H-13 | P1       | Custom Select could lose a caller-provided accessible name when no visual label was supplied.        | Canonical `Select`             | Resolved by forwarding `aria-label` or `aria-labelledby` to the authoritative trigger only.                                       |
| H-14 | P1       | Combobox/MultiSelect dismissed inconsistently and overwrote caller focus/blur/key handlers.          | Canonical form controls        | Resolved with composed handlers, pointer-outside/Escape dismissal, named/`aria-busy` listboxes, and focus return.                 |
| H-15 | P1       | Dropdown, Context Menu, and Popover lacked complete keyboard/focus/dismiss contracts.                | Canonical overlay controls     | Resolved with roving menu focus, arrows/Home/End/typeahead, named Popover dialog, and inner-Escape containment.                   |
| H-16 | P2       | Theme Studio's icon-only mobile search trigger measured 32×32px.                                     | Theme Studio consumer layout   | Resolved with a `max(40px, --t7-control-height)` touch floor and exact 360px regression coverage.                                 |

## Bounded residual work

| ID   | Severity | Gap                                                                                                    | Why it is not a release blocker                                                                                              | Recommended future boundary                                                                                                |
| ---- | -------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| R-01 | P2       | Full narrated screen-reader study across every canonical contract has not been performed.              | Current landmark, label, keyboard, focus, overlay, axe, and interaction evidence is green; no known defect remains.          | Accessibility validation slice with NVDA/VoiceOver scripts, prioritizing Card action and composite listbox/menu narration. |
| R-02 | P2       | A human review of every state for all 139 canonical contracts is not exhaustive.                       | Representative default/hover/focus/disabled/selected/error/mobile/reduced-motion states are covered across primary families. | State-matrix expansion, without changing primitives.                                                                       |
| R-03 | P2       | Broad localization and 100+ row content stress has not been performed against every reference fixture. | Long labels, narrow surfaces, table scroll ownership, and catalog content are covered; no active overflow was found.         | Dedicated content-resilience corpus.                                                                                       |
| R-04 | P2       | Final cross-browser visual parity is not part of the current Chromium evidence.                        | Browser contracts and platform-native input behavior are stable in the supported CI path.                                    | Firefox/WebKit visual parity gate.                                                                                         |
| R-05 | P3       | Vite's existing bundle chunk advisory remains.                                                         | It has no demonstrated UI/runtime regression and was expressly out of scope.                                                 | Separate performance/bundle slice.                                                                                         |

## Explicitly not remediated here

```text
FRESH_AGENT_CONTEXT: NOT VERIFIED
Independent Adoption Benchmark: CONDITIONAL PASS retained
Registry publication: future distribution gate
BrandProfile expansion: out of scope
Recipe migration: out of scope
```
