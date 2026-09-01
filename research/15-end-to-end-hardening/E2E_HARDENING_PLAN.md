# End-to-End Hardening Plan

Status: **COMPLETED — bounded final quality pass**  
Verified: 2026-09-01

## Objective

Harden the implemented ten4seven UI system without changing its product model,
AI-native contract plane, recipe resolver, BrandProfile architecture, core/node
agent boundary, or canonical primitive ownership.

The success condition is not a visual redesign. It is a system in which the
existing surfaces render coherently, remain legible and usable at realistic
widths, preserve semantic behavior, and make the intended component ownership
clear.

## Deliberate non-goals

- No new generic primitive or parallel component family.
- No recipe migration, BrandProfile expansion, bundle-chunk optimization,
  package publication, deployment, commit, push, or destructive reset.
- No arbitrary page-local colors, radii, shadows, z-index values, or control
  heights.
- No changes to historical AI-native/adoption gates.

## Execution order

1. Inventory active routes, their primary task, and their owning layer.
2. Inspect rendered desktop, laptop, tablet, mobile, and narrow-mobile output.
3. Exercise interactive overlays and keyboard behavior on the live system.
4. Locate root ownership for each real defect before changing code.
5. Apply only canonical/token/consumer-layout remediation justified by the
   audit.
6. Reinspect changed routes at the rendered viewport.
7. Review visual-baseline differences one category at a time, then regenerate
   only accepted output.
8. Run the full browser and root validation gates.

## Ownership rules used

| Observation                                                | Correct owner                    | Result in this pass                                                     |
| ---------------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------- |
| A catalog preview created nested landmarks                 | `AppShell` component API         | Added the explicit `contentAs` escape hatch; preview uses `div`.        |
| Static demo cards lifted on hover                          | Canonical `Card` state contract  | Hover/elevation is now opt-in through `interactive` or `onClick`.       |
| Narrow native backdrops exceeded viewport width            | Modal/Drawer primitive geometry  | Backdrop width resolves to the containing viewport rather than `100vw`. |
| Range, chip, and carousel affordances were undersized      | Canonical controls               | Kept compact visuals while expanding physical hit geometry.             |
| Theme Studio controls collided at narrow width             | Theme Studio consumer layout     | Breaks to one column before collision.                                  |
| Ebook toolbar clipped at intermediate width                | Ebook consumer layout breakpoint | Compact catalog layout starts before its controls can overflow.         |
| Mobile Operations repeated the product identity            | Operations shell consumer layout | Preserves the sidebar identity and hides the redundant topbar identity. |
| Old tests modeled semantic button-card controls as selects | Test contract                    | Tests now verify the actual, accessible control model.                  |

## Review inventory

The pass covers all implemented route families:

| Surface            | Routes or state reviewed                                                         | Primary quality question                                        |
| ------------------ | -------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Theme workbench    | Theme Studio, Tokens                                                             | Can a human understand and safely tune semantic roles?          |
| Catalog            | Components, detail routes, Icons, Recipes, recipe details, Blocks, block details | Is documentation shallow, browseable, and semantically honest?  |
| QA infrastructure  | Component Lab                                                                    | Are stress proofs readable rather than decorative galleries?    |
| Operational        | Operations Tracker, Warehouse / Inventory                                        | Is dense task work prioritized, aligned, and mobile-safe?       |
| Content / commerce | Publishing / Ebook Store                                                         | Does browsing remain calm, readable, and unclipped?             |
| Public             | Public Showcase                                                                  | Is the public surface art-directed without losing navigability? |
| Brand proof        | Neutral and AAPM Academy Authentication proof routes                             | Do profiles create character without forking anatomy?           |

## Evidence strategy

- Live rendered geometry was inspected at 1440×900, 1186×698, 840×900,
  768×900, 390×844, and 360×800-equivalent CSS viewports.
- Root horizontal overflow was sampled across the active route matrix. A
  horizontally scrollable data table is accepted only when the table wrapper,
  not the page root, owns the scroll.
- Overlay behavior was exercised with Select, Combobox, edge menu, popover,
  Drawer, Modal, nested overlay, Escape, focus restore, and body scroll lock.
- The final 119-test Playwright suite provides deterministic route, interaction,
  accessibility, responsive, and visual-baseline evidence.

## Stop rule

After the gate in `GATE_END_TO_END_HARDENING.md`, stop. The remaining P2/P3
items in `HARDENING_GAP_LEDGER.md` are intentionally bounded rather than used
to expand the system in this run.
