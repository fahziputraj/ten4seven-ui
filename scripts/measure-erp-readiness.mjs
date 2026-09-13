import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const repoRoot = path.resolve(import.meta.dirname, "..");

function filesUnder(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(absolutePath)) return [];
  const entries = fs.readdirSync(absolutePath, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const child = path.join(relativePath, entry.name);
    return entry.isDirectory() ? filesUnder(child) : [child];
  });
}

function bytes(relativePath) {
  return fs.statSync(path.join(repoRoot, relativePath)).size;
}

function directoryMeasure(relativePath) {
  const files = filesUnder(relativePath).map((file) => ({
    bytes: bytes(file),
    file: file.replaceAll("\\", "/"),
  }));
  const totalBytes = files.reduce((sum, file) => sum + file.bytes, 0);
  return {
    files: files.length,
    largestFiles: files
      .sort((left, right) => right.bytes - left.bytes)
      .slice(0, 6),
    totalBytes,
  };
}

function gzipMeasure(relativePath) {
  const content = fs.readFileSync(path.join(repoRoot, relativePath));
  return { bytes: content.length, gzipBytes: zlib.gzipSync(content).length };
}

const uiDist = directoryMeasure("packages/ui/dist");
const playgroundDist = directoryMeasure("apps/playground/dist");
const uiEsm = gzipMeasure("packages/ui/dist/index.js");
const uiCjs = gzipMeasure("packages/ui/dist/index.cjs");
const playgroundJs =
  filesUnder("apps/playground/dist").find((file) =>
    /[\\/]index(?:-[^\\/]+)?\.js$/.test(file),
  ) ?? "apps/playground/dist/index.js";
const playgroundBundle = gzipMeasure(playgroundJs);
const uiFonts = filesUnder("packages/ui/dist").filter((file) =>
  /\.(woff2?|ttf|otf)$/i.test(file),
);
const playgroundFonts = filesUnder("apps/playground/dist").filter((file) =>
  /\.(woff2?|ttf|otf)$/i.test(file),
);
const iconSources = [
  "packages/icons/src/solar-catalog.ts",
  "packages/icons/src/solar-data.ts",
  "packages/icons/src/curated-data.ts",
  "packages/icons/src/index.tsx",
].map((file) => ({ bytes: bytes(file), file }));

const result = {
  packageBoundary: {
    rootClientBoundary: /^\s*["']use client["']/.test(
      fs.readFileSync(path.join(repoRoot, "packages/ui/src/index.ts"), "utf8"),
    ),
    serverEntryExported: fs.existsSync(
      path.join(repoRoot, "packages/ui/src/server.ts"),
    ),
    uiPackageExportsServer: Object.prototype.hasOwnProperty.call(
      JSON.parse(
        fs.readFileSync(
          path.join(repoRoot, "packages/ui/package.json"),
          "utf8",
        ),
      ).exports,
      "./server",
    ),
  },
  sourceRisk: {
    iconSources,
    iconSourceBytes: iconSources.reduce((sum, file) => sum + file.bytes, 0),
    routeSourceBytes: bytes("apps/playground/src/erp-data-dense-reference.tsx"),
  },
  uiDist: {
    ...uiDist,
    esm: uiEsm,
    cjs: uiCjs,
    fontBytes: uiFonts.reduce((sum, file) => sum + bytes(file), 0),
  },
  playgroundDist: {
    ...playgroundDist,
    bundle: playgroundBundle,
    fontBytes: playgroundFonts.reduce((sum, file) => sum + bytes(file), 0),
  },
  interpretation: [
    "The playground remains a Vite reference application; the route shares the existing application bundle rather than creating a second package entry.",
    "No package split is justified by this bounded reference alone; repeat these measures when a real ERP consumer is adopted.",
  ],
};

console.log(JSON.stringify(result, null, 2));
