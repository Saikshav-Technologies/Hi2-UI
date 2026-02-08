'use client';

import Image from 'next/image';
import { Plus, Lock } from 'lucide-react';
import { ProfileStats } from '@/mocks';
import { useRef, useState } from 'react';
import { getValidAccessToken } from '@/lib/auth';
import { API_BASE_URL } from '@/lib/constants';
import { useAuth } from '@/hooks/useAuth';

interface ProfileHeaderProps {
  name: string;
  avatar: string;
  coverImage: string;
  stats: ProfileStats;
}

export default function ProfileHeader({ name, avatar, coverImage, stats }: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const { avatarUrl, setAvatarUrl } = useAuth();
  const [avatarKey, setAvatarKey] = useState<string | null>(null);
  const currentAvatar = avatarUrl || avatar;

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    // if (file.size > 5 * 1024 * 1024) {
    //   setUploadError('Image size must be less than 5MB');
    //   return;
    // }

    setIsUploading(true);
    setUploadError('');

    try {
      // Step 1: Get presigned URL from backend
      const token = await getValidAccessToken();
      if (!token) {
        setUploadError('Authentication required. Please log in again.');
        setIsUploading(false);
        return;
      }

      const presignedResponse = await fetch(`${API_BASE_URL}/users/avatar/upload-url`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentType: file.type,
        }),
      });

      if (!presignedResponse.ok) {
        throw new Error('Failed to get upload URL');
      }

      const presignedData = await presignedResponse.json();

      if (!presignedData.success) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadUrl, key } = presignedData.data;

      // Step 2: Upload image to S3 using presigned URL
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image');
      }

      // Step 3: Fetch the new presigned URL to display the image
      const newAvatarResponse = await fetch(
        `${API_BASE_URL}/users/avatar/presigned-url/?key=${key}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (newAvatarResponse.ok) {
        const newAvatarData = await newAvatarResponse.json();
        if (newAvatarData.success && newAvatarData.data?.url) {
          setAvatarUrl(newAvatarData.data.url);
          setAvatarKey(key);
        }
      }

      // Success feedback
      setUploadError('');
      alert('Profile picture updated successfully!');
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadError(error.message || 'Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="bg-white relative">
      {/* Cover Image & Profile Section */}
      <div className="relative">
        {/* Cover Image */}
        <div className="relative h-48 md:h-[350px] w-full overflow-hidden md:rounded-xl">
          <Image src={coverImage} alt="Cover" fill className="object-cover" priority />

          {/* Edit Button (Top Right) */}
          <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2.5 hover:bg-white transition-colors shadow-md">
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>

        {/* White Space Background for Profile Picture */}
        <div className="bg-white h-24 md:h-28"></div>

        {/* Profile Picture (Centered, Overlaid) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[140px] md:top-[290px] z-30">
          <div className="relative">
            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Profile Picture - Clickable */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-white shadow-lg">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-gray-200">
                <Image
                  src={currentAvatar || '/images/profile/default-avatar.png'}
                  alt={name}
                  fill
                  className="object-cover"
                  onError={() => {
                    // Fallback to default if image fails to load
                    setAvatarUrl('/images/profile/default-avatar.png');
                  }}
                />
              </div>
            </div>

            {/* Camera/Edit Icon Badge (Bottom Left) */}
            <div
              className={`absolute bottom-2 left-2 bg-[#131c61] rounded-full p-2 border-2 border-white transition-colors ${
                isUploading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:bg-[#0f1549]'
              }`}
              onClick={isUploading ? undefined : handleProfileImageClick}
              role="button"
              tabIndex={isUploading ? -1 : 0}
              onKeyDown={(e) => {
                if (!isUploading && (e.key === 'Enter' || e.key === ' ')) {
                  handleProfileImageClick();
                }
              }}
            >
              {isUploading ? (
                <svg className="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </div>

            {/* Checkmark Badge (Bottom Right) */}
            <div className="absolute bottom-2 right-2 bg-[#37ce62] rounded-full p-2 border-2 border-white">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Upload Error Message */}
          {uploadError && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-max max-w-xs z-50">
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm shadow-md">
                {uploadError}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Name Section - Below Profile Picture (Centered) - Desktop Only */}
      <div className="hidden md:block text-center pt-6 pb-4 bg-white">
        <h1 className="text-2xl md:text-3xl font-bold text-[#2c3975]">{name}</h1>
      </div>

      {/* Stats Section (Desktop) - All in one line */}
      <div className="hidden md:flex items-center justify-between py-6 px-8 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-16">
          {/* Posts */}
          <div className="flex items-center space-x-3">
            <Image src="/images/profile/post-icon.png" alt="Posts" width={24} height={24} />
            <div>
              <span className="block font-bold text-[#2c3975] text-lg">{stats.posts}</span>
              <span className="text-sm font-bold text-[#2c3975]">Post</span>
            </div>
          </div>

          {/* Followers */}
          <div className="flex items-center space-x-3">
            <Image src="/images/profile/follower-icon.png" alt="Followers" width={24} height={24} />
            <div>
              <span className="block font-bold text-[#2c3975] text-lg">
                {stats.followers.toLocaleString()}
              </span>
              <span className="text-sm font-bold text-[#2c3975]">Followers</span>
            </div>
          </div>

          {/* Following */}
          <div className="flex items-center space-x-3">
            <Image
              src="/images/profile/following-icon.png"
              alt="Following"
              width={24}
              height={24}
            />
            <div>
              <span className="block font-bold text-[#2c3975] text-lg">
                {stats.following.toLocaleString()}
              </span>
              <span className="text-sm font-bold text-[#2c3975]">Following</span>
            </div>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Add Story Button */}
          <button className="bg-[#131c61] text-white px-6 py-2 rounded-full flex items-center space-x-2 font-bold hover:bg-[#0f1549] transition-colors whitespace-nowrap">
            <Plus className="w-4 h-4" />
            <span>Add Story</span>
          </button>

          {/* Music Button */}
          <button className="bg-[#131c61] text-white p-2 rounded-full border border-[#e2e5e9] hover:bg-[#0f1549] transition-colors">
            <Image src="/images/profile/music-icon.png" alt="Music" width={20} height={20} />
          </button>

          {/* Lock Button */}
          <button className="bg-[#131c61] text-white p-2 rounded-full hover:bg-[#0f1549] transition-colors">
            <Lock className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Stats (Below Profile Picture) */}
      <div className="md:hidden pt-4 pb-4 px-4 bg-white">
        <h1 className="text-xl font-bold text-[#2c3975] text-center mb-4">{name}</h1>

        <div className="flex justify-center space-x-8 mb-4">
          <div className="text-center">
            <div className="font-bold text-[#2c3975] text-lg">{stats.posts}</div>
            <div className="text-xs text-gray-600">Posts</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-[#2c3975] text-lg">
              {stats.followers.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-[#2c3975] text-lg">
              {stats.following.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600">Following</div>
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex space-x-2">
          <button className="flex-1 bg-[#131c61] text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 font-medium text-sm">
            <Plus className="w-4 h-4" />
            <span>Add Story</span>
          </button>
          <button className="bg-[#131c61] text-white p-2 rounded-full border border-[#e2e5e9]">
            <Image src="/images/profile/music-icon.png" alt="Music" width={20} height={20} />
          </button>
          <button className="bg-[#131c61] text-white p-2 rounded-full">
            <Lock className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
