# System quality baseline

Status: **PASS — bounded local closure, refreshed 2026-09-05**

Scope: the shared Ten4Seven package, its system/reference surfaces, the packed
Next.js consumer proof, and the DWO quality matrix. This is not a Farm product,
registry release, deployment, or license change.

## Source baseline

- Branch: `codex/t7ui-next-001-next-app-router-compat`.
- Source parent: `7e6f33b`.
- Canonical stack: typed contracts → token resolver/static recipe CSS →
  provider/scopes → canonical components → packed public artifact.
- Compatibility target proven locally: Node `24.19.0`, pnpm `11.22.0`, Next
  `16.3.4`, React/React DOM `19.2.8`, TypeScript `5.9.3`.

## Runtime baseline

| Gate                 | Observed result                                                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| full serial Chromium | `190/190` passed in 8.8 minutes with one worker                                                                                     |
| semantic contrast    | 184 recipe/mode pairs at WCAG AA; lowest measured result 4.80:1                                                                     |
| package proof        | 13 root exports, bundled tokens/icons/motion, self-contained styles                                                                 |
| adoption proof       | 2 static consumers plus 4/4 browser scenarios                                                                                       |
| packed Next proof    | strict TypeScript, production build, 3/3 Playwright/axe scenarios                                                                   |
| visual baseline      | `55/55` reviewed system/reference/public cases; `20/20` operational/public expression cases                                         |
| handoff path proof   | opaque state surfaces plus centered 1 px connector verified at desktop and 390 px                                                   |
| surface colorway     | five chart-linked solid fills on Card, MetricCard, Surface, and KPI with white foreground                                           |
| milestone states     | selected state uses a chart-linked solid surface with white content; unselected hover returns to raised neutral with an 18% keyline |
| light canvas         | balanced default is white; all opaque structural shell backgrounds retain equal RGB channels                                        |

The Vite production build retains a non-failing large-chunk advisory. The
locally bundled Solar catalog is intentionally large; this closure does not
assert a future Farm route-performance budget.

## Decision boundary

**PASS** applies to the tested design-system source and local artifacts.
PT AAPM/Farm adoption remains **CONDITIONAL** until the owner records whether
PT AAPM is an authorized licensee under the private/`UNLICENSED` package terms.
That is an adoption authorization question, not a runtime compatibility defect.

See [FINAL_SYSTEM_QUALITY_GATE.md](FINAL_SYSTEM_QUALITY_GATE.md) for the final
matrix and [NEXTJS_APP_ROUTER_COMPATIBILITY.md](../../docs/integration/NEXTJS_APP_ROUTER_COMPATIBILITY.md)
for the consumer handoff.
