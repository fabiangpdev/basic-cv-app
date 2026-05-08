'use client';

import { useResumeStore } from '@/store/resumeStore';

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function TemplateHorizontal({ data }: { data: ReturnType<typeof useResumeStore.getState>['resumeData'] }) {
  return (
    <div className="bg-white text-slate-900 p-[45px] h-[842px] text-[10px]">
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white p-6 mb-4 rounded-b-xl">
        <h1 className="text-[26px] font-bold">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <div className="mt-2 text-[9px] text-cyan-100 flex gap-4">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      {data.personalInfo.summary && (
        <section className="mb-4 p-3 bg-cyan-50 border-l-4 border-cyan-500">
          <p className="text-[10px] text-slate-700">{data.personalInfo.summary}</p>
        </section>
      )}

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <h2 className="text-[11px] font-bold text-cyan-700 uppercase mb-2">Experiencia</h2>
          <div className="space-y-2">
            {data.experiences.slice(0, 3).map((exp) => (
              <div key={exp.id} className="text-[9px]">
                <p className="font-bold text-slate-800">{exp.position}</p>
                <p className="text-slate-500">{exp.company} · {formatDate(exp.startDate, exp.endDate, exp.current)}</p>
              </div>
            ))}
            {data.experiences.length === 0 && <p className="text-[9px] text-slate-400">Sin experiencia</p>}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-[11px] font-bold text-cyan-700 uppercase mb-2">Educación</h2>
          <div className="space-y-2">
            {data.education.slice(0, 3).map((edu) => (
              <div key={edu.id} className="text-[9px]">
                <p className="font-bold text-slate-800">{edu.degree} {edu.field && `en ${edu.field}`}</p>
                <p className="text-slate-500">{edu.institution}</p>
              </div>
            ))}
            {data.education.length === 0 && <p className="text-[9px] text-slate-400">Sin educación</p>}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-[11px] font-bold text-cyan-700 uppercase mb-2">Habilidades</h2>
          <div className="flex flex-wrap gap-1">
            {data.skills.slice(0, 8).map((skill) => (
              <span key={skill.id} className="text-[8px] px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded">
                {skill.name}
              </span>
            ))}
            {data.skills.length === 0 && <p className="text-[9px] text-slate-400">Sin habilidades</p>}
          </div>
        </div>
      </div>
    </div>
  );
}