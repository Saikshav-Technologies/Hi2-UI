import { Post } from './userData';

// Mock Posts Data
export const mockPosts: Post[] = [
    {
        id: '1',
        author: {
            name: 'Judy Nguyen',
            avatar: '/images/profile/m-profile-girl.png',
        },
        timestamp: 'Dec 29',
        content: 'Hi Everyone, Today I was on the most beautiful mountain in the world. I also want to try to tell all of you. #mountain #view',
        hashtags: ['#mountain', '#view'],
        images: [
            '/images/profile/m-top-girl.png',
            '/images/profile/m-top-girl.png',
            '/images/profile/m-top-girl.png',
        ],
        engagement: {
            reactions: 140,
            likes: 11,
            comments: 23,
            shares: 290,
        },
    },
    {
        id: '2',
        author: {
            name: 'Judy Nguyen',
            avatar: '/images/profile/m-profile-girl.png',
        },
        timestamp: 'Dec 25',
        content: 'Merry Christmas everyone! 🎄',
        hashtags: ['#christmas', '#holidays'],
        images: [
            '/images/profile/m-top-girl.png',
        ],
        engagement: {
            reactions: 85,
            likes: 45,
            comments: 12,
            shares: 8,
        },
    },
];
