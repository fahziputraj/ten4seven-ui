# @ten4seven/ui

The private, self-contained ten4seven UI distribution. One package contains
the React components, provider/theme runtime, semantic icon registry, token
profiles, motion contract, self-hosted Inter, DM Sans, Source Serif 4, and IBM
Plex Mono fonts, and the stylesheet required by a
consumer application.

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
