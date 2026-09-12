# ten4seven UI

`ten4seven UI` is a reusable, AI-first UI system extracted from the supplied AAPM design-system material and generalized into a deterministic runtime.

The repository currently contains:

- Phase 0 forensic inventories under `research/00-inventory/`.
- The AAPM-to-generic extraction map under `research/01-extraction/`.
- Architecture decisions under `docs/adr/`.
- A CSS-variable theme engine with appearance, palette, independent primary/accent sources, canvas, chart colorway, radius, density, and typography axes.
- A native `t7Motion` contract with one global duration axis, semantic easing
  roles, viewport-gated reveals, subtle pointer-origin feedback, and one
  reduced-motion policy.
- A semantic typography system with local Inter variable WOFF2, optical sizing, and a live Theme Studio specimen.
- A React + Vite playground that proves the same axes across Button, Input, Card, DataTable, Modal, Sidebar item, and typography surfaces.
- Three production-looking reference surfaces in the playground: Operations
  Tracker (`enterprise/entity-list`), the bounded AAPM Operational Patterns
  adoption fixture, and Ebook Store Catalog (`commerce/catalog`).
- Deterministic refresh-safe reference URLs: `/theme-studio`,
  `/operations-tracker`, `/operational-patterns`, and `/ebook-store`.
- Production QA and Gate C evidence under `research/04-production/`.
- A local semantic icon package with no runtime Iconify CDN.
- An AI application kit under `docs/ai/`, `packages/ai/`, and `skills/ten4seven-ui/`.

## Universal contract plane and package graph

Ten4Seven has one semantic source of truth and platform-specific renderers.
The typed contracts under `packages/contracts/src/` own component intent,
states, accessibility obligations, platform strategy, theme profiles, motion
roles, recipes, blocks, and aliases. The generated files under `generated/`
and `packages/agent/generated/` are deterministic retrieval and distribution
projections; they are not a second hand-maintained decision manifest. Run
`pnpm contracts:generate` after changing the typed source.

The package responsibilities are intentionally separated:

- `@ten4seven/contracts` is the typed contract plane.
- `@ten4seven/tokens` resolves the renderer-neutral theme and projects Web CSS
  plus JS/TS values from that same contract.
- `@ten4seven/ui` is the self-contained Web DOM/CSS renderer and the private
  Web consumer artifact.
- `@ten4seven/native` is the React Native/Expo contract adapter and bounded
  native renderer. It consumes resolved JS/TS theme values and never parses
  CSS; it is currently a private source workspace package rather than a
  published native artifact.
- `@ten4seven/agent` packages generated projections and deterministic
  retrieval helpers; `@ten4seven/ai` provides the local `t7ui` catalog CLI.

Blocks and recipes compose canonical components, while product profiles and
`ThemeScope` provide bounded semantic variation. They are not parallel
primitive libraries. Web and native share meaning, token roles, state and
accessibility contracts, and adaptive intent; they do not share DOM or React
Native implementation code. The Expo Native Lab is a source-level consumer
proof and Web export harness today. Android/iOS device runtime proof and a
publishable native package remain explicit release gates, not implied by the
Web package build.

## Run

```bash
pnpm install
pnpm inventory
pnpm dev
```

## Private commercial package

The canonical consumer artifact is the self-contained `@ten4seven/ui`
package. It includes the React components, provider/theme runtime, tokens,
semantic icons, motion runtime, Inter variable font, declarations, and CSS in
one local tarball. It remains private and is not published to a registry.

```bash
pnpm package:release
pnpm add ./artifacts/ten4seven-ui-1.0.0.tgz
```

The generated artifact and its licensing boundary are documented in
[packages/ui/README.md](packages/ui/README.md),
[packages/ui/LICENSE.md](packages/ui/LICENSE.md), and
[packages/ui/THIRD_PARTY_NOTICES.md](packages/ui/THIRD_PARTY_NOTICES.md).
React and React DOM remain peer dependencies so consuming applications keep
one React runtime. For the standalone Next.js 16 / React 19 App Router proof,
see [NEXTJS_APP_ROUTER_COMPATIBILITY.md](docs/integration/NEXTJS_APP_ROUTER_COMPATIBILITY.md).

Provider forms supported by the proof package:

```tsx
<Ten4SevenProvider palette="emerald" radius="soft" density="default" typography="modern">
  <App />
</Ten4SevenProvider>

<Ten4SevenProvider theme={{ palette: "blue", density: "compact" }}>
  <App />
</Ten4SevenProvider>

<Ten4SevenProvider
  theme={{
    typography: {
      preset: "modern",
      ui: '"Brand Sans", sans-serif',
    },
  }}
>
  <App />
</Ten4SevenProvider>
```

## AI application

Start with [docs/ai/AI_QUICKSTART.md](docs/ai/AI_QUICKSTART.md). The catalogs are designed for retrieval without opening donor repositories. For a deterministic local lookup:

```bash
pnpm t7ui info
pnpm t7ui find "inventory list"
pnpm t7ui show DataTable
```

Follow **theme first, component second, local override last**.

Quality gates:

```bash
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
```

Donor folders under `D:\SA\ASSET` are read-only references. No donor source or brand asset is required at runtime by this repository.
