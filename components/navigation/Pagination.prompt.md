Sits directly under a `DataTable` on every list page.

```jsx
<Pagination page={page} pageCount={20} total={482} pageSize={25} onChange={setPage} />
```

- Always show the range readout when the total is known — operators need the count, not just the page.
- Collapses to first / neighbours / last with ellipses above 7 pages.
