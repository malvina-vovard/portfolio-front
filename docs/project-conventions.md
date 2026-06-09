# Project Conventions

This frontend is a dynamic portfolio built with Next.js 16, Tailwind CSS, shadcn/ui, and Strapi as the headless CMS.

## General Principles

- Keep code clean, secure, explicit, and easy to navigate.
- Use meaningful names for files, variables, functions, and methods.
- Avoid magic values in code. Configuration such as backend URLs must come from environment variables.
- Keep React files reasonably short. Split UI, data access, and types into focused files when a file starts doing too much.
- Place code where future readers would naturally look for it.

## File Organization

- Do not create `index` files.
- Do not create TypeScript files that only re-export other files.
- Import directly from the file that owns the implementation or type.
- Prefer focused modules such as `lib/strapi/api.ts`, `lib/strapi/env.ts`, and `lib/strapi/types.ts`.

## Environment Variables

- Strapi API URLs must be configured through environment variables.
- Do not add hardcoded fallback URLs for backend services in runtime code.
- Use clear names:
  - `STRAPI_API_URL` for server-side Strapi API requests.
  - `STRAPI_API_TOKEN` for the private Strapi API token.
  - `NEXT_PUBLIC_STRAPI_API_URL` only for public browser-safe needs such as media URLs.
- Keep `.env.example` updated when a new environment variable is required.
- Never commit secrets.

## Strapi

- Keep the Strapi API helper server-only when it uses private configuration or tokens.
- Keep Strapi response, entity, and query types reusable but scoped to Strapi files.
- Backend collection and single-type contracts should be documented here when they become stable.

## Documentation

- `AGENTS.md` is the durable agent memory for high-level rules and must reference the `docs/` folder.
- Add or update a focused document in `docs/` when introducing a lasting convention or important implementation detail.
