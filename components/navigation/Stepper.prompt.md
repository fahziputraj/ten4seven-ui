Multi-step approval chains and sectioned long forms.

```jsx
<Stepper current={2} steps={[
  { label: "Draft", description: "Purchasing" },
  { label: "Verifikasi", description: "Finance" },
  { label: "Persetujuan", description: "Manager" },
  { label: "Selesai" },
]} />
```

- Completed steps are green with a check; the current step is brand green with its number; future steps are grey.
- `orientation="vertical"` for a sidebar showing where a record is in its lifecycle.
- Don't use a Stepper to show record *state* on a list — that is `StatusChip`.
