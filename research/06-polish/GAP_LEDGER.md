# System coherence gap ledger

Date: 2026-08-27

## Closed in this gate

- Theme state was route-local and did not survive refresh.
- Palette range was too narrow for meaningful system stress.
- Interactive selection, elevation, motion, layering, and scrim roles were incomplete.
- Select depended on browser-native visual treatment despite being a canonical control.
- Popup families did not share one explicit motion/elevation grammar.
- Publishing cart feedback was count-only and lacked quantity, removal, subtotal, and responsive surface behavior.
- Visual regression and cross-route stress coverage were missing.

## Deferred intentionally

- Packaging and release hardening remain paused until this gate is accepted.
- TimeInput remains a semantic wrapper over the native time control. A custom time popup is not justified by a verified product mismatch.
- Cart remains a recipe composition, not a new canonical component, until reuse in another domain proves a stable contract.
- Automated axe checks supplement but do not replace manual screen-reader and platform high-contrast testing.

## Design-system gap events

No donor lookup was required for this gate. All changes normalized existing ten4seven contracts and recipes.
