# T7-AAPM-001-Q02E — Runtime / Package Manager Reproducibility and CSS Delivery Evidence

Status: COMPLETE WITH CONSTRAINTS  
Queue: Q02E — Runtime / Package Manager Reproducibility and CSS Delivery Hardening  
Mode: STRICT / BOUNDED-WIDE  
Risk: R2 — shared package/runtime compatibility  
Date: 2026-09-10

This is a documentation and controlled-runtime evidence artifact. No
component, token, contract, route, navigation, dependency, package export, or
runtime source was changed by Q02E.

## 1. Scope and precondition

Q02E was run after the Q02D evidence artifact was present. Q02D ends with
`PASS WITH CONSTRAINTS FOR Q03`, because Q02D predates the insertion of Q02E
into the sequence. That existing gate is treated as satisfying the Q02E
precondition of a Q02D pass-with-constraints result. Q02D was not rewritten to
hide the sequence-label mismatch.

The controlled question was:

```text
Does one exact packed @ten4seven/ui artifact produce materially equivalent
presentation and behavior when installed by pnpm and by npm?
```

The queue did not authorize a Range/Slider redesign. Design judgment was used
to decide whether a difference changed affordance, state communication,
keyboard behavior, accessibility, or product meaning. The primary RangeSlider
observation is important: the current generic contract uses native range
appearance for the two range inputs, while the single Slider contract opts
into explicit track/thumb styling. A native-looking result is therefore not,
by itself, evidence of an npm defect. A future fully branded multi-thumb track
would be a separate component-design decision with its own interaction model
and should not be smuggled into this distribution investigation.

## 2. Repository coordinates and dirty-state boundary

| Coordinate          | Observed value                                                                    |
| ------------------- | --------------------------------------------------------------------------------- |
| Repository          | `fahziputraj/ten4seven-ui`                                                        |
| Checkout            | `D:\SA\ten4seven-ui`                                                              |
| Branch              | `feat/icons-aapm-iconify-expansion`                                               |
| HEAD before Q02E    | `2bf29ad2e250edc3c70b63a0e34e3f4da3d72e2a`                                        |
| Node                | `v22.23.2`                                                                        |
| pnpm                | `11.22.0`                                                                         |
| npm                 | `12.0.1`                                                                          |
| OS                  | Windows 11 Pro, build `26200`                                                     |
| Browser             | Playwright CLI `1.62.1`, Playwright Chromium / Chrome for Testing `151.0.7922.34` |
| Rendered viewport   | `1280 x 900` for the controlled consumer comparison                               |
| Main monorepo URL   | `http://127.0.0.1:4175/component-lab`                                             |
| Packed consumer URL | `http://127.0.0.1:4190/`                                                          |

The baseline `git status --short --untracked-files=all` was captured before
Q02E mutation. It contained 69 pre-existing entries. The boundary was:

- pre-existing playground changes under `apps/playground/src/`: `App.tsx`,
  `app.css`, `component-proofs.tsx`, `library-explorers.tsx`,
  `playground-routes.ts`, `reference-harness.tsx`, and
  `token-foundations.tsx`;
- pre-existing generated and contract-plane changes under `generated/`,
  `packages/agent/generated/`, `packages/agent/src/`,
  `packages/contracts/src/`, and `scripts/`;
- pre-existing test changes under `tests/`, including the visual snapshot
  families for Component Lab, Components, Icons, Recipes, Theme Studio, and
  Tokens, plus the Operations Tracker reference snapshot;
- pre-existing untracked Q02 evidence and contract files:
  `apps/playground/src/library-page-header.tsx`,
  `docs/aapm/T7-AAPM-001-Q02-CONTRACT-PLANE-EVIDENCE.md`,
  `docs/aapm/T7-AAPM-001-Q02A-SURFACE-MATURITY-QUALITY-BAR.md`,
  `docs/aapm/T7-AAPM-001-Q02B-STUDIO-HARDENING-EVIDENCE.md`,
  `docs/aapm/T7-AAPM-001-Q02C-LIBRARY-HARDENING-EVIDENCE.md`,
  `docs/aapm/T7-AAPM-001-Q02D-REFERENCE-LAB-NAV-EVIDENCE.md`,
  `generated/platform-neutral.json`,
  `packages/agent/generated/platform-neutral.json`, and
  `packages/contracts/src/platform-neutral.ts`.

