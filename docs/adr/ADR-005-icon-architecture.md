# ADR-005 Icon architecture

## Context

AAPM proves that semantic icon names are more stable than provider strings. It also documents Solar as the dominant visual family, fallback families for missing physical nouns, and the need to remove the CDN in production.

## Options

1. Expose Iconify strings and load a CDN.
2. Depend on a full icon package at runtime.
3. Keep a semantic registry and compile only approved local glyphs.

## Decision

Expose `T7Icon name="..."`. Keep provider metadata in a static registry build boundary. The proof ships a local SVG path subset and no runtime CDN; the generator consumes pinned `@iconify-json/solar` and approved Iconify collections for a small curated domain extension (farm, egg, medicine, money, and navigation nouns). Every approved glyph is normalized to the package viewBox and is surfaced through a semantic name; provider strings remain provenance metadata only.

## Why

This keeps provider choice centralized, limits bundle size, and leaves room for optical normalization or ten4seven-owned glyphs.

## Tradeoffs

Adding a new icon requires registry and static-data work. That friction is intentional: semantic coverage is governed, not accidental.

## Consequences

Consumer feature code cannot accidentally ship arbitrary Iconify provider strings. The registry can be audited and tree-shaken.
