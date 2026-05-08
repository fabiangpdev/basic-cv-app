'use client';

import { useResumeStore } from '@/store/resumeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Info, XCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AnalysisResult() {
  const { analysisResult, isAnalyzing } = useResumeStore();

  if (!analysisResult) return null;

  const { score, suggestions, keywords, atsFriendly, issues } = analysisResult;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Score Principal */}
      <Card className="border-subtle/50 bg-card/60">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", getScoreBg(score))}>
                <span className="text-lg font-bold text-white">{score}</span>
              </div>
              <div>
                <p className="text-[13px] font-medium">Score ATS</p>
                <p className={cn("text-[11px]", atsFriendly ? 'text-emerald-500' : 'text-amber-500')}>
                  {atsFriendly ? '✓ Compatible con ATS' : '⚠ Requiere mejoras'}
                </p>
              </div>
            </div>
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
        </CardContent>
      </Card>

      {/* Issues */}
      {issues.length > 0 && (
        <Card className="border-subtle/50 bg-card/60">
          <CardHeader className="py-3 px-4 border-b border-subtle/30">
            <CardTitle className="text-[12px] font-medium">Problemas encontrados</CardTitle>
          </CardHeader>
          <CardContent className="p-3 space-y-2">
            {issues.map((issue, idx) => (
              <div 
                key={idx}
                className={cn(
                  "flex items-start gap-2 p-2 rounded-md text-[11px]",
                  issue.type === 'critical' && "bg-red-500/10 text-red-400",
                  issue.type === 'warning' && "bg-amber-500/10 text-amber-400",
                  issue.type === 'info' && "bg-blue-500/10 text-blue-400"
                )}
              >
                {issue.type === 'critical' && <XCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />}
                {issue.type === 'warning' && <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />}
                {issue.type === 'info' && <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />}
                <span>{issue.message}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Card className="border-subtle/50 bg-card/60">
          <CardHeader className="py-3 px-4 border-b border-subtle/30">
            <CardTitle className="text-[12px] font-medium">Sugerencias</CardTitle>
          </CardHeader>
          <CardContent className="p-3 space-y-2">
            {suggestions.map((suggestion, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[11px] text-foreground/70">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{suggestion}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Keywords */}
      {keywords.length > 0 && (
        <Card className="border-subtle/50 bg-card/60">
          <CardHeader className="py-3 px-4 border-b border-subtle/30">
            <CardTitle className="text-[12px] font-medium">Palabras clave detectadas</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="flex flex-wrap gap-1.5">
              {keywords.map((keyword, idx) => (
                <span 
                  key={idx}
                  className="text-[10px] px-2 py-1 bg-primary/10 text-primary rounded-md"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}