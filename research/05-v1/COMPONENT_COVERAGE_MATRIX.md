# ten4seven UI v1 component coverage matrix

Status recorded on 2026-08-27 after Gate C.2 shell integrity, v1 component
completion, and expressive block coverage.

## Status and evidence rule

`STABLE` is accepted foundation behavior that remains unchanged. `IMPLEMENTED` means the capability has a package-owned, token-driven public API, a catalog entry with status `implemented`, a documented selection path, and static/browser proof. `NOT_NEEDED` and `DOMAIN_SPECIFIC` are deliberate v1 boundaries.

The machine-readable source of truth is `packages/ai/catalog/components.json` (145 public entries: 139 canonical contracts and 6 aliases), `packages/ai/catalog/recipes.json` (17 recipes), and `packages/ai/catalog/blocks.json` (12 expressive blocks). `scripts/verify-ai-catalog.mjs` validates source paths, catalog fields, recipe/block references, status, local icon synchronization, and CLI retrieval. The component explorer at `/components`, the block catalog at `/blocks`, the Public Showcase, Operations Tracker, and Ebook provide representative interaction and composition proof.

## Foundations and actions

| Capability                                        | v1 status   | Canonical contract / proof                                             |
| ------------------------------------------------- | ----------- | ---------------------------------------------------------------------- |
| Semantic five-axis provider                       | STABLE      | `Ten4SevenProvider`; all explorer and reference routes consume it.     |
| Inter Variable, `opsz`, restrained semantic roles | STABLE      | `Typography` and token profiles; Theme Studio specimen and references. |
| Local semantic icon registry                      | STABLE      | `T7Icon`, 98 local Solar glyphs, catalog-registry equality check.      |
| Motion / reduced-motion and semantic elevation    | IMPLEMENTED | token CSS plus `Surface`, `Panel`, and `Card` families.                |
| Buttons, loading, icon buttons, grouping          | IMPLEMENTED | `Button`, `IconButton`, `ButtonGroup`, `SplitButton`; live explorer.   |
| Pressed / segmented controls                      | IMPLEMENTED | `ToggleButton`, `ToggleButtonGroup`; shared action contract.           |
| Action / overflow / context menus                 | IMPLEMENTED | `DropdownMenu`, `ActionMenu`, `ContextMenu`; shared overlay mechanics. |

## Forms, selection, and date/time

| Capability                                | v1 status   | Canonical contract / proof                                                                              |
| ----------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| Label, description, error, field grouping | IMPLEMENTED | `Field`, `Label`, `FieldDescription`, `FieldError`, `FieldGroup`.                                       |
| Form sections, grid, actions              | IMPLEMENTED | `FormSection`, `FormGrid`, `FormActions`, `ActionFooter`.                                               |
| Text, password, multiline, numeric entry  | IMPLEMENTED | `Input`, `SearchInput`, `PasswordInput`, `Textarea`, `NumberInput`, `CurrencyInput`, `PercentInput`.    |
| Select and bounded choices                | IMPLEMENTED | `Select`, `NativeSelect`, `Checkbox`, `Radio`, `CheckboxGroup`, `RadioGroup`, `Switch`.                 |
| Searchable / multi-value choices          | IMPLEMENTED | `Combobox`, `MultiSelect`; live explorer proof.                                                         |
| Range and OTP controls                    | IMPLEMENTED | `Slider`, `RangeSlider`, `OtpInput`; native control foundations.                                        |
| Calendar and date selection               | IMPLEMENTED | keyboard-addressable `Calendar`, `DatePicker`, `DateRangePicker`.                                       |
| Time and date-time composition            | IMPLEMENTED | `NativeTimeInput`, tokenized `TimePicker`, and `DateTimeInput` composition; no date-library dependency. |

## Navigation, shell, surfaces, and layout

| Capability                                  | v1 status   | Canonical contract / proof                                                                                                                      |
| ------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Shared shell grammar                        | IMPLEMENTED | `AppShell → [Sidebar \| TopNavigation \| NavigationMenu] → [PageHeader] → bounded route content`; documented in `docs/ai/SHELL_COMPOSITION.md`. |
| Private and public navigation               | IMPLEMENTED | `Sidebar`, `SidebarGroup`, `NavItem`, `TopNavigation`, nested `NavigationMenu`, and `MobileSidebar`.                                            |
| Breadcrumb, tabs, disclosure, step progress | IMPLEMENTED | `Breadcrumb`, `Tabs`, `TabPanel`, `Accordion`, `Collapsible`, `Stepper`.                                                                        |
| Command surface                             | IMPLEMENTED | `CommandMenu` / `CommandPalette`; live dialog proof.                                                                                            |
| Card and surface anatomy                    | IMPLEMENTED | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `Surface`, `Panel`, `Section`.                               |
| Dividers and bounded scroll                 | IMPLEMENTED | `Separator`, `ScrollArea`.                                                                                                                      |
| Layout utility component suite              | NOT_NEEDED  | Use CSS grid/flex composition; do not create a Tailwind replacement abstraction.                                                                |
| Resizable pane / split view                 | NOT_NEEDED  | Defer until an actual reference requires its interaction model.                                                                                 |

