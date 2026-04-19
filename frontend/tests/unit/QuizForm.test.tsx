import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { QuizForm } from "../../src/components/quiz/QuizForm";
import type { QuizQuestion } from "../../src/types/quiz";

const questions: QuizQuestion[] = [
  {
    id: "1",
    key: "music",
    title: "Musica preferida",
    description: null,
    category: "music",
    inputType: "single_choice",
    isRequired: true,
    options: [{ id: "o1", key: "rock", label: "Rock", description: null }]
  }
];

describe("QuizForm", () => {
  it("shows required validation messages before submit", async () => {
    render(<QuizForm questions={questions} onRecommended={vi.fn()} />);

    await userEvent.click(screen.getByRole("button", { name: /ver recomendacoes/i }));

    expect(screen.getByText("Responda esta pergunta para continuar.")).toBeInTheDocument();
  });
});
