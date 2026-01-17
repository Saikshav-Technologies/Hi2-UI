export interface User {
    id: string;
    email: string;
    name: string;
}

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthState {
    user: User | null;
    tokens: Tokens | null;
    loading: boolean;
    isAuthenticated: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
    name: string;
}
