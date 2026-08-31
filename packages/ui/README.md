# @ten4seven/ui

The private, self-contained ten4seven UI distribution. One package contains
the React components, provider/theme runtime, semantic icon registry, token
profiles, motion contract, Inter variable font, and stylesheet required by a
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
  type ThemeConfig,
} from "@ten4seven/ui";

const theme: ThemeConfig = {
  appearance: "light",
  palette: "emerald",
  radius: "soft",
  density: "default",
  typography: "modern",
};

export function App() {
  return (
    <Ten4SevenProvider theme={theme}>
      <Button leadingIcon="check">Save changes</Button>
      <T7Icon name="dashboard" label="Dashboard" />
    </Ten4SevenProvider>
  );
}
```

The package keeps React and React DOM as peer dependencies so an application
does not accidentally load two React runtimes. Tokens and semantic icons are
re-exported from the same root entrypoint; consumer code does not need to add
the workspace implementation packages separately.
