import { TOKEN_KEYS } from './constants';

export const getAccessToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
};

export const setAccessToken = (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, token);
};

export const clearTokens = (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
    // Note: Refresh token cookie should be cleared by the server via HttpOnly cookie
};

export const isAuthenticated = (): boolean => {
    const token = getAccessToken();
    return !!token;
};
