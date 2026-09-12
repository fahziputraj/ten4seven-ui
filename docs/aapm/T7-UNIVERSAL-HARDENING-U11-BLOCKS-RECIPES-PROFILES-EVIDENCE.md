# T7-UNIVERSAL-HARDENING-U11 — Blocks, Recipes + Product Profiles Evidence

## 1 Coordinates

- Program: T7-UNIVERSAL-HARDENING-001
- DWO: T7-UNIVERSAL-HARDENING-U11
- Repository: fahziputraj/ten4seven-ui
- Workspace: D:\SA\ten4seven-ui
- Branch: codex/icons-curated-solar-style
- HEAD at evidence capture: e582cfcfbe0f077d1a5832d86db9da1898487fd3
- Execution date: 2026-09-12, Asia/Jakarta
- Boundary: U11 only. U12 and later queues were not executed.
- Mutation boundary: no commit, push, pull request, merge, tag, publish, or deploy was performed.

The worktree was already dirty when U11 started. Existing changes were preserved
without reset, clean, broad formatting, or opportunistic staging. The final
status snapshot contains 623 entries and includes unrelated work. In particular,
the pre-existing U12 artifacts
docs/aapm/T7-COMP-EXP-Q12-BLOCKS-EVIDENCE.md and
tests/q12-block-expansion.spec.ts were not edited or executed as U11 work.

Evidence labels used below:

- SOURCE: typed source, registry, or generated projection inspected directly.
- TEST: deterministic automated check or package check.
- RUNTIME: rendered local-browser proof.
- OBSERVED: evidence from a representative consumer or showroom surface.
- UNKNOWN / UNVERIFIED: intentionally outside the U11 boundary.

## 2 Inventory before

SOURCE inspection established the following starting point:

- packages/contracts/src already owned normalized brand profiles, theme recipes,
  theme resolution, foundation tokens, motion roles, responsive contracts, and
  native-adapter contracts.
- The contract plane did not yet have one typed Blocks + Recipes + Product
  Profiles composition contract. The legacy human catalogs remained the
  compatibility source for 60 blocks, 29 recipes, 178 components, and 122
  semantic icons.
- Brand profiles already exposed seven canonical profile IDs:
  neutral-product, aapm-core, aapm-farm, aapm-operations, aapm-erp,
  aapm-academy, and aapm-public.
- Theme Studio, Component Lab, the Blocks and Recipes library surfaces, and
  the existing package/native checks already provided harness evidence. U11
  adds the typed composition projection and showroom proof; it does not
  replace those existing contracts.
- Representative consumer evidence was inspected for Theme Studio, Component
  Lab, Auth, Public Showcase, Publishing Store, Operations Tracker, SaaS
  Control Plane, ERP Density, and Farm reference surfaces. This was evidence
  collection, not a broad consumer migration.

The main duplication/drift risk was architectural rather than a single visual
defect: a legacy catalog could be treated as an implementation authority,
product-profile decisions could be repeated in consumers, and a future native
renderer could be forced to infer intent from Web CSS. U11 addresses that risk
with a typed composition source and generated projections while retaining the
legacy catalogs as compatibility surfaces.

## 3 Block taxonomy

The typed source is packages/contracts/src/composition.ts. Every composition
block is classified as COMPOSITE_BLOCK and has an explicit level, family,
inventory status, platform, native strategy, slots, required and optional
canonical components, use/avoid guidance, ownership boundaries, states,
responsive intent, accessibility obligations, token families, AI metadata, and
provenance.

The exact U11 block families are:

- PUBLIC
- AUTH
- APPLICATION
- FORMS
- COMMERCE
- WORKFLOW
- DATA
- AI_POWER

The typed plane contains 27 block contracts:

- 12 EXISTING_STABLE contracts: hero-split, feature-showcase, stats-section,
  logo-cloud, testimonials, pricing-section, content-showcase,
  announcement-bar, carousel, cta-contained, product-showcase, and
  public-footer.
