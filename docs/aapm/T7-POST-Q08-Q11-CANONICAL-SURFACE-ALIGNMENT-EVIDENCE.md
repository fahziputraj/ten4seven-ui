# T7 POST-Q08 Q11 — Canonical Surface Alignment Evidence

Status: executed Q11 only. Q12 was not started.

## 1. Scope and ownership

The user-authorized request was “Q11 Next”. The attached `Q11.md` was treated as the bounded execution specification for this turn; it was not treated as authority to begin Q12 or to change the canonical contract plane.

Q11 consolidates the human-facing Components library into visual family showrooms while preserving the existing canonical catalogs, generated projections, component detail routes, agent retrieval model, and Component Lab proof boundary.

The resulting ownership model is:

| Surface                         | Q11 role                                                                                   | Explicit non-role                              |
| ------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| `/components`                   | Concise family doorway and search entry point                                              | Not a second component catalog or QA lab       |
| `/components/{family}`          | Visual family showroom with live canonical specimens, state guidance, and API/detail links | Not a replacement for granular contract routes |
| `/components/{component}`       | Granular canonical contract, API, preview, and accessibility detail                        | Not removed or flattened into a family page    |
| `/component-lab`                | Stress, interaction, overlay, responsive, and state proof workbench                        | Not duplicated inside every family showroom    |
| `/tokens`                       | Foundation and token reference                                                             | Not merged into Components navigation          |
| `/theme-studio`                 | Runtime preference and recipe workbench                                                    | Not changed into a library directory           |
| `/blocks`, `/icons`, `/recipes` | Their existing catalog/detail responsibilities                                             | Not given another nested Components directory  |

No business logic, route permission, data contract, generated contract source, agent retrieval contract, or product shell behavior was intentionally changed by Q11.

## 2. Execution coordinates

- Repository: `D:\SA\ten4seven-ui`
- Branch: `feat/icons-aapm-iconify-expansion`
- HEAD at evidence capture: `2bf29ad2e250edc3c70b63a0e34e3f4da3d72e2a`
- Working tree: already materially dirty from earlier Q01–Q10 work; unrelated edits were preserved and not reset, cleaned, staged, committed, pushed, merged, or deployed.
- Node: `v22.23.2`
- pnpm: `11.22.0`
- Local runtime used for browser QA: `http://127.0.0.1:4173`
- Browser QA: Playwright Chromium through the existing `q11-shell` session; no new product browser behavior was inferred from the attached screenshots.

The Q11 implementation was limited to the human Components surface, its showroom styling, Q11 regression coverage, and this evidence document. The pre-existing dirty worktree includes generated catalogs, token/runtime work, shell work, and earlier evidence; those changes remain outside the Q11 change attribution.

## 3. Before-state information architecture

Before Q11, the Components landing surface repeated the same catalog through several layers:

- `Components` → `Common components` / a broad catalog list;
- `Components` → `Browse by family` → family route;
- `Components` → `Choose by responsibility` → another taxonomy view;
- `Components` → `Canonical component catalog` → contract rows;
- contract row → component detail page.

Representative pre-Q11 click paths were:

| Need     | Before path                                                                  | Problem addressed by Q11                                                                  |
| -------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Button   | Components → Common components/catalog → `/components/button`                | Required several competing directory/list layers before the visual relationship was clear |
| Forms    | Components → Browse by family → `/components/forms` → contract list → detail | Family was a text directory rather than a specimen-led comparison                         |
| Charts   | Components → Browse by family → charts family → contract list → detail       | Chart contracts were discovered as rows, not as a coherent signal/surface family          |
| Tables   | Components → Browse by family → tables family → contract list → detail       | Table contracts did not expose their family distinctions at the browsing layer            |
| Overlays | Components → Browse by family → overlays family → contract list → detail     | Anchored context and focused surfaces were not grouped by interaction model               |

The existing detail routes remain valid. Q11 removes the duplicated landing taxonomy; it does not remove the canonical contract layer.

## 4. Target information architecture

The new primary path is:

