# T7-UNIVERSAL-HARDENING-U06 — Navigation, Disclosure, Overlay & Feedback Evidence

## 1. Coordinates

- Repository: `fahziputraj/ten4seven-ui`
- Worktree: `D:\SA\ten4seven-ui`
- DWO: `T7-UNIVERSAL-HARDENING-U06`
- Parent: `T7-UNIVERSAL-HARDENING-001`
- Queue scope: Navigation + Disclosure + Menus + Overlays + Feedback enrichment only.
- Branch: `codex/icons-curated-solar-style`
- Baseline SHA at queue start: `e582cfcfbe0f077d1a5832d86db9da1898487fd3`
- Execution boundary: no commit, push, pull request, merge, tag, publish, deploy, or U07+ implementation.
- Evidence levels used here: `SOURCE` means statically verified in the repository; `GENERATED` means verified against typed-source projections; `RUNTIME` means verified in the local browser; `UNVERIFIED` means intentionally outside this queue.

The worktree already contained extensive changes from earlier bounded queues. Those changes were preserved. U06 did not reset, clean, normalize, or opportunistically rewrite unrelated files.

## 2. Inventory before

`SOURCE` inventory found the following existing coverage before U06 hardening:

- Navigation: `Sidebar`, `SidebarGroup`, `NavItem`, `NavigationMenu`, `TopNavigation`, `MobileSidebar`, `Breadcrumb`, `SectionNavigation`, `Tabs`, `BottomNavigation`, `NavigationRail`, `Pagination`, `Stepper`, and `CommandMenu`.
- Disclosure: `Accordion` and `Collapsible`; hierarchy-specific `TreeView` remained the tree contract.
- Menus and anchored surfaces: `DropdownMenu`, `ActionMenu` compatibility alias, `ContextMenu`, `Popover`, and `Tooltip`.
- Overlays: `Modal`, `AlertDialog`, `Drawer`, `DetailDrawer`, and `FilterDrawer` compositions.
- Feedback: `Alert`, `ToastProvider`, `Toaster`, `Toast`, `EmptyState`, `StateView`, `Skeleton`, `Spinner`, `Progress`, and `CircularProgress`.
- Existing overlay behavior was centralized in `packages/ui/src/overlay.ts` through `useNativeDialog`, floating positioning, portals, exclusivity, and body-scroll locking.
- Existing semantic z-index variables already existed in `packages/ui/src/styles.css`; U06 normalized their ownership into the typed U06 layer-role projection instead of creating another scale.
- There was no canonical `Dialog` catalog entry, no page/shell `Banner`, no persisted `Notification`, and no `NotificationCenter`.
- `Drawer` accepted only left/right presentation in its Web implementation even though the catalog contract already described top/bottom adaptive use.
- `Modal` was an independently described catalog entry even though its behavior was the generic dialog behavior; it is now a compatibility alias of canonical `Dialog`.

Representative consumer evidence was limited to source/catalog inspection and the Component Lab harness. No route, permission, business-data, persistence, transport, or product workflow was migrated in U06. `Theme Studio`, public/catalog previews, and the Component Lab remain system/harness surfaces; Auth, Publishing Store, Operations, and Farm consumer adoption remain outside this queue.

## 3. Navigation taxonomy

Navigation intent is owned by Ten4Seven; route truth, permission truth, selection truth, and business handlers remain consumer-owned.

| Contract                       | Classification        | Platform | Web intent                                     | Native/adaptive strategy                      |
| ------------------------------ | --------------------- | -------- | ---------------------------------------------- | --------------------------------------------- |
| Sidebar / SidebarGroup         | canonical             | ADAPTIVE | persistent, collapsible application navigation | drawer, rail, or native navigation shell      |
| NavigationMenu / TopNavigation | canonical             | ADAPTIVE | public or application destination navigation   | tabs/navigation shell                         |
| BottomNavigation               | canonical             | ADAPTIVE | bounded primary destination set                | native tab/navigation shell                   |
| NavigationRail / MobileSidebar | canonical             | ADAPTIVE | rail or mobile navigation presentation         | drawer/navigation shell                       |
| Breadcrumb / SectionNavigation | canonical             | ADAPTIVE | route context and section context              | stack-detail or native tab context            |
| Tabs                           | canonical             | BOTH     | same-intent tab collection                     | same intent with platform controls            |
| Pagination                     | canonical             | ADAPTIVE | explicit collection paging                     | native collection paging; not infinite scroll |
| Stepper                        | canonical             | BOTH     | ordered task progression                       | same intent                                   |
| MilestoneTracker               | canonical composition | ADAPTIVE | progress/context composition                   | stack-detail or master-detail context         |
| CommandMenu                    | canonical             | ADAPTIVE | search/action command surface                  | native search/action surface                  |

