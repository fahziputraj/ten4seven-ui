# `@ten4seven/native`

This package is the bounded Q07 native-mobile adapter proof for Ten4Seven. It
does not contain a React Native or Expo renderer. Instead, it resolves the
existing Ten4Seven theme, brand, density, typography, radius, motion, and icon
semantics into renderer-neutral descriptors that a future native consumer can
map to platform controls.

The boundary is deliberate:

- `@ten4seven/contracts` owns shared semantic vocabulary, state meanings,
  accessibility requirements, and token references.
- `@ten4seven/tokens` owns the existing resolved theme values. This adapter
  does not copy a palette, spacing scale, radius scale, or motion runtime.
- A future Expo or React Native app owns navigation, safe areas, gestures,
  authentication, permissions, API data, persistence, offline queues, sync,
  conflict policy, and business calculations.
- The adapter has no DOM, CSS, React DOM, SVG, or native framework dependency.

The executable proof includes `resolveNativeTheme`, semantic icon resolution,
action/input/card/feedback descriptors, and a Farm daily-operation composition
with local sync vocabulary. The Farm composition is a presentation fixture: it
does not submit data, calculate business values, or implement a sync engine.

Run the bounded checks with:

```text
pnpm --filter @ten4seven/native typecheck
pnpm test:native-mobile
```

The repository has no Expo/RN consumer or device/emulator harness, so Q07 does
not claim native launch, screenshot, or assistive-technology runtime evidence.
