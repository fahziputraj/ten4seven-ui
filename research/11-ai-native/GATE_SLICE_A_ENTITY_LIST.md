# Gate Slice A — Entity List AI-native proof

Status: **PASS**
Verified: 2026-08-31
Scope: deterministic `entity-list` resolution, canonical scaffold output, and
an isolated installed consumer.

## Definition of success

An agent can move from a typed entity-list intent to the correct structural
composition by reading the compact contract projection. The resolver owns
system decisions; the consumer still owns domain data and behavior.

This gate does not claim that a scaffold is a complete application. It proves
the boundary that lets a consumer build one without inventing a second shell,
table primitive, visual token set, or local interaction language.

## Resolution proof

The default resolver input is empty and therefore deterministic:

```text
resolveEntityListIntent()
  → AppShell
  → PageHeader
  → DataTable
  → Sidebar
  → KPICluster
  → FilterToolbar
  → Pagination
  → BulkActionBar
  → DetailDrawer
```

The decision contract keeps only the stable baseline in `required`:

```text
required: AppShell, PageHeader, DataTable
conditional: Sidebar, KPICluster, FilterToolbar, Pagination,
              BulkActionBar, DetailDrawer
```

The default resolution includes all nine contracts for the Operations Tracker
reference. A reduced embedded-list intent (`navigation=none`, search only,
no metrics, no pagination, no bulk actions, no contextual detail) resolves to
four contracts and omits the five unnecessary conditional contracts. Required,
conditional, and forbidden decisions cannot overlap.

The resolved scaffold exposes 35 deterministic decisions across intent,
composition, state vocabulary, and responsive behavior. It exposes no rows,
columns, permissions, persistence, or event handlers; those are explicitly
listed as consumer-owned.

## Retrieval and context proof

- Resolver source: `packages/agent/src/runtime.mjs`.
- Default reads: `generated/recipes.compact.json` and
  `generated/components.compact.json`.
- No import or read of `packages/ai/catalog/*` exists in the resolver runtime.
- Compact component/recipe projections are `63,229` bytes versus `275,790`
  bytes for the full pair (`22.9%` of the full size).
- The existing cold-start simulation now reads compact projections first and
  reports 12 contract/catalog reads including the small human contract files
  and expressive/icon lookup surfaces.
- `t7ui recipe inspect entity-list` and `t7ui compose entity-list` expose the
  migrated decision contract and scaffold without requiring full catalog
  retrieval.

## Isolated consumer proof

`consumer-tests/entity-list-consumer` is intentionally outside the workspace
package list and imports only public package names:

```text
@ten4seven/agent
@ten4seven/icons
@ten4seven/tokens
@ten4seven/ui
```

The fixture was installed with `pnpm install --ignore-workspace`, then executed
through Node's normal package resolution. It resolved the installed
`@ten4seven/agent` runtime and produced the canonical scaffold. The package
boundary is currently a reproducible local-file install because the repository
has not published registry artifacts for the new agent/contracts packages yet.

The fixture has:

- no internal `packages/*/src` import;
- no copied CSS;
- no local Button/Input/Card/Table/Select/Drawer primitive;
- no donor import;
- no domain implementation hidden in the scaffold;
- explicit consumer-owned placeholders for rows, columns, permissions, and
  event handlers.

## Automated evidence

The following checks passed after Slice A:

- `node --experimental-strip-types scripts/verify-contracts.mjs`
- `node scripts/verify-slice-a.mjs`
- `pnpm --filter @ten4seven/contracts typecheck`
- `pnpm --filter @ten4seven/agent typecheck`
- `pnpm test` (includes contract and Slice A gates, token tests, AI catalog,
  cold-start, and component-system checks)
- `pnpm typecheck` (contracts, agent, and playground)
- `pnpm format:check`
- `pnpm test:consistency`
- `pnpm test:adoption:static`
- `pnpm build`
- `pnpm package:verify`
- `git diff --check`

Existing browser evidence for the Operations Tracker route remains valid from
the preceding audit because Slice A changed no route, UI component, provider,
style, or screenshot baseline. A separate Playwright CLI E2E run was not
started in this slice; the in-app browser remains the chosen browser surface.

## Deliberate non-goals

Slice A does not migrate the remaining recipes, add brand profiles, redesign
Theme Studio or reference surfaces, change business behavior, or publish a
registry package. Those are separate gates.

## Next gate

Do not start Brand Profiles yet. The next approved architecture milestone is an
adoption benchmark that measures an independently scaffolded consumer against
this contract boundary. Only after that proof should the system add a second
typed recipe or a brand-profile plane.
