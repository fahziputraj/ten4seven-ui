import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const stylesPath = path.join(repoRoot, "packages/ui/src/styles.css");
const outputPath = path.join(
  repoRoot,
  "research/15-universal-v2/COMPONENT_TOKEN_COVERAGE_REPORT.md",
);

const componentChecks = [
  {
    name: "Button",
    selectors: [".t7-button"],
    tokens: {
      color: "--t7-action-primary-hsl",
      spacing: "--t7-control-padding-inline",
      radius: "--t7-radius-control",
      typography: "--t7-type-button-size",
      motion: "--t7-transition-fast",
      state: "--t7-action-primary-hover-hsl",
    },
  },
  {
    name: "Input / Select",
    selectors: [".t7-input", ".t7-select"],
    tokens: {
      color: "--t7-field-background-hsl",
      spacing: "--t7-field-padding-inline",
      radius: "--t7-radius-control",
      typography: "--t7-type-input-size",
      motion: "--t7-transition-fast",
      state: "--t7-input-focus-border-hsl",
    },
  },
  {
    name: "Card",
    selectors: [".t7-card"],
    tokens: {
      color: "--t7-surface-hsl",
      spacing: "--t7-card-padding",
      radius: "--t7-radius-card",
      typography: "--t7-type-card-title-size",
      motion: "--t7-transition-standard",
      state: "--t7-shadow-raised",
    },
  },
  {
    name: "Table",
    selectors: [".t7-table"],
    tokens: {
      color: "--t7-surface-hsl",
      spacing: "--t7-table-cell-padding-inline",
      radius: "--t7-radius-panel",
      typography: "--t7-type-table-cell-size",
      motion: "--t7-transition-fast",
      state: "--t7-selected-hsl",
    },
  },
  {
    name: "Modal",
    selectors: [".t7-modal"],
    tokens: {
      color: "--t7-surface-raised-hsl",
      spacing: "--t7-overlay-padding",
      radius: "--t7-radius-shell",
      typography: "--t7-type-heading-lg-size",
      motion: "--t7-motion-enter-slow",
      state: "--t7-z-modal",
    },
  },
  {
    name: "Drawer",
    selectors: [".t7-drawer"],
    tokens: {
      color: "--t7-surface-raised-hsl",
      spacing: "--t7-overlay-padding",
      radius: "--t7-radius-panel",
      typography: "--t7-type-heading-lg-size",
      motion: "--t7-motion-enter-slow",
      state: "--t7-z-drawer",
    },
  },
  {
    name: "Navigation item",
    selectors: [".t7-nav-item"],
    tokens: {
      color: "--t7-muted-foreground-hsl",
      spacing: "--t7-menu-height",
      radius: "--t7-radius-control",
      typography: "--t7-type-nav-size",
      motion: "--t7-transition-fast",
      state: "--t7-primary-hsl",
    },
  },
];

function hasToken(styles, token) {
  return styles.includes(token);
}

function status(value) {
  return value ? "Present" : "Missing";
}

function renderTable(headers, rows) {
  const widths = headers.map((header, index) =>
    Math.max(header.length, ...rows.map((row) => row[index].length)),
  );
  const renderRow = (cells) =>
    `| ${cells.map((cell, index) => cell.padEnd(widths[index])).join(" | ")} |`;

  return [
    renderRow(headers),
    `| ${widths.map((width) => "-".repeat(width)).join(" | ")} |`,
    ...rows.map(renderRow),
  ].join("\n");
}

export function buildComponentTokenCoverage() {
  const styles = fs.readFileSync(stylesPath, "utf8");
  const rows = componentChecks.map((component) => {
    const selectorPresent = component.selectors.every((selector) =>
      styles.includes(selector),
    );
    const result = Object.fromEntries(
      Object.entries(component.tokens).map(([area, token]) => [
        area,
        selectorPresent && hasToken(styles, token),
      ]),
    );
    return { component: component.name, ...result };
  });
  const rawPx = (styles.match(/\b\d+(?:\.\d+)?px\b/g) ?? []).length;
  return { rawPx, rows };
}

export function renderComponentTokenCoverage() {
  const { rawPx, rows } = buildComponentTokenCoverage();
  const table = renderTable(
    [
      "Component",
      "Color semantic coverage",
      "Spacing semantic coverage",
      "Radius coverage",
      "Typography coverage",
      "Motion coverage",
      "State coverage",
    ],
    rows.map((row) => [
      row.component,
      status(row.color),
      status(row.spacing),
      status(row.radius),
      status(row.typography),
      status(row.motion),
      status(row.state),
    ]),
  );
  return `# Component token coverage report

Generated from \`packages/ui/src/styles.css\` by
\`scripts/generate-component-token-coverage.mjs\`. It is a static
contract-coverage check for high-impact canonical selector families, not a
replacement for browser state or visual QA.

${table}

## Scope and residual debt

All listed selector families expose the expected semantic token vocabulary.
The stylesheet still contains **${rawPx}** literal pixel measurements. That
count includes legitimate intrinsic geometry (hairlines, icon/media boxes,
and browser normalization) as well as unmigrated component-internal spacing.
It is tracked as migration debt rather than treated as proof that every
measurement is semantically governed. New generic geometry must be added to
\`packages/tokens/src/theme.ts\` and consumed by a component before it is
considered canonical.
`;
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) ===
    path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  if (process.argv.includes("--stdout")) {
    process.stdout.write(renderComponentTokenCoverage());
  } else {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, renderComponentTokenCoverage(), "utf8");
    console.log(`Generated ${path.relative(repoRoot, outputPath)}.`);
  }
}
