# T7-AAPM-001-Q02D — Reference, Lab and Navigation Governance Evidence

Status: READY AFTER Q02C PASS WITH CONSTRAINTS  
Mode: STRICT / BOUNDED-WIDE  
Risk: R2 — shared shell / information architecture  
Target repository: `fahziputraj/ten4seven-ui`  
Target checkout: `D:\SA\ten4seven-ui`

## 1. Scope and gate context

Q02D was executed as a bounded navigation-governance change. The queue was
documentation-, shell-, route-registry-, and directly affected test/snapshot-
only work. No proof surface was redesigned or deleted, and original Q03 was
not executed.

The governing inputs were:

- [AGENTS.md](../../AGENTS.md)
- [README.md](../../README.md)
- [Q01 — Current Target Fit](T7-AAPM-001-Q01-CURRENT-TARGET-FIT.md)
- [Q02 — Contract Plane Evidence](T7-AAPM-001-Q02-CONTRACT-PLANE-EVIDENCE.md)
- [Q02A — Surface Maturity and Quality Bar](T7-AAPM-001-Q02A-SURFACE-MATURITY-QUALITY-BAR.md)
- [Q02B — Studio Hardening Evidence](T7-AAPM-001-Q02B-STUDIO-HARDENING-EVIDENCE.md)
- [Q02C — Library Hardening Evidence](T7-AAPM-001-Q02C-LIBRARY-HARDENING-EVIDENCE.md)

Q02C ended with `PASS WITH CONSTRAINTS FOR Q02D`, so those inherited
constraints remain visible in Section 10 and are not silently converted into
a clean full-repository pass.

The Design Judgment Mandate was applied in this order:

> Business and user intent → interaction model → information architecture →
> screen/pattern → component contract → semantic tokens → theme/profile →
> final composition.

For this queue the user problem is truthful discovery of system surfaces. The
appropriate interaction model is a grouped, keyboard-operable navigation tree
with direct route access and active-route feedback. It is not a kanban,
workflow board, upload flow, table, chart, or canvas: maturity is a stable
classification of destinations, not a process state to manipulate. The change
therefore improves the navigation information architecture without inventing
a new visual shell or a second product registry.

## 2. Repository coordinates and dirty-state boundary

Recorded before Q02D mutation:

```text
branch: feat/icons-aapm-iconify-expansion
HEAD:   2bf29ad2e250edc3c70b63a0e34e3f4da3d72e2a
```

The pre-Q02D `git status --short --untracked-files=all` boundary was:

```text
 M apps/playground/src/App.tsx
 M apps/playground/src/app.css
 M apps/playground/src/component-proofs.tsx
 M apps/playground/src/library-explorers.tsx
 M apps/playground/src/reference-harness.tsx
 M apps/playground/src/token-foundations.tsx
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
 M tests/catalog-integrity.spec.ts
 M tests/mobile-navigation.spec.ts
 M tests/visual-regression.spec.ts-snapshots/component-lab-desktop-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/component-lab-mobile-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/component-lab-narrow-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/component-lab-tablet-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/component-lab-wide-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/components-desktop-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/components-mobile-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/components-narrow-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/components-tablet-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/components-wide-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/icons-desktop-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/icons-mobile-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/icons-narrow-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/icons-tablet-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/icons-wide-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/recipes-desktop-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/recipes-mobile-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/recipes-narrow-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/recipes-tablet-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/recipes-wide-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/theme-studio-desktop-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/theme-studio-mobile-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/theme-studio-narrow-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/theme-studio-tablet-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/theme-studio-wide-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/tokens-desktop-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/tokens-mobile-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/tokens-narrow-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/tokens-tablet-chromium-win32.png
 M tests/visual-regression.spec.ts-snapshots/tokens-wide-chromium-win32.png
 M tests/workbench-interaction.spec.ts
?? apps/playground/src/library-page-header.tsx
?? docs/aapm/T7-AAPM-001-Q02-CONTRACT-PLANE-EVIDENCE.md
?? docs/aapm/T7-AAPM-001-Q02A-SURFACE-MATURITY-QUALITY-BAR.md
?? docs/aapm/T7-AAPM-001-Q02B-STUDIO-HARDENING-EVIDENCE.md
?? docs/aapm/T7-AAPM-001-Q02C-LIBRARY-HARDENING-EVIDENCE.md
?? generated/platform-neutral.json
?? packages/agent/generated/platform-neutral.json
?? packages/contracts/src/platform-neutral.ts
```

