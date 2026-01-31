'use client';

import { useState, FormEvent, useEffect } from 'react';
import ProfilePictureUpload from './ProfilePictureUpload';
import { ProfileFormData } from '@/lib/types/settings';
import { userApi } from '@/lib/api/user';
import { useAuth } from '@/hooks/useAuth';

interface ProfileSettingsCardProps {
  initialData?: Partial<ProfileFormData>;
  onSave?: (data: ProfileFormData) => void;
}

export default function ProfileSettingsCard({ initialData, onSave }: ProfileSettingsCardProps) {
  const { avatarUrl } = useAuth();
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    username: initialData?.username || '',
    bio: initialData?.bio || '',
    birthday: initialData?.birthday || '',
    email: initialData?.email || '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        username: initialData.username || '',
        bio: initialData.bio || '',
        birthday: initialData.birthday || '',
        email: initialData.email || '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await userApi.updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        bio: formData.bio,
        birthday: formData.birthday,
        isPrivate: false, // This will be controlled by privacy settings
      });

      setSuccess(true);
      onSave?.(formData);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-lg p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#15195D] mb-2">Profile Settings</h2>
        <p className="text-sm text-[#15195D]/70">
          Update your personal information and how others see you.
        </p>
      </div>

      {/* Profile Picture */}
      <ProfilePictureUpload currentImage={avatarUrl} />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-[#15195D] mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={`${formData.firstName} ${formData.lastName}`.trim()}
              onChange={(e) => {
                const parts = e.target.value.split(' ');
                setFormData((prev) => ({
                  ...prev,
                  firstName: parts[0] || '',
                  lastName: parts.slice(1).join(' ') || '',
                }));
              }}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#37CE62] focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#15195D] mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full h-12 px-4 border border-gray-300 rounded-lg text-base bg-gray-50 text-gray-500 cursor-not-allowed"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-[#15195D] mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#37CE62] focus:border-transparent resize-none"
            placeholder="Tell us about yourself..."
          />
          <p className="text-xs text-[#15195D]/50 mt-1">
            Brief description for your profile. URLs are allowed.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-600">Profile updated successfully!</p>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#37CE62] text-white px-6 py-3 rounded-full font-medium hover:bg-[#2DB653] transition-colors focus:outline-none focus:ring-2 focus:ring-[#37CE62] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </section>
  );
}
