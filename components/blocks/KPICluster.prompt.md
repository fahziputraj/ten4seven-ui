The first thing below `PageHeader` on any dashboard.

```jsx
<KPICluster title="Snapshot hari ini" items={[
  { icon: "egg", label: "Produksi telur", value: "91,8", unit: "%", delta: "+2,4%", direction: "up", caption: "vs minggu lalu" },
  { icon: "mortality", label: "Mortalitas", value: "0,08", unit: "%", delta: "-0,01%", direction: "up", tone: "orange", accent: "orange" },
  { icon: "feed", label: "Konsumsi pakan", value: "112", unit: "g/ekor", delta: "flat", direction: "flat", tone: "slate", accent: "none" },
  { icon: "wallet", label: "Penjualan hari ini", value: "Rp 482.650.000", delta: "+6,1%", direction: "up", tone: "green" },
]} />
```

- Order by what the reader needs first, not by module. Executive dashboards lead with money; operational dashboards lead with exceptions.
- Four tiles maximum in a row. If you need more, you need a second section with its own `title`.
