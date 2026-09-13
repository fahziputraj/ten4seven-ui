# T7-UNIVERSAL-HARDENING-U09 — Workflow + Productivity + Application Patterns

## 1. Coordinates

- Repository: `fahziputraj/ten4seven-ui`
- Checkout: `D:\SA\ten4seven-ui`
- Branch: `codex/icons-curated-solar-style`
- HEAD at U09 execution: `6d3a8b6647a43cea4c7b09686cd0e0dd50420d9d`
- Queue executed: `T7-UNIVERSAL-HARDENING-U09` only
- DWO: `C:\Users\user\.codex\attachments\2f3ee4e3-7796-423a-b6f4-16dbacd83983\pasted-text.txt`
- Execution boundary: no U10/U11/U12 implementation, no commit, push, PR, merge, tag, publish, or deploy.
- Worktree boundary: the checkout was already heavily dirty from the preceding hardening queues. The starting `git status --short` count was 80 entries. No reset, clean, branch deletion, unrelated-file normalization, or opportunistic staging was performed. The final count is 82 after the scoped U09 test-selector correction and evidence refresh.

## 2. Inventory before

The pre-U09 inventory was read from the existing typed contracts, component-platform decisions, catalogs, showroom, and generated projections.

| Inventory                                              | Before U09 | Evidence / interpretation                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------ | ---------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Compatibility component catalog entries                |        179 | `packages/ai/catalog/components.json`; only `implemented` entries are eligible for composition.                                                                                                                                                                                              |
| Compatibility recipe entries                           |         29 | `packages/ai/catalog/recipes.json`; typed operational recipes remain compatibility surfaces.                                                                                                                                                                                                 |
| Compatibility block entries                            |         60 | `packages/ai/catalog/blocks.json`; blocks compose canonical components and are not a primitive library.                                                                                                                                                                                      |
| Typed operational patterns                             |         12 | `packages/contracts/src/operational-patterns.ts`; existing process, decision, activity, and operational compositions.                                                                                                                                                                        |
| Existing U09 workflow component links                  |         27 | The accepted baseline already contains the complete typed U09 pattern taxonomy, linked implemented components, generated projections, verifier, native canaries, showroom proof, and browser test. This execution re-audited and re-verified that plane rather than creating a parallel one. |
| Generic WorkQueue / Inbox / Kanban / Wizard components |          0 | Existing collection, action, milestone, shell, and overlay components were available; no parallel generic workflow primitive was added.                                                                                                                                                      |
| Native workflow descriptors                            |          6 | CSS-independent descriptors already present for the U09 canary intents; no `@ten4seven/native` components or renderer were created.                                                                                                                                                          |

Representative existing evidence included `MilestoneTracker`, `ActivityFeed`, `AppShell`, `PageHeader`, `DetailDrawer`, `SplitPane`, `Stepper`, `CommandMenu`, `DataTable`, `List`, `FilterToolbar`, `BulkActionBar`, and the typed operational recipes. Representative consumer-shaped surfaces already existed for Theme Studio, Component Lab, authentication, Public Showcase, Publishing Store, Operations Tracker, and Farm P1 Reference. These were used as drift evidence, not as invitations to rewrite every consumer.

## 3. Pattern taxonomy

The typed source is `packages/contracts/src/workflow-productivity.ts`. The repository classification is `RECIPE_OR_PATTERN`; the DWO inventory shorthand `RECIPE` is represented by `inventoryStatus`, matching the established U07/U08 contract shape.

