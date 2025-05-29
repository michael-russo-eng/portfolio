import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { RUNPOD_API_KEY, RUNPOD_ENDPOINT_ID, RUNPOD_MODEL_NAME } from '@/utils/env';

const openai = new OpenAI({
  apiKey: RUNPOD_API_KEY,
  baseURL: `https://api.runpod.ai/v2/${RUNPOD_ENDPOINT_ID}/openai/v1`,
});

export const runtime = 'nodejs'; // Not 'edge', so we can use the OpenAI SDK

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  console.log("Chat Prompt", prompt);
  const stream = await openai.chat.completions.create({
    model: RUNPOD_MODEL_NAME,
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7,
    max_tokens: 800,
    stream: true,
  });

  // Stream the response to the client as plain text
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const delta = chunk.choices?.[0]?.delta?.content || '';
        if (delta) {
          controller.enqueue(encoder.encode(delta));
        }
      }
      controller.close();
    }
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
} 