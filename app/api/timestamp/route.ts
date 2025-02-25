import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const timestamp = Date.now().toString();
    return NextResponse.json({ timestamp });
  } catch (error) {
    return NextResponse.json({ error: `Failed to generate hash: ${error}` }, { status: 500 });
  }
}
