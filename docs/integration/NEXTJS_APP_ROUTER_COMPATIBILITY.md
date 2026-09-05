# Next.js App Router / React Server Components compatibility

Work item: `T7UI-NEXT-001`  
Package: `@ten4seven/ui`  
Status: **verified for the bounded artifact consumer; adoption remains conditional on the license boundary**

This document is the cold-start integration contract for a production Next.js
App Router application consuming the packed `@ten4seven/ui` artifact. It is a
compatibility and packaging proof, not a product template or a redesign of the
ten4seven UI language.

## Decision in one page

The current package has one intentionally client-marked root entry. The root
barrel contains the provider and the existing interactive implementation graph
(hooks, refs, DOM events, portals, and browser APIs), so the smallest truthful
contract is:

- keep the existing root imports, such as `Button`, `T7Icon`, and
  `Ten4SevenProvider`, backward-compatible;
- preserve the `"use client"` directive in both packed ESM and CJS entry files;
- keep the application route itself server-rendered;
- put the provider and interactive ten4seven usage behind an explicit
  consumer-owned Client Component wrapper;
- import CSS from the package in the server layout;
- do not advertise a `/server` subpath until a separate canonical server-safe
  implementation exists.

This follows the Next.js Server/Client Component model: a package entry that
depends on client-only features should declare its client boundary, while a
Server Component can render that client component with serializable props. See
the [Next.js Server and Client Components documentation](https://nextjs.org/docs/app/getting-started/server-and-client-components).

## Verified target matrix

The following versions were resolved from the repository host during this
work item and pinned in the standalone proof application:

| Runtime or tool   | Verified version    |
| ----------------- | ------------------- |
| Node.js           | `24.19.0`           |
| pnpm              | `11.22.0`           |
| Next.js           | `16.3.4`            |
| React / React DOM | `19.2.8` / `19.2.8` |
| TypeScript        | `5.9.3`             |
| Playwright        | `1.62.1`            |
| axe-core          | `4.13.0`            |

Next.js 16 uses the current React release line and App Router as its primary
architecture; the [Next.js 16 release notes](https://nextjs.org/blog/next-16)
describe the React 19.2 feature baseline used by this proof. Future Next,
React, or Node upgrades require rerunning the packed-artifact proof rather than
inheriting this result.

The version check used package-manager metadata (`pnpm view next@16 version`,
`pnpm view react@19.2 version`, and `pnpm view typescript@5.9 version`) plus the
local `node --version` and `pnpm --version` commands. The labels below keep
source facts, runtime observations, normalized contract decisions, and open
inferences distinct:

- **SOURCE:** manifests and modules under `packages/ui/src`,
  `packages/ui/package.json`, the package build/verify scripts, and the
  standalone consumer fixture.
- **RUNTIME:** the versioned commands and the production Next/Playwright run
  on 2026-09-03.
- **OBSERVED:** the packed tarball installed, built, and rendered without the
  failures covered by the proof assertions.
- **NORMALIZED:** the root `"use client"` directive, `clientBoundary: "root"`
  metadata, and the documented Server-layout/client-wrapper composition.
- **INFERRED:** the same root client-boundary contract should hold for a Farm
  route using the same package artifact and serializable props; this is not a
  claim about untested Farm business flows.
- **UNKNOWN:** authorization under the current internal license and behavior
  of future React/Next releases.
- **UNVERIFIED:** the browsers, operating systems, streaming routes, and
  registry delivery listed in the limitations below.

## Recommended application composition

`consumer-tests/next-app-router-consumer/` is the minimal external-style
consumer. Its layout and route intentionally have different responsibilities:

```tsx
// app/layout.tsx — Server Component (no "use client")
import "@ten4seven/ui/styles.css";
import "./proof.css";

import ClientProvider from "./client-provider";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
```

```tsx
// app/client-provider.tsx
"use client";

import { Ten4SevenProvider } from "@ten4seven/ui";

export default function ClientProvider({ children }: PropsWithChildren) {
  return (
    <Ten4SevenProvider
      appearance="system"
      palette="emerald"
      primary="emerald"
      accent="orange"
      typography="modern"
    >
      {children}
    </Ten4SevenProvider>
  );
}
```

```tsx
// app/page.tsx — remains a Server Component
import { Button } from "@ten4seven/ui";
import ClientDemo from "./client-demo";

export default function Page() {
  return (
    <main>
      <Button intent="quiet">Server-tree action</Button>
      <ClientDemo />
    </main>
  );
}
```

`client-demo.tsx` begins with `"use client"` and owns state, controlled input,
select/listbox, modal, theme actions, and the semantic icon. A real product can
put the wrapper at its root layout or at a narrower interactive island. Do not
add `"use client"` to the whole route only to make the package resolve.

## Public package and RSC boundary

### Source observations

`packages/ui/src/index.ts` re-exports the provider, components, forms,
navigation, date/time, overlays, blocks, charts, motion, tokens, and icons.
The inspected modules use React hooks and browser-facing behavior, including
`window`, `localStorage`, `matchMedia`, `document`, refs, event listeners,
portals, and native dialog effects.

### Decision

Option A — a client-only root entry — is the smallest robust contract today.
The build preserves `"use client"` as the first statement in `dist/index.js` and
`dist/index.cjs`, and `packages/ui/scripts/verify-package.mjs` fails if either
entry loses that directive. The generated `dist/package-build.json` records
`clientBoundary: "root"` for machine-readable handoff evidence.

Option B (separate `@ten4seven/ui/server` and `/client` exports) was considered
but rejected for this bounded change: there is no existing canonical server-safe
component layer to put behind `/server`, and inventing one would create a
second contract without reducing the current root graph. Option C (adding
directives to individual implementation files) was also considered; it would
require a broad module-by-module graph audit and would make the current barrel
look server-safe when many re-exports are not. These options remain future
architecture work, not a silent breaking change here.

The existing import contract remains valid:

```tsx
import { Button, T7Icon, Ten4SevenProvider } from "@ten4seven/ui";
```

There is no breaking import change and no `/server` subpath in this release.
Rendering a root-exported `Button` from a Server Component is supported by the
Next composition model; stateful/provider usage still belongs in the explicit
client graph.

## Theme, provider, and hydration semantics

`Ten4SevenProvider` is the client runtime. Its browser reads are guarded and
its system appearance bootstrap is deterministic:

- the server render and first client render use `light` as the temporary
  system appearance;
- an effect reads `matchMedia("(prefers-color-scheme: dark)")` after hydration
  and subscribes to changes;
- explicit `light` and `dark` settings do not depend on a browser API;
- the provider emits one `#t7-overlay-root` inside its provider element;
- `appearance="system"` therefore may update once after hydration, but it does
  not require a server/client markup mismatch.

Persistence is an opt-in escape hatch. When `persistenceKey` is provided, the
provider now initializes persisted overrides to `{}` and reads `localStorage`
in an effect after hydration; it writes/removes the key only after that read.
Storage failures are swallowed so privacy-restricted browser contexts do not
crash the render. This preserves the established `setTheme`/`resetTheme`
semantics while avoiding a server render that sees `{}` and a browser render
that sees user-specific values during hydration. The proof route deliberately
does not opt into a persistence key because product bootstrap and account
ownership decide where user preferences belong.

The provider accepts the existing recipe/object theme API and runtime
preferences. A consumer should choose one provider at its application root;
nested `ThemeScope` is the existing bounded contextual surface, not a second
theme engine.

## CSS, fonts, icons, and overlays

The required package stylesheet is imported from the consumer layout:

```tsx
import "@ten4seven/ui/styles.css";
```

The packed stylesheet references the packaged font files through package-local
relative URLs. The proof checks the computed Inter family, `document.fonts`,
and a successful `Inter-Variable` font response during the production run; it
does not rely on repository-relative paths.

Use semantic icons in product code:

```tsx
<T7Icon name="dashboard" label="Dashboard" />
```

The proof checks the accessible icon and rejects any request whose URL matches
Iconify or `api.iconify`; the package uses its bundled Solar data and has no
runtime icon CDN dependency.

The proof also exercises a controlled `Select` listbox and a native-dialog
`Modal`. It verifies the single overlay root, listbox selection, dialog
visibility, and Escape dismissal after hydration. Floating portal setup is
client/effect-safe and does not read `document` during the server render.

## Accessibility smoke scope

The bounded route checks:

- an accessible name for the server-tree and save buttons;
- the `Farmer name` label/input relationship;
- listbox and option semantics;
- dialog name and Escape dismissal;
- visible rendered focus through the interactive flow;
- no serious or critical `axe-core` violation (`wcag2a`/`wcag2aa`).

This is adoption smoke coverage, not a replacement for a product's complete
accessibility review.

## Distribution and reproducible proof

The consumer must use the packed artifact, not a workspace source import or
symlink:

```bash
pnpm test:next-consumer
```

The root runner performs this bounded sequence:

1. build, verify, and pack `@ten4seven/ui` into `artifacts/consumer-proof/`;
2. install the tarball into `consumer-tests/next-app-router-consumer/`;
3. assert exact Next/React/TypeScript pins and one React/React DOM runtime;
4. run strict consumer TypeScript checking;
5. run a production `next build`;
6. start the production server and run serial Playwright plus axe smoke.

The local tarball is repacked on every run, so the runner intentionally uses a
non-frozen consumer lockfile refresh to update the local file-integrity entry.
This is a local reproducibility detail, not a registry publishing workflow.
The finalization runner does not call `package:release`, change a version,
tag, publish, or push. The original compatibility checkpoint exercised the
authorized local release/pack command; repeat verification now uses the
isolated consumer-proof artifact without running a release workflow.

## License and public-repository finding

**OBSERVED:** the GitHub repository is public, while `packages/ui/package.json`
is marked `"private": true` and `"license": "UNLICENSED"`. `LICENSE.md` is an
internal commercial license for the controlling individual or organization,
permits internal/commercial use, and restricts publishing, resale,
redistribution, or sublicensing to unrelated third parties without written
permission. `THIRD_PARTY_NOTICES.md` separately records the applicable OFL,
CC BY 4.0, and MIT notices for bundled dependencies/assets.

**UNKNOWN:** whether PT AAPM is already the controlling licensee/authorized
organization under that internal license, and whether Farm Web distribution
needs an explicit written grant.

**PROPOSED (owner review):** add a narrowly scoped clarification or written
authorization stating whether PT AAPM may consume and deploy this private
artifact for `farm.aapm.co.id`, while retaining the current no-public-registry
and third-party-notice boundaries. No relicensing or package ownership change
was made by this work item. Suggested owner-review wording (not a license
change):

> PT AAPM (and its authorized Farm Web deployment) may internally use and
> deploy the private `@ten4seven/ui` artifact for `farm.aapm.co.id`; this grant
> does not authorize public registry publication, resale, sublicensing, or
> redistribution to unrelated third parties, and does not replace the notices
> and licenses for bundled third-party materials.

## AAPM brand boundary

The generic package does not hardcode AAPM green/orange into its primitives.
The existing provider/theme contract supports semantic `palette`, `primary`,
`accent`, `ThemeConfig`, recipes, and `overrides.variables`, so a Farm adapter
can map AAPM Green (`#318139`) and AAPM Orange (`#D4451A`) at the product theme
profile boundary. That exact mapping is **PROPOSED**, not implemented here;
Farm should not create a parallel token engine or put those hex values into
generic Button/Input/Card styles.

## Verified evidence and limitations

**OBSERVED (2026-09-03):** `pnpm test:next-consumer` passed from a fresh
`@ten4seven/ui@1.0.0` tarball: package build/verify/pack, standalone install,
strict consumer typecheck, Next `16.3.4` production build, one React runtime
(`19.2.8`), three serial Playwright tests, font loading, icon CDN absence,
overlay interaction, theme light/dark/system controls, and axe serious/critical
smoke.

**UNVERIFIED:** React 20, future Next 16 patch releases, other operating
systems/browsers, streaming or multi-route Farm data flows, and an external
registry install. The proof covers one intentionally small App Router route;
it does not create the Farm repository or Farm application code.

**KNOWN LIMITATION:** root exports are client-bound as a set. A future
server-safe subpath would be a separate architecture change requiring a
canonical server-safe module graph, export metadata, and its own consumer
proof.

**KNOWN LIMITATION:** the package build is one large bundled root artifact;
the verified ESM output was approximately 10.74 MB minified / 2.11 MB gzip,
largely because the Solar catalog is bundled locally. The Next proof establishes
correctness and tree-shake-compatible ESM consumption, but it does not set or
pass a Farm route-level performance budget. Measure the actual Farm route
chunks before production and split an icon catalog/subpath only if that evidence
requires it.

## AAPM Ecosystem handoff

```text
Is ten4seven-ui suitable for farm.aapm.co.id?
CONDITIONAL — the tested Next/React artifact contract is suitable; confirm the
private-license authorization before creating the Farm repository.

Verified React version:
19.2.8 (React and React DOM)

Verified Next version:
16.3.4

RSC compatibility:
PASS for the tested App Router composition: Server Component route/layout plus
the package's explicit client root boundary. There is no server-safe UI export
subpath today.

Client boundary:
@ten4seven/ui root is "use client"; consumer-owned client-provider.tsx wraps
Ten4SevenProvider and interactive UI, while app/page.tsx remains server.

Recommended import contract:
Import @ten4seven/ui/styles.css in app/layout.tsx and import existing root
exports from @ten4seven/ui. Keep provider/state/DOM behavior behind a client
wrapper; do not add a /server import.

Theme/provider contract:
One Ten4SevenProvider at the application client boundary; appearance light,
dark, or system; recipes/ThemeConfig/preferences remain compatible. System
appearance resolves after hydration and persistenceKey is opt-in/effect-hydrated.

AAPM Brand mapping capability:
Use the existing semantic primary/accent/theme override seam in a Farm adapter;
map #318139 and #D4451A there. Generic ten4seven primitives remain neutral.

Package distribution method:
pnpm test:next-consumer builds, verifies and locally packs into
artifacts/consumer-proof/, then installs that tarball in the standalone
consumer. Release/distribution outside the proof remains owner-gated.
No npm publication was performed.

License implication:
Current public-repository/package metadata is private + UNLICENSED with an
internal commercial license. PT AAPM authorization is UNKNOWN and needs owner
confirmation or written clarification before external Farm distribution.

Known limitations:
No /server subpath; system mode has a temporary light first render before the
media-query effect; persistence is opt-in; proof is one route/Chromium and
does not validate React 20, other browsers, or registry delivery.

Evidence:
consumer-tests/next-app-router-consumer plus scripts/test-next-app-router-consumer.mjs;
fresh tarball install, strict tsc, next build, Playwright/axe/font/icon/overlay
assertions, and package verifier client-boundary checks.

Blocking issues:
No compatibility blocker in the tested contract. License authorization is a
release/adoption condition, not a failed runtime proof.

Recommended AAPM ADR:
ECO-ADR-004

Pre-Repository Gate impact:
CONDITIONAL — proceed only after the license/authorization decision is recorded.
```
