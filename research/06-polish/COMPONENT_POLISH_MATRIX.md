# Component polish matrix

Date: 2026-08-27

This matrix records the high-risk interaction families reviewed during System Coherence. The complete canonical inventory remains authoritative in the component and AI catalogs; this document does not create a second catalog.

| Family          | Canonical contracts reviewed                               | Keyboard/focus                                           | Theme stress                  | Responsive                | Result |
| --------------- | ---------------------------------------------------------- | -------------------------------------------------------- | ----------------------------- | ------------------------- | ------ |
| Actions         | Button, IconButton, ButtonGroup                            | focus-visible and disabled states                        | all five profiles             | desktop/mobile baselines  | pass   |
| Text entry      | Input, Textarea, SearchInput, TimeInput                    | native editing and labels                                | Components route baselines    | responsive form grid      | pass   |
| Selection       | Select, NativeSelect, Combobox, MultiSelect                | arrows, Enter, Escape; native fallback retained          | all five profiles             | popup geometry checked    | pass   |
| Date/range      | DatePicker, DateRangePicker, RangeSlider                   | native and composed controls                             | Components route baselines    | responsive form grid      | pass   |
| Navigation      | Tabs, Pagination, Sidebar navigation                       | arrows, Home/End, focus-visible                          | reference routes              | responsive shell          | pass   |
| Disclosure      | Accordion, Popover, DropdownMenu                           | Escape and focus restoration where modal/overlay applies | Components route              | anchored popup            | pass   |
| Modal surfaces  | Modal, Drawer, DetailDrawer, CommandMenu                   | initial focus, Escape, focus restoration                 | light/dark                    | desktop/mobile            | pass   |
| Data display    | Card, DataTable, KPICluster, StatusBadge                   | semantic state and selection                             | Warehouse stress suite        | mobile reference baseline | pass   |
| Commerce recipe | ProductCard and cart composition                           | quantity/remove actions; drawer dismissal                | Publishing stress suite       | mini-cart to drawer       | pass   |
| Feedback        | Alert, Toast/status semantics, empty/loading/error recipes | announced labels and actionable recovery                 | light/dark and palette stress | route fixtures            | pass   |

Automated accessibility coverage currently rejects serious and critical axe findings on the Components workbench. This is a release gate, not a claim of exhaustive assistive-technology certification.