## Data, filtering, and application workflow

| Capability                            | v1 status   | Canonical contract / proof                                                                                           |
| ------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------- |
| Status, avatar, descriptions, metrics | IMPLEMENTED | `Badge`, `StatusChip`, `Avatar`, `AvatarGroup`, `KeyValueList` / `DescriptionList`, `MetricCard`.                    |
| Ordered activity and record summary   | IMPLEMENTED | `ActivityFeed` / `Timeline`, `RecordSummary`.                                                                        |
| DataTable operation surface           | IMPLEMENTED | sort, controlled selection, load/error/empty state, density, column visibility and sticky subset; Operations proof.  |
| Table actions and bulk decisions      | IMPLEMENTED | `DataTableColumnPicker`, `BulkActionBar`, `ActionMenu`, `AlertDialog`.                                               |
| Product summary surface               | IMPLEMENTED | `ProductCard` plus generic commerce metadata; Ebook proof.                                                           |
| Filtering primitives                  | IMPLEMENTED | `FilterToolbar`, `FilterChip`, `AppliedFilters`, `FilterDrawer`; Ecommerce keeps filter composition browse-oriented. |
| Page and section composition          | IMPLEMENTED | `PageHeader`, `SectionHeader`, `Toolbar`, `ActionBar`, `ActionFooter`.                                               |
| Review / approval workflow            | IMPLEMENTED | `ApprovalPanel`, `BulkActionBar`, `AlertDialog`.                                                                     |

## Overlays, feedback, charts, files, and media

| Capability                       | v1 status   | Canonical contract / proof                                                                                            |
| -------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------- |
| Modal / drawer lifecycle         | IMPLEMENTED | native-dialog-backed `Modal`, generic `Drawer`, and `DetailDrawer`, with focus return, Escape, and backdrop behavior. |
| Confirmation / popover / tooltip | IMPLEMENTED | `AlertDialog`, `Popover`, `Tooltip`, `DropdownMenu`, `ContextMenu`.                                                   |
| Alerts, state, toast, loading    | IMPLEMENTED | `Alert`, `StateView`, `EmptyState`, `ToastProvider`, `Toast`, `Toaster`, `Skeleton`, `Spinner`.                       |
| Determinate and compact progress | IMPLEMENTED | `Progress`, `CircularProgress`, `TrendIndicator`, `Sparkline`.                                                        |
| General SVG charts               | IMPLEMENTED | `LineChart`, `BarChart`, `DonutChart`, `ChartLegend`; rounded tick scale, zero baseline, and token chart palette.     |
| Heatmap / bullet chart           | NOT_NEEDED  | Defer until a real analytics reference proves the need.                                                               |
| Local file selection UI          | IMPLEMENTED | `FileUpload`, `FileItem`, `FileList`; intentionally no storage/backend promise.                                       |
| Generic media composition        | IMPLEMENTED | `AspectRatio`, `MediaFrame`, `Image` fallback.                                                                        |
| Generic commerce composition     | IMPLEMENTED | `ProductGrid`, `Price`, `Rating`, `ProductMeta`; Ebook uses `ProductGrid`, `ProductCard`, `Price`, and `Rating`.      |

## Expressive composition

| Capability                           | v1 status   | Canonical contract / proof                                                                           |
| ------------------------------------ | ----------- | ---------------------------------------------------------------------------------------------------- |
| Public section-level blocks          | IMPLEMENTED | Twelve blocks in `blocks.json`; live previews at `/blocks`; detail contract at `/blocks/hero-split`. |
| Public reference shell               | IMPLEMENTED | `PublicShell` plus `marketing-home` recipe at `/public-showcase`.                                    |
| Native carousel and chart affordance | IMPLEMENTED | `Carousel`, `ChartPanel`, and tokenized chart focus/hover/summary behavior in the public reference.  |

## Domain boundary

| Capability                                                                 | Decision                                                                             |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Operations workstream fixture, domain-specific routing and follow-up rules | DOMAIN_SPECIFIC — kept inside the operations reference.                              |
| Publishing availability, author copy, editorial cover fixtures             | DOMAIN_SPECIFIC — kept inside the publishing reference.                              |
| Cart, checkout, payment, authentication, storage, analytics backends       | DOMAIN_SPECIFIC — recipes frame UI only and preserve consumer business architecture. |
| Rich text editor, kanban, scheduler, node graph, GIS, 3D, spreadsheet      | NOT_NEEDED — explicit v1 boundary.                                                   |

## Completion conclusion

The former material `MISSING` entries are now canonical package capabilities rather than feature-local substitutes. The v1 contract is capability-based: the component count is not a completion claim by itself. A component is usable only when its source, semantic styling, catalog contract, recipe routing where applicable, and QA path stay synchronized. Future donor investigation follows the recorded gap-event protocol in `DONOR_GAP_EVENTS.md`.
