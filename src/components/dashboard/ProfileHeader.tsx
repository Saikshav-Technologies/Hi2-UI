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
    <div className="bg-white pb-2 relative md:mt-4 md:px-6 md:py-6">
      {/* Cover Image & Profile Overlay */}
      <div className="relative mb-16 md:mb-0">
        {/* Cover Image */}
        <div className="relative h-48 md:h-[350px] w-full overflow-hidden md:rounded-xl">
          <Image src={coverImage} alt="Cover" fill className="object-cover" priority />
          <button className="absolute top-4 right-4 bg-white/30 backdrop-blur-sm rounded-full p-1.5 hover:bg-white/40 transition-colors pointer-events-none">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </button>
        </div>

        {/* Profile Picture & Badges */}
        <div className="absolute -bottom-12 left-6 md:left-1/2 md:-translate-x-1/2 md:-bottom-16 z-20">
          <div className="relative">
            <div className="w-24 h-24 md:w-40 md:h-40 rounded-full p-1 bg-white">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image
                  src={profileImage}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Checkmark Badges */}
            <div className="absolute bottom-1 left-0 flex space-x-1 md:bottom-2 md:left-2">
              <div className="bg-[#37ce62] rounded-full p-1 border-2 border-white">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
            </div>
            <div className="absolute bottom-1 right-0 flex space-x-1 md:bottom-2 md:right-2">
              <div className="bg-[#37ce62] rounded-full p-1 border-2 border-white">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons (Right Aligned) - Mobile Only Position */}
        <div className="absolute -bottom-10 right-4 flex items-center space-x-2 md:hidden">
          <button className="bg-[#37ce62] text-white px-4 py-1.5 rounded-full flex items-center space-x-1 shadow-sm text-sm font-medium">
            <Plus className="w-4 h-4" />
            <span>Add Story</span>
          </button>
          <button className="bg-[#e8f5e9] text-[#37ce62] p-1.5 rounded-full">
            <Lock className="w-4 h-4" />
          </button>
        </div>

        {/* Desktop User Info & Actions Area - Overlaid on Cover Image */}
        <div className="hidden md:flex absolute bottom-0 left-0 right-0 items-center justify-center py-6 bg-white/90 backdrop-blur-sm z-10">
          <div className="flex items-center justify-between w-full max-w-7xl px-6">
            {/* Left Stats */}
            <div className="flex space-x-10">
              <div className="flex flex-col items-center text-center">
                <Image src={`/images/profile/post-icon.png`} alt="Post" width={24} height={24} className="mb-1" />
                <span className="block font-bold text-[#2c3975] text-lg">{stats.posts}</span>
                <span className="text-sm font-bold text-[#2c3975]">Post</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Image src={`/images/profile/follower-icon.png`} alt="Followers" width={24} height={24} className="mb-1" />
                <span className="block font-bold text-[#2c3975] text-lg">{stats.followers.toLocaleString()}</span>
                <span className="text-sm font-bold text-[#2c3975]">Followers</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Image src={`/images/profile/following-icon.png`} alt="Following" width={24} height={24} className="mb-1" />
                <span className="block font-bold text-[#2c3975] text-lg">{stats.following.toLocaleString()}</span>
                <span className="text-sm font-bold text-[#2c3975]">Following</span>
              </div>
            </div>


            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              <button className="bg-[#37ce62] text-white px-6 py-2 rounded-full flex items-center space-x-2 font-bold hover:bg-[#2fb854] transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add Story</span>
              </button>
              <button className="text-white p-2 rounded-full hover:bg-[#2fb854] transition-colors">
                <Image src={`/images/profile/lock-profile-icon.png`} alt="Lock" width={30} height={30} />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Tabs - Below Stats Overlay */}
        <div className="hidden md:flex absolute bottom-[-60px] left-0 right-0 items-center justify-center py-4 bg-[#2c2520]/90 backdrop-blur-sm z-10 md:rounded-b-xl">
          <div className="flex items-center justify-between w-full max-w-7xl px-6">
            <div className="flex items-center space-x-8">
              {/* Post Tab - Active */}
              <button className="flex items-center space-x-2 text-white">
                <svg className="w-5 h-5 text-[#37ce62]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
                <span className="font-semibold">Post</span>
              </button>

              {/* About Tab */}
              <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>About</span>
              </button>

              {/* Reels Tab */}
              <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                <span>Reels</span>
              </button>

              {/* Followers Tab */}
              <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span>Followers</span>
              </button>

              {/* Friends Tab */}
              <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span>Friends</span>
              </button>

              {/* Gallery Tab */}
              <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <span>Gallery</span>
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Mobile Name & Stats (Hidden on Desktop) */}
      <div className="px-4 mt-2 md:hidden">
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

      {/* Mobile Navigation Tabs (Hidden on Desktop) */}
      <div className="mt-4 border-b border-gray-100 md:hidden">
        <div className="flex items-center justify-between px-4">
          <button className="flex items-center space-x-1 py-3 px-4 bg-[#37ce62] text-white rounded-full text-sm font-medium">
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
