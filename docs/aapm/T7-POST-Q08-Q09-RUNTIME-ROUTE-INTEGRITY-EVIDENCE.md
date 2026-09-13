# T7 POST Q08–Q09 Runtime and Route Integrity Evidence

Status: PASS WITH CONSTRAINTS FOR Q10

Date: 2026-09-11  
Work item: Q09 — Runtime Recovery and Route Integrity  
Repository: fahziputraj/ten4seven-ui  
Branch: feat/icons-aapm-iconify-expansion  
HEAD at Q09 start: 2bf29ad2e250edc3c70b63a0e34e3f4da3d72e2a

## Boundary and inherited context

This evidence inherits, as reference context only:

- C:\Users\user\Downloads\00-T7-POST-Q08-PARENT.md
- C:\Users\user\Downloads\QUEUE_INDEX.md
- C:\Users\user\Downloads\T7-POST-Q08-Q09-RUNTIME-RECOVERY-AND-ROUTE-INTEGRITY.md
- the current Q01–Q08 evidence files under docs/aapm/

The attached documents were treated as the Q09 execution contract, not as
additional user requests. Only Q09 was executed. Q10 was not started.

The worktree was already heavily dirty at the start of Q09. Existing changes
were preserved; no reset, checkout, clean, stage, commit, push, tag, merge, or
unrelated broad refactor was performed.

## Environment coordinates

| Coordinate | Evidence |
| --- | --- |
| Node | v22.23.2 |
| pnpm | 11.22.0 |
| Package manager contract | package.json declares pnpm@11.22.0 |
| Configured dev workflow | pnpm dev → pnpm --filter @ten4seven/playground dev |
| Playwright web server workflow | pnpm dev --host 127.0.0.1 |
| Main runtime | http://127.0.0.1:4173 |
| Browser | Chromium through Playwright CLI |
| Disposable boot smoke | pnpm dev --host 127.0.0.1 --port 4174; Vite reported ready in 244 ms at http://127.0.0.1:4174/, then the process was stopped |
| Main runtime HTTP check | /theme-studio, /component-lab, /farm-reference, /operations-tracker, /erp-reference, and /favicon.svg returned HTTP 200 |

The 4173 process was already running when Q09 began. Its process command line
was not available from the local process listing, so the configured pnpm
workflow was also booted on disposable port 4174 to capture direct Vite startup
truth.

## Source route registry

The route registry is centralized in
apps/playground/src/playground-routes.ts:

- playgroundRoutePaths and playgroundRouteTitles define the canonical
  top-level path/title pairs.
- studioNavigation, libraryNavigation, referenceNavigation, and
  labProofNavigation feed playgroundNavigationGroups.
- adoptionProofNavigation and adoptionProofRoutePaths define the visible
  Farm Synthetic and authentication proof destinations.
- farmP1ReferenceRoutePaths owns the Farm subpaths.
- routeFromPath resolves known routes, Farm subpaths, brand proofs,
  component families/details, block details, recipe details, and the legacy
  /warehouse-inventory alias.
- apps/playground/src/playground-chrome.tsx renders the single sidebar
  navigation and the Browse library… family menu.
- apps/playground/src/App.tsx synchronizes route state and writes
  document.title from the route match.

The primary visible navigation contains 14 product/library/reference items:

| Visible label | Canonical path | Registry entry |
| --- | --- | --- |
| Theme Studio | /theme-studio | studioNavigation → playgroundRoutePaths |
| Component Lab | /component-lab | studioNavigation → playgroundRoutePaths |
| Tokens | /tokens | libraryNavigation → playgroundRoutePaths |
| Components | /components | libraryNavigation → playgroundRoutePaths |
| Blocks | /blocks | libraryNavigation → playgroundRoutePaths |
| Icons | /icons | libraryNavigation → playgroundRoutePaths |
| Recipes | /recipes | libraryNavigation → playgroundRoutePaths |
| Publishing Store | /ebook-store | referenceNavigation → playgroundRoutePaths |
| Operations Tracker | /operations-tracker | labProofNavigation → playgroundRoutePaths |
| Operational Patterns | /operational-patterns | labProofNavigation → playgroundRoutePaths |
| SaaS Control Plane | /saas-control-plane | labProofNavigation → playgroundRoutePaths |
| ERP Density Reference | /erp-reference | labProofNavigation → playgroundRoutePaths |
| Farm P1 Reference | /farm-reference | labProofNavigation → playgroundRoutePaths |
| Public Showcase | /public-showcase | labProofNavigation → playgroundRoutePaths |

