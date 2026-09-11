# T7-AAPM-001-Q02B — Studio Hardening Evidence

Status: IMPLEMENTED / EVIDENCE RECORDED  
Mode: BOUNDED-WIDE  
Risk: R2 — shared Design System surface  
Target repository: `fahziputraj/ten4seven-ui`  
Target checkout: `D:\SA\ten4seven-ui`

## 1. Scope and gate context

Q02B hardens only the two named Ten4Seven Design System surfaces:

- Theme Studio;
- Component Lab.

This is an evolutionary route-composition change. It does not implement an
AAPM product profile, Farm UX, a new primitive family, or a new domain
workflow. The Q02 platform-neutral contract plane remains the authority for
generic presentation ownership. The Q02A maturity map remains the authority
for what is a hardening target, a quality reference, or proof-only evidence.

The prerequisite artifacts were present and accepted at their stated gates:

- [Q01 current-target-fit evidence](T7-AAPM-001-Q01-CURRENT-TARGET-FIT.md);
- [Q02 contract-plane evidence](T7-AAPM-001-Q02-CONTRACT-PLANE-EVIDENCE.md);
- [Q02A surface-maturity and quality-bar evidence](T7-AAPM-001-Q02A-SURFACE-MATURITY-QUALITY-BAR.md), ending in `PASS WITH CONSTRAINTS FOR Q02B`.

The design judgment order used for this queue was:

```text
User intent
-> interaction model
-> information architecture
-> route/pattern composition
-> existing canonical component contract
-> semantic tokens
-> responsive and accessibility behavior
```

The changes below are intentionally restrained. Existing cards, forms, charts,
drawers, modals, and proof fixtures were not replaced merely to create a new
visual language.

## 2. Repository coordinates and dirty-state boundary

### Baseline recorded before Q02B mutation

```text
Branch: feat/icons-aapm-iconify-expansion
HEAD:   2bf29ad2e250edc3c70b63a0e34e3f4da3d72e2a
```

The exact `git status --short --untracked-files=all` baseline was:

```text
 M generated/agent-index.json
 M generated/index.json
 M generated/ownership-rules.json
 M packages/agent/generated/agent-index.json
 M packages/agent/generated/index.json
 M packages/agent/generated/ownership-rules.json
 M packages/agent/src/index.ts
 M packages/agent/src/node.d.mts
 M packages/agent/src/node.mjs
 M packages/agent/src/retrieval.d.mts
 M packages/agent/src/retrieval.mjs
 M packages/agent/src/runtime.d.mts
 M packages/agent/src/runtime.mjs
 M packages/contracts/src/canonical.ts
 M packages/contracts/src/index.ts
 M packages/contracts/src/types.ts
 M scripts/generate-contract-projections.mjs
 M scripts/verify-contracts.mjs
?? docs/aapm/T7-AAPM-001-Q02-CONTRACT-PLANE-EVIDENCE.md
?? docs/aapm/T7-AAPM-001-Q02A-SURFACE-MATURITY-QUALITY-BAR.md
?? generated/platform-neutral.json
?? packages/agent/generated/platform-neutral.json
?? packages/contracts/src/platform-neutral.ts
```

That dirty work belongs to the preceding Q02/Q02A contract and evidence
queues. It was not normalized, staged, committed, pushed, regenerated, or
otherwise rewritten by Q02B. The branch and HEAD remained unchanged.

Q02B-owned changes are listed separately in Section 5. Temporary Playwright
captures were removed after visual inspection. The local Vite process remains
available at `http://localhost:4173/` for user inspection; it is not a
repository mutation.

## 3. Design-method decisions

### Theme Studio

Theme Studio is an authoring and inspection workbench. Its core relationship is
control changes -> resolved theme -> live preview. The appropriate composition
is therefore a route-level page header followed by a control/preview workbench,
not a dashboard of unrelated metric cards, a table, or a stepper. Desktop keeps
the existing two-rail relationship; narrow layouts retain the existing single
flow and mobile navigation.

