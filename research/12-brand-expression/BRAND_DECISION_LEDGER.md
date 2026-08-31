# Brand Expression Decision Ledger

This ledger is intentionally small and deterministic. It records only the
declared BrandProfile expression fields used by the bounded Authentication
proof. It is not an agent-owned art-direction ledger.

| Decision              | `neutral-product` | `aapm-academy` | Source        | Agent-owned |
| --------------------- | ----------------- | -------------- | ------------- | ----------: |
| media prominence      | low               | high           | brand-profile |           0 |
| media treatment       | product           | documentary    | brand-profile |           0 |
| media overlay         | none              | dramatic       | brand-profile |           0 |
| page composition      | centered          | split          | brand-profile |           0 |
| whitespace intensity  | balanced          | generous       | brand-profile |           0 |
| brand mark prominence | medium            | high           | brand-profile |           0 |
| display character     | neutral           | editorial      | brand-profile |           0 |
| surface mood          | neutral           | institutional  | brand-profile |           0 |
| CTA emphasis          | balanced          | strong         | brand-profile |           0 |

Machine-readable assertions:

```text
profile count = 2
decision count per resolution = 9
agent-owned brand decisions per resolution = 0
canonical Authentication components =
  Surface, Input, PasswordInput, ActionFooter
```

The profile resolver does not decide media URLs, copy, legal content,
authentication behavior, route ownership, or consumer data shape. Those remain
outside the agent decision ledger.
