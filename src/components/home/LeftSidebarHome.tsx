'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';

interface GroupSuggestion {
  id: string;
  name: string;
  icon: string;
}

interface Group {
  id: string;
  name: string;
  members: string[];
}

const ads = [
  {
    id: '1',
    title: 'Black Friday Sale',
    subtitle: 'Up to 80% off on YourStyle',
    image: '/images/login/logo.png',
  },
  {
    id: '2',
    title: 'Black Friday Sale',
    subtitle: 'Up to 60% off on YourStyle',
    image: '/images/login/logo.png',
  },
];

const groups: Group[] = [
  {
    id: '1',
    name: 'Bob and Sofia',
    members: ['/images/default-avatar.svg', '/images/default-avatar.svg'],
  },
  {
    id: '2',
    name: 'Family Group',
    members: ['/images/default-avatar.svg', '/images/default-avatar.svg'],
  },
];

const groupSuggestions: GroupSuggestion[] = [
  { id: '1', name: 'Nick', icon: '/images/default-avatar.svg' },
  { id: '2', name: 'Nick', icon: '/images/default-avatar.svg' },
  { id: '3', name: 'Nick', icon: '/images/default-avatar.svg' },
];

export default function LeftSidebarHome() {
  return (
    <div className="space-y-4 sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto">
      {/* Advertisement */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Advertisement</h3>
        <div className="space-y-3">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 text-white relative overflow-hidden"
            >
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                BLACK FRIDAY
              </div>
              <div className="mt-8">
                <h4 className="text-sm font-bold mb-1">{ad.title}</h4>
                <p className="text-xs text-gray-300">{ad.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Group */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Your Group</h3>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
            + Create New Group
          </button>
        </div>
        <div className="space-y-3">
          {groups.map((group) => (
            <div key={group.id} className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                {group.members.slice(0, 2).map((member, idx) => (
                  <div
                    key={idx}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-white bg-gray-200"
                  >
                    <Image
                      src={member}
                      alt="Member"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-900">{group.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Group Suggestions */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Group Suggestions</h3>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {groupSuggestions.map((suggestion) => (
            <div key={suggestion.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{suggestion.name.charAt(0)}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{suggestion.name}</span>
              </div>
              <button className="bg-green-500 text-white p-1.5 rounded-full hover:bg-green-600 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
