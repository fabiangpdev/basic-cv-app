import { create } from 'zustand';
import { ResumeData, initialResumeData, AnalysisResult } from '@/types/resume';
import { Language } from '@/lib/resumeLabels';

export type TemplateType =
  | 'classic'
  | 'modern'
  | 'minimal'
  | 'professional'
  | 'timeline'
  | 'darksidebar'
  | 'cards'
  | 'grid'
  | 'monochrome'
  | 'horizontal';

interface ResumeStore {
  resumeData: ResumeData;
  setResumeData: (data: Partial<ResumeData>) => void;
  resetResume: () => void;
  analysisResult: AnalysisResult | null;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
  selectedTemplate: TemplateType;
  setSelectedTemplate: (template: TemplateType) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: initialResumeData,
  setResumeData: (data) =>
    set((state) => ({
      resumeData: { ...state.resumeData, ...data },
    })),
  resetResume: () => set({ resumeData: initialResumeData, analysisResult: null }),
  analysisResult: null,
  setAnalysisResult: (result) => set({ analysisResult: result }),
  isAnalyzing: false,
  setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
  selectedTemplate: 'classic',
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  language: 'es',
  setLanguage: (lang) => set({ language: lang }),
}));