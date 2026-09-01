# Design Lineage Reference Inventory

Status: **COMPLETE — advisory research only**  
Verified: 2026-09-01

## Purpose and boundary

This inventory records the original design research that informed ten4seven UI.
The references are evaluated for principles of quality, composition, component
maturity, and task fitness. They are not copied into runtime, installed as
dependencies, or treated as a competing visual system.

## References actually inspected

| Reference                        | Access and evidence inspected                                         | What was used as a quality benchmark                                                                                                | Runtime decision                                                                             |
| -------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| AAPM Design System 0826          | Local root `readme.md`, ERP and Academy kit READMEs, design thumbnail | Indonesian-first operational language, task-first ERP composition, green/terracotta brand restraint, Academy split auth composition | Architectural seed only; no AAPM component or asset is imported.                             |
| AAPM Layer Academy               | Rendered `https://staging.aapmlayeracademy.id/login`                  | Calm white form pane, strong documentary media panel, restrained green action, editorial quote, whitespace and split balance        | Art-direction benchmark for the `aapm-academy` BrandProfile only; no layout or media copied. |
| HeroUI                           | Local Pro README and rendered official Button documentation           | Control anatomy, state confidence, keyboard/focus behavior, overlay restraint, documentation clarity                                | No `@heroui` package or source import.                                                       |
| Hero Native UI                   | Local README/package presence inspected                               | Touch ergonomics, compact control safety, sheet/drawer behavior, responsive state transitions                                       | Mobile principles are tested through ten4seven's own control geometry and overlay tests.     |
| Minimal UI JavaScript/TypeScript | Local root structure and TypeScript README inspected                  | Application-shell quality, dashboard rhythm, side-nav/main proportion, calm data density                                            | Composition benchmark only; no Minimal source import.                                        |
| shadcnblocks sources             | Local package/readme/template structure inspected                     | Block breadth, public composition variety, content and CTA anatomy                                                                  | No shadcn runtime/package import; no donor block copied.                                     |
| GetPress                         | Rendered `https://getpress.co.id/` home surface                       | Content-first browsing, publishing discovery, category/search flow, Indonesian commerce rhythm                                      | Domain-composition benchmark for Ebook Store only; no visual implementation copied.          |
| shadcnblocks Figma kit           | Local `.fig` file was present but intentionally not opened            | Availability recorded only                                                                                                          | Not used as a second visual source of truth.                                                 |

## Access limitations recorded truthfully

- The local AAPM Academy and ERP kit `index.html` files exist, but direct
  `file://` rendering was blocked by the browser security policy. No workaround
  was attempted. Their supplied READMEs remain the inspected local evidence.
- The AAPM Academy authenticated application surfaces were not inspected. Only
  the public login reference was rendered.
- Minimal and Hero Native were not launched as separate donor applications.
  Their local source/README information was used for principle-level review,
  while ten4seven's own responsive and component evidence remains authoritative.

## Provenance and dependency check

The workspace package manifests and application/package source were searched
for HeroUI, MUI, Radix, and shadcn imports. No such dependency or source import
exists. `@iconify-json/solar` exists only as a development-time local icon-data
source for `@ten4seven/icons`; `T7Icon` renders the generated local SVG bodies
through ten4seven's semantic names and does not depend on an Iconify CDN or
provider at application runtime.

## Reference priority for conflicts

When references disagree, the following ten4seven order remains binding:

1. usability;
2. accessibility;
3. semantic design-system ownership;
4. domain task fitness;
5. ten4seven architecture;
6. composition quality; and
7. advisory reference aesthetic.

This prevents a desirable donor aesthetic from overriding canonical behavior,
mobile safety, or AI-native contract determinism.
