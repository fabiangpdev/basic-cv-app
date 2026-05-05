'use client';

import { useResumeStore } from '@/store/resumeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Language } from '@/types/resume';

export function LanguagesForm() {
  const { resumeData, setResumeData } = useResumeStore();

  const addLanguage = () => {
    const newLang: Language = {
      id: crypto.randomUUID(),
      language: '',
      level: 'intermediate',
    };
    setResumeData({
      languages: [...resumeData.languages, newLang],
    });
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    setResumeData({
      languages: resumeData.languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    });
  };

  const removeLanguage = (id: string) => {
    setResumeData({
      languages: resumeData.languages.filter((lang) => lang.id !== id),
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Idiomas</CardTitle>
        <Button onClick={addLanguage} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Agregar
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {resumeData.languages.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No hay idiomas agregados</p>
        ) : (
          resumeData.languages.map((lang) => (
            <div key={lang.id} className="border rounded-lg p-4">
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <Label>Idioma</Label>
                  <Input
                    value={lang.language}
                    onChange={(e) => updateLanguage(lang.id, 'language', e.target.value)}
                    placeholder="Inglés, Español, etc."
                  />
                </div>
                <div>
                  <Label>Nivel</Label>
                  <Select
                    value={lang.level || 'intermediate'}
                    onValueChange={(value) => updateLanguage(lang.id, 'level', value || 'intermediate')}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Básico</SelectItem>
                      <SelectItem value="intermediate">Intermedio</SelectItem>
                      <SelectItem value="advanced">Avanzado</SelectItem>
                      <SelectItem value="native">Nativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLanguage(lang.id)}
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