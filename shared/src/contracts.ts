export type QuizCategory =
  | "music"
  | "culture"
  | "personal_style"
  | "body_placement"
  | "size"
  | "visibility"
  | "composition"
  | "emotion";

export type QuizInputType = "single_choice" | "multi_choice" | "scale" | "free_text";

export interface AnswerOption {
  id: string;
  key: string;
  label: string;
  description: string | null;
}

export interface QuizQuestion {
  id: string;
  key: string;
  title: string;
  description: string | null;
  category: QuizCategory;
  inputType: QuizInputType;
  isRequired: boolean;
  options: AnswerOption[];
}

export interface QuizResponse {
  questions: QuizQuestion[];
}

export interface SubmittedAnswer {
  questionKey: string;
  selectedOptionKeys?: string[];
  textValue?: string;
  scaleValue?: number;
}

export interface CreateRecommendationRequest {
  anonymousUserId?: string | null;
  answers: SubmittedAnswer[];
}

export interface TattooStyle {
  key: string;
  name: string;
  summary: string;
  characteristics: string[];
  visualTraits: string[];
}

export interface Recommendation {
  style: TattooStyle;
  rank: number;
  score: number;
  compatibilityPercent: number;
  explanation: string;
  matchedSignals: string[];
}

export interface RecommendationResponse {
  sessionId: string;
  recommendations: Recommendation[];
  disclaimer: string;
}

export interface ValidationIssue {
  questionKey: string;
  message: string;
}

export interface ValidationErrorResponse {
  message: string;
  issues: ValidationIssue[];
}
