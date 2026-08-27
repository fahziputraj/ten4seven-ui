# TimePicker

Purpose: collect a local time using the shared `Input` surface.

Use it for operational schedules, cut-off times, shifts, inspections, and other time-only fields. Use `DatePicker` for a date and `DateTimePicker` when both values belong to one field.

```jsx
<TimePicker value={shiftStart} onValueChange={setShiftStart} min="06:00" max="22:00" />
```

The component keeps the native HTML `time` input contract, supports `invalid`, `disabled`, `min`, `max`, `step`, label composition through `FormField`, and emits both `onValueChange` and the native `onChange` when supplied. A visible label and connected help/error text remain the consumer's responsibility.