The Q02E baseline did not contain `package.json` drift. A temporary `npm pkg
delete` command used while preparing an isolated npm consumer briefly removed
the root `packageManager` and `engines.pnpm` fields; those exact fields were
restored immediately with `apply_patch`. The final repository status has no
`package.json` change attributable to Q02E. The temporary Playwright output
directory was also removed.

The final status boundary is the same pre-existing set plus exactly this
Q02E artifact:

```text
docs/aapm/T7-AAPM-001-Q02E-RUNTIME-PACKAGE-MANAGER-REPRODUCIBILITY-EVIDENCE.md
```

No unrelated file was normalized, staged, committed, pushed, published,
tagged, merged, or reverted.

## 3. Source and contract baseline

The source inspection established the following:

| Area                                        | Evidence                                                                                                                                                        | Classification                             |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Root `package.json`                         | `packageManager: pnpm@11.22.0`; Node `>=22.12.0`; pnpm `>=11.17.0 <12`                                                                                          | `SOURCE` / repository development contract |
| `pnpm-workspace.yaml`                       | Workspace packages are `apps/*` and `packages/*`; internal package links use `workspace:*`                                                                      | `SOURCE` / pnpm workspace contract         |
| `packages/ui/package.json`                  | `@ten4seven/ui@1.0.0`, private/UNLICENSED, no runtime dependencies, React and ReactDOM peer range `>=18.2.0`                                                    | `SOURCE` / packed consumer contract        |
| `packages/ui/scripts/build-package.mjs`     | Builds bundled ESM/CJS and declarations, creates CSS slices, copies fonts, writes package metadata                                                              | `SOURCE`                                   |
| `packages/ui/scripts/verify-package.mjs`    | Checks exports, CSS self-containment, client boundary, no internal runtime imports, Tailwind bridge, fonts, and token output                                    | `SOURCE` / verification contract           |
| `scripts/test-next-app-router-consumer.mjs` | Existing pnpm-only Next proof builds/verifies/packs the package, installs the artifact, verifies one React runtime, typechecks, builds, and runs Playwright/axe | `SOURCE` / existing consumer proof         |
| `RangeSlider` source                        | Two `input[type=range]` elements with `t7-range-slider-input`; generic CSS leaves `appearance:auto` and uses `accent-color`                                     | `SOURCE` / relevant component contract     |
| `Slider` source                             | Single `input[type=range]` with `t7-slider`; generic CSS sets `appearance:none` and explicit browser track/thumb selectors                                      | `SOURCE` / relevant component contract     |

The current package build is intentionally self-contained. The generated CSS
comment may retain source provenance such as
`packages/contracts/src/theme-recipe.ts`; that is a comment, not a consumer
runtime import. The verifier removes comments before checking runtime CSS
coupling.

## 4. Isolation and artifact identity

The main dirty worktree was not used as a disposable npm/pnpm swap target.
Two detached temporary worktrees were created at the same HEAD:

- `case-a` — clean pnpm monorepo baseline;
- `case-b` — disposable npm-against-monorepo diagnostic.

The current dirty Q02 contract-plane files that affect package generation were
overlaid into those temporary worktrees only so the package baseline matched
the current governed working state. No overlay was copied back to the main
checkout.

One package build was performed for Cases C and D. The exact same bytes were
used for both packed consumers; the package was not rebuilt between C and D.

| Artifact field | Observed value                                                                                                        |
| -------------- | --------------------------------------------------------------------------------------------------------------------- |
| Filename       | `ten4seven-ui-1.0.0.tgz`                                                                                              |
| Package        | `@ten4seven/ui@1.0.0`                                                                                                 |
| Size           | `8,921,649` bytes                                                                                                     |
| SHA-256        | `1F75853BE918D45E828B3336FE099503B59DA0E121ACE235C3D82CA5BE9EC925`                                                    |
| Source HEAD    | `2bf29ad2e250edc3c70b63a0e34e3f4da3d72e2a`, with the documented Q02 contract overlay in the disposable build worktree |
| Build/verify   | `pnpm package:build` PASS; `pnpm package:verify` PASS                                                                 |
| Release        | Not run                                                                                                               |

