import { execFile } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { build as esbuild } from "esbuild";
import { rollup } from "rollup";
import dts from "rollup-plugin-dts";

const packageDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoDir = resolve(packageDir, "../..");
const distDir = resolve(packageDir, "dist");
const typesDir = resolve(distDir, ".types");
const run = promisify(execFile);

const packageManifest = JSON.parse(
  await readFile(resolve(packageDir, "package.json"), "utf8"),
);

await rm(distDir, { force: true, recursive: true });
await mkdir(distDir, { recursive: true });

const workspaceRuntimeSources = {
  "@ten4seven/contracts": resolve(repoDir, "packages/contracts/src/index.ts"),
  "@ten4seven/tokens": resolve(repoDir, "packages/tokens/src/index.ts"),
};

await esbuild({
  alias: workspaceRuntimeSources,
  bundle: true,
  entryPoints: {
    index: resolve(packageDir, "src/index.ts"),
    renderer: resolve(packageDir, "src/renderer.tsx"),
  },
  external: ["react", "react-native", "react-native-safe-area-context"],
  format: "esm",
  logLevel: "warning",
  outdir: distDir,
  platform: "neutral",
  sourcemap: true,
  target: "es2022",
});

await run(
  process.execPath,
  [
    resolve(packageDir, "node_modules/typescript/bin/tsc"),
    "-p",
    resolve(packageDir, "tsconfig.json"),
    "--declaration",
    "--emitDeclarationOnly",
    "--outDir",
    typesDir,
    "--noEmit",
    "false",
  ],
  { cwd: repoDir, encoding: "utf8" },
);

const workspaceDeclarationSources = new Map([
  ["@ten4seven/contracts", resolve(typesDir, "contracts/src/index.d.ts")],
  ["@ten4seven/tokens", resolve(typesDir, "tokens/src/index.d.ts")],
]);

const declarationCompilerOptions = {
  baseUrl: packageDir,
  paths: {
    "@ten4seven/contracts": ["../contracts/src/index.ts"],
    "@ten4seven/tokens": ["../tokens/src/index.ts"],
  },
};

for (const [name, input] of [
  ["index", resolve(typesDir, "native/src/index.d.ts")],
  ["renderer", resolve(typesDir, "native/src/renderer.d.ts")],
]) {
  const declarationBundle = await rollup({
    external: ["react", "react-native", "react-native-safe-area-context"],
    input,
    plugins: [
      {
        name: "ten4seven-native-workspace-declaration-aliases",
        resolveId(source) {
          return workspaceDeclarationSources.get(source) ?? null;
        },
      },
      dts({
        compilerOptions: declarationCompilerOptions,
        includeExternal: ["@ten4seven/contracts", "@ten4seven/tokens"],
        respectExternal: true,
      }),
    ],
  });

  try {
    await declarationBundle.write({
      file: resolve(distDir, `${name}.d.ts`),
      format: "es",
    });
  } finally {
    await declarationBundle.close();
  }
}

await rm(typesDir, { force: true, recursive: true });

await writeFile(
  resolve(distDir, "package-build.json"),
  `${JSON.stringify(
    {
      name: packageManifest.name,
      version: packageManifest.version,
      rendererBoundary: "native",
      entries: {
        root: { runtime: "index.js", declarations: "index.d.ts" },
        renderer: { runtime: "renderer.js", declarations: "renderer.d.ts" },
      },
      externalPeers: [
        "react",
        "react-native",
        "react-native-safe-area-context",
      ],
      bundles: [
        "shared-contracts",
        "shared-token-resolution",
        "native-renderer-adapters",
      ],
      sourceOfTruth: "packages/contracts/src and packages/tokens/src",
      publishStatus: "private-internal-artifact",
    },
    null,
    2,
  )}\n`,
  "utf8",
);

console.log(
  `Built ${packageManifest.name}@${packageManifest.version} at ${distDir}`,
);
