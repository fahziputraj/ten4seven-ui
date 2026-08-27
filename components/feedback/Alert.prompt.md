Persistent inline message. Sits inside the layout, above the thing it describes.

```jsx
<Alert tone="danger" title="Email atau password salah" />
<Alert tone="warning" title="Data sebagian" >Tiga kandang belum mengirim laporan hari ini. Angka produksi masih bisa berubah.</Alert>
<Alert tone="brand" icon="permission" title="Akses terbatas">Anda dapat melihat dokumen ini, tetapi tidak dapat menyetujuinya.</Alert>
```

- Fill is the tone at 8% alpha, border at 20%. Never a solid saturated block.
- `banner` for page-level notices (maintenance, offline); default card form for everything inside content.
- A disabled action must always be explained by an Alert or Tooltip — never leave a control dead without a reason.
