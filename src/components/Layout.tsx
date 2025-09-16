import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText, BarChart3, Shield, BookOpen, Layers, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

const navigationItems = [
  { path: "/", icon: BarChart3, label: "Overview", color: "text-primary" },
  { path: "/accuracy", icon: Shield, label: "Accuracy", color: "text-accuracy" },
  { path: "/coverage", icon: FileText, label: "Coverage", color: "text-coverage" },
  { path: "/readability", icon: BookOpen, label: "Readability", color: "text-readability" },
  { path: "/structure", icon: Layers, label: "Structure", color: "text-structure" },
  { path: "/recommendations", icon: CheckCircle, label: "Recommendations", color: "text-accent" },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-primary opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-secondary opacity-10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-success opacity-5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Header */}
      <header className="glass-card border-b-0 sticky top-0 z-40 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold gradient-text">Documentation Quality Assessment Report</h1>
              <p className="text-sm text-muted-foreground flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-primary rounded-full animate-pulse"></div>
                <span>Comprehensive Project Documentation Quality Analysis - {new Date().toLocaleDateString('en-US')}</span>
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold gradient-text">82.3</div>
                <div className="text-xs text-muted-foreground">Overall Score</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="glass-card border-b-0 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex space-x-1 overflow-x-auto py-2">
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
                    "flex items-center space-x-3 px-6 py-3 rounded-xl border-2 border-transparent transition-all duration-300 relative overflow-hidden group",
                    isActive && "bg-gradient-primary text-white shadow-glow border-primary/20",
                    !isActive && "hover:bg-gradient-card hover:shadow-card hover:border-border/50 hover:-translate-y-1"
                  )}
                >
                  <Link to={item.path}>
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <Icon className={cn(
                      "h-4 w-4 transition-transform group-hover:scale-110", 
                      isActive ? "text-white" : item.color
                    )} />
                    <span className="whitespace-nowrap font-medium relative z-10">{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}