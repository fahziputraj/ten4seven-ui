Pairs with `DataTable selectable`. Sits sticky above or below the table while a selection exists.

```jsx
<BulkActionBar count={sel.length} noun="dokumen" onClear={() => setSel([])}
  actions={<>
    <Button variant="ghost" size="sm" icon="approve">Setujui</Button>
    <Button variant="ghost" size="sm" icon="export">Ekspor</Button>
    <Button variant="ghost" size="sm" icon="archive">Arsipkan</Button>
  </>} />
```

- Inverse fill (`--foreground`), lime count icon, level-4 shadow. It is a mode indicator as much as a toolbar.
- Bulk destructive actions still route through a `Modal` confirmation naming the count.
