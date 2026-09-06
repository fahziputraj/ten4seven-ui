import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { rollup } from "rollup";
import dts from "rollup-plugin-dts";

const packageDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoDir = resolve(packageDir, "../..");
const sourceDir = resolve(packageDir, "src");
const distDir = resolve(packageDir, "dist");

const contractsSource = resolve(repoDir, "packages/contracts/src/index.ts");
const workspaceSources = new Map([
  ["@ten4seven/contracts", contractsSource],
  // rollup-plugin-dts normalizes the package-root alias to this exporter while
  // traversing canonical.ts; resolve it back to the same portable source.
  ["src/index.ts", contractsSource],
]);

const resolveWorkspaceDeclaration = {
  name: "ten4seven-agent-workspace-declaration-aliases",
  resolveId(source) {
    return workspaceSources.get(source) ?? null;
  },
};

async function bundleDeclaration(entry, output) {
  const bundle = await rollup({
    input: resolve(sourceDir, entry),
    plugins: [resolveWorkspaceDeclaration, dts({ respectExternal: false })],
  });

  try {
    await bundle.write({
      file: resolve(distDir, output),
      format: "es",
    });
  } finally {
    await bundle.close();
  }
}

await rm(distDir, { force: true, recursive: true });
await mkdir(distDir, { recursive: true });

await Promise.all(
  ["core.mjs", "node.mjs", "retrieval.mjs", "runtime.mjs"].map((file) =>
    copyFile(resolve(sourceDir, file), resolve(distDir, file)),
  ),
);

await Promise.all([
  bundleDeclaration("index.ts", "index.d.ts"),
  bundleDeclaration("core.d.mts", "core.d.ts"),
  bundleDeclaration("node.d.mts", "node.d.ts"),
  bundleDeclaration("retrieval.d.mts", "retrieval.d.ts"),
  bundleDeclaration("runtime.d.mts", "runtime.d.ts"),
]);

const manifest = JSON.parse(
  await readFile(resolve(packageDir, "package.json"), "utf8"),
);
await writeFile(
  resolve(distDir, "package-build.json"),
  `${JSON.stringify(
    {
      name: manifest.name,
      version: manifest.version,
      runtime: ["core.mjs", "node.mjs", "retrieval.mjs", "runtime.mjs"],
      declarations: [
        "index.d.ts",
        "core.d.ts",
        "node.d.ts",
        "retrieval.d.ts",
        "runtime.d.ts",
      ],
      generatedProjectionRoot: "../generated",
      workspaceRuntimeDependencies: [],
    },
    null,
    2,
  )}\n`,
  "utf8",
);

console.log(`Built ${manifest.name}@${manifest.version} at ${distDir}`);
