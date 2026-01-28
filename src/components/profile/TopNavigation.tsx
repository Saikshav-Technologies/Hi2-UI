'use client';

import Image from 'next/image';
import { Search, LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function TopNavigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const { logout } = useAuth();

    // Close profile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <nav className="bg-[#131c61] text-white sticky top-0 z-50 shadow-md">
            <div className="max-w-full px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Left: Logo + Search */}
                    <div className="flex items-center space-x-6">
                        {/* Logo */}
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            <Image
                                src="/images/login/logo.png"
                                alt="Hi2"
                                width={36}
                                height={36}
                                className="object-contain"
                            />
                            <span className="text-xl font-bold">Hi2</span>
                        </div>

                        {/* Search Bar */}
                        <div className="hidden md:flex items-center bg-[#1a2570] rounded-full px-4 py-2 w-64">
                            <Search className="w-4 h-4 text-white/60 mr-2 flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Search streams..."
                                className="bg-transparent border-none outline-none text-sm text-white placeholder-white/40 w-full"
                            />
                        </div>
                    </div>

                    {/* Center: Navigation Icons (Desktop) */}
                    <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Image src="/images/d-header-home.png" alt="Home" width={24} height={24} />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Image src="/images/d-header-movie.png" alt="Video" width={24} height={24} />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Image src="/images/d-header-market.png" alt="Market" width={24} height={24} />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Image src="/images/d-header-menu.png" alt="Apps" width={24} height={24} />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Image src="/images/d-header-friends.png" alt="People" width={24} height={24} />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 2C8.44772 2 8 2.44772 8 3V4H6C4.89543 4 4 4.89543 4 6V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V6C20 4.89543 19.1046 4 18 4H16V3C16 2.44772 15.5523 2 15 2C14.4477 2 14 2.44772 14 3V4H10V3C10 2.44772 9.55228 2 9 2ZM6 9V20H18V9H6Z" />
                            </svg>
                        </button>
                    </div>

                    {/* Right: Grid Menu, Notification, Message, Profile */}
                    <div className="flex items-center space-x-4">
                        {/* Grid Menu Icon */}
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors hidden lg:block">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4 4h6v6H4V4zm0 10h6v6H4v-6zm10 0h6v6h-6v-6zm0-10h6v6h-6V4z" />
                            </svg>
                        </button>

                        {/* Notification Bell */}
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors hidden md:block relative">
                            <Image src="/images/d-header-notification.png" alt="Notifications" width={24} height={24} />
                        </button>

                        {/* Messages */}
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors hidden md:block">
                            <Image src="/images/d-header-message.png" alt="Messages" width={24} height={24} />
                        </button>

                        {/* Profile Avatar with Dropdown */}
                        <div className="relative" ref={profileMenuRef}>
                            <button
                                className="hover:opacity-90 transition-opacity"
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                            >
                                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/20">
                                    <Image
                                        src="/images/profile/m-profile-girl.png"
                                        alt="Profile"
                                        width={36}
                                        height={36}
                                        className="object-cover"
                                    />
                                </div>
                            </button>

                            {/* Profile Dropdown Menu */}
                            {isProfileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span className="text-sm font-medium">Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden pb-3">
                    <div className="flex items-center bg-[#1a2570] rounded-full px-4 py-2">
                        <Search className="w-4 h-4 text-white/60 mr-2" />
                        <input
                            type="text"
                            placeholder="Search streams..."
                            className="bg-transparent border-none outline-none text-sm text-white placeholder-white/40 w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="lg:hidden bg-[#0f1549] border-t border-white/10">
                    <div className="px-4 py-3 space-y-2">
                        <button className="flex items-center space-x-3 w-full hover:bg-white/5 p-3 rounded-lg transition-colors">
                            <Image src="/images/d-header-home.png" alt="Home" width={20} height={20} />
                            <span className="text-sm font-medium">Home</span>
                        </button>
                        <button className="flex items-center space-x-3 w-full hover:bg-white/5 p-3 rounded-lg transition-colors">
                            <Image src="/images/d-header-movie.png" alt="Video" width={20} height={20} />
                            <span className="text-sm font-medium">Video</span>
                        </button>
                        <button className="flex items-center space-x-3 w-full hover:bg-white/5 p-3 rounded-lg transition-colors">
                            <Image src="/images/d-header-market.png" alt="Market" width={20} height={20} />
                            <span className="text-sm font-medium">Market</span>
                        </button>
                        <button className="flex items-center space-x-3 w-full hover:bg-white/5 p-3 rounded-lg transition-colors">
                            <Image src="/images/d-header-friends.png" alt="Friends" width={20} height={20} />
                            <span className="text-sm font-medium">Friends</span>
                        </button>
                        <button className="flex items-center space-x-3 w-full hover:bg-white/5 p-3 rounded-lg transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" />
                            </svg>
                            <span className="text-sm font-medium">Notifications</span>
                        </button>
                        <button className="flex items-center space-x-3 w-full hover:bg-white/5 p-3 rounded-lg transition-colors">
                            <Image src="/images/d-header-message.png" alt="Messages" width={20} height={20} />
                            <span className="text-sm font-medium">Messages</span>
                        </button>
                        <div className="border-t border-white/10 my-2"></div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 w-full hover:bg-white/5 p-3 rounded-lg transition-colors text-red-400"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="text-sm font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
