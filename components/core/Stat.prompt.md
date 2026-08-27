Numbers that belong to a surface that already exists — a record header, a table footer, a summary strip.

```jsx
<div style={{ display: "flex", gap: "var(--space-5)" }}>
  <Stat label="Populasi" value="93.270" unit="ekor" />
  <Stat divider label="Hen-day" value="89,4" unit="%" trend={<TrendIndicator value={2.4} size="sm" />} />
  <Stat divider label="Nilai tertahan" value="Rp 1,81 M" caption="5 dokumen" />
</div>
```

- **Stat has no card; MetricCard has one.** Use Stat inside an existing surface, MetricCard in a `KPICluster`.
- Set `divider` on every Stat except the first when they sit in a row.
