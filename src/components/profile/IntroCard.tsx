'use client';

import { MapPin, Home, Briefcase } from 'lucide-react';

interface IntroCardProps {
    bio: string;
    location: {
        current: string;
        from: string;
    };
    work: string;
}

export default function IntroCard({ bio, location, work }: IntroCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#2c3975]">Introduction</h3>
                <button className="bg-[#131c61] text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#0f1549] transition-colors">
                    Edit
                </button>
            </div>

            {/* Bio Text */}
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {bio}
            </p>

            {/* Info Section */}
            <div className="space-y-3 mb-4">
                {/* Location */}
                <div className="flex items-center space-x-3 text-sm">
                    <MapPin className="w-5 h-5 text-[#37ce62]" />
                    <span className="text-gray-700">
                        Live in <span className="font-semibold text-[#2c3975]">{location.current}</span>
                    </span>
                </div>

                {/* From */}
                <div className="flex items-center space-x-3 text-sm">
                    <Home className="w-5 h-5 text-[#37ce62]" />
                    <span className="text-gray-700">
                        From <span className="font-semibold text-[#2c3975]">{location.from}</span>
                    </span>
                </div>

                {/* Work */}
                <div className="flex items-center space-x-3 text-sm">
                    <Briefcase className="w-5 h-5 text-[#37ce62]" />
                    <span className="text-gray-700">
                        Work at <span className="font-semibold text-[#2c3975]">{work}</span>
                    </span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
                <button className="w-full bg-[#131c61] text-white py-2 rounded-lg font-medium hover:bg-[#0f1549] transition-colors">
                    Edit Details
                </button>
                <button className="w-full bg-white border-2 border-gray-200 text-[#2c3975] py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Add Hobbies
                </button>
            </div>
        </div>
    );
}
