# T7-SECTIONNAV-001 — Section Navigation

Status: **scoped PASS — NEW COMPONENT IMPLEMENTED + PROVEN**
Date: 2026-09-06
Parent runner: **T7-AAPM-AGENTIC-001 / Issue #3**
Executable gate: **T7-SECTIONNAV-001**
Stacked base: **T7-REVISION-001 / `3601bd40fe5b07bb4f9fce4ef1bf944bd2406926`**

## Gate decision

The AAPM page-local navigation requirement is classified **COMPONENT GAP**.
The page archetype is a private, information-dense long-form/detail workspace:
the global `AppShell` and `Sidebar` remain route navigation, while the bounded
content region needs a second, page-local anchor layer.

The existing canonical components were audited before implementation:

| Existing capability                | Why it does not satisfy page-local navigation                                                             | Classification           |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------ |
| `Tabs`                             | Switches peer panels with tab/tabpanel semantics; it does not navigate to independently rendered anchors. | insufficient composition |
| `Sidebar` / `SidebarGroup`         | Own global workspace route navigation and render button-based route items.                                | wrong ownership          |
| `NavigationMenu` / `TopNavigation` | Own public or flat route-level navigation, not long-form section anchors.                                 | wrong ownership          |
| `MobileSidebar`                    | Provides the global compact shell drawer, not a page-local section menu.                                  | wrong ownership          |
| `Collapsible`                      | Discloses one bounded region but has no labelled multi-anchor contract or active location.                | insufficient composition |

No first-class `SectionNavigation` contract, implementation, or AI projection
existed. Composition alone would have duplicated anchor semantics, active
location state, sticky-offset behavior, and mobile disclosure. The requirement
therefore closes as **NEW COMPONENT IMPLEMENTED + PROVEN**.

## Requirement and ownership boundary

The AAPM extraction requires:

- labelled section anchors;
- active section semantics;
- keyboard access;
- optional consumer-controlled scroll spy;
- optional sticky positioning compatible with the shared header offset;
- responsive collapse to a compact control/menu; and
- no ownership of form validation or business state.

`SectionNavigation` renders stable consumer-supplied IDs as native anchors and
uses `aria-current="location"` for the active item. `activeId` and
`onSectionChange` allow a consumer to supply scroll-spy state without the
component observing the document. `sticky` uses the shared
`--t7-doc-sticky-offset` and `--t7-z-sticky` variables. At narrow widths the
same items are exposed through a native `details` summary/menu; it is not a
second mobile navigation system.

Ten4Seven owns anchor presentation, keyboard/native disclosure behavior,
active-state semantics, responsive treatment, focus treatment, and token use.
The consumer owns section IDs, scroll observation, scroll behavior policy,
form validation, workflow state, permissions, persistence, and route/business
logic.

## Implementation path

| Plane                 | Evidence                                                                                                                                                                               | Result                                                                                                                                                |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Contract/API          | `packages/ui/src/navigation.tsx` (`SectionNavigationItem`, `SectionNavigationProps`, `SectionNavigation`)                                                                              | Additive public API; `items` is required and active/scroll-spy state remains consumer-controlled                                                      |
| Package export        | `packages/ui/src/index.ts` (`export * from "./navigation"`)                                                                                                                            | Component and public types are available from `@ten4seven/ui`                                                                                         |
| Canonical styles      | `packages/ui/src/styles.css`                                                                                                                                                           | Semantic surface, selection, focus, control, sticky-offset, and shared motion variables; wide anchors and narrow native menu                          |
| Compatibility catalog | `packages/ai/catalog/components.json`                                                                                                                                                  | Implemented Navigation component with states, a11y, responsive, motion, tokens, API rows, and ownership guidance                                      |
| Generated projection  | `generated/components/SectionNavigation.json`, `packages/agent/generated/components/SectionNavigation.json`, compact/index projections                                                 | `pnpm contracts:generate` produced 185 projections; generated output was not hand-edited                                                              |
| AI verification       | `pnpm t7ui show SectionNavigation`, `pnpm test:ai`, `pnpm test:component-system`                                                                                                       | Implemented component resolves with 147 catalog entries (141 canonical + 6 aliases); no donor read                                                    |
| Reference surface     | `apps/playground/src/operational-reference.tsx` — Entity 360                                                                                                                           | Five stable anchors (`Summary`, `Current work`, `Relationship signals`, `Revision context`, `Activity & audit`) with consumer-controlled active state |
| Component surface     | `apps/playground/src/component-preview-fixtures.tsx`                                                                                                                                   | Canonical component route renders a long-form anchor fixture instead of a placeholder                                                                 |
| Guidance              | `docs/ai/AI_QUICKSTART.md`, `docs/ai/COMPONENT_SELECTION.md`, `docs/ai/OPERATIONAL_PATTERNS.md`, `research/18-operational-ux/OPERATIONAL_AI_GUIDANCE.md`, `AAPM_REFERENCE_ADOPTION.md` | Agents are directed to page-local anchors and told not to move scroll observation or product state into the UI system                                 |
| Tests/evidence        | `tests/operational-patterns.spec.ts` and this gate record                                                                                                                              | Anchor semantics, active update, mobile disclosure, responsive overflow, axe, catalog route, and desktop/mobile visual checks                         |

