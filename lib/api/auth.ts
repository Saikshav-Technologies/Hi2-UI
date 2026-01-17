import { AUTH_ENDPOINTS, API_BASE_URL } from '../constants';
import { LoginCredentials, RegisterCredentials, AuthState } from '../../types/auth'; // Adjusted path
import { AuthResponse, ApiResponse } from '../../types/api'; // Adjusted path
import { getAccessToken } from '../auth';

// Helper to handle API errors
const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'API request failed');
    }
    return response.json();
};

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.LOGIN}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        return handleResponse<AuthResponse>(response);
    },

    register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.REGISTER}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        return handleResponse<AuthResponse>(response);
    },

    logout: async (): Promise<void> => {
        await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.LOGOUT}`, {
            method: 'POST',
        });
    },

    refreshToken: async (): Promise<{ accessToken: string }> => {
        // Refresh token is sent automatically via HttpOnly cookie
        const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.REFRESH}`, {
            method: 'POST',
        });
        return handleResponse<{ accessToken: string }>(response);
    },

    me: async (): Promise<AuthResponse['user']> => {
        const token = getAccessToken();
        const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.ME}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return handleResponse<AuthResponse['user']>(response);
    }
};
