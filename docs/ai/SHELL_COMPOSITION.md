# Shell composition contract

Use the same shell grammar for every product domain:

`AppShell → [Sidebar | TopNavigation] → [PageHeader] → bounded route content`

`AppShell` owns the application frame and landmark boundary. Choose one primary navigation mode by product context:

- `Sidebar` with optional `SidebarGroup` for private, information-dense operational applications.
- `TopNavigation` for public, content, and commerce composition.

`PageHeader` is the only route-level heading. It owns route title, summary, metadata, and primary actions. A route may omit it only when a purposeful immersive reader or authentication pattern takes its place.

Inside the bounded content region, choose recipe components by information need: table/workflow for operational records, a visual grid for catalog items, form sections for record creation, and a clear action boundary at the end of an intentional task. Reuse `DetailDrawer`, `Modal`, `AlertDialog`, `Popover`, and `FilterDrawer` rather than creating page-local overlay mechanics.

On narrow screens, relocate secondary navigation with `MobileSidebar` and secondary filters with `FilterDrawer`. Do not clone a second mobile, commerce, or domain primitive system. Typography, controls, surfaces, focus, density, radii, and icons remain canonical across recipes.
