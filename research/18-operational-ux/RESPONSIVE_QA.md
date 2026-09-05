# Responsive QA — Operational Patterns

Status: **PASS for the bounded reference**  
Date: 2026-09-03

## Matrix

| Viewport | Automated coverage                                                             | Expected composition                                                            | Result |
| -------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ------ |
| 1440×900 | all five desktop visual states; dark/compact screenshot                        | persistent sidebar, bounded overview grids, visible context/action hierarchy    | PASS   |
| 1186×698 | all five views, horizontal-overflow assertion                                  | compact desktop; grids may reduce columns without losing semantic order         | PASS   |
| 840×900  | all five views, horizontal-overflow assertion                                  | tablet stacking; localized table scroll where required                          | PASS   |
| 390×844  | all five views, overflow; three visual baselines; dark/compact preference pass | two-column view selector, single-column operational content, touch-safe actions | PASS   |
| 360×800  | all five views, horizontal-overflow assertion                                  | narrow mobile with the same semantic sequence and no clipped document           | PASS   |

The test asserts `documentElement.scrollWidth - clientWidth <= 1` after every
view switch at each bounded viewport. It does not hide dense data by forcing
the entire document wider; canonical table regions own their localized scroll.

## Semantic order by view

- **Control tower:** title/context → priority signal → KPI cluster → resource
  sufficiency/decision horizon → exception queue.
- **Process workspace:** object → current/owner/next → milestone movement →
  portfolio Kanban → activity trace.
- **Load & route:** vehicle/resource → capacity numbers → allocation manifest →
  ordered current/next/future stops.
- **Receiving:** arrival warning → lifecycle → quantity reconciliation →
  decision evidence/reason/action.
- **Entity 360:** identity/relationship owner → health and signals → current
  work → activity → contextual decision.

## Theme and preference resilience

The same route is tested with persisted:

```json
{
  "appearance": "dark",
  "contrast": "more",
  "density": "compact",
  "motion": "reduced"
}
```

Provider attributes and every view's overflow are asserted at 1440×900 and
390×844. The dark screenshot was visually inspected for hierarchy, border
clarity, warning treatment, text contrast, and focus/action readability.

## Manual rendered review

**OBSERVED:** the in-app Chromium browser was used to inspect all five desktop
views, the receiving decision content below the initial fold, the Entity 360
decision drawer, and the dark Control Tower. Playwright-produced 390×844 images
for Control Tower, Load & Route, and Receiving were separately opened at
original resolution. No clipped controls, accidental two-dimensional document
scroll, duplicate mobile system, or hidden next action was observed.

## Boundaries

- **UNVERIFIED:** landscape phones, viewport widths below 360px, browser zoom,
  localized copy expansion, real production data volume, and non-Chromium
  layout engines.
- **INFERRED:** the semantic stacking guidance is reusable by Farm, but each
  product route must repeat responsive QA with its actual columns, copy, and
  permissions.
