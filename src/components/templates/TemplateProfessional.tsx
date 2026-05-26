'use client';

import { useResumeStore } from '@/store/resumeStore';
import { Language, resumeLabels } from '@/lib/resumeLabels';

function formatDate(startDate: string, endDate: string | undefined, current: boolean, present: string): string {
  if (current) return `${startDate} - ${present}`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function TemplateProfessional({ data, lang }: { data: ReturnType<typeof useResumeStore.getState>['resumeData']; lang: Language }) {
  const L = resumeLabels[lang];
  return (
    <div className="bg-white text-slate-900 p-[45px] min-h-[842px] text-[10px]">
      <div className="flex justify-between items-start mb-8">
        <div className="w-[30%]">
          <h2 className="text-[22px] font-bold leading-relaxed">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h2>
        </div>
        <div className="w-[30%] text-right text-[10px] text-slate-500 space-y-1">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          {data.personalInfo.summary && (
            <section className="mb-8 border-l-2 border-blue-500 pl-3">
              <h3 className="text-[11px] font-bold uppercase text-blue-800 mb-2">{L.summary}</h3>
              <p className="text-[10px] text-slate-600 leading-relaxed">{data.personalInfo.summary}</p>
            </section>
          )}

          {data.experiences.length > 0 && (
            <section className="mb-8 border-l-2 border-blue-500 pl-3">
              <h3 className="text-[11px] font-bold uppercase text-blue-800 mb-3">{L.experience}</h3>
              <div className="space-y-4">
                {data.experiences.map((exp) => (
                  <div key={exp.id}>
                    <p className="text-[11px] font-bold text-slate-800">{exp.position}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{exp.company} | {formatDate(exp.startDate, exp.endDate, exp.current, L.present)}</p>
                    {exp.description && <p className="text-[10px] text-slate-600 mt-2 leading-relaxed">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div>
          {data.education.length > 0 && (
            <section className="mb-8 border-l-2 border-blue-500 pl-3">
              <h3 className="text-[11px] font-bold uppercase text-blue-800 mb-3">{L.education}</h3>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-[11px] font-bold text-slate-800">{edu.degree} {edu.field && `${L.inField} ${edu.field}`}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{edu.institution} | {formatDate(edu.startDate, edu.endDate, false, L.present)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section className="border-l-2 border-blue-500 pl-3">
              <h3 className="text-[11px] font-bold uppercase text-blue-800 mb-3">{L.skills}</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span key={skill.id} className="text-[10px] px-2.5 py-1 bg-blue-50 text-blue-700 rounded-sm border border-blue-200">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {data.projects.length > 0 && (
        <section className="border-l-2 border-blue-500 pl-3">
          <h3 className="text-[11px] font-bold uppercase text-blue-800 mb-3">{L.projects}</h3>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map((project) => (
              <div key={project.id}>
                <p className="text-[11px] font-bold text-slate-800">{project.name}</p>
                <p className="text-[10px] text-slate-500 mt-1">{project.technologies} | {formatDate(project.startDate, project.endDate, project.current, L.present)}</p>
                {project.description && <p className="text-[10px] text-slate-600 mt-2 leading-relaxed">{project.description}</p>}
                {project.url && <p className="text-[9px] text-slate-400 mt-1">{project.url}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
