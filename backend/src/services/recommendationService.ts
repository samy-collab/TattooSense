import type { CreateRecommendationRequest, RecommendationResponse } from "@tattoosense/shared";
import { RecommendationRepository } from "../repositories/recommendationRepository.js";
import { StyleRepository } from "../repositories/styleRepository.js";
import { RecommendationValidationError } from "../schemas/recommendationSchemas.js";
import { scoreStyles, type ScoringAnswer } from "./scoringRules.js";

export const RECOMMENDATION_DISCLAIMER =
  "As recomendacoes do TattooSense sao apenas orientacao estetica e nao substituem conversa com tatuador profissional, nem conselho de saude, seguranca ou juridico.";

export class RecommendationService {
  constructor(
    private readonly recommendationRepository: RecommendationRepository,
    private readonly styleRepository: StyleRepository
  ) {}

  async createRecommendation(payload: CreateRecommendationRequest): Promise<RecommendationResponse> {
    const questions = await this.recommendationRepository.getRequiredQuestions();
    const answerByQuestion = new Map(payload.answers.map((answer) => [answer.questionKey, answer]));
    const issues: Array<{ questionKey: string; message: string }> = [];

    for (const question of questions) {
      const answer = answerByQuestion.get(question.key);
      if (!question.isRequired) continue;
      if (!answer || !hasValue(answer)) {
        issues.push({ questionKey: question.key, message: "Responda esta pergunta para gerar recomendacoes." });
        continue;
      }

      if (question.inputType === "single_choice" && (answer.selectedOptionKeys?.length ?? 0) !== 1) {
        issues.push({ questionKey: question.key, message: "Escolha uma opcao." });
      }
      if (question.inputType === "multi_choice" && (answer.selectedOptionKeys?.length ?? 0) < 1) {
        issues.push({ questionKey: question.key, message: "Escolha pelo menos uma opcao." });
      }
    }

    if (issues.length > 0) throw new RecommendationValidationError(issues);

    const optionLookup = new Map(
      questions.flatMap((question) => question.options.map((option) => [`${question.key}:${option.key}`, { question, option }] as const))
    );
    const normalizedAnswers = payload.answers.flatMap((answer) => {
      const question = questions.find((item) => item.key === answer.questionKey);
      if (!question) return [];
      const selectedOptionKeys = answer.selectedOptionKeys ?? [];
      const optionIds = selectedOptionKeys.flatMap((optionKey) => optionLookup.get(`${answer.questionKey}:${optionKey}`)?.option.id ?? []);
      return {
        questionId: question.id,
        optionIds,
        textValue: answer.textValue,
        scaleValue: answer.scaleValue
      };
    });

    const scoringAnswers: ScoringAnswer[] = payload.answers.map((answer) => ({
      questionKey: answer.questionKey,
      selectedOptionKeys: answer.selectedOptionKeys ?? [],
      textValue: answer.textValue,
      scaleValue: answer.scaleValue
    }));

    const recommendations = scoreStyles(await this.styleRepository.findStylesWithRules(), scoringAnswers);
    const session = await this.recommendationRepository.persistRecommendation({
      anonymousUserId: payload.anonymousUserId,
      answers: normalizedAnswers,
      recommendations
    });

    return {
      sessionId: session.id,
      recommendations,
      disclaimer: RECOMMENDATION_DISCLAIMER
    };
  }
}

function hasValue(answer: CreateRecommendationRequest["answers"][number]) {
  return (
    (answer.selectedOptionKeys?.length ?? 0) > 0 ||
    typeof answer.scaleValue === "number" ||
    Boolean(answer.textValue?.trim())
  );
}
