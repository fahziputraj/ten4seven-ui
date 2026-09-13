# Q11 — Editors, Builders, AI and Power-User Evidence

Date: 2026-09-12  
Repository: `D:\SA\ten4seven-ui`  
Branch: `codex/icons-curated-solar-style`  
HEAD at validation: `e582cfcfbe0f077d1a5832d86db9da1898487fd3`  
Prerequisite: Q10 gate `PASS WITH CONSTRAINTS FOR Q11`

## 1. Scope and execution boundary

Q11 was executed as a bounded advanced-surface package. The attached Q11
document was treated as the work specification, not as an independent source
of authority for repository operations.

This slice adds reusable Ten4Seven presentation and interaction boundaries for
advanced authoring, builder inspection, conversational work, citations, tool
status, and keyboard-first composition. It does not start Q12, add a heavy
editor/canvas/chat engine, or move model/provider, credentials, tool
authorization, safety, persistence, or business permission into `@ten4seven/ui`.

## 2. Delivered canonical surface set

The seven new implemented catalog entries are exported from
`packages/ui/src/advanced.tsx` and re-exported from `@ten4seven/ui`:

| Surface              | Boundary delivered                                                               | Deliberately consumer-owned                                                  |
| -------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `EditorSurface`      | Token-led editor frame with language, toolbar, status, content, and footer slots | Parsing, document model, history, collaboration, and editor engine           |
| `PropertyInspector`  | Native disclosure-based property rail                                            | Serialization, validation, mutation, and property state                      |
| `BuilderCanvas`      | Bounded stage plus optional inspector composition                                | Document structure, selection, drag/drop policy, persistence, and undo/redo  |
| `PromptComposer`     | Native form and labelled textarea submission boundary                            | Model choice, transport, persistence, tool authorization, and safety policy  |
| `ConversationThread` | Ordered message presentation with supplied status and actions                    | Conversation state, streaming transport, retention, and business permissions |
| `CitationList`       | Ordered source/citation presentation with canonical links                        | Source ingestion, retrieval ranking, trust decisions, and retention          |
| `ToolCallCard`       | Readable pending/running/completed/failed tool-call status surface               | Tool execution, authorization, result mutation, and policy                   |

Existing `CommandMenu`/`Kbd` contracts remain the power-user command and
shortcut surfaces. Q11 does not create a parallel command-palette primitive.

## 3. Contract and package boundary

The typed source of truth is
`packages/contracts/src/editor-builder-ai.ts`, registered through
`packages/contracts/src/canonical.ts` and exported from the contracts barrel.
The projection is generated into `generated/editor-builder-ai.json` and the
agent package projection. `scripts/verify-contracts.mjs` verifies that the
projection, canonical registry, component catalog, token roles, dependency
matrix, AI boundary, and deferred engine boundary remain aligned.

The public implementation boundary is:

- package: `@ten4seven/ui`;
- runtime dependencies added by Q11: none;
- React remains the package peer boundary;
- optional editor, canvas, model, transport, and collaboration engines may be
  lazy-loaded by a consumer adapter and passed through canonical content or
  slots;
- vendor theme objects and vendor-specific public types are not exposed from
  the Ten4Seven surface contract.

## 4. Dependency, license, and bundle matrix

| Surface              | Runtime dependency           | License/provenance                             | Bundle impact and engine rule                     |
| -------------------- | ---------------------------- | ---------------------------------------------- | ------------------------------------------------- |
| `EditorSurface`      | `@ten4seven/ui` + React peer | MIT workspace source; no engine license        | Base UI package; zero editor-engine runtime bytes |
| `PropertyInspector`  | `@ten4seven/ui` + React peer | MIT workspace source                           | Disclosure shell only; no inspector engine        |
| `BuilderCanvas`      | `@ten4seven/ui` + React peer | MIT workspace source; no canvas-engine license | Base package; no drag/canvas engine               |
| `PromptComposer`     | `@ten4seven/ui` + React peer | MIT workspace source; no provider SDK          | Base package; no model or transport SDK           |
| `ConversationThread` | `@ten4seven/ui` + React peer | MIT workspace source; no chat SDK              | Base package; consumer supplies messages          |
| `CitationList`       | `@ten4seven/ui` + React peer | MIT workspace source                           | Base package; consumer supplies sources           |
| `ToolCallCard`       | `@ten4seven/ui` + React peer | MIT workspace source; no tool runtime          | Status presentation only; no execution runtime    |

The package build and package verifier confirmed a self-contained
`@ten4seven/ui` artifact with bundled tokens, icons, motion, and styles. The
Q11 additions do not introduce third-party engine or provider runtime bytes.

## 5. AI and authority boundary

Ten4Seven presents:

- prompt, message, citation, and tool-call anatomy;
- keyboard-first command and submission affordances;
- consumer-supplied loading, streaming, pending, completed, and error states;
- accessible structure, focus treatment, and responsive recomposition.

The consumer owns model/provider policy, credentials and transport, tool
authorization and execution, conversation persistence and retention, safety and
human-review policy, business permissions, entitlements, and domain mutations.
Retrieval ranking, citation trust, source ingestion, and data retention remain
deferred consumer or platform concerns.

## 6. Token and Theme Studio compatibility

