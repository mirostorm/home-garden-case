# Home Garden Web App

This is the Next.js frontend for the Home Garden project. It provides a dashboard for managing gardens and the plants within them, with a UI built on App Router, Tailwind CSS with ShadCN, and reusable component patterns.

The app talks to the backend API running on localhost:3000 and is intended to be used together with the API app.

## Overview

The web app is responsible for:

- showing a landing page and dashboard-style browsing experience
- listing gardens and rendering garden detail views
- interacting with garden & plant data via the backend API
- handling server actions and form validation for mutation flows

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
│   ├── actions/             # Server actions for form submissions and API calls
│   ├── app/                 # App Router pages and layouts
│   │   ├── (user)/
│   │   │   ├── page.tsx     # Landing page
│   │   │   ├── gardens/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   ├── api/
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/          # UI blocks and feature-specific components
│   │   ├── @form/
│   │   ├── @gardens/
│   │   ├── @layout/
│   │   ├── @plants/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   ├── types/               # Domain types for gardens and plants
│   └── ...
├── public/
│   └── assets/
├── components.json
├── next.config.js
├── project.json
├── package.json
├── tsconfig.json
└── eslint.config.mjs
```

## Core routes

### Public landing page

- `/` — welcome page with call-to-action to browse gardens

### Gardens

- `/gardens` — list all gardens and allow CRUD
- `/gardens/[slug]` — detail page for a single garden, including associated plants

## How the app works

The frontend is intentionally thin and mostly acts as a UI layer over the API. Most data fetching and mutations happen from:

- server components in the App Router
- server actions in `src/actions`
- direct fetch calls to the backend API at `http://localhost:3000`

Examples:

- `garden.actions.ts` validates form input and sends create/update/delete requests to the API
- page files under `src/app/(user)/gardens` fetch garden and plant data and pass it to UI components

This means the frontend is easy to follow because the data flow is usually:

1. Page or action loads request data
2. API returns JSON
3. UI renders the result
4. Form actions validate, call the API, and revalidate related paths

## Prerequisites

Before running the app, make sure you have:

- Node.js installed (correct version -> `nvm use`)
- npm available
- dependencies installed from the workspace root

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

This runs the workspace in parallel using Nx.

### Start only the frontend

```bash
npx nx run web:dev
```

The web app runs on:

- http://localhost:4200

### Start only the API

```bash
npx nx run api:dev
```

The API runs on:

- http://localhost:3000

## Important runtime note

The frontend is configured to fetch data from the backend at `http://localhost:3000`.

If the API is not running, the web app may render empty states or fail to load content. Always make sure the backend is started before using the garden-related pages.

## Useful commands

From the repository root:

```bash
# run web only
npx nx run web:dev

# run API only
npx nx run api:dev

# run all app targets in parallel
npm run dev
```

## Development conventions

- Keep UI logic in components under `src/components`
- Keep server-side API interaction in `src/actions` or page-level fetches
- Prefer typed domain models from `src/types`
- Use existing patterns for form validation and `revalidatePath` after mutations

## Styling

This project uses Tailwind CSS. Global styling and theme setup live in:

- `src/app/global.css`
- `src/app/layout.tsx`
