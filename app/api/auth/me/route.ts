import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ success: false, user: null });
    }

    const storedUser = req.cookies.get('user')?.value;

    return NextResponse.json({
      success: true,
      user: storedUser ? JSON.parse(storedUser) : null,
    });
  } catch {
    return NextResponse.json({ success: false, user: null });
  }
}
