import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const exists = (relative) => fs.existsSync(path.join(root, relative));

const manifest = JSON.parse(read("aapm-ui.manifest.json"));
assert.equal(manifest.defaultTheme, "light", "light must remain the default theme");
assert.equal(manifest.compatibility.iconSurface, "Local Iconify React data through components/core/Icon.jsx");
assert.ok(manifest.componentGroups.operations.includes("ProcessBoard"));
assert.ok(manifest.componentGroups.forms.includes("TimePicker"));
assert.ok(manifest.componentGroups.forms.includes("DateTimePicker"));
assert.ok(manifest.componentGroups.blocks.includes("DataTableToolbar"));
assert.ok(manifest.componentGroups.blocks.includes("VerificationPanel"));
assert.ok(manifest.componentGroups.feedback.includes("PermissionGate"));

const publicNames = Object.values(manifest.componentGroups).flat();
assert.equal(new Set(publicNames).size, publicNames.length, "manifest must not duplicate public component names");

for (const file of [
  "styles.css",
  "index.js",
  "components/core/Icon.jsx",
  "components/core/solarIconData.js",
  "components/core/domainIconData.js",
  "components/core/aapmChickenIcon.js",
  "components/forms/TimePicker.jsx",
  "components/forms/DateTimePicker.jsx",
  "components/blocks/TransactionDetailGrid.jsx",
  "components/blocks/VerificationPanel.jsx",
  "components/blocks/DataTableToolbar.jsx",
  "components/blocks/ExceptionCard.jsx",
  "components/blocks/TrendCard.jsx",
  "components/blocks/DetailSidebar.jsx",
  "components/feedback/PermissionGate.jsx",
  "guidelines/governance.md",
  "guidelines/master-spec-review.md",
  "guidelines/page-templates.md",
]) assert.ok(exists(file), `${file} must exist`);

const styles = read("styles.css");
assert.match(styles, /components\/blocks\/blocks\.css/);
assert.match(styles, /components\/operations\/operations\.css/);
assert.match(read("index.js"), /export \{ PermissionGate \}/);
assert.match(read("components/core/Icon.jsx"), /domainIconData/);
assert.doesNotMatch(read("components/core/Icon.jsx"), /code\.iconify\.design/);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const componentFiles = walk(path.join(root, "components"));
const jsxFiles = componentFiles.filter((file) => file.endsWith(".jsx"));
assert.ok(jsxFiles.length >= 90, `expected at least 90 component modules, found ${jsxFiles.length}`);
for (const file of componentFiles.filter((file) => /\.(jsx|js|css)$/.test(file))) {
  const source = fs.readFileSync(file, "utf8");
  assert.doesNotMatch(source, /#[0-9a-f]{3,8}\b/i, `${path.relative(root, file)} contains a raw hex colour`);
}

const iconSource = read("components/core/Icon.jsx");
const iconDataSource = read("components/core/domainIconData.js");
const aapmIconSource = read("components/core/aapmChickenIcon.js");
for (const glyph of ["aapm:chicken-bold-duotone", "aapm:egg-bold-duotone", "solar:garage-bold-duotone", "solar:buildings-2-bold-duotone", "mingcute:egg-fill", "mingcute:chicken-fill", "healthicons:animal-chicken", "game-icons:egg-clutch", "mdi:forklift"]) {
  assert.match(`${iconSource}\n${iconDataSource}\n${aapmIconSource}`, new RegExp(glyph.replace(/[-:]/g, "[-:]")), `${glyph} must remain registered`);
}

console.log(`AAPM UI contract OK — ${jsxFiles.length} JSX modules, ${publicNames.length} public component names, local Iconify data wired.`);
