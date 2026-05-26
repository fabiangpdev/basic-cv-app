'use client';

import { useResumeStore } from '@/store/resumeStore';

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function TemplateHorizontal({ data }: { data: ReturnType<typeof useResumeStore.getState>['resumeData'] }) {
  return (
    <div className="bg-white text-slate-900 min-h-[842px] text-[10px] flex flex-col">

      {/* Header band — edge to edge */}
      <div className="bg-cyan-600 text-white px-10 py-6 flex-shrink-0">
        <h1 className="text-[24px] font-bold tracking-wide">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <div className="mt-4 flex flex-wrap gap-4 text-[9px] text-cyan-100">
          {data.personalInfo.email    && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone    && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Summary band */}
      {data.personalInfo.summary && (
        <div className="bg-cyan-50 border-b border-cyan-200 px-10 py-4 flex-shrink-0">
          <p className="text-[10px] text-slate-600 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience band */}
      {data.experiences.length > 0 && (
        <div className="px-10 py-5 border-b border-slate-100 flex-shrink-0">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 mb-3">
            Experiencia
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <p className="font-bold text-[10px] text-slate-800">{exp.position}</p>
                <p className="text-[9px] text-cyan-600 font-medium">{exp.company}</p>
                <p className="text-[9px] text-slate-400">{formatDate(exp.startDate, exp.endDate, exp.current)}</p>
                {exp.description && (
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-relaxed line-clamp-2">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education band */}
      {data.education.length > 0 && (
        <div className="bg-slate-50 px-10 py-5 border-b border-slate-100 flex-shrink-0">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 mb-3">
            Educación
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <p className="font-bold text-[10px] text-slate-800">
                  {edu.degree}{edu.field ? ` — ${edu.field}` : ''}
                </p>
                <p className="text-[9px] text-cyan-600 font-medium">{edu.institution}</p>
                <p className="text-[9px] text-slate-400">{formatDate(edu.startDate, edu.endDate, edu.current)}</p>
                {edu.gpa && <p className="text-[9px] text-slate-400">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills band */}
      {data.skills.length > 0 && (
        <div className="px-10 py-5 border-b border-slate-100 flex-shrink-0">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 mb-3">
            Habilidades
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="text-[9px] px-2.5 py-1 bg-cyan-100 text-cyan-700 rounded-full"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects band */}
      {data.projects.length > 0 && (
        <div className="px-10 py-5 border-b border-slate-100 flex-shrink-0">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 mb-3">
            Proyectos
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <p className="font-bold text-[10px] text-slate-800">{project.name}</p>
                <p className="text-[9px] text-cyan-600 font-medium">{project.technologies}</p>
                <p className="text-[9px] text-slate-400">{formatDate(project.startDate, project.endDate, project.current)}</p>
                {project.description && (
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-relaxed line-clamp-2">{project.description}</p>
                )}
                {project.url && <p className="text-[8px] text-slate-400 mt-0.5">{project.url}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications + Languages band */}
      {(data.certifications.length > 0 || data.languages.length > 0) && (
        <div className="bg-slate-50 px-10 py-5 flex-shrink-0">
          <div className="grid grid-cols-2 gap-8">
            {data.certifications.length > 0 && (
              <div>
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 mb-3">
                  Certificaciones
                </h2>
                <div className="space-y-1.5">
                  {data.certifications.map((cert) => (
                    <div key={cert.id}>
                      <p className="text-[10px] font-medium text-slate-800">{cert.name}</p>
                      <p className="text-[9px] text-slate-400">{cert.issuer} · {cert.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.languages.length > 0 && (
              <div>
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 mb-3">
                  Idiomas
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {data.languages.map((lang) => (
                    <span
                      key={lang.id}
                      className="text-[9px] px-2.5 py-1 border border-cyan-300 text-slate-600 rounded-full"
                    >
                      {lang.language} · {lang.level}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
