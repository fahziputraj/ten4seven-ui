Structures every form longer than four fields.

```jsx
<FormSection title="Informasi dokumen" description="Nomor dan tanggal mengikuti periode akuntansi yang aktif." columns={2}>
  <FormField label="Nomor invoice" required><Input value={no} /></FormField>
  <FormField label="Tanggal dokumen" required><Input type="date" /></FormField>
</FormSection>
<FormSection title="Detail item" actions={<Button variant="outline" size="sm" icon="add">Tambah baris</Button>} divider={false}>
  <DataTable columns={lineColumns} rows={lines} summary={totals} />
</FormSection>
```

- Transaction forms are always Header → Detail → Summary → Actions, one `FormSection` each.
- Two columns at desktop, one on mobile. Never three.
