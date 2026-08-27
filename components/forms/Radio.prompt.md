One choice from 2–5 options where each option needs explaining — quiz answers, approval decisions, delivery methods.

```jsx
<Radio name="decision" value="approve" checked={v === "approve"} onChange={...}
  label="Setujui transaksi" description="Dokumen lengkap dan nilai sesuai PO." />
```

- Selected state is a green-tinted row with a green border, not just a filled dot.
- Above 5 options use `Select`. For multi-choice use `Checkbox`.
