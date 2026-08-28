# Gate — component system complete

Date: 2026-08-28

## Decision

**PASS — v1 component vocabulary and reference proof are complete with
intentional out-of-scope integrations.** The gate is based on the checks below,
not on the number of catalog entries.

## Gate answers

| Question                                                                                                                    | Evidence-backed answer                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Can a normal product screen select canonical building blocks without inventing basics?                                      | Yes. The catalog has 138 canonical contracts, structured API/state/a11y/token metadata, 17 families, and 17 recipes.                                                                                          |
| Are foundations, primitives, components, patterns, recipes, and references distinguishable?                                 | Yes. L0-L5 are defined in the blueprint; family routes separate Patterns, Data Display, Tables, and Filtering & Bulk Actions.                                                                                 |
| Is Select's accessibility model singular and documented?                                                                    | Yes. Select exposes one custom trigger/listbox model; the mirrored form select is aria-hidden and not tabbable. NativeSelect remains explicitly native.                                                       |
| Are APIs and docs usable without source inspection?                                                                         | Yes. Public detail routes render purpose, preview, use/avoid, API prop table, minimal example, accessibility, critical states, responsive/motion guidance, tokens, recipes, relations, and alias decisions.   |
| Are recipe relationships and product references explicit?                                                                   | Yes. Recipes declare required/optional contracts and only the evidence-backed Warehouse Inventory and Publishing Store references.                                                                            |
| Does commerce prove a different composition rather than a second component system?                                          | Yes. Ebook uses the shared provider and package primitives plus canonical commerce contracts; no CommerceButton or CommerceInput exists.                                                                      |
| Are theme, dark mode, density, radius, motion, a11y, and responsive concerns represented?                                   | Yes at contract level, with the required cross-component QA matrix and reference viewport checks.                                                                                                             |
| Did this phase introduce donor runtime code?                                                                                | No. The donor protocol remains a gap-event rule; no new donor lookup was needed for this completion pass.                                                                                                     |
| Can a new AI agent build the cold-start tasks with only the consumer contracts, catalogs, recipes, and ten4seven contracts? | Yes, conditionally on the passing automated cold-start simulation: 11 tasks, 0 donor reads, direct route retrieval, and explicit expressive block roles.                                                      |
| Does an expressive recipe distinguish mandatory composition from context-dependent composition?                             | Yes. `marketing-home.blockRoles` classifies Hero, Contained CTA, and Public Footer as required; proof/explanation blocks as recommended; and announcement, product, pricing, and carousel blocks as optional. |

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
/theme-studio, /component-lab, /components, the family routes,
/recipes/cart, /warehouse-inventory, and /ebook-store. Browser evidence
must cover desktop, 390x844, and 360px reference renders for both L5 screens.

## Continuation verification — 2026-08-28

- `marketing-home` now exposes `blockRoles` in the AI catalog and renders
  Required blocks, Recommended blocks, and Optional blocks separately on its
  recipe detail route. Supporting components and Optional components remain
  distinct, so an agent is not taught to render every expressive block.
- Direct browser QA covered Theme Studio, Component Lab, Components and
  component detail routes, Blocks, Hero detail, Recipes and recipe details,
  Tokens, Icons, Warehouse Inventory, Ebook Store, and Public Showcase at
  desktop and 390px. The checked routes had one meaningful `main`, no
  horizontal overflow, and no browser console errors or warnings.
- Chart evidence contains clean bounded ticks (`0`, `25`, `50`, `75`, `100`)
  and no floating-point artifacts. TimePicker listbox geometry stayed inside
  the 390px viewport; Drawer close returned focus to its trigger; semantic
  Table and public NavigationMenu contracts were exercised.
- `pnpm test:e2e` completed **75 tests passed** with the Playwright config
  serialized to one worker for deterministic Vite route transforms and
  screenshot/font capture. The suite includes **41 visual regression** tests.
- Remaining intentional boundary: package/release hardening and an explicit
  consumer chart-domain override are not part of this gate; default chart
  scales remain auto-niced and zero-based for positive values.
