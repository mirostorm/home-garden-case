# Home Garden Case

This repository is an [Nx monorepo](https://nx.dev/) for a small gardening dashboard. It contains a Fastify API for data management and a Next.js frontend for browsing gardens, creating and updating plants, and managing garden details.

## Stack

- API: Fastify 5, TypeScript, Zod, Kysely, better-sqlite3
- Web: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS
- Workspace tooling: Nx
- API documentation: Swagger / OpenAPI via Fastify Swagger UI

## Repository structure

```text
home-garden-case/
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── database/
│   │   │   │   ├── plugins/
│   │   │   │   ├── routes/
│   │   │   │   ├── schemas/
│   │   │   │   ├── services/
│   │   │   │   └── app.ts
│   │   │   └── main.ts
│   │   └── package.json
│   └── web/
│       ├── src/
│       ├── public/
│       ├── project.json
│       ├── README.md
│       └── package.json
├── bruno/
│   ├── gardens/
│   ├── plants/
│   └── users/
├── README.md
├── package.json
├── nx.json
├── tsconfig.base.json
└── tsconfig.json
```

## Prerequisites

Before running the app, make sure you have:

- Node.js 20+ (recommended to use `nvm use` if you have it configured)
- npm installed
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

This runs the workspace in parallel with Nx.

### Start only the API

```bash
npx nx run api:dev
```

The Fastify API runs on:

- http://localhost:3000
- Swagger docs: http://localhost:3000/docs

### Start only the frontend

```bash
npx nx run web:dev
```

The Next.js frontend runs on:

- http://localhost:4200

### Run frontend tests

```bash
npm test
```

## App features

The application supports gardening and plant management across a small garden dashboard:

- create, read, update, and delete gardens
- create, read, update, and delete plants for a specific garden
- calculate garden plant capacity based on available surface area
- display garden detail pages with associated plants
- validate form inputs with Zod schemas before sending API requests

## API overview

The backend exposes CRUD endpoints for three main resources.

### Gardens

- `GET /gardens`
- `GET /gardens/:gardenId`
- `POST /gardens`
- `PUT /gardens/:gardenId`
- `DELETE /gardens/:gardenId`

### Plants

- `GET /plants/:plantId`
- `GET /plants/garden/:gardenId`
- `POST /plants`
- `PUT /plants/:plantId`
- `DELETE /plants/:plantId`

The API automatically runs database migrations on startup and returns OpenAPI schema responses for validation and errors.

## Frontend overview

The web app is built with Next.js and focuses on a thin UI layer over the backend API. It contains:

- a landing page at `/`
- a garden list at `/gardens`
- a detail page for a single garden at `/gardens/[slug]`
- server actions for creating, updating, and deleting gardens/plants
- cached query functions for fetching data from the API

The frontend expects the API base URL to be configured in `apps/web/.env.local`:

```env
API_BASE_URL=http://localhost:3000
```

A copy of the example file is available in `apps/web/.env.local.example`.

## API and web integration

The frontend reads and writes through the backend using direct fetches and server actions. In practice, the flow is:

1. page or action requests data from the backend
2. API responds with JSON
3. UI renders the result
4. form actions validate input, submit to the API, and revalidate the affected routes

## Bruno collection

The repository includes a Bruno collection under `bruno/` for manually testing the API requests for gardens, plants, and users.

## Additional notes

- The app uses SQLite for the local API database.
- Error responses and validation messages are generated from Zod schemas.
- The API includes extra demo plugins such as slow responses and random errors to simulate unstable network behavior in development.

For the frontend-specific setup, route structure, and UI conventions, see the [web README](./apps/web/README.md).
