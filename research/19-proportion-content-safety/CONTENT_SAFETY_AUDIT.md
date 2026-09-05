# Content safety audit

Date: 2026-09-03. Scope: the existing Universal v2 implementation, canonical
owners and permanent Component Lab stress fixture. No product architecture,
font/icon replacement, donor import, or new token runtime is authorized.

## Findings and correction owners

| Finding                                                                                | Evidence classification                                                                             | Canonical correction                                                                                                                                          |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Existing page gutters, content max, reading measure and density geometry already exist | SOURCE: token runtime, authored recipe composition, AppShell and workbench CSS                      | Preserve authored values; add bounded semantic role aliases and replace equivalent mobile gutter/data-rail literals.                                          |
| Button label lacks an explicit bounded overflow policy                                 | SOURCE: prior Button span and nowrap rule                                                           | Named label slot, min-width 0, bounded ellipsis, fixed icon/spinner slots; optional `wrap` for an intentional long CTA.                                       |
| NavItem can wrap and has no explicit canonical keyboard-focus treatment                | SOURCE + RUNTIME: new stress matrix                                                                 | Ellipsis label slot, fixed navigation icon, internal focus outline.                                                                                           |
| Card title/description and overlay header can surrender room to unbroken content       | SOURCE                                                                                              | Natural anywhere wrap for identifiers; non-shrinking bounded action; shape-aware inset floors.                                                                |
| ActivityFeed unbroken ID escapes its otherwise correctly bounded grid                  | RUNTIME: tablet/mobile stress produced document overflow                                            | `overflow-wrap: anywhere` on the canonical content slot, retaining existing grid/min-width.                                                                   |
| Table cells have no block clearance for tall content or declared overflow policy       | SOURCE                                                                                              | Minimum block padding; optional per-column policy; numeric tabular alignment, required/sticky or stacked actions.                                             |
| Error text fails contrast on the light canvas                                          | RUNTIME: axe color-contrast in long-error fixture                                                   | A semantic danger-text role shared with the existing safe danger-chip colors; field hint/error selectors consume it. No primary/danger action color redesign. |
| Initial field-icon patch used a nonexistent spacing alias                              | REGRESSION: manual review of new control captures showed text at the left border and icon collision | Correct `--t7-ref-space-2`; add explicit input text-inset versus icon-edge assertion. Never accept these captures as final evidence.                          |
| Initial zoom assertion compared CSS height to scaled pixels                            | TEST HARNESS: badge remained one line but its bounding box scaled                                   | Compare intrinsic `offsetHeight`, preserving the actual single-line requirement.                                                                              |

## Canonical inspection matrix

SOURCE inspection is not a blanket assertion that every possible content/state
combination has been rendered. RUNTIME evidence is the new representative
stress matrix plus existing component, overlay, accessibility and adoption
suites in the final gate.

| Family inspected                                                  | Safe-area / overflow contract                                                                                           | Verification route                                                               |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Button, IconButton, ToggleButton/Group                            | Bounded controls, explicit icon/name slots, stable layout box; long CTA wrapping opt-in                                 | Stress SM/MD/LG, loading/disabled/selected, existing Component Lab               |
| Input, Textarea, Select, Combobox, MultiSelect                    | Native editable value scroll; label/helper/error wrap; trigger ellipsis and protected chevron/action                    | Stress form and existing form/overlay tests                                      |
| Checkbox, Radio, Switch, Slider, RangeSlider                      | Fixed visual affordance with flexible copy; state painting does not add layout border; sliders stay in their owned rail | Source forms + existing Component Lab interaction/accessibility                  |
| Card, Badge, StatusChip                                           | Shape-safe header/body/footer insets; title wraps; badge is a secondary bounded single line                             | Stress short/long, light/dark, custom exact/dense                                |
| Tabs, Accordion, Pagination, Sidebar, Breadcrumb                  | Owned navigation overflow, content/indicator separation, existing responsive composition; breadcrumb wraps              | Source navigation + existing keyboard/reference tests; stress NavItem/Breadcrumb |
| Table, DataTable                                                  | Scroll or stacked owner, minimum cell inset, explicit column policy, numeric alignment and reachable actions            | Large ID/currency/percent fixture + existing table tests                         |
| DropdownMenu, Popover, Tooltip, Modal, Drawer, CommandMenu, Toast | Viewport-constrained surfaces; wrap or bounded label; non-shrinking dismiss/shortcut slots; owner handles portal/focus  | Stress menu/modal/drawer + existing overlay stress and notification proofs       |
| Calendar, DatePicker, DateRangePicker, TimePicker                 | Component-owned overlay bounds, date/time input/action slots, keyboard/focus handling                                   | Stress default date/time + existing nested and viewport tests                    |
| FileUpload/FileList                                               | Flexible bounded copy, item action ownership and existing mobile recomposition                                          | Source files + Component Lab/file proofs                                         |
| Charts, MetricCard, ActivityFeed                                  | Owned SVG/viewBox/legend geometry; consumer numeric formatting; activity copy wraps                                     | Existing chart/motion/reference suite; long ActivityFeed fixture                 |

No root `overflow: hidden` workaround was added. No arbitrary rich child is
guaranteed safe inside a text-only clipped slot; the guide explicitly assigns
detail disclosure and business numeric formatting to the consumer.

Final status and exact commands: [PROPORTION_SAFETY_GATE.md](PROPORTION_SAFETY_GATE.md).
