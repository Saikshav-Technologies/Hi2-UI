'use client';

import { Lock, Plus } from 'lucide-react';
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
  profileImage = '/images/profile/m-profile-girl.png',
  coverImage = '/images/profile/m-top-girl.png',
  stats,
}: ProfileHeaderProps) {
  return (
    <div className="bg-white pb-2">
      {/* Cover Image & Profile Overlay */}
      <div className="relative mb-16">
        {/* Cover Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image src={coverImage} alt="Cover" fill className="object-cover" priority />
          <button className="absolute top-4 right-4 bg-white/30 backdrop-blur-sm rounded-full p-1.5 hover:bg-white/40 transition-colors pointer-events-none">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </button>
        </div>

        {/* Profile Picture & Badges */}
        <div className="absolute -bottom-12 left-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full p-1 bg-white">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image
                  src={profileImage}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Status Icons */}
            <div className="absolute bottom-1 right-0 flex space-x-1">
              <div className="bg-[#56d059] rounded-full p-1 border-2 border-white">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
              </div>
              <div className="bg-[#56d059] rounded-full p-1 border-2 border-white">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons (Right Aligned) */}
        <div className="absolute -bottom-10 right-4 flex items-center space-x-2">
          <button className="bg-[#56d059] text-white px-4 py-1.5 rounded-full flex items-center space-x-1 shadow-sm text-sm font-medium">
            <Plus className="w-4 h-4" />
            <span>Add Story</span>
          </button>
          <button className="bg-[#e8f5e9] text-[#56d059] p-1.5 rounded-full">
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Name & Stats */}
      <div className="px-4 mt-2">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-[#2c3975]">{name}</h1>
            <div className="flex items-center space-x-4 mt-1 text-sm text-[#2c3975]">
              <span><span className="font-bold">{stats.followers.toLocaleString()}</span> Followers</span>
              <span><span className="font-bold">{stats.following.toLocaleString()}</span> Following</span>
            </div>
          </div>
          {/* Follower Avatars (Mock) */}
          <div className="flex -space-x-2 mt-1">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-6 h-6 rounded-full border border-white overflow-hidden relative bg-gray-200">
                <Image src={`/images/profile/m-round-img.png`} alt="follower" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mt-4 border-b border-gray-100">
        <div className="flex items-center justify-between px-4">
          <button className="flex items-center space-x-1 py-3 px-4 bg-[#56d059] text-white rounded-full text-sm font-medium">
            <Plus className="w-4 h-4" />
            <span>Post</span>
          </button>
          <button className="py-3 px-2 text-[#2c3975] font-bold text-sm flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            <span>About</span>
          </button>
          <button className="py-3 px-2 text-[#2c3975] font-bold text-sm flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" /></svg>
            <span>Reels</span>
          </button>
          <button className="py-3 px-2 text-[#2c3975] font-bold text-sm flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>
            <span>Followers</span>
          </button>
          <button className="py-3 px-2 text-[#2c3975] font-bold text-sm">
            More ▼
          </button>
        </div>
      </div>
    </div>
  );
}
