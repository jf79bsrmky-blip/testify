import { NextRequest, NextResponse } from 'next/server';
import { knowledgeBases } from '@/lib/storage';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const kb = knowledgeBases.find((kb) => kb.id === id);

    if (!kb) {
      return NextResponse.json(
        {
          success: false,
          error: 'Knowledge base not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      knowledgeBase: kb,
    });
  } catch (err: any) {
    console.error('❌ Knowledge base GET error:', err.message);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get knowledge base',
        message: err.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const index = knowledgeBases.findIndex((kb) => kb.id === id);
    if (index === -1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Knowledge base not found',
        },
        { status: 404 }
      );
    }

    const updated = {
      id,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    knowledgeBases[index] = updated;

    return NextResponse.json({
      success: true,
      knowledgeBase: updated,
    });
  } catch (err: any) {
    console.error('❌ Knowledge base PUT error:', err.message);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update knowledge base',
        message: err.message,
      },
      { status: 500 }
    );
  }
}
