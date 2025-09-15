import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText, BarChart3, Shield, BookOpen, Layers, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

const navigationItems = [
  { path: "/", icon: BarChart3, label: "总览", color: "text-primary" },
  { path: "/accuracy", icon: Shield, label: "准确性", color: "text-accuracy" },
  { path: "/coverage", icon: FileText, label: "覆盖率", color: "text-coverage" },
  { path: "/readability", icon: BookOpen, label: "可读性", color: "text-readability" },
  { path: "/structure", icon: Layers, label: "结构", color: "text-structure" },
  { path: "/recommendations", icon: CheckCircle, label: "改进建议", color: "text-accent" },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">文档质量评估报告</h1>
              <p className="text-sm text-muted-foreground mt-1">
                项目文档全面质量分析 - {new Date().toLocaleDateString('zh-CN')}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-6">
          <div className="flex space-x-1 overflow-x-auto">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  size="sm"
                  asChild
                  className={cn(
                    "flex items-center space-x-2 px-4 py-3 rounded-none border-b-2 border-transparent transition-colors",
                    isActive && "border-primary bg-primary/5 text-primary",
                    !isActive && "hover:bg-muted/50"
                  )}
                >
                  <Link to={item.path}>
                    <Icon className={cn("h-4 w-4", isActive ? "text-primary" : item.color)} />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}