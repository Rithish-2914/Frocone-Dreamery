# Project Overview
This project is a React-based web application with an Express backend, using Drizzle ORM and PostgreSQL.

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, Shadcn UI, Wouter, TanStack Query
- Backend: Express, Node.js, Tsx
- Database: PostgreSQL, Drizzle ORM
- Deployment: Configured for Replit and Vercel

## Project Structure
- `client/`: Frontend source code
  - `src/components/`: UI components and layout
  - `src/pages/`: Application pages
  - `src/hooks/`: Custom React hooks
- `server/`: Backend source code
  - `routes.ts`: API endpoints
  - `storage.ts`: Database interaction layer
- `shared/`: Shared code between frontend and backend (e.g., Drizzle schema)

## How to Run
- Development: `npm run dev` (uses `tsx` to run the server which handles Vite middleware)
- Build: `npm run build` (builds the client assets into `dist/`)
- Production: `npm run start` (runs the server in production mode)

## Database Setup
The database schema is defined in `shared/schema.ts`. Tables are automatically initialized and seeded on startup in the development environment.
