import { ResumeData, AnalysisResult, ATSIssue } from '@/types/resume';

// ─── Shared Ollama client ────────────────────────────────────────────────────

async function callOllama(prompt: string): Promise<string> {
  const model = process.env.OLLAMA_MODEL || 'llama3.2';

  const response = await fetch('https://ollama.com/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OLLAMA_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      stream: false,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${response.status} ${response.statusText}: ${body}`);
  }

  const data = await response.json();
  return data.message?.content ?? data.choices?.[0]?.message?.content ?? '';
}

// ─── Analysis ────────────────────────────────────────────────────────────────

function formatResumeAsText(data: ResumeData): string {
  const lines: string[] = [];
  const p = data.personalInfo;

  lines.push(`NOMBRE: ${p.firstName} ${p.lastName}`);
  if (p.email)     lines.push(`EMAIL: ${p.email}`);
  if (p.phone)     lines.push(`TELÉFONO: ${p.phone}`);
  if (p.location)  lines.push(`UBICACIÓN: ${p.location}`);
  if (p.linkedin)  lines.push(`LINKEDIN: ${p.linkedin}`);
  if (p.portfolio) lines.push(`PORTFOLIO: ${p.portfolio}`);

  if (p.summary) {
    lines.push('\nRESUMEN PROFESIONAL');
    lines.push(p.summary);
  }

  if (data.experiences.length > 0) {
    lines.push('\nEXPERIENCIA LABORAL');
    data.experiences.forEach(exp => {
      lines.push(`${exp.position} — ${exp.company}`);
      lines.push(`${exp.startDate} - ${exp.current ? 'Actual' : exp.endDate}`);
      if (exp.description) lines.push(exp.description);
    });
  }

  if (data.education.length > 0) {
    lines.push('\nEDUCACIÓN');
    data.education.forEach(edu => {
      lines.push(`${edu.degree}${edu.field ? ` en ${edu.field}` : ''} — ${edu.institution}`);
      lines.push(`${edu.startDate} - ${edu.current ? 'Actual' : edu.endDate}`);
      if (edu.gpa) lines.push(`GPA: ${edu.gpa}`);
    });
  }

  if (data.skills.length > 0) {
    lines.push('\nHABILIDADES');
    lines.push(data.skills.map(s => s.name).join(', '));
  }

  if (data.certifications.length > 0) {
    lines.push('\nCERTIFICACIONES');
    data.certifications.forEach(c => lines.push(`${c.name} — ${c.issuer} (${c.date})`));
  }

  if (data.languages.length > 0) {
    lines.push('\nIDIOMAS');
    lines.push(data.languages.map(l => `${l.language} (${l.level})`).join(', '));
  }

  if (data.projects.length > 0) {
    lines.push('\nPROYECTOS');
    data.projects.forEach(proj => {
      lines.push(proj.name);
      lines.push(`Tecnologías: ${proj.technologies}`);
      lines.push(`${proj.startDate} - ${proj.current ? 'Actual' : proj.endDate}`);
      if (proj.description) lines.push(proj.description);
      if (proj.url)         lines.push(proj.url);
    });
  }

  return lines.join('\n');
}

const ANALYSIS_PROMPT = (data: ResumeData) =>
  `Eres un experto en optimización de currículums para sistemas ATS (Applicant Tracking System).

CONTEXTO IMPORTANTE: Este currículum será exportado como un archivo PDF con texto seleccionable y completamente legible por sistemas ATS. NO hagas sugerencias sobre el formato del archivo (PDF, Word, etc.) ya que el formato de salida es PDF con texto real, que es totalmente compatible con ATS. Enfócate ÚNICAMENTE en el contenido: palabras clave, estructura de secciones, descripciones, logros y relevancia.

Analiza el contenido del siguiente currículum y proporciona:
- Una puntuación del 0 al 100 basada en la calidad del contenido
- Palabras clave relevantes presentes o que deberían añadirse
- Sugerencias concretas para mejorar el contenido
- Problemas de contenido que puedan reducir la compatibilidad con ATS

CURRÍCULUM:
${formatResumeAsText(data)}

Responde ÚNICAMENTE con un objeto JSON válido, sin texto adicional, todo en español:
{
  "score": number,
  "suggestions": string[],
  "keywords": string[],
  "atsFriendly": boolean,
  "issues": [{ "type": "critical|warning|info", "message": "string", "field": "string?" }]
}`;

