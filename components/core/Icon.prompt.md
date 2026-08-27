One icon component for the whole system — pass a semantic name, never an Iconify string from feature code.

```jsx
<Icon name="approve" size={20} />
<Icon name="mortality" size={16} color="var(--danger)" />
<Icon name="egg" size={24} title="Egg grading" />
```

- `IconRegistry` holds 290 semantic keys across actions, navigation, status, analytics, finance, inventory, farm, logistics, users, files, communication, Academy, AI and general web/publishing surfaces.
- Duotone glyphs (`*-bold-duotone`) are the default family for navigation and category tiles; solid `*-bold` for status and inline affordances; `*-linear` only for chevrons. The domain `warehouse` alias uses Solar buildings, while `egg` and `chicken` use the local AAPM Solar-like poultry set so their silhouettes remain unmistakable at small sizes.
- Icon-only affordances must carry a label — use `IconButton`, which wires `aria-label` + tooltip for you.
- Glyphs resolve through `@iconify/react` with explicit local Solar and domain-family data maps. Standard React rendering makes no CDN request; `ensureIconify` remains a no-op compatibility export.
- If a registered/raw glyph is not present in the local map, the component renders a visible local `info` fallback and marks it with `data-icon-fallback="true"`; it never becomes a blank icon.
