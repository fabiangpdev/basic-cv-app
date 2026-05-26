'use client';

import { useResumeStore } from '@/store/resumeStore';

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function TemplateClassic({ data }: { data: ReturnType<typeof useResumeStore.getState>['resumeData'] }) {
  return (
    <div className="bg-white text-slate-900 p-[45px] min-h-[842px] text-[10px]">
      <div className="text-center pb-4 mb-3">
        <h2 className="text-[22px] font-bold uppercase tracking-wider">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h2>
        <div className="mt-4 text-[10px] text-slate-500 space-y-1.5">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
        </div>
      </div>

      {data.personalInfo.summary && (
        <section className="mb-6">
          <h3 className="text-[11px] font-bold uppercase tracking-wide mb-3 text-slate-700 border-b border-slate-300 pb-1">Resumen Profesional</h3>
          <p className="text-[10px] text-slate-600 leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}

      {data.experiences.length > 0 && (
        <section className="mb-6">
          <h3 className="text-[11px] font-bold uppercase tracking-wide mb-3 text-slate-700 border-b border-slate-300 pb-1">Experiencia Laboral</h3>
          <div className="space-y-4">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <p className="text-[11px] font-bold">{exp.position}</p>
                <p className="text-[9px] text-slate-500">{exp.company} · {formatDate(exp.startDate, exp.endDate, exp.current)}</p>
                {exp.description && <p className="text-[9px] text-slate-600 mt-2 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-[11px] font-bold uppercase tracking-wide mb-3 text-slate-700 border-b border-slate-300 pb-1">Educación</h3>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <p className="text-[11px] font-bold">{edu.degree} {edu.field && `en ${edu.field}`}</p>
                <p className="text-[9px] text-slate-500">{edu.institution} · {formatDate(edu.startDate, edu.endDate, false)}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-[11px] font-bold uppercase tracking-wide mb-3 text-slate-700 border-b border-slate-300 pb-1">Habilidades</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill.id} className="text-[9px] px-2.5 py-1 bg-slate-100 text-slate-700 rounded-sm">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.projects.length > 0 && (
        <section>
          <h3 className="text-[11px] font-bold uppercase tracking-wide mb-3 text-slate-700 border-b border-slate-300 pb-1">Proyectos</h3>
          <div className="space-y-4">
            {data.projects.map((project) => (
              <div key={project.id}>
                <p className="text-[11px] font-bold">{project.name}</p>
                <p className="text-[9px] text-slate-500">{project.technologies} · {formatDate(project.startDate, project.endDate, project.current)}</p>
                {project.description && <p className="text-[9px] text-slate-600 mt-2 leading-relaxed">{project.description}</p>}
                {project.url && <p className="text-[9px] text-slate-400 mt-1">{project.url}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}