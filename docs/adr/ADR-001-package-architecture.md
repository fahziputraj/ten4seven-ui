# ADR-001 Package architecture

## Context

The handoff calls for a reusable system with tokens, themes, icons, UI, patterns, recipes, registry, CLI, AI contracts, and a playground. A monolithic app would make the consumer contract unclear; excessive package fragmentation would slow agents down.

## Options

1. One app with internal folders.
2. A small workspace with public runtime packages and a proof app.
3. A large package-per-layer monorepo from day one.

## Decision

Use a small pnpm workspace: `packages/tokens`, `packages/icons`, `packages/ui`, and `apps/playground`. Add patterns, recipes, registry, CLI, and docs apps only when a concrete consumer or benchmark requires them.

## Why

This preserves the public contract without inventing package boundaries before the architecture has evidence. The proof app imports the same package APIs a consumer will use.

## Tradeoffs

Some future layers remain co-located until their contracts stabilize. The workspace has slightly more setup than a single Vite app.

## Consequences

Runtime consumers do not need donor libraries. The root index and `llms.txt` are the agent entry points.
