'use client';

import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { Education } from '@/types/resume';

export function EducationForm() {
  const { resumeData, setResumeData } = useResumeStore();

  const addEducation = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
    };
    setResumeData({ education: [...resumeData.education, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, value: string | boolean) => {
    setResumeData({
      education: resumeData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    setResumeData({ education: resumeData.education.filter((edu) => edu.id !== id) });
  };

  return (
    <div className="space-y-3">
      {resumeData.education.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-4">Sin educación</p>
      ) : (
        resumeData.education.map((edu) => (
          <div key={edu.id} className="p-3 border border-subtle rounded-lg space-y-3">
            <div className="flex justify-between items-start">
              <div className="grid grid-cols-2 gap-3 flex-1">
                <div className="space-y-1">
                  <Label className="text-xs text-muted">Institución</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="Universidad"
                    className="h-8 bg-transparent border-subtle text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted">Grado</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="Licenciatura"
                    className="h-8 bg-transparent border-subtle text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted">Campo</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    placeholder="Carrera"
                    className="h-8 bg-transparent border-subtle text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted">GPA</Label>
                  <Input
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    placeholder="3.8"
                    className="h-8 bg-transparent border-subtle text-sm"
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeEducation(edu.id)}
                className="h-6 w-6 text-muted hover:text-destructive"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`edu-current-${edu.id}`}
                checked={edu.current}
                onChange={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                className="rounded"
              />
              <Label htmlFor={`edu-current-${edu.id}`} className="text-xs text-muted cursor-pointer">Estudio actual</Label>
            </div>
          </div>
        ))
      )}
      <Button variant="outline" size="sm" onClick={addEducation} className="w-full gap-1.5">
        <Plus className="h-3.5 w-3.5" />
        Agregar
      </Button>
    </div>
  );
}