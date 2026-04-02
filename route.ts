import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
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

    // Create credentials file
    const credentials = {
      [guest_id]: guest_password
    };

    // Save to file
    const filePath = join(process.cwd(), 'amine_token.txt');
    writeFileSync(filePath, JSON.stringify(credentials, null, 2), 'utf-8');

    // Here you would trigger your Python backend
    // For now, we'll simulate the bot process
    console.log(`Bot started for Guest ID: ${guest_id}`);
    console.log(`Credentials saved to: ${filePath}`);

    // In production, you would make a request to your Python API
    // const pythonResponse = await fetch('http://localhost:5000/api/start-bot', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ guest_id, guest_password })
    // });

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