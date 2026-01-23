'use client';

import { MapPin, Briefcase, Home as HomeIcon, MessageCircle } from 'lucide-react';
import Image from 'next/image';

interface Contact {
  id: string;
  name: string;
  image: string;
  isOnline: boolean;
}

interface LeftSidebarProps {
  contacts: Contact[];
}

export default function LeftSidebar({ contacts }: LeftSidebarProps) {
  return (
    <div className="space-y-4">
      {/* Introduction Card */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-[#2c3975] text-sm">Introduction</h3>
          <button className="bg-[#56d059] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 hover:bg-[#4bc14e] transition-colors">
            <span className="text-[10px]">✎</span> Edit
          </button>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>

        <div className="space-y-3">
          <h4 className="font-bold text-[#2c3975] text-xs">Info</h4>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <HomeIcon className="w-3.5 h-3.5 text-[#56d059]" />
              <span>Live in <span className="text-[#56d059] font-medium">Perice, France.</span></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#56d059]" />
              <span>From <span className="text-[#56d059] font-medium">Marseille</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-[#56d059]" />
              <span>Work at <span className="text-[#56d059] font-medium">PNB Paribas</span></span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-[#56d059] text-white text-xs py-2 rounded-lg hover:bg-[#4bc14e] transition-colors">
            Edit Details
          </button>
          <button className="flex-1 border border-[#56d059] text-[#56d059] text-xs py-2 rounded-lg hover:bg-[#f0fdf4] transition-colors">
            Add Hobbies
          </button>
        </div>
      </div>

      {/* Contacts Card */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <UsersIcon className="w-4 h-4 text-[#56d059]" />
            <h3 className="font-bold text-[#333] text-sm">Contacts</h3>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-100 rounded-full py-1 pl-3 pr-8 text-xs w-28 focus:outline-none focus:ring-1 focus:ring-[#56d059]"
            />
            <SearchIcon className="w-3 h-3 text-gray-400 absolute right-2 top-1.5" />
          </div>
        </div>

        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8">
                  <Image
                    src={contact.image}
                    alt={contact.name}
                    fill
                    className="object-cover rounded-full border border-gray-200"
                  />
                  {contact.isOnline && (
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
                  )}
                  {!contact.isOnline && index === 4 && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500 rounded-full border border-white text-[8px] text-white flex items-center justify-center">10m</span>
                  )}
                  {!contact.isOnline && index === 5 && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white text-[8px] text-white flex items-center justify-center">1w</span>
                  )}
                </div>
                <span className="text-xs font-semibold text-[#2c3975]">{contact.name}</span>
              </div>
              <button className="text-[#56d059] hover:bg-green-50 p-1 rounded-full transition-colors">
                <MessageCircle className="w-4 h-4 fill-current" />
              </button>
            </div>
          ))}
        </div>

        <button className="w-full text-center text-xs font-bold text-[#2c3975] mt-4 hover:underline">
          View All
        </button>
      </div>
    </div>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
    </svg>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}
