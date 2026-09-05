# Propagation QA

Date: 5 September 2026  
Runtime: `http://127.0.0.1:4173`  
Profile used for the isolated capture: light, emerald, balanced paper,
spectrum charts, rounded radius, comfortable density, modern typography, soft
elevation, more contrast and full motion with a 1.25s authored anchor.

## Route matrix

Each route returned HTTP 200, rendered its main content, resolved the expected
provider profile and reported `0px` horizontal overflow in the after capture.

| Route                   | Result | After evidence                                       |
| ----------------------- | ------ | ---------------------------------------------------- |
| `/tokens`               | PASS   | `evidence/after/tokens-top.png` plus family captures |
| `/theme-studio`         | PASS   | `evidence/after/theme-studio-top.png`                |
| `/component-lab`        | PASS   | `evidence/after/component-lab-top.png`               |
| `/components`           | PASS   | `evidence/after/components-top.png`                  |
| `/blocks`               | PASS   | `evidence/after/blocks-top.png`                      |
| `/recipes`              | PASS   | `evidence/after/recipes-top.png`                     |
| `/operations-tracker`   | PASS   | `evidence/after/operations-tracker-top.png`          |
| `/operational-patterns` | PASS   | `evidence/after/operational-patterns-top.png`        |
| `/ebook-store`          | PASS   | `evidence/after/ebook-store-top.png`                 |
| `/public-showcase`      | PASS   | `evidence/after/public-showcase-top.png`             |

## What was checked

- Operations Tracker retains expressive colored KPI cards, semantic status
  treatment and operational density.
- Publishing Store retains its editorial/catalog identity rather than inheriting
  an operations dashboard composition.
- Public Showcase retains a public/marketing composition and selective expressive
  color rather than becoming a private-workspace shell.
- Theme Studio and Component Lab remain system/harness surfaces and continue to
  expose the shared theme and component contracts.
- The token route document order matches the token-family navigation order.
- `/tokens` displays resolved color values, measured typography, resolved motion,
  distinct elevation shadows/z-index values, viewport roles, interaction roles,
  icon roles and chart roles.

## Evidence boundaries

The captures prove propagation and route stability for the selected profile; they
are not a claim that every possible theme-axis Cartesian product was rendered.
The independent-axis matrix in `tests/global-foundation.spec.ts` covers the
high-risk combinations selected by the DWO.
