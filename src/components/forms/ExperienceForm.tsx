'use client';

import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { Experience } from '@/types/resume';

export function ExperienceForm() {
  const { resumeData, setResumeData } = useResumeStore();

  const addExperience = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    setResumeData({ experiences: [...resumeData.experiences, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setResumeData({
      experiences: resumeData.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    setResumeData({ experiences: resumeData.experiences.filter((exp) => exp.id !== id) });
  };

  return (
    <div className="space-y-3">
      {resumeData.experiences.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-4">Sin experiencias</p>
      ) : (
        resumeData.experiences.map((exp) => (
          <div key={exp.id} className="p-3 border border-subtle rounded-lg space-y-3">
            <div className="flex justify-between items-start">
              <div className="grid grid-cols-2 gap-3 flex-1">
                <div className="space-y-1">
                  <Label className="text-xs text-muted">Empresa</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    placeholder="Empresa"
                    className="h-8 bg-transparent border-subtle text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted">Cargo</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    placeholder="Cargo"
                    className="h-8 bg-transparent border-subtle text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted">Inicio</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    className="h-8 bg-transparent border-subtle text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted">Fin</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                    className="h-8 bg-transparent border-subtle text-sm"
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeExperience(exp.id)}
                className="h-6 w-6 text-muted hover:text-destructive"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`current-${exp.id}`}
                checked={exp.current}
                onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                className="rounded"
              />
              <Label htmlFor={`current-${exp.id}`} className="text-xs text-muted cursor-pointer">Trabajo actual</Label>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted">Descripción</Label>
              <Textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                placeholder="Descripción..."
                rows={2}
                className="bg-transparent border-subtle resize-none text-sm"
              />
            </div>
          </div>
        ))
      )}
      <Button variant="outline" size="sm" onClick={addExperience} className="w-full gap-1.5">
        <Plus className="h-3.5 w-3.5" />
        Agregar
      </Button>
    </div>
  );
}