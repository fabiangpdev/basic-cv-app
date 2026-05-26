'use client';

import { useResumeStore } from '@/store/resumeStore';
import { Language, resumeLabels } from '@/lib/resumeLabels';

function formatDate(startDate: string, endDate: string | undefined, current: boolean, present: string): string {
  if (current) return `${startDate} - ${present}`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function TemplateGrid({ data, lang }: { data: ReturnType<typeof useResumeStore.getState>['resumeData']; lang: Language }) {
  const L = resumeLabels[lang];
  return (
    <div className="bg-white text-slate-900 p-[45px] min-h-[842px] text-[10px]">
      <div className="bg-rose-600 text-white p-5 mb-4">
        <h1 className="text-[24px] font-bold">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <div className="mt-4 text-[9px] text-rose-100 flex gap-4">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
          {data.personalInfo.summary && (
            <>
              <h2 className="text-[11px] font-bold text-rose-700 uppercase mb-2">{L.summary}</h2>
              <p className="text-[9px] text-slate-600">{data.personalInfo.summary}</p>
            </>
          )}
        </div>

        <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
          {data.skills.length > 0 && (
            <>
              <h2 className="text-[11px] font-bold text-rose-700 uppercase mb-2">{L.skills}</h2>
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
          <h2 className="text-[11px] font-bold text-rose-700 uppercase mb-3">{L.experience}</h2>
          <div className="grid grid-cols-2 gap-3">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="border-l-2 border-rose-300 pl-2">
                <p className="text-[10px] font-bold text-slate-800">{exp.position}</p>
                <p className="text-[8px] text-rose-600">{exp.company}</p>
                <p className="text-[7px] text-slate-400">{formatDate(exp.startDate, exp.endDate, exp.current, L.present)}</p>
                {exp.description && <p className="text-[8px] text-slate-500 mt-1">{exp.description}</p>}
              </div>
            ))}
            {data.experiences.length === 0 && <p className="text-[9px] text-slate-400">{L.noExperience}</p>}
          </div>
        </div>

        <div className="col-span-2 bg-rose-50 p-4 rounded-lg border border-rose-100">
          <h2 className="text-[11px] font-bold text-rose-700 uppercase mb-3">{L.education}</h2>
          <div className="grid grid-cols-2 gap-2">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <p className="text-[10px] font-bold text-slate-800">{edu.degree} {edu.field && `${L.inField} ${edu.field}`}</p>
                <p className="text-[8px] text-rose-600">{edu.institution}</p>
                <p className="text-[7px] text-slate-400">{formatDate(edu.startDate, edu.endDate, false, L.present)}</p>
              </div>
            ))}
            {data.education.length === 0 && <p className="text-[9px] text-slate-400">{L.noEducation}</p>}
          </div>
        </div>

        {data.projects.length > 0 && (
          <div className="col-span-2 bg-white border-2 border-rose-200 rounded-lg p-4">
            <h2 className="text-[11px] font-bold text-rose-700 uppercase mb-3">{L.projects}</h2>
            <div className="grid grid-cols-2 gap-3">
              {data.projects.map((project) => (
                <div key={project.id} className="border-l-2 border-rose-300 pl-2">
                  <p className="text-[10px] font-bold text-slate-800">{project.name}</p>
                  <p className="text-[8px] text-rose-600">{project.technologies}</p>
                  <p className="text-[7px] text-slate-400">{formatDate(project.startDate, project.endDate, project.current, L.present)}</p>
                  {project.description && <p className="text-[8px] text-slate-500 mt-1">{project.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
