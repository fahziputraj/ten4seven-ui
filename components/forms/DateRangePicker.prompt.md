Every report, dashboard period switch and advanced filter.

```jsx
<DateRangePicker from={r.from} to={r.to} onChange={setR} activePreset={preset} onPreset={applyPreset} />
```

- Reuse the exported `datePresets` so every module offers the same five periods — that consistency is the point.
- Each field bounds the other, so an inverted range cannot be entered.
- The long-form echo underneath ("24 Agustus 2026 – 23 September 2026") confirms what the short fields mean.
