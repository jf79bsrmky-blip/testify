import { NextRequest, NextResponse } from 'next/server';

// For single server: Use BACKEND_URL (server-side env var)
// For public deployments: Use NEXT_PUBLIC_BACKEND_URL
// Default: localhost for single server
const BACKEND_URL =
  process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: 'No file provided',
        },
        { status: 400 }
      );
    }

    // Proxy to backend upload endpoint (stores in backend storage)
    const backendFormData = new FormData();
    backendFormData.append('file', file);

    console.log('📤 Proxying KB upload to backend:', file.name);
    const response = await fetch(`${BACKEND_URL}/api/knowledge-base/upload`, {
      method: 'POST',
      body: backendFormData,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Backend upload failed:', response.status, errorBody);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to upload knowledge base to backend',
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Backend upload successful:', data);
    
    // Backend returns: {success: true, knowledgeBaseId: uuid, fileName, contentLength, timestamp}
    // Map to frontend format for compatibility
    return NextResponse.json({
      success: true,
      knowledgeBaseId: data.knowledgeBaseId, // Backend returns knowledgeBaseId (UUID)
      knowledgeBase: {
        id: data.knowledgeBaseId, // Also include in knowledgeBase for compatibility
        name: data.fileName,
        characterCount: data.contentLength,
        uploadedAt: data.timestamp,
      },
    });
  } catch (error: any) {
    console.error('Knowledge base upload error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to upload knowledge base',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Proxy to backend to get list of uploaded KBs
    const response = await fetch(`${BACKEND_URL}/api/knowledge-base`, {
      method: 'GET',
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch knowledge bases from backend',
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Knowledge base list error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to list knowledge bases',
      },
      { status: 500 }
    );
  }
}
