When one action dominates but has real variants — save-and-what-next, export-as, submit-to-whom.

```jsx
<SplitButton label="Ajukan verifikasi" icon="submit" onClick={submit} actions={[
  { label: "Ajukan & buat berikutnya", icon: "add", onClick: submitAndNew },
  { label: "Simpan sebagai template", icon: "save", onClick: saveTemplate },
  { label: "Hapus draft", icon: "delete", tone: "danger", onClick: discard },
]} />
```

- The main half must be the single most common action, never a menu-opener.
- Two to five items behind the caret. More than that is a `Popover` menu on its own.
