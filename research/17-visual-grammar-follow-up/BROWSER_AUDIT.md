# Browser Audit — Final Visual Grammar Follow-up

## Scope

This is a rendered-browser audit of the five affected routes after the final
bounded calibration pass. It records real local navigation, computed layout
checks, console evidence, and the visual decisions made from the screenshots.
It does not authorize a commit, push, deployment, or publication.

The local server was served from:

```text
http://127.0.0.1:4173
```

The in-app Browser was used for the visual review. Screenshots were captured
and inspected inline before the controlled Playwright baselines were refreshed.
The repository keeps the Playwright screenshots as the durable visual
artifacts; ad-hoc browser screenshots are not added to the source tree.

## Route identity and runtime evidence

All five canonical URLs were opened directly. The default consumer routes were
opened without `?mode=qa`; Theme Studio and Component Lab intentionally retain
their internal harness affordance because they are system surfaces.

| Route                 | Document title                      | Nonblank | Overflow | Error/warn logs | QA harness by default |
| --------------------- | ----------------------------------- | -------: | -------: | --------------- | --------------------: |
| `/theme-studio`       | `ten4seven UI — Theme Studio`       |      yes |        0 | `[]`            |                   yes |
| `/component-lab`      | `ten4seven UI — Component Lab`      |      yes |        0 | `[]`            |                   yes |
| `/operations-tracker` | `ten4seven UI — Operations Tracker` |      yes |        0 | `[]`            |                    no |
| `/ebook-store`        | `ten4seven UI — Publishing Store`   |      yes |        0 | `[]`            |                    no |
| `/public-showcase`    | `ten4seven UI — Public Showcase`    |      yes |        0 | `[]`            |                    no |

`Overflow` is the non-negative value of
`document.documentElement.scrollWidth - innerWidth`. A value of `0` was
observed on every route in each current-turn viewport pass.

## Viewport matrix

The browser review covered the required desktop, compact, and mobile widths.
The CSS sizes below are the sizes reported inside the browser, not the host
window's physical pixel dimensions.

| CSS viewport | Routes          | Result                                                                                                                                                                   |
| ------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `1440 × 900` | all five routes | Every route was nonblank, had overflow `0`, and emitted no error/warn logs. Desktop shells, bounded content, and default QA boundaries held.                             |
| `1187 × 800` | all five routes | Compact desktop controls remained bounded; the Theme Studio preview stayed safe at its sticky breakpoint; no route-level clipping was observed.                          |
| `391 × 844`  | all five routes | Every route was nonblank, had overflow `0`, and emitted no error/warn logs. Form, filters, category navigation, workflow content, and the public hero remained readable. |
| `360 × 800`  | all five routes | Every route was nonblank, had overflow `0`, and emitted no error/warn logs. The narrow layouts retained touch-safe controls and intentional stacking.                    |

## Surface findings

### Theme Studio

- The first read is now authored language: four compact recipe options expose
  an intent line (`Quiet operational surfaces`, `Balanced application rhythm`,
  `Reading-led hierarchy`, and `Discovery and buying clarity`).
- The selected recipe combines a four-pixel authored edge, a restrained
  surface difference, typographic emphasis, and a check indicator. Selection is
  not conveyed by color alone.
- `Custom` remains a subordinate expert path below the curated options.
- Advanced Theme Authoring is open on first render so the Shape authoring
  surface is present in the browser accessibility tree. The tree exposes
  `Shape`, `Sharp`, `Soft`, `Rounded`, `Base radius`, the derived geometry
  preview, and `Reset recipe shape`; developer-delivery details remain a
  secondary disclosure.
- The Shape controls reuse the named `radiusProfiles`: selecting a preset clears
  an exact override, the Base radius slider accepts and clamps `0–24 px`, and
  the derived control/panel/card/shell hierarchy updates with the provider.
- The live preview reads as a compact product surface with actions, status,
  form, chart, and table content. Token metadata is closed under the native
  `Semantic diagnostics` disclosure and is absent from the primary action and
  field rows.
- Light mode was explicitly selected and checked; the preview resolved to a
  white background with readable muted text and no overflow.

### Component Lab

- The first proof keeps the canonical `FormSection` anatomy without an outer
  form card. Labels, controls, a realistic Notes textarea, and both range
  controls are visible in the first desktop view.
- At mobile width, controls stack without horizontal overflow. The planning
  range opens the canonical date popover with month, weekday, grid, and range
  semantics rather than a parallel calendar surface.

### Operations Tracker

- The five milestones remain one connected process:
  `Capture → Triage → Next action → Execution → Follow-up`.
- The rings use a local three-pixel stroke and quieter future-state contrast;
  the selected node also receives primary foreground emphasis and the detail
  panel remains the single active explanation surface.
- The internal `Illustrative fixture flow` label was replaced with the neutral
  `5-stage workflow` label. The default route contains no Reference QA trigger.
- On narrow mobile, the tracker becomes a vertical sequence with a continuous
  connector and a readable selected detail card; overflow remains `0`.

### Ebook Store

- Desktop category discovery remains in the left rail and mobile discovery
  remains in the filter drawer. The detached route-header category CTA is
  absent.
- Cover-led cards, search/sort/grid controls, result count, and rail rhythm
  remain editorial and commerce-specific rather than being normalized to the
  Operations surface.

### Public Showcase

- The hero remains a neutral tonal surface with a slim primary edge, inset
  product preview, strong display typography, and primary reserved for the
  action. No gradient, glow, oversized rounded green canvas, or giant shadow
  was introduced.
- The four-tile mark, asymmetric edge, inset frame, and section rhythm provide
  recognizable Ten4Seven signatures when the selected recipe is blue/indigo,
  editorial, or commerce rather than emerald.
- Consumer copy no longer exposes `Local reference fixture` or
  `Illustrative local coverage trend chart`; the chart keeps a truthful
  coverage label without debug framing.

## Interaction evidence

- Theme Studio: selecting `Enterprise` changed provider metadata to
  `data-t7-theme="enterprise"` and `data-t7-expression="operational"`; the
  selected option exposed its check indicator and the live preview updated.
- Theme Studio: opening `Semantic diagnostics` revealed four metadata values;
  it was closed on initial render.
- Theme Studio: the direct Shape flow `Editorial → Soft → Base radius 14 px →
End (24 px clamp) → dark/light → Reset recipe shape` preserved the recipe and
  runtime density, produced the expected geometry values, kept light/dark radius
  variables equal, and returned to Editorial's authored `sharp` profile.
- Component Lab: `Select dates` opened the bounded date-range popover and
  retained keyboard/semantic behavior.
- Operations Tracker: selecting `Execution` changed `aria-current` and
  replaced the milestone detail region; the default selection remained
  `Triage` on a fresh route.
- Public Showcase: the public route rendered from direct navigation and the
  existing Theme Studio-to-Public Showcase recipe path continued to resolve
  distinct provider metadata and computed composition output.

## Limits

This is a Chromium in-app-browser and Playwright review. It does not claim
independent Firefox/WebKit pixel parity, production network data, or deployment
state. The local server remains intentionally running for follow-up inspection.
