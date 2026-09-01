import { createRequire } from "node:module";
import { readFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const packageDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = resolve(packageDir, "dist");
const manifest = JSON.parse(
  await readFile(resolve(packageDir, "package.json"), "utf8"),
);

const requiredFiles = [
  "index.js",
  "index.cjs",
  "index.d.ts",
  "styles.css",
  "fonts/Inter-Variable.woff2",
  "fonts/Inter-OFL.txt",
  "fonts/DM-Sans-Variable.woff2",
  "fonts/DM-Sans-OFL.txt",
  "fonts/Source-Serif-4-Variable.woff2",
  "fonts/Source-Serif-4-OFL.txt",
  "fonts/IBM-Plex-Mono-400.woff2",
  "fonts/IBM-Plex-Mono-500.woff2",
  "fonts/IBM-Plex-Mono-600.woff2",
  "fonts/IBM-Plex-Mono-700.woff2",
  "fonts/IBM-Plex-Mono-OFL.txt",
  "package-build.json",
];
const requiredPackageDocs = [
  "LICENSE.md",
  "README.md",
  "THIRD_PARTY_NOTICES.md",
];

for (const relativePath of requiredFiles) {
  const filePath = resolve(distDir, relativePath);
  const fileStats = await stat(filePath);
  if (!fileStats.isFile() || fileStats.size === 0)
    throw new Error(`package artifact is empty or missing: ${relativePath}`);
}

for (const relativePath of requiredPackageDocs) {
  const filePath = resolve(packageDir, relativePath);
  const fileStats = await stat(filePath);
  if (!fileStats.isFile() || fileStats.size === 0)
    throw new Error(
      `package legal or consumer document is empty or missing: ${relativePath}`,
    );
}

if (manifest.private !== true || manifest.license !== "UNLICENSED") {
  throw new Error("the self-owned package must remain private and unlicensed");
}

if (Object.keys(manifest.dependencies ?? {}).length > 0) {
  throw new Error(
    "the self-contained package must not require runtime dependencies",
  );
}

if (
  manifest.exports?.["."]?.development ||
  manifest.exports?.["./styles.css"]?.development
) {
  throw new Error(
    "the packed contract must not point consumers at workspace source",
  );
}

const esmSource = await readFile(resolve(distDir, "index.js"), "utf8");
const cjsSource = await readFile(resolve(distDir, "index.cjs"), "utf8");
const declarationSource = await readFile(
  resolve(distDir, "index.d.ts"),
  "utf8",
);
const styleSource = await readFile(resolve(distDir, "styles.css"), "utf8");
const styleCode = styleSource.replace(/\/\*[\s\S]*?\*\//g, "");

const runtimeImportPattern =
  /(?:from\s*["']|require\(["'])[^"']*(?:@ten4seven\/(?:tokens|icons)|animejs)/;
if (
  runtimeImportPattern.test(esmSource) ||
  runtimeImportPattern.test(cjsSource)
)
  throw new Error(
    "the runtime bundle still requires an internal or vendor package",
  );

if (
  /@ten4seven\/(?:tokens|icons)|(?:from|import)\s*["']animejs/.test(
    declarationSource,
  )
)
  throw new Error(
    "the declaration bundle still exposes an internal or vendor package",
  );

if (
  !styleCode.includes("@font-face") ||
  styleCode.includes("@ten4seven/") ||
  /@import\s/i.test(styleCode)
)
  throw new Error("the shipped stylesheet is not self-contained");

const esm = await import(pathToFileURL(resolve(distDir, "index.js")).href);
const cjs = createRequire(import.meta.url)(resolve(distDir, "index.cjs"));
const requiredExports = [
  "Button",
  "Ten4SevenProvider",
  "T7Icon",
  "paletteProfiles",
  "t7Motion",
];

for (const exportName of requiredExports) {
  if (!(exportName in esm) || !(exportName in cjs))
    throw new Error(`missing bundled export: ${exportName}`);
}

console.log(
  `Package verified: ${manifest.name}@${manifest.version}; ${requiredExports.length} root exports, bundled tokens/icons/motion, and self-contained styles.`,
);
