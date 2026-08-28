# Component selection guide

The full executable authority is `packages/ai/catalog/components.json`. Pick by capability and interaction contract, not by a visual resemblance or an app-specific component name.

Only `implemented` catalog entries are available to product work. `experimental` needs an explicit product decision; `planned` is a gap, not an invitation to recreate it locally.

| Need                                                             | Start with                                                                                               | Do not start with                                                  |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Primary, secondary, destructive, or loading action               | `Button`; use `IconButton` only with an accessible label                                                 | a local button variant or raw icon click target                    |
| Compact exclusive/multiple view choice                           | `ToggleButtonGroup`                                                                                      | a second segmented-control system                                  |
| Text, number, currency, percentage, password, or multiline entry | `Field` with `Input`, `Textarea`, `NumberInput`, `CurrencyInput`, `PercentInput`, or `PasswordInput`     | manually assembled label/error spacing                             |
| Known bounded choice                                             | `Select` for the custom accessible popup, or `NativeSelect` when native platform behavior is intentional | exposing both models in one consumer control                       |
| Searchable or multi-value choice                                 | `Combobox`, `MultiSelect`, `CheckboxGroup`, or `RadioGroup`                                              | an unlabelled custom popover                                       |
| Date, range, time, or date-time entry                            | `DatePicker`, `DateRangePicker`, `NativeTimeInput`, `TimePicker`, or `DateTimeInput`                     | local calendar/time math or a one-off date widget                  |
| Route framing                                                    | `AppShell → [Sidebar                                                                                     | TopNavigation                                                      | NavigationMenu] → [PageHeader]` | repeated local shell/heading markup |
| Private information-dense navigation                             | `Sidebar` with optional `SidebarGroup`                                                                   | a public storefront navbar                                         |
| Public/content/commerce navigation                               | `PublicShell` + `NavigationMenu` (or `TopNavigation` for flat links)                                     | an ERP-like sidebar by default                                     |
| Comparable, sortable, selectable records                         | `DataTable`, `DataTableColumnPicker`, `BulkActionBar`                                                    | cards posing as a table                                            |
| One record summary or facts                                      | `RecordSummary`, `KeyValueList` / `DescriptionList`, `ActivityFeed` / `Timeline`                         | an ad hoc metric wall                                              |
| Compact status or category                                       | `StatusChip` for meaning; `Badge` for neutral category                                                   | colored text spans                                                 |
| Filtered list/report                                             | `FilterToolbar`, `AppliedFilters`, `FilterChip`, and `FilterDrawer` on narrow screens                    | scattered unlabelled controls                                      |
| Contextual inspection or editing                                 | `Drawer` or `DetailDrawer`                                                                               | a locally implemented drawer                                       |
| Focused task or confirmation                                     | `Modal`; `AlertDialog` for irreversible actions                                                          | browser `confirm()` or another dialog implementation               |
| Supplemental anchored content or action menu                     | `Popover`, `Tooltip`, `DropdownMenu`, `ContextMenu`, `ActionMenu`                                        | a new positioning/focus implementation                             |
| Feedback and recovery                                            | `Alert`, `Toast`, `StateView`, `EmptyState`, `Skeleton`, `Spinner`, `Progress`                           | fake success state or layout placeholders pretending data is ready |
| Small SVG data signal                                            | `TrendIndicator`, `Sparkline`, `LineChart`, `BarChart`, `DonutChart`, `ChartLegend`                      | a new chart library for one generic chart                          |
| Client-side file selection                                       | `FileUpload`, `FileList`, `FileItem`                                                                     | a storage/backend abstraction in UI code                           |
| Visual products, books, courses, media                           | `ProductGrid`, `ProductCard`, `Price`, `Rating`, `ProductMeta`, `MediaFrame`, `Image`                    | `BookCard`, `CommerceButton`, or a reskinned parallel primitive    |
| Cart quantity and review                                         | `QuantityControl`, `CartLineItem`, `CartPanel`, `OrderSummary`, `CartTrigger`                            | local cart controls or payment persistence in a UI primitive       |

## Shell and recipe decisions

Use `entity-list` for comparable operational records, `catalog` for content-first visual products, `cart` for cart review, `checkout` for order confirmation, `entity-detail` and `entity-form` for focused record work, `approval-queue` for review/decision flow, and `report` for time-bounded result analysis. For expressive recipes, use `blockRoles` to separate required, recommended, and optional blocks instead of rendering the full available block list. Recipes define the public composition; components own interaction, focus, density, typography, and tokens.

The canonical family taxonomy is Foundations, Actions, Forms, Navigation,
Layout, Patterns, Surfaces, Data Display, Tables, Filtering & Bulk Actions,
Overlays, Feedback & Progress, Date & Time, Files, Charts & Data
Visualization, Media, and Commerce. `DataTable` belongs to Tables; reusable
composition contracts such as `AppShell`, `CartPanel`, and `OrderSummary`
belong to Patterns.

`AppShell → [Sidebar | TopNavigation | NavigationMenu] → [PageHeader]` is the default shell grammar. Use `PublicShell` when the route is public or content-first. Keep PageHeader as the only route-level title. Use `MobileSidebar` or `FilterDrawer` to move secondary controls on narrow screens instead of duplicating a mobile component system.

## A real component gap

If the catalog cannot cover a required generic capability, do not add a feature-local substitute. Check canonical ten4seven first, then AAPM extraction. One donor lookup is allowed only if the generic gap remains; normalize the result into `@ten4seven/ui`, update the catalog and AI contracts, and record provenance. Consumer feature code never imports donor UI.
