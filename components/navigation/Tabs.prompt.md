Sections of one record (Detail / Lampiran / Riwayat) or a queue filter.

```jsx
<Tabs value={tab} onChange={setTab} items={[
  { value: "detail", label: "Detail transaksi" },
  { value: "docs", label: "Lampiran", count: 3 },
  { value: "audit", label: "Riwayat", icon: "timeline" },
]} />
<Tabs variant="pill" size="sm" value={range} onChange={setRange}
  items={[{ value: "7d", label: "7 hari" }, { value: "30d", label: "30 hari" }, { value: "90d", label: "90 hari" }]} />
```

- Active underline is 2px `--primary`; the label also goes green and semibold.
- `pill` sits on `--surface-muted` with the active chip lifted onto `--card` — use it for period switches, never for primary page sections.