This dirty state was treated as user-owned. Q02D did not stage, commit, push,
publish, tag, merge, reset, clean, normalize, or rewrite unrelated files. The
local Vite server at `http://localhost:4173/` was kept running for inspection.

## 3. Complete discovered surface inventory

The inventory below includes the canonical Studio and Library destinations,
the reference route, proof/lab routes, known Library detail flows, and the
legacy alias discovered in the route matcher. A route's presence in this
inventory is not a claim that it has equal maturity.

### Canonical Studio

- Theme Studio — `/theme-studio`
- Component Lab — `/component-lab`

### Canonical Library

- Tokens — `/tokens`
- Components — `/components`
  - component-family discovery, including Patterns, Tables, and Filtering &
    Bulk Actions where the current catalog exposes those families;
  - component detail routes such as `/components/forms` and
    `/components/button`.
- Blocks — `/blocks`
  - block detail such as `/blocks/hero-split`.
- Icons — `/icons`
- Recipes — `/recipes`
  - recipe detail such as `/recipes/cart`.
- Browse Library — the existing Library discovery/menu flow and its catalog
  projections, rather than a newly invented top-level URL.

### Quality reference

- Publishing Store / Ebook Store — `/ebook-store`.

### Labs and proofs

- Operations Tracker — `/operations-tracker`.
- Operational Patterns — `/operational-patterns`.
- Public Showcase — `/public-showcase`.
- Farm Synthetic — `/farm-synthetic-proof`.
- Auth · Neutral — `/brand-proof/auth-neutral`.
- Auth · Academy — `/brand-proof/auth-aapm-academy`.
- Reference QA controls — a QA-only harness/modal, not a consumer product
  destination and not a maturity authority.

### Legacy and unknown boundaries

- Legacy Warehouse Inventory alias — `/warehouse-inventory`, preserved as an
  accepted alias to Operations Tracker.
- Production Farm P1 — not represented by Farm Synthetic and not established
  by this repository's proof route; maturity remains `UNKNOWN` here.
- Future or unregistered routes — `UNKNOWN` until an explicit product and
  ownership decision exists.

## 4. Before navigation tree

Before Q02D, the Workbench navigation exposed the following peer-level groups
on desktop and in the mobile navigation drawer:

```text
Studio
├─ Theme Studio
└─ Component Lab

Library
├─ Tokens
├─ Components
├─ Blocks
├─ Icons
└─ Recipes

References
├─ Operations Tracker
├─ Operational Patterns
├─ Publishing Store
└─ Public Showcase

Adoption Proofs
├─ Farm Synthetic
├─ Auth · Neutral
└─ Auth · Academy
```

The route registry had separate arrays for Studio, Library, and a mixed
`referenceNavigation` list, while adoption proofs were rendered by a separate
shell block. The result was functionally addressable, but it suggested that
an operational reference, a commerce benchmark, a public composition
showcase, and adoption proofs were one reference tier. The additional
`Adoption Proofs` group made evidence discoverable, but did not communicate
the broader LAB / PROOF distinction or the relative authority of the groups.

## 5. After navigation tree and maturity metadata

Q02D makes `playgroundNavigationGroups` in
[`playground-routes.ts`](../../apps/playground/src/playground-routes.ts) the
single shell navigation/maturity registry:

```text
Studio [PRIMARY]
├─ Theme Studio
└─ Component Lab

Library [PRIMARY]
├─ Tokens
├─ Components
├─ Blocks
├─ Icons
└─ Recipes

Reference [QUALITY_REFERENCE]
└─ Publishing Store

Labs / Proofs [LAB_PROOF]
├─ Operations Tracker
├─ Operational Patterns
├─ Public Showcase
├─ Farm Synthetic
├─ Auth · Neutral
└─ Auth · Academy
```

