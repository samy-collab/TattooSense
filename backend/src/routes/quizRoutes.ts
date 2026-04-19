import type { FastifyPluginAsync } from "fastify";
import { QuizRepository } from "../repositories/quizRepository.js";
import { QuizService } from "../services/quizService.js";

export const quizRoutes: FastifyPluginAsync = async (app) => {
  app.get("/quiz", async () => {
    const service = new QuizService(new QuizRepository(app.prisma));
    return service.getQuiz();
  });
};
