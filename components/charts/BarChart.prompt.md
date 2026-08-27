"Which performs better?" — production per house, sales per customer, cost per period.

```jsx
<BarChart target={90} targetLabel="Target 90%" showValues
  data={[{label:"13",value:86},{label:"14",value:88},{label:"15",value:91}]} />
<BarChart stacked series={["Pakan","Obat","Tenaga kerja"]}
  data={[{label:"Jun",values:[320,40,90]},{label:"Jul",values:[344,38,92]}]} />
```

- With a `target`, bars that miss it turn terracotta — the chart states the verdict, not just the value.
- Stacked series follow the ordered chart palette (`--chart-1` … `--chart-5`); never recolour them per screen.
