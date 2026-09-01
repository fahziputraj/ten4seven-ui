# Accessibility and Interaction Audit

Status: **PASS — no regression found in the audited semantic and interaction paths**  
Verified: 2026-09-01

## Semantic structure

| Check                | Result                                                                                                               |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Main landmark        | PASS — catalog preview no longer nests a second `main`; route audit found one primary main landmark.                 |
| Heading hierarchy    | PASS — primary routes expose one H1; token/card headings were corrected to avoid a page-level heading skip.          |
| Forms and labels     | PASS — canonical input/select labels remain present; Theme Studio uses fieldset/legend for choice groups.            |
| Tables               | PASS — canonical DataTable semantics, sort behavior, and localized table scrolling remain covered by existing tests. |
| Status and feedback  | PASS — status chips, toast/tooltip/menu fixtures, and selected-state signals retain semantic roles.                  |
| Decorative treatment | PASS — visual swatches and thumbnails are hidden from assistive naming where their paired label owns meaning.        |

## Keyboard and overlay behavior

| Interaction                   | Result | Evidence                                                                                                                                           |
| ----------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Custom Select                 | PASS   | Arrow navigation, Enter selection, Escape closure, disabled options, and popup anchoring are covered using the actual `Main action color` control. |
| Semantic button-card controls | PASS   | Appearance, canvas, chart colorway, and typography are tested as buttons with `aria-pressed`, not incorrectly as selects.                          |
| Combobox/menu/popover         | PASS   | Shared viewport layer, option check alignment, edge placement, and replacement behavior pass in Component Lab.                                     |
| Drawer/modal                  | PASS   | Escape, focus restore, body scroll lock, nested popup usability, and 360px geometry pass.                                                          |
| Mobile navigation             | PASS   | Touch-safe launcher opens a named design-system navigation dialog and closes after route navigation.                                               |
| Reduced motion                | PASS   | Motion duration resolves to reduced state and chart/reveal contracts do not require animation for comprehension.                                   |
| Pointer targets               | PASS   | Compact marks preserve at least usable physical targets for ranges, filter removal, public navigation, and carousel navigation.                    |

## Motion quality decision

Motion remains token-led and reduced-motion aware. The hardening pass did not
introduce more decorative motion. It removes misleading card lift on non-actions
and preserves cursor-origin action feedback only for interactive controls. This
keeps the system animated but quiet: motion communicates affordance, hierarchy,
or state change rather than acting as decoration.

## Automated accessibility evidence

- `public-interactions.spec.ts` reports no serious axe violation on the
  representative workbench surface.
- Full Playwright coverage exercises keyboard interaction, nested overlays,
  focus behavior, tabs, accordion, command menu, and feedback proof.

## Explicit residual boundary

Automated semantic/keyboard evidence is strong, but this hardening slice did
not perform a full manual screen-reader narration study across all 139 canonical
contracts or a complete localization corpus. This is logged as P2 validation
debt, not a known accessibility defect.
