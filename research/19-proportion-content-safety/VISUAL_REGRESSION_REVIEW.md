# Visual regression review

Status: **PASS — final no-update review completed 2026-09-05**

The six new Component Lab stress captures cover Card/control families at 1440,
390 and 360 px. The narrow capture uses dark + dense + custom exact radius 24.
Only the floating QA launcher is hidden in isolated component captures, so it
does not obscure the component under inspection. Full-route tests do not hide
that launcher.

Initial capture review rejected the Input text/leading-icon collision. The
source correction uses the existing reference-space token and adds an
assertion for actual inset versus the icon edge. The corrected card and control
captures were then reviewed at 1440, 390, and 360 px; no title/action collision,
edge loss, or control-family overflow remained. The mobile wrapping visible in
the 390/360 captures is intentional reflow within the owned surface.

Existing baselines were compared against the canonical size, table inset,
Badge/label-slot and catalog changes. Intentional changes received
actual/expected/diff inspection and the final ordinary rerun; no snapshot-update
flag was used for the final gate.

## Final confirmation

The full serial Chromium suite passed **190/190** with one worker and no
snapshot update. It covered the six new content-stress captures, all affected
system/reference/public visual routes, responsive states through 360 px,
dark/high-contrast/compact/reduced-motion preferences, accessibility smoke,
and the KPI/sparkline and operational-expression regressions.