Navigation does not own routing, permissions, data fetching, or domain state. `BottomNavigation` is bounded and distinct from a general collection pager; `Breadcrumb` is context and not a second navigation tree.

## 4. Disclosure taxonomy

- `Accordion`: canonical collection disclosure, `BOTH`, with collection semantics and independently addressable panels.
- `Collapsible`: canonical single disclosure, `BOTH`, with consumer-controlled open state and no implied collection relationship.
- `Disclosure`: `COMPONENT_VARIANT`, mapped to `Collapsible`; no parallel generic primitive was added.
- `TreeDisclosure`: `COMPONENT_VARIANT`, mapped to `TreeView`; hierarchy-specific keyboard and parent/child semantics remain in the tree contract.
- Existing keyboard, controlled/uncontrolled, open/close, and panel association behavior is preserved. U06 does not add a second disclosure runtime.

## 5. Menu taxonomy

- `DropdownMenu`: canonical adaptive menu contract; Web uses the existing roving menu model and Native may use a sheet/native menu surface.
- `ActionMenu`: alias of `DropdownMenu`; it does not increase canonical count.
- `ContextMenu`: canonical adaptive context action surface with keyboard invocation and focus return.
- `Menu`: `COMPONENT_VARIANT` of `DropdownMenu`; it is not a separate consumer primitive.
- `Menubar`: `DEFERRED`, Web-only candidate; the contract is not implemented or exposed as an API.
- `CommandMenu` remains a search/action command surface rather than a generic menu or notification surface.

The U06 plane keeps activation, selection, focus, dismissal, and action ownership explicit while leaving action handlers and permission decisions to consumers.

## 6. Overlay taxonomy

| Contract     | Intent                                  | Platform                | Presentation strategy                                     |
| ------------ | --------------------------------------- | ----------------------- | --------------------------------------------------------- |
| Dialog       | focused task or short content           | ADAPTIVE                | Web native modal dialog; Native modal alternative         |
| AlertDialog  | consequential/irreversible confirmation | ADAPTIVE                | explicit actions; no backdrop/Escape dismissal            |
| Drawer       | contextual edge-attached surface        | ADAPTIVE                | Web side drawer or bottom sheet; Native sheet             |
| DetailDrawer | record inspection composition           | ADAPTIVE                | Drawer renderer with detail content                       |
| Popover      | anchored interactive context            | ADAPTIVE                | Web anchored popover; Native sheet alternative            |
| Tooltip      | supplemental non-interactive help       | WEB                     | contextual help; Native alternative is press/help context |
| Modal        | compatibility alias                     | ADAPTIVE through Dialog | old API retained, canonical intent is Dialog              |

`Sheet` and `BottomSheet` are variants of `Drawer`. `HoverCard` is deferred until a deliberate press alternative exists. Dialog, alert-dialog, drawer, and anchored surfaces share the existing overlay engine rather than creating independent z-index, focus, dismissal, or scroll-lock systems.

## 7. Feedback taxonomy

- `Alert`: persistent in-context message; existing canonical component retained.
- `Banner`: persistent page/shell-level message with explicit `polite`, `assertive`, or consumer-controlled urgency.
- `ToastProvider` / `Toaster` / `Toast`: transient queue and viewport; timeout, action, dismissal, and queue ownership remain separate from persistent history.
- `Notification`: one persisted/inspectable item with consumer-owned read, select, action, and dismissal callbacks.
- `NotificationCenter`: bounded inspectable notification history; transport and persistence remain consumer-owned; adaptive Native strategy is a sheet/surface.
- `EmptyState`, `StateView`, `Skeleton`, `Spinner`, `Progress`, and `CircularProgress`: existing state/progress contracts retained and enriched by the shared U06 plane.
- `Snackbar`: semantic variant/alias of `Toast`; no second primitive.
- `InlineNotice`: semantic variant of `Alert`.
- `LoadingState`, `ErrorState`, and `StatusIndicator`: semantic variants of existing state/feedback contracts.
- `ActivityFeed` remains an activity/audit feed, not notification persistence.

## 8. Hardened existing components

The bounded implementation changes were:

