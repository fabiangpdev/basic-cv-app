'use client';

import { useResumeStore, TemplateType } from '@/store/resumeStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

function ThumbClassic() {
  return (
    <div className="w-full h-full bg-white flex flex-col p-1 gap-0.5">
      <div className="w-1/2 h-1.5 bg-slate-400 rounded-sm mx-auto mb-0.5" />
      <div className="w-full h-px bg-slate-300" />
      {[60, 80, 70, 50, 65].map((w, i) => (
        <div key={i} className="h-1 rounded-sm bg-slate-200" style={{ width: `${w}%` }} />
      ))}
    </div>
  );
}

function ThumbModern() {
  return (
    <div className="w-full h-full bg-white flex">
      <div className="w-[30%] bg-slate-800 flex flex-col gap-0.5 p-1">
        <div className="w-full h-1 bg-slate-500 rounded-sm" />
        <div className="w-3/4 h-1 bg-slate-600 rounded-sm" />
        <div className="mt-1 w-full h-px bg-slate-600" />
        {[80, 70, 60].map((w, i) => (
          <div key={i} className="h-0.5 rounded-sm bg-slate-600" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="w-[70%] flex flex-col gap-0.5 p-1">
        {[80, 60, 70, 50, 65, 55].map((w, i) => (
          <div key={i} className="h-1 rounded-sm bg-slate-200" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

function ThumbMinimal() {
  return (
    <div className="w-full h-full bg-white flex flex-col p-1 gap-0.5">
      <div className="w-2/5 h-1.5 bg-zinc-400 rounded-sm mb-0.5" />
      {[70, 50, 80, 60, 45, 65].map((w, i) => (
        <div key={i} className="h-0.5 rounded-sm bg-zinc-200" style={{ width: `${w}%` }} />
      ))}
    </div>
  );
}

function ThumbProfessional() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="w-full h-[30%] bg-blue-800 flex items-center justify-center px-1">
        <div className="w-3/5 h-1.5 bg-blue-200 rounded-sm" />
      </div>
      <div className="flex-1 flex flex-col gap-0.5 p-1">
        {[80, 60, 70, 50, 65].map((w, i) => (
          <div key={i} className="h-1 rounded-sm bg-slate-200" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

function ThumbTimeline() {
  return (
    <div className="w-full h-full bg-white flex flex-col p-1 gap-0.5">
      <div className="w-2/3 h-1.5 bg-amber-500 rounded-sm mx-auto mb-1" />
      <div className="flex gap-1 flex-1">
        <div className="w-px bg-amber-300 self-stretch ml-1 relative">
          {[0, 30, 60].map((top, i) => (
            <div key={i} className="absolute -left-[3px] w-1.5 h-1.5 rounded-full bg-amber-400 border border-amber-200" style={{ top }} />
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-1">
          {[70, 50, 70, 50].map((w, i) => (
            <div key={i} className="h-1 rounded-sm bg-amber-100" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ThumbDarkSidebar() {
  return (
    <div className="w-full h-full bg-white flex">
      <div className="w-[32%] bg-slate-800 flex flex-col gap-0.5 p-1 rounded-tr-sm rounded-br-sm">
        <div className="w-full h-1.5 bg-slate-400 rounded-sm" />
        <div className="w-3/4 h-1 bg-slate-600 rounded-sm" />
        <div className="mt-0.5 w-full h-px bg-slate-600" />
        {[80, 70, 60].map((w, i) => (
          <div key={i} className="h-0.5 rounded-sm bg-slate-600" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-0.5 p-1">
        {[80, 60, 75, 50, 65].map((w, i) => (
          <div key={i} className="h-1 rounded-sm bg-slate-200" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

function ThumbCards() {
  return (
    <div className="w-full h-full bg-white flex flex-col p-1 gap-1">
      <div className="w-1/2 h-1.5 bg-emerald-500 rounded-sm mx-auto" />
      <div className="grid grid-cols-2 gap-1 flex-1">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border border-emerald-200 rounded-sm p-0.5 flex flex-col gap-0.5">
            <div className="w-3/4 h-1 bg-emerald-300 rounded-sm" />
            <div className="w-full h-0.5 bg-emerald-100 rounded-sm" />
            <div className="w-2/3 h-0.5 bg-emerald-100 rounded-sm" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ThumbGrid() {
  return (
    <div className="w-full h-full bg-white flex flex-col p-1 gap-0.5">
      <div className="w-full h-[25%] bg-rose-100 rounded-sm flex items-center px-1">
        <div className="w-2/5 h-1 bg-rose-400 rounded-sm" />
      </div>
      <div className="flex flex-1 gap-1">
        <div className="flex-1 flex flex-col gap-0.5">
          {[80, 60, 70].map((w, i) => (
            <div key={i} className="h-1 rounded-sm bg-slate-200" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-0.5">
          {[70, 80, 50].map((w, i) => (
            <div key={i} className="h-1 rounded-sm bg-slate-200" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ThumbMonochrome() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[28%] bg-gray-700 flex items-center justify-center">
        <div className="w-2/3 h-1.5 bg-gray-300 rounded-sm" />
      </div>
      <div className="flex-1 bg-gray-50 flex flex-col gap-0.5 p-1">
        {[80, 60, 70, 50, 65].map((w, i) => (
          <div key={i} className="h-1 rounded-sm bg-gray-300" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

function ThumbHorizontal() {
  return (
    <div className="w-full h-full bg-white flex flex-col gap-0.5 p-1">
      <div className="w-full h-[22%] bg-cyan-100 rounded-sm flex items-center px-1">
        <div className="w-2/5 h-1 bg-cyan-500 rounded-sm" />
      </div>
      {['bg-slate-100', 'bg-cyan-50', 'bg-slate-100'].map((bg, i) => (
        <div key={i} className={`w-full flex-1 ${bg} rounded-sm flex items-center px-1`}>
          <div className="w-3/5 h-0.5 bg-slate-300 rounded-sm" />
        </div>
      ))}
    </div>
  );
}

const templates: { id: TemplateType; name: string; description: string; Thumb: () => JSX.Element }[] = [
  { id: 'classic',      name: 'Classic',     description: 'Tradicional',    Thumb: ThumbClassic },
  { id: 'modern',       name: 'Modern',      description: 'Diseño lateral', Thumb: ThumbModern },
  { id: 'minimal',      name: 'Minimal',     description: 'Limpio',         Thumb: ThumbMinimal },
  { id: 'professional', name: 'Corporate',   description: 'Corporativo',    Thumb: ThumbProfessional },
  { id: 'timeline',     name: 'Timeline',    description: 'Línea de tiempo',Thumb: ThumbTimeline },
  { id: 'darksidebar',  name: 'Dark',        description: 'Barra oscura',   Thumb: ThumbDarkSidebar },
  { id: 'cards',        name: 'Cards',       description: 'Tarjetas',       Thumb: ThumbCards },
  { id: 'grid',         name: 'Grid',        description: 'Cuadrícula',     Thumb: ThumbGrid },
  { id: 'monochrome',   name: 'Mono',        description: 'Escala grises',  Thumb: ThumbMonochrome },
  { id: 'horizontal',   name: 'Horizontal',  description: 'Bandas',         Thumb: ThumbHorizontal },
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
                "flex flex-col items-center p-2 rounded-lg border transition-all w-[88px] flex-shrink-0",
                selectedTemplate === template.id
                  ? "border-primary bg-primary/10"
                  : "border-subtle/30 hover:border-subtle hover:bg-muted/20"
              )}
            >
              <div className="w-full h-14 rounded overflow-hidden border border-slate-200 mb-1.5">
                <template.Thumb />
              </div>
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