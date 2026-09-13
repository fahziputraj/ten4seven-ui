# T7-AAPM-001-Q02A — Surface Maturity and Publishing Store Quality Bar

Status: READY AFTER Q02 PASS / PASS WITH CONSTRAINTS  
Mode: STRICT / BOUNDED  
Risk: R1 — design-system evidence / governance  
Target repository: `fahziputraj/ten4seven-ui`  
Target checkout: `D:\SA\ten4seven-ui`  
Evidence date: 2026-09-10

This document is the authoritative surface-maturity map for the current
Ten4Seven repository. It establishes which surfaces are hardening targets,
which surface is the current generic quality reference, and which surfaces are
only laboratory, proof, or adoption evidence.

This is a documentation/evidence artifact only. No component, contract, token,
style, route, navigation, package, generated file, test, snapshot, dependency,
or runtime configuration was changed by Q02A.

The design judgment requirement is part of this quality bar. A surface is not
considered mature merely because it is visually clean or built from canonical
components. The assessment must also ask whether the interaction and
information-design method fits the human problem:

```text
Business / user intent
  -> interaction model
  -> information architecture
  -> screen / pattern
  -> component contract
  -> semantic tokens
  -> theme / product profile
  -> final composition
```

Cards, tables, forms, charts, borders, motion, and direct manipulation are
methods to select deliberately. They are not maturity signals by themselves.

## 1. Repository coordinates and dirty-state boundary

### 1.1 Coordinates captured before Q02A

| Coordinate                                        | Observed value                             |
| ------------------------------------------------- | ------------------------------------------ |
| Repository                                        | `fahziputraj/ten4seven-ui`                 |
| Checkout                                          | `D:\SA\ten4seven-ui`                       |
| Branch                                            | `feat/icons-aapm-iconify-expansion`        |
| HEAD                                              | `2bf29ad2e250edc3c70b63a0e34e3f4da3d72e2a` |
| Q01 gate                                          | `PASS WITH CONSTRAINTS FOR Q02`            |
| Q02 gate                                          | `PASS WITH CONSTRAINTS FOR Q03`            |
| Local runtime used for read-only route inspection | `http://127.0.0.1:4173/`                   |

The governing repository instructions were read before inspection:

- [AGENTS.md](../../AGENTS.md)
- [README.md](../../README.md)
- [Q01 current-target-fit evidence](T7-AAPM-001-Q01-CURRENT-TARGET-FIT.md)
- [Q02 contract-plane evidence](T7-AAPM-001-Q02-CONTRACT-PLANE-EVIDENCE.md)

### 1.2 Dirty-state boundary

The following status was present before the Q02A artifact was created. These
paths are treated as pre-existing Q02 work and are not part of Q02A:

```text
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
?? docs/aapm/T7-AAPM-001-Q02-CONTRACT-PLANE-EVIDENCE.md
?? generated/platform-neutral.json
?? packages/agent/generated/platform-neutral.json
?? packages/contracts/src/platform-neutral.ts
```

Q02A's only permitted repository artifact is this file:

```text
docs/aapm/T7-AAPM-001-Q02A-SURFACE-MATURITY-QUALITY-BAR.md
```

The temporary Playwright captures used for the visual pass are evidence
working material, not repository deliverables; they are removed before the
final dirty-state check. The local Vite process may remain running for user
inspection, but it is not a repository mutation.

The Q02 dirty-state boundary is preserved exactly. Q02A does not normalize
line endings, regenerate projections, stage files, commit, push, publish, tag,
merge, or execute Q02B.

### 1.3 Evidence method and limits

Read-only evidence came from:

- the route registry in [`apps/playground/src/playground-routes.ts`](../../apps/playground/src/playground-routes.ts);
- route composition in [`apps/playground/src/App.tsx`](../../apps/playground/src/App.tsx);
- the catalog model in [`apps/playground/src/catalog-model.ts`](../../apps/playground/src/catalog-model.ts);
- the typed/compact contract projections required by `AGENTS.md`;
- the full Q01 and Q02 evidence artifacts;
- the local rendered routes at desktop and narrow mobile widths;
- the canonical recipe catalog in [`packages/ai/catalog/recipes.json`](../../packages/ai/catalog/recipes.json);
- the documented theme rules in [`docs/THEMING.md`](../../docs/THEMING.md);
- read-only AAPM Brand/Design Foundation material in `D:\SA\AAPM_Ecosystem\docs\design-system\`;
- read-only current Farm P1 material in `D:\SA\aapm-farm-p1-seed\`.

Rendered inspection is strong evidence for composition, hierarchy, density,
responsive recomposition, visible states, and route boundaries. It does not by
itself prove keyboard behavior, screen-reader behavior, production data
authority, persistence, authorization, native/mobile parity, or all loading,
empty, and recovery paths. Those remain explicit acceptance obligations or
unknowns below.

## 2. Classification model

Classification describes authority and intended use. It is not a numeric visual
score and must not be converted into one.

| Classification      | Meaning in this map                                                                                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PRIMARY`           | Authoritative Ten4Seven design-system product or canonical Library surface. It is a hardening target and should teach reusable presentation knowledge.                                            |
| `QUALITY_REFERENCE` | A preferred quality benchmark for generic hierarchy, rhythm, polish, responsive behavior, and interaction refinement. It is not a universal shell, domain authority, or business-contract source. |
| `LAB_PROOF`         | A useful rendered or adoption proof that demonstrates composition, state, or consumer integration. Its existence is evidence, not a quality endorsement or authority transfer.                    |
| `LEGACY`            | A compatibility route, alias, or historical surface that must remain safe for existing links but is not a new design target.                                                                      |
| `UNKNOWN`           | A route, consumer, or authority boundary for which current repository evidence is insufficient to assign a stronger classification. Unknown is not permission to infer promotion.                 |

