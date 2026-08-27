# AAPM UI token architecture

AAPM UI uses three layers. Each layer has one job and a predictable direction of dependency:

1. **Primitive** — palette, spacing, typography, elevation and motion values. These describe available material, not product intent.
2. **Semantic** — `background`, `foreground`, `primary`, `surface-*`, status and chart roles. Product code chooses meaning here, including the dark theme overrides.
3. **Component** — control geometry, shell dimensions, table density, overlay surfaces and interaction transitions. Components consume semantic tokens and never hard-code brand colour.

`styles.css` is the consumer entrypoint. The import order is intentional: fonts and primitives first, semantic theme aliases next, then component/layout contracts.

Use HSL custom properties when a color needs opacity:

```css
.notice {
  background: hsl(var(--brand-orange-hsl) / .12);
  border-color: hsl(var(--brand-orange-hsl) / .34);
}
```

Light is the default. Add `.dark` to an application root to activate the dark semantic set. Do not create a second “green canvas” theme for a component; use a named surface or tint only where the component’s meaning calls for it.

Density is page-level: `data-density="comfortable"`, `data-density="default"` or `data-density="compact"`. A component may read the density contract, but should not invent a local density scale.