The shell exposes the classification as `data-surface-maturity` on each
semantic navigation group. This is descriptive presentation metadata only. It
does not grant or remove access, determine tenant entitlement, decide
permissions, authorize resources, or establish business lifecycle state.

No route URL changed. No route was deleted. The following direct paths remain
refresh-safe and addressable:

| Surface                   | URL                              | Q02D result                       |
| ------------------------- | -------------------------------- | --------------------------------- |
| Theme Studio              | `/theme-studio`                  | retained; primary group           |
| Component Lab             | `/component-lab`                 | retained; primary group           |
| Tokens                    | `/tokens`                        | retained; primary group           |
| Components                | `/components`                    | retained; primary group           |
| Blocks                    | `/blocks`                        | retained; primary group           |
| Icons                     | `/icons`                         | retained; primary group           |
| Recipes                   | `/recipes`                       | retained; primary group           |
| Publishing Store          | `/ebook-store`                   | retained; quality-reference group |
| Operations Tracker        | `/operations-tracker`            | retained; labs/proofs group       |
| Operational Patterns      | `/operational-patterns`          | retained; labs/proofs group       |
| Public Showcase           | `/public-showcase`               | retained; labs/proofs group       |
| Farm Synthetic            | `/farm-synthetic-proof`          | retained; labs/proofs group       |
| Auth · Neutral            | `/brand-proof/auth-neutral`      | retained; labs/proofs group       |
| Auth · Academy            | `/brand-proof/auth-aapm-academy` | retained; labs/proofs group       |
| Warehouse Inventory alias | `/warehouse-inventory`           | retained as legacy alias          |

Browse Library and Library detail URLs remain owned by the existing catalog
and route matching systems. Q02D did not create a second catalog or route
registry for them.

## 6. Surface maturity classification and rationale

| Surface or family                                 | Classification      | Evidence and rationale                                                                                                                                                                                                       |
| ------------------------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Theme Studio                                      | `PRIMARY`           | The system workbench for theme axes, profiles, and live previews; it is an intended Ten4Seven product surface and now leads the navigation.                                                                                  |
| Component Lab                                     | `PRIMARY`           | The interactive component contract and stress-test surface; it belongs to the same Design System product as Theme Studio.                                                                                                    |
| Tokens                                            | `PRIMARY`           | Canonical semantic token inspection and resolution surface; it is part of the Library chain.                                                                                                                                 |
| Components                                        | `PRIMARY`           | Canonical implemented component contracts and status discovery; it is the primary Library entry point for primitives and patterns.                                                                                           |
| Blocks                                            | `PRIMARY`           | Catalogued expressive composition layer; it demonstrates reusable blocks without becoming a business shell.                                                                                                                  |
| Icons                                             | `PRIMARY`           | Semantic icon asset discovery and usage surface; icons remain governed assets rather than raw provider strings.                                                                                                              |
| Recipes                                           | `PRIMARY`           | Composition patterns that connect components to product screens; it is a canonical Library consumer surface.                                                                                                                 |
| Browse Library                                    | `PRIMARY`           | Canonical discovery/projection flow for the Library; it supports human and AI discoverability without owning authorization or business truth.                                                                                |
| Publishing Store / Ebook Store                    | `QUALITY_REFERENCE` | The strongest current visual/product benchmark for hierarchy, rhythm, density, surface treatment, responsiveness, and interaction polish. It is not a universal shell, Farm template, ERP template, or AAPM Brand authority. |
| Operations Tracker                                | `LAB_PROOF`         | Useful production-looking composition and adoption evidence, but not a canonical Design System target or proof of production business authority.                                                                             |
| Operational Patterns                              | `LAB_PROOF`         | Reference adoption evidence for process, planning, control-tower, and decision patterns; it is not itself the canonical business contract.                                                                                   |
| Public Showcase                                   | `LAB_PROOF`         | Demonstrates public composition possibilities and block/recipe usage; it is not a universal product shell.                                                                                                                   |
| Farm Synthetic                                    | `LAB_PROOF`         | Synthetic consumer composition for adoption proof; its existence does not make it the target Farm UX or authorize Farm behavior.                                                                                             |
| Auth · Neutral                                    | `LAB_PROOF`         | Brand-expression proof route; useful evidence, not AAPM Brand Core authority.                                                                                                                                                |
| Auth · Academy                                    | `LAB_PROOF`         | Bounded Academy brand-expression proof; useful evidence, not a generic entitlement or business contract.                                                                                                                     |
| `/warehouse-inventory`                            | `LEGACY`            | Existing accepted alias retained for link compatibility; it resolves to Operations Tracker and is not a new surface.                                                                                                         |
| Production Farm P1 / future unregistered surfaces | `UNKNOWN`           | No Q02D evidence establishes these as Ten4Seven navigation authorities; they require their own business, brand, and contract decisions.                                                                                      |

