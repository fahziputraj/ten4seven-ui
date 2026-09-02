import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";

import { compile } from "tailwindcss";

const repoRoot = path.resolve(import.meta.dirname, "..");
const packageDir = path.join(repoRoot, "packages", "ui");
const fixtureDir = path.join(repoRoot, "consumer-tests", "tailwind-bridge");
const packageBuildScript = path.join(
  packageDir,
  "scripts",
  "build-package.mjs",
);
const fixturePackagePath = path.join(fixtureDir, "package.json");
const fixtureCssPath = path.join(fixtureDir, "entry.css");
const packageManifest = JSON.parse(await readFile(fixturePackagePath, "utf8"));
const fixtureCss = await readFile(fixtureCssPath, "utf8");

assert.equal(
  packageManifest.dependencies?.["@ten4seven/ui"],
  "file:../../packages/ui",
  "the Tailwind consumer fixture must use the public UI package boundary",
);
assert.equal(
  packageManifest.devDependencies?.tailwindcss,
  "4.3.3",
  "the Tailwind consumer fixture must pin its compiler",
);

execFileSync(process.execPath, [packageBuildScript], {
  cwd: repoRoot,
  stdio: "inherit",
});

const externalConsumerDir = await mkdtemp(
  path.join(os.tmpdir(), "ten4seven-tailwind-consumer-"),
);

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const expectedUtilities = [
  {
    selector: ".bg-t7-primary",
    declaration: "background-color: hsl(var(--t7-action-primary-hsl));",
  },
  {
    selector: ".text-t7-primary-foreground",
    declaration: "color: hsl(var(--t7-action-primary-foreground-hsl));",
  },
  {
    selector: ".hover\\:bg-t7-primary-hover:hover",
    declaration: "background-color: hsl(var(--t7-action-primary-hover-hsl));",
  },
  {
    selector: ".rounded-t7-card",
    declaration: "border-radius: var(--t7-radius-card);",
  },
  {
    selector: ".border-t7-border",
    declaration: "border-color: hsl(var(--t7-border-hsl));",
  },
  {
    selector: ".h-t7-control",
    declaration: "height: var(--t7-control-height);",
  },
];

const resolveConsumerStylesheet = async (id, base) => {
  const consumerRequire = createRequire(
    path.join(base, "tailwind-bridge-resolver.cjs"),
  );
  const stylesheetPath =
    id === "tailwindcss"
      ? consumerRequire.resolve("tailwindcss/index.css")
      : consumerRequire.resolve(id);

  return {
    base: path.dirname(stylesheetPath),
    content: await readFile(stylesheetPath, "utf8"),
    path: stylesheetPath,
  };
};

try {
  const scopedNodeModules = path.join(externalConsumerDir, "node_modules");
  const scopedPackageDir = path.join(scopedNodeModules, "@ten4seven");
  const scopedUiPackage = path.join(scopedPackageDir, "ui");
  const scopedTailwindPackage = path.join(scopedNodeModules, "tailwindcss");
  const sourcePath = path.join(externalConsumerDir, "entry.css");

  await mkdir(scopedPackageDir, { recursive: true });
  await symlink(packageDir, scopedUiPackage, "junction");
  await symlink(
    path.join(repoRoot, "node_modules", "tailwindcss"),
    scopedTailwindPackage,
    "junction",
  );
  await Promise.all([
    writeFile(
      path.join(externalConsumerDir, "package.json"),
      `${JSON.stringify(packageManifest, null, 2)}\n`,
      "utf8",
    ),
    writeFile(sourcePath, fixtureCss, "utf8"),
  ]);

  const dependencies = new Set();
  const compiler = await compile(fixtureCss, {
    base: externalConsumerDir,
    from: sourcePath,
    async loadStylesheet(id, base) {
      const stylesheet = await resolveConsumerStylesheet(id, base);
      dependencies.add(path.normalize(stylesheet.path));
      return stylesheet;
    },
  });
  const output = compiler.build([]);

  for (const expected of expectedUtilities) {
    assert.match(
      output,
      new RegExp(
        `${escapeRegex(expected.selector)}\\s*\\{[\\s\\S]*?${escapeRegex(expected.declaration)}`,
      ),
      `Tailwind did not compile ${expected.selector} from the published bridge`,
    );
  }

  for (const publishedFile of ["theme.css", "tailwind.css"])
    assert.ok(
      dependencies.has(
        path.normalize(path.join(packageDir, "dist", publishedFile)),
      ),
      `consumer compilation did not import the published ${publishedFile}`,
    );

  assert.match(
    output,
    /:where\(\[data-t7-theme="enterprise"\]\[data-t7-mode="light"\]\)/,
    "consumer compilation omitted the published semantic theme layer",
  );

  console.log(
    `Tailwind bridge consumer proof verified: ${expectedUtilities.length} semantic utilities compiled from published theme.css and tailwind.css, including primary foreground.`,
  );
} finally {
  await rm(externalConsumerDir, { force: true, recursive: true });
}
