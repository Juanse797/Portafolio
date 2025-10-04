import { generateProjectReadMeSummary } from '@/ai/flows/generate-project-readme-summary';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { readmeContent } = body;

    if (!readmeContent) {
      return NextResponse.json({ error: 'No content provided to summarize.' }, { status: 400 });
    }

    const result = await generateProjectReadMeSummary({ readmeContent });
    return NextResponse.json({ summary: result.summary });

  } catch (error) {
    console.error('Error in summary API route:', error);
    return NextResponse.json({ error: 'Could not generate summary at this time. Please try again later.' }, { status: 500 });
  }
}
