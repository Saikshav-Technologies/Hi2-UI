import { Tokens, User } from './auth';

export interface ApiResponse<T = unknown> {
    data?: T;
    error?: string;
    message?: string;
}

export interface ApiError {
    message: string;
    status: number;
    errors?: Record<string, string[]>;
}

export interface AuthResponse {
    user: User;
    tokens: Tokens;
}
