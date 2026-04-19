# TattooSense Database

O banco usa PostgreSQL com Prisma para versionar schema, migracoes e seed do catalogo inicial.

## Setup local

```bash
cp backend/.env.example backend/.env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

`DATABASE_URL` deve apontar para um PostgreSQL local acessivel. O seed cria perguntas, opcoes, os 7 estilos iniciais e regras ponderadas de compatibilidade.

## Entidades principais

- `QuizQuestion` e `AnswerOption`: questionario ativo exibido no front-end.
- `TattooStyle`: catalogo de estilos recomendaveis.
- `CompatibilityRule`: pesos por opcao/estilo e condicoes simples.
- `RecommendationSession`, `RecommendationAnswer` e `RecommendationItem`: historico anonimo de conclusoes do quiz.