The bounded decision was to use the canonical `PageHeader` for route grammar
and keep the existing theme recipe, runtime-axis, advanced-authoring, and live
preview contracts intact. The prior custom heading was not a broken feature,
but it was a route-specific version of a system-level page contract.

### Component Lab

Component Lab is a long-form state and interaction workbench. It is not a
business process, ordered queue, kanban board, or master-detail resource
browser. Its user problem is fast scanning and direct jumps between specimen
families while preserving the ability to see the demonstrations in one
continuous document.

The selected model is:

- a canonical `PageHeader` for route identity and maturity framing;
- a page-local `SectionNavigation` rail for direct section jumps;
- existing meaningful specimen cards and flat form/chart compositions below it;
- a compact disclosure selector at narrow widths.

The following plausible alternatives were rejected for this route:

| Alternative                                    | Decision                   | Reason                                                                                                                                                                                    |
| ---------------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tabs                                           | Rejected                   | Hides adjacent proof and makes cross-section comparison slower; the lab is a documentation/workbench surface rather than mutually exclusive product views.                                |
| Enterprise sidebar or second navigation system | Rejected                   | The Studio shell already owns primary navigation; a second rail would duplicate hierarchy and consume specimen width.                                                                     |
| Kanban, process UI, or stepper                 | Rejected                   | The specimens are not workflow stages and have no domain ordering or transition authority.                                                                                                |
| Wrap every section in another card             | Rejected                   | Existing cards already communicate meaningful specimen grouping; another outer card would add visual noise and flatten hierarchy.                                                         |
| Floating QA button over narrow content         | Rejected for Studio routes | The rendered baseline showed that a fixed trigger could cover form content near the fixed mobile navigation. QA access now travels with the Studio mobile navigation on these two routes. |

### Interaction-specific preservation

The Component Lab continues to use the interaction model that matches each
demonstration: forms for entry, native/canonical selectors for bounded choice,
file upload/list for file handoff, charts for trend and comparison questions,
overlays for contextual work, and disclosure/navigation primitives for bounded
context. No decorative chart, artificial progress workflow, drag surface, or
business upload contract was invented for this queue. Existing reduced-motion
behavior and state fixtures remain owned by their current canonical contracts.

## 4. Before/after route assessment

The assessment uses qualitative evidence rather than invented numeric maturity
scores.

### Theme Studio

| Quality dimension             | Before                                                                                                        | After / evidence                                                                                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Hierarchy                     | Strong workbench content, but the route heading used a local `studio-intro` grammar.                          | Canonical `PageHeader` now establishes overline, title, description, and preview meta before the existing workbench.                                         |
| Navigation clarity            | Shared Studio shell and breadcrumb were already usable.                                                       | Preserved; route-specific mobile QA is now placed inside the existing mobile navigation rather than competing with content.                                  |
| Spacing and rhythm            | Existing control/preview rhythm was coherent, with local intro spacing.                                       | Shared PageHeader spacing governs the route lead; the workbench composition is unchanged.                                                                    |
| Typography hierarchy          | Existing display title and body copy were readable.                                                           | PageHeader uses the canonical display/body hierarchy and keeps the same product language.                                                                    |
| Semantic color                | Existing recipes, axes, live status, and preview surfaces were token-led.                                     | No color source or theme token changes. Generic tokens remain separate from AAPM brand authority.                                                            |
| Surface/card treatment        | Preview surfaces and control groupings had clear purpose.                                                     | No extra wrapper cards were introduced; the preview and control rails remain the meaningful groups.                                                          |
| Density                       | Desktop split and narrow flow were already viable.                                                            | Page lead is calmer and more consistent without reducing the controls available to authors.                                                                  |
| Interaction affordance        | Recipe selection, runtime preferences, advanced authoring, and preview actions remained intact.               | Preserved; no business logic, resolver, persistence, or theme axes changed.                                                                                  |
| Loading/empty/error treatment | Existing workbench feedback and diagnostics were present.                                                     | No new state contract was needed or invented.                                                                                                                |
| Responsiveness                | Existing mobile shell and bottom navigation were usable, but the fixed QA trigger could compete with content. | 390px and 768px compositions were checked; Studio QA is reachable from the mobile drawer and the floating trigger is hidden only on these two narrow routes. |
| Accessibility                 | Existing controls and settings behavior were covered by the browser suite.                                    | PageHeader is semantic; existing focus, keyboard, modal, reduced-motion, and contrast behavior remains covered.                                              |
| Visual noise and polish       | Good baseline, with route-specific heading treatment.                                                         | Fewer competing heading rules; the route reads as one Design System product surface.                                                                         |

