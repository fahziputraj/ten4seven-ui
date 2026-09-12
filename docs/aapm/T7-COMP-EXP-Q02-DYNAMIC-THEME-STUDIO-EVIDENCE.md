# T7 Component Expansion Q02 — Dynamic Theme Studio Contract Plane

Status: `PASS WITH CONSTRAINTS FOR Q03`  
Mode: `BOUNDED-WIDE implementation`  
Risk: `R2 — shared design-system contract`  
Target repository: `fahziputraj/ten4seven-ui`  
Captured: `2026-09-11` (`Asia/Jakarta`)

This is the Q02 implementation and evidence artifact. The attached
`Q02-DYNAMIC-THEME-STUDIO.md` was treated as the bounded work specification;
its text was not treated as permission to start Q03 or to broaden the change
into component-catalog, recipe, block, icon, or route harmonization work.

## 1. Boundary and repository coordinates

### 1.1 Inherited context versus the current request

The user request is `proceed q02`. Q01 was used only as the prerequisite
capability discovery and axis contract. The Q02 instruction defines the
implementation boundary and the required stop gate.

Q02 did not authorize:

- Q03 product-profile expansion or AAPM adoption;
- component, block, icon, or recipe catalog expansion;
- Brand Core replacement or token renaming;
- a new persistence service, business state, or server-side theme authority;
- dependency migration, branch cleanup, commit, push, merge, or release;
- replacement of existing consumer behavior, routing, permissions, or
  validation.

### 1.2 Source coordinates

`SOURCE` — the work was performed in the existing checkout:

| Field                   | Value                                                                |
| ----------------------- | -------------------------------------------------------------------- |
| Local path              | `D:/SA/ten4seven-ui`                                                 |
| Branch                  | `codex/icons-curated-solar-style`                                    |
| HEAD                    | `e582cfcfbe0f077d1a5832d86db9da1898487fd3`                           |
| HEAD subject            | `feat(q14): restore fluid navigation and responsive shell hardening` |
| New Q02 contract source | `packages/contracts/src/theme-studio.ts`                             |
| Q02 evidence            | `docs/aapm/T7-COMP-EXP-Q02-DYNAMIC-THEME-STUDIO-EVIDENCE.md`         |

The checkout already contained unrelated tracked changes and untracked
Playwright/Q14/revert evidence before Q02. Those changes were preserved. Q02
was not staged and no branch lifecycle operation was performed.

The main files receiving Q02 edits are:

```text
packages/contracts/src/theme-studio.ts
packages/contracts/src/index.ts
packages/tokens/src/theme.ts
packages/ui/src/provider.tsx
packages/ui/src/index.ts
apps/playground/src/App.tsx
apps/playground/src/app.css
scripts/generate-contract-projections.mjs
scripts/verify-contracts.mjs
generated/agent-index.json
packages/agent/generated/agent-index.json
```

The files above are shared files with pre-existing work layered in some cases;
the list is not a claim that every line in each dirty file belongs to Q02.

### 1.3 Evidence labels

- `SOURCE` — read directly from checked-out source or command output.
- `OBSERVED` — seen in the local Codex In-app Browser runtime.
- `NORMALIZED` — a bounded interpretation of SOURCE and OBSERVED evidence.
- `UNKNOWN` — not established by this repository or this job.
- `UNVERIFIED` — requires production adoption, deployment, distribution, or a
  different authority.

The browser evidence is local playground/harness evidence. It is not AAPM
production adoption evidence, a deployment proof, or an acceptance of any
downstream product.

## 2. Q02 outcome

`NORMALIZED` — Theme Studio now has one versioned, controlled authoring model:

```text
Base Recipe
    ↓
Product Profile ownership
    ↓
Explicit authored overrides + runtime preferences
    ↓
Resolved ThemeProfile and ThemeComposition
    ↓
Ten4SevenProvider semantic variables, scopes, and component tokens
```

The neutral product profile is deliberately non-opinionated: it preserves the
selected base recipe. A named product profile may own its recipe and density,
so an ERP/Farm/Academy selection remains coherent instead of becoming a bag of
unrelated colors.

This removes the old ambiguity where `Custom` behaved like a fifth rigid
preset. Theme Studio now exposes `Base + overrides` as the starting model and
shows whether each supported axis is inherited, profile-owned, or explicitly
overridden.

## 3. Contract implementation

### 3.1 Typed Theme Studio state

`SOURCE` — `packages/contracts/src/theme-studio.ts` provides:

- schema version `1.0`;
- deterministic defaults for the product recipe and neutral profile;
- compact/standard/wide content-rail presets backed by
  `ThemeComposition` tokens;
- the bounded axis vocabulary: recipe, profile, appearance, brand,
  typography, density, shape, surface, elevation, chart, contrast, motion,
  viewport, interaction, and iconography;
