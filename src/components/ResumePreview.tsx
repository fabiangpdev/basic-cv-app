'use client';

import { useResumeStore } from '@/store/resumeStore';
import { Download, FileText } from 'lucide-react';
import { ResumePDF } from './pdf/ResumePDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { TemplateSelector } from './TemplateSelector';

function TemplateClassic({ data }: { data: ReturnType<typeof useResumeStore.getState>['resumeData'] }) {
  return (
    <div className="bg-white text-slate-900 p-[30px] min-h-[650px] text-[10px]">
      <div className="text-center border-b-2 border-slate-300 pb-4 mb-4">
        <h2 className="text-[18px] font-bold uppercase tracking-wider">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h2>
        <div className="mt-2 text-[9px] text-slate-500 space-y-0.5">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
        </div>
      </div>

      {data.personalInfo.summary && (
        <section className="mb-4">
          <h3 className="text-[10px] font-bold uppercase tracking-wide mb-2 text-slate-700 border-b border-slate-300 pb-1">Resumen Profesional</h3>
          <p className="text-[9px] text-slate-600 leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}

      {data.experiences.length > 0 && (
        <section className="mb-4">
          <h3 className="text-[10px] font-bold uppercase tracking-wide mb-2 text-slate-700 border-b border-slate-300 pb-1">Experiencia Laboral</h3>
          <div className="space-y-3">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <p className="text-[11px] font-bold">{exp.position}</p>
                <p className="text-[9px] text-slate-500">{exp.company} · {exp.startDate} - {exp.current ? 'Actual' : exp.endDate}</p>
                {exp.description && <p className="text-[8px] text-slate-600 mt-1 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-4">
          <h3 className="text-[10px] font-bold uppercase tracking-wide mb-2 text-slate-700 border-b border-slate-300 pb-1">Educación</h3>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <p className="text-[11px] font-bold">{edu.degree} {edu.field && `en ${edu.field}`}</p>
                <p className="text-[9px] text-slate-500">{edu.institution} · {edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <h3 className="text-[10px] font-bold uppercase tracking-wide mb-2 text-slate-700 border-b border-slate-300 pb-1">Habilidades</h3>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((skill) => (
              <span key={skill.id} className="text-[9px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded-sm">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function TemplateModern({ data }: { data: ReturnType<typeof useResumeStore.getState>['resumeData'] }) {
  return (
    <div className="bg-white min-h-[650px] flex text-[10px]">
      <div className="w-[28%] bg-slate-900 text-white p-4">
        <div className="text-center mb-6">
          <h2 className="text-[14px] font-bold uppercase leading-tight">
            {data.personalInfo.firstName}<br/>{data.personalInfo.lastName}
          </h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-[8px] uppercase tracking-wider text-slate-400 mb-1">Contacto</p>
            {data.personalInfo.email && <p className="text-[9px] text-slate-200">{data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p className="text-[9px] text-slate-200">{data.personalInfo.phone}</p>}
            {data.personalInfo.location && <p className="text-[9px] text-slate-200">{data.personalInfo.location}</p>}
          </div>

          {data.skills.length > 0 && (
            <div>
              <p className="text-[8px] uppercase tracking-wider text-slate-400 mb-2">Skills</p>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((skill) => (
                  <span key={skill.id} className="text-[8px] px-1.5 py-0.5 bg-slate-800 rounded-sm">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-[72%] p-4 text-slate-900">
        {data.personalInfo.summary && (
          <section className="mb-4">
            <p className="text-[9px] text-slate-600 leading-relaxed">{data.personalInfo.summary}</p>
          </section>
        )}

        {data.experiences.length > 0 && (
          <section className="mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-wide mb-2 text-slate-800">Experiencia</h3>
            <div className="space-y-3">
              {data.experiences.map((exp) => (
                <div key={exp.id}>
                  <p className="text-[11px] font-bold text-slate-900">{exp.position}</p>
                  <p className="text-[9px] text-slate-500">{exp.company} · {exp.startDate} - {exp.current ? 'Actual' : exp.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-wide mb-2 text-slate-800">Educación</h3>
            <div className="space-y-2">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-[11px] font-bold text-slate-900">{edu.degree}</p>
                  <p className="text-[9px] text-slate-500">{edu.institution}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function TemplateMinimal({ data }: { data: ReturnType<typeof useResumeStore.getState>['resumeData'] }) {
  return (
    <div className="bg-white text-slate-900 p-[40px] min-h-[650px] text-[10px]">
      <div className="mb-6">
        <h2 className="text-[20px] font-light tracking-tight">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h2>
        <div className="flex gap-4 mt-2 text-[10px] text-slate-500">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      {data.personalInfo.summary && (
        <section className="mb-6">
          <h3 className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-3">Sobre mí</h3>
          <p className="text-[10px] text-slate-600 leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}

      {data.experiences.length > 0 && (
        <section className="mb-6">
          <h3 className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-3">Experiencia</h3>
          <div className="space-y-4">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <p className="text-[11px] font-medium">{exp.position}</p>
                <p className="text-[9px] text-slate-500">{exp.company} · {exp.startDate} - {exp.current ? 'Actual' : exp.endDate}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-3">Educación</h3>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <p className="text-[11px] font-medium">{edu.degree} {edu.field && `en ${edu.field}`}</p>
                <p className="text-[9px] text-slate-500">{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <h3 className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-3">Habilidades</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill.id} className="text-[10px] text-slate-600">{skill.name}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function TemplateProfessional({ data }: { data: ReturnType<typeof useResumeStore.getState>['resumeData'] }) {
  return (
    <div className="bg-white text-slate-900 p-[25px] min-h-[650px] text-[10px]">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-[16px] font-bold">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h2>
          <p className="text-[9px] text-slate-500 mt-1">{data.personalInfo.location}</p>
        </div>
        <div className="text-right text-[9px] text-slate-600">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
        </div>
      </div>

      <div className="h-[2px] bg-blue-600 mb-4" />

      <div className="grid grid-cols-2 gap-5">
        <div>
          {data.personalInfo.summary && (
            <section className="mb-4">
              <h3 className="text-[9px] font-bold uppercase text-blue-700 mb-1">Resumen</h3>
              <p className="text-[9px] text-slate-600">{data.personalInfo.summary}</p>
            </section>
          )}

          {data.experiences.length > 0 && (
            <section className="mb-4">
              <h3 className="text-[9px] font-bold uppercase text-blue-700 mb-2">Experiencia</h3>
              <div className="space-y-3">
                {data.experiences.map((exp) => (
                  <div key={exp.id}>
                    <p className="text-[10px] font-bold">{exp.position}</p>
                    <p className="text-[8px] text-slate-500">{exp.company} | {exp.startDate} - {exp.current ? 'Actual' : exp.endDate}</p>
                    {exp.description && <p className="text-[8px] text-slate-600 mt-1">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div>
          {data.education.length > 0 && (
            <section className="mb-4">
              <h3 className="text-[9px] font-bold uppercase text-blue-700 mb-2">Educación</h3>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-[10px] font-bold">{edu.degree} {edu.field && `en ${edu.field}`}</p>
                    <p className="text-[8px] text-slate-500">{edu.institution} | {edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <h3 className="text-[9px] font-bold uppercase text-blue-700 mb-2">Habilidades</h3>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((skill) => (
                  <span key={skill.id} className="text-[8px] px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded-sm">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export function ResumePreview() {
  const { resumeData, selectedTemplate } = useResumeStore();

  const hasContent = resumeData.personalInfo.firstName || resumeData.personalInfo.lastName;

  if (!hasContent) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="h-8 w-8 text-muted mb-3" />
        <p className="text-sm text-muted-foreground">Sin información</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TemplateSelector />

      <div className="border border-slate-200 rounded-sm overflow-hidden shadow-lg">
        {selectedTemplate === 'classic' && <TemplateClassic data={resumeData} />}
        {selectedTemplate === 'modern' && <TemplateModern data={resumeData} />}
        {selectedTemplate === 'minimal' && <TemplateMinimal data={resumeData} />}
        {selectedTemplate === 'professional' && <TemplateProfessional data={resumeData} />}
      </div>

      <div className="flex justify-center">
        {typeof window !== 'undefined' && (
          <PDFDownloadLink
            document={<ResumePDF data={resumeData} template={selectedTemplate} />}
            fileName={`${resumeData.personalInfo.firstName || 'resume'}.pdf`}
          >
            {({ loading }) => (
              <Button size="sm" variant="outline" className="gap-2">
                <Download className="h-3.5 w-3.5" />
                {loading ? 'Generando...' : 'Descargar PDF'}
              </Button>
            )}
          </PDFDownloadLink>
        )}
      </div>
    </div>
  );
}