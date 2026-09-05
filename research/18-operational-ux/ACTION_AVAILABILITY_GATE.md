# T7-ACTION-AVAILABILITY-001 — Visible disabled action + reason

Status: **scoped PASS — COMPOSED + PROVEN**
Date: 2026-09-06
Program: Issue #3 — `T7-AAPM-AGENTIC-001`
Executable gate: `T7-ACTION-AVAILABILITY-001`
Stacked base: `f8cbe423ec6b38a5be1ab66a76b77c285e2f2b6f` (`feat/T7-HIERARCHY-001`)

## Discovery and classification

| Requirement                                    | Classification    | Decision                                                                                                                         |
| ---------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Visible action remains available               | **READY**         | Canonical `Button` already owns intent, loading, and native disabled semantics.                                                  |
| Disabled action with an explanation            | **COMPOSE**       | Combine native-disabled `Button`, visible helper text, and a focusable `IconButton` reason trigger inside `Tooltip`.             |
| Available / loading / completed state coverage | **COMPOSE**       | The same Button contract expresses all four AAPM states without hiding the action or inventing a second primitive.               |
| Short explanation overlay                      | **READY**         | `Tooltip` is an implemented supplemental hover/focus surface, not the only control label.                                        |
| Permission, eligibility, and reason meaning    | **PRODUCT OWNED** | The consumer supplies the state and reason; ten4seven never evaluates authorization or business rules.                           |
| Native disabled focus behavior                 | **NATIVE**        | Browser/assistive-technology semantics make a disabled HTML button non-focusable; the explanation needs a separate focus target. |

The generic gap is composition guidance, not a missing primitive. A tooltip
directly around a disabled `Button` is insufficient: `Tooltip` associates its
description with the disabled child, but that child cannot receive keyboard
focus. The reason therefore remains unreachable for keyboard users unless a
separate focusable trigger is present.

## Composition decision

| Candidate                                                               | Result     | Reason                                                                                                                      |
| ----------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| `Tooltip` directly around a disabled `Button`                           | Rejected   | Hover may work, but the native-disabled control cannot receive focus and the explanation is not a reliable keyboard path.   |
| Hide the action and show a status message                               | Rejected   | Removes the user's operating context and contradicts AAPM's visible-unavailable requirement.                                |
| Local disabled-button or permission primitive                           | Rejected   | Duplicates the canonical action API and moves consumer-owned authorization meaning into the design system.                  |
| Disabled `Button` + helper + focusable reason `IconButton` in `Tooltip` | **Chosen** | Preserves native semantics, keeps the reason visible, and gives keyboard/screen-reader users a labelled focus target.       |
| `Popover` or modal explanation                                          | Deferred   | More interaction and focus management than a short, adjacent reason requires; use only when the consumer has a richer task. |

## Proven contract

The Component Lab Button reference at
`/components/button` demonstrates four states:

1. **Available** — a normal canonical `Button` remains actionable.
2. **Disabled + explanation** — a native-disabled `Button` remains visible,
   links to visible helper copy through `aria-describedby`, and sits beside a
   focusable `IconButton` whose accessible label includes the consumer-supplied
   reason. `Tooltip` shows the same short reason on focus and hover.
3. **Loading** — `Button loading` exposes `aria-busy` and prevents duplicate
   activation while keeping the action label visible.
4. **Completed / no longer available** — the completed action remains visible
   and disabled so the operator can understand what happened.

The composition uses only `Button`, `IconButton`, `Tooltip`, and `Typography`
from `@ten4seven/ui`; no new public component, donor UI, runtime dependency,
catalog entry, or generated contract was introduced.

## Ownership boundary

The consumer owns:

- the action label, current status, reason copy, and transition timing;
- permission, eligibility, authorization, and server-side enforcement;
- whether a reason is short enough for a Tooltip or needs a richer Popover,
  drawer, or decision surface;
- mutation, persistence, retry, and completion data.

Ten4Seven owns only the canonical Button/Tooltip/IconButton semantics,
keyboard focus, visible state styling, and responsive geometry. The reason
trigger is an explanation affordance, not a permission evaluator and not a
second action target.

## Verification evidence

| Check                                      | Result                                                                                                                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Targeted Playwright                        | PASS — desktop and mobile states, native disabled action, linked helper, focusable reason trigger, Tooltip content, loading/completed semantics, and axe critical/serious scan |
| Targeted screenshots                       | PASS — `tests/action-availability.spec.ts-snapshots/action-availability-desktop-chromium-win32.png` and mobile counterpart                                                     |
| `pnpm typecheck`                           | PASS                                                                                                                                                                           |
| `pnpm build`                               | PASS (existing chunk-size warning only)                                                                                                                                        |
| `pnpm package:verify`                      | PASS                                                                                                                                                                           |
| Existing contract/catalog/governance suite | PASS — no public catalog or typed contract changed in this composition-only gate                                                                                               |
| Targeted Prettier check                    | PASS for the changed fixture, styles, docs, evidence, and test files                                                                                                           |

Repository-wide `pnpm format:check` remains baseline style debt. The
repository-wide `pnpm test` baseline still stops at `test:slice-a` because the
isolated consumer cannot resolve `@ten4seven/agent`; the scoped composition
and browser checks remain green.

## Completion state

`COMPOSED + PROVEN` for visible disabled action explanations. No avoidable
generic component gap remains for this requirement. Richer explanation
surfaces or product-specific permission workflows remain consumer-owned and
must be evaluated separately.
