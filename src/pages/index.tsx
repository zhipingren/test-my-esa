
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HelloWorld() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center space-y-8">
      <div className="p-6 bg-primary/10 rounded-full border border-primary/20 animate-in fade-in zoom-in duration-500">
        <Zap className="h-16 w-16 text-primary" />
      </div>
      
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-5xl font-bold text-foreground tracking-tight">
          Hello World
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          这是一个基于边缘计算构建的演示应用。<br />
          使用 React + TypeScript + Edge Functions 技术栈
        </p>
      </div>

      <div className="flex gap-4">
        <Link to="/edge">
          <Button size="lg" className="gap-2">
            <Zap className="h-4 w-4" />
            开始探索边缘函数
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-8 mt-12 text-center">
        <div className="space-y-2">
          <div className="text-2xl font-bold text-primary">&lt; 50ms</div>
          <div className="text-sm text-muted-foreground">全球边缘节点延迟</div>
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-primary">V8</div>
          <div className="text-sm text-muted-foreground">Isolate 运行时</div>
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-primary">0ms</div>
          <div className="text-sm text-muted-foreground">冷启动时间</div>
        </div>
      </div>
    </div>
  );
}
