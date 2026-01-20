// Mock data for dashboard
export const mockUserProfile = {
  name: 'Judy Nguyen',
  profileImage: '/images/default-avatar.svg',
  coverImage: '/images/login/people-group-left.png',
  stats: {
    posts: 983,
    followers: 1124,
    following: 2586,
  },
};

export const mockContacts = [
  { id: '1', name: 'Tom', image: '/images/default-avatar.svg', isOnline: true },
  { id: '2', name: 'Jarmal Rustem sinha', image: '/images/default-avatar.svg', isOnline: true },
  { id: '3', name: 'Sweetu Jordan', image: '/images/default-avatar.svg', isOnline: true },
  { id: '4', name: 'Sweetu Jordan', image: '/images/default-avatar.svg', isOnline: true },
  { id: '5', name: 'Shaun walker', image: '/images/default-avatar.svg', isOnline: true },
  { id: '6', name: 'Sweetu Dikshka', image: '/images/default-avatar.svg', isOnline: true },
];

export const mockPosts = [
  {
    id: '1',
    author: {
      name: 'Judy Nguyen',
      image: '/images/default-avatar.jpg',
      timeAgo: '5 mins',
    },
    content:
      'Hi Everyone, Today I was on the most beautiful mountain in the world , i also want to say to all of you. #mountainview #travel',
    images: ['/images/login/hero-bg.jpg', '/images/login/hero-bg.jpg', '/images/login/hero-bg.jpg'],
    likes: 143,
    comments: 16,
    shares: 210,
    hashtags: ['#mountainview', '#travel'],
  },
  {
    id: '2',
    author: {
      name: 'Judy Nguyen',
      image: '/images/default-avatar.svg',
      timeAgo: '5 mins',
    },
    content:
      'Hi Everyone, Today I was on the most beautiful mountain in the world , i also want to say to all of you. #mountainview #travel',
    images: [
      '/images/login/people-group-right.png',
      '/images/login/people-group-left.png',
      '/images/login/logo.png',
    ],
    likes: 143,
    comments: 16,
    shares: 210,
    hashtags: ['#mountainview', '#travel'],
  },
];