The pre-existing repository artifacts under `artifacts/` were not used for C
or D. The Q02E tarball lived in the disposable temporary artifact directory
and was removed with the rest of the disposable workspaces after evidence
collection.

## 5. Reproduction matrix

| Case                             | Setup                                                                                                                                                         | Result                                                                                                                                                         | Evidence classification       |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| A — canonical monorepo / pnpm    | Detached clean worktree; `pnpm install --frozen-lockfile`; canonical generated-package preparation with `pnpm typecheck`; Vite playground at `/component-lab` | PASS after the repository-defined generated-package preparation; RangeSlider loaded and was interactive                                                        | `RUNTIME` / `OBSERVED`        |
| B — npm against monorepo         | Detached clean worktree; `npm install --ignore-scripts --no-audit --no-fund`; `npm run build`                                                                 | npm install returned 0, but the equivalent build returned 1 with missing workspace links for `@ten4seven/ui` and `@ten4seven/agent`                            | `RUNTIME` / `OBSERVED`        |
| C — exact packed artifact / pnpm | Fresh consumer; exact tarball; pnpm install; Next production start; Playwright at 1280×900                                                                    | PASS; typecheck, build, existing consumer tests, CSS load, canary DOM, focus, and interaction were valid                                                       | `RUNTIME` / `OBSERVED`        |
| D — exact packed artifact / npm  | Fresh consumer; the same tarball; native npm install; same source/content/browser/viewport/theme                                                              | PASS; typecheck, build, consumer tests, CSS load, canary DOM, focus, and interaction matched C materially                                                      | `RUNTIME` / `OBSERVED`        |
| E — one-variable differential    | Not run                                                                                                                                                       | C and D did not differ; the A-versus-C/D differences are explained by route composition and active theme/profile, not an unresolved package-manager divergence | `PROPOSED` rule not triggered |

### Case A — canonical monorepo / pnpm

`pnpm install --frozen-lockfile` completed in the detached worktree with 10
workspace projects and 96 installed packages. Starting Vite before the
generated `@ten4seven/agent` package had been built produced a 500 import
overlay for `@ten4seven/agent/core`. This was not treated as a package-manager
CSS failure. The repository-defined `pnpm typecheck` sequence built the
generated agent package and completed successfully; after restarting Vite,
`/component-lab` loaded without application errors.

Observed at `http://127.0.0.1:4175/component-lab`:

- title: `ten4seven UI — Component Lab`;
- two `input[type=range]` elements, both class `t7-range-slider-input`;
- active values initially `22` and `84`;
- `appearance: auto`, height `40px`, and active-profile accent `rgb(31, 117,
71)`;
- active profile variables on the component scope: primary `148 58% 29%`,
  accent `78 82% 45%`;
- the stylesheet was injected as Vite style tags, including tags containing
  the generated `.t7-slider` and `.t7-range-slider` selector families;
- clicking the minimum range and pressing ArrowRight produced the controlled
  value transition to `43` and kept focus on the minimum slider;
- focus computed style included a visible two-layer box shadow:
  `rgb(255, 255, 255) 0px 0px 0px 2px` followed by the semantic blue focus
  ring at `4px`;
- document width remained `1280px` at the desktop viewport.

The screenshot was captured for rendered QA outside the repository. It showed
the canonical Component Lab shell, bounded content, clear form hierarchy, and
the two-thumb range interaction. It was not added to the repository because
Q02E permits exactly one evidence artifact.

### Case B — npm against the monorepo

Native npm installation in the detached diagnostic worktree returned exit code
0 but installed only the root-level dependency surface; it did not establish
the pnpm workspace links required by the playground. The root build script is
itself a pnpm script (`pnpm --filter @ten4seven/playground build`), so invoking
`npm run build` exposed the repository boundary rather than converting the
repository into an npm workspace. The resulting build returned exit code 1
with, among others:

```text
Cannot find module '@ten4seven/ui'
Cannot find module '@ten4seven/agent/core'
```

The output also showed pnpm installing workspace packages on demand, but the
playground still lacked the expected workspace links in that npm-created
state. This is diagnostic evidence that the monorepo contribution contract is
pnpm-only. It is not evidence that the packed consumer artifact requires pnpm.

