# AAPM UI typography

The Academy and the general AAPM UI layer use the supplied local **Inter Variable** family. It is the closest Helvetica-like option in the current Academy implementation while retaining the optical sizing and weight range needed by dashboards, dense tables and auth forms.

- `Inter-Variable.woff2` — normal weights
- `Inter-Variable-Italic.woff2` — italic weights for editorial/quote treatments
- `Inter-OFL.txt` — SIL Open Font License text supplied with the font files

`tokens/fonts.css` registers the files and defines the fallback stack:

```css
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
```

Keep Inter local in production. The fallback stack is for resilient loading and does not replace the bundled font. Use `var(--font-body)` / `var(--font-heading)` instead of assigning a new family inside a component. Numeric dashboard values should use `var(--font-numeric)` with the existing tabular-number utility.