- 12 EXISTING_NEEDS_HARDENING contracts: public-auth-entry, kpi-dashboard,
  form-progress, filterable-data-preview, master-detail-region,
  exception-queue-summary, decision-workspace-evidence, product-detail-proof,
  cart-summary, activity-audit-stream, onboarding-stepper, and
  editor-workspace.
- 3 MISSING typed composition contracts: table-workbench, ai-conversation,
  and empty-error-onboarding.

The legacy block registry remains compatible for 22 mapped block IDs. The
typed count is a composition-contract count, not a claim that all legacy
catalog entries are canonical product APIs. Variants and aliases do not
increase canonical component count.

## 4 Recipe taxonomy

The typed source classifies every recipe as RECIPE_OR_PATTERN. A recipe owns a
reusable arrangement, block-role relationships, composition guidance, platform
strategy, states, responsive order, accessibility obligations, token families,
AI metadata, and provenance. It does not own a finished domain screen, domain
entity, query, permission, mutation, or persistence model.

The exact U11 recipe families are:

- PUBLIC_LANDING
- AUTH
- APPLICATION
- DATA
- WORKFLOW
- COMMERCE
- EDITORIAL
- AI_POWER
- MOBILE_FIELD

The typed plane contains 19 recipe contracts:

- 14 EXISTING_NEEDS_HARDENING compatibility recipes:
  public-landing, auth, dashboard, list-detail, master-detail, queue-detail,
  decision-review, wizard, settings, catalog, product-detail, checkout-cart,
  analytics-reporting, and editor-builder.
- 5 RECIPE typed additions: search-results, notification-inbox, ai-assistant,
  mobile-field, and approval-review.

The 14 existing recipes retain their legacy catalog IDs through provenance.
Typed alternatives are normalized to typed IDs and are validated by the
generator; no second recipe manifest was introduced.

## 5 Product Profile model

Product profiles are presentation capabilities derived from the existing
canonical brand-profile.ts and theme-recipe.ts sources. They select semantic
theme axes, density and shell tendencies, typography/surface/motion/chart
expression, and platform support. They do not define permissions, business
meaning, data state, API behavior, or forked component contracts.

| Typed profile   | Display    | Product scope | Theme recipe | Density     | Shell tendency     |
| --------------- | ---------- | ------------- | ------------ | ----------- | ------------------ |
| neutral-product | Neutral    | product       | product      | default     | balanced-product   |
| aapm-core       | AAPM       | enterprise    | enterprise   | default     | balanced-product   |
| aapm-farm       | Farm       | product       | product      | comfortable | public-editorial   |
| aapm-operations | Operations | enterprise    | enterprise   | compact     | workflow-workspace |
| aapm-erp        | ERP        | enterprise    | enterprise   | dense       | dense-workspace    |
| aapm-academy    | Academy    | editorial     | editorial    | comfortable | editorial-learning |
| aapm-public     | Publishing | editorial     | editorial    | comfortable | public-editorial   |

The AAPM Brand Core expression remains owned by the existing AAPM profile
source. U11 did not introduce a competing brand palette or new profile-specific
component family. The profile capability projection is generated from the
existing profile and recipe contracts.

## 6 Resolver/ownership model

The composition resolver preserves the U01 order exactly:

system defaults → base recipe → product profile → theme override →
scoped override → component state

SOURCE verification:

- COMPOSITION_RESOLUTION_ORDER aliases the existing token resolution order.
- resolveCompositionLayers delegates layer resolution to the existing token
  resolver rather than creating a second profile or theme resolver.
- resolveProductComposition returns the resolved semantic composition values,
  runtime preferences, Web projection, and native projection.
- The component-state stage remains the final state overlay for loading, empty,
  error, disabled, readonly, selected, and related state intent.

Ownership is explicit:

- System defaults and semantic token meaning belong to the contract/token plane.
- Base recipe arrangement belongs to the typed recipe contract.
- Product profile expression belongs to the existing brand-profile and
  theme-recipe sources.