The classification is intentionally separate from the design judgment. For
example, a `LAB_PROOF` route may demonstrate a better process pattern than a
`PRIMARY` catalog route, while still not owning the business meaning or being
eligible as the target product surface.

## 3. Complete discovered surface inventory

The route source identifies the named Playground surfaces and the route families
below. The detail routes are included in the parent surface row so a future
agent does not mistake a detail page for a separate product authority.

| Discovered surface                     | Route or route family                                                                                                                                      | Primary user problem / archetype                                                                                  | Classification      | Evidence-based disposition                                                                                                                                                            |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Theme Studio                           | `/theme-studio`                                                                                                                                            | Authoring workbench: choose a language/profile, adjust runtime preferences, and inspect a live preview            | `PRIMARY`           | Harden as the canonical theme-authoring and design-judgment surface. The authoring/preview relationship is more important than any individual card or control.                        |
| Component Lab                          | `/component-lab`                                                                                                                                           | QA workbench and state sandbox for controls, form behavior, and interaction proofs                                | `PRIMARY`           | Harden as a system laboratory and contract-verification surface. Do not treat its fixture controls as production application UI.                                                      |
| Tokens                                 | `/tokens`                                                                                                                                                  | Token inspection, category filtering, active-profile understanding, and token-to-preview comprehension            | `PRIMARY`           | Harden as the semantic-token learning and inspection surface. It should explain how a token affects composition, not merely list variables.                                           |
| Components                             | `/components`                                                                                                                                              | Canonical component discovery, search, family navigation, and API/state orientation                               | `PRIMARY`           | Harden as the canonical primitive/pattern catalog entry point. Prefer retrieval clarity and contract evidence over a decorative card wall.                                            |
| Blocks                                 | `/blocks`                                                                                                                                                  | Expressive section discovery and preview for reusable blocks                                                      | `PRIMARY`           | Harden as a block composition catalog. Preview cards are justified for visual section objects, but metadata and boundaries must remain legible.                                       |
| Icons                                  | `/icons`                                                                                                                                                   | Semantic icon retrieval, category filtering, and theme-aware visual inspection                                    | `PRIMARY`           | Harden as the canonical icon discovery/usage surface. Semantic names and usage context outrank raw glyph volume.                                                                      |
| Recipes                                | `/recipes`                                                                                                                                                 | Route-level composition discovery, profile selection, and recommended pattern retrieval                           | `PRIMARY`           | Harden as the product-composition catalog. The existing direct-to-canvas list is a valuable low-noise information architecture.                                                       |
| Browse Library / family index          | `/components/:family`, including `/components/foundations`                                                                                                 | Browse a component taxonomy and compare canonical contracts                                                       | `PRIMARY`           | This is the canonical Library experience even though there is no separate `/browse-library` pathname. Preserve the family/detail relationship.                                        |
| Library detail routes                  | `/components/:component`, `/blocks/:block`, `/recipes/:recipe`; inspected examples include `/components/button`, `/blocks/hero-split`, and `/recipes/cart` | Understand purpose, anatomy, states, token references, accessibility, and recommended composition                 | `PRIMARY`           | Treat detail pages as documentation and decision surfaces, not production consumers. The preview must be subordinate to the contract it explains.                                     |
| Publishing Store / Ebook Store         | `/ebook-store`                                                                                                                                             | Public commerce discovery: browse, search, filter, sort, switch view, and understand an item before selection     | `QUALITY_REFERENCE` | Preferred generic quality benchmark. Reuse principles of hierarchy, rhythm, polish, and responsive discovery; do not copy bookstore business meaning into generic contracts.          |
| Operations Tracker                     | `/operations-tracker`                                                                                                                                      | Production-looking work queue with KPI context, stages, next actions, activity, and export affordances            | `LAB_PROOF`         | Keep as a useful process/workflow proof. Do not promote its domain language, fixture assumptions, or card composition into universal Ten4Seven authority.                             |
| Operational Patterns                   | `/operational-patterns`                                                                                                                                    | Deterministic control-tower reference for process workspace, readiness, load/route, receiving, and entity context | `LAB_PROOF`         | Keep explicitly labeled as reference data and not production ERP. It is evidence for process UI, decision workspace, exception, and operational density patterns.                     |
| Public Showcase                        | `/public-showcase`                                                                                                                                         | Public storytelling and system-adoption explanation through hero composition and UI illustration                  | `LAB_PROOF`         | Keep as public composition proof. It is not a private application shell or a universal page template.                                                                                 |
| Farm Synthetic                         | `/farm-synthetic-proof`                                                                                                                                    | Authorized consumer-boundary proof with synthetic Farm context, metrics, and safe failure messaging               | `LAB_PROOF`         | Keep as synthetic consumer evidence only. It is explicitly not the target Farm UX and must never become Farm business authority.                                                      |
| Auth · Neutral                         | `/brand-proof/auth-neutral`                                                                                                                                | Neutral brand-expression proof around a shared authentication recipe                                              | `LAB_PROOF`         | Keep as a brand/profile proof. It does not establish production identity, security, tenant, or authentication-provider behavior.                                                      |
| Auth · Academy                         | `/brand-proof/auth-aapm-academy`                                                                                                                           | AAPM Academy brand-expression proof using the same authentication recipe with stronger editorial media presence   | `LAB_PROOF`         | Keep as an adoption/profile proof. It should demonstrate profile variation without becoming AAPM Brand authority or a universal login template.                                       |
| Legacy warehouse alias                 | `/warehouse-inventory`                                                                                                                                     | Compatibility entry point for existing links to the Operations Tracker route                                      | `LEGACY`            | Preserve refresh-safe alias behavior. Do not use the alias as a new information-architecture or visual-design target.                                                                 |
| Unresolved direct Browse Library route | No separate `/browse-library` route was discovered; the Library is represented by the component family/detail route family                                 | Route naming and authority boundary                                                                               | `UNKNOWN`           | Do not invent a new route or classify a nonexistent surface. If a future product needs a named Library entry point, make that a separately bounded information-architecture decision. |
| Production Farm adoption surface       | Not present as an authoritative Ten4Seven route in this repository                                                                                         | Real Farm business workflow and authority                                                                         | `UNKNOWN`           | Current Farm P1 UI, accepted business contracts, canonical AAPM Brand, and hardened Ten4Seven remain the target boundary. Synthetic proof cannot establish production adoption.       |

