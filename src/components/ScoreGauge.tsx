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
    <Card className={cn("glass-card hover-lift border-0 relative overflow-hidden", className)}>
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-primary opacity-5 blur-3xl"></div>
      
      <CardHeader className="pb-6 text-center relative z-10">
        <CardTitle className="text-lg font-semibold gradient-text">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex flex-col items-center space-y-6 relative z-10">
        <div className="relative">
          {/* Outer Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 blur-2xl scale-110"></div>
          
          <svg
            height={radius * 2}
            width={radius * 2}
            className="transform -rotate-90 relative z-10"
          >
            {/* Background circle with gradient */}
            <defs>
              <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--muted))" />
                <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="50%" stopColor="hsl(var(--readability))" />
                <stop offset="100%" stopColor="hsl(var(--success))" />
              </linearGradient>
            </defs>
            
            <circle
              stroke="url(#bgGradient)"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            
            {/* Progress circle with animated gradient */}
            <circle
              stroke="url(#scoreGradient)"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className="transition-all duration-2000 ease-out drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 0 20px hsla(var(--primary), 0.4))'
              }}
            />
          </svg>
          
          {/* Score text with enhanced styling */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn(
              "font-bold gradient-text",
              size === "lg" ? "text-4xl" : size === "md" ? "text-3xl" : "text-2xl"
            )}>
              {score.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground font-medium">/ {maxScore} 分</span>
          </div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gradient-primary rounded-full opacity-40 animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-gradient-success rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-gradient-secondary rounded-full opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
        </div>

        {showDetails && (
          <div className="text-center space-y-3 w-full">
            <div className={cn(
              "inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-soft border",
              percentage >= 90 && "bg-gradient-success text-white border-success/20",
              percentage >= 80 && percentage < 90 && "bg-gradient-primary text-white border-primary/20",
              percentage >= 70 && percentage < 80 && "bg-gradient-secondary text-white border-warning/20",
              percentage < 70 && "bg-gradient-to-r from-critical to-critical/80 text-white border-critical/20"
            )}>
              {getScoreLevel(percentage)}
            </div>
            
            <div className="glass-card p-3 space-y-2">
              <p className="text-sm font-medium text-foreground">
                完成度: {percentage.toFixed(1)}%
              </p>
              <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}