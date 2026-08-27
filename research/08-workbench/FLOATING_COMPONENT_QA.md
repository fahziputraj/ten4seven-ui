# Floating component QA

## Coverage matrix

| Surface         | Trigger context              | Expected behavior                                                        |
| --------------- | ---------------------------- | ------------------------------------------------------------------------ |
| Select          | card and dialog              | popup uses overlay root, matches trigger width, keyboard selection works |
| Combobox        | bounded scroll panel         | list is not clipped and loading/empty states remain visible              |
| MultiSelect     | form grid                    | selection list stays viewport-contained and reports loading/empty/error  |
| DatePicker      | drawer and narrow viewport   | calendar flips/shifts and keeps date input semantics                     |
| DateRangePicker | form grid                    | range calendar remains one shared interaction surface                    |
| Popover         | edge anchor                  | side flips and horizontal position shifts inside viewport                |
| DropdownMenu    | edge anchor and split action | menu stays above content and dismisses on outside/Escape                 |
| Tooltip         | edge anchor and modal        | supplemental text is visible without changing control ownership          |
| ContextMenu     | pointer edge                 | fixed menu is clamped to a safe viewport start                           |
| Toast           | action feedback              | transient notification mounts at the toast layer                         |

## Manual browser checks

- Open each fixture at desktop width, 390px, and 360px.
- Inspect `#t7-overlay-root` while a popup is open.
- Confirm popup rectangles stay within viewport padding and do not increase
  document width.
- Scroll the owning document or ScrollArea while a popup is open and confirm
  the popup repositions or the modal/drawer keeps its own scroll owner.
- Confirm focused controls retain Escape and outside-pointer dismissal.