`/components` → search or one family chooser → `/components/{family}` → grouped live specimens → optional usage/accessibility guidance → canonical API/detail route.

The landing page now has one primary family navigation model: a 17-entry family chooser. Each chooser entry includes the family icon, concise purpose, canonical count, and direct route. It no longer renders the entire component preview catalog on the index page.

Family pages use a reusable `ComponentShowroom` that:

1. keeps the family heading and purpose concise;
2. optionally groups contracts by family-specific interaction model;
3. renders the real `ComponentPreview` fixture for every canonical contract;
4. exposes filtered catalog state chips without dumping the complete contract text;
5. links to the existing API/detail route;
6. keeps usage and accessibility guidance behind progressive disclosure; and
7. recomposes to one readable column at mobile widths.

## 5. Canonical family showroom matrix

Counts below are from the canonical `componentCatalog` projection after excluding aliases, not from a second Q11 manifest. The sum is 145 canonical components.

| Family route                            | Canonical count | Showroom mode | Family-specific grouping / composition                            | Live specimen and detail path             |
| --------------------------------------- | --------------: | ------------- | ----------------------------------------------------------------- | ----------------------------------------- |
| `/components/foundations`               |               3 | Stack         | Foundation contracts remain concise and vertically comparable     | `ComponentPreview` + `/components/{slug}` |
| `/components/actions`                   |               6 | Comparison    | Action controls                                                   | `ComponentPreview` + `/components/{slug}` |
| `/components/forms`                     |              27 | Grouped       | Text entry; Numeric entry; Choice and selection; Form composition | `ComponentPreview` + `/components/{slug}` |
| `/components/navigation`                |              16 | Grouped       | Wayfinding; Disclosure and command                                | `ComponentPreview` + `/components/{slug}` |
| `/components/layout`                    |               7 | Stack         | Layout contracts are read as structural composition               | `ComponentPreview` + `/components/{slug}` |
| `/components/surfaces`                  |               8 | Stack         | Surface contracts are compared without a second taxonomy          | `ComponentPreview` + `/components/{slug}` |
| `/components/data-display`              |              11 | Gallery       | Signals and records; People and ownership                         | `ComponentPreview` + `/components/{slug}` |
| `/components/tables`                    |               9 | Comparison    | Table foundations; Data workflows                                 | `ComponentPreview` + `/components/{slug}` |
| `/components/filtering-bulk-actions`    |               5 | Stack         | Filtering and bulk-action controls remain one bounded family      | `ComponentPreview` + `/components/{slug}` |
| `/components/overlays`                  |               8 | Sequence      | Anchored context; Focused surfaces                                | `ComponentPreview` + `/components/{slug}` |
| `/components/feedback-progress`         |              11 | Gallery       | Status and recovery; Progress and loading; Notifications          | `ComponentPreview` + `/components/{slug}` |
| `/components/date-time`                 |               6 | Stack         | Date and time controls remain contract-distinct                   | `ComponentPreview` + `/components/{slug}` |
| `/components/files`                     |               3 | Stack         | File contracts remain short and task-oriented                     | `ComponentPreview` + `/components/{slug}` |
| `/components/charts-data-visualization` |               7 | Gallery       | Chart signals; Chart surfaces                                     | `ComponentPreview` + `/components/{slug}` |
| `/components/media`                     |               4 | Stack         | Media contracts remain focused                                    | `ComponentPreview` + `/components/{slug}` |
| `/components/commerce`                  |               8 | Stack         | Commerce uses the same canonical primitives and family grouping   | `ComponentPreview` + `/components/{slug}` |
| `/components/patterns`                  |               6 | Stack         | Patterns stay compositions of canonical primitives                | `ComponentPreview` + `/components/{slug}` |

Forms intentionally does not use the same visual grouping as Actions or Charts: its 27 contracts are divided by input behavior so a user can narrow the decision before scanning specimens. Charts use signal/surface grouping; Overlays use anchored-context/focused-surface grouping; Feedback uses status/progress/notification grouping. This is the requested family-specific interaction model rather than one repeated card grid.

## 6. Route compatibility and deep links

