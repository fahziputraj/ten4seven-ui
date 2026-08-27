Document evidence on any transaction or verification screen.

```jsx
<FileUpload required accept=".pdf,.jpg,.xlsx" files={files} onAdd={add} onRemove={remove}
  label="Unggah faktur pajak" hint="PDF · maksimal 10 MB" />
```

- Always state the formats and size cap in `hint` — a rejection after upload is a failure of this component's copy.
- Per-file `error` replaces the size line in red; the file stays listed so the user can see what failed.
- Pairs with `ApprovalPanel` checks: a missing required attachment is a `state: "fail"` check, not a silent block.