### 3.1 Route-family evidence

The route resolver also exposes canonical component, block, recipe, and brand
proof route families. The inspected examples demonstrate the intended
distinction:

- `/components/foundations` is a flat contract-oriented family index;
- `/components/button` shows explicit availability, disabled, loading, and
  completed states alongside tokens and contract navigation;
- `/blocks/hero-split` shows a visual block preview with “on this page” anchors,
  recommended recipes, and a layer boundary;
- `/recipes/cart` presents composition anatomy and a reference graph rather than
  pretending the catalog page is a live cart;
- `/warehouse-inventory` resolves to the Operations Tracker and therefore has
  legacy compatibility meaning rather than an independent product surface.

This route-family model is a strength: it lets a human move from retrieval to
understanding without conflating a proof harness with a deployed consumer.

## 4. Evidence and design rationale by classification

### 4.1 `PRIMARY` — Ten4Seven system product

The primary surfaces are coherent when read as a system product: author the
language in Theme Studio, inspect tokens and components, discover blocks and
icons, and select recipes for a route-level composition. Their shared job is
not to own business truth. Their job is to make presentation choices
understandable, reusable, accessible, responsive, and composable.

Observed evidence and design judgment:

- **Theme Studio** uses an authoring-rail/preview-workbench model. That is a
  better fit than a static settings form because the user needs immediate
  cause-and-effect between profile choices and the composed surface. The
  current recipe-first language also establishes a useful hierarchy: select a
  starting language, then inspect appearance, density, contrast, motion, and
  advanced axes. Future hardening should preserve that sequence and avoid
  hiding the live preview behind an unnecessary modal or turning every control
  into a card.
- **Component Lab** uses a state-and-control workbench. It is the right model
  for proving input, date/time, select, range, loading, empty, error, progress,
  and chart behavior. It is not evidence that a production route should look
  like a test matrix. Lab controls should be grouped by the question being
  tested and should make state transitions observable.
- **Tokens** uses category filtering and token inspection. That is appropriate
  for a design-system learner who is moving from semantic intent to actual
  values. A token list without a visible consequence would be weaker; the
  active-profile and preview relationship should remain central.
- **Components** and **Browse Library** use retrieval-oriented flat lists and
  family/detail navigation. This is preferable to wrapping every contract in a
  marketing card because the user is comparing names, purpose, maturity, API,
  states, accessibility, and relationships. Search, filtering, and stable
  anchors are more valuable here than visual novelty.
- **Blocks** use previews and visual grouping because a block is a composition
  object. The card treatment is meaningful when it represents a reusable
  expressive section and exposes enough metadata to distinguish it from a
  generic component.
- **Icons** use semantic search and category filtering. The design goal is
  meaningful retrieval and safe use of semantic names, not a glyph-count race.
  Theme-aware previews are useful because icon contrast and visual weight are
  part of final composition.
- **Recipes** use a direct-to-canvas, low-noise catalog. This is particularly
  valuable for the Design Judgment Mandate: the recipe can explain whether the
  user problem calls for an entity list, master-detail, approval queue,
  process workspace, operational kanban, timeline, exception queue, or another
  model before an agent reaches for an existing component.
- **Detail routes** show that component, block, and recipe decisions can be
  documented with previews, anchors, states, tokens, and recommended
  relationships. This supports a documentation surface rather than making the
  Library pretend to be an application.

The primary family is therefore the hardening target, but its quality bar must
include interaction-model selection, alternative rejection, state coverage,
and responsive behavior—not only typography, color, or spacing.

### 4.2 `QUALITY_REFERENCE` — Publishing Store / Ebook Store

The Publishing Store is the strongest currently rendered quality reference for
generic product maturity. Its quality comes from a coherent public-commerce
composition:

- a compact public navigation layer establishes context before the catalog;
- the title and supporting copy establish the purpose of the page;
- search, filter, sort, and view controls are visible but subordinate to the
  discovery task;
- book cards are meaningful object containers because each card represents an
  item with cover, title, author, and selection affordance;
- whitespace and dividers separate hierarchy without surrounding every region
  with a heavy panel;
- the mobile composition reflows controls and product columns rather than
  merely shrinking a desktop grid;
- the visual treatment is polished and coherent without requiring enterprise
  sidebar navigation.

The Store is not:

- a universal Ten4Seven application shell;
- a Farm template;
- an ERP template;
- a source of AAPM Brand authority;
- permission, pricing, inventory, order, or accounting truth;
- evidence that every future surface should use product cards, hero copy, or a
  public navigation model.

The correct transfer is the generic quality principle. The business meaning,
content model, and public-commerce shell remain local to the Store.

