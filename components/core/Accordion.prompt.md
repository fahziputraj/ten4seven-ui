Grouped content where showing everything at once would bury the task.

```jsx
<Accordion items={[
  { id: "hdr", title: "Informasi dokumen", description: "Nomor, tanggal, termin", icon: "note", content: <FormSection … /> },
  { id: "lines", title: "Detail item", meta: "4 baris", icon: "item", content: <DataTable … /> },
]} />
<Accordion variant="flush" multiple items={faq} />
```

- An open panel gains a green border and level-1 shadow; the chevron rotates over 200ms.
- `meta` is where the count goes, so a collapsed panel still tells you what's inside.
- Don't hide anything required-and-invalid behind a closed panel — validation must open it.
