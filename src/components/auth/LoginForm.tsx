'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
            className="min-h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden px-4 md:px-0"
            style={{ background: 'linear-gradient(90deg, #37CE62 0%, #1E5A8E 50%, #2C4A7C 100%)' }}
        >
            {/* Background Decorative People */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                {/* People scattered on the left side - visible on mobile and desktop */}
                <div className="absolute bottom-[0%] left-[0%] w-[120px] md:w-[180px] lg:w-[250px] h-auto">
                    <Image
                        src="/images/login/people-group-left.png"
                        alt="Community"
                        width={250}
                        height={300}
                        className="w-full h-auto object-contain opacity-90"
                        sizes="(max-width: 768px) 120px, (max-width: 1024px) 180px, 250px"
                    />
                </div>

                {/* People network on the right side - visible on mobile and desktop */}
                <div className="absolute top-[0%] right-[0%] w-[120px] md:w-[180px] lg:w-[250px] h-auto">
                    <Image
                        src="/images/login/people-group-right.png"
                        alt="Community"
                        width={250}
                        height={300}
                        className="w-full h-auto object-contain opacity-90"
                        sizes="(max-width: 768px) 120px, (max-width: 1024px) 180px, 250px"
                    />
                </div>
            </div>

            {/* Logo - Responsive sizing */}
            <div className="z-10 mb-4 md:mb-6">
                <div className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] flex items-center justify-center p-2 relative">
                    <Image
                        src="/images/login/logo.png"
                        alt="Hi2 Logo"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 60px, 70px"
                    />
                </div>
            </div>

            {/* Login Card - Responsive sizing */}
            <div className="w-full max-w-[380px] md:max-w-[450px] lg:max-w-[650px] h-auto bg-white rounded-[18px] shadow-2xl px-6 py-6 md:px-10 md:py-8 z-10">
                <h2 className="text-xl md:text-2xl font-semibold text-center text-[#37CE62] mb-4 md:mb-6">Log In</h2>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                    {/* Email Input */}
                    <div className="space-y-1">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-0 py-2 text-sm md:text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-[#37CE62] transition-colors outline-none"
                            placeholder="Email"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1">
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full px-0 py-2 pr-10 text-sm md:text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-[#37CE62] transition-colors outline-none"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 md:hover:text-gray-600 p-1"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4 md:h-5 md:w-5" /> : <Eye className="h-4 w-4 md:h-5 md:w-5" />}
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
                                className="h-3 w-3 md:h-3.5 md:w-3.5 rounded border-gray-300 text-[#37CE62] focus:ring-[#37CE62]"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-[10px] md:text-xs text-gray-700">
                                Remember Me
                            </label>
                        </div>
                        <div className="text-[10px] md:text-xs">
                            <Link href="#" className="text-gray-600 md:hover:text-gray-900">
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    {/* Login Button */}
                    <div className="flex justify-center pt-2 md:pt-4">
                        <button
                            type="submit"
                            className="flex flex-row justify-center items-center gap-[7px] w-[120px] md:w-[140px] h-[36px] md:h-[38px] bg-[#37CE62] rounded-[100px] text-white font-semibold text-sm md:text-base md:hover:bg-[#2db36c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#37CE62] transition-all"
                        >
                            Login
                        </button>
                    </div>

                    {/* Register Link */}
                    <div className="text-center text-xs md:text-sm text-gray-600 pt-1 md:pt-2">
                        Don't have an account ?{' '}
                        <Link href="/register" className="font-bold text-[#E54D4D] md:hover:text-red-700">
                            Register Now!
                        </Link>
                    </div>

                    {/* Store Badges - Hidden on mobile, visible on desktop */}
                    <div className="hidden md:flex justify-center gap-3">
                        <div className="h-6 md:h-7 w-auto cursor-pointer md:hover:opacity-80 transition-opacity">
                            <Image src="/images/login/android.png" alt="Get it on Google Play" width={120} height={40} className="h-full w-auto" />
                        </div>
                        <div className="h-6 md:h-7 w-auto cursor-pointer md:hover:opacity-80 transition-opacity">
                            <Image src="/images/login/ios.png" alt="Download on the App Store" width={120} height={40} className="h-full w-auto" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
