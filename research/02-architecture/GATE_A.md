# Gate A — architecture consistency review

Status: **PASS for Phase 3 scaffold and Phase 4 theme-engine proof**.

| Question                                                     | Evidence                                                                                                                         | Answer                                                      |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Can palette change globally?                                 | ADR-003 and ADR-004: semantic variables are written at the provider root.                                                        | Yes.                                                        |
| Can radius change globally?                                  | Radius profiles map control/base/panel/card/shell variables.                                                                     | Yes.                                                        |
| Can density change globally?                                 | Density profiles map control, row, padding, and gap variables while preserving type size.                                        | Yes.                                                        |
| Can typography change globally?                              | Typography profiles map UI, display, mono, tracking, and line-height roles.                                                      | Yes.                                                        |
| Does component code depend on AAPM?                          | Extraction map places AAPM brand, domain nouns, and fixtures outside generic core.                                               | No.                                                         |
| Can icon family change centrally?                            | `@ten4seven/icons` owns the semantic registry and static glyph boundary.                                                         | Yes.                                                        |
| Can an AI locate a component without reading the whole repo? | `llms.txt`, package exports, co-located contracts, and generated inventory.                                                      | Yes for the current proof; expand contracts with migration. |
| Can AAPM visuals be expressed as a theme/preset?             | Semantic color, radius, density, typography, icon, and surface roles are represented; AAPM brand remains a future opt-in preset. | Yes, structurally.                                          |
| Are commercial sources isolated?                             | License matrix marks HeroUI Pro, Minimal, premium shadcnblocks, and Figma material reference-only.                               | Yes.                                                        |

## Gate decision

No material architecture or licensing blocker is unresolved for a re-authored token/theme proof. Continue autonomously to the independent monorepo scaffold. Full AAPM visual equivalence remains a later preset gate, not a reason to copy donor source.
