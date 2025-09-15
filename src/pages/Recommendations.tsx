import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Target, 
  Zap, 
  Calendar, 
  Users, 
  TrendingUp,
  Flag,
  Clock,
  ArrowRight,
  Star
} from "lucide-react";

// Mock data for recommendations
const recommendationsData = {
  priorityMatrix: [
    {
      id: 1,
      title: "修复API端点文档不匹配",
      description: "更新/api/v1/users/{id}等端点的返回类型文档，确保与实际实现一致",
      dimension: "准确性",
      priority: "P0",
      impact: "高",
      effort: "中",
      estimatedDays: 3,
      scoreImprovement: 8.5,
      assignee: "技术写作团队",
      status: "待办",
      quickWin: false
    },
    {
      id: 2,
      title: "补充未文档化的API端点",
      description: "为POST /api/v1/projects/{id}/archive等39个缺失的端点创建文档",
      dimension: "覆盖率",
      priority: "P0", 
      impact: "高",
      effort: "高",
      estimatedDays: 10,
      scoreImprovement: 12.3,
      assignee: "开发团队 + 技术写作",
      status: "待办",
      quickWin: false
    },
    {
      id: 3,
      title: "添加快速入门指南",
      description: "创建新用户友好的快速入门指南，包含安装到第一个API调用",
      dimension: "结构",
      priority: "P1",
      impact: "高",
      effort: "中",
      estimatedDays: 5,
      scoreImprovement: 15.2,
      assignee: "产品团队",
      status: "待办",
      quickWin: false
    },
    {
      id: 4,
      title: "修复失效链接",
      description: "更新目录中失效的内部链接和锚点引用",
      dimension: "准确性",
      priority: "P1",
      impact: "中",
      effort: "低",
      estimatedDays: 1,
      scoreImprovement: 3.2,
      assignee: "技术写作团队",
      status: "待办",
      quickWin: true
    },
    {
      id: 5,
      title: "简化复杂句式",
      description: "重写平均长度超过25词的复杂句子，提高可读性",
      dimension: "可读性",
      priority: "P1",
      impact: "中",
      effort: "中",
      estimatedDays: 4,
      scoreImprovement: 6.8,
      assignee: "技术写作团队",
      status: "进行中",
      quickWin: false
    },
    {
      id: 6,
      title: "定义技术术语",
      description: "为JWT、OAuth等术语添加首次使用时的定义",
      dimension: "可读性",
      priority: "P2",
      impact: "中",
      effort: "低",
      estimatedDays: 2,
      scoreImprovement: 4.5,
      assignee: "技术写作团队",
      status: "待办",
      quickWin: true
    }
  ],
  impactSummary: {
    totalPotentialImprovement: 50.5,
    quickWinImpacts: 7.7,
    priorityBreakdown: [
      { priority: "P0", count: 2, impact: 20.8 },
      { priority: "P1", count: 3, impact: 25.2 },
      { priority: "P2", count: 1, impact: 4.5 }
    ]
  },
  timeline: [
    { phase: "第1周", tasks: ["修复失效链接", "定义技术术语"], impact: 7.7, type: "quick-wins" },
    { phase: "第2-3周", tasks: ["修复API文档不匹配", "简化复杂句式"], impact: 15.3, type: "medium" },
    { phase: "第4-5周", tasks: ["添加快速入门指南"], impact: 15.2, type: "high-impact" },
    { phase: "第6-8周", tasks: ["补充API端点文档"], impact: 12.3, type: "high-impact" }
  ]
};

