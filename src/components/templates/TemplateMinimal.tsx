'use client';

import { useResumeStore } from '@/store/resumeStore';

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function TemplateMinimal({ data }: { data: ReturnType<typeof useResumeStore.getState>['resumeData'] }) {
  return (
    <div className="bg-white text-slate-900 p-[45px] min-h-[842px] text-[10px]">
      <div className="mb-6 text-center">
        <h2 className="text-[26px] font-bold tracking-tight">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h2>
        <div className="flex justify-center gap-6 mt-6 text-[10px] text-slate-500">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      <div className="h-[1px] bg-slate-200 mb-8" />

      <div className="grid grid-cols-2 gap-10 mb-8">
        <div>
          {data.personalInfo.summary && (
            <section className="mb-8">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-700 mb-3">Sobre mí</h3>
              <p className="text-[10px] text-slate-600 leading-relaxed">{data.personalInfo.summary}</p>
            </section>
          )}

          {data.experiences.length > 0 && (
            <section className="mb-8">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-700 mb-3">Experiencia</h3>
              <div className="space-y-4">
                {data.experiences.map((exp) => (
                  <div key={exp.id}>
                    <p className="text-[11px] font-bold text-slate-800">{exp.position}</p>
                    <p className="text-[9px] text-slate-500 mt-1">{exp.company} · {formatDate(exp.startDate, exp.endDate, exp.current)}</p>
                    {exp.description && <p className="text-[9px] text-slate-600 mt-2">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div>
          {data.education.length > 0 && (
            <section className="mb-8">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-700 mb-3">Educación</h3>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-[11px] font-bold text-slate-800">{edu.degree} {edu.field && `en ${edu.field}`}</p>
                    <p className="text-[9px] text-slate-500 mt-1">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-700 mb-3">Habilidades</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span key={skill.id} className="text-[10px] px-2.5 py-1 bg-slate-100 text-slate-700 rounded-sm">{skill.name}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {data.projects.length > 0 && (
        <section>
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-700 mb-3">Proyectos</h3>
          <div className="grid grid-cols-2 gap-6">
            {data.projects.map((project) => (
              <div key={project.id}>
                <p className="text-[11px] font-bold text-slate-800">{project.name}</p>
                <p className="text-[9px] text-slate-500 mt-1">{project.technologies} · {formatDate(project.startDate, project.endDate, project.current)}</p>
                {project.description && <p className="text-[9px] text-slate-600 mt-2">{project.description}</p>}
                {project.url && <p className="text-[9px] text-slate-400 mt-1">{project.url}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}