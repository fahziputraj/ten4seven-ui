The audit trail on any detail, approval or verification page.

```jsx
<AuditTimeline entries={[
  { action: "Dibuat", at: "22 Agu 2026 · 09:12", actor: "Dewi Lestari", role: "Purchasing", state: "draft", icon: "add" },
  { action: "Diajukan untuk verifikasi", at: "22 Agu 2026 · 16:40", actor: "Dewi Lestari", state: "submitted", icon: "submit" },
  { action: "Diminta revisi", at: "23 Agu 2026 · 10:05", actor: "Budi Santoso", role: "Finance",
    state: "revised", icon: "edit", note: "Lampiran surat jalan belum sesuai nomor DO." },
]} />
```

- Order is chronological, oldest first. Never reverse it.
- Marker colour comes from `state` — the same five lifecycle tones as `StatusChip`.
- Rejections and revision requests must carry a `note`. An unexplained rejection is a bug.
