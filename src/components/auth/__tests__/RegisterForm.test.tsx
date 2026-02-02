
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from '../RegisterForm';
import { useAuth } from '../../../hooks/useAuth';

// Mocks
jest.mock('../../../hooks/useAuth');
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('sonner', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn()
    }
}));
import { toast } from 'sonner';

// Mock Countries constant if needed, or rely on actual implementation 
// logic if component imports it directly.

describe('RegisterForm', () => {
    const mockRegister = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useAuth as jest.Mock).mockReturnValue({
            register: mockRegister,
            isLoading: false
        });
    });

    describe('Rendering', () => {
        test('renders all input fields correctly', () => {
            render(<RegisterForm />);
            expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
            expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
            expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
            expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
            // Phone placeholder is just numbers
            expect(screen.getByPlaceholderText(/06 12345678/i)).toBeInTheDocument();

            // comboboxes
            expect(screen.getByText('Select Country')).toBeInTheDocument();
            expect(screen.getByText('Select Gender')).toBeInTheDocument();
        });

        test('renders submit button', () => {
            render(<RegisterForm />);
            expect(screen.getByRole('button', { name: /register now/i })).toBeInTheDocument();
        });
    });

    describe('Validation', () => {
        test('shows error when required fields are empty', async () => {
            render(<RegisterForm />);
            // Use fireEvent.submit on the form to bypass HTML5 validation blocking click
            const form = screen.getByRole('button', { name: /register now/i }).closest('form');
            if (form) fireEvent.submit(form);

            await waitFor(() => {
                expect(screen.getByText(/please fill in all required fields/i)).toBeInTheDocument();
            });
            expect(mockRegister).not.toHaveBeenCalled();
        });

        test('validates email format', async () => {
            render(<RegisterForm />);

            // Fill required so we hit email check
            fillForm({ email: 'invalid-email' });

            const form = screen.getByRole('button', { name: /register now/i }).closest('form');
            if (form) fireEvent.submit(form);

            await waitFor(() => {
                expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
            });
        });

        test('validates password length', async () => {
            render(<RegisterForm />);

            fillForm({ password: 'short' });

            const form = screen.getByRole('button', { name: /register now/i }).closest('form');
            if (form) fireEvent.submit(form);

            await waitFor(() => {
                expect(screen.getByText(/password must be at least 8 characters long/i)).toBeInTheDocument();
            });
        });

        test('validates phone length', async () => {
            render(<RegisterForm />);

            fillForm({ phone: '123' }); // too short

            const form = screen.getByRole('button', { name: /register now/i }).closest('form');
            if (form) fireEvent.submit(form);

            await waitFor(() => {
                expect(screen.getByText(/please enter a valid phone number/i)).toBeInTheDocument();
            });
        });
    });

    describe('Form Submission', () => {
        test('submits valid data correctly', async () => {
            mockRegister.mockResolvedValue({ success: true }); // MOCK: Success

            render(<RegisterForm />);

            const formData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                password: 'password123',
                country: 'India',
                gender: 'male',
                phone: '1234567890'
            };

            fillForm(formData);

            const form = screen.getByRole('button', { name: /register now/i }).closest('form');
            if (form) fireEvent.submit(form);

            await waitFor(() => {
                expect(mockRegister).toHaveBeenCalledWith({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john@example.com',
                    password: 'password123',
                    gender: 'male',
                    country: 'India',
                    contact: '1234567890'
                });
                expect(toast.success).toHaveBeenCalledWith('Account created successfully!');
            });
        });
    });

    describe('Loading State', () => {
        test('disables button when loading', () => {
            (useAuth as jest.Mock).mockReturnValue({
                register: mockRegister,
                isLoading: true
            });
            render(<RegisterForm />);
            expect(screen.getByRole('button', { name: /registering\.\.\./i })).toBeDisabled();
        });
    });

    describe('API Errors', () => {
        test('displays API error message', async () => {
            mockRegister.mockResolvedValue({ success: false, error: 'Email already exists' }); // MOCK: Failure

            render(<RegisterForm />);

            fillForm({}); // Uses default valid data

            const form = screen.getByRole('button', { name: /register now/i }).closest('form');
            if (form) fireEvent.submit(form);

            await waitFor(() => {
                expect(screen.getByText('Email already exists')).toBeInTheDocument();
            });
        });
    });
});

// Helper to fill form
function fillForm(overrides: any) {
    const defaults = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        country: 'India',
        gender: 'male',
        phone: '1234567890'
    };

    const data = { ...defaults, ...overrides };

    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: data.firstName } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: data.lastName } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: data.email } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: data.password } });

    // Selects - [0] is Country, [1] is Gender based on DOM order
    const comboboxes = screen.getAllByRole('combobox');
    if (comboboxes.length >= 2) {
        fireEvent.change(comboboxes[0], { target: { value: data.country } });
        fireEvent.change(comboboxes[1], { target: { value: data.gender } });
    }

    fireEvent.change(screen.getByPlaceholderText(/06 12345678/i), { target: { value: data.phone } });
}
