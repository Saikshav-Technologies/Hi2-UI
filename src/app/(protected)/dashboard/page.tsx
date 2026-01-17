'use client';

import { useAuth } from '../../../hooks/useAuth';

export default function DashboardPage() {
    const { user, logout } = useAuth();

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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">Welcome, {user?.name || user?.email}</h2>
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
