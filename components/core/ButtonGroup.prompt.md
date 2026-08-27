A choice that changes how the current data is shown — not a navigation, not an action.

```jsx
<ButtonGroup size="sm" value={density} onChange={setDensity}
  items={[{value:"comfortable",icon:"expand",title:"Comfortable"},{value:"default",icon:"sidebar",title:"Default"},{value:"compact",icon:"collapse",title:"Compact"}]} />
<ButtonGroup value={mode} onChange={setMode} items={[{value:"table",label:"Tabel"},{value:"card",label:"Kartu"}]} />
```

- Selected segment fills brand green. One selection always active — there is no empty state.
- For page sections use `Tabs`; for a period switch inside a card, `Tabs variant="pill"` is the lighter option.
