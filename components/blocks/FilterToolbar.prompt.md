Sits between `PageHeader` and `DataTable` on every list, queue and report page.

```jsx
<FilterToolbar searchValue={q} onSearchChange={setQ}
  filters={<><Select value={status} options={statusOptions} /><Select value={period} options={periodOptions} /></>}
  applied={[{ key: "status", label: "Status: In review" }, { key: "farm", label: "Farm: Kandang 3" }]}
  onRemoveFilter={remove} onClearAll={clear}
  trailing={<><Button variant="outline" icon="filter" size="sm">Filter lanjutan</Button><Button variant="ghost" icon="export" size="sm">Ekspor</Button></>} />
```

- Filter order is fixed system-wide: Search → Status → Period → Entity/Location → Advanced → Clear all.
- Every active filter appears as a removable green chip, including ones set in the advanced drawer. A hidden filter changing the numbers is a bug.
- Search focus lights the lime focus ring and lifts the field from `--surface-subtle` to `--card`.
