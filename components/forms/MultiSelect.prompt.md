Above ~8 options, or whenever the user needs to search rather than scroll. Also the entity lookup.

```jsx
<MultiSelect value={houses} onValueChange={setHouses} placeholder="Semua kandang"
  options={[{value:"k1",label:"Kandang 1",description:"Blitar",meta:"24.800"},{value:"k3",label:"Kandang 3",description:"Blitar",meta:"22.940"}]} />
<MultiSelect single value={supplier} onValueChange={setSupplier} placeholder="Pilih supplier"
  searchPlaceholder="Cari nama atau NPWP..." options={suppliers} />
```

- Plain `Select` for 2–7 fixed options; `MultiSelect` once searching beats scrolling.
- `description` + `meta` are what make a supplier or house list actually pickable — use them.
- The footer's "Hapus semua" is required in multi mode; don't hide it.
