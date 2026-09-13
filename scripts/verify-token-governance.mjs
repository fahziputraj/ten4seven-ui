import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  buildInventory,
  getInventoryMetrics,
} from "./audit-hardcoded-style.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const uiSource = path.join(repoRoot, "packages/ui/src");
const stylesPath = path.join(uiSource, "styles.css");
const themeStylesPath = path.join(repoRoot, "packages/tokens/src/theme.css");
const foundationPath = path.join(
  repoRoot,
  "packages/contracts/src/foundation.ts",
);
const themePath = path.join(repoRoot, "packages/tokens/src/theme.ts");
const allowlist = JSON.parse(
  fs.readFileSync(
    path.join(repoRoot, "scripts/token-governance-allowlist.json"),
    "utf8",
  ),
);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function relative(file) {
  return path.relative(repoRoot, file).replaceAll("\\", "/");
}

function failMatches(label, source, pattern, file) {
  const matches = [...source.matchAll(pattern)];
  assert.equal(
    matches.length,
    0,
    `${label} in ${relative(file)}: ${matches
      .slice(0, 3)
      .map((match) => match[0])
      .join(", ")}`,
  );
}

const styles = fs.readFileSync(stylesPath, "utf8");
const themeStyles = fs.readFileSync(themeStylesPath, "utf8");
const foundation = fs.readFileSync(foundationPath, "utf8");
const theme = fs.readFileSync(themePath, "utf8");
const canonicalStyles = `${styles}\n${themeStyles}`;
const cssWithoutSemanticHsl = styles.replace(/hsl\(\s*var\s*\(/g, "hsl(var(");

failMatches(
  "raw component color literal",
  cssWithoutSemanticHsl,
  /#[0-9a-f]{3,8}\b|\b(?:rgb|rgba|oklch|color-mix)\(|hsl\(\s*(?!var\s*\()/gi,
  stylesPath,
);
failMatches(
  "palette-family CSS dependency",
  styles,
  /\b(?:emerald|teal|cyan|blue|indigo|violet|rose|red|orange|amber|slate)\b/gi,
  stylesPath,
);
failMatches(
  "ungoverned z-index",
  styles,
  /z-index:\s*(?!var\()[2-9]\d*/gi,
  stylesPath,
);
failMatches(
  "raw transition or animation duration",
  styles,
  /(?:transition|animation):[^;\n]*(?:\d+(?:\.\d+)?(?:ms|s))/gi,
  stylesPath,
);

const componentSources = walk(uiSource).filter(
  (file) =>
    /\.(?:ts|tsx)$/.test(file) && path.basename(file) !== "provider.tsx",
);
for (const file of componentSources) {
  const source = fs.readFileSync(file, "utf8");
  failMatches(
    "raw component color literal",
    source.replace(/hsl\(\s*var\s*\(/g, "hsl(var("),
    /#[0-9a-f]{3,8}\b|\b(?:rgb|rgba|hsla|oklch|color-mix)\(|hsl\(\s*(?!var\s*\()/gi,
    file,
  );
}

const requiredSemanticVariables = [
  "--t7-action-primary-hsl",
  "--t7-action-secondary-background-hsl",
  "--t7-action-danger-hsl",
  "--t7-field-background-hsl",
  "--t7-control-padding-inline",
  "--t7-field-padding-inline",
  "--t7-card-header-gap",
  "--t7-overlay-padding",
  "--t7-table-cell-padding-inline",
  "--t7-table-border-hsl",
  "--t7-table-divider-alpha",
  "--t7-kpi-padding",
  "--t7-kpi-content-gap",
  "--t7-kpi-chart-height",
  "--t7-surface-emphasis-solid-chart-1-hsl",
  "--t7-surface-emphasis-solid-chart-foreground-hsl",
  "--t7-opacity-interactive",
  "--t7-opacity-hover",
  "--t7-opacity-active",
  "--t7-opacity-disabled-control",
  "--t7-opacity-choice-disabled",
  "--t7-opacity-option-disabled",
  "--t7-opacity-checkbox-disabled",
  "--t7-opacity-disabled-subtle",
  "--t7-opacity-chart-grid",
  "--t7-opacity-chart-track",
  "--t7-opacity-chart-bar",
  "--t7-opacity-detail-enter",
  "--t7-ref-space-micro",
  "--t7-ref-space-fine",
  "--t7-ref-space-compact",
  "--t7-ref-space-tight",
  "--t7-ref-space-quiet",
  "--t7-ref-space-inline",
  "--t7-ref-space-snug",
  "--t7-ref-space-relaxed",
  "--t7-icon-navigation",
  "--t7-mark-choice",
  "--t7-mark-radio",
  "--t7-mark-dot",
  "--t7-mark-stroke",
];
for (const variable of requiredSemanticVariables)
  assert.ok(
    canonicalStyles.includes(variable),
    `core semantic variable is unused: ${variable}`,
  );

assert.ok(
  Array.isArray(allowlist.acceptedLiteralCategories) &&
    allowlist.acceptedLiteralCategories.length > 0,
  "token governance allowlist is missing documented literal categories",
);
assert.ok(
  Array.isArray(allowlist.exceptionRegistry) &&
    allowlist.exceptionRegistry.length > 0,
  "token governance allowlist is missing the bounded exception registry",
);
for (const exception of allowlist.exceptionRegistry) {
  for (const field of ["id", "class", "owner", "reason"])
    assert.equal(
      typeof exception[field],
      "string",
      `token exception is missing ${field}`,
    );
}

assert.match(
  foundation,
  /export const STYLE_TOKENIZATION_CONTRACT/,
  "style tokenization contract is not present in the canonical contract plane",
);
assert.match(
  theme,
  /export const referenceSpace/,
  "reference spacing authority is not present in the canonical token source",
);

const inventory = buildInventory();
const inventoryMetrics = getInventoryMetrics(inventory);
assert.equal(
  inventoryMetrics.tokenizableUnresolved,
  0,
  "hardcoded-style inventory still contains unresolved tokenizable findings",
);
assert.equal(
  inventoryMetrics.demoLocalThemeSystems,
  0,
  "demo/reference surfaces contain a local theme system",
);
assert.equal(
  inventoryMetrics.nativeParallelThemeSystems,
  0,
  "native surfaces contain a parallel custom-property theme system",
);
assert.equal(
  inventoryMetrics.duplicateGlobalTokenAuthorities,
  0,
  "duplicate global token authorities were detected",
);
assert.equal(
  inventory.filter(
    (finding) =>
      finding.ownership === "COMPOSITION_LOCAL" && !finding.exceptionId,
  ).length,
  0,
  "composition-local findings must be covered by an explicit exception registry entry",
);

console.log(
  `Token governance verified: ${componentSources.length} component modules, no raw component colors/palette dependencies/ungoverned timing, ${requiredSemanticVariables.length} core semantic variables, ${allowlist.acceptedLiteralCategories.length} documented literal categories, and ${inventoryMetrics.tokenizableUnresolved} unresolved tokenizable findings.`,
);
