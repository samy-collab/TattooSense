import { useEffect, useState } from "react";
import type { QuizResponse, RecommendationResponse } from "@tattoosense/shared";
import { QuizForm } from "../components/quiz/QuizForm";
import { RecommendationResults } from "../components/recommendations/RecommendationResults";
import { tattooSenseApi } from "../services/tattooSenseApi";

export function App() {
  const [quiz, setQuiz] = useState<QuizResponse | null>(null);
  const [result, setResult] = useState<RecommendationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    tattooSenseApi
      .getQuiz()
      .then(setQuiz)
      .catch((loadError: unknown) => {
        setError(loadError instanceof Error ? loadError.message : "Nao foi possivel carregar o questionario.");
      });
  }, []);

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">TattooSense</p>
          <h1>Descubra estilos de tatuagem que combinam com sua intencao estetica</h1>
          <p>
            Responda perguntas simples sobre gosto, corpo, tamanho, visibilidade e mensagem para comparar caminhos
            visuais possiveis.
          </p>
        </div>
      </section>

      <section className="content-shell">
        {error ? <p className="submit-error">{error}</p> : null}
        {!error && !quiz ? <p className="loading">Carregando questionario...</p> : null}
        {quiz && !result ? <QuizForm questions={quiz.questions} onRecommended={setResult} /> : null}
        {result ? (
          <RecommendationResults
            result={result}
            onRestart={() => {
              setResult(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        ) : null}
      </section>
    </main>
  );
}
