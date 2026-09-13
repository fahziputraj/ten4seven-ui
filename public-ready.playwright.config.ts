import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "public-ready-closure.spec.ts",
  timeout: 60_000,
  workers: 1,
  reporter: "line",
  use: { baseURL: "http://127.0.0.1:4173", trace: "retain-on-failure" },
  webServer: [
    {
      command: "pnpm dev --host 127.0.0.1",
      url: "http://127.0.0.1:4173",
      reuseExistingServer: true,
    },
    {
      command:
        "pnpm --filter @ten4seven/native-lab exec expo start --web --port 4175 --offline",
      url: "http://127.0.0.1:4175",
      reuseExistingServer: true,
      timeout: 90_000,
    },
  ],
});
