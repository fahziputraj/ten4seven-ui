# Real Adoption Proof Plan

Status: executed on 2026-08-28. The proof is intentionally scoped to two isolated React workspace consumers and ends with a `CONDITIONAL PASS`; it does not claim that every external repository has been validated.

## Objective

Prove that a fresh product-context task can retrieve and consume ten4seven through its contract surface:

`product context → shell → recipe → blocks/patterns → implemented components → semantic icons → theme`

The proof must preserve existing business behavior while replacing presentation. It must not rely on donor UI source, a parallel consumer design system, new basic primitives, or consumer-local visual tokens.

## Controlled consumers

| Consumer                          | Product context                                 | Routes and behavior in scope                                                                                                                           |
| --------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@ten4seven/adoption-operational` | Private receiving workspace / CRUD operations   | `/operations`, `/operations/receipts/new`, `/inventory`; search, status filtering, create, detail drawer, status update, navigation, mobile navigation |
| `@ten4seven/adoption-public`      | Public ebook library / commerce-content surface | `/`, `/catalog`, `/guides`; navigation, search, collection filtering, product detail, cart, quantity, removal, empty state, mobile layout              |

Each consumer started as a local legacy implementation without ten4seven dependencies. The domain modules and their business functions were kept unchanged during migration.

## Agent operating contract

The controlled task prompts do not prescribe component answers:

1. “Integrate this existing receiving workflow into the ten4seven UI operating system. Preserve routing, receipt data, search/status filtering, create behavior, detail inspection, status updates, and responsive navigation. Begin with product-context retrieval and report the shell, recipe, component, icon, theme, and gap decisions.”
2. “Integrate this existing ebook library and cart workflow into the ten4seven UI operating system. Preserve routing, catalog search/filtering, product inspection, cart quantity/removal, empty state, and responsive navigation. Begin with product-context retrieval and report the shell, recipe, block, component, icon, theme, and gap decisions.”

The allowed cold-start read set is:

- `AGENTS.md`
- `docs/ai/AI_QUICKSTART.md`
- `docs/ai/APPLY_TO_EXISTING_WEB.md`
- `packages/ai/catalog/recipes.json`
- `packages/ai/catalog/components.json`
- `packages/ai/catalog/blocks.json`
- `packages/ai/catalog/icons.json`

The consumer proof does not read donor sources or import internal implementation paths. The maintainer did inspect public package implementation while wiring the exact API, so the independent cold-start metric below is explicitly a contract-only simulation rather than a claim about the entire authoring session.

## Measurement protocol

| Metric                                                 | Target | Evidence                                                                                                                                |
| ------------------------------------------------------ | -----: | --------------------------------------------------------------------------------------------------------------------------------------- |
| Donor source reads                                     |      0 | `scripts/verify-adoption.mjs`; forbidden donor roots are excluded from the cold-start read set                                          |
| Internal implementation reads in cold-start simulation |      0 | `pnpm test:adoption:static`                                                                                                             |
| New basic primitives                                   |      0 | Static audit of both consumer `App.tsx` files                                                                                           |
| Parallel design systems                                |      0 | Both consumers use `@ten4seven/ui`, `@ten4seven/tokens`, and `@ten4seven/icons`                                                         |
| New local tokens / raw color literals                  |      0 | Static audit of both consumer stylesheets                                                                                               |
| Raw external icon/provider imports                     |      0 | Static audit; consumers use `T7Icon` semantic names                                                                                     |
| Business behavior regressions                          |      0 | Before/after Playwright behavior matrix                                                                                                 |
| Theme-axis failures                                    |      0 | 10 combinations across both consumers: light/dark, emerald/red/orange/blue/slate, soft/rounded/sharp, default/compact/comfortable/dense |
| Responsive overflow failures                           |      0 | Desktop and 390×844 checks in behavior/theme suites and live Browser QA                                                                 |

## Checkpoints and evidence

- System baseline checkpoint: `d3e9336` — `chore: checkpoint ten4seven design system before adoption proof`.
- Legacy consumer baseline: `13ec074`, followed by metadata cleanup `5146f89`.
- Migrated consumer checkpoint: `dc832c3` — `feat: prove ten4seven consumer adoption`.
- Before/after screenshots: `evidence/before/` and `evidence/after/`.
- Repeatable behavior and theme tests: `tests/behavior.spec.ts` and `tests/theme.spec.ts`.
- Repeatable retrieval and custom-code audit: `scripts/verify-adoption.mjs` via `pnpm test:adoption:static`.

## Acceptance and next gate

The proof is accepted only if both behavior flows remain intact, the retrieved APIs are implemented catalog entries, live surfaces are responsive and console-clean, and the gap ledger does not hide unresolved core-system work. A full `PASS` additionally requires an independently created external consumer; this run therefore records `CONDITIONAL PASS` in `GATE_REAL_ADOPTION.md`.
