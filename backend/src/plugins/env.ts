import fp from "fastify-plugin";
import { config } from "dotenv";
import { z } from "zod";

config({ path: new URL("../../.env", import.meta.url) });

const envSchema = z.object({
  DATABASE_URL: z.string().url().or(z.string().startsWith("postgresql://")),
  API_PORT: z.coerce.number().int().positive().default(3333),
  FRONTEND_ORIGIN: z.string().url().default("http://localhost:5173")
});

export type AppEnv = z.infer<typeof envSchema>;

declare module "fastify" {
  interface FastifyInstance {
    env: AppEnv;
  }
}

export const envPlugin = fp(async (app) => {
  const parsed = envSchema.parse(process.env);
  app.decorate("env", parsed);
});
