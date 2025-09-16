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
      name: "Clarity Score",
      key: "clarity_score",
      score: 11.2,
      target: 12,
      unit: "grade",
      status: "success" as const,
      description: "Flesch-Kincaid grade level readability assessment",
      icon: BookOpen,
      trend: "stable" as const
    },
    {
      name: "Active Voice Ratio",
      key: "active_voice",
      score: 78.5,
      target: 80,
      unit: "%",
      status: "warning" as const,
      description: "Ratio of active to passive voice usage",
      icon: Volume2,
      trend: "up" as const
    },
    {
      name: "Acronym Definition Coverage",
      key: "acronym_definition",
      score: 94.7,
      target: 95,
      unit: "%",
      status: "success" as const,
      description: "Percentage of acronyms and terms defined on first use",
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
      type: "Complex Sentences",
      title: "Overly long sentences affecting comprehension",
      description: "Installation guide contains complex sentences with average length exceeding 25 words",
      file: "docs/installation.md",
      line: 34,
      severity: "minor",
      suggestion: "Break into multiple simple sentences, use bullet points"
    },
    {
      id: 2,
      type: "Passive Voice",
      title: "Excessive passive voice usage",
      description: "API reference documentation has high passive voice usage ratio",
      file: "docs/api-reference.md",
      line: 67,
      severity: "minor",
      suggestion: "Use active voice, e.g. 'Call this method' instead of 'This method is called'"
    },
    {
      id: 3,
      type: "Term Definition",
      title: "Missing term explanations",
      description: "Terms like JWT, OAuth not defined on first use",
      file: "docs/authentication.md",
      line: 12,
      severity: "major",
      suggestion: "Add brief definitions when terms first appear"
    }
  ],
  improvements: [
    {
      area: "Sentence Structure",
      current: "Average 18.3 words per sentence",
      target: "Average ≤ 15 words per sentence",
      impact: "15% faster comprehension"
    },
    {
      area: "Active Voice",
      current: "78.5% active voice",
      target: "85% active voice",
      impact: "20% better guidance"
    },
    {
      area: "Term Explanation",
      current: "94.7% terms defined",
      target: "100% terms defined",
      impact: "Lower learning barrier"
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
              <span>Readability Assessment</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Documentation readability and user comprehension difficulty analysis
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-readability">
              {readabilityData.overallScore.toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">
              Weight {readabilityData.weight}%
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
                <span>Readability Trend</span>
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
                        {point.score.toFixed(1)} grade
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
                  <span className="text-sm font-medium">Maintaining target range</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Flesch-Kincaid grade ≤12, suitable for technical documentation
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-info" />
                <span>Improvement Opportunities</span>
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
                      <span className="text-muted-foreground">Current:</span>
                      <span className="text-foreground">{improvement.current}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Target:</span>
                      <span className="text-foreground">{improvement.target}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expected Impact:</span>
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
                <span>Readability Issues</span>
                <Badge variant="outline">
                  {readabilityData.issues.length} items
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
                          {issue.severity === "major" ? "Major" : "Minor"}
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
                        <span>📍 Line {issue.line}</span>
                      </div>
                      
                      <div className="bg-info/5 rounded-md p-3 border-l-4 border-info">
                        <p className="text-xs text-foreground">
                          <strong>Improvement Suggestion:</strong> {issue.suggestion}
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
                  View Improvement Recommendations
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