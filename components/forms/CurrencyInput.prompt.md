Every money field in the ERP.

```jsx
<CurrencyInput value={total} onValueChange={setTotal} />   {/* shows "Rp  482.650.000" */}
```

- Indonesian grouping: periods for thousands. The `Rp` sits inside the field, not in the label.
- `onValueChange` hands you raw digits — keep the unformatted value in state, never the display string.
- Right-aligned always, so a column of amounts reconciles visually against a `DataTable` summary row.
