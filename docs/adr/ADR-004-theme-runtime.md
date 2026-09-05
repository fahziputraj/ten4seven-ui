# ADR-004 Theme runtime architecture

## Context

The target consumer API is a provider with appearance, palette, independent primary/accent color sources, canvas, chart colorway, radius, density, and typography configuration. Appearance must support light, dark, and system; custom axes must propagate across the proof components.

## Options

1. Build-time theme classes only.
2. Context state plus inline component styles.
3. Context state that writes root data attributes and CSS variables.

## Decision

`Ten4SevenProvider` owns a typed `ThemeConfig`, resolves system appearance, and applies `data-*` attributes plus semantic CSS variables to a root element. Components stay unaware of the selected preset.

## Why

It satisfies the consumer contract and makes the Gate B proof observable: palette, primary/accent color sources, canvas, chart colorway, radius, density, typography, and appearance all change together.

## Tradeoffs

Theme changes cause a short global style recalculation. System appearance is
temporarily `light` on the server and first client render, then resolves in an
effect; this keeps the App Router boundary hydration-safe while allowing the
browser preference to take effect immediately after hydration.

## Consequences

The playground can change all axes from controls. Custom palettes can be added through a typed override layer without new component CSS.
