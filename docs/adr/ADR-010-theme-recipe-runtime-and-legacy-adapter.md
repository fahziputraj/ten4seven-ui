# ADR-010 Theme recipes, runtime preferences, and legacy adapter

## Context

The legacy theme configuration places authored product decisions and
per-user/accessibility preferences on one broad object. That allows powerful
customization but makes incoherent combinations too easy and obscures which
choices a user should control.

## Options

1. Keep one unrestricted theme object as the primary consumer API.
2. Remove the object API and require every consumer to use named recipes.
3. Make recipes the normal authored baseline, keep a small runtime-preference
   layer, and adapt the existing object API for compatibility and expert use.

## Decision

Use option 3. `ThemeRecipe` coordinates a `ThemeProfile`, expression, and
composition. `RuntimePreferences` is restricted to appearance, density,
contrast, and motion reduction. `Ten4SevenProvider` accepts either a recipe
name or the established `ThemeConfig` object.

`ThemeOverrides` is the bounded expert seam for a product-root exception:
typed `config` axes and `--t7-*` semantic custom properties apply after a
recipe and before persisted local edits. It is not a feature-level styling
surface.

## Why

Recipes make coherent product choices easy, preferences respect user comfort
and accessibility, and the adapter avoids a destructive migration for current
consumers and Theme Studio workflows.

## Tradeoffs

The provider retains two input paths during the migration. Consumers need to
choose deliberately between a reusable recipe, a custom brand configuration,
and an expert-only bounded override.

## Consequences

New product work should start from a recipe. Existing `ThemeConfig` consumers
remain valid. Runtime settings panels must not routinely expose palette,
typography, elevation, or raw motion controls. See
[`../THEMING.md`](../THEMING.md) and
[`../LEGACY_THEME_MIGRATION.md`](../LEGACY_THEME_MIGRATION.md) for the public
contract.
