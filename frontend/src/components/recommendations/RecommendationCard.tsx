import type { Recommendation } from "../../types/recommendations";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <article className="recommendation-card">
      <div className="card-topline">
        <span>#{recommendation.rank}</span>
        <strong>{recommendation.compatibilityPercent}%</strong>
      </div>
      <h3>{recommendation.style.name}</h3>
      <p>{recommendation.style.summary}</p>
      <p className="explanation">{recommendation.explanation}</p>
      <div className="tag-group" aria-label="Caracteristicas">
        {recommendation.style.characteristics.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <ul className="traits">
        {recommendation.style.visualTraits.map((trait) => (
          <li key={trait}>{trait}</li>
        ))}
      </ul>
    </article>
  );
}
