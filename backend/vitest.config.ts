import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    env: {
      DATABASE_URL: "postgresql://tattoosense:tattoosense@localhost:5432/tattoosense_test",
      API_PORT: "3333",
      FRONTEND_ORIGIN: "http://localhost:5173"
    }
  }
});
