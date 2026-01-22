'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';

export default function FeaturedSection() {
    return (
        <div className="bg-white p-4 grid grid-cols-2 gap-4">
            {/* Post Card */}
            <div className="bg-[#56d059] rounded-xl relative overflow-hidden h-60 flex items-end p-3">
                <div className="absolute inset-0 flex items-center justify-center text-white/30">
                    <Plus className="w-10 h-10" />
                </div>
                <span className="text-white font-medium relative z-10 text-sm">Post</span>
            </div>

            {/* Collection Card */}
            <div className="rounded-xl relative overflow-hidden h-60 bg-gray-100">
                <Image
                    src="/images/profile/m-parrot.png"
                    alt="Collection"
                    fill
                    className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
                    <span className="text-white font-medium text-sm">Collection</span>
                </div>
            </div>
        </div>
    );
}
