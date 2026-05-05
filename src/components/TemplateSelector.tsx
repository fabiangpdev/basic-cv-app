'use client';

import { useResumeStore, TemplateType } from '@/store/resumeStore';
import { cn } from '@/lib/utils';

const templates: { id: TemplateType; name: string; description: string }[] = [
  { id: 'classic', name: 'Classic', description: 'Tradicional y elegante' },
  { id: 'modern', name: 'Modern', description: 'Diseño lateral' },
  { id: 'minimal', name: 'Minimal', description: 'Limpio y moderno' },
  { id: 'professional', name: 'Professional', description: 'Corporativo' },
];

export function TemplateSelector() {
  const { selectedTemplate, setSelectedTemplate } = useResumeStore();

  return (
    <div className="grid grid-cols-4 gap-2">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => setSelectedTemplate(template.id)}
          className={cn(
            "p-2 rounded-lg border text-center transition-all",
            selectedTemplate === template.id
              ? "border-primary bg-primary/10"
              : "border-subtle/50 hover:border-subtle hover:bg-muted/30"
          )}
        >
          <div
            className={cn(
              "h-8 rounded mb-1.5 mx-auto",
              template.id === 'classic' && "bg-gradient-to-r from-slate-100 to-slate-200",
              template.id === 'modern' && "bg-gradient-to-r from-violet-100 to-violet-200",
              template.id === 'minimal' && "bg-gradient-to-r from-zinc-100 to-zinc-200",
              template.id === 'professional' && "bg-gradient-to-r from-blue-100 to-blue-200"
            )}
          />
          <span className="text-[10px] font-medium block">{template.name}</span>
          <span className="text-[9px] text-muted-foreground block">{template.description}</span>
        </button>
      ))}
    </div>
  );
}