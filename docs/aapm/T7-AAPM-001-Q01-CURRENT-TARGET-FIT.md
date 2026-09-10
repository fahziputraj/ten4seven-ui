# T7-AAPM-001 Q01 — Current-to-Target Fit

Status: Evidence complete for the Q01 gate  
Mode: STRICT / BOUNDED  
Risk: R1 — documentation and evidence only  
Target repository: fahziputraj/ten4seven-ui  
Queue: T7-AAPM-001 — Ten4Seven Ecosystem Adaptation  
Captured: 2026-09-10 (Asia/Jakarta)

## Decision summary

Ten4Seven is a credible design-platform foundation for the AAPM ecosystem, but
it is not yet an AAPM ecosystem contract plane. The current repository already
has strong reusable primitives, typed theme and recipe foundations, semantic
icons, deterministic AI retrieval, responsive web shells, and several
operational patterns. The current package is intentionally consumer-owned for
business data, permissions, persistence, and domain rules. That ownership
boundary is compatible with the AAPM architecture.

The adaptation is therefore a bounded platform extension rather than a visual
rewrite:

- KEEP the canonical Ten4Seven foundation, interaction primitives, semantic
  icon API, recipe composition model, and consumer-owned business logic
  boundary.
- ADAPT the contract plane so that AAPM brand profiles, module lifecycle
  states, cross-surface semantics, and richer component metadata can be
  retrieved and validated without weakening consumer ownership.
- SPLIT broad or domain-shaped concerns at the contract boundary: brand core
  versus product theme, platform/module state versus business state, web
  composition versus native rendering, and generic data display versus ERP
  authority.
- ADD an explicit AAPM adapter/profile layer, a serializable web/native
  semantic vocabulary, SaaS/module-state presentation contracts, and an
  evidence-backed data-dense/performance/distribution track.
- DEPRECATE legacy catalog decisions only through typed-source migration and
  generator work; do not delete or rewrite them in Q01.
- Leave production adoption, AAPM licensing, native implementation, Farm
  adoption, ERP authority, and deployment UNVERIFIED.

The recommended Q01 gate is:

> PASS WITH CONSTRAINTS FOR Q02

The evidence map is sufficient to begin Q02, but the missing AAPM workstream
document, unaccepted AAPM target governance, package distribution limits, and
several contract-plane gaps must remain explicit constraints.

## 1. Evidence boundary, references, and coordinates

### 1.1 Evidence labels

This document uses the following labels:

- SOURCE — directly read from a checked-out file, command output, or recorded
  repository state.
- OBSERVED — directly observed in a local repository/runtime inspection, but
  not a target-architecture approval.
- NORMALIZED — a comparison or interpretation made from SOURCE and OBSERVED
  evidence.
- PROPOSED — a Q02–Q08 adaptation direction; not implemented or approved by
  this document.
- UNKNOWN — the required evidence was not available.
- UNVERIFIED — the claim would require a different authority, production
  environment, native implementation, deployment, or explicit acceptance.

Q01 is an adaptation map. It does not establish production readiness, package
adoption, AAPM licensing, ERP cutover, native parity, or Farm production
authority.

### 1.2 Ten4Seven baseline

SOURCE — the Q01 target checkout is:

| Field                       | Value                                                          |
| --------------------------- | -------------------------------------------------------------- |
| Local path                  | D:/SA/ten4seven-ui                                             |
| Branch                      | feat/icons-aapm-iconify-expansion                              |
| HEAD                        | b07fa697f5fbab75087d25649496e4a07243042a                       |
| Origin                      | https://github.com/fahziputraj/ten4seven-ui.git                |
| Evidence file at baseline   | Absent before Q01                                              |
| Pre-existing modified files | packages/ui/src/styles.css; tests/end-to-end-hardening.spec.ts |

The two modified files above pre-date the Q01 evidence artifact. Their
milestone-tracker style and end-to-end assertion changes were preserved and
were not used as Q01 implementation input. Q01 does not normalize, stage,
commit, push, merge, publish, or delete any worktree content.

### 1.3 AAPM and Farm comparison baselines

SOURCE — the AAPM architecture checkout used for comparison:

| Field                       | Value                                                                                  |
| --------------------------- | -------------------------------------------------------------------------------------- |
| Local path                  | D:/SA/AAPM_Ecosystem                                                                   |
| Branch                      | docs/ECO-FND-004-customer-platform-architecture-masterplan                             |
| HEAD                        | 0d45b80023e66d30dfa16926e7e689c83b74e069                                               |
| Pre-existing worktree state | Untracked docs/architecture/AAPM_CUSTOMER_BUSINESS_PLATFORM_ARCHITECTURE_MASTERPLAN.md |
| Required T7 workstream file | Missing at docs/governance/workstreams/T7-AAPM-001-TEN4SEVEN-ECOSYSTEM-ADAPTATION.md   |

SOURCE — the optional Farm comparison checkout used for current-state
evidence:

| Field          | Value                                                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Local path     | D:/SA/aapm-farm-p1-seed                                                                                                |
| Branch         | feature/ECO-FARM-005-farm-p1-seed                                                                                      |
| HEAD           | e43867090740526ebdd7d75d3d481a3d5e14df24e                                                                              |
| Worktree       | Heavily dirty with tracked and untracked changes                                                                       |
| Evidence files | docs/architecture/CURRENT_STATE_ARCHITECTURE_2026-09-10.md; docs/architecture/ECO-FND-003_FOUNDATION_FIT_2026-09-10.md |

The Farm evidence is a dated local proof snapshot. It is not a clean release
baseline and does not prove production or ERP authority.

### 1.4 Ten4Seven references read

SOURCE — the following files and generated projections were read before this
map was written:

- AGENTS.md
- README.md
- package.json
- generated/agent-index.json
- generated/ownership-rules.json
- generated/recipes.compact.json
- generated/components.compact.json
- generated/aliases.json
- generated/brand-profiles.json
- generated/foundation.json
- packages/contracts/src/types.ts
- packages/contracts/src/foundation.ts
- packages/contracts/src/theme-profile.ts
- packages/contracts/src/theme-recipe.ts
- packages/contracts/src/brand-profile.ts
- packages/contracts/src/authentication.ts
- packages/contracts/src/entity-list.ts
- packages/contracts/src/entity-detail.ts
- packages/contracts/src/operational-patterns.ts
- packages/contracts/src/canonical.ts
- packages/ui/README.md
- packages/ui/package.json
- packages/ui/src/index.ts
- packages/ui/src/provider.tsx
- packages/ui/src/components.tsx
- packages/ui/src/navigation.tsx
- packages/ui/src/blocks.tsx
- packages/ui/src/data-grid.tsx
- packages/ui/src/data-display.tsx
- packages/ui/src/charts.tsx
- packages/tokens/src/theme.ts
- packages/icons/src/index.tsx
- packages/agent/src/retrieval.mjs
- packages/agent/src/node.mjs
- packages/agent/src/core.mjs
- scripts/generate-contract-projections.mjs
- docs/THEMING.md
- docs/ai/APPLY_TO_EXISTING_WEB.md
- docs/integration/NEXTJS_APP_ROUTER_COMPATIBILITY.md
- packages/ai/catalog/components.json
- packages/ai/catalog/recipes.json
- packages/ai/catalog/blocks.json
- packages/ai/catalog/icons.json

