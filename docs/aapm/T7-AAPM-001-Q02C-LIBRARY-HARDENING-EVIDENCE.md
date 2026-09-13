# T7-AAPM-001-Q02C — Canonical Library Surface Hardening Evidence

Status: IMPLEMENTED / EVIDENCE RECORDED  
Mode: BOUNDED-WIDE  
Risk: R2 — shared Design System surface  
Repository: `fahziputraj/ten4seven-ui`  
Checkout: `D:\SA\ten4seven-ui`

## 1. Scope, preconditions, and design method

Q02C hardens the canonical Ten4Seven Library surfaces only:

- `/tokens`;
- `/components`, its family indexes, and component detail routes;
- `/blocks` and block detail routes;
- `/icons`;
- `/recipes` and recipe detail routes;
- the related Library discovery path represented by the design-system navigation
  and cross-links between those surfaces.

The accepted upstream evidence was read before mutation:

- [AGENTS.md](../../AGENTS.md) — repository and contract-plane instructions;
- [README.md](../../README.md) — repository orientation;
- [T7-AAPM-001-Q01-CURRENT-TARGET-FIT.md](T7-AAPM-001-Q01-CURRENT-TARGET-FIT.md);
- [T7-AAPM-001-Q02-CONTRACT-PLANE-EVIDENCE.md](T7-AAPM-001-Q02-CONTRACT-PLANE-EVIDENCE.md);
- [T7-AAPM-001-Q02A-SURFACE-MATURITY-QUALITY-BAR.md](T7-AAPM-001-Q02A-SURFACE-MATURITY-QUALITY-BAR.md);
- [T7-AAPM-001-Q02B-STUDIO-HARDENING-EVIDENCE.md](T7-AAPM-001-Q02B-STUDIO-HARDENING-EVIDENCE.md).

Q02B ended `PASS WITH CONSTRAINTS FOR Q02C`, so the Q02C precondition was
satisfied. Q02C did not execute Q02D.

The applied design method was:

> Business or user intent → interaction model → information architecture →
> screen or pattern → component contract → semantic tokens → theme/profile →
> final composition.

This matters because the Library is a retrieval and comprehension product, not
a gallery of arbitrary cards. The hardening decisions below deliberately use
flat documentation composition, list-like comparison, semantic filters,
meaningful preview cards, direct cross-navigation, and split detail layouts
where those models best express the user task. A component was reused only
after the information model was selected.

The visual/product references used for taste were the Q02A quality bar and the
Publishing Store as a generic benchmark for hierarchy, rhythm, density,
surface restraint, responsive continuity, and polish. Publishing Store business
meaning was not copied into the Library.

## 2. Repository coordinates and dirty-state boundary

Coordinates recorded before Q02C mutation:

| Coordinate                         | Observed value                             |
| ---------------------------------- | ------------------------------------------ |
| Branch                             | `feat/icons-aapm-iconify-expansion`        |
| HEAD                               | `2bf29ad2e250edc3c70b63a0e34e3f4da3d72e2a` |
| Local runtime used for rendered QA | `http://localhost:4173/`                   |
| Q02 gate                           | `PASS WITH CONSTRAINTS FOR Q03`            |
| Q02A gate                          | `PASS WITH CONSTRAINTS FOR Q02B`           |
| Q02B gate                          | `PASS WITH CONSTRAINTS FOR Q02C`           |

The pre-existing `git status --short` boundary was recorded before Q02C as:

