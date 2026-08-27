# Scroll ownership model

## Owners

1. The workbench document owns page navigation and catalog scrolling.
2. `ScrollArea` is the explicit owner only for bounded content that needs an
   internal scroll region.
3. Floating content is fixed to the viewport and lives in `#t7-overlay-root`;
   it is never clipped by a card or scroll area.
4. Native modal and drawer dialogs lock body scrolling while their own body
   region remains scrollable.

The shell does not create a second nested document scroll container. Sticky
shell elements use `--t7-z-sticky`, and documentation anchors use
`--t7-doc-sticky-offset` so headings are not hidden behind the topbar.

## QA fixture

Component Lab includes ScrollArea → Combobox, Drawer → DatePicker, Card →
Select, nested Modal → Select + Tooltip, and edge-anchor popup cases. The
fixture is intentionally a contract stress surface rather than a new product
composition.
