
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../LoginForm';
import { useAuth } from '../../../hooks/useAuth';

// Mock the useAuth hook
jest.mock('../../../hooks/useAuth');
// Mock useRouter
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

describe('LoginForm', () => {
    const mockLogin = jest.fn();

    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
        (useAuth as jest.Mock).mockReturnValue({
            login: mockLogin,
            isLoading: false,
        });
    });

    describe('Rendering', () => {
        test('renders login form elements correctly', () => {
            render(<LoginForm />);

            expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
            expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
            expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
            expect(screen.getByText(/register now!/i)).toBeInTheDocument();
            expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
        });

        test('renders logo and background elements', () => {
            render(<LoginForm />);
            expect(screen.getByAltText(/hi2 logo/i)).toBeInTheDocument();
            expect(screen.getByRole('heading', { level: 2, name: /log in/i })).toBeInTheDocument();
        });
    });

    describe('Interactions', () => {
        test('allows typing in email and password fields', () => {
            render(<LoginForm />);

            const emailInput = screen.getByPlaceholderText(/email/i);
            const passwordInput = screen.getByPlaceholderText(/password/i);

            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'password123' } });

            expect(emailInput).toHaveValue('test@example.com');
            expect(passwordInput).toHaveValue('password123');
        });

        test('toggles password visibility', () => {
            render(<LoginForm />);

            const passwordInput = screen.getByPlaceholderText(/password/i);
            expect(passwordInput).toHaveAttribute('type', 'password');

            const buttons = screen.getAllByRole('button');
            const toggleBtn = buttons.find(b => !b.textContent?.includes('Login'));

            if (toggleBtn) {
                fireEvent.click(toggleBtn);
                expect(passwordInput).toHaveAttribute('type', 'text');

                fireEvent.click(toggleBtn);
                expect(passwordInput).toHaveAttribute('type', 'password');
            }
        });

        test('toggles remember me checkbox', () => {
            render(<LoginForm />);
            const checkbox = screen.getByLabelText(/remember me/i);
            expect(checkbox).not.toBeChecked();
            fireEvent.click(checkbox);
            expect(checkbox).toBeChecked();
        });
    });

    describe('Form Submission', () => {
        test('calls login with credentials on successful submission', async () => {
            mockLogin.mockResolvedValue({ success: true }); // MOCK: Return object check

            render(<LoginForm />);

            fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });

            fireEvent.click(screen.getByRole('button', { name: /login/i }));

            await waitFor(() => {
                expect(mockLogin).toHaveBeenCalledWith({
                    email: 'test@example.com',
                    password: 'password123',
                });
            });
        });

        test('submission works even if enter key is pressed', async () => {
            mockLogin.mockResolvedValue({ success: true }); // MOCK

            render(<LoginForm />);
            const emailInput = screen.getByPlaceholderText(/email/i);
            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'pass' } });

            fireEvent.submit(emailInput.closest('form')!);

            await waitFor(() => {
                expect(mockLogin).toHaveBeenCalled();
            });
        });
    });

    describe('Loading State', () => {
        test('disables submit button and shows loading text', () => {
            (useAuth as jest.Mock).mockReturnValue({
                login: mockLogin,
                isLoading: true,
            });

            render(<LoginForm />);

            const submitButton = screen.getByRole('button', { name: /logging in\.\.\./i });
            expect(submitButton).toBeInTheDocument();
            expect(submitButton).toBeDisabled();
        });
    });

    describe('Error Handling', () => {
        test('displays error message from login failure', async () => {
            mockLogin.mockResolvedValue({ success: false, error: 'Invalid credentials' }); // MOCK: Return failure

            render(<LoginForm />);

            fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'wrong@example.com' } });
            fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'wrongpass' } });
            fireEvent.click(screen.getByRole('button', { name: /login/i }));

            await waitFor(() => {
                expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
            });
        });

        test('displays default error message if error has no message', async () => {
            mockLogin.mockResolvedValue({ success: false }); // MOCK: Default failure

            render(<LoginForm />);
            fireEvent.click(screen.getByRole('button', { name: /login/i }));

            await waitFor(() => {
                expect(screen.getByText(/login failed/i)).toBeInTheDocument();
            });
        });
    });
});
