'use client';

import Image from 'next/image';

interface CreatePostProps {
  userImage?: string;
  userName?: string;
}

import { Video, Image as ImageIcon, MapPin, Smile, Gift, Send } from 'lucide-react';

export default function CreatePost({
  userImage = '/images/profile/m-profile-girl.png',
  userName = 'Judy Nguyen',
}: CreatePostProps) {
  return (
    <>
      {/* Mobile Layout */}
      <div className="bg-white p-4 flex items-center mb-6 md:hidden">
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
          <ImageIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <h3 className="font-bold text-[#2c3975] text-sm mb-4 border-b border-gray-100 pb-2">Create Post</h3>

        <div className="flex items-start space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 relative flex-shrink-0">
            <Image
              src={userImage}
              alt={userName}
              fill
              className="object-cover"
            />
          </div>
          <textarea
            placeholder={`What's on your mind ${userName}?`}
            className="w-full bg-gray-50 rounded-lg p-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#56d059] resize-none h-20"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            <ActionButton icon={Video} label="Live Video" color="text-red-500" bgColor="bg-red-50" />
            <ActionButton icon={ImageIcon} label="Photo/Video" color="text-green-500" bgColor="bg-green-50" />
            <ActionButton icon={MapPin} label="Location" color="text-teal-500" bgColor="bg-teal-50" />
            <ActionButton icon={Gift} label="Gif" color="text-blue-400" bgColor="bg-blue-50" />
            <ActionButton icon={Smile} label="Feeling / Activity" color="text-yellow-500" bgColor="bg-yellow-50" />
          </div>
          <button className="bg-[#56d059] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-[#4bc14e] transition-colors flex-shrink-0 ml-2">
            Send
          </button>
        </div>
      </div>
    </>
  );
}

function ActionButton({ icon: Icon, label, color, bgColor }: { icon: any, label: string, color: string, bgColor: string }) {
  return (
    <button className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full ${bgColor} hover:opacity-80 transition-opacity whitespace-nowrap`}>
      <Icon className={`w-4 h-4 ${color}`} />
      <span className="text-[10px] font-medium text-gray-600">{label}</span>
    </button>
  )
}
