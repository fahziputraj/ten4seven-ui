# T7-AAPM-001 Q02 — Platform-Neutral Contract Plane Evidence

Status: Evidence complete for the Q02 gate  
Mode: STRICT / BOUNDED-WIDE  
Risk: R2 — shared design-system contract  
Target repository: fahziputraj/ten4seven-ui  
Target checkout: D:/SA/ten4seven-ui  
Captured: 2026-09-10 (Asia/Jakarta)

## Decision summary

Q02 establishes a single typed, platform-neutral contract plane without
splitting the existing React DOM package and without changing existing
Ten4Seven UI consumers.

The canonical boundary is now:

    packages/contracts/src/platform-neutral.ts
        -> packages/contracts/src/canonical.ts
            -> scripts/generate-contract-projections.mjs
                -> generated/platform-neutral.json
                -> packages/agent/generated/platform-neutral.json
                    -> @ten4seven/agent inspectPlatformNeutralContract()

The new contract plane covers:

- semantic component intent;
- presentation state and interaction state vocabularies;
- interaction capabilities for process, board, drag/drop, upload, progress,
  motion, and data visualization;
- responsive capabilities;
- platform-neutral surface-profile identifiers;
- system, consumer, platform-authority, and business-module ownership;
- explicit DOM, React, native-framework, transport, and business exclusions;
- a machine-readable generated projection and selective agent retrieval path.

The existing React DOM implementation remains the renderer. Existing root
imports from @ten4seven/ui remain untouched. No native package, server entry,
visual component rewrite, AAPM brand literal, business-domain rule, or package
release was introduced.

The Q02 gate is:

> PASS WITH CONSTRAINTS FOR Q03

The constraints are material: Q02A was supplied during this execution as an
inserted documentation/evidence queue before the original Q03, but Q02A was
not executed here. Full component-by-component semantic assignment, AAPM brand
mapping, surface maturity, visual hardening, native mechanics, Farm adoption,
and ERP performance remain later bounded work.

## 1. Evidence boundary and repository coordinates

### 1.1 Evidence labels

- SOURCE — read directly from a checked-out file, generated projection,
  command output, or recorded repository state.
- OBSERVED — directly observed in local repository/runtime inspection, not a
  production or governance acceptance.
- NORMALIZED — a design/ownership interpretation made from SOURCE and OBSERVED
  evidence.
- PROPOSED — a later queue direction, not implemented by Q02.
- UNKNOWN — required authority or evidence was not available.
- UNVERIFIED — would require another repository, runtime, authority, native
  implementation, deployment, or explicit acceptance.

Q02 is a shared contract-plane change. It is not a visual redesign and does
not prove AAPM production adoption, package publication, native parity, Farm
authority, ERP authority, licensing, or deployment.

### 1.2 Pre-Q02 baseline

SOURCE — before Q02 mutation, the target checkout was:

| Field                              | Value                                                          |
| ---------------------------------- | -------------------------------------------------------------- |
| Local path                         | D:/SA/ten4seven-ui                                             |
| Branch                             | feat/icons-aapm-iconify-expansion                              |
| HEAD                               | b07fa697f5fbab75087d25649496e4a07243042a                       |
| Pre-existing tracked modifications | packages/ui/src/styles.css; tests/end-to-end-hardening.spec.ts |
| Pre-existing Q01 artifact          | docs/aapm/T7-AAPM-001-Q01-CURRENT-TARGET-FIT.md                |
| Local dev server                   | Vite at http://127.0.0.1:4173/                                 |

The two tracked modifications and the Q01 artifact were preserved. A local
Vite server was used for inspection; Q02 did not change application routes or
visual source.

### 1.2.1 Final audit coordinates

SOURCE — during finalization, the checkout was observed at:

| Field                        | Value                                           |
| ---------------------------- | ----------------------------------------------- |
| Branch                       | feat/icons-aapm-iconify-expansion               |
| HEAD                         | 2bf29ad2e250edc3c70b63a0e34e3f4da3d72e2a        |
| HEAD subject                 | iconify                                         |
| Q02 changes                  | still uncommitted in the Q02 write boundary     |
| Local dev server after check | Vite at http://127.0.0.1:4173/; HTTP 200 on `/` |

