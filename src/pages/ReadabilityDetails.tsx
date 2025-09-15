import { Layout } from "@/components/Layout";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Eye, 
  Volume2, 
  Type,
  CheckCircle, 
  AlertTriangle,
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for readability metrics
const readabilityData = {
  overallScore: 91.8,
  weight: 15,
  metrics: [
    {
      name: "清晰度评分",
      key: "clarity_score",
      score: 11.2,
      target: 12,
      unit: "级",
      status: "success" as const,
      description: "基于Flesch-Kincaid的可读性等级评估",
      icon: BookOpen,
      trend: "stable" as const
    },
    {
      name: "主动语态比例",
      key: "active_voice",
      score: 78.5,
      target: 80,
      unit: "%",
      status: "warning" as const,
      description: "主动语态与被动语态的使用比例",
      icon: Volume2,
      trend: "up" as const
    },
    {
      name: "术语定义覆盖率",
      key: "acronym_definition",
      score: 94.7,
      target: 95,
      unit: "%",
      status: "success" as const,
      description: "首次使用时定义的缩略词和术语比例",
      icon: Type,
      trend: "up" as const
    }
  ],
  readabilityTrend: [
    { month: "2023-09", score: 10.8 },
    { month: "2023-10", score: 11.1 },
    { month: "2023-11", score: 10.9 },
    { month: "2023-12", score: 11.3 },
    { month: "2024-01", score: 11.2 }
  ],
  issues: [
    {
      id: 1,
      type: "复杂句式",
      title: "句子过长影响理解",
      description: "安装指南中包含平均长度超过25个单词的复杂句子",
      file: "docs/installation.md",
      line: 34,
      severity: "minor",
      suggestion: "拆分为多个简单句子，使用项目列表"
    },
    {
      id: 2,
      type: "被动语态",
      title: "过多使用被动语态",
      description: "API参考文档中被动语态使用比例偏高",
      file: "docs/api-reference.md",
      line: 67,
      severity: "minor",
      suggestion: "改用主动语态，如'调用该方法'而非'该方法被调用'"
    },
    {
      id: 3,
      type: "术语定义",
      title: "缺少术语解释",
      description: "JWT、OAuth等术语首次使用时未提供定义",
      file: "docs/authentication.md",
      line: 12,
      severity: "major",
      suggestion: "在术语首次出现时添加简明定义"
    }
  ],
  improvements: [
    {
      area: "句式结构",
      current: "平均句长 18.3 词",
      target: "平均句长 ≤ 15 词",
      impact: "提升理解速度 15%"
    },
    {
      area: "主动语态",
      current: "78.5% 主动语态",
      target: "85% 主动语态",
      impact: "增强指导性 20%"
    },
    {
      area: "术语解释",
      current: "94.7% 术语已定义",
      target: "100% 术语已定义",
      impact: "降低学习门槛"
    }
  ]
};

export default function ReadabilityDetails() {
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case "major":
        return { color: "text-warning", bgColor: "bg-warning/10", variant: "secondary" as const };
      case "minor":
        return { color: "text-info", bgColor: "bg-info/10", variant: "outline" as const };
      default:
        return { color: "text-muted-foreground", bgColor: "bg-muted/10", variant: "outline" as const };
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-readability" />
              <span>可读性评估</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              文档易读性和用户理解难度分析
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-readability">
              {readabilityData.overallScore.toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">
              权重 {readabilityData.weight}%
            </div>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {readabilityData.metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <MetricCard
                key={metric.key}
                title={metric.name}
                value={metric.score}
                maxValue={metric.target}
                unit={metric.unit}
                status={metric.status}
                trend={metric.trend}
                description={metric.description}
                icon={<Icon className="h-4 w-4" />}
                showProgress={metric.unit === "%"}
              />
            );
          })}
        </div>

        {/* Readability Trend and Improvements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-readability" />
                <span>可读性趋势</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {readabilityData.readabilityTrend.map((point, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded">
                    <span className="text-sm text-muted-foreground">
                      {point.month}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground">
                        {point.score.toFixed(1)} 级
                      </span>
                      <div className="w-20">
                        <Progress value={(point.score / 12) * 100} className="h-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-border">
                <div className="flex items-center space-x-2 text-success">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">保持在目标范围内</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Flesch-Kincaid等级≤12，适合技术文档阅读
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-info" />
                <span>改进机会</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {readabilityData.improvements.map((improvement, index) => (
                <div key={index} className="space-y-2 p-3 bg-muted/20 rounded-lg">
                  <h4 className="font-medium text-sm text-foreground">
                    {improvement.area}
                  </h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">当前:</span>
                      <span className="text-foreground">{improvement.current}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">目标:</span>
                      <span className="text-foreground">{improvement.target}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">预期影响:</span>
                      <span className="text-success font-medium">{improvement.impact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Issues Detail */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span>可读性问题</span>
                <Badge variant="outline">
                  {readabilityData.issues.length} 项
                </Badge>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {readabilityData.issues.map((issue) => {
                const config = getSeverityConfig(issue.severity);
                
                return (
                  <div 
                    key={issue.id}
                    className="border border-border rounded-lg p-4 hover:shadow-soft transition-shadow"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Badge variant={config.variant} className="text-xs">
                          {issue.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {issue.severity === "major" ? "重要" : "轻微"}
                        </Badge>
                        <h3 className="font-medium text-foreground">
                          {issue.title}
                        </h3>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {issue.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>📁 {issue.file}</span>
                        <span>📍 第 {issue.line} 行</span>
                      </div>
                      
                      <div className="bg-info/5 rounded-md p-3 border-l-4 border-info">
                        <p className="text-xs text-foreground">
                          <strong>改进建议:</strong> {issue.suggestion}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <Button asChild>
                <Link to="/recommendations">
                  查看改进建议
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}