import React from 'react';
import Image from 'next/image';

export default function Images({ imageUrl }: { imageUrl: string | null }) {
  if (!imageUrl) {
    return <p>No image available</p>;
  }

  return (
    <div className="relative h-full w-full">
      <Image
        src={imageUrl}
        alt="Image"
        fill
        className="object-contain"
        sizes="100vw"
      />
      {/* Optional label overlay */}
      {/*
      <div className="absolute bottom-16 right-5 z-10 text-3xl font-semibold text-white">
        Placeholder for image label
      </div>
      */}
    </div>
  );
}
