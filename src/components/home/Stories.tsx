'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';

interface Story {
  id: string;
  name: string;
  profileImage: string;
  backgroundImage: string;
  isActive: boolean;
}

const stories: Story[] = [
  {
    id: '1',
    name: 'Judy Nguyen',
    profileImage: '/images/default-avatar.svg',
    backgroundImage: '/images/login/people-group-left.png',
    isActive: false,
  },
  {
    id: '2',
    name: 'Judy Nguyen',
    profileImage: '/images/default-avatar.svg',
    backgroundImage: '/images/login/people-group-right.png',
    isActive: true,
  },
  {
    id: '3',
    name: 'Billy Vasquez',
    profileImage: '/images/default-avatar.svg',
    backgroundImage: '/images/login/people-group-left.png',
    isActive: true,
  },
  {
    id: '4',
    name: 'Amanda Re',
    profileImage: '/images/default-avatar.svg',
    backgroundImage: '/images/login/people-group-right.png',
    isActive: true,
  },
  {
    id: '5',
    name: 'Lori Stevens',
    profileImage: '/images/default-avatar.svg',
    backgroundImage: '/images/login/people-group-left.png',
    isActive: true,
  },
  {
    id: '6',
    name: 'Samuel',
    profileImage: '/images/default-avatar.svg',
    backgroundImage: '/images/login/people-group-right.png',
    isActive: true,
  },
];

export default function Stories() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-gray-900">Story</h2>
        <button className="text-green-600 hover:text-green-700 text-sm font-medium">See All</button>
      </div>
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {stories.map((story, index) => (
          <div
            key={story.id}
            className="relative flex-shrink-0 w-[220px] h-[280px] rounded-2xl overflow-hidden cursor-pointer group"
          >
            {/* Background Image */}
            <Image src={story.backgroundImage} alt={story.name} fill className="object-cover" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>

            {/* Profile Picture at Top */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <div
                className={`rounded-full p-1 ${story.isActive ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-yellow-500' : 'bg-white'}`}
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white bg-white">
                  <Image
                    src={story.profileImage}
                    alt={story.name}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              {/* Add Story Button - Only on first card */}
              {index === 0 && (
                <button className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-lg border-2 border-white hover:bg-gray-100 transition-colors">
                  <Plus className="w-5 h-5 text-green-600" />
                </button>
              )}
            </div>

            {/* Name at Bottom */}
            <div className="absolute bottom-4 left-0 right-0 text-center px-2">
              <p className="text-white font-semibold text-sm drop-shadow-lg">{story.name}</p>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
