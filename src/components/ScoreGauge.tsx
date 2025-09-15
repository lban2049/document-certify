import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ScoreGaugeProps {
  score: number;
  maxScore?: number;
  title: string;
  size?: "sm" | "md" | "lg";
  showDetails?: boolean;
  className?: string;
}

export function ScoreGauge({ 
  score, 
  maxScore = 100, 
  title, 
  size = "md", 
  showDetails = true,
  className 
}: ScoreGaugeProps) {
  const percentage = (score / maxScore) * 100;
  const radius = size === "lg" ? 80 : size === "md" ? 60 : 40;
  const strokeWidth = size === "lg" ? 12 : size === "md" ? 8 : 6;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-info";
    if (score >= 70) return "text-warning";
    return "text-critical";
  };

  const getScoreLevel = (score: number) => {
    if (score >= 90) return "优秀";
    if (score >= 80) return "良好";
    if (score >= 70) return "一般";
    if (score >= 60) return "需改进";
    return "较差";
  };

  return (
    <Card className={cn("shadow-soft", className)}>
      <CardHeader className="pb-3 text-center">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="relative">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              stroke="hsl(var(--muted))"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            {/* Progress circle */}
            <circle
              stroke="currentColor"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className={cn(
                "transition-all duration-1000 ease-in-out",
                getScoreColor(percentage)
              )}
            />
          </svg>
          
          {/* Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn(
              "font-bold",
              size === "lg" ? "text-3xl" : size === "md" ? "text-2xl" : "text-xl",
              getScoreColor(percentage)
            )}>
              {score.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">{maxScore}分</span>
          </div>
        </div>

        {showDetails && (
          <div className="text-center space-y-1">
            <div className={cn(
              "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
              percentage >= 90 && "bg-success/10 text-success",
              percentage >= 80 && percentage < 90 && "bg-info/10 text-info",
              percentage >= 70 && percentage < 80 && "bg-warning/10 text-warning",
              percentage < 70 && "bg-critical/10 text-critical"
            )}>
              {getScoreLevel(percentage)}
            </div>
            <p className="text-xs text-muted-foreground">
              {percentage.toFixed(1)}% 完成度
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}