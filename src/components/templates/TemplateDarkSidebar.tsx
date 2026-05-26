'use client';

import { useResumeStore } from '@/store/resumeStore';

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function TemplateDarkSidebar({ data }: { data: ReturnType<typeof useResumeStore.getState>['resumeData'] }) {
  return (
    <div className="bg-white text-slate-900 min-h-[842px] text-[10px] flex">
      <div className="w-[30%] bg-slate-800 text-white p-5 flex-shrink-0 rounded-r-xl overflow-hidden">
        <h1 className="text-[22px] font-bold mb-4 leading-tight">
          {data.personalInfo.firstName}<br />{data.personalInfo.lastName}
        </h1>

        <div className="space-y-3 text-[9px] text-slate-300">
          {data.personalInfo.email && (
            <div>
              <p className="text-slate-500 text-[8px] uppercase mb-0.5">Email</p>
              <p>{data.personalInfo.email}</p>
            </div>
          )}
          {data.personalInfo.phone && (
            <div>
              <p className="text-slate-500 text-[8px] uppercase mb-0.5">Teléfono</p>
              <p>{data.personalInfo.phone}</p>
            </div>
          )}
          {data.personalInfo.location && (
            <div>
              <p className="text-slate-500 text-[8px] uppercase mb-0.5">Ubicación</p>
              <p>{data.personalInfo.location}</p>
            </div>
          )}
        </div>

        {data.skills.length > 0 && (
          <div className="mt-6">
            <h3 className="text-[10px] font-bold uppercase text-slate-400 mb-3">Habilidades</h3>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill) => (
                <span key={skill.id} className="text-[8px] px-2 py-1 bg-slate-700 text-slate-200 rounded">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 p-6 overflow-hidden">
        {data.personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-[12px] font-bold uppercase text-slate-800 border-b border-slate-300 pb-1 mb-3">Resumen</h2>
            <p className="text-[10px] text-slate-600 leading-relaxed">{data.personalInfo.summary}</p>
          </section>
        )}

        {data.experiences.length > 0 && (
          <section className="mb-6">
            <h2 className="text-[12px] font-bold uppercase text-slate-800 border-b border-slate-300 pb-1 mb-3">Experiencia</h2>
            <div className="space-y-4">
              {data.experiences.map((exp) => (
                <div key={exp.id}>
                  <p className="text-[11px] font-bold text-slate-800">{exp.position}</p>
                  <p className="text-[9px] text-slate-500">{exp.company} · {formatDate(exp.startDate, exp.endDate, exp.current)}</p>
                  {exp.description && <p className="text-[9px] text-slate-600 mt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-[12px] font-bold uppercase text-slate-800 border-b border-slate-300 pb-1 mb-3">Educación</h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-[11px] font-bold text-slate-800">{edu.degree} {edu.field && `en ${edu.field}`}</p>
                  <p className="text-[9px] text-slate-500">{edu.institution} · {formatDate(edu.startDate, edu.endDate, false)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold uppercase text-slate-800 border-b border-slate-300 pb-1 mb-3">Proyectos</h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <p className="text-[11px] font-bold text-slate-800">{project.name}</p>
                  <p className="text-[9px] text-slate-500">{project.technologies} · {formatDate(project.startDate, project.endDate, project.current)}</p>
                  {project.description && <p className="text-[9px] text-slate-600 mt-1">{project.description}</p>}
                  {project.url && <p className="text-[9px] text-slate-400 mt-0.5">{project.url}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
