'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const splineSans = 'font-[family-name:var(--font-spline-sans)]';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Password reset link sent to:', email);
        // TODO: Implement actual password reset logic
    };

    return (
        <div>
            <div
                className={`h-screen w-full relative flex items-center justify-center p-2 md:p-4 ${splineSans}`}
                style={{
                    background: 'linear-gradient(65.67deg, #37CE62 0.8%, #131C61 112.5%)'
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
                                        Recover your{' '}
                                        <span className="font-semibold text-[#37CE62]">account.</span>
                                    </h1>
                                    <p className="text-[#9ca3af] text-[16px] leading-relaxed max-w-[360px]">
                                        Don't worry! It happens to the best of us. Let's get you back into your community.
                                    </p>
                                </div>

                                {/* Secure Recovery Card */}
                                <div className="bg-white/50 border border-[#37CE62]/30 rounded-[16px] p-4 flex gap-3">
                                    <div className="relative w-[40px] h-[40px] flex-shrink-0">
                                        <Image
                                            src="/images/forgot-password/shield-icon.png"
                                            alt="Secure Recovery"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-[#131c61] text-[16px] font-semibold mb-1">
                                            Secure Recovery
                                        </h3>
                                        <p className="text-[#9ca3af] text-[14px] leading-relaxed">
                                            We will send a secure link to your registered email to reset your password.
                                        </p>
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
                                    Forgot Password?
                                </h2>
                                <p className="text-[#9ca3af] text-[14px] md:text-[16px]">
                                    Enter your email address and we'll send you a link to reset your password.
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-[#131c61] text-[14px] font-medium block"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        required
                                        className="w-full h-[48px] px-4 rounded-[12px] border-2 border-[#e5e7eb] bg-[#f9fafb] text-[16px] text-[#131c61] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#37CE62] focus:bg-white transition-all"
                                    />
                                </div>

                                {/* Send Reset Link Button */}
                                <button
                                    type="submit"
                                    className="w-full h-[48px] bg-[#37CE62] text-white text-[16px] font-bold rounded-full transition-all shadow-lg hover:shadow-xl hover:bg-[#2fb555] active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    Send Reset Link
                                    <div className="relative w-[20px] h-[20px]">
                                        <Image
                                            src="/images/forgot-password/reset-mail.png"
                                            alt="Send Email"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </button>
                            </form>

                            {/* Back to Login */}
                            <div className="text-center pt-2">
                                <Link
                                    href="/login"
                                    className="text-[#15195D] text-[14px] hover:text-[#131c61] transition-colors inline-flex items-center gap-2"
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-4 text-[12px] text-[#9ca3af] font-medium">
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    <Link href="/support" className="hover:text-white transition-colors">Contact Support</Link>
                </div>
            </div>
        </div>
    );
}
