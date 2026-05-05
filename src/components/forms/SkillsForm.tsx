'use client';

import { useResumeStore } from '@/store/resumeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Skill } from '@/types/resume';

export function SkillsForm() {
  const { resumeData, setResumeData } = useResumeStore();

  const addSkill = () => {
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: '',
      level: 'intermediate',
      category: 'technical',
    };
    setResumeData({
      skills: [...resumeData.skills, newSkill],
    });
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    setResumeData({
      skills: resumeData.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    });
  };

  const removeSkill = (id: string) => {
    setResumeData({
      skills: resumeData.skills.filter((skill) => skill.id !== id),
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Habilidades</CardTitle>
        <Button onClick={addSkill} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Agregar
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {resumeData.skills.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No hay habilidades agregadas</p>
        ) : (
          resumeData.skills.map((skill) => (
            <div key={skill.id} className="border rounded-lg p-4">
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <Label>Nombre de habilidad</Label>
                  <Input
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    placeholder="JavaScript, Liderazgo, etc."
                  />
                </div>
                <div>
                  <Label>Categoría</Label>
                  <Select
                    value={skill.category || 'technical'}
                    onValueChange={(value) => updateSkill(skill.id, 'category', value || 'technical')}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Técnica</SelectItem>
                      <SelectItem value="soft">Blanda</SelectItem>
                      <SelectItem value="language">Idioma</SelectItem>
                      <SelectItem value="tool">Herramienta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Nivel</Label>
                  <Select
                    value={skill.level || 'intermediate'}
                    onValueChange={(value) => updateSkill(skill.id, 'level', value || 'intermediate')}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Básico</SelectItem>
                      <SelectItem value="intermediate">Intermedio</SelectItem>
                      <SelectItem value="advanced">Avanzado</SelectItem>
                      <SelectItem value="expert">Experto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSkill(skill.id)}
                  className="text-red-500 hover:text-red-700 mt-6"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}