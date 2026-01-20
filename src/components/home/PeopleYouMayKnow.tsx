'use client';

import Image from 'next/image';
import { X } from 'lucide-react';

interface Person {
  id: string;
  name: string;
  image: string;
  mutualFriends?: number;
}

const people: Person[] = [
  { id: '1', name: 'Tom Kruger', image: '/images/default-avatar.svg' },
  { id: '2', name: 'Kenllda', image: '/images/default-avatar.svg' },
  { id: '3', name: 'Jon wargel', image: '/images/default-avatar.svg' },
  { id: '4', name: 'Jekky Me', image: '/images/default-avatar.svg' },
];

export default function PeopleYouMayKnow() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">People you may know</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {people.map((person) => (
          <div
            key={person.id}
            className="relative bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
          >
            <button className="absolute top-2 right-2 p-1 bg-white rounded-full hover:bg-gray-200 shadow-sm">
              <X className="w-4 h-4 text-gray-600" />
            </button>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 mb-2">
                <Image
                  src={person.image}
                  alt={person.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-semibold text-sm text-gray-900 text-center mb-2 line-clamp-1">
                {person.name}
              </h3>
              <div className="flex space-x-2 w-full">
                <button className="flex-1 bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-green-600 transition-colors">
                  Add Friend
                </button>
                <button className="flex-1 bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-300 transition-colors">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
