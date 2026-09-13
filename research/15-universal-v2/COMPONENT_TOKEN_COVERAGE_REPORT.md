# Component token coverage report

Generated from `packages/ui/src/styles.css` by
`scripts/generate-component-token-coverage.mjs`. It is a static
contract-coverage check for high-impact canonical selector families, not a
replacement for browser state or visual QA.

| Component       | Color semantic coverage | Spacing semantic coverage | Radius coverage | Typography coverage | Motion coverage | State coverage |
| --------------- | ----------------------- | ------------------------- | --------------- | ------------------- | --------------- | -------------- |
| Button          | Present                 | Present                   | Present         | Present             | Present         | Present        |
| Input / Select  | Present                 | Present                   | Present         | Present             | Present         | Present        |
| Card            | Present                 | Present                   | Present         | Present             | Present         | Present        |
| Table           | Present                 | Present                   | Present         | Present             | Present         | Present        |
| Modal           | Present                 | Present                   | Present         | Present             | Present         | Present        |
| Drawer          | Present                 | Present                   | Present         | Present             | Present         | Present        |
| Navigation item | Present                 | Present                   | Present         | Present             | Present         | Present        |

## Scope and residual debt

All listed selector families expose the expected semantic token vocabulary.
The stylesheet still contains **742** literal pixel measurements. That
count includes legitimate intrinsic geometry (hairlines, icon/media boxes,
and browser normalization) as well as unmigrated component-internal spacing.
It is tracked as migration debt rather than treated as proof that every
measurement is semantically governed. New generic geometry must be added to
`packages/tokens/src/theme.ts` and consumed by a component before it is
considered canonical.

## Repository-wide style governance

The companion hardcoded-style inventory scans active Web, Native, contract,
playground, and consumer surfaces. It is governed by
`scripts/token-governance-allowlist.json`; an exception must carry an owner,
class, and reason rather than silently widening the token surface.

| Metric                               | Result |
| ------------------------------------ | ------ |
| Raw color findings                   | 1224   |
| Raw spacing findings                 | 325    |
| Raw padding findings                 | 307    |
| Raw margin findings                  | 74     |
| Raw gap findings                     | 69     |
| Raw size findings                    | 328    |
| Raw control-size findings            | 0      |
| Raw radius findings                  | 109    |
| Raw typography findings              | 992    |
| Raw shadow/elevation findings        | 39     |
| Raw opacity findings                 | 23     |
| Raw motion findings                  | 183    |
| Raw z-layer findings                 | 99     |
| Raw icon/media-size findings         | 0      |
| Raw native style findings            | 0      |
| Approved exceptions                  | 1344   |
| Demo/reference literals under review | 900    |
| TOKENIZABLE_UNRESOLVED               | 0      |
| DEMO_LOCAL_THEME_SYSTEMS             | 0      |
| NATIVE_PARALLEL_THEME_SYSTEMS        | 0      |
| DUPLICATE_GLOBAL_TOKEN_AUTHORITIES   | 0      |
