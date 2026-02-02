import { AUTH_ENDPOINTS, API_BASE_URL } from '../constants';
import { LoginCredentials, RegisterCredentials } from '../../types/auth'; // Adjusted path
import { AuthResponseData, ApiResponse, RefreshTokenResponse } from '../../types/api'; // Adjusted path

// Helper to handle API errors
const handleResponse = async <T>(response: Response): Promise<T> => {
  let data: ApiResponse<T>;

  try {
    data = await response.json();
  } catch (error) {
    // Handle cases where response is not JSON (network errors, server down, etc.)
    throw new Error('Unable to connect to server. Please try again.');
  }

  // Success: HTTP 200 AND success: true
  if (response.status === 200 && data.success === true) {
    return data.data as T;
  }

  // HTTP 401 - Authentication Error (Invalid credentials)
  if (response.status === 401) {
    const errorMessage = data.message || 'Invalid email or password. Please try again.';
    throw new Error(errorMessage);
  }

  // Other errors - use backend message or fallback
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

  refreshToken: async (refreshToken?: string, signal?: AbortSignal): Promise<RefreshTokenResponse> => {
    // Refresh token is sent automatically via HttpOnly cookie
    const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.REFRESH}`, {
      method: 'POST',
      headers: refreshToken ? { 'Content-Type': 'application/json' } : undefined,
      body: refreshToken ? JSON.stringify({ refreshToken }) : undefined,
      signal,
    });
    return handleResponse<RefreshTokenResponse>(response);
  },
};
