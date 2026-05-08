'use client';

import { useResumeStore } from '@/store/resumeStore';

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function TemplateGrid({ data }: { data: ReturnType<typeof useResumeStore.getState>['resumeData'] }) {
  return (
    <div className="bg-white text-slate-900 p-[45px] h-[842px] text-[10px]">
      <div className="bg-rose-600 text-white p-5 mb-4">
        <h1 className="text-[24px] font-bold">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <div className="mt-2 text-[9px] text-rose-100 flex gap-4">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
          {data.personalInfo.summary && (
            <>
              <h2 className="text-[11px] font-bold text-rose-700 uppercase mb-2">Resumen</h2>
              <p className="text-[9px] text-slate-600">{data.personalInfo.summary}</p>
            </>
          )}
        </div>

        <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
          {data.skills.length > 0 && (
            <>
              <h2 className="text-[11px] font-bold text-rose-700 uppercase mb-2">Habilidades</h2>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((skill) => (
                  <span key={skill.id} className="text-[8px] px-2 py-0.5 bg-white text-rose-700 border border-rose-200 rounded">
                    {skill.name}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="col-span-2 bg-white border-2 border-rose-200 rounded-lg p-4">
          <h2 className="text-[11px] font-bold text-rose-700 uppercase mb-3">Experiencia</h2>
          <div className="grid grid-cols-2 gap-3">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="border-l-2 border-rose-300 pl-2">
                <p className="text-[10px] font-bold text-slate-800">{exp.position}</p>
                <p className="text-[8px] text-rose-600">{exp.company}</p>
                <p className="text-[7px] text-slate-400">{formatDate(exp.startDate, exp.endDate, exp.current)}</p>
                {exp.description && <p className="text-[8px] text-slate-500 mt-1">{exp.description}</p>}
              </div>
            ))}
            {data.experiences.length === 0 && <p className="text-[9px] text-slate-400">Sin experiencia</p>}
          </div>
        </div>

        <div className="col-span-2 bg-rose-50 p-4 rounded-lg border border-rose-100">
          <h2 className="text-[11px] font-bold text-rose-700 uppercase mb-3">Educación</h2>
          <div className="grid grid-cols-2 gap-2">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <p className="text-[10px] font-bold text-slate-800">{edu.degree} {edu.field && `en ${edu.field}`}</p>
                <p className="text-[8px] text-rose-600">{edu.institution}</p>
                <p className="text-[7px] text-slate-400">{formatDate(edu.startDate, edu.endDate, false)}</p>
              </div>
            ))}
            {data.education.length === 0 && <p className="text-[9px] text-slate-400">Sin educación</p>}
          </div>
        </div>
      </div>
    </div>
  );
}