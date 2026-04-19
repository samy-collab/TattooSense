import { z } from "zod";

export const submittedAnswerSchema = z.object({
  questionKey: z.string().min(1),
  selectedOptionKeys: z.array(z.string().min(1)).optional(),
  textValue: z.string().trim().optional(),
  scaleValue: z.number().int().min(1).max(5).optional()
});

export const createRecommendationSchema = z.object({
  anonymousUserId: z.string().uuid().nullable().optional(),
  answers: z.array(submittedAnswerSchema).min(1)
});
