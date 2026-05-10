export interface Env {
  DB: D1Database;
  TOKEN_STORE: KVNamespace;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });

async function handleApi(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api/, '');

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (path === '/health') {
    return json({ status: 'ok', ts: new Date().toISOString() });
  }

  if (path === '/parameters') {
    const { results } = await env.DB.prepare('SELECT key, value FROM parameters').all();
    return json(results);
  }

  return json({ error: 'Not found' }, 404);
}

async function runDailyPull(env: Env): Promise<void> {
  console.log('Daily ESI pull started', new Date().toISOString());
  // ESI pull implementation goes here
  void env;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      return handleApi(request, env);
    }
    return new Response('Not found', { status: 404 });
  },

  async scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(runDailyPull(env));
  },
};
