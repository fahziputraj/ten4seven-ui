# ADR-006 Registry and distribution strategy

## Context

The system needs predictable consumption by agents and humans, with future registry/CLI support but no premature platform complexity.

## Options

1. A remote registry and CLI before the component contract stabilizes.
2. Copy-and-paste snippets with no machine-readable metadata.
3. Package exports now, registry metadata next, CLI after measured demand.

## Decision

Start with typed package exports and local metadata. Add a registry schema only when a component or recipe has a stable prompt contract, provenance, dependencies, and test surface.

## Why

Agents need discoverable local contracts immediately; distribution mechanics should follow real usage rather than become a second product prematurely.

## Tradeoffs

The first release is less turnkey than a complete CLI. It is easier to govern and revise.

## Consequences

`package.json`, `llms.txt`, component prompt contracts, and future `registry/` metadata are the source of truth. No donor registry is published.
