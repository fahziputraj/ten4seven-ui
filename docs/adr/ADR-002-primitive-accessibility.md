# ADR-002 Primitive and accessibility strategy

## Context

AAPM provides a semantic primitive facade. HeroUI demonstrates robust overlay/control behavior, while shadcn provides source-owned composition patterns. The public system must not become a wrapper around any donor.

## Options

1. Depend directly on HeroUI or Radix.
2. Copy donor implementations into the public package.
3. Own the semantic API and re-author small primitives, using donor behavior as research.

## Decision

Own the React primitives and their semantic props. Use native HTML semantics first, add explicit keyboard/focus/ARIA behavior, and keep complex overlay logic behind the `@ten4seven/ui` contract. Donors are read-only research.

## Why

This avoids licensing leakage and preserves the ability to change an internal implementation without changing consumer code.

## Tradeoffs

More behavior must be tested in this repository. The initial proof is intentionally small and expands through a migration ledger.

## Consequences

`Button`, `Input`, `DataTable`, `Modal`, and `NavItem` are package-owned. Accessibility tests become a release gate as coverage grows.
