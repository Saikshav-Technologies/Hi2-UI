
import React, { useContext } from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { AuthProvider, AuthContext } from '../AuthProvider';
import { authApi } from '../../../lib/api/auth';
import { usersApi } from '../../../lib/api/users';
import * as authLib from '../../../lib/auth';

// --- Mocks ---

jest.mock('../../../lib/api/auth');
jest.mock('../../../lib/api/users');
jest.mock('../../../lib/auth');
jest.mock('sonner', () => ({
    toast: { error: jest.fn() }
}));

jest.mock('../../../lib/constants', () => ({
    API_BASE_URL: 'http://test-api.com',
    DEFAULT_AVATAR_PATH: '/image.png',
    ROUTES: { LOGIN: '/login', DASHBOARD: '/', REGISTER: '/registration' },
    AUTH_CHECK_INTERVAL: 2000 // 2 seconds for test
}));

const mockRouterPush = jest.fn();
const mockRouterReplace = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockRouterPush,
        replace: mockRouterReplace,
    }),
}));

const TestComponent = () => {
    const context = useContext(AuthContext);
    if (!context) return null;
    return (
        <div>
            <div data-testid="is-loading">{context.isLoading.toString()}</div>
            <div data-testid="is-authenticated">{context.isAuthenticated.toString()}</div>
            <div data-testid="user-name">{context.user?.firstName || 'NoUser'}</div>

            <button onClick={() => context.login({ email: 't', password: 'p' }).catch(() => { })}>Login</button>
            <button onClick={() => context.register({ email: 't', password: 'p', firstName: 'F', lastName: 'L', contact: '1', country: 'C', gender: 'M' }).catch(() => { })}>Register</button>
            <button onClick={() => context.logout()}>Logout</button>
        </div>
    );
};

describe('AuthProvider', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (authLib.getAccessToken as jest.Mock).mockReturnValue(null);
        (authLib.getUserId as jest.Mock).mockReturnValue(null);
        (authLib.isTokenExpired as jest.Mock).mockReturnValue(false);
    });

    describe('Initialization', () => {

        it('resolves to unauthenticated if no token found', async () => {
            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );

            await waitFor(() => {
                expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
            });
            expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
        });

        it('authenticates user if token and userId exist', async () => {
            (authLib.getAccessToken as jest.Mock).mockReturnValue('access-token');
            (authLib.getUserId as jest.Mock).mockReturnValue('user-123');
            (usersApi.getUserById as jest.Mock).mockResolvedValue({ id: 'user-123', firstName: 'ExistingUser', avatarUrl: null });

            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );

            await waitFor(() => {
                expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
            });

            expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
            expect(screen.getByTestId('user-name')).toHaveTextContent('ExistingUser');
        });
    });

    describe('Token Refresh', () => {
        it('refreshes token if initial user fetch fails', async () => {
            (authLib.getAccessToken as jest.Mock).mockReturnValue('expired-token');
            (authLib.getUserId as jest.Mock).mockReturnValue('user-123');

            (usersApi.getUserById as jest.Mock)
                .mockRejectedValueOnce(new Error('Unauthorized'))
                .mockResolvedValueOnce({ id: 'user-123', firstName: 'RefreshedUser' });

            (authApi.refreshToken as jest.Mock).mockResolvedValue({ accessToken: 'new-token' });

            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );

            await waitFor(() => {
                expect(screen.getByTestId('user-name')).toHaveTextContent('RefreshedUser');
            });
            expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
        });

        it('logs out if refresh fails', async () => {
            (authLib.getAccessToken as jest.Mock).mockReturnValue('bad-token');
            (authLib.getUserId as jest.Mock).mockReturnValue('user-123');

            (usersApi.getUserById as jest.Mock).mockRejectedValue(new Error('Fail'));
            (authApi.refreshToken as jest.Mock).mockRejectedValue(new Error('Refresh fail'));

            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );

            await waitFor(() => {
                expect(authLib.clearTokens).toHaveBeenCalled();
            });

            await waitFor(() => {
                expect(mockRouterReplace).toHaveBeenCalledWith('/login');
            });
        });
    });

    describe('Login', () => {
        beforeEach(async () => {
            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );
            await waitFor(() => expect(screen.getByTestId('is-loading')).toHaveTextContent('false'));
        });

        it('successfully logs in', async () => {
            (authApi.login as jest.Mock).mockResolvedValue({
                user: { id: '1', firstName: 'LoginUser' },
                accessToken: 'at',
                refreshToken: 'rt'
            });

            await act(async () => {
                screen.getByText('Login').click();
            });

            await waitFor(() => {
                expect(screen.getByTestId('user-name')).toHaveTextContent('LoginUser');
                expect(mockRouterPush).toHaveBeenCalledWith('/');
            });
        });

        it('handles login failure', async () => {
            (authApi.login as jest.Mock).mockRejectedValue(new Error('Invalid'));

            // Catch error validation
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

            await act(async () => {
                screen.getByText('Login').click();
            });

            expect(authApi.login).toHaveBeenCalled();
            expect(screen.getByTestId('user-name')).toHaveTextContent('NoUser');

            consoleSpy.mockRestore();
        });
    });

    describe('Registration', () => {
        beforeEach(async () => {
            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );
            await waitFor(() => expect(screen.getByTestId('is-loading')).toHaveTextContent('false'));
        });

        it('successfully registers', async () => {
            (authApi.register as jest.Mock).mockResolvedValue({
                user: { id: '2', firstName: 'NewUser' },
                accessToken: 'at',
                refreshToken: 'rt'
            });

            await act(async () => {
                screen.getByText('Register').click();
            });

            await waitFor(() => {
                expect(screen.getByTestId('user-name')).toHaveTextContent('NewUser');
                expect(mockRouterPush).toHaveBeenCalledWith('/');
            });
        });
    });

    describe('Logout', () => {
        it('successfully logs out', async () => {
            (authLib.getAccessToken as jest.Mock).mockReturnValue('valid');
            (authLib.getUserId as jest.Mock).mockReturnValue('1');
            (usersApi.getUserById as jest.Mock).mockResolvedValue({ id: '1', firstName: 'User' });

            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );
            await waitFor(() => expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true'));

            await act(async () => {
                screen.getByText('Logout').click();
            });

            await waitFor(() => {
                expect(authLib.clearTokens).toHaveBeenCalled();
                expect(mockRouterPush).toHaveBeenCalledWith('/login');
                expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
            });
        });
    });

    describe('Reactive Auth Status', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.useRealTimers();
        });

        it('auto-logs out if token expires naturally', async () => {
            (authLib.getAccessToken as jest.Mock).mockReturnValue('valid-token');
            (authLib.getUserId as jest.Mock).mockReturnValue('123');
            (usersApi.getUserById as jest.Mock).mockResolvedValue({ id: '123', firstName: 'TimerUser' });

            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );

            await waitFor(() => expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true'));

            (authLib.isTokenExpired as jest.Mock).mockReturnValue(true);

            await act(async () => {
                jest.advanceTimersByTime(2500);
            });

            await waitFor(() => {
                expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
            });
        });
    });
});
