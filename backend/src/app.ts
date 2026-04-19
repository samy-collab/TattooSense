import cors from "@fastify/cors";
import type { PrismaClient } from "@prisma/client";
import Fastify from "fastify";
import { ZodError } from "zod";
import { RecommendationValidationError } from "./schemas/recommendationSchemas.js";
import { envPlugin } from "./plugins/env.js";
import { prismaPlugin } from "./plugins/prisma.js";
import { quizRoutes } from "./routes/quizRoutes.js";
import { recommendationRoutes } from "./routes/recommendationRoutes.js";
import { styleRoutes } from "./routes/styleRoutes.js";

interface AppOptions {
  prisma?: PrismaClient;
}

export async function createApp(options: AppOptions = {}) {
  const app = Fastify({ logger: true });

  await app.register(envPlugin);
  await app.register(cors, { origin: app.env.FRONTEND_ORIGIN });

  if (options.prisma) {
    app.decorate("prisma", options.prisma);
  } else {
    await app.register(prismaPlugin);
  }

  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof RecommendationValidationError) {
      return reply.status(422).send({ message: error.message, issues: error.issues });
    }

    if (error instanceof ZodError) {
      return reply.status(422).send({
        message: "Payload invalido.",
        issues: error.issues.map((issue) => ({
          questionKey: issue.path.join(".") || "payload",
          message: issue.message
        }))
      });
    }

    app.log.error(error);
    return reply.status(500).send({ message: "Erro interno do TattooSense." });
  });

  await app.register(quizRoutes, { prefix: "/api" });
  await app.register(recommendationRoutes, { prefix: "/api" });
  await app.register(styleRoutes, { prefix: "/api" });

  return app;
}