- conservative sanitization for supported theme values;
- resolution, diff, one-axis reset, all-override reset, strict parse, and
  versioned serialization helpers.

`SOURCE` — the resolver keeps component state, business meaning, z-index,
arbitrary CSS, and icon names outside the global editor. `interaction` and
`iconography` are exposed as inherited contract axes in the map; they are not
free-form global values. Focus behavior and semantic icon selection remain
canonical component/library responsibilities.

### 3.2 Axis ownership map

| Section      | Axes                                             | Authoring rule                                                                                 |
| ------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `BASE`       | Base recipe, product profile                     | Choose the coherent starting language; a named profile can own recipe/density.                 |
| `STYLE`      | Brand roles, typography, shape, surface          | Adjust supported visual axes through the existing token resolver.                              |
| `EXPERIENCE` | Appearance, density, elevation, contrast, motion | Runtime preferences stay separate from authored surface decisions.                             |
| `DATA`       | Chart palette                                    | Set the family-level chart colorway; per-series business meaning remains component/data-owned. |
| `ADVANCED`   | Content rail, focus/interaction, iconography     | Inspect bounded delivery contracts; only content rail is a global override in Q02.             |

The UI renders these as five short progressive sections with anchor links and
one state badge per axis. Reset buttons remove only the selected axis. `Reset
all` removes explicit runtime/visual overrides while retaining the selected
base recipe and product profile.

### 3.3 Provider and scope adapter

`SOURCE` — `packages/ui/src/provider.tsx` accepts the optional controlled
`themeStudio` document and `onThemeStudioChange` callback. When present, the
provider:

- resolves the typed document before producing legacy-compatible
  `ThemeConfig` values;
- applies the effective recipe/profile composition and motion role to the
  existing token builder;
- publishes schema/profile metadata through root data attributes;
- routes `setTheme`, one-axis reset, and all-reset events back to the
  controlled document;
- keeps the legacy provider path operational when `themeStudio` is absent;
- does not let the legacy persisted override object compete with the dynamic
  controlled document;
- carries the same resolved motion profile into nested `ThemeScope` surfaces.

The existing `ThemeConfig` adapter remains the compatibility seam. Q02 does
not create a second component primitive system or a second overlay/theme
runtime.

### 3.4 Safe transfer boundary

`SOURCE` — the playground stores a versioned document at:

```text
ten4seven.playground.theme-studio.v1
```

The older partial theme key remains a recovery input and is translated into
the versioned document. Theme Studio writes the versioned key going forward.
Pasted or stored documents must have schema `1.0` and valid supported values;
invalid documents are rejected without applying a partial mutation. Unknown
values are ignored by the conservative sanitizer rather than reaching the
token resolver.

The transfer control is intentionally a local JSON boundary. It is not a
server persistence contract, an authorization boundary, or a production theme
distribution protocol.

## 4. Theme Studio surface changes

`SOURCE` — `apps/playground/src/App.tsx` and `apps/playground/src/app.css`
now provide:

- a compact product-profile selector with human-readable labels and a visible
  profile-owned recipe/density summary;
- `Inherited`, `Profile`, and `Overridden` badges in the theme map and active
  profile diagnostics;
- progressive `BASE`, `STYLE`, `EXPERIENCE`, `DATA`, and `ADVANCED` grouping;
- a bounded content-rail selector using `THEME_STUDIO_VIEWPORTS`;
- per-axis reset controls plus `Reset all`;
- versioned `Copy JSON` and safe `Load config` controls with a polite status
  region;
- a family-canary preview using canonical navigation, button, progress, and
  line-chart components for navigation, overlays, progress, files,
  visualization, and advanced delivery;
- the existing recipe, typography, palette, shape, elevation, and motion
  controls wired through the same controlled document;
- constrained form-rail styling and touch-safe storefront action sizing using
  existing semantic control tokens.

The implementation keeps the existing live preview, inverse scope, editorial
scope, AAPM adapter, responsive contract, typography specimen, and component
proof. These are retained as existing harness evidence, not reimplemented as
new Q02 primitives.

## 5. Runtime observations

### 5.1 Initial route

`OBSERVED` — the route was reopened in the Codex In-app Browser only:

```text
http://127.0.0.1:4173/theme-studio
```

After loading the deterministic default document, the runtime showed:

| Observation          | Result                                                         |
| -------------------- | -------------------------------------------------------------- |
| Document title       | `ten4seven UI — Theme Studio`                                  |
| Root recipe          | `product`                                                      |
| Root product profile | `neutral-product`                                              |
| Root schema          | `1.0`                                                          |
| Default content max  | `1320px`                                                       |
| Progressive sections | `BASE`, `STYLE`, `EXPERIENCE`, `DATA`, `ADVANCED`              |
| Canary families      | navigation, overlays, progress, files, visualization, advanced |
| Transfer surface     | present with versioned JSON                                    |
| Initial alert nodes  | none                                                           |

