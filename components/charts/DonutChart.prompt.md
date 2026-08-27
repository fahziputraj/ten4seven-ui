Composition only, and only when the parts genuinely sum to a meaningful whole.

```jsx
<DonutChart centerValue="24.150" centerLabel="butir hari ini"
  data={[{label:"Grade A",value:64},{label:"Grade B",value:24},{label:"Retak",value:8,tone:3},{label:"Reject",value:4,tone:5}]} />
```

- Five slices maximum; anything more becomes a `BarChart`.
- Never use a donut to compare two periods — that is a `BarChart` or `LineChart`.
