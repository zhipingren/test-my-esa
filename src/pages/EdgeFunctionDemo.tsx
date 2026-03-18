
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Server, Zap, Copy, Check } from 'lucide-react';

const EdgeFunctionDemo = () => {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const callEdgeFunction = async () => {
    setLoading(true);
    try {
      // 实际部署后替换为真实域名
      const res = await fetch('/api/hello');
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse('Error: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
              <Zap className="h-8 w-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Edge Function
              </h1>
              <p className="text-slate-400 text-lg">Hello World 示例与部署指南</p>
            </div>
          </div>
        </div>

        {/* Deployment Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-cyan-400" />
                <CardTitle className="text-sm text-slate-300">目标域名</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <code className="text-cyan-400 font-mono text-sm">www.example.com</code>
              <p className="text-xs text-slate-500 mt-2">需在部署平台控制台绑定</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-purple-400" />
                <CardTitle className="text-sm text-slate-300">运行时</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                Edge Runtime
              </Badge>
              <p className="text-xs text-slate-500 mt-2">V8 Isolate 环境</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-400" />
                <CardTitle className="text-sm text-slate-300">延迟</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-amber-400 font-mono text-sm">&lt; 50ms</span>
              <p className="text-xs text-slate-500 mt-2">全球边缘节点</p>
            </CardContent>
          </Card>
        </div>

        {/* Test Section */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-slate-200">函数测试</CardTitle>
            <CardDescription className="text-slate-400">
              点击按钮调用边缘函数（需先部署）
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Button 
                onClick={callEdgeFunction}
                disabled={loading}
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                {loading ? '请求中...' : '调用 /api/hello'}
              </Button>
              {response && (
                <Button 
                  variant="outline" 
                  onClick={copyToClipboard}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </div>
            
            {response && (
              <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-auto text-sm font-mono text-green-400">
                {response}
              </pre>
            )}
          </CardContent>
        </Card>

        {/* Deployment Guide */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-slate-200">部署指南</CardTitle>
            <CardDescription className="text-slate-400">
              将边缘函数部署到生产环境并绑定域名
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Vercel */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-black rounded-full" />
                Vercel Edge Functions
              </h3>
              <ol className="text-sm text-slate-400 space-y-1 list-decimal list-inside ml-4">
                <li>将文件移动到 <code className="bg-slate-800 px-1 rounded">api/hello.ts</code>（项目根目录）</li>
                <li>安装 Vercel CLI: <code className="bg-slate-800 px-1 rounded">npm i -g vercel</code></li>
                <li>部署: <code className="bg-slate-800 px-1 rounded">vercel --prod</code></li>
                <li>绑定域名: 在 Vercel Dashboard → Project Settings → Domains 添加 <code className="text-cyan-400">www.example.com</code></li>
              </ol>
            </div>

            {/* Cloudflare */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                Cloudflare Workers
              </h3>
              <ol className="text-sm text-slate-400 space-y-1 list-decimal list-inside ml-4">
                <li>安装 Wrangler: <code className="bg-slate-800 px-1 rounded">npm i -g wrangler</code></li>
                <li>修改导出格式为 Workers 格式（见代码注释）</li>
                <li>部署: <code className="bg-slate-800 px-1 rounded">wrangler deploy</code></li>
                <li>绑定域名: Cloudflare Dashboard → Workers & Pages → Custom Domains</li>
              </ol>
            </div>

            {/* Netlify */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-500 rounded-full" />
                Netlify Edge Functions
              </h3>
              <ol className="text-sm text-slate-400 space-y-1 list-decimal list-inside ml-4">
                <li>将文件放到 <code className="bg-slate-800 px-1 rounded">netlify/edge-functions/hello.ts</code></li>
                <li>创建 <code className="bg-slate-800 px-1 rounded">netlify.toml</code> 配置路由</li>
                <li>部署到 Netlify 并添加自定义域名</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EdgeFunctionDemo;