- ThemeScope/local semantic overrides belong to the consumer scope and are
  applied only after the product profile.
- Component state belongs to the canonical component contract.
- Blocks own bounded anatomy, hierarchy, slots, state presentation, and
  responsive intent.
- Recipes own reusable arrangement and block roles.
- Consumers own data, handlers, permissions, routing, persistence, business
  truth, and domain transitions.
- Renderers own DOM or platform-native primitives, focus/press mechanics,
  scrolling, positioning, and platform presentation.

CSS is a derived Web projection. The typed contracts and resolved values are
the authority. The native projection is direct resolved JS/TS data and is
explicitly marked cssParsing=false; it does not parse CSS variables or depend
on a Web stylesheet.

## 7 Blocks hardened

The stable public and commerce blocks are carried into the typed contract with
normalized provenance:

- Public: hero-split, feature-showcase, stats-section, logo-cloud,
  testimonials, pricing-section, content-showcase, announcement-bar,
  carousel, cta-contained, and public-footer.
- Commerce: product-showcase.

The existing block contracts requiring additional hardening are explicitly
represented instead of being silently treated as finished:

- Auth: public-auth-entry.
- Application: kpi-dashboard and master-detail-region.
- Forms: form-progress and onboarding-stepper.
- Data: filterable-data-preview and activity-audit-stream.
- Workflow: exception-queue-summary and decision-workspace-evidence.
- Commerce: product-detail-proof and cart-summary.
- AI_POWER: editor-workspace.

All of these contracts use canonical component names and token families. No
consumer handler, data fetch, permission check, domain status, or persistence
implementation was moved into the block layer.

## 8 Net-new Blocks

The following are typed composition contracts, not new primitive components:

- table-workbench: a bounded data-workbench anatomy around the existing
  readable Table/DataTable families.
- ai-conversation: a conversation/evidence/action boundary around a
  consumer-owned AI transport and tool execution model.
- empty-error-onboarding: a reusable empty/error/recovery region around
  canonical EmptyState/StateView semantics.

editor-workspace and master-detail-region are intentionally classified as
EXISTING_NEEDS_HARDENING contracts even though their current typed shape has
no direct legacy block ID. This keeps the typed inventory honest without
inventing a legacy compatibility mapping.

No @ten4seven/native component library was created in U11.

## 9 Recipes hardened

The following existing recipe identities were normalized into the typed plane
and retain legacy provenance:

- public-landing from marketing-home.
- auth from auth.
- dashboard from dashboard.
- list-detail from entity-list.
- master-detail from master-detail.
- queue-detail from exception-queue.
- decision-review from decision-workspace.
- wizard from process-workspace.
- settings from settings.
- catalog from catalog.
- product-detail from product-detail.
- checkout-cart from cart.
- analytics-reporting from report.
- editor-builder from content-detail.

The compatibility mapping keeps existing catalog consumers readable while
making family, platform, native strategy, block roles, boundaries, and AI
guidance explicit in typed source.

## 10 Net-new Recipes

The following typed recipes have no legacy catalog ID and are available as
composition guidance only:

- search-results: filterable public/application discovery arrangement.
- notification-inbox: prioritized notification and contextual action
  arrangement.
- ai-assistant: adaptive conversation/source/action arrangement.
- mobile-field: keyboard-safe field flow using intentional native input
  behavior.
- approval-review: queue, evidence, decision, and activity arrangement.

These recipes do not expose a domain entity API or a finished product screen.
Their required, recommended, and optional block roles are checked during
projection generation.

## 11 Profiles hardened/created

U11 created the typed PRODUCT_PROFILE capability projection; it did not create
a parallel profile source. All seven existing canonical profile IDs are
represented, including Neutral, AAPM, Farm, Operations, ERP, Academy, and
Publishing. Each profile has Web and native support flags and
SAME_INTENT profile strategy. Profile-level expression is resolved through the
existing theme recipe/profile source and then projected to composition
consumers.

