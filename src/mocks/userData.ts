// User Profile Data Types
export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    coverImage: string;
    bio: string;
    location: {
        current: string;
        from: string;
    };
    work: string;
}

// Stats Data Types
export interface ProfileStats {
    posts: number;
    followers: number;
    following: number;
}

// Contact Data Types
export interface Contact {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
}

// Post Data Types
export interface Post {
    id: string;
    author: {
        name: string;
        avatar: string;
    };
    timestamp: string;
    content: string;
    hashtags: string[];
    images: string[];
    engagement: {
        reactions: number;
        likes: number;
        comments: number;
        shares: number;
    };
}

// Mock User Profile Data
export const mockUserProfile: UserProfile = {
    id: '1',
    firstName: 'Judy',
    lastName: 'Nguyen',
    email: 'judy.nguyen@example.com',
    avatar: '/images/profile/m-profile-girl.png',
    coverImage: '/images/profile/m-top-girl.png',
    bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.',
    location: {
        current: 'Patrice, France',
        from: 'Marseille',
    },
    work: 'Phil Narbons',
};

// Mock Stats Data
export const mockStats: ProfileStats = {
    posts: 983,
    followers: 1124,
    following: 2586,
};