### 1.5 AAPM references read

SOURCE — the following architecture and design-system references were read
from D:/SA/AAPM_Ecosystem:

- START_HERE.md
- docs/design-system/README.md
- docs/design-system/brand/README.md
- docs/design-system/brand/AAPM_BRAND_DESIGN.md
- docs/design-system/brand/tokens/aapm-brand.tokens.json
- docs/architecture/PLATFORM_FOUNDATION_CONTRACT.md
- docs/architecture/BUSINESS_MODULE_CONTRACT.md
- docs/architecture/INITIAL_CAPABILITY_MODULE_MAP.md
- docs/architecture/FARM_FIRST_VALUE_SLICE_CONTRACT.md
- docs/architecture/ARCHITECTURE_FITNESS_RULES.md

UNKNOWN — the queue-requested
docs/governance/workstreams/T7-AAPM-001-TEN4SEVEN-ECOSYSTEM-ADAPTATION.md was
not present in that checkout. No replacement workstream document was created,
and no governance decision is inferred from nearby files.

### 1.6 Farm references read

SOURCE — the following optional local evidence was read from
D:/SA/aapm-farm-p1-seed:

- docs/architecture/CURRENT_STATE_ARCHITECTURE_2026-09-10.md
- docs/architecture/ECO-FND-003_FOUNDATION_FIT_2026-09-10.md

These documents classify the current Farm implementation as a local/disposable
proof with useful properties but material platform, module, identity, mobile
offline, and ERP-boundary gaps. They are used here to test fit and identify
consumer requirements, not to promote Farm code into Ten4Seven.

### 1.7 Q01 write boundary

SOURCE — the only intended Q01 mutation is this file:

docs/aapm/T7-AAPM-001-Q01-CURRENT-TARGET-FIT.md

No component source, contract source, token, style, generated projection,
package metadata, dependency, test, snapshot, fixture, runtime configuration,
consumer application, or native code was changed by Q01.

## 2. Current Ten4Seven architecture map

### 2.1 Logical flow

SOURCE — the current architecture can be represented as:

    typed contracts in packages/contracts/src
        -> scripts/generate-contract-projections.mjs
            -> generated/index.json and compact projections
            -> packages/agent/generated selective recipe/component shards
                -> packages/agent retrieval and t7ui CLI

    packages/tokens/src and theme contracts
        -> theme resolver and Ten4SevenProvider
            -> data-t7 attributes, CSS variables, theme scopes
                -> @ten4seven/ui components and consumer composition

    packages/icons semantic registry
        -> T7Icon semantic names
            -> local Solar and curated provider mappings
                -> consumer product UI

    @ten4seven/ui root client package
        -> React DOM primitives, patterns, blocks, provider, motion, fonts
            -> consumer web applications and local package tarball proof

The generated projections are an agent-facing retrieval surface, not an
independent source of truth. Typed contract source is intended to outrank
legacy human catalog entries when a recipe has migrated.

### 2.2 Current package and runtime characteristics

SOURCE — the package is a private, UNLICENSED, self-contained React UI
package. Its root entry is a client boundary because the provider and
interactive components use hooks, refs, portals, browser APIs, and DOM
behavior. The package exposes root and style/theme/component slices, bundles
CSS/tokens/fonts/icons/motion, and keeps React and React DOM as peer
dependencies.

SOURCE — current architecture owns:

- generic interaction contracts and canonical components;
- theme axes, token resolution, density, contrast, motion, and theme scopes;
- semantic icon names and local provider mappings;
- generic recipes such as entity-list and entity-detail;
- operational pattern composition;
- AI retrieval, compact projections, aliases, and ownership rules.

SOURCE — current architecture leaves to the consumer:

- API clients and business data;
- authentication and authorization decisions;
- persistence and event handlers;
- validation, business eligibility, thresholds, totals, freshness, and
  large-data architecture;
- domain module ownership and ERP authority.

NORMALIZED — this ownership split is a strong fit with the AAPM architecture
rule that a design platform owns reusable interaction and presentation
semantics while the consuming product owns business authority. It becomes a
problem only when platform-state semantics are absent and consumers are forced
to invent visually and semantically incompatible representations.

### 2.3 Current contract and catalog inventory

SOURCE — live repository inspection found:

| Surface                        |                             Current count or status |
| ------------------------------ | --------------------------------------------------: |
| Full recipes                   |                                                  29 |
| Compact recipes                |                                                  29 |
| Components                     |                                                 150 |
| Component status               |                                     150 implemented |
| Component maturity             |                        31 polished; 119 implemented |
| Blocks                         |                                                  12 |
| Semantic icon entries          |                                                 122 |
| Generated canonical recipes    |                                                  15 |
| Legacy catalog-adapter recipes |                                                  14 |
| Theme recipes                  |            enterprise, product, editorial, commerce |
| Agent profile vocabulary       | enterprise, dashboard, commerce, content, marketing |
| Brand profiles                 |                       neutral-product, aapm-academy |

The three vocabularies above are not interchangeable:

- theme recipe is a visual composition and token-expression choice;
- agent profile is a recipe/catalog retrieval context;
- brand profile is a brand-expression and consumer-slot contract.

NORMALIZED — the vocabulary is usable for the current repository but is not
yet an explicit AAPM ecosystem taxonomy. Q02–Q03 must resolve the relationship
without collapsing distinct concepts into one theme switch.

## 3. AAPM target design-platform requirements

The AAPM documents define a shared ecosystem, not a pixel-identical UI. The
target platform must preserve semantic consistency while allowing Farm,
Mobile, Academy, Operations, and ERP surfaces to use different densities,
layouts, interaction mechanics, and visual expressions.

