# Using ten4seven UI

ten4seven UI is the design-system authority for this application. Preserve the application's business behavior while changing its presentation.

## Precedence

1. Product and accessibility requirements.
2. Canonical ten4seven components and semantic tokens.
3. The selected ten4seven recipe.
4. Domain-specific components and layout composition.
5. Local overrides only when the exception is documented.

## Agent workflow

- Identify the screen archetype and retrieve its recipe.
- Search the component catalog before writing JSX.
- Configure `Ten4SevenProvider` for appearance, palette, radius, density, and typography.
- Use `T7Icon` with semantic names from the icon catalog; never paste provider identifiers.
- Build the shell and navigation with canonical primitives first.
- Preserve API calls, state, validation, routes, permissions, form schemas, and events.
- Keep responsive behavior intentional: test narrow layout, overflow, focus order, and touch targets.
- Use semantic labels, keyboard interaction, visible focus, and correct table/dialog semantics.
- If a required component is marked `recipe-contract`, compose it from available primitives or flag the missing system work; do not invent a competing local version.

## Escape hatch

Use `className` for layout composition. A local visual override must name the exceptional requirement and must not replace a theme token or canonical component contract.

## Verification

Run the consumer's normal checks plus ten4seven's `format:check`, `typecheck`, `test`, `build`, and browser QA for the changed flow. Check light/dark, at least one alternate palette, density, keyboard interaction, and a mobile viewport.
