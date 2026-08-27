The header block of every detail, approval and verification page. Nothing asks for a decision above it.

```jsx
<RecordSummary recordId="PI-2026-00841" title="CV Sumber Pakan Jaya" status="in-review"
  fields={[
    { label: "Tanggal dokumen", value: "24 Agustus 2026" },
    { label: "Jatuh tempo", value: "23 September 2026" },
    { label: "Nomor PO", value: "PO-2026-00612" },
    { label: "Total", value: "Rp 482.650.000", numeric: true, strong: true },
  ]}
  actions={<Button variant="outline" icon="print" size="sm">Cetak</Button>} />
```

- Order the fields the way a verifier reads them: identity → dates → references → money.
- `tone="accent"` marks the record currently under review inside an `ApprovalPanel` flow.