The Labs / Proofs group adds these visible adoption routes:

| Visible label | Canonical path | Registry entry |
| --- | --- | --- |
| Farm Synthetic | /farm-synthetic-proof | adoptionProofNavigation → adoptionProofRoutePaths |
| Auth · Neutral | /brand-proof/auth-neutral | adoptionProofNavigation → brandProofRoutePaths |
| Auth · Academy | /brand-proof/auth-aapm-academy | adoptionProofNavigation → brandProofRoutePaths |

## Visible navigation matrix — primary and proof routes

Each row was tested by direct browser navigation and then a full page refresh.
The content value is the observed main text length after each load. The direct
and refresh values matched for every row. PublicShell routes intentionally do
not expose the private ten4seven sidebar, so active navigation is N/A rather
than a missing active state.

| Label | Path | Registered route | Title | Rendered content and active nav | Refresh |
| --- | --- | --- | --- | --- | --- |
| Theme Studio | /theme-studio | known | ten4seven UI — Theme Studio | h1=Theme Studio, content 3583, active Theme Studio | PASS |
| Component Lab | /component-lab | known | ten4seven UI — Component Lab | h1=Component Lab, content 4106, active Component Lab | PASS |
| Tokens | /tokens | known | ten4seven UI — Tokens | h1=Tokens, content 13676, active Tokens | PASS |
| Components | /components | known | ten4seven UI — Components | h1=Components, content 18827, active Components | PASS |
| Blocks | /blocks | known | ten4seven UI — Blocks | h1=Blocks, content 3619, active Blocks | PASS |
| Icons | /icons | known | ten4seven UI — Icons | h1=Icons, content 5087, active Icons | PASS |
| Recipes | /recipes | known | ten4seven UI — Recipes | h1=Recipes, content 4487, active Recipes | PASS |
| Publishing Store | /ebook-store | known | ten4seven UI — Publishing Store | h1=Buku untuk ide yang bertahan, content 1816, active N/A (PublicShell) | PASS |
| Operations Tracker | /operations-tracker | known | ten4seven UI — Operations Tracker | h1=Operations tracker, content 2491, active Operations Tracker | PASS |
| Operational Patterns | /operational-patterns | known | ten4seven UI — Operational Patterns | h1=Today’s operational priorities, content 1877, active Operational Patterns | PASS |
| SaaS Control Plane | /saas-control-plane | known | ten4seven UI — SaaS Control Plane Patterns | h1=SaaS control-plane patterns, content 1324, active SaaS Control Plane | PASS |
| ERP Density Reference | /erp-reference | known | ten4seven UI — ERP Density Reference | h1=ERP density reference, content 3720, active ERP Density Reference | PASS |
| Farm P1 Reference | /farm-reference | known | ten4seven UI — Farm P1 Reference | h1=Farm overview, content 1400, active Farm P1 Reference | PASS |
| Public Showcase | /public-showcase | known | ten4seven UI — Public Showcase | h1=Build consistent interfaces, faster., content 4778, active N/A (PublicShell) | PASS |
| Farm Synthetic | /farm-synthetic-proof | farm-synthetic | ten4seven UI — Farm Synthetic Consumer Proof | h1=Farm Overview, content 1371, active Farm Synthetic | PASS |
| Auth · Neutral | /brand-proof/auth-neutral | brand-proof | ten4seven UI — Authentication · Neutral Product | h1=Continue to your workspace., content 874, active N/A (consumer shell) | PASS |
| Auth · Academy | /brand-proof/auth-aapm-academy | brand-proof | ten4seven UI — Authentication · AAPM Academy | h1=Return to shared practice., content 893, active N/A (consumer shell) | PASS |

