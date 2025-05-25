import { NextRequest } from 'next/server';

const RUNPOD_API_KEY = process.env.NEXT_PUBLIC_RUNPOD_API_KEY;
const RUNPOD_ENDPOINT_ID = process.env.NEXT_PUBLIC_RUNPOD_LLAMA_8B_INSTRUCT_FP8;
const LLM_INSTANCE_URL = process.env.NEXT_PUBLIC_GPU_INSTANCE_URL;

const RUNPOD_ENDPOINT_URL = `${LLM_INSTANCE_URL}/${RUNPOD_ENDPOINT_ID}/run`;
const RUNPOD_STATUS_URL = `${LLM_INSTANCE_URL}/${RUNPOD_ENDPOINT_ID}/status`;

export const runtime = 'edge'; // Enable streaming

function extractTextFromOutput(output: any): string {
  try {
    console.log(output);
    if (
      output &&
      Array.isArray(output) &&
      output[0]?.choices &&
      Array.isArray(output[0].choices) &&
      output[0].choices[0]?.tokens
    ) {
      return output[0].choices[0].tokens.join('');
    }
    return JSON.stringify(output);
  } catch {
    return String(output);
  }
}

async function pollForResult(jobId: string, maxAttempts = 30, interval = 10000) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await new Promise((r) => setTimeout(r, interval));
    const res = await fetch(`${RUNPOD_STATUS_URL}/${jobId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RUNPOD_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (data.status === 'COMPLETED') {
      return data.output;
    }
    if (data.status === 'FAILED') {
      throw new Error('Job failed');
    }
  }
  throw new Error('Timed out waiting for job result');
}

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const response = await fetch(RUNPOD_ENDPOINT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RUNPOD_API_KEY}`,
    },
    body: JSON.stringify({ input: { prompt } }),
  });

  const data = await response.json();

  if (data.id) {
    // Poll for result
    try {
      const output = await pollForResult(data.id);
      const text = extractTextFromOutput(output);
      return new Response(JSON.stringify({ output: text }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
  } else {
    return new Response(JSON.stringify(data), { status: response.status });
  }
} 