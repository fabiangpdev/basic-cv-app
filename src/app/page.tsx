'use client';

import { useResumeStore } from '@/store/resumeStore';
import { ResumeForm } from '@/components/ResumeForm';
import { ResumePreview } from '@/components/ResumePreview';
import { ATSChecklist } from '@/components/ATSChecklist';
import { AnalysisResult } from '@/components/AnalysisResult';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Eye, Sparkles, LayoutTemplate, Languages } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const { resumeData, analysisResult, isAnalyzing, setIsAnalyzing, setAnalysisResult, setResumeData, setLanguage } = useResumeStore();
  const [activeTab, setActiveTab] = useState('editor');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    setIsTranslating(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData),
      });
      const translated = await response.json();
      setResumeData(translated);
      setLanguage('en');
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData),
      });
      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen app-background">
      <header className="border-b border-subtle/50 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
              <LayoutTemplate className="h-3.5 w-3.5 text-primary" />
            </div>
            <h1 className="text-[13px] font-medium text-foreground/90">ATS-CV</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleTranslate}
              disabled={isTranslating || isAnalyzing}
              className="h-7 text-[11px] gap-1.5 border-subtle hover:bg-primary/5 transition-colors"
            >
              <Languages className={`h-3 w-3 ${isTranslating ? 'animate-spin' : ''}`} />
              {isTranslating ? 'Traduciendo...' : 'ES → EN'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAnalyze}
              disabled={isAnalyzing || isTranslating}
              className="h-7 text-[11px] gap-1.5 border-subtle hover:bg-primary/5 transition-colors"
            >
              <Sparkles className={`h-3 w-3 ${isAnalyzing ? 'animate-spin' : ''}`} />
              {isAnalyzing ? 'Analizando...' : 'Analizar'}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8 space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full mb-4 bg-transparent border-b border-subtle/50 h-auto p-0 rounded-none">
                <TabsTrigger 
                  value="editor" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2.5 text-[12px] text-muted-foreground data-[state=active]:text-primary transition-colors"
                >
                  <FileText className="h-3.5 w-3.5 mr-1.5" />
                  Editor
                </TabsTrigger>
                <TabsTrigger 
                  value="preview" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2.5 text-[12px] text-muted-foreground data-[state=active]:text-primary transition-colors"
                >
                  <Eye className="h-3.5 w-3.5 mr-1.5" />
                  Preview
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="mt-0 animate-fade-in">
                <ResumeForm />
              </TabsContent>

              <TabsContent value="preview" className="mt-0 animate-fade-in">
                <Card className="border-subtle/50 bg-card/60">
                  <CardHeader className="py-3 border-b border-subtle/50">
                    <CardTitle className="text-[13px] font-normal text-foreground/80">Vista Previa</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ResumePreview />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="animate-slide-up stagger-1">
              <ATSChecklist />
            </div>
            
            {analysisResult && <AnalysisResult />}
          </div>
        </div>
      </main>
    </div>
  );
}