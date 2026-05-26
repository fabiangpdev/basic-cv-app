'use client';

import { useResumeStore } from '@/store/resumeStore';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, GraduationCap, Sparkles, Award, Languages, FolderGit2 } from 'lucide-react';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { CertificationsForm } from './forms/CertificationsForm';
import { LanguagesForm } from './forms/LanguagesForm';
import { ProjectsForm } from './forms/ProjectsForm';

export function ResumeForm() {
  const { resumeData, setResumeData } = useResumeStore();

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData({
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    });
  };

  const tabs = [
    { value: 'experience', label: 'Experiencia', icon: Briefcase },
    { value: 'education', label: 'Educación', icon: GraduationCap },
    { value: 'skills', label: 'Skills', icon: Sparkles },
    { value: 'certifications', label: 'Certificados', icon: Award },
    { value: 'languages', label: 'Idiomas', icon: Languages },
    { value: 'projects', label: 'Proyectos', icon: FolderGit2 },
  ] as const;

  return (
    <div className="space-y-4">
      <Card className="border-subtle/50 bg-card/40">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <Label className="text-[11px] text-muted-foreground">Nombre</Label>
              <Input
                value={resumeData.personalInfo.firstName}
                onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                placeholder="Nombre"
                className="h-8 bg-transparent border-subtle/60 text-[13px] placeholder:text-muted-foreground/50"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-muted-foreground">Apellido</Label>
              <Input
                value={resumeData.personalInfo.lastName}
                onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                placeholder="Apellido"
                className="h-8 bg-transparent border-subtle/60 text-[13px] placeholder:text-muted-foreground/50"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-muted-foreground">Email</Label>
              <Input
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                placeholder="email@ejemplo.com"
                className="h-8 bg-transparent border-subtle/60 text-[13px] placeholder:text-muted-foreground/50"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-muted-foreground">Teléfono</Label>
              <Input
                value={resumeData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                placeholder="+1 234 567 8900"
                className="h-8 bg-transparent border-subtle/60 text-[13px] placeholder:text-muted-foreground/50"
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label className="text-[11px] text-muted-foreground">Ubicación</Label>
              <Input
                value={resumeData.personalInfo.location}
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
                placeholder="Ciudad, País"
                className="h-8 bg-transparent border-subtle/60 text-[13px] placeholder:text-muted-foreground/50"
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label className="text-[11px] text-muted-foreground">Resumen profesional</Label>
              <Textarea
                value={resumeData.personalInfo.summary}
                onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                placeholder="Tu resumen profesional..."
                rows={2}
                className="bg-transparent border-subtle/60 text-[13px] placeholder:text-muted-foreground/50 resize-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="border border-subtle/50 rounded-lg overflow-hidden bg-card/40">
        <Tabs defaultValue="experience" className="w-full">
          <div className="border-b border-subtle/50 px-3 py-2 overflow-x-auto">
            <TabsList className="bg-transparent h-auto p-0 gap-1">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value}
                  className="gap-1.5 px-3 py-1.5 text-[11px] whitespace-nowrap data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md transition-colors"
                >
                  <tab.icon className="h-3 w-3" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="p-4">
            <TabsContent value="experience" className="mt-0">
              <ExperienceForm />
            </TabsContent>
            <TabsContent value="education" className="mt-0">
              <EducationForm />
            </TabsContent>
            <TabsContent value="skills" className="mt-0">
              <SkillsForm />
            </TabsContent>
            <TabsContent value="certifications" className="mt-0">
              <CertificationsForm />
            </TabsContent>
            <TabsContent value="languages" className="mt-0">
              <LanguagesForm />
            </TabsContent>
            <TabsContent value="projects" className="mt-0">
              <ProjectsForm />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}