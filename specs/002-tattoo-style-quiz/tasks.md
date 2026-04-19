# Tasks: TattooSense Style Quiz

**Input**: Design documents from `/home/acer/Área de trabalho/TattooSense/specs/002-tattoo-style-quiz/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/openapi.yaml`, `quickstart.md`

**Tests**: Included because the specification defines mandatory testing scenarios and the plan defines Vitest, React Testing Library, and Playwright.

**Organization**: Tasks are grouped by Spec Kit phase and user story, while preserving the requested work areas: setup, backend TypeScript, PostgreSQL database, business recommendation logic, React frontend, frontend-backend integration, tests/validation, and final refinements.

## Phase 1: Setup do Projeto (Shared Infrastructure)

**Purpose**: Initialize the monorepo and package boundaries for frontend, backend, database, and shared contracts.

- [X] T001 Create npm workspace root scripts for `frontend`, `backend`, `shared`, Prisma, tests, and dev commands in `/home/acer/Área de trabalho/TattooSense/package.json`
- [X] T002 Create repository ignore rules for Node, Vite, Prisma, env files, coverage, and Playwright artifacts in `/home/acer/Área de trabalho/TattooSense/.gitignore`
- [X] T003 [P] Configure shared TypeScript compiler defaults in `/home/acer/Área de trabalho/TattooSense/tsconfig.base.json`
- [X] T004 [P] Initialize React 19 Vite package with test and e2e scripts in `/home/acer/Área de trabalho/TattooSense/frontend/package.json`
- [X] T005 [P] Initialize Fastify TypeScript package with dev, build, and test scripts in `/home/acer/Área de trabalho/TattooSense/backend/package.json`
- [X] T006 [P] Initialize shared contracts package exports in `/home/acer/Área de trabalho/TattooSense/shared/package.json`
- [X] T007 [P] Add backend environment template with `DATABASE_URL`, `API_PORT`, and `FRONTEND_ORIGIN` in `/home/acer/Área de trabalho/TattooSense/backend/.env.example`

---

## Phase 2: Backend, Banco de Dados, and Shared Foundation (Blocking Prerequisites)

**Purpose**: Build the database schema, API shell, shared contracts, and validation primitives that all user stories depend on.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T008 Define Prisma datasource, generator, enums, and models for quiz questions, answer options, styles, compatibility rules, recommendation sessions, answers, answer options, and recommendation items in `/home/acer/Área de trabalho/TattooSense/database/prisma/schema.prisma`
- [X] T009 Create initial Prisma migration for the TattooSense schema in `/home/acer/Área de trabalho/TattooSense/database/prisma/migrations/`
- [X] T010 Seed the initial quiz questions, answer options, seven tattoo styles, and weighted compatibility rules in `/home/acer/Área de trabalho/TattooSense/database/prisma/seed.ts`
- [X] T011 [P] Define shared API contract types for quiz, styles, submitted answers, recommendations, and validation errors in `/home/acer/Área de trabalho/TattooSense/shared/src/contracts.ts`
- [X] T012 [P] Implement backend Zod schemas for quiz and recommendation payload validation in `/home/acer/Área de trabalho/TattooSense/backend/src/schemas/quizSchemas.ts`
- [X] T013 [P] Implement backend Zod schemas for recommendation responses and validation errors in `/home/acer/Área de trabalho/TattooSense/backend/src/schemas/recommendationSchemas.ts`
- [X] T014 Configure backend environment validation plugin in `/home/acer/Área de trabalho/TattooSense/backend/src/plugins/env.ts`
- [X] T015 Configure Prisma Fastify plugin lifecycle in `/home/acer/Área de trabalho/TattooSense/backend/src/plugins/prisma.ts`
- [X] T016 Create Fastify app with CORS, JSON error handling, and route registration points in `/home/acer/Área de trabalho/TattooSense/backend/src/app.ts`
- [X] T017 Create backend server bootstrap using `API_PORT` in `/home/acer/Área de trabalho/TattooSense/backend/src/server.ts`
- [X] T018 [P] Configure frontend Vite, TypeScript, and test setup in `/home/acer/Área de trabalho/TattooSense/frontend/vite.config.ts`
- [X] T019 [P] Create frontend API base client with typed request and error helpers in `/home/acer/Área de trabalho/TattooSense/frontend/src/services/tattooSenseApi.ts`

