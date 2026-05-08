'use client';

import { useResumeStore } from '@/store/resumeStore';

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function TemplateMonochrome({ data }: { data: ReturnType<typeof useResumeStore.getState>['resumeData'] }) {
  return (
    <div className="bg-white text-slate-900 p-[45px] h-[842px] text-[10px]">
      <div className="border-b-2 border-slate-800 pb-4 mb-6">
        <h1 className="text-[28px] font-bold uppercase tracking-wider text-slate-900">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <div className="mt-2 text-[9px] text-slate-600 flex gap-4">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      {data.personalInfo.summary && (
        <section className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 mb-2">Resumen</h2>
          <p className="text-[10px] text-slate-700 leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}

      {data.experiences.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 mb-3">Experiencia</h2>
          <div className="space-y-3">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <p className="text-[10px] font-bold text-slate-800">{exp.position}</p>
                <p className="text-[9px] text-slate-600">{exp.company} | {formatDate(exp.startDate, exp.endDate, exp.current)}</p>
                {exp.description && <p className="text-[9px] text-slate-600 mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 mb-3">Educación</h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <p className="text-[10px] font-bold text-slate-800">{edu.degree} {edu.field && `en ${edu.field}`}</p>
                <p className="text-[9px] text-slate-600">{edu.institution} | {formatDate(edu.startDate, edu.endDate, false)}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 mb-3">Habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill.id} className="text-[9px] px-2 py-1 bg-slate-200 text-slate-800 rounded-sm">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}