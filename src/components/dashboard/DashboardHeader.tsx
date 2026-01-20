'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export default function DashboardHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  const isHome = pathname === '/home';
  const isDashboard = pathname === '/dashboard';

  return (
    <header className="bg-[#2c3975] text-white px-6 py-2.5 flex items-center justify-between sticky top-0 z-50 shadow-md">
      {/* Left Section - Logo and Search */}
      <div className="flex items-center space-x-4">
        <div className="bg-[#8bc34a] rounded-full w-12 h-12 flex items-center justify-center font-bold text-white text-xl">
          H<span className="text-sm">U</span>2
        </div>
        <button className="p-2.5 hover:bg-[#3d4a7f] rounded-lg transition-colors">
          <svg
            className="w-6 h-6 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* Center Section - Navigation Icons */}
      <nav className="hidden md:flex items-center space-x-6">
        <button
          onClick={() => router.push('/home')}
          className={`p-3 rounded-lg transition-colors ${
            isHome ? 'bg-[#3d4a7f]' : 'hover:bg-[#3d4a7f]'
          }`}
        >
          <svg className="w-7 h-7 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </button>
        <button className="p-3 hover:bg-[#3d4a7f] rounded-lg transition-colors">
          <svg className="w-7 h-7 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        </button>
        <button className="p-3 hover:bg-[#3d4a7f] rounded-lg transition-colors">
          <div className="bg-[#8bc34a] rounded-full w-7 h-7 flex items-center justify-center font-bold text-white text-xs">
            H<span className="text-[10px]">U</span>2
          </div>
        </button>
        <button className="p-3 hover:bg-[#3d4a7f] rounded-lg transition-colors">
          <svg className="w-7 h-7 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button className="p-3 hover:bg-[#3d4a7f] rounded-lg transition-colors">
          <svg className="w-7 h-7 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        </button>
        <button className="p-3 hover:bg-[#3d4a7f] rounded-lg transition-colors">
          <svg className="w-7 h-7 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>

      {/* Right Section - User Actions */}
      <div className="flex items-center space-x-2">
        <button className="p-2.5 hover:bg-[#3d4a7f] rounded-lg transition-colors">
          <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
        <button className="p-2.5 hover:bg-[#3d4a7f] rounded-lg transition-colors relative">
          <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </button>
        <button className="p-2.5 hover:bg-[#3d4a7f] rounded-lg transition-colors">
          <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={() => router.push('/dashboard')}
          className={`flex items-center space-x-2 p-1.5 rounded-lg transition-colors ${
            isDashboard ? 'bg-[#3d4a7f]' : 'hover:bg-[#3d4a7f]'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-gray-400 overflow-hidden flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