```text
 M apps/playground/src/App.tsx
 M apps/playground/src/app.css
 M apps/playground/src/component-proofs.tsx
 M apps/playground/src/library-explorers.tsx
 M apps/playground/src/reference-harness.tsx
 M generated/agent-index.json
 M generated/index.json
 M generated/ownership-rules.json
 M packages/agent/generated/agent-index.json
 M packages/agent/generated/index.json
 M packages/agent/generated/ownership-rules.json
 M packages/agent/src/index.ts
 M packages/agent/src/node.d.mts
 M packages/agent/src/node.mjs
 M packages/agent/src/retrieval.d.mts
 M packages/agent/src/retrieval.mjs
 M packages/agent/src/runtime.d.mts
 M packages/agent/src/runtime.mjs
 M packages/contracts/src/canonical.ts
 M packages/contracts/src/index.ts
 M packages/contracts/src/types.ts
 M scripts/generate-contract-projections.mjs
 M scripts/verify-contracts.mjs
 M tests/visual-regression.spec.ts-snapshots/component-lab-desktop-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/component-lab-mobile-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/component-lab-narrow-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/component-lab-tablet-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/component-lab-wide-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/theme-studio-desktop-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/theme-studio-mobile-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/theme-studio-narrow-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/theme-studio-tablet-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/theme-studio-wide-chromium-win32.png
 M tests/workbench-interaction.spec.ts
?? docs/aapm/T7-AAPM-001-Q02-CONTRACT-PLANE-EVIDENCE.md
?? docs/aapm/T7-AAPM-001-Q02A-SURFACE-MATURITY-QUALITY-BAR.md
?? docs/aapm/T7-AAPM-001-Q02B-STUDIO-HARDENING-EVIDENCE.md
?? generated/platform-neutral.json
?? packages/agent/generated/platform-neutral.json
?? packages/contracts/src/platform-neutral.ts
```

That boundary contains the Q02 contract-plane work and the Q02B Studio work.
It was preserved. Q02C did not reset, clean, stage, commit, push, publish,
merge, regenerate, or normalize those entries. In particular, the dirty
contract and generated files remain user-owned and are not attributed to this
queue.

The current status also contains the Q02C Library source, test, and visual
evidence changes listed in Section 7, plus the same pre-existing entries. The
local Vite runtime remains available for the user to inspect at
`http://localhost:4173/`.

## 3. Complete discovered surface inventory used by Q02C