| Pattern               | Classification        | Inventory status     | Platform   | Native strategy     |
| --------------------- | --------------------- | -------------------- | ---------- | ------------------- |
| WorkQueue             | `RECIPE_OR_PATTERN`   | `RECIPE`             | `ADAPTIVE` | `ALTERNATE_PATTERN` |
| Inbox                 | `RECIPE_OR_PATTERN`   | `RECIPE`             | `ADAPTIVE` | `ALTERNATE_PATTERN` |
| NotificationCenter    | `CANONICAL_COMPONENT` | `EXISTING_STABLE`    | `ADAPTIVE` | `NATIVE_RENDERER`   |
| DecisionWorkspace     | `RECIPE_OR_PATTERN`   | `RECIPE`             | `ADAPTIVE` | `ALTERNATE_PATTERN` |
| QueueDetailWorkspace  | `RECIPE_OR_PATTERN`   | `RECIPE`             | `ADAPTIVE` | `ALTERNATE_PATTERN` |
| MasterDetailWorkspace | `RECIPE_OR_PATTERN`   | `RECIPE`             | `ADAPTIVE` | `ALTERNATE_PATTERN` |
| LifecycleTracker      | `COMPONENT_VARIANT`   | `VARIANT`            | `ADAPTIVE` | `ALTERNATE_PATTERN` |
| Wizard                | `RECIPE_OR_PATTERN`   | `RECIPE`             | `ADAPTIVE` | `ALTERNATE_PATTERN` |
| Kanban                | `RECIPE_OR_PATTERN`   | `RECIPE`             | `ADAPTIVE` | `ALTERNATE_PATTERN` |
| TaskBoard             | `COMPONENT_VARIANT`   | `VARIANT`            | `ADAPTIVE` | `ALTERNATE_PATTERN` |
| Workboard             | `COMPOSITE_BLOCK`     | `BLOCK`              | `ADAPTIVE` | `ALTERNATE_PATTERN` |
| CommandPalette        | `ALIAS`               | `REJECTED_DUPLICATE` | `ADAPTIVE` | `ALTERNATE_PATTERN` |
| QuickActions          | `COMPONENT_VARIANT`   | `VARIANT`            | `ADAPTIVE` | `ALTERNATE_PATTERN` |
| ActivityFeed          | `CANONICAL_COMPONENT` | `EXISTING_STABLE`    | `BOTH`     | `NATIVE_RENDERER`   |
| CommentThread         | `DEFERRED`            | `DEFERRED`           | `ADAPTIVE` | `ALTERNATE_PATTERN` |
| AppShell              | `CANONICAL_COMPONENT` | `EXISTING_STABLE`    | `ADAPTIVE` | `ALTERNATE_PATTERN` |
| PageHeader            | `CANONICAL_COMPONENT` | `EXISTING_STABLE`    | `ADAPTIVE` | `SAME_INTENT`       |

Variants and aliases point to existing canonical contracts. They do not increase the canonical primitive count.

## 4. Business boundary

Ten4Seven owns the reusable presentation and interaction grammar:

- pattern intent, composition anatomy, state presentation, semantic token-family intent, density intent, and responsive/adaptive guidance;
- selection, focus, keyboard, press, dismissal, safe-area, and reduced-motion obligations;
- renderer-neutral action and movement seams.

Consumers own:

- business data, record identity, labels, status meaning, priority mapping, unread/attention meaning, assignment, SLA, escalation, and notification policy;
- allowed transitions, validation, authorization, entitlements, decision authority, routing, side effects, and persistence;
- query, filtering, sorting, pagination, synchronization, conflict resolution, comments, audit truth, history, and collaboration backends.

The contract explicitly states that Ten4Seven never owns a workflow state machine, transition guards, permission system, approval policy, notification delivery system, comment backend, or domain routing. The pattern receives semantic inputs and renders them.

No universal `low` / `normal` / `high` / `urgent` business enum was introduced. Consumers may map their own priority vocabulary to semantic presentation and text.

## 5. WorkQueue / Inbox model

The three attention/data concepts are distinct:

- `WorkQueue` is an operational collection of records available for processing. It emphasizes record identity, state, owner, next action, filters, selection, and optional contextual detail.
- `Inbox` is attention-first. It emphasizes why an item needs review, attention, acknowledgment, or follow-up. It is not the name for every operational backlog.
- `NotificationCenter` is informational history and delivery/read state. It is not a work queue or authorization channel.

Both WorkQueue and Inbox use existing `List`, `DataTable`, `SearchInput`, `FilterToolbar`, and `DetailDrawer` contracts. Query state, membership, attention/unread truth, permissions, bulk policy, and persistence remain consumer-owned. `DataTable` is the cross-record comparison option; `List` is the readable adaptive collection option.

## 6. Workspace model

`DecisionWorkspace` is a generic composition of supplied context, evidence, history, criteria, notes, result state, and action slots. It deliberately does not expose `ApproveButton`, `RejectButton`, decision policy, or transition authority.

