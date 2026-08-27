Trend shape inside a `MetricCard`'s `visualization` slot. Answers "is it improving?", never "what is the value?".

```jsx
<MetricCard label="Hen-day production" value="91,8" unit="%" delta="+2,4%" direction="up"
  visualization={<Sparkline data={[86,88,91,92,90,93,92,94,91,89,92,93]} target={90} />} />
```

- Pair with a `delta` — the sparkline shows shape, the delta gives the number.
- `target` draws the dashed terracotta reference line, the same treatment as `BulletChart`.
