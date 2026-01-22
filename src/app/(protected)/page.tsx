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
import { mockUserProfile } from '../../lib/mockData';

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
            {/* Main Content Area */}
            <main className="max-w-2xl mx-auto space-y-3">
                <ProfileHeader
                    name={userName}
                    profileImage={user?.avatarUrl || undefined}
                    stats={{
                        posts: user?.posts || 0,
                        followers: user?.followers || 0,
                        following: user?.following || 0
                    }}
                />

                <div className="space-y-3">
                    <IntroSection />
                    <FeaturedSection />
                    <CreatePost userName={userName} userImage={user?.avatarUrl || undefined} />
                    <PostCard {...mockupPost} />
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
