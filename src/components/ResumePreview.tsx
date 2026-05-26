'use client';

import { useResumeStore } from '@/store/resumeStore';
import { Download, FileText } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { TemplateCarousel } from './TemplateCarousel';
import { TestDataLoader } from './TestDataLoader';
import { testResumeData } from '@/data/testData';
import { useEffect, useRef, useState, useMemo } from 'react';
import {
  TemplateClassic,
  TemplateModern,
  TemplateMinimal,
  TemplateProfessional,
  TemplateTimeline,
  TemplateDarkSidebar,
  TemplateCards,
  TemplateGrid,
  TemplateMonochrome,
  TemplateHorizontal,
} from './templates';
import {
  ResumePDFClassic,
  ResumePDFModern,
  ResumePDFMinimal,
  ResumePDFProfessional,
  ResumePDFTimeline,
  ResumePDFDarkSidebar,
  ResumePDFCards,
  ResumePDFGrid,
  ResumePDFMonochrome,
  ResumePDFHorizontal,
} from './templates/pdf';

const SHOW_TEST_LOADER = true;

export function ResumePreview() {
  const { resumeData, selectedTemplate, setResumeData } = useResumeStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const templateRef  = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [templateHeight, setTemplateHeight] = useState(842);

  useEffect(() => {
    if (!resumeData.personalInfo.firstName) {
      setResumeData(testResumeData);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      if (containerRef.current) setScale(containerRef.current.offsetWidth / 595);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (templateRef.current) setTemplateHeight(templateRef.current.scrollHeight);
  }, [resumeData, selectedTemplate]);

  const pdfDocument = useMemo(() => {
    switch (selectedTemplate) {
      case 'modern':       return <ResumePDFModern       data={resumeData} />;
      case 'minimal':      return <ResumePDFMinimal      data={resumeData} />;
      case 'professional': return <ResumePDFProfessional data={resumeData} />;
      case 'timeline':     return <ResumePDFTimeline     data={resumeData} />;
      case 'darksidebar':  return <ResumePDFDarkSidebar  data={resumeData} />;
      case 'cards':        return <ResumePDFCards        data={resumeData} />;
      case 'grid':         return <ResumePDFGrid         data={resumeData} />;
      case 'monochrome':   return <ResumePDFMonochrome   data={resumeData} />;
      case 'horizontal':   return <ResumePDFHorizontal   data={resumeData} />;
      default:             return <ResumePDFClassic      data={resumeData} />;
    }
  }, [resumeData, selectedTemplate]);

  const hasContent = resumeData.personalInfo.firstName || resumeData.personalInfo.lastName;

  if (!hasContent) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="h-8 w-8 text-muted mb-3" />
        <p className="text-sm text-muted-foreground">Sin información</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {SHOW_TEST_LOADER && <TestDataLoader />}
      <TemplateCarousel />

      <div ref={containerRef} className="w-full py-4">
        <div
          className="relative mx-auto"
          style={{ width: `${595 * scale}px`, height: `${templateHeight * scale}px` }}
        >
          <div
            ref={templateRef}
            className="absolute top-0 left-0 shadow-xl border border-gray-200"
            style={{ width: 595, transform: `scale(${scale})`, transformOrigin: 'top left' }}
          >
            {selectedTemplate === 'classic'      && <TemplateClassic      data={resumeData} />}
            {selectedTemplate === 'modern'       && <TemplateModern       data={resumeData} />}
            {selectedTemplate === 'minimal'      && <TemplateMinimal      data={resumeData} />}
            {selectedTemplate === 'professional' && <TemplateProfessional data={resumeData} />}
            {selectedTemplate === 'timeline'     && <TemplateTimeline     data={resumeData} />}
            {selectedTemplate === 'darksidebar'  && <TemplateDarkSidebar  data={resumeData} />}
            {selectedTemplate === 'cards'        && <TemplateCards        data={resumeData} />}
            {selectedTemplate === 'grid'         && <TemplateGrid         data={resumeData} />}
            {selectedTemplate === 'monochrome'   && <TemplateMonochrome   data={resumeData} />}
            {selectedTemplate === 'horizontal'   && <TemplateHorizontal   data={resumeData} />}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        {typeof window !== 'undefined' && (
          <PDFDownloadLink
            document={pdfDocument}
            fileName={`${resumeData.personalInfo.firstName || 'resume'}.pdf`}
          >
            {({ loading }) => (
              <Button size="sm" variant="outline" className="gap-2">
                <Download className="h-3.5 w-3.5" />
                {loading ? 'Generando...' : 'Descargar PDF'}
              </Button>
            )}
          </PDFDownloadLink>
        )}
      </div>
    </div>
  );
}
