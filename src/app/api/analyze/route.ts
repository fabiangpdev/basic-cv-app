import { NextRequest, NextResponse } from 'next/server';
import { analyzeResume } from '@/lib/gemini';
import { ResumeData } from '@/types/resume';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const resumeData = body as ResumeData;

    if (!resumeData) {
      return NextResponse.json(
        { error: 'Invalid resume data' },
        { status: 400 }
      );
    }

    const analysis = await analyzeResume(resumeData);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Analyze API error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}