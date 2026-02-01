import { API_BASE_URL, USER_ENDPOINTS } from '../constants';
import { ApiResponse } from '../../types/api';
import { getValidAccessToken } from '../auth';

// Helper to handle API errors
const handleResponse = async <T>(response: Response): Promise<T> => {
  const data: ApiResponse<T> = await response.json();

  // Success criteria: Status 200 AND success: true
  if (response.ok && data.success === true) {
    return data.data as T;
  }

  // Failure: Any other status OR success: false
  const errorMessage = data.message || 'Request failed. Please try again.';
  throw new Error(errorMessage);
};

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  birthday?: string;
  isPrivate: boolean;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  bio: string;
  birthday?: string;
  isPrivate: boolean;
  avatarUrl?: string;
}

export const userApi = {
  updateProfile: async (profileData: UpdateProfileRequest): Promise<{ user: UserProfile }> => {
    const token = await getValidAccessToken();

    console.log('========> Token', token);

    if (!token) {
      throw new Error('Authentication required. Please log in again.');
    }

    const response = await fetch(`${API_BASE_URL}${USER_ENDPOINTS.PROFILE}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    return handleResponse<{ user: UserProfile }>(response);
  },

  getUserById: async (userId: string): Promise<{ user: UserProfile }> => {
    const token = await getValidAccessToken();

    if (!token) {
      throw new Error('Authentication required. Please log in again.');
    }

    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse<{ user: UserProfile }>(response);
  },

  getProfile: async (): Promise<{ user: UserProfile }> => {
    const token = await getValidAccessToken();

    if (!token) {
      throw new Error('Authentication required. Please log in again.');
    }

    const response = await fetch(`${API_BASE_URL}${USER_ENDPOINTS.PROFILE}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse<{ user: UserProfile }>(response);
  },
};
