# AAPM → ten4seven extraction map

This map turns the supplied AAPM design system into a generic core without pretending that AAPM branding or source provenance disappear. The primary evidence is `D:\SA\ASSET\AAPM Design System 0826\_ds_manifest.json`, `tokens/`, `components/`, `components/core/Icon.jsx`, and `ui_kits/`.

## Decision vocabulary

| Decision             | Meaning in this repository                                                        |
| -------------------- | --------------------------------------------------------------------------------- |
| `GENERIC_KEEP`       | Keep the concept and public role with minimal naming change.                      |
| `GENERIC_RENAME`     | Keep the concept but remove provider/brand-specific naming.                       |
| `GENERIC_RETOKENIZE` | Keep the behavior while replacing hard-coded AAPM values with semantic variables. |
| `DOMAIN_MOVE`        | Keep as a domain pack or recipe, not generic core.                                |
| `BRAND_PRESET`       | Preserve only as an opt-in AAPM reference theme/fixture.                          |
| `EXAMPLE_ONLY`       | Useful for docs or visual reference; not a runtime contract.                      |
| `REPLACE`            | Re-author the mechanism behind the same contract.                                 |
| `DROP`               | Do not carry the concept into generic core.                                       |

## Core component map

| AAPM concept                                                                                                      | Decision                              | ten4seven target                        | Reason                                                                                 |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------- |
| Button, ButtonGroup, SplitButton                                                                                  | `GENERIC_KEEP`                        | `@ten4seven/ui`                         | Stable interaction primitive; keep intent/size semantics.                              |
| Card, Surface, Badge, Chip, Stat, Progress, Spinner                                                               | `GENERIC_KEEP` + `GENERIC_RETOKENIZE` | `@ten4seven/ui`                         | Reusable surfaces and status primitives; consume semantic variables.                   |
| Icon, IconTile, IconButton                                                                                        | `GENERIC_RENAME` + `REPLACE`          | `T7Icon`, `IconTile`, `IconButton`      | Preserve semantic icon API while replacing CDN loading with a local static boundary.   |
| Input, Textarea, NumberInput, CurrencyInput, PercentInput, SearchInput                                            | `GENERIC_KEEP` + `GENERIC_RETOKENIZE` | `@ten4seven/ui`                         | Form density and focus behavior are system-level concerns.                             |
| Select, MultiSelect, DatePicker, DateRangePicker, Checkbox, Radio, Switch, FileUpload, OtpInput, Label, FormField | `GENERIC_KEEP`                        | `@ten4seven/ui`                         | Canonical form vocabulary; implementation can mature incrementally.                    |
| DataTable, StatusChip, MetricCard, KeyValueList, Avatar, Skeleton, AuditTimeline, ActivityFeed                    | `GENERIC_KEEP` + `HARDEN`             | `@ten4seven/ui`                         | Data-heavy product UI is a P0 surface; row density must be declared.                   |
| Sparkline, TrendIndicator, BulletChart, BarChart, LineChart, DonutChart, Heatmap                                  | `GENERIC_KEEP`                        | `@ten4seven/ui`                         | Chart questions are domain-neutral; chart palettes become semantic categorical tokens. |
| Breadcrumb, Pagination, Tabs, Stepper, NavItem, CommandMenu                                                       | `GENERIC_KEEP`                        | `@ten4seven/ui`                         | Navigation and command behavior generalize cleanly.                                    |
| Modal, Drawer, Popover, Tooltip                                                                                   | `GENERIC_KEEP` + `HARDEN`             | `@ten4seven/ui`                         | Overlay semantics require focus, Escape, layering, and reduced-motion behavior.        |
| Alert, Toast, EmptyState, StateView                                                                               | `GENERIC_KEEP`                        | `@ten4seven/ui`                         | State vocabulary and recovery actions should not be reinvented per app.                |
| PageHeader, FilterToolbar, KPICluster, BulkActionBar, FormSection, RecordSummary, ApprovalPanel, ActionFooter     | `GENERIC_KEEP`                        | `@ten4seven/ui` or `@ten4seven/recipes` | AAPM's application-level blocks are high-leverage system grammar.                      |

## Token and brand map

| AAPM material                                                    | Decision                              | Generic treatment                                                                              |
| ---------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `--brand-green`, lime, terracotta, AI violet                     | `GENERIC_RETOKENIZE`                  | Map to `primary`, `accent`, `success`, `warning`, `danger`, `info`, and categorical roles.     |
| `--background`, `--surface-*`, foregrounds, borders, focus       | `GENERIC_KEEP`                        | Retain semantic surfaces as the stable component contract.                                     |
| `data-density="comfortable"` / `compact` and 52 → 44 → 36px rows | `GENERIC_KEEP`                        | Generalize to comfortable/default/compact/dense profiles without shrinking text with rows.     |
| control/base/panel/card/shell radius family                      | `GENERIC_KEEP`                        | Preserve a hierarchical radius engine with sharp/soft/rounded profiles.                        |
| Inter variable font                                              | `BRAND_PRESET` / `GENERIC_RETOKENIZE` | Keep a system font role; AAPM Inter remains a reference preset, not a forced brand dependency. |
| dark theme selector                                              | `GENERIC_KEEP`                        | Provider-controlled appearance with system preference support.                                 |
| motion timings and reduced-motion rules                          | `GENERIC_KEEP`                        | Convert into motion variables and shared transition rules.                                     |

## Domain and brand boundary

| AAPM material                                                                  | Decision                        | Boundary                                                                               |
| ------------------------------------------------------------------------------ | ------------------------------- | -------------------------------------------------------------------------------------- |
| Farm, flock, egg, feed, veterinary, production, poultry-corporate icon names   | `DOMAIN_MOVE`                   | `domains/farm` or a future icon catalog; not required by generic core.                 |
| Academy learning path, APPI, modules, exam, learner fixtures                   | `DOMAIN_MOVE`                   | `domains/academy` and UI-kit examples.                                                 |
| AAPM and Academy logos, mascot faces, farm illustrations, supplied photography | `BRAND_PRESET` / `EXAMPLE_ONLY` | Keep provenance in a separate private/reference package; never ship from generic core. |
| Indonesian-first copy rules and AAPM product nouns                             | `DOMAIN_MOVE`                   | Domain/content pack; generic components use neutral English fixtures.                  |
| AAPM Academy and ERP UI kits                                                   | `EXAMPLE_ONLY`                  | Visual QA and recipe references; no one-size-fits-all AppShell.                        |

## Donor synthesis

- HeroUI contributes accessibility, overlay, and complex control behavior ideas; its Pro source is not copied or exposed as a runtime dependency.
- shadcnblocks contributes source-owned primitive and registry mechanics; premium template code remains reference-only.
- Minimal TypeScript contributes theme axis and application composition patterns; MUI is not the public identity.
- The resulting core is intentionally CSS-variable-first and deterministic, with escape hatches for legitimate exceptional composition.
