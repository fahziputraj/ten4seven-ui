# Global consistency audit

Date: 2026-08-27

## Scope

The audit covers Theme Studio, Components, Tokens, Icons, Recipes, Warehouse Inventory, and Publishing Store. It evaluates the same root theme contract across application recipes rather than treating each route as an isolated demo.

## Findings and resolution

- Theme ownership is global. `Ten4SevenProvider` persists one optional override and exposes a reset; route changes and refreshes retain the resolved profile.
- The palette axis now offers slate, emerald, teal, cyan, blue, indigo, violet, rose, red, orange, and amber. Status colors remain semantic and independent.
- Canonical Select uses the ten4seven popup grammar and keyboard model. NativeSelect remains the explicit browser-native fallback.
- Select, Combobox, MultiSelect, DatePicker, Popover, and Menu share popup elevation, spacing, motion, layering, and reduced-motion behavior.
- Publishing cart uses the same Button, Card, Popover, Drawer, icon, token, and typography contracts as the enterprise recipe. Desktop uses an anchored mini-cart; mobile uses a focus-managed drawer.
- Raw visual values in canonical UI source are guarded by `scripts/verify-ui-consistency.mjs`.

## Stress profiles exercised

1. Light / emerald / soft / default / modern
2. Dark / blue / rounded / compact / modern
3. Light / red / soft / default / modern
4. Dark / orange / rounded / compact / modern
5. Light / slate / sharp / dense / modern

Each profile was exercised on Warehouse Inventory and Publishing Store, including persistence after reload.

## Render evidence

- `tests/visual-regression.spec.ts-snapshots/` contains 1440px, 1280px, 768px, 390px, and 360px baselines for all eight public workbench routes.
- `tests/system-coherence.spec.ts-snapshots/` contains desktop mini-cart and 390x844 mobile drawer baselines.
- Browser QA confirmed no horizontal overflow in the mobile cart, Escape dismissal, focus restoration, and no console errors in the tested interaction loops.

## Conclusion

The routes now read as one system with recipe-level differences. No commerce-specific primitive family was introduced.
