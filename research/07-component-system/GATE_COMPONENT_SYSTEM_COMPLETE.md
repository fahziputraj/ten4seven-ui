# Gate — component system complete

Date: 2026-08-27

## Decision

**PASS — v1 component vocabulary and reference proof are complete with
intentional out-of-scope integrations.** The gate is based on the checks below,
not on the number of catalog entries.

## Gate answers

| Question                                                                                                                    | Evidence-backed answer                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Can a normal product screen select canonical building blocks without inventing basics?                                      | Yes. The catalog has 129 canonical contracts, 6 compatibility aliases, structured API/state/a11y/token metadata, 17 families, 17 recipes, and 12 expressive blocks.                                         |
| Are foundations, primitives, components, patterns, blocks, recipes, and references distinguishable?                         | Yes. L0-L6 are defined in the blueprint; `/blocks` separates reusable expressive composition from component families and reference routes.                                                                  |
| Is Select's accessibility model singular and documented?                                                                    | Yes. Select exposes one custom trigger/listbox model; the mirrored form select is aria-hidden and not tabbable. NativeSelect remains explicitly native.                                                     |
| Are APIs and docs usable without source inspection?                                                                         | Yes. Public detail routes render purpose, preview, use/avoid, API prop table, minimal example, accessibility, critical states, responsive/motion guidance, tokens, recipes, relations, and alias decisions. |
| Are recipe relationships and product references explicit?                                                                   | Yes. Recipes declare required/optional contracts and the `marketing-home` recipe points to twelve expressive blocks; Warehouse Inventory, Publishing Store, and Public Showcase remain explicit references. |
| Does commerce prove a different composition rather than a second component system?                                          | Yes. Ebook uses the shared provider and package primitives plus canonical commerce contracts; no CommerceButton or CommerceInput exists.                                                                    |
| Are theme, dark mode, density, radius, motion, a11y, and responsive concerns represented?                                   | Yes at contract level, with the required cross-component QA matrix and reference viewport checks.                                                                                                           |
| Did this phase introduce donor runtime code?                                                                                | No. The donor protocol remains a gap-event rule; no new donor lookup was needed for this completion pass.                                                                                                   |
| Can a new AI agent build the cold-start tasks with only the consumer contracts, catalogs, recipes, and ten4seven contracts? | Yes, conditionally on the passing automated cold-start simulation: 11 tasks, 9 contract/catalog reads, 0 donor reads, and direct route retrieval.                                                           |

## Explicit non-goals

Backend persistence, payment providers, authentication policy, remote search,
rich text, Kanban, spreadsheet editing, scheduler, GIS, video editor, 3D
viewer, and code-editor primitives remain outside this UI-system gate. They may
be future domain integrations or future gap events; they are not claimed here.

## Verification commands

```text
pnpm format:check
pnpm typecheck
pnpm test
pnpm test:component-system
pnpm test:consistency
pnpm build
pnpm test:e2e
```

Rendered QA must use the deterministic routes in AGENTS.md, including
/theme-studio, /component-lab, /components, the family routes, /blocks,
/blocks/hero-split, /public-showcase, /recipes/cart, /warehouse-inventory, and
/ebook-store. Browser evidence must cover desktop, 390x844, and 360px
reference renders for both product screens plus the expressive viewport suite.
