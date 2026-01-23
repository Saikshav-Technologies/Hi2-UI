'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, X } from 'lucide-react';
import Image from 'next/image';

interface PostCardProps {
  author: {
    name: string;
    image: string;
    timeAgo: string;
  };
  content: string;
  images: string[];
  likes: number;
  comments: number;
  shares: number;
  hashtags?: string[];
}

export default function PostCard({
  author,
  content,
  images,
  likes,
  comments,
  shares,
  hashtags = [],
}: PostCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white pb-4">
      {/* Post Header */}
      <div className="px-4 py-3 flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 relative">
            <Image
              src={author.image}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-[#2c3975] text-base">{author.name}</h3>
            <div className="flex items-center text-xs text-gray-400 font-medium">
              <span>{author.timeAgo}</span>
              <span className="mx-1">·</span>
              <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" /></svg>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-400" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-[#2c3975] text-sm leading-relaxed">
          {content}
        </p>
        {hashtags.length > 0 && (
          <div className="mt-1">
            {hashtags.map((tag, index) => (
              <span key={index} className="text-[#3b82f6] font-medium mr-1 text-sm">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Post Images Grid (2 Top, 3 Bottom) */}
      {images.length > 0 && (
        <div className="grid grid-cols-6 grid-rows-2 gap-1 h-80 md:h-[450px] w-full mt-2">
          {/* First two images take top half (3 cols each) */}
          <div className="col-span-3 relative h-full rounded-xl overflow-hidden">
            <Image src={images[0]} alt="Post" fill className="object-cover" />
          </div>
          <div className="col-span-3 relative h-full rounded-xl overflow-hidden">
            <Image src={images[1] || images[0]} alt="Post" fill className="object-cover" />
          </div>

          {/* Next three images take bottom half (2 cols each) */}
          <div className="col-span-2 relative h-full rounded-xl overflow-hidden">
            <Image src={images[2] || images[0]} alt="Post" fill className="object-cover" />
          </div>
          <div className="col-span-2 relative h-full rounded-xl overflow-hidden">
            <Image src={images[3] || images[0]} alt="Post" fill className="object-cover" />
          </div>
          <div className="col-span-2 relative h-full rounded-xl overflow-hidden">
            <Image src={images[4] || images[0]} alt="Post" fill className="object-cover" />
            {images.length > 5 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-xl">
                3 +
              </div>
            )}
            {!images[4] && (
              <div className="absolute inset-0 bg-gray-200"></div>
            )}
          </div>
        </div>
      )}

      {/* Post Stats & Actions */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-1">
              <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center border border-white">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" /></svg>
              </div>
              <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center border border-white">
                <Heart className="w-2.5 h-2.5 text-white fill-current" />
              </div>
            </div>
            <span>You +20</span>
          </div>
          <div className="flex space-x-3">
            <span>1.7k Comments</span>
            <span>3.1k Shares</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center space-x-2 ${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            <span className="font-medium text-sm">Like</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium text-sm">Comment</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
            <Share2 className="w-5 h-5" />
            <span className="font-medium text-sm">250 Shares</span>
          </button>
        </div>
      </div>
    </div>
  );
}
