import type { Env } from './index';

export interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  charId: string;
  charName: string;
}

const tokenKey = (charId: string) => `token:${charId}`;

export const getToken = async (env: Env, charId: string): Promise<TokenData | null> => {
  const raw = await env.TOKEN_STORE.get(tokenKey(charId));
  if (!raw) return null;
  return JSON.parse(raw) as TokenData;
};

export const saveToken = async (env: Env, token: TokenData): Promise<void> => {
  await env.TOKEN_STORE.put(tokenKey(token.charId), JSON.stringify(token));
};

export const deleteToken = async (env: Env, charId: string): Promise<void> => {
  await env.TOKEN_STORE.delete(tokenKey(charId));
};

export const refreshToken = async (env: Env, charId: string): Promise<TokenData | null> => {
  const token = await getToken(env, charId);
  if (!token) return null;

  // Token still valid with 60s buffer
  if (Date.now() < token.expiresAt - 60_000) return token;

  const EVE_SSO_TOKEN_URL = 'https://login.eveonline.com/v2/oauth/token';
  const clientId = await env.TOKEN_STORE.get('EVE_CLIENT_ID');
  const clientSecret = await env.TOKEN_STORE.get('EVE_CLIENT_SECRET');

  if (!clientId || !clientSecret) {
    console.error('EVE SSO credentials not configured in KV');
    return null;
  }

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: token.refreshToken,
  });

  const credentials = btoa(`${clientId}:${clientSecret}`);
  const res = await fetch(EVE_SSO_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!res.ok) {
    console.error('Token refresh failed', res.status);
    return null;
  }

  const data = (await res.json()) as {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };

  const refreshed: TokenData = {
    ...token,
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  await saveToken(env, refreshed);
  return refreshed;
};