No semantic recipe was rewritten. The component is intentionally standalone:
the requirement is a reusable page-local navigation capability that can be
composed inside `entity-form`, `entity-detail`, Field Visit, or another
bounded workspace only when the consumer has independently rendered sections.

## Runtime evidence

Browser evidence ran against the isolated SectionNavigation worktree server:
`http://127.0.0.1:4177/operational-patterns`. Ambient 4173/4174/4175 servers
were not used as gate evidence.

- Desktop `1440×900`: Entity 360 exposes one named `Entity sections` nav with
  five native anchors. The active `Summary` item has `aria-current="location"`;
  selecting `Revision context` updates the active state and URL hash while
  preserving the section target.
- Mobile `390×844`: the wide list is hidden and the same navigation is exposed
  through a keyboard-accessible native details menu. Selecting an item updates
  the hash, closes the menu, and updates the current-section summary.
- The Entity 360 targets are canonical `Card`/`RecordSummary` sections; no
  business validation, scroll observer, API, Farm data, or persistence was
  added to the fixture.
- New visual baselines are kept at:
  `tests/operational-patterns.spec.ts-snapshots/section-navigation-desktop-chromium-win32.png`
  and
  `tests/operational-patterns.spec.ts-snapshots/section-navigation-mobile-chromium-win32.png`.

## Verification matrix

### Scoped PASS

- `pnpm contracts:generate` — PASS, 185 generated projections and three DTCG
  exports.
- `pnpm test:contracts` — PASS, 29 recipes, four typed operational recipes,
  compact/full retrieval at `99359/317443` bytes.
- `pnpm test:ai` — PASS, 29 recipes, 147 components, 12 blocks, 98 icons;
  15 cold-start tasks, 12 contract/catalog reads, 0 donor reads.
- `pnpm test:component-system` — PASS, 141 canonical components, six aliases,
  29 recipes, 12 blocks; explicit SectionNavigation source/category/status
  checks.
- `pnpm test:component-coverage` — PASS, seven high-impact selector families
  and 831 tracked raw-pixel occurrences of migration debt.
- `pnpm test:tailwind-bridge` — PASS.
- `pnpm package:build` — PASS (ESM/CJS package build).
- `pnpm typecheck` — PASS (contracts, agent, playground).
- `pnpm build` — PASS (playground production build; existing chunk-size warning
  only).
- `pnpm test:brand-expression` — PASS.
- `pnpm test:recipe-family` — PASS.
- `pnpm --filter @ten4seven/tokens test` — PASS, 21 tests.
- Targeted SectionNavigation/operational Playwright slice on the isolated 4177
  server — **6 passed**: Entity 360 anchor semantics and active update, mobile
  disclosure, desktop visual, mobile visual, responsive overflow, and serious/
  critical axe checks.
- Catalog integrity canonical component/family route sweep — **1 passed**;
  the new component route resolves with a non-placeholder fixture.
- Targeted Prettier check over every changed source, catalog, projection,
  guidance, evidence, and test file — PASS.

### Baseline debt / not a gate blocker

- `pnpm format:check` remains a repository baseline failure: the full tree
  reports 338 existing CRLF/formatting-drift files. Changed files pass the
  targeted check above.
- `pnpm test` passes contracts, DTCG, contrast, token governance, and
  component-token coverage, then stops at the isolated `test:slice-a` consumer
  fixture because `@ten4seven/agent` cannot be resolved from
  `consumer-tests/entity-list-consumer/src/run.mjs`. No workaround was added
  to this component.
- The full operational Playwright run retains inherited environment-level
  visual pixel drift across legacy surfaces (including baselines inherited
  from the previous gate). Only the two new SectionNavigation baselines were
  added; unrelated snapshots were not overwritten.

## Stop-condition audit

The gate did not require a donor/runtime dependency, breaking public API,
business calculation, authorization logic, `aapm_prod` access, or a semantic
recipe rewrite. Generic versus product ownership is explicit: the component
renders consumer-supplied anchors and active state, while the consumer owns
scroll observation, validation, workflow state, and routing. The gate is safe
to hand off to **T7-QR-001** after this local delivery is committed.
