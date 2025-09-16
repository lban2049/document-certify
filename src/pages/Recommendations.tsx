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
      title: "Fix API endpoint documentation mismatch",
      description: "Update return type documentation for /api/v1/users/{id} and other endpoints to match actual implementation",
      dimension: "Accuracy",
      priority: "P0",
      impact: "High",
      effort: "Medium",
      estimatedDays: 3,
      scoreImprovement: 8.5,
      assignee: "Technical Writing Team",
      status: "To Do",
      quickWin: false
    },
    {
      id: 2,
      title: "Add documentation for missing API endpoints",
      description: "Create documentation for POST /api/v1/projects/{id}/archive and 39 other missing endpoints",
      dimension: "Coverage",
      priority: "P0", 
      impact: "High",
      effort: "High",
      estimatedDays: 10,
      scoreImprovement: 12.3,
      assignee: "Development Team + Technical Writing",
      status: "To Do",
      quickWin: false
    },
    {
      id: 3,
      title: "Add Quick Start Guide",
      description: "Create user-friendly quick start guide from installation to first API call",
      dimension: "Structure",
      priority: "P1",
      impact: "High",
      effort: "Medium",
      estimatedDays: 5,
      scoreImprovement: 15.2,
      assignee: "Product Team",
      status: "To Do",
      quickWin: false
    },
    {
      id: 4,
      title: "Fix broken links",
      description: "Update broken internal links and anchor references in table of contents",
      dimension: "Accuracy",
      priority: "P1",
      impact: "Medium",
      effort: "Low",
      estimatedDays: 1,
      scoreImprovement: 3.2,
      assignee: "Technical Writing Team",
      status: "To Do",
      quickWin: true
    },
    {
      id: 5,
      title: "Simplify complex sentences",
      description: "Rewrite complex sentences with average length exceeding 25 words to improve readability",
      dimension: "Readability",
      priority: "P1",
      impact: "Medium",
      effort: "Medium",
      estimatedDays: 4,
      scoreImprovement: 6.8,
      assignee: "Technical Writing Team",
      status: "In Progress",
      quickWin: false
    },
    {
      id: 6,
      title: "Define technical terms",
      description: "Add definitions for terms like JWT, OAuth when first used",
      dimension: "Readability",
      priority: "P2",
      impact: "Medium",
      effort: "Low",
      estimatedDays: 2,
      scoreImprovement: 4.5,
      assignee: "Technical Writing Team",
      status: "To Do",
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
    { phase: "Week 1", tasks: ["Fix broken links", "Define technical terms"], impact: 7.7, type: "quick-wins" },
    { phase: "Weeks 2-3", tasks: ["Fix API documentation mismatch", "Simplify complex sentences"], impact: 15.3, type: "medium" },
    { phase: "Weeks 4-5", tasks: ["Add Quick Start Guide"], impact: 15.2, type: "high-impact" },
    { phase: "Weeks 6-8", tasks: ["Add API endpoint documentation"], impact: 12.3, type: "high-impact" }
  ]
};

export default function Recommendations() {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "P0":
        return { color: "text-critical", bgColor: "bg-critical/10", variant: "destructive" as const, label: "Immediate" };
      case "P1":
        return { color: "text-warning", bgColor: "bg-warning/10", variant: "secondary" as const, label: "ASAP" };
      case "P2":
        return { color: "text-info", bgColor: "bg-info/10", variant: "outline" as const, label: "Later" };
      default:
        return { color: "text-muted-foreground", bgColor: "bg-muted/10", variant: "outline" as const, label: "Unclassified" };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "To Do":
        return { color: "text-muted-foreground", variant: "outline" as const };
      case "In Progress":
        return { color: "text-warning", variant: "secondary" as const };
      case "Completed":
        return { color: "text-success", variant: "default" as const };
      default:
        return { color: "text-muted-foreground", variant: "outline" as const };
    }
  };

  const getDimensionColor = (dimension: string) => {
    switch (dimension) {
      case "Accuracy": return "text-accuracy";
      case "Coverage": return "text-coverage";
      case "Readability": return "text-readability";
      case "Structure": return "text-structure";
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
            <span>Improvement Recommendations & Action Plan</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Based on documentation quality assessment results, providing specific actionable improvement solutions with estimated impact on overall scores
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
                Expected Total Score Improvement
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success mb-1">
                +{recommendationsData.impactSummary.quickWinImpacts}
              </div>
              <div className="text-xs text-muted-foreground">
                Quick Win Score
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground mb-1">
                {recommendationsData.priorityMatrix.length}
              </div>
              <div className="text-xs text-muted-foreground">
                Total Recommendations
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning mb-1">
                8
              </div>
              <div className="text-xs text-muted-foreground">
                Estimated Completion Weeks
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Wins Section */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-success" />
              <span>Quick Win Projects</span>
              <Badge variant="default" className="bg-success text-success-foreground">
                Low Investment · High Return
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
                          +{item.scoreImprovement} points
                        </span>
                        <span className="text-muted-foreground">
                          {item.estimatedDays} days
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
              <span>Complete Improvement Plan</span>
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
                                Quick Win
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
                          <div className="text-xs text-muted-foreground mb-1">Expected Improvement</div>
                          <div className="font-medium text-success">
                            +{item.scoreImprovement} points
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Impact Level</div>
                          <div className="font-medium text-foreground">
                            {item.impact}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Effort Level</div>
                          <div className="font-medium text-foreground">
                            {item.effort}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Estimated Time</div>
                          <div className="font-medium text-foreground flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{item.estimatedDays} days</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Responsible Team</div>
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
              <span>Implementation Timeline</span>
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
                          {phase.type === "quick-wins" ? "Quick Win Projects" :
                           phase.type === "medium" ? "Medium Impact Projects" : "High Impact Projects"}
                        </h4>
                        <span className="text-sm font-medium text-success">
                          +{phase.impact} points
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
                  Expected Result: 8 weeks later, documentation quality score improved to 132.8 points (+61%)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}