# Contributing to Ten4Seven

Ten4Seven is maintained as one universal design system for React Web and
Expo/React Native. Contributions should preserve the shared language while
allowing each product surface to use the composition that fits its work.

## Change the canonical layer

Use the nearest existing contract before adding code:

1. Read `generated/agent-index.json` and the compact catalog projections.
2. Select an implemented component, Block, or Recipe through the AI/catalog
   workflow.
3. Put shared meaning in `packages/contracts/src` and shared resolved values in
   `packages/tokens/src/theme.ts`.
4. Let the generators produce Web, Native, DTCG, and agent projections.
5. Render through `packages/ui` or `packages/native`; keep route-specific
   arrangement in a narrow documented composition exception.

Do not create a parallel primitive, theme runtime, token scale, semantic icon
registry, or donor-library API. If the need is genuinely shared, treat it as a
design-system gap and update the canonical contract, implementation, catalog,
tests, and provenance together. Use the [Design Taste and Uniformity
skill](../skills/ten4seven-design-taste/SKILL.md) for proportionality,
hierarchy, responsive recomposition, and ownership judgment.

## Verification

For a normal Web or contract change, run the relevant cheap checks first and
then the complete bounded sequence:

```bash
pnpm contracts:generate
pnpm themes:generate
pnpm tokens:generate
pnpm typecheck
pnpm test:token-governance
pnpm test:component-coverage
pnpm test:consistency
pnpm test:component-system
pnpm test:ai
pnpm test:native-mobile
pnpm test:native-expo
pnpm test:public-ready
pnpm test
pnpm build
pnpm package:build
pnpm package:verify
pnpm --filter @ten4seven/native build
pnpm --filter @ten4seven/native verify
git diff --check
```

Run targeted browser QA for the affected route at representative desktop,
tablet, and mobile sizes. Check initial readability, settled state, reduced
motion, keyboard/focus behavior, console/page errors, and horizontal overflow.
Touched files must pass the repository's Prettier check. Existing unrelated
formatting debt is not a reason to rewrite the repository.

## Public boundaries and release governance

`@ten4seven/ui` and `@ten4seven/native` are the packable consumer boundaries.
Contracts, Tokens, Icons, Agent, and AI remain private workspace/source or
tooling layers and are bundled or projected through their documented
boundaries. Consumers must not import repository `src` paths.

The packages remain owner-controlled and private/UNLICENSED where their
manifests say so. This repository does not invent or change a software license.
Registry publication, redistribution, versioning, and release approval remain
owner decisions. A technical package proof is not a publication authorization.

Keep generated projections, canonical evidence, stable fixtures, and third-party
notices. Do not add browser logs, traces, test-results, local credentials,
machine-specific configuration, or temporary screenshots to the repository.
