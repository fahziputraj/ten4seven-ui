# Component Maturity Audit

Status: **PASS — canonical ownership preserved; no primitive fork introduced**  
Verified: 2026-09-01

## Decision

No new generic component was justified by the audit. Every issue found had an
existing, more appropriate owner: a token, canonical primitive, workbench
control model, or consumer composition. The pass therefore improves maturity
without increasing component count or creating a second design system.

## Canonical component results

| Family                       | Audit result                                                                             | Hardening outcome                                                                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `Card`                       | Static demo surfaces lifted on hover, implying an action where none existed.             | Added explicit `interactive` ownership. Cards lift only when interactive or `onClick` is present.                                          |
| `AppShell`                   | A catalog fixture nested a preview `main` landmark.                                      | Added `contentAs`; a preview can use a semantic `div` while production shells keep `main`.                                                 |
| `Select`                     | The component is healthy; the test fixture described a different control type as Select. | Kept canonical Select unchanged; interaction tests now use the actual select roles.                                                        |
| Theme Studio choice controls | Appearance/canvas/chart/typography needed visible comparison, not a long opaque menu.    | Maintained button-card/`aria-pressed` anatomy and aligned tests to it.                                                                     |
| `Slider` / `RangeSlider`     | Compact visual controls needed safer physical hit geometry.                              | Preserved canonical range semantics, expanded height/hit space, and kept the compact track treatment.                                      |
| Filter chip                  | Removal glyph was too small as a target.                                                 | Canonical removal button now has a 24×24px hit box.                                                                                        |
| Carousel controls            | A 22×4px visual indicator was its entire target.                                         | Visual line remains small; button owns a full control-height target and focus treatment.                                                   |
| Modal / Drawer               | Native dialog backdrop could resolve one pixel beyond a narrow viewport.                 | Canonical backdrops use the containing viewport width.                                                                                     |
| Navigation                   | Public/mobile wrapped controls and header actions could be too short.                    | Mobile public navigation items have a 44px minimum control height; visible Public/Ebook header actions have a 40px minimum control height. |
| Data table / status chip     | Dense operational layout was scrutinized for vertical alignment and scroll ownership.    | No forced rework: centered statuses and local table scrolling were already correct.                                                        |
| Overlay family               | Select, Combobox, menu, popover, DatePicker, Drawer, Modal, nested overlays              | No defect found in the final probe; shared portal/viewport ownership remains canonical.                                                    |

## State coverage observed

| State                         | Evidence                                                                                                             |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Default / hover / pressed     | Canonical action cursor-origin feedback; static cards intentionally have no lift.                                    |
| Focus-visible                 | Button, slider, carousel, Select, popover, and dialog interaction specs pass.                                        |
| Disabled / unavailable option | Select disabled-option behavior remains covered.                                                                     |
| Selected                      | `aria-pressed` Theme Studio cards, tab/accordion, filters, DataTable selection, and milestone selection are covered. |
| Error / helper                | Form proof displays labelled inputs, helper/error space, and typed entry contracts.                                  |
| Loading / feedback            | Existing Toast/loading/feedback component proof remains exercised.                                                   |
| Mobile / dense                | Component Lab, Operations, commerce, public nav, table scroll, and narrow overlay tests pass.                        |
| Reduced motion                | Motion token collapse test passes.                                                                                   |

## Availability / discovery audit

- Catalog, detail, recipe, and block routes resolve through the canonical
  contract inventory; no missing reusable capability was found that required a
  new primitive.
- Component Lab remains QA infrastructure, not a competing product gallery.
  Its proofs make overlays, data, navigation, feedback, and chart contracts
  discoverable without adding product-specific components.
- Theme Studio offers granular human workbench controls while agent-facing
  contracts remain profile-level (`ThemeProfile`, `radiusProfile`,
  `motionProfile`, `typographyProfile`, `BrandProfile`). No agent-facing
  anatomy was expanded by an exact human control.

## Remaining maturity boundary

The system has tested representative states across primary families, but a
manual state-by-state audit of all 139 canonical contracts is beyond this
bounded pass. The missing exhaustive matrix is recorded as P2 validation work,
not evidence of a present component defect.
