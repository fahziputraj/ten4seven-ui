# Reference adaptation matrix

Status: **PASS — bounded correction, not a replacement program**

| DWO concern | Canonical owner | Observed closure | Evidence |
| --- | --- | --- |
| shell gutters and rails | token geometry, AppShell, reference CSS | bounded desktop/mobile content rails; no document overflow in route audit | [SHELL_GEOMETRY_AUDIT.md](SHELL_GEOMETRY_AUDIT.md) |
| content and slot safety | canonical Button/NavItem/Card/Table/overlay slots | long text retains disclosure/wrap/ellipsis policy without root clipping | [CONTENT_SAFETY_AUDIT.md](CONTENT_SAFETY_AUDIT.md) |
| selected workflow state | `MilestoneTracker` | text state, percentage, meter, and selected detail remain distinct | [OPERATIONAL_UX_PATTERN_AUDIT.md](../18-operational-ux/OPERATIONAL_UX_PATTERN_AUDIT.md) |
| floating geometry | shared overlay layer | menu/listbox/popover/modal/drawer own viewport, Escape, focus, and scroll contracts | [ACCESSIBILITY_BEHAVIOR_AUDIT.md](ACCESSIBILITY_BEHAVIOR_AUDIT.md), [OVERLAY_GEOMETRY_THEME_SETTINGS_CORRECTION.md](../17-visual-grammar-follow-up/OVERLAY_GEOMETRY_THEME_SETTINGS_CORRECTION.md) |
| date, time, slider, charts | canonical component implementations | no feature-local replacements were introduced | [FREEZE_READINESS_GATE.md](../18-operational-ux/FREEZE_READINESS_GATE.md), [CONTROL_GEOMETRY_AUDIT.md](../19-proportion-content-safety/CONTROL_GEOMETRY_AUDIT.md) |
| Theme UX | `Ten4SevenProvider`, `ThemeScope`, Theme Studio | one runtime preference model, bounded custom authoring, light/dark/density coverage | [FREEZE_READINESS_GATE.md](../18-operational-ux/FREEZE_READINESS_GATE.md), [BROWSER_AUDIT.md](../17-visual-grammar-follow-up/BROWSER_AUDIT.md) |
| product references | Operations, Publishing, Public Showcase | production-looking shells remain consumer-clean; QA is isolated from product bodies | [OPERATIONAL_UX_PATTERN_AUDIT.md](../18-operational-ux/OPERATIONAL_UX_PATTERN_AUDIT.md), [BROWSER_AUDIT.md](../17-visual-grammar-follow-up/BROWSER_AUDIT.md) |
| RSC consumer boundary | packed `@ten4seven/ui` root | explicit root client boundary without breaking existing imports | [NEXTJS_APP_ROUTER_COMPATIBILITY.md](../../docs/integration/NEXTJS_APP_ROUTER_COMPATIBILITY.md) |
| achromatic canvas and bounded surface emphasis | token resolver, canonical surface components | paper/ink canvas invariant across palettes; selective KPI, status, preview, commerce, and showcase colour remains bounded while forms/tables/shells stay neutral | [ACHROMATIC_CANVAS_SURFACE_EXPRESSION_AUDIT.md](ACHROMATIC_CANVAS_SURFACE_EXPRESSION_AUDIT.md) |
| mature KPI anatomy and graphical cues | `MetricCard`, `KPICluster`, `TrendIndicator`, `Sparkline`, `Progress`, token resolver | single and grouped KPIs share label/value/trend/context/chart/progress anatomy; direction is independent from business sentiment; density and colorway behavior are global | [KPI_SYSTEM_HARDENING.md](KPI_SYSTEM_HARDENING.md) |

No donor source, parallel component system, Farm application code, or AAPM
hardcoded primitive was added as part of this matrix. The KPI slice records one
bounded, user-directed HeroUI research lookup and zero donor runtime additions.
