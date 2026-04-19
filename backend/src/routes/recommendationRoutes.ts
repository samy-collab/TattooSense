import type { FastifyPluginAsync } from "fastify";
import { RecommendationRepository } from "../repositories/recommendationRepository.js";
import { StyleRepository } from "../repositories/styleRepository.js";
import { createRecommendationSchema } from "../schemas/quizSchemas.js";
import { RecommendationService } from "../services/recommendationService.js";

export const recommendationRoutes: FastifyPluginAsync = async (app) => {
  app.post("/recommendations", async (request, reply) => {
    const payload = createRecommendationSchema.parse(request.body);
    const service = new RecommendationService(
      new RecommendationRepository(app.prisma),
      new StyleRepository(app.prisma)
    );
    const response = await service.createRecommendation(payload);
    return reply.status(201).send(response);
  });
};
