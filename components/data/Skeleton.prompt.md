First-load placeholder inside a layout that already exists.

```jsx
<Skeleton height={36} width={36} radius="var(--radius-control)" />
<Skeleton lines={3} />
```

- Match the real geometry — a metric tile skeleton is a 36px tile + a 32px bar + a 16px bar, not three equal rows.
- Wrap the group in `role="status" aria-busy` with an Indonesian `sr-only` label: "Memuat ringkasan progress...".
- Use for first load only. Refetches keep the old data and dim it.
