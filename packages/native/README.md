# `@ten4seven/native`

This package is the bounded native renderer boundary for Ten4Seven. Its
contract adapter (`src/index.ts`) resolves the existing Ten4Seven theme,
brand, density, typography, radius, motion, chart, elevation, and icon
semantics into renderer-neutral values and descriptors. The separate
`@ten4seven/native/renderer` entry point maps those values to React Native
primitives. It is a partial renderer foundation, not a complete mobile product
application.

The boundary is deliberate:

- `@ten4seven/contracts` owns shared semantic vocabulary, state meanings,
  accessibility requirements, and token references.
- `@ten4seven/tokens` owns the existing resolved theme values. This adapter
  does not copy a palette, spacing scale, radius scale, or motion runtime.
- The renderer owns presentation, interaction grammar, safe-area composition,
  native accessibility props, adaptive layout, and bounded device-capability
  state presentation.
- An Expo or React Native application owns navigation truth, gestures,
  authentication, permissions, API data, persistence, offline queues, sync,
  conflict policy, secure storage, push/deep-link routing, and business
  calculations.
- The contract adapter remains free of DOM, CSS, React DOM, SVG, and native
  framework imports. The renderer is the only native-framework entry point.

The executable/source proof includes `resolveNativeTheme`, semantic icon
resolution, action/input/card/feedback descriptors, and a Farm daily-operation
composition with local sync vocabulary. The renderer foundation includes
theme/provider, safe-area screen, semantic text and icon, surfaces, actions,
native fields and selection sheet, navigation tabs, list/detail, feedback,
AI/power presentation, and capability-state primitives. The companion
`apps/native-lab` is a deterministic Expo harness with synthetic fixtures; it
does not submit data, calculate business values, or implement a sync engine.

Run the bounded checks with:

```text
pnpm --filter @ten4seven/native typecheck
pnpm --filter @ten4seven/native-lab typecheck
pnpm --filter @ten4seven/native-lab export:web
pnpm test:native-mobile
pnpm test:native-expo
```

The Expo Lab source and web bundle are verifiable in this checkout. Android
emulator/device and iOS simulator/physical-device evidence remain an explicit
U12 gate boundary when those runtimes are unavailable; a Web export is not
claimed as Android or iOS proof.