| Requirement                                               | AAPM evidence                                                        | Ten4Seven fit                                                                           | Classification     |
| --------------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------ |
| Brand Core is shared infrastructure                       | Brand README, AAPM_BRAND_DESIGN.md, brand tokens                     | Semantic token/theme mechanism exists; canonical AAPM profile and provenance do not     | ADAPT              |
| Product theme is distinct from brand identity             | AAPM_BRAND_DESIGN.md                                                 | Theme recipes and ThemeProfile exist, but the AAPM distinction is not typed end to end  | ADAPT              |
| Foundation is cross-surface and business-neutral          | Design-system README, PLATFORM_FOUNDATION_CONTRACT.md                | Generic components, tokens, motion, and consumer ownership fit                          | KEEP               |
| Business modules own business facts and rules             | BUSINESS_MODULE_CONTRACT.md                                          | Consumer-owned data and logic are explicit                                              | KEEP               |
| Platform owns tenant/principal/module context semantics   | PLATFORM_FOUNDATION_CONTRACT.md                                      | No module lifecycle or context-envelope presentation contract                           | ADD                |
| Web and Mobile share semantic contracts                   | FARM_FIRST_VALUE_SLICE_CONTRACT.md, FITNESS_RULES                    | Web composition is strong; native mapping and offline state vocabulary are absent       | SPLIT / ADD        |
| Effective access is server-authoritative                  | PLATFORM_FOUNDATION_CONTRACT.md                                      | Ten4Seven does not claim authz authority, which is correct; UI states need a contract   | ADAPT              |
| SaaS activation is capability-aware and no source fork    | PLATFORM_FOUNDATION_CONTRACT.md, FITNESS_RULES                       | Generic permission-limited state exists; entitlement/provisioning/setup states do not   | ADD                |
| Farm first value works without Inventory                  | FARM_FIRST_VALUE_SLICE_CONTRACT.md, INITIAL_CAPABILITY_MODULE_MAP.md | Generic recipes can compose the slice; Farm-specific contract remains consumer-owned    | ADAPT              |
| Inventory attaches later without owning Production        | Module map, FITNESS_RULES                                            | No Farm module contract in Ten4Seven; ownership can be represented at consumer boundary | ADD                |
| ERP remains behind an adapter until explicit authority    | Platform and Farm contracts                                          | Package does not own ERP logic; data-dense UI needs adapter-aware patterns              | KEEP / ADD         |
| Derived KPIs are server-derived                           | FARM_FIRST_VALUE_SLICE_CONTRACT.md, FITNESS_RULES                    | KPI display is generic and consumer-owned                                               | KEEP               |
| Responsive web has explicit state and navigation behavior | Design-system README, FITNESS_RULES                                  | Web breakpoints and recipe responsive modes exist                                       | ADAPT              |
| Native supports touch, offline, retry, and conflict       | FARM_FIRST_VALUE_SLICE_CONTRACT.md, FITNESS_RULES                    | Not implemented or typed in this package                                                | SPLIT / UNVERIFIED |
| AI agents retrieve canonical contracts rather than guess  | Ten4Seven AI contract plane                                          | Generator and retrieval exist; metadata and AAPM concepts are incomplete                | ADAPT              |
| No raw brand literals in product screens                  | AAPM_BRAND_DESIGN.md                                                 | Token discipline exists; AAPM adapter still needed                                      | ADAPT              |

The AAPM architecture references do not select a database, web framework,
native framework, microservice topology, or production deployment in Q01.
Those remain outside this evidence artifact.

## 4. KEEP / ADAPT / SPLIT / ADD / DEPRECATE matrix

The classifications below describe future treatment. They are not a list of
Q01 source edits.

| Current capability or concern                                            | Decision                                      | Evidence and rationale                                                                                                     | Boundary                         |
| ------------------------------------------------------------------------ | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Typed contracts as the source for migrated decisions                     | KEEP                                          | Generated projections are reproducible and canonical recipes can outrank legacy catalog entries                            | Ten4Seven contract plane         |
| Generated agent index, compact projections, and selective shards         | KEEP                                          | Supports deterministic AI retrieval and avoids loading every catalog for normal queries                                    | Ten4Seven tooling                |
| Generic canonical components and interaction contracts                   | KEEP                                          | 150 components are implemented; the component ownership rule is compatible with AAPM                                       | Ten4Seven foundation             |
| AppShell, Sidebar, NavigationMenu, PageHeader, MobileSidebar             | KEEP                                          | Current shell grammar matches private/public application needs and responsive navigation ownership                         | Ten4Seven web foundation         |
| ThemeProfile, ThemeRecipe, ThemeScope, runtime preferences               | ADAPT                                         | Mechanism is present; AAPM Brand Core, product expression, dark assets, and provenance need explicit mapping               | Ten4Seven plus AAPM adapter      |
| Semantic T7Icon API and local icon provider                              | KEEP                                          | Prevents raw provider strings in consumer product code and supports Farm semantic names                                    | Ten4Seven icon layer             |
| Full local Solar and curated icon bundle                                 | ADAPT                                         | Useful for self-contained distribution, but bundle size and surface ownership need measurement and profile-aware retrieval | Package/distribution             |
| Entity-list and entity-detail recipes                                    | KEEP                                          | Strong fit for Farm operations, ERP collections, and record inspection when consumer supplies authority                    | Ten4Seven recipes                |
| Operational pattern contracts                                            | KEEP                                          | Twelve patterns provide useful generic shells while forbidding business calculations                                       | Ten4Seven patterns               |
| Farm-specific business screens inside Ten4Seven                          | SPLIT                                         | Farm modules own facts, rules, lifecycle, and authority; Ten4Seven should provide generic presentation contracts           | Farm consumer / Ten4Seven        |
| Broad FarmWeb dispatch/composition                                       | SPLIT                                         | Farm evidence identifies composition complexity and broad dispatch coupling                                                | Farm consumer refactor, not Q01  |
| Farm tables, operations, mixing, and ERP-shaped compatibility projection | SPLIT / ADAPT                                 | Farm evidence identifies direct coupling and local proof boundaries                                                        | Farm consumer and adapter        |
| AAPM Brand Core tokens                                                   | KEEP AS AUTHORITY / ADAPT AS CONSUMER PROFILE | Core values are canonical; Ten4Seven may consume them but must not redefine them                                           | AAPM brand authority             |
| AAPM product visual expression                                           | ADD                                           | Farm, Academy, Mobile, Operations, and ERP need distinct profiles over shared semantics                                    | AAPM adapter / profiles          |
| Module entitlement and lifecycle state presentation                      | ADD                                           | AAPM platform contract has states absent from current recipe/state vocabulary                                              | Ten4Seven state contracts        |
| Web/native semantic sharing                                              | ADD                                           | AAPM requires same business contract with different mechanics; current repository is primarily React DOM                   | Cross-surface contract plane     |
| Native implementation in packages/ui                                     | DEPRECATE AS OUT-OF-SCOPE                     | A native parallel primitive family would violate current package ownership and is not authorized by Q01                    | Separate native adapter/consumer |
| Consumer-owned authz, validation, persistence, totals, and domain rules  | KEEP                                          | Explicit current ownership matches AAPM authority and module boundaries                                                    | Consumer/domain                  |
| DataTable and AdvancedDataGrid generic behavior                          | KEEP / ADAPT                                  | Good display/editing substrate; consumer must retain validation, persistence, permissions, and large-data architecture     | Ten4Seven plus consumer          |
| ERP accounting authority and reconciliation                              | DEPRECATE AS PLATFORM OWNERSHIP               | Ten4Seven must not become ERP authority; provide display/interaction contracts only                                        | ERP adapter/consumer             |
| Legacy catalog-adapter recipes                                           | DEPRECATE THROUGH MIGRATION                   | Preserve compatibility until typed contract replacement is complete; do not hand-delete                                    | Generator migration              |
| Catalog/runtime metadata mismatch                                        | ADAPT                                         | ChartLegend catalog says items while runtime source accepts series; this undermines agent trust                            | Contract/catalog QA              |
| Package root client boundary                                             | KEEP WITH CONSTRAINTS                         | Current provider/interactivity requires it; consumers need a documented server/client boundary                             | Package integration              |
| Production adoption or deployment claims                                 | DEPRECATE FROM Q01 EVIDENCE                   | No local architecture map can prove release or acceptance                                                                  | Governance/release               |

