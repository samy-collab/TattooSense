import { describe, expect, it } from "vitest";
import { RecommendationRepository } from "../../src/repositories/recommendationRepository.js";

describe("RecommendationRepository", () => {
  it("persists sessions, answers, selected options, and recommendation items", async () => {
    const calls: string[] = [];
    const repository = new RecommendationRepository({
      $transaction: async (callback: (tx: unknown) => Promise<unknown>) =>
        callback({
          recommendationSession: {
            create: async () => {
              calls.push("session");
              return { id: "session-id" };
            }
          },
          recommendationAnswer: {
            create: async () => {
              calls.push("answer");
              return { id: "answer-id" };
            }
          },
          recommendationAnswerOption: {
            createMany: async () => {
              calls.push("answer-options");
              return { count: 1 };
            }
          },
          tattooStyle: {
            findMany: async () => [{ id: "style-id", key: "fine_line" }]
          },
          recommendationItem: {
            createMany: async () => {
              calls.push("items");
              return { count: 1 };
            }
          }
        })
    } as never);

    await repository.persistRecommendation({
      anonymousUserId: null,
      answers: [{ questionId: "question-id", optionIds: ["option-id"] }],
      recommendations: [
        {
          rank: 1,
          score: 10,
          compatibilityPercent: 95,
          explanation: "match",
          matchedSignals: ["signal"],
          style: {
            key: "fine_line",
            name: "Fine Line",
            summary: "summary",
            characteristics: ["trait"],
            visualTraits: ["visual"]
          }
        }
      ]
    });

    expect(calls).toEqual(["session", "answer", "answer-options", "items"]);
  });
});