export default function Recommendations() {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "P0":
        return { color: "text-critical", bgColor: "bg-critical/10", variant: "destructive" as const, label: "立即执行" };
      case "P1":
        return { color: "text-warning", bgColor: "bg-warning/10", variant: "secondary" as const, label: "尽快执行" };
      case "P2":
        return { color: "text-info", bgColor: "bg-info/10", variant: "outline" as const, label: "后续考虑" };
      default:
        return { color: "text-muted-foreground", bgColor: "bg-muted/10", variant: "outline" as const, label: "未分类" };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "待办":
        return { color: "text-muted-foreground", variant: "outline" as const };
      case "进行中":
        return { color: "text-warning", variant: "secondary" as const };
      case "已完成":
        return { color: "text-success", variant: "default" as const };
      default:
        return { color: "text-muted-foreground", variant: "outline" as const };
    }
  };

  const getDimensionColor = (dimension: string) => {
    switch (dimension) {
      case "准确性": return "text-accuracy";
      case "覆盖率": return "text-coverage";
      case "可读性": return "text-readability";
      case "结构": return "text-structure";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground flex items-center justify-center space-x-3">
            <Target className="h-8 w-8 text-accent" />
            <span>改进建议与行动计划</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            基于文档质量评估结果，为您提供具体可执行的改进方案，并预估其对整体得分的提升效果
          </p>
        </div>

        {/* Impact Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent mb-1">
                +{recommendationsData.impactSummary.totalPotentialImprovement}
              </div>
              <div className="text-xs text-muted-foreground">
                预期总体提升分数
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success mb-1">
                +{recommendationsData.impactSummary.quickWinImpacts}
              </div>
              <div className="text-xs text-muted-foreground">
                快速赢得分数
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground mb-1">
                {recommendationsData.priorityMatrix.length}
              </div>
              <div className="text-xs text-muted-foreground">
                改进建议总数
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning mb-1">
                8
              </div>
              <div className="text-xs text-muted-foreground">
                预估完成周数
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Wins Section */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-success" />
              <span>快速获胜项目</span>
              <Badge variant="default" className="bg-success text-success-foreground">
                低投入·高回报
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendationsData.priorityMatrix
                .filter(item => item.quickWin)
                .map((item) => (
                  <div key={item.id} className="p-4 bg-success/5 border border-success/20 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <Star className="h-4 w-4 text-success ml-2" />
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <span className="text-success font-medium">
                          +{item.scoreImprovement} 分
                        </span>
                        <span className="text-muted-foreground">
                          {item.estimatedDays} 天
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.assignee}
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* All Recommendations */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Flag className="h-5 w-5 text-primary" />
              <span>完整改进计划</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendationsData.priorityMatrix.map((item) => {
                const priorityConfig = getPriorityConfig(item.priority);
                const statusConfig = getStatusConfig(item.status);
                
                return (
                  <div 
                    key={item.id} 
                    className="border border-border rounded-lg p-4 hover:shadow-soft transition-shadow"
                  >
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge variant={priorityConfig.variant} className="text-xs">
                              {priorityConfig.label}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <span className={getDimensionColor(item.dimension)}>
                                {item.dimension}
                              </span>
                            </Badge>
                            {item.quickWin && (
                              <Badge variant="default" className="text-xs bg-success text-success-foreground">
                                <Zap className="h-3 w-3 mr-1" />
                                快速赢
                              </Badge>
                            )}
                          </div>
                          
                          <h3 className="font-semibold text-foreground mb-1">
                            {item.title}
                          </h3>
                          
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        
                        <Badge variant={statusConfig.variant} className="ml-4">
                          {item.status}
                        </Badge>
                      </div>
                      
                      {/* Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">预期提升</div>
                          <div className="font-medium text-success">
                            +{item.scoreImprovement} 分
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">影响程度</div>
                          <div className="font-medium text-foreground">
                            {item.impact}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">工作量</div>
                          <div className="font-medium text-foreground">
                            {item.effort}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">预估时间</div>
                          <div className="font-medium text-foreground flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{item.estimatedDays} 天</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">负责团队</div>
                          <div className="font-medium text-foreground flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span className="text-xs">{item.assignee}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Implementation Timeline */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>实施时间线</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recommendationsData.timeline.map((phase, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-20 text-sm font-medium text-muted-foreground">
                      {phase.phase}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">
                          {phase.type === "quick-wins" ? "快速获胜项目" :
                           phase.type === "medium" ? "中等影响项目" : "高影响项目"}
                        </h4>
                        <span className="text-sm font-medium text-success">
                          +{phase.impact} 分
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        {phase.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {index < recommendationsData.timeline.length - 1 && (
                    <div className="absolute left-10 top-8 w-px h-8 bg-border" />
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-gradient-primary rounded-lg text-primary-foreground">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span className="font-medium">
                  预期结果: 8周后文档质量得分提升至 132.8 分 (+61%)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}