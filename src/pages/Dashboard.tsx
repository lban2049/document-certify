import { Layout } from "@/components/Layout";
import { MetricCard } from "@/components/MetricCard";
import { ScoreGauge } from "@/components/ScoreGauge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  FileText, 
  BookOpen, 
  Layers, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  ArrowRight,
  Target,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - replace with real data in production
const reportData = {
  overallScore: 82.3,
  dimensions: [
    { name: "Accuracy", key: "accuracy", score: 88.5, weight: 35, color: "accuracy", icon: Shield },
    { name: "Coverage", key: "coverage", score: 79.2, weight: 35, color: "coverage", icon: FileText },
    { name: "Readability", key: "readability", score: 91.8, weight: 15, color: "readability", icon: BookOpen },
    { name: "Structure", key: "structure", score: 74.1, weight: 15, color: "structure", icon: Layers },
  ],
  keyMetrics: [
    { title: "Signature Parity", value: 95, status: "success" as const, description: "Function signature match with source code" },
    { title: "API Endpoint Coverage", value: 79, status: "warning" as const, description: "Percentage of documented API endpoints" },
    { title: "Clarity Score", value: 11, maxValue: 12, unit: "grade", status: "success" as const, description: "Flesch-Kincaid readability grade level" },
    { title: "Quickstart Reachable", value: 3, maxValue: 3, unit: "clicks", status: "success" as const, description: "Clicks from homepage to quickstart" },
  ],
  issues: [
    { type: "critical", count: 3, description: "Missing API documentation" },
    { type: "major", count: 8, description: "Outdated code examples" },
    { type: "minor", count: 15, description: "Inconsistent formatting" },
  ]
};

export default function Dashboard() {
  const calculateWeightedScore = () => {
    return reportData.dimensions.reduce((total, dim) => {
      return total + (dim.score * dim.weight / 100);
    }, 0);
  };

  const getIntegrityLevel = (score: number) => {
    if (score >= 90) return { level: "Platinum", color: "text-yellow-400", bgColor: "bg-yellow-400/10", borderColor: "border-yellow-400/20" };
    if (score >= 80) return { level: "Gold", color: "text-yellow-600", bgColor: "bg-yellow-600/10", borderColor: "border-yellow-600/20" };
    if (score >= 70) return { level: "Silver", color: "text-slate-400", bgColor: "bg-slate-400/10", borderColor: "border-slate-400/20" };
    return { level: "Bronze", color: "text-amber-700", bgColor: "bg-amber-700/10", borderColor: "border-amber-700/20" };
  };

  const integrityLevel = getIntegrityLevel(reportData.overallScore);

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-8 py-12">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-3 px-6 py-3 glass-card rounded-full text-sm font-medium hover-lift">
              <div className="w-2 h-2 bg-gradient-primary rounded-full animate-pulse"></div>
              <Target className="h-5 w-5 text-primary" />
              <span className="gradient-text font-semibold">Documentation Quality Score</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text">
              {reportData.overallScore}
              <span className="text-2xl md:text-4xl text-muted-foreground ml-2">/ 100</span>
            </h1>
            
            {/* Integrity Level Display */}
            <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full border ${integrityLevel.bgColor} ${integrityLevel.borderColor} hover-lift`}>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${integrityLevel.color.replace('text-', 'bg-')}`}></div>
                <span className="text-sm font-medium text-muted-foreground">Integrity Level:</span>
                <span className={`font-bold ${integrityLevel.color}`}>{integrityLevel.level}</span>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Comprehensive assessment based on four key dimensions: Accuracy, Coverage, Readability, and Structure, providing professional analysis and improvement recommendations
            </p>
          </div>
        </div>

        {/* Dimensions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {reportData.dimensions.map((dimension, index) => {
            const Icon = dimension.icon;
            return (
              <div
                key={dimension.key}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="glass-card hover-lift border-0 relative overflow-hidden h-full">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                  
                  <CardHeader className="pb-4 relative z-10">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl bg-${dimension.color}/10 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`h-5 w-5 text-${dimension.color}`} />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{dimension.name}</div>
                          <div className="text-xs text-muted-foreground">Weight {dimension.weight}%</div>
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 relative z-10">
                    <div className="text-center">
                      <div className="text-3xl font-bold gradient-text mb-2">
                        {dimension.score.toFixed(1)}
                      </div>
                      <Progress 
                        value={dimension.score} 
                        className="h-3 bg-muted/30"
                      />
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      asChild 
                      className="w-full group-hover:bg-primary/10 transition-colors"
                    >
                      <Link to={`/${dimension.key}`} className="flex items-center justify-center space-x-2">
                        <span className="text-sm font-medium">View Details</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-primary opacity-5 rounded-full blur-2xl"></div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Key Metrics */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold gradient-text">Key Metrics Overview</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Deep dive into core metric performance, identifying strengths and areas for improvement
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {reportData.keyMetrics.map((metric, index) => (
              <div
                key={index}
                className="float-animation"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <MetricCard
                  title={metric.title}
                  value={metric.value}
                  maxValue={metric.maxValue}
                  unit={metric.unit}
                  status={metric.status}
                  description={metric.description}
                  showProgress={metric.maxValue !== undefined}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="glass-card hover-lift border-0 relative overflow-hidden group">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <div className="p-2 rounded-xl bg-warning/10 group-hover:scale-110 transition-transform duration-300">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                </div>
                <span>Issues Requiring Attention</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4 relative z-10">
              {reportData.issues.map((issue, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 rounded-xl glass-card hover:shadow-card transition-all group/item"
                >
                  <div className="flex items-center space-x-4">
                    <Badge 
                      variant={issue.type === "critical" ? "destructive" : issue.type === "major" ? "secondary" : "outline"}
                      className="min-w-fit font-medium"
                    >
                      {issue.type === "critical" ? "Critical" : issue.type === "major" ? "Major" : "Minor"}
                    </Badge>
                    <span className="text-sm font-medium text-foreground group-hover/item:text-primary transition-colors">
                      {issue.description}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">{issue.count}</div>
                    <div className="text-xs text-muted-foreground">items</div>
                  </div>
                </div>
              ))}
              
              <Button className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-glow" asChild>
                <Link to="/recommendations" className="flex items-center justify-center space-x-2">
                  <span>View Improvement Recommendations</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift border-0 relative overflow-hidden group">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <div className="p-2 rounded-xl bg-success/10 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <span>Outstanding Highlights</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4 relative z-10">
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-success/10 border border-success/20 hover:border-success/40 transition-all group/highlight">
                  <div className="p-1 rounded-lg bg-success/20">
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-success mb-1">Excellent Signature Consistency</div>
                    <div className="text-sm text-foreground/80">95% of function signatures perfectly match source code, demonstrating outstanding technical accuracy</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-success/10 border border-success/20 hover:border-success/40 transition-all group/highlight">
                  <div className="p-1 rounded-lg bg-success/20">
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-success mb-1">Outstanding Readability</div>
                    <div className="text-sm text-foreground/80">Grade 11 readability score ensures clear, accessible documentation with low learning curve for users</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-success/10 border border-success/20 hover:border-success/40 transition-all group/highlight">
                  <div className="p-1 rounded-lg bg-success/20">
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-success mb-1">Excellent Navigation Experience</div>
                    <div className="text-sm text-foreground/80">Clear hierarchical structure with key information readily accessible, providing smooth user experience</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}