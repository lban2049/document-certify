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
      name: "Signature Parity",
      key: "signature_parity",
      score: 95.2,
      target: 98,
      status: "success" as const,
      description: "Function signatures in docs match source code",
      icon: Code,
    },
    {
      name: "Link Validity",
      key: "link_validity", 
      score: 87.3,
      target: 95,
      status: "warning" as const,
      description: "Validity of internal links and cross-references",
      icon: LinkIcon,
    },
    {
      name: "Code Sample Integrity",
      key: "code_sample_integrity",
      score: 83.1,
      target: 90,
      status: "warning" as const,
      description: "Code example syntax correctness and language tagging",
      icon: FileText,
    }
  ],
  issues: [
    {
      id: 1,
      severity: "critical",
      title: "API endpoint documentation mismatch",
      description: "/api/v1/users/{id} endpoint return type doesn't match actual implementation",
      file: "docs/api/users.md",
      line: 45,
      suggestedAction: "Update documentation to match current API response structure"
    },
    {
      id: 2,
      severity: "major",
      title: "Code example syntax errors",
      description: "JavaScript code examples have missing semicolons and unmatched brackets",
      file: "docs/quickstart.md",
      line: 23,
      suggestedAction: "Fix syntax errors in code examples"
    },
    {
      id: 3,
      severity: "major",
      title: "Broken links",
      description: "Links pointing to old version API reference are broken",
      file: "docs/installation.md",
      line: 12,
      suggestedAction: "Update links to point to latest API documentation version"
    },
    {
      id: 4,
      severity: "minor",
      title: "Function parameter type inconsistency",
      description: "getUserById function parameter type documentation doesn't match TypeScript definition",
      file: "docs/api/methods.md",
      line: 67,
      suggestedAction: "Sync type definitions in documentation"
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
              <span>Accuracy Assessment</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Technical content correctness and consistency analysis
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-accuracy">
              {accuracyData.overallScore.toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">
              Weight {accuracyData.weight}%
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
                <span>Identified Issues</span>
                <Badge variant="outline">
                  {accuracyData.issues.length} items
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
                            {issue.severity === "critical" ? "Critical" : 
                             issue.severity === "major" ? "Major" : "Minor"}
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
                          <span>📍 Line {issue.line}</span>
                        </div>
                        
                        <div className="pl-7">
                          <div className="bg-muted/30 rounded-md p-3 border-l-4 border-info">
                            <p className="text-xs text-foreground">
                              <strong>Suggested Action:</strong> {issue.suggestedAction}
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