# Recipe Family Model

Status: PASS for the bounded C2 slice.

The family proof uses one shared `createRecipeFamilyResolver` kernel and two
family policies:

```text
Recipe contract
    ↓
shared intent/state/responsive normalization
    ↓
family policy for conditional decisions
    ↓
shared composition/omission/consumer-ownership output
```

## Shared output model

Both typed representatives resolve the same shape:

```text
recipe
family
shell
intent
required
conditional
included
omitted
optional
states
responsive
forbid
rationale
consumerOwned
decisionCount
```

The kernel owns:

- intent merge and operation validation;
- responsive override and mode validation;
- required/conditional/optional composition ordering;
- omitted component reporting;
- loaded-contract status validation;
- state and responsive output;
- consumer-owned boundary output;
- one canonical composition scaffold.

It does not contain a filesystem loader, visual implementation, domain data,
or a profile-specific parallel design system.

## Policies

`operational-collection` is the policy for `entity-list`. It decides Sidebar,
KPICluster, FilterToolbar, Pagination, BulkActionBar, and DetailDrawer from
collection intent and query/selection/detail controls.

`record-inspection` is the policy for `entity-detail`. It decides AppShell,
Sidebar, StatusChip, ActivityFeed, ActionMenu, ActionFooter, DataTable, Alert,
and Modal from workspace context, read-only state, activity level, related
records, quick actions, and confirmation needs.

The policies only supply family-specific conditional decisions. They do not
reimplement normalization, provenance, contract loading, or composition.

## Scope discipline

The following remain outside this proof:

- all other recipe migrations;
- Brand Profile expansion or changes;
- visual redesign of existing routes;
- new generic UI primitives;
- package publication, commit, push, or deploy.

Authentication remains the frozen Brand Expression proof from Slice B.
