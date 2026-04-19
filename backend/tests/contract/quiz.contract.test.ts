import type { PrismaClient } from "@prisma/client";
import { describe, expect, it } from "vitest";
import { createApp } from "../../src/app.js";

describe("GET /api/quiz", () => {
  it("returns active ordered questions and options", async () => {
    const prisma = {
      quizQuestion: {
        findMany: async () => [
          {
            id: "question-id",
            key: "music",
            title: "Music",
            description: null,
            category: "music",
            inputType: "single_choice",
            isRequired: true,
            options: [{ id: "option-id", key: "rock", label: "Rock", description: null }]
          }
        ]
      }
    } as unknown as PrismaClient;
    const app = await createApp({ prisma });

    const response = await app.inject({ method: "GET", url: "/api/quiz" });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      questions: [
        {
          id: "question-id",
          key: "music",
          title: "Music",
          description: null,
          category: "music",
          inputType: "single_choice",
          isRequired: true,
          options: [{ id: "option-id", key: "rock", label: "Rock", description: null }]
        }
      ]
    });
    await app.close();
  });
});