`QueueDetailWorkspace` connects a work collection to contextual record detail. `MasterDetailWorkspace` is the broader inspection/comparison pattern and does not imply operational work. Both reuse the existing `entity-list`, `entity-detail`, `SplitPane`, and `DetailDrawer` contracts.

Desktop may use a bounded queue/detail split or contextual drawer when comparison is useful. Mobile uses list → detail → action/sheet progression and preserves the originating record context on return. Desktop structure is not compressed into an unreadable phone layout.

## 7. Lifecycle / Wizard model

`LifecycleTracker` is a projection of one consumer-supplied ordered lifecycle. It supports states such as `complete`, `current`, `upcoming`, `blocked`, `failed`, and `canceled`, but contains no `allowedTransitions`, guards, or state-machine editor.

`Wizard` is sequential step presentation. `Stepper` owns step anatomy and navigation presentation; the consumer owns per-step validation, completion, resume, persistence, permissions, and side effects. A Wizard is not a lifecycle tracker, and a Lifecycle Tracker is not a Wizard.

The Component Lab proof shows both patterns with distinct explanatory copy. The existing `MilestoneTracker` keyboard and contextual-detail contract remains intact.

## 8. Kanban / TaskBoard / Workboard model

`Kanban` is a generic recipe for lanes, cards, selection, filters, search, empty/loading/error states, lane/card actions, and an explicit movement-intent seam. It does not own lane truth, WIP policy, stage legality, persistence, or conflict handling.

`TaskBoard` is a task-oriented variant of Kanban. It emphasizes next action, ownership, and task context but reuses `Card`, `List`, `StatusChip`, `DetailDrawer`, and `ActionBar`; it does not create `TaskItem`, `TaskCard`, or a task database.

`Workboard` is a `COMPOSITE_BLOCK`. It composes queue, board, summary, and detail blocks when a product truly needs them. It is not a monster `Workboard` component and does not own product routing, permission truth, or business workflow.

On mobile, lanes become a lane selector or tabs plus a vertical list. Five lanes are never squeezed into the primary phone surface.

## 9. Command / productivity model

`CommandMenu` remains the canonical command surface. `CommandPalette` is the compatibility alias recorded in `generated/aliases.json`; it is classified as `ALIAS` plus `REJECTED_DUPLICATE`, and new code should use `CommandMenu`.

The Web presentation is a keyboard-first popup with search, listbox results, focus containment, and focus return. The native projection is a search/action screen or bottom sheet. Phone users are not required to use Cmd/Ctrl+K.

`QuickActions` is a bounded composition over `ActionBar`, `Toolbar`, `ActionFooter`, and `CommandMenu`. Command registration, ranking, availability, permission, and handlers remain consumer-owned. `ActivityFeed`, `CommentThread`, and `NotificationCenter` remain separate responsibilities.

## 10. Components hardened

The accepted U09 typed plane links 27 existing implemented components to the pattern decisions and exports the metadata from `@ten4seven/ui`:

`AppShell`, `PageHeader`, `Sidebar`, `MobileSidebar`, `List`, `DataTable`, `SearchInput`, `Card`, `EmptyState`, `StateView`, `Stepper`, `MilestoneTracker`, `Progress`, `StatusChip`, `ActivityFeed`, `NotificationCenter`, `RecordSummary`, `ApprovalPanel`, `Toolbar`, `ActionBar`, `ActionFooter`, `FilterToolbar`, `BulkActionBar`, `DetailDrawer`, `SplitPane`, `DragHandle`, and `CommandMenu`.

The linked list is validated against `packages/ai/catalog/components.json`; every linked entry remains `implemented`. This execution also hardened the U09 browser proof by scoping its CommandMenu trigger to the canonical overlay group, avoiding a strict-mode collision with the separately rendered U10 power-user canary. No consumer-specific component was promoted into this list.

## 11. Net-new components

Net-new canonical UI components: **0**.

No net-new canonical UI component was required in this execution. The accepted baseline already contains the typed pattern metadata, generated projections, native descriptor canaries, and showroom/test proof over existing components; the bounded correction was test-proof isolation only. U09 adds no `WorkQueue`, `Inbox`, `Kanban`, `TaskBoard`, `Wizard`, `DecisionWorkspace`, `Workboard`, `CommentThread`, or domain-specific workflow primitive.

