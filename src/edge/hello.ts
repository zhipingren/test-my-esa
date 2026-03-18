
// 边缘函数 - Hello World
// 兼容 Edge Runtime (Vercel Edge, Cloudflare Workers, Deno Deploy 等)

export const config = {
  runtime: 'edge', // 标记为边缘运行时
};

export default async function handler(request: Request): Promise<Response> {
  // 获取请求信息
  const url = new URL(request.url);
  const method = request.method;
  
  // 设置 CORS 头，允许跨域访问
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'X-Edge-Function': 'hello-world',
  });

  // 处理 OPTIONS 预检请求
  if (method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  // 构建响应数据
  const data = {
    message: 'Hello World from Edge Function!',
    timestamp: new Date().toISOString(),
    region: request.headers.get('cf-ray') || 'edge-local', // Cloudflare 会提供区域信息
    method,
    path: url.pathname,
    query: Object.fromEntries(url.searchParams),
    headers: Object.fromEntries(request.headers.entries()),
  };

  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers,
  });
}

// 对于 Cloudflare Workers 格式（如果需要）
export async function fetch(request: Request): Promise<Response> {
  return handler(request);
}
