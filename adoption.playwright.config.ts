import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./research/10-adoption/tests",
  fullyParallel: false,
  workers: 1,
  reporter: "line",
  timeout: 30_000,
  use: {
    browserName: "chromium",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: [
    {
      command:
        "pnpm --filter @ten4seven/adoption-operational dev --host 127.0.0.1",
      reuseExistingServer: true,
      url: "http://127.0.0.1:4181",
    },
    {
      command: "pnpm --filter @ten4seven/adoption-public dev --host 127.0.0.1",
      reuseExistingServer: true,
      url: "http://127.0.0.1:4182",
    },
  ],
});
