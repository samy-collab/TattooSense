# Data Model: TattooSense Style Quiz

## Entity: QuizQuestion

Representa uma pergunta exibida no questionario.

**Fields**:
- `id` UUID primary key
- `key` text unique, stable identifier for API payloads
- `title` text
- `description` text nullable
- `category` enum: `music`, `culture`, `personal_style`, `body_placement`, `size`, `visibility`, `composition`, `emotion`
- `inputType` enum: `single_choice`, `multi_choice`, `scale`, `free_text`
- `isRequired` boolean
- `sortOrder` integer
- `isActive` boolean
- `createdAt` timestamp
- `updatedAt` timestamp

**Relationships**:
- Has many `AnswerOption`
- Has many `RecommendationAnswer`

**Validation Rules**:
- `key` must be unique and stable.
- Required questions must have at least one active option unless `inputType` is `free_text`.
- `sortOrder` controls display order and must be non-negative.

## Entity: AnswerOption

Representa uma opcao selecionavel para uma pergunta.

**Fields**:
- `id` UUID primary key
- `questionId` UUID foreign key to `QuizQuestion`
- `key` text
- `label` text
- `description` text nullable
- `sortOrder` integer
- `isActive` boolean
- `createdAt` timestamp
- `updatedAt` timestamp

**Relationships**:
- Belongs to `QuizQuestion`
- Has many `CompatibilityRule`
- Has many `RecommendationAnswerOption`

**Validation Rules**:
- `key` must be unique within the same question.
- Inactive options are not returned by `GET /api/quiz`.

## Entity: TattooStyle

Representa um estilo disponivel para recomendacao.

**Fields**:
- `id` UUID primary key
- `key` text unique
- `name` text
- `summary` text
- `characteristics` text array or JSON array
- `visualTraits` text array or JSON array
- `isActive` boolean
- `createdAt` timestamp
- `updatedAt` timestamp

**Initial Records**:
- `old_school`
- `blackwork`
- `fine_line`
- `minimalist`
- `realistic`
- `geometric`
- `tribal`

**Relationships**:
- Has many `CompatibilityRule`
- Has many `RecommendationItem`

**Validation Rules**:
- Active styles must have at least one characteristic.
- `key` is stable and used in API responses.

## Entity: CompatibilityRule

Representa uma regra de pontuacao entre respostas e estilos.

**Fields**:
- `id` UUID primary key
- `styleId` UUID foreign key to `TattooStyle`
- `questionId` UUID nullable foreign key to `QuizQuestion`
- `answerOptionId` UUID nullable foreign key to `AnswerOption`
- `condition` JSON nullable
- `weight` integer
- `reasonTemplate` text nullable
- `isActive` boolean
- `createdAt` timestamp
- `updatedAt` timestamp

**Relationships**:
- Belongs to `TattooStyle`
- Optionally belongs to `QuizQuestion`
- Optionally belongs to `AnswerOption`

**Validation Rules**:
- `weight` should normally be between `-5` and `10`.
- A rule must define either `answerOptionId` or a structured `condition`.
- `condition` is reserved for simple combinations such as body placement + size + visibility.

## Entity: RecommendationSession

Representa uma conclusao de quiz e seu resultado.

**Fields**:
- `id` UUID primary key
- `anonymousUserId` UUID nullable
- `userId` UUID nullable, reserved for future authentication
- `status` enum: `completed`
- `createdAt` timestamp

**Relationships**:
- Has many `RecommendationAnswer`
- Has many `RecommendationItem`

**Validation Rules**:
- `userId` remains nullable in MVP.
- A completed session must contain all required answers valid at submission time.

## Entity: RecommendationAnswer

Representa a resposta normalizada de uma sessao para uma pergunta.

**Fields**:
- `id` UUID primary key
- `sessionId` UUID foreign key to `RecommendationSession`
- `questionId` UUID foreign key to `QuizQuestion`
- `textValue` text nullable
- `scaleValue` integer nullable
- `createdAt` timestamp

**Relationships**:
- Belongs to `RecommendationSession`
- Belongs to `QuizQuestion`
- Has many `RecommendationAnswerOption`

**Validation Rules**:
- Single choice questions must have exactly one selected option.
- Multi choice questions may have one or more selected options if required.
- Free text answers are optional unless the question is required.

## Entity: RecommendationAnswerOption

Join table for selected answer options.

**Fields**:
- `answerId` UUID foreign key to `RecommendationAnswer`
- `optionId` UUID foreign key to `AnswerOption`

**Relationships**:
- Belongs to `RecommendationAnswer`
- Belongs to `AnswerOption`

**Validation Rules**:
- Pair `(answerId, optionId)` must be unique.

## Entity: RecommendationItem

Representa um estilo recomendado dentro de uma sessao.

**Fields**:
- `id` UUID primary key
- `sessionId` UUID foreign key to `RecommendationSession`
- `styleId` UUID foreign key to `TattooStyle`
- `rank` integer
- `score` integer
- `compatibilityPercent` integer
- `explanation` text
- `matchedSignals` JSON
- `createdAt` timestamp

**Relationships**:
- Belongs to `RecommendationSession`
- Belongs to `TattooStyle`

**Validation Rules**:
- `rank` starts at 1 and is unique per session.
- `compatibilityPercent` must be between 0 and 100.
- Each item returned to the front-end must include `style.name`, `style.characteristics`, `compatibilityPercent` and `explanation`.

## State Transitions

```text
Quiz loaded -> Answers drafted in UI -> Submit answers -> Validate required answers
  -> Calculate style scores -> Persist completed RecommendationSession
  -> Persist RecommendationItems -> Return recommendations to UI
```

Incomplete submissions do not create completed sessions; the API returns validation errors for missing required questions.
