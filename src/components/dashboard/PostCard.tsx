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
  const [showFullContent, setShowFullContent] = useState(false);

  const displayContent =
    content.length > 150 && !showFullContent ? content.substring(0, 150) + '...' : content;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={author.image}
              alt={author.name}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{author.name}</h3>
            <p className="text-sm text-gray-500">{author.timeAgo}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800">
          {displayContent}
          {content.length > 150 && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-gray-500 ml-2 hover:underline"
            >
              {showFullContent ? 'See less' : 'See more'}
            </button>
          )}
        </p>
        {hashtags.length > 0 && (
          <div className="mt-2">
            {hashtags.map((tag, index) => (
              <span key={index} className="text-blue-600 mr-2">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Post Images */}
      {images.length > 0 && (
        <div
          className={`grid gap-1 ${images.length === 1 ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-2'}`}
        >
          {images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className={`relative ${images.length === 3 && index === 0 ? 'col-span-2 h-80' : 'h-64'} ${images.length === 1 ? 'h-96' : ''}`}
            >
              <Image src={image} alt={`Post image ${index + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Post Stats */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-100">
        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            <span className="bg-red-500 text-white rounded-full p-1">
              <Heart className="w-3 h-3 fill-current" />
            </span>
          </div>
          <span className="text-sm text-gray-600 ml-2">
            You {likes > 1 ? `, ${likes - 1} others` : ''}
          </span>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <button className="hover:underline">{comments} Comment</button>
          <button className="hover:underline">{shares} Shares</button>
        </div>
      </div>

      {/* Post Actions */}
      <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-around">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors ${liked ? 'text-red-500' : 'text-gray-600'}`}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          <span className="font-medium">Like</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">Comment</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
          <Share2 className="w-5 h-5" />
          <span className="font-medium">Share</span>
        </button>
      </div>
    </div>
  );
}
