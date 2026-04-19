import type { QuizResponse } from "@tattoosense/shared";
import { QuizRepository } from "../repositories/quizRepository.js";

export class QuizService {
  constructor(private readonly quizRepository: QuizRepository) {}

  async getQuiz(): Promise<QuizResponse> {
    const questions = await this.quizRepository.findActiveQuestions();
    return {
      questions: questions.map((question) => ({
        id: question.id,
        key: question.key,
        title: question.title,
        description: question.description,
        category: question.category,
        inputType: question.inputType,
        isRequired: question.isRequired,
        options: question.options.map((option) => ({
          id: option.id,
          key: option.key,
          label: option.label,
          description: option.description
        }))
      }))
    };
  }
}
