import { NextRequest, NextResponse } from 'next/server';
import { openaiService } from '@/lib/services/openai-service';
import { heygenService } from '@/lib/services/heygen-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, knowledgeBase, history, model } = body;

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }

    let responseText = '';

    // 🌟 Use OpenAI if requested or default
    if (model === 'openai' || !model) {
      const result = await openaiService.processMessage(
        prompt,
        history || [],
        knowledgeBase || ''
      );

      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 500 }
        );
      }

      responseText = result.response || '';
    }

 if (model === 'heygen') {
  console.warn("⚠️ HeyGen LLM not supported in this version. Falling back to OpenAI.");
  // Fallback to OpenAI automatically
  responseText = await openaiService.processQuery(prompt, knowledgeBase || '') || '';
}


    return NextResponse.json({
      success: true,
      response: responseText,
    });
  } catch (error: any) {
    console.error('LLM process error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
