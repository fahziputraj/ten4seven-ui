Shows where a record sits in its lifecycle. Configuration over duplication — one chip, sixteen states.

```jsx
<StatusChip status="in-review" />
<StatusChip status="approved" label="Disetujui" />
<StatusChip status="overdue" size="sm" icon={false} />
```

- Five tones only: neutral, progress (terracotta), review (blue), approved (green), blocked (red). Mapping is fixed in `statusMap`.
- In a dense table use `size="sm" icon={false}` so the row height holds.
- Do not use `Badge` for record state; `Badge` is for counts, labels and workspace tags.
