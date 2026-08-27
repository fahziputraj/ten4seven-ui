Any counted quantity: populasi, qty, bobot, dosis.

```jsx
<NumberInput value={qty} onValueChange={setQty} unit="karung" min={0} step={10} />
<NumberInput value={feed} onValueChange={setFeed} unit="g/ekor" step={0.5} steppers={false} size="sm" />
```

- Always right-aligned with tabular figures so a column of them lines up.
- Set `unit` rather than putting the unit in the label — it stays visible while typing.
