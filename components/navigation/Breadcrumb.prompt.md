Sits above the page title on detail and transaction pages.

```jsx
<Breadcrumb items={[{ label: "Purchase", href: "/purchase" },
  { label: "Purchase Invoice", href: "/purchase/invoice" }, { label: "PI-2026-00841" }]} />
```

- 11px, muted, chevrons at 11px and 70% opacity. The last crumb is semibold foreground and not a link.
- Module names stay English; record identifiers stay verbatim.
