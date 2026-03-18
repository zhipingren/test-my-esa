
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Zap, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import HelloWorld from './pages';
import EdgeFunctionDemo from './pages/EdgeFunctionDemo';

function Navigation() {
  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-14 gap-6">
        <span className="font-bold text-lg text-foreground">
          Edge Demo
        </span>
        <div className="flex gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
      <div className="min-h-screen bg-background">
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
