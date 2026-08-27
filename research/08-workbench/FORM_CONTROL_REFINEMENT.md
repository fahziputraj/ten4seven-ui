# Form control refinement

The canonical form family remains one API surface with explicit behavior
differences:

- `Select` is the styled, keyboard-addressable bounded choice contract.
- `NativeSelect` is intentionally browser-native for platform-dependent flows.
- `Combobox` supports filtering plus loading and empty states.
- `MultiSelect` keeps a listbox model, compact selected-value presentation, and
  loading/empty/error helper states.
- `DatePicker` and `DateRangePicker` use stable `YYYY-MM-DD` values and the
  shared floating positioning model.
- `TimeInput` remains a native time input; it does not pretend to normalize
  locale-specific time-picker UI.
- `DateTimeInput` composes date and time without owning timezone or persistence.

The Component Lab form section is the comparison fixture. The overlay stress
fixture adds the nested and constrained contexts that ordinary form examples do
not expose.
