'use client';

import { useResumeStore, TemplateType } from '@/store/resumeStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const templates: { id: TemplateType; name: string; description: string; color: string }[] = [
  { id: 'classic', name: 'Classic', description: 'Tradicional', color: 'from-slate-100 to-slate-200' },
  { id: 'modern', name: 'Modern', description: 'Diseño lateral', color: 'from-violet-100 to-violet-200' },
  { id: 'minimal', name: 'Minimal', description: 'Limpio', color: 'from-zinc-100 to-zinc-200' },
  { id: 'professional', name: 'Corporate', description: 'Corporativo', color: 'from-blue-100 to-blue-200' },
  { id: 'timeline', name: 'Timeline', description: 'Línea de tiempo', color: 'from-amber-100 to-amber-200' },
  { id: 'darksidebar', name: 'Dark', description: 'Barra oscura', color: 'from-slate-800 to-slate-900' },
  { id: 'cards', name: 'Cards', description: 'Tarjetas', color: 'from-emerald-100 to-emerald-200' },
  { id: 'grid', name: 'Grid', description: 'Cuadrícula', color: 'from-rose-100 to-rose-200' },
  { id: 'monochrome', name: 'Mono', description: 'Escala grises', color: 'from-gray-200 to-gray-300' },
  { id: 'horizontal', name: 'Horizontal', description: 'Secciones fila', color: 'from-cyan-100 to-cyan-200' },
];

export function TemplateCarousel() {
  const { selectedTemplate, setSelectedTemplate } = useResumeStore();

  const currentIndex = templates.findIndex((t) => t.id === selectedTemplate);

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? templates.length - 1 : currentIndex - 1;
    setSelectedTemplate(templates[newIndex].id);
  };

  const goToNext = () => {
    const newIndex = currentIndex === templates.length - 1 ? 0 : currentIndex + 1;
    setSelectedTemplate(templates[newIndex].id);
  };

  const scrollContainerRef = (ref: HTMLDivElement | null) => {
    if (ref && selectedTemplate) {
      const selectedButton = ref.querySelector(`[data-template-id="${selectedTemplate}"]`);
      if (selectedButton) {
        selectedButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button
          onClick={goToPrevious}
          className="p-3 rounded-full border border-subtle/50 hover:bg-muted/30 transition-colors flex-shrink-0"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div 
          className="flex-1 flex gap-3 overflow-x-auto scrollbar-hide py-1 px-2"
          ref={scrollContainerRef}
        >
          {templates.map((template) => (
            <button
              key={template.id}
              data-template-id={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={cn(
                "flex flex-col items-center p-3 rounded-lg border transition-all w-[100px] flex-shrink-0",
                selectedTemplate === template.id
                  ? "border-primary bg-primary/10"
                  : "border-subtle/30 hover:border-subtle hover:bg-muted/20"
              )}
            >
              <div
                className={cn(
                  "h-10 w-16 rounded mb-2",
                  template.id === 'darksidebar'
                    ? `bg-gradient-to-r ${template.color}`
                    : `bg-gradient-to-r ${template.color}`
                )}
              />
              <span className="text-[11px] font-medium">{template.name}</span>
              <span className="text-[9px] text-muted-foreground">{template.description}</span>
            </button>
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-3 rounded-full border border-subtle/50 hover:bg-muted/30 transition-colors flex-shrink-0"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex justify-center gap-2">
        {templates.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedTemplate(templates[index].id)}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              index === currentIndex ? "bg-primary" : "bg-muted-foreground/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}