**Checkpoint**: Foundation ready; user stories can now be implemented in priority order or parallel by separate developers.

---

## Phase 3: User Story 1 - Complete Tattoo Style Quiz (Priority: P1) MVP

**Goal**: The user can load, complete, and validate the guided tattoo preference quiz.

**Independent Test**: Open the app, load questions from the API, answer all required questions, and see missing-answer messages when trying to continue with incomplete required fields.

### Tests for User Story 1

- [X] T020 [P] [US1] Add contract test for `GET /api/quiz` returning active ordered questions and options in `/home/acer/Área de trabalho/TattooSense/backend/tests/contract/quiz.contract.test.ts`
- [X] T021 [P] [US1] Add backend integration test for incomplete required answers returning `422` validation issues in `/home/acer/Área de trabalho/TattooSense/backend/tests/integration/quizValidation.test.ts`
- [X] T022 [P] [US1] Add frontend unit test for required question validation messages in `/home/acer/Área de trabalho/TattooSense/frontend/tests/unit/QuizForm.test.tsx`

### Implementation for User Story 1

- [X] T023 [US1] Implement quiz repository for active ordered questions and options in `/home/acer/Área de trabalho/TattooSense/backend/src/repositories/quizRepository.ts`
- [X] T024 [US1] Implement quiz service for public quiz response shaping in `/home/acer/Área de trabalho/TattooSense/backend/src/services/quizService.ts`
- [X] T025 [US1] Implement `GET /api/quiz` route in `/home/acer/Área de trabalho/TattooSense/backend/src/routes/quizRoutes.ts`
- [X] T026 [P] [US1] Create frontend quiz domain types mapped to shared contracts in `/home/acer/Área de trabalho/TattooSense/frontend/src/types/quiz.ts`
- [X] T027 [P] [US1] Build reusable quiz question renderer for single choice, multi choice, scale, and free text inputs in `/home/acer/Área de trabalho/TattooSense/frontend/src/components/quiz/QuizQuestion.tsx`
- [X] T028 [US1] Build quiz form state, required validation, and answer normalization in `/home/acer/Área de trabalho/TattooSense/frontend/src/components/quiz/QuizForm.tsx`
- [X] T029 [US1] Wire app routing and initial quiz page rendering in `/home/acer/Área de trabalho/TattooSense/frontend/src/app/App.tsx`
- [X] T030 [US1] Add frontend API method for `GET /api/quiz` and quiz loading states in `/home/acer/Área de trabalho/TattooSense/frontend/src/services/tattooSenseApi.ts`

**Checkpoint**: User Story 1 can be tested independently as a complete quiz entry and validation flow.

---

## Phase 4: User Story 2 - Receive Compatible Style Recommendations (Priority: P2)

**Goal**: The user receives prioritized tattoo style recommendations with compatibility, explanations, characteristics, and an aesthetic-guidance disclaimer.

**Independent Test**: Submit different complete answer sets and confirm the API returns ranked styles with explanations, at least two compatible suggestions for mixed profiles, and persisted anonymous results.

### Tests for User Story 2

- [X] T031 [P] [US2] Add unit tests for weighted scoring, neutral answers, and conflicting preference handling in `/home/acer/Área de trabalho/TattooSense/backend/tests/unit/scoringRules.test.ts`
- [X] T032 [P] [US2] Add contract test for `POST /api/recommendations` success and `422` responses in `/home/acer/Área de trabalho/TattooSense/backend/tests/contract/recommendations.contract.test.ts`
- [X] T033 [P] [US2] Add integration test for persisting recommendation sessions, answers, selected options, and items in `/home/acer/Área de trabalho/TattooSense/backend/tests/integration/recommendationsPersistence.test.ts`

### Implementation for User Story 2

