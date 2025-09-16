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
    <Card className={cn("glass-card hover-lift border-0 relative overflow-hidden group", className)}>
      {/* Status Color Indicator */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1 transition-all duration-300",
        status === "success" && "bg-gradient-to-r from-success to-success/80",
        status === "warning" && "bg-gradient-to-r from-warning to-warning/80",
        status === "critical" && "bg-gradient-to-r from-critical to-critical/80",
        status === "info" && "bg-gradient-to-r from-info to-info/80"
      )} />
      
      {/* Animated Background */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500",
        status === "success" && "bg-gradient-to-br from-success to-success/50",
        status === "warning" && "bg-gradient-to-br from-warning to-warning/50",
        status === "critical" && "bg-gradient-to-br from-critical to-critical/50",
        status === "info" && "bg-gradient-to-br from-info to-info/50"
      )} />
      
      <CardHeader className="pb-4 relative z-10">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center space-x-3 text-sm font-medium text-muted-foreground">
            {icon && <div className="text-primary">{icon}</div>}
            <span>{title}</span>
          </span>
          <div className={cn(
            "p-2 rounded-xl transition-all duration-300 group-hover:scale-110",
            config.bgColor
          )}>
            <StatusIcon className={cn("h-4 w-4", config.color)} />
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold gradient-text">
                {typeof value === "number" ? value.toFixed(1) : value}
              </span>
              {unit && (
                <span className="text-sm font-medium text-muted-foreground">{unit}</span>
              )}
            </div>
            
            {trend && (
              <Badge variant={config.badgeVariant} className="flex items-center space-x-1 shadow-soft">
                {trend === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : trend === "down" ? (
                  <TrendingDown className="h-3 w-3" />
                ) : null}
                <span className="text-xs font-medium">
                  {trend === "up" ? "Improving" : trend === "down" ? "Declining" : "Stable"}
                </span>
              </Badge>
            )}
          </div>

          {showProgress && (
            <div className="space-y-2">
              <Progress 
                value={percentage} 
                className="h-3 bg-muted/30"
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground font-medium">
                  {numericValue} / {maxValue}
                </p>
                <p className="text-xs font-semibold text-primary">
                  {percentage.toFixed(1)}%
                </p>
              </div>
            </div>
          )}

          {description && (
            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      
      {/* Decorative Element */}
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-primary opacity-5 rounded-full blur-2xl"></div>
    </Card>
  );
}