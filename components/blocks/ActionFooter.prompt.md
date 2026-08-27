Last block of every transaction and long form.

```jsx
<ActionFooter hint="Perubahan terakhir disimpan 14:32"
  tertiary={<Button variant="ghost" icon="delete">Hapus draft</Button>}
  secondary={<Button variant="outline">Simpan draft</Button>}
  primary={<Button icon="submit">Ajukan untuk verifikasi</Button>} />
```

- Canonical pairings: `Batal / Simpan` or `Simpan draft / Ajukan`. Never two green buttons.
- Blurred `--background` at 92%, 1px top border. The same treatment as the sticky header, mirrored.
