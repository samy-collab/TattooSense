import type { CompatibilityRule, QuizQuestion, TattooStyle } from "@prisma/client";
import type { Recommendation } from "@tattoosense/shared";

export interface ScoringAnswer {
  questionKey: string;
  selectedOptionKeys: string[];
  scaleValue?: number;
  textValue?: string;
}

type RuleWithOption = CompatibilityRule & {
  answerOption: { key: string; label: string; question: QuizQuestion } | null;
};

type StyleWithRules = TattooStyle & { compatibilityRules: RuleWithOption[] };

export function scoreStyles(styles: StyleWithRules[], answers: ScoringAnswer[]): Recommendation[] {
  const selectedKeys = new Set(
    answers.flatMap((answer) => answer.selectedOptionKeys.map((optionKey) => `${answer.questionKey}:${optionKey}`))
  );
  const answerByQuestion = new Map(answers.map((answer) => [answer.questionKey, answer]));

  const rawScores = styles.map((style) => {
    let score = 0;
    const matchedSignals: string[] = [];

    for (const rule of style.compatibilityRules) {
      if (rule.answerOption) {
        const signalKey = `${rule.answerOption.question.key}:${rule.answerOption.key}`;
        if (selectedKeys.has(signalKey)) {
          score += rule.weight;
          matchedSignals.push(rule.reasonTemplate ?? rule.answerOption.label);
        }
      } else if (rule.condition && matchesCondition(rule.condition, answerByQuestion)) {
        score += rule.weight;
        if (rule.reasonTemplate) matchedSignals.push(rule.reasonTemplate);
      }
    }

    return { style, score, matchedSignals };
  });

  const positiveMax = Math.max(...rawScores.map((item) => item.score), 1);
  const ranked = rawScores
    .map((item) => ({
      ...item,
      compatibilityPercent: Math.max(35, Math.min(98, Math.round((Math.max(item.score, 0) / positiveMax) * 100)))
    }))
    .sort((a, b) => b.score - a.score || a.style.name.localeCompare(b.style.name));

  const selected = ranked.filter((item) => item.score > 0).slice(0, 3);
  const fallback = selected.length >= 2 ? selected : ranked.slice(0, 3);

  return fallback.map((item, index) => ({
    style: {
      key: item.style.key,
      name: item.style.name,
      summary: item.style.summary,
      characteristics: item.style.characteristics,
      visualTraits: item.style.visualTraits
    },
    rank: index + 1,
    score: item.score,
    compatibilityPercent: item.score > 0 ? item.compatibilityPercent : 55 - index * 5,
    explanation: buildExplanation(item.style.name, item.matchedSignals, item.score),
    matchedSignals: item.matchedSignals.slice(0, 4)
  }));
}

function matchesCondition(condition: unknown, answerByQuestion: Map<string, ScoringAnswer>) {
  if (!condition || typeof condition !== "object" || !("all" in condition)) return false;
  const clauses = (
    condition as { all?: Array<{ questionKey: string; optionKey?: string; scaleMin?: number; scaleMax?: number }> }
  ).all;
  if (!Array.isArray(clauses)) return false;
  return clauses.every((clause) => {
    const answer = answerByQuestion.get(clause.questionKey);
    if (!answer) return false;
    if (clause.optionKey && !answer.selectedOptionKeys.includes(clause.optionKey)) return false;
    if (typeof clause.scaleMin === "number" && (answer.scaleValue ?? 0) < clause.scaleMin) return false;
    if (typeof clause.scaleMax === "number" && (answer.scaleValue ?? 0) > clause.scaleMax) return false;
    return true;
  });
}

function buildExplanation(styleName: string, signals: string[], score: number) {
  if (score <= 0 || signals.length === 0) {
    return `${styleName} aparece como uma opcao equilibrada para um perfil ainda amplo, com espaco para refinar referencias visuais.`;
  }

  const uniqueSignals = [...new Set(signals)].slice(0, 3);
  return `${styleName} combina com seu perfil por sinais como ${uniqueSignals.join(", ")}. A recomendacao equilibra suas preferencias esteticas sem tratar isso como conselho profissional.`;
}
