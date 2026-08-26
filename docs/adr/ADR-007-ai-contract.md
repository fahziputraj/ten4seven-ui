# ADR-007 AI contract strategy

## Context

A major goal is to reduce agent context cost. AAPM places `Component.prompt.md` beside components and maintains gallery cards and a manifest.

## Options

1. Rely on README prose and source discovery.
2. Duplicate long prompts into a central manual.
3. Keep concise co-located contracts plus generated indexes.

## Decision

Each public component gets a concise machine-readable contract covering purpose, allowed variants, accessibility, density behavior, and anti-patterns. Generated indexes point agents to the contract and implementation.

## Why

Co-location prevents prompt drift while indexes avoid repository-wide reading. The handoff's source-manifest strategy is preserved without copying AAPM brand instructions into generic core.

## Tradeoffs

Contract maintenance is part of the component definition. Automated validation will be added with the registry.

## Consequences

`llms.txt`, package exports, and future component prompt files become first-stop agent surfaces. Component code remains the executable authority.
