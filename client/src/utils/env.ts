// src/utils/env.ts

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value || value === 'None' || value === '') {
    throw new Error(`Environment variable ${name} is missing or empty.`);
  }
  return value;
}

export const RUNPOD_API_KEY = getEnvVar('RUNPOD_API_KEY');
export const RUNPOD_ENDPOINT_ID = getEnvVar('RUNPOD_ENDPOINT_ID');
export const RUNPOD_MODEL_NAME = getEnvVar('RUNPOD_MODEL_NAME'); 