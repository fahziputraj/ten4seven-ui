# AI design guidance

Ten4Seven is designed so an agent can choose a coherent interface without
copying donor code or improvising a parallel component system. The system
contract is more important than visual imitation.

## Retrieval order

1. Read `generated/agent-index.json`.
2. Read the compact projection for the selected recipe or component.
3. For a v2 theme decision, read `generated/theme-recipes.json`.
4. For a standards-compatible token export, read `generated/tokens.dtcg.json`.
   Treat it as an interoperability artifact; the typed runtime source remains
   authoritative for rendered behavior. Its root action aliases are the
   baseline emerald set; for a selected recipe, read
   `theme.recipes.<recipe>.semantic.color.action`.
5. Use `pnpm t7ui recipe inspect entity-list` and
   `pnpm t7ui compose entity-list` for the migrated entity-list recipe.
6. Only when the compact contract does not answer the question, search the
   full `packages/ai/catalog/recipes.json`, `components.json`, `blocks.json`,
   or `icons.json`.

The canonical typed sources remain `packages/contracts/src`. Generated files
are reproducible retrieval surfaces, not a second manual source of truth.

## Make design decisions in this order

```text
page archetype
  -> shell grammar
  -> theme recipe
  -> composition and expression
  -> implemented canonical component
  -> exceptional local layout rule
```

Choose a `ThemeRecipe` for the product context. Keep user accessibility and
comfort choices in `RuntimePreferences`. Use `ThemeScope` only for an
intentional bounded context. A typed `ThemeOverrides` object is a narrow,
product-root escape hatch, not a reason to assemble a new visual language in
feature code. Do not combine unrelated palette, radius, typography, and motion
controls unless the task is explicitly a brand-editor capability.

## Component rules

- Use only catalogued components with status `implemented` as a feature API.
- Do not recreate Button, Input, Card, Dialog/Modal, Drawer, Table, Badge, or
  navigation primitives locally.
- Use `T7Icon` semantic names; do not place raw icon-provider identifiers in
  feature code.
- Use `t7Motion` and the global motion roles for custom system surfaces. Do
  not add local keyframes, durations, or a second motion runtime.
- Preserve business logic, data fetching, validation, routing, permissions,
  and events while migrating a surface.

## Expression without drift

The recipe expression is a guardrail, not a component variant factory:

- `operational`: prioritize scanning, table hierarchy, and restrained chrome.
- `product`: balance whitespace with direct action hierarchy.
- `editorial`: prioritize readable measure and low chrome.
- `commerce`: prioritize product comparison, purchase confidence, and clear
  buying actions.

All expressions retain the same semantic focus, form, overlay, navigation,
and accessibility behavior. A task that needs a visual flourish should first
look for a catalogued block such as `Hero`, `FeatureShowcase`,
`ContentShowcase`, or `ProductShowcase`.

## Escalate a real system gap

When a generic capability is missing:

1. Search canonical Ten4Seven components and contracts.
2. Search the AAPM extraction for a generic, reusable precedent.
3. Consult at most one donor only if the gap remains.
4. Normalize the result into `@ten4seven/ui` with semantic tokens,
   accessibility behavior, tests, catalog/contract updates, and provenance.
5. Only then use it in a consumer feature.

A consumer feature does not gain permission to import a donor library or
create a parallel primitive family because a catalog search was inconvenient.

## Verify the actual surface

After implementation, run the repository's required checks and inspect the
affected deterministic route in a browser. Test meaningful content, loading,
empty/error, keyboard/focus, selected or detail states, narrow layout, and
the primary action. A passing compile, screenshot, or success toast alone is
not evidence that the resulting experience is correct.

For a short operational checklist, start with
[`docs/ai/AI_QUICKSTART.md`](ai/AI_QUICKSTART.md).