## 5. Current package ownership map

| Package or path                | Current owner          | Current role                                                           | AAPM fit                             | Gap or constraint                                                         |
| ------------------------------ | ---------------------- | ---------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------- |
| packages/contracts/src         | Ten4Seven              | Typed themes, foundations, recipes, brand profiles, aliases, ownership | Strong control-plane substrate       | Missing AAPM module-state, native semantic, richer metadata contracts     |
| packages/tokens/src            | Ten4Seven              | Theme axes, palettes, layout geometry, CSS variable resolution         | Strong foundation fit                | Needs AAPM adapter/provenance, not hard-coded brand replacement           |
| packages/icons/src             | Ten4Seven              | Semantic T7Icon and local provider mappings                            | Strong fit for shared semantic names | AAPM semantic taxonomy and bundle cost require explicit policy            |
| packages/ui/src                | Ten4Seven              | React DOM components, patterns, blocks, provider, motion               | Strong web foundation                | Root client boundary; no native implementation; no domain authority       |
| packages/ui/src/provider.tsx   | Ten4Seven              | Theme runtime, scope, persistence, hydration, attributes               | Fits product-theme runtime           | AAPM brand/source/licensing boundary is not represented                   |
| packages/agent/src             | Ten4Seven              | Retrieval, selective loading, CLI-facing resolution                    | Strong AI contract plane             | AAPM concepts and metadata parity not complete                            |
| generated                      | Ten4Seven              | Reproducible agent-facing projections                                  | KEEP                                 | Must remain generator output; never hand-edit for Q01                     |
| packages/ai/catalog            | Ten4Seven              | Human-readable compatibility catalogs                                  | Compatibility surface                | 14 legacy-adapter recipes and at least one observed metadata mismatch     |
| packages/ui/src/components.tsx | Ten4Seven              | App shell, data table, filters, drawers, KPI cluster, generic surfaces | Strong recipe substrate              | Platform-state and dense-ERP patterns need contract-level additions       |
| packages/ui/src/data-grid.tsx  | Ten4Seven              | Bounded editable data grid                                             | Useful for ERP-like data entry       | Consumer remains responsible for authority, validation, totals, scale     |
| packages/ui/src/blocks.tsx     | Ten4Seven              | Public/expressive sections and public shell                            | Fits Academy/content/marketing       | Must not become Farm/ERP business ownership                               |
| package build/export scripts   | Ten4Seven              | Self-contained private package and distribution verification           | Useful for internal foundation       | Size, license, client boundary, and AAPM authorization remain constraints |
| Consumer application           | Consumer               | API, authz, persistence, business state, routing, module ownership     | Required by AAPM                     | Current fit cannot be proven from Ten4Seven alone                         |
| Native consumer/adapter        | Not in current package | Native rendering and platform mechanics                                | Required for AAPM mobile             | UNVERIFIED; no implementation authorized in Q01                           |

## 6. Proposed target logical ownership map

This is a proposed logical map for later contract work. It is not a source
tree, repository move, database design, or implementation decision.

    AAPM Brand Authority
      - Brand Core, official assets, canonical brand tokens, provenance
      - approves changes to shared brand identity
                    |
                    v
    Ten4Seven Design Platform Contract Plane
      - semantic foundation, interaction contracts, tokens, motion, icons
      - generic recipes, blocks, responsive modes, accessibility contracts
      - AI retrieval, generated projections, aliases, ownership rules
      - AAPM adapter/profile vocabulary without owning business facts
                    |
          +---------+----------+
          |                    |
          v                    v
    Web presentation       Native presentation
      - AppShell,            - platform-native rendering
        Navigation,          - touch, safe-area, offline mechanics
        DataTable,           - durable queue/retry/conflict presentation
        Drawer, states       - same semantic contract, different mechanics
          |                    |
          +---------+----------+
                    |
                    v
    AAPM Platform Foundation / Control Plane
      - principal, tenant, support context, capability, entitlement
      - module registry, activation, setup, lifecycle, audit
      - authoritative access and context envelope
                    |
                    v
    Business Modules
      - Farm Context, Flock/Cycle, Production, Feeding, Population/Mortality
      - Inventory, Catalog/Item/UOM, Health, Procurement, Logistics
      - each owns facts, rules, contracts, persistence, and audit
                    |
                    v
    ERP Adapter / ERP Authority
      - explicit adapter boundary until authority and cutover are approved
      - reconciliation and finality remain outside Ten4Seven

NORMALIZED — Ten4Seven should sit above the presentation boundary and beside
the contract vocabulary, not inside the AAPM platform authority or business
module authority. AAPM Brand Authority is a separate governance input and
must not be silently converted into a consumer-editable theme.

## 7. Web versus Native semantic-sharing matrix

The target is semantic sharing, not identical component implementation.

