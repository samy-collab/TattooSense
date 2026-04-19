import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  webServer: [
    {
      command: "npm run dev --workspace backend",
      url: "http://localhost:3333/api/quiz",
      reuseExistingServer: true,
      timeout: 120_000
    },
    {
      command: "npm run dev --workspace frontend",
      url: "http://localhost:5173",
      reuseExistingServer: true,
      timeout: 120_000
    }
  ],
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry"
  },
  projects: [
    { name: "desktop", testMatch: /tattooSenseQuiz\.spec\.ts/, use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", testMatch: /tattooSenseQuiz\.mobile\.spec\.ts/, use: { ...devices["Pixel 5"] } }
  ]
});
