# T7-QR-001 — Web QR display / print gate

Status: **scoped PASS — NEW COMPONENT IMPLEMENTED + PROVEN**
Date: 2026-09-06
Program: Issue #3 — `T7-AAPM-AGENTIC-001`
Executable gate: `T7-QR-001`
Stacked base: `b9f3b5651bffff54a9639de1b9b8c7ee3c0f50de` (`feat/T7-SECTIONNAV-001`)

## Classification decision

| Requirement                                             | Classification                    | Evidence and decision                                                                                                                                                          |
| ------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Web display of an encoded value                         | **COMPONENT GAP**                 | No canonical component rendered an encoded QR matrix. `Image` and `MediaFrame` only manage supplied media sources and do not own QR encoding.                                  |
| Human-readable label/context and accessible description | **COMPONENT GAP**                 | No existing media or data-display contract paired a machine value with an SVG name, description, and visible verification text.                                                |
| Copy value and print-friendly output                    | **COMPONENT GAP**                 | Existing generic actions had no QR-specific value-copy status or print presentation. `Button` remains the action primitive.                                                    |
| Camera access and QR scanning                           | **NATIVE / PRODUCT OWNED**        | AAPM evidence assigns scanning and camera permissions to the Mobile/Expo surface; Web QR does not request permissions or resolve a resource.                                   |
| Optional SVG/PNG download                               | **DEFERRED WITH EXPLICIT REASON** | The minimum gate is satisfied by inline accessible SVG plus browser print. A separate export action would add API and file-format surface without a proven repeated AAPM need. |

The decision is a generic `QrCode` component, not an AAPM-specific cage block.
No donor UI or new runtime dependency was introduced. Payload creation,
resource resolution, authorization, and scanner/native camera behavior remain
consumer or native responsibilities.

## AAPM source evidence

- `D:\SA\AAPM_Ecosystem\docs\ux-map\ECOSYSTEM_UI_CAPABILITY_REQUIREMENTS.md`, Web QR requirement: status `GAP`, P1; render encoded value, human-readable label/context, accessible description, copy, print-friendly rendering, optional export only if justified, and no camera/scanning logic.
- `D:\SA\AAPM_Ecosystem\docs\handoffs\TEN4SEVEN_UI_AAPM_COMPLETENESS_DEVELOPER_HANDOFF.md`, `T7-QR-001`: the same minimum and an explicit Web/Mobile scanner boundary.
- `D:\SA\AAPM_Ecosystem\docs\ux-map\APPLICATION_WIREFRAMES.md`, cage detail: QR label, payload, and print action are visible product requirements; payload meaning and downstream mobile behavior are not generic UI concerns.
- `D:\SA\AAPM_Ecosystem\docs\ux-map\UI_FOUNDATION_AND_TOKEN_ARCHITECTURE.md`: QR visual frame is theme-owned while payload/code identity is generated business data.

## Implemented contract path

1. `packages/ui/src/qr.tsx` adds the self-contained byte-mode QR matrix
   encoder (Version 1-L through Version 10-L), mask selection, quiet zone,
   SVG rendering, human-readable value, copy fallback/status, and print
   action. It has no network, camera, or scanner dependency.
2. `packages/ui/src/index.ts` exports `QrCode` from the public package boundary.
3. `packages/ui/src/styles.css` adds token-driven surface, mark, action,
   narrow-layout, and print rules; QR modules use semantic foreground/surface
   tokens and no hard-coded brand color.
4. `packages/ai/catalog/components.json` records the implemented media
   contract, ownership boundary, states, accessibility, responsive behavior,
   API, and relationships. The canonical fixture is present in Component Lab.
5. `pnpm contracts:generate` produced the bounded projections in
   `generated/components/QrCode.json`, `generated/components.compact.json`,
   and the mirrored `packages/agent/generated/` paths.
6. AI guidance and selection surfaces document when to choose `QrCode` and
   explicitly exclude scanner/camera and payload authorization behavior.

## Runtime and browser evidence

Local Vite runtime: `http://127.0.0.1:4178/components/qr-code`

`tests/qr-code.spec.ts` proves:

- the canonical route heading and fixture resolve;
- the QR mark is an SVG image with a title and description;
- the opaque AAPM Mobile deep-link is visible as human-readable code text;
- the canonical Copy value action reports its result;
- the Print QR action calls the browser print boundary without owning a
  resource workflow;
- the mark and actions remain within the component bounds at 390px width;
- the desktop and narrow reference screenshots are stable at
  `tests/qr-code.spec.ts-snapshots/qr-code-desktop-chromium-win32.png` and
  `tests/qr-code.spec.ts-snapshots/qr-code-mobile-chromium-win32.png`.

Targeted result: **2 passed** (desktop behavior/accessibility and mobile
responsive/visual proof).

## Verification matrix

| Check                                                                              | Result                                                                                                                                                       |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pnpm contracts:generate`                                                          | PASS — 186 projections, 3 DTCG exports                                                                                                                       |
| `pnpm test:contracts`                                                              | PASS — contract/projection integrity                                                                                                                         |
| `pnpm test:ai`                                                                     | PASS — 29 recipes, 148 components, 12 blocks, 98 icons; 0 donor reads                                                                                        |
| `pnpm test:component-system`                                                       | PASS — 142 canonical components, 6 aliases                                                                                                                   |
| `pnpm test:tailwind-bridge`                                                        | PASS                                                                                                                                                         |
| `pnpm tokens:coverage` + `pnpm test:component-coverage`                            | PASS — 840 raw-pixel occurrences tracked as migration debt                                                                                                   |
| `pnpm --filter @ten4seven/ui build`                                                | PASS                                                                                                                                                         |
| `pnpm typecheck`                                                                   | PASS                                                                                                                                                         |
| `pnpm build`                                                                       | PASS — existing chunk-size warning only                                                                                                                      |
| `pnpm exec playwright test tests/qr-code.spec.ts --config=playwright.qr.config.ts` | PASS — 2 tests                                                                                                                                               |
| targeted Prettier check for changed implementation/evidence files                  | PASS — selection matrix retains its existing table formatting                                                                                                |
| `pnpm format:check`                                                                | BASELINE DEBT — existing repository-wide formatting/CRLF drift remains; changed Gate 5 files pass targeted check                                             |
| `pnpm test`                                                                        | BASELINE BLOCKER — stops at `test:slice-a` because local `@ten4seven/agent` cannot resolve from `consumer-tests/entity-list-consumer`; preceding checks pass |

## Ownership and stop-condition audit

- No business calculation, authorization predicate, payload generation policy,
  resource lookup, or mutation entered the generic API.
- No semantic recipe was rewritten; `recipes: []` is intentional because the
  current gate proves a component capability rather than a new page recipe.
- No camera permission, scanner, remote image service, or donor/runtime
  dependency was added.
- The component uses canonical `Button` actions and semantic token variables;
  inline SVG is the bounded rendering mechanism, not a second icon system.
- The component is ready for the next bounded gate, `T7-HIERARCHY-001`
  discovery, after the final verification and commit.
