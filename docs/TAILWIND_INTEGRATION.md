# Tailwind integration

The Tailwind bridge is optional. It maps Tailwind v4 theme names to the active
Ten4Seven semantic CSS variables so utilities and canonical components share
the same visual contract.

The bridge lives in `packages/ui/src/tailwind.css` and is exported as
`@ten4seven/ui/tailwind.css` in the distributable package.

## Install the CSS layers in order

```css
@import "tailwindcss";
@import "@ten4seven/ui/theme.css";
@import "@ten4seven/ui/components.css";
@import "@ten4seven/ui/tailwind.css";
```

For an application that does not need granular CSS slices,
`@ten4seven/ui/styles.css` already includes base tokens, generated recipe
selectors, and canonical component styles. Import `tailwind.css` after it.

The `@theme inline` block intentionally refers to runtime variables rather
than duplicating color values. That means a provider, a `ThemeScope`, or a
CSS-first root with a resolved mode updates Tailwind utilities automatically.

## Semantic utility examples

```tsx
export function Notice() {
  return (
    <aside className="rounded-t7-card border border-t7-border bg-t7-surface p-5 text-t7-text">
      <p className="text-t7-text-muted">Saved preferences apply immediately.</p>
      <button className="mt-3 rounded-t7-control bg-t7-primary px-3 py-2 text-t7-primary-foreground">
        Review settings
      </button>
    </aside>
  );
}
```

The currently mapped names include:

- colors: `t7-canvas`, `t7-surface`, `t7-surface-subtle`,
  `t7-surface-raised`, `t7-text`, `t7-text-muted`, `t7-border`,
  `t7-primary`, `t7-primary-hover`, `t7-primary-foreground`, `t7-secondary`,
  `t7-secondary-foreground`, `t7-quiet-foreground`, `t7-accent`,
  `t7-success`/`t7-success-foreground`,
  `t7-warning`/`t7-warning-foreground`,
  `t7-danger`/`t7-danger-foreground`, and `t7-info`;
- radii: `t7-control`, `t7-panel`, and `t7-card`;
- spacing references: `t7-control`, `t7-row`, and `t7-content`;
- fonts: the system’s semantic sans, serif/display, and mono families.

Use a canonical `Button`, `Input`, `Card`, `Dialog`, `Drawer`, `Table`, or
navigation primitive when that is the behavior needed. Tailwind utilities are
for composition and an exceptional domain layout, not a way to rebuild the
component library with arbitrary colors and geometry.

## CSS-first root example

```html
<html
  data-t7-theme="commerce"
  data-t7-mode="dark"
  data-t7-density="compact"
></html>
```

Any `bg-t7-surface`, `text-t7-text`, `border-t7-border`, or
`rounded-t7-card` utility beneath that root resolves against the same static
recipe selectors as the React runtime.

Static recipe selectors require `data-t7-mode="light"` or
`data-t7-mode="dark"`. For system-preference behavior outside React, use an
application or media-query adapter to set the resolved mode; a literal
`data-t7-mode="system"` does not match a generated recipe selector.

## Boundaries

- This bridge targets Tailwind v4's `@theme inline` model; it is not a
  Tailwind v3 configuration generator.
- It maps semantic names, not every raw palette shade. A raw-color utility is
  an application-owned brand decision and should not leak into canonical
  components.
- It does not replace the `Ten4SevenProvider` for a dynamic custom
  `ThemeConfig`. Use the provider or an application-owned compilation path for
  arbitrary advanced configurations.
- Do not add Tailwind as a runtime dependency of `@ten4seven/ui`; the emitted
  bridge is plain CSS.
