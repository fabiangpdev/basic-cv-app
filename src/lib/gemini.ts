import { GoogleGenerativeAI } from '@google/generative-ai';
import { ResumeData, AnalysisResult, ATSIssue } from '@/types/resume';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function analyzeResume(resumeData: ResumeData): Promise<AnalysisResult> {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey || apiKey === 'your-google-api-key-here') {
    return getMockAnalysis(resumeData);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Analyze this resume for ATS (Applicant Tracking System) compatibility. Provide a score from 0-100, list of missing keywords, suggestions for improvement, and identify any issues that would make it not ATS-friendly.

Resume:
${JSON.stringify(resumeData, null, 2)}

Respond in JSON format:
{
  "score": number,
  "suggestions": string[],
  "keywords": string[],
  "atsFriendly": boolean,
  "issues": [{ "type": "critical|warning|info", "message": "string", "field": "string?" }]
}`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    try {
      return JSON.parse(response) as AnalysisResult;
    } catch {
      return parseGeminiResponse(response, resumeData);
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    return getMockAnalysis(resumeData);
  }
}

function parseGeminiResponse(response: string, resumeData: ResumeData): AnalysisResult {
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]) as AnalysisResult;
    } catch {
      return getMockAnalysis(resumeData);
    }
  }
  return getMockAnalysis(resumeData);
}

function getMockAnalysis(resumeData: ResumeData): AnalysisResult {
  const issues: ATSIssue[] = [];

  if (!resumeData.personalInfo.email) {
    issues.push({ type: 'critical', message: 'Missing email address', field: 'personalInfo.email' });
  }
  if (!resumeData.personalInfo.phone) {
    issues.push({ type: 'warning', message: 'Missing phone number', field: 'personalInfo.phone' });
  }
  if (resumeData.experiences.length === 0) {
    issues.push({ type: 'warning', message: 'No work experience added', field: 'experiences' });
  }
  if (resumeData.skills.length === 0) {
    issues.push({ type: 'warning', message: 'No skills added', field: 'skills' });
  }
  if (resumeData.personalInfo.summary.length < 50) {
    issues.push({ type: 'info', message: 'Professional summary could be more detailed', field: 'personalInfo.summary' });
  }

  const score = Math.max(
    0,
    100 - issues.filter(i => i.type === 'critical').length * 20 - issues.filter(i => i.type === 'warning').length * 10
  );

  return {
    score,
    suggestions: [
      'Add a professional summary at the top',
      'Include relevant keywords from the job description',
      'Use standard section headings (Experience, Education, Skills)',
      'Keep formatting simple and consistent',
    ],
    keywords: ['Resume', 'Experience', 'Skills', 'Education'],
    atsFriendly: issues.filter(i => i.type === 'critical').length === 0,
    issues,
  };
}