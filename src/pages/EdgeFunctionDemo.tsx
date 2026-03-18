
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Server, Zap, Copy, Check, Play, ExternalLink } from 'lucide-react';

const EdgeFunctionDemo = () => {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('vercel');

  const callEdgeFunction = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/hello');
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse('Error: ' + (error as Error).message + '\n\n提示：请先部署边缘函数到生产环境');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const deployConfigs = {
    vercel: {
      name: 'Vercel Edge',
      color: 'bg-black',
      steps: [
        '将 edge/hello.ts 移动到项目根目录 api/hello.ts',
        '配置 vercel.json 指定 edge runtime',
        '运行 vercel --prod 部署',
        '在 Dashboard → Settings → Domains 添加 www.example.com'
      ],
      config: `{
  "functions": {
    "api/hello.ts": {
      "runtime": "edge"
    }
  }
}`
    },
    cloudflare: {
      name: 'Cloudflare Workers',
      color: 'bg-orange-500',
      steps: [
        '安装 Wrangler: npm i -g wrangler',
        '修改导出为 Workers 格式',
        '运行 wrangler deploy 部署',
        '在 Dashboard → Workers → Custom Domains 绑定域名'
      ],
      config: `export default {
  async fetch(request: Request) {
    return new Response('Hello from Edge!');
  }
};`
    },
    netlify: {
      name: 'Netlify Edge',
      color: 'bg-teal-500',
      steps: [
        '创建 netlify/edge-functions/hello.ts',
        '配置 netlify.toml 路由规则',
        '推送到 Git 触发自动部署',
        '在 Site settings → Domain management 添加自定义域名'
      ],
      config: `[[edge_functions]]
  function = "hello"
  path = "/api/hello"`
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Edge Function
              </h1>
              <p className="text-muted-foreground">Hello World 示例与部署指南</p>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm">目标域名</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <code className="text-primary font-mono text-sm">www.example.com</code>
              <p className="text-xs text-muted-foreground mt-2">需在部署平台控制台绑定</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-secondary-foreground" />
                <CardTitle className="text-sm">运行时</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">Edge Runtime</Badge>
              <p className="text-xs text-muted-foreground mt-2">V8 Isolate 环境</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-chart-4" />
                <CardTitle className="text-sm">延迟</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-chart-4 font-mono text-sm font-bold">&lt; 50ms</span>
              <p className="text-xs text-muted-foreground mt-2">全球边缘节点</p>
            </CardContent>
          </Card>
        </div>

        {/* Test Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-primary" />
              函数测试
            </CardTitle>
            <CardDescription>
              点击按钮调用边缘函数（需先部署到生产环境）
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Button 
                onClick={callEdgeFunction}
                disabled={loading}
              >
                {loading ? '请求中...' : '调用 /api/hello'}
              </Button>
              {response && (
                <Button 
                  variant="outline" 
                  onClick={copyToClipboard}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </div>
            
            {response && (
              <pre className="bg-muted border border-border rounded-lg p-4 overflow-auto text-sm font-mono text-foreground">
                {response}
              </pre>
            )}
          </CardContent>
        </Card>

        {/* Deployment Guide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-primary" />
              部署指南
            </CardTitle>
            <CardDescription>
              选择平台查看具体的部署步骤和域名绑定方法
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="vercel">Vercel</TabsTrigger>
                <TabsTrigger value="cloudflare">Cloudflare</TabsTrigger>
                <TabsTrigger value="netlify">Netlify</TabsTrigger>
              </TabsList>
              
              {Object.entries(deployConfigs).map(([key, config]) => (
                <TabsContent key={key} value={key} className="space-y-4 mt-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`w-3 h-3 rounded-full ${config.color}`} />
                    <h3 className="font-semibold text-foreground">{config.name}</h3>
                  </div>
                  
                  <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                    {config.steps.map((step, idx) => (
                      <li key={idx} className="text-sm">{step}</li>
                    ))}
                  </ol>

                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground mb-2">配置示例：</p>
                    <pre className="bg-muted border border-border rounded-lg p-3 overflow-auto text-xs font-mono text-foreground">
                      {config.config}
                    </pre>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Domain Binding Note */}
        <div className="bg-muted/50 border border-border rounded-lg p-4 flex items-start gap-3">
          <Globe className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground">关于域名绑定 www.example.com</h4>
            <p className="text-sm text-muted-foreground mt-1">
              域名绑定需要在各平台的控制台完成，通常需要验证 DNS 记录。部署成功后，
              访问 <code className="bg-background px-1 rounded">https://www.example.com/api/hello</code> 即可看到边缘函数的响应。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdgeFunctionDemo;
