import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate a database query or external API call
  const message = "Hello World";
  
  return NextResponse.json({ message });
} 