'use client';

import { useAuth } from '../../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { usersApi } from '../../../lib/api/users';
import { getUserId } from '../../../lib/auth';
import { User } from '../../../types/auth';

export default function DashboardPage() {
    const { user: contextUser, logout } = useAuth();
    const [user, setUser] = useState<User | null>(contextUser);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = getUserId();
            if (!userId) return;

            setLoading(true);
            setError('');
            try {
                const userData = await usersApi.getUserById(userId);
                setUser(userData);
            } catch (err: any) {
                console.error('Failed to fetch user data:', err);
                setError(err.message || 'Failed to load user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []); // Run once on mount

    if (loading) {
        return (
            <div className="p-8">
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-600">Loading user data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Dashboard - Auth Required</h1>
                <button
                    onClick={() => logout()}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
                >
                    Logout
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
                    {error}
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">
                    Welcome, {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                    This is a protected area. You can only see this if you are authenticated.
                </p>
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded overflow-auto">
                    <h3 className="text-lg font-semibold mb-2 dark:text-white">User Data:</h3>
                    <pre className="text-sm dark:text-gray-300">{JSON.stringify(user, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
}
