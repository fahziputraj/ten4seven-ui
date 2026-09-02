# Start a new project with ten4seven UI

Use this sequence for a greenfield application:

1. Choose one curated theme recipe: `enterprise`, `product`, `editorial`, or
   `commerce`.
2. Reserve `RuntimePreferences` for a person's appearance, density, contrast,
   and motion choices; do not assemble a raw palette profile for ordinary
   feature work.
3. Identify routes and screens before writing components.
4. Map each screen to a catalogued page recipe.
5. Compose canonical components from the recipe.
6. Add domain components only when the component catalog does not cover the
   domain behavior.
7. Add semantic icons by meaning.
8. Verify accessibility, responsive behavior, interaction states, and the
   production build.

Example foundation:

```tsx
<Ten4SevenProvider
  theme="product"
  preferences={{ appearance: "system", density: "default" }}
>
  <App />
</Ten4SevenProvider>
```

Use `enterprise` for private, information-dense workflows; `product` for
application and SaaS work; `editorial` for reading-led content; and `commerce`
for browsing and purchase flows. An advanced `ThemeConfig` remains available
only for a genuine product-owned brand editor; follow the migration guidance
instead of making it a greenfield default.

Avoid adding a second UI library for convenience. Use only catalog entries with status `implemented`. If a generic capability is missing, record a design-system gap rather than composing a competing local primitive; the system owner follows canonical ten4seven → AAPM extraction → bounded donor lookup only if needed → normalization and catalog/provenance update.
