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
- If the recipe names expressive blocks, search `packages/ai/catalog/blocks.json`
  and use the block contract for content slots and responsive quality.
- Configure `Ten4SevenProvider` for appearance, palette, radius, density, and typography.
- Use `T7Icon` with semantic names from the icon catalog; never paste provider identifiers.
- Build the shell and navigation with canonical primitives first: `AppShell → [Sidebar | TopNavigation] → [PageHeader] → bounded route content`. Use `Sidebar` for private information-dense applications and `TopNavigation` for public/content/commerce surfaces.
- Preserve API calls, state, validation, routes, permissions, form schemas, and events.
- Keep responsive behavior intentional: test narrow layout, overflow, focus order, and touch targets.
- Use semantic labels, keyboard interaction, visible focus, and correct table/dialog semantics.
- Use only catalog entries with status `implemented`. If a required capability is missing, flag a design-system gap rather than creating a competing local version. The system owner must check canonical ten4seven, then AAPM extraction, then one bounded donor lookup only if necessary; normalize it into ten4seven and update the catalog, AI contract, and provenance before feature use.
- `Select` is the canonical custom popup contract; `NativeSelect` is the
  explicitly native alternative. Do not render both as competing accessible
  controls for one field.
- Use `cart`, `checkout`, and the shared commerce contracts (`QuantityControl`,
  `CartTrigger`, `CartLineItem`, `CartPanel`, `OrderSummary`) for commerce
  flows. Never create parallel `CommerceButton` or `CommerceInput` primitives.
- Taxonomy separates `Data Display`, `Tables`, `Filtering & Bulk Actions`, and
  `Patterns`; choose the family by responsibility, not by visual styling.
- Blocks are reusable page-level compositions (`Hero`, `FeatureShowcase`,
  `ProductShowcase`, `Carousel`, `PublicFooter`), not replacement primitives.

## Escape hatch

Use `className` for layout composition. A local visual override must name the exceptional requirement and must not replace a theme token or canonical component contract.

## Verification

Run the consumer's normal checks plus ten4seven's `format:check`, `typecheck`, `test`, `build`, and browser QA for the changed flow. Check light/dark, at least one alternate palette, density, keyboard interaction, and a mobile viewport.
