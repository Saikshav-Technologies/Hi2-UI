'use client';

import { useState, useEffect } from 'react';
import TopNavigation from '@/components/profile/TopNavigation';
import SettingsSidebar from '@/components/settings/SettingsSidebar';
import ProfileSettingsCard from '@/components/settings/ProfileSettingsCard';
import VisibilityPrivacyCard from '@/components/settings/VisibilityPrivacyCard';
import DeleteAccountCard from '@/components/settings/DeleteAccountCard';
import { userApi, UserProfile } from '@/lib/api/user';
import { TOKEN_KEYS } from '@/lib/constants';

export default function ProfileSettingPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [userData, setUserData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);

                // Get userId from localStorage
                const userId = localStorage.getItem(TOKEN_KEYS.USER_ID);

                if (!userId) {
                    throw new Error('User ID not found. Please log in again.');
                }

                // Fetch user data
                const response = await userApi.getUserById(userId);
                console.log("==> response", response);
                setUserData(response);
            } catch (err: any) {
                console.error('Error fetching user data:', err);
                setError(err.message || 'Failed to load profile data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F4FFF4]">
                <TopNavigation />
                <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#37CE62] mx-auto"></div>
                        <p className="mt-4 text-[#15195D]">Loading profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-[#F4FFF4]">
                <TopNavigation />
                <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                    <div className="bg-white rounded-lg p-8 max-w-md shadow-lg">
                        <div className="text-center">
                            <div className="text-red-500 text-5xl mb-4">⚠️</div>
                            <h2 className="text-xl font-bold text-[#15195D] mb-2">Error Loading Profile</h2>
                            <p className="text-red-600 mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-[#37CE62] text-white px-6 py-2 rounded-full hover:bg-[#2DB653] transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4FFF4]">
            {/* Top Navigation - Using existing component */}
            <TopNavigation />

            {/* Main Container */}
            <main className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
                <div className="flex flex-col lg:flex-row gap-5">
                    {/* Sidebar */}
                    <div className="lg:w-[261px] flex-shrink-0">
                        <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-5">
                        {/* Profile Settings Section */}
                        <ProfileSettingsCard
                            initialData={userData ? {
                                firstName: userData.firstName,
                                lastName: userData.lastName,
                                username: userData.username,
                                email: userData.email,
                                bio: userData.bio,
                                birthday: userData.birthday,
                            } : undefined}
                        />

                        {/* Visibility & Privacy Section */}
                        <VisibilityPrivacyCard
                            initialSettings={{
                                isProfilePublic: userData ? !userData.isPrivate : true,
                                showOnlineStatus: true,
                                allowMessageRequests: false,
                            }}
                        />

                        {/* Delete Account Section */}
                        <DeleteAccountCard />
                    </div>
                </div>
            </main>
        </div>
    );
}
