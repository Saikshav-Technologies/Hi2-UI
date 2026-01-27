'use client';

import Image from 'next/image';
import { Video, Image as ImageIcon, MapPin, FileText, Smile } from 'lucide-react';

interface CreatePostProps {
    userName: string;
    userAvatar: string;
}

export default function CreatePost({ userName, userAvatar }: CreatePostProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Input Section */}
            <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                        src={userAvatar}
                        alt={userName}
                        width={40}
                        height={40}
                        className="object-cover"
                    />
                </div>
                <input
                    type="text"
                    placeholder={`What's on your mind ${userName.split(' ')[0]}?`}
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#131c61]/20"
                />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Media Type Buttons */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-wrap gap-2">
                    {/* Live Video */}
                    <button className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <Video className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-medium text-gray-700">Live Video</span>
                    </button>

                    {/* Photo/Video */}
                    <button className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <ImageIcon className="w-5 h-5 text-[#37ce62]" />
                        <span className="text-sm font-medium text-gray-700">Photo/Video</span>
                    </button>

                    {/* Location */}
                    <button className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <MapPin className="w-5 h-5 text-teal-500" />
                        <span className="text-sm font-medium text-gray-700">Location</span>
                    </button>

                    {/* GIF */}
                    <button className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700">GIF</span>
                    </button>

                    {/* Feeling/Activity */}
                    <button className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <Smile className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-700">Feeling/Activity</span>
                    </button>
                </div>

                {/* Send Button */}
                <button className="bg-[#131c61] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#0f1549] transition-colors ml-4">
                    Send
                </button>
            </div>
        </div>
    );
}
