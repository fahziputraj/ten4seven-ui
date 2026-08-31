# Brand Profile Architecture

Status: **bounded Slice B**
Verified: 2026-08-31
Scope: the canonical `auth` / Authentication recipe only

## Objective

Brand expression is a controlled plane above the canonical component system. A
consumer can select a `BrandProfile` and receive a materially different visual
character while the recipe anatomy, component contracts, semantic tokens, and
runtime behavior remain the same.

The proof currently has exactly two profiles:

- `neutral-product`
- `aapm-academy`

No other recipe is migrated by this slice.

## Boundary

```text
@ten4seven/contracts
  typed BrandProfile data and Authentication expression metadata

@ten4seven/agent/generated
  compact brand-profile and recipe projections

@ten4seven/agent/core
  pure deterministic resolver/composer; accepts normalized data
  and has no filesystem or Node dependency

@ten4seven/agent/node
  filesystem-backed compact loader and CLI convenience layer
  delegates resolution to the same core implementation

@ten4seven/ui
  canonical Surface, Input, PasswordInput, Checkbox, ActionFooter,
  Button, MediaFrame, Image, and Typography implementations

consumer route
  owns media source and alt text, brand copy, authentication handlers,
  legal links, and the page-level arrangement of canonical primitives
```

The supported adoption paths remain explicit:

- build-time or CLI resolution: `@ten4seven/agent/node`
- portable deterministic logic: `@ten4seven/agent/core`
- application UI runtime: `@ten4seven/ui`

Browser-safe core import means that the resolver has no Node coupling. It does
not claim that a complete filesystem-backed agent runtime must run in a
production browser.

## ThemeProfile and BrandProfile are different axes

`ThemeProfile` controls the system's semantic rendering environment: appearance,
palette, canvas, radius, density, motion, and typography preset. It is resolved
by `@ten4seven/ui` at the provider boundary.

`BrandProfile` controls expression decisions for a recipe: media prominence and
treatment, composition bias, whitespace intensity, typography character,
brand-mark prominence, surface mood, and action emphasis. It is resolved by the
pure agent core from explicit contract data. A BrandProfile does not create a
second token system and does not replace the active ThemeProfile.

## Ownership model

| Concern                                            | Owner                 | Rule                                                                       |
| -------------------------------------------------- | --------------------- | -------------------------------------------------------------------------- |
| Authentication recipe and canonical component list | ten4seven             | One typed contract; no page-local form primitive                           |
| Semantic control styling and token application     | ten4seven UI          | Use existing `@ten4seven/ui` components and provider tokens                |
| Profile expression values                          | BrandProfile contract | The resolver may only project declared profile values                      |
| Media source and alt text                          | Consumer              | The proof uses one local consumer fixture for both profiles                |
| Brand copy and legal links                         | Consumer              | Copy stays in the route, not in the agent resolver                         |
| Authentication handler and API behavior            | Consumer              | The proof uses a local demo submit state only                              |
| Page arrangement                                   | Consumer              | The route composes the canonical primitives according to resolved metadata |

The resolver's decision ledger records nine profile-backed fields. Every entry
has `source: "brand-profile"` and `agentOwned: 0`.

## Deterministic flow

```text
compact recipes.auth + compact components + compact brand profiles
  -> createBrandExpressionResolver(contract)
  -> resolve({ brandProfile })
  -> compose({ brandProfile })
```

The core does not read a file, discover a route, choose a profile from page
content, or invent an anatomy decision. The Node layer loads compact JSON once
and feeds that normalized data into the same core resolver. The playground
route consumes the result and renders the exact same Authentication form
contract for both profiles.

## Bounded proof routes

- `/brand-proof/auth-neutral` — centered, restrained, low-prominence media
- `/brand-proof/auth-aapm-academy` — split, editorial, high-prominence media

These routes are intentionally not added to the main Library or References
navigation. They are adoption proof surfaces, not a new product area.
