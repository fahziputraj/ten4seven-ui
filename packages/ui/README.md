# @ten4seven/ui

The private, self-contained ten4seven UI distribution. One package contains
the React components, provider/theme runtime, semantic icon registry, the
complete locally bundled Solar Iconify library, token profiles, motion
contract, self-hosted Inter, DM Sans, Source Serif 4, and IBM Plex Mono fonts,
and the stylesheet required by a consumer application.

The package is intentionally marked `private` and `UNLICENSED`: it is prepared
for the owner’s internal and commercial products, not for public registry
publication. See [`LICENSE.md`](./LICENSE.md) and
[`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md).

## Build the local artifact

From the repository root:

```bash
pnpm package:release
```

This creates a local tarball under `artifacts/`, after building and verifying
the package. It is safe to install from that tarball in an application that
already provides React and React DOM:

```bash
pnpm add ../ten4seven-ui/artifacts/ten4seven-ui-1.0.0.tgz
```

## One-package consumer contract

```tsx
import "@ten4seven/ui/styles.css";
import {
  Button,
  T7Icon,
  Ten4SevenProvider,
  THEME_RECIPES,
} from "@ten4seven/ui";

export function App() {
  return (
    <Ten4SevenProvider
      theme="enterprise"
      preferences={{ appearance: "system", density: "compact" }}
    >
      <Button leadingIcon="check">Save changes</Button>
      <T7Icon name="dashboard" label="Dashboard" />
    </Ten4SevenProvider>
  );
}
```

`T7Icon` remains the semantic API for product code. When a design surface
needs a glyph outside the semantic registry, `IconifyIcon` resolves one of the
7,962 local Solar names without a CDN request. The playground's icon library
keeps its browsing surface intentionally cohesive by showing the curated
1,327-name Bold Duotone family:

```tsx
import { IconifyIcon } from "@ten4seven/ui";

<IconifyIcon name="home-angle-bold-duotone" />;
<IconifyIcon
  accentColor="#c6f15a"
  name="palette-bold-duotone"
  primaryColor="#155d3a"
/>;
```

Names ending in `-duotone` automatically use the active theme primary and
accent tokens. `primaryColor`, `accentColor`, and the `duotone` flag are
available whenever a surface needs an explicit paint override. The complete
name list and count are exported as `IconifyIconNames` and `IconifyIconCount`;
`IconifyBoldDuotoneIconNames` and `IconifyBoldDuotoneIconCount` expose the
focused workbench family for consumers that want the same visual boundary.

`enterprise`, `product`, `editorial`, and `commerce` are authored recipes.
`THEME_RECIPES`, `THEME_RECIPE_NAMES`, and `getThemeRecipe()` are available
when an application needs to enumerate them for its own picker or metadata.
Use `preferences` only for runtime choices such as appearance, density,
contrast, and motion. The established advanced object path remains compatible:

```tsx
import type { ThemeConfig } from "@ten4seven/ui";

const customTheme: ThemeConfig = {
  palette: "blue",
  primary: "indigo",
  density: "compact",
};

<Ten4SevenProvider theme={customTheme}>{/* app */}</Ten4SevenProvider>;
```

For CSS-first rendering, import `@ten4seven/ui/theme.css` and
`@ten4seven/ui/components.css`, then use `data-t7-theme`, `data-t7-mode`, and
`data-t7-density` on a document or bounded root. Static CSS selectors require
`data-t7-mode="light"` or `"dark"`; an application must resolve `system`
before setting the attribute. Optional granular artifacts are also available
as `themes.css`, `tailwind.css`, and `tokens.dtcg.json`. See the repository
[theming guide](https://github.com/fahziputraj/ten4seven-ui/blob/main/docs/THEMING.md)
for the scoped `ThemeScope` and expert `overrides` contracts.

The package keeps React and React DOM as peer dependencies so an application
does not accidentally load two React runtimes. Tokens and semantic icons are
re-exported from the same root entrypoint; consumer code does not need to add
the workspace implementation packages separately.

## KPI composition

`MetricCard` is the canonical single KPI and `KPICluster` groups a small set of
related signals. Both own the same anatomy: label, value, optional icon/action,
comparison, context, progress or compact chart, and an optional separated
footer. Icons are direct, token-sized glyphs rather than nested decorative
cards. Compose the existing cue components instead of creating dashboard-local
metric cards:

```tsx
import { KPICluster, Progress, Sparkline, TrendIndicator } from "@ten4seven/ui";

<KPICluster
  columns={3}
  label="Service health"
  variant="cards"
  items={[
    {
      colorway: 2,
      emphasis: "solid",
      icon: "analytics",
      label: "Resolution rate",
      value: "91%",
      note: "Rolling 30 days",
      trend: (
        <TrendIndicator
          context="vs prior"
          direction="up"
          sentiment="positive"
          value="+6.2%"
          variant="soft"
        />
      ),
      chart: (
        <Sparkline
          colorway={2}
          label="Resolution rate over eight periods"
          values={[72, 76, 74, 81, 83, 86, 88, 91]}
        />
      ),
    },
    {
      label: "Capacity used",
      value: "72%",
      progress: <Progress label="Capacity used" value={72} />,
    },
  ]}
/>;
```

`direction` controls the arrow; `sentiment` controls the meaning. A decreasing
bounce rate or unresolved queue can therefore use `direction="down"` with
`sentiment="positive"`. Never invent a comparison or sparkline when no
historical baseline exists. `colorway={1..5}` remains categorical and follows
the active Theme Studio chart family; semantic state still belongs to `tone`.
Use `chartPlacement="inline"` only when the card has enough horizontal room;
the default `bottom` placement provides the most stable grouped-card rhythm.

KPI padding, gaps, direct-icon geometry, chart height, and trend-chip padding
are provider variables under `--t7-kpi-*` and adapt to runtime density. Charts
fill that bounded content width without crossing the card inset.

## Next.js App Router / React Server Components

The packed root entry is intentionally marked `"use client"` because this
barrel includes the provider and interactive modules. Keep a Next.js route and
layout as Server Components, import `@ten4seven/ui/styles.css` from the layout,
and mount the provider from a small consumer-owned `"use client"` wrapper:

```tsx
// app/client-provider.tsx
"use client";

import { Ten4SevenProvider } from "@ten4seven/ui";
import type { PropsWithChildren } from "react";

export function ClientProvider({ children }: PropsWithChildren) {
  return <Ten4SevenProvider appearance="system">{children}</Ten4SevenProvider>;
}
```

The existing root exports remain compatible, and a Server Component may render
an exported component with serializable props. There is intentionally no
`@ten4seven/ui/server` subpath: the current barrel has no separate canonical
server-safe module graph. See the full [Next.js App Router compatibility
contract](../../docs/integration/NEXTJS_APP_ROUTER_COMPATIBILITY.md), including
hydration, persistence, overlay, license, and AAPM adoption boundaries.
