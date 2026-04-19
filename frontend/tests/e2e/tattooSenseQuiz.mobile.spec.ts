import { expect, test } from "@playwright/test";

test("shows recommendation results on mobile", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("radio", { name: /indie, folk/i }).check();
  await page.getByRole("checkbox", { name: /natureza, animais/i }).check();
  await page.getByRole("radio", { name: /limpo e discreto/i }).check();
  await page.getByRole("radio", { name: /pulso, tornozelo/i }).check();
  await page.getByRole("radio", { name: /^pequena/i }).check();
  await page.getByRole("radio", { name: "2" }).check();
  await page.getByRole("radio", { name: /frase ou palavra/i }).check();
  await page.getByRole("checkbox", { name: /^memoria/i }).check();
  await page.getByRole("button", { name: /ver recomendacoes/i }).click();

  await expect(page.getByRole("heading", { name: /estilos mais compativeis/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /refazer/i })).toBeVisible();
});
