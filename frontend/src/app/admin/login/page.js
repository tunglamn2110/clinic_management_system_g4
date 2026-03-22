"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This admin login page has been removed in favor of the single main login.
export default function AdminLoginRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/login');
  }, [router]);
  return null;
}
