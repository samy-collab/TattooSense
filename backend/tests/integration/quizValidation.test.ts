import type { PrismaClient } from "@prisma/client";
import { describe, expect, it } from "vitest";
import { createApp } from "../../src/app.js";

describe("quiz answer validation", () => {
  it("returns 422 for incomplete required answers", async () => {
    const prisma = {
      quizQuestion: {
        findMany: async () => [
          {
            id: "question-id",
            key: "music",
            inputType: "single_choice",
            isRequired: true,
            options: [{ id: "option-id", key: "rock" }]
          }
        ]
      }
    } as unknown as PrismaClient;
    const app = await createApp({ prisma });

    const response = await app.inject({
      method: "POST",
      url: "/api/recommendations",
      payload: { answers: [{ questionKey: "music", selectedOptionKeys: [] }] }
    });

    expect(response.statusCode).toBe(422);
    expect(response.json().issues).toEqual([
      { questionKey: "music", message: "Responda esta pergunta para gerar recomendacoes." }
    ]);
    await app.close();
  });
});