| Semantic concern             | Shared contract meaning                                      | Web expression                                       | Native expression                       | Current status                                                |
| ---------------------------- | ------------------------------------------------------------ | ---------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------- |
| Principal and tenant context | Current authenticated subject and selected tenant            | App shell context, scoped navigation, banners        | Native shell context, scoped navigation | Consumer-owned; presentation contract gap                     |
| Module availability          | Capability and entitlement determine visibility/availability | Navigation item, disabled/hidden state, setup prompt | Tab/action availability, setup prompt   | Generic permission-limited exists; SaaS state missing         |
| Farm selection               | Active farm/resource scope                                   | Select/filter/shell context                          | Native picker/context header            | Consumer-owned; not a Ten4Seven domain contract               |
| Flock/cycle selection        | Active operational scope                                     | Filter/context panel                                 | Native picker/context header            | Consumer-owned; semantic vocabulary needed                    |
| Production and feeding facts | Server-authoritative business facts                          | DataTable/KPI/chart/form                             | Native list/card/form/chart             | Generic display exists; business contract external            |
| Loading/empty/error/stale    | Same user-facing state meaning                               | Inline state, skeleton, EmptyState, Alert            | Native feedback/state surface           | Generic recipe states exist; shared state taxonomy incomplete |
| Permission-limited           | User cannot perform/read operation                           | Disabled action, explanatory state                   | Disabled action, explanatory state      | Partially available in recipe state vocabulary                |
| Offline pending              | Command accepted locally but not finalized                   | Pending badge/queue/sync state                       | Durable queue and retry UX              | UNVERIFIED and absent from current Ten4Seven contract         |
| Conflict                     | Local intent conflicts with server authority                 | Conflict resolution surface                          | Native conflict/retry surface           | Absent from current contract plane                            |
| Finality                     | Server confirms authoritative completion                     | Success/finality status and audit link               | Same semantic status                    | Consumer/business contract required                           |
| Bulk action                  | Selection and action result semantics                        | DataTable/BulkActionBar                              | Multi-select/action sheet               | Web recipe exists; native mapping absent                      |
| Record detail                | Inspect one entity with actions/activity                     | DetailDrawer or route                                | Native stack/modal/detail               | Entity-detail contract exists for web composition             |
| Audit trail                  | Immutable event/actor/time context                           | ActivityFeed/Timeline/KeyValueList                   | Native activity view                    | Generic display exists; audit authority external              |
| Responsive density           | Information hierarchy adapts to viewport/device              | CSS breakpoints and drawers                          | Touch target/safe-area/layout rules     | Web exists; cross-surface typed profile missing               |

PROPOSED — Q07 should define serializable semantic state and intent contracts
where the same state must be rendered by Web and Native. It must not turn
Ten4Seven into an offline queue, synchronization engine, or business
authority.

## 8. AAPM brand and profile gap matrix

SOURCE — AAPM Brand Core currently defines canonical green #318139, orange
#D4451A, white, and neutral #CCC, plus a digital extension including lime,
deep green, warm canvas, green tint, soft surface, and ink. AAPM explicitly
separates Brand Identity, Product Theme, UI Template, Component
Implementation, and Business Logic.

SOURCE — Ten4Seven currently has typed neutral-product and aapm-academy brand
profiles, generic ThemeProfile/ThemeRecipe support, exactColor support, and
semantic tokens. The current theme recipes are enterprise, product, editorial,
and commerce.

| Brand/profile need                   | Current state                                                         | Gap                                                                            | Decision                 |
| ------------------------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------ |
| Consume canonical AAPM Brand Core    | Generic exact colors and semantic palette support                     | No typed AAPM source/provenance adapter in current contract plane              | ADAPT                    |
| Preserve Brand Core authority        | Governance is documented by AAPM, not Ten4Seven                       | Consumer profile ownership and approval boundary not encoded                   | ADD                      |
| Farm visual-rich expression          | AAPM describes Farm as visual-rich                                    | No Farm brand profile or expression contract                                   | ADD                      |
| Mobile expression                    | AAPM describes native/touch/offline                                   | aapm-academy exists, but Mobile is not represented as a cross-surface profile  | ADD / SPLIT              |
| Academy expression                   | aapm-academy profile exists                                           | Need official asset/provenance/licensing confirmation                          | ADAPT / UNVERIFIED       |
| Operations/ERP restrained expression | Enterprise/product recipes exist                                      | No AAPM-specific restrained profile or density guidance                        | ADD                      |
| Dark-mode and official assets        | Theme system supports light/dark; AAPM documents official dark assets | Asset set and authority are not connected to the profile contract              | ADAPT                    |
| Business status colors               | AAPM separates brand colors from status tokens                        | Current generic foundation has domain separation; AAPM mapping is not explicit | KEEP / ADAPT             |
| Product-specific theme freedom       | ThemeScope and runtime preferences exist                              | Need rule that theme customization cannot rewrite Brand Core                   | ADAPT                    |
| Accessibility contrast               | Theme and contrast preferences exist                                  | AAPM profile-specific contrast verification is not evidenced                   | ADD / UNVERIFIED         |
| Commercial/license boundary          | Package is private and UNLICENSED                                     | PT AAPM authorization and redistribution terms are UNKNOWN                     | ADD evidence; UNVERIFIED |

PROPOSED — the adapter should map canonical AAPM brand tokens into semantic
Ten4Seven tokens and profiles. Product consumers may select expression,
density, and layout within that boundary; they may not silently redefine the
master logo or Brand Core.

## 9. Responsive contract gap matrix

SOURCE — Ten4Seven has foundation viewport rules around AppShell/Sidebar,
NavigationMenu, and PublicShell; CSS and recipes cover table scroll/stacked
behavior, collapsible navigation, detail drawers, mobile filters, and
top/bottom/safe-area navigation. The entity-list recipe gives an explicit
desktop/tablet/mobile treatment.

| Responsive concern        | Current evidence                                                         | AAPM target need                                                               | Decision           |
| ------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------ |
| Private application shell | AppShell, Sidebar, MobileSidebar, Drawer                                 | Consistent module navigation across SaaS surfaces                              | KEEP / ADAPT       |
| Public/content shell      | PublicShell, NavigationMenu, TopNavigation                               | Academy/content surface without enterprise sidebar                             | KEEP               |
| Page-level composition    | PageHeader and bounded content                                           | Same shell grammar across products                                             | KEEP               |
| Data table behavior       | Table/DataTable scroll or stacked                                        | ERP/Farm dense data needs explicit density and authority-aware states          | ADAPT              |
| Filter behavior           | FilterToolbar and FilterDrawer                                           | Filter state must survive responsive transformation without duplicated systems | KEEP               |
| Detail behavior           | DetailDrawer and entity-detail recipe                                    | Farm/ERP record inspection and audit actions                                   | KEEP / ADAPT       |
| Viewport thresholds       | Typed foundation thresholds and CSS breakpoints                          | Cross-surface semantic profiles, not just web pixels                           | ADAPT              |
| Native layout mechanics   | Not in current package                                                   | Touch, safe-area, keyboard, gesture, offline queue surfaces                    | SPLIT / ADD        |
| Module navigation         | Generic navigation only                                                  | Capability-aware availability, setup, suspended, and dependency states         | ADD                |
| Accessibility             | Component-level contracts and keyboard behavior exist in catalogs/source | Cross-profile and native verification evidence                                 | ADAPT / UNVERIFIED |
| Large data scale          | Consumer owns large-data architecture                                    | ERP route performance needs a measured contract/budget                         | ADD                |
| Visual density            | Runtime density preference and layout geometry exist                     | Operations/ERP/Farm density profiles need AAPM mapping                         | ADAPT              |

NORMALIZED — the current web responsive model is reusable. The gap is not a
request for a second mobile web component system; it is a missing semantic
contract for how the same capability, state, and action maps across web and
native surfaces.

