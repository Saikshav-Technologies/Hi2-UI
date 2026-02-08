'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { getValidAccessToken } from '@/lib/auth';
import { API_BASE_URL } from '@/lib/constants';
import { useAuth } from '@/hooks/useAuth';

interface ProfilePictureUploadProps {
  currentImage?: string;
  onImageChange?: (file: File) => void;
}

export default function ProfilePictureUpload({
  currentImage = '/images/profile/default-avatar.png',
  onImageChange,
}: ProfilePictureUploadProps) {
  const [preview, setPreview] = useState<string>(currentImage);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setAvatarUrl } = useAuth();

  useEffect(() => {
    setPreview(currentImage);
  }, [currentImage]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    // Validate file size (max 800KB as per Figma)
    // if (file.size > 800 * 1024) {
    //   setUploadError('Image size must be less than 800KB');
    //   if (fileInputRef.current) {
    //     fileInputRef.current.value = '';
    //   }
    //   return;
    // }

    const previousPreview = preview;
    setIsUploading(true);
    setUploadError('');

    // Create preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const token = await getValidAccessToken();
      if (!token) {
        throw new Error('Authentication required. Please log in again.');
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

      const newAvatarResponse = await fetch(
        `${API_BASE_URL}/users/avatar/presigned-url/?key=${encodeURIComponent(key)}`,
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
          setPreview(newAvatarData.data.url);
        }
      }

      onImageChange?.(file);
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadError(error.message || 'Failed to upload image. Please try again.');
      setPreview(previousPreview);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex items-start gap-4 mb-6">
      {/* Profile Picture */}
      <div className="relative flex-shrink-0">
        <div className="w-20 h-20 rounded-full border-[1.6px] border-[#37CE62] overflow-hidden bg-gray-100">
          <Image
            src={preview}
            alt="Profile"
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Green Checkmark Badge */}
        <div className="absolute bottom-0 right-0 bg-[#37CE62] rounded-full p-1 border-2 border-white">
          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Upload Info */}
      <div className="flex-1">
        <h3 className="text-base font-semibold text-[#15195D] mb-0.5">Profile Picture</h3>
        <p className="text-xs text-[#15195D]/60 mb-2">JPG, GIF or PNG. Max size of 800K</p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="text-sm text-[#0066FF] font-medium hover:underline bg-[rgba(21,25,93,0.05)] px-4 py-2 rounded-2xl disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isUploading ? 'Uploading...' : 'Change Photo'}
        </button>

        {uploadError && (
          <p className="mt-2 text-xs text-red-600" role="alert">
            {uploadError}
          </p>
        )}
      </div>
    </div>
  );
}
