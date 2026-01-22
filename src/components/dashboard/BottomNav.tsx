'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">
            {/* Curved Background Container */}
            <div className="relative h-20 w-full overflow-hidden">
                {/* SVG Curve Background */}
                <svg
                    viewBox="0 0 375 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute bottom-0 w-full h-full drop-shadow-[0_-5px_10px_rgba(0,0,0,0.1)]"
                    preserveAspectRatio="none"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 0H147.129C152.922 0 158.079 3.25056 160.671 8.43477L161.428 9.94838C166.45 19.993 176.777 26.5 188.082 26.5C199.191 26.5 209.356 20.218 214.453 10.4593L215.398 8.65171C218.067 3.5414 223.284 0.354019 229.049 0.354019L375 0V80H0V0Z"
                        fill="#56d059"
                    />
                </svg>

                {/* Navigation Items */}
                <div className="absolute inset-0 flex items-end justify-between px-6 pb-4">
                    <Link href="/" className="p-2 relative z-10 mb-1">
                        <div className="relative w-6 h-6">
                            <Image src="/images/m-bottom-home.png" alt="Home" fill className="object-contain" />
                        </div>
                    </Link>

                    <button className="p-2 relative z-10 mb-1">
                        <div className="relative w-6 h-6">
                            <Image src="/images/m-bottom-video.png" alt="Video" fill className="object-contain" />
                        </div>
                    </button>

                    {/* Center Floating Button Container */}
                    <div className="relative -top-5 z-20">
                        <div className="w-16 h-16 bg-[#56d059] rounded-full flex items-center justify-center border-[4px] border-[#f3f4f6] shadow-lg transform hover:scale-105 transition-transform">
                            <div className="relative w-10 h-10">
                                <Image src="/images/m-bottom-camera.png" alt="Create" fill className="object-contain" priority />
                            </div>
                        </div>
                    </div>

                    <button className="p-2 relative z-10 mb-1">
                        <div className="relative w-7 h-7">
                            <Image src="/images/m-bottom-logo-icon.png" alt="Logo" fill className="object-contain" />
                        </div>
                    </button>

                    <button className="p-2 relative z-10 mb-1">
                        <div className="relative w-6 h-6">
                            <Image src="/images/m-bottom-menu.png" alt="Menu" fill className="object-contain" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
