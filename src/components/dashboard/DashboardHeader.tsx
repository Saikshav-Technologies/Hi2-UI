'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import Image from 'next/image';

export default function DashboardHeader() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout, user } = useAuth();

  return (
    <header className="bg-[#56d059] md:bg-[#2c3975] px-4 py-2 flex items-center justify-between sticky top-0 z-50 shadow-md">
      {/* Left: Logo and Search */}
      <div className="flex items-center space-x-3">
        <button onClick={() => router.push('/')} className="relative w-10 h-10 md:w-12 md:h-12 hover:opacity-80 transition-opacity">
          <Image src="/images/profile/m-profile-logo.png" alt="Hi2 Logo" fill className="object-contain" />
        </button>
        <button className="text-white hover:text-white/80 transition-colors">
          <NavIconImage src="/images/d-header-search-icon.png" alt="Search Icon" active />
        </button>
      </div>

      {/* Center: Desktop Navigation (Hidden on Mobile) */}
      <nav className="hidden md:flex items-center space-x-12">
        <div onClick={() => router.push('/home')}>
          <NavIconImage src="/images/d-header-home.png" alt="Home" active />
        </div>
        <NavIconImage src="/images/d-header-movie.png" alt="Videos" />
        {/* Central Brand Icon */}
        <div className="relative w-8 h-8">
          <Image src="/images/d-header-logo-icon.png" alt="Hi2" fill className="object-contain" />
        </div>
        <NavIconImage src="/images/d-header-market.png" alt="Market" />
        <NavIconImage src="/images/d-header-friends.png" alt="Friends" />
        <NavIconImage src="/images/d-header-notification.png" alt="Notifications" />
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center space-x-3 md:space-x-5">
        {/* Desktop Only Icons */}
        <div className="hidden md:flex items-center space-x-5">
          <button className="hover:opacity-80 transition-opacity">
            <div className="relative w-6 h-6">
              <Image src="/images/d-header-menu.png" alt="Menu" fill className="object-contain" />
            </div>
          </button>
          <button className="hover:opacity-80 transition-opacity relative">
            <div className="relative w-6 h-6">
              <Image src="/images/d-header-ring.png" alt="Notifications" fill className="object-contain" />
            </div>
            <span className="absolute -top-1 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="hover:opacity-80 transition-opacity">
            <div className="relative w-6 h-6">
              <Image src="/images/d-header-message.png" alt="Messages" fill className="object-contain" />
            </div>
          </button>
        </div>

        {/* Mobile Right Icons (Matches original mobile design, simpler) */}
        <div className="flex md:hidden items-center space-x-4">
          <button className="bg-white/20 rounded-full p-1.5 text-white hover:bg-white/30 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button className="text-white hover:text-white/80 transition-colors relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-white rounded-full w-2.5 h-2.5"></span>
          </button>
          <button className="text-white hover:text-white/80 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>


        {/* User Dropdown */}
        <div className="relative ml-2">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-center focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-white p-0.5 overflow-hidden">
              <div className="w-full h-full relative rounded-full">
                <Image
                  src={"/images/profile/m-profile-girl.png"}
                  alt="User"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Dropdown Arrow (Desktop) */}
            <div className="hidden md:block ml-1 text-white">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-gray-100 md:hidden">
                <span className="text-xs text-gray-500 font-bold">Dashboard Menu</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function NavIconImage({ src, alt, active }: { src: string, alt: string, active?: boolean }) {
  return (
    <button className={`p-2 transition-opacity relative ${active ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}>
      <div className="relative w-6 h-6">
        <Image src={src} alt={alt} fill className="object-contain" />
      </div>
      {active && <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>}
    </button>
  )
}