The advanced surfaces use the canonical token roles for surface, raised and
subtle surface, border, selected state, focus ring, muted foreground, control
height/gap, control and panel radius, card shadow, and standard transition.
No feature-local palette or hardcoded semantic color was introduced.

The typed Theme Studio compatibility matrix is:

| Axis       | Required Q11 behavior                                              |
| ---------- | ------------------------------------------------------------------ |
| Appearance | Light and dark preserve contrast and focus treatment               |
| Canvas     | Balanced, paper, and monochrome preserve neutral hierarchy         |
| Density    | Comfortable, default, compact, and dense preserve control geometry |
| Motion     | Full and reduced preserve state meaning without required animation |

Showroom references are exposed through the generated AI index metadata and
point to `/component-lab#component-lab-editors-builders-ai`, `/components`, and
`/theme-studio`.

## 7. Accessibility, responsive, and power-user behavior

- Editor, builder, inspector, prompt, conversation, citation, and tool-call
  regions expose labelled semantic regions.
- Prompt submission uses a native form and labelled textarea.
- Inspector sections use native `details`/`summary` disclosure behavior.
- Messages and citations retain ordered reading order; statuses are readable
  text and are not communicated by color or motion alone.
- Visible focus treatment is inherited from the canonical token ring.
- Builder stage and inspector stack at compact widths; prompt actions remain
  reachable and long message/source regions can own bounded scroll.
- Keyboard alternatives remain available for every task-critical action; drag
  or canvas gestures are optional consumer affordances.

## 8. Indexing and showroom evidence

- `packages/ai/catalog/components.json`: 173 total entries, 167 canonical
  implemented entries, 6 aliases; all seven Q11 entries include API, states,
  accessibility, responsive, motion, token, relationship, and example
  metadata.
- `generated/agent-index.json` and `packages/agent/generated/agent-index.json`
  expose the `editors-builders-ai` entry point with typed guidance and the
  Component Lab reference.
- Component Lab adds an `Advanced` section and renders the seven surfaces as a
  composition proof; family explorers index them under Forms, Layout, and Data.
- The browser proof route is refresh-safe at
  `http://localhost:4173/component-lab#component-lab-editors-builders-ai`.

## 9. Verification record

| Check                                                                       | Result                                                                                            | Evidence classification                        |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `pnpm contracts:generate`                                                   | PASS; generated 220 projections and refreshed agent index                                         | SOURCE                                         |
| `pnpm test:contracts`                                                       | PASS; typed projection, registry, metadata, and retrieval gate                                    | SOURCE                                         |
| `pnpm test:ai`                                                              | PASS; 29 recipes, 173 components, 12 blocks, 122 semantic icons                                   | SOURCE/catalog                                 |
| `pnpm test:component-system`                                                | PASS; 167 canonical components, 6 aliases                                                         | SOURCE/catalog                                 |
| `pnpm typecheck`                                                            | PASS                                                                                              | BUILD/SOURCE                                   |
| `pnpm package:build`                                                        | PASS                                                                                              | BUILD                                          |
| `pnpm package:verify`                                                       | PASS; 17 root exports and self-contained package assets                                           | PACKAGE                                        |
| `pnpm test:next-consumer`                                                   | PASS; packed install, strict typecheck, Next production build, Playwright, and axe smoke          | PACKED CONSUMER/RUNTIME                        |
| `pnpm exec playwright test tests/q11-editors-builders-ai-poweruser.spec.ts` | PASS; 3 tests                                                                                     | RUNTIME                                        |
| `pnpm test`                                                                 | PASS; repository contract, catalog, package, token, slice, brand, recipe, and bridge gates        | SOURCE/BUILD                                   |
| `pnpm build`                                                                | PASS; playground production build                                                                 | BUILD                                          |
| `git diff --check`                                                          | PASS; only existing CRLF/LF normalization warnings were reported                                  | SOURCE                                         |
| Codex in-app browser Component Lab render                                   | PASS; Q11 Advanced showroom rendered at the required anchor                                       | OBSERVED/RUNTIME                               |
| Codex in-app browser Theme Studio render                                    | PASS; Theme Studio route remained renderable after Q11 changes                                    | OBSERVED/RUNTIME                               |
| `pnpm format:check`                                                         | FAIL; repository-wide existing formatting debt reported 364 files; no mass-formatting was applied | REPOSITORY DEBT / UNVERIFIED FOR GLOBAL FORMAT |

The packed consumer initially exposed a stale assertion for the focus token
(`216 70% 72%`) while the current canonical dark exact-brand theme resolves
focus to `126 44.94% 66.9%`. The consumer proof assertion was aligned to the
current canonical token behavior; the product surface and Q11 engine boundary
were not weakened. The packed proof then passed all three tests.

## 10. Q11 gate

**PASS WITH CONSTRAINTS FOR Q12**

Q11 is complete for the bounded reusable surface set and its evidence gates.
The constraint is intentional: rich editor/document engines, builder and
canvas engines, provider/model/transport policy, tool execution and
authorization, safety, persistence, retrieval ranking, citation trust, and
business permissions remain outside Ten4Seven and require a separately scoped
Q12 decision. Q12 was not started.

**STOP at the Q11 gate.**