### Case C — exact packed artifact / pnpm

The disposable consumer used the existing Next App Router proof source plus a
small temporary canary extension. The extension rendered existing
`RangeSlider`, `Slider`, `Button`, `Input`, `Select`, `Checkbox`, `Switch`,
`Progress`, `LineChart`, and `Modal` contracts; it did not modify the
repository fixture.

Results:

- `pnpm install --no-frozen-lockfile` completed;
- React and ReactDOM both resolved to `19.2.8`;
- `pnpm run typecheck` PASS;
- `pnpm run build` PASS with Next `16.3.4`;
- `pnpm run test` PASS: 3 tests passed;
- existing `pnpm test:next-consumer` also PASS in the isolated worktree,
  including package build/verify, one-React-runtime verification, strict
  typecheck, production build, Playwright, and axe;
- the only browser console error was the expected missing `/favicon.ico` 404;
  there were no package, CSS, hydration, or interaction errors;
- the page loaded the two Next CSS resources and the Inter font resource with
  HTTP 200 responses;
- `document.fonts.status` was `loaded` and `document.fonts.check("16px
Inter")` was true.

### Case D — exact packed artifact / npm

The npm consumer was created from the same source/content fixture in a fresh
directory with no copied `node_modules`, lockfile, build cache, or test cache.
The disposable wrapper's pnpm-only `packageManager` and `engines.pnpm`
metadata were removed solely to make the install a native npm consumer in the
local host environment; the application source, dependency versions, packed
artifact, theme provider, route content, and browser actions remained the
same. This wrapper metadata adjustment was not made in the repository.

`npm.cmd install --no-audit --no-fund` created an ordinary npm-style flat
consumer layout. No pnpm implementation directory was used as evidence for
the npm case. Results:

- npm install completed with an engine warning because this host is Node
  `22.23.2` while the existing Next proof wrapper asks for Node `>=24.0.0`;
- `npm run typecheck` PASS;
- `npm run build` PASS with Next `16.3.4`;
- `npm run test` PASS: 3 tests passed;
- `npm ls @ten4seven/ui react react-dom --depth=0` showed
  `@ten4seven/ui@1.0.0`, `react@19.2.8`, and `react-dom@19.2.8`;
- the only browser console error was the same missing `/favicon.ico` 404;
- the page loaded the same two Next CSS resources, fonts were loaded, and the
  same theme variables were present.

The first attempted npm consumer was rejected as contaminated evidence after
inspection showed it had retained a pnpm `node_modules` tree from fixture
copying. It was not used for the result. A new consumer was created instead;
this is why the npm evidence above is explicitly labelled native npm.

## 6. Runtime and package-resolution matrix

| Field            | Case C — packed/pnpm                                               | Case D — packed/npm                              | Result                   |
| ---------------- | ------------------------------------------------------------------ | ------------------------------------------------ | ------------------------ |
| Artifact version | `1.0.0`                                                            | `1.0.0`                                          | Equivalent               |
| Artifact SHA-256 | `1F75853BE918D45E828B3336FE099503B59DA0E121ACE235C3D82CA5BE9EC925` | Same                                             | Exact same bytes         |
| Package manifest | `@ten4seven/ui@1.0.0`                                              | `@ten4seven/ui@1.0.0`                            | Equivalent               |
| UI runtime entry | Installed package `dist/index.cjs`                                 | Installed package `dist/index.cjs`               | Equivalent               |
| CSS entry        | `@ten4seven/ui/styles.css` → installed `dist/styles.css`           | Same public import → installed `dist/styles.css` | Equivalent               |
| React            | `19.2.8`                                                           | `19.2.8`                                         | Equivalent               |
| ReactDOM         | `19.2.8`                                                           | `19.2.8`                                         | Equivalent               |
| Peer contract    | React and ReactDOM `>=18.2.0`                                      | Same                                             | Satisfied                |
| Build            | PASS                                                               | PASS                                             | Equivalent               |
| Browser CSS load | Two CSS resources loaded; no CSS error                             | Same resource pattern; no CSS error              | Equivalent               |
| Fonts            | Inter and shipped font set loaded                                  | Same                                             | Equivalent               |
| Console          | favicon 404 only                                                   | favicon 404 only                                 | No package/runtime error |

