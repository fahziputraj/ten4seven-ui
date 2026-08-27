A list, panel or dashboard section with no records yet.

```jsx
<EmptyState illustration="assets/illustrations/egg-tray.png"
  title="Learning path sedang disiapkan"
  description="Belum ada modul yang tersedia untuk akun ini. Roadmap akan muncul di sini saat materi sudah dipublikasikan."
  action={<Button variant="outline" icon="refresh">Muat ulang</Button>} />
```

- Say *why* it is empty and what will fill it. "Belum ada …" not "Tidak ada data".
- Small inline empties (inside a card) use `variant="dashed"` and drop the illustration.
- Filters returning nothing is a **no-result**, not an empty — use `DataTable emptyLabel` or `StateView state="no-result"`.
