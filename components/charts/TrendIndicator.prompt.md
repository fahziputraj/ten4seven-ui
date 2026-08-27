Period-over-period change, wherever a number needs a direction.

```jsx
<TrendIndicator value={2.4} caption="vs minggu lalu" />
<TrendIndicator value={-0.01} sentiment="inverse" />   {/* mortality down = green */}
<TrendIndicator value="flat" direction="flat" size="sm" />
```

- **`sentiment="inverse"` is mandatory** on metrics where down is good. Green must always mean "good", never "arithmetically up".
