import type {
  CreateRecommendationRequest,
  QuizResponse,
  RecommendationResponse,
  ValidationErrorResponse
} from "@tattoosense/shared";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3333";

export class ApiValidationError extends Error {
  constructor(public readonly details: ValidationErrorResponse) {
    super(details.message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers
    }
  });

  if (response.status === 422) {
    throw new ApiValidationError((await response.json()) as ValidationErrorResponse);
  }

  if (!response.ok) {
    throw new Error(`Falha na comunicacao com o TattooSense (${response.status}).`);
  }

  return (await response.json()) as T;
}

export const tattooSenseApi = {
  getQuiz() {
    return request<QuizResponse>("/api/quiz");
  },

  createRecommendation(payload: CreateRecommendationRequest) {
    return request<RecommendationResponse>("/api/recommendations", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }
};
