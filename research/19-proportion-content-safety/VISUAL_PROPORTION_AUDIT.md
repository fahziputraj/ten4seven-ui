# Visual proportion audit

SOURCE: the system already had a semantic typography hierarchy, four authored
recipes, independent runtime preferences, density geometry, reading measure,
composition gap and bounded overlay widths. These remain the authority.

NORMALIZED: the new roles expose those relationships in one documented
vocabulary: shell gutter → rail → section/cluster rhythm → shape-safe inset →
content/action slots. `layoutGeometry` and `iconGeometry` are exported from
the existing token package; generated DTCG artifacts mirror the dimension
roles without replacing the HSL/CSS-variable runtime.

| Relationship                   | Decision                                                                                                       |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Page breathing room            | Keep recipe clamps and workbench max width; use the existing 16 px mobile gutter consistently.                 |
| Reading versus data            | Reading follows authored ch measure; forms max 640 px; data max 1480 px; full width is explicit.               |
| Section versus cluster         | Authored recipe section gap remains distinct from density-aware control/content gaps.                          |
| Radius versus inset            | A small number of validated clearance tiers protect rounded/exact corners, especially dense mode.              |
| Button size versus visual mass | SM/MD/LG coordinate height, label, line-height, icon, padding and gap; no height-only large CTA.               |
| Status versus action           | Keep 24 px minimum badges, 13 px status icon and caption type; long explanation belongs in copy/detail.        |
| Selected/focus versus layout   | Preserve layout border thickness; draw an internal outline at clipping-prone navigation/menu/table boundaries. |
| Mobile versus desktop          | Recompose control rows and stacked records; preserve typography and meaningful insets.                         |

RUNTIME: initial new captures were reviewed, and the field-icon padding
regression was rejected. The final visual review, not those rejected captures,
determines freeze readiness. See [VISUAL_REGRESSION_REVIEW.md](VISUAL_REGRESSION_REVIEW.md).