The complete repository inventory and maturity map remains authoritative in
[Q02A Section 3](T7-AAPM-001-Q02A-SURFACE-MATURITY-QUALITY-BAR.md#3-complete-discovered-surface-inventory).
The following is the Q02C working inventory and classification boundary:

| Discovered surface               | Route or route family                                                                      | Classification      | Q02C disposition                                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------ | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| Theme Studio                     | `/theme-studio`                                                                            | `PRIMARY`           | Upstream Studio evidence and page grammar only; not mutated by Q02C.                                            |
| Component Lab                    | `/component-lab`                                                                           | `PRIMARY`           | Upstream Studio evidence and page grammar only; not mutated by Q02C.                                            |
| Tokens                           | `/tokens`                                                                                  | `PRIMARY`           | Hardened as semantic foundation inspection and learning surface.                                                |
| Components                       | `/components`                                                                              | `PRIMARY`           | Hardened as canonical component discovery and contract index.                                                   |
| Component family indexes         | `/components/:family`                                                                      | `PRIMARY`           | Preserved as the browse path; shared header and discovery grammar applied.                                      |
| Component detail routes          | `/components/:component`                                                                   | `PRIMARY`           | Preserved as documentation and decision surfaces; detail overflow and contract links verified.                  |
| Blocks                           | `/blocks`                                                                                  | `PRIMARY`           | Hardened as expressive composition catalog with a meaningful specimen grid and hierarchy links.                 |
| Block detail routes              | `/blocks/:block`                                                                           | `PRIMARY`           | Preserved as composition-contract documentation with live preview and related navigation.                       |
| Icons                            | `/icons`                                                                                   | `PRIMARY`           | Hardened as semantic icon retrieval, intent filtering, and theme-aware inspection.                              |
| Recipes                          | `/recipes`                                                                                 | `PRIMARY`           | Hardened as composition-contract retrieval with profile filtering and low-noise list comparison.                |
| Recipe detail routes             | `/recipes/:recipe`                                                                         | `PRIMARY`           | Preserved as guidance for pattern selection, roles, flow, and relationships.                                    |
| Browse Library                   | No separate pathname; represented by Library navigation, family indexes, and detail routes | `PRIMARY`           | No new route invented. Existing canonical route family remains the Browse experience.                           |
| Publishing Store / Ebook Store   | `/ebook-store`                                                                             | `QUALITY_REFERENCE` | Read-only visual benchmark; no business-specific components or meaning promoted.                                |
| Operations Tracker               | `/operations-tracker`                                                                      | `LAB_PROOF`         | Not modified; process proof only.                                                                               |
| Operational Patterns             | `/operational-patterns`                                                                    | `LAB_PROOF`         | Not modified; operational-density proof only.                                                                   |
| Public Showcase                  | `/public-showcase`                                                                         | `LAB_PROOF`         | Not modified; public composition proof only.                                                                    |
| Farm Synthetic                   | `/farm-synthetic-proof`                                                                    | `LAB_PROOF`         | Not modified and not promoted to Farm UX.                                                                       |
| Auth · Neutral                   | `/brand-proof/auth-neutral`                                                                | `LAB_PROOF`         | Not modified; profile-expression proof only.                                                                    |
| Auth · Academy                   | `/brand-proof/auth-aapm-academy`                                                           | `LAB_PROOF`         | Not modified; profile-expression proof only.                                                                    |
| Warehouse compatibility alias    | `/warehouse-inventory`                                                                     | `LEGACY`            | Not modified; refresh-safe compatibility route only.                                                            |
| Separate Browse Library pathname | No `/browse-library` route discovered                                                      | `UNKNOWN`           | No route or authority inferred.                                                                                 |
| Production Farm adoption surface | Not present as an authoritative Ten4Seven route                                            | `UNKNOWN`           | Current Farm P1 UI, accepted business contracts, AAPM Brand, and hardened Ten4Seven remain the target boundary. |

The inventory is deliberately not a promotion ladder. A rendered proof can
show a pattern without becoming the canonical owner of that pattern.

## 4. Interaction-model and information-design decisions

The following decisions are the central product-design evidence for Q02C.

| Surface / user problem                                                 | Selected model                                                                                                                                                                         | Why this expresses the problem                                                                                                                                                                                                                           | Plausible alternatives rejected                                                                                                                                                                         |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tokens: understand semantic foundations and compare token families     | Flat, sectioned inspection canvas with family anchors, profile context, swatches, lines, tables, and a bounded chart where the token question benefits from trend/relationship reading | The user is inspecting meaning and cause/effect, not choosing among business objects. Typography and spacing keep the token relationship visible without a card wall.                                                                                    | KPI-card dashboard would imply operational metrics; a dense raw variable table would hide semantics; a kanban would invent workflow.                                                                    |
| Components: find a canonical component and compare contracts           | Searchable catalog with family anchors, readable rows, metadata, and a detail split between preview/contract and a persistent “On this page” rail                                      | Component retrieval is a comparison and comprehension task. Rows keep repeated contract metadata scannable; detail pages support progressive disclosure without losing context.                                                                          | A tile/card wall would prioritize decoration and image recognition over API/state comparison; tabs would hide relationships; a board would have no user-task justification.                             |
| Blocks: discover expressive reusable composition                       | Search/filter plus a responsive specimen-card grid, with a direct composition-hierarchy rail                                                                                           | A block is a visual section object, so a preview is meaningful containment. The rail makes Foundations → Components → Patterns → Blocks → Recipes visible as actual navigation.                                                                          | A table would under-express visual composition; a purely flat list would make live previews harder to compare; drag-and-drop is not needed because the catalog is retrieval, not composition authoring. |
| Icons: retrieve a semantic asset and inspect its visual role           | Semantic search, intent/category filters, icon tiles with local copy affordance, theme-aware preview, and a bounded family view                                                        | The user needs the right meaning and name, then a quick visual check. Semantic names remain primary; provider implementation remains behind the contract.                                                                                                | A raw provider-name browser would expose the wrong abstraction; drag-and-drop would add complexity without an ordering task; an unbounded icon wall would create noise.                                 |
| Recipes: choose a reusable composition approach                        | Search + profile filter + dense list of recipe contracts, then a detail flow with roles, references, and guidance                                                                      | Recipe selection benefits from side-by-side textual comparison and explicit pattern intent. The route can explain when to use a table, list, board, timeline, chart, upload, or master-detail model without pretending to execute the business workflow. | Cards would weaken comparison; a kanban or stepper would misrepresent a recipe as an active business process; a decorative chart would answer no user question.                                         |
| Detail documentation: understand a contract without losing orientation | Split main/aside documentation composition, API table, state/accessibility/token evidence, related links, and local anchors                                                            | The contract stays readable while the preview supports understanding. Persistent context is more useful than a modal for a documentation route.                                                                                                          | A modal or drawer would make long-form contract reading fragile and hide stable URLs; a single long undifferentiated column would weaken retrieval.                                                     |
| Narrow navigation and QA access                                        | Existing mobile navigation drawer; the floating reference-QA trigger is hidden on narrow Library and Studio shells and remains reachable from the drawer                               | A fixed QA control covering catalog rows is a competing action. The drawer is the established responsive composition and retains access without occluding the task.                                                                                      | A second mobile navigation system would fragment the shell; leaving the overlay in place would trade discoverability for content obstruction.                                                           |
| Motion and state change                                                | Existing canonical motion roles only; no new local animation or timing model                                                                                                           | Q02C is a documentation/discovery hardening pass. Motion is useful only for continuity, focus, filtering feedback, and overlay transitions already owned by canonical components.                                                                        | Decorative entrance animation would slow retrieval and add no comprehension; custom keyframes would bypass the shared reduced-motion contract.                                                          |

The rule applied throughout was: cards communicate meaningful grouping,
preview, interactivity, or containment; borders and dividers communicate
structure; a flat canvas plus type and spacing is preferred when the task is
reading or comparing contracts.

## 5. Before/after route assessment

No numeric scores are invented. The assessment is qualitative and tied to the
rendered routes, source contracts, and browser evidence.

| Route surface           | Before Q02C                                                                                                                                                                         | After Q02C                                                                                                                                                                                                     | Evidence and remaining boundary                                                                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tokens                  | Foundation content was useful but its route grammar was less clearly connected to the Library family; route context and token-family orientation were weaker than the page content. | Uses the shared `LibraryPageHeader` grammar with semantic overline, title, description, active-profile/count metadata, and the existing token inspection composition.                                          | Visual baselines cover desktop, wide, tablet, mobile, and narrow. Token runtime behavior and the existing chart/profile semantics remain intact.              |
| Components overview     | Catalog was already functional, but route framing and recovery affordance were less consistent; no-result behavior did not have an explicit canonical recovery path.                | Searchable canonical catalog has a stable header, family navigation, readable rows for comparison, match count before truncation, and `EmptyState` plus “Clear search” recovery.                               | `catalog-integrity` covers search/no-result/recovery and route safety. Rows remain intentionally flatter than preview cards.                                  |
| Component families      | Family routes provided the taxonomy but were not fully aligned to the same Library header grammar.                                                                                  | Family routes use the same context/title/description/count grammar while preserving deterministic family URLs, anchors, and the established mobile drawer.                                                     | Existing family slugs and compatibility aliases remain unchanged.                                                                                             |
| Component details       | Detail contracts already contained valuable purpose/API/state/token evidence, but route framing and metadata could feel disconnected from the overview.                             | Detail pages use the Library grammar, maturity/status clarity, split documentation composition, live preview, API table, `On this page`, related links, and stable route navigation.                           | `/components/date-time-input` was additionally checked at 390px for horizontal overflow. Business and persistence behavior remain out of scope.               |
| Blocks                  | Visual specimens were the right basic model, but the relationship between block previews and lower-level composition could be easier to traverse.                                   | Keeps meaningful specimen cards and adds a semantic hierarchy navigation rail with actual links to Tokens, Components, Patterns, Blocks, and Recipes; filter framing is consistent.                            | Existing block live-preview and detail-contract tests remain green. No new block business meaning was introduced.                                             |
| Icons                   | Semantic icon discovery and theme-aware rendering were present, but no-result communication and filter grouping were less explicit.                                                 | Search/category groups are semantic, no-result uses canonical `EmptyState`, and the icon surface remains a retrieval-first grid with local copy affordance.                                                    | Icon library browser tests cover family cohesion, search, copy, custom paint, and no horizontal overflow. Raw provider strings remain hidden behind `T7Icon`. |
| Recipes                 | The direct list was low-noise and useful, but discovery did not expose profile filtering and no-result recovery as clearly as the contract allowed.                                 | Keeps the direct-to-canvas list, adds search/profile filters with pressed semantics, accurate filtered count, `EmptyState` recovery, and shared route header/detail grammar.                                   | The list remains intentional: recipe comparison is textual/contractual, not a visual-card or process-board task.                                              |
| Cross-Library discovery | Relationships existed through links, but the route family could read as several adjacent pages rather than one product.                                                             | Shared header, count/meta grammar, hierarchy links, related links, semantic filters, recovery states, and stable mobile navigation create one recognizable Library product without inventing a second catalog. | The typed/generated Q02 contract plane remains the source of truth; the page is still a projection.                                                           |

### 5.1 Cross-route quality dimensions

| Required dimension               | Q02C evidence-based judgment                                                                                                                                                                                                                                                                                                |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hierarchy                        | One route-level `PageHeader` grammar now establishes context, title, description, and metadata before Library content. Detail pages keep preview subordinate to contract evidence.                                                                                                                                          |
| Navigation clarity               | Family anchors, hierarchy links, related component/block/recipe links, deterministic URLs, and the existing mobile drawer provide direct retrieval paths. No second mobile navigation system was added.                                                                                                                     |
| Spacing and rhythm               | Shared header spacing and restrained sections create a common rhythm. Catalog rows remain compact; expressive blocks retain preview breathing room; documentation does not wrap every region in a card.                                                                                                                     |
| Typography hierarchy             | Overline/context, display/title, body explanation, metadata, and API/table text have distinct roles. Count and maturity metadata are supporting evidence rather than competing headings.                                                                                                                                    |
| Semantic color                   | Icons, focus, active/current links, status/maturity, token previews, and profile data continue to resolve through semantic theme contracts. No AAPM literals or route-specific business colors were added.                                                                                                                  |
| Surface/card treatment           | Blocks use cards because live visual specimens are meaningful objects. Components and Recipes use flatter rows because repeated contract comparison is the task. Detail API and relationship regions remain contained where containment improves scanability.                                                               |
| Density                          | The Library is information-dense enough for retrieval but avoids an operational dashboard treatment. Search/filter controls are grouped, counts are explicit, and whitespace separates conceptual levels.                                                                                                                   |
| Component consistency            | `PageHeader`, `T7Icon`, `EmptyState`, `Button`, `CatalogLink`, canonical tables, and existing token/component contracts are reused. Local CSS is composition-only or Library-specific exceptional layout.                                                                                                                   |
| Interaction affordance           | Search, profile/category filters, clear actions, current links, local copy, family anchors, and detail navigation expose their state. `aria-current` and `aria-pressed` communicate selection.                                                                                                                              |
| Loading/empty/error presentation | No-result and recovery states are now explicit for Components, Recipes, and Icons. Canonical component/state proofs continue to demonstrate loading, empty, disabled, progress, and error semantics. Static catalog routes have no network loading lifecycle; complete live loading/retry coverage remains a later concern. |
| Responsiveness                   | The Library recomposes at 1440, 1280, 768, 390, and 360px. Filters wrap or remain usable, hierarchy links become a horizontal rail where appropriate, detail pages remain readable, and mobile navigation uses the established drawer.                                                                                      |
| Accessibility                    | Targeted a11y, catalog, icon, block, and mobile navigation tests pass. Native headings, navigation groups, tables, buttons, labels, current/pressed states, focus paths, and focus restoration remain in use.                                                                                                               |
| Visual noise                     | Decorative QA overlays no longer cover narrow Library/Studio content. Saturated fills and cards remain tied to previews, semantic state, or grouping.                                                                                                                                                                       |
| Polish and coherence             | The route family shares grammar, alignment, metadata treatment, and responsive behavior while preserving the distinct visual job of foundations, contracts, expressive blocks, icons, and recipes.                                                                                                                          |
| Route-to-route consistency       | `/tokens`, `/components`, `/blocks`, `/icons`, and `/recipes` feel related without being forced into one template. Differences are explained by task and content type, not arbitrary styling.                                                                                                                               |

## 6. Shared page grammar and source-of-truth impact

### 6.1 Shared grammar introduced or reused

`LibraryPageHeader` is a small local route-composition wrapper in
[library-page-header.tsx](../../apps/playground/src/library-page-header.tsx). It
composes the canonical `PageHeader` and adds only Library-specific context:

- semantic overline/icon for the Library route family;
- route-level title and description;
- optional count, maturity, or active-profile metadata;
- optional route actions/children;
- shared class hooks for the Library route composition.

It is not a new primitive family and does not own business state. It keeps
route-level grammar in one place while leaving `PageHeader`, typography,
icons, buttons, tables, state surfaces, and tokens canonical.

The Library still follows:

`AppShell → design-system navigation → PageHeader → bounded Library content`.

### 6.2 Catalog, generator, and AI retrieval boundary

Q02C did not modify:

- `packages/contracts/src`;
- `generated/` or `packages/agent/generated/` projections;
- `packages/ai/catalog/components.json`;
- `packages/ai/catalog/blocks.json`;
- `packages/ai/catalog/icons.json`;
- `packages/ai/catalog/recipes.json`;
- contract-generation or projection scripts.

Rendered Library data remains a projection of the existing catalog model and
Q02 ownership decisions. The legacy catalog adapter remains an allowed
compatibility surface until a separately governed typed migration. Q02C did not
create a second catalog, rename identifiers, change route slugs, or alter the
AI retrieval contract.

The Library may teach component intent, state, tokens, accessibility,
responsive behavior, recipe choice, block composition, icon semantics, and
presentation-state meaning. It does not decide entitlement, permission,
authorization, tenant access, domain validation, persistence, accounting state,
Farm authority, or business lifecycle.

## 7. Exact Q02C change inventory

The following files contain Q02C work. Files marked “shared dirty file” already
contained unrelated Q02/Q02B work; that work was preserved and is not
re-attributed to Q02C.

| File                                                                         | Q02C change                                                                                                                                                                                   |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [library-page-header.tsx](../../apps/playground/src/library-page-header.tsx) | New local Library route-composition wrapper around canonical `PageHeader`.                                                                                                                    |
| [library-explorers.tsx](../../apps/playground/src/library-explorers.tsx)     | Shared headers, component/recipe/icon recovery states, recipe search/profile filtering, semantic filter groups, component metadata, and block composition-hierarchy links. Shared dirty file. |
| [token-foundations.tsx](../../apps/playground/src/token-foundations.tsx)     | Tokens route now uses the shared Library header grammar.                                                                                                                                      |
| [app.css](../../apps/playground/src/app.css)                                 | Library header/hierarchy/focus/current-link composition and narrow reference-QA suppression. Shared dirty file; Q02B Studio changes preserved.                                                |
| [catalog-integrity.spec.ts](../../tests/catalog-integrity.spec.ts)           | Recovery-state, composition-link, route, and narrow component-detail overflow coverage.                                                                                                       |
| [mobile-navigation.spec.ts](../../tests/mobile-navigation.spec.ts)           | Confirms the short mobile QA path remains reachable from the drawer after the narrow overlay suppression. Shared dirty file.                                                                  |
| `tests/visual-regression.spec.ts-snapshots/components-*`                     | Updated Library Components visual baselines.                                                                                                                                                  |
| `tests/visual-regression.spec.ts-snapshots/tokens-*`                         | Updated Library Tokens visual baselines.                                                                                                                                                      |
| `tests/visual-regression.spec.ts-snapshots/icons-*`                          | Updated Library Icons visual baselines.                                                                                                                                                       |
| `tests/visual-regression.spec.ts-snapshots/recipes-*`                        | Updated Library Recipes visual baselines.                                                                                                                                                     |
| This evidence file                                                           | Q02C evidence and gate.                                                                                                                                                                       |

No source-of-truth, package, dependency, route-registration, business, Farm,
or runtime-configuration file was changed by Q02C.

## 8. Responsive and rendered QA evidence

### 8.1 Automated visual matrix

The affected Library visual regression suite passed without snapshot updates
after the final changes:

```text
pnpm exec playwright test tests/visual-regression.spec.ts --grep "components|tokens|icons|recipes" --project=chromium --reporter=line
20 passed (44.9s)
```

The five tested viewports were:

| Viewport                      | Covered routes                     |
| ----------------------------- | ---------------------------------- |
| `1440 × 900` desktop          | Components, Tokens, Icons, Recipes |
| `1280 × 800` wide             | Components, Tokens, Icons, Recipes |
| `768 × 900` tablet            | Components, Tokens, Icons, Recipes |
| `390 × 844` mobile web        | Components, Tokens, Icons, Recipes |
| `360 × 800` narrow mobile web | Components, Tokens, Icons, Recipes |

### 8.2 Targeted rendered and interaction QA

The final targeted suite passed:

```text
pnpm exec playwright test tests/canonical-component-a11y-hardening.spec.ts tests/catalog-integrity.spec.ts tests/icon-library.spec.ts tests/expressive-blocks.spec.ts tests/mobile-navigation.spec.ts --project=chromium --reporter=line
24 passed (1.7m)
```

This includes:

- Components/Recipes/Icons no-result and recovery states;
- the Blocks composition-hierarchy links and current-page semantics;
- `/components/date-time-input` at `390 × 844` with a document overflow assertion;
- the mobile Library drawer and focus restoration path;
- canonical accessibility keyboard behavior;
- block live previews, block detail contracts, and public showcase responsive
  renders;
- Solar icon family search, copy behavior, theme-aware paint, and overflow;
- mobile navigation at `360 × 800`, `390 × 844`, and `768 × 900`.

The broader Library-focused run also passed 32 tests across catalog integrity,
icon library, expressive blocks, global foundation, and navigation closure.

Direct rendered inspection was performed at desktop and narrow widths for
`/blocks`, `/components/file-upload`, and the affected catalog surfaces. The
observed composition was:

- flat route header and contract rows for retrieval surfaces;
- meaningful live-preview cards only for expressive Blocks;
- horizontal composition-hierarchy navigation on narrow Blocks;
- readable API tables and detail-side navigation;
- visible search/filter grouping and no-result recovery;
- no fixed QA control occluding narrow catalog content.

Long-name and constrained-width evidence is represented by the known
`Date–Time Input` detail route at `390 × 844`, catalog row truncation/wrapping
rules, and the no-overflow assertions in the targeted suites. A synthetic
random-string stress fixture was not added because it would be test-only
behavior without a governed catalog contract.

## 9. Accessibility, focus, state, and motion evidence

- `PageHeader`, headings, navigation landmarks, tables, and buttons remain
  semantic rather than div-based lookalikes.
- Components, Recipes, and Icons use canonical `EmptyState` recovery surfaces;
  recovery actions are keyboard-operable.
- Recipe profile controls expose `aria-pressed`.
- Block hierarchy and current Library navigation expose `aria-current`.
- Icon category filtering is grouped with an accessible label.
- Mobile QA access moves into the existing design-system drawer rather than
  leaving a content-covering fixed trigger.
- The short mobile modal scenario verifies focus restoration to the drawer's
  “Open reference QA” action.
- No new local motion durations, keyframes, or animation runtime were added.
  Existing canonical motion and reduced-motion behavior remain the authority.
- The semantic contrast gate passed 284 recipe/mode pairs at WCAG AA 4.5:1;
  the lowest exact-source light standard accent foreground was 4.67:1.

The Library is mostly static documentation/catalog content, so it does not
pretend to prove network loading, retry, persistence, authorization, or domain
error behavior. Those states remain contract examples or later application
concerns where the Library cannot own the truth.

## 10. Verification results

| Command / check                     | Result     | Evidence boundary                                                                                                                                                          |
| ----------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm typecheck`                    | PASS       | TypeScript and package agent/playground checks completed after the Q02C source changes.                                                                                    |
| `pnpm build`                        | PASS       | Production build completed; Vite emitted only the existing large-chunk advisory.                                                                                           |
| `pnpm test:contrast`                | PASS       | 284 semantic recipe/mode pairs verified at WCAG AA threshold.                                                                                                              |
| Targeted Library/a11y/browser suite | PASS       | 24 tests passed; see Section 8.                                                                                                                                            |
| Library visual regression suite     | PASS       | 20 tests passed at five viewport classes; see Section 8.                                                                                                                   |
| `git diff --check`                  | PASS       | No whitespace errors. Git reported existing CRLF-to-LF warnings for dirty files; no normalization was performed.                                                           |
| `pnpm test`                         | CONSTRAINT | Existing component-token coverage test reports 863 scanned literal pixel measurements while the recorded report expects 862. Q02C did not regenerate the unrelated report. |
| `pnpm format:check`                 | CONSTRAINT | Repository-wide Prettier check reports 281 files. Q02C did not normalize unrelated formatting or line endings.                                                             |

The failing repository-wide checks are inherited constraints, not failures of
the Q02C Library browser or type/build verification. Their repair would cross
the queue's dirty-state and unrelated-work boundary.

## 11. Qualities to keep

- The direct-to-canvas Library reading experience for comparable contracts.
- Cards only where a visual block specimen or contained preview has meaning.
- The relationship between a live preview and the contract that explains it.
- Search-first retrieval with semantic names, readable metadata, and explicit
  no-result recovery.
- Detail pages with stable URLs, API/state/accessibility/token evidence, and
  related navigation.
- Theme-aware token and icon inspection rather than hard-coded visual samples.
- Recipe guidance that explains selection and alternatives without executing
  business workflow.
- The existing `AppShell`, design-system navigation, mobile drawer, and
  deterministic route behavior.
- Canonical components and tokens as the implementation vocabulary.
- The distinction between Foundation, Component, Pattern, Block, Recipe, and
  consumer/proof surfaces.
- The habit of selecting the user task and information model before selecting a
  component.

## 12. Implementation details that may adapt or refactor later

These are bounded follow-ups, not additional Q02C work:

- A future governed pass may migrate remaining legacy catalog adapters to typed
  contracts; it must update the typed source and regenerate projections rather
  than create another UI catalog.
- `LibraryPageHeader` can remain local until evidence shows that a broader
  generic documentation-shell contract is needed. Do not extract for folder
  cleanliness alone.
- If a future Library route needs sorting, pagination, bulk action, or column
  management, select `DataTable` only after that user task exists. The current
  catalog comparison problem does not require a data grid.
- If a future route authoring workflow introduces ordering or spatial
  composition, evaluate direct manipulation, drag-and-drop, canvas, or
  resizable panels from the workflow intent. The current Library is retrieval,
  not an authoring board.
- If a future Library surface handles real files, design the complete upload
  contract—selection, dropzone, validation, preview, progress, success,
  failure, retry, replacement, cancellation, and accessibility—in the owning
  application/recipe boundary. The current File Upload detail documents the
  client-side primitive and does not imply transport or persistence.
- Responsive data-table transformations and a separate named Browse Library
  route require their own information-architecture decision and evidence.

## 13. Explicit Farm Synthetic disposition

`/farm-synthetic-proof` remains `LAB_PROOF`. It is not a Q02C target, not a
quality endorsement, and not the target Farm UX.

The target Farm direction remains:

> Current Farm P1 UI + Farm business intent + hardened Ten4Seven + canonical
> AAPM Brand + accepted business contracts.

Nothing in the Library hardening promotes Farm Synthetic into Farm authority,
tenant access, accounting state, domain validation, operational persistence, or
production adoption.

## 14. Unresolved items and later-queue routing

| Unresolved item                                                     | Classification                                                            | Later routing                                                                                 |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Q02 repository-wide format drift (281 files)                        | Known inherited constraint                                                | Keep outside Q02C; address only through a separately bounded repository hygiene decision.     |
| Stale component-token coverage report (862 recorded vs 863 scanned) | Known inherited constraint                                                | Regenerate or reconcile only in its owning token-governance queue; not in Q02C.               |
| Uniform live loading/retry/error behavior for static Library routes | Not applicable to current static catalog ownership / partially unverified | Add only when a Library data lifecycle exists and its owning application contract is defined. |
| Separate `/browse-library` route                                    | Unknown                                                                   | Future IA decision; do not invent or infer it from current component family routes.           |
| Typed migration of legacy AI catalog adapters                       | Known contract-plane follow-up                                            | Future contract/generator queue; preserve current IDs and retrieval compatibility.            |
| Cross-profile quality calibration and proof/reference boundary      | Next governance step                                                      | Q02D. Publishing Store remains a quality reference, and proof surfaces remain evidence only.  |
| Production Farm UX and adoption                                     | Out of scope                                                              | Governed Farm/application work with current Farm P1 and accepted business contracts.          |

## 15. Current gate and next gate

Q02C is complete within its bounded scope. The Library routes are coherent,
responsive, keyboard-usable, source-of-truth preserving, and supported by
rendered evidence. The inherited repository-wide format and stale coverage
constraints are recorded and do not justify unrelated normalization in this
queue.

The next bounded queue is Q02D. Q02D must continue to treat Publishing Store
as a generic quality reference, preserve the PRIMARY / QUALITY_REFERENCE /
LAB_PROOF boundary, and keep Farm Synthetic out of the target Farm UX.

PASS WITH CONSTRAINTS FOR Q02D
