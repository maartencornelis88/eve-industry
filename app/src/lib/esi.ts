const ESI_BASE = 'https://esi.evetech.net/latest';

class EsiError extends Error {
  constructor(public status: number, path: string) {
    super(`ESI ${status}: ${path}`);
  }
}

const esiGet = async <T>(
  path: string,
  params?: Record<string, string>,
  token?: string
): Promise<T> => {
  const url = new URL(`${ESI_BASE}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(url.toString(), { headers });
  if (!res.ok) throw new EsiError(res.status, path);
  return res.json() as Promise<T>;
};

export const esi = {
  get: esiGet,
};
