import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const uiRoot = path.join(repoRoot, "packages/ui/src");
const files = fs
  .readdirSync(uiRoot)
  .filter((name) => /\.(css|ts|tsx)$/.test(name))
  .map((name) => ({
    name,
    source: fs.readFileSync(path.join(uiRoot, name), "utf8"),
  }));

const violations = [];
for (const { name, source } of files) {
  const lines = source.split(/\r?\n/);
  lines.forEach((line, index) => {
    if (/#[0-9a-f]{3,8}\b|\b(?:rgb|hsl)a?\(\s*\d/i.test(line))
      violations.push(`${name}:${index + 1} raw color`);
    const shadow = line.match(/box-shadow:\s*([^;]+)/i)?.[1].trim();
    if (shadow && !/^(?:var\(|none$|inset\s+var\()/i.test(shadow))
      violations.push(`${name}:${index + 1} raw shadow`);
    const radius = line.match(/border-radius:\s*([^;]+)/i)?.[1].trim();
    if (radius && !/^(?:0(?:\s|$)|50%$|inherit$|var\(|calc\()/i.test(radius))
      violations.push(`${name}:${index + 1} raw radius`);
    if (/\bsolar:[a-z0-9-]+/i.test(line))
      violations.push(`${name}:${index + 1} provider icon identifier`);
  });
}

assert.deepEqual(
  violations,
  [],
  `canonical consistency violations:\n${violations.join("\n")}`,
);
// Guard a few stable high-impact slot contracts, not arbitrary application CSS.
const canonicalStyles = files.find((file) => file.name === "styles.css").source;
for (const selector of [
  ".t7-button-label",
  ".t7-nav-label",
  ".t7-card",
  ".t7-table-wrap",
  ".t7-menu-item-copy",
  ".t7-activity-feed li > div",
]) {
  const start = canonicalStyles.indexOf(`${selector} {`);
  const body = canonicalStyles.slice(
    start,
    canonicalStyles.indexOf("}", start),
  );
  assert.ok(
    start >= 0 && body.includes("min-width: 0"),
    `${selector} lost its flexible content boundary`,
  );
}
for (const role of [
  "--t7-gutter-mobile",
  "--t7-card-safe-inset",
  "--t7-overlay-safe-inset",
  "--t7-field-safe-inset",
  "--t7-rail-reading",
]) {
  assert.ok(
    canonicalStyles.includes(role),
    `content-safety role is unused: ${role}`,
  );
}
console.log(
  `Canonical consistency verified across ${files.length} UI source files.`,
);
