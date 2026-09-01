# Reference Drift Audit

Status: **PASS — no donor-driven runtime change justified**  
Verified: 2026-09-01

## Method

The audit compared rendered ten4seven routes with the inspected reference
principles. It evaluates whether useful original qualities remain present, not
whether any route looks like its reference.

| Test                                                          | Current ten4seven evidence                                                                                                                                                                                                       | Decision                                                                                                                                                                                                                        |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HeroUI: mature controls and interaction confidence            | Component Lab renders one canonical form/overlay/data QA surface. Existing tests cover custom Select, Combobox, menus, popovers, drawers, modals, focus restore, Escape, disabled options, and reduced motion.                   | **PASS.** Preserve the canonical implementations; no HeroUI dependency or visual imitation is appropriate.                                                                                                                      |
| Hero Native: touch-safe compact ergonomics                    | Range inputs preserve compact tracks with larger physical hit geometry; filter-chip removal, carousel controls, mobile nav, public actions, dialog/drawer bounds, and table scroll ownership are covered in the hardening suite. | **PASS.** The mobile quality objective is addressed by ten4seven controls, not native-pattern copying.                                                                                                                          |
| Minimal UI: enterprise composition discipline                 | Operations Tracker retains a compact sidebar, task-first title/actions, KPI strip, milestone flow, filters, and a table with local horizontal scroll ownership.                                                                  | **PASS.** Density is operational rather than card-marketplace density.                                                                                                                                                          |
| AAPM operational principle: actionable data before decoration | Operations uses status, owner, due action, and queue state as its primary visual hierarchy. The mobile shell shows one product identity and keeps the work queue coherent.                                                       | **PASS.** No dashboard-only visual ornament was added.                                                                                                                                                                          |
| AAPM Academy: strong branded art direction                    | The `aapm-academy` proof changes split composition, whitespace, media prominence/treatment, surface mood, editorial display character, and action emphasis while retaining the same canonical authentication recipe.             | **PASS with bounded fixture note.** The proof deliberately uses consumer-owned abstract media rather than copied documentary poultry photography. That proves architecture without falsely claiming an AAPM product recreation. |
| shadcnblocks: public composition breadth                      | Public Showcase uses a composed hero, navigation map, content, product, testimonial, pricing, and CTA blocks; Ebook Store uses a distinct catalog/filter composition.                                                            | **PASS.** Both routes have distinct roles and do not become a generic block marketplace.                                                                                                                                        |
| GetPress: content/commerce task structure                     | Ebook Store gives search, category, author, price, availability, sort, grid/list switch, cover ratio, metadata, and cart actions clear ownership.                                                                                | **PASS.** It remains content-first and visibly separate from the operations shell.                                                                                                                                              |
| Ten4seven: one independent system                             | Theme Studio controls named semantic roles; Components and Blocks use canonical contracts; BrandProfile coordinates art direction without changing primitive anatomy.                                                            | **PASS.** No local primitive fork, raw donor dependency, or second theme system found.                                                                                                                                          |

## Meaningful drift decisions

| ID    | Observation                                                                                             | Severity | Ownership                            | Disposition                                                                                                                                                                                          |
| ----- | ------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RD-01 | The AAPM Academy proof does not use the staging site's documentary poultry image or exact product copy. | None     | Consumer content/media               | **Intentional.** Media and editorial content are consumer-owned slots. Copying donor photography would violate provenance and would turn a design-system proof into a product clone.                 |
| RD-02 | The Public Showcase is a system-facing composition, not a branded Academy marketing page.               | None     | Public Showcase consumer composition | **Intentional.** Its preview, typography, and section mapping communicate system capability. Brand-specific art direction belongs in BrandProfile proof/consumer media, not the generic system home. |
| RD-03 | Minimal/HeroUI expose broader example catalogs than the bounded ten4seven catalogue.                    | P3       | Documentation/coverage roadmap       | **No component-count response.** New components require a repeated real capability gap; catalog breadth alone is not evidence of a missing canonical primitive.                                      |
| RD-04 | Local AAPM kit pages were not browser-rendered because `file://` access is prohibited.                  | P3       | Research evidence                    | **Recorded limitation.** Readme, local visual asset, and public staging login evidence were used without bypassing browser policy.                                                                   |

## Explicit no-change decisions

- Do not add AAPM-specific primitives, copy staging login anatomy, or package its
  media as a ten4seven runtime asset.
- Do not alter ten4seven controls to resemble HeroUI when their actual state,
  accessibility, and interaction contract is already canonical and tested.
- Do not turn Public Showcase into a commercial template page merely because
  donor block libraries contain more variants.
- Do not widen operational chrome or reduce data density solely to mimic a
  general dashboard reference.
- Do not add a raw-color or per-page visual exception to approximate donor
  palettes; semantic ThemeProfile and BrandProfile roles remain authoritative.

## Result

The inspected original lineage remains visible in ten4seven through principles:
calm component refinement, mobile-safe geometry, operational task fitness,
compositional breadth, content-first commerce, and brand-capable expression.
The system remains distinctly ten4seven rather than a HeroUI fork, Minimal
clone, shadcn template catalog, or AAPM-only product system.
