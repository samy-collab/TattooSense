import type { PrismaClient } from "@prisma/client";
import { describe, expect, it } from "vitest";
import { createApp } from "../../src/app.js";

function createPrismaStub() {
  const question = {
    id: "question-id",
    key: "music",
    inputType: "single_choice",
    isRequired: true,
    options: [{ id: "option-id", key: "rock" }]
  };
  const style = {
    id: "style-id",
    key: "old_school",
    name: "Old School",
    summary: "Classic",
    characteristics: ["bold"],
    visualTraits: ["color"],
    compatibilityRules: [
      {
        id: "rule-id",
        styleId: "style-id",
        questionId: "question-id",
        answerOptionId: "option-id",
        condition: null,
        weight: 8,
        reasonTemplate: "rock classic",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        answerOption: { key: "rock", label: "Rock", question: { ...question, title: "Music" } },
        question
      }
    ]
  };
  return {
    quizQuestion: { findMany: async () => [question] },
    tattooStyle: { findMany: async () => [style] },
    $transaction: async (callback: (tx: unknown) => Promise<unknown>) =>
      callback({
        recommendationSession: { create: async () => ({ id: "session-id" }) },
        recommendationAnswer: { create: async () => ({ id: "answer-id" }) },
        recommendationAnswerOption: { createMany: async () => ({ count: 1 }) },
        tattooStyle: { findMany: async () => [{ id: "style-id", key: "old_school" }] },
        recommendationItem: { createMany: async () => ({ count: 1 }) }
      })
  } as unknown as PrismaClient;
}

describe("POST /api/recommendations", () => {
  it("returns 201 with recommendation result", async () => {
    const app = await createApp({ prisma: createPrismaStub() });

    const response = await app.inject({
      method: "POST",
      url: "/api/recommendations",
      payload: { answers: [{ questionKey: "music", selectedOptionKeys: ["rock"] }] }
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toMatchObject({
      sessionId: "session-id",
      recommendations: [{ style: { key: "old_school" }, rank: 1 }],
      disclaimer: expect.stringContaining("orientacao estetica")
    });
    await app.close();
  });

  it("returns 422 for invalid payloads", async () => {
    const app = await createApp({ prisma: createPrismaStub() });

    const response = await app.inject({
      method: "POST",
      url: "/api/recommendations",
      payload: { answers: [] }
    });

    expect(response.statusCode).toBe(422);
    await app.close();
  });
});