Result: 17/17 primary/proof route entries passed direct navigation and
refresh, for 34/34 browser loads, with no console, page, failed-request, or
HTTP error events.

## Visible navigation matrix — Browse library submenu

Browse library… opened as one accessible popover with 17 family links,
including the direct Components entry and all canonical component families.
Every family path was also opened directly and refreshed.

| Label | Path | Title / rendered content | Active nav | Refresh |
| --- | --- | --- | --- | --- |
| Foundations | /components/foundations | Foundations, content 820 | Components | PASS |
| Actions | /components/actions | Actions, content 950 | Components | PASS |
| Forms | /components/forms | Forms, content 3118 | Components | PASS |
| Navigation | /components/navigation | Navigation, content 2009 | Components | PASS |
| Layout | /components/layout | Layout, content 1029 | Components | PASS |
| Surfaces | /components/surfaces | Surfaces, content 1036 | Components | PASS |
| Data Display | /components/data-display | Data Display, content 1532 | Components | PASS |
| Tables | /components/tables | Tables, content 1407 | Components | PASS |
| Filtering & Bulk Actions | /components/filtering-bulk-actions | Filtering & Bulk Actions, content 880 | Components | PASS |
| Overlays | /components/overlays | Overlays, content 1084 | Components | PASS |
| Feedback & Progress | /components/feedback-progress | Feedback & Progress, content 1508 | Components | PASS |
| Date & Time | /components/date-time | Date & Time, content 1033 | Components | PASS |
| Files | /components/files | Files, content 600 | Components | PASS |
| Charts & Data Visualization | /components/charts-data-visualization | Charts & Data Visualization, content 1162 | Components | PASS |
| Media | /components/media | Media, content 729 | Components | PASS |
| Commerce | /components/commerce | Commerce, content 1167 | Components | PASS |
| Patterns | /components/patterns | Patterns, content 1056 | Components | PASS |

Result: 17/17 submenu entries passed direct navigation and refresh, for
34/34 browser loads, with no console, page, failed-request, or HTTP error
events. The submenu itself was present and visible with familyLinkCount=17.

## Additional route integrity checks

The registered Farm subpaths and the legacy compatibility alias were opened
directly and refreshed:

| Path | Direct and refresh result | Title / active nav |
| --- | --- | --- |
| /farm-reference/overview | PASS / PASS | ten4seven UI — Farm P1 Reference / Farm P1 Reference |
| /farm-reference/daily-operations | PASS / PASS | ten4seven UI — Farm P1 Reference / Farm P1 Reference |
| /farm-reference/context | PASS / PASS | ten4seven UI — Farm P1 Reference / Farm P1 Reference |
| /farm-reference/flocks | PASS / PASS | ten4seven UI — Farm P1 Reference / Farm P1 Reference |
| /farm-reference/inventory | PASS / PASS | ten4seven UI — Farm P1 Reference / Farm P1 Reference |
| /warehouse-inventory | PASS / PASS | ten4seven UI — Operations Tracker / Operations Tracker |

All six entries rendered non-empty content and produced no console, page,
failed-request, or HTTP error events.

## Runtime diagnosis and recovery

### Component Lab

On the first fresh Chromium load before the Q09 patch:

