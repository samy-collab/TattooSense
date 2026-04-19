import type { Prisma, PrismaClient } from "@prisma/client";
import type { Recommendation } from "@tattoosense/shared";

interface PersistAnswerInput {
  questionId: string;
  optionIds: string[];
  textValue?: string | null;
  scaleValue?: number | null;
}

export class RecommendationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  getRequiredQuestions() {
    return this.prisma.quizQuestion.findMany({
      where: { isActive: true },
      include: {
        options: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" }
        }
      },
      orderBy: { sortOrder: "asc" }
    });
  }

  async persistRecommendation(input: {
    anonymousUserId?: string | null;
    answers: PersistAnswerInput[];
    recommendations: Recommendation[];
  }) {
    return this.prisma.$transaction(async (tx) => {
      const session = await tx.recommendationSession.create({
        data: {
          anonymousUserId: input.anonymousUserId ?? null,
          status: "completed"
        }
      });

      for (const answer of input.answers) {
        const createdAnswer = await tx.recommendationAnswer.create({
          data: {
            sessionId: session.id,
            questionId: answer.questionId,
            textValue: answer.textValue ?? null,
            scaleValue: answer.scaleValue ?? null
          }
        });

        if (answer.optionIds.length > 0) {
          await tx.recommendationAnswerOption.createMany({
            data: answer.optionIds.map((optionId) => ({
              answerId: createdAnswer.id,
              optionId
            }))
          });
        }
      }

      const styles = await tx.tattooStyle.findMany({
        where: { key: { in: input.recommendations.map((item) => item.style.key) } },
        select: { id: true, key: true }
      });
      const styleIdByKey = new Map(styles.map((style) => [style.key, style.id]));

      await tx.recommendationItem.createMany({
        data: input.recommendations.flatMap((item) => {
          const styleId = styleIdByKey.get(item.style.key);
          if (!styleId) return [];
          return {
            sessionId: session.id,
            styleId,
            rank: item.rank,
            score: item.score,
            compatibilityPercent: item.compatibilityPercent,
            explanation: item.explanation,
            matchedSignals: item.matchedSignals as Prisma.InputJsonValue
          };
        })
      });

      return session;
    });
  }
}