### 4.3 `LAB_PROOF` — composition, process, consumer, and brand evidence

The lab/proof routes are valuable because they show how the system can be
composed, but their existence must not silently promote them.

- **Operations Tracker** demonstrates a process-oriented screen with KPI
  context, a staged work strip, next-action framing, activity logging, and
  export. That is stronger evidence than a flat metric dashboard when the user
  must understand work moving from signal to action. The stage strip should be
  evaluated as a process/status pipeline, not as five decorative colored cards.
  Any trend line or sparkline must answer a stated question about period,
  direction, or exception; decoration is not sufficient.
- **Operational Patterns** explicitly identifies deterministic reference data
  and “not production ERP.” Its control-tower, process-workspace, readiness,
  load/route, receiving, and entity-context examples are useful evidence for
  kanban/workboard, timeline/milestone, exception queue, split/detail, and
  decision-workspace methods. They do not own operational truth, permissions,
  accounting, or ERP contracts.
- **Public Showcase** demonstrates public storytelling: a hero, explanatory
  copy, primary action, and UI illustration. This is the appropriate method for
  introducing a system to a public audience. It should not be used as evidence
  that an internal workflow needs the same hero-first composition.
- **Farm Synthetic** demonstrates an authorized consumer boundary, a Farm
  context selector, a scenario selector, visible synthetic-data labeling, and a
  safe failure/retry message. Those are useful proof behaviors. The route
  explicitly states that there is no API or ERP connection and that AAPM
  production adoption is unverified. This is a boundary proof, not a Farm
  implementation.
- **Auth · Neutral** and **Auth · Academy** demonstrate a shared authentication
  recipe resolved through different product profiles. Desktop split composition
  and mobile stacked composition show that profile expression can change while
  the interaction contract remains recognizable. They do not prove production
  identity, tenant authorization, security, or provider integration.

### 4.4 `LEGACY` — compatibility alias

`/warehouse-inventory` is a refresh-safe legacy alias for Operations Tracker.
It should remain available for existing links. It should not receive an
independent redesign, duplicate navigation, or a parallel component family.

### 4.5 `UNKNOWN` — evidence that must not be inferred

No separate `/browse-library` route or authoritative production Farm consumer
route was discovered. The absence of a route is not evidence that a new route
should be created as part of Q02A. Similarly, rendered proofs do not establish
native mobile behavior, offline behavior, real API persistence, tenant
authorization, or Farm operational authority.

## 5. Cross-surface quality assessment

The following is a qualitative evidence map, not a scorecard. “Observed” means
visible in the current route pass or supported by source inspection. “Needs
proof” is an acceptance obligation, not a claim of failure.

| Quality dimension                      | Current evidence                                                                                                                                                                                                                                            | Design judgment / hardening implication                                                                                                                                                                            |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Hierarchy                              | Theme Studio, Library detail, Publishing Store, and Public Showcase each have clear route-level titles and supporting context.                                                                                                                              | Preserve one clear job per surface. Do not flatten an authoring workbench, catalog, commerce page, and workflow queue into one visual template.                                                                    |
| Navigation clarity                     | Canonical routes have deterministic paths. Library family/detail routes have anchors and related navigation. Public, private, and proof shells are visibly distinct.                                                                                        | Keep route-level navigation predictable. On mobile, collapse secondary navigation into the existing mobile pattern rather than introducing a second navigation system.                                             |
| Spacing and rhythm                     | Publishing Store is the strongest reference; Theme Studio and detail pages use deliberate section spacing; Operations uses denser workflow composition.                                                                                                     | Transfer rhythm principles, not a single spacing density. Dense operational views need scan paths and semantic grouping, while public discovery needs breathing room.                                              |
| Typography hierarchy                   | Store, Public Showcase, Auth Academy, and detail pages use strong display/body/supporting-text relationships.                                                                                                                                               | Keep display typography for orientation and task context. Do not let decorative hero type displace labels, status, or data reading in dense routes.                                                                |
| Semantic color                         | Theme-aware previews, status treatments, explicit synthetic labels, and profile variation are visible. AAPM Brand Core remains an external authority boundary.                                                                                              | Color must communicate state, profile, emphasis, or action. Never infer AAPM Brand authority from a proof surface's incidental color.                                                                              |
| Surface and card treatment             | Store cards group actual book objects. Library pages and Recipes use flatter documentation surfaces. Operations uses prominent KPI/status surfaces.                                                                                                         | Keep cards where they communicate object grouping, hierarchy, interactivity, or containment. Prefer flat canvas plus spacing/dividers for catalogs and documentation.                                              |
| Density                                | Library catalogs are compact; Store is discovery-oriented; Operations and Operational Patterns are information-dense; mobile captures stack and recompose.                                                                                                  | Define density by user frequency and risk. Do not maximize density by default, and do not make all routes feel like commerce.                                                                                      |
| Component consistency                  | Routes use the canonical shell, form, table, chart, drawer, state, and navigation families identified by the catalogs.                                                                                                                                      | Reuse contracts, not appearances. A canonical component remains wrong if the chosen interaction model is wrong for the problem.                                                                                    |
| Interaction affordance                 | Search, filters, selectors, controls, detail drawers, state examples, and stage/status patterns are visible in the inspected routes.                                                                                                                        | Every primary action needs a clear target, feedback, reversibility expectation, and ownership boundary. Future changes must record why a table, board, stepper, drawer, or direct-manipulation model was selected. |
| Loading, empty, and error presentation | Component proofs include loading, empty, progress, and state examples. Farm Synthetic and reference patterns expose safe failure language.                                                                                                                  | Evidence is not yet uniform across every route. Acceptance must include realistic loading, no-result, empty, error, retry, disabled, and success/recovery states where the user can encounter them.                |
| Responsiveness                         | Desktop route captures and corrected 390px mobile captures show mobile header/nav changes, stacked Theme Studio controls, reflowed Store discovery, stacked Operations metrics, hero recomposition, Farm context containment, and Auth media/form stacking. | Responsive behavior is recomposition. Each route must decide what collapses, relocates, becomes a drawer, becomes drill-down, or changes representation. Shrinking desktop is not acceptance.                      |
| Accessibility                          | The repository contracts and canonical primitives include accessibility concerns; visible labels and semantic status language are present in many routes.                                                                                                   | Visual inspection cannot prove keyboard order, focus visibility, screen-reader relationships, reduced motion, touch targets, or chart alternatives. These require explicit browser/accessibility evidence.         |
| Visual noise                           | The Store and Library keep hierarchy legible. Operations and proof routes intentionally use stronger status/color surfaces.                                                                                                                                 | Reserve saturated fills, shadows, dividers, and badges for meaningful state or grouping. Do not add ornament to compensate for weak information architecture.                                                      |
| Polish and coherence                   | Publishing Store is the strongest benchmark; Theme Studio, detail pages, Auth Academy, and Public Showcase show deliberate typography and surface composition.                                                                                              | Polish is a consequence of hierarchy, alignment, semantic tokens, state completeness, and responsive continuity—not merely gradients or shadows.                                                                   |
| Route-to-route consistency             | Shared Ten4Seven language is visible, while shell/profile differences are intentional.                                                                                                                                                                      | Document which differences are product-profile decisions and which are drift. A shared primitive does not require pixel-identical compositions.                                                                    |
| Product-design judgment                | Recipes and operational proofs expose multiple possible interaction families: lists, detail, process, readiness, activity, charts, and queues.                                                                                                              | The next hardening queues must begin with user intent and information architecture. “Reuse the existing card” is not an acceptable design rationale by itself.                                                     |

