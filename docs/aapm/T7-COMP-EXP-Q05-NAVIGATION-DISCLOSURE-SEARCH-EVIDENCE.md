# T7 Component Expansion Q05 — Navigation, Disclosure and Search Evidence

Status: PASS WITH CONSTRAINTS FOR Q06  
Queue: `Q05-NAVIGATION-DISCLOSURE-SEARCH.md`  
Mode: BOUNDED-WIDE  
Risk: R2  
Date: 2026-09-11

## 1. Scope and authority

Q05 was executed against the attached Q05 work specification and the Q03
normalized coverage ledger. Q04 entered this queue with `PASS WITH CONSTRAINTS
FOR Q05`. Q03 is the backlog authority, so this queue does not invent a second
navigation or search taxonomy merely to increase the component count.

The existing canonical contracts already cover the legitimate Q05 families:

- `NavigationMenu`, `TopNavigation`, `Breadcrumb`, and `SectionNavigation` for
  global and contextual wayfinding;
- `NavigationRail`, `BottomNavigation`, and `TreeView` from Q04 for secondary,
  narrow, and hierarchical navigation;
- `Accordion` and `Collapsible` for bounded disclosure;
- `CommandMenu` / `CommandPalette` for command-oriented navigation;
- `SearchInput`, `Combobox`, `HierarchyPicker`, and `FilterToolbar` for
  search, selection, hierarchy, and faceted filtering contracts.

Because those contracts are already indexed and implemented, Q05 does not add
`BackToTop`, `MegaMenu`, a second typeahead primitive, or an unconditional
`Menubar`. Those names would duplicate existing responsibilities or introduce
product-specific behavior into the canonical library. `Menubar` remains a
conditional candidate only if a distinct, evidence-backed contract is later
approved.

## 2. Delivery map

| Contract                         | Canonical source                 | Q05 responsibility                                                                               |
| -------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------ |
| `NavigationMenu`                 | `packages/ui/src/navigation.tsx` | Roving root focus, branch keyboard behavior, submenu focus, and trigger restoration.             |
| `SectionNavigation`              | `packages/ui/src/navigation.tsx` | Contextual/local navigation with responsive recomposition; the consumer owns scroll-spy meaning. |
| `Accordion`                      | `packages/ui/src/navigation.tsx` | Trigger/panel relationships with a labelled `role="region"` when open.                           |
| `Collapsible`                    | `packages/ui/src/navigation.tsx` | Same labelled-region contract plus explicit disabled behavior.                                   |
| `CommandMenu` / `CommandPalette` | `packages/ui/src/navigation.tsx` | Group labels, option position metadata, reopen reset, and focus restoration.                     |
| `SearchInput`                    | `packages/ui/src/forms.tsx`      | Semantic search input only; it does not claim authorization or domain-search semantics.          |
| `HierarchyPicker` / `TreeView`   | `packages/ui/src/hierarchy.tsx`  | Hierarchy selection and navigation remain separate from command search and global navigation.    |

No new primitive source file or parallel interaction runtime was introduced.
Existing previews, fixtures, and family showroom entries remain the public
presentation layer.

## 3. Contract hardening

### NavigationMenu

- The root navigation exposes one tabbable item at a time and supports
  ArrowLeft/ArrowRight plus Home/End roving focus.
- Enter, Space, or ArrowDown opens a branch and moves focus to its first
  submenu item.
- Submenu ArrowUp/ArrowDown/Home/End navigation remains local to the branch.
- Escape and ArrowLeft close the branch and restore focus to its trigger.
- The contract remains public navigation; command execution remains owned by
  `CommandMenu`.

### Accordion and Collapsible

- Open panels use `aria-labelledby` and `role="region"` so the trigger/panel
  relationship is explicit to assistive technology.
- `Collapsible` now exposes a token-backed `disabled` state that blocks the
  toggle interaction while preserving the accessible button contract.
- No semantic status color is introduced for ordinary disclosure surfaces.

### CommandMenu / CommandPalette

- The query and active option reset on a new open transition, avoiding stale
  command state between invocations.
- Filtered options expose `aria-posinset` and `aria-setsize`.
- Group labels are rendered as non-option headings while options retain their
  listbox semantics.
- The shortcut flag documents the component-owned Cmd/Ctrl+K behavior; domain
  authorization, command execution policy, and business search remain outside
  this UI contract.

### Search boundary

`SearchInput` remains a semantic `type="search"` field. It is intentionally
not merged with `CommandMenu`, `Combobox`, or domain filters: navigation search,
command search, entity selection, and authorization-aware product search have
different owners and behaviors.

## 4. Token and theme contract

The implementation follows the primitive → semantic → component token model.
Disclosure and command styling use the existing Ten4Seven roles for borders,
surfaces, focus, selected states, disabled foreground, typography, spacing, and
motion. No raw palette, local radius scale, local shadow scale, or second motion
runtime was added.

The disabled disclosure treatment uses the existing
`--t7-disabled-foreground-hsl` role with token-backed opacity and cursor
semantics. Command group labels use the existing reference spacing and muted
foreground roles. Navigation behavior uses the canonical focus and motion
contracts already consumed by the shared shell.

