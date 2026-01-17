'use client';

import React, { createContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { User, LoginCredentials, RegisterCredentials } from '../../types/auth'; // Adjusted path
import { authApi } from '../../lib/api/auth';
import { setAccessToken, clearTokens, getAccessToken } from '../../lib/auth';
import { useRouter } from 'next/navigation';
import { ROUTES } from '../../lib/constants';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const initAuth = useCallback(async () => {
        const token = getAccessToken();
        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
            // Logic to fetch user profile using the token would go here
            // For now we will assume if token exists we try to fetch 'me'
            // If 'me' endpoint fails (401), we try refresh
            const userData = await authApi.me();
            setUser(userData);
        } catch (error) {
            console.error("Failed to fetch user:", error);
            // If fetch user fails, try refresh
            try {
                const { accessToken } = await authApi.refreshToken();
                setAccessToken(accessToken);
                // Retry fetching user - simplistic retry
                const userData = await authApi.me();
                setUser(userData);
            } catch (refreshError) {
                console.error("Refresh failed:", refreshError);
                clearTokens();
                setUser(null);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        initAuth();
    }, [initAuth]);

    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        try {
            const { user, tokens } = await authApi.login(credentials);
            setAccessToken(tokens.accessToken);
            setUser(user);
            router.push(ROUTES.DASHBOARD);
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (credentials: RegisterCredentials) => {
        setIsLoading(true);
        try {
            const { user, tokens } = await authApi.register(credentials);
            setAccessToken(tokens.accessToken);
            setUser(user);
            router.push(ROUTES.DASHBOARD);
        } catch (error) {
            console.error("Registration failed", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await authApi.logout();
        } catch (error) {
            console.error("Logout error", error);
        } finally {
            clearTokens();
            setUser(null);
            setIsLoading(false);
            router.push(ROUTES.LOGIN);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