## 6. Publishing Store-derived generic quality bar

The following principles are portable to Ten4Seven surfaces. They are extracted
from the Store's quality, not copied from its business model or layout.

### 6.1 Make the task legible before making the interface impressive

Every route should answer, near the start:

- What is this surface for?
- What can the user understand or do here?
- What is the primary next action?
- What context, ownership, or state affects that action?

Page headers, supporting copy, status metadata, and action priority should do
this work. A hero, card grid, or KPI strip is only justified when it improves
that understanding.

### 6.2 Choose the interaction model before the component

Use the business/user intent to choose among:

- flat catalog or searchable list for retrieval and comparison;
- table/data grid for repeated row comparison, sorting, selection, or bulk
  actions;
- master-detail or split pane when the user must retain list context while
  inspecting a record;
- drawer or sheet for contextual inspection that should not destroy the
  current task;
- stepper/timeline/milestone tracker for ordered progress or history;
- process pipeline, kanban, or workboard when stage and movement are central;
- upload/dropzone when files have selection, validation, preview, progress,
  retry, replacement, cancellation, and accessibility behavior;
- direct manipulation or drag-and-drop when ordering or spatial placement is
  itself the task and a non-drag alternative remains available;
- canvas/spatial composition when relationships and arrangement are more
  important than rows and columns;
- chart or visualization only when it answers a named comparison, trend,
  distribution, capacity, or exception question;
- progressive disclosure, popover, drawer, or modal according to task risk,
  context retention, and reversibility.

The presence of a canonical card, table, or form does not settle this choice.

### 6.3 Use surfaces, borders, and lines semantically

- Use a card for a meaningful object, contained task, selectable item, or
  distinct status group.
- Use a flat canvas and whitespace for related documentation or a continuous
  authoring space.
- Use a subtle divider when it clarifies reading order or ownership.
- Use a bordered region when an input or interaction boundary needs to be
  visible.
- Use elevation when it communicates overlay, focus, or temporary separation.
- Do not wrap every section in a card or add shadows as a substitute for
  hierarchy.

### 6.4 Make density and typography purposeful

The quality reference balances strong headings, readable support text, compact
controls, and enough whitespace to see relationships. Ten4Seven should keep
that balance while adapting density to task frequency, error risk, data volume,
and device constraints. Enterprise, editorial, commerce, and operational
profiles may share tokens while choosing different composition densities.

### 6.5 Make state and feedback part of the design

Every interactive surface should account for the states a human can encounter:

- loading and progressive loading;
- empty and first-use guidance;
- no-result and filtered-empty;
- validation and recoverable error;
- disabled and unavailable;
- pending, in-progress, success, failure, retry, cancellation, and recovery;
- permission or authority boundaries where the application supplies that truth.

Feedback must tell the user what changed, what can happen next, and whether the
operation is reversible. Ten4Seven communicates these states; the application
continues to own domain truth and authorization.

### 6.6 Treat motion as communication

Motion may explain continuity, hierarchy, cause/effect, appearance/removal,
progress, drag position, or success/failure. It must not delay frequent work,
hide information, or substitute for a visible state. All future motion work
must use the canonical motion role map and honor reduced-motion preferences.

### 6.7 Treat responsive behavior as a new composition

At each meaningful breakpoint, ask whether:

- information priority changes;
- navigation changes or becomes a menu;
- secondary filters move to a drawer;
- a split view becomes drill-down;
- a table becomes a list or stacked record;
- a board remains usable or needs a lane selector;
- a canvas remains operable or needs a focused detail mode;
- actions move closer to the thumb and the reading order;
- dense controls use progressive disclosure.