### Component Lab

| Quality dimension             | Before                                                                                                 | After / evidence                                                                                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hierarchy                     | `LibraryIntro` identified the route, but the long workbench had no page-local index.                   | Canonical PageHeader identifies the lab as Studio interaction-contract evidence; section rail makes the long surface scannable.                                                   |
| Navigation clarity            | Primary Studio navigation was clear; intra-page retrieval required scrolling.                          | Six anchors map directly to Forms & feedback, Data & files, Overlays, Surfaces, Charts, and Navigation.                                                                           |
| Spacing and rhythm            | Existing specimen rhythm was generally strong but the route lead was distinct from the Studio grammar. | PageHeader and the section rail create a deliberate lead-in; specimen spacing remains owned by existing compositions.                                                             |
| Typography hierarchy          | Existing section headers and cards were readable.                                                      | Page title, overline, metadata, and specimen headings now have a predictable route hierarchy.                                                                                     |
| Semantic color                | Existing proof surfaces used semantic tokens and bounded emphasis.                                     | No palette or semantic-color source changes.                                                                                                                                      |
| Surface/card treatment        | Meaningful cards grouped state and interaction proof; some long sections were difficult to relocate.   | Cards remain; a flat, bordered page-local rail adds orientation without wrapping the entire lab in a card.                                                                        |
| Density                       | Desktop proof density was acceptable; mobile scanning was scroll-heavy.                                | Desktop uses one compact rail; <=860px uses the canonical disclosure form, preserving specimen width.                                                                             |
| Component consistency         | Lab already used canonical controls and patterns.                                                      | Added only existing `PageHeader` and `SectionNavigation`; no local Button/Input/Card/Table/Modal replacement.                                                                     |
| Interaction affordance        | Individual fixtures had appropriate controls but route-level wayfinding was implicit.                  | Native anchor navigation and mobile disclosure make the route’s structure explicit.                                                                                               |
| Loading/empty/error treatment | Proof fixtures and reference QA state controls were already present.                                   | Preserved; no fixture semantics were promoted into production contracts.                                                                                                          |
| Responsiveness                | Existing grid collapse and mobile shell worked, but fixed QA could overlap content.                    | Verified at 360×800, 390×844, 768×900, 1280×800, and 1440×900; the mobile QA entry point follows the navigation drawer.                                                           |
| Accessibility                 | Existing form, chart, overlay, and navigation tests were available.                                    | Added a route-level keyboard/browser assertion; existing axe and focus suites remain green. Native links and `<details>/<summary>` provide the section-navigation keyboard model. |
| Visual noise and polish       | Long page was visually coherent but lacked a calm retrieval layer.                                     | The rail creates orientation without adding a dashboard, duplicate sidebar, or decorative chrome.                                                                                 |

## 5. Exact Q02B changes

### Route and composition source