The profile model is therefore additive and compatibility-safe: it gives
blocks, recipes, showrooms, native canaries, and AI retrieval one normalized
profile contract without forking the existing visual language.

## 12 Rejected domain candidates

The following candidates were deliberately not promoted into Blocks, Recipes,
or Product Profiles:

- A finished Farm, Operations, ERP, Academy, Publishing, or AAPM domain
  dashboard with business data and permissions.
- Queue ownership, approval policy, authorization, tenant access, or workflow
  transition logic.
- Catalog inventory, order persistence, pricing truth, cart mutation, or
  checkout orchestration.
- An editor/document model, AI agent runtime, prompt transport, tool
  execution, safety policy, collaboration, or persistence engine.
- A table/grid, chart, calendar, drag-and-drop, upload, or editor engine.
- CommerceButton, CommerceInput, domain-specific form primitives, or any
  consumer-local parallel primitive family.
- Donor CSS, donor theme values, or a CSS parser as a native dependency.

These remain consumer/domain or engine-adapter concerns. A rejected candidate
is not a missing canonical component merely because a product route uses it.

## 13 Web/Native adaptive matrix

| Intent            | Web renderer                                               | Native renderer                                                                   | Strategy          |
| ----------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------- |
| Public landing    | ordered public sections in a readable shell                | content/form first with optional media below the primary task                     | ALTERNATE_PATTERN |
| Auth              | grouped fields, validation, visible action boundary        | ScrollView form with keyboard avoidance and safe-area footer                      | ALTERNATE_PATTERN |
| List/detail       | bounded collection plus detail pane/drawer as appropriate  | native list/detail navigation stack; no CSS table assumptions                     | ALTERNATE_PATTERN |
| Queue/detail      | filters, queue, selected context, drawer or task surface   | FlatList → native navigation → ScrollView detail/action screen                    | ALTERNATE_PATTERN |
| Decision review   | bounded evidence/context regions with explicit next action | single-column evidence flow with safe-area decision actions                       | ALTERNATE_PATTERN |
| Catalog/product   | product context adjacent to acquisition action             | vertical scroll, native media, platform-appropriate reachable action              | ALTERNATE_PATTERN |
| Form/mobile field | responsive shared form contract                            | native inputs, keyboard avoidance, and safe-area action region                    | NATIVE_RENDERER   |
| Editor/AI         | bounded editor/conversation with supporting rails          | single-task screen with bounded message/source lists and native keyboard behavior | ALTERNATE_PATTERN |

The U11 responsive viewport matrix is 1440×900, 1024×768, 768×1024, and
390×844. Responsive intent is semantic order and re-composition; it is not a
promise that a native renderer will reproduce Web DOM layout.

## 14 Profile comparison proof

RUNTIME proof is provided on the normalized /blocks showroom. It renders seven
ThemeScope-wrapped profile cards for Neutral, AAPM, Farm, Operations, ERP,
Academy, and Publishing. Every card uses the same semantic composition:
Review workspace, one Open workspace action, and the same U11 block/recipe
structure. The visible comparison changes profile expression metadata and
resolver context, not the component contract or business action.

The browser assertion data-testid=u11-profile-comparison confirms seven
profile cards, and the profile-card assertions confirm the same action label
across all profiles at all four viewport sizes. This proves profile
comparison through the existing ThemeScope mechanism rather than a second
profile runtime.

## 15 Native block canary

SOURCE and TEST proof use resolveNativeBlockComposition and the exported
NATIVE_COMPOSITION_CANARY. The six block canaries are:

