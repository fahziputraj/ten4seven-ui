# Typography proportion audit

SOURCE: semantic role definitions in `packages/tokens/src/theme.ts` remain
authoritative. No font replacement, new weight system, or global type-scale
redesign was performed. Density does not reduce the body typography role.

| Role                      | Existing relationship retained                                                                                                                                  |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Display/page title        | Fluid display size, display family and tight tracking; page heading remains above section/card roles.                                                           |
| Section/card/object title | Distinct heading/card-title roles; title can wrap instead of stealing action space.                                                                             |
| Body/supporting/metadata  | Body, body-sm and caption line heights remain readable; long identifiers can break where their family allows it.                                                |
| Field label/value/error   | Label and input optical roles remain distinct; helper/error text wraps fully. Error color now uses the accessible semantic danger-text role.                    |
| Table header/cell         | Small uppercase header and established cell typography retained; block padding permits multi-line rows to grow safely.                                          |
| Metric/badge              | Metric emphasis remains larger than supporting text; badges retain secondary caption-level weight. Formatting very large KPI values remains a consumer concern. |
| Button SM/MD/LG           | 12/14/16 px labels with caption/button/body-lg line-height roles, coordinated 14/16/18 px icons.                                                                |

RUNTIME evidence: light/dark long-content stress, family geometry assertions,
axe and manually reviewed new images. Desktop CSS render-zoom 125/150% adds
reflow stress; it is not a claim of complete native-browser zoom or screen
reader coverage. No fixed height was imposed on wrapping labels or CTA text.

See the final gate for exact rerun results.
