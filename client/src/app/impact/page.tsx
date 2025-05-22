import ImpactClient from './ImpactClient';

// This is a Server Component by default (no 'use client' directive)
async function getImpactMessage() {
  // This fetch will be executed on the server
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/impact`, {
    cache: 'no-store' // This ensures we get fresh data on each request
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch impact message');
  }
  
  return res.json();
}

export default async function Impact() {
  const { message } = await getImpactMessage();
  return <ImpactClient message={message} />;
} 