- [X] T034 [P] [US2] Implement style repository for active tattoo style catalog access in `/home/acer/Área de trabalho/TattooSense/backend/src/repositories/styleRepository.ts`
- [X] T035 [P] [US2] Implement recommendation repository for sessions, answers, selected options, and recommendation items in `/home/acer/Área de trabalho/TattooSense/backend/src/repositories/recommendationRepository.ts`
- [X] T036 [US2] Implement weighted scoring rules and compatibility normalization in `/home/acer/Área de trabalho/TattooSense/backend/src/services/scoringRules.ts`
- [X] T037 [US2] Implement recommendation service for validation, scoring, explanation generation, fallback recommendations, disclaimer text, and persistence in `/home/acer/Área de trabalho/TattooSense/backend/src/services/recommendationService.ts`
- [X] T038 [US2] Implement `POST /api/recommendations` route in `/home/acer/Área de trabalho/TattooSense/backend/src/routes/recommendationRoutes.ts`
- [X] T039 [P] [US2] Implement `GET /api/styles` route for active style catalog inspection in `/home/acer/Área de trabalho/TattooSense/backend/src/routes/styleRoutes.ts`
- [X] T040 [US2] Add frontend API method for `POST /api/recommendations` with typed validation error handling in `/home/acer/Área de trabalho/TattooSense/frontend/src/services/tattooSenseApi.ts`
- [X] T041 [US2] Connect quiz submission to recommendation creation and server validation issue display in `/home/acer/Área de trabalho/TattooSense/frontend/src/components/quiz/QuizForm.tsx`

**Checkpoint**: User Story 2 can be tested independently by submitting quiz answers directly to the API or through the quiz UI.

---

## Phase 5: User Story 3 - Explore Recommendations Visually (Priority: P3)

**Goal**: The user can compare recommended styles in a simple, responsive, visually pleasant result experience.

**Independent Test**: On desktop and mobile widths, compare recommendation cards and confirm each card clearly shows style name, compatibility, explanation, characteristics, and visual traits without layout overlap.

### Tests for User Story 3

- [X] T042 [P] [US3] Add frontend unit test for recommendation card content and disclaimer rendering in `/home/acer/Área de trabalho/TattooSense/frontend/tests/unit/RecommendationResults.test.tsx`
- [X] T043 [P] [US3] Add Playwright e2e test for completing the quiz and viewing recommendation results on desktop in `/home/acer/Área de trabalho/TattooSense/frontend/tests/e2e/tattooSenseQuiz.spec.ts`
- [X] T044 [P] [US3] Add Playwright e2e test for completing the quiz and viewing recommendation results on mobile viewport in `/home/acer/Área de trabalho/TattooSense/frontend/tests/e2e/tattooSenseQuiz.mobile.spec.ts`

### Implementation for User Story 3

- [X] T045 [P] [US3] Create recommendation domain types mapped to shared contracts in `/home/acer/Área de trabalho/TattooSense/frontend/src/types/recommendations.ts`
- [X] T046 [P] [US3] Build recommendation style card with compatibility, explanation, characteristics, and visual traits in `/home/acer/Área de trabalho/TattooSense/frontend/src/components/recommendations/RecommendationCard.tsx`
- [X] T047 [US3] Build recommendation results view with ranked layout, disclaimer, empty state, and restart action in `/home/acer/Área de trabalho/TattooSense/frontend/src/components/recommendations/RecommendationResults.tsx`
- [X] T048 [US3] Apply responsive TattooSense visual design tokens, layout, controls, and accessible focus states in `/home/acer/Área de trabalho/TattooSense/frontend/src/app/App.css`
- [X] T049 [US3] Wire quiz-to-results navigation state and restart flow in `/home/acer/Área de trabalho/TattooSense/frontend/src/app/App.tsx`

**Checkpoint**: All user stories are independently functional and can be demonstrated through the browser.

---

## Phase 6: Integração Frontend-Backend

**Purpose**: Validate the full stack against the OpenAPI contract and quickstart flow.

