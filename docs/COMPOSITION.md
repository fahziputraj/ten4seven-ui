# Composition

Composition is the product-level rhythm around the component system. It helps
the same canonical primitives feel appropriate in a dense operational shell,
a reading surface, or a storefront without creating recipe-local primitives.

## Contract

`ThemeComposition` in `packages/contracts/src/types.ts` contains four bounded
values:

| Field            | CSS variable           | Meaning                                     |
| ---------------- | ---------------------- | ------------------------------------------- |
| `contentMax`     | `--t7-content-max`     | Maximum width of the main route content.    |
| `readingMeasure` | `--t7-reading-measure` | Maximum readable text measure.              |
| `pageGutter`     | `--t7-page-gutter`     | Responsive outer content padding.           |
| `sectionGap`     | `--t7-composition-gap` | Recipe-level rhythm between larger regions. |

`AppShell` consumes the content maximum and page gutter in
`packages/ui/src/styles.css`; `PageHeader` consumes the readable measure. A
recipe may tune these values, but feature routes should not replace them with
unrelated shell widths unless the information architecture requires it.

## Use the shell grammar first

```text
AppShell -> [Sidebar | TopNavigation | NavigationMenu] -> PageHeader -> bounded route content
```

- Use `Sidebar` for private, information-dense application navigation.
- Use `PublicShell` and `NavigationMenu` for public, content, and commerce
  routes; use `TopNavigation` when flat links are enough.
- Use one route-level `PageHeader`; do not build another heading shell inside
  the route content.
- Keep cards, filters, forms, data tables, drawers, and grids inside the
  bounded content region.
- Relocate secondary navigation or filtering through `MobileSidebar` or
  `FilterDrawer` on narrow screens rather than cloning a mobile UI system.

The complete shell rule is also available in
[`docs/ai/SHELL_COMPOSITION.md`](ai/SHELL_COMPOSITION.md).

## Recipe composition guide

| Recipe       | Content width | Reading measure | Rhythm       | Use it for                                             |
| ------------ | ------------- | --------------- | ------------ | ------------------------------------------------------ |
| `enterprise` | 1440px        | 68ch            | balanced     | Tables, dashboards, queues, and operational panels.    |
| `product`    | 1320px        | 68ch            | balanced     | Product workspaces and decision flows.                 |
| `editorial`  | 1180px        | 70ch            | generous     | Reading, long-form content, and lower-chrome layouts.  |
| `commerce`   | 1360px        | 64ch            | approachable | Product grids, purchase paths, and helpful comparison. |

These values are starting points, not a rule that every child must fill the
maximum width. A form, prose column, or narrow empty state should still use
the width that gives the task a clear hierarchy.

## Layout decisions belong above primitives

Use composition to decide:

- density of information versus reading rhythm;
- grid, table, or stacked presentation;
- whitespace between major sections;
- action placement and the number of competing calls to action;
- media prominence and responsive rebalancing.

Do not encode those decisions as a `Button` variant, a custom `Card` family,
or a page-local token sheet. A local CSS rule is appropriate only for
exceptional layout or domain behavior after the theme and canonical component
contracts have been considered.

## Check a composed route

At desktop and narrow widths, verify that the route has one dominant title,
one obvious primary action, readable line length, no horizontal overflow, and
a deliberate mobile reflow. Check the default, empty, loading, error, and
selected/detail states for data-heavy routes; composition should survive all
of them, not only a polished fixture.
