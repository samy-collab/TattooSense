import { useMemo, useState, type FormEvent } from "react";
import type { RecommendationResponse } from "@tattoosense/shared";
import { ApiValidationError, tattooSenseApi } from "../../services/tattooSenseApi";
import type { DraftAnswers, QuizQuestion } from "../../types/quiz";
import { QuizQuestion as QuestionRenderer } from "./QuizQuestion";

interface QuizFormProps {
  questions: QuizQuestion[];
  onRecommended: (result: RecommendationResponse) => void;
}

const emptyAnswer: DraftAnswers[string] = { selectedOptionKeys: [], textValue: "", scaleValue: undefined };

export function QuizForm({ questions, onRecommended }: QuizFormProps) {
  const initialAnswers = useMemo(
    () =>
      Object.fromEntries(
        questions.map((question) => [question.key, { selectedOptionKeys: [], textValue: "", scaleValue: undefined }])
      ) as DraftAnswers,
    [questions]
  );
  const [answers, setAnswers] = useState<DraftAnswers>(initialAnswers);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitError(null);
    const nextErrors = validateRequiredQuestions(questions, answers);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const result = await tattooSenseApi.createRecommendation({
        answers: questions.map((question) => {
          const answer = answers[question.key] ?? emptyAnswer;
          return {
            questionKey: question.key,
            selectedOptionKeys: answer.selectedOptionKeys,
            textValue: answer.textValue.trim() || undefined,
            scaleValue: answer.scaleValue
          };
        })
      });
      onRecommended(result);
    } catch (error) {
      if (error instanceof ApiValidationError) {
        setErrors(
          Object.fromEntries(error.details.issues.map((issue) => [issue.questionKey, issue.message]))
        );
      } else {
        setSubmitError(error instanceof Error ? error.message : "Nao foi possivel gerar a recomendacao.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="quiz-form" onSubmit={handleSubmit}>
      {questions.map((question) => (
        <QuestionRenderer
          key={question.key}
          question={question}
          value={answers[question.key] ?? emptyAnswer}
          error={errors[question.key]}
          onChange={(value) => {
            setAnswers((current) => ({ ...current, [question.key]: value }));
            setErrors((current) => {
              const { [question.key]: _removed, ...rest } = current;
              return rest;
            });
          }}
        />
      ))}
      {submitError ? <p className="submit-error">{submitError}</p> : null}
      <button className="primary-action" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Analisando..." : "Ver recomendacoes"}
      </button>
    </form>
  );
}

export function validateRequiredQuestions(questions: QuizQuestion[], answers: DraftAnswers) {
  const errors: Record<string, string> = {};
  for (const question of questions) {
    if (!question.isRequired) continue;
    const answer = answers[question.key];
    const hasSelection = (answer?.selectedOptionKeys.length ?? 0) > 0;
    const hasScale = typeof answer?.scaleValue === "number";
    const hasText = Boolean(answer?.textValue.trim());
    if (!hasSelection && !hasScale && !hasText) {
      errors[question.key] = "Responda esta pergunta para continuar.";
    }
  }
  return errors;
}
