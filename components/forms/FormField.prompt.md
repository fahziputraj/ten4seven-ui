The form unit. Every control in a business form is wrapped in one.

```jsx
<FormField id="qty" label="Jumlah telur" required hint="Butir, per hari">
  <Input id="qty" align="right" defaultValue="12.450" />
</FormField>

<FormField id="cost" label="Harga pokok" permission="Finance only">
  <Input id="cost" disabled defaultValue="Rp 1.850" />
</FormField>
```

A disabled control always carries `permission` text — an unexplained greyed-out field is a bug in AAPM products.
