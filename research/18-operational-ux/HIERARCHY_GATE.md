# T7-HIERARCHY-001 — Hierarchy / Resource Scope gate

Status: **scoped PASS — NEW COMPONENT IMPLEMENTED + PROVEN**
Date: 2026-09-06
Program: Issue #3 — `T7-AAPM-AGENTIC-001`
Executable gate: `T7-HIERARCHY-001`
Stacked base: `425cbaee552830c24fb86852168c4c36b2767828` (`feat/T7-QR-001`)

## Discovery and classification

| Requirement                                    | Classification              | Decision                                                                                                                                                |
| ---------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tenant → Farm → Location → Cage selection      | **COMPONENT GAP**           | `Select`, `Combobox`, and `MultiSelect` are flat; no canonical tree selection contract exists.                                                          |
| Delegated resource-scope selection             | **COMPONENT GAP**           | AAPM requires nested resources with selected descendants/ancestors and partial selection. A flat choice composition cannot express that state reliably. |
| Tree/hierarchy display with keyboard semantics | **COMPONENT GAP**           | `Sidebar` is navigation-only and `Collapsible` is a disclosure primitive; neither exposes treeitem focus, levels, positions, or expansion state.        |
| Tenant/Farm context switcher                   | **COMPOSE / PRODUCT OWNED** | Use `Select`/`Combobox` plus consumer context summary when the choice is flat. Authorization and active-context policy remain outside ten4seven.        |
| Permission, role, and resource authorization   | **PRODUCT OWNED**           | The component accepts opaque IDs and disabled presentation state; it never evaluates membership, permissions, or server authorization.                  |
| Native mobile hierarchy/scanning workflow      | **NATIVE**                  | Mobile/Expo owns native interaction where required. This Web component does not request permissions or implement scanning.                              |

The generic repeated behavior is proven across the AAPM Farm management,
delegated administration, and ERP resource-scope requirements. This is not a
tenant-specific component request: the reusable contract is a labelled tree
that displays and selects opaque nested IDs while preserving consumer-owned
meaning.

## Candidate evaluation

| Candidate                                | Result                    | Reason                                                                                                                                                        |
| ---------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TreeView`                               | Rejected for this gate    | Display-only naming does not make descendant selection, mixed ancestors, or disabled scope nodes explicit.                                                    |
| `TreeSelect`                             | Deferred as a composition | A popup trigger and overlay lifecycle would add a second interaction surface; the first proven need is a visible tree in long forms, drawers, and mobile Web. |
| `HierarchyPicker`                        | **Chosen**                | One bounded panel owns tree semantics, expansion, branch/descendant selection, partial state, disabled nodes, optional local search, and responsive behavior. |
| Expandable list + `Checkbox` composition | Insufficient alone        | Existing primitives do not provide canonical ancestor propagation, mixed-state announcements, roving tree focus, or level/position metadata.                  |

## Implemented contract

`HierarchyPicker` is exported from `@ten4seven/ui` and accepts:

- `items: HierarchyItem[]`, where each item has a unique opaque `id`, a
  consumer-supplied `label`, optional `description`, optional `disabled`, and
  optional `children`;
- controlled or uncontrolled `selectedIds` / `defaultSelectedIds` and
  `onSelectionChange`;
- controlled or uncontrolled `expandedIds` / `defaultExpandedIds` and
  `onExpandedIdsChange`;
- `searchable`, `searchPlaceholder`, `label`, `description`, `emptyMessage`,
  and a whole-control `disabled` state.

Selection behavior is deterministic and presentation-only:

1. selecting a branch selects that branch and every selectable descendant;
2. removing a branch clears that branch and its selectable descendants;
3. a parent is `mixed` when only some selectable descendants are selected;
4. an ancestor becomes selected when all of its selectable descendants are
   selected; disabled nodes remain visible and cannot be toggled;
5. local search keeps matching ancestors as context and does not fetch or
   resolve resources.

The tree uses `role="tree"` / `role="treeitem"` with `aria-level`,
`aria-posinset`, `aria-setsize`, `aria-expanded`, `aria-selected`, linked
helper text, visible mixed state, and screen-reader selection text. Roving
focus supports Arrow Up/Down, Arrow Left/Right, Home, End, Space, and Enter.
The tree is a bounded scroll owner; labels wrap and the same touch-target
minimum is retained on narrow Web layouts.

## Ownership boundary

The consumer owns:

- the meaning of tenant, Farm, location, cage, or another resource type;
- permission and role evaluation, server-side authorization, and disabled
  reasoning;
- resource loading, pagination/lazy-loading, persistence, validation, and
  routing;
- any flat context-switcher policy or native Mobile implementation.

The generic component owns only tree presentation, local expansion, selection
state transitions, filtering, focus, and accessibility metadata. No donor UI,
new runtime dependency, API call, policy, calculation, or `aapm_prod` change
was introduced.

## Verification evidence

| Check                                                                                                   | Result                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pnpm --filter @ten4seven/ui build`                                                                     | PASS                                                                                                                                                   |
| `pnpm package:verify`                                                                                   | PASS                                                                                                                                                   |
| `pnpm typecheck`                                                                                        | PASS after the package boundary was built                                                                                                              |
| `pnpm contracts:generate`                                                                               | PASS — 187 projections, including generated `HierarchyPicker` shards                                                                                   |
| `pnpm test:contracts` / `pnpm test:ai` / `pnpm test:component-system`                                   | PASS — catalog and generated projections include the implemented component                                                                             |
| `pnpm test:dtcg` / `pnpm test:contrast` / `pnpm test:token-governance` / `pnpm test:component-coverage` | PASS — semantic exports and governance remain green; coverage reports 849 tracked raw-pixel occurrences as existing migration debt                     |
| `pnpm test:brand-expression` / `pnpm test:recipe-family`                                                | PASS — existing brand and selective retrieval proofs remain green; retrieval evidence reflects the new generated index size                            |
| `pnpm test:tailwind-bridge`                                                                             | PASS                                                                                                                                                   |
| `pnpm build`                                                                                            | PASS (existing chunk-size warning only)                                                                                                                |
| Targeted Playwright                                                                                     | PASS — desktop and mobile tree behavior, selection propagation, disabled node, search, keyboard navigation, axe critical/serious scan, and screenshots |
| Targeted Prettier check                                                                                 | PASS for changed implementation, catalog, projection, docs, evidence, and test files; selection matrix retains its established table formatting        |

Repository-wide `pnpm format:check` remains baseline debt (existing style
drift across the repository). The repository-wide `pnpm test` baseline also
stops at `test:slice-a` because the isolated consumer cannot resolve
`@ten4seven/agent`; the scoped component and browser checks remain green.

## Completion state

`NEW COMPONENT IMPLEMENTED + PROVEN` for the generic Web hierarchy/resource
scope capability. A future `TreeSelect` overlay or virtualized/lazy tree is a
separate evidence-gated requirement, not an implicit part of this gate.
