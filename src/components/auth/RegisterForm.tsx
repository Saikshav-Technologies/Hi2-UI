'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { COUNTRIES } from '../../lib/constants';

export default function RegisterForm() {
    const router = useRouter();
    const { register, isLoading } = useAuth();

    // Form state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validate all required fields
        if (!firstName || !lastName || !email || !password || !gender || !country || !phone) {
            setError('Please fill in all required fields');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        // Validate password strength (minimum 8 characters)
        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        // Validate phone number (basic validation - at least 10 digits)
        if (phone.length < 10) {
            setError('Please enter a valid phone number (at least 10 digits)');
            return;
        }

        try {
            await register({
                firstName,
                lastName,
                email,
                password,
                gender,
                country,
                contact: phone
            });
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
        }
    };

    const handleBackClick = () => {
        router.push('/login');
    };

    return (
        <div
            className="min-h-screen w-screen flex flex-col md:flex-row relative overflow-hidden"
            style={{ background: 'linear-gradient(90deg, #37CE62 0%, #1E5A8E 50%, #2C4A7C 100%)' }}
        >
            {/* Mobile Header */}
            <div className="md:hidden w-full flex items-center px-4 py-4 z-20">
                <button
                    onClick={handleBackClick}
                    className="p-2 text-white md:hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Back to login"
                >
                    <ArrowLeft className="h-6 w-6" />
                </button>
                <h1 className="flex-1 text-center text-white text-lg font-semibold pr-10">
                    Registration
                </h1>
            </div>

            {/* Desktop Welcome Panel */}
            <div className="hidden md:flex md:w-1/2 lg:w-[45%] flex-col px-8 lg:px-12 xl:px-16 relative">
                <div className="max-w-md mt-[10%]">
                    <h1 className="text-white text-2xl lg:text-3xl font-bold mb-3">
                        Welcome to Hi2
                    </h1>
                    <p className="text-white/90 text-xs lg:text-sm leading-relaxed">
                        Join us and unlock a smarter, faster, and more meaningful way to connect with people, explore endless possibilities, and grow both personally and professionally with every step you take.
                    </p>
                </div>

                {/* Decorative People Illustration */}
                <div className="flex-grow flex items-end pointer-events-none mt-8">
                    <div className="w-full h-[300px] lg:h-[350px] xl:h-[380px] relative">
                        <Image
                            src="/images/login/people-group-left.png"
                            alt="Community"
                            fill
                            className="object-contain object-bottom opacity-90"
                            sizes="(max-width: 1024px) 300px, (max-width: 1280px) 350px, 380px"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 md:py-12 lg:py-16 relative">
                {/* Logo - Mobile centered, Desktop top-right of entire page */}
                <div className="mb-6 md:mb-0 md:fixed md:top-8 md:right-8 lg:right-12 xl:right-16 z-20">
                    <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[90px] lg:h-[90px] flex items-center justify-center relative">
                        <Image
                            src="/images/login/logo.png"
                            alt="Hi2 Logo"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 60px, (max-width: 1024px) 80px, 90px"
                        />
                    </div>
                </div>

                {/* Registration Card */}
                <div className="w-full max-w-[380px] md:max-w-[420px] lg:max-w-[480px] bg-white rounded-[18px] md:rounded-[24px] shadow-2xl px-6 py-6 md:px-8 lg:px-10 md:py-6 lg:py-8 z-10">
                    <h2 className="text-xl md:text-xl lg:text-2xl font-semibold text-center text-[#37CE62] mb-5 md:mb-6">
                        Registration
                    </h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                        {/* First Name & Last Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="block w-full px-4 py-3 text-sm md:text-base text-gray-900 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[#37CE62] outline-none transition-all"
                                    placeholder="First Name"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="block w-full px-4 py-3 text-sm md:text-base text-gray-900 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[#37CE62] outline-none transition-all"
                                    placeholder="Last Name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-4 py-3 text-sm md:text-base text-gray-900 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[#37CE62] outline-none transition-all"
                                placeholder="Email"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full px-4 py-3 text-sm md:text-base text-gray-900 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[#37CE62] outline-none transition-all"
                                placeholder="Password"
                                required
                            />
                        </div>

                        {/* Country & Gender */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="block w-full px-4 py-3 text-sm md:text-base text-gray-700 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[#37CE62] outline-none appearance-none cursor-pointer"
                                >
                                    <option value="">Select Country</option>
                                    {COUNTRIES.map((countryName) => (
                                        <option key={countryName} value={countryName}>
                                            {countryName}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="relative">
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="block w-full px-4 py-3 text-sm md:text-base text-gray-700 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[#37CE62] outline-none appearance-none cursor-pointer"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Phone Number with Country Flag */}
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🇳🇱</span>
                                <span className="text-sm md:text-base text-gray-700">05</span>
                            </div>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="flex-1 text-sm md:text-base text-gray-900 bg-transparent border-0 outline-none"
                                placeholder="12345678"
                            />
                        </div>

                        {/* Terms & Privacy */}
                        <div className="text-xs md:text-sm text-gray-600 text-center">
                            By clicking sign up, You agree to our{' '}
                            <Link href="/terms" className="text-[#37CE62] md:hover:underline font-medium">
                                terms
                            </Link>
                            ,{' '}
                            <Link href="/privacy" className="text-[#37CE62] md:hover:underline font-medium">
                                privacy
                            </Link>
                            {' '}and{' '}
                            <Link href="/cookies" className="text-[#37CE62] md:hover:underline font-medium">
                                cookies policy
                            </Link>
                            .
                        </div>

                        {/* Register Button */}
                        <div className="flex justify-center pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-[160px] md:w-[180px] h-[40px] md:h-[44px] bg-[#37CE62] rounded-full text-white font-semibold text-sm md:text-base md:hover:bg-[#2db36c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#37CE62] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Registering...' : 'Register Now'}
                            </button>
                        </div>

                        {/* Login Link */}
                        <div className="text-center text-xs md:text-sm text-gray-600 pt-2">
                            Already have an account?{' '}
                            <Link href="/login" className="font-bold text-[#E54D4D] md:hover:text-red-700">
                                Log in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
