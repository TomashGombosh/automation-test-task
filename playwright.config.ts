import { defineConfig, devices } from "@playwright/test";

const CI_RETRIES = 2;
const CI_WORKERS = 1;
const LOCAL_RETRIES = 0;

export default defineConfig({
  testDir: "./src/test",
  fullyParallel: true,
  retries: process.env.CI ? CI_RETRIES : LOCAL_RETRIES,
  workers: process.env.CI ? CI_WORKERS : undefined,
  reporter: "html",
  use: {
    baseURL: "https://qa-task.redvike.rocks/",
    trace: "on",
    video: "on",
    screenshot: "on",
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--mute-audio",
            "--use-fake-ui-for-media-stream",
            "--disable-translate",
          ],
          ignoreDefaultArgs: ["--enable-automation"],
        },
      },
      testMatch: "**/test/**/*.test.ts",
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      testMatch: "**/test/**/*.test.ts",
    },
  ],
});
