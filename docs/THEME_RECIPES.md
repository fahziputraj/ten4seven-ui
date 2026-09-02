# Theme recipes

A theme recipe is an authored visual baseline for a real product context. It
is not a dropdown of unrelated color swatches. Each recipe combines a typed
theme profile, an expression label, and composition values in
`packages/contracts/src/theme-recipe.ts`.

## Available recipes

| Recipe       | Expression    | Intended use                                            | Deliberate character                                                                             |
| ------------ | ------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `enterprise` | `operational` | Private, information-dense workflows and dashboards     | Quiet slate surfaces, indigo actions, cyan focus, balanced density, soft elevation.              |
| `product`    | `product`     | Product workflows, SaaS, and decision-making interfaces | Blue foundation, indigo action hierarchy, balanced surface rhythm.                               |
| `editorial`  | `editorial`   | Reading-led content, journals, and ebook-like surfaces  | Paper canvas, serif-capable editorial type, sharp geometry, comfortable density, flat elevation. |
| `commerce`   | `commerce`    | Browsing and purchasing flows                           | Emerald action hierarchy, warm orange accent, paper canvas, rounded geometry.                    |

The complete machine-readable projection is
`generated/theme-recipes.json`. Agents should retrieve it through the
`themes` entry in `generated/agent-index.json` before opening the full
contract source.

## Use a recipe

```tsx
<Ten4SevenProvider theme="editorial">
  <ArticleRoute />
</Ten4SevenProvider>
```

Then apply only per-user choices through `preferences`:

```tsx
<Ten4SevenProvider
  theme="commerce"
  preferences={{ appearance: "system", density: "comfortable" }}
>
  <Storefront />
</Ten4SevenProvider>
```

Do not use a recipe name to justify a second Button, Card, Input, or
Navigation implementation. Recipes alter the tokens and composition around
the shared components.

## Recipe contents

A `ThemeRecipe` has three parts:

```ts
interface ThemeRecipe {
  id: ThemeRecipeName;
  label: string;
  description: string;
  expression: ThemeExpression;
  profile: ThemeProfile;
  composition: ThemeComposition;
}
```

`profile` holds the semantic choices that adapt to the established token
resolver. `expression` describes the overall art direction. `composition`
holds bounded page decisions: content maximum, readable measure, page gutter,
and section rhythm. It deliberately does not encode component variants.

## Create or revise a recipe

Create a recipe only when a distinct product context needs a coordinated,
reusable baseline. A new color combination by itself is not enough.

1. Add the explicit name to `ThemeRecipeName` in
   `packages/contracts/src/types.ts`.
2. Define the typed recipe in `packages/contracts/src/theme-recipe.ts` using
   `recipeProfile` and a documented product rationale.
3. Check that its resolved semantic colors, radius, density, typography,
   elevation, motion, and composition work together in light and dark modes.
4. Regenerate the contract projections and static recipe CSS.
5. Add provider, CSS-first, scoped, keyboard/focus, and rendered browser
   evidence before treating it as a public recipe.

```bash
pnpm contracts:generate
pnpm package:build
pnpm package:verify
```

The static selectors are generated, not hand-authored. Do not edit
`packages/tokens/src/theme-recipes.css` directly.

## When not to make a recipe

Use a runtime preference for a user's appearance, density, contrast, or
motion choice. Use a `ThemeScope` for one bounded inverse or contextual region.
Use a typed `ThemeOverrides` object for a small, explicit product-root recipe
adjustment, or the existing advanced `ThemeConfig` path for an application-owned
brand editor. None of those cases requires another shared recipe.
