import ImpactClient from '@/app/impact/ImpactClient';

// This function will be called at build time
export async function generateStaticParams() {
  return [];
}

// This is a Server Component by default (no 'use client' directive)
async function getImpactMessage() {
  // During build time, return a static message
  if (process.env.NODE_ENV === 'production') {
    return { message: "Hello World" };
  }

  // During development, fetch from the API
  try {
    const res = await fetch('http://localhost:3000/api/impact', {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch impact message');
    }
    
    return res.json();
  } catch (error) {
    // Fallback to static message if fetch fails
    console.error('Error fetching impact message:', error);
    return { message: "Hello World" };
  }
}

export default async function Impact() {
  const { message } = await getImpactMessage();
  return <ImpactClient message={message} />;
} 