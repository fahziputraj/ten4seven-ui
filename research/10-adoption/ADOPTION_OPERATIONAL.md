# Operational Consumer Adoption

## Surface

`@ten4seven/adoption-operational` is an isolated receiving-workspace consumer at `http://127.0.0.1:4181`. It represents a private, information-dense application rather than a design-system showcase.

Routes exercised:

- `/operations` — receipt list, KPIs, search, status filter, row actions, navigation.
- `/operations/receipts/new` — create form with supplier, unit count, and dock notes.
- `/inventory` — secondary operational route and navigation handoff.

## Retrieval trace

Product context: “inventory operations admin receipts”. The catalog CLI returned the `entity-list` recipe with `AppShell`; the recipe supplied the operational list structure and `DataTable`/`DetailDrawer` contracts. The consumer then selected the implemented public APIs that fit the existing behavior: `AppShell`, `Sidebar`, `MobileSidebar`, `PageHeader`, `KPICluster`, `SearchInput`, `Select`, `DataTable`, `Table`, `Card`, `Input`, `Textarea`, `FormGrid`, `FormActions`, `DetailDrawer`, `KeyValueList`, `StatusChip`, `Avatar`, `Button`, and `Typography`.

Semantic icon names are supplied through `T7Icon` or canonical icon props: `warehouse`, `inventory`, `stockIn`, `calendar`, `pending`, `success`, `approve`, `view`, `add`, `menu`, and `settings`. No raw Iconify/provider string is present in the consumer.

## Behavior matrix

| Behavior              | Before                                                 | After                                                  | Result    |
| --------------------- | ------------------------------------------------------ | ------------------------------------------------------ | --------- |
| Initial receipt queue | Four records, three status buckets                     | Same records and counts                                | Preserved |
| Search                | `Northstar` isolates `RCV-1042`                        | Same                                                   | Preserved |
| Status filter         | `Scheduled` isolates the two scheduled records         | Same through the visible canonical popup               | Preserved |
| Navigation            | Receipts ↔ Inventory                                   | Same paths and active navigation                       | Preserved |
| Create                | Meridian Tools creates `RCV-1043` with scheduled state | Same                                                   | Preserved |
| Detail                | Open `RCV-1042` without leaving the queue              | `DetailDrawer` keeps the same workflow                 | Preserved |
| Mutation              | Mark `RCV-1042` received                               | Same record changes to `Received`                      | Preserved |
| Mobile                | Compact navigation is reachable                        | `MobileSidebar` opens, closes, and Escape dismisses it | Preserved |

## Adoption measurements

- New basic primitives: `0`.
- New consumer tokens: `0`.
- Parallel design-system package: `0`; the package consumes workspace `@ten4seven/ui`, `@ten4seven/tokens`, and `@ten4seven/icons`.
- Donor reads/imports: `0` in the controlled consumer proof.
- Local visual CSS: 127 lines / 17 selectors, layout glue only; all color, radius, shadow, typography, and control sizing values are ten4seven tokens.
- Domain behavior source: `src/domain.ts` has no diff from the legacy baseline at `13ec074`.

## Evidence

- Before desktop: `evidence/before/before-operational-desktop.png`
- Before mobile: `evidence/before/before-operational-mobile.png`
- After desktop: `evidence/after/after-operational-desktop.png`
- After mobile: `evidence/after/after-operational-mobile.png`

`pnpm test:adoption` passes the operational workflow as part of the 3-test adoption suite. Live Browser QA additionally verified the visible status popup, create/detail/status mutation, mobile drawer dismissal, no horizontal overflow, and empty warning/error logs.
