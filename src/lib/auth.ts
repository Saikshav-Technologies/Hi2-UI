import { TOKEN_KEYS } from './constants';
import { authApi } from './api/auth';

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
};

export const setAccessToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, token);
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
};

export const setRefreshToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, token);
};

export const getUserId = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEYS.USER_ID);
};

const decodeBase64Url = (value: string): string => {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
  return atob(padded);
};

export const getUserIdFromToken = (token?: string | null): string | null => {
  try {
    if (typeof window === 'undefined') return null;
    const jwt = token || getAccessToken();
    if (!jwt) return null;
    const parts = jwt.split('.');
    if (parts.length < 2) return null;
    const payload = JSON.parse(decodeBase64Url(parts[1]));
    return payload?.userId || null;
  } catch {
    return null;
  }
};

const getTokenExpiry = (token?: string | null): number | null => {
  try {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = JSON.parse(decodeBase64Url(parts[1]));
    return typeof payload?.exp === 'number' ? payload.exp : null;
  } catch {
    return null;
  }
};

export const isTokenExpired = (token?: string | null, bufferSeconds = 60): boolean => {
  const exp = getTokenExpiry(token);
  if (!exp) return false;
  const now = Math.floor(Date.now() / 1000);
  return now >= exp - bufferSeconds;
};

export const setUserId = (userId: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEYS.USER_ID, userId);
};

export const clearTokens = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(TOKEN_KEYS.USER_ID);
  // Note: Refresh token cookie should be cleared by the server via HttpOnly cookie
};

export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  return !!token;
};

export const getValidAccessToken = async (): Promise<string | null> => {
  if (typeof window === 'undefined') return null;
  const token = getAccessToken();
  if (!token) return null;

  if (!isTokenExpired(token)) return token;

  try {
    const refreshToken = getRefreshToken();
    const { accessToken } = await authApi.refreshToken(refreshToken || undefined);
    if (accessToken) {
      setAccessToken(accessToken);
      return accessToken;
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
    clearTokens();
  }

  return null;
};
