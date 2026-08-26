---
name: ten4seven-ui
description: Apply ten4seven UI to a new or existing React web application through recipes, canonical components, semantic icons, and provider themes while preserving business logic.
---

# ten4seven UI workflow

1. Inspect the project and detect framework, routes, existing ten4seven configuration, component system, tokens, icons, and business logic.
2. Identify the screen archetype and retrieve the closest recipe from `packages/ai/catalog/recipes.json`.
3. Retrieve only the required entries from `packages/ai/catalog/components.json` and `packages/ai/catalog/icons.json`.
4. Preserve API calls, state, validation, routing, permissions, form schemas, and events.
5. Configure `Ten4SevenProvider` and semantic theme/typography roles.
6. Implement through canonical ten4seven components and semantic `T7Icon` names.
7. Use local CSS only for composition, layout, or a documented domain exception.
8. Validate static gates, accessibility, responsive behavior, the primary interaction, and browser console health.

## Retrieval commands

```bash
pnpm t7ui info
pnpm t7ui find "inventory list"
pnpm t7ui show DataTable
```

For an existing web application, follow `docs/ai/APPLY_TO_EXISTING_WEB.md`. For greenfield work, follow `docs/ai/NEW_PROJECT.md`.

## Non-negotiable rule

**Theme first, component second, local override last.** Do not recreate a catalogued primitive or research donor source during a feature task.
