'use client';

import { useResumeStore } from '@/store/resumeStore';
import { testResumeData } from '@/data/testData';
import { useEffect } from 'react';

export function useLoadTestData() {
  const setResumeData = useResumeStore((state) => state.setResumeData);
  const resumeData = useResumeStore((state) => state.resumeData);

  useEffect(() => {
    const hasData = resumeData.personalInfo.firstName || resumeData.personalInfo.lastName;
    if (!hasData) {
      setResumeData(testResumeData);
    }
  }, []);

  const loadTestData = () => {
    setResumeData(testResumeData);
  };

  const clearData = () => {
    useResumeStore.getState().setResumeData({
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
      },
      experiences: [],
      education: [],
      skills: [],
      certifications: [],
      languages: [],
    });
  };

  return { loadTestData, clearData };
}