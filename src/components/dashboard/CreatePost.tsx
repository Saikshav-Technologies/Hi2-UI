'use client';

import { useState } from 'react';
import { Image as ImageIcon, Video, MapPin, Smile } from 'lucide-react';
import Image from 'next/image';

interface CreatePostProps {
  userImage?: string;
  userName?: string;
}

export default function CreatePost({
  userImage = '/images/default-avatar.svg',
  userName = 'User',
}: CreatePostProps) {
  const [postText, setPostText] = useState('');

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <Image src={userImage} alt={userName} width={40} height={40} className="object-cover" />
        </div>
        <div className="flex-1">
          <textarea
            className="w-full border-none outline-none resize-none text-gray-700 placeholder-gray-400"
            placeholder="What's on your mind Judy Nguyen?"
            rows={3}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
            <ImageIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Live video</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-green-50 text-green-500 hover:bg-green-100 transition-colors">
            <ImageIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Photo / Video</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-50 text-cyan-500 hover:bg-cyan-100 transition-colors">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-medium">Location</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors">
            <span className="text-sm font-medium">😊</span>
            <span className="text-sm font-medium">Feeling / Activity</span>
          </button>
        </div>
        <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors font-medium">
          Send
        </button>
      </div>
    </div>
  );
}
