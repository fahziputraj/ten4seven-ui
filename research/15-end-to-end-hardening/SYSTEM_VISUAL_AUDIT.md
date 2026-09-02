# System Visual Audit

Status: **PASS — no unresolved P0/P1 visual or interaction coherence issue found**
Verified: 2026-09-01

## Cross-system findings

The system uses a calm light canvas, restrained surface separation, semantic
green/blue action roles, and a compact navigation shell. The audit focused on
whether that language remained coherent when the content shifted from internal
tooling to public browsing and operational work.

| Audit axis            | Result | Evidence / remediation                                                                                                                                                                                                              |
| --------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page hierarchy        | PASS   | All primary routes expose one visible H1 and a distinct content task. Page-title/action alignment was checked across library, reference, and public shells.                                                                         |
| Typography            | PASS   | Local DM Sans, Source Serif 4, and IBM Plex Mono assets resolve the selectable type personalities without a network font dependency. Theme Studio typography choices are now visible button cards, not an opaque dropdown.          |
| Rhythm and spacing    | PASS   | Public and publishing header-to-content space was retained; Theme Studio narrows to one control column before labels collide; compact data pages preserve intended density.                                                         |
| Alignment             | PASS   | Profile rows, status chips, milestone rings, tables, input icons, nav controls, and overlay anchors were checked. Health chips are centered in their cells; no patch was applied where line-aligned domain labels were intentional. |
| Surface hierarchy     | PASS   | Static cards do not imply clickability through a global lift. Actual Card actions now expose a token-led visible focus state and keyboard semantics.                                                                                |
| Color semantics       | PASS   | Base palette, main action, accent/focus, canvas, and chart colorway remain independent named semantic roles. The raw-hex override experiment was removed because it violated the ThemeProfile contract.                             |
| Public art direction  | PASS   | Public Showcase retains its distinct editorial hero/composition; Ebook Store retains browseable catalog density instead of inheriting an operations layout.                                                                         |
| Operational usability | PASS   | Operations retains KPI, milestone, filters, and table hierarchy. On mobile it exposes one product identity and keeps data-table horizontal scrolling local to the table.                                                            |

## Route evidence matrix

| Surface                     | Desktop / laptop                                                      | Tablet                                             | Mobile / narrow                                                                                 | Result |
| --------------------------- | --------------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------ |
| Theme Studio                | Profile state, semantic preview, control hierarchy, profile alignment | Long role labels and two-column geometry           | One control column, 40px icon-only catalog search target, exact slider values, no root overflow | PASS   |
| Tokens                      | Role glossary, semantic color cards, profile summary                  | Two-column role summary                            | Readable stacked semantic-role content                                                          | PASS   |
| Components / details        | Catalog hierarchy, list density, detail routing                       | Catalog navigation hierarchy                       | Named floating surfaces, roving menu keyboard behavior, and focus return are visible            | PASS   |
| Icons                       | Tile rhythm, intent filters, semantic labels                          | Tile grid remains aligned                          | Readable labels and no page overflow                                                            | PASS   |
| Recipes / Blocks / details  | Contract browsing and preview composition                             | Responsive catalog flow                            | No forced root scroll; route integrity tests resolve canonical pages                            | PASS   |
| Component Lab               | Form/overlay/chart proof balance                                      | Bounded stress fixtures                            | Command, form-listbox, and nested-overlay keyboard contracts render and dismiss correctly       | PASS   |
| Operations Tracker          | KPI/milestone/filter/table balance                                    | Milestone and toolbar stability                    | No duplicate identity; milestone text clears progress borders; table owns horizontal scroll     | PASS   |
| Warehouse / Inventory       | Operational family shell and data density                             | Responsive surface parity                          | Root overflow clear                                                                             | PASS   |
| Ebook Store                 | Catalog/browse hierarchy and cart behavior                            | Intermediate toolbar turns compact before clipping | 44px public nav items; filter/control layout remains inside viewport                            | PASS   |
| Public Showcase             | Hero, section map, CTA balance                                        | Public composition remains art-directed            | Wrapped navigation keeps 44px targets; carousel affordance remains compact but touch-safe       | PASS   |
| Brand authentication proofs | Profile character differs without anatomy change                      | Form rhythm remains bounded                        | Forms, navigation, and responsive geometry remain canonical                                     | PASS   |

## Issues found and resolved

| Severity | Issue                                                                                                     | Root owner                      | Result                                                                                                       |
| -------- | --------------------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| P1       | Theme Studio control labels/cards could collide at 480px.                                                 | Consumer layout                 | Single-column switch before collision.                                                                       |
| P1       | Ebook toolbar could expose root-level horizontal clipping around 840px.                                   | Consumer layout                 | Compact breakpoint moved to 880px.                                                                           |
| P1       | Mobile Operations displayed two product identities.                                                       | Consumer layout                 | Redundant topbar is hidden below 860px; primary navigation remains.                                          |
| P1       | Static cards advertised motion/click affordance they did not own.                                         | Canonical component             | `Card` interaction is explicit.                                                                              |
| P2       | Backdrop geometry could be one pixel wider than a narrow viewport.                                        | Canonical overlay primitive     | Backdrop uses `width: 100%`.                                                                                 |
| P2       | Small sliders, filter removal controls, and carousel dots were below a comfortable compact touch target.  | Canonical controls              | Hit geometry expanded while visual marks remain compact.                                                     |
| P2       | Theme profile label/value grid could truncate `Chart colorway`.                                           | Consumer layout                 | Semantic profile column gap corrected.                                                                       |
| P0       | Command search exposed listbox roles without an active option, keyboard traversal, or keyboard selection. | Canonical `CommandMenu`         | Added an active-descendant model, Arrow/Home/End/Enter support, selected state, and focused input ownership. |
| P1       | Actual Card/DataTable actions were pointer-only and could re-trigger from nested controls.                | Canonical `Card` / `DataTable`  | Added focusable semantic actions, Enter/Space behavior, visible focus, and nested-interaction guards.        |
| P1       | An unlabelled custom Select trigger could drop a caller-provided accessible name.                         | Canonical `Select`              | Kept one authoritative trigger name through caller `aria-label` or `aria-labelledby`.                        |
| P1       | Combobox/MultiSelect and floating menus had incomplete Escape/outside-dismiss/focus behavior.             | Canonical form/overlay families | Centralized dismissal, roving focus, typeahead, explicit popover labelling, and inner-Escape containment.    |
| P2       | Theme Studio's icon-only mobile search target was 32×32px.                                                | Theme Studio consumer layout    | Minimum geometry is now `max(40px, --t7-control-height)` and has an exact 360px regression check.            |

## No-change decisions

- Operations health chips were already vertically centered relative to their
  cells. Domain/type chips intentionally follow their record title rather than
  the full cell center, so no artificial centering override was introduced.
- Component Lab's existing overlay-stress and data/navigation sections are QA
  fixtures, not product cards. They were kept structurally neutral; no cosmetic
  redesign was applied.
- The Vite chunk-size advisory is unrelated to visible runtime degradation and
  remains outside this hardening gate.
- The new keyboard and accessibility corrections do not alter a default
  screenshot state. They were rendered and behavior-tested without refreshing
  visual baselines; see `VISUAL_CHANGE_LEDGER.md`.
