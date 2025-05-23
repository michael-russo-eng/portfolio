'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HobbiesPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/hobbies/chess');
  }, [router]);

  return null;
} 