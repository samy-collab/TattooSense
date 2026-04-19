CREATE SCHEMA IF NOT EXISTS "public";

CREATE TYPE "QuizCategory" AS ENUM ('music', 'culture', 'personal_style', 'body_placement', 'size', 'visibility', 'composition', 'emotion');
CREATE TYPE "QuizInputType" AS ENUM ('single_choice', 'multi_choice', 'scale', 'free_text');
CREATE TYPE "RecommendationSessionStatus" AS ENUM ('completed');

CREATE TABLE "QuizQuestion" (
  "id" UUID NOT NULL,
  "key" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "category" "QuizCategory" NOT NULL,
  "inputType" "QuizInputType" NOT NULL,
  "isRequired" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "QuizQuestion_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AnswerOption" (
  "id" UUID NOT NULL,
  "questionId" UUID NOT NULL,
  "key" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "description" TEXT,
  "sortOrder" INTEGER NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AnswerOption_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TattooStyle" (
  "id" UUID NOT NULL,
  "key" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "summary" TEXT NOT NULL,
  "characteristics" TEXT[],
  "visualTraits" TEXT[],
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "TattooStyle_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CompatibilityRule" (
  "id" UUID NOT NULL,
  "styleId" UUID NOT NULL,
  "questionId" UUID,
  "answerOptionId" UUID,
  "condition" JSONB,
  "weight" INTEGER NOT NULL,
  "reasonTemplate" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CompatibilityRule_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RecommendationSession" (
  "id" UUID NOT NULL,
  "anonymousUserId" UUID,
  "userId" UUID,
  "status" "RecommendationSessionStatus" NOT NULL DEFAULT 'completed',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "RecommendationSession_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RecommendationAnswer" (
  "id" UUID NOT NULL,
  "sessionId" UUID NOT NULL,
  "questionId" UUID NOT NULL,
  "textValue" TEXT,
  "scaleValue" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "RecommendationAnswer_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RecommendationAnswerOption" (
  "answerId" UUID NOT NULL,
  "optionId" UUID NOT NULL,
  CONSTRAINT "RecommendationAnswerOption_pkey" PRIMARY KEY ("answerId","optionId")
);

CREATE TABLE "RecommendationItem" (
  "id" UUID NOT NULL,
  "sessionId" UUID NOT NULL,
  "styleId" UUID NOT NULL,
  "rank" INTEGER NOT NULL,
  "score" INTEGER NOT NULL,
  "compatibilityPercent" INTEGER NOT NULL,
  "explanation" TEXT NOT NULL,
  "matchedSignals" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "RecommendationItem_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "QuizQuestion_key_key" ON "QuizQuestion"("key");
CREATE UNIQUE INDEX "AnswerOption_questionId_key_key" ON "AnswerOption"("questionId", "key");
CREATE INDEX "AnswerOption_questionId_sortOrder_idx" ON "AnswerOption"("questionId", "sortOrder");
CREATE UNIQUE INDEX "TattooStyle_key_key" ON "TattooStyle"("key");
CREATE INDEX "CompatibilityRule_styleId_isActive_idx" ON "CompatibilityRule"("styleId", "isActive");
CREATE INDEX "CompatibilityRule_answerOptionId_idx" ON "CompatibilityRule"("answerOptionId");
CREATE INDEX "RecommendationAnswer_sessionId_idx" ON "RecommendationAnswer"("sessionId");
CREATE UNIQUE INDEX "RecommendationItem_sessionId_rank_key" ON "RecommendationItem"("sessionId", "rank");
CREATE INDEX "RecommendationItem_sessionId_idx" ON "RecommendationItem"("sessionId");

ALTER TABLE "AnswerOption" ADD CONSTRAINT "AnswerOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuizQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CompatibilityRule" ADD CONSTRAINT "CompatibilityRule_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "TattooStyle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CompatibilityRule" ADD CONSTRAINT "CompatibilityRule_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuizQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "CompatibilityRule" ADD CONSTRAINT "CompatibilityRule_answerOptionId_fkey" FOREIGN KEY ("answerOptionId") REFERENCES "AnswerOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "RecommendationAnswer" ADD CONSTRAINT "RecommendationAnswer_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "RecommendationSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RecommendationAnswer" ADD CONSTRAINT "RecommendationAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuizQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "RecommendationAnswerOption" ADD CONSTRAINT "RecommendationAnswerOption_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "RecommendationAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RecommendationAnswerOption" ADD CONSTRAINT "RecommendationAnswerOption_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "AnswerOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "RecommendationItem" ADD CONSTRAINT "RecommendationItem_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "RecommendationSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RecommendationItem" ADD CONSTRAINT "RecommendationItem_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "TattooStyle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