## 7. Information-design and product-design rationale

### Selected model

The selected model is a four-group navigation tree with explicit maturity
metadata:

1. `Studio` and `Library` are first and both marked `PRIMARY`, so the user can
   understand the Design System's canonical product boundary before seeing
   references or proofs.
2. `Reference` contains only Publishing Store. This communicates its role as a
   selected quality benchmark without promoting its commerce meaning into the
   generic system.
3. `Labs / Proofs` contains the useful evidence routes together. This preserves
   direct manipulation, active-route behavior, and regression access while
   making it harder to infer equal canonical maturity.
4. The same registry is consumed by the Workbench shell and the reference QA
   harness's route grouping. This keeps navigation grammar in one place while
   leaving business routes, permissions, and persistence outside Ten4Seven.

This is an information-architecture change, not a card, table, canvas, or
workflow redesign. There is no user value in making maturity draggable or
animating it as a progress state. The important feedback is structural
placement, readable labels, a visible active route, and reliable mobile
disclosure.

### Plausible approaches rejected

- **Delete weak proofs:** rejected because route addressability is valuable for
  regression, evidence, and future promotion decisions; weak UX is not enough
  evidence for destructive removal.
- **Leave the existing mixed `References` and `Adoption Proofs` groups:**
  rejected because the split obscured that Operations, Public Showcase, and
  Farm/Auth routes are all evidence surfaces while Publishing Store has a
  different quality-reference role.
- **Make Publishing Store primary:** rejected because visual quality reference
  is not the same as canonical system ownership, and commerce-specific meaning
  must not leak into generic navigation.
- **Hide Labs / Proofs completely:** rejected because discoverability and
  reproducibility still matter; de-emphasis through truthful grouping is the
  bounded change supported by the current shell.
- **Create a separate maturity catalog or entitlement layer:** rejected because
  it would violate the Q02 source-of-truth boundary and make a visual taxonomy
  look like authorization logic.
- **Force every surface into the same card or page composition:** rejected
  because this queue governs navigation hierarchy; the current surface-specific
  interaction models remain evidence for later hardening queues.

## 8. Route accessibility and keyboard behavior

### Before

- Direct route buttons, active-state styling, `aria-current="page"`, and the
  responsive drawer already existed.
- Desktop and narrow navigation were reachable, but the group labels did not
  truthfully express the maturity relationship.
- Adoption proof routes were reachable through a separate group rather than a
  shared Labs / Proofs classification.

### After

- Every group is a semantic `role="group"` with an accessible label and a
  `data-surface-maturity` value.
- Studio and Library remain the first groups in DOM order and retain direct
  route buttons.
- Publishing Store is a single, clearly named Reference group.
- Operations, Operational Patterns, Public Showcase, Farm Synthetic, Auth
  Neutral, and Auth Academy are all reachable in the Labs / Proofs group.
- Active route behavior remains `data-active="true"` plus
  `aria-current="page"`; detail routes continue to activate their Library
  parent.
- The mobile drawer retains focus management, escape dismissal, 44px minimum
  target checks, body-scroll locking, and return focus behavior from the
  existing canonical navigation primitive.
- The existing QA modal remains a QA control; it does not become a product
  maturity authority and does not expose proof controls inside consumer shells.

## 9. Exact Q02D changes and ownership boundary

Q02D-owned deltas:

