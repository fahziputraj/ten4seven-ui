Sidebar navigation row, grouped under uppercase group labels (LEARN / TOOLS / ACHIEVEMENT, or the ERP module groups).

```jsx
<NavItem icon="dashboard" label="Dashboard" active />
<NavItem icon="invoice" label="Purchase Invoice" badge={12} />
<NavItem icon="approve" label="Approval Queue" dot />
<NavItem icon="warehouse" label="Inventory" collapsed />
```

- Active is a solid `--brand-green` fill with white text and level-1 shadow — not a tint, not a left bar.
- Group labels above a stack: 10px uppercase, `+0.18em`, muted. Hidden when the rail is collapsed.
