# Start a new project with ten4seven UI

Use this sequence for a greenfield application:

1. Choose the profile: `enterprise`, `dashboard`, `commerce`, `content`, or `marketing`.
2. Choose appearance and palette.
3. Choose density, radius, and typography preset.
4. Identify routes and screens before writing components.
5. Map each screen to a catalogued page recipe.
6. Compose canonical components from the recipe.
7. Add domain components only when the component catalog does not cover the domain behavior.
8. Add semantic icons by meaning.
9. Verify accessibility, responsive behavior, interaction states, and the production build.

Example foundation:

```tsx
<Ten4SevenProvider
  theme={{
    appearance: "light",
    palette: "emerald",
    radius: "soft",
    density: "default",
    typography: "modern",
  }}
>
  <App />
</Ten4SevenProvider>
```

Avoid adding a second UI library for convenience. If a recipe names a component that is currently a `recipe-contract`, compose the first version from available primitives and record the missing system component for later extraction.
