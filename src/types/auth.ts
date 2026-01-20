export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    username: string | null;
    bio: string | null;
    avatarUrl: string | null;
    gender: string;
    country: string;
    contact: string;
    birthday: string | null;
    isPrivate: boolean;
    createdAt: string;
    updatedAt: string;
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
    firstName: string;
    lastName: string;
    gender: string;
    country: string;
    contact: string;
}
