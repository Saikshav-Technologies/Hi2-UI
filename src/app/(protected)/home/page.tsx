'use client';

import { useAuth } from '../../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { usersApi } from '../../../lib/api/users';
import { getUserId } from '../../../lib/auth';
import { User } from '../../../types/auth';
import Stories from '../../../components/home/Stories';
import CreatePost from '../../../components/profile/CreatePost';
import PeopleYouMayKnow from '../../../components/home/PeopleYouMayKnow';
import PostCard from '../../../components/profile/PostCard';
import LeftSidebarHome from '../../../components/home/LeftSidebarHome';
import RightSidebar from '../../../components/home/RightSidebar';
import { mockUserProfile } from '../../../lib/mockData';
import { mockPosts } from '../../../mocks';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function HomePage() {
  const { user: contextUser, logout } = useAuth();
  const [user, setUser] = useState<User | null>(contextUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = getUserId();
      if (!userId) return;

      setLoading(true);
      try {
        const userData = await usersApi.getUserById(userId);
        setUser(userData);
      } catch (err: any) {
        console.error('Failed to fetch user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  const userName = user?.firstName ? `${user.firstName} ${user.lastName}` : mockUserProfile.name;

  return (
    <div className="w-full px-6 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Sidebar */}
        <div className="lg:col-span-2 xl:col-span-2">
          <LeftSidebarHome />
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-4">
          {/* Stories */}
          <Stories />

          {/* Create Post */}
          <CreatePost userName={userName} userAvatar={mockUserProfile.profileImage} />

          {/* People You May Know */}
          <PeopleYouMayKnow />

          {/* Recent Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex border-b border-gray-200">
              <button className="flex-1 py-3 px-4 text-center font-medium text-green-600 border-b-2 border-green-600">
                Recent
              </button>
              <button className="flex-1 py-3 px-4 text-center font-medium text-gray-600 hover:text-gray-900">
                Friends
              </button>
              <button className="flex-1 py-3 px-4 text-center font-medium text-gray-600 hover:text-gray-900">
                Popular
              </button>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-4">
            {mockPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-3 xl:col-span-3">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