No `@ten4seven/native` component was created. `packages/native/src/index.ts` contains descriptors and resolvers only.

## 12. Blocks / recipes created or normalized

No parallel block or recipe catalog was created. The typed plane normalizes references to existing compatibility sources:

- Recipes: `entity-list`, `entity-detail`, `process-workspace`, `decision-workspace`, `activity-audit`, `operational-kanban`, and `exception-queue`.
- Blocks: `public-shell-navigation`, `workflow-board-preview`, `exception-queue-summary`, `decision-workspace-evidence`, `activity-audit-stream`, `approval-queue-summary`, `onboarding-stepper`, `task-handoff`, and `command-shortcuts`.

Each reference identifies its source path, canonical pattern relationship, and ownership note. The existing operational typed recipes remain the source for their detailed operational composition contracts; U09 does not move domain meaning into generic components.

## 13. Rejected domain compositions

The following remain consumer/domain compositions or explicit non-goals:

- `ARReceiptApprovalQueue`, `FarmTask`, `FinanceTask`, `SalesKanban`, and other domain-named primitives;
- `ApproveButton`, `RejectButton`, or any action that implies authorization or decision policy;
- a generic workflow/state-machine engine, transition editor, assignment/SLA/escalation engine, or audit store;
- a comment/chat backend or a fake CommentThread built from ActivityFeed;
- a notification delivery engine or using NotificationCenter as an operational queue;
- a scheduler, booking, map, GIS, editor, or DnD engine inside U09;
- a monster Workboard component that owns product data, routing, permissions, or persistence.

## 14. Web/Native adaptive matrix

| Intent                | Web                                                               | Native / adaptive alternative                                          |
| --------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------- |
| WorkQueue             | Bounded table/list, filters, selection, optional drawer detail    | Native list → detail → safe action surface                             |
| Inbox                 | Attention-first collection with readable status and review action | Native attention list/detail and explicit read/acknowledge action      |
| NotificationCenter    | Bounded anchored surface or notification page                     | Native notification list or sheet                                      |
| DecisionWorkspace     | Evidence/context regions with action footer and optional detail   | Single-column evidence scroll surface with sticky safe-area actions    |
| QueueDetailWorkspace  | Queue + detail split or `DetailDrawer`                            | Navigation stack list → detail → action sheet                          |
| MasterDetailWorkspace | Bounded split panes or contextual inspector                       | Native stack/detail navigation                                         |
| LifecycleTracker      | Ordered `MilestoneTracker` projection with optional drawer        | Compact ordered stack/detail projection                                |
| Wizard                | Stepper + bounded step content + action footer                    | Compact progress + one scroll-owned step + safe-area footer            |
| Kanban / TaskBoard    | Bounded lanes, readable cards, filters, explicit movement actions | Lane selector/section list and explicit Move to lane action            |
| Workboard             | Composed blocks with responsive priority                          | One primary work surface; secondary blocks stack or move to navigation |
| CommandPalette        | `CommandMenu` popup with keyboard/focus contract                  | Search/action screen or bottom sheet; no phone shortcut requirement    |
| AppShell / PageHeader | Sidebar/topbar/content shell and route-level header               | Native navigation/drawer/header/stack intent                           |

All pattern entries contain desktop, tablet, mobile, and native guidance plus platform and native-strategy fields.

## 15. DnD boundary

U09 defines the seam only:

- a board may emit a renderer-neutral movement intent containing stable item identity and destination identity;
- the consumer decides whether the move is legal, how it persists, and how conflicts are resolved;
- every task-critical move has an explicit focusable alternative such as Move to lane, Move before, or Move after;
- keyboard and screen-reader users never depend on drag or hover;
- advanced collision, gesture, keyboard-reorder, and engine behavior is `DEFERRED_TO_U10`.

No DnD dependency or donor public API was added.

## 16. Native canary

`NATIVE_WORKFLOW_CANARY` contains six CSS-independent descriptors and `packages/native/src/index.ts` exposes `resolveNativeWorkflow`:

