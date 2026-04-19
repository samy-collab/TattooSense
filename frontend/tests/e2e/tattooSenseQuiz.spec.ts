import { expect, test } from "@playwright/test";

test("completes the quiz and shows recommendations on desktop", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("radio", { name: /rock classico/i }).check();
  await page.getByRole("checkbox", { name: /objetos e cartazes vintage/i }).check();
  await page.getByRole("radio", { name: /classico com presenca/i }).check();
  await page.getByRole("radio", { name: /braco ou antebraco/i }).check();
  await page.getByRole("radio", { name: /^media/i }).check();
  await page.getByRole("radio", { name: "4" }).check();
  await page.getByRole("radio", { name: /simbolo/i }).check();
  await page.getByRole("checkbox", { name: /forca/i }).check();
  await page.getByRole("button", { name: /ver recomendacoes/i }).click();

  await expect(page.getByRole("heading", { name: /estilos mais compativeis/i })).toBeVisible();
  await expect(page.getByText(/orientacao estetica/i)).toBeVisible();
});
