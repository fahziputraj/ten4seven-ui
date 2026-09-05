import { spawn } from "node:child_process";
import { access, readdir, readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = resolve(fileURLToPath(new URL("..", import.meta.url)));
const consumerDir = resolve(repoDir, "consumer-tests/next-app-router-consumer");
const artifactDir = resolve(repoDir, "artifacts/consumer-proof");
const artifactPath = resolve(artifactDir, "ten4seven-ui-1.0.0.tgz");
const pnpmCommand = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

function run(args, cwd) {
  return new Promise((resolveRun, rejectRun) => {
    const command =
      process.platform === "win32"
        ? (process.env.ComSpec ?? "cmd.exe")
        : pnpmCommand;
    const commandArgs =
      process.platform === "win32"
        ? ["/d", "/s", "/c", pnpmCommand, ...args]
        : args;
    const child = spawn(command, commandArgs, {
      cwd,
      env: process.env,
      stdio: "inherit",
      windowsHide: true,
    });
    child.once("error", rejectRun);
    child.once("exit", (code, signal) => {
      if (code === 0) resolveRun();
      else
        rejectRun(
          new Error(
            `Command failed (${code ?? signal}): pnpm ${args.join(" ")}`,
          ),
        );
    });
  });
}

async function assertSingleReactRuntime() {
  const packageJson = JSON.parse(
    await readFile(resolve(consumerDir, "package.json"), "utf8"),
  );
  const reactManifest = JSON.parse(
    await readFile(
      resolve(consumerDir, "node_modules/react/package.json"),
      "utf8",
    ),
  );
  const reactDomManifest = JSON.parse(
    await readFile(
      resolve(consumerDir, "node_modules/react-dom/package.json"),
      "utf8",
    ),
  );
  if (
    packageJson.dependencies.react !== "19.2.8" ||
    packageJson.dependencies["react-dom"] !== "19.2.8" ||
    reactManifest.version !== "19.2.8" ||
    reactDomManifest.version !== "19.2.8"
  )
    throw new Error("consumer did not resolve the pinned React 19.2 runtime");

  const pnpmStore = resolve(consumerDir, "node_modules/.pnpm");
  const entries = await readdir(pnpmStore);
  const reactEntries = entries.filter((entry) => /^react@/.test(entry));
  const reactDomEntries = entries.filter((entry) => /^react-dom@/.test(entry));
  if (reactEntries.length !== 1 || reactDomEntries.length !== 1)
    throw new Error(
      `consumer resolved duplicate React packages: ${reactEntries.join(", ")} / ${reactDomEntries.join(", ")}`,
    );
  console.log(
    `Single React runtime verified: ${reactManifest.version} / ${reactDomManifest.version}.`,
  );
}

async function assertConsumerBoundaries() {
  const serverPage = await readFile(
    resolve(consumerDir, "app/page.tsx"),
    "utf8",
  );
  const serverLayout = await readFile(
    resolve(consumerDir, "app/layout.tsx"),
    "utf8",
  );
  const clientProvider = await readFile(
    resolve(consumerDir, "app/client-provider.tsx"),
    "utf8",
  );
  if (/^\s*["']use client["'];/m.test(serverPage))
    throw new Error("the proof route must remain a Server Component");
  if (!/^\s*["']use client["'];/m.test(clientProvider))
    throw new Error(
      "the provider wrapper must be an explicit Client Component",
    );
  if (!serverLayout.includes('import "@ten4seven/ui/styles.css";'))
    throw new Error("the server layout must import the package stylesheet");
}

// Verification is local and isolated from the release artifact directory.
// It never calls the release workflow, publishes, tags, or changes a version.
await run(["package:build"], repoDir);
await run(["package:verify"], repoDir);
await run(
  ["--filter", "@ten4seven/ui", "pack", "--pack-destination", artifactDir],
  repoDir,
);
const artifactStats = await stat(artifactPath);
if (artifactStats.size === 0)
  throw new Error("consumer proof produced an empty @ten4seven/ui artifact");
console.log(
  `Packed consumer artifact: ${artifactPath} (${artifactStats.size} bytes).`,
);
await assertConsumerBoundaries();

// The local tarball is rebuilt on every proof run and therefore receives a
// fresh file-integrity value. Keep the consumer lockfile current, then verify
// the exact installed artifact below; a frozen install would reject a
// legitimate newly packed local tarball before the proof could run.
await run(
  ["install", "--ignore-workspace", "--no-frozen-lockfile"],
  consumerDir,
);
await assertSingleReactRuntime();
await run(["run", "typecheck"], consumerDir);
await run(["run", "build"], consumerDir);
await run(["run", "test"], consumerDir);

await access(resolve(consumerDir, ".next"));
console.log(
  "Next.js 16 App Router consumer proof passed: install, strict typecheck, production build, and Playwright/axe smoke.",
);
