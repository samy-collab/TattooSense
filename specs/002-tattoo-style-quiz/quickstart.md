# Quickstart: TattooSense Style Quiz

## Prerequisites

- Node.js 22 LTS
- npm 10+
- PostgreSQL 16+

## Setup

1. Install dependencies from the repository root:

```bash
npm install
```

2. Configure environment variables:

```bash
cp backend/.env.example backend/.env
```

Required values:

```bash
DATABASE_URL="postgresql://tattoosense:tattoosense@localhost:5432/tattoosense"
API_PORT=3333
FRONTEND_ORIGIN="http://localhost:5173"
```

3. Run database migrations and seed initial catalog:

```bash
npm run prisma:migrate
npm run prisma:seed
```

4. Start the API and frontend together:

```bash
npm run dev
```

Or start each workspace separately:

```bash
npm run dev --workspace backend
npm run dev --workspace frontend
```

5. Open the app:

```text
http://localhost:5173
```

## MVP Verification Flow

1. Open the TattooSense web app.
2. Confirm the quiz loads from `GET /api/quiz`.
3. Try submitting without required answers and confirm missing questions are shown.
4. Complete the quiz with preferences for style, body placement, size, visibility, composition and emotion.
5. Confirm `POST /api/recommendations` returns at least two recommendations when the profile has multiple compatible styles.
6. Confirm each recommendation includes name, compatibility, explanation and characteristics.
7. Confirm the result includes aesthetic-guidance disclaimer text and does not present itself as professional advice.

## Planned Test Commands

```bash
npm run test --workspace backend
npm run test --workspace frontend
npm run test:e2e --workspace frontend
```

## Local PostgreSQL Notes

If the database/user from `DATABASE_URL` does not exist yet, create it before running migrations. One local option is:

```bash
createdb tattoosense
```

For Docker-based local setup, expose PostgreSQL on port `5432` and keep `backend/.env` aligned with the container credentials.

## API Contract

The REST contract is documented in `specs/002-tattoo-style-quiz/contracts/openapi.yaml`.
