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
    { name: "准确性", key: "accuracy", score: 88.5, weight: 35, color: "accuracy", icon: Shield },
    { name: "覆盖率", key: "coverage", score: 79.2, weight: 35, color: "coverage", icon: FileText },
    { name: "可读性", key: "readability", score: 91.8, weight: 15, color: "readability", icon: BookOpen },
    { name: "结构", key: "structure", score: 74.1, weight: 15, color: "structure", icon: Layers },
  ],
  keyMetrics: [
    { title: "签名一致性", value: 95, status: "success" as const, description: "函数签名与源代码匹配度" },
    { title: "API端点覆盖", value: 79, status: "warning" as const, description: "已文档化API端点比例" },
    { title: "清晰度评分", value: 11, maxValue: 12, unit: "级", status: "success" as const, description: "Flesch-Kincaid可读性等级" },
    { title: "快速入门可达性", value: 3, maxValue: 3, unit: "点击", status: "success" as const, description: "从首页到快速入门的点击数" },
  ],
  issues: [
    { type: "critical", count: 3, description: "缺失的API文档" },
    { type: "major", count: 8, description: "过时的代码示例" },
    { type: "minor", count: 15, description: "格式不一致" },
  ]
};

export default function Dashboard() {
  const calculateWeightedScore = () => {
    return reportData.dimensions.reduce((total, dim) => {
      return total + (dim.score * dim.weight / 100);
    }, 0);
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-primary rounded-full text-primary-foreground text-sm font-medium">
            <Target className="h-4 w-4" />
            <span>文档质量综合评分</span>
          </div>
        </div>

        {/* Overall Score Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ScoreGauge 
              score={reportData.overallScore} 
              title="综合得分" 
              size="lg"
              className="h-full"
            />
          </div>
          
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>维度分析</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reportData.dimensions.map((dimension) => {
                const Icon = dimension.icon;
                return (
                  <Card key={dimension.key} className="shadow-soft hover:shadow-medium transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between text-sm">
                        <span className="flex items-center space-x-2">
                          <Icon className={`h-4 w-4 text-${dimension.color}`} />
                          <span>{dimension.name}</span>
                        </span>
                        <Badge variant="outline" className="text-xs">
                          权重 {dimension.weight}%
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-foreground">
                          {dimension.score.toFixed(1)}
                        </span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/${dimension.key}`}>
                            <span className="text-xs">详情</span>
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      <Progress value={dimension.score} className="h-2" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>关键指标概览</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {reportData.keyMetrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                maxValue={metric.maxValue}
                unit={metric.unit}
                status={metric.status}
                description={metric.description}
                showProgress={metric.maxValue !== undefined}
              />
            ))}
          </div>
        </div>

        {/* Issues Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span>问题概览</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reportData.issues.map((issue, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant={issue.type === "critical" ? "destructive" : issue.type === "major" ? "secondary" : "outline"}
                      className="min-w-fit"
                    >
                      {issue.type === "critical" ? "严重" : issue.type === "major" ? "重要" : "轻微"}
                    </Badge>
                    <span className="text-sm text-foreground">{issue.description}</span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {issue.count} 项
                  </span>
                </div>
              ))}
              
              <Button className="w-full" variant="outline" asChild>
                <Link to="/recommendations">
                  查看改进建议
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>优势亮点</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-success/5 border border-success/20">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm text-foreground">签名一致性达到95%，技术准确性优秀</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-success/5 border border-success/20">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm text-foreground">可读性评分11级，文档易于理解</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-success/5 border border-success/20">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm text-foreground">导航结构合理，用户体验良好</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}