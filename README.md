# Ten4Seven

Ten4Seven is a universal design system for React Web and Expo/React Native:
one design language, one typed contract plane, one token source, one canonical
catalog, and platform-specific renderers. Components, Blocks, and Recipes cover
public sites, commerce, authentication, dashboards, forms, operational/data
workspaces, and mobile field interfaces.

Web is the complete renderer. Native is a **partial renderer** with real
foundations, forms, sheets, list/detail, feedback, and conversational surfaces.
Check the declared support below before selecting a platform-specific feature.

## Install and run

The repository is public. Package redistribution remains owner-controlled under
the existing [license](packages/ui/LICENSE.md); private/UNLICENSED metadata
prevents accidental registry publication. Public readiness means technical
package, source, and documentation readiness for authorized consumers. It does
not grant a new open-source license. The copyright owner must decide any
broader license before redistribution or registry publication.

Repository development requires Node >=22.12 and pnpm 11:

```bash
pnpm install --frozen-lockfile
pnpm contracts:generate
pnpm dev
```

Authorized Web consumers install the self-contained artifact. It includes
the token runtime, semantic icons, motion, fonts, CSS, and declarations;
React and React DOM remain peers.

```bash
# In this repository
pnpm package:build
pnpm package:verify
pnpm --filter @ten4seven/ui pack --pack-destination ../../artifacts

# In a React application; use the path to your built artifact
pnpm add ../ten4seven-ui/artifacts/ten4seven-ui-1.0.0.tgz
```

## Web quickstart

```tsx
import "@ten4seven/ui/styles.css";
import { Button, Card, Ten4SevenProvider } from "@ten4seven/ui";

export function App() {
  return (
    <Ten4SevenProvider
      theme="product"
      preferences={{ appearance: "system", density: "default" }}
    >
      <Card>
        <Button leadingIcon="check" onClick={() => console.log("Save intent")}>
          Save changes
        </Button>
      </Card>
    </Ten4SevenProvider>
  );
}
```

For Next.js, import CSS in the server layout and put the provider in a small
consumer-owned `"use client"` wrapper. The root UI entry is client-bound;
no `@ten4seven/ui/server` path is advertised. See the verified
[Next.js guide](docs/integration/NEXTJS_APP_ROUTER_COMPATIBILITY.md) and the
[Web package guide](packages/ui/README.md).

## Expo / Native quickstart

Build and pack the Native renderer, then install it in an existing Expo app:

```bash
# In this repository
pnpm --filter @ten4seven/native build
pnpm --filter @ten4seven/native verify
pnpm --filter @ten4seven/native pack --pack-destination ../../artifacts

# In an existing Expo application
pnpm add ../ten4seven-ui/artifacts/ten4seven-native-0.1.0.tgz
pnpm exec expo install react-native-safe-area-context
```

```tsx
import {
  NativeButton,
  NativeContainer,
  NativeScreen,
  NativeThemeProvider,
} from "@ten4seven/native/renderer";

export default function App() {
  return (
    <NativeThemeProvider profile="neutral-product" appearance="system">
      <NativeScreen>
        <NativeContainer>
          <NativeButton onPress={() => console.log("Save intent")}>
            Save changes
          </NativeButton>
        </NativeContainer>
      </NativeScreen>
    </NativeThemeProvider>
  );
}
```

Native consumes JS/TS theme values from the same typed source without parsing
CSS. Use `@ten4seven/native` for adapters and `@ten4seven/native/renderer`
for components. No consumer needs source-internal imports or workspace packages.
The [Native guide](packages/native/README.md) covers safe areas, font scaling,
reduced motion, adaptive components, and device capability boundaries.

## Declared platform support

| Surface              | Verified boundary                                                | Limitations                                                                      |
| -------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| React Web / Vite SPA | Package, types, build and browser canaries                       | Responsive desktop/mobile Web; React >=18.2 peer contract                        |
| Next.js App Router   | Packed Next 16 / React 19 consumer                               | Client provider boundary; see the versioned fixture                              |
| Expo / React Native  | Bundled package/types and Native Lab; Expo 57 / RN 0.86 consumer | Partial renderer; capability presentation is separate from device integration    |
| Android              | Earlier bounded development-client emulator canary               | Physical-device, release-build and full accessibility coverage remain unverified |
| iOS                  | Shared source/package/Expo contract                              | **Runtime-unverified**; no Apple simulator/device claim                          |

Adaptive intent survives renderer changes: Select popup → sheet/list; Dialog →
Native modal/sheet; DataTable and MasterDetail → list/detail; Tooltip → explicit
press/help; file input → consumer document/image/camera source; Date/Time →
platform picker integration. Applications own routing, permissions, networking,
persistence, device providers, domain rules, and business truth.

## Design language and discovery

Token ownership is FOUNDATION → SEMANTIC → LAYOUT → COMPONENT → PRODUCT PROFILE
→ SCOPE. Resolution is defaults → recipe → profile → theme override → scoped
override → component state. CSS, Native values, and AI projections derive from
that typed source. Size, density, measure, and layout remain separate axes.

- [Tokens and ownership](docs/TOKENS.md), [theming/scopes](docs/THEMING.md),
  and [theme recipes](docs/THEME_RECIPES.md).
- Components are semantic primitives; Blocks compose reusable sections;
  Recipes describe page structure; Product Profiles change presentation.
  Browse `/components`, `/blocks`, `/recipes`, and `/component-lab` locally.
- [AI quickstart](docs/ai/AI_QUICKSTART.md),
  [new projects](docs/ai/NEW_PROJECT.md), and
  [existing applications](docs/ai/APPLY_TO_EXISTING_WEB.md).
- [Design Taste and Uniformity](skills/ten4seven-design-taste/SKILL.md) covers
  visual judgment, hierarchy, proportion, density, and responsive composition;
  [contribution and governance](docs/CONTRIBUTING.md) covers canonical-layer
  changes and release boundaries.
- Agents start with `generated/agent-index.json`, compact projections, and
  selected shards. `pnpm t7ui find "searchable selection"` retrieves canonical
  choices. `@ten4seven/agent` distributes those generated decisions.
- Components carry keyboard/focus, selected/disabled/loading/invalid state,
  accessible-name, reduced-motion and responsive obligations. Consumers supply
  meaningful labels, logical content order, and domain validation.
- Advanced editor, map, scheduling and other engines attach behind semantic
  boundaries. Engine execution and installation remain consumer-owned.

## Package responsibilities and verification

Contracts own meaning; Tokens resolve values; Icons own semantic glyph mapping;
UI renders DOM/CSS; Native renders React Native primitives; Agent distributes
retrieval projections; AI provides the local catalog CLI. Contracts, Tokens and
Icons are workspace source layers bundled into consumer artifacts. Blocks and
Recipes reuse canonical primitives; product profiles do not fork them.

```bash
pnpm typecheck
pnpm test
pnpm test:public-ready
pnpm build
pnpm package:build
pnpm package:verify
pnpm --filter @ten4seven/native build
pnpm --filter @ten4seven/native verify
```

The [closure evidence](docs/aapm/T7-PUBLIC-READY-CLOSURE-001-EVIDENCE.md) records
acceptance and limitations. Historical AAPM extraction and donor provenance
remain under `research/` and `docs/aapm/`; no donor checkout or knowledge of
that history is required to consume Ten4Seven. Third-party notices remain with
the [Web artifact](packages/ui/THIRD_PARTY_NOTICES.md).
