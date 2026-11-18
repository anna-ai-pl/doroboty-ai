import { test, expect } from "@playwright/test";

test("public homepage sends SDK analytics and CTA stays functional", async ({ page }) => {
  test.skip(process.env.Q43_ANALYTICS !== "1", "Explicit analytics smoke only");
  const received: number[] = [];
  page.on("response", (response) => {
    const url = new URL(response.url());
    if (
      url.hostname === "eu.i.posthog.com" &&
      ["/i/", "/e/"].some((path) => url.pathname.startsWith(path))
    ) {
      received.push(response.status());
    }
  });
  await page.goto("/#/");
  await expect(page.locator('[data-ph-capture="q43-view-offers"]')).toBeVisible();
  await expect.poll(() => received.length, { timeout: 20000 }).toBeGreaterThan(0);
  await page.screenshot({ path: "artifacts/q43-homepage.png", fullPage: true });
  const beforeClick = received.length;
  console.log(`Q43 click UTC: ${new Date().toISOString()}`);
  await page.locator('[data-ph-capture="q43-view-offers"]').click();
  await expect(page).toHaveURL(/#\/oferty$/);
  await expect.poll(() => received.length, { timeout: 20000 }).toBeGreaterThan(beforeClick);
  expect(received.every((status) => status >= 200 && status < 300)).toBe(true);
});
