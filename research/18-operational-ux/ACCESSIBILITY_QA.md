# Accessibility QA — Operational Patterns

Status: **PASS for the bounded smoke and interaction scope**  
Date: 2026-09-03

## Covered semantics

| Area                  | Evidence                                                              | Result |
| --------------------- | --------------------------------------------------------------------- | ------ |
| page/shell navigation | named buttons for five views; one route H1 per state                  | PASS   |
| buttons and actions   | explicit accessible names, including exception record triggers        | PASS   |
| tables                | named exception queue and vehicle manifest; row/cell labels preserved | PASS   |
| ordered route         | named list communicates stop order without requiring a map            | PASS   |
| progress/state        | visible numeric progress and text labels accompany color              | PASS   |
| receiving choice      | named `Disposition` radiogroup and radio options                      | PASS   |
| reason entry          | labelled `Decision reason` textbox                                    | PASS   |
| drawers/dialogs       | named dialogs, Escape dismissal, trigger focus restoration            | PASS   |
| theme preferences     | canonical provider state; reduced motion remains comprehensible       | PASS   |

## Axe evidence

The focused suite injects `axe-core` and audits Control Tower, Receiving, and
Entity 360. No `critical` or `serious` violation is accepted.

The first focused run exposed a real contrast defect on the danger status chip
(`4.13:1`). The correction was made at the semantic token owner:

- `--t7-danger-badge-foreground-hsl` now resolves independently for light and
  dark modes;
- canonical badge CSS consumes that role;
- token unit tests lock both values;
- the global semantic contrast verifier now reports a lowest enterprise-light
  danger foreground ratio of `4.80:1` across 64 recipe/mode pairs.

After rebuilding the packaged CSS used by the playground, the focused axe test
passed.

## Keyboard and focus evidence

- Exception detail drawer opens from `Open EX-260903-07`, closes with Escape,
  and restores focus to that trigger.
- Entity decision drawer opens from `Review decision`, closes with Escape, and
  restores focus.
- Receiving disposition can be selected from the keyboard and its decision
  reason/action complete without pointer-only behavior.
- Existing full-suite overlay tests continue to cover menu roving focus,
  typeahead, nested Escape, native modal/drawer scroll ownership, listbox
  dismissal, and focus return.

## Honest boundary

This is a bounded design-system/reference audit, not a WCAG conformance claim
for Farm. It does not verify screen-reader announcements in every engine,
localized copy, large text/zoom, voice input, high-contrast OS modes beyond the
Ten4Seven preference, or production data errors. Those remain consumer route
responsibilities.
