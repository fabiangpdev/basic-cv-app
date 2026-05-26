'use client';

import { useResumeStore } from '@/store/resumeStore';
import { CheckCircle, Circle, Briefcase, GraduationCap, Sparkles, Award, Globe, FolderGit2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChecklistSection {
  id: string;
  label: string;
  icon: React.ElementType;
  check: (data: ReturnType<typeof useResumeStore.getState>['resumeData']) => boolean;
}

const checklistSections: ChecklistSection[] = [
  { 
    id: 'personal', 
    label: 'Información Personal', 
    icon: Circle,
    check: (data) => {
      const p = data.personalInfo;
      const hasName = !!(p.firstName && p.lastName);
      const hasContact = !!(p.email || p.phone);
      const hasLocation = !!p.location;
      const hasSummary = p.summary.length >= 20;
      return hasName && hasContact && hasLocation && hasSummary;
    }
  },
  { 
    id: 'experience', 
    label: 'Experiencia', 
    icon: Briefcase,
    check: (data) => {
      return data.experiences.some(exp => exp.company && exp.position && exp.startDate);
    }
  },
  { 
    id: 'education', 
    label: 'Educación', 
    icon: GraduationCap,
    check: (data) => {
      return data.education.some(edu => edu.institution && edu.degree);
    }
  },
  { 
    id: 'skills', 
    label: 'Skills', 
    icon: Sparkles,
    check: (data) => data.skills.length >= 1
  },
  { 
    id: 'certifications', 
    label: 'Certificaciones', 
    icon: Award,
    check: (data) => data.certifications.length >= 1
  },
  {
    id: 'languages',
    label: 'Idiomas',
    icon: Globe,
    check: (data) => data.languages.length >= 1
  },
  {
    id: 'projects',
    label: 'Proyectos',
    icon: FolderGit2,
    check: (data) => data.projects.length >= 1
  },
];

export function ATSChecklist() {
  const { resumeData } = useResumeStore();

  const sections = checklistSections.map((section) => ({
    ...section,
    passed: section.check(resumeData),
  }));

  const passedCount = sections.filter((s) => s.passed).length;
  const totalCount = sections.length;
  const percentage = Math.round((passedCount / totalCount) * 100);

  return (
    <div className="p-4 border border-subtle/50 rounded-lg bg-card/40">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] text-muted-foreground uppercase tracking-wide">Progreso</span>
        <span className="text-[11px] text-muted-foreground font-medium">{passedCount}/{totalCount}</span>
      </div>
      
      <div className="w-full h-1.5 bg-muted/50 rounded-full mb-4 overflow-hidden relative">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            percentage === 0 ? "bg-muted/30" : percentage < 20 ? "bg-orange-500" : percentage < 50 ? "bg-yellow-500" : "bg-emerald-500"
          )}
          style={{ width: `${Math.max(percentage, 6)}%` }}
        />
      </div>

      <div className="space-y-2">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <div 
              key={section.id}
              className={cn(
                "flex items-center gap-2.5 text-[12px] transition-colors",
                section.passed ? "text-foreground/80" : "text-muted-foreground/50"
              )}
            >
              {section.passed ? (
                <CheckCircle className="h-4 w-4 text-success shrink-0" />
              ) : (
                <Icon className="h-4 w-4 text-muted-foreground/30 shrink-0" />
              )}
              <span>{section.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}