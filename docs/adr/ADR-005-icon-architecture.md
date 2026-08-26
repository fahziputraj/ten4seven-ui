# ADR-005 Icon architecture

## Context

AAPM proves that semantic icon names are more stable than provider strings. It also documents Solar as the dominant visual family, fallback families for missing physical nouns, and the need to remove the CDN in production.

## Options

1. Expose Iconify strings and load a CDN.
2. Depend on a full icon package at runtime.
3. Keep a semantic registry and compile only approved local glyphs.

## Decision

Expose `T7Icon name="..."`. Keep provider metadata in a static registry build boundary. The proof ships a small local SVG path subset and no runtime CDN; a later generator can consume `@iconify-json/solar` to refresh the subset.

## Why

This keeps provider choice centralized, limits bundle size, and leaves room for optical normalization or ten4seven-owned glyphs.

## Tradeoffs

Adding a new icon requires registry and static-data work. That friction is intentional: semantic coverage is governed, not accidental.

## Consequences

Consumer feature code cannot accidentally ship arbitrary Iconify provider strings. The registry can be audited and tree-shaken.