The current mobile evidence supports this principle: Store controls reflow,
Operations metrics stack, Public Showcase changes hero composition, Farm keeps
the authorization boundary visible, and Auth Academy stacks media and sign-in.

### 6.8 Build accessibility into the method

Quality evidence must include semantic names, keyboard order, focus visibility,
touch target behavior, contrast, status announcements, alternative chart
descriptions, reduced motion, and non-drag alternatives. A drag-and-drop
interaction without keyboard and non-drag operation is incomplete. A chart
without an understandable text alternative is incomplete. A visually polished
modal with an unclear focus return is incomplete.

## 7. Studio hardening acceptance rubric

This rubric applies to Theme Studio, Component Lab, Tokens, Components, Blocks,
Icons, Recipes, and the canonical Library relationships. It is a proposed
acceptance rubric for later queues; Q02A does not implement it.

| Acceptance area           | Accept when evidence shows                                                                                                                                                                                                                                             |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Surface purpose           | The route declares whether it authors, inspects, proves, retrieves, or composes. A visitor can identify the job without reverse-engineering the controls.                                                                                                              |
| Interaction-model fit     | The chosen pattern follows the user's intent. Authoring uses visible cause/effect; retrieval uses search/filter/list; composition uses preview and contract; state proof uses controlled scenarios. Rejected alternatives are recorded when the choice is non-obvious. |
| Information architecture  | One route-level heading, a clear navigation model, stable anchors where useful, and a predictable relationship between overview, family, detail, preview, and contract.                                                                                                |
| Canvas versus containment | Flat documentation remains flat. Cards are reserved for meaningful component/block/recipe objects, previews, or contained tasks. Borders, elevation, and dividers explain structure.                                                                                   |
| Contract evidence         | Implemented status, display name, maturity, API, states, accessibility, tokens, aliases, and relationship data are presented from the authoritative contract source. Planned or experimental entries are not implied to be production-ready.                           |
| Theme and token behavior  | Theme/profile changes are semantic and observable. Local color, radius, shadow, typography, control-height, or motion values are not introduced where Ten4Seven tokens own the decision.                                                                               |
| State coverage            | Representative states include loading, empty, error/recovery, disabled, success/completed, and relevant progress or selection states. State examples are clearly examples, not claims about business truth.                                                            |
| Interaction affordance    | Controls have visible labels or semantic names, clear focus/hover/pressed/disabled behavior, predictable feedback, and an accessible non-pointer path.                                                                                                                 |
| Motion                    | Motion communicates state or continuity, follows canonical roles, is not required to understand the route, and respects reduced motion.                                                                                                                                |
| Responsive recomposition  | Desktop and narrow widths show deliberate changes to navigation, preview placement, filters, columns, anchors, and control density. No critical contract is lost below the desktop width.                                                                              |
| Visual hierarchy          | Typography, spacing, color, surface treatment, and whitespace direct attention to the user's next decision. Visual novelty is not used to hide an unclear contract.                                                                                                    |
| Route consistency         | Differences between Studio, Library, public, commerce, and proof shells are explainable as profile or authority choices. Accidental divergence is not treated as a new design language.                                                                                |
| Evidence boundary         | The route does not claim production persistence, domain validation, authorization, tenant entitlement, accounting, or Farm authority that the application has not proven.                                                                                              |

## 8. Library hardening acceptance rubric

This rubric applies to the Browse Library family index, component/block/recipe
detail routes, and the navigation between them.

| Acceptance area          | Accept when evidence shows                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Retrieval first          | A user can find a canonical contract by family, semantic search, or route-safe navigation without traversing decorative content.                                                            |
| Comparison method        | Repeated contracts use a readable list or table-like comparison model when comparison is the task. Cards are used only where the object preview or grouping adds meaning.                   |
| Detail comprehension     | A detail route explains purpose, anatomy, API, states, accessibility, tokens, examples, relationships, and maturity. The preview supports understanding rather than replacing the contract. |
| Pattern selection        | A recipe communicates when to use a list, master-detail, process workspace, kanban, timeline, data grid, drawer, chart, upload, or other pattern—and when not to use it.                    |
| Alternative awareness    | If a route uses a table instead of a board, a flat list instead of a card grid, or a drawer instead of a modal, the reason is understandable from the user task and risk.                   |
| State and error teaching | State examples include no-result, empty, loading, validation, error/recovery, disabled, success, progress, and cancellation where the contract supports them.                               |
| Responsive behavior      | Family indexes remain scannable; detail anchors remain reachable; previews and reference graphs recompose; dense relationships do not become an inaccessible horizontal scroll by default.  |
| Accessibility teaching   | The Library documents keyboard, semantic naming, focus, reduced motion, chart alternatives, and non-drag alternatives as part of the contract rather than as afterthoughts.                 |
| Token provenance         | Examples resolve through semantic tokens and theme profiles. A local visual override is clearly exceptional and does not create a second primitive library.                                 |
| Implementation boundary  | Only catalog-implemented components are presented as feature-ready. Experimental and planned entries are labeled according to the contract source.                                          |
| Route safety             | Canonical URLs remain refresh-safe. Legacy aliases remain compatibility-only and do not duplicate the current Library information architecture.                                             |
| Documentation quality    | Links are stable, terminology is consistent, and evidence distinguishes rendered proof from production adoption.                                                                            |

## 9. Qualities to KEEP

The following qualities are supported by the current evidence and should be
protected during later hardening:

- The route-level shell grammar from `AGENTS.md`: shell, optional navigation,
  one page header, and bounded route content.
