# T7 Component Expansion Q06 — Forms, Selection, Date/Time and Files Evidence

Status: PASS WITH CONSTRAINTS FOR Q07  
Queue: `Q06-FORMS-SELECTION-DATETIME-FILES.md`  
Mode: BOUNDED-WIDE with STRICT accessibility  
Risk: R2  
Date: 2026-09-11

## 1. Scope and authority

Q06 was executed against the attached Q06 work specification and the Q03
normalized coverage ledger. Q05 entered this queue with `PASS WITH CONSTRAINTS
FOR Q06`. Q03 remains the backlog authority: it identified `Cascader` as the
remaining Forms candidate at P2 and confirmed that the other Q06 families were
already represented by canonical contracts or were covered by Q04 delivery.

This queue therefore adds one canonical primitive and hardens the existing
selection, date-range, and file-trigger contracts. It does not create a second
selection model, a second calendar runtime, or product-specific upload
behavior.

The following existing contracts were deliberately reused rather than
duplicated:

- `Input`, `NumberInput`, `CurrencyInput`, `PercentInput`, `Textarea`,
  `SearchInput`, `PasswordInput`, and `OtpInput` for text, numeric, search,
  credential, and verification entry;
- `Select`, `NativeSelect`, `Combobox`, `MultiSelect`, `HierarchyPicker`, and
  `Transfer` for bounded choice and relationship selection;
- `Calendar`, `DatePicker`, `DateRangePicker`, `TimeInput`, `NativeTimeInput`,
  `TimePicker`, and `DateTimeInput` for date/time contracts;
- `FileUpload`, `FileItem`, `FileList`, and the Q04 `FilePreview` contract for
  client-side file handoff.

The Q06 candidate list does not justify new `TreeSelect`, `RangeCalendar`,
`ColorArea`, `ColorSlider`, `SwatchPicker`, `UploadQueue`, `Dropzone`, or
`SignaturePad` identities. Adding those names without a distinct consumer
contract would duplicate existing hierarchy, calendar, color, file, or
consumer-owned behavior.

## 2. Delivery map

