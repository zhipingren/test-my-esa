
// 边缘函数 - Hello World
// 兼容 Edge Runtime (Vercel Edge, Cloudflare Workers, Deno Deploy 等)

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const method = request.method;
  
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'X-Edge-Function': 'hello-world',
  });

  if (method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  const data = {
    message: 'Hello World from Edge Function!',
    timestamp: new Date().toISOString(),
    region: request.headers.get('cf-ray')?.split('-')[1] || 'edge-local',
    method,
    path: url.pathname,
    query: Object.fromEntries(url.searchParams),
    headers: {
      'user-agent': request.headers.get('user-agent'),
      'accept-language': request.headers.get('accept-language'),
    },
  };

  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers,
  });
}

// Cloudflare Workers 兼容格式
export async function fetch(request: Request): Promise<Response> {
  return handler(request);
}
