The text field. Focus is a green border + soft ring, never a colour-filled box.

```jsx
<Input icon="mail" type="email" placeholder="you@example.com" />
<Input align="right" defaultValue="24.500.000" />          {/* currency: right + tabular */}
<Input icon="search" placeholder="Cari nomor transaksi…" size="sm" />
<Input invalid defaultValue="12" aria-describedby="qty-error" />
```

Money and quantity inputs are always right-aligned with tabular figures so decimals line up down a column.
