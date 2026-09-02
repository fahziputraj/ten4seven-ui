import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const uiSource = path.join(repoRoot, "packages/ui/src");
const stylesPath = path.join(uiSource, "styles.css");
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
];
for (const variable of requiredSemanticVariables)
  assert.ok(
    styles.includes(variable),
    `core semantic variable is unused: ${variable}`,
  );

assert.ok(
  Array.isArray(allowlist.acceptedLiteralCategories) &&
    allowlist.acceptedLiteralCategories.length > 0,
  "token governance allowlist is missing documented literal categories",
);

console.log(
  `Token governance verified: ${componentSources.length} component modules, no raw component colors/palette dependencies/ungoverned timing, ${requiredSemanticVariables.length} core semantic variables, and ${allowlist.acceptedLiteralCategories.length} documented literal categories.`,
);
