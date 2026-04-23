import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RecommendationResults } from "../../src/components/recommendations/RecommendationResults";

describe("RecommendationResults", () => {
  it("renders recommendation card content and disclaimer", () => {
    render(
      <RecommendationResults
        onRestart={vi.fn()}
        result={{
          sessionId: "session",
          disclaimer: "Orientacao estetica apenas.",
          recommendations: [
            {
              rank: 1,
              score: 12,
              compatibilityPercent: 91,
              explanation: "Combina com referencias leves.",
              matchedSignals: ["leveza"],
              style: {
                key: "fine_line",
                name: "Fine Line",
                summary: "Traco fino e delicado.",
                characteristics: ["traco fino"],
                visualTraits: ["leveza"]
              }
            }
          ]
        }}
      />
    );

    expect(screen.getByText("Fine Line")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Referencia visual de tatuagem Fine Line" })).toBeInTheDocument();
    expect(screen.getByText("91%")).toBeInTheDocument();
    expect(screen.getByText("Orientacao estetica apenas.")).toBeInTheDocument();
  });
});