- [`apps/playground/src/playground-routes.ts`](../../apps/playground/src/playground-routes.ts)
  - added the typed `SurfaceMaturity` and `PlaygroundNavigationGroup` shape;
  - added the single `playgroundNavigationGroups` registry;
  - separated Publishing Store from the lab/proof route list;
  - retained the existing route paths and adoption-proof route map.
- [`apps/playground/src/App.tsx`](../../apps/playground/src/App.tsx)
  - changed WorkbenchNavigation to consume the canonical group registry;
  - placed adoption-proof routes inside the Labs / Proofs group;
  - exposed maturity metadata on the rendered semantic groups.
  - This file was already dirty before Q02D for Q02B/Q02C work; only the
    navigation-registry consumption is attributed to Q02D.
- [`apps/playground/src/reference-harness.tsx`](../../apps/playground/src/reference-harness.tsx)
  - changed the QA route-group projection to consume the same registry;
  - preserved the pre-existing controlled QA-modal behavior from earlier
    bounded work and did not expand QA controls into proof product routes.
- [`tests/navigation-closure.spec.ts`](../../tests/navigation-closure.spec.ts)
  - added expected maturity metadata and stale-group assertions;
  - retained direct URL, active-route, mobile overflow, focus, and proof-shell
    checks.
- Directly affected rendered evidence:
  - the Operations Tracker desktop reference snapshot was updated because the
    visible navigation grouping changed;
  - the existing Theme Studio and Component Lab desktop/wide visual snapshots
    were refreshed during targeted QA; their other pre-existing dirty snapshots
    were preserved and are not attributed to Q02D.
- This evidence artifact is the only Q02D documentation artifact created.

No component contract, token source, generated contract projection, package
metadata, dependency, route path, permission decision, business workflow, or
Farm authority was changed by Q02D.

## 10. Verification and rendered QA

### Browser and rendered QA

The local server was inspected at `http://localhost:4173/` using the existing
Playwright workflow. Representative rendered checks covered:

| Check                                                                   | Actual viewport(s)                                 | Result                                                                            |
| ----------------------------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------- |
| Desktop expanded navigation and active route                            | `1440 × 900`; also `1024 × 900` label-width checks | PASS                                                                              |
| Narrow/mobile drawer and all group destinations                         | `320 × 844`, `375 × 844`, `390 × 844`              | PASS                                                                              |
| Mobile menu target, focus return, dismissal, and no horizontal overflow | `360 × 700`, `390 × 700`, `768 × 700`              | PASS                                                                              |
| Short mobile QA access through the navigation drawer                    | `390 × 600`, then `390 × 340`                      | PASS                                                                              |
| Reference preview and consumer-shell boundary                           | `1440 × 900` and `390 × 844`                       | PASS                                                                              |
| Operations Tracker reference render                                     | `1440 × 900` and `390 × 844`                       | PASS; one desktop reference snapshot changed only for the new navigation grouping |
| Theme Studio / Component Lab visual regression                          | repository visual matrix; targeted Studio/Lab run  | PASS, 10 tests                                                                    |

The targeted results were:

```text
pnpm exec playwright test tests/navigation-closure.spec.ts --project=chromium --reporter=line
7 passed

pnpm exec playwright test tests/navigation-closure.spec.ts tests/mobile-navigation.spec.ts tests/reference-preview-mode.spec.ts tests/reference-screen-renders.spec.ts --project=chromium --reporter=line
21 passed

pnpm exec playwright test tests/visual-regression.spec.ts --grep "theme-studio|component-lab" --project=chromium --reporter=line
10 passed
```

The checks demonstrated that:

- canonical Studio and Library groups are first and directly discoverable;
- the Reference group exposes Publishing Store without mixing it with proofs;
- Labs / Proofs remains discoverable on desktop and through the narrow drawer;
- all proof route buttons remain reachable and retain their direct URLs;
- active route state is visible and scrolls into the desktop navigation viewport;
- Library detail routes preserve their parent active state;
- navigation labels fit at `1024px` and `1440px` without unintended clipping;
- document width remains within the viewport at `320px`, `375px`, and `390px`;
- keyboard dismissal and focus restoration continue to work;
- the proof shells retain their bounded return to Studio;
- no consumer preview route was given the QA harness as a product control.

