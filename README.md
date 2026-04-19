# TattooSense

TattooSense e uma aplicacao web full stack para ajudar usuarios a descobrirem estilos de tatuagem compativeis com suas preferencias esteticas. O MVP entrega um questionario guiado, uma API REST com regras ponderadas de recomendacao e uma tela responsiva de resultados.

## Arquitetura

- `frontend/`: React 19 + Vite, componentes do questionario e visualizacao de recomendacoes.
- `backend/`: Fastify + TypeScript, validacao Zod, rotas REST e regras de recomendacao.
- `database/`: Prisma schema, migracao inicial e seed do catalogo.
- `shared/`: contratos TypeScript usados por frontend e backend.

## Setup local

Requisitos: Node.js 22, npm 10 e PostgreSQL 16.

```bash
npm install
cp backend/.env.example backend/.env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

O frontend roda em `http://localhost:5173` e a API em `http://localhost:3333`.

## Scripts

- `npm run dev`: inicia backend e frontend juntos.
- `npm run prisma:migrate`: aplica migracoes no PostgreSQL configurado.
- `npm run prisma:seed`: cria perguntas, opcoes, estilos e regras iniciais.
- `npm run test`: executa testes de backend e frontend.
- `npm run test:e2e`: executa o fluxo Playwright do questionario.

## Fluxo MVP

1. Abrir o app.
2. Responder perguntas obrigatorias sobre gostos, corpo, tamanho, visibilidade, composicao e emocao.
3. Enviar as respostas para `POST /api/recommendations`.
4. Comparar estilos recomendados com compatibilidade, explicacao, caracteristicas e aviso de orientacao estetica.
TattooSense é um software desenvolvido para ajudar pessoas a descobrirem qual estilo de tatuagem combina mais com sua personalidade, gostos e intenção antes de tomar uma decisão definitiva.
