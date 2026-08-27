Record metadata on a detail or transaction page: dates, references, entities, totals.

```jsx
<KeyValueList columns={2} items={[
  { label: "Nomor dokumen", value: "PI-2026-00841" },
  { label: "Supplier", value: "CV Sumber Pakan Jaya" },
  { label: "Tanggal", value: "24 Agustus 2026" },
  { label: "Total", value: "Rp 482.650.000", numeric: true, strong: true },
]} />
```

- Missing values become an em dash automatically — never pass "-" or "N/A".
- Currency and quantities set `numeric` so they right-align on tabular figures.
