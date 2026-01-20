import { AUTH_ENDPOINTS, API_BASE_URL } from '../constants';
import { LoginCredentials, RegisterCredentials, AuthState, User } from '../../types/auth'; // Adjusted path
import { AuthResponseData, ApiResponse } from '../../types/api'; // Adjusted path
import { getAccessToken } from '../auth';

// Helper to handle API errors
const handleResponse = async <T>(response: Response): Promise<T> => {
    const data: ApiResponse<T> = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(data.message || 'API request failed');
    }

    return data.data as T;
};

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponseData> => {
        const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.LOGIN}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        return handleResponse<AuthResponseData>(response);
    },

    register: async (credentials: RegisterCredentials): Promise<AuthResponseData> => {
        const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.REGISTER}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        return handleResponse<AuthResponseData>(response);
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

    me: async (): Promise<User> => {
        const token = getAccessToken();
        const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.ME}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return handleResponse<User>(response);
    }
};
