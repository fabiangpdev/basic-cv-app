export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'technical' | 'soft' | 'language' | 'tool';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Language {
  id: string;
  language: string;
  level: 'basic' | 'intermediate' | 'advanced' | 'native';
}

export interface ResumeData {
  id?: string;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  languages: Language[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AnalysisResult {
  score: number;
  suggestions: string[];
  keywords: string[];
  atsFriendly: boolean;
  issues: ATSIssue[];
}

export interface ATSIssue {
  type: 'critical' | 'warning' | 'info';
  message: string;
  field?: string;
}

export const initialResumeData: ResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
    summary: '',
  },
  experiences: [],
  education: [],
  skills: [],
  certifications: [],
  languages: [],
};