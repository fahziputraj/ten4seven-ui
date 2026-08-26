# ADR-008 License and provenance strategy

## Context

The donor set combines a supplied AAPM system, premium HeroUI and shadcnblocks material, Minimal commercial terms, and sources with incomplete local licensing evidence. The system must not turn reference material into a redistributed competing library.

## Options

1. Copy mature donor source into the new packages.
2. Treat all folders as unrestricted because they are local.
3. Inventory provenance and re-author generic runtime code from observed contracts.

## Decision

Use donor folders as read-only research. Do not copy premium/unclear-license source or assets into generic packages. Keep AAPM visual lineage as documented reference/preset work with explicit provenance.

## Why

Local availability is not redistribution permission. Re-authoring preserves the useful architecture while keeping the public boundary auditable.

## Tradeoffs

Some implementation work is repeated. The result is safer to publish and less coupled to vendor updates.

## Consequences

`research/00-inventory/LICENSE_MATRIX.csv` is part of the design-system record. New donor material needs a provenance entry before it can influence runtime code.
