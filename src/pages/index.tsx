
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function HelloWorld() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center space-y-6">
      <div className="p-6 bg-cyan-500/10 rounded-full border border-cyan-500/20">
        <Zap className="h-16 w-16 text-cyan-400" />
      </div>
      <h1 className="text-5xl font-bold text-white tracking-tight">
        Hello World
      </h1>
      <p className="text-slate-400 max-w-md text-lg">
        这是一个基于边缘计算构建的演示应用。点击上方导航栏的“边缘函数”查看部署指南。
      </p>
      <Link 
        to="/edge" 
        className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-all"
      >
        开始探索边缘函数
      </Link>
    </div>
  );
}