| Canary              | Source pattern       | Primitive descriptor | Presentation                 |
| ------------------- | -------------------- | -------------------- | ---------------------------- |
| `workQueue`         | WorkQueue            | `FlatList`           | native collection            |
| `queueDetail`       | QueueDetailWorkspace | `NavigationStack`    | native list/detail           |
| `decisionWorkspace` | DecisionWorkspace    | `ScrollView`         | native decision surface      |
| `kanban`            | Kanban               | `SectionList`        | native lane/list             |
| `wizard`            | Wizard               | `ScrollView`         | native step surface          |
| `commandPalette`    | CommandPalette alias | `BottomSheet`        | native search/action surface |

Each canary carries semantic inputs, states, adaptive strategy, an accessibility alternative, and consumer-owned responsibilities. The native package imports contracts and tokens only; it does not import `@ten4seven/ui`, React, DOM APIs, CSS, or a vendor workflow/DnD engine.

## 17. Showroom

The affected rendered proof is the existing Component Lab anchor:

`http://127.0.0.1:4173/component-lab#component-lab-workflow`

The proof now exposes `data-contract-plane="workflow-productivity"` and visibly demonstrates:

- Work queue, Inbox/attention, and Notification Center meaning side by side;
- an adaptive stacked `DataTable` with consumer-owned selection/detail intent;
- generic Kanban lanes and a labelled non-DnD `Move to review` action;
- Lifecycle Tracker context and decision/action composition;
- Wizard / sequential process with compact-progress intent;
- the existing global Component Lab `CommandMenu` proof for search and empty-result behavior.

No product route was converted into a fixture-heavy workflow shell. Existing Theme Studio, Operations Tracker, Publishing Store, Public Showcase, authentication, and Farm surfaces remain consumer-shaped references.

## 18. Component Lab stress proof

`tests/u09-workflow-productivity.spec.ts` provides rendered browser proof with Playwright:

- desktop viewport `1440 × 900`: queue/inbox/notification distinction, table, board, Wizard, movement intent, command search, and command empty state;
- mobile viewport `390 × 844`: stacked collection, one-column board lanes, visible Wizard, and document overflow check;
- `prefers-reduced-motion: reduce`: exercised in the mobile scenario;
- document horizontal overflow: measured as `<= 1px` in the mobile scenario;
- queue movement and command dismissal are exercised through real rendered controls;
- the command-menu locator is scoped to the canonical overlay group so the proof remains deterministic when the separate U10 canary is also mounted.

Result: **2 U09 tests passed**.

## 19. AI/catalog projection

The typed source is singular:

`packages/contracts/src/workflow-productivity.ts`

Derived outputs are:

- `generated/workflow-productivity.json`;
- `packages/agent/generated/workflow-productivity.json`;
- the `workflow-productivity` entry point in `generated/agent-index.json`;
- `workflowProductivityRef` links in compact component projections for the 27 linked components;
- `@ten4seven/ui` exports for the typed contract constants and types.

The projection generator is `scripts/generate-contract-projections.mjs`; the U09 verifier checks both generated roots against the typed source. The full human catalogs remain compatibility/fallback surfaces. No second workflow decision manifest was introduced.

## 20. Tests

