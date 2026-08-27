```jsx
<Checkbox id="all" indeterminate onChange={selectAll} />
<Checkbox id="tos" checked={ok} onChange={e=>setOk(e.target.checked)} label="Data sudah diverifikasi" description="Wajib sebelum submit." />
```
Row selection in a DataTable uses the bare form (no label) in the leading column; the header cell uses `indeterminate`.
