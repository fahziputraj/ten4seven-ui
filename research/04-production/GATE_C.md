# Gate C / C.1 — Production application proof

## Result

**Gate C structurally passed. Gate C.1 product-reference refinement passed:** deterministic routes, direct refresh, Ebook composition refinement, and explicit desktop/mobile renders are verified. The proof still uses fixture state rather than a backend.

## Evidence

| Question                                                | Result                                                                                                                                                                                                                                                |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Can enterprise and commerce use the same primitives?    | Yes. Both consume the same package-owned controls, typography roles, badges, icons, pagination, surfaces, and drawer.                                                                                                                                 |
| Can they use the same theme engine?                     | Yes. Both stayed inside one `Ten4SevenProvider`.                                                                                                                                                                                                      |
| Can palette change globally?                            | Pass: blue stress run propagated to both surfaces.                                                                                                                                                                                                    |
| Can density differ without local hacks?                 | Pass: compact stress run changed provider control/row geometry without page token overrides.                                                                                                                                                          |
| Can radius change globally?                             | Pass: rounded stress run propagated through shells, controls, tables, cards, and media placeholders.                                                                                                                                                  |
| Does typography remain coherent?                        | Pass: Inter Variable + `opsz`, semantic roles, and restrained weights remain shared.                                                                                                                                                                  |
| Are icons consistent?                                   | Pass: all screen icons resolve through the local semantic Solar registry; no raw provider strings in app code.                                                                                                                                        |
| Can AI retrieve both recipes without donor research?    | Pass: `pnpm t7ui find "inventory list"` and `pnpm t7ui find "ebook store catalog"` return the production recipes, implemented components, and domain icons.                                                                                           |
| Are the references directly addressable?                | Pass: `/theme-studio`, `/warehouse-inventory`, and `/ebook-store` open directly, preserve their page identity after refresh, and are documented in `AGENTS.md`/`llms.txt`.                                                                            |
| Does the Ebook recipe read as commerce rather than ERP? | Pass: search is primary, categories are a quiet browse rail, author/price/availability filters are secondary, sort/view stay compact, the rail becomes one mobile filter drawer, zero-cart status is removed, and action feedback is commerce-driven. |
| Are explicit reference renders responsive?              | Pass at `1440 × 900`, `390 × 844`, and `360 × 800` for both routes; each render had meaningful content and no horizontal overflow.                                                                                                                    |
| How many design-system gaps occurred?                   | 1 bounded donor gap event: AAPM Checkbox/Radio vocabulary was verified, then native accessible controls were normalized into `@ten4seven/ui`; no donor runtime was adopted.                                                                           |
| How much page-specific styling was needed?              | Layout, responsive composition, fixture media, and data formatting only; colors, radii, control geometry, typography, surfaces, and shadows stay token/component-owned.                                                                               |
| What remains?                                           | Fixture/backend integration, drawer focus restoration hardening, and future column-visibility policy.                                                                                                                                                 |

## Gate decision

The two surfaces are credible proof that ten4seven UI is not limited to an ERP-style screen. Gate C.1 is complete; stop foundation polishing and proceed to broader v1 only after the remaining fixture and overlay-hardening boundaries are intentionally scheduled.