1. `Dialog` was introduced as the canonical generic modal task surface. `Modal` now delegates to it and remains a compatibility export.
2. `AlertDialog` now composes `Dialog` with `dismissible={false}` and focuses the explicit cancel action. Backdrop and Escape cannot bypass confirmation; Cancel and Confirm remain consumer callbacks.
3. `useNativeDialog` now accepts an explicit Escape-dismissal policy, captures the invoking control, restores focus after close, and filters the Tab cycle to controls owned by the current dialog. The body lock remains reference-counted for nested dialogs.
4. `Drawer` now accepts `top` and `bottom` in addition to `left` and `right`, with token-backed responsive geometry and a shared bottom-sheet presentation. Its intent and consumer API remain Drawer.
5. Drawer and Dialog carry explicit overlay-kind metadata and continue to use the native modal top layer, safe-area/visual-viewport handling, semantic scrim, reduced-motion rules, and existing focus behavior.
6. `Banner`, `Notification`, and `NotificationCenter` were added to the feedback module using existing `Button`, `IconButton`, and `T7Icon` contracts. No raw color, radius, shadow, or local motion runtime was introduced.
7. The inherited Component Lab “Modal proof” was corrected from an accidental `AlertDialog` use to canonical `Dialog`; this preserves the existing dismissible modal proof while keeping AlertDialog strict.

## 9. Net-new canonical components

All four entries are represented in the typed U06 plane, catalog, generated shards, Web exports, and Component Lab/catalog previews.

| Component            | Distinct intent / classification                        | Platform and adaptive strategy                    | Accessibility                                                                                       | Motion and layout                                                               | Token ownership                                                                     |
| -------------------- | ------------------------------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `Dialog`             | focused labelled task surface; `ADAPTIVE`               | Web modal dialog; Native modal alternative        | accessible name, labelled surface, focus containment, focus return, dismissal, focus/press feedback | enter/exit/state; content/wide measure, bounded scroll, touch target, safe area | color, spacing, radius, elevation, focus, motion, measure                           |
| `Banner`             | page/shell persistent feedback; `CANONICAL_COMPONENT`   | `BOTH`, native renderer with same semantic intent | status/alert urgency, status announcement, non-color status, keyboard action/dismiss                | state/enter/exit/reveal; wide measure, minimum useful surface, touch target     | color, typography, spacing, radius, elevation, focus, motion, touch target, measure |
| `Notification`       | one inspectable persisted event; `CANONICAL_COMPONENT`  | `BOTH`, native renderer with same semantic intent | readable item/read state, status announcement, non-color state, independent actions                 | state/enter/exit/reveal; content measure, minimum useful surface, touch target  | color, typography, spacing, radius, elevation, focus, motion, touch target, measure |
| `NotificationCenter` | bounded inspectable notification collection; `ADAPTIVE` | Web bounded collection; Native sheet alternative  | labelled region/list, status announcement, non-color status, focus/press feedback                   | state/enter/exit/reveal; content measure, bounded scroll, touch target          | color, typography, spacing, radius, elevation, focus, motion, touch target, measure |

The typed contract records persistence, urgency, dismissal, focus, state vocabulary, layout intents, motion roles, and platform presentation without requiring Native to parse CSS.

## 10. Rejected duplicates/variants

| Candidate                                   | Classification         | Canonical target or reason                                    |
| ------------------------------------------- | ---------------------- | ------------------------------------------------------------- |
| Modal                                       | ALIAS                  | Dialog                                                        |
| ActionMenu                                  | ALIAS                  | DropdownMenu                                                  |
| Disclosure                                  | COMPONENT_VARIANT      | Collapsible                                                   |
| TreeDisclosure                              | COMPONENT_VARIANT      | TreeView                                                      |
| Menu                                        | COMPONENT_VARIANT      | DropdownMenu                                                  |
| Sheet / BottomSheet                         | COMPONENT_VARIANT      | Drawer                                                        |
| Snackbar                                    | ALIAS/semantic variant | Toast                                                         |
| InlineNotice                                | COMPONENT_VARIANT      | Alert                                                         |
| LoadingState / ErrorState / StatusIndicator | COMPONENT_VARIANT      | existing feedback/state contracts                             |
| HoverCard                                   | DEFERRED               | requires a press/help alternative before implementation       |
| Menubar                                     | DEFERRED               | Web-only candidate; no current normalized contract            |
| InfiniteScroll                              | DEFERRED               | U07+ collection/loading contract; Pagination remains explicit |

Variants and aliases do not increase canonical primitive count. The catalog gate reports 170 canonical components, 7 aliases, and 177 total entries.

## 11. Layer/z-index ownership

U06 owns the semantic layer vocabulary; the token system owns values and the Web stylesheet is only a projection/consumer:

