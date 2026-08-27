The first block on every list, detail, dashboard and form page.

```jsx
<PageHeader overline="Purchase · Invoice" title="Purchase Invoice"
  description="Kelola tagihan supplier, verifikasi dokumen, dan ajukan pembayaran."
  breadcrumb={<Breadcrumb items={crumbs} />}
  actions={<><Button variant="outline" icon="export">Ekspor</Button><Button icon="add">Buat invoice</Button></>}
  meta={<><StatusChip status="in-review" /><span>482 dokumen</span></>} />
```

- Title is 24px semibold at `-0.03em`. Description caps at 58ch — longer belongs in a help panel.
- One green button, always rightmost. Secondary actions are `outline`; toolbar-ish extras are `ghost`.
