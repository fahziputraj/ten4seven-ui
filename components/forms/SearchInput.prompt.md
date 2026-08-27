Standalone search — in a toolbar, a drawer, or a picker. `FilterToolbar` already contains one.

```jsx
<SearchInput value={q} onValueChange={setQ} placeholder="Cari peserta, kandang, atau peran..." shortcut="⌘K" />
```

- Rests on `--surface-subtle` and lifts to `--card` on focus — the same behaviour as the toolbar search.
- Placeholder names the searchable fields. Never a bare "Cari".
