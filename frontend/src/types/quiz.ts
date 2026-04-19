import type { QuizQuestion, QuizResponse, SubmittedAnswer } from "@tattoosense/shared";

export type { QuizQuestion, QuizResponse, SubmittedAnswer };

export type DraftAnswers = Record<
  string,
  {
    selectedOptionKeys: string[];
    textValue: string;
    scaleValue?: number;
  }
>;
