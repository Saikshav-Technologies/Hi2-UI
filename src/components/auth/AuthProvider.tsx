'use client';

import React, { createContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { User, LoginCredentials, RegisterCredentials } from '../../types/auth'; // Adjusted path
import { authApi } from '../../lib/api/auth';
import {
  setAccessToken,
  clearTokens,
  getAccessToken,
  setRefreshToken,
  setUserId,
} from '../../lib/auth';
import { useRouter } from 'next/navigation';
import { ROUTES, API_BASE_URL } from '../../lib/constants';
import { usersApi } from '../../lib/api/users';
import { getUserId } from '../../lib/auth';

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
  const [avatarUrl, setAvatarUrl] = useState<string>('/images/profile/default-avatar.png');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isValidImageSrc = (value?: string | null): boolean => {
    if (!value) return false;
    return value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/');
  };

  const resolveAvatarUrl = async (token: string, avatarKey?: string | null): Promise<string> => {
    if (!avatarKey) return '/images/profile/default-avatar.png';
    if (isValidImageSrc(avatarKey)) return avatarKey;

    try {
      const response = await fetch(
        `${API_BASE_URL}/users/avatar/presigned-url/?key=${encodeURIComponent(avatarKey)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data?.url) {
          return data.data.url;
        }
      }
    } catch (error) {
      console.error('Failed to resolve avatar URL:', error);
    }

    return '/images/profile/default-avatar.png';
  };

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
      if (token) {
        const resolved = await resolveAvatarUrl(token, userData.avatarUrl);
        setAvatarUrl(resolved);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      // If fetch user fails, try refresh
      try {
        const { accessToken } = await authApi.refreshToken();
        setAccessToken(accessToken);
        // Retry fetching user - simplistic retry
        const userData = await usersApi.getUserById(userId);
        setUser(userData);
        const resolved = await resolveAvatarUrl(accessToken, userData.avatarUrl);
        setAvatarUrl(resolved);
      } catch (refreshError) {
        console.error('Refresh failed:', refreshError);
        clearTokens();
        setUser(null);
        setAvatarUrl('/images/profile/default-avatar.png');
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
      setAvatarUrl('/images/profile/default-avatar.png');
      setIsLoading(false);
      router.push(ROUTES.LOGIN);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        avatarUrl,
        setAvatarUrl,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
