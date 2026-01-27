'use client';

import Image from 'next/image';
import { Plus, Lock } from 'lucide-react';
import { ProfileStats } from '@/mocks';

interface ProfileHeaderProps {
    name: string;
    avatar: string;
    coverImage: string;
    stats: ProfileStats;
}

export default function ProfileHeader({ name, avatar, coverImage, stats }: ProfileHeaderProps) {
    return (
        <div className="bg-white relative">
            {/* Cover Image & Profile Section */}
            <div className="relative">
                {/* Cover Image */}
                <div className="relative h-48 md:h-[350px] w-full overflow-hidden md:rounded-xl">
                    <Image
                        src={coverImage}
                        alt="Cover"
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Edit Button (Top Right) */}
                    <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                </div>

                {/* Profile Picture (Centered, Overlaid) */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-16 md:-bottom-20 z-30">
                    <div className="relative">
                        {/* Profile Picture */}
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-white">
                            <div className="w-full h-full rounded-full overflow-hidden relative">
                                <Image
                                    src={avatar}
                                    alt={name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Music Icon Badge (Bottom Left) */}
                        <div className="absolute bottom-2 left-2 bg-[#131c61] rounded-full p-2 border-2 border-white">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                            </svg>
                        </div>

                        {/* Checkmark Badge (Bottom Right) */}
                        <div className="absolute bottom-2 right-2 bg-[#37ce62] rounded-full p-2 border-2 border-white">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Stats Overlay (Desktop) */}
                <div className="hidden md:flex absolute bottom-0 left-0 right-0 items-center justify-center py-6 bg-white/90 backdrop-blur-sm z-20">
                    <div className="flex items-center justify-between w-full max-w-7xl px-6">
                        {/* Left: Stats */}
                        <div className="flex space-x-10">
                            {/* Posts */}
                            <div className="flex flex-col items-center text-center">
                                <Image src="/images/profile/post-icon.png" alt="Posts" width={24} height={24} className="mb-1" />
                                <span className="block font-bold text-[#2c3975] text-lg">{stats.posts}</span>
                                <span className="text-sm font-bold text-[#2c3975]">Post</span>
                            </div>

                            {/* Followers */}
                            <div className="flex flex-col items-center text-center">
                                <Image src="/images/profile/follower-icon.png" alt="Followers" width={24} height={24} className="mb-1" />
                                <span className="block font-bold text-[#2c3975] text-lg">{stats.followers.toLocaleString()}</span>
                                <span className="text-sm font-bold text-[#2c3975]">Followers</span>
                            </div>

                            {/* Following */}
                            <div className="flex flex-col items-center text-center">
                                <Image src="/images/profile/following-icon.png" alt="Following" width={24} height={24} className="mb-1" />
                                <span className="block font-bold text-[#2c3975] text-lg">{stats.following.toLocaleString()}</span>
                                <span className="text-sm font-bold text-[#2c3975]">Following</span>
                            </div>
                        </div>

                        {/* Right: Action Buttons */}
                        <div className="flex items-center space-x-3">
                            {/* Add Story Button */}
                            <button className="bg-[#131c61] text-white px-6 py-2 rounded-full flex items-center space-x-2 font-bold hover:bg-[#0f1549] transition-colors">
                                <Plus className="w-4 h-4" />
                                <span>Add Story</span>
                            </button>

                            {/* Lock Button */}
                            <button className="bg-[#131c61] text-white p-2 rounded-full hover:bg-[#0f1549] transition-colors">
                                <Lock className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Stats (Below Profile Picture) */}
            <div className="md:hidden pt-20 pb-4 px-4">
                <h1 className="text-xl font-bold text-[#2c3975] text-center mb-4">{name}</h1>

                <div className="flex justify-center space-x-8 mb-4">
                    <div className="text-center">
                        <div className="font-bold text-[#2c3975] text-lg">{stats.posts}</div>
                        <div className="text-xs text-gray-600">Posts</div>
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-[#2c3975] text-lg">{stats.followers.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Followers</div>
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-[#2c3975] text-lg">{stats.following.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Following</div>
                    </div>
                </div>

                {/* Mobile Action Buttons */}
                <div className="flex space-x-2">
                    <button className="flex-1 bg-[#131c61] text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 font-medium text-sm">
                        <Plus className="w-4 h-4" />
                        <span>Add Story</span>
                    </button>
                    <button className="bg-[#131c61] text-white p-2 rounded-full">
                        <Lock className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