- Clear separation between private application shells, public shells, commerce
  discovery, system/library surfaces, and proof surfaces.
- Theme Studio's recipe-first authoring sequence and visible preview relationship.
- Library's relatively flat, direct-to-canvas information architecture for
  contracts, families, and recipes.
- Detail routes that expose anchors, state examples, tokens, recommended
  relationships, and layer boundaries.
- Meaningful Store cards for meaningful product objects, without treating cards
  as the default container for every section.
- The Publishing Store's hierarchy, rhythm, typography, surface restraint,
  density balance, and mobile discovery recomposition as generic reference
  qualities.
- Semantic search and category retrieval for Icons rather than raw glyph
  browsing alone.
- Explicit fixture, synthetic, reference-data, and production-adoption labels
  on proof surfaces.
- The Operations and Operational Patterns evidence of process stages, activity,
  milestones, readiness, exception, decision, and resource patterns.
- Auth proof reuse of a shared interaction recipe while allowing profile-level
  media and typography differences.
- Farm Synthetic's visible authorization boundary, synthetic-data disclosure,
  safe failure language, and explicit non-adoption statement.
- Canonical components, semantic tokens, typed contract projections, and the
  existing motion/accessibility ownership model.
- Mobile behavior that changes the composition—stacking, reordering, changing
  navigation, and collapsing secondary controls—instead of only shrinking
  desktop geometry.

## 10. Implementation details that may ADAPT / REFACTOR

This section identifies bounded design-system opportunities. It is not an
authorization to execute them in Q02A.

- Add or refine contract-facing guidance for interaction intent, use/avoid
  conditions, information density, responsive behavior, state coverage,
  accessibility behavior, motion semantics, and meaningful alternatives.
- Make the Library's maturity and authority language visible enough that
  implemented, experimental, planned, proof, and reference surfaces cannot be
  confused by a visual preview alone.
- Refine Theme Studio's authoring/preview relationship for narrow screens so a
  user can understand what is being edited, what changed, and where the preview
  moved without losing context.
- Refine Components, Blocks, Icons, and Recipes retrieval where search,
  category, profile, or status filters compete with the content. Use
  progressive disclosure or a drawer where that is the lowest-friction mobile
  method.
- Add explicit chart guidance: the user question, time/series meaning, labels,
  legend, units, empty state, and text alternative must be known before a chart
  is added. Do not turn KPI cards into decorative chart containers.
- Record a design-method decision for workflows. A status pipeline, kanban,
  timeline, work queue, master-detail split, or table should be chosen from the
  task and relationship model, not from whichever existing component is
  closest.
- Where files become central, use a real upload contract with selection,
  dropzone behavior, validation, preview, progress, success, failure, retry,
  replacement, cancellation, keyboard support, and reduced-motion-safe
  feedback. Do not approximate this with a styled file input card.
- Where ordering or spatial composition is central, evaluate direct
  manipulation or a canvas; also provide a non-drag path and clear drop
  feedback. Do not add drag-and-drop for visual novelty.
- Audit borders, shadows, background fills, and cards for semantic purpose.
  Prefer spacing and typography when they create the stronger hierarchy.
- Clarify route-to-route profile decisions so public/editorial/commerce,
  enterprise/operational, system/library, and proof surfaces can differ without
  drifting into parallel primitive systems.
- Preserve the current application ownership boundary: Ten4Seven owns reusable
  presentation knowledge, while the application owns business truth,
  permission decisions, tenant entitlement, domain validation, persistence,
  accounting state, and Farm operational authority.

## 11. Explicit Farm Synthetic disposition

Farm Synthetic remains `LAB_PROOF`. It is not the target Farm UX, not the Farm
business contract, and not evidence of production adoption.

Its permitted design value is narrow and useful:

- prove that a consumer can receive an authorized Farm context;
- show how a profile can express Farm meaning through canonical Ten4Seven
  components;
- make synthetic data and non-production status unmistakable;
- show safe loading/error/retry behavior without claiming a real Farm request;
- test responsive containment of context selectors and metrics.

Its explicit limits remain:

- no API or ERP authority;
- no production identity or tenant proof;
- no persistence proof;
- no calculation or flock-health authority;
- no QR/security proof;
- no native/offline proof;
- no permission decision ownership;
- no replacement of current Farm P1 business intent.

The target Farm direction remains:

```text
Current Farm P1 UI
  + Farm business intent
  + accepted business contracts
  + hardened Ten4Seven presentation
  + canonical AAPM Brand
```

It is not:

```text
Farm Synthetic -> target Farm
```

Any later Farm work must re-establish the current Farm P1, business-contract,
Brand, and runtime/authority gates independently.

## 12. Proposed bounded scope for Q02B

Q02B is proposed as **Studio Hardening**, subject to a new explicit queue and
its own exact mutation boundary.

### In scope

- Theme Studio, Component Lab, Tokens, Components, Blocks, Icons, Recipes, and
  their documented relationships to the canonical Library.
- A route-by-route design-method decision: authoring workbench, state lab,
  token inspector, catalog/list, visual block gallery, semantic icon retrieval,
  or recipe/composition catalog.
- Targeted hierarchy, spacing, typography, surface, semantic-color, state,
  accessibility, motion, and responsive improvements that strengthen those
  system surfaces.
- Browser evidence at representative desktop and narrow mobile widths.
- Documentation of alternatives considered and rejected when a meaningful
  interaction-model choice is made.

### Out of scope

- Publishing Store business behavior or universal adoption of its public shell.
- Farm Synthetic or production Farm implementation.
- AAPM Brand authority changes.
- New business workflow truth, persistence, authorization, accounting, or ERP
  behavior.
