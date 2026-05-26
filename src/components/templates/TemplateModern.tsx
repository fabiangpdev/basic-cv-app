'use client';

import { useResumeStore } from '@/store/resumeStore';

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function TemplateModern({ data }: { data: ReturnType<typeof useResumeStore.getState>['resumeData'] }) {
  return (
    <div className="bg-white min-h-[842px] flex text-[10px]">
      <div className="w-[28%] bg-slate-900 text-white p-6">
        <div className="text-center mb-8">
          <h2 className="text-[16px] font-bold uppercase leading-tight">
            {data.personalInfo.firstName}<br/>{data.personalInfo.lastName}
          </h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-slate-400 mb-3">Contacto</p>
            {data.personalInfo.email && <p className="text-[10px] text-slate-200 mb-1">{data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p className="text-[10px] text-slate-200 mb-1">{data.personalInfo.phone}</p>}
            {data.personalInfo.location && <p className="text-[10px] text-slate-200">{data.personalInfo.location}</p>}
          </div>

          {data.skills.length > 0 && (
            <div>
              <p className="text-[9px] uppercase tracking-wider text-slate-400 mb-3">Skills</p>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span key={skill.id} className="text-[9px] px-2 py-1 bg-slate-800 rounded-sm">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-[72%] p-6 text-slate-900">
        {data.personalInfo.summary && (
          <section className="mb-6">
            <p className="text-[10px] text-slate-600 leading-relaxed">{data.personalInfo.summary}</p>
          </section>
        )}

        {data.experiences.length > 0 && (
          <section className="mb-6">
            <h3 className="text-[11px] font-bold uppercase tracking-wide mb-3 text-slate-800">Experiencia</h3>
            <div className="space-y-4">
              {data.experiences.map((exp) => (
                <div key={exp.id}>
                  <p className="text-[11px] font-bold text-slate-900">{exp.position}</p>
                  <p className="text-[9px] text-slate-500">{exp.company} · {formatDate(exp.startDate, exp.endDate, exp.current)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="mb-6">
            <h3 className="text-[11px] font-bold uppercase tracking-wide mb-3 text-slate-800">Educación</h3>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-[11px] font-bold text-slate-900">{edu.degree}</p>
                  <p className="text-[9px] text-slate-500">{edu.institution}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects.length > 0 && (
          <section>
            <h3 className="text-[11px] font-bold uppercase tracking-wide mb-3 text-slate-800">Proyectos</h3>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <p className="text-[11px] font-bold text-slate-900">{project.name}</p>
                  <p className="text-[9px] text-slate-500">{project.technologies} · {formatDate(project.startDate, project.endDate, project.current)}</p>
                  {project.description && <p className="text-[9px] text-slate-500 mt-1">{project.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}