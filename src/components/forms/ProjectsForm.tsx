'use client';

import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { Project } from '@/types/resume';

export function ProjectsForm() {
  const { resumeData, setResumeData } = useResumeStore();

  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      technologies: '',
      url: '',
      startDate: '',
      endDate: '',
      current: false,
    };
    setResumeData({ projects: [...resumeData.projects, newProject] });
  };

  const updateProject = (id: string, field: keyof Project, value: string | boolean) => {
    setResumeData({
      projects: resumeData.projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    });
  };

  const removeProject = (id: string) => {
    setResumeData({ projects: resumeData.projects.filter((p) => p.id !== id) });
  };

  return (
    <div className="space-y-3">
      {resumeData.projects.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-4">Sin proyectos</p>
      ) : (
        resumeData.projects.map((project) => (
          <div key={project.id} className="p-3 border border-subtle rounded-lg space-y-3">
            <div className="flex justify-between items-start">
              <div className="grid grid-cols-2 gap-3 flex-1">
                <div className="col-span-2 space-y-1">
                  <Label className="text-xs text-muted">Nombre del proyecto</Label>
                  <Input
                    value={project.name}
                    onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                    placeholder="Nombre del proyecto"
                    className="h-8 bg-transparent border-subtle text-sm"
                  />
                </div>
                <div className="col-span-2 space-y-1">
                  <Label className="text-xs text-muted">Tecnologías</Label>
                  <Input
                    value={project.technologies}
                    onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                    placeholder="React, Node.js, PostgreSQL..."
                    className="h-8 bg-transparent border-subtle text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted">Inicio</Label>
                  <Input
                    type="month"
                    value={project.startDate}
                    onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                    className="h-8 bg-transparent border-subtle text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted">Fin</Label>
                  <Input
                    type="month"
                    value={project.endDate}
                    onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                    disabled={project.current}
                    className="h-8 bg-transparent border-subtle text-sm"
                  />
                </div>
                <div className="col-span-2 space-y-1">
                  <Label className="text-xs text-muted">URL (opcional)</Label>
                  <Input
                    value={project.url ?? ''}
                    onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                    placeholder="https://github.com/..."
                    className="h-8 bg-transparent border-subtle text-sm"
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeProject(project.id)}
                className="h-6 w-6 text-muted hover:text-destructive"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`current-${project.id}`}
                checked={project.current}
                onChange={(e) => updateProject(project.id, 'current', e.target.checked)}
                className="rounded"
              />
              <Label htmlFor={`current-${project.id}`} className="text-xs text-muted cursor-pointer">Proyecto en curso</Label>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted">Descripción</Label>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                placeholder="Describe el proyecto, sus objetivos y resultados..."
                rows={2}
                className="bg-transparent border-subtle resize-none text-sm"
              />
            </div>
          </div>
        ))
      )}
      <Button variant="outline" size="sm" onClick={addProject} className="w-full gap-1.5">
        <Plus className="h-3.5 w-3.5" />
        Agregar
      </Button>
    </div>
  );
}
