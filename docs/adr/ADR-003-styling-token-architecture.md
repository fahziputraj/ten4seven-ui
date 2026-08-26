# ADR-003 Styling and token architecture

## Context

The requested axes multiply quickly: appearance, palette, radius, density, typography, elevation, motion, and semantic states. Per-component variant CSS would create a combinatorial maintenance problem.

## Options

1. Tailwind utility variants for every axis.
2. CSS-in-JS theme objects that recalculate component styles.
3. Cascading CSS custom properties with semantic component variables.

## Decision

Use native CSS custom properties as the runtime contract. Theme configuration maps to root variables; components consume semantic roles. The core does not require Tailwind.

## Why

CSS variables provide global updates, compact runtime behavior, alpha-capable semantic colors, and a clear boundary for visual regression. They retain the AAPM strengths without brand coupling.

## Tradeoffs

Token typing and browser fallback strategy require discipline. Consumers that prefer Tailwind can map utilities to the variables later.

## Consequences

Changing a theme axis does not require local component style edits. Raw palette values are limited to theme profiles and never appear in component rules.