- `componentFamilyPath(category)` remains the canonical family path builder.
- `componentPath(name)` remains the canonical component detail path builder.
- `routeFromPath` continues to resolve family routes and granular component routes.
- Existing family aliases remain accepted through the existing `familyBySlug` compatibility mapping, including legacy paths such as `/components/application`, `/components/tables-filtering`, and `/components/charts`.
- `/components/button` was browser-verified as a direct detail route with its Button API table, live preview, and an Actions breadcrumb link.
- The old family hash IDs remain on the landing chooser entries for compatible existing links; the primary visible navigation now points directly to family routes.
- Blocks composition links were updated to direct canonical family routes for primitives and patterns, avoiding a second directory-on-directory path.
- No generated projection or catalog decision manifest was manually duplicated or changed as part of the showroom implementation.

## 7. Search and Browse Library boundary

Search continues to query the canonical catalog fields and returns direct component detail links. A `button` search was browser-verified to expose the six related action contracts rather than forcing a user through the landing taxonomy.

Browse Library remains a global shell-level discovery affordance for cross-library navigation and command access. It is not repeated as a second primary directory inside `/components`; the Components landing page now owns only the family chooser and canonical component search. This keeps Browse Library useful without making it another route hierarchy.

## 8. Token and visual decisions

Q11 did not create a parallel visual language. Showroom layout and states consume the existing Ten4Seven token surface and the existing canonical component previews. The new styling uses composition classes and existing token-backed values for:

- surface, border, and focus treatment;
- radius and spacing;
- type roles;
- transition timing; and
- responsive breakpoints.

No raw local color, radius, control-height, typography, or second motion-runtime rule was introduced for the showroom. The CSS uses the canonical transition token (`--t7-transition-fast`) for the family chooser lift/focus behavior. Preview fidelity comes from `ComponentPreview`, not from handcrafted consumer duplicates.

The visual composition is deliberately restrained: family entries are compact navigation cards, showroom specimens are full-width comparison rows for action-heavy families, and gallery families use a controlled two-column layout that collapses at the intermediate/mobile boundary. Usage and accessibility copy is available through native disclosure instead of occupying the first reading layer.

## 9. Component Lab and Tokens boundary

Components now provides enough live visual context to compare canonical contracts, variants, and state metadata. It does not attempt to reproduce Component Lab’s stress fixtures, overlay ownership proofs, chart interactions, modal/drawer stress cases, or QA navigation matrix.

Component Lab remains the direct QA route from the landing role note. Tokens remains the foundation reference, and Theme Studio remains the runtime workbench. Browser checks confirmed these surfaces do not render `.component-showroom` content.

## 10. Accessibility and responsive checks

The family chooser uses a labelled navigation landmark and direct links. Each showroom uses an explicit `aria-label`, a semantic contract article, a real preview, visible detail links, and native disclosure for secondary guidance. The Q11 Playwright checks verified that the showroom contract and preview counts match, the detail links exist, and mobile composition has no document overflow.

Direct browser matrix against the local runtime:

| Viewport          | `/components`    | `/components/actions` | `/components/forms` | `/components/charts-data-visualization` | `/components/button` | `/tokens` | `/theme-studio` | `/component-lab` |
| ----------------- | ---------------- | --------------------- | ------------------- | --------------------------------------- | -------------------- | --------- | --------------- | ---------------- |
| 1440 desktop      | PASS, overflow 0 | PASS, 6 specimens     | PASS, 27 specimens  | PASS, 7 specimens                       | PASS                 | PASS      | PASS            | PASS             |
| 1024 intermediate | PASS, overflow 0 | PASS, 6 specimens     | PASS, 27 specimens  | PASS, 7 specimens                       | PASS                 | PASS      | PASS            | PASS             |
| 390 mobile        | PASS, overflow 0 | PASS, 6 specimens     | PASS, 27 specimens  | PASS, 7 specimens                       | PASS                 | PASS      | PASS            | PASS             |

The browser session reported zero console errors after the matrix. Q11-specific Playwright coverage passed 6/6 tests.

Rendered evidence captured during Q11:

- [Components family index — desktop](../../output/playwright/q11-components-index-desktop.png)
- [Actions showroom — desktop](../../output/playwright/q11-actions-showroom-desktop.png)
- [Forms showroom — desktop](../../output/playwright/q11-forms-showroom-desktop.png)
- [Forms showroom — mobile](../../output/playwright/q11-forms-showroom-mobile.png)
- [Charts and data showroom — desktop](../../output/playwright/q11-charts-showroom-desktop.png)

## 11. Verification ledger

| Check                                           | Result      | Evidence / constraint                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm --filter @ten4seven/playground typecheck` | PASS        | Targeted playground TypeScript check passed                                                                                                                                                                                                                                                                                      |
| `pnpm typecheck`                                | PASS        | Workspace TypeScript checks completed without reported errors                                                                                                                                                                                                                                                                    |
| `pnpm test`                                     | PASS        | Contract, token, package, and unit gates completed without a reported failure                                                                                                                                                                                                                                                    |
| `pnpm test:consistency`                         | PASS        | `Canonical consistency verified across 25 UI source files.`                                                                                                                                                                                                                                                                      |
| `pnpm test:ai`                                  | PASS        | `AI catalog verified: 29 recipes, 151 components, 12 expressive blocks, 122 semantic icons.` and cold-start references passed                                                                                                                                                                                                    |
| `pnpm build`                                    | PASS        | Playground production build completed; only existing chunk-size advisory was emitted                                                                                                                                                                                                                                             |
| Q11 targeted Playwright                         | PASS        | `6 passed`                                                                                                                                                                                                                                                                                                                       |
| `tests/catalog-integrity.spec.ts`               | PASS        | `6 passed`                                                                                                                                                                                                                                                                                                                       |
| Q11 workbench interaction                       | PASS        | `1 passed` for visual family chooser/showroom route behavior                                                                                                                                                                                                                                                                     |
| `pnpm test:e2e`                                 | CONSTRAINED | `206 passed, 67 failed`; failures are inherited visual/interaction baseline drift in the already-dirty Q01–Q10 surface set, plus expected Components visual baselines that now differ because the Q11 IA is intentionally changed. All six Q11 tests passed inside this run. No Q11 functional or overflow failure was reported. |
| `pnpm format:check`                             | CONSTRAINED | Exit 1 because Prettier reported 304 pre-existing files, including generated files, docs, legacy sources, and the already-dirty worktree. Q11 files were formatted individually; no repository-wide normalization was applied.                                                                                                   |
| `git diff --check`                              | PASS        | Exit 0; Git emitted existing CRLF/LF conversion warnings only                                                                                                                                                                                                                                                                    |
| Browser console error check                     | PASS        | 0 console errors in the final Q11 matrix                                                                                                                                                                                                                                                                                         |

The full E2E failures were not silently treated as Q11 passes. They remain a documented constraint because changing unrelated route baselines or normalizing the entire dirty worktree would exceed Q11’s safe scope. The Components screenshot baseline should be refreshed as part of the next governed visual-baseline decision before claiming a clean repository-wide E2E result.

## 12. Changed surface summary

Q11 implementation files:

- `apps/playground/src/library-explorers.tsx` — family chooser, reusable family showroom, family-specific grouping, progressive guidance, and direct detail links.
- `apps/playground/src/app.css` — token-backed family chooser and showroom composition/responsive styling.
- `tests/q11-canonical-surface-alignment.spec.ts` — six Q11 route, contract, search, responsive, and role-boundary tests.
- `tests/catalog-integrity.spec.ts` and `tests/workbench-interaction.spec.ts` — compatible assertions for the new canonical family doorway and showroom route behavior, preserving existing tests outside the Q11 path.
- `docs/aapm/T7-POST-Q08-Q11-CANONICAL-SURFACE-ALIGNMENT-EVIDENCE.md` — this evidence record.

No commit, push, merge, deploy, generated-contract rewrite, dependency install, or Q12 execution was performed.

## 13. Gate

PASS WITH CONSTRAINTS FOR Q12

STOP.
