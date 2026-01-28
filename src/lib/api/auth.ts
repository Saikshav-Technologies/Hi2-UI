import { AUTH_ENDPOINTS, API_BASE_URL } from '../constants';
import { LoginCredentials, RegisterCredentials } from '../../types/auth'; // Adjusted path
import { AuthResponseData, ApiResponse } from '../../types/api'; // Adjusted path

// Helper to handle API errors
const handleResponse = async <T>(response: Response): Promise<T> => {
    const data: ApiResponse<T> = await response.json();

    // Success criteria: Status 200 AND success: true
    if (response.status === 200 && data.success === true) {
        return data.data as T;
    }

    // Failure: Any other status OR success: false
    // Use backend error message if available, otherwise standard message
    const errorMessage = data.message || 'Login failed. Please try again.';
    throw new Error(errorMessage);
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
    }
};
