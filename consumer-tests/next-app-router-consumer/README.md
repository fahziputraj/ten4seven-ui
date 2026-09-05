# Next.js 16 / React 19 consumer proof

This is a deliberately small external-style consumer for `@ten4seven/ui`.
It is not a product demo or a second design system. The app proves the package
boundary that Farm Web will use:

- `app/page.tsx` remains a Server Component.
- `app/client-provider.tsx` is the explicit Client Component boundary.
- `@ten4seven/ui/styles.css` is imported from the server layout.
- the client proof exercises `Ten4SevenProvider`, `Button`, `Input`, `Select`,
  `Modal`, and a semantic `T7Icon`.
- the dependency points at the packed `artifacts/consumer-proof/ten4seven-ui-1.0.0.tgz`, not
  a workspace source or symlink.

From the repository root, run `pnpm test:next-consumer`. The command builds
the package artifact, installs this fixture, runs the strict TypeScript check,
builds with Next.js, starts the production server, and runs the serial
Playwright + axe smoke suite.

The tarball is a local test artifact in `artifacts/consumer-proof/`. This proof
does not call the release workflow, change a version, tag, publish, or push.

The root package is intentionally classified as a Client Component entry. A
Server Component may render its exported components, but browser-dependent
provider and interactive behavior must stay behind the package boundary (or a
consumer-owned `"use client"` wrapper). No `/server` subpath is advertised:
the current root barrel transitively includes hooks, refs, overlays, and DOM
behavior, so inventing a server-safe UI subpath without a separate canonical
implementation would be misleading.
