'use client';

import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { usersApi } from '../../lib/api/users';
import { getUserId } from '../../lib/auth';
import { User } from '../../types/auth';
import ProfileHeader from '../../components/dashboard/ProfileHeader';
import LeftSidebar from '../../components/dashboard/LeftSidebar';
import CreatePost from '../../components/dashboard/CreatePost';
import PostCard from '../../components/dashboard/PostCard';
import { mockUserProfile, mockContacts, mockPosts } from '../../lib/mockData';

export default function DashboardPage() {
    const { user: contextUser, logout } = useAuth();
    const [user, setUser] = useState<User | null>(contextUser);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = getUserId();
            if (!userId) return;

            setLoading(true);
            setError('');
            try {
                const userData = await usersApi.getUserById(userId);
                setUser(userData);
            } catch (err: any) {
                console.error('Failed to fetch user data:', err);
                setError(err.message || 'Failed to load user data');
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
                    <p className="text-gray-600 mt-4">Loading...</p>
                </div>
            </div>
        );
    }

    const userName = user?.firstName ? `${user.firstName} ${user.lastName}` : mockUserProfile.name;

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Sidebar */}
                <div className="lg:col-span-3">
                    <LeftSidebar contacts={mockContacts} />
                </div>

                {/* Main Feed */}
                <div className="lg:col-span-9 space-y-6">
                    {/* Profile Header */}
                    <ProfileHeader name={userName} stats={mockUserProfile.stats} />

                    {/* Create Post */}
                    <CreatePost userName={userName} />

                    {/* Posts Feed */}
                    <div className="space-y-6">
                        {mockPosts.map((post) => (
                            <PostCard key={post.id} {...post} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