| Semantic layer | Web token         | Native role |
| -------------- | ----------------- | ----------- |
| base           | `--t7-z-base`     | base        |
| sticky         | `--t7-z-sticky`   | sticky      |
| focus          | `--t7-z-focus`    | focus       |
| dropdown       | `--t7-z-dropdown` | dropdown    |
| popover        | `--t7-z-popover`  | popover     |
| tooltip        | `--t7-z-tooltip`  | tooltip     |
| drawer         | `--t7-z-drawer`   | drawer      |
| overlay        | `--t7-z-overlay`  | overlay     |
| modal          | `--t7-z-modal`    | modal       |
| toast          | `--t7-z-toast`    | toast       |
| command        | `--t7-z-command`  | command     |

`SOURCE/GENERATED`: `NAVIGATION_OVERLAY_FEEDBACK_LAYER_ROLES` is defined in `packages/contracts/src/navigation-overlay-feedback.ts`, projected to `generated/navigation-overlay-feedback.json`, and consumed by the Web token-backed CSS and the CSS-independent Native adapter. No local arbitrary z-index scale was added.

## 12. Focus/dismissal model

- Dialog and Drawer use native modal dialog semantics, focus containment, explicit initial focus, Escape/system dismissal where allowed, and return focus to the invoking control.
- AlertDialog sets dismissal to explicit action/system-controlled confirmation: Escape and backdrop clicks do not close it.
- Popover, DropdownMenu, and ContextMenu retain anchored/outside/Escape behavior from the existing floating layer model, including nested-layer exclusivity and return focus.
- Tooltip remains non-interactive supplemental help and is Web-first.
- Toast remains timeout-or-explicit dismissal and queue bounded by `ToastProvider`; Notification is persisted/inspectable and never gets an implicit timeout.
- NotificationCenter exposes explicit mark-read, mark-all-read, select, dismiss, and clear callbacks but does not own data, transport, or persistence.
- The overlay hook preserves reference-counted body scroll locking. Visual viewport updates and safe-area tokens remain component/system responsibilities.

## 13. Web/Native adaptive matrix

| Family              | Web renderer                                 | Native renderer strategy                                | Contract owner                                         |
| ------------------- | -------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| navigation          | DOM navigation links, tabs, rail, drawer     | native navigation shell, tabs, drawer, or stack context | Ten4Seven intent; consumer routes/permissions          |
| disclosure          | buttons/panels with keyboard disclosure      | same intent using native disclosure controls            | Ten4Seven state/a11y contract                          |
| menu                | roving menu, context menu, anchored dropdown | native menu or sheet                                    | Ten4Seven interaction intent; consumer actions         |
| dialog              | native `<dialog>` with labelled content      | native modal                                            | Ten4Seven semantic contract                            |
| drawer              | edge drawer or bottom sheet                  | native sheet/drawer                                     | Ten4Seven intent; consumer content                     |
| popover             | anchored portal                              | sheet/contextual surface                                | Ten4Seven intent; consumer content                     |
| tooltip             | hover/focus contextual help                  | press/help alternative                                  | Web-first contract; no fake hover-only Native behavior |
| alert/banner        | semantic status/alert surface                | native status/feedback surface                          | Ten4Seven urgency and state; consumer recovery         |
| toast               | portal queue with timeout/explicit action    | native transient feedback                               | Ten4Seven lifecycle; consumer event truth              |
| notification center | bounded collection/panel                     | sheet or native feedback screen                         | Ten4Seven item semantics; consumer persistence         |

The matrix is explicit in `packages/contracts/src/component-platform.ts` and enriched by the U06 plane. No `@ten4seven/native` components were created.

## 14. Native canary proof

`SOURCE`: `packages/native/src/index.ts` exports `resolveNativeNavigationOverlayFeedbackContract` and `nativeNavigationOverlayFeedbackLayerRoles`. It accepts the resolved typed component contract and returns semantic intent, platform, renderer strategy, native status/presentation, alternative presentation, states, accessibility, token roles, layout intents, motion roles, persistence, urgency, and focus/dismissal metadata.

`RUNTIME/TYPECHECK`: `pnpm --filter @ten4seven/native typecheck` passed. A direct canary invocation for `NotificationCenter` returned:

```text
id=NotificationCenter
platform=ADAPTIVE
nativeStatus=planned
presentation=native-feedback-surface
nativeAlternative=native-sheet
tokenRoles=color, typography, spacing, radius, elevation, focus, motion, touch-target, measure
```

The canary reads the typed component contract and never parses `styles.css`. `planned` is intentional: U06 establishes the renderer-neutral contract and Native projection, not Native component implementation.

## 15. Showroom

`RUNTIME`: local catalog route checks returned HTTP 200 and the expected heading for all new previews:

