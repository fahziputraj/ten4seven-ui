The action primitive — every clickable command in AAPM products is a Button.

```jsx
<Button variant="default" icon="submit">Submit for approval</Button>
<Button variant="outline" icon="export" size="sm">Export</Button>
<Button variant="destructive" icon="reject">Reject</Button>
<Button variant="ghost" size="icon" aria-label="More"><Icon name="more" /></Button>
```

- Exactly one `default` (green) button per view — it is the primary operational action.
- Transaction footers pair `outline` Cancel with `default` Save, or `soft` Save draft with `default` Submit.
- `loading` keeps the label and swaps the icon for a spinner; don't replace the label with "Loading…".
- Radius is 12px (`--radius-control`); `sm` uses 14px to match dense table controls in the Academy runtime.
- Press state is a 1px downward nudge on the primary variant only. Hover is a darker fill, never a colour change.
