import type { PrismaClient } from "@prisma/client";

export class QuizRepository {
  constructor(private readonly prisma: PrismaClient) {}

  findActiveQuestions() {
    return this.prisma.quizQuestion.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      include: {
        options: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" }
        }
      }
    });
  }
}
