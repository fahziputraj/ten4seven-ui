# Content stress QA

Permanent fixture: `apps/playground/src/content-safety-proof.tsx`, rendered
through the existing Component Lab with `?stress=content`. It uses canonical
components and ThemeScope, not local replacements or a Farm application.

Content includes the requested long AAPM unit name, a long government name,
an unbroken identifier, multi-line descriptions, a long action label, large
currency and percentages, field error text and a long menu shortcut row.

Assertions cover:

- Document containment and gutter; Card text/action separation and safe inset.
- Button label/icon/spinner separation and explicit CTA wrapping.
- Single-line Badge, NavItem active dimensions and keyboard focus.
- Table action visibility, Drawer Escape and focus restoration.
- Exact SM/MD/LG heights, type, icon, gap, padding and input-icon clearance.
- Long menu and Modal title versus shortcut/close-action boundaries.
- Serious/critical axe in both appearance modes.
- Desktop CSS render zoom 125/150%, with accessible dialog interaction.
- Fresh route audit across five viewports and isolated Card/control captures.

## Failure discipline

The first functional run had 2 passing and 11 failing tests. It exposed
ActivityFeed unbroken-ID overflow, the missing explicit NavItem focus contract,
and field-error contrast. A focus-modality assertion and a scaled-height test
assumption also needed correction. After those fixes, all 13 focused functional
tests passed.

The first six new captures then exposed an implementation regression in Input
icon padding despite the height tests passing. The invalid spacing alias was
corrected and a geometric text/icon assertion added. Those initial captures
are not accepted final evidence. Baseline review and the final no-update run
are recorded separately.

One generated-file write returned Windows `UNKNOWN` once; the file remained
readable, and a full generator rerun succeeded. This is recorded as an
execution/environment event, not a product regression or hidden waiver.
