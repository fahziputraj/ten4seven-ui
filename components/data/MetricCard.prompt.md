The KPI tile. Answers "what is happening?" — put trend in `delta`, not in a second card.

```jsx
<MetricCard icon="egg" label="Produksi telur" value="91,8" unit="%" delta="+2,4%" direction="up"
  caption="vs minggu lalu" visualization={<Progress value={92} tone="lime" size="sm" />} />
<MetricCard icon="wallet" label="Piutang jatuh tempo" value="Rp 482.650.000" delta="-6,1%" direction="down" tone="orange" accent="orange" />
```

- **Never formats numbers.** Pass Indonesian-formatted strings (`92,4`, `Rp 24.500.000`).
- `direction` drives colour: up = green, down = red, flat = grey. For metrics where down is good (mortality, cost), pass the direction that reflects *sentiment*, not arithmetic.
- Values are tabular and tracked at `-0.04em`. Don't override the type.
- Group 3–4 in a `KPICluster`; a lone MetricCard usually belongs in a `RecordSummary` instead.