The accessible tree showed labelled recipe/profile/runtime controls, section
anchors, a labelled JSON text area, reset actions, semantic status output, the
live table preview, inverse/editorial scopes, and all six canary families.

### 5.2 Profile, viewport, reset, and transfer checks

`OBSERVED` — the following interactions were performed in the Codex Browser:

| Interaction                                                             | Observed result                                                                                                                                        |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Select `ERP` product profile                                            | Root effective recipe `enterprise`, profile `aapm-erp`, density `dense`, content max `1440px`; detail reads `ERP · enterprise recipe · dense density`. |
| Select `Compact` content rail                                           | Root content max becomes `1180px`; the viewport axis becomes `Overridden`.                                                                             |
| Reset `Content rail`                                                    | Root content max returns to `1440px`; viewport axis becomes `Inherited`; ERP profile remains selected.                                                 |
| Reset `Product profile`                                                 | Root returns to neutral profile and product/default density.                                                                                           |
| Load schema `9.9` document                                              | Status reads `Invalid versioned config; nothing changed`; root remains product.                                                                        |
| Load valid dark/compact/more/reduced + violet/standard/compact document | Root resolves dark mode, compact density, more contrast, reduced motion, violet palette, `1180px` content max; affected axes show `Overridden`.        |

### 5.3 Fresh-load console check

`OBSERVED` — after a fresh route load, no new console errors or warnings were
reported by the Codex Browser dev log bridge. Historical Vite hot-reload
messages generated while rebuilding the local package were not treated as a
fresh-route runtime result; the route was reopened after the rebuild.

## 6. Verification record

`SOURCE` — commands run after the Q02 implementation:

| Check                               | Result                                    | Evidence                                                                                                                                                               |
| ----------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm test:contracts`               | `PASS`                                    | Contract resolver, profile ownership, neutral base-recipe preservation, viewport, reset, serialization, parser version rejection, and diff assertions.                 |
| `pnpm typecheck`                    | `PASS`                                    | Contracts, native, agent build, and playground typecheck.                                                                                                              |
| `pnpm --filter @ten4seven/ui build` | `PASS`                                    | Canonical UI package rebuilt with the dynamic provider bridge.                                                                                                         |
| `pnpm test`                         | `PASS`                                    | Full repository contract, token, AI, component, brand, recipe, and bridge gates.                                                                                       |
| `pnpm build`                        | `PASS`                                    | Playground production build; Vite emitted a non-blocking large-chunk advisory.                                                                                         |
| `pnpm package:verify`               | `PASS`                                    | Published-package boundary, bundled tokens/icons/motion, and self-contained styles.                                                                                    |
| `pnpm contracts:generate`           | `PASS`                                    | 196 projections regenerated; Theme Studio source and route added to the generated agent index.                                                                         |
| Q02 targeted Playwright suite       | `PASS — 25 passed`                        | `tests/end-to-end-hardening.spec.ts`, `tests/final-stabilization.spec.ts`, and `tests/universal-v2-theme.spec.ts`, one worker.                                         |
| Q02 source formatting check         | `PASS`                                    | Contract/provider/index/token/script files touched by Q02 use Prettier formatting.                                                                                     |
| `git diff --check`                  | `PASS`                                    | No whitespace errors; existing CRLF conversion warnings remain outside the Q02 boundary.                                                                               |
| `pnpm format:check`                 | `FAIL — pre-existing repository baseline` | Repository-wide Prettier reports 376 existing files, including inherited app/docs/evidence files. Q02 did not mass-normalize unrelated work.                           |
| Codex Browser Theme Studio QA       | `PASS`                                    | Initial state, profile ownership, content rail override/reset, invalid import rejection, valid import resolution, accessible tree, and fresh-load console check above. |

The format failure is a repository-wide baseline constraint, not a failure of
the targeted Q02 contract/provider files. No unrelated file was formatted or
cleaned to make that check appear green.

## 7. Known constraints and handoff

`UNKNOWN / UNVERIFIED` — this job does not establish:

- production adoption by AAPM or another consumer;
- a server-authoritative theme persistence or authorization model;
- package publication, deployment, or remote branch integration;
- arbitrary per-component or per-scope authoring beyond the supported Q02
  axes;
- resolution of the pre-existing repository-wide formatting debt.

The Q02 provider bridge is controlled by the playground for this local proof.
Future consumers must opt into the typed document deliberately; existing
legacy `ThemeConfig` consumers remain supported. Q03 must not infer that local
profile rendering is production adoption.

## 8. Gate

`PASS WITH CONSTRAINTS FOR Q03`

Q02 is complete within its bounded contract-plane scope. The required
constraints are the inherited repository-wide formatting baseline and the
local/playground-only persistence boundary documented above. Q03 was not
started.
