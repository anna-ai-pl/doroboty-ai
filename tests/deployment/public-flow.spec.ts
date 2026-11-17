import { test, expect } from "@playwright/test";

test("anonymous HTTPS application and employer decision survive reload", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/#/auth/sign-in");
  await page.getByRole("button", { name: "Wejdź jako Anna Kowalska", exact: true }).click();
  await page.goto("/#/aplikuj/ai-product-manager");
  await page
    .getByLabel("Dlaczego pasujesz do tej roli?")
    .fill(
      "Scenariusz testowy: prowadzę badania użytkowników, tworzę prototypy i sprawdzam działanie procesów. Wyłącznie fikcyjna aplikacja do ćwiczenia kursowego.",
    );
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Wyślij aplikację", exact: true }).click();
  await expect(page.getByText("Aplikacja została wysłana.", { exact: false })).toBeVisible();
  await page.reload();
  await page.getByRole("link", { name: "AI Product Manager", exact: true }).click();
  const candidateUrl = page.url();
  await page.goto("/#/auth/sign-in");
  await page.getByRole("button", { name: "Wejdź jako Karolina Wiśniewska", exact: true }).click();
  await page.getByRole("link", { name: "Kandydaci", exact: true }).click();
  await page.getByRole("link", { name: "Anna Kowalska", exact: true }).click();
  await page.getByRole("button", { name: "W przeglądzie", exact: true }).click();
  await page.getByRole("button", { name: "Zaproszenie na rozmowę", exact: true }).click();
  await page.reload();
  await page.goto("/#/auth/sign-in");
  await page.getByRole("button", { name: "Wejdź jako Anna Kowalska", exact: true }).click();
  await page.goto(candidateUrl);
  await expect(page.locator(".record-stage")).toHaveText("Zaproszenie na rozmowę");
  expect(errors).toEqual([]);
  await page.screenshot({ path: "artifacts/q42-public-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "artifacts/q42-public-mobile.png", fullPage: true });
});