| File                                                                                           | Change                                                                                                                                                                                                                                 | Why it is bounded                                                                                                                       |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [`apps/playground/src/App.tsx`](../../apps/playground/src/App.tsx)                             | Composed Theme Studio with `PageHeader`; added a route marker; exposed a Studio-mobile `Open reference QA` action; made `ReferenceHarness` open state controlled by App while preserving optional uncontrolled compatibility.          | Only shared Studio composition and QA plumbing changed; theme state, resolver, navigation destinations, and consumer API remain intact. |
| [`apps/playground/src/library-explorers.tsx`](../../apps/playground/src/library-explorers.tsx) | Replaced Component Lab’s local `LibraryIntro` usage with `PageHeader`; added existing `SectionNavigation` with six anchors.                                                                                                            | Only Component Lab route composition changed; other Library explorers remain untouched.                                                 |
| [`apps/playground/src/component-proofs.tsx`](../../apps/playground/src/component-proofs.tsx)   | Added stable anchor IDs to existing proof groups.                                                                                                                                                                                      | IDs provide retrieval targets only; no fixture behavior or business meaning changed.                                                    |
| [`apps/playground/src/reference-harness.tsx`](../../apps/playground/src/reference-harness.tsx) | Added optional controlled `open`/`onOpenChange` props while retaining standalone behavior.                                                                                                                                             | This is compatibility-preserving QA harness state plumbing, not a generic UI contract or domain state change.                           |
| [`apps/playground/src/app.css`](../../apps/playground/src/app.css)                             | Added route header/overline treatment, mobile QA placement, route-specific narrow trigger suppression, and a compact six-column desktop section rail. All new geometry/color references use existing semantic tokens where applicable. | Local composition is limited to the two Studio surfaces; no package-wide style or token source changed.                                 |

### Tests and visual evidence

| File                                                                                                             | Change                                                                                                        | Why it is bounded                                                                           |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [`tests/workbench-interaction.spec.ts`](../../tests/workbench-interaction.spec.ts)                               | Added one browser test for Component Lab section navigation, horizontal overflow, and mobile QA modal access. | The assertion covers the new route behavior directly; existing test coverage was preserved. |
| `tests/visual-regression.spec.ts-snapshots/component-lab-{desktop,wide,tablet,mobile,narrow}-chromium-win32.png` | Updated five expected images after the intentional Component Lab composition change.                          | Only the affected route snapshots were updated.                                             |
| `tests/visual-regression.spec.ts-snapshots/theme-studio-{desktop,wide,tablet,mobile,narrow}-chromium-win32.png`  | Updated five expected images after the intentional Theme Studio PageHeader change.                            | Only the affected route snapshots were updated.                                             |
| [`docs/aapm/T7-AAPM-001-Q02B-STUDIO-HARDENING-EVIDENCE.md`](T7-AAPM-001-Q02B-STUDIO-HARDENING-EVIDENCE.md)       | This evidence artifact.                                                                                       | Required Q02B output.                                                                       |

No Q02B changes were made to `packages/contracts`, `packages/tokens`,
`packages/ui`, route registries, package metadata, dependencies, generated
contract projections, Farm surfaces, AAPM brand profiles, or the preceding
Q02/Q02A dirty files.

## 6. Issue → change → evidence mapping

| Issue observed                                                                                | Bounded change                                                                                                                                             | Evidence                                                                                                                                               |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Theme Studio had a local route-heading grammar beside the canonical shell.                    | Use `PageHeader` with a Design System overline, description, and preview meta.                                                                             | Typecheck/build pass; all five Theme Studio viewport snapshots pass; focused Theme Settings and universal theme suites pass.                           |
| Component Lab was a long proof document without explicit intra-page retrieval.                | Use existing `SectionNavigation` with stable section IDs.                                                                                                  | New section-navigation browser test passes; all five Component Lab viewport snapshots pass; direct desktop click reaches the Charts group.             |
| A fixed QA trigger could overlap Studio content near the mobile bottom navigation.            | Hide the floating trigger only for Theme Studio/Component Lab at narrow widths and provide the same modal action inside the existing Studio mobile drawer. | New 390×844 browser test opens and closes Reference QA; mobile navigation suite remains green; rendered mobile captures show no trigger over the form. |
| The first section-rail layout was too tall and could sit over chart interaction after scroll. | Use one compact six-column desktop rail and retain the canonical mobile disclosure below 860px.                                                            | Chart interaction test passes after the change; 1186×698 chart test and visual baselines pass without tooltip loss.                                    |
| Route-level polish needed stronger cross-surface consistency without a redesign.              | Reuse existing PageHeader, SectionNavigation, Button, MobileSidebar, Modal, Typography, and T7Icon contracts.                                              | No new generic component or token contract; typecheck, build, interaction, a11y, and visual checks pass.                                               |