The pnpm resolution path contains pnpm's virtual-store segment; the npm
resolution path is flat. That filesystem-layout difference is expected and was
not used as a failure signal. Package identity was verified through the
installed package manifests and public Node resolution in each consumer.

## 7. Component canary comparison

The comparison intentionally checks interaction and state communication, not
only pixels. The same active theme was used for C and D: the consumer provider
resolved primary `126 44.94% 34.9%`, accent `13.87 78.15% 46.67%`, and focus
ring `0 0 0 2px hsl(0 0% 100%), 0 0 0 calc(2px + 2px) hsl(216 72% 38%)`.

| Canary           | DOM / state evidence                                                                                                                                                                                                                                   | C vs D result                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| RangeSlider      | Two `input[type=range]` elements; class `t7-range-slider-input`; labels `Confidence range minimum` and `Confidence range maximum`; values `22` and `84` at baseline; `appearance:auto`; `accent-color: rgb(49, 129, 57)`; width `395px`; height `40px` | PASS — same DOM, attributes, computed style, keyboard path, and screenshot result |
| Slider           | `<input data-testid="slider-canary" class="t7-slider" ...>`; baseline value `64`; `appearance:none`; transparent background; `accent-color: rgb(49, 129, 57)`; width `395px`; height `40px`                                                            | PASS — same explicit styled single-slider contract                                |
| Button           | Existing `t7-button` with semantic `data-intent` and `data-size`; existing Next consumer server/client boundary test passed                                                                                                                            | PASS                                                                              |
| Text Input       | Existing `t7-input` field in the packed proof; typecheck and controlled-field test passed                                                                                                                                                              | PASS                                                                              |
| Select / listbox | Existing canonical Select; controlled selection/listbox test passed                                                                                                                                                                                    | PASS                                                                              |
| Checkbox         | Existing semantic choice input with label `Confirm values`; label interaction toggled it to `checked: true` in both consumers                                                                                                                          | PASS                                                                              |
| Switch           | Existing semantic toggle canary was rendered and label interaction was exercised; no package/runtime error                                                                                                                                             | PASS                                                                              |
| Progress         | `role="progressbar"`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-valuenow="64"`; shipped `t7-progress` DOM                                                                                                                                      | PASS                                                                              |
| LineChart        | `t7-chart` with labelled SVG `role="img"`; deterministic data and identical package CSS                                                                                                                                                                | PASS                                                                              |
| Modal / dialog   | Existing modal open/dismissal proof passed in both consumer test runs                                                                                                                                                                                  | PASS                                                                              |

The C browser evaluation returned:

```text
Slider: value 64; appearance none; accent rgb(49, 129, 57); background transparent; 395px x 40px
Range: values 22/84; appearance auto; accent rgb(49, 129, 57); background white; 395px x 40px
Fonts: loaded; Inter check true
```

The D browser evaluation returned the same values. In both consumers, clicking
the minimum range and pressing ArrowRight produced the same controlled
transition from the clicked position to `43`, while retaining the minimum
slider's accessible label and keyboard affordance. The screenshots captured at
1280×900 were visually equivalent in hierarchy, card/surface treatment,
control density, typography, color, and responsive width. They were not
asserted as bit-for-bit identical raster output.

The monorepo A screenshot is not a direct pixel comparator for C/D because it
is the Component Lab route rather than the Next consumer proof. Its RangeSlider
computed state matches the native-appearance contract, while its active theme
and layout width are intentionally different.

## 8. CSS delivery contract

### Normal consumer import

The ordinary consumer import is:

```css
import "@ten4seven/ui/styles.css";
```

The existing Next consumer imports exactly this entry from its root layout.
Both the pnpm and native npm consumers resolved the import to the installed
package's `dist/styles.css`, and the browser loaded the resulting Next CSS
resources without a stylesheet error.

### Export and slice classification

The packed manifest exposes:

- `./styles.css` — complete normal consumer entry: tokens, theme recipes, and
  component contracts;
- `./base.css` — token/theme foundation layer;
- `./theme.css` — foundation plus generated theme recipes;
- `./themes.css` — generated theme-recipe layer;
- `./components.css` — component CSS contract layer;
- `./tailwind.css` — optional Tailwind v4 bridge, not required for the normal
  `styles.css` consumer path;
- `./tokens.dtcg.json` and `./fonts/*` — explicit token/font assets.

The package declares all CSS slices in `sideEffects`, preventing a bundler
from incorrectly removing imported presentation CSS.

### Self-containment evidence

The exact packed `dist/styles.css` was inspected:

- size: `360,949` UTF-8 bytes;
- `@import`: absent;
- `.t7-slider`: present, including browser track/thumb and focus selectors;
- `.t7-range-slider`: present;
- `@font-face`: present;
- font sources use package-relative `./fonts/*.woff2` URLs;
- `@ten4seven/*` runtime references: absent after comments are ignored;
- the package verifier passed its self-contained style and Tailwind-bridge
  checks.

The ordinary consumer does not need to install Tailwind or process Ten4Seven
source through a consumer Tailwind pipeline to receive the normal component
presentation. The optional Tailwind bridge is a separate explicit integration
choice.

## 9. Root-cause classification

### Evidenced classifications

1. `MONOREPO_PACKAGE_MANAGER_MISUSE` — supported by Case B. The root declares
   pnpm as its repository manager, the workspace uses `workspace:*`, and a
   direct npm install did not establish the workspace links required by the
   playground. Root scripts also intentionally invoke pnpm.
2. `NOT_REPRODUCED` — supported by Cases C and D. The original packed
   pnpm-versus-npm Range/Slider presentation difference did not reproduce when
   the exact same artifact, React versions, CSS import, theme, content,
   browser, and viewport were controlled.

### Not evidenced by this run

The following were checked or constrained but were not established as causes:

- `PACKED_CSS_MISSING`;
- `PACKED_CSS_IMPORT_CONTRACT_MISSING`;
- `PACKAGE_EXPORT_ERROR`;
- `SIDE_EFFECT_METADATA_ERROR`;
- `PEER_DEPENDENCY_DIVERGENCE`;
- `DUPLICATE_REACT_RUNTIME`;
- `DEV_VS_PACKED_ARTIFACT_DRIFT`;
- `TAILWIND_CONSUMER_COUPLING`;
- `ASSET_RESOLUTION_ERROR`;
- `COMPONENT_STYLE_DEFECT`;
- `npm bug` or `pnpm bug`.

The original uncontrolled observation remains `UNKNOWN / UNVERIFIED` as to
whether it involved a stale artifact, missing stylesheet import, different
theme/profile, different component (`Slider` versus `RangeSlider`), a
workspace preview, browser cache, or another environment variable. Controlled
evidence must not be used to invent a more specific historical cause.

## 10. Change evidence

| Problem                                                                  | Evidence                                                                                | Smallest change                                             | Verification                                                                   |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Need to distinguish pnpm monorepo behavior from packed consumer behavior | Root package/workspace source plus Cases A/B/C/D                                        | No production source change; documented the boundary        | Case B diagnostic; Cases C/D pass                                              |
| Need one exact artifact for both consumer managers                       | Artifact hash and size above                                                            | No package source change; built once in disposable worktree | Same SHA used for C and D                                                      |
| Need representative styling/interaction coverage                         | Temporary canary extension in disposable consumer only                                  | No repository fixture/component change                      | C/D DOM, CSS, state, keyboard, screenshot, and existing test evidence          |
| Need ordinary CSS import proof                                           | Existing Next layout imports `@ten4seven/ui/styles.css`                                 | No export/style change                                      | Both C/D resolution and browser load pass; package verifier pass               |
| Need npm consumer isolation                                              | First copied fixture was rejected as contaminated; fresh native npm fixture was created | No repository change                                        | Native npm fixture installed from empty node_modules/cache boundary and passed |

The final tracked change set contains only this Q02E documentation artifact in
addition to the pre-existing Q02 work. No Q02E regression test, package guard,
export change, side-effect change, or component/style change was justified by
the evidence.

## 11. Compatibility impact

| Surface                         | Impact                                                                                              |
| ------------------------------- | --------------------------------------------------------------------------------------------------- |
| Existing pnpm monorepo workflow | Preserved. pnpm remains the canonical and supported repository manager.                             |
| Direct npm monorepo workflow    | Not supported by the current workspace contract; Case B failure is documented rather than hidden.   |
| Packed pnpm consumer            | PASS with exact artifact, CSS, React peers, Next build, Playwright, and axe proof.                  |
| Packed npm consumer             | PASS with the same exact artifact and native npm install.                                           |
| Existing Next proof             | PASS in the isolated pnpm proof; npm equivalent also passed in the disposable native fixture.       |
| Package exports                 | Preserved and verified: 17 root exports reported by the verifier, including CSS/font/token entries. |
| CSS                             | Preserved; complete `styles.css` import is self-contained and package-relative for fonts.           |
| React peers                     | Preserved; React and ReactDOM are peers and both consumers resolved one `19.2.8` runtime.           |
| Release/publish                 | Not run.                                                                                            |

## 12. Verification record

| Command                                  | Result                | Constraint / note                                                                                                                                                            |
| ---------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm package:build`                     | PASS                  | Main checkout and isolated case-a build completed. The C/D comparison uses the separately recorded exact tarball.                                                            |
| `pnpm package:verify`                    | PASS                  | Self-contained styles, exports, fonts, token output, client boundary, and bundled runtime checks passed.                                                                     |
| `pnpm test:next-consumer`                | PASS                  | Isolated case-a: install, single React runtime, strict typecheck, Next build, Playwright, and axe; 3 tests passed. Node `>=24` warning remains because host is Node 22.23.2. |
| npm packed consumer typecheck/build/test | PASS                  | Native npm fixture; 3 Playwright tests passed.                                                                                                                               |
| `pnpm typecheck`                         | PASS                  | Contracts, agent, generated agent build, and playground typecheck passed.                                                                                                    |
| `pnpm build`                             | PASS                  | Playground Vite build passed; existing large-chunk advisory remains non-blocking.                                                                                            |
| `pnpm test`                              | PASS WITH CONSTRAINTS | Inherited component token coverage report is stale: actual scan `863`, checked-in expected `862`. Q02E did not regenerate or normalize it.                                   |
| `pnpm format:check`                      | PASS WITH CONSTRAINTS | Repository-wide check reports 280 pre-existing style issues. Q02E did not normalize unrelated files. The Q02E Markdown file is checked separately.                           |
| `git diff --check`                       | PASS                  | Only known pre-existing CRLF-to-LF warnings in unrelated dirty files were reported.                                                                                          |
| Q02E release/publish commands            | NOT RUN               | Explicitly forbidden by the queue.                                                                                                                                           |
| Original Q03                             | NOT RUN               | Explicitly forbidden by the queue.                                                                                                                                           |

## 13. Remaining risks and unknowns

- The host is Node `22.23.2`. The package root permits Node `>=22.12.0`, but
  the existing Next consumer fixture requests Node `>=24.0.0`; the Node 24
  rendering path remains `UNKNOWN / UNVERIFIED` in this run.
- The npm proof required a disposable consumer wrapper without pnpm-only
  metadata. Whether the existing consumer fixture should gain a first-class
  npm variant is a future proof-infrastructure decision, not evidence of a
  packed CSS defect.
- The original user-observed divergence did not include a preserved controlled
  artifact, URL, active profile, stylesheet import trace, or browser capture.
  Its historical root cause remains `UNKNOWN / UNVERIFIED`.
- The current RangeSlider uses native browser appearance in all three tested
  contexts. That is a product-design observation, not a package-portability
  failure. A future decision to use a custom multi-thumb track must evaluate
  keyboard behavior, hit targets, overlap/range semantics, focus, disabled
  state, reduced motion, and responsive density before changing the generic
  contract.
- Repository-wide test and format constraints remain inherited governance
  debt and were intentionally not repaired in Q02E.

## 14. Gate

Q02E establishes the intended boundary:

```text
REPOSITORY DEVELOPMENT = pnpm-only
PACKED CONSUMER        = package-manager-independent for the tested contract
```

The packed artifact passed controlled pnpm/npm comparison, but the inherited
repository test/format constraints, Node-version boundary, and unverified
historical observation must remain visible to the next queue.

PASS WITH CONSTRAINTS FOR Q03
