'use client';

import { Search, Plus, MessageCircle, Bell } from 'lucide-react';
import Image from 'next/image';

export default function MobileHeader() {
  return (
    <header className="bg-[#56d059] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="relative w-12 h-12">
          <Image src="/images/profile/m-profile-logo.png" alt="Hu2 Logo" fill className="object-contain" />
        </div>
        <button className="text-white hover:text-white/80 transition-colors">
          <Search className="w-6 h-6" />
        </button>
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-4">
        <button className="bg-white/20 rounded-full p-1 text-white hover:bg-white/30 transition-colors">
          <Plus className="w-5 h-5" />
        </button>
        <button className="text-white hover:text-white/80 transition-colors relative">
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></span>
        </button>
        <button className="text-white hover:text-white/80 transition-colors">
          <Bell className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