| Contract          | Canonical source                | Q06 responsibility                                                                                                                                                  |
| ----------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cascader`        | `packages/ui/src/forms.tsx`     | New nested path selection primitive with a single trigger, portal-owned dialog, level menus, disabled/current/expanded states, and keyboard path traversal.         |
| `MultiSelect`     | `packages/ui/src/forms.tsx`     | Harden the popup listbox with one tabbable owner, `aria-activedescendant`, roving option focus, selection keys, and Escape focus restoration.                       |
| `Transfer`        | `packages/ui/src/forms.tsx`     | Harden both listbox regions with active descendant state, arrow/Home/End navigation, and keyboard selection without making every option independently tabbable.     |
| `DateRangePicker` | `packages/ui/src/date-time.tsx` | Add stable trigger and calendar names, hint/error association, invalid state, and Escape/exclusive-layer focus restoration.                                         |
| `FileUpload`      | `packages/ui/src/files.tsx`     | Make the dropzone a semantic `button`; keep the programmatic file input hidden from the accessibility tree and tab order so the user has one authoritative trigger. |

No new primitive package, donor UI library, parallel popup runtime, or local
consumer-only component family was introduced. `Cascader` is exported through
the existing `forms` barrel and is available from the public `@ten4seven/ui`
boundary.

## 3. Accessibility and interaction proof

### Cascader

- The trigger is a real button with `aria-expanded`, `aria-controls`, an
  accessible label, optional hint/error description, and disabled semantics.
- The popup is a labelled `role="dialog"` containing one `role="menu"` per
  hierarchy level and `role="menuitem"` options.
- Branches expose `aria-haspopup` and `aria-expanded`; selected leaves expose
  `aria-current`; disabled options expose disabled semantics.
- Arrow Up/Down moves within a level; Home/End move to the first/last enabled
  option; Arrow Right opens a branch; Arrow Left returns to its parent; Enter
  and Space commit a leaf or open a branch; Escape closes the layer and returns
  focus to the trigger.
- The initial focus follows the selected path's leaf when a controlled value is
  present, rather than arbitrarily focusing the first child.

### MultiSelect and Transfer

- The popup/listbox owner is the only tabbable listbox surface; option buttons
  use `tabIndex=-1` and are addressed through the active descendant contract.
- Arrow Up/Down/Home/End remain local to the option set. Enter/Space toggles
  the active value. MultiSelect Escape closes the popup and restores trigger
  focus.
- Transfer keeps available and selected regions separate, preserves
  `aria-multiselectable`, and exposes `aria-selected`/`aria-disabled` on each
  option without making the list unreadable to keyboard users.

### Date/time and files

- `DateRangePicker` now supports a trigger label or a stable fallback label,
  optional hint/error association through `aria-describedby`,
  `aria-invalid`, a safe dialog label, and focus restoration after Escape or
  an exclusive floating-layer dismissal.
- `FileUpload` uses one semantic button trigger. Its underlying file input is
  `aria-hidden` and removed from the tab order because it is opened by the
  trigger; this avoids two competing controls for the same action.
- Existing `DatePicker`, `TimePicker`, `DateTimeInput`, `OtpInput`, and file
  preview contracts remain in their canonical implementations and were not
  forked for Q06.

## 4. Token, theme, density, and responsive contract

The implementation follows the primitive → semantic → component token model.
The new Cascader catalog entry uses only canonical roles:
`input-background`, `input-border`, `surface-raised`, `selected`,
`radius-control`, `radius-panel`, `shadow-popover`, `focus-ring`, and
`control-height`.

The Cascader surface consumes the existing overlay geometry, gutter, menu
height, spacing, border, radius, focus-ring, motion, and shadow variables. Its
level menus remain horizontally scrollable when the path is deep; the overlay
width and mobile edge allowance resolve through existing token variables. No
raw palette, semantic status color, local radius scale, or second motion
runtime was added.

The Q06 matrix was checked through the existing Theme Studio controls for
appearance, density, contrast, motion, surface treatment, chart colorway, and
content rail. Forms remain usable in constrained containers: labels and
descriptions remain attached, popup layers stay viewport-safe, and the
semantic triggers preserve touch-target geometry across the shared density
profiles.

## 5. Index, showroom, and AI metadata

- `packages/ai/catalog/components.json` now contains the `Cascader` contract
  with implemented status, Forms taxonomy, API rows, accessibility behavior,
  token roles, responsive/motion notes, alternatives, and composition
  relations.
- `pnpm contracts:generate` regenerated the typed agent index, compact
  projections, component shard, package-agent projections, Theme Studio CSS,
  and DTCG exports. The generator reported 211 contract projections.
- The canonical Forms showroom at `/components/forms` now indexes 31 contracts
  and presents Cascader in the existing “More contracts” group instead of
  creating a new page taxonomy.
- Component Lab continues to prove the existing Forms, Q04 bounded-inputs,
  files, and date-range surfaces in one local interaction harness.
- Theme Studio remains the appearance/density/theme authority; no form-local
  theme controls were added.
- The catalog/component-system gate now reports 166 total component entries:
  160 canonical components and 6 aliases. Q06 intentionally increases the
  canonical count by one for Cascader.

## 6. Verification record

| Check                                                                        | Result        | Evidence                                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm typecheck`                                                             | PASS          | Contracts, native, agent, agent build, and playground typechecks completed after the Q06 source changes.                                                                                                                                                                                       |
| `pnpm package:build`                                                         | PASS          | The distributable `@ten4seven/ui` package rebuilt with Q06 exports and styles.                                                                                                                                                                                                                 |
| `pnpm package:verify`                                                        | PASS          | Self-contained exports, bundled tokens/icons/motion, and published styles verified.                                                                                                                                                                                                            |
| `pnpm test`                                                                  | PASS          | Full contracts, responsive, domain, native, ERP, DTCG, contrast, governance, slice, brand, recipe, token, AI, component-system, and Tailwind bridge chain completed.                                                                                                                           |
| `pnpm build`                                                                 | PASS          | Playground TypeScript/Vite production build completed; only the existing large-chunk advisory was emitted.                                                                                                                                                                                     |
| `pnpm exec playwright test tests/q06-forms-selection-datetime-files.spec.ts` | PASS          | 3 focused tests pass: Cascader path keyboard behavior, MultiSelect/Transfer listbox semantics, and DateRangePicker/FileUpload single-trigger semantics.                                                                                                                                        |
| Codex Browser `/components/forms`                                            | OBSERVED PASS | 31-contract showroom rendered. Cascader opened with two labelled menus; Delivery was focused, ArrowLeft returned to Operations, ArrowRight restored Delivery, Enter closed the dialog, and focus returned to the trigger.                                                                      |
| Codex Browser `/component-lab`                                               | OBSERVED PASS | Component Lab rendered. MultiSelect listbox received focus and Escape restored the trigger; Transfer exposed `tabindex=0` and an `aria-activedescendant`; date range Escape restored its trigger; FileUpload exposed `type=button`, description linkage, and a hidden non-tabbable file input. |
| Codex Browser `/theme-studio`                                                | OBSERVED PASS | Theme Studio rendered with shared recipe/runtime controls, live preview, component canaries, and the same token-driven shell.                                                                                                                                                                  |
| `pnpm test:component-coverage`                                               | PASS          | Seven high-impact selector families verified; 939 raw-pixel occurrences remain explicitly tracked as migration debt.                                                                                                                                                                           |
| `pnpm test:token-governance`                                                 | PASS          | 23 component modules, no raw component colors/palette dependencies/ungoverned timing.                                                                                                                                                                                                          |
| `pnpm format:check`                                                          | CONSTRAINT    | Repository-wide Prettier check reports 367 pre-existing/unrelated files requiring formatting. Q06 source, test, catalog, and evidence files were targeted-formatted; no mass-format was applied.                                                                                               |
| `git diff --check`                                                           | PASS          | No whitespace errors; Git only reported existing CRLF normalization warnings for unrelated dirty files.                                                                                                                                                                                        |

## 7. Evidence classification and boundary

- **SOURCE:** canonical Forms/date-time/files implementations, token roles,
  catalog metadata, generated projections, showroom/Component Lab fixtures,
  and the focused Q06 test.
- **RUNTIME:** rebuilt UI package, full repository gates, focused Playwright
  proof, and the playground production build.
- **OBSERVED:** Codex Browser route rendering and keyboard/focus behavior on
  the Forms showroom, Component Lab, and Theme Studio.
- **UNKNOWN / UNVERIFIED:** downstream production adoption, native renderer
  integration, backend file transport/storage, authorization policy, and
  product-specific validation meaning. Q06 is a canonical library and proof
  delivery, not a claim of product-wide migration.

The worktree was already dirty with prior queue and branch changes. No reset,
clean, commit, push, merge, branch deletion, or deployment was performed. The
current branch/SHA at evidence time is:

```text
codex/icons-curated-solar-style
e582cfcfbe0f077d1a5832d86db9da1898487fd3
feat(q14): restore fluid navigation and responsive shell hardening
```

Q06 changes are intentionally left in the shared worktree for the user to
review and commit according to the existing branch plan.

PASS WITH CONSTRAINTS FOR Q07
