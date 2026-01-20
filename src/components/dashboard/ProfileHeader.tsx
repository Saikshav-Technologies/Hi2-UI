'use client';

import { Camera } from 'lucide-react';
import Image from 'next/image';

interface ProfileHeaderProps {
  name: string;
  profileImage?: string;
  coverImage?: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

export default function ProfileHeader({
  name,
  profileImage = '/images/default-avatar.svg',
  coverImage = '/images/login/people-group-left.png',
  stats,
}: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-64 w-full">
        <Image src={coverImage} alt="Cover" fill className="object-cover" priority />
        <button className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors">
          <Camera className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Profile Info */}
      <div className="relative px-6 pb-6">
        {/* Profile Picture */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
              <Image
                src={profileImage}
                alt={name}
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 flex space-x-1">
              <button className="bg-green-500 text-white rounded-full p-2 border-2 border-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button className="bg-green-500 text-white rounded-full p-2 border-2 border-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="pt-20 flex justify-center space-x-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.posts}</div>
            <div className="text-sm text-gray-500">Post</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {stats.followers.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {stats.following.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Following</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-center space-x-3">
          <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors flex items-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <span>Add Story</span>
          </button>
          <button className="bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-t border-gray-200 px-6">
        <div className="flex justify-around items-center -mb-px">
          <button className="flex items-center space-x-2 py-4 border-b-2 border-green-500 text-green-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Post</span>
          </button>
          <button className="flex items-center space-x-2 py-4 text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">About</span>
          </button>
          <button className="flex items-center space-x-2 py-4 text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
            <span className="font-medium">Reels</span>
          </button>
          <button className="flex items-center space-x-2 py-4 text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="font-medium">Followers</span>
          </button>
          <button className="flex items-center space-x-2 py-4 text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span className="font-medium">Friends</span>
          </button>
          <button className="flex items-center space-x-2 py-4 text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Gallery</span>
          </button>
        </div>
      </div>
    </div>
  );
}
