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
The stylesheet still contains **795** literal pixel measurements. That
count includes legitimate intrinsic geometry (hairlines, icon/media boxes,
and browser normalization) as well as unmigrated component-internal spacing.
It is tracked as migration debt rather than treated as proof that every
measurement is semantically governed. New generic geometry must be added to
`packages/tokens/src/theme.ts` and consumed by a component before it is
considered canonical.
