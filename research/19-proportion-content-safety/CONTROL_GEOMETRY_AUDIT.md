# Control geometry audit

SOURCE: `densityProfiles` still owns control/row/menu heights, field/card/menu
padding and gaps. The patch adds coordinated size roles and bounded safe-area
aliases; it does not replace the density engine.

| Regular-density family | Minimum height | Button label                | Icon  | Behavior                                                       |
| ---------------------- | -------------- | --------------------------- | ----- | -------------------------------------------------------------- |
| SM                     | 36 px          | 12 px / caption line-height | 14 px | Smaller padding and gap; text remains bounded.                 |
| MD                     | 40 px          | 14 px / button line-height  | 16 px | Existing normal action role; fields retain 13 px optical type. |
| LG                     | 48 px          | 16 px / body-lg line-height | 18 px | Larger type, icon, gap and padding, not just height.           |

`data-t7-control-size` coordinates a bounded mixed field/trigger group. Existing
`Button size` remains additive/backward compatible. Icon-only actions retain
their established optical emphasis and accessible name contract.

RUNTIME checks assert exact Input/Select/Button minimum heights at regular
density, monotonic padding/gaps, label/icon sizes, and text inset beyond the
leading input icon. The input-inset assertion was added after visual review
caught an invalid CSS variable reference in the first implementation.

Table row heights remain minimum rhythm, not a fixed clipping box. Cell block
padding can make an action-heavy compact row taller; this is intentional
clearance, not a reason to clip a 32 px control into a 32 px row.

Shape floors retain default/comfortable Card padding and add clearance for
rounded/exact dense contexts. Unit and browser tests cover exact base radius
24 with dense mode; the existing 0–24 normalization contract remains intact.
