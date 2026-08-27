The "recent activity" panel on an operational dashboard — who did what across the workspace.

```jsx
<ActivityFeed entries={[
  { day: "Hari ini", actor: "Rahmat Hidayat", action: "mengirim laporan harian", target: "Kandang 2", at: "14:12", tone: "progress" },
  { day: "Hari ini", actor: "Dewi Lestari", action: "menyetujui", target: "PI-2026-00840", at: "11:48", module: "Purchase", meta: "Rp 128,4 jt", tone: "approved", highlight: true },
  { day: "Kemarin", action: "Batas stok pakan Kandang 3 terlampaui", at: "17:05", icon: "warning", tone: "blocked" },
]} />
```

- **Newest first.** `AuditTimeline` is oldest first — the two are deliberately opposite because one is a stream and one is a history.
- System events omit `actor` and take an `icon` instead.
- Use `highlight` sparingly: only for entries that need the current user's attention.
