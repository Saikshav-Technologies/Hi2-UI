'use client';

import Image from 'next/image';
import { MessageCircle } from 'lucide-react';

interface ContactItemProps {
    name: string;
    avatar: string;
    isOnline: boolean;
}

export default function ContactItem({ name, avatar, isOnline }: ContactItemProps) {
    return (
        <div className="flex items-center justify-between py-2 px-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            {/* Avatar + Name */}
            <div className="flex items-center space-x-3">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                            src={avatar}
                            alt={name}
                            width={40}
                            height={40}
                            className="object-cover"
                        />
                    </div>
                    {/* Online Indicator */}
                    {isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#37ce62] border-2 border-white rounded-full"></div>
                    )}
                </div>
                <span className="text-sm font-medium text-[#2c3975]">{name}</span>
            </div>

            {/* Message Icon */}
            <button className="text-[#131c61] hover:bg-[#131c61] hover:text-white p-2 rounded-full transition-colors">
                <MessageCircle className="w-5 h-5" />
            </button>
        </div>
    );
}
