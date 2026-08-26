# Apply ten4seven UI to an existing web application

The safe migration is constrained and reversible. Do not rewrite a page because the request says “apply ten4seven UI”.

## Step 1 — Inspect

Record the framework, routing, existing component system, global CSS, theme provider, font strategy, icon strategy, business logic, forms, data tables, overlays, navigation, API calls, state, validation, permissions, and test entry points.

## Step 2 — Classify

Map the current screen to one recipe in `packages/ai/catalog/recipes.json`: dashboard, entity-list, detail, form, master-detail, approval queue, settings, report, commerce, content, auth, or marketing. List the canonical ten4seven components that cover the current surfaces.

## Step 3 — Preserve

Create a migration ledger before changing UI:

| Existing behavior                          | Owner             | Must remain unchanged |
| ------------------------------------------ | ----------------- | --------------------- |
| API calls and data transforms              | feature code      | yes                   |
| state, validation, form schema, cart state | feature code      | yes                   |
| routing and permissions                    | app shell / route | yes                   |
| events and side effects                    | feature code      | yes                   |
| visual markup and styling                  | migration scope   | replace incrementally |

## Step 4 — Introduce foundation

Install/configure the packages through the consumer's package manager. Add `Ten4SevenProvider`, token CSS, the selected typography preset, and the local semantic icon boundary. Confirm the app still loads before replacing components.

## Step 5 — Replace the shell

Replace app shell, navigation, page framing, and responsive container behavior first. Keep route boundaries and data providers in place.

## Step 6 — Replace canonical components

Replace buttons, fields, cards, tables, dialogs, badges, and status elements with catalogued components. Prefer composition over local duplicates. Use a recipe-contract component only when the system has an approved implementation or when you explicitly create system work outside the feature migration.

## Step 7 — Remove redundant styling

Only after the replacement is rendered and interacted with should redundant CSS be removed. Preserve domain-specific layout classes; remove duplicated color, radius, shadow, height, weight, and typography declarations that tokens now own.

## Step 8 — Responsive QA

Check the first viewport at desktop and mobile sizes, horizontal overflow, wrapping, dense data, touch targets, sticky regions, and focus order.

## Step 9 — Interaction QA

Exercise the primary route, filters, forms, table actions, overlays, keyboard Escape/Tab behavior, validation, and loading/empty/error states. Confirm business behavior with the migration ledger.

## Step 10 — Visual QA

Compare hierarchy, typography, spacing, color, density, radii, icon meaning, and dark mode against the chosen ten4seven profile. Record intentional deviations and remaining risks.
