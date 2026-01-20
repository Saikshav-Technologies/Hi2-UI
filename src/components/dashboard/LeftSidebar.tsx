'use client';

import { MapPin, Briefcase, Phone } from 'lucide-react';
import Image from 'next/image';

interface Contact {
  id: string;
  name: string;
  image: string;
  isOnline: boolean;
}

interface LeftSidebarProps {
  introduction?: string;
  location?: string;
  workplace?: string;
  contacts?: Contact[];
}

export default function LeftSidebar({
  introduction = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1930s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  location = 'Paris, France',
  workplace = 'Phil Barbosa',
  contacts = [],
}: LeftSidebarProps) {
  return (
    <div className="space-y-4 sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto">
      {/* Introduction Card */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Introduction</h3>
          <button className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-medium hover:bg-green-200 transition-colors">
            Edit
          </button>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{introduction}</p>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Info</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div>
              <span className="text-gray-600">Live in </span>
              <span className="font-medium text-gray-900">{location}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <span className="text-gray-600">From </span>
            <span className="font-medium text-green-600 underline cursor-pointer">Marseille</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Briefcase className="w-5 h-5 text-gray-400" />
            <div>
              <span className="text-gray-600">Work at </span>
              <span className="font-medium text-gray-900">{workplace}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <button className="flex-1 bg-green-100 text-green-600 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
            Edit Details
          </button>
          <button className="flex-1 bg-green-100 text-green-600 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
            Add Hobbies
          </button>
        </div>
      </div>

      {/* Contacts Card */}
      {contacts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Contacts</span>
            </h3>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={contact.image}
                        alt={contact.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    {contact.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{contact.name}</span>
                </div>
                <button className="text-green-500 hover:text-green-600">
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-center text-sm text-green-600 font-medium hover:underline">
            View All
          </button>
        </div>
      )}
    </div>
  );
}
