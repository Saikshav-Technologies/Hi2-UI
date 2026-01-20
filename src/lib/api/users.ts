import { API_BASE_URL } from '../constants';
import { User } from '../../types/auth';
import { ApiResponse } from '../../types/api';
import { getAccessToken } from '../auth';

// Helper to handle API errors
const handleResponse = async <T>(response: Response): Promise<T> => {
    const data: ApiResponse<T> = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(data.message || 'API request failed');
    }

    return data.data as T;
};

export const usersApi = {
    getUserById: async (userId: string): Promise<User> => {
        const token = getAccessToken();
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return handleResponse<User>(response);
    }
};
