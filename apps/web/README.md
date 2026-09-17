# Home Garden Web App

This is the Next.js frontend for the Home Garden project. It provides a dashboard for managing gardens and the plants inside them, with a UI built using the App Router, TypeScript, and Tailwind CSS.

The web app is designed to run alongside the Fastify API at `http://localhost:3000`.

## Overview

The frontend is responsible for:

- showing the landing page and garden overview
- listing all gardens and creating new entries
- rendering a detail page for each garden and its plants
- creating, updating, and deleting plants attached to a selected garden
- validating form payloads before sending requests to the API

## Tech stack

- Next.js 15 (App router)
- React 19
- TypeScript
- TailwindCSS v4
  - Shadcn-style UI primitives and custom components

## Project structure

```text
apps/web/
├── src/
│   ├── actions/
│   │   ├── garden.actions.ts
│   │   ├── garden.actions.test.ts
│   │   ├── plant.actions.ts
│   │   └── plant.actions.test.ts
│   ├── app/
│   │   ├── (user)/
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── gardens/
│   │   │       ├── page.tsx
│   │   │       └── [slug]/page.tsx
│   │   ├── global.css
│   │   ├── layout.tsx
│   │   └── favicon.ico
│   ├── components/
│   │   ├── @form/
│   │   ├── @gardens/
│   │   ├── @plants/
│   │   ├── @layout/
│   │   └── ui/
│   ├── hooks/
│   ├── queries/
│   │   └── garden.queries.ts
│   ├── types/
│   │   ├── garden.types.ts
│   │   └── plant.types.ts
│   ├── utils/
│   └── ...
├── public/
│   └── assets/
├── .env.local.example
├── components.json
├── next.config.js
├── project.json
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── eslint.config.mjs
```

## Core routes

### Public landing page

- `/` — welcome view with a call to action to browse gardens

### Gardens

- `/gardens` — list all gardens and allow creation flows
- `/gardens/[slug]` — detail page for a single garden, including associated plants

## How the app works

The frontend is intentionally thin and mostly acts as a UI layer on top of the API. Most operations are driven by:

- server components inside the App Router
- server actions in `src/actions`
- cached fetch helpers in `src/queries`

Examples:

- `garden.actions.ts` validates form input and posts to the backend for create/update/delete operations
- `plant.actions.ts` enforces plant-space constraints before creating or editing a plant
- `garden.queries.ts` fetches garden and plant data using cached React requests

The normal flow is:

1. a page loads and requests data from the API
2. the API returns JSON
3. the UI renders the result
4. a mutation action validates input and revalidates the relevant Next.js paths

## Runtime configuration

Create a local environment file for the web app at `apps/web/.env.local` using the example file:

```env
API_BASE_URL=http://localhost:3000
```

This value must point to the Fastify API running locally.

## Prerequisites

Before running the app, make sure you have:

- Node.js 20+
- npm available
- dependencies installed at the workspace root

## Install dependencies

From the repository root:

```bash
npm install
```

## Run the app

### Start both frontend and backend together

```bash
npm run dev
```

### Start only the frontend

```bash
npx nx run web:dev
```

The app runs on:

- http://localhost:4200

### Start only the API

```bash
npx nx run api:dev
```

The API runs on:

- http://localhost:3000
- Swagger UI: http://localhost:3000/docs

## Important runtime note

The frontend fetches data from the backend at `http://localhost:3000`. If the API is not running, the garden pages may render empty states or fail to load data.

## Useful commands

From the repository root:

```bash
# run the web app only
npx nx run web:dev

# run the API only
npx nx run api:dev

# run both apps in parallel
npm run dev

# run frontend tests
npm test
```

## Development conventions

- Keep UI logic in `src/components`
- Keep API interaction in `src/actions` and `src/queries`
- Prefer typed domain models from `src/types`
- Validate forms with Zod before sending requests
- Call `revalidatePath` after successful mutation flows

## Styling

This project uses Tailwind CSS, with styling configuration and shared design tokens defined in:

- `src/app/global.css`
- `src/app/layout.tsx`
- the UI component folder under `src/components/ui`
