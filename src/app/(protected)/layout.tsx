'use client';

import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { ROUTES } from '../../lib/constants';
import { getAccessToken } from '../../lib/auth';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const hasAccessToken = typeof window !== 'undefined' && !!getAccessToken();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !hasAccessToken) {
      router.push(ROUTES.ONBOARDING);
    }
  }, [isLoading, isAuthenticated, hasAccessToken, router]);

  if (isLoading || (!isAuthenticated && hasAccessToken)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // or a redirecting message
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main>{children}</main>
    </div>
  );
}
