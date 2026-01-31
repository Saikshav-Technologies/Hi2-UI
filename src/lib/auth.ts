import { TOKEN_KEYS } from './constants';

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