export async function analyzeResume(resumeData: ResumeData): Promise<AnalysisResult> {
  if (process.env.OLLAMA_API_KEY) {
    try {
      const text = await callOllama(ANALYSIS_PROMPT(resumeData));
      return parseAnalysisResponse(text, resumeData);
    } catch (error) {
      console.error('Ollama analysis error:', error);
    }
  }
  return getMockAnalysis(resumeData);
}

function parseAnalysisResponse(text: string, resumeData: ResumeData): AnalysisResult {
  try {
    return JSON.parse(text) as AnalysisResult;
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try { return JSON.parse(match[0]) as AnalysisResult; } catch { /* fall through */ }
    }
    return getMockAnalysis(resumeData);
  }
}

function getMockAnalysis(resumeData: ResumeData): AnalysisResult {
  const issues: ATSIssue[] = [];

  if (!resumeData.personalInfo.email)
    issues.push({ type: 'critical', message: 'Falta el correo electrónico', field: 'personalInfo.email' });
  if (!resumeData.personalInfo.phone)
    issues.push({ type: 'warning', message: 'Falta el número de teléfono', field: 'personalInfo.phone' });
  if (resumeData.experiences.length === 0)
    issues.push({ type: 'warning', message: 'No se agregó experiencia laboral', field: 'experiences' });
  if (resumeData.skills.length === 0)
    issues.push({ type: 'warning', message: 'No se agregaron habilidades', field: 'skills' });
  if (resumeData.personalInfo.summary.length < 50)
    issues.push({ type: 'info', message: 'El resumen profesional podría ser más detallado', field: 'personalInfo.summary' });

  const score = Math.max(
    0,
    100
      - issues.filter(i => i.type === 'critical').length * 20
      - issues.filter(i => i.type === 'warning').length * 10
  );

  return {
    score,
    suggestions: [
      'Agrega un resumen profesional al inicio del currículum',
      'Incluye palabras clave relevantes de la oferta de trabajo',
      'Usa encabezados estándar (Experiencia, Educación, Habilidades)',
      'Mantén el formato simple y consistente',
    ],
    keywords: ['Currículum', 'Experiencia', 'Habilidades', 'Educación'],
    atsFriendly: issues.filter(i => i.type === 'critical').length === 0,
    issues,
  };
}

// ─── Translation ─────────────────────────────────────────────────────────────

const TRANSLATE_PROMPT = (data: ResumeData) =>
  `Eres un traductor profesional de currículums. Traduce el siguiente currículum del español al inglés.

REGLAS:
- Traduce SOLO los campos narrativos: resumen, descripciones, títulos de cargo, título académico, carrera/campo de estudio, nombres de habilidades, nombres de certificaciones, nombres y descripciones de proyectos, nombres de idiomas (ej: "Español" → "Spanish")
- NO traduzcas: nombres de empresas, nombres de instituciones, tecnologías (React, Node.js, Docker…), URLs, nombres de personas, fechas, niveles de idioma
- Mantén EXACTAMENTE la misma estructura JSON con todos los campos e IDs intactos
- Responde ÚNICAMENTE con el JSON válido, sin texto adicional ni markdown

CURRÍCULUM:
${JSON.stringify(data, null, 2)}`;

export async function translateResume(resumeData: ResumeData): Promise<ResumeData> {
  if (!process.env.OLLAMA_API_KEY) return resumeData;

  try {
    const text = await callOllama(TRANSLATE_PROMPT(resumeData));
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]) as ResumeData;
  } catch (error) {
    console.error('Ollama translation error:', error);
  }

  return resumeData;
}
