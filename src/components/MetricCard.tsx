import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: number | string;
  maxValue?: number;
  unit?: string;
  trend?: "up" | "down" | "stable";
  status?: "success" | "warning" | "critical" | "info";
  description?: string;
  icon?: ReactNode;
  showProgress?: boolean;
  className?: string;
}

const statusConfig = {
  success: { 
    color: "text-success", 
    bgColor: "bg-success/10", 
    icon: CheckCircle,
    badgeVariant: "default" as const
  },
  warning: { 
    color: "text-warning", 
    bgColor: "bg-warning/10", 
    icon: AlertTriangle,
    badgeVariant: "secondary" as const
  },
  critical: { 
    color: "text-critical", 
    bgColor: "bg-critical/10", 
    icon: AlertTriangle,
    badgeVariant: "destructive" as const
  },
  info: { 
    color: "text-info", 
    bgColor: "bg-info/10", 
    icon: CheckCircle,
    badgeVariant: "outline" as const
  }
};

export function MetricCard({
  title,
  value,
  maxValue = 100,
  unit = "%",
  trend,
  status = "info",
  description,
  icon,
  showProgress = false,
  className
}: MetricCardProps) {
  const config = statusConfig[status];
  const StatusIcon = config.icon;
  const numericValue = typeof value === "number" ? value : parseFloat(value.toString());
  const percentage = showProgress ? (numericValue / maxValue) * 100 : numericValue;

  return (
    <Card className={cn("shadow-soft hover:shadow-medium transition-shadow", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm font-medium text-muted-foreground">
          <span className="flex items-center space-x-2">
            {icon}
            <span>{title}</span>
          </span>
          <StatusIcon className={cn("h-4 w-4", config.color)} />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-foreground">
                {typeof value === "number" ? value.toFixed(1) : value}
              </span>
              {unit && (
                <span className="text-sm font-medium text-muted-foreground">{unit}</span>
              )}
            </div>
            
            {trend && (
              <Badge variant={config.badgeVariant} className="flex items-center space-x-1">
                {trend === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : trend === "down" ? (
                  <TrendingDown className="h-3 w-3" />
                ) : null}
                <span className="text-xs">
                  {trend === "up" ? "改善" : trend === "down" ? "下降" : "稳定"}
                </span>
              </Badge>
            )}
          </div>

          {showProgress && (
            <div className="space-y-1">
              <Progress 
                value={percentage} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {numericValue} / {maxValue}
              </p>
            </div>
          )}

          {description && (
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}