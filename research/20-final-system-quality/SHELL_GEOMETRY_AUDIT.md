# Shell geometry audit

Status: **PASS**

SOURCE: `AppShell`, `PublicShell`, `Sidebar`, `PageHeader`, recipe tokens, and
the reference-shell composition remain the canonical owners. No route builds a
parallel shell or local navigation primitive.

RUNTIME: the full serial suite covers the primary routes at desktop, compact
desktop, tablet, 390 px, and 360 px. The dedicated route audit asserts a live
`main` landmark and zero horizontal document overflow. Operations Tracker was
also manually reviewed after its workflow correction.

OBSERVED: the Operations desktop render has document overflow `0`; its selected
stage uses a 3 px semantic primary accent and a 12% selected tint rather than a
full heavy state card. Narrow workflow overflow is contained by the intended
scroll rail, never the document.

Known limitation: wide data tables may own horizontal scrolling or stacked
records by component contract; a full-width table is not treated as generic
body overflow.