Theme Studio remains the matrix authority for appearance, density, contrast,
motion, surface treatment, chart colorway, and content rail. Q05 components do
not claim status or chart colors for ordinary navigation and disclosure.

## 5. Showroom and proof surfaces

The canonical component showroom already presents 19 implemented navigation
contracts in two groups:

- Wayfinding — 10 contracts;
- Disclosure and command — 9 contracts.

The existing previews cover Navigation Menu, Section Navigation, Accordion,
Collapsible, and Command Menu without adding a long catalog narrative. The
existing Component Lab navigation section continues to provide the compact
`Bounded disclosure` proof and the command-menu action inside the Overlays
proof. This preserves the one-family-showroom rule and avoids duplicating
component identities across Q05.

## 6. Registry and generated contract projections

`packages/ai/catalog/components.json` was updated with the Q05 accessibility
and API metadata for the hardened contracts. The catalog still reports 165
entries: 159 canonical implemented components and 6 aliases; Q05 adds no new
canonical identity.

`pnpm contracts:generate` was run after the catalog change. The generated agent
index, compact projections, component shards, package-agent copies, theme
recipe CSS, and DTCG exports are derived outputs rather than a second decision
manifest. The generator reported 210 contract projections.

## 7. Verification record

| Check                                                                      | Result        | Evidence                                                                                                                                                          |
| -------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm typecheck`                                                           | PASS          | UI, contracts, native, agent, and playground typechecks completed.                                                                                                |
| `pnpm package:build`                                                       | PASS          | The distributable UI package rebuilt after the Q05 source changes.                                                                                                |
| `pnpm package:verify`                                                      | PASS          | The rebuilt package passed the self-contained export, token, icon, motion, and style verification.                                                                |
| `pnpm test`                                                                | PASS          | The full chained contract, responsive, domain, token, AI, component-system, and Tailwind bridge gates completed.                                                  |
| `pnpm build`                                                               | PASS          | The playground TypeScript/Vite production build completed; only the existing large-chunk advisory was emitted.                                                    |
| `pnpm test:ai`                                                             | PASS          | 29 recipes, 165 components, 12 blocks, 122 semantic icons; cold-start references pass.                                                                            |
| `pnpm test:component-system`                                               | PASS          | 159 canonical components, 6 aliases, 29 recipes, 12 expressive blocks.                                                                                            |
| `pnpm test:contracts`                                                      | PASS          | Typed contract, alias, retrieval, ThemeProfile, and recipe checks pass.                                                                                           |
| `pnpm exec playwright test tests/q05-navigation-disclosure-search.spec.ts` | PASS          | 3 focused browser tests pass: NavigationMenu keyboard/focus, disclosure region and command metadata, and SearchInput semantics.                                   |
| Codex Browser `/components/navigation`                                     | OBSERVED PASS | Shared shell rendered; 19 contracts and two navigation/disclosure groups visible. Products opened its branch; Escape collapsed it and restored focus to Products. |
| Codex Browser `/component-lab`                                             | OBSERVED PASS | Existing seven-section Component Lab rendered, including bounded disclosure, Q04 navigation proofs, chart/surface proofs, and command action.                     |
| Codex Browser `/theme-studio`                                              | OBSERVED PASS | Theme recipe controls, live preview, component canaries, and Q04 responsive/module-state section rendered.                                                        |
| `pnpm format:check`                                                        | CONSTRAINT    | Repository-wide baseline reports 368 files requiring formatting; targeted Q05 source/test files were formatted and pass focused Prettier checks.                  |
| `git diff --check`                                                         | PASS          | No whitespace error; Git reported existing CRLF normalization warnings for unrelated dirty files only.                                                            |

The full repository gates completed after the evidence file was added. The
repository-wide formatting constraint is retained because resolving it would
require formatting hundreds of unrelated dirty files.

## 8. Evidence classification and boundary

- **SOURCE:** canonical navigation/forms/hierarchy implementations, token
  roles, catalog metadata, generated projections, existing previews, and the
  focused Q05 test.
- **RUNTIME:** rebuilt and verified UI package, focused Playwright proof, full
  repository tests, and the playground production build.
- **OBSERVED:** Codex Browser route inspections and the visible NavigationMenu
  open/close focus behavior described above.
- **UNKNOWN / UNVERIFIED:** production consumer adoption, native renderer
  integration, backend/domain search behavior, authorization policy, and
  downstream product visual acceptance. Q05 is a canonical library and proof
  hardening delivery, not a claim of product-wide migration.

The worktree was already dirty with prior queue and branch changes. No reset,
clean, commit, push, merge, branch deletion, or deployment was performed. The
current branch/SHA at evidence time is:

```text
codex/icons-curated-solar-style
e582cfcfbe0f077d1a5832d86db9da1898487fd3
feat(q14): restore fluid navigation and responsive shell hardening
```

The Q05 changes are intentionally left in the shared worktree for the user to
review and commit according to the existing branch plan.

PASS WITH CONSTRAINTS FOR Q06
