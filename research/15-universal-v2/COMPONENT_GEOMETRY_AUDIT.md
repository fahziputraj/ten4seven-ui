# Component geometry audit

## Current semantic geometry

`packages/tokens/src/theme.ts` emits 19 density-aware geometry roles:

```text
--t7-control-height
--t7-row-height
--t7-menu-height
--t7-card-padding
--t7-section-gap
--t7-control-gap
--t7-control-padding-inline
--t7-control-padding-inline-small
--t7-control-padding-inline-large
--t7-field-padding-inline
--t7-field-gap
--t7-card-header-gap
--t7-card-content-gap
--t7-card-footer-padding-block
--t7-panel-padding
--t7-menu-padding-inline
--t7-menu-padding-block
--t7-overlay-padding
--t7-table-cell-padding-inline
```

`packages/tokens/src/theme-recipes.css` remaps all 19 for `comfortable`,
`default`, `compact`, and `dense`. This is a real global density mechanism,
not a visual-only data attribute.

## Canonical consumption samples

| Component area        | Evidence                               | Current semantic use                                                                              |
| --------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Buttons               | `.t7-button`                           | Control height, control gap, and normal/small/large inline-padding roles drive the button family. |
| Cards                 | `.t7-card-*`                           | Card padding, header/content gaps, and footer block padding drive the core card anatomy.          |
| Fields                | `.t7-field`, `.t7-input`, `.t7-select` | Field gap/padding and control height drive labelled fields and triggers.                          |
| Options and nav       | `.t7-select-list`, `.t7-option-row`    | Menu height plus menu block/inline padding drive the canonical option list.                       |
| Tables                | `.t7-table-*`                          | Row height, table-cell inline padding, and panel padding drive desktop and stacked table states.  |
| Drawers and modals    | `.t7-drawer-*`, `.t7-modal-*`          | Overlay padding, card-header gap, and footer block padding drive contextual overlays.             |
| Shell and page header | `.t7-page-content`, `.t7-page-header`  | Composition variables bound the content region; section gap separates route-level regions.        |

## Remaining raw geometry

The same stylesheet has many intentional and unclassified raw values. Current
examples include the option-list `max-height: 260px`, badge `min-height: 24px`
and `padding: 0 9px`, navigation `gap: 11px` and `padding: 0 12px`, and fixed
media or indicator dimensions. The generated component token coverage report
tracks 795 literal pixel measurements in total. Their presence means this
repository cannot yet claim that every canonical geometry decision participates
in density.

The audit does not prescribe a mechanical conversion. Values such as borders,
icons, indicators, intrinsic media, menu viewport caps, or an accessibility
floor may need to remain fixed. The question for each value is whether it
represents a reusable semantic role or an intrinsic implementation detail.

## Migration rule

1. Inventory a component's repeated geometry before adding a token.
2. Map a repeated shared meaning to a density-aware semantic role.
3. Preserve explicit accessibility minima and intrinsic media constraints.
4. Validate default, compact, comfortable, and dense at desktop and narrow
   widths.
5. Do not introduce page-local `--spacing-*` systems that duplicate the core.

## Current conclusion

The v2 foundation has enough semantic geometry to make core controls, menus,
rows, fields, cards, tables, overlays, sections, and content bounds visibly
respond to density. Full component-geometry hardening remains an open
validation and migration task, not a completed claim.
