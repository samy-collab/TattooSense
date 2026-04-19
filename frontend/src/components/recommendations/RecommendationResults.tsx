import type { RecommendationResponse } from "../../types/recommendations";
import { RecommendationCard } from "./RecommendationCard";

interface RecommendationResultsProps {
  result: RecommendationResponse;
  onRestart: () => void;
}

export function RecommendationResults({ result, onRestart }: RecommendationResultsProps) {
  return (
    <section className="results" aria-labelledby="results-title">
      <div className="results-header">
        <div>
          <p className="eyebrow">Resultado TattooSense</p>
          <h2 id="results-title">Estilos mais compativeis com seu perfil</h2>
        </div>
        <button type="button" className="secondary-action" onClick={onRestart}>
          Refazer
        </button>
      </div>

      {result.recommendations.length === 0 ? (
        <p className="empty-state">Ainda nao ha recomendacoes para comparar.</p>
      ) : (
        <div className="recommendation-grid">
          {result.recommendations.map((recommendation) => (
            <RecommendationCard key={recommendation.style.key} recommendation={recommendation} />
          ))}
        </div>
      )}

      <p className="disclaimer">{result.disclaimer}</p>
    </section>
  );
}
