'use client';

import Image from 'next/image';

interface ImageGridProps {
    images: string[];
}

export default function ImageGrid({ images }: ImageGridProps) {
    const imageCount = images.length;

    if (imageCount === 0) return null;

    // Single image
    if (imageCount === 1) {
        return (
            <div className="relative w-full h-96 rounded-lg overflow-hidden">
                <Image
                    src={images[0]}
                    alt="Post image"
                    fill
                    className="object-cover"
                />
            </div>
        );
    }

    // Two images
    if (imageCount === 2) {
        return (
            <div className="grid grid-cols-2 gap-2">
                {images.map((image, index) => (
                    <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                        <Image
                            src={image}
                            alt={`Post image ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        );
    }

    // Three images
    if (imageCount === 3) {
        return (
            <div className="grid grid-cols-2 gap-2">
                <div className="relative h-96 rounded-lg overflow-hidden">
                    <Image
                        src={images[0]}
                        alt="Post image 1"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="grid grid-rows-2 gap-2">
                    {images.slice(1).map((image, index) => (
                        <div key={index} className="relative h-[188px] rounded-lg overflow-hidden">
                            <Image
                                src={image}
                                alt={`Post image ${index + 2}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Four or more images
    return (
        <div className="grid grid-cols-2 gap-2">
            {images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                        src={image}
                        alt={`Post image ${index + 1}`}
                        fill
                        className="object-cover"
                    />
                    {index === 3 && imageCount > 4 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-3xl font-bold">+{imageCount - 4}</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
