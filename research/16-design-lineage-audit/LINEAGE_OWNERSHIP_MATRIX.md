# Lineage Ownership Matrix

Status: **PASS — reference principles map to the correct ten4seven layer**  
Verified: 2026-09-01

| Reference principle                                | Ten4seven owner                                   | Evidence in current implementation                                                                          | Change source classification                   |
| -------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Refined controls, focus, and overlay behavior      | Canonical Components                              | Button/Input/Select/Drawer/Modal/Popover/Combobox/Date controls and Component Lab interaction proofs        | HEROUI_PRINCIPLE                               |
| Mobile-safe compact interaction                    | Tokens + Components                               | Shared control heights, hit-area separation, responsive navigation, contained backdrops                     | HERO_NATIVE_UI_PRINCIPLE                       |
| Calm, dense operational composition                | AppShell + Patterns + consumer operational recipe | Operations Tracker shell, KPI hierarchy, milestone state, filters, local table scroll                       | MINIMAL_PRINCIPLE + AAPM_OPERATIONAL_PRINCIPLE |
| Art-directed branded authentication                | BrandProfile + consumer content/media             | `aapm-academy` selects split, generous, editorial, documentary, institutional, and strong expression fields | AAPM_ACADEMY_ART_DIRECTION                     |
| Public compositional range                         | Blocks + consumer layout                          | Hero, Feature, Content, Product, Testimonial, Pricing, CTA, and PublicShell composition                     | SHADCN_COMPOSITION_REFERENCE                   |
| Content-first publishing discovery                 | Recipe + consumer domain data                     | Search, filters, author/category/price/access, grid/list, cover and cart anatomy                            | DOMAIN_REFERENCE                               |
| Semantic color, type, radius, and motion decisions | Foundations + ThemeProfile                        | Named base/action/accent/canvas/chart roles; human exact control with agent profile resolution              | CURRENT_SYSTEM                                 |
| AI-safe page assembly                              | Contracts + agent core/node + Recipes             | Canonical contract retrieval and composition without local primitive decisions                              | CURRENT_SYSTEM                                 |

## Key separation preserved

```text
ThemeProfile
  owns semantic UI language and token resolution

BrandProfile
  owns coordinated composition, media treatment, whitespace,
  display character, surface mood, and action emphasis

Consumer
  owns the actual media asset, product copy, business flow,
  domain data, permissions, and handlers
```

This separation is why the AAPM Academy proof can be expressive without
introducing `AAPMButton`, `AcademyInput`, or a brand-specific form system.

## Outcome for this audit

No reference-derived visual patch is warranted at the Foundation, Component,
Pattern, Block, Recipe, or BrandProfile layer. The right result is explicit
lineage documentation plus preservation of the already hardened canonical
behavior—not churn or a donor-shaped redesign.
