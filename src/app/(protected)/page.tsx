'use client';

import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { usersApi } from '../../lib/api/users';
import { getUserId } from '../../lib/auth';
import { User } from '../../types/auth';
import ProfileHeader from '../../components/dashboard/ProfileHeader';
import IntroSection from '../../components/dashboard/IntroSection';
import FeaturedSection from '../../components/dashboard/FeaturedSection';
import CreatePost from '../../components/dashboard/CreatePost';
import PostCard from '../../components/dashboard/PostCard';
import BottomNav from '../../components/dashboard/BottomNav';
import LeftSidebar from '../../components/dashboard/LeftSidebar';
import ProfileTabs from '../../components/dashboard/ProfileTabs';
import { mockUserProfile, mockContacts } from '../../lib/mockData';

export default function DashboardPage() {
    const { user: contextUser } = useAuth();
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#56d059] mx-auto"></div>
            </div>
        );
    }

    const userName = user?.firstName ? `${user.firstName} ${user.lastName}` : 'Judy Nguye';

    // specific mockup post
    const mockupPost = {
        author: {
            name: "Judy Nguye",
            image: "/images/profile/m-profile-girl.png",
            timeAgo: "6 Day",
        },
        content: "Hi Everyone, Today i was on the most beautiful mountain in the word, i also wasnt to day to all of you.",
        hashtags: ["#mountain", "#viwe"],
        images: [
            "/images/profile/m-post1.png",
            "/images/profile/m-post2.png",
            "/images/profile/m-post3.png",
            "/images/profile/m-post4.png",
            "/images/profile/m-post5.png",
        ],
        likes: 21,
        comments: 1700,
        shares: 3100,
    };

    return (
        <div className="min-h-screen bg-[#f3f4f6] pb-24 relative font-sans">
            {/* Desktop Profile Header */}
            <div className="hidden md:block">
                <ProfileHeader
                    name={userName}
                    profileImage={user?.avatarUrl || undefined}
                    coverImage="/images/profile/m-top-girl.png" // Explicitly pass cover if needed, or rely on default
                    stats={{
                        posts: user?.posts || 0,
                        followers: user?.followers || 0,
                        following: user?.following || 0
                    }}
                />
            </div>
            {/* Desktop Profile Tabs */}
            <ProfileTabs />

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto md:px-6 md:py-6">
                <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6">
                    {/* Left Sidebar (Desktop Only) */}
                    <div className="hidden md:block md:col-span-1">
                        <LeftSidebar contacts={mockContacts} />
                    </div>

                    {/* Right Feed / Mobile Content */}
                    <div className="md:col-span-3 space-y-3">
                        {/* Mobile Components (Hidden on Desktop) */}
                        <div className="md:hidden space-y-3">
                            <ProfileHeader
                                name={userName}
                                profileImage={user?.avatarUrl || undefined}
                                stats={{
                                    posts: user?.posts || 0,
                                    followers: user?.followers || 0,
                                    following: user?.following || 0
                                }}
                            />
                            <div className="px-4 space-y-3">
                                <IntroSection />
                                <FeaturedSection />
                            </div>
                        </div>

                        {/* Desktop Profile Header Placement (If needed differently, otherwise reusing consistent header at top is better) */}
                        {/* Actually, ProfileHeader design changes internally. We want it FULL WIDTH at top for desktop. 
                            So we should place ProfileHeader OUTSIDE the grid, at the very top. 
                        */}

                        <div className="md:px-0 px-4 space-y-4">
                            <CreatePost userName={userName} userImage={user?.avatarUrl || undefined} />
                            <PostCard {...mockupPost} />
                            {/* Duplicate PostCard for feed demonstration */}
                            <PostCard {...{ ...mockupPost, content: "Another beautiful day!", images: [mockupPost.images[0], mockupPost.images[1]], likes: 120, comments: 45 }} />
                        </div>
                    </div>
                </div>
            </main>

            <div className="md:hidden">
                <BottomNav />
            </div>
        </div>
    );
}
