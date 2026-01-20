'use client';

import React, { createContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { User, LoginCredentials, RegisterCredentials } from '../../types/auth'; // Adjusted path
import { authApi } from '../../lib/api/auth';
import { setAccessToken, clearTokens, getAccessToken, setRefreshToken, setUserId } from '../../lib/auth';
import { useRouter } from 'next/navigation';
import { ROUTES } from '../../lib/constants';
import { usersApi } from '../../lib/api/users';
import { getUserId } from '../../lib/auth';

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
        const userId = getUserId();

        if (!token || !userId) {
            setIsLoading(false);
            return;
        }

        try {
            // Fetch user profile using the userId from localStorage
            const userData = await usersApi.getUserById(userId);
            setUser(userData);
        } catch (error) {
            console.error("Failed to fetch user:", error);
            // If fetch user fails, try refresh
            try {
                const { accessToken } = await authApi.refreshToken();
                setAccessToken(accessToken);
                // Retry fetching user - simplistic retry
                const userData = await usersApi.getUserById(userId);
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
            const { user, accessToken, refreshToken } = await authApi.login(credentials);
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            setUserId(user.id);
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
            const { user, accessToken, refreshToken } = await authApi.register(credentials);
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            setUserId(user.id);
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
