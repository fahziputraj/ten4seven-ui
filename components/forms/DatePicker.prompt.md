Any single date: tanggal dokumen, jatuh tempo, tanggal produksi.

```jsx
<DatePicker value={date} onValueChange={setDate} min="2026-08-01" max="2026-08-31" />
<DatePicker value={date} onValueChange={setDate} long={false} size="sm" />   {/* 24/08/2026 */}
```

- Value is **always ISO** `YYYY-MM-DD`; only the display is Indonesian. Use the exported `formatDateId` anywhere you render a date read-only so it matches.
- Weeks start Monday (Sen). Months are Indonesian and unabbreviated.
- Use `min`/`max` to lock a form to the open accounting period rather than validating after submit.