| Canary      | Typed block                 | Native presentation                                                                        |
| ----------- | --------------------------- | ------------------------------------------------------------------------------------------ |
| auth        | public-auth-entry           | form-first screen with optional brand/media support; ScrollView + TextInput + Pressable    |
| list-detail | master-detail-region        | navigation stack from list to selected detail; FlatList + native navigation + ScrollView   |
| form        | form-progress               | single-column form with keyboard avoidance; ScrollView + TextInput + Pressable             |
| decision    | decision-workspace-evidence | single-column evidence flow with safe-area decision actions; ScrollView + View + Pressable |
| product     | product-detail-proof        | vertical product detail with reachable acquisition action; ScrollView + Image + Pressable  |
| dashboard   | kpi-dashboard               | scrollable signal sections with prioritized next action; ScrollView + SectionList          |

Every canary is marked cssParsing=false, has semantic order, safe-area
guidance, and labelled touch-safe action guidance. This is a renderer-neutral
contract proof, not an implementation of native components.

## 16 Native recipe canary

SOURCE and TEST proof use resolveNativeRecipeComposition for:

- auth: form-first native screen, Stack navigator + ScrollView, keyboard and
  bottom-inset guidance.
- queue-detail: queue list → selected detail → decision/action screen,
  FlatList + native navigation + ScrollView.
- master-detail: list screen → detail screen, FlatList + native navigation.

All three canaries are ADAPTIVE, use ALTERNATE_PATTERN, preserve semantic
reading order, expose safe-area and labelled-press obligations, and have
cssParsing=false. The canaries demonstrate that native consumes the resolved
contract directly; they do not claim a native renderer package is complete.

## 17 Consumer proof mapping

| Representative surface         | U11 composition evidence                                        | Boundary                                                                       |
| ------------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Theme Studio                   | profile capability and resolver context                         | harness; no consumer migration                                                 |
| Component Lab                  | canonical component slots and component-contract references     | harness; no new primitive family                                               |
| Auth                           | public-auth-entry block and auth recipe                         | auth data, validation, routing, and permissions remain consumer-owned          |
| Public Showcase                | public blocks and public-landing arrangement                    | public content and acquisition handlers remain consumer-owned                  |
| Publishing Store / Ebook Store | catalog, product-detail, checkout-cart, product and cart blocks | product data, pricing truth, cart state, and checkout remain consumer-owned    |
| Operations Tracker             | dashboard, queue-detail, decision-review, activity/audit roles  | operational records, permissions, filters, and mutations remain consumer-owned |
| SaaS Control Plane             | application dashboard/list-detail/settings arrangements         | tenant and control-plane behavior remains consumer-owned                       |
| ERP Density Reference          | dense profile tendency plus data/list/analytics/table roles     | ERP data, authorization, and business workflows remain consumer-owned          |
| Farm Reference                 | Farm profile plus mobile-field/form/queue arrangements          | Farm domain truth and workflow remain consumer-owned                           |

OBSERVED route proof was used to map representative consumers to reusable
composition intent. U11 did not claim that every mapped route has been
migrated to the new typed contract, and did not change its business behavior.

## 18 AI/catalog projection

The typed composition source is projected by
scripts/generate-contract-projections.mjs. The generator writes:

- generated/composition.json
- generated/composition.compact.json
- packages/agent/generated/composition.json
- packages/agent/generated/composition.compact.json
- composition entry points and retrieval order in generated/agent-index.json
  and packages/agent/generated/agent-index.json

The projection includes taxonomy, profiles, resolver order, block/recipe
roles, boundaries, responsive/native intent, provenance, compatibility,
showrooms, canaries, and counts. The AI CLI reads the generated projection;
pnpm t7ui composition find "approval review" produced the normalized recipe,
family, profile compatibility, block roles, component names, responsive
strategy, native strategy, and business boundary.

The legacy block/recipe catalogs remain compatibility registries. They are not
a second typed decision manifest. Generator validation rejects missing
component references, invalid compatibility IDs, unresolved alternatives,
missing metadata, or non-implemented required canonical components.

## 19 Tests

The following U11 and repository checks were run from D:\SA\ten4seven-ui:

- TEST PASS: pnpm contracts:generate.
- TEST PASS: pnpm exec node --experimental-strip-types
  scripts/generate-contract-projections.mjs --check.
