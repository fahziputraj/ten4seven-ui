Confirmations, short forms, and any decision that needs the record behind it kept in view.

```jsx
<Modal open={open} onClose={close} icon="delete" tone="danger"
  title="Hapus stock adjustment?"
  description="Dokumen SA-2026-00219 dan 14 baris detailnya akan dihapus permanen."
  footer={<><Button variant="outline" onClick={close}>Batal</Button><Button variant="destructive" icon="delete">Hapus</Button></>}
/>
```

- Backdrop is green-950 at 45% — never neutral black. Radius 24px, level-3 shadow, footer on `--surface-subtle`.
- Destructive confirmations name the record and the consequence. "Apakah Anda yakin?" alone is not acceptable copy.
- Anything longer than a short form belongs in a `Drawer` or its own page.
