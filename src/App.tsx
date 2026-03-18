
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Zap, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import HelloWorld from './pages';
import EdgeFunctionDemo from './pages/EdgeFunctionDemo';

function Navigation() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-14 gap-6">
        <span className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Edge Demo
        </span>
        <div className="flex gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              )
            }
          >
            <Home className="h-4 w-4" />
            首页
          </NavLink>
          <NavLink
            to="/edge"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              )
            }
          >
            <Zap className="h-4 w-4" />
            边缘函数
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950">
        <Navigation />
        <Routes>
          <Route path="/" element={<HelloWorld />} />
          <Route path="/edge" element={<EdgeFunctionDemo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
