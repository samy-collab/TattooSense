import { z } from "zod";

export const validationIssueSchema = z.object({
  questionKey: z.string(),
  message: z.string()
});

export const validationErrorResponseSchema = z.object({
  message: z.string(),
  issues: z.array(validationIssueSchema)
});

export class RecommendationValidationError extends Error {
  constructor(public readonly issues: Array<{ questionKey: string; message: string }>) {
    super("Algumas respostas precisam de ajuste antes de gerar as recomendacoes.");
  }
}
