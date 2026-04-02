import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { guest_id, guest_password } = body;

    if (!guest_id || !guest_password) {
      return NextResponse.json(
        { error: 'Missing guest credentials' },
        { status: 400 }
      );
    }

    const credentials = {
      guest_id: guest_id,
      guest_password: guest_password
    };

    const filePath = join(process.cwd(), 'amine_token.txt');
    writeFileSync(filePath, JSON.stringify(credentials, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Bot started successfully',
      guest_id: guest_id,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
        }
