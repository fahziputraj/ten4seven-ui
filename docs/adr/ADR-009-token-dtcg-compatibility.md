# ADR-009 Token source and DTCG compatibility direction

## Context

Ten4Seven has a mature HSL-oriented token resolver and a compatibility-facing
CSS-variable vocabulary. Replacing that runtime in one step with a new token
format would risk visual drift and break established consumers. At the same
time, a broad `ThemeConfig` object does not itself express the ownership of
palette, action, accent, canvas, density, typography, motion, and elevation.

## Options

1. Declare the existing HSL variables fully DTCG compliant without a typed
   source or export.
2. Replace the token runtime immediately with an unproven DTCG/OKLCH stack.
3. Introduce a typed semantic profile and deterministic DTCG-compatible export,
   preserve the HSL compatibility contract, then evolve the canonical source
   through an evidence-backed migration.

## Decision

Use option 3. `packages/contracts/src/theme-profile.ts` is the typed semantic
aggregate; `packages/contracts/src/theme-recipe.ts` builds curated profiles;
`packages/tokens/src/theme.ts` remains the runtime resolver. Static recipe CSS,
agent projections, and the deterministic DTCG-compatible export are generated
from those contracts and runtime values.

`scripts/generate-dtcg-token-export.mjs` emits `$type`, `$value`, typed sRGB
reference values, normative dimension/duration value objects, semantic aliases,
and recipe metadata at
`generated/tokens.dtcg.json`, `packages/tokens/generated/tokens.dtcg.json`,
and `packages/agent/generated/tokens.dtcg.json`. The artifact is exported from
the package as `@ten4seven/ui/tokens.dtcg.json`. It is a DTCG-compatible
interoperability surface, not yet the canonical authoring source; the runtime
continues to emit HSL tuple variables for visual compatibility. Likewise,
OKLCH is a future migration option rather than a claim about the current
canonical color source.

The root `semantic.color.action` aliases describe the default emerald runtime.
Recipe-specific action aliases are available under
`theme.recipes.<recipe>.semantic.color.action`, so an interoperating consumer
can select the named recipe deliberately without treating the export as a live
runtime resolver.

## Why

This makes semantic ownership explicit now, preserves proven component output,
and provides a deterministic standard-format artifact without forcing an
unproven runtime replacement. Components can already consume semantic roles
instead of knowing raw palette families.

## Tradeoffs

The system temporarily carries a typed profile, a deterministic export, and a
legacy-shaped resolver input/output. Contributors must avoid treating the
export as proof that all rendering is DTCG-native.

## Consequences

New token work must preserve the semantic/component boundary, update the typed
source, regenerate projections and the DTCG export, and verify rendered output.
A future canonical DTCG or OKLCH migration needs an explicit compatibility
plan, visual regression, and contrast evidence before it can retire
`--t7-*-hsl` variables.