- TEST PASS: pnpm test:composition.
  Result: U11 composition plane verified: 27 blocks, 19 recipes, 7 profiles,
  9 native canaries.
- TEST PASS: pnpm typecheck.
- TEST PASS: pnpm --filter @ten4seven/native typecheck.
- TEST PASS: pnpm package:build.
- TEST PASS: pnpm package:verify.
  Result: @ten4seven/ui@1.0.0, 24 root exports, bundled tokens/icons/motion,
  and self-contained styles.
- TEST PASS: pnpm test:ai.
- TEST PASS: pnpm test:consistency.
- TEST PASS: pnpm test:token-governance.
- TEST PASS: pnpm test. The full chain passed, including contract,
  responsive/layout, native, visualization, workflow, U11 composition,
  ERP/DTCG/contrast/token governance, package, brand/profile, recipe family,
  token, AI, component-system, and Tailwind bridge checks.
- TEST PASS: pnpm build. Playground production build completed; the only
  noted output was the existing emitted chunk-size warning.
- RUNTIME PASS: pnpm exec playwright test
  tests/u11-blocks-recipes-profiles.spec.ts.
  Result: 2 passed in 17.4s across 1440×900, 1024×768, 768×1024, and 390×844.
  Assertions covered the typed plane, representative block, seven profile
  cards, identical profile action labels, adaptive recipe/native canary
  metadata, cssParsing=false, and viewport-safe rendering.
- TEST PASS: git diff --check. Existing CRLF normalization warnings were
  reported for already-dirty files; no whitespace error was introduced by the
  U11 additions.

The first browser run exposed one missing selector in the new test, not a
runtime composition defect. Adding the explicit test ID and rerunning produced
the RUNTIME PASS above.

## 20 Baseline debt

The required repository formatter check was run:

- TEST BASELINE DEBT: pnpm format:check exits 1 with
  Code style issues found in 359 files.

The formatter result is repository-wide pre-existing drift. The new U11 source,
generator, verifier, showroom, and test files were formatted individually;
the dirty worktree was not mass-formatted because that would overwrite or
normalize unrelated user work. This baseline debt is recorded and is not
silently represented as a U11 PASS.

Additional bounded debt:

- The legacy human catalogs remain compatibility surfaces until their
  decisions are migrated to typed contracts.
- Native block/recipe canaries are contract descriptors and direct-value
  projections; a full @ten4seven/native component implementation is outside
  U11.
- Representative consumer routes were mapped and showroom-proven; a
  route-by-route adoption migration is outside U11.
- The pre-existing U12 evidence/test artifacts were left untouched.

## 21 True component gaps deferred to U13

U11 did not inflate the canonical component count to satisfy composition
needs. The following real implementation gaps remain deferred:

- Full native renderer implementations for the canonical components used by
  the canaries.
- A production editor/builder engine adapter and its persistence,
  collaboration, and safety boundaries.
- Advanced data-grid, virtualization, chart, calendar, upload, and
  drag-and-drop engine adapters where a product contract genuinely requires
  them.
- Any missing canonical primitive that future consumer evidence proves cannot
  be composed from the existing implemented catalog.

These are future gap events. U11 records them without creating parallel
primitive libraries or executing U12/U13 work.

## 22 U12 readiness

U11 provides the contract plane U12 can consume:

- typed block and recipe taxonomies;
- explicit ownership and boundaries;
- profile capabilities derived from existing sources;
- deterministic resolver order;
- Web and native projections from one source;
- generated AI/catalog retrieval artifacts;
- profile comparison showroom proof;
- native block and recipe canaries;
- deterministic tests for defaults, recipe, profile, override, scope,
  component state, light/dark, reduced motion, contrast preference, density,
  Web projection, and native CSS-independence.

U12 was not executed. The separate pre-existing U12 artifacts listed in
Coordinates remain outside this gate.

## 23 Gate

PASS FOR U12
