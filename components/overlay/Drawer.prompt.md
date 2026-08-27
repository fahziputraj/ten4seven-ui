Advanced filters, a record preview beside a list, and the mobile nav.

```jsx
<Drawer open={open} onClose={close} title="Filter lanjutan" description="Terapkan untuk memperbarui daftar"
  footer={<><Button variant="ghost">Hapus semua</Button><Button icon="filter">Terapkan</Button></>}>
  <FormSection title="Periode">…</FormSection>
</Drawer>
```

- On mobile this replaces the sidebar entirely (`side="left"`), paired with the bottom nav.
- Filter drawers must have both "Hapus semua" and "Terapkan" — never auto-apply on change inside a drawer.
