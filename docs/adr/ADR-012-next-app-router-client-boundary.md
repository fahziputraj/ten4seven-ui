# ADR-012 Next.js App Router client boundary

## Context

`@ten4seven/ui` is intended to be consumed by production App Router
applications, including the future Farm Web application. The existing public
root barrel re-exports the provider and the complete interactive component
graph. That graph contains React hooks, refs, DOM events, portals, native
dialog effects, `window`, `document`, `matchMedia`, and optional `localStorage`
access.

Normal React/Vite operation is not sufficient evidence for React Server
Components (RSC). A real external-style consumer must install the packed
artifact, keep a route Server Component, and place stateful UI behind an
explicit client boundary.

## Options considered

### A. Mark the existing root entry as client-only

Add `"use client"` to `packages/ui/src/index.ts` and verify that the directive
survives the ESM and CJS package build. Keep the established root import
contract and let consumers place the provider in a client wrapper.

### B. Add separate `/server` and `/client` exports

Split the package exports and expose a server-safe set of components separately
from the interactive set.

### C. Mark individual implementation modules as client components

Add directives only to modules that use hooks or browser APIs while retaining a
mixed root barrel.

## Decision

Choose **Option A** for this bounded compatibility work.

The current root entry is now explicitly client-marked. The package verifier
asserts that `dist/index.js` and `dist/index.cjs` both start with
`"use client"`, and package-build metadata records `clientBoundary: "root"`.
The existing imports remain valid:

```tsx
import { Button, T7Icon, Ten4SevenProvider } from "@ten4seven/ui";
```

The consumer contract is:

```text
Server RootLayout (imports package CSS)
  └── consumer-owned "use client" provider wrapper
        └── interactive ten4seven components
Server page can render root-exported client components with serializable props
```

The standalone proof at
`consumer-tests/next-app-router-consumer/` installs the packed tarball, keeps
`app/layout.tsx` and `app/page.tsx` as Server Components, exercises an explicit
`client-provider.tsx`, and verifies production build, hydration, font/CSS
loading, semantic icons, overlays, theme changes, one React runtime, and axe
smoke.

## Why

Option A is the smallest truthful change. A split server export would be a
misleading abstraction today because the source does not yet have a canonical
server-safe component layer; individual module directives would require a
broad graph audit and could make the mixed barrel appear server-safe. Both
alternatives can be revisited only with a new implementation graph, export
metadata, and consumer proof.

## Hydration hardening

The provider's system appearance state starts at deterministic `light` for the
server render and first client render, then resolves `matchMedia` in an effect.
Optional persistence similarly starts with `{}` and reads/writes
`localStorage` only after hydration, preventing user-specific storage from
changing the initial server/client markup. Storage failures are contained.
These changes preserve the public theme and persistence APIs; they do not alter
the visual design or introduce a second theme engine.

## Consequences

- Existing root imports are backward-compatible; no package subpath break was
  introduced.
- Root imports participate in the client graph, so consumers should keep
  provider/state/DOM behavior in an explicit client wrapper.
- Static CSS may still be imported from `@ten4seven/ui/styles.css` in a Server
  Component layout.
- There is no `/server` subpath in this release. A future split is a separate
  architecture decision and must prove tree-shaking and RSC behavior.
- The current proof is a bounded Chromium/Windows route, not a guarantee for
  future React/Next versions, every browser, streaming, or registry delivery.
- The package remains private/`UNLICENSED`; license authorization for PT AAPM
  is a separate adoption condition and is documented in the integration handoff.

## Follow-up gate

Before creating the Farm Web repository, record the PT AAPM license/authorized
distribution decision under `ECO-ADR-004`. If a server-safe export is later
needed, create a new ADR and repeat the packed-artifact consumer proof before
changing the public export contract.
