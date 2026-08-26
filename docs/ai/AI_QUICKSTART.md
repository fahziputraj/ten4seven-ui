# ten4seven UI AI quickstart

## 1. What ten4seven UI is

ten4seven UI is a token-driven React UI system. It gives an agent a small public language: `Ten4SevenProvider`, semantic typography/theme roles, canonical primitives, and semantic `T7Icon` names. It is the authority for UI implementation; donor folders are research only.

## 2. Detect an existing installation

Look for:

- `@ten4seven/tokens`, `@ten4seven/ui`, or `@ten4seven/icons` in `package.json`.
- `Ten4SevenProvider` in the app root.
- imports of `@ten4seven/tokens/theme.css` and `@ten4seven/ui/styles.css`.
- `T7Icon` calls using semantic names.
- `data-density`, `data-palette`, `data-radius`, or `data-typography` on the provider.

If no installation exists, read the consumer's package manager and framework first, then add the packages through its normal dependency workflow. Do not copy donor libraries into the feature.

## 3. Initialize it

```tsx
import "@ten4seven/tokens/theme.css";
import "@ten4seven/ui/styles.css";
import { Ten4SevenProvider } from "@ten4seven/ui";

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
</Ten4SevenProvider>;
```

For a custom family, keep the preset and override only the family axes: `typography: { preset: "modern", ui: '"Brand Sans", sans-serif' }`.

## 4. Select a page recipe

Search `packages/ai/catalog/recipes.json`, or run:

```bash
pnpm t7ui find "inventory list"
```

Start from the closest recipe. Do not invent a new information architecture before checking the catalog.

## 5. Find components

Search `packages/ai/catalog/components.json`, or run `pnpm t7ui show DataTable`. Available components are the executable authority. A `recipe-contract` entry is a named composition target, not permission to recreate a library locally.

## 6. Use theme tokens

Change `Ten4SevenProvider` or a theme preset first. Components consume semantic variables for appearance, palette, radius, density, elevation, typography roles, and font families. Follow **theme first, component second, local override last**.

## 7. Use icons

Search `packages/ai/catalog/icons.json` by meaning: `invoice`, `warehouse`, `filter`, `search`, `export`, `add`. Render `T7Icon name="search"`; provider-specific names are implementation details.

## 8. Verify

Run:

```bash
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
```

Then test the real route in a browser: meaningful content, no runtime overlay, no console errors, keyboard/focus behavior, responsive layout, and the primary interaction.
