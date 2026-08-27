Confirms a completed action and gets out of the way.

```jsx
<Toast tone="success" title="Purchase invoice diajukan" description="PI-2026-00841 menunggu verifikasi Finance."
  action={<Button variant="link" size="sm">Lihat dokumen</Button>} onClose={close} />
```

- Level 3 elevation on `--popover`, not a tinted fill — a toast floats, an Alert belongs to the page.
- Never use a toast for an error the user must act on; that is an `Alert` next to the field.
