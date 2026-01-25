'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
// Define font family for this page to standard Spline Sans
const splineSans = 'font-[family-name:var(--font-spline-sans)]';

export default function OnboardingPage() {
    return (
        <div className={`min-h-screen w-full bg-[#f4fff4] relative flex flex-col items-center pt-4 overflow-x-hidden ${splineSans}`}>

            {/* Header / Logo */}
            <header className="w-full flex justify-center items-center relative z-20">
                <div className="relative w-[80px] h-[80px] md:w-[80px] md:h-[80px]">
                    <Image
                        src="/images/onboarding/logo-icon.png"
                        alt="Hi2 Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-col items-center w-full px-4 md:px-0 max-w-[1440px] mx-auto z-10">

                {/* Hero Text */}
                <div className="text-center mt-2 md:mt-4 mb-6 md:mb-8 max-w-[880px]">
                    <h1 className="text-[#121713] text-[32px] md:text-[40px] font-bold leading-tight mb-1 md:mb-2">
                        Welcome to Hi2
                    </h1>
                    <p className="text-[#658670] text-[16px] md:text-[18px] font-normal max-w-[320px] md:max-w-none mx-auto">
                        The next generation of social networking focused on genuine community and real-time experiences.
                    </p>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full px-4 md:px-[140px] mb-12 md:mb-[48px]">

                    {/* Card 1: Find Your Tribe */}
                    <FeatureCard
                        icon="/images/onboarding/tribe-icon-placeholder.svg" // We might need to replace this if we don't have SVG
                        title="Find Your Tribe"
                        description="Discover communities that share your passions and dive into meaningful conversations."
                        imageSrc="/images/onboarding/tribe.png"
                        iconBg="bg-[#dfffe6]"
                    />

                    {/* Card 2: Never Miss a Moment */}
                    <FeatureCard
                        icon="/images/onboarding/calendar-icon-placeholder.svg"
                        title="Never Miss a Moment"
                        description="From local meetups to global summits, stay connected with events that matter to you."
                        imageSrc="/images/onboarding/events.png"
                        iconBg="bg-[#e4fff0]"
                    />

                    {/* Card 3: Go Live, Go Real */}
                    <FeatureCard
                        icon="/images/onboarding/live-icon-placeholder.svg"
                        title="Go Live, Go Real"
                        description="Experience authentic connections through real-time streaming and interactive engagement."
                        imageSrc="/images/onboarding/live.png"
                        iconBg="bg-[#e0ffed]"
                    />

                </div>

                {/* Footer / CTA */}
                <div className="flex flex-col items-center gap-4 mb-12 w-full">
                    <Link href="/registration" className="w-full md:w-auto">
                        <button className="w-full md:w-[280px] h-[56px] bg-[#26d962] hover:bg-[#20b853] text-[#121713] text-[18px] font-bold rounded-full transition-colors flex items-center justify-center shadow-lg hover:shadow-xl transform active:scale-95 duration-200">
                            Get Started
                        </button>
                    </Link>

                    <div className="flex items-center gap-2 text-[14px] font-medium">
                        <span className="text-[#658670]">Already have an account?</span>
                        <Link href="/login" className="text-[#26d962] hover:underline">
                            Sign in
                        </Link>
                    </div>
                </div>

            </main>

            {/* Background Elements (if any required from design, keeping clean for now) */}
        </div>
    );
}

function FeatureCard({
    icon,
    title,
    description,
    imageSrc,
    iconBg
}: {
    icon: string;
    title: string;
    description: string;
    imageSrc: string;
    iconBg?: string;
}) {
    return (
        <div className="bg-white rounded-[24px] p-6 md:p-8 flex flex-col h-full min-h-[460px] shadow-sm hover:shadow-md transition-shadow duration-300 border-[0.8px] border-[#A3A3A3]">
            {/* Icon */}
            <div className={cn("w-12 h-12 rounded-[12px] flex items-center justify-center mb-6", iconBg || "bg-gray-100")}>
                {/* Fallback for icon if SVG not strictly available, using Lucide or localized image if I can find it later */}
                {title.includes("Tribe") && <UsersIcon className="w-6 h-6 text-[#26d962]" />}
                {title.includes("Moment") && <CalendarIcon className="w-6 h-6 text-[#26d962]" />}
                {title.includes("Live") && <SignalIcon className="w-6 h-6 text-[#26d962]" />}
            </div>

            {/* Text Content */}
            <h3 className="text-[#121713] text-[24px] font-bold mb-3 leading-tight">
                {title}
            </h3>
            <p className="text-[#658670] text-[16px] leading-relaxed mb-4 flex-grow">
                {description}
            </p>

            {/* Illustration Image */}
            <div className="relative w-full h-[180px] md:h-[200px] mt-auto rounded-[16px] overflow-hidden">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
        </div>
    );
}

// Simple Icon Components (using Lucide React as valid replacements/substitutes for Figma SVGs if not downloaded)
import { Users, Calendar, Radio } from 'lucide-react';

const UsersIcon = ({ className }: { className?: string }) => (
    <Users className={className} />
);

const CalendarIcon = ({ className }: { className?: string }) => (
    <Calendar className={className} />
);

const SignalIcon = ({ className }: { className?: string }) => (
    <Radio className={className} />
);
