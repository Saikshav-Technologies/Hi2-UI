'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const splineSans = 'font-[family-name:var(--font-spline-sans)]';

export default function EmailVerificationPage() {
    return (
        <div>
            <div
                className={`min-h-screen w-full relative flex items-center justify-center p-4 md:p-8 ${splineSans}`}
                style={{
                    background: 'linear-gradient(65.67deg, #37CE62 0.8%, #131C61 112.5%)'
                }}
            >
                {/* Main Card */}
                <div className="bg-white w-full max-w-[1000px] rounded-[24px] overflow-hidden flex flex-col md:flex-row shadow-2xl">

                    {/* Left Side - Illustration & Text */}
                    <div className="w-full md:w-1/2 bg-[#f4fff4] p-8 md:p-12 flex flex-col justify-between min-h-[300px] md:min-h-[600px]">
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
                        <div className="flex flex-col gap-8">
                            {/* Email Icon */}
                            <div className="relative w-[64px] h-[64px]">
                                <Image
                                    src="/images/email-verification/mark_email_read.png"
                                    alt="Email Verification"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* Title */}
                            <div className="space-y-4">
                                <h1 className="text-[#131c61] text-[40px] md:text-[48px] font-bold leading-tight">
                                    Verify your .
                                    <div className="text-[#37CE62]">email</div>
                                </h1>
                                <p className="text-[#9ca3af] text-[16px] leading-relaxed max-w-[360px]">
                                    We've sent a 6-digit verification code to your email address. Please enter it to secure your account.
                                </p>
                            </div>
                        </div>

                        {/* Tagline */}
                        <p className="text-[#9ca3af] text-[12px] md:text-[14px]">
                            Hi2 Community Engagement & Live Streaming
                        </p>
                    </div>

                    {/* Right Side - Form */}
                    <div className="flex-1 bg-white p-8 md:p-12 flex flex-col justify-center">
                        <div className="max-w-[400px] mx-auto w-full space-y-8">

                            {/* Header */}
                            <div className="space-y-2">
                                <h2 className="text-[#131c61] text-[28px] md:text-[32px] font-bold">
                                    Enter verification code
                                </h2>
                                <p className="text-[#9ca3af] text-[14px] md:text-[16px]">
                                    Please enter the 6-digit code sent to your email.
                                </p>
                            </div>

                            {/* OTP Input */}
                            <OTPInput />

                            {/* Verify Button */}
                            <button className="w-full rounded-[24px] border border-[#131C61] h-[56px] text-[#131C61] text-[16px] font-bold rounded-full transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2">
                                Verify Account
                                <div className="relative w-[18px] h-[18px]">
                                    <Image
                                        src="/images/email-verification/verified_user.png"
                                        alt="Verified"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </button>

                            {/* Resend Link */}
                            <div className="text-center">
                                <div className="text-[#9ca3af] text-[14px]">
                                    Didn't receive the code?{' '}
                                    <button className="text-[#37CE62] font-semibold hover:underline inline-flex items-center gap-1">
                                        Resend Code
                                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.65 2.35C12.2 0.9 10.21 0 8 0C3.58 0 0.01 3.58 0.01 8C0.01 12.42 3.58 16 8 16C11.73 16 14.84 13.45 15.73 10H13.65C12.83 12.33 10.61 14 8 14C4.69 14 2 11.31 2 8C2 4.69 4.69 2 8 2C9.66 2 11.14 2.69 12.22 3.78L9 7H16V0L13.65 2.35Z" fill="currentColor" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Back to Login */}
                            <div className="text-center pt-4">
                                <Link href="/login" className="text-[#9ca3af] text-[14px] hover:text-[#131c61] transition-colors inline-flex items-center gap-2">
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
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-6 text-[14px] text-[#9ca3af] font-medium">
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    <Link href="/support" className="hover:text-white transition-colors">Contact Support</Link>
                </div>
            </div>
        </div>
    );
}

function OTPInput() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex gap-3 md:gap-4 justify-center">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-[56px] h-[56px] md:w-[64px] md:h-[64px] rounded-[12px] border-2 border-[#e5e7eb] bg-[#f9fafb] text-center text-[24px] md:text-[28px] font-bold text-[#131c61] focus:outline-none focus:border-[#37CE62] focus:bg-white transition-all"
                    placeholder=""
                />
            ))}
        </div>
    );
}
