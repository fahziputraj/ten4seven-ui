# ten4seven UI agent contract

ten4seven UI is the canonical UI source for this repository.

Before creating UI:

1. Identify the page archetype.
2. Search `packages/ai/catalog/recipes.json` for a recipe.
3. Search `packages/ai/catalog/components.json` for canonical components.
4. Search `packages/ai/catalog/icons.json` for semantic icons.
5. Configure semantic theme tokens before writing local styles.

Hard rules:

- Never recreate `Button`, `Input`, `Card`, `Dialog`/`Modal`, `Drawer`, `Table`, `Badge`, navigation primitives, or another catalogued component locally.
- Do not directly style colors, radius, shadows, control heights, font weights, or typography when ten4seven tokens provide them.
- Use `className` primarily for composition and layout.
- Do not import donor UI libraries into consumer features.
- Do not use raw Iconify provider strings in application feature code; use `T7Icon` semantic names.
- Preserve business logic, data fetching, state, validation, routing, permissions, and events when migrating an existing interface.
- Use a local override only for exceptional layout or domain-specific behavior; follow **theme first, component second, local override last**.

Start with [docs/ai/AI_QUICKSTART.md](docs/ai/AI_QUICKSTART.md). For migrations use [docs/ai/APPLY_TO_EXISTING_WEB.md](docs/ai/APPLY_TO_EXISTING_WEB.md); for greenfield work use [docs/ai/NEW_PROJECT.md](docs/ai/NEW_PROJECT.md).

Before completion run `pnpm format:check`, `pnpm typecheck`, `pnpm test`, `pnpm build`, and rendered browser QA for the affected flow.

Reference routes:

- Theme Studio: `http://localhost:4173/theme-studio`
- Warehouse Inventory: `http://localhost:4173/warehouse-inventory`
- Ebook Store Catalog: `http://localhost:4173/ebook-store`

These URLs are deterministic Vite entry points and must remain refresh-safe. Use them for direct AI-agent and Playwright QA instead of relying on an in-app navigation sequence.
