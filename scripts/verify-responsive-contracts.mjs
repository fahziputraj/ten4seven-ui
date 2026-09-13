import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  MODULE_STATE_IDS,
  RESPONSIVE_COMPONENT_BEHAVIORS,
  RESPONSIVE_SHELL_CONTRACT,
  RESPONSIVE_VIEWPORTS,
} from "../packages/contracts/src/index.ts";

const repoRoot = path.resolve(import.meta.dirname, "..");
const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");

const appShellSource = read("packages/ui/src/components.tsx");
const moduleStateSource = read("packages/ui/src/module-state.tsx");
const uiStyles = read("packages/ui/src/styles.css");

assert.deepEqual(Object.keys(RESPONSIVE_VIEWPORTS), [
  "desktop",
  "tablet",
  "mobile",
]);
assert.equal(RESPONSIVE_VIEWPORTS.desktop.minWidth, 861);
assert.equal(RESPONSIVE_VIEWPORTS.tablet.maxWidth, 860);
assert.equal(RESPONSIVE_VIEWPORTS.mobile.maxWidth, 540);
assert.match(
  appShellSource,
  /contentWidth\?: "full" \| "wide" \| "readable"/,
  "AppShell: content width contract is not exposed",
);
assert.match(
  appShellSource,
  /context\?: ReactNode/,
  "AppShell: consumer context slot is not exposed",
);
assert.match(
  appShellSource,
  /stickyHeader\?: boolean/,
  "AppShell: sticky header contract is not exposed",
);
assert.match(
  appShellSource,
  /aria-controls=\{navigationId\}/,
  "AppShell: mobile navigation trigger lost its controlled relationship",
);
assert.match(
  appShellSource,
  /data-content-width=\{contentWidth\}/,
  "AppShell: content width token hook is not rendered",
);

for (const behavior of Object.values(RESPONSIVE_COMPONENT_BEHAVIORS)) {
  assert.equal(
    behavior.touchTargetToken,
    "--t7-touch-target-min",
    `${behavior.id}: shared touch target token drifted`,
  );
  for (const viewport of ["desktop", "tablet", "mobile"])
    assert.ok(
      behavior[viewport].focusOrder.length > 0,
      `${behavior.id}: ${viewport} focus order is empty`,
    );
}

assert.match(
  moduleStateSource,
  /getModuleStatePattern\(state\)/,
  "ModuleState: renderer is not driven by the typed state contract",
);
assert.match(
  moduleStateSource,
  /action\?: ReactNode/,
  "ModuleState: consumer-owned primary action is missing",
);
assert.match(
  moduleStateSource,
  /secondaryAction\?: ReactNode/,
  "ModuleState: consumer-owned secondary action is missing",
);
assert.match(
  moduleStateSource,
  /data-module-state=\{state\}/,
  "ModuleState: semantic state attribute is missing",
);
for (const forbidden of ["fetch(", "useTen4SevenTheme", "onClick="]) {
  assert.equal(
    moduleStateSource.includes(forbidden),
    false,
    `ModuleState: renderer must not own ${forbidden}`,
  );
}
for (const state of MODULE_STATE_IDS)
  assert.match(
    moduleStateSource + read("packages/contracts/src/module-state.ts"),
    new RegExp(state.replaceAll("-", "\\-")),
    `ModuleState: state contract missing ${state}`,
  );

assert.match(uiStyles, /\.t7-module-state\s*\{/);
assert.match(uiStyles, /@media \(max-width: 860px\)/);
assert.match(uiStyles, /@media \(max-width: 640px\)/);
assert.match(uiStyles, /@media \(max-width: 540px\)/);
assert.match(
  uiStyles,
  /\.t7-module-state-actions \.t7-button[\s\S]*?var\(--t7-touch-target-min\)/,
  "ModuleState: narrow action targets are not tokenized",
);

assert.deepEqual(
  RESPONSIVE_SHELL_CONTRACT.tokens,
  {
    contentMax: "--t7-content-max",
    pageGutter: "--t7-page-gutter",
    safeArea: [
      "--t7-safe-area-top",
      "--t7-safe-area-right",
      "--t7-safe-area-bottom",
      "--t7-safe-area-left",
    ],
    sidebarWidth: "--t7-sidebar-width",
    headerHeight: "--t7-header-height",
    touchTargetMin: "--t7-touch-target-min",
    density: "--t7-density",
  },
  "Responsive shell: token ownership drifted",
);

console.log(
  `Responsive contract gate verified: ${Object.keys(RESPONSIVE_COMPONENT_BEHAVIORS).length} behavior contracts, ${MODULE_STATE_IDS.length} module states, and tokenized AppShell slots.`,
);
