'use client';

import { useEffect, useState } from 'react';
import TopNavigation from '@/components/profile/TopNavigation';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';
import IntroCard from '@/components/profile/IntroCard';
import ContactsCard from '@/components/profile/ContactsCard';
import CreatePost from '@/components/profile/CreatePost';
import PostCard from '@/components/profile/PostCard';
import { mockUserProfile, mockStats, mockContacts, mockPosts } from '@/mocks';
import { getUserIdFromToken, getValidAccessToken } from '@/lib/auth';
import { API_BASE_URL } from '@/lib/constants';

interface UserApiResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  birthday?: string | null;
  isPrivate?: boolean;
  createdAt?: string;
  _count?: {
    followers?: number;
    following?: number;
    posts?: number;
  };
}

const isValidImageSrc = (value?: string | null): boolean => {
  if (!value) return false;
  return value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/');
};

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState(mockUserProfile);
  const [stats, setStats] = useState(mockStats);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await getValidAccessToken();
        if (!token) return;

        const userId = getUserIdFromToken(token);
        if (!userId) return;

        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) return;

        const result = await response.json();
        if (!result?.success || !result?.data) return;

        const user: UserApiResponse = result.data;

        setUserProfile({
          id: user.id,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          avatar: isValidImageSrc(user.avatarUrl)
            ? user.avatarUrl!
            : '/images/profile/default-avatar.png',
          coverImage: mockUserProfile.coverImage,
          location: mockUserProfile.location,
          bio: user.bio || '',
          work: mockUserProfile.work,
        });

        setStats({
          posts: user._count?.posts ?? 0,
          followers: user._count?.followers ?? 0,
          following: user._count?.following ?? 0,
        });
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const fullName = `${userProfile.firstName} ${userProfile.lastName}`.trim();

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* Top Navigation */}
      <TopNavigation />

      {/* Profile Header Section */}
      <div className="max-w-7xl mx-auto px-0 md:px-6 md:pt-6">
        <ProfileHeader
          name={fullName}
          avatar={userProfile.avatar}
          coverImage={userProfile.coverImage}
          stats={stats}
        />

        {/* Profile Tabs */}
        <ProfileTabs />
      </div>

      {/* Main Content - 3 Column Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <IntroCard
              bio={userProfile.bio}
              location={userProfile.location}
              work={userProfile.work}
            />
            <ContactsCard contacts={mockContacts} />
          </div>

          {/* Center Feed - Takes remaining width */}
          <div className="lg:col-span-9 space-y-6">
            <CreatePost userName={fullName} userAvatar={userProfile.avatar} />

            {/* Posts Feed */}
            {mockPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
