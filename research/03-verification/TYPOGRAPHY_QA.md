# Typography QA

Status: PASS for the current Theme Studio proof surface.

## Target flow

`Theme Studio -> change typography/density -> inspect live Typography Specimen and canonical component proof -> open and close modal`

## Source and loading evidence

- Default family remains Inter.
- The source archive is `C:\Users\syste\Downloads\inter.zip` (`D3E90911DD60CE2DE0D63BBA64FFBCEFED2396E340D6735A12FB5875E8330A69`).
- The selected archive member is `variable/inter-latin-opsz-normal.woff2`, copied to `packages/tokens/src/fonts/Inter-Variable.woff2`.
- The selected WOFF2 SHA-256 is `2C295D99E26DCF357D4D01BCF270FD6924B600C9A13DD8C363EF114F4C6976FA`.
- The selected Latin variable build supplies the requested `wght` and `opsz` axes; `Inter-OFL.txt` is kept beside the font asset.
- The local `@font-face` rule declares `font-weight: 100 900` and `font-display: swap`.
- Browser `document.fonts.status`: `loaded`.
- Browser `document.fonts.check('14px "Inter"')`: `true`.
- Provider computed family: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- Provider optical sizing token: `auto`.
- Production build emits a hashed local `Inter-Variable*.woff2` asset; no font CDN is used.

## Semantic role calibration

| Surface       | Role                 | Size / leading | Weight    | Tracking |
| ------------- | -------------------- | -------------- | --------- | -------- |
| Page title    | `display-lg`         | 32px / 36px    | 600       | -0.03em  |
| Section title | `heading-lg`         | 20px / 26px    | 600       | -0.03em  |
| Card title    | `card-title`         | 15px / 20px    | 600       | -0.03em  |
| Body          | `body`               | 14px / 20px    | 400       | 0        |
| Field label   | `label`              | 13px / 18px    | 500       | 0        |
| Button        | `button`             | 14px / 20px    | 550       | -0.005em |
| Navigation    | `nav` / `nav-active` | 14px / 20px    | 500 / 600 | 0        |
| Table header  | `table-header`       | 10px / 14px    | 550       | 0.12em   |
| Table cell    | `table-cell`         | 12px / 18px    | 400       | 0        |
| Large metric  | `metric-lg`          | 30px / 34px    | 600       | -0.03em  |
| Overline      | `overline`           | 10px / 14px    | 600       | 0.16em   |

## Rendered checks

| Check                                   | Result                                                                                                                                |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Desktop first viewport                  | PASS; page title, controls, active profile, and specimen render coherently                                                            |
| Global Controls vertical rhythm         | PASS; controls card no longer stretches to the profile card; active profile is compacted into a two-column value grid on wide layouts |
| Typography Specimen                     | PASS; display, headings, body, labels, controls, tabs, navigation, table data, currency, percentage, dates, and metric are visible    |
| Mobile 390x844                          | PASS; no horizontal overflow, specimen remains in document flow, controls stack cleanly                                               |
| Light appearance                        | PASS                                                                                                                                  |
| Dark / alternate typography interaction | PASS; Typography select changed provider state and computed family before returning to modern                                         |
| Default / compact density contract      | PASS; existing density axis remains provider-driven                                                                                   |
| Modal interaction                       | PASS; opens through `Open dialog`, closes through the visible `Close dialog` control                                                  |
| Console errors and warnings             | PASS; none observed after reload and interactions                                                                                     |
| Static gates                            | PASS; `format:check`, `typecheck`, `test` (2 tests), and serialized `build`                                                           |

## Intentional boundaries

- The default remains one-font Inter mode; no second display family was introduced.
- Only the Latin variable normal WOFF2 is shipped because current canonical proof components do not require italic.
- The existing appearance, palette, radius, density, elevation, and provider object-form architecture remains intact.
- Typography changes are token and canonical-component changes; Theme Studio layout changes are limited to reducing stretch and adding the evaluation surface.
