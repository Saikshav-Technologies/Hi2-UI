'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '../../hooks/useAuth';

export default function LoginForm() {
    const { login } = useAuth();

    // Local state
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Clicked");
        // login({ email, password });
    };

    return (
        <div
            className="h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden"
            style={{ background: 'linear-gradient(90deg, #37CE62 0%, #1E5A8E 50%, #2C4A7C 100%)' }}
        >
            {/* Background Decorative People - Left Side */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                {/* People scattered on the left side */}
                <div className="absolute bottom-[10%] left-[5%] w-[200px] h-auto hidden lg:block">
                    <img
                        src="/images/login/people-group-left.png"
                        alt="Community"
                        className="w-full h-auto object-contain opacity-90"
                    />
                </div>

                {/* People network on the right side */}
                <div className="absolute top-[10%] right-[5%] w-[300px] h-auto hidden lg:block">
                    <img
                        src="/images/login/people-group-right.png"
                        alt="Community"
                        className="w-full h-auto object-contain opacity-90"
                    />
                </div>
            </div>

            {/* Logo - Circular background with logo image */}
            <div className="z-10 mb-6">
                <div className="w-[90px] h-[90px] flex items-center justify-center p-2">
                    <img
                        src="/images/login/logo.png"
                        alt="Hi2 Logo"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-[430px] bg-white rounded-[20px] shadow-2xl px-10 py-8 z-10">
                <h2 className="text-2xl font-semibold text-center text-[#37CE62] mb-8">Log In</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Input */}
                    <div className="space-y-1">
                        <label className="block text-xs text-gray-500 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-0 py-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-[#37CE62] transition-colors outline-none"
                            placeholder=""
                        />
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1">
                        <label className="block text-xs text-gray-500 font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full px-0 py-2 pr-10 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-[#37CE62] transition-colors outline-none"
                                placeholder=""
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-3.5 w-3.5 rounded border-gray-300 text-[#37CE62] focus:ring-[#37CE62]"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-700">
                                Remember Me
                            </label>
                        </div>
                        <div className="text-xs">
                            <Link href="#" className="text-gray-600 hover:text-gray-900">
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    {/* Login Button */}
                    <div className="pt-6">
                        <button
                            type="submit"
                            className="w-32 mx-auto flex justify-center py-2.5 px-6 border border-transparent rounded-full shadow-md text-base font-semibold text-white bg-[#37CE62] hover:bg-[#2db36c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#37CE62] transition-all"
                        >
                            Login
                        </button>
                    </div>

                    {/* Register Link */}
                    <div className="text-center text-sm text-gray-600 pt-2">
                        Don't have an account ?{' '}
                        <Link href="/register" className="font-bold text-[#E54D4D] hover:text-red-700">
                            Register Now!
                        </Link>
                    </div>

                    {/* Store Badges */}
                    <div className="flex justify-center gap-3 pt-4">
                        <div className="h-7 w-auto cursor-pointer hover:opacity-80 transition-opacity">
                            <img src="/images/login/android.png" alt="Get it on Google Play" className="h-full w-auto" />
                        </div>
                        <div className="h-7 w-auto cursor-pointer hover:opacity-80 transition-opacity">
                            <img src="/images/login/ios.png" alt="Download on the App Store" className="h-full w-auto" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
