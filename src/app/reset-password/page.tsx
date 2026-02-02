'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { API_BASE_URL, ROUTES } from '@/lib/constants';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const splineSans = 'font-[family-name:var(--font-spline-sans)]';

export default function ResetPasswordPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [authLoading, isAuthenticated, router]);

  // Get email and OTP from localStorage
  useEffect(() => {
    if (authLoading || isAuthenticated) return;
    const storedEmail = localStorage.getItem('verifiedEmail');
    const storedOTP = localStorage.getItem('verifiedOTP');

    if (storedEmail && storedOTP) {
      setEmail(storedEmail);
      setOtp(storedOTP);
    } else {
      // If no email/OTP, redirect back to forgot password
      setError('Session expired. Please restart the password reset process.');
      const timeoutId = setTimeout(() => {
        router.push('/forgot-password');
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation: Check if email and OTP are available
    if (!email || !otp) {
      setError('Session expired. Please restart the password reset process.');
      return;
    }

    // Validation: Password length
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Validation: Password complexity (optional but recommended)
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      setError('Password must contain uppercase, lowercase, and numbers');
      return;
    }

    // Validation: Passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/password-reset/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Clear stored data
        localStorage.removeItem('resetEmail');
        localStorage.removeItem('verifiedEmail');
        localStorage.removeItem('verifiedOTP');

        // Redirect to login page on success
        router.push('/login');
      } else {
        setError(data.message || 'Failed to reset password. Please try again.');
      }
    } catch (err: any) {
      setError('An error occurred. Please check your connection and try again.');
      console.error('Password reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        className={`h-screen w-full relative flex items-center justify-center p-2 md:p-4 ${splineSans}`}
        style={{
          background: 'linear-gradient(65.67deg, #37CE62 0.8%, #131C61 112.5%)',
        }}
      >
        {/* Main Card */}
        <div className="bg-white w-full max-w-[1000px] max-h-[95vh] rounded-[24px] overflow-hidden flex flex-col md:flex-row shadow-2xl">
          {/* Left Side - Illustration & Text */}
          <div className="w-full md:w-1/2 bg-[#f4fff4] p-6 md:p-8 flex flex-col">
            {/* Top Section - Logo and Main Content */}
            <div className="flex flex-col gap-4 flex-1">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="relative w-[40px] h-[40px]">
                  <Image
                    src="/images/onboarding/logo-icon.png"
                    alt="Hi2 Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-[#131c61] text-[24px] font-bold">Hi2</span>
              </div>

              {/* Main Content */}
              <div className="flex flex-col gap-5">
                {/* Title */}
                <div className="space-y-3">
                  <h1 className="text-[#131c61] text-[32px] md:text-[40px] leading-tight">
                    Create a new <span className="font-semibold text-[#37CE62]">password.</span>
                  </h1>
                  <p className="text-[#9ca3af] text-[16px] leading-relaxed max-w-[360px]">
                    Choose a strong password that you haven't used before. Make it memorable but
                    secure!
                  </p>
                </div>

                {/* Password Requirements Card */}
                <div className="bg-white/50 border border-[#37CE62]/30 rounded-[16px] p-4 flex gap-3">
                  <div className="relative w-[40px] h-[40px] flex-shrink-0">
                    <Image
                      src="/images/forgot-password/shield-icon.png"
                      alt="Security"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-[#131c61] text-[16px] font-semibold mb-1">
                      Password Guidelines
                    </h3>
                    <ul className="text-[#9ca3af] text-[14px] leading-relaxed space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• Mix of letters, numbers & symbols</li>
                      <li>• Different from previous passwords</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex-1 bg-white p-6 md:p-8 flex flex-col justify-center">
            <div className="max-w-[400px] mx-auto w-full space-y-5">
              {/* Header */}
              <div className="space-y-2">
                <h2 className="text-[#131c61] text-[24px] md:text-[28px] font-bold">
                  Reset Password
                </h2>
                <p className="text-[#9ca3af] text-[14px] md:text-[16px]">
                  Enter your new password below to secure your account.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-[12px] text-[14px]">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* New Password Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="newPassword"
                    className="text-[#131c61] text-[14px] font-medium block"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                      className="w-full h-[48px] px-4 pr-12 rounded-[12px] border-2 border-[#e5e7eb] bg-[#f9fafb] text-[16px] text-[#131c61] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#37CE62] focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-[#131c61] text-[14px] font-medium block"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      required
                      className="w-full h-[48px] px-4 pr-12 rounded-[12px] border-2 border-[#e5e7eb] bg-[#f9fafb] text-[16px] text-[#131c61] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#37CE62] focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Reset Password Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-[48px] bg-[#37CE62] text-white text-[16px] font-bold rounded-full transition-all shadow-lg hover:shadow-xl hover:bg-[#2fb555] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Resetting Password...' : 'Reset Password'}
                  {!isLoading && (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 15L12.5 10L7.5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </form>

              {/* Back to Login */}
              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="text-[#15195D] text-[14px] hover:text-[#131c61] transition-colors inline-flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 12L6 8L10 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 text-[12px] text-white/80 font-medium">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link href="/support" className="hover:text-white transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
