'use client';

import Image from 'next/image';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import ImageGrid from './ImageGrid';
import { Post } from '@/mocks';

interface PostCardProps extends Post { }

export default function PostCard({ author, timestamp, content, hashtags, images, engagement }: PostCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Post Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                            src={author.avatar}
                            alt={author.name}
                            width={40}
                            height={40}
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h4 className="font-semibold text-[#2c3975]">{author.name}</h4>
                        <p className="text-xs text-gray-500">{timestamp}</p>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Post Content */}
            <div className="mb-4">
                <p className="text-sm text-gray-700 leading-relaxed mb-2">{content}</p>
                {hashtags && hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {hashtags.map((tag, index) => (
                            <span key={index} className="text-sm text-[#131c61] font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Post Images */}
            {images && images.length > 0 && (
                <div className="mb-4">
                    <ImageGrid images={images} />
                </div>
            )}

            {/* Engagement Stats */}
            <div className="flex items-center justify-between py-3 border-t border-b border-gray-100">
                <div className="flex items-center space-x-2">
                    <div className="flex -space-x-1">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <ThumbsUp className="w-3 h-3 text-white" />
                        </div>
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">❤️</span>
                        </div>
                    </div>
                    <span className="text-sm text-gray-600">{engagement.reactions}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{engagement.comments} Comment</span>
                    <span>{engagement.shares} Shares</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-around pt-3">
                <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <ThumbsUp className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Like</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Comment</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Share</span>
                </button>
            </div>
        </div>
    );
}
