import { NextRequest, NextResponse } from 'next/server';
import { heygenService } from '@/lib/services/heygen-service';

export async function GET(request: NextRequest) {
  try {
    console.log('📚 [ROUTE] Listing Knowledge Bases...');

    const knowledgeBases = await heygenService.listKnowledgeBases();

    console.log('📚 [ROUTE] Result:', knowledgeBases);

    if (knowledgeBases !== null && Array.isArray(knowledgeBases)) {
      console.log('📚 [ROUTE] Success! Found', knowledgeBases.length, 'KBs');
      return NextResponse.json({
        success: true,
        data: knowledgeBases,
        count: knowledgeBases.length,
        timestamp: new Date().toISOString(),
      });
    } else if (knowledgeBases === null) {
      console.error('📚 [ROUTE] Service returned null');
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to list Knowledge Bases - service returned null',
          details: 'Check backend logs for HeyGen API errors',
        },
        { status: 500 }
      );
    } else {
      console.error('📚 [ROUTE] Invalid response type:', typeof knowledgeBases);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to list Knowledge Bases - invalid response',
          details: 'Response is not an array',
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('❌ [ROUTE] Knowledge Base list error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to list Knowledge Bases',
        message: error.message,
        details: 'Check backend logs for more information',
      },
      { status: 500 }
    );
  }
}


