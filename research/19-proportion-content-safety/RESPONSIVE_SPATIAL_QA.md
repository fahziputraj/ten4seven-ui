# Responsive spatial QA

The new route audit visits all eleven canonical routes at 1440×900,
1186×698, 840×900, 390×844 and 360×800. It checks a live main landmark,
document horizontal overflow and left/right h1 gutter. The complete existing
suite adds its broader interaction and screenshot coverage; this narrow
audit alone is not a claim that every route's entire content was stress-tested.

Routes: Theme Studio, Component Lab, Components, Tokens, Icons, Blocks,
Recipes, Operations Tracker, Publishing Store, Public Showcase and
Operational Patterns. Product references remain clean; the new stress fixture
is only `/component-lab?stress=content`.

Representative stress combinations:

| Recipe / mode    | Density / shape       | Viewport |
| ---------------- | --------------------- | -------- |
| Enterprise light | regular / soft        | 1440×900 |
| Product light    | compact / sharp       | 1186×698 |
| Editorial light  | comfortable / rounded | 840×900  |
| Commerce light   | regular / rounded     | 390×844  |
| Enterprise dark  | compact / sharp       | 360×800  |
| Product dark     | dense / exact 24      | 390×844  |
| Editorial dark   | comfortable / soft    | 1440×900 |
| Commerce dark    | regular / rounded     | 1186×698 |

Controls recompose into a single column at narrow width; tables explicitly
switch to full-value stacked records with reachable actions. Shape/density
preferences do not become a second mobile component system.

Exact results and visual review are consolidated in the final gate.
