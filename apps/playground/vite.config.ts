import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const playgroundRoot = resolve(
  fileURLToPath(new URL(".", import.meta.url)),
  "../..",
);
const playgroundPackage = JSON.parse(
  readFileSync(resolve(playgroundRoot, "apps/playground/package.json"), "utf8"),
) as { version?: string };

function readGitValue(args: string[]) {
  try {
    return (
      execFileSync("git", args, {
        cwd: playgroundRoot,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim() || "unknown"
    );
  } catch {
    return "unknown";
  }
}

const gitStatus = readGitValue(["status", "--porcelain"]);
const buildIdentity = {
  appVersion: playgroundPackage.version ?? "unknown",
  branch: readGitValue(["branch", "--show-current"]),
  commit: readGitValue(["rev-parse", "--short=8", "HEAD"]),
  dirty: gitStatus !== "unknown" && gitStatus !== "",
};

export default defineConfig({
  plugins: [react()],
  define: {
    __T7_BUILD_IDENTITY__: JSON.stringify(buildIdentity),
  },
  server: {
    port: 4173,
    strictPort: true,
  },
});
