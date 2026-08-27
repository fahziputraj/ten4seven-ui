An action in flight: saving, recalculating, refetching.

```jsx
<Spinner label="Menyimpan perubahan..." />
<Spinner size={14} tone="muted" />
```

- **Skeleton for first load, Spinner for actions.** A spinner where content will appear is the wrong choice.
- `Button loading` already contains one — don't add a second next to it.
