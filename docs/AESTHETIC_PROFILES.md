# Aesthetic profiles

An aesthetic profile answers how a product should feel after its semantic
theme has already made it legible. It is separate from a color palette and
from the behavior of an individual component.

The current v2 implementation exposes this idea as `ThemeExpression` metadata
on a curated theme recipe. The provider writes it as `data-t7-expression`; it
does not create a second, uncontrolled component variant system.

## Current expressions

| Expression    | Recipe               | Use when                                              | Composition and visual direction                                                                                     |
| ------------- | -------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `operational` | `enterprise`         | The task is scanning, triage, or structured work.     | High signal, quiet surfaces, clear table hierarchy, restrained elevation, dense-but-accessible information.          |
| `product`     | `product`            | The task is product work or decision making.          | Balanced whitespace, clear action hierarchy, modest rounding, and calm surface depth.                                |
| `editorial`   | `editorial`          | Reading and authored content lead the experience.     | Longer measure, generous rhythm, lower chrome, paper neutrals, serif-capable display type, and flat/subtle surfaces. |
| `commerce`    | `commerce`           | Browsing and purchase confidence lead the experience. | Approachable rounded geometry, clear buying actions, helpful comparison, and intentional product media.              |
| `neutral`     | custom configuration | A product uses the advanced configuration path.       | Keep the universal semantic baseline; do not infer a new expression from arbitrary palette choices.                  |

The expressions are intentionally small. `expressive` is not a general-purpose
escape hatch in the current contract. A product should earn additional brand
moments through a documented block, brand profile, or recipe decision rather
than making every control animate or glow.

## What an expression may influence

Expression belongs at the shared system or composition layer:

- content width, reading measure, gutter, and section rhythm;
- typography character and hierarchy;
- surface/elevation restraint;
- media prominence and block selection;
- the amount of decorative motion around already-accessible interactions.

It must not change the semantic meaning of a primary action, field error,
focus indicator, dialog, navigation landmark, or keyboard behavior. Those
remain canonical across all expressions.

## A practical decision rule

1. Select the page archetype and canonical shell.
2. Select a recipe because it matches the product context.
3. Let the expression influence composition and blocks.
4. Use semantic components with their ordinary contracts.
5. Add a local override only for a domain-specific exception.

For example, an editorial page can use a lower-chrome `PublicShell`, readable
measure, `Hero`, and `ContentShowcase`; it should not create an
`EditorialButton` or an incompatible mobile drawer.

## Review questions

Before approving an expression change, ask:

- Does it improve hierarchy or only add decoration?
- Does it remain legible in light and dark modes?
- Does it preserve focus, reduced motion, touch targets, and keyboard paths?
- Does it work for empty, loading, error, and data-dense states?
- Could the same result be achieved through an existing recipe, brand profile,
  or block instead of a new primitive?

When uncertain, prefer clarity, alignment, rhythm, semantic meaning, and
restraint over novelty, extra shadows, additional gradients, or motion.
