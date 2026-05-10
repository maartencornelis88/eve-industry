# EVE Industry Tool

A personal EVE Online industry management tool hosted on `adurrant.com`.

## Structure

```
/
├── landing/          Static Limineer-branded landing page (adurrant.com)
├── app/              React + Vite frontend (adurrant.com/eve)
├── worker/           Cloudflare Worker — API routes + daily ESI cron
├── migrations/       D1 SQL migration files
├── CLAUDE.md         Coding rules for Claude Code
└── README.md
```

## Setup

### Prerequisites
- Node.js 20+
- Wrangler CLI: `npm i -g wrangler`
- A Cloudflare account with Pages, Workers, D1, and KV enabled

### 1. Clone and install

```bash
cd app && npm install
cd ../worker && npm install
```

### 2. Create D1 database

```bash
cd worker
wrangler d1 create eve-industry
# Copy the database_id into worker/wrangler.toml
wrangler d1 execute eve-industry --file=../migrations/0001_initial.sql
```

### 3. Create KV namespace

```bash
wrangler kv namespace create TOKEN_STORE
wrangler kv namespace create TOKEN_STORE --preview
# Copy both IDs into worker/wrangler.toml
```

### 4. Store EVE SSO credentials in KV

```bash
wrangler kv key put EVE_CLIENT_ID "your-client-id" --binding TOKEN_STORE
wrangler kv key put EVE_CLIENT_SECRET "your-client-secret" --binding TOKEN_STORE
```

### 5. Initialize Shadcn UI

```bash
cd app
npx shadcn@latest init
# Choose: TypeScript, dark theme, /src/components/ui
# Then add components as needed: npx shadcn@latest add button table tabs select
```

### 6. Run locally

Terminal 1 — Worker dev server on port 8787:
```bash
cd worker && npm run dev
```

Terminal 2 — Vite dev server (proxies /api to worker):
```bash
cd app && npm run dev
```

### 7. Deploy

**Worker:**
```bash
cd worker && npm run deploy
```

**Frontend (Cloudflare Pages):**  
Connect the repo in the Cloudflare Pages dashboard:
- Build command: `cd app && npm run build`
- Output directory: `app/dist`
- Root path: `/`

**Landing page:**  
Deploy `landing/index.html` via Pages or place it as a static asset at the root of the Pages project.

## Routes

| Path | Served by |
|------|-----------|
| `adurrant.com` | `landing/index.html` (Cloudflare Pages) |
| `adurrant.com/eve/*` | React app — `app/dist` (Cloudflare Pages) |
| `adurrant.com/api/*` | Cloudflare Worker |

## Database

Migrations live in `/migrations`. Apply with:
```bash
wrangler d1 execute eve-industry --file=migrations/0001_initial.sql
```

All type IDs, structure IDs, and tunable parameters live in the `parameters` table — never hardcode them in application code.

## EVE SSO

Register an application at [developers.eveonline.com](https://developers.eveonline.com).  
Required scopes: `esi-wallet.read_character_wallet.v1 esi-markets.read_character_orders.v1 esi-industry.read_character_jobs.v1`

Store credentials in KV (see step 4 above). Token refresh is handled exclusively in `worker/src/auth.ts`.
