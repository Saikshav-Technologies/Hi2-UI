export const API_BASE_URL = 'http://localhost:3000/api';

export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH: '/auth/refresh',
  LOGOUT: '/auth/logout',
};

export const TOKEN_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_ID: 'userId',
  // Refresh token is typically stored in HttpOnly cookies to prevent XSS
  // But we might need a reference if we are handling it client side for some reason (not recommended)
};

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/registration',
  DASHBOARD: '/dashboard',
  HOME: '/',
};

export const COUNTRIES = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Netherlands',
  'Singapore',
  'Japan',
  'China',
  'Brazil',
  'Mexico',
  'South Africa',
  'New Zealand',
];
