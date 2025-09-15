import { Layout } from "@/components/Layout";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Link as LinkIcon, 
  Code, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  FileText,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for accuracy metrics
const accuracyData = {
  overallScore: 88.5,
  weight: 35,
  metrics: [
    {
      name: "签名一致性",
      key: "signature_parity",
      score: 95.2,
      target: 98,
      status: "success" as const,
      description: "函数签名与源代码匹配度",
      icon: Code,
    },
    {
      name: "链接有效性",
      key: "link_validity", 
      score: 87.3,
      target: 95,
      status: "warning" as const,
      description: "内部链接和交叉引用的有效性",
      icon: LinkIcon,
    },
    {
      name: "代码示例完整性",
      key: "code_sample_integrity",
      score: 83.1,
      target: 90,
      status: "warning" as const,
      description: "代码示例语法正确性和语言标记",
      icon: FileText,
    }
  ],
  issues: [
    {
      id: 1,
      severity: "critical",
      title: "API端点文档不匹配",
      description: "/api/v1/users/{id} 端点的返回类型与实际实现不符",
      file: "docs/api/users.md",
      line: 45,
      suggestedAction: "更新文档以匹配当前API响应结构"
    },
    {
      id: 2,
      severity: "major",
      title: "代码示例语法错误",
      description: "JavaScript代码示例中缺少分号和括号不匹配",
      file: "docs/quickstart.md",
      line: 23,
      suggestedAction: "修复代码示例的语法错误"
    },
    {
      id: 3,
      severity: "major",
      title: "链接失效",
      description: "指向旧版本API参考的链接已失效",
      file: "docs/installation.md",
      line: 12,
      suggestedAction: "更新链接指向最新版本的API文档"
    },
    {
      id: 4,
      severity: "minor",
      title: "函数参数类型不一致",
      description: "getUserById函数的参数类型文档与TypeScript定义不匹配",
      file: "docs/api/methods.md",
      line: 67,
      suggestedAction: "同步文档中的类型定义"
    }
  ]
};

export default function AccuracyDetails() {
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case "critical":
        return { color: "text-critical", bgColor: "bg-critical/10", variant: "destructive" as const, icon: XCircle };
      case "major":
        return { color: "text-warning", bgColor: "bg-warning/10", variant: "secondary" as const, icon: AlertTriangle };
      case "minor":
        return { color: "text-info", bgColor: "bg-info/10", variant: "outline" as const, icon: AlertTriangle };
      default:
        return { color: "text-muted-foreground", bgColor: "bg-muted/10", variant: "outline" as const, icon: AlertTriangle };
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
              <Shield className="h-8 w-8 text-accuracy" />
              <span>准确性评估</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              文档技术内容的正确性和一致性分析
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-accuracy">
              {accuracyData.overallScore.toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">
              权重 {accuracyData.weight}%
            </div>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {accuracyData.metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <MetricCard
                key={metric.key}
                title={metric.name}
                value={metric.score}
                status={metric.status}
                description={metric.description}
                icon={<Icon className="h-4 w-4" />}
                showProgress
                maxValue={metric.target}
              />
            );
          })}
        </div>

        {/* Issues Detail Table */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span>发现的问题</span>
                <Badge variant="outline">
                  {accuracyData.issues.length} 项
                </Badge>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accuracyData.issues.map((issue) => {
                const config = getSeverityConfig(issue.severity);
                const Icon = config.icon;
                
                return (
                  <div 
                    key={issue.id}
                    className="border border-border rounded-lg p-4 hover:shadow-soft transition-shadow"
                  >
                    <div className="flex items-start justify-between space-x-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-3">
                          <Icon className={`h-4 w-4 ${config.color}`} />
                          <Badge variant={config.variant} className="text-xs">
                            {issue.severity === "critical" ? "严重" : 
                             issue.severity === "major" ? "重要" : "轻微"}
                          </Badge>
                          <h3 className="font-medium text-foreground">
                            {issue.title}
                          </h3>
                        </div>
                        
                        <p className="text-sm text-muted-foreground pl-7">
                          {issue.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground pl-7">
                          <span>📁 {issue.file}</span>
                          <span>📍 第 {issue.line} 行</span>
                        </div>
                        
                        <div className="pl-7">
                          <div className="bg-muted/30 rounded-md p-3 border-l-4 border-info">
                            <p className="text-xs text-foreground">
                              <strong>建议操作:</strong> {issue.suggestedAction}
                            </p>
                          </div>
                        </div>
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