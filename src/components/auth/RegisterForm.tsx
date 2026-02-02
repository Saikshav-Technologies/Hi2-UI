'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { COUNTRIES } from '../../lib/constants';
import { toast } from 'sonner';

const COUNTRY_FLAG_MAP: Record<string, string> = {
  India: '🇮🇳',
  'United States': '🇺🇸',
  'United Kingdom': '🇬🇧',
  Canada: '🇨🇦',
  Australia: '🇦🇺',
  Germany: '🇩🇪',
  France: '🇫🇷',
  Netherlands: '🇳🇱',
  Singapore: '🇸🇬',
  Japan: '🇯🇵',
  China: '🇨🇳',
  Brazil: '🇧🇷',
  Mexico: '🇲🇽',
  'South Africa': '🇿🇦',
  'New Zealand': '🇳🇿',
};

const COUNTRY_CODE_MAP: Record<string, string> = {
  India: '+91',
  'United States': '+1',
  'United Kingdom': '+44',
  Canada: '+1',
  Australia: '+61',
  Germany: '+49',
  France: '+33',
  Netherlands: '+31',
  Singapore: '+65',
  Japan: '+81',
  China: '+86',
  Brazil: '+55',
  Mexico: '+52',
  'South Africa': '+27',
  'New Zealand': '+64',
};

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
  const [phoneCountry, setPhoneCountry] = useState('');
  const [error, setError] = useState('');
  const selectedFlag = phoneCountry ? COUNTRY_FLAG_MAP[phoneCountry] || '🌍' : '🌍';
  const selectedCode = phoneCountry ? COUNTRY_CODE_MAP[phoneCountry] || '' : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    console.log(phone);
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
      const result = await register({
        firstName,
        lastName,
        email,
        password,
        gender,
        country,
        contact: phoneCountry + phone,
      });

      if (result.success) {
        toast.success('Account created successfully!');
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleBackClick = () => {
    router.push('/login');
  };

  return (
    <div
      className="h-screen w-screen flex flex-col md:flex-row relative overflow-hidden"
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
        <h1 className="flex-1 text-center text-white text-lg font-semibold pr-10">Registration</h1>
      </div>

      {/* Desktop Welcome Panel */}
      <div className="hidden md:flex md:w-1/2 lg:w-[45%] flex-col px-6 lg:px-10 xl:px-12 relative">
        <div className="max-w-md mt-[6%]">
          <h1 className="text-white text-xl lg:text-2xl font-bold mb-2">Welcome to Hi2</h1>
          <p className="text-white/90 text-xs leading-relaxed">
            Join us and unlock a smarter, faster, and more meaningful way to connect with people,
            explore endless possibilities, and grow both personally and professionally with every
            step you take.
          </p>
        </div>

        {/* Decorative People Illustration */}
        <div className="flex-grow flex items-end pointer-events-none mt-6">
          <div className="w-full h-[280px] lg:h-[320px] xl:h-[350px] relative">
            <Image
              src="/images/login/people-group-left.png"
              alt="Community"
              fill
              className="object-contain object-bottom opacity-90"
              sizes="(max-width: 1024px) 280px, (max-width: 1280px) 320px, 350px"
              priority
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-4 md:py-6 relative">
        {/* Registration Card with Logo on Top */}
        <div className="w-full max-w-[380px] md:max-w-[420px] relative mt-10 md:mt-12">
          {/* Logo - Positioned on top right of card */}
          <div className="absolute -top-6 right-6 md:-top-20 md:right-44 z-20">
            <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] flex items-center justify-center relative">
              <Image
                src="/images/login/logo.png"
                alt="Hi2 Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 50px, (max-width: 1024px) 60px, 70px"
              />
            </div>
          </div>

          {/* Registration Card */}
          <div className="bg-white rounded-[18px] md:rounded-[20px] shadow-2xl px-6 py-4 md:px-7 md:py-5 z-10 w-full">
            <h2 className="text-lg md:text-xl font-semibold text-center text-[#37CE62] mb-3">
              Sign Up
            </h2>

            {error && (
              <div className="mb-2 p-2 bg-red-50 text-red-600 rounded-lg text-xs">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-2">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="block w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[#37CE62] outline-none transition-all"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="block w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[#37CE62] outline-none transition-all"
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
                  className="block w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[#37CE62] outline-none transition-all"
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
                  className="block w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[#37CE62] outline-none transition-all"
                  placeholder="Password"
                  required
                />
              </div>

              {/* Country & Gender */}
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="block w-full px-3 py-2 text-sm text-gray-700 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[#37CE62] outline-none appearance-none cursor-pointer"
                  >
                    <option value="">Select Country</option>
                    {COUNTRIES.map((countryName) => (
                      <option key={countryName} value={countryName}>
                        {countryName}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="block w-full px-3 py-2 text-sm text-gray-700 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[#37CE62] outline-none appearance-none cursor-pointer"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Phone Number with Country Flag */}
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  {/* <div className="flex items-center gap-1.5">
                    <span className="text-xl" aria-label={phoneCountry || 'Country flag'}>
                      {selectedFlag}
                    </span>
                    {selectedCode && (
                      <span className="text-xs font-semibold text-gray-700">{selectedCode}</span>
                    )}
                  </div> */}
                  <div className="relative shrink-0">
                    <select
                      value={phoneCountry}
                      onChange={(e) => setPhoneCountry(e.target.value)}
                      className="block w-[9px] min-w-[96px] px-2 pr-6 py-1.5 text-xs text-gray-700 bg-white border-0 rounded-lg shadow-sm focus:ring-2 focus:ring-[#37CE62] outline-none appearance-none cursor-pointer"
                    >
                      <option value="">Select</option>
                      {COUNTRIES.map((countryName) => {
                        const flag = COUNTRY_FLAG_MAP[countryName] || '🌍';
                        const code = COUNTRY_CODE_MAP[countryName] || '';
                        return (
                          <option key={countryName} value={code}>
                            {flag} {code}
                          </option>
                        );
                      })}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 text-sm text-gray-900 bg-transparent border-0 outline-none"
                  placeholder="0612345678"
                />
              </div>

              {/* Terms & Privacy */}
              <div className="text-[10px] text-gray-600 text-center leading-tight pt-1">
                By clicking sign up. You agree to our{' '}
                <Link href="/terms" className="text-[#37CE62] hover:underline">
                  terms
                </Link>
                ,{' '}
                <Link href="/privacy" className="text-[#37CE62] hover:underline">
                  privacy
                </Link>{' '}
                and{' '}
                <Link href="/cookies" className="text-[#37CE62] hover:underline">
                  cookies policy
                </Link>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#37CE62] rounded-full text-white font-semibold py-2 text-sm hover:bg-[#2db36c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#37CE62] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Registering...' : 'Register Now'}
              </button>

              {/* Login Link */}
              <div className="text-center text-xs text-gray-600 pt-1">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-red-500 hover:underline">
                  Log in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
