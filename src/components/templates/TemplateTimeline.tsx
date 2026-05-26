'use client';

import { useResumeStore } from '@/store/resumeStore';
import { Language, resumeLabels } from '@/lib/resumeLabels';

function formatDate(startDate: string, endDate: string | undefined, current: boolean, present: string): string {
  if (current) return `${startDate} - ${present}`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function TemplateTimeline({ data, lang }: { data: ReturnType<typeof useResumeStore.getState>['resumeData']; lang: Language }) {
  const L = resumeLabels[lang];
  return (
    <div className="bg-white text-slate-900 p-[45px] min-h-[842px] text-[10px]">
      <div className="text-center mb-8">
        <h1 className="text-[24px] font-bold text-amber-700">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <div className="mt-4 text-[9px] text-slate-500 flex justify-center gap-4">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      {data.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-[12px] font-bold text-amber-700 uppercase mb-3">{L.summary}</h2>
          <p className="text-[10px] text-slate-600 leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}

      {data.experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[12px] font-bold text-amber-700 uppercase mb-3">{L.experience}</h2>
          <div className="relative border-l-2 border-amber-300 ml-2 space-y-5">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="relative pl-5">
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-amber-100 rounded-full border-2 border-amber-400" />
                <p className="text-[11px] font-bold text-slate-800">{exp.position}</p>
                <p className="text-[9px] text-amber-600">{exp.company} · {formatDate(exp.startDate, exp.endDate, exp.current, L.present)}</p>
                {exp.description && <p className="text-[9px] text-slate-500 mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[12px] font-bold text-amber-700 uppercase mb-3">{L.education}</h2>
          <div className="relative border-l-2 border-amber-300 ml-2 space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="relative pl-5">
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-amber-100 rounded-full border-2 border-amber-400" />
                <p className="text-[11px] font-bold text-slate-800">{edu.degree} {edu.field && `${L.inField} ${edu.field}`}</p>
                <p className="text-[9px] text-amber-600">{edu.institution} · {formatDate(edu.startDate, edu.endDate, false, L.present)}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[12px] font-bold text-amber-700 uppercase mb-3">{L.skills}</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill.id} className="text-[9px] px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.projects.length > 0 && (
        <section>
          <h2 className="text-[12px] font-bold text-amber-700 uppercase mb-3">{L.projects}</h2>
          <div className="relative border-l-2 border-amber-300 ml-2 space-y-4">
            {data.projects.map((project) => (
              <div key={project.id} className="relative pl-5">
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-amber-100 rounded-full border-2 border-amber-400" />
                <p className="text-[11px] font-bold text-slate-800">{project.name}</p>
                <p className="text-[9px] text-amber-600">{project.technologies} · {formatDate(project.startDate, project.endDate, project.current, L.present)}</p>
                {project.description && <p className="text-[9px] text-slate-500 mt-1">{project.description}</p>}
                {project.url && <p className="text-[9px] text-slate-400 mt-0.5">{project.url}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