- `/components/dialog` → `Dialog`
- `/components/banner` → `Banner`
- `/components/notification` → `Notification`
- `/components/notification-center` → `Notification Center`

The previews use the canonical package exports and remain isolated to the catalog/showroom harness. No product surface received a parallel local primitive.

## 16. Component Lab stress proof

`RUNTIME`: `apps/playground/src/component-proofs.tsx` now exposes `#component-lab-navigation-overlay-feedback` with:

- `Open U06 dialog`: focus, Escape, close, and focus-return proof;
- `Open bottom sheet`: adaptive Drawer bottom presentation and safe content region;
- a live `Banner` with reconnect action and dismissal;
- a bounded `NotificationCenter` with unread count, mark-all-read, per-item actions, clear, and empty state.

The inherited “Modal proof” was also corrected to use `Dialog`, while the separate `Remove this sample?` proof exercises non-dismissible `AlertDialog` behavior.

## 17. AI/catalog projection

`GENERATED`: `pnpm contracts:generate` produced the U06 projection and synchronized both `generated/` and `packages/agent/generated/`.

- Typed source: `packages/contracts/src/navigation-overlay-feedback.ts`.
- Platform source: `packages/contracts/src/component-platform.ts`.
- Generated source: `generated/navigation-overlay-feedback.json`.
- Agent entry point: `generated/agent-index.json` → `navigation-overlay-feedback` with Component Lab reference `/component-lab#component-lab-navigation-overlay-feedback`.
- Compact component projections contain `navigationOverlayFeedbackRef` for U06 components.
- Catalog entries for `Dialog`, `Banner`, `Notification`, and `NotificationCenter` are `implemented`.
- `Modal` is catalogued as `aliasOf: "Dialog"` and remains source/export compatible.
- `pnpm test:contracts`, `pnpm test:ai`, and `pnpm test:component-system` pass with 170 canonical, 7 aliases, 177 components, 29 recipes, 60 blocks, and 122 semantic icons.

## 18. Tests

The following bounded validations passed:

- `pnpm contracts:generate`
- `pnpm typecheck`
- `pnpm test` (full repository test chain)
- `pnpm test:ai`
- `pnpm test:consistency`
- `pnpm test:token-governance` as part of the full test chain
- `pnpm build`
- `pnpm package:build`
- `pnpm package:verify`
- `pnpm test:contracts`
- `pnpm test:component-system`
- `pnpm test:native-mobile`
- `pnpm exec playwright test tests/q06-navigation-overlay-feedback.spec.ts --project=chromium` → 4 passed
- `pnpm exec playwright test tests/public-interactions.spec.ts tests/q06-navigation-overlay-feedback.spec.ts --project=chromium` → 8 passed
- `pnpm exec playwright test tests/overlay-keyboard-hardening.spec.ts tests/public-interactions.spec.ts --project=chromium` → 8 passed after correcting the inherited harness proof
- `git diff --check` completed without diff errors; Git reported existing CRLF normalization warnings only.

The U06 browser test covers Dialog focus/escape/return, AlertDialog explicit dismissal, narrow bottom-sheet geometry, Banner urgency/dismissal, NotificationCenter unread/mark-all-read/clear, and empty-state live feedback.

## 19. Baseline debt

- `pnpm format:check` remains red because the pre-existing dirty worktree contains 355 formatter warnings across broad application, documentation, generated, fixture, and Playwright files. No broad formatter rewrite was performed. The U06-touched source set passes targeted Prettier checks after formatting the two U06 verifier scripts.
- The component-token coverage report was regenerated with `pnpm tokens:coverage` after the bounded stylesheet additions. The final full test chain reports 996 tracked raw-pixel occurrences as migration debt; the report is derived and does not change token ownership.
- `pnpm build` reports the existing large bundle warning (>500 kB chunk); the build still succeeds.
- Native renderer status for the new adaptive contracts is `planned` by design. U06 does not create Native components.
- No DB, transport, persistence, route, permission, product profile, or business-behavior changes were in scope; those areas are `UNVERIFIED` for U06 adoption.

## 20. Deferred items for U07+

- Native component implementation and platform-specific renderer packages.
- Menubar, HoverCard, InfiniteScroll, and any additional gap candidate that requires a new normalized engine contract.
- Full product-consumer adoption across Auth, Public Showcase, Publishing Store, Operations, Farm, and future native applications.
- Full system-wide formatter cleanup and unrelated generated/fixture debt.
- Any product-specific notification transport, persistence, routing, permission, or data ownership decisions.

U06 stops here. No U07+ queue was executed.

## 21. Gate

PASS FOR U07
