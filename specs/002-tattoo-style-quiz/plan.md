# Implementation Plan: TattooSense Style Quiz

**Branch**: `002-tattoo-style-quiz` | **Date**: 2026-04-19 | **Spec**: `specs/002-tattoo-style-quiz/spec.md`
**Input**: Feature specification from `specs/002-tattoo-style-quiz/spec.md`

## Summary

Implementar o TattooSense como uma aplicacao web full stack em TypeScript, com front-end React, API REST em Fastify e PostgreSQL. O usuario responde um questionario estetico, o front-end envia as respostas para a API, o backend aplica regras centralizadas de pontuacao e retorna estilos de tatuagem recomendados com justificativa e caracteristicas principais. A primeira versao nao usa IA generativa nem exige autenticacao, mas o banco fica preparado para historico de respostas e futura autenticacao.

## Technical Context

**Language/Version**: TypeScript 5.x em todo o projeto; Node.js 22 LTS para backend e tooling  
**Primary Dependencies**: React 19, Vite, Fastify, Zod, Prisma, PostgreSQL driver via Prisma Client  
**Storage**: PostgreSQL com schema versionado por migracoes Prisma  
**Testing**: Vitest para unidade e integracao de regras/API; React Testing Library para UI; Playwright para fluxo end-to-end critico  
**Target Platform**: Navegadores modernos em mobile e desktop; API Node.js em ambiente Linux/container local  
**Project Type**: Aplicacao web full stack com front-end, backend REST e banco relacional separados  
**Performance Goals**: Gerar recomendacoes em ate 300 ms p95 em ambiente local/dev para o catalogo inicial; carregamento inicial do quiz em ate 2 s em conexao comum  
**Constraints**: Sem IA generativa na primeira versao; sem autenticacao obrigatoria; regras de recomendacao ficam somente no backend; UI responsiva para celular e desktop; respostas incompletas devem ser validadas antes da recomendacao  
**Scale/Scope**: MVP com 1 fluxo de quiz, catalogo inicial de 7 estilos, perguntas e opcoes administradas via seed/migracao, estrutura preparada para historico e expansao futura

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

A constituicao atual ainda contem apenas placeholders de template e nao define principios, restricoes ou gates concretos aplicaveis. Gate inicial: PASS, sem violacoes identificaveis. A decisao de manter front-end, backend e banco separados respeita o objetivo declarado de simplicidade, organizacao e evolucao futura.

## Project Structure

### Documentation (this feature)

```text
specs/002-tattoo-style-quiz/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── openapi.yaml
└── tasks.md
```

### Source Code (repository root)
```text
frontend/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── routes.tsx
│   ├── components/
│   │   ├── quiz/
│   │   └── recommendations/
│   ├── services/
│   │   └── tattooSenseApi.ts
│   ├── types/
│   └── main.tsx
└── tests/
    ├── unit/
    └── e2e/

backend/
├── package.json
├── tsconfig.json
├── src/
│   ├── server.ts
│   ├── app.ts
│   ├── plugins/
│   │   ├── prisma.ts
│   │   └── env.ts
│   ├── routes/
│   │   ├── quizRoutes.ts
│   │   ├── recommendationRoutes.ts
│   │   └── styleRoutes.ts
│   ├── schemas/
│   │   ├── quizSchemas.ts
│   │   └── recommendationSchemas.ts
│   ├── services/
│   │   ├── quizService.ts
│   │   ├── recommendationService.ts
│   │   └── scoringRules.ts
│   └── repositories/
│       ├── quizRepository.ts
│       ├── styleRepository.ts
│       └── recommendationRepository.ts
└── tests/
    ├── unit/
    ├── integration/
    └── contract/

database/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
└── README.md

shared/
├── package.json
├── tsconfig.json
└── src/
    └── contracts.ts
```

**Structure Decision**: Usar monorepo TypeScript com separacao explicita por responsabilidade: `frontend/` contem experiencia React e cliente da API; `backend/` contem REST, validacao, repositorios e regras de recomendacao; `database/` contem schema, migracoes e seed do PostgreSQL; `shared/` fica limitado a tipos/contratos estaveis para evitar duplicacao entre front-end e backend.

## Responsibilities

**Front-end**:
- Renderizar questionario, validacao de preenchimento obrigatorio e tela de recomendacoes.
- Buscar perguntas/opcoes em `GET /api/quiz`.
- Enviar respostas normalizadas para `POST /api/recommendations`.
- Exibir nome do estilo, compatibilidade, justificativa e caracteristicas principais.
- Nao conter regras de pontuacao ou logica de recomendacao.

**Back-end**:
- Expor API REST simples e validada com schemas Zod.
- Centralizar regras de compatibilidade e pontuacao em `backend/src/services/scoringRules.ts`.
- Carregar perguntas, opcoes, estilos e regras do PostgreSQL.
- Persistir sessao de recomendacao e itens recomendados quando o usuario finalizar o quiz, mesmo sem autenticacao.
- Retornar recomendacoes explicaveis e mensagens de validacao para respostas incompletas/conflitantes.

**Banco**:
- Armazenar catalogo do quiz, opcoes, estilos, regras de compatibilidade e resultados.
- Usar migracoes para evolucao controlada.
- Preparar campos opcionais para futuro relacionamento com usuario autenticado sem tornar conta obrigatoria no MVP.

## Data Flow

1. Usuario abre o front-end React.
2. Front-end chama `GET /api/quiz`.
3. API busca perguntas e opcoes ativas no PostgreSQL e retorna estrutura ordenada.
4. Usuario responde perguntas obrigatorias.
5. Front-end envia `POST /api/recommendations` com `answers`.
6. API valida payload, carrega regras ativas e calcula pontuacao por estilo.
7. API persiste `recommendation_session`, respostas selecionadas e itens recomendados.
8. API retorna lista priorizada de recomendacoes com score, compatibilidade, justificativa e caracteristicas.
9. Front-end renderiza resultado comparavel e permite refazer o quiz.

## Recommendation Rules

As regras iniciais serao baseadas em pontuacao ponderada:
- Cada opcao pode adicionar ou subtrair peso para um ou mais estilos.
- Regras tambem podem considerar combinacoes simples, como tamanho + local do corpo + nivel de discricao.
- O resultado final normaliza a pontuacao em compatibilidade percentual.
- A API retorna pelo menos 2 recomendacoes quando houver estilos com score positivo; em respostas neutras, retorna recomendacoes equilibradas com justificativa de baixa especificidade.
- Conflitos nao bloqueiam o resultado, mas geram justificativas que explicam o equilibrio entre preferencias.

## Constitution Check - Post Design

A constituicao permanece sem gates concretos definidos. O desenho continua PASS: nao ha violacoes de principios registrados, e o plano preserva simplicidade operacional, separacao de responsabilidades e evolucao futura sem introduzir IA generativa ou autenticacao obrigatoria.

## Complexity Tracking

Nenhuma violacao constitucional exige justificativa.
