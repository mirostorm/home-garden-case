# ItpHomeGarden

This repository uses an [Nx Monorepo](https://nx.dev/) setup.

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
  Once it's running, you can check out the api specs at http://localhost:3000/docs

## Frontend

This project uses a Next.js frontend project. It provides a dashboard for managing gardens and the plants within them, with a UI built on App Router, Tailwind CSS with ShadCN, and reusable component patterns.

For more info on the front-end project, see the [Frontend README](./apps/web/README.md).
