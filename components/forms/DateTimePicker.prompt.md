# DateTimePicker

Purpose: collect a local date and time in one field without adding a calendar runtime.

```jsx
<DateTimePicker value={scheduledAt} onValueChange={setScheduledAt} />
```

Values follow the HTML `datetime-local` format (`YYYY-MM-DDTHH:mm`). Compose with `FormField` for the visible label and validation message. Treat the value as local until the product layer applies its canonical timezone; do not silently reinterpret it in the design system.