- [X] T050 Add cross-workspace dev orchestration scripts for running backend and frontend together in `/home/acer/Área de trabalho/TattooSense/package.json`
- [X] T051 Verify frontend API base URL handling for local backend integration in `/home/acer/Área de trabalho/TattooSense/frontend/src/services/tattooSenseApi.ts`
- [X] T052 Wire backend CORS origin and frontend dev server expectations into environment documentation in `/home/acer/Área de trabalho/TattooSense/backend/.env.example`
- [X] T053 Validate the MVP quickstart commands and document any required local PostgreSQL setup adjustments in `/home/acer/Área de trabalho/TattooSense/specs/002-tattoo-style-quiz/quickstart.md`
- [X] T054 Confirm the OpenAPI contract matches implemented routes, status codes, and response shapes in `/home/acer/Área de trabalho/TattooSense/specs/002-tattoo-style-quiz/contracts/openapi.yaml`

---

## Phase 7: Testes e Validações

**Purpose**: Configure and run the automated checks required by the plan and quickstart.

- [X] T055 Create backend Vitest configuration with test database environment support in `/home/acer/Área de trabalho/TattooSense/backend/vitest.config.ts`
- [X] T056 Create frontend Vitest and React Testing Library setup in `/home/acer/Área de trabalho/TattooSense/frontend/tests/setup.ts`
- [X] T057 Create Playwright configuration for local frontend and backend dev servers in `/home/acer/Área de trabalho/TattooSense/frontend/playwright.config.ts`
- [X] T058 Add root test orchestration scripts for backend unit/integration/contract, frontend unit, and frontend e2e runs in `/home/acer/Área de trabalho/TattooSense/package.json`
- [X] T059 Run the planned validation commands and record any remaining manual verification notes in `/home/acer/Área de trabalho/TattooSense/specs/002-tattoo-style-quiz/quickstart.md`

---

## Phase 8: Refinamentos Finais and Cross-Cutting Concerns

**Purpose**: Final polish for documentation, maintainability, performance, and production readiness.