## 10. SaaS and module-state UI gap matrix

SOURCE — AAPM Platform Foundation defines effective access as the intersection
of authenticated principal, active tenant membership, entitlement/capability
when applicable, permission, resource scope, and support context. It also
defines lifecycle states including NOT_ENTITLED, ENTITLED, PROVISIONING,
SETUP_REQUIRED, ACTIVE, SUSPENDED, RESUMING, and RETIRING/ARCHIVED.

SOURCE — Ten4Seven recipe state vocabulary includes loading, ready, empty,
search-empty, filter-empty, permission-limited, API error, stale, bulk
pending/partial-failure/success, and detail-open. These are useful
presentation states but do not replace platform lifecycle or access
authority.

| Platform/module state         | Current Ten4Seven representation                            | Required target presentation                                               | Decision      |
| ----------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------- | ------------- |
| NOT_ENTITLED                  | Permission-limited can partially express unavailable access | Explain capability/entitlement boundary without leaking business authority | ADD           |
| ENTITLED                      | No explicit module state                                    | Ready to activate or provision                                             | ADD           |
| PROVISIONING                  | Loading is too generic                                      | Progress/queued/provisioning state with safe retry semantics               | ADD           |
| SETUP_REQUIRED                | Empty or incomplete can be misleading                       | Setup checklist/next action state                                          | ADD           |
| ACTIVE                        | Ready is generic                                            | Active module navigation and normal product shell                          | KEEP / ADAPT  |
| SUSPENDED                     | Permission-limited or error is misleading                   | Suspended reason/action state, history preserved                           | ADD           |
| RESUMING                      | Loading is too generic                                      | Resume progress and safe retry                                             | ADD           |
| RETIRING/ARCHIVED             | Empty/stale is misleading                                   | Read-only/archive state and historical access                              | ADD           |
| Dependency unavailable        | API error is too generic                                    | Dependency-aware degraded state without pretending business result         | ADD           |
| Support context               | Not represented in current recipe state                     | Support/impersonation context indicator and audit link                     | ADD           |
| Entitlement versus permission | Current generic permission state                            | Distinguish commercial capability from user permission                     | ADD           |
| Plan-name logic               | Not owned by Ten4Seven, which is correct                    | Keep plan logic server/control-plane owned                                 | KEEP boundary |

PROPOSED — Q05 should provide presentation contracts and canonical state
components/recipes for these states. It should not calculate effective access,
entitlements, plan eligibility, provisioning, or module business rules in the
UI package.

## 11. Farm P1 recipe and pattern gap matrix

SOURCE — the Farm first-value slice is Authenticate → Principal/Tenant → Farm
→ Flock/Cycle → Production + Feeding + Population/Mortality → Farm Overview.
Inventory is attachable later; ERP remains behind an adapter. The Farm local
current-state evidence includes useful farm scoping, serializable
transactions, item-scoped UOM, idempotency, immutable mobile facts, and
server-derived FCR, but also identifies local identity, uneven API coverage,
mobile offline gaps, FarmWeb complexity, and no live ERP authority.

| Farm P1 capability           | Current Ten4Seven substrate                            | Missing target fit                                                                  | Decision                         |
| ---------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------- | -------------------------------- |
| Authentication/context entry | Authentication recipe and shells                       | AAPM principal/tenant/module context remains consumer/platform-owned                | KEEP / ADAPT                     |
| Farm selection               | Entity-list/filter/table primitives                    | Farm resource scope and server authority are not Ten4Seven domain contracts         | KEEP substrate; consumer-owned   |
| Flock/cycle workspace        | Entity-list/detail, process-workspace pattern          | No Farm cycle semantic contract or lifecycle vocabulary                             | ADD at consumer/adapter boundary |
| Production capture           | Forms, DataTable, AdvancedDataGrid, states             | Production facts, validation, finality, and derived rules are consumer-owned        | KEEP substrate                   |
| Feeding workflow             | Entity-list, data grid, status/metric components       | Feeding/stock coupling and authority need module contract, not a visual patch       | SPLIT / consumer work            |
| Population/mortality         | Data display and activity patterns                     | Domain semantics and server-derived facts absent from Ten4Seven                     | ADD consumer recipe input        |
| Farm Overview                | KPICluster, MetricCard, charts, control-tower pattern  | Overview read model and KPI authority remain external                               | KEEP substrate / ADAPT state     |
| Inventory attach later       | Entity-list, receiving-console, load-planning patterns | Attachability and ownership boundary not represented                                | ADD contract proof later         |
| Mixing                       | Data grid and process pattern                          | Farm evidence shows current stock/ERP coupling; no direct design-platform ownership | SPLIT                            |
| Health                       | Generic forms/activity                                 | Explicit module isolation and domain contract required                              | ISOLATE outside Ten4Seven        |
| Mobile capture/offline       | Shared visual semantics only                           | Durable queue, idempotency, retry, conflict, immutable facts                        | SPLIT / Q07                      |
| ERP/finance                  | Tables, charts, records                                | No ERP authority or reconciliation contract in Ten4Seven                            | KEEP display only; adapter-owned |

PROPOSED — Q06 should use these findings to select a bounded Farm reference
recipe only after the contract and profile constraints are accepted. It must
not design a new Farm UI by intuition or treat the local Farm proof as
production adoption.

## 12. ERP and data-dense gap matrix

SOURCE — current Ten4Seven provides lightweight Table and DataTable families,
DataTable column visibility, sorting/selection/row interaction, pagination
composition, KPI/metric/chart displays, ActivityFeed/Timeline, KeyValueList,
RecordSummary, ActionFooter, DetailDrawer, and a bounded AdvancedDataGrid with
editing states. AdvancedDataGrid explicitly leaves validation, persistence,
permissions, totals, and large-data architecture to the consumer.

| ERP/data-dense concern      | Current substrate                                    | Gap or risk                                                               | Decision                                        |
| --------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------- |
| Comparable collections      | Table/DataTable/entity-list                          | Strong generic fit; consumer supplies authority                           | KEEP                                            |
| Sorting/filtering/selection | DataTable and FilterToolbar                          | Needs explicit data-volume and server-pagination contract                 | ADAPT                                           |
| Inline editing              | AdvancedDataGrid                                     | Generic row states exist; business validation/persistence remain external | KEEP boundary                                   |
| Accounting finality         | Status/Activity/ActionFooter only                    | Posting/period/finality/reversal semantics are not generic UI authority   | ADD presentation vocabulary; external authority |
| Reconciliation              | Tables/charts/detail surfaces                        | No canonical reconciliation workflow contract                             | ADD later if evidence demands                   |
| Approval/review             | ActionFooter, ActivityFeed, Alert                    | No typed approval/rejection/delegation pattern identified                 | ADD only with bounded use case                  |
| Auditability                | ActivityFeed/Timeline/KeyValueList                   | Event authority and immutable audit remain consumer/platform-owned        | KEEP substrate / ADAPT metadata                 |
| Large collections           | DataTable                                            | No evidenced virtualization or route performance budget                   | ADD measurement and distribution track          |
| Dense responsive behavior   | Scroll/stacked modes                                 | ERP users may need explicit column priority/frozen-column semantics       | ADAPT                                           |
| Keyboard workflows          | Component contracts/source support keyboard behavior | Full ERP keyboard matrix not evidenced                                    | UNVERIFIED / Q08                                |
| Server-side authority       | Consumer ownership rule                              | Correct boundary; UI must not infer ledger or stock truth                 | KEEP                                            |
| ERP legacy leakage          | Ten4Seven has no ERP integration                     | Farm local proof identifies legacy-shaped compatibility risk              | KEEP separation / adapter required              |

