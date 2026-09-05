# Mobile navigation and overlay hardening

Scope: canonical navigation, modal and drawer behavior; workbench mobile shortcuts.

- AppShell moves its Sidebar into a left Drawer below its existing 860px
  breakpoint. Choosing a destination dismisses navigation. Returning to desktop
  closes the drawer and restores the persistent sidebar.
- MobileSidebar keeps vertical navigation, bounded width and a visible scrim.
  The current destination uses selected/selected-foreground solid tokens to
  remain readable in dark mode as well as light mode.
  Drawer headers remain reachable while the body scrolls independently.
- Modal uses one scrolling body with a stable header. Modal and Drawer follow
  the visual viewport when a software keyboard changes the available height,
  and consume safe-area tokens on all four edges.
- TopNavigation accepts `placement="bottom"`; use three to five short primary
  destinations with icons. Its measured height reserves document space, and its
  active state uses primary and primary-foreground tokens. Use `controls` and
  `expanded` on an item that opens a navigation dialog.
- Workbench bottom shortcuts expose Studio, Tokens, Components and the complete
  Menu. Desktop navigation stays at its existing breakpoint.
- `--t7-touch-target-min` defines the density-independent 44px touch floor;
  `--t7-bottom-navigation-height` defines the 64px bar before device safe area.

Evidence is captured in `evidence/before` and `evidence/after`.
