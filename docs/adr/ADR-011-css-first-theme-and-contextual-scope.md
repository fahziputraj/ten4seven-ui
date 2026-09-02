# ADR-011 CSS-first theme delivery and contextual scopes

## Context

React provider calculation is ergonomic for applications, but it should not be
the only way a page obtains a visual theme. Products also need a safe way to
create an inverse hero, footer, or bounded promotional region without teaching
every descendant component a special color mode.

## Options

1. Require all theming to flow through React context at the application root.
2. Use free-form page classes and component-local color overrides.
3. Generate static CSS selectors for curated recipes and modes, while keeping
   the provider as an orchestrator and offering a semantic `ThemeScope`.

## Decision

Use option 3. The distributable package exports `theme.css`, `themes.css`,
`components.css`, and an all-in-one `styles.css`. Generated recipe selectors
respond to `data-t7-theme`, `data-t7-mode`, `data-t7-density`,
`data-t7-contrast`, and `data-t7-motion-preference`.

Static recipe mode selectors are generated only for resolved `light` and
`dark` values. `system` is a provider/runtime preference, not a static CSS
selector value; a CSS-first consumer needs an application or media-query
adapter to write the resolved mode.

`ThemeScope` re-resolves the same semantic token contract for a bounded
subtree. Its initial tone vocabulary is intentionally limited to `default` and
`inverse`; an optional recipe or typed override is scoped and never mutates the
surrounding provider.

For a default-toned scope, explicit scoped runtime preferences take precedence
for appearance and density; otherwise an explicit scoped recipe or
`ThemeConfig` supplies those values, and a scope without either inherits the
immediate parent. `tone="inverse"` deliberately flips the immediate parent’s
resolved appearance as a contextual treatment.

## Why

Static attributes make the visual contract visible outside React and support
predictable CSS-first delivery. A semantic scope preserves components' shared
focus, field, overlay, and text roles instead of spreading inverse-mode logic
through the library.

## Tradeoffs

CSS-first delivery covers curated recipes, not arbitrary advanced
`ThemeConfig` objects. A scope has to be purposeful and bounded; nested,
responsive, and accessibility behavior need browser proof rather than a
source-only assumption.

## Consequences

New CSS-first consumers should use the `data-t7-*` attributes. Legacy provider
attributes remain available for compatibility. New inverse sections use
`ThemeScope`, not manually selected foreground/background colors. Packaging
and browser tests must verify static selectors, scoped semantics, and both
resolved modes.