NORMALIZED — Ten4Seven is suitable as an ERP presentation substrate, not as
an ERP accounting engine, ledger authority, stock authority, reconciliation
engine, or permission engine.

## 13. Package, performance, and distribution risks

| Risk                             | Evidence                                                                                                     | Impact                                                                               | Treatment                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| Root client boundary             | packages/ui/src/index.ts begins with use client; provider and interactive graph require browser capabilities | Server-component consumers cannot import the package indiscriminately                | KEEP with documented client wrapper; Q02/Q08 verify       |
| No server-safe entry             | Next compatibility document states no /server surface until canonical server-safe graph exists               | App Router integration must preserve server/client split                             | ADAPT documentation/contracts; no new server entry in Q01 |
| Private UNLICENSED package       | packages/ui/package.json and verification script                                                             | Internal distribution is possible, but external/official AAPM adoption is not proven | UNVERIFIED license/authorization gate                     |
| Observed bundle size             | Compatibility evidence recorded about 10.74 MB minified and 2.11 MB gzip on 2026-09-03                       | Large bundle may affect Farm/ERP routes and native-adjacent reuse                    | ADD route/package measurement                             |
| Local icon bundle                | README records about 7,962 local Solar names plus curated entries                                            | Self-contained/no-CDN behavior is strong but increases package weight                | ADAPT selective loading/budget                            |
| No Farm route performance budget | Compatibility evidence explicitly notes no Farm route budget                                                 | Cannot claim dense operational readiness from component presence                     | ADD Q08 budget and measured proof                         |
| Peer React compatibility         | React and React DOM are peer dependencies at >=18.2                                                          | Consumer version compatibility remains an integration concern                        | KEEP; verify per consumer                                 |
| Generated output duplication     | Root generated projections and packages/agent/generated shards                                               | Stale projection risk if generation is skipped                                       | KEEP generator source-of-truth; add CI parity proof       |
| Catalog/runtime parity           | ChartLegend catalog importantProps reports items while runtime source accepts series                         | AI-generated usage can be wrong even when component is implemented                   | ADAPT contract/catalog verification                       |
| AAPM authorization               | PT AAPM licensing/authorization is not evidenced in current Ten4Seven refs                                   | Adoption or redistribution claims would be premature                                 | UNVERIFIED governance/legal gate                          |
| Native package scope             | Current package is React DOM oriented                                                                        | Attempting to force native into the package could create a second primitive system   | SPLIT to native adapter/consumer                          |

No performance conclusion is made from bundle size alone. The observed size is
a risk indicator from a dated local compatibility proof, not a current
production measurement.

## 14. AI-contract and generator gaps

### 14.1 What is working

SOURCE — the current AI contract plane has a clear sequence:

    typed contract source
      -> contracts:generate
      -> generated index/compact/alias/ownership projections
      -> selective recipe and component shards
      -> t7ui inspection, find, brand resolution, and agent retrieval

SOURCE — the current CLI proof successfully resolved:

- entity-list as a canonical operational-collection recipe with
  AppShell/PageHeader/DataTable and conditional KPI/filter/pagination/bulk/
  detail surfaces;
- control-tower as a reusable operational pattern with KPI, data, activity,
  and detail components;
- aapm-academy authentication as a brand expression with consumer-owned
  mark/media/copy/handlers/legal slots and zero agent-owned business
  decisions.

These are suitable foundations for bounded agent retrieval.

### 14.2 Contract-plane gaps

| Gap                                                     | Evidence                                                                                                                                                                                                               | Consequence                                                                                 | Proposed treatment                                               |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| ComponentContract is thinner than full catalog metadata | Typed component contract exposes id/displayName/status/category/level/maturity/purpose/source/aliasOf/recipes/importantProps; human catalog additionally carries API, states, accessibility, tokens, and relationships | Agent may retrieve an implemented component without all contract-critical usage constraints | ADAPT typed source/projections in a later bounded queue          |
| Catalog/runtime mismatch                                | ChartLegend catalog says important prop items; runtime source accepts series                                                                                                                                           | Generated guidance can be semantically wrong                                                | ADD generator/catalog parity validation                          |
| Legacy recipe-adapter population                        | 14 of 29 recipes remain legacy catalog adapters                                                                                                                                                                        | Retrieval may use two decision models with unequal guarantees                               | DEPRECATE through typed migration; preserve compatibility        |
| Theme/profile vocabulary overlap                        | Theme recipes, agent profiles, and brand profiles use different IDs                                                                                                                                                    | AAPM profile selection can be conflated with visual recipe selection                        | ADD explicit vocabulary/relationship fields                      |
| AAPM module lifecycle absent                            | Current state vocabulary lacks entitlement/provisioning/setup/suspended/resuming/retiring                                                                                                                              | Agents may use loading/error/permission-limited for wrong product states                    | ADD typed platform-state presentation contract                   |
| Web/native semantics absent                             | Contracts are mostly React/web composition contracts                                                                                                                                                                   | Native consumers cannot retrieve shared intent/state semantics cleanly                      | ADD serializable semantic layer; native rendering stays separate |
| Farm authority absent by design                         | Operational patterns forbid business calculations and use consumer data                                                                                                                                                | Correct ownership, but no Farm recipe can be assumed from generic patterns                  | ADD only bounded consumer-facing recipe contracts                |
| Governance provenance absent                            | Required T7 AAPM workstream file is missing                                                                                                                                                                            | No authoritative queue-specific acceptance trace                                            | Record as UNKNOWN; resolve before final acceptance               |

### 14.3 Generator ownership rules

PROPOSED — Q02 should preserve the current generator discipline:

- update typed source first;
- regenerate all projections;
- validate compact and full surfaces for parity;
- keep compatibility catalogs until a typed replacement is accepted;
- never hand-edit generated files to make a retrieval result appear complete;
- keep business authority, API clients, persistence, and permissions outside the
  generic component contract.

