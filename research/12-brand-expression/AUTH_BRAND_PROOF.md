# Authentication Brand Expression Proof

## Claim under test

```text
same canonical Authentication recipe
+ same canonical component contracts
+ different BrandProfile
= materially different visual character
```

The proof is limited to `auth`. It does not migrate a second recipe, add a
generic component, fork `Button`, `Input`, `Card`, or `Form`, redesign Theme
Studio, redesign Operations Tracker, publish packages, or change registry
distribution.

## Canonical anatomy

Both proof routes resolve these required components from the same compact
Authentication recipe:

```text
Surface
Input
PasswordInput
ActionFooter
```

The route also uses the existing optional `Checkbox` contract and the existing
canonical `Button`, `MediaFrame`, `Image`, and `Typography` primitives to fill
the consumer-owned proof surface. There is one form structure, one password
visibility interaction, and one submit interaction for both profiles.

## Profile difference

| Expression decision | `neutral-product` | `aapm-academy` |
| ------------------- | ----------------- | -------------- |
| Media prominence    | low               | high           |
| Media treatment     | product           | documentary    |
| Media overlay       | none              | dramatic       |
| Page composition    | centered          | split          |
| Whitespace          | balanced          | generous       |
| Brand mark          | medium            | high           |
| Display character   | neutral           | editorial      |
| Surface mood        | neutral           | institutional  |
| CTA emphasis        | balanced          | strong         |

The source asset is intentionally the same local abstract learning-studio
fixture for both routes. The layout, media treatment, type character, surface
mode, and action emphasis change because the resolver returns a different
declared profile, not because the route creates a second design system.

## Interaction proof

The route proves the following without transmitting data to a service:

1. `Show password` changes the canonical password input to visible text and
   exposes the matching `Hide password` accessible name.
2. A local demo submit keeps the form bounded and announces a status message.
3. The profile switcher navigates between the two proof routes while preserving
   the Authentication contract and changing only the selected expression.
4. Terms and Privacy links remain consumer-owned route links.

## Responsive proof

The same two profiles are checked at:

- 1440 x 900 desktop
- 840 x 900 tablet
- 390 x 844 mobile
- 360 x 800 narrow mobile

At desktop the profiles have different geometry. At tablet and mobile the
expression rebalances into a bounded single-column flow; no horizontal page
overflow is permitted. The form and media remain inside the viewport.
