# ten4seven UI

`ten4seven UI` is a reusable, AI-first UI system extracted from the supplied AAPM design-system material and generalized into a deterministic runtime.

The repository currently contains:

- Phase 0 forensic inventories under `research/00-inventory/`.
- The AAPM-to-generic extraction map under `research/01-extraction/`.
- Architecture decisions under `docs/adr/`.
- A CSS-variable theme engine with appearance, palette, radius, density, and typography axes.
- A semantic typography system with local Inter variable WOFF2, optical sizing, and a live Theme Studio specimen.
- A React + Vite playground that proves the same axes across Button, Input, Card, DataTable, Modal, Sidebar item, and typography surfaces.
- Two production reference surfaces in the playground: Warehouse Inventory (`enterprise/entity-list`) and Ebook Store Catalog (`commerce/catalog`).
- Deterministic refresh-safe reference URLs: `/theme-studio`, `/warehouse-inventory`, and `/ebook-store`.
- Production QA and Gate C evidence under `research/04-production/`.
- A local semantic icon package with no runtime Iconify CDN.
- An AI application kit under `docs/ai/`, `packages/ai/`, and `skills/ten4seven-ui/`.

## Run

```bash
pnpm install
pnpm inventory
pnpm dev
```

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
