Required on every icon-only action, and on any disabled control the user might expect to work.

```jsx
<Tooltip label="Ekspor ke Excel"><IconButton icon="export" label="Ekspor" variant="outline" /></Tooltip>
<Tooltip label="Hanya Finance Manager dapat menyetujui" side="left"><Button disabled icon="approve">Setujui</Button></Tooltip>
```

- Inverse fill (`--foreground` on `--background`), 11px, level-2 shadow, 6px offset.
- Opens on hover **and** focus. `IconButton` already sets `aria-label` + `title`; the Tooltip is the visible affordance on top of that.
