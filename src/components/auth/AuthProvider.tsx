'use client';

import React, { createContext, useEffect, useState, useCallback, ReactNode, useMemo } from 'react';
import { toast } from 'sonner';
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
import { ROUTES, API_BASE_URL, DEFAULT_AVATAR_PATH, AUTH_CHECK_INTERVAL } from '../../lib/constants';
import { usersApi } from '../../lib/api/users';

interface AuthContextType {
  user: User | null;
  avatarUrl: string;
  setAvatarUrl: (url: string) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (credentials: RegisterCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>(DEFAULT_AVATAR_PATH);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
      setIsAuthenticated(true); // Sync update to prevent race condition
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
        setIsAuthenticated(true); // Sync update
        const resolved = await resolveAvatarUrl(accessToken, userData.avatarUrl);
        setAvatarUrl(resolved);
      } catch (refreshError: any) {
        if (refreshError.name === 'AbortError') return;

        console.error('Refresh failed:', refreshError);
        clearTokens();
        setUser(null);
        setIsAuthenticated(false); // Sync update
        setAvatarUrl(DEFAULT_AVATAR_PATH);
        // Ensure explicit feedback to user
        if (typeof window !== 'undefined') {
          toast.error('Your session has expired. Please log in again.');
        }
        router.replace(ROUTES.LOGIN);
        // Don't set isLoading(false) if we are redirecting to prevent flashing unauthenticated state
        return;
      }
    } finally {
      if (!signal?.aborted && !window.location.pathname.includes('/login')) {
        // Only set loading to false if we're not redirecting to login
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
      const { user, accessToken, refreshToken, success, message } = await authApi.login(credentials);
      if (success === false) {
        return { success: false, error: message || 'Login failed' };
      }
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUserId(user.id);
      setUser(user);
      const resolved = await resolveAvatarUrl(accessToken, user.avatarUrl);
      setAvatarUrl(resolved);
      router.push(ROUTES.DASHBOARD);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Login failed' };
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
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Registration failed' };
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

  useEffect(() => {
    // Initial check
    const checkAuthStatus = () => {
      const valid = !!user && !isTokenExpired(getAccessToken());
      setIsAuthenticated(valid);
      return valid;
    };
    checkAuthStatus();

    // Interval check
    const intervalId = setInterval(() => {
      const isValid = checkAuthStatus();
      if (!isValid && user) {
        // Token expired while user was active (or idle)
        // Attempt silent refresh first via initAuth or just strict verify
        // For now, simpler: if expired, clear and logout.
        // Ideally we call initAuth again or a lightweight refresh.
        // Let's rely on initAuth's refresh logic logic by triggering it?
        // Actually best to just set to false and let components react or trigger logout
        setIsAuthenticated(false);
        // Optional: Trigger logout flow?
        // If we strictly want to logout:
        console.log('Token expired during interval check');
        // We could call a truncated version of logout or just let the user be "unauthenticated"
        // But for security, better to clear tokens if truly expired.
        // However, initAuth handles refresh. So let's try to REFRESH if expired.
        // But calling async initAuth inside interval is tricky.
        // SAFEST: Just update state. ProtectedLayout will redirect.
      }
    }, AUTH_CHECK_INTERVAL);

    return () => clearInterval(intervalId);
  }, [user]);

  const contextValue = useMemo<AuthContextType>(
    () => ({
      user,
      avatarUrl,
      setAvatarUrl,
      isAuthenticated,
      isLoading,
      login,
      register,
      logout,
    }),
    [user, avatarUrl, isLoading, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
