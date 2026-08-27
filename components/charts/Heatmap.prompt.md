Where a two-axis pattern is the point: which house on which week, which operator on which shift.

```jsx
<Heatmap tone="danger" rows={["Kandang 1","Kandang 2","Kandang 3"]} columns={["W20","W21","W22","W23"]}
  data={[[0.04,0.05,0.04,0.06],[0.06,0.07,0.06,0.08],[0.09,0.11,null,0.14]]}
  valueFormat={(v) => v.toFixed(2).replace(".", ",") + "%"} />
```

- Missing data renders a dashed em-dash cell. **Never** pass 0 for "no reading" — the distinction is operationally critical.
- Use `tone="danger"` when high is bad (mortality, rejects) and `"green"` when high is good.