- the page rendered its complete shell and Component Lab content;
- the console contained 14 SVG errors of the form
  Error: <stop> attribute offset: Expected number or percentage, var(--t7-chart-d…;
- /favicon.ico returned HTTP 404.

The source charts had middle gradient stops written as CSS custom-property
strings in SVG offset attributes. SVG offset accepts a number or percentage,
not a CSS var(...) expression. The runtime also resolves the workspace
@ten4seven/ui import from packages/ui/dist/index.js, so changing source alone
does not update the running playground until the package is rebuilt.

After the minimal patch and pnpm package:build:

- Component Lab produced only the normal React DevTools info message;
- console errors: 0; warnings: 0;
- 56 SVG stop elements were inspected and no middle stop retained a var(...)
  offset; the typed value resolved to 58%;
- the route remained populated and all route-matrix loads stayed error-free.

### Farm reference

The Q09 source observation reported that Opera had shown blank or generic
accessibility output for /farm-reference. Fresh Chromium reproduced neither
blank rendering nor a route exception: the Farm reference had a populated
sidebar, Farm overview heading, context, KPI content, and its expected shell.
Its fresh console and network checks were clean.

Opera-specific reproduction is therefore OBSERVED FROM INHERITED CONTEXT /
UNVERIFIED IN THIS RUN; it is not claimed as fixed or disproven across
browsers. No error boundary was added because the current browser evidence
showed no pre-render route failure to contain, and a generic boundary would
have risked masking the original exception.

### Operations Tracker and ERP

Direct and refresh checks for /operations-tracker and /erp-reference returned
populated pages, the expected titles, active sidebar items, and no runtime
errors. The legacy /warehouse-inventory alias also resolved to Operations
Tracker as registered.

## Exact Q09 changes

1. packages/ui/src/charts.tsx
   - Replaced the four invalid SVG gradient stop offsets with
     offset={chartGeometry.depth.gradientStop}.
   - This preserves the typed chart geometry source and its 58% token value.
   - The file already contained substantial pre-Q09 dirty work; the Q09
     source delta was limited to those four offset expressions.
2. apps/playground/index.html
   - Added the favicon link so a fresh runtime no longer requests a missing
     /favicon.ico.
3. apps/playground/public/favicon.svg
   - Added the small local ten4seven mark used by the link.
4. Rebuilt the consumed UI package with pnpm package:build; generated
   packages/ui/dist output is ignored package build output, not a new tracked
   source change.
5. Added this Q09 evidence file.

No broad App.tsx refactor, visual redesign, package-manager migration, or
Q10 work was performed.

## Validation

| Command | Result | Evidence |
| --- | --- | --- |
| pnpm typecheck | PASS | Exit 0; contracts, native, agent, playground typecheck, and agent build completed |
| pnpm test | PASS | Exit 0; contract, responsive, Farm, ERP, DTCG, contrast, token governance, component, AI, package, and bridge gates completed |
| pnpm test:e2e | CONSTRAINT | 210 passed, 47 failed, 14.5 minutes; failures are pre-existing visual/interaction drift across action availability, overlays/tooltips, Theme Studio shape/recipe expectations, operational/public references, QR/cart, and related snapshot suites |
| pnpm build | PASS | Exit 0; Vite production build completed; emitted only the existing large-chunk warning |
| pnpm format:check | CONSTRAINT | Exit 1; after temporary Playwright artifacts were removed, Prettier reported 296 already-dirty files. No mass formatting was run |
| git diff --check | PASS | Exit 0; only CRLF/LF normalization warnings for existing dirty files |

The full E2E result is reported rather than hidden. The 47 failures did not
correspond to blank pages or route-entry failures in the dedicated Q09 browser
matrix. They remain a constraint for later work because Q09 forbids broad
visual or interaction redesign.

## Gate

Q09 runtime and route integrity is ready to hand forward with explicit
constraints:

- PASS: pnpm boot truth, production build, typecheck, unit/contract suite,
  direct route navigation, refresh integrity, title integrity, active-nav
  integrity, Component Lab chart runtime errors, Farm/Operations/ERP rendering,
  and the legacy route alias.
- CONSTRAINT: the inherited worktree still has 296 formatting violations and
  the broad E2E suite has 47 unrelated/pre-existing visual or interaction
  failures. These must not be mistaken for a clean repository-wide quality
  baseline.
- UNVERIFIED: the inherited Opera-specific blank-page observation was not
  reproduced because the available rendered browser QA was Chromium.

PASS WITH CONSTRAINTS FOR Q10

STOP.