## 7. Reusable components, contracts, and ownership

The implementation uses these already implemented Ten4Seven capabilities:

- `PageHeader` for route-level title, description, overline, and metadata;
- `SectionNavigation` for long-surface retrieval, with native anchors and a
  canonical narrow-screen disclosure;
- `MobileSidebar` for existing Studio navigation;
- `Button` and `Modal` for the existing Reference QA interaction;
- existing `Typography`, `T7Icon`, form, file, overlay, chart, and surface
  contracts in the Component Lab.

No generic contract impact was found. The only widened TypeScript interface is
the playground-only `ReferenceHarnessProps`, and its new props are optional;
the previous uncontrolled behavior remains valid for any other consumer. No
business workflow truth, permission decision, tenant entitlement, domain
validation, persistence, accounting state, or Farm operational authority was
moved into Ten4Seven.

No AAPM literals, Farm business labels, or bookstore business components were
introduced. Publishing Store remains a read-only quality reference, not a
template or authority source.

## 8. Responsive and rendered QA evidence

### Actual widths exercised

| Width × height | Method                                                              | Result                                                                                                                                 |
| -------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 360×800        | Existing visual regression route baseline                           | Theme Studio and Component Lab snapshots pass; no overflow assertion failed.                                                           |
| 390×844        | Direct rendered inspection and new browser test                     | PageHeader, form flow, mobile Studio drawer, QA modal, and fixed bottom navigation remain usable.                                      |
| 768×900        | Direct rendered inspection and visual regression                    | Intermediate composition keeps two-column Component Lab form groups and single-flow Theme Studio controls without horizontal clipping. |
| 1186×698       | Existing chart/overlay interaction test                             | Chart, time picker, date range popup, tooltip, and viewport bounds pass.                                                               |
| 1280×800       | Existing visual regression route baseline                           | Wide composition passes.                                                                                                               |
| 1440×900       | Direct rendered inspection, new section test, and visual regression | Theme Studio split workbench and Component Lab six-item section rail pass.                                                             |

The direct rendered inspection was performed with the local Vite process at
`http://127.0.0.1:4173/theme-studio` and
`http://127.0.0.1:4173/component-lab`. Temporary capture files were removed
after inspection; retained visual evidence is represented by the route
snapshots listed above.

Observed composition decisions:

- Theme Studio remains a control-to-preview workbench rather than a card wall;
- Component Lab uses cards only where specimens are meaningfully grouped and
  keeps form/chart content in its natural flat composition;
- the desktop section rail is a compact bordered region with six direct links;
- the narrow section control becomes one disclosure surface instead of a
  horizontal scroller or a second sidebar;
- the fixed bottom navigation remains the existing mobile shell contract;
- no new animation was added, so reduced-motion semantics remain unchanged.

## 9. Keyboard, focus, accessibility, and state evidence

The focused browser command was:

```text
pnpm exec playwright test tests/workbench-interaction.spec.ts tests/canonical-component-a11y-hardening.spec.ts tests/forms-listbox-dismissal.spec.ts tests/final-stabilization.spec.ts tests/public-interactions.spec.ts tests/universal-v2-theme.spec.ts tests/navigation-closure.spec.ts tests/mobile-navigation.spec.ts tests/reference-preview-mode.spec.ts --project=chromium --reporter=line
```

Result: **50 passed**.

This includes:

- keyboard execution and active-descendant behavior for canonical menus and
  tables;
- form listbox dismissal from Escape and outside pointer interaction;
- modal Escape and focus restoration;
- Command Menu focus and restoration;
- representative serious/critical axe checks;
- route and mobile navigation closure;
- reference QA behavior;
- Theme Studio runtime recipes, scopes, focus, and overlay behavior;
- the new Component Lab section navigation and mobile QA path;
- the chart tooltip path after the compact rail was introduced.

