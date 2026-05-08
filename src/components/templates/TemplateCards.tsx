'use client';

import { useResumeStore } from '@/store/resumeStore';

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function TemplateCards({ data }: { data: ReturnType<typeof useResumeStore.getState>['resumeData'] }) {
  return (
    <div className="bg-white text-slate-900 p-[45px] h-[842px] text-[10px]">
      <div className="text-center mb-8">
        <h1 className="text-[26px] font-bold text-emerald-700">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <div className="mt-2 text-[9px] text-slate-500 flex justify-center gap-3">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      {data.personalInfo.summary && (
        <section className="mb-6 bg-emerald-50 p-4 rounded-lg border border-emerald-100">
          <h2 className="text-[11px] font-bold text-emerald-800 uppercase mb-2">Resumen Profesional</h2>
          <p className="text-[10px] text-slate-600">{data.personalInfo.summary}</p>
        </section>
      )}

      {data.experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[12px] font-bold text-emerald-700 uppercase mb-3">Experiencia Laboral</h2>
          <div className="grid grid-cols-2 gap-3">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="bg-white border border-emerald-200 rounded-lg p-3 shadow-sm">
                <p className="text-[11px] font-bold text-slate-800">{exp.position}</p>
                <p className="text-[9px] text-emerald-600">{exp.company}</p>
                <p className="text-[8px] text-slate-400 mt-1">{formatDate(exp.startDate, exp.endDate, exp.current)}</p>
                {exp.description && <p className="text-[9px] text-slate-500 mt-2">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[12px] font-bold text-emerald-700 uppercase mb-3">Educación</h2>
          <div className="grid grid-cols-2 gap-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="bg-white border border-emerald-200 rounded-lg p-3 shadow-sm">
                <p className="text-[11px] font-bold text-slate-800">{edu.degree} {edu.field && `en ${edu.field}`}</p>
                <p className="text-[9px] text-emerald-600">{edu.institution}</p>
                <p className="text-[8px] text-slate-400 mt-1">{formatDate(edu.startDate, edu.endDate, false)}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
          <h2 className="text-[11px] font-bold text-emerald-800 uppercase mb-3">Habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill.id} className="text-[9px] px-3 py-1.5 bg-white text-emerald-700 border border-emerald-200 rounded-full shadow-sm">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}