| Check                                                               | Result               | Evidence                                                                                                         |
| ------------------------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `pnpm contracts:generate`                                           | PASS                 | Regenerated 234 contract projections plus token/DTCG projections.                                                |
| `pnpm test:workflow-productivity`                                   | PASS                 | 17 patterns, 27 linked components, 6 native canaries; deterministic source/projection/native checks.             |
| `pnpm test:native-mobile`                                           | PASS                 | Shared native contract, token resolution, semantic icon, accessibility, and Farm presentation checks.            |
| `pnpm test:native-expo`                                             | PASS                 | 7 profiles, 18 capability contracts, 179 derived component maturity rows, and CSS-independent renderer boundary. |
| `pnpm test:contracts`                                               | PASS                 | Canonical registry, generated projection, aliases, operational parity, and existing contract gates.              |
| `pnpm typecheck`                                                    | PASS                 | Contracts, native, agent build, and Playground typecheck.                                                        |
| `pnpm test`                                                         | NOT RUN — BOUNDARY   | The aggregate chain enters U10/U11/U12/U13/U14 checks; it was not run because this execution is U09-only.        |
| `pnpm test:ai`                                                      | PASS                 | 29 recipes, 179 components, 60 blocks, 122 semantic icons, and cold-start retrieval.                             |
| `pnpm test:consistency`                                             | PASS                 | Canonical consistency across 28 UI source files.                                                                 |
| `pnpm test:token-governance`                                        | PASS                 | Token governance and no ungoverned component color/timing regression.                                            |
| `pnpm test:component-system`                                        | PASS                 | 172 canonical components, 7 aliases, 29 recipes, 60 expressive blocks, and singular Select/taxonomy checks.      |
| `pnpm exec playwright test tests/u09-workflow-productivity.spec.ts` | PASS                 | 2 rendered Chromium tests.                                                                                       |
| `pnpm build`                                                        | PASS                 | Playground production build; existing large-chunk warning recorded below.                                        |
| `pnpm package:build`                                                | PASS                 | `@ten4seven/ui@1.0.0` package build.                                                                             |
| `pnpm package:verify`                                               | PASS                 | 24 root exports and bundled token/icon/motion package boundary.                                                  |
| Targeted Prettier check                                             | PASS                 | All U09-touched source, test, and evidence files match Prettier.                                                 |
| `git diff --check`                                                  | PASS                 | No whitespace errors; Git reported inherited CRLF conversion warnings on unrelated dirty files.                  |
| `pnpm format:check`                                                 | FAIL / BASELINE DEBT | Full repository check reports 501 pre-existing/unrelated files. U09 files pass the targeted check.               |

The format result is not treated as a U09 source regression because the failing files include inherited `.playwright-cli` captures, existing docs, catalogs, and unrelated source files. No mass formatting pass was performed.

## 21. Performance boundary

- U09 reuses U07 `List`/`DataTable` collection semantics and its approved consumer-owned windowing boundary; it does not add workflow-specific virtualization.
- `WorkQueue` is a bounded collection recipe. Large data, pagination, incremental loading, and windowing remain consumer/renderer concerns behind the existing contract.
- Kanban is bounded composition metadata with no board engine, DnD package, collision strategy, or gesture runtime.
- Workboard is a block composition and cannot hide a second data, workflow, or virtualization runtime.
- `pnpm build` emitted the existing generic large-chunk warning (>500 kB); this is recorded as baseline performance debt, not a new U09 engine dependency.

## 22. Baseline debt

- The worktree was already non-clean and remains non-clean by design; unrelated U01–U08 changes and pre-existing artifacts were preserved.
- The repository-wide Prettier gate currently reports 501 files. The count includes inherited `.playwright-cli` captures, generated/native build artifacts, docs, catalogs, and unrelated source; it is not used as a reason to rewrite unrelated files.
- The production Playground build reports large chunks; no U09 code-splitting or dependency expansion was introduced.
- Pre-existing Q10-labelled workflow proof/test/evidence artifacts were not deleted. The shared proof keeps its existing compatibility CSS class while its semantic contract-plane label is U09.
- Git’s `diff --check` emitted line-ending conversion warnings for inherited dirty files; it found no whitespace errors.

## 23. Deferred U10/U11/U12 gaps

- U10: advanced DnD, touch gestures, collision/drag engine selection, keyboard reorder mechanics, and board/windowing coordination. U09 leaves the movement-intent seam and non-DnD path only.
- U11: editor/builder/AI or collaboration engine work remains outside this queue. U09 does not create CommentThread persistence, chat, mentions, moderation, or an AI/workflow execution engine.
- U12: broad native hardening and production native component implementation remain deferred. U09 supplies CSS-independent canaries and adaptive intent only; it does not create `@ten4seven/native` components.
- Domain adoption remains consumer work: route truth, permissions, business transitions, assignment/SLA/escalation, persistence, sync, audit, notification delivery, scheduler, map, and other engine integrations are not moved into the foundation.

## 24. Gate

The U09 acceptance criteria are satisfied: WorkQueue/Inbox/Notification responsibilities are distinct; DecisionWorkspace is generic; lifecycle and Wizard responsibilities are distinct; Kanban movement is intent-only with non-DnD alternatives; Workboard is a block; mobile master/detail and lane adaptation are explicit; shells and command surfaces remain generic; activity/audit/comments remain distinct; classifications, exports, AI projections, native strategies, tests, and evidence are synchronized.

PASS FOR U10
