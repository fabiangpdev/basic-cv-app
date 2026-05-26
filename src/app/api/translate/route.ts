import { NextRequest, NextResponse } from 'next/server';
import { translateResume } from '@/lib/gemini';
import { ResumeData } from '@/types/resume';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const resumeData = body as ResumeData;

    if (!resumeData) {
      return NextResponse.json({ error: 'Invalid resume data' }, { status: 400 });
    }

    const translated = await translateResume(resumeData);
    return NextResponse.json(translated);
  } catch (error) {
    console.error('Translate API error:', error);
    return NextResponse.json({ error: 'Failed to translate resume' }, { status: 500 });
  }
}
