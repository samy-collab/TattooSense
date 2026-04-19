import { describe, expect, it } from "vitest";
import { scoreStyles } from "../../src/services/scoringRules.js";

const baseStyle = {
  id: "style-id",
  summary: "summary",
  characteristics: ["trait"],
  visualTraits: ["visual"],
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

const question = {
  id: "question-id",
  key: "music",
  title: "Music",
  description: null,
  category: "music" as const,
  inputType: "single_choice" as const,
  isRequired: true,
  sortOrder: 1,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

describe("scoreStyles", () => {
  it("ranks weighted matches first", () => {
    const result = scoreStyles(
      [
        {
          ...baseStyle,
          key: "old_school",
          name: "Old School",
          compatibilityRules: [
            {
              id: "rule-1",
              styleId: "style-id",
              questionId: "question-id",
              answerOptionId: "option-id",
              condition: null,
              weight: 8,
              reasonTemplate: "rock classic",
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
              answerOption: { key: "rock", label: "Rock", question }
            }
          ]
        },
        { ...baseStyle, key: "minimalist", name: "Minimalista", compatibilityRules: [] }
      ],
      [{ questionKey: "music", selectedOptionKeys: ["rock"] }]
    );

    expect(result[0]?.style.key).toBe("old_school");
    expect(result[0]?.compatibilityPercent).toBe(98);
  });

  it("returns balanced fallback recommendations for neutral answers", () => {
    const result = scoreStyles(
      [
        { ...baseStyle, key: "fine_line", name: "Fine Line", compatibilityRules: [] },
        { ...baseStyle, key: "geometric", name: "Geometrica", compatibilityRules: [] }
      ],
      [{ questionKey: "music", selectedOptionKeys: [] }]
    );

    expect(result).toHaveLength(2);
    expect(result[0]?.explanation).toContain("opcao equilibrada");
  });

  it("keeps conflicting preferences as multiple comparable options", () => {
    const result = scoreStyles(
      [
        {
          ...baseStyle,
          key: "blackwork",
          name: "Blackwork",
          compatibilityRules: [
            {
              id: "rule-1",
              styleId: "style-id",
              questionId: "question-id",
              answerOptionId: "option-id",
              condition: null,
              weight: 6,
              reasonTemplate: "impacto",
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
              answerOption: { key: "bold", label: "Bold", question }
            }
          ]
        },
        {
          ...baseStyle,
          key: "minimalist",
          name: "Minimalista",
          compatibilityRules: [
            {
              id: "rule-2",
              styleId: "style-id",
              questionId: "question-id",
              answerOptionId: "option-id-2",
              condition: null,
              weight: 6,
              reasonTemplate: "discricao",
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
              answerOption: { key: "discreet", label: "Discreet", question }
            }
          ]
        }
      ],
      [{ questionKey: "music", selectedOptionKeys: ["bold", "discreet"] }]
    );

    expect(result.map((item) => item.style.key)).toEqual(["blackwork", "minimalist"]);
  });
});
