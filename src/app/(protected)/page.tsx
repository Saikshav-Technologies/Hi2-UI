import TopNavigation from '@/components/profile/TopNavigation';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';
import IntroCard from '@/components/profile/IntroCard';
import ContactsCard from '@/components/profile/ContactsCard';
import CreatePost from '@/components/profile/CreatePost';
import PostCard from '@/components/profile/PostCard';
import { mockUserProfile, mockStats, mockContacts, mockPosts } from '@/mocks';

export default function ProfilePage() {
  const fullName = `${mockUserProfile.firstName} ${mockUserProfile.lastName}`;

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* Top Navigation */}
      <TopNavigation />

      {/* Profile Header Section */}
      <div className="max-w-7xl mx-auto px-0 md:px-6 md:pt-6">
        <ProfileHeader
          name={fullName}
          avatar={mockUserProfile.avatar}
          coverImage={mockUserProfile.coverImage}
          stats={mockStats}
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
              bio={mockUserProfile.bio}
              location={mockUserProfile.location}
              work={mockUserProfile.work}
            />
            <ContactsCard contacts={mockContacts} />
          </div>

          {/* Center Feed - Takes remaining width */}
          <div className="lg:col-span-9 space-y-6">
            <CreatePost userName={fullName} userAvatar={mockUserProfile.avatar} />

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
