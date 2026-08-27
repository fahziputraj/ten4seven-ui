# Documentation IA audit

## Decision

The workbench has one primary documentation surface for component discovery:
`/components`. The sidebar exposes only the component family level. Individual
component contracts remain deep-linkable through catalog search, family rows,
recipe references, and direct URLs.

## Navigation contract

- Studio: Theme Studio and Component Lab.
- Library: Tokens, Components, Icons, and Recipes.
- References: Warehouse Inventory and Publishing Store.
- Components expands to 17 family anchors with canonical counts; it does not
  render component leaves.
- `/components/<component-slug>` remains the full contract detail route.
- `/components#component-family-<category>` is the deterministic family anchor
  format used by the sidebar and catalog document.

## Catalog document

The Components index is a naturally scrolling document ordered as foundations,
actions, forms, navigation, layout, surfaces, data, tables, filtering, overlays,
feedback, date-time, files, charts, media, commerce, and patterns. Each family
has a stable heading ID, an anchor index, a scrollspy state, and canonical rows
that open the existing detail route.

Detail routes retain a right-side `On this page` navigation for preview, usage,
API, accessibility, critical states, and responsive/motion guidance.

## Route and scroll behavior

The app parses pathname and hash separately. Push and pop navigation restores a
hash target after the route has rendered; ordinary route changes restore the
document to the top. The shell keeps the browser document as the primary
workbench scroll owner while the sidebar and topbar remain sticky.
