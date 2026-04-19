import { createApp } from "./app.js";

const app = await createApp();

try {
  await app.listen({ port: app.env.API_PORT, host: "0.0.0.0" });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
