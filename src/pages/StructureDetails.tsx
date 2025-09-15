import { Layout } from "@/components/Layout";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Layers, 
  List, 
  MousePointer, 
  Navigation,
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  ArrowRight,
  FileText,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for structure metrics
const structureData = {
  overallScore: 74.1,
  weight: 15,
  metrics: [
    {
      name: "必需章节完整性",
      key: "section_presence",
      score: 85.7,
      present: 12,
      total: 14,
      status: "success" as const,
      description: "包含必需章节的文档完整度",
      icon: List,
    },
    {
      name: "导航可用性",
      key: "navigability",
      score: 91.2,
      working: 42,
      total: 46,
      status: "success" as const,
      description: "目录链接的有效性和准确性",
      icon: Navigation,
    },
    {
      name: "信息可达性",
      key: "information_scent",
      score: 45.5,
      reachable: 5,
      total: 11,
      status: "critical" as const,
      description: "关键页面从首页的可达性",
      icon: MousePointer,
    }
  ],
  missingSections: [
    {
      name: "快速入门指南",
      files: ["README.md", "docs/getting-started.md"],
      priority: "high",
      description: "缺少新用户快速上手的指导内容"
    },
    {
      name: "故障排除",
      files: ["docs/troubleshooting.md"],
      priority: "medium", 
      description: "缺少常见问题和解决方案的章节"
    }
  ],
  navigationIssues: [
    {
      id: 1,
      type: "链接失效",
      description: "目录中指向'高级配置'的链接无法正常跳转",
      file: "docs/README.md",
      line: 23,
      severity: "major"
    },
    {
      id: 2,
      type: "锚点错误",
      description: "API参考目录的锚点与实际标题不匹配",
      file: "docs/api/index.md", 
      line: 15,
      severity: "minor"
    }
  ],
  clickPaths: [
    {
      target: "快速入门",
      currentPath: "首页 → 文档 → 指南 → 快速入门",
      clicks: 4,
      maxClicks: 3,
      status: "warning"
    },
    {
      target: "API参考",
      currentPath: "首页 → API文档",
      clicks: 2,
      maxClicks: 3,
      status: "success"
    },
    {
      target: "示例代码",
      currentPath: "首页 → 文档 → 示例 → 代码库",
      clicks: 4,
      maxClicks: 3,
      status: "warning"
    }
  ],
  recommendations: [
    {
      title: "重组导航结构",
      description: "将快速入门提升至顶级导航，减少点击路径",
      impact: "高",
      effort: "中"
    },
    {
      title: "添加缺失章节",
      description: "补充故障排除和高级用法指南",
      impact: "中",
      effort: "高"
    },
    {
      title: "修复导航链接",
      description: "更新失效的目录链接和锚点",
      impact: "低",
      effort: "低"
    }
  ]
};

export default function StructureDetails() {
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

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "high":
        return { color: "text-critical", variant: "destructive" as const };
      case "medium":
        return { color: "text-warning", variant: "secondary" as const };
      case "low":
        return { color: "text-info", variant: "outline" as const };
      default:
        return { color: "text-muted-foreground", variant: "outline" as const };
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
              <Layers className="h-8 w-8 text-structure" />
              <span>结构评估</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              文档组织结构和导航体验分析
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-structure">
              {structureData.overallScore.toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">
              权重 {structureData.weight}%
            </div>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {structureData.metrics.map((metric) => {
            const Icon = metric.icon;
            const completedCount = metric.present || metric.working || metric.reachable || 0;
            const totalCount = metric.total;
            
            return (
              <Card key={metric.key} className="shadow-soft">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
                    <Icon className="h-4 w-4" />
                    <span>{metric.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">
                      {metric.score.toFixed(1)}%
                    </span>
                    <Badge variant={
                      metric.status === "success" ? "default" : "destructive"
                    }>
                      {metric.status === "success" ? "良好" : "严重"}
                    </Badge>
                  </div>
                  
                  <Progress value={metric.score} className="h-2" />
                  
                  <div className="text-xs text-muted-foreground">
                    完成: {completedCount} / {totalCount}
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Missing Sections and Click Paths */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-critical" />
                <span>缺失章节</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {structureData.missingSections.map((section, index) => {
                const config = getPriorityConfig(section.priority);
                return (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm text-foreground">
                        {section.name}
                      </h4>
                      <Badge variant={config.variant} className="text-xs">
                        {section.priority === "high" ? "高优先级" : 
                         section.priority === "medium" ? "中优先级" : "低优先级"}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2">
                      {section.description}
                    </p>
                    
                    <div className="text-xs text-muted-foreground">
                      建议文件: {section.files.join(", ")}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-warning" />
                <span>页面可达性</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {structureData.clickPaths.map((path, index) => (
                <div key={index} className="p-3 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm text-foreground">
                      {path.target}
                    </h4>
                    <Badge variant={path.status === "success" ? "default" : "secondary"} className="text-xs">
                      {path.clicks} 点击
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-1">
                    路径: {path.currentPath}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      要求: ≤ {path.maxClicks} 点击
                    </span>
                    {path.status === "warning" && (
                      <span className="text-warning font-medium">超出要求</span>
                    )}
                    {path.status === "success" && (
                      <span className="text-success font-medium">符合要求</span>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  <strong>目标:</strong> 关键页面应在3次点击内从首页到达
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Issues */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span>导航问题</span>
                <Badge variant="outline">
                  {structureData.navigationIssues.length} 项
                </Badge>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {structureData.navigationIssues.map((issue) => {
                const config = getSeverityConfig(issue.severity);
                
                return (
                  <div 
                    key={issue.id}
                    className="border border-border rounded-lg p-4 hover:shadow-soft transition-shadow"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Badge variant={config.variant} className="text-xs">
                          {issue.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {issue.severity === "major" ? "重要" : "轻微"}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-foreground font-medium">
                        {issue.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>📁 {issue.file}</span>
                        <span>📍 第 {issue.line} 行</span>
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

        {/* Quick Recommendations */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span>快速改进建议</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {structureData.recommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-medium text-sm text-foreground mb-2">
                    {rec.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    {rec.description}
                  </p>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      影响: <span className="font-medium text-foreground">{rec.impact}</span>
                    </span>
                    <span className="text-muted-foreground">
                      工作量: <span className="font-medium text-foreground">{rec.effort}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}