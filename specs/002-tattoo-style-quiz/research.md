# Research: TattooSense Style Quiz

## Decision: Monorepo TypeScript com `frontend/`, `backend/`, `database/` e `shared/`

**Rationale**: O escopo inicial exige separacao clara entre interface, API e banco, mas ainda e pequeno o suficiente para um unico repositorio. Um monorepo evita duplicacao de contratos TypeScript, simplifica setup local e deixa a evolucao para autenticacao/historico mais direta.

**Alternatives considered**:
- Repositorios separados: mais isolamento, mas aumenta friccao de setup e versionamento para um MVP.
- Projeto unico sem separacao por pastas: mais rapido inicialmente, mas mistura UI, API e dados e dificulta manutencao das regras.

## Decision: React + TypeScript + Vite no front-end

**Rationale**: Vite oferece setup simples, rapido e adequado para uma experiencia de quiz responsiva. React com TypeScript permite componentes reutilizaveis para perguntas, opcoes e cards de recomendacao, com tipos compartilhados para payloads da API.

**Alternatives considered**:
- Next.js: util para SSR e rotas full stack, mas adiciona complexidade desnecessaria para o MVP.
- HTML/JS simples: menor tooling, mas pior manutencao para fluxo multi-etapas e estados de validacao.

## Decision: Fastify + TypeScript para API REST

**Rationale**: Fastify e leve, performatico e bom para APIs REST pequenas. Ele permite plugins para ambiente, banco e validacao, mantendo as rotas organizadas. A recomendacao fica em servicos backend, evitando que o front-end replique regras.

**Alternatives considered**:
- Express: simples e popular, mas Fastify oferece melhor tipagem e validacao integrada ao fluxo de rotas.
- NestJS: estruturado, mas pesado para a primeira versao.

## Decision: PostgreSQL com Prisma para schema, migracoes e seed

**Rationale**: O dominio tem entidades relacionais claras: perguntas, opcoes, estilos, regras e resultados. Prisma reduz codigo boilerplate, facilita migracoes e seed do catalogo inicial, e prepara o banco para historico e futura autenticacao.

**Alternatives considered**:
- SQL manual com `pg`: mais leve, mas exige mais boilerplate para migracoes e mapeamento.
- Drizzle ORM: mais leve e tipado, mas Prisma e mais direto para schema, seed e onboarding inicial.

## Decision: Regras de recomendacao por pontuacao ponderada no backend

**Rationale**: O requisito exclui IA generativa na primeira versao. Uma matriz de compatibilidade por opcao/estilo e regras de combinacao simples permite recomendacoes explicaveis, testaveis e evolutiveis.

**Alternatives considered**:
- Regras hardcoded no front-end: mais rapido, mas viola a centralizacao no backend e exporia logica de produto.
- Modelo de machine learning: desnecessario no MVP e dificil de explicar sem dados reais.

## Decision: API REST com OpenAPI como contrato inicial

**Rationale**: O fluxo precisa de poucos endpoints e contratos estaveis. OpenAPI documenta payloads e respostas para front-end, backend e testes de contrato.

**Alternatives considered**:
- GraphQL: flexivel, mas adiciona complexidade sem necessidade para o quiz.
- RPC interno: simples, mas menos claro como contrato publico da API.

## Decision: Persistir resultados anonimos desde o MVP

**Rationale**: Mesmo sem autenticacao obrigatoria, salvar sessoes anonimas permite historico futuro, analise de qualidade das regras e migracao posterior para contas de usuario.

**Alternatives considered**:
- Nao persistir respostas: reduz escopo, mas contraria a preparacao do banco para historico.
- Exigir login: fora do escopo inicial e cria friccao desnecessaria.