## 15. Exact proposed scope for Q02–Q08

The following is the narrowest proposed queue decomposition consistent with
the evidence. It is not authorization to execute any later queue.

| Queue                                                               | Proposed bounded scope                                                                                                                                                                                                     | Explicit exclusions                                                                                                                     | Exit evidence                                                                                                   |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Q02 — contract plane and ownership                                  | Add or refine typed relationships for AAPM adapter/profile, platform-state presentation, cross-surface semantic intents, and richer component metadata; reconcile component/catalog runtime parity; regenerate projections | No Farm business logic, no native implementation, no AAPM Brand Core rewrite, no dependency changes unless separately authorized        | Typed-source diff, generated parity, ownership matrix, tests for retrieval and catalog/runtime compatibility    |
| Q03 — brand/profile/theme adapter                                   | Map canonical AAPM Brand Core tokens and provenance into semantic Ten4Seven profiles; define Farm/Mobile/Academy/Operations/ERP expression constraints; verify dark/contrast/license unknowns                              | No raw literals in product screens, no logo replacement, no claim of official asset/license acceptance                                  | Token/profile contract, provenance table, theme runtime proof, contrast evidence, unresolved authorization list |
| Q04 — responsive and module-state presentation                      | Formalize shared shell/navigation/data-density/viewport semantics and lifecycle/access states for web composition and native mapping                                                                                       | No authz/entitlement calculation, no second mobile web system, no native renderer in React package                                      | Contract examples, web responsive QA, state matrix, consumer ownership proof                                    |
| Q05 — SaaS/control-plane patterns                                   | Provide generic presentation patterns for NOT_ENTITLED, ENTITLED, PROVISIONING, SETUP_REQUIRED, ACTIVE, SUSPENDED, RESUMING, RETIRING/ARCHIVED, dependency-unavailable, and support context                                | No plan-name logic, provisioning engine, access engine, audit authority, or persistence                                                 | State contract, accessibility/interaction QA, server-authoritative input boundary                               |
| Q06 — Farm P1 reference composition                                 | Compose a bounded Farm first-value reference using accepted generic contracts and consumer-supplied domain data; prove Farm Overview/Flock/Production/Feeding presentation fit                                             | No new Farm backend, no ERP cutover, no local proof promotion, no new Farm UI by intuition, no hidden fixture controls in product shell | Reference recipe/pattern evidence, route/state/responsive proof, authority and module-boundary review           |
| Q07 — native semantic and offline proof                             | Define/verify serializable semantic states and command outcomes that Web and Native can render; document offline pending/retry/conflict/idempotency semantics                                                              | No forced React DOM reuse on native, no sync engine, no business fact authority, no claim of mobile production readiness                | Cross-surface contract fixtures, native adapter proof if authorized, offline state evidence                     |
| Q08 — ERP density, performance, distribution, and release readiness | Measure data-dense routes, bundle/package slices, generated parity, App Router boundaries, keyboard/accessibility, and internal distribution constraints                                                                   | No ERP authority, ledger/stock calculations, deployment, publish, merge, or license assumption                                          | Reproducible performance and package evidence, compatibility matrix, final governance decision                  |

The queue order should remain Q01 → Q02 → Q03 → Q04 → Q05 → Q06 → Q07 →
Q08 unless later accepted evidence changes the sequence. Q01 itself performs no
work from those queues.

## 16. Risks, unknowns, current gate, and next gate

### 16.1 Material risks and unknowns

1. UNKNOWN — the required queue-specific AAPM workstream document is missing
   from D:/SA/AAPM_Ecosystem. The current adaptation map is therefore based on
   the program file, Q01 file, canonical AAPM architecture/design references,
   and local repository evidence, not that missing governance artifact.
2. UNVERIFIED — no explicit AAPM approval, PT AAPM license, or redistribution
   authorization was found in the inspected Ten4Seven references.
3. UNVERIFIED — no production deployment, accepted package adoption, or
   production route performance result is established.
4. UNVERIFIED — no native implementation or mobile offline proof exists in the
   Ten4Seven package evidence.
5. OBSERVED — the Farm comparison checkout is heavily dirty and represents a
   disposable local proof, so Farm findings are dated and non-authoritative
   for production.
6. OBSERVED — AAPM architecture documents describe target contracts and
   principles, while the required ecosystem-adaptation workstream is absent;
   this map must not be treated as acceptance of an unrecorded masterplan.
7. OBSERVED — Ten4Seven has 14 legacy catalog-adapter recipes and a
   ChartLegend catalog/runtime parameter mismatch; both reduce agent-contract
   confidence until corrected.
8. OBSERVED — the package root client boundary, local icon bundle, and dated
   bundle-size proof create integration/performance constraints for App Router,
   Farm, and ERP use.
9. PROPOSED — AAPM module-state presentation should be added as a generic
   semantic contract, while effective access and lifecycle authority remain in
   the platform/control plane.

### 16.2 Current Q01 gate

SOURCE — Q01 evidence requirements are satisfied by this document:

- branch, SHA, dirty baselines, and write boundary are recorded;
- Ten4Seven architecture and AI contract plane are mapped;
- AAPM foundation, design-system, brand, Farm-first, and fitness requirements
  are mapped;
- KEEP / ADAPT / SPLIT / ADD / DEPRECATE decisions are explicit;
- package ownership and proposed target ownership are separated;
- Web versus Native semantics are separated from implementation;
- brand, responsive, SaaS/module-state, Farm P1, ERP/data-dense,
  performance/distribution, and AI-contract gaps are recorded;
- Q02–Q08 scope is bounded and exclusions are explicit;
- missing governance input and other unknowns are not fabricated;
- no Q02 implementation was started.

### 16.3 Next gate

The next gate is Q02 contract-plane review, constrained by the missing
workstream document and the unresolved authorization/performance/native
questions. Q02 should start only from an explicit Q02 queue instruction and
must re-check branch, SHA, dirty state, and the current AAPM governance
authority before mutation.

## 17. Q01 gate decision

# PASS WITH CONSTRAINTS FOR Q02

Q01 is complete as an evidence-only current-to-target fit map. The result
authorizes no implementation by itself. Q02 may proceed only under its own
explicit queue instruction, with the following constraints carried forward:

- do not treat this document as AAPM product or production acceptance;
- resolve or explicitly carry the missing
  T7-AAPM-001-TEN4SEVEN-ECOSYSTEM-ADAPTATION.md governance input;
- preserve the AAPM Brand Core and keep provenance/authorization visible;
- keep business authority, effective access, persistence, ERP authority, and
  native synchronization outside generic Ten4Seven components;
- use typed contract source and regeneration for all AI-plane changes;
- keep Farm local proof separate from production adoption;
- preserve pre-existing dirty worktree state;
- stop after Q02 until the user provides the next queue instruction.
