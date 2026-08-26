# Component selection guide

Search `packages/ai/catalog/components.json` for the full machine-readable contract.

| Need                                  | Start with                                                                                | Do not start with                  |
| ------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------- |
| Display comparable structured records | `DataTable`                                                                               | a grid of cards                    |
| Display a few visual items            | `Card` / list composition                                                                 | a dense table                      |
| Collect a text value                  | `Input`                                                                                   | a hand-built input                 |
| Choose from known values              | `Select`                                                                                  | a custom popover                   |
| Show a status                         | `Badge`                                                                                   | a colored text span                |
| Navigate a section                    | `NavItem`                                                                                 | a local button/link style          |
| Edit without leaving context          | `Modal` for focus; `DetailDrawer` for contextual inspection                               | a new overlay implementation       |
| Irreversible confirmation             | `Modal` with explicit action; `AlertDialog` recipe-contract                               | browser `confirm()`                |
| Record summary                        | `Card` composition; `RecordSummary` recipe-contract                                       | an ad hoc metric wall              |
| KPI values                            | `KPICluster` with truthful metric items                                                   | fake metrics or decorative numbers |
| Filters                               | `FilterToolbar` for list/report controls; `Checkbox`/`Radio` for bounded selection groups | scattered unlabelled controls      |
| Page framing                          | `AppShell` + optional `Sidebar` + `PageHeader`                                            | repeated local heading shells      |
| Visual catalog items                  | `ProductCard` with domain media and bounded actions                                       | a one-off `BookCard`               |

Choose by information need, not by visual novelty. Keep domain components thin and let canonical primitives own interaction, focus, and tokens.
