import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const packageDir = resolve(import.meta.dirname, "..");
const distDir = resolve(packageDir, "dist");
const manifest = JSON.parse(
  await readFile(resolve(packageDir, "package.json"), "utf8"),
);

const requiredFiles = [
  "index.js",
  "index.js.map",
  "index.d.ts",
  "renderer.js",
  "renderer.js.map",
  "renderer.d.ts",
  "package-build.json",
];

for (const relativePath of requiredFiles) {
  const filePath = resolve(distDir, relativePath);
  const fileStats = await stat(filePath);
  if (!fileStats.isFile() || fileStats.size === 0) {
    throw new Error(
      `native package artifact is empty or missing: ${relativePath}`,
    );
  }
}

if (manifest.private !== true || manifest.license) {
  throw new Error("the Native package must remain private and unlicensed");
}

if (Object.keys(manifest.dependencies ?? {}).length > 0) {
  throw new Error(
    "the packed Native artifact must not require workspace runtime dependencies",
  );
}

const expectedExports = {
  ".": {
    types: "./dist/index.d.ts",
    import: "./dist/index.js",
    default: "./dist/index.js",
  },
  "./renderer": {
    types: "./dist/renderer.d.ts",
    import: "./dist/renderer.js",
    default: "./dist/renderer.js",
  },
};
if (JSON.stringify(manifest.exports) !== JSON.stringify(expectedExports)) {
  throw new Error("Native package exports do not match the built artifacts");
}

const packageBuild = JSON.parse(
  await readFile(resolve(distDir, "package-build.json"), "utf8"),
);
if (
  packageBuild.rendererBoundary !== "native" ||
  packageBuild.sourceOfTruth !==
    "packages/contracts/src and packages/tokens/src"
) {
  throw new Error("Native package-build metadata is incomplete");
}

const runtimeSources = await Promise.all(
  ["index.js", "renderer.js"].map((fileName) =>
    readFile(resolve(distDir, fileName), "utf8"),
  ),
);
const declarationSources = await Promise.all(
  ["index.d.ts", "renderer.d.ts"].map((fileName) =>
    readFile(resolve(distDir, fileName), "utf8"),
  ),
);
const internalImportPattern =
  /(?:from\s*["']|import\s*\(["'])[^"']*@ten4seven\/(?:contracts|tokens)/;

if (runtimeSources.some((source) => internalImportPattern.test(source))) {
  throw new Error(
    "Native runtime output still imports workspace contracts/tokens",
  );
}
if (declarationSources.some((source) => internalImportPattern.test(source))) {
  throw new Error(
    "Native declarations still expose workspace contracts/tokens",
  );
}

const externalPeerPattern =
  /(?:from\s*["']|import\s*\(["'])((?:react|react-native|react-native-safe-area-context))(?:["'])/;
const unexpectedRuntimeImports = runtimeSources.flatMap((source) =>
  [...source.matchAll(/(?:from\s*["']|import\s*\(["'])([^"']+)["']/g)]
    .map((match) => match[1])
    .filter(
      (specifier) =>
        !specifier.startsWith("react") && !specifier.startsWith("react-native"),
    ),
);
if (unexpectedRuntimeImports.length > 0) {
  throw new Error(
    `Native runtime has unexpected package imports: ${unexpectedRuntimeImports.join(", ")}`,
  );
}

if (
  !runtimeSources.some((source) => externalPeerPattern.test(source)) ||
  !runtimeSources[1].includes("react-native")
) {
  throw new Error("Native runtime peer boundaries are missing");
}

if (
  !declarationSources[0].includes("NativeThemeAdapterResult") ||
  !declarationSources[1].includes("NativeThemeProvider")
) {
  throw new Error("Native public declarations are incomplete");
}

console.log(
  `Native package verified: ${manifest.name}@${manifest.version}; bundled shared contracts/tokens with React Native peer boundaries.`,
);
