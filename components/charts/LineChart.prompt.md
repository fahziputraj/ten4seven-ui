Trend over a continuous period — production curve, cashflow, flock age vs standard.

```jsx
<LineChart target={90} targetLabel="Standar 90%" labels={["W16","W17","W18","W19","W20"]}
  series={[{ name: "Aktual", data: [72,84,90,93,92] }, { name: "Standar breed", data: [70,82,89,92,94], tone: 2 }]} />
```

- Two series maximum on an operational dashboard; five is the hard ceiling on an analytical one.
- Actual is always series 1 (brand green); the standard/benchmark is series 2 (teal).
