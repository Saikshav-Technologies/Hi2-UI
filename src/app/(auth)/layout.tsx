'use client';

import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ROUTES } from '../../lib/constants';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // If user is authenticated, redirect to dashboard
        if (!isLoading && isAuthenticated) {
            router.push(ROUTES.DASHBOARD);
        }
    }, [isAuthenticated, isLoading, router]);

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    // If not authenticated, show the auth pages (login/register)
    if (!isAuthenticated) {
        return <>{children}</>;
    }

    // While redirecting, show nothing or a loading state
    return null;
}
