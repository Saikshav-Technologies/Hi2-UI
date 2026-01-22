'use client';

import Image from 'next/image';

interface CreatePostProps {
  userImage?: string;
  userName?: string;
}

export default function CreatePost({
  userImage = '/images/profile/m-profile-girl.png',
  userName = 'Judy Nguyen',
}: CreatePostProps) {
  return (
    <div className="bg-white p-4 flex items-center mb-6">
      <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-gray-100 relative">
        <Image
          src={userImage}
          alt={userName}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 flex items-center justify-between">
        <input
          type="text"
          placeholder={`What's on your mind ${userName.split(' ')[0]}?`}
          className="bg-transparent border-none outline-none text-sm text-gray-600 w-full placeholder-gray-400"
        />
      </div>
      <button className="ml-3 text-[#56d059]">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
      </button>
    </div>
  );
}
