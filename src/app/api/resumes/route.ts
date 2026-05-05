import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ResumeData } from '@/types/resume';

export async function GET() {
  try {
    const resumes = await prisma.resume.findMany({
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json(resumes);
  } catch (error) {
    console.error('GET resumes error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resumes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const resumeData = body as ResumeData;

    const resume = await prisma.resume.create({
      data: {
        personalInfo: JSON.stringify(resumeData.personalInfo),
        experiences: JSON.stringify(resumeData.experiences),
        education: JSON.stringify(resumeData.education),
        skills: JSON.stringify(resumeData.skills),
        certifications: JSON.stringify(resumeData.certifications),
        languages: JSON.stringify(resumeData.languages),
      },
    });

    return NextResponse.json(resume);
  } catch (error) {
    console.error('POST resume error:', error);
    return NextResponse.json(
      { error: 'Failed to create resume' },
      { status: 500 }
    );
  }
}