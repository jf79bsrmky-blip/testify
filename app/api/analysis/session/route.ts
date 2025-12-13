import { NextRequest, NextResponse } from 'next/server';
import { TranscriptEntry, SessionReportData } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { transcript, durationSeconds } = await req.json();

    // Basic AI scoring logic (mock for now)
    const score = (min = 60, max = 95) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const report: SessionReportData = {
      overallScore: score(),
      metrics: {
        accuracy: score(),
        clarity: score(),
        tone: score(),
        pace: score(),
      },
      highlights: ['Great effort!', 'Good clarity in responses'],
      recommendations: ['Pause before answering', 'Focus on clarity'],
      durationSeconds: durationSeconds || 0,
      summary: 'Automated analysis summary.',
      flaggedSegments: [],
    };

    return NextResponse.json({
      success: true,
      analysis: report,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
