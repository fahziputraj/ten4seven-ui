# Calibration Decisions — Final Aesthetic Pass

## Decision boundary

This pass treats the Universal v2 architecture, token model, provider runtime,
and canonical component contracts as settled. Decisions below are deliberately
local to the five reviewed routes. No new primitive family, provider, motion
runtime, or branding abstraction was introduced.

## Decisions by surface

| Surface                          | Decision                                                                                                                                                                                                     | Why this is the smallest defensible change                                                                                                                                                                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Theme Studio recipe choices      | Add one concise intent line per curated recipe, retain compact two-column/one-column geometry, and add `aria-describedby`, explicit `aria-label`, and a selected check indicator.                            | The previous labels were clean but could scan as a legend. Intent copy and a multi-channel selected state improve affordance without returning to large cards or adding thumbnails.                                                                                                         |
| Theme Studio Shape authoring     | Keep Shape inside Advanced Theme Authoring, open that disclosure by default, and restore canonical Sharp/Soft/Rounded presets, exact `Base radius` (`0–24 px`), derived geometry, and recipe-authored reset. | The radius engine and recipe defaults were already correct; the defect was that a collapsed disclosure hid every authoring affordance from the initial accessibility tree. This restores discoverability without moving Shape into Runtime Preferences or creating a second control system. |
| Theme Studio Custom              | Keep `Custom` in its own subordinate row and preserve the existing undefined/default compatibility behavior.                                                                                                 | The primary path remains a professionally authored recipe; changing the default would alter legacy behavior without a demonstrated defect.                                                                                                                                                  |
| Theme Studio live preview        | Keep the existing product proof and move primary/accent/density/chart metadata into a closed native `Semantic diagnostics` disclosure.                                                                       | The product output now owns the visual read while useful developer evidence remains available on demand. Native `details` avoids another overlay or parallel inspector component.                                                                                                           |
| Theme Studio product copy        | Replace the token-demonstrator sentence with a compact customer-work sentence covering actions, status, form, data, and scope.                                                                               | The preview should feel like a product surface first; the copy now describes the fictional workflow rather than explaining implementation mechanics.                                                                                                                                        |
| Operations Tracker rings         | Override the route-local ring track/value stroke to three pixels and give the selected node primary foreground emphasis.                                                                                     | The existing 60/52-pixel nodes were semantically correct but visually read as five donut charts. A thinner ring preserves numeric completion and click targets while returning emphasis to the stage labels and detail panel.                                                               |
| Operations Tracker fixture label | Replace `Illustrative fixture flow` with `5-stage workflow`.                                                                                                                                                 | The route is a production-looking reference surface; the workflow is still deterministic, but its first read should not expose internal fixture framing.                                                                                                                                    |
| Ebook Store                      | No broad layout change. Keep the category rail/drawer, search/sort/grid controls, and cover-led cards.                                                                                                       | Current desktop and mobile geometry was bounded and visually coherent; changing it would spend risk without a visible defect.                                                                                                                                                               |
| Public Showcase copy             | Remove local fixture wording from the legal line and chart label/summary while keeping the content truthful.                                                                                                 | Consumer mode should not expose local proof/debug framing. The chart still communicates coverage signals without claiming production telemetry.                                                                                                                                             |
| Public Showcase identity         | Preserve the neutral tonal hero, asymmetric primary edge, four-tile mark, inset preview, and authored section rhythm.                                                                                        | These signatures keep the route recognizable under blue/indigo, editorial, commerce, and neutral contexts without relying on a green rectangle or creating a separate branding system.                                                                                                      |
| Component Lab                    | No additional textarea/range/calendar redesign.                                                                                                                                                              | The current Notes height remains realistic, both sliders are visible and usable, and the canonical date popover is bounded at mobile widths.                                                                                                                                                |

## Token and component discipline

- All new colors, borders, radii, typography, and spacing use the existing
  semantic `--t7-*` variables.
- The recipe controls use the canonical `Button`; no local button primitive was
  created.
- The diagnostics surface uses native `details`/`summary`; no custom overlay
  or second inspector system was added.
- Shape uses the canonical `Button` and `Slider` contracts, the existing
  `radiusProfiles`/`radiusValueRange`/`buildRadiusProfile` helpers, and the
  provider-root radius variables; no local radius primitive or parallel runtime
  preference was introduced.
- Operations uses the canonical `MilestoneTracker` and only a route-local
  visual calibration override. Numeric completion, semantic state, focus, and
  click targets remain owned by the canonical component.
- Existing business logic, route navigation, persisted theme preferences,
  provider metadata, and QA-mode boundaries are preserved.

## Explicit non-decisions

The following were inspected but intentionally left unchanged:

- No change to the default `Custom` recipe state, because it remains a
  compatibility path and the curated options now have stronger affordance.
- No sticky-preview rewrite; the existing desktop sticky rail was safe in the
  tested width range and becomes static at the tablet breakpoint.
- No move of Shape into Runtime Preferences; Appearance, Density, Contrast, and
  Motion remain the runtime-only controls.
- No new gradients, blobs, glow, neon borders, oversized rounded hero, or
  decorative thumbnails.
- No publishing-store redesign and no convergence of Operations, Publishing,
  Component Lab, Theme Studio, and Public Showcase into one visual domain.
- No commit, push, deploy, or publication; the work remains in the user's
  existing dirty worktree for explicit handoff.

## Outcome

The pass is accepted as a bounded visual-grammar calibration: clearer recipe
choice, restored discoverable Shape authoring, product-first preview, demoted
diagnostics, quieter workflow rings, and consumer-clean copy, with the existing
system architecture and domain expression intact.