The new section navigation relies on semantic links and the existing
`<details>/<summary>` mobile contract, so keyboard behavior is native and does
not require a second focus-management implementation. The QA modal continues
to use the canonical `Modal`; the existing focused modal tests and the new
mobile route test cover Escape close behavior. No local animation, keyframe,
or motion runtime was added.

The semantic contrast command also passed as part of the repository test
sequence:

```text
Semantic contrast gate verified: 284 recipe/mode pairs at WCAG AA 4.5:1; lowest exact-source light standard accent foreground 4.67:1.
```

## 10. Verification results

### Passing checks

```text
pnpm typecheck  PASS
pnpm build      PASS
git diff --check PASS (Git emitted CRLF normalization warnings only; no whitespace error)
```

Targeted visual verification:

```text
pnpm exec playwright test tests/visual-regression.spec.ts --grep "theme-studio|component-lab" --project=chromium --reporter=line
10 passed
```

The ten snapshot updates were intentional and limited to the two routes at
desktop, wide, tablet, mobile, and narrow widths. The same command was rerun
without snapshot update mode and passed.

### Repository baseline constraints

`pnpm format:check` was run after temporary browser captures were removed and
returned exit code 1 because the repository currently reports 281 files with
formatting differences. The two touched files
that Prettier flags (`component-proofs.tsx` and `reference-harness.tsx`) have
line-for-line content identical to their Prettier output; the working-tree
line-ending state is preserved rather than normalized. Normalizing the full
repository is outside Q02B.

`pnpm test` passed the contract, DTCG, semantic contrast, and token-governance
stages, then stopped at the existing component-token coverage freshness check:

```text
component token coverage report is stale; run pnpm tokens:coverage
expected report: 862 literal pixel measurements
current scan:   863 literal pixel measurements
```

Updating that unrelated generated governance report would violate the Q02B
file boundary and was not performed. This is a repository baseline constraint,
not a Theme Studio or Component Lab runtime failure.

## 11. Compatibility and preservation review

Preserved:

- deterministic `/theme-studio` and `/component-lab` URLs;
- Theme Studio recipe, resolver, runtime preference, advanced authoring, and
  live preview behavior;
- Component Lab demonstrations and fixture state behavior;
- existing AppShell/Studio navigation and bottom-navigation contracts;
- `@ten4seven/ui` consumer API and generated/source relationships;
- reduced-motion behavior and existing focus semantics;
- Q02 platform-neutral ownership and the Q02A Farm/quality-reference boundary.

Not performed:

- no AAPM Farm/profile branding;
- no generic primitive or token source changes;
- no Tokens, Components, Blocks, Icons, Recipes, Operations Tracker,
  Operational Patterns, Public Showcase, Farm Synthetic, or Auth hardening;
- no dependency/package metadata/configuration changes;
- no stage, commit, push, publish, tag, merge, or branch operation;
- no Q02C execution.

## 12. Unresolved items routed forward

- Q02C remains the bounded queue for Canonical Library Hardening: Components,
  component families/details, Blocks, Recipes, retrieval, taxonomy, anchors,
  and explicit choices among list/table/data-grid/master-detail/drawer/timeline/
  kanban/process/upload/chart/canvas models.
- Q02D remains the bounded queue for Quality Reference and Proof Boundary
  Calibration: Publishing Store-derived portable qualities, proof labeling, and
  deciding which qualities can become reusable guidance without promoting
  domain meaning.
- The repository-wide formatter drift and stale component-token coverage report
  remain governance follow-ups outside Q02B.
- Any future Farm work must continue to use current Farm P1 UI, business
  contracts, canonical AAPM Brand, and authority gates; Farm Synthetic remains
  proof only.

## 13. Current gate

The two Studio surfaces satisfy the bounded Q02B acceptance intent in browser
behavior, responsive composition, accessibility evidence, visual consistency,
and contract ownership. The gate carries constraints only because the
repository-wide formatter and unrelated component-token coverage checks are
not clean in the preserved worktree.

PASS WITH CONSTRAINTS FOR Q02C
