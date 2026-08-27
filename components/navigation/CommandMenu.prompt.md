The ⌘K entry point for an ERP with dozens of modules. Own the shortcut in the app shell and pair it with a `SearchInput shortcut="⌘K"` in the header.

```jsx
<CommandMenu open={open} onClose={close} onSelect={go} groups={[
  { label: "Modul", items: [
    { id: "pi", label: "Purchase Invoice", icon: "invoice", keywords: "tagihan supplier PI", shortcut: "G I" },
    { id: "wt", label: "Warehouse Transfer", icon: "transfer", keywords: "mutasi gudang WT" } ] },
  { label: "Tindakan", items: [{ id: "new-pi", label: "Buat purchase invoice", icon: "add" }] },
  { label: "Dokumen terakhir", items: [{ id: "d1", label: "PI-2026-00841", description: "CV Sumber Pakan Jaya", icon: "file" }] },
]} />
```

- Arrow keys move, Enter opens, Escape closes — all handled. Hover syncs the active row so mouse and keyboard agree.
- `keywords` is what makes this usable: include the Indonesian term, the English term and the document prefix.
