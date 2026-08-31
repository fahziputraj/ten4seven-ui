# Entity Detail Family Proof

Status: PASS.

`entity-detail` is the single new typed representative for the
Record / Inspection family. Its contract is derived from the existing catalog
recipe and implemented component contracts; no new visual primitive was added.

## Canonical contract

Required anatomy:

```text
PageHeader
RecordSummary
KeyValueList
```

Conditional anatomy is selected by the family policy:

```text
AppShell, Sidebar, StatusChip, ActivityFeed, ActionMenu, ActionFooter,
DataTable, Alert, Modal
```

Consumer-owned data remains separate from the scaffold:

```text
record data
record attributes
activity and related-record data
permissions
persistence
event handlers
route navigation
```

## Scenarios

### D1 — Operational record

Intent includes authenticated workspace navigation, triage, information-dense
context, full activity, related records, quick actions, and a final action
footer.

Included components:

```text
PageHeader, RecordSummary, KeyValueList, AppShell, Sidebar, StatusChip,
ActivityFeed, ActionMenu, ActionFooter, DataTable
```

Omitted conditionals: `Alert`, `Modal`.

Actual retrieval: `7,017` bytes.

### D2 — Read-only record

Intent is a normal route with no persistent workspace navigation, read-only
behavior, minimal activity, no related-record table, no quick actions, and no
action footer.

Included components:

```text
PageHeader, RecordSummary, KeyValueList, StatusChip, ActivityFeed
```

Omitted conditionals: `AppShell`, `Sidebar`, `ActionMenu`, `ActionFooter`,
`DataTable`, `Alert`, `Modal`.

Actual retrieval: `5,509` bytes.

### D3 — Investigation record

Intent includes high-context workspace navigation, triage, information-dense
context, full activity, related records, and quick actions. It intentionally
keeps the quick actions near the record context and does not add a final action
footer.

Included components:

```text
PageHeader, RecordSummary, KeyValueList, AppShell, Sidebar, StatusChip,
ActivityFeed, ActionMenu, DataTable
```

Omitted conditionals: `ActionFooter`, `Alert`, `Modal`.

Actual retrieval: `6,732` bytes.

## Determinism proof

For all three scenarios:

- Node-loaded resolution and direct pure-core resolution are identical after
  removing Node-only telemetry;
- the component IDs read by Node equal the kernel's included composition;
- no full compact component projection is read;
- no source implementation or donor file is read;
- no local primitive, parallel system, or agent-owned covered anatomy decision
  is introduced;
- responsive output remains the canonical inline/stacked/stacked contract,
  with mobile `table` behavior unchanged for the Entity List baseline.