- [X] T060 [P] Update project README with TattooSense purpose, architecture, setup, scripts, and MVP verification flow in `/home/acer/Área de trabalho/TattooSense/README.md`
- [X] T061 [P] Document database schema, seed catalog, and migration workflow in `/home/acer/Área de trabalho/TattooSense/database/README.md`
- [X] T062 Review recommendation copy to ensure all results are aesthetic guidance only and not professional health, legal, safety, or tattoo advice in `/home/acer/Área de trabalho/TattooSense/backend/src/services/recommendationService.ts`
- [X] T063 Optimize quiz and recommendation API queries to keep local recommendation generation under the 300 ms p95 goal in `/home/acer/Área de trabalho/TattooSense/backend/src/repositories/recommendationRepository.ts`
- [X] T064 Run formatting, linting, backend tests, frontend tests, and e2e tests; fix failures documented in `/home/acer/Área de trabalho/TattooSense/specs/002-tattoo-style-quiz/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 Setup do Projeto**: No dependencies; can start immediately.
- **Phase 2 Backend, Banco de Dados, and Shared Foundation**: Depends on Phase 1; blocks all user stories.
- **Phase 3 US1 Complete Tattoo Style Quiz**: Depends on Phase 2; MVP scope.
- **Phase 4 US2 Receive Compatible Style Recommendations**: Depends on Phase 2 and integrates naturally after US1 UI submission exists.
- **Phase 5 US3 Explore Recommendations Visually**: Depends on US2 recommendation response shape.
- **Phase 6 Integração Frontend-Backend**: Depends on implemented stories, though orchestration and environment tasks can begin after Phase 1.
- **Phase 7 Testes e Validações**: Depends on implemented stories and integration configuration.
- **Phase 8 Refinamentos Finais**: Depends on selected story scope being complete.

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 2; no dependency on other stories.
- **US2 (P2)**: Can start after Phase 2 for API and service work; frontend submission integration uses US1 `QuizForm.tsx`.
- **US3 (P3)**: Requires US2 recommendation payload shape and frontend submission flow.

### Within Each User Story

- Tests should be written first and fail before implementation.
- Database and repositories precede services.
- Services precede route handlers.
- Route handlers and API client methods precede frontend integration.
- Components precede page-level wiring and e2e validation.

---

## Parallel Opportunities

- Setup tasks T003-T007 can run in parallel after T001 is defined.
- Foundation tasks T011-T013 and T018-T019 can run in parallel with database work T008-T010.
- US1 test tasks T020-T022 can run in parallel before implementation.
- US1 component task T027 can run in parallel with backend tasks T023-T025 after contracts exist.
- US2 repository tasks T034-T035 can run in parallel with style route task T039 after Prisma schema exists.
- US3 tasks T045-T046 can run in parallel with test tasks T042-T044 after recommendation contracts exist.
- Documentation tasks T060-T061 can run in parallel during final refinements.

---

## Parallel Example: User Story 1

```text
Task: "T020 [P] [US1] Add contract test for GET /api/quiz returning active ordered questions and options in backend/tests/contract/quiz.contract.test.ts"
Task: "T021 [P] [US1] Add backend integration test for incomplete required answers returning 422 validation issues in backend/tests/integration/quizValidation.test.ts"
Task: "T022 [P] [US1] Add frontend unit test for required question validation messages in frontend/tests/unit/QuizForm.test.tsx"
Task: "T027 [P] [US1] Build reusable quiz question renderer for single choice, multi choice, scale, and free text inputs in frontend/src/components/quiz/QuizQuestion.tsx"
```

## Parallel Example: User Story 2

```text
Task: "T031 [P] [US2] Add unit tests for weighted scoring, neutral answers, and conflicting preference handling in backend/tests/unit/scoringRules.test.ts"
Task: "T032 [P] [US2] Add contract test for POST /api/recommendations success and 422 responses in backend/tests/contract/recommendations.contract.test.ts"
Task: "T034 [P] [US2] Implement style repository for active tattoo style catalog access in backend/src/repositories/styleRepository.ts"
Task: "T035 [P] [US2] Implement recommendation repository for sessions, answers, selected options, and recommendation items in backend/src/repositories/recommendationRepository.ts"
```

## Parallel Example: User Story 3

```text
Task: "T042 [P] [US3] Add frontend unit test for recommendation card content and disclaimer rendering in frontend/tests/unit/RecommendationResults.test.tsx"
Task: "T043 [P] [US3] Add Playwright e2e test for completing the quiz and viewing recommendation results on desktop in frontend/tests/e2e/tattooSenseQuiz.spec.ts"
Task: "T045 [P] [US3] Create recommendation domain types mapped to shared contracts in frontend/src/types/recommendations.ts"
Task: "T046 [P] [US3] Build recommendation style card with compatibility, explanation, characteristics, and visual traits in frontend/src/components/recommendations/RecommendationCard.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 setup.
2. Complete Phase 2 foundation.
3. Complete Phase 3 User Story 1.
4. Stop and validate that the quiz loads, required answers are enforced, and answer payloads are normalized.

### Incremental Delivery

1. Add User Story 1 to deliver the guided quiz and validation.
2. Add User Story 2 to deliver backend recommendations, persistence, and API integration.
3. Add User Story 3 to deliver visual comparison, responsiveness, and restart flow.
4. Run Phase 6 tests and Phase 7 refinements before considering the MVP complete.

### Scope Mapping Requested by User

- **Setup do projeto**: T001-T007
- **Backend**: T012-T017, T023-T025, T034-T039, T052, T055, T062-T063
- **Banco de dados**: T008-T010, T015, T035, T061
- **Frontend**: T018-T019, T026-T030, T040-T049
- **Integração entre frontend e backend**: T030, T040-T041, T049-T054
- **Testes**: T020-T022, T031-T033, T042-T044, T055-T059, T064
- **Refinamentos finais**: T060-T064

---

## Notes

- Every task uses the required checkbox, sequential ID, optional `[P]`, optional user story label, and exact file path.
- `[P]` tasks touch distinct files or can be implemented without depending on incomplete task outputs.
- Recommendation rules must stay in the backend; frontend tasks must not duplicate scoring logic.
- The MVP must not require authentication and must persist anonymous recommendation sessions for future history support.
