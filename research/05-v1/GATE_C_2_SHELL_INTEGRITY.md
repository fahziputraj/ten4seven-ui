# Gate C.2 — shell integrity and product-reference refinement

## Decision

**PASS.** Gate C remains structurally passed; Gate C.2 is complete as a focused product-reference refinement. The accepted five-axis foundation, Inter Variable + `opsz`, semantic typography roles, local icon registry, token system, and package boundaries were preserved.

## What was verified

| Check                       | Actual result                                                                                                                                                                                                                                                                                                                      |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Deterministic direct routes | `/theme-studio`, `/tokens`, `/components`, `/icons`, `/recipes`, `/warehouse-inventory`, and `/ebook-store` each opened directly with the expected route title and H1. `/not-a-route` rendered the honest 404 surface.                                                                                                             |
| Refresh safety              | Theme Studio, Warehouse, and Ebook were opened directly, reloaded, then showed their expected H1 and title without console errors.                                                                                                                                                                                                 |
| Shell separation            | Studio/Library/References are grouped on system surfaces. The production-shaped Warehouse/Ebook shells contain no `Fixture connected` copy, product-level view-state selector, or direct cross-reference utility. The fixed Reference Harness remains outside route shell markup and owns the Warehouse fixture state.             |
| Warehouse entity-list       | `AppShell → Sidebar → PageHeader → KPICluster → FilterToolbar → DataTable → Pagination → BulkActionBar → DetailDrawer` remains intact. Row selection, bulk bar, detail drawer, loading fixture, ready reset, Escape closure, and focus return were exercised.                                                                      |
| Ebook catalog               | The page uses `ProductGrid`, `ProductCard`, `Price`, `Rating`, local editorial SVG covers, browse-oriented categories, primary search, compact sort/view controls, secondary filters, action-driven feedback, and no initial cart/status notice. Desktop showed a bounded five-card row; mobile remains a two-column content grid. |
| Native overlays             | `Modal`, `DetailDrawer`, `AlertDialog`, and `CommandMenu` use the native-dialog lifecycle. Escape closes modal/drawer/menu and restores trigger focus. Command Menu now moves initial focus to its search input.                                                                                                                   |
| Global axes                 | Theme Studio changed `light/emerald/soft/default/modern` to `dark/blue/rounded/compact/humanist`; provider attributes updated together, the typography specimen remained present, and no document overflow occurred.                                                                                                               |
| Mobile shell correction     | A Studio-only mobile `NavItem` rule had leaked into Warehouse. It is now scoped to `.studio-sidebar`; ungrouped Sidebar items form a horizontal scroll rail at narrow widths instead of a tall unlabeled vertical stack.                                                                                                           |

## Render evidence

All captures are first-viewport renders from the direct deterministic URLs, recaptured after neutralizing the local editorial cover lettering, normalizing inventory bulk-selection copy, and retaining the mobile shell correction. `scrollWidth === clientWidth` for each document.

| Route     | Desktop `1440 × 900` | Mobile `390 × 844` | Mobile `360 × 800` |
| --------- | -------------------- | ------------------ | ------------------ |
| Warehouse | `1425 / 1425`        | `375 / 375`        | `345 / 345`        |
| Ebook     | `1425 / 1425`        | `375 / 375`        | `345 / 345`        |

Artifacts:

- `render-evidence/warehouse-desktop-1440x900.png`
- `render-evidence/ebook-desktop-1440x900.png`
- `render-evidence/warehouse-mobile-390x844.png`
- `render-evidence/ebook-mobile-390x844.png`
- `render-evidence/warehouse-mobile-360x800.png`
- `render-evidence/ebook-mobile-360x800.png`

## Scope boundary retained

The references remain deterministic local fixtures. No backend, authentication, cart/payment, storage, analytics, or business architecture was added for presentation proof. Product differences arise from recipes and layout composition, not Commerce-prefixed primitives or local theme forks.

Expressive public composition is covered by the follow-up gate in
`research/09-expressive/GATE_EXPRESSIVE_DESIGN.md`; the original Gate C.2
foundation and shell decision remains unchanged.
