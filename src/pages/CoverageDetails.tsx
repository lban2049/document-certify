import { Layout } from "@/components/Layout";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  GitBranch, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  ArrowRight,
  PieChart
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for coverage metrics
const coverageData = {
  overallScore: 79.2,
  weight: 35,
  metrics: [
    {
      name: "API端点覆盖率",
      key: "api_endpoint_coverage",
      score: 73.5,
      total: 147,
      documented: 108,
      status: "warning" as const,
      description: "已文档化的公开API端点比例",
      icon: FileText,
    },
    {
      name: "参数和返回值覆盖率",
      key: "parameter_coverage",
      score: 84.2,
      total: 423,
      documented: 356,
      status: "success" as const,
      description: "函数参数和返回值的文档描述完整度",
      icon: Search,
    },
    {
      name: "变更检测覆盖率",
      key: "change_detection",
      score: 81.7,
      total: 23,
      documented: 19,
      status: "success" as const,
      description: "最新代码变更在文档中的反映程度",
      icon: GitBranch,
    }
  ],
  uncoveredItems: [
    {
      id: 1,
      type: "API端点",
      name: "POST /api/v1/projects/{id}/archive",
      description: "归档项目的API端点",
      severity: "major",
      file: "src/routes/projects.ts",
      addedDate: "2024-01-15"
    },
    {
      id: 2,
      type: "API端点",
      name: "GET /api/v1/analytics/reports",
      description: "获取分析报告的API端点",
      severity: "major", 
      file: "src/routes/analytics.ts",
      addedDate: "2024-01-12"
    },
    {
      id: 3,
      type: "参数",
      name: "searchFilters.dateRange",
      description: "搜索过滤器中的日期范围参数",
      severity: "minor",
      file: "src/types/search.ts",
      addedDate: "2024-01-10"
    },
    {
      id: 4,
      type: "返回值",
      name: "UserProfile.preferences",
      description: "用户配置文件返回对象的偏好设置字段",
      severity: "minor",
      file: "src/types/user.ts", 
      addedDate: "2024-01-08"
    }
  ],
  categoryBreakdown: [
    { name: "已文档化", value: 73.5, color: "success" },
    { name: "部分文档化", value: 15.2, color: "warning" },
    { name: "未文档化", value: 11.3, color: "critical" }
  ]
};

export default function CoverageDetails() {
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case "critical":
        return { color: "text-critical", bgColor: "bg-critical/10", variant: "destructive" as const };
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
              <FileText className="h-8 w-8 text-coverage" />
              <span>覆盖率评估</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              文档对公开组件的覆盖程度分析
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-coverage">
              {coverageData.overallScore.toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">
              权重 {coverageData.weight}%
            </div>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coverageData.metrics.map((metric) => {
            const Icon = metric.icon;
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
                    <Badge variant={metric.status === "success" ? "default" : "secondary"}>
                      {metric.status === "success" ? "良好" : "需改进"}
                    </Badge>
                  </div>
                  
                  <Progress value={metric.score} className="h-2" />
                  
                  <div className="text-xs text-muted-foreground">
                    已文档化: {metric.documented} / {metric.total}
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Coverage Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5 text-coverage" />
                <span>覆盖率分布</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {coverageData.categoryBreakdown.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {category.name}
                    </span>
                    <span className="text-sm font-bold text-foreground">
                      {category.value.toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={category.value} 
                    className="h-2"
                  />
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>说明:</strong> "部分文档化"指有基础文档但缺少详细描述的项目；
                  "未文档化"指完全缺少文档的公开API或组件。
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span>优先处理项目</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {coverageData.uncoveredItems.slice(0, 3).map((item) => {
                const config = getSeverityConfig(item.severity);
                return (
                  <div key={item.id} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={config.variant} className="text-xs">
                        {item.severity === "major" ? "重要" : "轻微"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {item.addedDate}
                      </span>
                    </div>
                    <h4 className="font-medium text-sm text-foreground mb-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                );
              })}
              
              <Button variant="outline" className="w-full text-xs" size="sm">
                查看全部 {coverageData.uncoveredItems.length} 项
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Uncovered Items Table */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <XCircle className="h-5 w-5 text-critical" />
                <span>未覆盖项目列表</span>
                <Badge variant="outline">
                  {coverageData.uncoveredItems.length} 项
                </Badge>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coverageData.uncoveredItems.map((item) => {
                const config = getSeverityConfig(item.severity);
                
                return (
                  <div 
                    key={item.id}
                    className="border border-border rounded-lg p-4 hover:shadow-soft transition-shadow"
                  >
                    <div className="flex items-start justify-between space-x-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-3">
                          <Badge variant={config.variant} className="text-xs">
                            {item.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.severity === "major" ? "重要" : "轻微"}
                          </Badge>
                          <h3 className="font-medium text-foreground">
                            {item.name}
                          </h3>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>📁 {item.file}</span>
                          <span>📅 添加于 {item.addedDate}</span>
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