# EVE Industry — Claude Code Guidelines

## Stack
- Frontend: React, Tailwind CSS, Shadcn UI components
- Backend: Cloudflare Workers (TypeScript)
- Database: Cloudflare D1 (SQLite)
- Token storage: Cloudflare KV

## Coding rules
- No file over 200 lines — split into components if needed
- Functional components with arrow functions only
- TypeScript strict mode — no `any` types
- Use Shadcn UI for all interactive elements — never build custom UI if Shadcn has it
- TanStack Query for server state
- All hardcoded strings to constants file if reused
- Handle loading and error states for all async operations
- All ISK values stored as integers (no floating point)
- All ESI calls go through `/app/src/lib/esi.ts`
- Token refresh logic only in `/worker/src/auth.ts`
- Never hardcode type IDs or structure IDs — always read from D1 parameters table

## Directory structure
- `/app/src/components/ui` — Shadcn primitives
- `/app/src/components/eve` — EVE-specific components
- `/app/src/hooks` — custom React hooks
- `/app/src/lib` — utilities and API clients
- `/app/src/pages` — full tab views
- `/app/src/types` — TypeScript interfaces
