# Expressive UI coverage

Date: 2026-08-27

## Scope

This pass completes the expressive composition layer for ten4seven UI. The
goal is to prove that the system can support public, editorial, and commerce
surfaces without adding a second primitive vocabulary or changing the
business/theme architecture.

The consumer-facing hierarchy is:

```text
L0 Foundations
  -> L1 Primitives
    -> L2 Components
      -> L3 Patterns
        -> L4 Blocks
          -> L5 Recipes
            -> L6 Templates / References
```

The package remains the authority for foundations through components. Blocks
are reusable section-level compositions in `packages/ui/src/blocks.tsx`,
recipes describe page composition in `packages/ai/catalog/recipes.json`, and
the reference routes are runnable proof rather than a new framework layer.

## Expressive coverage

The canonical block catalog contains twelve implemented blocks:

- `Hero` and `Contained CTA` for proposition and next-step hierarchy.
- `Feature Showcase`, `Stats Section`, `Logo Cloud`, and `Testimonials` for
  capability explanation and social proof.
- `Pricing Section`, `Content Showcase`, and `Product Showcase` for public
  comparison, editorial browse, and product-led composition.
- `Announcement Bar`, `Carousel`, and `Public Footer` for communication,
  bounded sequencing, and public wayfinding.

`ChartPanel` is the shared chart composition contract. `LineChart`, `BarChart`,
and `DonutChart` remain chart components; they are not reimplemented inside a
marketing or commerce block.

## Composition rules

- Blocks consume canonical `Typography`, `Button`, `IconButton`, `Card`,
  `MediaFrame`, `ProductCard`, chart, and navigation contracts.
- No `CommerceButton`, `CommerceInput`, `HeroButton`, `MarketingCard`, or
  parallel domain primitive is permitted.
- Page-specific CSS controls layout composition, media fixtures, and responsive
  geometry only. Color, type, radius, density, focus, elevation, and motion
  resolve through provider tokens and package components.
- The public showcase uses neutral ten4seven UI copy and local fixture media;
  the perceived production navigation does not expose workbench utilities.
- Pricing and promotional blocks are presentation-only. Billing, persistence,
  analytics, and product policy remain outside the UI proof.

## Retrieval contract

Agents can retrieve the layer without inspecting donor sources:

1. Read `AGENTS.md` and `llms.txt` for the hierarchy and boundary rules.
2. Read `packages/ai/catalog/recipes.json` for the page archetype.
3. Read `packages/ai/catalog/blocks.json` for section-level composition.
4. Read `packages/ai/catalog/components.json` for canonical APIs.
5. Use `pnpm t7ui find "public showcase"` or `pnpm t7ui show <contract>`.

The direct proof routes are `/blocks`, `/blocks/hero-split`, and
`/public-showcase`. The `marketing-home` recipe points to all twelve blocks and
the public showcase reference.

## Quality boundary

Every block contract records responsive behavior, motion guidance,
accessibility expectations, performance notes, variants, content slots, and
recommended recipes. The quality matrix and gate evidence in this directory
are the review surface for future additions. A missing generic capability must
be recorded as a gap event and normalized into the canonical package before a
new block depends on it.
