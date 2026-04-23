import type { Recommendation } from "../../types/recommendations";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const styleImages: Record<string, string> = {
  old_school: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&w=900&q=80",
  blackwork: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=900&q=80",
  fine_line: "https://images.unsplash.com/photo-1601848714157-d845bb5c11ff?auto=format&fit=crop&w=900&q=80",
  minimalist: "https://images.unsplash.com/photo-1675621992781-991ec29f9131?auto=format&fit=crop&w=900&q=80",
  realistic: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?auto=format&fit=crop&w=900&q=80",
  geometric: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=900&q=80",
  tribal: "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&w=900&q=80"
};

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const imageUrl = styleImages[recommendation.style.key] ?? styleImages.old_school;

  return (
    <article className="recommendation-card">
      <img
        className="recommendation-image"
        src={imageUrl}
        alt={`Referencia visual de tatuagem ${recommendation.style.name}`}
        loading="lazy"
      />
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
