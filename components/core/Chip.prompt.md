Applied filters, tags, and multi-select tokens.

```jsx
<Chip tone="green" onRemove={clearStatus}>Status: In review</Chip>
<Chip icon="location" selected onClick={toggle}>Kandang 3</Chip>
<Chip size="sm" avatar={<Avatar name="Dewi Lestari" size="xs" />}>Dewi Lestari</Chip>
```

Three token components, three jobs — do not substitute:
- **Chip** — interactive: removable or selectable.
- **Badge** — read-only label or count.
- **StatusChip** — record lifecycle state, colour fixed by state.