- A new primitive family or donor-library import.
- Generic redesign of every route without an identified user problem.

### Entry criteria

- Q02A artifact is accepted at its stated gate.
- The next queue names exact files and whether it authorizes route, style,
  contract, or documentation changes.
- Existing Q02 dirty work is preserved and separated from new edits.
- The acceptance rubric in Section 7 is converted into observable browser and
  accessibility evidence.

## 13. Proposed bounded scope for Q02C

Q02C is proposed as **Canonical Library Hardening**, subject to a separate
bounded authorization.

### In scope

- `/components`, component family routes, component detail routes, `/blocks`,
  block detail routes, `/recipes`, and recipe detail routes.
- Search, filtering, taxonomy, detail navigation, anchors, preview-to-contract
  relationships, maturity language, and responsive retrieval.
- Clear explanation of when to choose a list, table, data grid, master-detail,
  drawer, timeline, kanban, process workspace, upload, chart, or canvas.
- State, accessibility, motion, and token provenance evidence for representative
  canonical contracts.
- Repository-local link integrity for Library documentation.

### Out of scope

- Creating a separate `/browse-library` route without an independent IA
  decision.
- Treating visual previews as production API or business-contract authority.
- Promoting proof/reference routes into the Library's primary maturity class.
- Changing domain logic, Farm behavior, or AAPM Brand authority.

### Entry criteria

- Q02B, if executed first, leaves the canonical route grammar stable or records
  the reason for any bounded exception.
- The Library acceptance rubric in Section 8 is mapped to specific routes and
  contracts rather than broad visual impressions.

## 14. Proposed bounded scope for Q02D

Q02D is proposed as **Quality Reference and Proof Boundary Calibration**.

### In scope

- Use Publishing Store as the generic benchmark for hierarchy, rhythm,
  typography, surface treatment, density, polish, responsive recomposition, and
  interaction refinement.
- Compare those portable qualities against Operations Tracker, Operational
  Patterns, Public Showcase, Auth proofs, and Farm Synthetic without promoting
  their domain meanings.
- Define which visual and interaction qualities can become reusable recipes or
  contract guidance, and which remain surface-specific.
- Verify explicit labels for fixture, synthetic, reference, proof, and
  production-adoption status.
- Record rejected approaches where a card, chart, board, table, direct
  manipulation pattern, or motion treatment would weaken the task.

### Out of scope

- Turning Publishing Store into an ERP, Farm, or private application template.
- Promoting Operations Tracker or Operational Patterns to production authority.
- Using Farm Synthetic as the target Farm design.
- Claiming production API, ERP, tenant, authentication, authorization, native,
  offline, or persistence evidence from a local proof.
- Replacing AAPM Brand/Design Foundation ownership with Ten4Seven styling.

### Entry criteria

- The primary and reference classifications in this document remain explicit.
- The later queue has a bounded set of routes and a bounded evidence format;
  “improve all UI” is not a sufficient scope.

## 15. Risks and unknowns

- The parent governance artifact named by the insertion instruction,
  `T7-AAPM-001-Q02X-PRE-Q03-INSERTION.md`, was not present in the current
  Ten4Seven checkout during this pass. The Design Judgment Mandate was
  supplied directly by the user and is applied here; its repository-local
  provenance remains an external governance unknown.
- Local rendered evidence is time-specific. A running Vite route is not a
  deployment, production adoption, API proof, or persistence proof.
- The route pass establishes visible composition and selected states, but not
  exhaustive keyboard, screen-reader, focus, reduced-motion, contrast, touch,
  chart-alternative, or assistive-technology behavior.
- Mobile evidence covered representative 390px compositions, not every
  breakpoint, orientation, content length, browser, or native platform.
- The catalog and compact projections establish reusable contracts, but a
  catalog entry count is not a quality signal and an implemented component
  does not settle the correct interaction model for a domain problem.
- Some proof surfaces use strong color, KPI, card, or chart compositions. Their
  visual effectiveness does not authorize reuse of their business semantics or
  promotion to `PRIMARY`.
- Publishing Store quality is a reference judgment, not a formal benchmark
  with numeric scoring. More evidence is needed before converting its
  qualities into automated acceptance checks.
- Chart semantics, units, legends, empty states, and text alternatives need
  route-specific evidence before charts can be treated as mature information
  design rather than visual decoration.
- A direct-manipulation, upload, kanban, or canvas model may be appropriate for
  a future business surface, but Q02A does not authorize inventing a consumer
  workflow or changing Farm/ERP authority.
- AAPM Brand authority remains with PT AAPM and the Brand/Design Foundation.
  Ten4Seven may consume canonical brand/profile inputs but must not infer
  authority from a screenshot, local proof, or incidental color.
- The current worktree contains unrelated-to-Q02A dirty work from the
  contract-plane queue. Any later queue must re-record its own baseline rather
  than relying on this snapshot.

## 16. Current gate and next gate

Current Q02A evidence is complete for the bounded documentation task:

- the required route inventory is recorded;
- authority classes and rationale are explicit;
- Publishing Store qualities are separated from bookstore meaning;
- interaction-model judgment is part of the bar;
- Studio and Library acceptance rubrics are proposed;
- Farm Synthetic is explicitly retained as proof only;
- Q02B, Q02C, and Q02D are bounded as proposals;
- the pre-existing dirty-state boundary is recorded;
- no Q02B work was executed.

The next queue may proceed only as a separately authorized bounded scope,
keeping the classification and Farm boundary above intact.

PASS WITH CONSTRAINTS FOR Q02B
