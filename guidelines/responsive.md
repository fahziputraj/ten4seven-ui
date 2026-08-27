# AAPM UI responsive contract

- Every grid child has `min-width: 0`; long labels truncate or wrap inside their own region.
- The shell collapses to a drawer at `48rem`; the bottom navigation is available to compact mobile workflows.
- Main content reserves space for the mobile bottom navigation and safe-area inset.
- Tables are allowed to scroll inside a bounded region. They must not force the entire page wider than the viewport.
- Sticky header/sidebar behavior belongs to the shell. A floating element must not overlap the bottom navigation or action footer.
- Scroll edge affordances are state-aware application behavior. Do not paint a permanent gradient over content that is not scrollable.
- Verify at narrow widths, at 200% zoom and with long Indonesian labels before release.
