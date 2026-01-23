'use client';

import { FileText, Info, PlayCircle, Heart, Users, Image as ImageIcon, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function ProfileTabs() {
    const [activeTab, setActiveTab] = useState('Post');

    const tabs = [
        { name: 'Post', icon: FileText, id: 'Post' },
        { name: 'About', icon: Info, id: 'About' },
        { name: 'Reels', icon: PlayCircle, id: 'Reels' },
        { name: 'Followers', icon: Heart, id: 'Followers' },
        { name: 'Friends', icon: Users, id: 'Friends' },
        { name: 'Gallery', icon: ImageIcon, id: 'Gallery' },
    ];

    return (
        <div className="bg-white border-b border-gray-200 hidden md:block">
            <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
                <div className="flex items-center space-x-8">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                            flex items-center space-x-2 py-4 border-b-2 text-sm font-bold transition-colors
                            ${isActive
                                        ? 'border-[#56d059] text-[#56d059]'
                                        : 'border-transparent text-gray-700 hover:text-gray-900'
                                    }
                        `}
                            >
                                {isActive ? (
                                    <div className="bg-[#56d059] p-1 rounded-sm text-white">
                                        <span className="text-xs font-bold">+</span>
                                    </div>
                                ) : (
                                    // Minimalist rendering for inactive icons if needed, keeping simple for now
                                    <Icon className={`w-4 h-4 ${isActive ? 'fill-current' : ''}`} />
                                )}

                                <span>{tab.name}</span>
                            </button>
                        );
                    })}
                </div>

                <button className="flex items-center space-x-1 text-xs font-bold text-gray-700 hover:bg-gray-50 px-3 py-1.5 rounded-md">
                    <span>More</span>
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
