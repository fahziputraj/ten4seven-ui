# Token completeness

Date: 2026-08-27

| Domain      | Runtime authority                                                 | Consumer rule                                                         | Status   |
| ----------- | ----------------------------------------------------------------- | --------------------------------------------------------------------- | -------- |
| Appearance  | semantic foreground, background, surface, border, scrim           | components use semantic HSL variables                                 | complete |
| Palette     | 11 curated palette profiles                                       | palette changes brand/interactive accents, not status meaning         | complete |
| Status      | success, warning, danger, info                                    | independent of active palette                                         | complete |
| Interaction | primary hover/active, selected/selected-hover, interactive border | shared across controls and selectable rows                            | complete |
| Radius      | control, indicator, card, shell                                   | role-based geometry                                                   | complete |
| Density     | control, row, menu, card padding, section/control gaps            | changes rhythm without shrinking typography                           | complete |
| Typography  | Inter Variable `wght` + `opsz`, semantic roles                    | optical sizing enabled globally                                       | complete |
| Elevation   | button, surface, raised, modal                                    | overlays rise by semantic role                                        | complete |
| Motion      | fast/standard durations, enter/exit easing                        | shared popup grammar; reduced motion disables nonessential transition | complete |
| Layering    | dropdown, overlay, toast                                          | explicit z-index roles                                                | complete |

The Tokens route renders the active profile, semantic colors, radius, density, chart palette, motion, elevation/layering, control geometry, and typography roles. The consistency validator rejects new raw color, shadow, arbitrary radius, and unregistered icon usage in canonical UI source.