OBSERVED — the `iconify` commit contains the previously dirty stylesheet,
end-to-end hardening spec, and Q01 evidence. It does not contain the Q02
contract-plane files listed in the Q02 write boundary. Q02 did not create,
amend, reset, or publish that commit. The current dirty-state report below
therefore treats the committed baseline as repository history and the
uncommitted Q02 paths as the active queue boundary.

### 1.3 Q02 references

SOURCE — Q02 read:

- docs/aapm/T7-AAPM-001-Q01-CURRENT-TARGET-FIT.md
- AGENTS.md
- README.md
- generated/agent-index.json
- generated/ownership-rules.json
- packages/contracts/src/*
- packages/tokens/src/theme.ts and relevant token sources
- packages/ui/src files needed to map implementation dependencies
- packages/ui/README.md
- docs/integration/NEXTJS_APP_ROUTER_COMPATIBILITY.md
- scripts/generate-contract-projections.mjs
- scripts/verify-contracts.mjs
- packages/agent/src/retrieval.mjs
- packages/agent/src/node.mjs
- packages/agent/src/index.ts
- packages/agent/src/runtime.mjs

SOURCE — AAPM authority read from D:/SA/AAPM_Ecosystem:

- docs/architecture/PLATFORM_FOUNDATION_CONTRACT.md
- docs/architecture/BUSINESS_MODULE_CONTRACT.md
- docs/architecture/ARCHITECTURE_FITNESS_RULES.md

UNKNOWN — the queue-requested parent work item
docs/governance/workstreams/T7-AAPM-001-TEN4SEVEN-ECOSYSTEM-ADAPTATION.md remains
missing from the AAPM checkout. Q02 did not create a substitute governance
document or infer acceptance from a nearby file.

OBSERVED — the user supplied Q02A during Q02 execution. Q02A is recorded as a
queued follow-on specification and was not executed. Its precondition requires
Q02 to finish with PASS FOR Q03 or PASS WITH CONSTRAINTS FOR Q03.

### 1.4 Q02 write boundary

The intended Q02 implementation/evidence boundary was:

- packages/contracts/src/types.ts
- packages/contracts/src/platform-neutral.ts
- packages/contracts/src/canonical.ts
- packages/contracts/src/index.ts
- scripts/generate-contract-projections.mjs
- scripts/verify-contracts.mjs
- packages/agent/src/retrieval.mjs
- packages/agent/src/retrieval.d.mts
- packages/agent/src/node.mjs
- packages/agent/src/node.d.mts
- packages/agent/src/index.ts
- packages/agent/src/runtime.mjs
- packages/agent/src/runtime.d.mts
- generated outputs produced by the canonical generator
- docs/aapm/T7-AAPM-001-Q02-CONTRACT-PLANE-EVIDENCE.md

No component source, token source, CSS, route, navigation, package metadata,
dependency, snapshot, test fixture, native code, server entry, AAPM brand
token, or consumer application was changed.

## 2. Before and after ownership graph

### 2.1 Before Q02

SOURCE — the existing boundary was:

    packages/contracts/src
      - themes, recipes, operational contracts, aliases, basic ownership rules

    packages/tokens/src
      - theme axes, token resolution, geometry, motion, CSS variables

    packages/ui/src and packages/icons/src
      - React DOM implementation, semantic icon rendering, provider, blocks

    packages/agent/src plus generated/
      - recipe/component retrieval and generated projections

    consumer applications
      - API clients, business data, permissions, persistence, routing,
        handlers, domain calculations, lifecycle, audit, integrations

The system/consumer ownership split was documented, but the cross-surface
semantic vocabulary was implicit and the agent projection did not expose a
dedicated platform-neutral contract.

### 2.2 After Q02

SOURCE — the Q02 boundary is:

    packages/contracts/src/platform-neutral.ts
      - typed semantic vocabularies
      - surface-profile descriptors
      - ownership boundary
      - renderer/business exclusions

    packages/contracts/src/canonical.ts
      - canonical registry entry: platformNeutral

    scripts/generate-contract-projections.mjs
      - sourceOfTruth metadata
      - contract-plane agent entry point
      - generated index reference
      - platform-neutral projection
      - EOL-preserving deterministic writer

    generated/platform-neutral.json
    packages/agent/generated/platform-neutral.json
      - machine-readable projections produced by the canonical generator

    packages/agent/src/retrieval.mjs and node.mjs
      - path resolution and inspectPlatformNeutralContract()
      - injected filesystem boundary remains separate from semantic contract

    packages/ui/src and consumer applications
      - unchanged renderers and consumers
      - compose the shared contract without inheriting business authority

### 2.3 Ownership rule

NORMALIZED — the platform-neutral plane defines meaning and boundaries; it
does not become a second application runtime.

| Concern                                     | Owner                              | Q02 treatment                                                        |
| ------------------------------------------- | ---------------------------------- | -------------------------------------------------------------------- |
| Interaction contract                        | Ten4Seven system                   | Typed capability/state vocabulary                                    |
| Semantic tokens and icon vocabulary         | Ten4Seven system                   | Existing ownership retained                                          |
| Generic recipes and responsive presentation | Ten4Seven system                   | Existing ownership retained and made retrievable                     |
| Accessibility and motion roles              | Ten4Seven system                   | Capability boundary only; no visual rewrite                          |
| Surface-profile identifiers                 | Ten4Seven system                   | Generic identifiers; no AAPM brand literal                           |
| Business data and calculations              | Consumer/business module           | Explicitly excluded from generic primitives                          |
| User permissions                            | Consumer/control-plane integration | UI receives state; UI does not calculate authority                   |
| Entitlements                                | Consumer/platform integration      | UI receives state; UI does not calculate commercial eligibility      |
| Persistence                                 | Consumer                           | Explicitly excluded                                                  |
| Routing and navigation state                | Consumer                           | Generic navigation can render intent; product owns routing           |
| Event handlers                              | Consumer                           | Generic components expose interaction contract only                  |
| Principal/tenant context                    | Platform authority                 | Presentation can represent context; Ten4Seven does not own authority |
| Effective access/module lifecycle           | Platform authority                 | Presented through future generic states, not computed here           |
| Workflow authority and reconciliation       | Business module/ERP boundary       | Not embedded in generic contracts                                    |

## 3. Exact platform-neutral contracts introduced

### 3.1 Shared vocabularies

SOURCE — packages/contracts/src/types.ts now defines:

- SurfaceProfileId and SurfacePlatform;
- SemanticComponentIntent;
- PresentationState;
- InteractionState;
- InteractionCapability;
- ResponsiveCapability;
- OwnershipConcern;
- ContractOwnership;
- SurfaceProfileContract;
- ComponentSemanticContract;
- optional semantic, surfaceProfiles, and ownership fields on the existing
  ComponentContract and RecipeContract shapes.

The fields are additive. Existing contract consumers do not need to provide
them, and no existing @ten4seven/ui import changed.

### 3.2 Canonical platform-neutral contract

SOURCE — packages/contracts/src/platform-neutral.ts is the typed source of
truth for the new boundary. It exports:

- PLATFORM_NEUTRAL_INTENTS — action, input, selection, navigation, feedback,
  data-display, data-entry, overlay, layout, composition, identity, and media;
- PLATFORM_NEUTRAL_PRESENTATION_STATES — 13 generic states;
- PLATFORM_NEUTRAL_INTERACTION_STATES — 13 generic interaction states;
- PLATFORM_NEUTRAL_INTERACTION_CAPABILITIES — 9 method-level capabilities;
- PLATFORM_NEUTRAL_RESPONSIVE_CAPABILITIES — 10 cross-surface capabilities;
- PLATFORM_NEUTRAL_OWNERSHIP_CONCERNS;
- PLATFORM_NEUTRAL_OWNERSHIP;
- PLATFORM_NEUTRAL_SURFACE_PROFILES — 5 generic surface identifiers;
- PLATFORM_NEUTRAL_EXCLUSIONS;
- PLATFORM_NEUTRAL_CONTRACT.

The contract is registered in CANONICAL_CONTRACTS and exported from the
@ten4seven/contracts source index. No second decision manifest was created.

### 3.3 Presentation and interaction state vocabulary

| Vocabulary              | Meaning                                              | Renderer obligation                                     | Business authority                         |
| ----------------------- | ---------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------ |
| ready                   | Data or control can be used                          | Present normal content and actions                      | Consumer supplies truth                    |
| unavailable             | Capability/resource is not available in this context | Explain availability without implying a transport error | Platform/consumer supplies reason          |
| disabled                | Control is intentionally non-interactive             | Preserve disabled semantics and reason where available  | Consumer supplies eligibility              |
| loading                 | Work has not resolved                                | Show stable progress/loading feedback                   | Consumer/platform supplies request state   |
| empty                   | Valid scope has no records/content                   | Explain empty scope and next action                     | Consumer supplies scope/data               |
| error                   | Operation or read failed                             | Show actionable error and retry where valid             | Consumer supplies error/finality           |
| permission-denied       | Access is refused                                    | Explain safe access boundary                            | Authority supplies decision                |
| dependency-unavailable  | Required service/module is unavailable               | Distinguish dependency degradation from empty data      | Authority supplies dependency state        |
| setup-required          | Capability exists but is not configured              | Provide clear setup next action                         | Platform/consumer supplies setup authority |
| suspended               | Capability is paused or blocked by lifecycle         | Preserve history and explain resume/contact action      | Platform authority supplies lifecycle      |
| offline                 | Device/network cannot currently reach authority      | Show offline posture and safe actions                   | Native/consumer supplies offline facts     |
| pending                 | Intent has not reached final authority               | Show pending status and avoid duplicate action          | Consumer/platform supplies finality        |
| conflicted              | Local/remote intents disagree                        | Expose conflict resolution path                         | Consumer/platform owns resolution          |
| idle/focus/pressed/etc. | Interaction state, not business state                | Render keyboard/touch/pointer semantics                 | Consumer receives event                    |

The vocabulary deliberately separates presentation state from business status.
For example, pending does not mean posted, paid, approved, or synchronized.
Those meanings remain consumer or authority-owned.

## 4. Designer method-selection contract

The user-requested design direction is recorded here as a contract-plane
principle, not as a visual implementation task. Stripe/Framer-style quality is
treated as a reference for restraint, hierarchy, spacing, alignment, and
interaction refinement—not as a pixel-copy target or AAPM authority.

### 4.1 Method selection by user problem

| User problem                             | Semantic capability        | Preferred UI method to evaluate later                                             | Contract guardrail                                                                                             |
| ---------------------------------------- | -------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Ordered operational steps or checkpoints | process-workflow           | Process workspace, milestone sequence, checklist, or stage flow                   | Show current state, next action, ownership, and blocked reason; do not encode eligibility in the primitive     |
| Moving work between meaningful stages    | board-reorder              | Kanban or grouped board                                                           | Drag/reorder must have keyboard and non-drag alternatives, explicit drop target semantics, and server finality |
| Reordering or attaching items            | drag-and-drop              | Drag handle, sortable list, or bounded dropzone                                   | Never make drag the only path; distinguish preview from committed mutation                                     |
| Adding files or media                    | file-transfer              | Upload control/dropzone with progress, cancel, retry, validation, and error state | Consumer owns storage, file policy, scanning, and persistence                                                  |
| Long-running action or synchronization   | progress-feedback          | Progress bar, step progress, pending state, or activity status                    | Never imply completion from animation alone                                                                    |
| State change or contextual transition    | state-transition           | Motion using canonical t7Motion roles and reduced-motion behavior                 | Motion explains cause/effect; no decorative second runtime                                                     |
| Comparing values across categories       | quantitative-comparison    | Bar/column or table depending precision and comparison count                      | Server/consumer supplies data; chart does not become a KPI authority                                           |
| Observing change over time               | trend-visualization        | Line chart, sparkline, or activity trend                                          | Label time window, empty/stale state, and source/freshness where available                                     |
| Understanding composition/distribution   | distribution-visualization | Stacked bar, segmented display, or other chart after task fit                     | Preserve accessible text/table alternative and avoid decorative chart-only meaning                             |

NORMALIZED — the contract plane should help an agent choose a method by intent
and state. It should not force every task into cards, kanban, drag/drop, a
chart, or a modal.

### 4.2 Canvas, cards, lines, borders, and layers

PROPOSED — later visual hardening should use the following design-system
quality bar:

- Start from the canvas and layout grid. Use direct-to-canvas composition for
  primary hierarchy rather than wrapping every region in a card.
- Use cards to group an actionable or semantically coherent unit, not as a
  default container for every section.
- Use borders and dividers as information architecture: one-pixel structural
  rules, table row boundaries, input boundaries, and section separation should
  be quiet and token-driven.
- Use surface elevation sparingly. A raised surface should communicate a
  relationship such as overlay, temporary focus, or grouped action.
- Align content edges, titles, metrics, controls, and tables to a consistent
  rhythm. Misaligned gutters are a coherence defect even when every component
  is individually valid.
- Let typography establish hierarchy before color, shadow, or ornament. Heading,
  supporting copy, metadata, value, and action should be distinguishable by
  scale, weight, line length, and spacing.
- Use semantic color for action, state, and data domains separately. Brand color
  is not a replacement for success, warning, error, stale, or disabled state.
- Keep density intentional. Dense operations and ERP data need compact scanning;
  content and publishing surfaces need readable measure and breathing room.
- Treat loading, empty, unavailable, dependency, pending, and error states as
  designed compositions, not afterthoughts.
- Use motion to explain state transition, hierarchy, and feedback. Respect
  reduced-motion preferences and reuse canonical motion roles.
- Use chart form only after the operating question is known. A chart should
  make comparison, trend, or distribution easier than a table; otherwise the
  table may be the better method.
- Preserve route-to-route grammar: shell, header, content bounds, action
  placement, surface vocabulary, focus behavior, and responsive transformation
  should be coherent across a product.
- Do not infer quality from ornament, gradients, card count, animation count,
  or visual novelty.

These are design review principles for Q02A and later hardening queues. Q02
does not modify styles, tokens, components, routes, or screenshots.

## 5. DOM, React, native, and business concepts deliberately excluded

SOURCE — PLATFORM_NEUTRAL_EXCLUSIONS explicitly excludes:

- DOM props, CSS classes, selectors, measurements, and browser APIs;
- React components, hooks, refs, portals, context, and React event types;
- native framework widgets, gestures, storage, and synchronization engines;
- API clients, persistence, routing, handlers, and transport details;
- business data, business rules, permissions, entitlements, and calculations.

The new contract does not include a ReactNode, JSX element, HTMLElement,
SyntheticEvent, CSS selector, portal root, browser storage key, native widget,
gesture implementation, drag library, upload transport, chart library, or
business-domain field.

This preserves the existing App Router boundary: @ten4seven/ui remains a
client-capable React DOM package, and no fake @ten4seven/ui/server export or
native re-export was created.

## 6. Compatibility impact

### 6.1 Existing UI consumers

SOURCE — no file under packages/ui/src, packages/tokens/src, or packages/icons/src
was changed by Q02. Existing root imports and component runtime behavior are
therefore unchanged.

The new fields on ComponentContract and RecipeContract are optional. Existing
recipe resolvers continue to use their current intent, required, conditional,
state, responsive, and consumerOwned data.

### 6.2 Agent package

SOURCE — the agent package received additive support:

- resolvePlatformNeutralContractPath() resolves the generated index reference;
- inspectPlatformNeutralContract() loads only generated/index.json and
  generated/platform-neutral.json through the existing filesystem boundary;
- @ten4seven/agent type declarations expose the new inspection result;
- the legacy recipe/component loading paths remain unchanged.

The runtime returns source path and retrieval telemetry. It does not select a
business state, infer a surface, or load the full catalog.

### 6.3 Package and version boundary

SOURCE — no package metadata, dependency, version, release, publish, or export
for @ten4seven/ui was changed. @ten4seven/agent receives an additive source
function but no package release was created.

UNVERIFIED — external package adoption, AAPM authorization, and distribution
license remain outside Q02.

## 7. Generated projection changes

SOURCE — pnpm contracts:generate completed successfully and generated 189
contract projections in both projection roots, plus the existing theme and DTCG
outputs.

The Q02 content changes are:

| Projection                                     | Change                                                                |
| ---------------------------------------------- | --------------------------------------------------------------------- |
| generated/platform-neutral.json                | New machine-readable platform-neutral contract                        |
| packages/agent/generated/platform-neutral.json | Same generated contract for agent package retrieval                   |
| generated/index.json                           | platformNeutral path added                                            |
| packages/agent/generated/index.json            | platformNeutral path added                                            |
| generated/agent-index.json                     | platform-neutral source-of-truth and contract-plane entry point added |
| packages/agent/generated/agent-index.json      | Same agent-facing entry point                                         |
| generated/ownership-rules.json                 | New platform-neutral and explicit consumer ownership rules            |
| packages/agent/generated/ownership-rules.json  | Same ownership projection                                             |

The generator remains the only writer for generated contract projections. The
writer preserves an existing projection's CRLF/LF style, while verification
normalizes line endings for semantic/deterministic comparison. This contains
the known Windows checkout EOL drift and prevents a content-neutral mass diff.

No generated component or recipe decision was hand-edited.

## 8. Validation and test results

| Check                                  | Result                         | Evidence                                                                                                                                                                                                                                                                  |
| -------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Contract package typecheck             | PASS                           | pnpm --filter @ten4seven/contracts typecheck                                                                                                                                                                                                                              |
| Canonical generation                   | PASS                           | pnpm contracts:generate                                                                                                                                                                                                                                                   |
| Contract verification                  | PASS                           | pnpm test:contracts                                                                                                                                                                                                                                                       |
| AI catalog and cold-start verification | PASS                           | pnpm test:ai                                                                                                                                                                                                                                                              |
| Agent package typecheck                | PASS                           | pnpm --filter @ten4seven/agent typecheck                                                                                                                                                                                                                                  |
| Full typecheck                         | PASS                           | pnpm typecheck, including contracts, agent build, and playground typecheck                                                                                                                                                                                                |
| Playground production build            | PASS                           | pnpm build; Vite emitted the existing large-chunk warning without failing                                                                                                                                                                                                 |
| Agent retrieval smoke                  | PASS                           | inspectPlatformNeutralContract() returned generated/platform-neutral.json, 13 states, 9 interaction capabilities, and consumer ownership list                                                                                                                             |
| Targeted source formatting             | PARTIAL / BOUNDED              | The Q02 evidence artifact and newly authored platform-neutral/canonical/generator/verifier files matched targeted Prettier; existing style drift in touched legacy type/agent files was not broad-formatted                                                               |
| Repository-wide format check           | PARTIAL / PRE-EXISTING DEBT    | pnpm format:check reports 281 files across the repository; Q02 did not normalize unrelated docs, catalog, app, test, or legacy source formatting                                                                                                                          |
| Diff whitespace                        | PASS                           | git diff --check                                                                                                                                                                                                                                                          |
| Local app runtime                      | OBSERVED                       | Vite was restored at http://127.0.0.1:4173/ after the earlier terminal session ended and returned HTTP 200 for `/`; no route/source mutation was made by Q02                                                                                                              |
| Rendered browser smoke                 | OBSERVED                       | Playwright rendered `/theme-studio` with title `ten4seven UI — Theme Studio` and exposed the expected navigation, workbench, preview, typography, controls, and component proof; the only console error was the existing `/favicon.ico` 404                               |
| Full repository test chain             | PARTIAL / PRE-EXISTING BLOCKER | pnpm test passed through contract, DTCG, contrast, and token-governance checks, then stopped at test:component-coverage because the pre-existing packages/ui/src/styles.css edit changes the measured literal-pixel count from 862 to 863 while the report remains at 862 |

The full repository test chain was run as an additional health check. Its
component-token failure is outside Q02: packages/ui/src/styles.css was already
dirty before Q02, the generated coverage report was not changed, and Q02 does
not authorize normalizing or regenerating that unrelated artifact. Q02
acceptance is based on the required contract-plane checks, AI verification,
typecheck, build, retrieval proof, and diff whitespace check.

## 9. Unresolved gaps for Q03 and later

1. Q02A surface maturity and publishing-store quality-bar evidence is queued
   by the user but was not executed in this Q02 turn.
2. ComponentContract now has an optional semantic shape, but the 150 legacy
   component records are not yet individually migrated to typed semantic
   assignments. Their full human catalog remains a compatibility surface.
3. The ChartLegend catalog/runtime prop mismatch identified in Q01 remains
   unresolved; Q02 did not rewrite the catalog or chart implementation.
4. AAPM Brand Core mapping, provenance, official assets, dark assets, and
   license/authorization remain for the brand/profile queue. No AAPM color was
   injected into Q02 primitives.
5. Product/surface identifiers are deliberately generic. AAPM Farm, Academy,
   Operations, ERP, and Mobile profile mapping remains a later governed
   decision.
6. Web responsive behavior is represented as platform-neutral capability, but
   no native renderer, safe-area implementation, offline queue, retry engine,
   conflict resolver, or mobile QA was added.
7. Module entitlement, provisioning, setup, suspended, resuming, and archived
   states are represented as vocabulary only. Effective access and lifecycle
   authority remain outside Ten4Seven.
8. The design method-selection table does not approve a universal card, kanban,
   drag/drop, upload, chart, or animation pattern. Each later recipe still
   requires an operating question, accessibility path, data authority, and
   responsive proof.
9. No visual maturity classification was performed. The user-supplied Q02A
   queue is the correct boundary for that evidence.
10. AAPM's queue-specific parent workstream remains missing and must remain
    visible to the next governance gate.

## 10. Proposed next-queue boundaries

### Q02A — Surface maturity and publishing-store quality bar

Documentation/evidence only:

- classify canonical library surfaces, publishing quality reference, and
  lab/proof routes;
- inspect route hierarchy, navigation, spacing, type, semantic color,
  surfaces, density, interaction, states, responsiveness, accessibility,
  noise, polish, coherence, and route consistency;
- record the quality bar without promoting Publishing Store business meaning
  into generic contracts;
- explicitly keep Farm Synthetic separate from target Farm UX.

No source, style, route, contract, generated, test, or snapshot mutation.

### Q03 — Brand/profile/theme adapter

Bounded contract and token-adapter work:

- map canonical AAPM Brand Core through a provenance-aware adapter;
- define product/surface expressions and profile relationships;
- verify dark/contrast/asset/license boundaries;
- preserve Brand Core authority and keep product theme separate.

No raw brand literals in primitives, logo replacement, or business logic.

### Q04 and later

Carry forward the Q01 decomposition:

- Q04: responsive and module-state presentation contracts;
- Q05: SaaS/control-plane state patterns;
- Q06: bounded Farm P1 reference composition;
- Q07: Web/Native semantic and offline proof;
- Q08: ERP density, performance, distribution, and final compatibility proof.

The user-requested design taste should guide these queues through hierarchy,
canvas composition, card restraint, border/divider discipline, typography,
density, interaction method selection, motion, and route coherence. It must not
be used to bypass ownership or evidence gates.

## 11. Risks and constraints

- The Q02 parent workstream document is missing from the AAPM checkout.
- The target worktree remains dirty by design; pre-existing changes must not be
  normalized, staged, committed, or deleted.
- Generated projections have mixed checkout EOL styles; Q02 contains this in
  the generator/verifier rather than broad-formatting the repository.
- The current root UI package is client-bound; Q02 does not claim a server-safe
  entry.
- The component semantic metadata fields are additive but not yet populated
  for every legacy catalog record.
- Generic platform states do not establish server authority, business finality,
  or native synchronization.
- Q02 is not AAPM product acceptance, production deployment, package release,
  or native readiness.

## 12. Q02 gate

Q02 is complete as a bounded platform-neutral contract-plane change. The
following constraints carry forward:

- execute the inserted Q02A evidence queue before original Q03 if the user
  authorizes it;
- do not execute Q02B or any later queue automatically;
- keep AAPM brand mapping and literal injection out of Q02 contracts;
- keep consumer business data, permissions, entitlements, persistence, routing,
  and handlers outside generic primitives;
- preserve the existing @ten4seven/ui root consumer contract;
- use typed contract source and canonical generation for future AI-plane work;
- preserve pre-existing dirty worktree state;
- do not stage, commit, push, publish, tag, merge, or release.

PASS WITH CONSTRAINTS FOR Q03
