# Expressive donor gap ledger

Date: 2026-08-27

## Protocol

A donor lookup is a design-system gap event, not normal page development. The
required order is:

1. Search the existing approved extraction.
2. Search canonical ten4seven components and contracts.
3. Consult a donor only for a confirmed generic gap.
4. Normalize the result into ten4seven UI.
5. Update the component/block catalog, AI contract, and evidence.

Consumer runtime code must never depend on a donor package or expose donor
branding.

## Expressive phase events

| Event                      | Result                                                                                                                                      | Runtime impact                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| Public section composition | Existing package contracts covered Hero, CTA, features, stats, content, product, pricing, testimonials, navigation, and footer composition. | No donor lookup.              |
| Native scroll carousel     | A bounded native scroll-snap implementation with semantic controls covered the reference requirement.                                       | No heavy carousel dependency. |
| Chart polish               | Existing chart contracts were extended with summaries, focus/hover affordances, and local tooltips.                                         | No charting dependency.       |
| Editorial/public media     | Deterministic local SVG/CSS fixtures covered reference media needs.                                                                         | No remote asset dependency.   |

## Current position

- New expressive donor events: **0**.
- New donor runtime dependencies: **0**.
- New parallel primitives: **0**.
- Expressive blocks normalized into the package and AI catalog: **12**.

If a future block cannot be expressed with the current contracts, stop at the
gap, record the requested capability and evidence, then resume only after the
canonical API and documentation are updated.
