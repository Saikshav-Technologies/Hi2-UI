'use client';

import React, { createContext, useEffect, useState, useCallback, ReactNode, useMemo } from 'react';
import { User, LoginCredentials, RegisterCredentials } from '../../types/auth';
import { authApi } from '../../lib/api/auth';
import {
  getAccessToken,
  setRefreshToken,
  setUserId,
  getUserId,
  isTokenExpired,
  setAccessToken,
  clearTokens,
} from '../../lib/auth';
import { useRouter } from 'next/navigation';
import { ROUTES, API_BASE_URL, DEFAULT_AVATAR_PATH } from '../../lib/constants';
import { usersApi } from '../../lib/api/users';

interface AuthContextType {
  user: User | null;
  avatarUrl: string;
  setAvatarUrl: (url: string) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>(DEFAULT_AVATAR_PATH);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isValidImageSrc = (value?: string | null): boolean => {
    if (!value) return false;
    return value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/');
  };

  const resolveAvatarUrl = async (token: string, avatarKey?: string | null): Promise<string> => {
    if (!avatarKey) return DEFAULT_AVATAR_PATH;
    if (isValidImageSrc(avatarKey)) return avatarKey;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    try {
      const response = await fetch(
        `${API_BASE_URL}/users/avatar/presigned-url/?key=${encodeURIComponent(avatarKey)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data?.url) {
          return data.data.url;
        }
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.error('Avatar processing timed out');
      } else {
        console.error('Failed to resolve avatar URL:', error);
      }
    } finally {
      clearTimeout(timeoutId);
    }
    return DEFAULT_AVATAR_PATH;
  };

  const initAuth = useCallback(async (signal?: AbortSignal) => {
    const token = getAccessToken();
    const userId = getUserId();

    if (!token || !userId) {
      setIsLoading(false);
      return;
    }

    try {
      // Fetch user profile using the userId from localStorage
      const userData = await usersApi.getUserById(userId, signal);
      if (!userData) throw new Error('User data not found');

      setUser(userData);
      if (token) {
        const resolved = await resolveAvatarUrl(token, userData.avatarUrl);
        setAvatarUrl(resolved);
      }
    } catch (error: any) {
      if (error.name === 'AbortError') return;

      console.error('Failed to fetch user:', error);
      // If fetch user fails, try refresh
      try {
        const { accessToken } = await authApi.refreshToken(undefined, signal);
        setAccessToken(accessToken);
        // Retry fetching user - simplistic retry
        const userData = await usersApi.getUserById(userId, signal);
        setUser(userData);
        const resolved = await resolveAvatarUrl(accessToken, userData.avatarUrl);
        setAvatarUrl(resolved);
      } catch (refreshError: any) {
        if (refreshError.name === 'AbortError') return;

        console.error('Refresh failed:', refreshError);
        clearTokens();
        setUser(null);
        setAvatarUrl(DEFAULT_AVATAR_PATH);
        // Ensure explicit feedback to user
        if (typeof window !== 'undefined') {
          // Optional: You could use a toast here instead of alert
          // window.alert('Your session has expired. Please log in again.');
        }
        router.replace(ROUTES.LOGIN);
      }
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    initAuth(controller.signal);
    return () => controller.abort();
  }, [initAuth]);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const { user, accessToken, refreshToken } = await authApi.login(credentials);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUserId(user.id);
      setUser(user);
      const resolved = await resolveAvatarUrl(accessToken, user.avatarUrl);
      setAvatarUrl(resolved);
      router.push(ROUTES.DASHBOARD);
    } catch (error) {
      console.error('Login failed', error);
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
      const resolved = await resolveAvatarUrl(accessToken, user.avatarUrl);
      setAvatarUrl(resolved);
      router.push(ROUTES.DASHBOARD);
    } catch (error) {
      console.error('Registration failed', error);
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
      console.error('Logout error', error);
    } finally {
      clearTokens();
      setUser(null);
      setAvatarUrl(DEFAULT_AVATAR_PATH);
      setIsLoading(false);
      router.push(ROUTES.LOGIN);
    }
  };

  const contextValue = useMemo<AuthContextType>(
    () => ({
      user,
      avatarUrl,
      setAvatarUrl,
      isAuthenticated: !!user && !isTokenExpired(getAccessToken()),
      isLoading,
      login,
      register,
      logout,
    }),
    [user, avatarUrl, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
