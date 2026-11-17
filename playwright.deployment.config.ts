import { defineConfig, devices } from "@playwright/test";
const baseURL = process.env.Q42_URL;
if (!baseURL || new URL(baseURL).protocol !== "https:")
  throw new Error("Q42_URL must be an explicit HTTPS deployment URL");
export default defineConfig({
  testDir: "./tests/deployment",
  retries: 0,
  workers: 1,
  reporter: "list",
  use: {
    baseURL,
    ...devices["Desktop Chrome"],
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
});
