# Theme Studio verification ledger

Date: 2026-08-26

The handoff explicitly prohibits generated mockups as the core design source. The acceptance reference for this phase is therefore the supplied AAPM token/component architecture plus the Phase 4 Gate B requirements, not a generated concept image.

## Target flow

`http://127.0.0.1:4173/` → change palette/radius/density/typography/appearance → inspect the six proof surfaces → open the modal → dismiss with Escape.

## Comparison ledger

| Check              | Source evidence                                                                                               | Render evidence                                                                                                           | Result / fix                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Semantic surfaces  | AAPM separates background, surface, subtle, muted, raised, foreground, border, and focus roles.               | Cards, controls, table, sidebar, and modal all use `--t7-*` semantic variables.                                           | Pass.                                            |
| Declared density   | AAPM treats density as a page/system property and changes rows 52 → 44 → 36px without making type unreadable. | The DataTable row token changed from 44px to 36px while labels remained legible.                                          | Pass.                                            |
| Radius family      | AAPM uses hierarchical control/base/panel/card/shell radii.                                                   | Soft card radius resolved to 18px; sharp proof resolved to 12px and modal/sidebar controls updated with the same profile. | Pass.                                            |
| Typography roles   | AAPM uses role-based type hierarchy and tabular numeric UI.                                                   | Modern Inter fallback changed to mono profile; numeric `476` and axis values retain tabular treatment.                    | Pass.                                            |
| Icon family        | AAPM uses semantic names with Solar as the canonical family and no production CDN.                            | 18 selected bodies are generated from local `@iconify-json/solar`; proof uses only semantic `T7Icon` names.               | Pass.                                            |
| Appearance/palette | Gate B requires light/dark and green → blue global adaptation.                                                | Playwright observed `148 54% 34%` → `214 82% 48%` and `data-theme-appearance` light → dark with no local edits.           | Pass.                                            |
| Responsive layout  | AAPM replaces the desktop sidebar with a mobile task-oriented navigation treatment.                           | 390×844 screenshot has no horizontal overflow after fixing the mobile nav selector.                                       | Pass; fixed `.studio-nav-item` → `.t7-nav-item`. |
| Overlay behavior   | Overlay primitives need Escape, focus, and modal semantics.                                                   | Dialog opened by button, received focus, and closed with Escape; no console errors.                                       | Pass.                                            |

## Above-the-fold copy diff

No generated concept copy was accepted for this phase. Visible copy is intentionally limited to the Theme Studio proof: `Theme Studio`, `Global controls`, `Active profile`, `Component proof`, the five axis labels, and the six component names. No unapproved marketing claim, hero eyebrow, or fake metric was added; `476` is the supplied AAPM manifest token count shown as proof data.

## Intentional deviations

- AAPM brand assets, farm imagery, Indonesian domain copy, and APPI visuals remain outside generic core per the extraction map.
- The proof uses a generic emerald default and demonstrates blue/violet/slate profiles; AAPM green is not mandatory.
- Only the six Gate B surfaces are implemented in this first proof. The broader 76-entry AAPM component inventory remains a migration ledger, not a copied component dump.

## Evidence

- Playwright fallback was used because the Browser plugin was not available in this session.
- Desktop: 1440×1000.
- Mobile: 390×844.
- Console/page errors: none.
- Production build: Vite output completed successfully.
