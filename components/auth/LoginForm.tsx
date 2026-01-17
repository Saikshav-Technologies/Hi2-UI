'use client';

import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function LoginForm() {
    const { login, isLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            await login({ email, password });
        } catch (err: any) {
            setError(err.message || 'Login failed. Please check your credentials.');
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Login</h2>
            {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded text-sm">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="you@example.com"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="••••••••"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition disabled:opacity-50"
                >
                    {isLoading ? 'Logging in...' : 'Sign In'}
                </button>
            </form>
        </div>
    );
}