### Repository gates

| Gate                | Result                | Evidence / constraint                                                                                                                                                                                                                                                                                                            |
| ------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm typecheck`    | PASS                  | Contracts, agent, and playground type checks completed after the Q02D source change.                                                                                                                                                                                                                                             |
| `pnpm build`        | PASS                  | Vite build completed; the existing large-chunk advisory remained non-blocking.                                                                                                                                                                                                                                                   |
| `pnpm test`         | PASS WITH CONSTRAINTS | The inherited component-token coverage assertion reports current scan `863` versus expected `862` and instructs `pnpm tokens:coverage`. Q02D did not regenerate or normalize that unrelated report.                                                                                                                              |
| `pnpm format:check` | PASS WITH CONSTRAINTS | The final repository-level check, after removing the temporary QA session directory, reports style issues in `280` files. A pre-cleanup run reported `283` while those temporary QA files were present; Q02D-owned TypeScript and Markdown files were checked separately and are clean. Unrelated EOL/style drift was preserved. |
| `git diff --check`  | PASS                  | Only the known pre-existing CRLF-to-LF warnings in unrelated dirty files remain; no Q02D whitespace error was introduced.                                                                                                                                                                                                        |

The `pnpm test` and `pnpm format:check` constraints are inherited repository
state, not navigation failures. The earlier Q02C evidence recorded the same
coverage problem and a lower dirty-state format count; the final count above
is reported as observed after preserving the full dirty worktree and removing
only the temporary Q02D QA session directory.

## 11. Explicit Publishing Store and Farm Synthetic disposition

### Publishing Store

Publishing Store / Ebook Store is explicitly `QUALITY_REFERENCE`. It is the
selected benchmark for information hierarchy, spacing rhythm, typography,
surface treatment, density balance, polish, responsive behavior, and
interaction refinement. It is not:

- a universal Ten4Seven application shell;
- a Farm template;
- an ERP template;
- AAPM Brand authority;
- a reason to transfer bookstore-specific commerce semantics into generic
  navigation, component, token, or contract ownership.

### Farm Synthetic

Farm Synthetic is explicitly `LAB_PROOF` and remains at
`/farm-synthetic-proof`. It was not renamed, promoted, deleted, or treated as
the target Farm experience. It must not override the preserve-first Farm
direction:

> current Farm P1 UI + Farm business intent + hardened Ten4Seven + canonical
> AAPM Brand + accepted business contracts.

Any original Q06 Farm work must begin from that direction, not from Farm
Synthetic.

## 12. Preservation, risks, and constraints passed to original Q03

Preserved by Q02D:

- deterministic top-level, detail, proof, and legacy route URLs;
- current AppShell/Workbench and mobile navigation primitives;
- active-route and focus semantics;
- Q02 system-versus-consumer ownership boundaries;
- typed/generated contract ownership and AI retrieval surfaces;
- proof routes as evidence rather than authority;
- unrelated pre-existing dirty files and snapshots.

Risks and unknowns:

- The current navigation registry classifies known playground destinations;
  it cannot establish production adoption, licensing, deployment, tenant
  entitlement, authorization, or Farm business authority.
- The quality-reference classification is a product-direction decision and
  must not be interpreted as an AAPM Brand decision.
- The current proof routes still require their own future evidence if a later
  queue proposes promotion, redesign, or deletion.
- The full test and format gates remain constrained by inherited repository
  drift; the exact current failures are recorded above.
- Native UI, production Farm, ERP-density decisions, and original Q03 scope
  remain outside this queue.

Before original Q03, preserve these constraints:

1. Keep Studio and Library as the canonical primary surfaces.
2. Keep Publishing Store as a quality reference only.
3. Keep Labs / Proofs discoverable but non-authoritative.
4. Keep Farm Synthetic explicitly non-authoritative and do not use it as Farm
   P1 design direction.
5. Do not turn maturity metadata into permission, entitlement, or lifecycle
   logic.
6. Do not start original Q03 until its queue file is separately supplied and
   its own preconditions are checked.

## 13. Current gate

PASS WITH CONSTRAINTS FOR Q03
