import { User } from './auth';

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    stack?: string; // Only in development/error cases
}

export interface ApiError {
    success: false;
    message: string;
    stack?: string;
}

export interface AuthResponseData {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface RefreshTokenResponse {
    accessToken: string;
}
